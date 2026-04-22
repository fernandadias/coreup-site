import type { Metadata, Viewport } from "next";
import { Inter, Genos } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Genos({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "CoreUP Team · Consultoria para quem vive sentado",
  description:
    "Treino, postura e hábitos para adultos com rotina de alta demanda. Sistema de musculação e estilo de vida que funciona dentro da sua agenda, com acompanhamento próximo e app exclusivo.",
  keywords: [
    "consultoria de musculação",
    "treino online",
    "postura",
    "core",
    "estilo de vida",
    "home office",
    "CoreUP Team",
  ],
  openGraph: {
    title: "CoreUP Team · Consultoria para quem vive sentado",
    description:
      "Um sistema de treino, postura e rotina pensado para quem passa o dia na frente de uma tela.",
    type: "website",
    locale: "pt_BR",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${sans.variable} ${display.variable}`}>
      <body className="min-h-screen bg-bg-0 font-sans text-fg-0 antialiased">
        {children}
      </body>
    </html>
  );
}
