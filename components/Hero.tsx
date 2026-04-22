import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/Button";
import { Pill } from "./ui/Pill";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-32">
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />
      <div className="absolute inset-0 bg-noise opacity-[0.06] mix-blend-overlay" aria-hidden />

      <div className="pointer-events-none absolute inset-0 z-[1] hidden md:block" aria-hidden>
        <Image
          src="/assets/hero.png"
          alt=""
          width={1600}
          height={1600}
          priority
          className="absolute inset-y-0 right-0 h-full w-auto object-contain object-right"
        />
      </div>

      <div className="container-x relative z-10">
        <div className="flex max-w-3xl flex-col items-start gap-8 animate-fade-up">
          <Pill tone="accent">
            <span className="inline-block size-1.5 rounded-full bg-accent animate-pulse-glow" />
            Consultoria online
          </Pill>

          <h1
            className="max-w-4xl font-display italic font-semibold tracking-tight text-fg-0 text-balance"
          >
            <span className="block" style={{ fontSize: "4rem", lineHeight: 0.7 }}>
              Seu corpo não foi feito para passar{" "}
              <span className="text-accent">horas no computador.</span>
            </span>
            <span className="mt-4 block font-light text-fg-0" style={{ fontSize: "3rem", lineHeight: 0.7 }}>
              Mas aqui no time a gente <span className="text-accent">coloca o shape</span> mesmo assim!
            </span>
          </h1>

          <p className="max-w-2xl text-lg leading-relaxed text-fg-1 text-pretty md:text-xl">
            Treino, postura e rotina para quem trabalha e vive na frente das tela.
            Sem achismo, sem fórmula mágica, com acompanhamento próximo de quem já viveu
            isso na pele e construiu o sistema que funciona.
          </p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Button href="#diagnostico" size="lg" className="w-full sm:w-auto">
              Quero meu diagnóstico grátis
              <ArrowRight className="size-4" />
            </Button>
            <Button href="#sistema" variant="ghost" size="lg" className="w-full sm:w-auto">
              Como funciona
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
