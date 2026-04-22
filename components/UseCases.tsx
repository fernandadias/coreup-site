import { Dumbbell, Home, Building2, Zap, Sprout, Trophy } from "lucide-react";

const cases = [
  {
    icon: Dumbbell,
    title: "Academia completa",
    body: "Máquina, peso livre, estrutura completa. A gente explora o que você tem de mais eficiente.",
  },
  {
    icon: Home,
    title: "Treino em casa",
    body: "Com pouco ou nenhum equipamento. Halteres, elásticos e peso do corpo bem aplicados entregam muito.",
  },
  {
    icon: Building2,
    title: "Academia do prédio",
    body: "A gente adapta o estímulo ao equipamento disponível. Dá pra evoluir muito sem depender de estrutura grande.",
  },
  {
    icon: Zap,
    title: "Corrida, crossfit, lutas ou seu esporte",
    body: "Se você já ama algum esporte, a gente usa ele como base e complementa com resistido pra prevenir lesão e evoluir na performance.",
  },
  {
    icon: Sprout,
    title: "Nunca treinou",
    body: "A gente começa pelo começo, sem atalho e sem susto. Movimento certo, carga certa, no ritmo que seu corpo suporta.",
  },
  {
    icon: Trophy,
    title: "Intermediário e avançado",
    body: "Já treina há anos? A gente entra pra afinar técnica, ajustar periodização e achar os pontos onde ainda dá pra destravar.",
  },
];

export function UseCases() {
  return (
    <section className="relative border-t border-line py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-20">
          <div className="flex flex-col gap-6 lg:sticky lg:top-28">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              Seu contexto, seu treino
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tightest text-fg-0 text-balance md:text-5xl">
              É o treino que se adapta pra{" "}
              <span className="text-accent">sua realidade.</span>
            </h2>
            <p className="text-base leading-relaxed text-fg-1 text-pretty md:text-lg">
              O plano se adapta ao que você gosta de fazer e onde você consegue fazer.
            </p>
            <p className="text-base leading-relaxed text-fg-1 text-pretty md:text-lg">
              O que importa é consistência a longo prazo, não o treino "perfeito" que você que você nunca faz.
            </p>
          </div>

          <ul className="flex flex-col">
            {cases.map(({ icon: Icon, title, body }, i) => (
              <li
                key={title}
                className={`flex flex-col items-center gap-4 py-6 text-center sm:flex-row sm:items-start sm:gap-5 sm:text-left ${i > 0 ? "border-t border-line" : ""}`}
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Icon className="size-5" strokeWidth={1.75} />
                </span>
                <div className="flex-1">
                  <h3 className="font-display text-lg font-semibold tracking-tight text-fg-0">
                    {title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-fg-1">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
