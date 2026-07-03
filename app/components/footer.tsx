"use client";

/** See docs/design/components.md § 8. */
export function Footer() {
  return (
    <footer className="bg-espresso text-oat">
      <div className="mx-auto grid max-w-[72rem] gap-10 px-6 py-16 sm:grid-cols-3">
        <div className="flex flex-col gap-2">
          <p className="font-display text-lg font-bold">Brew & Co</p>
          <p className="font-sans text-sm text-oat/70">
            Rua Aspicuelta, 218
            <br />
            Vila Madalena, São Paulo – SP
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-sans text-sm font-bold uppercase tracking-[0.14em] text-oat/60">
            Horário
          </p>
          <p className="font-sans text-sm text-oat/85">
            Seg–Sex 06:00–20:00
            <br />
            Sáb 07:00–21:00
            <br />
            Dom fechado
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-sans text-sm font-bold uppercase tracking-[0.14em] text-oat/60">
            Novidades
          </p>
          <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="newsletter-email" className="sr-only">
              Seu e-mail
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="Seu e-mail"
              className="min-h-11 flex-1 rounded-full border border-oat/25 bg-transparent px-4 text-sm text-oat placeholder:text-oat/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oat"
            />
            <button
              type="submit"
              className="min-h-11 rounded-full bg-primary px-4 font-sans text-sm font-bold text-espresso focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-oat"
            >
              Receber
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-oat/10 px-6 py-6 text-center font-sans text-xs text-oat/50">
        © {new Date().getFullYear()} Brew & Co. Todos os direitos reservados.
      </div>
    </footer>
  );
}
