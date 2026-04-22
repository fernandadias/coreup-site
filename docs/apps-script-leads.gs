/**
 * CoreUP Leads — Google Apps Script
 *
 * Como usar:
 * 1. Crie uma planilha nova no Google Drive ("CoreUP Leads").
 * 2. No menu: Extensões → Apps Script.
 * 3. Apague o código de exemplo e cole este arquivo inteiro.
 * 4. Troque o valor de SECRET_TOKEN abaixo por uma senha qualquer
 *    (ex: "coreup-2026-xyz-secreto") — lembre de usar a MESMA string
 *    na variável SHEETS_WEBHOOK_TOKEN do .env.local do site.
 * 5. Salvar. Depois: Implantar → Nova implantação → Tipo: App da Web.
 *    - Executar como: eu mesma
 *    - Quem tem acesso: Qualquer pessoa
 *    - Clicar "Implantar" → copiar a URL (termina em /exec)
 *    - Colar essa URL na variável SHEETS_WEBHOOK_URL do .env.local do site.
 * 6. Testar: envie o formulário — deve aparecer uma linha nova na aba "Leads".
 *
 * Se precisar atualizar o script: Implantar → Gerenciar implantações → editar → Nova versão.
 *
 * Este script mantém duas abas:
 *  - "Leads": diagnóstico completo (formulário da home).
 *  - "LeadsGratuito": inscrições do lead magnet /gratuito.
 * A aba é escolhida pelo campo body.kind ("gratuito" → LeadsGratuito, senão → Leads).
 */

const SECRET_TOKEN = "TROQUE_POR_UM_TOKEN_SECRETO";

const DIAGNOSTICO_COLUMNS = [
  "Recebido em",
  "Nome",
  "Idade",
  "Email",
  "WhatsApp",
  "Plano de interesse",
  "Rotina de trabalho",
  "Treina hoje",
  "Atividades",
  "Objetivo",
  "Como conheceu",
  "O que te trouxe aqui",
];

const GRATUITO_COLUMNS = [
  "Recebido em",
  "Nome",
  "Email",
  "Instagram",
  "WhatsApp",
  "Resend IDs",
  "User-Agent",
  "IP",
];

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);

    if (body.token !== SECRET_TOKEN) {
      return ContentService.createTextOutput(
        JSON.stringify({ ok: false, error: "unauthorized" }),
      ).setMimeType(ContentService.MimeType.JSON);
    }

    if (body.kind === "gratuito") {
      appendGratuito(body);
    } else {
      appendDiagnostico(body);
    }

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true }),
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) }),
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function appendDiagnostico(body) {
  const sheet = getOrCreateSheet("Leads", DIAGNOSTICO_COLUMNS);
  sheet.appendRow([
    body.at || new Date().toISOString(),
    body.nome || "",
    body.idade || "",
    body.email || "",
    body.whatsapp || "",
    body.plano || "",
    body.rotina_trabalho || "",
    body.treina_hoje || "",
    body.atividades || "",
    body.objetivo || "",
    body.origem || "",
    body.motivo || "",
  ]);
}

function appendGratuito(body) {
  const sheet = getOrCreateSheet("LeadsGratuito", GRATUITO_COLUMNS);
  sheet.appendRow([
    body.at || new Date().toISOString(),
    body.nome || "",
    body.email || "",
    body.instagram || "",
    body.whatsapp || "",
    body.resend_ids || "",
    body.user_agent || "",
    body.ip || "",
  ]);
}

function getOrCreateSheet(name, columns) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(columns);
    sheet.getRange(1, 1, 1, columns.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}
