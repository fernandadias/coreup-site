# TODO — CoreUP Team

Coisas que faltam pra landing page ficar 100% funcional e no ar.

---

## 1. Ativar o formulário de diagnóstico (integrações externas)

O código já tá pronto. Falta só plugar as chaves e URLs.

### 1.1. Criar conta no Resend (envio de email) · ~5 min
- [ ] Criar conta em https://resend.com (pode logar com Google).
- [ ] Ir em **Settings → API Keys → Create API Key** (nome: "CoreUP Site").
- [ ] Copiar a key (começa com `re_...`).

### 1.2. Criar Google Sheet + Apps Script (onde os leads serão salvos) · ~10 min
- [ ] Criar planilha nova no Google Drive com o nome **"CoreUP Leads"**.
- [ ] Menu **Extensões → Apps Script**.
- [ ] Apagar o código de exemplo que aparece.
- [ ] Abrir o arquivo [docs/apps-script-leads.gs](docs/apps-script-leads.gs) no projeto e **copiar tudo** → colar no Apps Script.
- [ ] Trocar `SECRET_TOKEN` (linha 22) por uma senha qualquer, ex: `coreup-2026-abc-xyz`. **Anotar essa senha**, vai usar de novo no passo 1.3.
- [ ] Salvar (Ctrl+S / Cmd+S).
- [ ] **Implantar → Nova implantação**
  - Tipo: **App da Web**
  - Executar como: **eu mesma**
  - Quem tem acesso: **Qualquer pessoa**
  - Clicar **Implantar** → autorizar → **copiar a URL** (termina em `/exec`).

### 1.3. Criar o arquivo `.env.local` na raiz do projeto
- [ ] Copiar o [.env.example](.env.example) para um arquivo novo chamado `.env.local`.
- [ ] Preencher com os valores reais:
  ```
  RESEND_API_KEY=re_... (do passo 1.1)
  LEAD_NOTIFY_EMAIL=fernanda.gracas@stone.com.br   (ou o email que vai receber a notificação)
  LEAD_FROM_EMAIL=CoreUP Team <onboarding@resend.dev>   (não mexer por enquanto)
  SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/.../exec   (do passo 1.2)
  SHEETS_WEBHOOK_TOKEN=coreup-2026-abc-xyz   (a mesma senha que você colocou no Apps Script)
  NEXT_PUBLIC_WHATSAPP_NUMBER=5511999999999   (seu WhatsApp, só dígitos, com 55 na frente)
  ```

### 1.4. Testar
- [ ] Rodar `npm run dev`.
- [ ] Abrir http://localhost:3000, preencher o formulário com seus dados reais.
- [ ] Enviar.
- [ ] Esperado:
  - Browser redireciona para `/obrigado?nome=...`
  - Chega um email com assunto `🔥 Novo diagnóstico — <seu nome>` no email do `LEAD_NOTIFY_EMAIL`
  - Nova linha aparece na planilha "CoreUP Leads" (aba Leads)
  - O botão "Falar com a Fernanda no WhatsApp" na tela de obrigado abre o WhatsApp com mensagem pré-preenchida

### 1.5. Se algo falhar
- Email não chega: checar se a `RESEND_API_KEY` está certa e se o `LEAD_NOTIFY_EMAIL` é o mesmo email do dono da conta Resend (limitação enquanto não tem domínio próprio).
- Sheets não recebe: conferir se a URL do Apps Script termina em `/exec` e se o `SHEETS_WEBHOOK_TOKEN` é idêntico ao `SECRET_TOKEN` do script.
- Terminal do `npm run dev` mostra os logs de erro.

---

## 2. Comprar domínio próprio (quando puder)

Desbloqueia o email automático de boas-vindas pra pessoa que preencheu o formulário (hoje só a Fernanda é notificada).

- [ ] Comprar `coreupteam.com.br` em https://registro.br (~R$ 40/ano).
- [ ] No Resend: **Domains → Add Domain** → adicionar `coreupteam.com.br` → copiar os registros DNS (SPF, DKIM, MX).
- [ ] No Registro.br: painel do domínio → configurar DNS → colar os registros.
- [ ] Aguardar verificação no Resend (10 min a 24h).
- [ ] Avisar o Claude pra: trocar `LEAD_FROM_EMAIL` no `.env.local` pra `Fernanda · CoreUP <contato@coreupteam.com.br>` e descomentar o bloco `sendWelcome` em [app/api/lead/route.ts](app/api/lead/route.ts).
- [ ] Testar de novo.

---

## 3. Deploy

- [x] Criar conta na Vercel logando com Github.
- [x] Subir o projeto pro repositório https://github.com/fernandadias/coreup-site.
- [x] Vercel → importar o repo e fazer o primeiro deploy.
- [ ] Adicionar as variáveis do `.env.local` em **Vercel → Settings → Environment Variables** (incluindo as novas do lead magnet — ver seção 4).
- [ ] Quando tiver o domínio próprio: **Settings → Domains** → adicionar `coreupteam.com.br` e seguir as instruções de DNS.

---

## 4. Lead magnet `/gratuito` (5 aulas gratuitas por email)

A página `/gratuito`, a API e a série de 5 emails já estão codadas. Falta só gravar os vídeos e plugar o resto.

### 4.1. Gravar os vídeos
- [ ] Gravar o vídeo de apresentação da página (uns 60s, formato vertical ou horizontal, explicando o que são as 5 aulas e pra quem é).
- [ ] Subir no YouTube como **Não listado** → copiar o ID (aquela string depois de `v=` na URL, ex: `dQw4w9WgXcQ`).
- [ ] Trocar a constante `VIDEO_YOUTUBE_ID` em [app/gratuito/content.ts](app/gratuito/content.ts) pelo ID real.
- [ ] Gravar os 5 vídeos das aulas (menos de 10 min cada, arco descrito em [docs/lead-magnet-emails.md](docs/lead-magnet-emails.md)).
- [ ] Subir cada um como **Não listado** no YouTube e pegar a URL completa.
- [ ] Em [lib/gratuito/content.ts](lib/gratuito/content.ts), trocar os `href="#"` do botão CTA de cada aula pelo link real do vídeo correspondente.

### 4.2. Atualizar o Apps Script com a nova aba
O script foi alterado pra salvar inscrições gratuitas numa aba separada `LeadsGratuito`. Precisa republicar:
- [ ] Abrir o Apps Script da planilha "CoreUP Leads".
- [ ] Apagar o código antigo e colar o conteúdo atualizado de [docs/apps-script-leads.gs](docs/apps-script-leads.gs).
- [ ] **Implantar → Gerenciar implantações → editar (ícone de lápis) → Nova versão → Implantar.**
- [ ] Testar: inscrever um email fake na `/gratuito` local e conferir se uma linha nova aparece na aba `LeadsGratuito`.

### 4.3. Configurar o remetente dos emails da série
- [ ] No `.env.local` (e depois na Vercel), adicionar:
  ```
  LEAD_MAGNET_FROM_EMAIL=
  ```
  Pode deixar vazio por enquanto — vai cair no `LEAD_FROM_EMAIL` padrão (`onboarding@resend.dev`). Depois que o domínio próprio estiver verificado no Resend (passo 2), trocar por algo como `Fernanda · CoreUP <aulas@coreupteam.com.br>`.

### 4.4. Limitação importante do Resend enquanto o domínio não está verificado
Com `onboarding@resend.dev`, o Resend **só entrega pros emails verificados na conta** (no caso, o email dono da conta). Pra lead magnet funcionar pra público frio, **a verificação de domínio (seção 2) é pré-requisito**. Fluxo recomendado:
1. Resolver a seção 2 (comprar domínio + verificar no Resend).
2. Voltar aqui, trocar `LEAD_MAGNET_FROM_EMAIL`.
3. Aí sim divulgar o link `coreupteam.com.br/gratuito` na bio do Instagram.

### 4.5. Testar end-to-end (antes de divulgar)
- [ ] Rodar `npm run dev`, acessar `/gratuito`.
- [ ] Preencher o formulário com um email de teste (que seja o dono da conta Resend enquanto o domínio não está verificado).
- [ ] Conferir:
  - Aula 1 chega no email em até ~2 min.
  - Dashboard do Resend (https://resend.com/emails) mostra 5 disparos, sendo 4 com status `scheduled` pros próximos 4 dias.
  - Linha nova na aba `LeadsGratuito` com os IDs do Resend preenchidos.
  - Email de notificação chega pra Fernanda com o assunto `🎁 Nova inscrição nas 5 aulas — <nome>`.
  - A UI troca o formulário pelo painel de sucesso, e o botão do WhatsApp abre a conversa com mensagem pré-preenchida.

### 4.6. Polimento visual da página (antes de divulgar)
A página hoje está com um layout base funcional. Antes de mandar pra bio do Instagram, dá pra enriquecer visualmente:
- [ ] Adicionar mockup de iPhone mostrando como uma das aulas chega no email ou no app (referência visual: [components/AppShowcase.tsx](components/AppShowcase.tsx) já tem um padrão parecido).
- [ ] Outras peças visuais/ilustrações que a Fernanda queira incluir (prova social, bastidores, screenshots de resultado etc.).
- [ ] Revisar hierarquia visual no mobile depois de inserir esses elementos.

### 4.7. Adicionar as variáveis no Vercel
Mesmo checklist da seção 1.3, mas no painel da Vercel (**Settings → Environment Variables**), escopo **Production** + **Preview**:
- [ ] `RESEND_API_KEY`
- [ ] `LEAD_NOTIFY_EMAIL`
- [ ] `LEAD_FROM_EMAIL`
- [ ] `LEAD_MAGNET_FROM_EMAIL` (pode deixar vazio por enquanto — seção 4.3)
- [ ] `SHEETS_WEBHOOK_URL`
- [ ] `SHEETS_WEBHOOK_TOKEN`
- [ ] `NEXT_PUBLIC_WHATSAPP_NUMBER`
- [ ] Redeploy depois de salvar as variáveis.

---

## 5. Seção "Sobre mim" na home (prioridade média)

A home hoje fala do método e dos resultados, mas não tem uma apresentação curta da Fernanda. Isso ajuda a criar vínculo — principalmente pra quem chegar pela `/gratuito` e voltar pra conhecer o método completo.

- [ ] Escolher 1 ou 2 fotos boas (pode ser tirando na academia, treinando, ou bem produzida).
- [ ] Escrever texto curto (3–5 linhas): formação/credenciais, pra quem o método é, por que esse recorte (pessoas sentadas).
- [ ] Pedir pro Claude criar a seção (ex: `components/About.tsx`), adicionar na [app/page.tsx](app/page.tsx) entre `Story` e `UseCases` ou depois de `UseCases`, e linkar no menu do [Nav](components/Nav.tsx) se fizer sentido.

---

## 6. Coisas opcionais pro futuro

- [ ] Pixel / Google Analytics — só quando fizer sentido rastrear conversão (inclusive evento de inscrição na `/gratuito`).
- [ ] Redes sociais reais no footer — trocar `https://tiktok.com` pelo @ real em [components/Footer.tsx](components/Footer.tsx) e o `mailto:contato@coreupteam.com` pelo email real.
- [ ] WhatsApp automático via Cloud API ou Z-API — só se o volume de leads justificar; precisa WhatsApp Business + template aprovado pela Meta, ou aceitar o risco de API não-oficial.
- [ ] Favicon custom — hoje tá genérico.
- [ ] Imagem real de antes/depois na seção [Story](components/Story.tsx) — se quiser trocar a atual.
- [ ] Unsubscribe link automático nos emails da série (LGPD/boas práticas de longo prazo).
