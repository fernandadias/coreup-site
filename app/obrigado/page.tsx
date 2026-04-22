import Link from "next/link";
import { ArrowLeft, Check, MessageCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Obrigada · CoreUP Team",
  description: "Recebemos seu diagnóstico. Em breve a Fernanda entra em contato.",
  robots: { index: false, follow: false },
};

type SearchParams = { nome?: string };

export default function ObrigadoPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const nomeParam = typeof searchParams.nome === "string" ? searchParams.nome.trim() : "";
  const nome = nomeParam ? nomeParam : null;

  const whatsNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
  const message = nome
    ? `Oi Fernanda! Sou ${nome}, acabei de preencher o diagnóstico no site.`
    : "Oi Fernanda! Acabei de preencher o diagnóstico no site.";
  const waHref = whatsNumber
    ? `https://wa.me/${whatsNumber}?text=${encodeURIComponent(message)}`
    : null;

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden py-24">
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-accent/20 blur-[120px]"
        aria-hidden
      />

      <div className="container-x relative z-10">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <span className="flex size-16 items-center justify-center rounded-full border border-accent bg-accent/15 text-accent">
            <Check className="size-8" strokeWidth={2.5} />
          </span>

          <span className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            Diagnóstico recebido
          </span>

          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tightest text-fg-0 text-balance md:text-6xl">
            {nome ? (
              <>
                Obrigada, <span className="text-accent">{nome}</span>.
              </>
            ) : (
              <>Obrigada!</>
            )}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-fg-1 text-pretty md:text-lg">
            Já recebi o seu formulário. Vou ler com calma e te chamar no WhatsApp em até{" "}
            <strong className="text-fg-0">24 horas úteis</strong> pra gente conversar sobre
            seu momento e o próximo passo.
          </p>

          <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            {waHref && (
              <a
                href={waHref}
                target="_blank"
                rel="noopener"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-accent px-7 text-base font-semibold tracking-tight text-bg-0 transition hover:shadow-glow-sm hover:brightness-110"
              >
                <MessageCircle className="size-4" strokeWidth={2.5} />
                Falar com a Fernanda no WhatsApp
              </a>
            )}
            <Link
              href="/"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-line px-7 text-base font-medium tracking-tight text-fg-0 transition hover:border-accent/40 hover:bg-bg-1"
            >
              <ArrowLeft className="size-4" />
              Voltar para o site
            </Link>
          </div>

          <p className="mt-10 text-xs text-fg-2">
            Enquanto isso, fique de olho no seu email — qualquer novidade eu te aviso por lá também.
          </p>
        </div>
      </div>
    </section>
  );
}
