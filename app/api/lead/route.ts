import { NextResponse } from "next/server";
import { parseLeadPayload } from "@/lib/validation";
import { notifyFernanda, sendToSheet } from "@/lib/leads";

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const ipHits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (ipHits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (hits.length >= RATE_LIMIT_MAX) {
    ipHits.set(ip, hits);
    return true;
  }
  hits.push(now);
  ipHits.set(ip, hits);
  return false;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Payload inválido" }, { status: 400 });
  }

  // Honeypot: bots que preenchem o campo oculto. Retorna 200 fake pra não dar dica.
  if (
    body &&
    typeof body === "object" &&
    typeof (body as Record<string, unknown>).website === "string" &&
    ((body as Record<string, unknown>).website as string).trim().length > 0
  ) {
    return NextResponse.json({ ok: true, redirect: "/obrigado" });
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Muitas tentativas. Tente de novo em alguns minutos." },
      { status: 429 },
    );
  }

  const parsed = parseLeadPayload(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 422 });
  }

  const lead = parsed.data;

  try {
    await notifyFernanda(lead);
  } catch (err) {
    console.error("[lead] notifyFernanda falhou:", err);
    return NextResponse.json(
      { error: "Não conseguimos enviar agora. Tente em instantes." },
      { status: 500 },
    );
  }

  // Sheets é best-effort: se falhar, loga e segue. Fernanda já foi notificada.
  try {
    await sendToSheet(lead);
  } catch (err) {
    console.error("[lead] sendToSheet falhou:", err);
  }

  // TODO: destravar quando o domínio próprio estiver verificado no Resend.
  // try {
  //   await sendWelcome(lead);
  // } catch (err) {
  //   console.error("[lead] sendWelcome falhou:", err);
  // }

  const firstName = lead.nome.split(" ")[0];
  const redirect = `/obrigado?nome=${encodeURIComponent(firstName)}`;

  return NextResponse.json({ ok: true, redirect });
}
