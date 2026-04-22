import { Smartphone, HeartHandshake, Target, Clock, Compass, Sparkles } from "lucide-react";
import { SectionHeader } from "./ui/SectionHeader";

const reasons = [
  { icon: Smartphone, title: "App exclusivo CoreUP", body: "Treino, check-ins e evolução em um só lugar, feito pra quem vive entre reuniões." },
  { icon: HeartHandshake, title: "Acompanhamento próximo", body: "Você não recebe uma ficha e some. Aqui é processo com gente do outro lado." },
  { icon: Target, title: "Método já validado", body: "Foi construído em cima de 13 anos de prática e uma jornada real de −23 kg." },
  { icon: Clock, title: "Feito para janelas curtas", body: "Treinos e intervenções que caem em 30–45 minutos, sem sacrificar estímulo." },
  { icon: Compass, title: "Foco no corpo sedentário", body: "Postura, core e mobilidade no centro, não como complemento." },
  { icon: Sparkles, title: "Sistema, não motivação", body: "A rotina não depende de força de vontade. Ela depende de desenho." },
];

export function WhyUs() {
  return (
    <section className="relative border-t border-line py-24 md:py-32">
      <div className="container-x">
        <SectionHeader
          eyebrow="Por que CoreUP"
          title={<>O que faz essa consultoria ser <span className="text-accent">a melhor opção pra você.</span></>}
        />

        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group rounded-2xl border border-line bg-bg-1 p-6 transition-all duration-300 ease-out hover:scale-[1.03] hover:border-accent hover:bg-accent"
            >
              <div className="flex size-10 items-center justify-center rounded-lg border border-line bg-bg-2 text-accent transition-colors duration-300 group-hover:border-bg-0/20 group-hover:bg-bg-0 group-hover:text-accent">
                <Icon className="size-5" strokeWidth={1.75} />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold tracking-tight text-fg-0 transition-colors duration-300 group-hover:text-bg-0">
                {title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-fg-1 transition-colors duration-300 group-hover:text-bg-0/80">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
