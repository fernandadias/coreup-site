import { NextResponse } from "next/server";
import { parseGratuitoPayload } from "@/lib/gratuito/validation";
import {
  notifyFernandaGratuito,
  scheduleFreeSeries,
  sendGratuitoToSheet,
} from "@/lib/gratuito/schedule";

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

  // Honeypot: bots que preenchem o campo oculto.
  if (
    body &&
    typeof body === "object" &&
    typeof (body as Record<string, unknown>).website === "string" &&
    ((body as Record<string, unknown>).website as string).trim().length > 0
  ) {
    return NextResponse.json({ ok: true, firstName: "" });
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

  const parsed = parseGratuitoPayload(body);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 422 });
  }

  const lead = parsed.data;

  // Agendar a série é o core do fluxo. Se falhar, devolve erro.
  let scheduled;
  try {
    scheduled = await scheduleFreeSeries(lead);
  } catch (err) {
    console.error("[gratuito] scheduleFreeSeries falhou:", err);
    return NextResponse.json(
      { error: "Não conseguimos agendar agora. Tente em instantes." },
      { status: 500 },
    );
  }

  // Best-effort: notificação e sheet não bloqueiam a resposta.
  try {
    await notifyFernandaGratuito(lead);
  } catch (err) {
    console.error("[gratuito] notifyFernanda falhou:", err);
  }

  try {
    await sendGratuitoToSheet(lead, scheduled, {
      userAgent: req.headers.get("user-agent") ?? "",
      ip,
    });
  } catch (err) {
    console.error("[gratuito] sendToSheet falhou:", err);
  }

  const firstName = lead.nome.split(" ")[0] ?? "";

  return NextResponse.json({ ok: true, firstName });
}
