export type LessonContent = {
  day: number;
  subject: string;
  preheader: string;
  title: string;
  intro: string;
  bullets: string[];
  cta: string;
};

// Arco das 5 aulas — do diagnóstico ("por que você não evoluiu") à solução.
// Use {{firstName}} no subject/intro pra personalização.
// TODO(Fernanda): gravar os vídeos e trocar # pelos links reais em cada aula.
export const LESSONS: LessonContent[] = [
  {
    day: 1,
    subject: "{{firstName}}, você é sedentária mesmo treinando",
    preheader:
      "E é por isso que o shape não muda — mesmo com treino em dia.",
    title: "Aula 1 · Por que você é sedentária mesmo treinando",
    intro:
      "Começa por aqui porque sem esse entendimento, nada do resto faz sentido. Quem passa 8, 10 horas sentada é classificada como sedentária — mesmo indo na academia todo dia. A ciência chama isso de \"sedentarismo disfarçado\", e ele afeta diretamente sua capacidade de ganhar massa, recompor corpo e responder ao treino. Nessa aula eu te mostro por quê.",
    bullets: [
      "Por que 1 hora de treino não compensa 10 horas sentada",
      "O que acontece com seu metabolismo quando você para de se mexer",
      "Como isso trava seu ganho de massa e sua perda de gordura",
    ],
    cta: "Assistir a aula 1",
  },
  {
    day: 2,
    subject: "O músculo que trava sua perna (aula 2)",
    preheader:
      "Iliopsoas encurtado = agachamento travado, perna que não cresce.",
    title: "Aula 2 · Iliopsoas: o músculo que trava sua perna inteira",
    intro:
      "Se seu agachamento não desce direito, se a perna não cresce na proporção do braço, se você sente a lombar antes de sentir o glúteo — provavelmente seu iliopsoas tá encurtado. É o músculo mais afetado por quem passa o dia sentada. Nessa aula eu te ensino um protocolo curto pra fazer antes do treino (ou logo que acordar) que destrava sua perna inteira.",
    bullets: [
      "Anatomia rápida: o que é iliopsoas e por que ele encurta",
      "3 exercícios pra fazer antes do treino de perna",
      "Como incluir isso na sua rotina sem virar mais uma obrigação",
    ],
    cta: "Assistir a aula 2",
  },
  {
    day: 3,
    subject: "Aula 3: recomposição corporal é outro jogo pra você",
    preheader:
      "Por que seu corpo responde diferente de quem não trabalha sentada.",
    title: "Aula 3 · Recomposição corporal pra quem vive sentada",
    intro:
      "Você já percebeu que a dieta que funciona pra outras pessoas não responde igual em você? Não é impressão. Quem passa o dia sentada tem gasto energético, sensibilidade à insulina e distribuição de gordura diferentes. Nessa aula eu te explico por que e o que ajustar na dieta e na mentalidade pra recomposição corporal funcionar de verdade.",
    bullets: [
      "Por que seu gasto calórico é menor do que a calculadora diz",
      "O erro que quase toda pessoa sentada faz no déficit calórico",
      "Ajustes de mentalidade pra sustentar o processo a longo prazo",
    ],
    cta: "Assistir a aula 3",
  },
  {
    day: 4,
    subject: "Aula 4: core de verdade (não é abdômen)",
    preheader:
      "A diferença entre treinar abdômen e construir o core que sustenta tudo.",
    title: "Aula 4 · Core real vs. abdômen de Instagram",
    intro:
      "Core não é abdômen. Core é o sistema que estabiliza sua coluna, transfere força entre membros e decide o quanto você aguenta em qualquer levantamento. Quem fica sentada o dia todo tem esse sistema dormindo — e isso limita TUDO: postura, performance, progressão de carga, dor lombar. Nessa aula você ativa o core de verdade em 7 minutos.",
    bullets: [
      "Por que prancha sozinha não resolve",
      "Protocolo de ativação pra fazer todo dia (antes do treino ou no intervalo)",
      "Como isso se conecta com glúteo, postura e dor lombar",
    ],
    cta: "Assistir a aula 4",
  },
  {
    day: 5,
    subject: "Aula final: como conectar tudo, {{firstName}}",
    preheader:
      "O método que junta mobilidade, força e estilo de vida num sistema só.",
    title: "Aula 5 · O método que conecta tudo",
    intro:
      "Você viu os mecanismos isolados: por que trava, onde trava, o que destrava. Nessa última aula eu te mostro como isso vira um sistema que cabe na sua agenda — e te explico como é o método completo do CoreUP Team pra quem decide levar a sério. Sem pressão: se não for o momento, as 4 aulas anteriores já te dão muita direção.",
    bullets: [
      "A lógica de organizar mobilidade + força + rotina num sistema só",
      "Como adaptar isso à sua semana real (não à semana ideal)",
      "Convite pra conhecer o método completo, se fizer sentido pra você",
    ],
    cta: "Assistir a aula 5",
  },
];

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function interpolate(str: string, vars: Record<string, string>): string {
  return str.replace(/\{\{(\w+)\}\}/g, (_, key) => vars[key] ?? "");
}

export function buildLessonEmail(
  lesson: LessonContent,
  firstName: string,
): { subject: string; html: string; text: string } {
  const vars = { firstName };
  const subject = interpolate(lesson.subject, vars);
  const intro = interpolate(lesson.intro, vars);
  const greeting = firstName ? `Oi, ${escapeHtml(firstName)}!` : "Oi!";

  const bulletsHtml = lesson.bullets
    .map(
      (b) =>
        `<li style="margin:0 0 8px;color:#374151;font-size:15px;line-height:1.6;">${escapeHtml(b)}</li>`,
    )
    .join("");

  const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>${escapeHtml(subject)}</title></head>
<body style="margin:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="display:none;overflow:hidden;line-height:1;opacity:0;max-height:0;max-width:0;">${escapeHtml(lesson.preheader)}</div>
  <div style="max-width:560px;margin:0 auto;padding:32px 16px;">
    <div style="background:#fff;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;">
      <div style="background:#09090B;color:#BDEE63;padding:22px 28px;font-size:13px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;">
        Aula ${lesson.day} de 5 · CoreUP Team
      </div>
      <div style="padding:28px;">
        <p style="margin:0 0 8px;color:#6b7280;font-size:14px;">${greeting}</p>
        <h1 style="margin:0 0 16px;font-size:24px;color:#111827;line-height:1.25;">${escapeHtml(lesson.title)}</h1>
        <p style="margin:0 0 20px;color:#374151;font-size:15px;line-height:1.6;">${escapeHtml(intro)}</p>
        <ul style="margin:0 0 24px;padding-left:20px;">${bulletsHtml}</ul>
        <!-- TODO: substituir # pelo link do vídeo da aula ${lesson.day} -->
        <p style="margin:0;">
          <a href="#" style="display:inline-block;background:#BDEE63;color:#09090B;padding:12px 20px;border-radius:999px;text-decoration:none;font-size:14px;font-weight:600;">${escapeHtml(lesson.cta)}</a>
        </p>
        <p style="margin:28px 0 0;color:#374151;font-size:14px;line-height:1.6;">
          Nos vemos ${lesson.day < 5 ? "amanhã" : "em breve"},<br>
          <strong>Fernanda · CoreUP Team</strong>
        </p>
      </div>
    </div>
    <p style="text-align:center;color:#9ca3af;font-size:12px;margin-top:16px;">
      Você recebeu esse email porque se inscreveu nas 5 aulas gratuitas do CoreUP Team.
    </p>
  </div>
</body></html>`;

  const text = `${greeting}\n\n${lesson.title}\n\n${intro}\n\n${lesson.bullets.map((b) => `• ${b}`).join("\n")}\n\n${lesson.cta}: (link em breve)\n\nFernanda · CoreUP Team`;

  return { subject, html, text };
}
