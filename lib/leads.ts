import { Resend } from "resend";
import type { LeadPayload } from "./validation";

const PLANO_LABELS: Record<string, string> = {
  mensal: "Mensal · R$ 147/mês",
  trimestral: "Trimestral · R$ 397 à vista",
  semestral: "Semestral · R$ 697 à vista",
};

const ROTINA_LABELS: Record<string, string> = {
  sentado: "Sentado(a) a maior parte do dia",
  "em-movimento": "Em movimento",
  misto: "Misto",
};

const TREINA_LABELS: Record<string, string> = {
  "sim-frequencia": "Sim, com frequência",
  "sim-sem-constancia": "Sim, mas sem constância",
  "nao-treino": "Não treino no momento",
};

const OBJETIVO_LABELS: Record<string, string> = {
  emagrecer: "Emagrecer",
  "ganhar-massa": "Ganhar massa",
  "disposicao-energia": "Melhorar disposição e energia",
  "dores-postura": "Reduzir dores e melhorar postura",
  "rotina-sustentavel": "Criar uma rotina que se sustente",
};

const ATIVIDADE_LABELS: Record<string, string> = {
  "musculacao-academia": "Musculação na academia",
  "musculacao-predio": "Musculação no prédio",
  esporte: "Algum esporte",
  corrida: "Corrida",
  crossfit: "Crossfit",
  luta: "Luta",
};

type FormattedLead = {
  [K in keyof LeadPayload]: string;
};

export function formatLeadForHuman(lead: LeadPayload): FormattedLead {
  return {
    plano: lead.plano ? PLANO_LABELS[lead.plano] ?? lead.plano : "Ainda não decidiu",
    nome: lead.nome,
    idade: lead.idade,
    email: lead.email,
    whatsapp: lead.whatsapp,
    rotina_trabalho: ROTINA_LABELS[lead.rotina_trabalho] ?? lead.rotina_trabalho,
    treina_hoje: TREINA_LABELS[lead.treina_hoje] ?? lead.treina_hoje,
    atividades: lead.atividades
      .map((v) => ATIVIDADE_LABELS[v] ?? v)
      .join(", ") || "—",
    objetivo: OBJETIVO_LABELS[lead.objetivo] ?? lead.objetivo,
    origem: lead.origem || "—",
    motivo: lead.motivo,
  };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function onlyDigits(str: string): string {
  return str.replace(/\D/g, "");
}

function buildNotifyHtml(lead: LeadPayload): string {
  const f = formatLeadForHuman(lead);
  const waDigits = onlyDigits(lead.whatsapp);
  const waLink = waDigits.length >= 10 ? `https://wa.me/55${waDigits}` : null;

  const rows: Array<[string, string]> = [
    ["Plano de interesse", f.plano],
    ["Nome", f.nome],
    ["Idade", f.idade],
    ["Email", f.email],
    ["WhatsApp", f.whatsapp],
    ["Rotina de trabalho", f.rotina_trabalho],
    ["Já treina hoje", f.treina_hoje],
    ["O que pratica", f.atividades],
    ["Objetivo", f.objetivo],
    ["Como conheceu", f.origem],
    ["O que te trouxe aqui", f.motivo.replace(/\n/g, "<br>")],
  ];

  const tbody = rows
    .map(
      ([k, v]) => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.05em;width:180px;vertical-align:top;">${escapeHtml(k)}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#111827;font-size:14px;line-height:1.5;">${v}</td>
      </tr>`,
    )
    .join("");

  const actions = `
    <div style="margin-top:24px;display:flex;gap:8px;flex-wrap:wrap;">
      <a href="mailto:${escapeHtml(lead.email)}" style="background:#111827;color:#fff;padding:10px 16px;border-radius:999px;text-decoration:none;font-size:14px;font-weight:600;">Responder por email</a>
      ${waLink ? `<a href="${waLink}" style="background:#D4FF3A;color:#09090B;padding:10px 16px;border-radius:999px;text-decoration:none;font-size:14px;font-weight:600;">Abrir WhatsApp</a>` : ""}
    </div>`;

  return `<!doctype html>
<html><body style="margin:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:640px;margin:0 auto;padding:32px 16px;">
    <div style="background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
      <div style="background:#09090B;color:#D4FF3A;padding:24px 28px;font-size:14px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;">
        🔥 Novo diagnóstico · CoreUP Team
      </div>
      <div style="padding:28px;">
        <h2 style="margin:0 0 4px;font-size:22px;color:#111827;">${escapeHtml(f.nome)}, ${escapeHtml(f.idade)} anos</h2>
        <p style="margin:0 0 24px;color:#6b7280;font-size:14px;">Chegou um novo lead pelo site.</p>
        <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
          <tbody>${tbody}</tbody>
        </table>
        ${actions}
      </div>
    </div>
    <p style="text-align:center;color:#9ca3af;font-size:12px;margin-top:16px;">Enviado automaticamente pelo site coreupteam</p>
  </div>
</body></html>`;
}

function buildWelcomeHtml(lead: LeadPayload): string {
  const f = formatLeadForHuman(lead);
  const primeiroNome = lead.nome.split(" ")[0];
  const planoLine = lead.plano
    ? `<p style="margin:16px 0;color:#374151;font-size:15px;line-height:1.6;">Vi que você se interessou pelo plano <strong>${escapeHtml(f.plano)}</strong>. Vamos alinhar se faz sentido pro seu momento no nosso papo.</p>`
    : "";

  return `<!doctype html>
<html><body style="margin:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:32px 16px;">
    <div style="background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
      <div style="background:#09090B;color:#D4FF3A;padding:28px;font-size:20px;font-weight:700;">
        CoreUP Team
      </div>
      <div style="padding:28px;">
        <h2 style="margin:0 0 12px;font-size:22px;color:#111827;">Recebi seu diagnóstico, ${escapeHtml(primeiroNome)}!</h2>
        <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.6;">
          Obrigada por confiar e preencher com calma. Eu leio cada resposta pessoalmente.
        </p>
        <p style="margin:0 0 16px;color:#374151;font-size:15px;line-height:1.6;">
          Vou olhar sua história com atenção e te chamo no WhatsApp em até 24 horas úteis pra gente conversar.
        </p>
        ${planoLine}
        <p style="margin:24px 0 0;color:#374151;font-size:15px;line-height:1.6;">
          Até já,<br>
          <strong>Fernanda · CoreUP Team</strong>
        </p>
      </div>
    </div>
  </div>
</body></html>`;
}

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export async function notifyFernanda(lead: LeadPayload): Promise<void> {
  const resend = getResend();
  const to = process.env.LEAD_NOTIFY_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL ?? "CoreUP Team <onboarding@resend.dev>";
  if (!resend || !to) {
    console.warn("[leads] Resend não configurado — pulando notificação");
    return;
  }

  const result = await resend.emails.send({
    from,
    to,
    replyTo: lead.email,
    subject: `🔥 Novo diagnóstico — ${lead.nome}`,
    html: buildNotifyHtml(lead),
  });

  if (result.error) {
    throw new Error(`Resend falhou: ${result.error.message}`);
  }
}

// TODO: ativar quando o domínio próprio estiver verificado no Resend.
// Hoje o onboarding@resend.dev só envia pra email do dono da conta Resend,
// então o email pro lead não chega. Depois que o domínio for verificado,
// troca o LEAD_FROM_EMAIL e descomenta a chamada em app/api/lead/route.ts.
export async function sendWelcome(lead: LeadPayload): Promise<void> {
  const resend = getResend();
  const from = process.env.LEAD_FROM_EMAIL ?? "CoreUP Team <onboarding@resend.dev>";
  if (!resend) {
    console.warn("[leads] Resend não configurado — pulando welcome");
    return;
  }

  const result = await resend.emails.send({
    from,
    to: lead.email,
    subject: `Recebi seu diagnóstico, ${lead.nome.split(" ")[0]}!`,
    html: buildWelcomeHtml(lead),
  });

  if (result.error) {
    throw new Error(`Welcome falhou: ${result.error.message}`);
  }
}

export async function sendToSheet(lead: LeadPayload): Promise<void> {
  const url = process.env.SHEETS_WEBHOOK_URL;
  const token = process.env.SHEETS_WEBHOOK_TOKEN;
  if (!url || !token) {
    console.warn("[leads] Sheets webhook não configurado — pulando");
    return;
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token,
      at: new Date().toISOString(),
      ...lead,
      atividades: lead.atividades.join(", "),
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Sheets webhook falhou: ${res.status} ${text}`);
  }
}
