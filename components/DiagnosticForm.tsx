"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Loader2,
  Sparkles,
  Rocket,
  Target,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { Pill } from "./ui/Pill";

type Status = "idle" | "submitting" | "success" | "error";

const inputCls =
  "h-12 w-full rounded-xl border border-line bg-bg-0/60 px-4 text-sm text-fg-0 placeholder:text-fg-2 transition focus:border-accent/60 focus:bg-bg-0 focus:outline-none focus:ring-2 focus:ring-accent/30";

const planoLabels: Record<string, { name: string; note: string; icon: LucideIcon }> = {
  mensal: { name: "Mensal", note: "Pra testar o método · R$ 147/mês", icon: Rocket },
  trimestral: { name: "Trimestral", note: "Recomendado · R$ 397 à vista", icon: Target },
  semestral: { name: "Semestral", note: "Pra ir longe · R$ 697 à vista", icon: Trophy },
};

const atividadesOptions = [
  { value: "musculacao-academia", label: "Musculação na academia" },
  { value: "musculacao-predio", label: "Musculação no prédio" },
  { value: "esporte", label: "Algum esporte" },
  { value: "corrida", label: "Corrida" },
  { value: "crossfit", label: "Crossfit" },
  { value: "luta", label: "Luta" },
];

export function DiagnosticForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [plano, setPlano] = useState<string>("");
  const [treinaHoje, setTreinaHoje] = useState<string>("");
  const [atividades, setAtividades] = useState<string[]>([]);

  function toggleAtividade(value: string) {
    setAtividades((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  }

  useEffect(() => {
    const stored = sessionStorage.getItem("coreup:plano");
    if (stored) setPlano(stored);

    const handler = (e: Event) => {
      const custom = e as CustomEvent<string>;
      setPlano(custom.detail);
    };
    window.addEventListener("coreup:plano-change", handler);
    return () => window.removeEventListener("coreup:plano-change", handler);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data: Record<string, unknown> = Object.fromEntries(formData.entries());
    data.atividades = atividades;

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        redirect?: string;
      };
      if (!res.ok) {
        throw new Error(json.error ?? "Falha ao enviar");
      }
      setStatus("success");
      sessionStorage.removeItem("coreup:plano");
      if (json.redirect) {
        window.location.href = json.redirect;
        return;
      }
      form.reset();
      setPlano("");
      setTreinaHoje("");
      setAtividades([]);
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error && err.message
          ? err.message
          : "Algo deu errado. Tente novamente em instantes.",
      );
    }
  }

  const planoAtual = plano ? planoLabels[plano] : null;
  const PlanoIcon = planoAtual?.icon ?? Sparkles;
  const mostrarAtividades = treinaHoje === "sim-frequencia" || treinaHoje === "sim-sem-constancia";

  return (
    <section
      id="diagnostico"
      className="relative border-t border-line py-24 md:py-32"
    >
      <div className="absolute inset-x-0 top-0 h-96 hero-glow opacity-60" aria-hidden />
      <div className="container-x relative">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col items-center gap-5 text-center">
            <Pill tone="accent">Diagnóstico grátis · Sem compromisso</Pill>
            <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-tightest text-fg-0 text-balance md:text-6xl">
              Vamos descobrir <span className="text-accent">por onde começar.</span>
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-fg-1 text-pretty md:text-lg">
              Preenche em 1 minuto. Eu leio cada resposta pessoalmente e volto com o plano
              que faz sentido pro seu momento, sem script, sem vendedor no meio.
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className="mt-12 grid gap-4 rounded-3xl border border-line bg-bg-1 p-6 md:grid-cols-2 md:p-10"
            noValidate
          >
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
            />

            <div className="relative md:col-span-2">
              <div
                className={cn(
                  "flex flex-col items-center gap-4 rounded-2xl border p-5 text-center transition sm:flex-row sm:items-center sm:text-left",
                  planoAtual
                    ? "border-accent/60 bg-accent/[0.07]"
                    : "border-line bg-bg-0/60",
                )}
              >
                <span
                  className={cn(
                    "flex size-12 shrink-0 items-center justify-center rounded-xl border",
                    planoAtual ? "border-accent bg-accent text-bg-0" : "border-accent text-accent",
                  )}
                >
                  <PlanoIcon className="size-5" strokeWidth={2} />
                </span>
                <div className="flex-1">
                  <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-accent">
                    Plano de interesse
                  </div>
                  <div className="mt-1 font-display text-xl font-semibold tracking-tight text-fg-0">
                    {planoAtual ? planoAtual.name : "Ainda não decidi"}
                  </div>
                  <div className="text-xs text-fg-1">
                    {planoAtual ? planoAtual.note : "Você pode escolher agora ou decidir depois do diagnóstico."}
                  </div>
                </div>
                <ChevronDown className="size-5 shrink-0 text-fg-2" />
              </div>
              <select
                key={plano}
                name="plano"
                defaultValue={plano}
                onChange={(e) => setPlano(e.target.value)}
                className="absolute inset-0 cursor-pointer opacity-0"
                aria-label="Plano de interesse"
              >
                <option value="">Ainda não decidi</option>
                <option value="mensal">Mensal · R$ 147/mês</option>
                <option value="trimestral">Trimestral · R$ 397 à vista</option>
                <option value="semestral">Semestral · R$ 697 à vista</option>
              </select>
            </div>

            <Field label="Nome" name="nome" required>
              <input
                name="nome"
                required
                placeholder="Como você se chama?"
                className={inputCls}
                autoComplete="name"
              />
            </Field>

            <Field label="Idade" name="idade" required>
              <input
                name="idade"
                required
                type="number"
                min={14}
                max={99}
                placeholder="Quantos anos?"
                className={inputCls}
                inputMode="numeric"
              />
            </Field>

            <Field label="Email" name="email" required>
              <input
                name="email"
                type="email"
                required
                placeholder="seu@email.com"
                className={inputCls}
                autoComplete="email"
              />
            </Field>

            <Field label="WhatsApp" name="whatsapp" required>
              <input
                name="whatsapp"
                required
                placeholder="(DDD) 90000-0000"
                className={inputCls}
                autoComplete="tel"
                inputMode="tel"
              />
            </Field>

            <Field
              label="Qual é a sua rotina de trabalho?"
              name="rotina_trabalho"
              required
              className="md:col-span-2"
            >
              <select
                name="rotina_trabalho"
                required
                defaultValue=""
                className={cn(inputCls, "appearance-none pr-10")}
              >
                <option value="" disabled>
                  Selecione…
                </option>
                <option value="sentado">Sentado(a) a maior parte do dia</option>
                <option value="em-movimento">Em movimento</option>
                <option value="misto">Misto</option>
              </select>
            </Field>

            <Field
              label="Você já treina atualmente?"
              name="treina_hoje"
              required
              className="md:col-span-2"
            >
              <select
                name="treina_hoje"
                required
                value={treinaHoje}
                onChange={(e) => {
                  setTreinaHoje(e.target.value);
                  if (e.target.value === "nao-treino") setAtividades([]);
                }}
                className={cn(inputCls, "appearance-none pr-10")}
              >
                <option value="" disabled>
                  Selecione…
                </option>
                <option value="sim-frequencia">Sim, com frequência</option>
                <option value="sim-sem-constancia">Sim, mas sem constância</option>
                <option value="nao-treino">Não treino no momento</option>
              </select>
            </Field>

            {mostrarAtividades && (
              <div className="md:col-span-2 flex flex-col gap-3">
                <span className="text-xs font-medium uppercase tracking-widest text-fg-2">
                  O que você pratica hoje?{" "}
                  <span className="ml-1 normal-case tracking-normal text-fg-2">(pode marcar mais de uma)</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {atividadesOptions.map((opt) => {
                    const active = atividades.includes(opt.value);
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => toggleAtividade(opt.value)}
                        className={cn(
                          "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition",
                          active
                            ? "border-accent bg-accent text-bg-0"
                            : "border-line bg-bg-0/60 text-fg-1 hover:border-accent/40 hover:text-fg-0",
                        )}
                        aria-pressed={active}
                      >
                        {active && <Check className="size-3.5" strokeWidth={3} />}
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <Field
              label="Qual é o seu principal objetivo agora?"
              name="objetivo"
              required
              className="md:col-span-2"
            >
              <select
                name="objetivo"
                required
                defaultValue=""
                className={cn(inputCls, "appearance-none pr-10")}
              >
                <option value="" disabled>
                  Selecione…
                </option>
                <option value="emagrecer">Emagrecer</option>
                <option value="ganhar-massa">Ganhar massa</option>
                <option value="disposicao-energia">Melhorar disposição e energia</option>
                <option value="dores-postura">Reduzir dores e melhorar postura</option>
                <option value="rotina-sustentavel">Criar uma rotina que se sustente</option>
              </select>
            </Field>

            <Field
              label="Como você ficou sabendo do CoreUP Team?"
              name="origem"
              className="md:col-span-2"
            >
              <input
                name="origem"
                placeholder="Instagram, indicação, Google, outro..."
                className={inputCls}
              />
            </Field>

            <Field
              label="Me conta em uma ou duas frases: o que te fez chegar até aqui hoje?"
              name="motivo"
              required
              className="md:col-span-2"
            >
              <textarea
                name="motivo"
                required
                rows={4}
                placeholder="O que você quer resolver, o que te incomoda, o que te motivou a preencher isso..."
                className={cn(inputCls, "h-auto py-3 resize-y")}
              />
            </Field>

            <div className="md:col-span-2 flex flex-col items-stretch gap-4 pt-2 md:flex-row md:items-center md:justify-between">
              <p className="text-xs text-fg-2">
                Ao enviar, você concorda que podemos te contatar por email ou WhatsApp sobre o seu diagnóstico.
              </p>

              <button
                type="submit"
                disabled={status === "submitting" || status === "success"}
                className={cn(
                  "inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-accent px-8 text-sm font-semibold tracking-tight text-bg-0 transition hover:shadow-glow-sm hover:brightness-110 disabled:opacity-70 md:w-auto",
                )}
              >
                {status === "submitting" && <Loader2 className="size-4 animate-spin" />}
                {status === "success" && <Check className="size-4" />}
                {status === "idle" && <ArrowRight className="size-4" />}
                {status === "error" && <ArrowRight className="size-4" />}
                {status === "success"
                  ? "Recebido! Te chamo já já"
                  : status === "submitting"
                    ? "Enviando..."
                    : "Enviar diagnóstico"}
              </button>
            </div>

            {errorMsg && (
              <p className="md:col-span-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300">
                {errorMsg}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  required,
  className,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={name} className={cn("flex flex-col gap-2", className)}>
      <span className="text-xs font-medium uppercase tracking-widest text-fg-2">
        {label}
        {required && <span className="ml-1 text-accent">*</span>}
      </span>
      {children}
    </label>
  );
}
