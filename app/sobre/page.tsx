import type { Metadata } from "next";
import Image from "next/image";
import { NavBar } from "../components/nav-bar";
import { SectionHeader } from "../components/section-header";
import { Divider } from "../components/divider";
import { Footer } from "../components/footer";
import { aboutImages } from "../lib/images";

export const metadata: Metadata = {
  title: "Sobre Nós — Brew & Co",
  description:
    "Conheça a história da Brew & Co, cafeteria de bairro na Vila Madalena fundada por Rafael Nogueira e Bianca Torres.",
};

export default function SobrePage() {
  const [counterImage, baristaImage] = aboutImages;

  return (
    <>
      <NavBar />
      <main className="flex-1">
        <section className="mx-auto max-w-[72rem] px-6 py-20 sm:py-24">
          <SectionHeader
            eyebrow="Nossa História"
            title="Feita por duas pessoas que só queriam um bom café perto de casa."
            subhead="A Brew & Co começou como conversa de fim de expediente e virou o lugar que a Vila Madalena não sabia que precisava."
          />
        </section>

        <section className="mx-auto grid max-w-[72rem] gap-10 px-6 pb-20 sm:grid-cols-2 sm:items-center sm:pb-24">
          {counterImage ? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-card">
              <Image
                src={counterImage.src}
                alt={counterImage.alt}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}
          <div className="flex flex-col gap-4">
            <p className="font-display text-2xl font-bold text-foreground">
              Rafael Nogueira & Bianca Torres
            </p>
            <p className="font-sans text-base text-foreground/80">
              Os dois se conheceram torrando café numa micro-torrefação em
              2016, dividindo turno de madrugada e ideias demais para caber
              num intervalo de quinze minutos. Rafael vinha da música — anos
              tocando violão em bar por São Paulo afora. Bianca vinha do
              laboratório: apaixonada por prova de xícara, tirou o
              certificado de Q Grader antes mesmo de pensar em abrir um
              negócio.
            </p>
            <p className="font-sans text-base text-foreground/80">
              Em 2019, cansados de café requentado e mesa disputada a
              cotovelo, decidiram abrir a própria cafeteria. Escolheram a
              Vila Madalena por ser o tipo de bairro onde se conhece o nome
              do vizinho — e a Brew & Co nasceu com a missão de ser
              exatamente isso: a sala de estar de alguém, só que com café
              melhor.
            </p>
          </div>
        </section>

        <Divider className="mx-auto max-w-[72rem] px-6" />

        <section className="mx-auto grid max-w-[72rem] gap-10 px-6 py-20 sm:grid-cols-2 sm:items-center sm:py-24">
          <div className="flex flex-col gap-4 sm:order-2">
            <p className="font-display text-2xl font-bold text-foreground">
              Música na sexta, café na alma no sábado
            </p>
            <p className="font-sans text-base text-foreground/80">
              A Noite de Microfone Aberto nasceu da teimosia de Rafael em
              manter o violão por perto mesmo depois de trocar o palco pelo
              balcão — hoje é o momento da semana em que clientes viram
              amigos e amigos viram plateia.
            </p>
            <p className="font-sans text-base text-foreground/80">
              Já a Degustação de Cafés de sábado é a forma de Bianca
              compartilhar o que aprendeu prova a prova: grãos de origens
              diferentes, torras diferentes, e a mesma pergunta de sempre —
              &ldquo;o que você sente nesse gole?&rdquo; Não é aula, é conversa. E
              sempre termina com todo mundo pedindo mais uma xícara.
            </p>
          </div>
          {baristaImage ? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-card sm:order-1">
              <Image
                src={baristaImage.src}
                alt={baristaImage.alt}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}
        </section>
      </main>
      <Footer />
    </>
  );
}
