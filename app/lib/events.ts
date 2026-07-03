export type CafeEvent = {
  id: "open-mic" | "coffee-tasting";
  title: string;
  description: string;
  weekday: 5 | 6;
  time: string;
  date: Date;
};

/**
 * Next occurrence of `weekday` (0=Sun..6=Sat) at `hour:minute`, counting
 * `from` as itself if the time hasn't passed yet, otherwise rolling to
 * next week. Takes `from` as a parameter (not `new Date()` internally)
 * so it stays render-time-correct and testable without mocking the clock.
 */
export function getNextOccurrence(
  from: Date,
  weekday: number,
  hour: number,
  minute: number,
): Date {
  const result = new Date(from);
  result.setHours(hour, minute, 0, 0);

  let daysUntil = (weekday - from.getDay() + 7) % 7;
  if (daysUntil === 0 && result.getTime() <= from.getTime()) {
    daysUntil = 7;
  }

  result.setDate(from.getDate() + daysUntil);
  return result;
}

export function getUpcomingEvents(now: Date = new Date()): CafeEvent[] {
  return [
    {
      id: "open-mic",
      title: "Noite de Microfone Aberto",
      description:
        "Traga seu instrumento, sua voz ou só venha ouvir. Toda sexta à noite, música ao vivo entre uma xícara e outra.",
      weekday: 5,
      time: "20:00",
      date: getNextOccurrence(now, 5, 20, 0),
    },
    {
      id: "coffee-tasting",
      title: "Degustação de Cafés",
      description:
        "Uma manhã de sábado provando grãos de origens diferentes, guiada pela nossa equipe de baristas.",
      weekday: 6,
      time: "10:00",
      date: getNextOccurrence(now, 6, 10, 0),
    },
  ];
}

export function formatEventDate(date: Date): string {
  const formatted = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}
