import Image from "next/image";
import { Pill } from "./ui/Pill";

export function Story() {
  return (
    <section className="relative border-t border-line py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        <div className="flex flex-col gap-6">
          <div>
            <Pill tone="accent">A história por trás do método</Pill>
          </div>
          <h2 className="font-display text-3xl font-semibold tracking-tightest text-fg-0 text-balance md:text-5xl">
            Eu já vivi <span className="text-accent">exatamente</span> o que você está vivendo.
          </h2>
          <div className="flex flex-col gap-5 text-base leading-relaxed text-fg-1 text-pretty md:text-lg">
            <p>
              Pratico musculação há <span className="text-fg-0 font-medium">13 anos</span>. Mas
              por muito tempo treinei olhando só para um lado. Foram cinco anos até eu parar,
              me observar de verdade e enxergar o que precisava mudar.
            </p>
            <p>
              Não era só o treino. Era o sono que eu negligenciava, a alimentação que eu
              improvisava, o álcool que eu normalizava, os hábitos que em silêncio estavam me
              sabotando.
            </p>
            <p>
              Quando comecei a enxergar a vida como um{" "}
              <span className="text-fg-0 font-medium">sistema</span>, tudo mudou. Perdi{" "}
              <span className="text-fg-0 font-medium">23 kg</span>. Ganhei disposição, clareza e
              uma rotina que não depende de força de vontade para funcionar, e que foi
              construída dentro da realidade de quem passa horas na frente de uma tela.
            </p>
            <p className="text-fg-0 font-medium">
              O CoreUP Team nasceu disso. E é esse mesmo sistema que você vai receber.
            </p>
          </div>
        </div>

        <aside className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-bg-1">
            <Image
              src="/assets/antes-depois.jpg"
              alt="Antes e depois da jornada da coach"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <p className="mt-4 text-sm text-fg-1">
            Meu processo de recomposição corporal entre{" "}
            <span className="text-fg-0 font-medium">2022 e 2025</span>:{" "}
            <span className="text-accent font-medium">−23 kg</span> e uma queda de{" "}
            <span className="text-accent font-medium">35% para 16% de gordura corporal</span>.
            Sem atalho, só método.
          </p>
        </aside>
      </div>
    </section>
  );
}

