import type { ComponentPropsWithoutRef, ElementType } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonOwnProps<T extends ElementType> = {
  variant?: ButtonVariant;
  as?: T;
  className?: string;
};

type ButtonProps<T extends ElementType> = ButtonOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof ButtonOwnProps<T>>;

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-foreground shadow-card hover:shadow-elevated",
  secondary:
    "bg-surface text-foreground border border-foreground/15 shadow-card hover:shadow-elevated",
  ghost: "bg-transparent text-foreground underline-offset-4 hover:underline",
};

/**
 * See docs/design/components.md § 6. The active/press "thud" reuses the
 * signature --ease-stamp easing consumed directly via inline style so it
 * stays reactive to prefers-reduced-motion regardless of Tailwind's theme
 * inlining behavior (see globals.css motion token comment).
 */
export function Button<T extends ElementType = "button">({
  variant = "primary",
  as,
  className = "",
  style,
  ...props
}: ButtonProps<T>) {
  const Component = (as ?? "button") as ElementType;

  return (
    <Component
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-3 font-sans text-sm font-bold transition-[box-shadow,transform] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground active:scale-[0.98] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${className}`}
      style={{
        transitionDuration: "var(--duration-fast)",
        transitionTimingFunction: "var(--ease-stamp)",
        ...style,
      }}
      {...props}
    />
  );
}
