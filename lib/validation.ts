export type LeadPayload = {
  plano: string;
  nome: string;
  idade: string;
  email: string;
  whatsapp: string;
  rotina_trabalho: string;
  treina_hoje: string;
  atividades: string[];
  objetivo: string;
  origem: string;
  motivo: string;
};

export type ParseResult =
  | { ok: true; data: LeadPayload }
  | { ok: false; error: string };

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function strArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === "string");
}

export function parseLeadPayload(raw: unknown): ParseResult {
  if (!raw || typeof raw !== "object") {
    return { ok: false, error: "Payload inválido" };
  }

  const src = raw as Record<string, unknown>;

  const nome = str(src.nome);
  const idade = str(src.idade);
  const email = str(src.email).toLowerCase();
  const whatsapp = str(src.whatsapp);
  const rotina_trabalho = str(src.rotina_trabalho);
  const treina_hoje = str(src.treina_hoje);
  const objetivo = str(src.objetivo);
  const motivo = str(src.motivo);
  const origem = str(src.origem);
  const plano = str(src.plano);
  const atividades = strArray(src.atividades);

  if (!nome) return { ok: false, error: "Nome é obrigatório" };
  if (!idade) return { ok: false, error: "Idade é obrigatória" };
  if (!email || !emailRe.test(email))
    return { ok: false, error: "Email inválido" };
  if (!whatsapp) return { ok: false, error: "WhatsApp é obrigatório" };
  if (!rotina_trabalho)
    return { ok: false, error: "Rotina de trabalho é obrigatória" };
  if (!treina_hoje)
    return { ok: false, error: "Responda se você treina atualmente" };
  if (!objetivo) return { ok: false, error: "Objetivo é obrigatório" };
  if (!motivo) return { ok: false, error: "Conte o que te trouxe até aqui" };

  return {
    ok: true,
    data: {
      plano,
      nome,
      idade,
      email,
      whatsapp,
      rotina_trabalho,
      treina_hoje,
      atividades,
      objetivo,
      origem,
      motivo,
    },
  };
}
