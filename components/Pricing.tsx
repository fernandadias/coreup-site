"use client";

import { Check, ArrowRight, ShieldCheck, Rocket, Target, Trophy } from "lucide-react";
import { cn } from "@/lib/cn";
import { SectionHeader } from "./ui/SectionHeader";

const plans = [
  {
    id: "mensal",
    icon: Rocket,
    name: "Mensal",
    tagline: "Pra testar o método",
    fullPrice: "R$ 197",
    price: "R$ 147",
    period: "/mês",
    discount: "Fundadores: 25% off",
    note: "Sem fidelidade. Renova a cada 30 dias. Ideal pra quem quer sentir como funciona antes de se comprometer.",
    features: [
      "Treino individual desenhado pra você",
      "Acesso ao app com o seu treino",
      "Execução guiada com reps e descanso",
    ],
    highlight: false,
  },
  {
    id: "trimestral",
    icon: Target,
    name: "Trimestral",
    tagline: "Recomendado",
    fullPrice: "R$ 537 à vista",
    price: "R$ 397",
    period: " à vista",
    equivalent: "equivalente a R$ 132/mês",
    discount: "Fundadores: 26% off",
    note: "12 semanas pra alcançar seu primeiro marco real de evolução. Tempo suficiente pra ver resultado de verdade.",
    features: [
      "Tudo do plano Mensal",
      "App completo: check-ins de hábitos, histórico e metas",
      "Chat direto comigo pra ajustes",
      "Objetivos e conquistas com gamificação",
    ],
    highlight: true,
  },
  {
    id: "semestral",
    icon: Trophy,
    name: "Semestral",
    tagline: "Pra quem já decidiu ir longe",
    fullPrice: "R$ 947 à vista",
    price: "R$ 697",
    period: " à vista",
    equivalent: "equivalente a R$ 116/mês",
    discount: "Fundadores: 26% off",
    note: "6 meses com o melhor custo por mês. Comprometimento real, resultado consistente.",
    features: [
      "Tudo do plano Trimestral",
      "Plano alimentar detalhado",
      "Avaliação aprofundada a cada 2 meses (fotos, medidas, evolução)",
      "Call de alinhamento bimestral comigo",
    ],
    highlight: false,
  },
];

export function Pricing() {
  function onChoose(e: React.MouseEvent<HTMLAnchorElement>, planId: string) {
    e.preventDefault();
    if (typeof window !== "undefined") {
      sessionStorage.setItem("coreup:plano", planId);
      window.dispatchEvent(new CustomEvent("coreup:plano-change", { detail: planId }));
    }
    const target = document.getElementById("diagnostico");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  return (
    <section id="planos" className="relative border-t border-line py-24 md:py-32">
      <div className="container-x">
        <SectionHeader
          align="center"
          eyebrow="Planos"
          title={
            <>
              Escolha o tempo que <span className="text-accent">cabe no seu processo.</span>
            </>
          }
          description="Todos os planos começam com o diagnóstico gratuito. Seu treino é desenhado depois, com base na sua rotina e no seu objetivo."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.id}
              className={cn(
                "relative flex flex-col gap-6 rounded-3xl border p-8 transition-all duration-300 ease-out md:p-10",
                plan.highlight
                  ? "border-accent bg-accent text-bg-0 lg:scale-[1.03]"
                  : "border-line bg-bg-1 hover:border-accent/40",
              )}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-bg-0 px-3.5 py-1 text-xs font-semibold tracking-wide text-accent">
                  Recomendado
                </span>
              )}

              <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:text-left">
                <span
                  className={cn(
                    "flex size-12 shrink-0 items-center justify-center rounded-xl border",
                    plan.highlight ? "border-bg-0 bg-bg-0 text-accent" : "border-accent text-accent",
                  )}
                >
                  <plan.icon className="size-6" strokeWidth={2} />
                </span>

                <div className="flex flex-col gap-1">
                  <span
                    className={cn(
                      "text-xs font-medium uppercase tracking-[0.2em]",
                      plan.highlight ? "text-bg-0/70" : "text-accent",
                    )}
                  >
                    {plan.tagline}
                  </span>
                  <h3
                    className={cn(
                      "font-display text-3xl font-semibold tracking-tight leading-none",
                      plan.highlight ? "text-bg-0" : "text-fg-0",
                    )}
                  >
                    {plan.name}
                  </h3>
                </div>
              </div>

              <div
                className={cn(
                  "flex flex-col gap-2 border-y py-6",
                  plan.highlight ? "border-bg-0/20" : "border-line",
                )}
              >
                <span
                  className={cn(
                    "text-sm line-through",
                    plan.highlight ? "text-bg-0/50" : "text-fg-2",
                  )}
                >
                  {plan.fullPrice}
                </span>
                <div className="flex items-baseline gap-1">
                  <span
                    className={cn(
                      "font-display text-4xl font-semibold tracking-tight md:text-5xl",
                      plan.highlight ? "text-bg-0" : "text-fg-0",
                    )}
                  >
                    {plan.price}
                  </span>
                  <span className={cn("text-sm", plan.highlight ? "text-bg-0/80" : "text-fg-1")}>
                    {plan.period}
                  </span>
                </div>
                {plan.equivalent && (
                  <span className={cn("text-xs", plan.highlight ? "text-bg-0/70" : "text-fg-2")}>
                    {plan.equivalent}
                  </span>
                )}
                <div className="mt-1">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide",
                      plan.highlight
                        ? "bg-bg-0 text-accent"
                        : "bg-accent/15 text-accent",
                    )}
                  >
                    {plan.discount}
                  </span>
                </div>
                <p
                  className={cn(
                    "mt-3 text-sm leading-relaxed",
                    plan.highlight ? "text-bg-0/85" : "text-fg-1",
                  )}
                >
                  {plan.note}
                </p>
              </div>

              <ul className="flex flex-col gap-3">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className={cn(
                      "flex items-start gap-3 text-sm leading-relaxed",
                      plan.highlight ? "text-bg-0" : "text-fg-1",
                    )}
                  >
                    <Check
                      className={cn(
                        "mt-0.5 size-4 shrink-0",
                        plan.highlight ? "text-bg-0" : "text-accent",
                      )}
                      strokeWidth={2.5}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#diagnostico"
                onClick={(e) => onChoose(e, plan.id)}
                className={cn(
                  "mt-auto inline-flex h-12 w-full items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold tracking-tight transition",
                  plan.highlight
                    ? "bg-bg-0 text-accent hover:brightness-110"
                    : "border border-line bg-bg-2 text-fg-0 hover:border-accent hover:text-accent",
                )}
              >
                Quero este plano
                <ArrowRight className="size-4" />
              </a>
            </article>
          ))}
        </div>

        <div className="mt-10 flex items-center gap-4 rounded-2xl border border-line bg-bg-1 p-6">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
            <ShieldCheck className="size-5" strokeWidth={1.75} />
          </span>
          <p className="text-sm leading-relaxed text-fg-1">
            <span className="font-semibold text-fg-0">14 dias de garantia total.</span>{" "}
            Se depois do diagnóstico você sentir que não é o momento, sem problema, sem
            cobrança. Devolução integral.
          </p>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-fg-2">
          Todos os planos começam com o diagnóstico gratuito.
        </p>
      </div>
    </section>
  );
}
