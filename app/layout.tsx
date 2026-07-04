import type { Metadata } from "next";
import { Fraunces, Archivo, Space_Mono } from "next/font/google";
import { ReservationDialogProvider } from "./components/reservation-dialog";
import { N8nChat } from "./components/n8n-chat";
import "@n8n/chat/style.css";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["600", "700", "900"],
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Brew & Co — Café especial, doces e um lugar para ficar",
  description:
    "Sanduíches, café fresco e doces feitos todos os dias na Vila Madalena. Sabores simples, servidos com calma.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${archivo.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <ReservationDialogProvider>{children}</ReservationDialogProvider>
        <N8nChat />
      </body>
    </html>
  );
}
