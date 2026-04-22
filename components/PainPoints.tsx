import { SectionHeader } from "./ui/SectionHeader";

const pains = [
  {
    title: "O corpo trava no meio do dia.",
    body: "Coluna, quadril, ombros. Horas parado transformam sua postura em dor silenciosa, até ela gritar.",
  },
  {
    title: "A energia some antes do expediente acabar.",
    body: "Você desliga o computador exausto sem ter feito nada fisicamente pesado.",
  },
  {
    title: "A semana engole a academia.",
    body: "Você começa segunda com o plano certo. Na quarta o treino virou lembrança. Na sexta, desistência.",
  },
  {
    title: "Força de vontade não é o que falta.",
    body: "Você já tentou dezenas de vezes. O que falta é método que caiba na sua rotina real, não numa ideal.",
  },
];

export function PainPoints() {
  return (
    <section className="relative border-t border-line py-24 md:py-32">
      <div className="container-x">
        <SectionHeader
          eyebrow="Você se reconhece aqui?"
          title={<>Se qualquer uma dessas frases parece sua, <span className="text-accent">você está no lugar certo.</span></>}
          description="Não é falta de disciplina. É falta de um sistema que entenda quem passa o dia sentado e opere dentro da sua agenda real."
        />

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {pains.map(({ title, body }) => (
            <article
              key={title}
              className="group relative rounded-2xl border border-line bg-bg-1 p-8 transition-all duration-300 ease-out hover:scale-[1.03] hover:border-accent hover:bg-accent"
            >
              <h3 className="font-display text-xl font-semibold tracking-tight text-fg-0 transition-colors duration-300 group-hover:text-bg-0 md:text-2xl">
                {title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-fg-1 transition-colors duration-300 group-hover:text-bg-0/80">
                {body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
