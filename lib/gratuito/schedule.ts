import { Resend } from "resend";
import { LESSONS, buildLessonEmail } from "./content";
import type { GratuitoPayload } from "./validation";

const DAY_MS = 24 * 60 * 60 * 1000;

export type ScheduledEmail = {
  day: number;
  id: string | null;
  scheduledAt: string;
};

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

// Dispara os 5 emails da série no Resend, já agendados pros próximos dias.
// Aula 1 sai imediatamente (~1min); as demais com scheduled_at em +1d, +2d, +3d, +4d.
// Retorna os ids de cada disparo pra guardar na Sheet (útil pra cancelar depois).
export async function scheduleFreeSeries(
  lead: GratuitoPayload,
): Promise<ScheduledEmail[]> {
  const resend = getResend();
  const from =
    process.env.LEAD_MAGNET_FROM_EMAIL ??
    process.env.LEAD_FROM_EMAIL ??
    "CoreUP Team <onboarding@resend.dev>";

  if (!resend) {
    console.warn("[gratuito] Resend não configurado — pulando agendamento");
    return [];
  }

  const firstName = lead.nome.split(" ")[0] ?? lead.nome;
  const now = Date.now();

  const results: ScheduledEmail[] = [];

  for (const lesson of LESSONS) {
    const delay = (lesson.day - 1) * DAY_MS;
    const scheduledAt = new Date(now + delay).toISOString();
    const { subject, html, text } = buildLessonEmail(lesson, firstName);

    try {
      const res = await resend.emails.send({
        from,
        to: lead.email,
        subject,
        html,
        text,
        // Resend aceita scheduled_at até 30 dias à frente.
        // Aula 1 fica sem scheduled_at pra sair imediato.
        ...(lesson.day === 1 ? {} : { scheduledAt }),
      });

      if (res.error) {
        console.error(`[gratuito] aula ${lesson.day} falhou:`, res.error);
        results.push({ day: lesson.day, id: null, scheduledAt });
      } else {
        results.push({
          day: lesson.day,
          id: res.data?.id ?? null,
          scheduledAt,
        });
      }
    } catch (err) {
      console.error(`[gratuito] aula ${lesson.day} erro:`, err);
      results.push({ day: lesson.day, id: null, scheduledAt });
    }
  }

  return results;
}

export async function notifyFernandaGratuito(
  lead: GratuitoPayload,
): Promise<void> {
  const resend = getResend();
  const to = process.env.LEAD_NOTIFY_EMAIL;
  const from =
    process.env.LEAD_FROM_EMAIL ?? "CoreUP Team <onboarding@resend.dev>";

  if (!resend || !to) {
    console.warn("[gratuito] Resend não configurado — pulando notificação");
    return;
  }

  const rows: Array<[string, string]> = [
    ["Nome", lead.nome],
    ["Email", lead.email],
    ["Instagram", `@${lead.instagram}`],
    ["WhatsApp", lead.whatsapp || "—"],
  ];

  const tbody = rows
    .map(
      ([k, v]) => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.05em;width:140px;">${k}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;color:#111827;font-size:14px;">${v}</td>
      </tr>`,
    )
    .join("");

  const html = `<!doctype html>
<html><body style="margin:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:32px 16px;">
    <div style="background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
      <div style="background:#09090B;color:#D4FF3A;padding:22px 28px;font-size:13px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;">
        🎁 Nova inscrição · Lead magnet
      </div>
      <div style="padding:28px;">
        <h2 style="margin:0 0 16px;font-size:20px;color:#111827;">${lead.nome}</h2>
        <table cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
          <tbody>${tbody}</tbody>
        </table>
        <p style="margin:24px 0 0;color:#6b7280;font-size:13px;">A série de 5 aulas já foi agendada no Resend.</p>
      </div>
    </div>
  </div>
</body></html>`;

  const res = await resend.emails.send({
    from,
    to,
    replyTo: lead.email,
    subject: `🎁 Nova inscrição nas 5 aulas — ${lead.nome}`,
    html,
  });

  if (res.error) {
    throw new Error(`Resend falhou: ${res.error.message}`);
  }
}

export async function sendGratuitoToSheet(
  lead: GratuitoPayload,
  scheduled: ScheduledEmail[],
  meta: { userAgent: string; ip: string },
): Promise<void> {
  const url = process.env.SHEETS_WEBHOOK_URL;
  const token = process.env.SHEETS_WEBHOOK_TOKEN;
  if (!url || !token) {
    console.warn("[gratuito] Sheets webhook não configurado — pulando");
    return;
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token,
      kind: "gratuito",
      at: new Date().toISOString(),
      nome: lead.nome,
      email: lead.email,
      instagram: lead.instagram,
      whatsapp: lead.whatsapp,
      resend_ids: scheduled.map((s) => `d${s.day}:${s.id ?? "erro"}`).join(" | "),
      user_agent: meta.userAgent,
      ip: meta.ip,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Sheets webhook falhou: ${res.status} ${text}`);
  }
}
