export type GratuitoPayload = {
  nome: string;
  email: string;
  instagram: string;
  whatsapp: string;
};

export type ParseResult =
  | { ok: true; data: GratuitoPayload }
  | { ok: false; error: string };

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeInstagram(raw: string): string {
  const value = raw.replace(/^@+/, "").replace(/\s+/g, "");
  if (!value) return "";
  try {
    const asUrl = new URL(value);
    if (asUrl.hostname.includes("instagram.com")) {
      return asUrl.pathname.replace(/\/+/g, "").trim();
    }
  } catch {}
  return value;
}

export function parseGratuitoPayload(raw: unknown): ParseResult {
  if (!raw || typeof raw !== "object") {
    return { ok: false, error: "Payload inválido" };
  }

  const src = raw as Record<string, unknown>;

  const nome = str(src.nome);
  const email = str(src.email).toLowerCase();
  const instagram = normalizeInstagram(str(src.instagram));
  const whatsapp = str(src.whatsapp);

  if (!nome) return { ok: false, error: "Nome é obrigatório" };
  if (nome.length > 120) return { ok: false, error: "Nome muito longo" };
  if (!email || !emailRe.test(email))
    return { ok: false, error: "Email inválido" };
  if (!instagram) return { ok: false, error: "Instagram é obrigatório" };
  if (instagram.length > 60) return { ok: false, error: "Instagram inválido" };

  return {
    ok: true,
    data: { nome, email, instagram, whatsapp },
  };
}
