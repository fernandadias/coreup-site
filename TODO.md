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

## 3. Deploy (quando quiser colocar no ar)

- [ ] Criar conta na Vercel (https://vercel.com) logando com Github.
- [ ] Subir o projeto pra um repositório privado no Github.
- [ ] Vercel → **Add New → Project** → importar o repo.
- [ ] Na hora de configurar, adicionar as mesmas variáveis do `.env.local` em **Settings → Environment Variables**.
- [ ] Deploy. Domínio temporário fica `coreupteam.vercel.app`.
- [ ] Quando tiver o domínio próprio: **Settings → Domains** → adicionar `coreupteam.com.br` e seguir as instruções de DNS.

---

## 4. Coisas opcionais pro futuro

- [ ] Pixel / Google Analytics — só quando fizer sentido rastrear conversão.
- [ ] Redes sociais reais no footer — trocar `https://tiktok.com` pelo @ real em [components/Footer.tsx](components/Footer.tsx) e o `mailto:contato@coreupteam.com` pelo email real.
- [ ] WhatsApp automático via Cloud API — só se o volume de leads justificar; precisa WhatsApp Business + template aprovado pela Meta.
- [ ] Favicon custom — hoje tá genérico.
- [ ] Imagem real de antes/depois na seção [Story](components/Story.tsx) — se quiser trocar a atual.
