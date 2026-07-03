import Image from "next/image";
import Link from "next/link";
import { heroImage } from "@/app/lib/images";
import { Button } from "./button";
import { ReservationTriggerButton } from "./reservation-trigger-button";

/** See docs/design/components.md § 2. Photo-background variant. */
export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <Image
        src={heroImage.src}
        alt={heroImage.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-espresso/85 via-espresso/70 to-espresso/90" />

      <div className="relative mx-auto flex max-w-[72rem] flex-col items-center gap-6 px-6 py-24 text-center sm:py-32">
        <p className="font-sans text-sm font-bold uppercase tracking-[0.14em] text-marigold">
          Café · Padaria
        </p>
        <h1 className="max-w-3xl font-display text-4xl font-black tracking-[-0.02em] text-oat sm:text-5xl">
          Bom dia começa aqui.
        </h1>
        <p className="max-w-xl font-sans text-lg text-oat/85">
          Café especial, doces frescos e um lugar para respirar, na Vila
          Madalena. Feito todos os dias, do outro lado do balcão.
        </p>
        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <Button as={Link} href="/menu" variant="primary">
            Ver o menu
          </Button>
          <ReservationTriggerButton variant="secondary">
            Reservar uma Mesa
          </ReservationTriggerButton>
        </div>
      </div>
    </section>
  );
}
