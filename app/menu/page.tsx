import type { Metadata } from "next";
import { NavBar } from "../components/nav-bar";
import { SectionHeader } from "../components/section-header";
import { Divider } from "../components/divider";
import { MenuItemCard } from "../components/menu-item-card";
import { Footer } from "../components/footer";
import { getMenuByCategory } from "../lib/menu";

export const metadata: Metadata = {
  title: "Menu — Brew & Co",
  description:
    "Café especial, doces frescos, sanduíches e bebidas geladas da Brew & Co, na Vila Madalena.",
};

const categoryEyebrows: Record<string, string> = {
  "Bebidas Expressas": "Grão torrado na casa",
  Doces: "Feitos todos os dias",
  Sanduíches: "Pão fresco, recheio generoso",
  "Bebidas Geladas": "Pra esquentar menos",
};

export default function MenuPage() {
  const menuByCategory = getMenuByCategory();

  return (
    <>
      <NavBar />
      <main className="flex-1">
        <section className="mx-auto max-w-[72rem] px-6 py-20 sm:py-24">
          <SectionHeader
            eyebrow="O cardápio completo"
            title="Menu · Produtos"
            subhead="Sabores simples, feitos todos os dias — folheie como se estivesse no balcão."
          />
        </section>

        {Object.entries(menuByCategory).map(([category, items], index) => (
          <section
            key={category}
            className={`mx-auto max-w-[72rem] px-6 pb-20 sm:pb-24 ${
              index > 0 ? "pt-4" : ""
            }`}
          >
            <SectionHeader
              align="start"
              eyebrow={categoryEyebrows[category]}
              title={category}
            />

            <Divider align="start" className="my-8" />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {items.map((item, itemIndex) => (
                <MenuItemCard
                  key={item.slug}
                  item={item}
                  rotate={itemIndex % 2 === 0 ? -8 : 9}
                />
              ))}
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
