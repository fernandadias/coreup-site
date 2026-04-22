"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Dumbbell, TrendingUp, type LucideIcon } from "lucide-react";
import { Pill } from "./ui/Pill";
import { cn } from "@/lib/cn";

type Feature = {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  body: string;
  image: string;
};

const features: Feature[] = [
  {
    icon: Dumbbell,
    eyebrow: "Treino do dia",
    title: "Seu treino atualizado, pronto pra usar.",
    body: "Abre o app e o treino do dia já tá lá: exercícios, séries, repetições e tempo de descanso. Nada de ficar anotando em papel ou adivinhando carga no meio da série.",
    image: "/assets/app-home.png",
  },
  {
    icon: TrendingUp,
    eyebrow: "Evolução",
    title: "Metas, conquistas e progresso todo dia.",
    body: "Acompanhe sua evolução diária, veja suas metas da semana e celebre as conquistas conforme vão aparecendo. Tudo visual, fácil de entender e de voltar pra ver de onde você começou.",
    image: "/assets/app-evolucao.png",
  },
];

export function AppShowcase() {
  const [active, setActive] = useState(0);
  const triggerRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    triggerRefs.current.forEach((el, i) => {
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(i);
        },
        { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section id="app" className="relative border-t border-line">
      <div className="container-x pt-24 md:pt-32">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <div>
            <Pill tone="accent">Em breve · Aplicativo exclusivo para alunos</Pill>
          </div>
          <h2 className="font-display text-3xl font-semibold tracking-tightest text-fg-0 text-balance md:text-5xl">
            Seu treino e sua evolução{" "}
            <span className="text-accent">em um só lugar.</span>
          </h2>
          <p className="text-base leading-relaxed text-fg-1 text-pretty md:text-lg">
            App próprio do CoreUP Team, pensado para a sua rotina, não um software de
            academia genérico. Simples, direto e sempre com o seu treino atualizado.
          </p>
        </div>
      </div>

      {/* Mobile: lista simples empilhada */}
      <div className="container-x py-16 lg:hidden">
        <ul className="flex flex-col gap-20">
          {features.map((f) => (
            <li key={f.title} className="flex flex-col items-center gap-6 text-center">
              <span className="flex size-12 items-center justify-center rounded-full bg-accent text-bg-0">
                <f.icon className="size-5" strokeWidth={1.75} />
              </span>
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                  {f.eyebrow}
                </span>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-fg-0">
                  {f.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-fg-1">{f.body}</p>
              </div>
              <div className="mt-2 flex w-full justify-center">
                <PhoneFrame image={f.image} title={f.title} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop: scrollytelling com texto e celular ambos sticky centralizados */}
      <div
        className="relative hidden lg:block"
        style={{ height: `${features.length * 100}vh` }}
      >
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <div className="container-x grid w-full grid-cols-2 items-center gap-20">
            {/* Coluna texto */}
            <div className="relative h-[420px]">
              {features.map((f, i) => {
                const Icon = f.icon;
                const state =
                  active === i ? "active" : i < active ? "past" : "future";
                return (
                  <div
                    key={f.title}
                    className={cn(
                      "absolute inset-0 flex flex-col justify-center transition-all duration-700 ease-out motion-reduce:transition-none",
                      state === "active"
                        ? "opacity-100 translate-y-0"
                        : state === "past"
                          ? "pointer-events-none -translate-y-8 opacity-0"
                          : "pointer-events-none translate-y-8 opacity-0",
                    )}
                    aria-hidden={state !== "active"}
                  >
                    <div className="flex items-start gap-5">
                      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent text-bg-0">
                        <Icon className="size-5" strokeWidth={1.75} />
                      </span>
                      <div className="flex-1">
                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                          {f.eyebrow}
                        </span>
                        <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight text-fg-0 md:text-4xl">
                          {f.title}
                        </h3>
                        <p className="mt-4 text-base leading-relaxed text-fg-1 md:text-lg">
                          {f.body}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 flex items-center gap-2">
                      {features.map((_, j) => (
                        <span
                          key={j}
                          className={cn(
                            "h-1 rounded-full transition-all duration-500",
                            j === i ? "w-10 bg-accent" : "w-4 bg-bg-2",
                          )}
                        />
                      ))}
                      <span className="ml-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-fg-2">
                        {String(i + 1).padStart(2, "0")} / {String(features.length).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Coluna celular */}
            <div
              className="relative flex h-[680px] items-center justify-center"
              style={{ perspective: "1600px" }}
            >
              {features.map((f, i) => {
                const state =
                  active === i ? "active" : i < active ? "past" : "future";
                return (
                  <div
                    key={f.title}
                    className={cn(
                      "absolute transition-all duration-700 ease-out motion-reduce:transition-none",
                      state === "active"
                        ? "opacity-100"
                        : "pointer-events-none opacity-0",
                    )}
                    style={{
                      transform:
                        state === "active"
                          ? "rotateY(0deg) translateY(0) scale(1)"
                          : state === "past"
                            ? "rotateY(-18deg) translateY(-40px) scale(0.92)"
                            : "rotateY(18deg) translateY(40px) scale(0.92)",
                    }}
                    aria-hidden={state !== "active"}
                  >
                    <PhoneFrame image={f.image} title={f.title} priority={i === 0} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Triggers invisíveis: cada um ocupa 100vh e dispara o active quando passa no centro */}
        <div className="pointer-events-none absolute inset-0">
          {features.map((_, i) => (
            <div
              key={i}
              ref={(el) => {
                triggerRefs.current[i] = el;
              }}
              className="absolute left-0 right-0"
              style={{ top: `${i * 100}vh`, height: "100vh" }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function PhoneFrame({
  image,
  title,
  priority,
}: {
  image: string;
  title: string;
  priority?: boolean;
}) {
  return (
    <div className="relative mx-auto w-[300px] md:w-[340px]">
      {/* Botões laterais */}
      <span
        className="absolute left-[-3px] top-[110px] h-8 w-[3px] rounded-l-sm bg-zinc-800"
        aria-hidden
      />
      <span
        className="absolute left-[-3px] top-[160px] h-14 w-[3px] rounded-l-sm bg-zinc-800"
        aria-hidden
      />
      <span
        className="absolute left-[-3px] top-[225px] h-14 w-[3px] rounded-l-sm bg-zinc-800"
        aria-hidden
      />
      <span
        className="absolute right-[-3px] top-[150px] h-20 w-[3px] rounded-r-sm bg-zinc-800"
        aria-hidden
      />

      {/* Frame externo (corpo do iPhone) */}
      <div className="relative aspect-[402/850] w-full rounded-[54px] bg-gradient-to-b from-zinc-900 via-zinc-950 to-black p-[10px] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8),0_0_0_2px_rgba(255,255,255,0.06)_inset]">
        {/* Tela */}
        <div className="relative h-full w-full overflow-hidden rounded-[44px] bg-bg-0">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 1024px) 90vw, 340px"
            className="object-cover"
            priority={priority}
          />

          {/* Dynamic Island */}
          <div
            className="pointer-events-none absolute left-1/2 top-[10px] z-10 h-[26px] w-[96px] -translate-x-1/2 rounded-full bg-black"
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}
