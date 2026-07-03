"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useReservationDialog } from "./reservation-dialog";

const links = [
  { href: "/sobre", label: "Sobre" },
  { href: "/menu", label: "Menu & Produtos" },
];

/** See docs/design/components.md § 1. Logo mark is a placeholder direction — see style-guide.md § 2. */
export function NavBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { open: openReservationDialog } = useReservationDialog();

  return (
    <header className="sticky top-0 z-50 bg-primary shadow-card">
      <nav
        aria-label="Principal"
        className="mx-auto flex h-[4.5rem] max-w-[72rem] items-center justify-between px-6"
      >
        <Link
          href="/"
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-dashed border-foreground/30 font-display text-lg font-bold text-foreground"
          aria-label="Brew & Co, ir para o início"
        >
          B
        </Link>

        <ul className="hidden items-center gap-8 font-sans text-sm font-bold text-foreground md:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`transition-colors duration-150 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground ${
                    isActive ? "underline underline-offset-4" : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li>
            <button
              type="button"
              onClick={openReservationDialog}
              className="rounded-full bg-foreground px-4 py-2 text-background transition-colors duration-150 hover:bg-foreground/85 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
            >
              Reservar Mesa
            </button>
          </li>
        </ul>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="nav-drawer"
          onClick={() => setOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-full text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground md:hidden"
        >
          <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6" aria-hidden="true">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {open ? (
        <div id="nav-drawer" className="border-t border-foreground/10 bg-surface md:hidden">
          <ul className="flex flex-col gap-1 px-6 py-4 font-sans text-base font-bold text-foreground">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={`block min-h-11 py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground ${
                      isActive ? "underline underline-offset-4" : ""
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openReservationDialog();
                }}
                className="mt-2 min-h-11 w-full rounded-full bg-foreground px-4 text-background focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              >
                Reservar Mesa
              </button>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
