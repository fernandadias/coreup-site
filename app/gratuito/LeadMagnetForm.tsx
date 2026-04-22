"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2, MessageCircle } from "lucide-react";
import { cn } from "@/lib/cn";
import { SUCCESS } from "./content";

type Status = "idle" | "submitting" | "success" | "error";

const inputCls =
  "h-12 w-full rounded-xl border border-line bg-bg-0/60 px-4 text-sm text-fg-0 placeholder:text-fg-2 transition focus:border-accent/60 focus:bg-bg-0 focus:outline-none focus:ring-2 focus:ring-accent/30";

type Props = { whatsappNumber: string };

export function LeadMagnetForm({ whatsappNumber }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/gratuito/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        firstName?: string;
      };
      if (!res.ok) {
        throw new Error(json.error ?? "Falha ao enviar");
      }
      setFirstName(json.firstName ?? "");
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error && err.message
          ? err.message
          : "Algo deu errado. Tente de novo em instantes.",
      );
    }
  }

  if (status === "success") {
    return <SuccessPanel firstName={firstName} whatsappNumber={whatsappNumber} />;
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-4 rounded-3xl border border-line bg-bg-1 p-6 md:p-8"
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

      <Field label="Nome" name="nome" required>
        <input
          name="nome"
          required
          placeholder="Como você se chama?"
          className={inputCls}
          autoComplete="name"
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

      <Field label="Instagram" name="instagram" required>
        <input
          name="instagram"
          required
          placeholder="@seuuser"
          className={inputCls}
          autoComplete="off"
        />
      </Field>

      <Field label="WhatsApp (opcional)" name="whatsapp">
        <input
          name="whatsapp"
          placeholder="(DDD) 90000-0000"
          className={inputCls}
          autoComplete="tel"
          inputMode="tel"
        />
      </Field>

      <button
        type="submit"
        disabled={status === "submitting"}
        className={cn(
          "inline-flex h-14 items-center justify-center gap-2 rounded-full bg-accent px-8 text-sm font-semibold tracking-tight text-bg-0 transition hover:shadow-glow-sm hover:brightness-110 disabled:opacity-70",
        )}
      >
        {status === "submitting" ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <ArrowRight className="size-4" />
        )}
        {status === "submitting" ? "Enviando..." : "Quero começar agora"}
      </button>

      <p className="text-xs text-fg-2">
        Ao enviar, você concorda em receber as 5 aulas no seu email. Sem spam, prometido.
      </p>

      {errorMsg && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-300">
          {errorMsg}
        </p>
      )}
    </form>
  );
}

function SuccessPanel({
  firstName,
  whatsappNumber,
}: {
  firstName: string;
  whatsappNumber: string;
}) {
  const waHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(SUCCESS.waMessage(firstName))}`
    : null;

  return (
    <div className="flex flex-col items-start gap-5 rounded-3xl border border-accent/40 bg-bg-1 p-6 md:p-8">
      <span className="flex size-12 items-center justify-center rounded-full border border-accent bg-accent/15 text-accent">
        <Check className="size-6" strokeWidth={2.5} />
      </span>
      <div>
        <h3 className="font-display text-2xl font-semibold leading-tight text-fg-0 md:text-3xl">
          {firstName ? `Pronto, ${firstName}!` : SUCCESS.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-fg-1 md:text-base">
          {SUCCESS.description}
        </p>
      </div>
      {waHref && (
        <a
          href={waHref}
          target="_blank"
          rel="noopener"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold tracking-tight text-bg-0 transition hover:shadow-glow-sm hover:brightness-110"
        >
          <MessageCircle className="size-4" strokeWidth={2.5} />
          {SUCCESS.waLabel}
        </a>
      )}
    </div>
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
