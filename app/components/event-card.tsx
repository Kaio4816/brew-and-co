import type { CafeEvent } from "@/app/lib/events";
import { formatEventDate } from "@/app/lib/events";

type EventCardProps = {
  event: CafeEvent;
};

/** Reuses the Card/Surface visual language. See docs/design/components.md § 9, § 13. */
export function EventCard({ event }: EventCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-md bg-surface p-6 shadow-card">
      <p className="font-sans text-sm font-bold uppercase tracking-[0.14em] text-muted">
        {formatEventDate(event.date)} · {event.time}
      </p>
      <p className="font-display text-2xl font-bold text-foreground">{event.title}</p>
      <p className="font-sans text-base text-foreground/80">{event.description}</p>
    </div>
  );
}
