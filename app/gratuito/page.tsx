import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Check } from "lucide-react";
import { VideoEmbed } from "./VideoEmbed";
import { LeadMagnetForm } from "./LeadMagnetForm";
import { BULLETS, FAQ, HERO, VIDEO_YOUTUBE_ID } from "./content";

export const metadata: Metadata = {
  title: "5 aulas gratuitas · CoreUP Team",
  description:
    "Lead magnet: 5 aulas curtas por email pra quem trabalha em home office. Sem equipamento, menos de 10 minutos por dia.",
  robots: { index: false, follow: false },
};

export default function GratuitoPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

  return (
    <main className="min-h-screen">
      <header className="border-b border-line bg-bg-0/70 backdrop-blur-xl">
        <div className="container-x flex h-16 items-center justify-between">
          <Link href="/" aria-label="CoreUP Team · página inicial" className="flex items-center">
            <Image
              src="/assets/coreupteam-horizontal-branco-cor.svg"
              alt="CoreUP Team"
              width={160}
              height={32}
              priority
              className="h-4 w-auto"
            />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-fg-1 transition hover:text-fg-0"
          >
            <ArrowLeft className="size-3.5" />
            Voltar
          </Link>
        </div>
      </header>

      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-accent/20 blur-[120px]"
          aria-hidden
        />

        <div className="container-x relative z-10">
          <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:gap-14">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                {HERO.eyebrow}
              </span>

              <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tightest text-fg-0 text-balance md:text-6xl">
                {HERO.title}
                <span className="text-accent">{HERO.titleHighlight}</span>
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-fg-1 text-pretty md:text-lg">
                {HERO.subtitle}
              </p>

              <div className="mt-8">
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-fg-2">
                  {HERO.videoTitle}
                </p>
                <VideoEmbed youtubeId={VIDEO_YOUTUBE_ID} title="CoreUP Team · 5 aulas gratuitas" />
              </div>

              <ul className="mt-8 grid gap-3">
                {BULLETS.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-fg-1 md:text-base">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-accent bg-accent/15 text-accent">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:sticky md:top-10 md:self-start">
              <LeadMagnetForm whatsappNumber={whatsappNumber} />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-16 md:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight text-fg-0 md:text-4xl">
              Perguntas rápidas
            </h2>
            <dl className="mt-8 divide-y divide-line rounded-2xl border border-line bg-bg-1">
              {FAQ.map((item) => (
                <div key={item.q} className="p-6">
                  <dt className="font-medium text-fg-0">{item.q}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-fg-1">{item.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <footer className="border-t border-line py-10">
        <div className="container-x flex flex-col items-center gap-2 text-center text-xs text-fg-2">
          <p>CoreUP Team · Consultoria para quem vive sentado</p>
          <Link href="/" className="text-fg-1 transition hover:text-fg-0">
            Conhecer o método completo →
          </Link>
        </div>
      </footer>
    </main>
  );
}
