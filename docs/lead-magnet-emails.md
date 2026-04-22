# Lead magnet — roteiro das 5 aulas

Documento de trabalho para escrever/revisar o conteúdo final dos 5 emails da série
enviada pela página `/gratuito`. O conteúdo canônico vive em
`lib/gratuito/content.ts` — este arquivo é só rascunho.

## Fluxo

- Inscrição → aula 1 sai imediata (~1 min) via Resend.
- Aulas 2–5 agendadas com `scheduledAt` em +24h, +48h, +72h e +96h.
- Cada email tem: saudação, título, intro curta, 3 bullets, botão com link do vídeo.

## Arco narrativo

A série vai do diagnóstico ("por que você não evoluiu, mesmo treinando") até o
convite pro método completo. Cada aula é um mecanismo que explica um travamento
específico de quem trabalha sentada.

## Aulas

### Aula 1 · Por que você é sedentária mesmo treinando
- **Mecanismo**: sedentarismo disfarçado. Mesmo treinando 1h/dia, 10h sentada afetam metabolismo, sensibilidade à insulina e resposta ao treino.
- **Objetivo**: quebrar a premissa de que treino resolve tudo. Abrir a cabeça pra o resto da série.
- **Link do vídeo**: TODO.

### Aula 2 · Iliopsoas: o músculo que trava sua perna
- **Mecanismo**: iliopsoas encurtado por postura sentada → compensação na lombar, agachamento ruim, perna que não cresce proporcional.
- **Protocolo**: 3 exercícios pra fazer antes do treino de perna ou ao acordar.
- **Link do vídeo**: TODO.

### Aula 3 · Recomposição corporal pra quem vive sentada
- **Mecanismo**: gasto calórico, sensibilidade à insulina e distribuição de gordura diferentes em pessoas sedentárias. Calculadoras padrão erram pra mais.
- **Ajustes**: déficit calórico ajustado ao contexto + mentalidade de longo prazo.
- **Link do vídeo**: TODO.

### Aula 4 · Core real vs. abdômen de Instagram
- **Mecanismo**: core como sistema de estabilização profundo (transverso, multífidos, assoalho pélvico), não como "six-pack". Em pessoa sentada, esse sistema fica inativo.
- **Protocolo**: ativação de 7 min antes do treino ou no intervalo.
- **Link do vídeo**: TODO.

### Aula 5 · O método que conecta tudo + CTA
- **Mecanismo**: integração — como mobilidade, força e rotina formam um sistema.
- **CTA final**: convite pra conhecer o método completo (plano pago).
- **Link do vídeo**: TODO.

## Variáveis de personalização

- `{{firstName}}` — primeiro nome do lead, interpolado no subject e saudação.

## Itens pendentes antes de divulgar o link

- [ ] Gravar vídeo de apresentação e subir como unlisted no YouTube → atualizar `VIDEO_YOUTUBE_ID` em `app/gratuito/content.ts`.
- [ ] Gravar os 5 vídeos de aula e substituir os `href="#"` em `lib/gratuito/content.ts`.
- [ ] Verificar domínio próprio no Resend (`aulas@coreupteam.com.br`) — sem isso, os emails só chegam no email dono da conta Resend.
- [ ] Definir `LEAD_MAGNET_FROM_EMAIL` no Vercel.
- [ ] Atualizar Apps Script com a nova aba `LeadsGratuito` (arquivo `docs/apps-script-leads.gs` já está pronto — recolar no Apps Script e republicar).
