"use client";

import { createContext, useContext, useRef, useState } from "react";
import type { Reservation } from "@/app/api/reservations/route";
import { Button } from "./button";

type ReservationDialogContextValue = {
  open: () => void;
};

const ReservationDialogContext = createContext<ReservationDialogContextValue | null>(null);

export function useReservationDialog(): ReservationDialogContextValue {
  const ctx = useContext(ReservationDialogContext);
  if (!ctx) {
    throw new Error("useReservationDialog must be used within ReservationDialogProvider");
  }
  return ctx;
}

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Mounts a single native <dialog> reservation form, shared by every
 * trigger (NavBar, Hero) via context — see docs/design/components.md § 12.
 */
export function ReservationDialogProvider({ children }: { children: React.ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<Reservation | null>(null);
  const today = new Date().toISOString().slice(0, 10);

  const open = () => {
    setStatus("idle");
    setErrorMessage(null);
    setConfirmed(null);
    dialogRef.current?.showModal();
  };

  const close = () => dialogRef.current?.close();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          partySize: Number(formData.get("partySize")),
          date: formData.get("date"),
          time: formData.get("time"),
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        const message =
          body?.errors && typeof body.errors === "object"
            ? Object.values(body.errors as Record<string, string>).join(" ")
            : "Não foi possível confirmar a reserva.";
        setErrorMessage(message);
        setStatus("error");
        return;
      }

      const reservation = (await response.json()) as Reservation;
      setConfirmed(reservation);
      setStatus("success");
    } catch {
      setErrorMessage("Falha de conexão. Tente novamente.");
      setStatus("error");
    }
  }

  return (
    <ReservationDialogContext.Provider value={{ open }}>
      {children}

      <dialog
        ref={dialogRef}
        aria-labelledby="reservation-dialog-title"
        className="m-auto w-[min(28rem,90vw)] rounded-lg bg-surface p-0 text-foreground shadow-elevated backdrop:bg-espresso/60"
        onClose={() => setStatus("idle")}
      >
        <div className="flex flex-col gap-5 p-6">
          <div className="flex items-start justify-between gap-4">
            <h2 id="reservation-dialog-title" className="font-display text-2xl font-bold">
              Reservar uma Mesa
            </h2>
            <button
              type="button"
              onClick={close}
              aria-label="Fechar"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-foreground/60 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {status === "success" && confirmed ? (
            <div className="flex flex-col gap-4">
              <p className="font-sans text-base text-foreground/85">
                Reserva recebida! Confirmamos sua mesa para{" "}
                <strong>{confirmed.partySize}</strong> pessoa(s) em{" "}
                <strong>
                  {new Date(`${confirmed.date}T00:00:00`).toLocaleDateString("pt-BR")}
                </strong>{" "}
                às <strong>{confirmed.time}</strong>, em nome de{" "}
                <strong>{confirmed.name}</strong>.
              </p>
              <Button type="button" variant="secondary" onClick={close}>
                Fechar
              </Button>
            </div>
          ) : (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="reservation-name" className="font-sans text-sm font-bold">
                  Nome
                </label>
                <input
                  id="reservation-name"
                  name="name"
                  type="text"
                  required
                  disabled={status === "submitting"}
                  className="min-h-11 rounded-md border border-foreground/15 bg-background px-4 font-sans text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="reservation-party-size" className="font-sans text-sm font-bold">
                  Número de pessoas
                </label>
                <input
                  id="reservation-party-size"
                  name="partySize"
                  type="number"
                  min={1}
                  step={1}
                  required
                  disabled={status === "submitting"}
                  className="min-h-11 rounded-md border border-foreground/15 bg-background px-4 font-sans text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                />
              </div>

              <div className="flex gap-3">
                <div className="flex flex-1 flex-col gap-1.5">
                  <label htmlFor="reservation-date" className="font-sans text-sm font-bold">
                    Data
                  </label>
                  <input
                    id="reservation-date"
                    name="date"
                    type="date"
                    min={today}
                    required
                    disabled={status === "submitting"}
                    className="min-h-11 rounded-md border border-foreground/15 bg-background px-4 font-sans text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-1.5">
                  <label htmlFor="reservation-time" className="font-sans text-sm font-bold">
                    Horário
                  </label>
                  <input
                    id="reservation-time"
                    name="time"
                    type="time"
                    required
                    disabled={status === "submitting"}
                    className="min-h-11 rounded-md border border-foreground/15 bg-background px-4 font-sans text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
                  />
                </div>
              </div>

              {status === "error" ? (
                <p role="alert" className="font-sans text-sm font-bold text-accent">
                  {errorMessage}
                </p>
              ) : null}

              <Button type="submit" variant="primary" disabled={status === "submitting"}>
                {status === "submitting" ? "Enviando..." : "Confirmar reserva"}
              </Button>
            </form>
          )}
        </div>
      </dialog>
    </ReservationDialogContext.Provider>
  );
}
