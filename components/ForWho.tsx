import { Dumbbell, Flame, StretchHorizontal, HeartPulse, CalendarCheck, Users } from "lucide-react";
import { SectionHeader } from "./ui/SectionHeader";

const goals = [
  {
    icon: Dumbbell,
    title: "Ganho de massa magra e hipertrofia",
    body: "Protocolo de treino focado em estímulo, progressão e volume certo pra você construir músculo de verdade.",
  },
  {
    icon: Flame,
    title: "Perda de percentual de gordura",
    body: "Recomposição corporal com método. Não é dieta relâmpago, é um processo pra baixar o percentual e manter.",
  },
  {
    icon: StretchHorizontal,
    title: "Mobilidade e postura",
    body: "Trabalho específico de mobilidade, ativação e correção postural pra liberar quadril, ombro e coluna.",
  },
  {
    icon: HeartPulse,
    title: "Alívio de dores do trabalho remoto",
    body: "Dor lombar, pescoço travado, quadril rígido. A gente ataca a causa com movimento estruturado, não com paliativo.",
  },
  {
    icon: CalendarCheck,
    title: "Organização da rotina",
    body: "Se treino, alimentação, sono e rotina parecem impossíveis de encaixar, a gente desenha um planejamento que cabe na sua semana.",
  },
  {
    icon: Users,
    title: "Acompanhamento pra quem já treina",
    body: "Se você já tem dieta, já treina há um tempo e quer alguém junto no processo pra trocar, revisar e achar onde ainda dá pra evoluir. Pegamos intermediário e avançado também.",
  },
];

export function ForWho() {
  return (
    <section id="para-quem" className="relative border-t border-line py-24 md:py-32">
      <div className="container-x">
        <SectionHeader
          eyebrow="Pra quem é"
          title={
            <>
              Se você tem um destes objetivos, <span className="text-accent">a consultoria é pra você.</span>
            </>
          }
          description="Um ou mais destes pontos combinam com você? Então a gente tem como te ajudar, com método e acompanhamento próximo."
        />

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {goals.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group rounded-2xl border border-line bg-bg-1 p-6 transition-all duration-300 ease-out hover:scale-[1.03] hover:border-accent hover:bg-accent"
            >
              <div className="flex size-10 items-center justify-center rounded-lg border border-line bg-bg-2 text-accent transition-colors duration-300 group-hover:border-bg-0/20 group-hover:bg-bg-0 group-hover:text-accent">
                <Icon className="size-5" strokeWidth={1.75} />
              </div>
              <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-fg-0 transition-colors duration-300 group-hover:text-bg-0 md:text-3xl">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-1 transition-colors duration-300 group-hover:text-bg-0/80">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
