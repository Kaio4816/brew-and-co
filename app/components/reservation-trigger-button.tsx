"use client";

import type { ComponentProps } from "react";
import { Button } from "./button";
import { useReservationDialog } from "./reservation-dialog";

type ReservationTriggerButtonProps = Omit<ComponentProps<typeof Button>, "as" | "onClick">;

/** Thin client wrapper so server components like Hero can trigger the reservation dialog. */
export function ReservationTriggerButton(props: ReservationTriggerButtonProps) {
  const { open } = useReservationDialog();
  return <Button type="button" onClick={open} {...props} />;
}
