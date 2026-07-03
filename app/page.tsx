import Link from "next/link";
import { NavBar } from "./components/nav-bar";
import { Hero } from "./components/hero";
import { SectionHeader } from "./components/section-header";
import { Divider } from "./components/divider";
import { PhotoMenuTile } from "./components/menu-tile";
import { EventCard } from "./components/event-card";
import { Button } from "./components/button";
import { Footer } from "./components/footer";
import { getFeaturedItems } from "./lib/menu";
import { getUpcomingEvents } from "./lib/events";
import { menuItemImages } from "./lib/images";

export default function Home() {
  const featuredItems = getFeaturedItems(6);
  const events = getUpcomingEvents();

  return (
    <>
      <NavBar />
      <main className="flex-1">
        <Hero />

        <section id="populares" className="mx-auto max-w-[72rem] px-6 py-24">
          <SectionHeader
            eyebrow="Os favoritos da casa"
            title="Mais Pedidos"
            subhead="Os itens que fazem os clientes voltar sempre."
          />

          <Divider className="my-12" />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredItems.map((item, index) => (
              <PhotoMenuTile
                key={item.slug}
                name={item.name}
                price={item.price}
                rotate={index % 2 === 0 ? -9 : 8}
                image={menuItemImages[item.slug]}
              />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Button as={Link} href="/menu" variant="secondary">
              Ver menu completo
            </Button>
          </div>
        </section>

        <section id="eventos" className="bg-background">
          <div className="mx-auto max-w-[72rem] px-6 py-24">
            <SectionHeader
              eyebrow="Não perca"
              title="Próximos Eventos"
              subhead="Música ao vivo e cafés especiais, toda semana."
            />

            <Divider className="my-12" />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>

        <section id="sobre" className="mx-auto max-w-[72rem] px-6 py-24">
          <SectionHeader
            eyebrow="Sobre a Brew & Co"
            title="Feito por gente, não por uma máquina."
            subhead="Somos uma cafeteria de bairro na Vila Madalena: café especial, doces frescos e um lugar para ficar, todos os dias."
          />
          <div className="mt-8 flex justify-center">
            <Button as={Link} href="/sobre" variant="ghost">
              Conhecer a nossa história
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
