import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

export type Reservation = {
  id: string;
  name: string;
  partySize: number;
  date: string;
  time: string;
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_PATH = path.join(DATA_DIR, "reservations.json");

function validate(body: unknown): { data?: Omit<Reservation, "id" | "createdAt">; errors?: Record<string, string> } {
  if (typeof body !== "object" || body === null) {
    return { errors: { _root: "Corpo do pedido inválido." } };
  }

  const { name, partySize, date, time } = body as Record<string, unknown>;
  const errors: Record<string, string> = {};

  const trimmedName = typeof name === "string" ? name.trim() : "";
  if (!trimmedName) errors.name = "Informe um nome.";

  const numericPartySize = typeof partySize === "number" ? partySize : Number(partySize);
  if (!Number.isInteger(numericPartySize) || numericPartySize <= 0) {
    errors.partySize = "Informe um número de pessoas válido.";
  }

  const dateValue = typeof date === "string" ? date : "";
  if (!dateValue || Number.isNaN(Date.parse(dateValue))) {
    errors.date = "Informe uma data válida.";
  }

  const timeValue = typeof time === "string" ? time : "";
  if (!/^\d{2}:\d{2}$/.test(timeValue)) {
    errors.time = "Informe um horário válido.";
  }

  if (Object.keys(errors).length > 0) return { errors };

  return {
    data: { name: trimmedName, partySize: numericPartySize, date: dateValue, time: timeValue },
  };
}

async function readReservations(): Promise<Reservation[]> {
  try {
    const raw = await readFile(DATA_PATH, "utf-8");
    return JSON.parse(raw) as Reservation[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }
}

/**
 * Best-effort notification to the n8n reservation workflow. The reservation
 * is already persisted to disk by the time this runs, so a failure here
 * (network error, timeout, non-2xx) is only logged — it must never affect
 * the response already sent to the client. booking_time combines date+time
 * into a single ISO 8601 datetime with an explicit -03:00 (São Paulo, no DST
 * since 2019) offset, independent of whatever timezone this server runs in.
 */
async function notifyN8n(reservation: Reservation): Promise<void> {
  const webhookUrl = process.env.N8N_RESERVATION_WEBHOOK_URL;
  const webhookSecret = process.env.N8N_WEBHOOK_SECRET;

  if (!webhookUrl || !webhookSecret) {
    console.warn("N8N_RESERVATION_WEBHOOK_URL/N8N_WEBHOOK_SECRET não configurados — pulando notificação ao n8n.");
    return;
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-webhook-secret": webhookSecret,
    },
    body: JSON.stringify({
      guest_name: reservation.name,
      group_size: reservation.partySize,
      booking_time: `${reservation.date}T${reservation.time}:00-03:00`,
    }),
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    throw new Error(`Webhook do n8n respondeu ${response.status}`);
  }
}

export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ errors: { _root: "JSON inválido." } }, { status: 400 });
  }

  const { data, errors } = validate(body);
  if (errors) {
    return Response.json({ errors }, { status: 400 });
  }

  const reservation: Reservation = {
    ...data!,
    id: randomUUID(),
    createdAt: new Date().toISOString(),
  };

  const reservations = await readReservations();
  reservations.push(reservation);

  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(DATA_PATH, JSON.stringify(reservations, null, 2), "utf-8");

  notifyN8n(reservation).catch((error) => {
    console.error("Falha ao notificar n8n:", error);
  });

  return Response.json(reservation, { status: 201 });
}
