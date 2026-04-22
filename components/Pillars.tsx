import { Dumbbell, Activity, Moon, ArrowUpRight } from "lucide-react";

const pillars = [
  {
    icon: Dumbbell,
    title: "Treino adaptado",
    subtitle: "Protocolos eficientes para janelas curtas",
    bullets: [
      "Fortalecimento de core integrado ao treino, não como puxadinho",
      "Ativação muscular e mobilidade para compensar horas parado",
      "Correção postural específica para quem vive na frente da tela",
    ],
  },
  {
    icon: Activity,
    title: "Corpo em movimento fora da academia",
    subtitle: "Micro-intervenções que quebram o ciclo",
    bullets: [
      "Rotina de alongamento e ativação para o dia de trabalho",
      "Protocolos de 3 a 5 minutos entre reuniões",
      "Correção de postura que vira hábito, não lembrete no celular",
    ],
  },
  {
    icon: Moon,
    title: "Estilo de vida sustentável",
    subtitle: "Sistema, não inspiração",
    bullets: [
      "Alimentação realista para agenda cheia, sem planilha impossível",
      "Sono e recuperação tratados como treino, não como sobra",
      "Check-ins regulares para manter a rotina operando",
    ],
  },
];

export function Pillars() {
  return (
    <section id="sistema" className="relative border-t border-line py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-accent">
              As 3 frentes do sistema
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tightest text-fg-0 text-balance md:text-5xl">
              Uma coisa não funciona sem a outra.{" "}
              <span className="text-accent">Por isso é um sistema.</span>
            </h2>
          </div>
          <p className="text-base leading-relaxed text-fg-1 text-pretty md:text-lg lg:pt-12">
            Treino sozinho não resolve quem passa 8h parado. Alongamento sozinho não gera força.
            Dieta sozinha não sustenta disposição. As três frentes operam juntas, e é aí que a
            conta fecha.
          </p>
        </div>

        <div className="mt-16 grid gap-4 lg:grid-cols-3">
          {pillars.map(({ icon: Icon, title, subtitle, bullets }) => (
            <article
              key={title}
              className="pillar-card group relative flex flex-col gap-6 rounded-3xl border border-line bg-bg-1 p-8 transition-all duration-300 ease-out hover:scale-[1.03] hover:border-accent hover:bg-accent md:p-10"
            >
              <div className="flex size-12 items-center justify-center rounded-xl border border-line bg-bg-2 text-accent transition-colors duration-300 group-hover:border-bg-0/20 group-hover:bg-bg-0 group-hover:text-accent">
                <Icon className="size-5" strokeWidth={1.75} />
              </div>

              <div>
                <h3 className="font-display text-2xl font-semibold tracking-tight text-fg-0 transition-colors duration-300 group-hover:text-bg-0 md:text-3xl">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-fg-1 transition-colors duration-300 group-hover:text-bg-0/80">
                  {subtitle}
                </p>
              </div>

              <ul className="mt-2 space-y-3 border-t border-line pt-6 transition-colors duration-300 group-hover:border-bg-0/15">
                {bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-3 text-sm leading-relaxed text-fg-1 transition-colors duration-300 group-hover:text-bg-0"
                  >
                    <ArrowUpRight
                      className="mt-0.5 size-4 shrink-0 text-accent transition-colors duration-300 group-hover:text-bg-0"
                      strokeWidth={2}
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
