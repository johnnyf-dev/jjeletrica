/**
 * ============================================================================
 * GOOGLE APPS SCRIPT (Code.gs) — J&J ELÉTRICA PONTA GROSSA
 * ============================================================================
 * E-MAIL PRINCIPAL CONFIGURADO: eletricistajohnny@gmail.com
 * WHATSAPP OFICIAL CONFIGURADO: 55429998455688
 *
 * O QUE ESTE SCRIPT FAZ AUTOMATICAMENTE NA SUA PLANILHA DO GOOGLE SHEETS:
 * 1. Cria e alimenta 3 Abas na Planilha:
 *    - Aba 1: "Leads_Qualificados" (Orçamentos + Nota do Qualificador 0 a 100)
 *    - Aba 2: "Logs_Cliques_Eventos" (Cliques em WhatsApp, Fotos 80%, Blog, FAQ)
 *    - Aba 3: "SEO_Trafego_UTM" (Visitas, Origem Google Meu Negócio, UTM, Mobile/Desktop)
 *
 * 2. Dispara PELO MENOS 2 E-MAILS a cada orçamento calculado no formulário:
 *    - E-MAIL #1 (Para o Cliente Cadastrado - data.email):
 *      Confirmação de que deu certo + Valor Aproximado Calculado + Aviso de que
 *      pessoalmente o Johnny dará o valor final exato + Taxa de visita R$ 80,00 abatida.
 *    - E-MAIL #2 (Para o E-mail Principal - eletricistajohnny@gmail.com):
 *      Ficha completa do Lead + Score do Qualificador (Quente/Morno/Inicial) +
 *      Link direto para chamar o cliente no WhatsApp.
 * ============================================================================
 */

const EMAIL_PRINCIPAL_JOHNNY = "eletricistajohnny@gmail.com";
const WHATSAPP_OFICIAL_JJ = "55429998455688";
const NOME_EMPRESA = "J&J Elétrica — Ponta Grossa (+25 Anos)";
const TAXA_VISITA_ORCAMENTO = "R$ 80,00 (100% abatida caso feche o serviço)";

function getOrCreateSheet(spreadsheet, sheetName, headers) {
  let sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
  }
  if (sheet.getLastRow() === 0 && headers && headers.length > 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold").setBackground("#f59e0b").setFontColor("#0f172a");
  }
  return sheet;
}

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const data = JSON.parse(e.postData.contents);
    const timestamp = new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

    // ========================================================================
    // CASO 1: REGISTRO DE LOGS DE CLIQUES, EVENTOS E SEO
    // ========================================================================
    if (data.action === "log_event") {
      if (data.eventType === "seo_page_view") {
        const seoSheet = getOrCreateSheet(ss, "SEO_Trafego_UTM", [
          "Data/Hora",
          "ID Evento",
          "Evento",
          "Dispositivo",
          "Origem / Referrer",
          "UTM Source",
          "UTM Medium",
          "UTM Campaign",
          "URL da Página",
          "Detalhes"
        ]);
        seoSheet.appendRow([
          timestamp,
          data.id || "-",
          data.label || "Visualização de Página",
          data.deviceType || "-",
          data.referrer || "-",
          data.utmSource || "-",
          data.utmMedium || "-",
          data.utmCampaign || "-",
          data.pageUrl || "-",
          data.details || "-"
        ]);
      } else {
        const eventsSheet = getOrCreateSheet(ss, "Logs_Cliques_Eventos", [
          "Data/Hora",
          "ID Evento",
          "Tipo de Evento",
          "Ação / Botão Clicado",
          "Detalhes (Serviço / Destino WhatsApp)",
          "Dispositivo",
          "URL da Página",
          "UTM Source"
        ]);
        eventsSheet.appendRow([
          timestamp,
          data.id || "-",
          data.eventType || "-",
          data.label || "-",
          data.details || "-",
          data.deviceType || "-",
          data.pageUrl || "-",
          data.utmSource || "-"
        ]);
      }

      return ContentService.createTextOutput(
        JSON.stringify({ status: "logged", eventType: data.eventType })
      ).setMimeType(ContentService.MimeType.JSON);
    }

    // ========================================================================
    // CASO 2: SUBMISSÃO DE ORÇAMENTO + QUALIFICADOR DE LEADS + 2 E-MAILS
    // ========================================================================
    const leadsSheet = getOrCreateSheet(ss, "Leads_Qualificados", [
      "Data/Hora",
      "Protocolo",
      "Score Qualificador (0-100)",
      "Classificação do Lead",
      "Nome do Cliente",
      "WhatsApp do Cliente",
      "E-mail do Cliente",
      "Bairro (Ponta Grossa)",
      "Tipo de Imóvel",
      "Estágio do Imóvel",
      "Materiais",
      "Urgência",
      "Serviços Selecionados",
      "Observações do Cliente",
      "Valor Mínimo Estimado (R$)",
      "Valor Máximo Estimado (R$)",
      "Motivos da Qualificação",
      "Ciente Taxa Orçamento Presencial"
    ]);

    leadsSheet.appendRow([
      timestamp,
      data.protocol || "-",
      data.leadScore || 0,
      data.leadTier || "Qualificado",
      data.name || "-",
      data.phone || "-",
      data.email || "-",
      data.neighborhood || "-",
      data.propertyType || "-",
      data.installationStage || "-",
      data.materialsReady || "-",
      data.urgency || "-",
      data.selectedServicesText || "-",
      data.notes || "-",
      data.estimatedMin || 0,
      data.estimatedMax || 0,
      data.leadReasons || "-",
      "Sim - " + TAXA_VISITA_ORCAMENTO
    ]);

    // ------------------------------------------------------------------------
    // DISPARO DO E-MAIL #1: PARA O E-MAIL CADASTRADO PELO CLIENTE (data.email)
    // ------------------------------------------------------------------------
    if (data.email && data.email.indexOf("@") !== -1) {
      const subjectCliente = `⚡ Seu Orçamento Preliminar (${data.protocol}) — ${NOME_EMPRESA}`;
      const htmlBodyCliente = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
          <div style="background: #0f172a; color: #f8fafc; padding: 24px; text-align: center;">
            <h2 style="margin: 0; color: #f59e0b;">J&J Elétrica • Ponta Grossa</h2>
            <p style="margin: 6px 0 0; font-size: 14px; color: #cbd5e1;">Iluminando seu sonho com segurança há mais de 25 anos</p>
          </div>
          <div style="padding: 24px; color: #1e293b; line-height: 1.6;">
            <p>Olá, <strong>${data.name}</strong>! Deu tudo certo com sua solicitação (Protocolo <strong>${data.protocol}</strong>).</p>
            <p>Abaixo está o resumo do pré-orçamento calculado com base nos serviços que você selecionou em nosso site:</p>
            
            <div style="background: #fffbeb; border-left: 4px solid #f59e0b; padding: 16px; margin: 20px 0; border-radius: 6px;">
              <p style="margin: 0 0 8px; font-size: 13px; text-transform: uppercase; color: #92400e; font-weight: bold;">
                Valor Aproximado de Mão de Obra Calculado:
              </p>
              <p style="margin: 0; font-size: 24px; font-weight: bold; color: #0f172a;">
                R$ ${data.estimatedMin} a R$ ${data.estimatedMax}
              </p>
              <p style="margin: 8px 0 0; font-size: 13px; color: #78350f;">
                *Importante: Este é um valor aproximado inicial. <strong>Pessoalmente, após vistoria técnica no local, apresentarei o valor final exato.</strong>
              </p>
            </div>

            <h4 style="margin-bottom: 8px; color: #0f172a;">Serviços Selecionados:</h4>
            <p style="background: #f8fafc; padding: 12px; border-radius: 6px; font-size: 14px;">
              ${data.selectedServicesText}
            </p>

            <div style="background: #f1f5f9; padding: 14px; border-radius: 8px; font-size: 13px; color: #334155; margin-top: 16px;">
              <strong>Política de Vistoria Técnica e Orçamento Presencial:</strong><br/>
              Para garantir 100% de segurança segundo a norma NBR 5410, realizamos a avaliação técnica presencial no seu imóvel em Ponta Grossa (${data.neighborhood}). A taxa de visita e orçamento detalhado é de <strong>${TAXA_VISITA_ORCAMENTO}</strong>.
            </div>

            <p style="margin-top: 20px;">
              Se quiser agilizar seu atendimento agora mesmo, clique abaixo para falar direto no meu WhatsApp:<br/>
              <a href="https://wa.me/${WHATSAPP_OFICIAL_JJ}" style="display:inline-block;margin-top:10px;background:#059669;color:#ffffff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:bold;">
                Falar no WhatsApp (42) 99984-55688
              </a>
            </p>
          </div>
        </div>
      `;

      MailApp.sendEmail({
        to: data.email,
        replyTo: EMAIL_PRINCIPAL_JOHNNY,
        subject: subjectCliente,
        htmlBody: htmlBodyCliente
      });
    }

    // ------------------------------------------------------------------------
    // DISPARO DO E-MAIL #2: PARA O E-MAIL PRINCIPAL (eletricistajohnny@gmail.com)
    // ------------------------------------------------------------------------
    const cleanClientPhone = String(data.phone || "").replace(/\D/g, "");
    const subjectJohnny = `🔔 [${data.leadTier || "NOVO LEAD"} | Score ${data.leadScore || 80}/100] ${data.name} - ${data.neighborhood} (R$ ${data.estimatedMin} a R$ ${data.estimatedMax})`;
    const htmlBodyJohnny = `
      <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; border: 2px solid #f59e0b; border-radius: 12px; overflow: hidden;">
        <div style="background: #0f172a; color: #ffffff; padding: 20px;">
          <h2 style="margin: 0; color: #f59e0b;">Novo Lead Qualificado — J&J Elétrica</h2>
          <p style="margin: 5px 0 0; font-size: 13px; color: #cbd5e1;">Protocolo: ${data.protocol} • Data: ${timestamp}</p>
        </div>
        <div style="padding: 20px; color: #1e293b; line-height: 1.5;">
          <div style="background: #ecfdf5; border: 1px solid #10b981; padding: 14px; border-radius: 8px; margin-bottom: 16px;">
            <strong style="color: #065f46; font-size: 16px;">Qualificação: ${data.leadTier} (Score: ${data.leadScore}/100)</strong><br/>
            <span style="font-size: 13px; color: #047857;">Critérios: ${data.leadReasons || "Cálculo completo no site"}</span>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr><td style="padding: 6px 0; font-weight: bold;">Cliente:</td><td>${data.name}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">WhatsApp:</td><td><a href="https://wa.me/55${cleanClientPhone}">${data.phone}</a></td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">E-mail do Cliente:</td><td>${data.email}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">Bairro (PG):</td><td>${data.neighborhood}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">Tipo / Estágio:</td><td>${data.propertyType} • ${data.installationStage || "-"}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">Materiais:</td><td>${data.materialsReady || "-"}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">Urgência:</td><td>${data.urgency}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">Faixa Calculada:</td><td><strong>R$ ${data.estimatedMin} a R$ ${data.estimatedMax}</strong></td></tr>
          </table>

          <h4 style="margin: 16px 0 6px;">Serviços Marcados:</h4>
          <div style="background: #f8fafc; padding: 12px; border-radius: 6px; font-size: 13px;">
            ${data.selectedServicesText}
          </div>

          <h4 style="margin: 16px 0 6px;">Observações do Cliente:</h4>
          <div style="background: #fffbeb; padding: 12px; border-radius: 6px; font-size: 13px;">
            ${data.notes}
          </div>
        </div>
      </div>
    `;

    MailApp.sendEmail({
      to: EMAIL_PRINCIPAL_JOHNNY,
      replyTo: data.email || EMAIL_PRINCIPAL_JOHNNY,
      subject: subjectJohnny,
      htmlBody: htmlBodyJohnny
    });

    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
        protocol: data.protocol,
        emailsSentTo: [data.email, EMAIL_PRINCIPAL_JOHNNY]
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: err.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
