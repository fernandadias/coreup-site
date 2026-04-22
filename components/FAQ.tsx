"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/cn";
import { SectionHeader } from "./ui/SectionHeader";

const faqs = [
  {
    q: "Nunca treinei antes. Ainda assim funciona pra mim?",
    a: "Funciona, e é pra isso que começamos pelo diagnóstico. O plano é montado a partir de onde você está, não de onde alguém acha que você deveria estar. Iniciante, retomando depois de anos parado ou já treinando sem sistema: entra todo mundo.",
  },
  {
    q: "Já treino há anos. Vale a pena pra nível intermediário/avançado?",
    a: "Vale, sim. Nesses casos a gente entra pra afinar técnica, ajustar periodização e achar os pontos onde ainda dá pra destravar. O ganho costuma ser qualitativo: menos volume desnecessário, mais progresso real.",
  },
  {
    q: "Preciso ter academia?",
    a: "Não necessariamente. O treino é adaptado à sua realidade: academia completa, academia do prédio, home gym com equipamento mínimo ou peso corporal. O importante é o estímulo certo, não o cenário.",
  },
  {
    q: "E se eu já pratico algum esporte (corrida, crossfit, lutas)?",
    a: "A gente usa o esporte que você ama como base e complementa com resistido pra prevenir lesão e evoluir na performance. Não é treino concorrente, é treino que potencializa o que você já faz.",
  },
  {
    q: "Quanto tempo por dia vou precisar?",
    a: "Os treinos são pensados para janelas de 30 a 45 minutos, 3 a 5 vezes por semana. A ideia é caber na sua rotina, não virar mais um peso.",
  },
  {
    q: "Como funciona o acompanhamento?",
    a: "Pelo app exclusivo do CoreUP Team (em desenvolvimento): treino do dia com repetições e descanso cronometrados, histórico completo, check-ins de hábitos e painel de evolução. No plano Trimestral e Semestral você ainda tem chat direto comigo pra ajustes. No Semestral, avaliação aprofundada a cada 2 meses e call bimestral de alinhamento.",
  },
  {
    q: "Qual é o investimento?",
    a: "Três planos: Mensal R$ 147/mês (turma fundadores, 25% off), Trimestral R$ 397 à vista (equivalente a R$ 132/mês) e Semestral R$ 697 à vista (equivalente a R$ 116/mês). Todos começam com o diagnóstico gratuito e têm 14 dias de garantia total.",
  },
  {
    q: "Como funciona a garantia de 14 dias?",
    a: "Se depois do diagnóstico e dos primeiros dias você sentir que não é o momento, sem problema, sem cobrança. Devolução integral, sem burocracia.",
  },
  {
    q: "O plano alimentar está incluso?",
    a: "No plano Semestral, sim: plano alimentar detalhado faz parte. Nos planos Mensal e Trimestral, o foco é treino e hábitos. Se o seu objetivo depende fortemente de nutrição, a gente conversa no diagnóstico.",
  },
  {
    q: "O diagnóstico tem custo? E me compromete com alguma coisa?",
    a: "É 100% gratuito e não compromete com nada. É uma conversa pra entender sua rotina, seu objetivo e ver se o método faz sentido pra você antes de qualquer pagamento.",
  },
  {
    q: "Em quanto tempo começo a ver resultado?",
    a: "Disposição e postura melhoram nas primeiras 2 a 4 semanas. Mudanças de composição corporal pedem 8 a 12 semanas de consistência, por isso o Trimestral é o plano recomendado pra quem quer ver o primeiro marco real.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative border-t border-line py-24 md:py-32">
      <div className="container-x max-w-3xl">
        <SectionHeader
          eyebrow="Perguntas frequentes"
          title="Respondendo o que todo mundo pergunta antes de começar."
          align="center"
        />

        <div className="mt-14 divide-y divide-line rounded-2xl border border-line bg-bg-1">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left transition hover:bg-bg-2/40 md:px-8"
                >
                  <span className="font-display text-base font-medium tracking-tight text-fg-0 md:text-lg">
                    {item.q}
                  </span>
                  <Plus
                    className={cn(
                      "size-5 shrink-0 text-accent transition-transform duration-300",
                      isOpen && "rotate-45",
                    )}
                    strokeWidth={2}
                  />
                </button>
                <div
                  className={cn(
                    "grid overflow-hidden px-6 transition-all duration-300 md:px-8",
                    isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden text-sm leading-relaxed text-fg-1 md:text-base">
                    {item.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
