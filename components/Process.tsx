import { SectionHeader } from "./ui/SectionHeader";

const steps = [
  {
    n: "01",
    title: "Diagnóstico",
    body: "Você preenche o formulário com sua rotina, histórico e objetivo. A gente identifica seu ponto de partida, onde você quer chegar e desenha uma primeira ideia de plano pra esse caminho.",
  },
  {
    n: "02",
    title: "Escolha do plano",
    body: "Você escolhe como vai entrar: mensal pra testar o método, trimestral (nossa recomendação) pra alcançar o primeiro marco real de evolução, ou semestral com desconto pra quem já quer ir longe.",
  },
  {
    n: "03",
    title: "Acompanhamento",
    body: "Check-ins regulares comigo pra saber como você está, adaptar o treino e ajustar o que precisar. Sou presente no processo. A gente é um time, caminhando junto em direção à meta.",
  },
  {
    n: "04",
    title: "Evolução contínua",
    body: "Você recebe objetivos semanais pra garantir que o plano está operando. A cada ciclo, renovamos essas metas com base na sua evolução e no potencial até onde você pode chegar.",
  },
];

export function Process() {
  return (
    <section id="processo" className="relative border-t border-line py-24 md:py-32">
      <div className="container-x">
        <SectionHeader
          eyebrow="Como funciona"
          title={<>A consultoria é um sistema <span className="text-accent">pensado em quatro fases.</span></>}
          description="Cada fase tem um papel claro no seu processo. Entenda como a consultoria opera do primeiro contato até a evolução contínua."
        />

        <ol className="relative mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ n, title, body }, i) => (
            <li
              key={n}
              className="group relative flex flex-col gap-4 rounded-2xl border border-line bg-bg-1 p-8 transition-all duration-300 ease-out hover:scale-[1.03] hover:border-accent hover:bg-accent"
            >
              <div className="flex items-center gap-3">
                <span className="font-display text-4xl font-semibold tabular-nums tracking-tightest text-accent transition-colors duration-300 group-hover:text-bg-0 md:text-5xl">
                  {n}
                </span>
                {i < steps.length - 1 && (
                  <span className="hidden h-px flex-1 bg-gradient-to-r from-line to-transparent transition-opacity duration-300 group-hover:opacity-0 lg:block" />
                )}
              </div>
              <h3 className="font-display text-xl font-semibold tracking-tight text-fg-0 transition-colors duration-300 group-hover:text-bg-0">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-fg-1 transition-colors duration-300 group-hover:text-bg-0/80">
                {body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
