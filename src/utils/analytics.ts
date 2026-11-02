/**
 * ============================================================================
 * MÓDULO: ANALYTICS CENTRAL, EVENTOS DE SEO (GA4/GTM), LOGS & QUALIFICADOR
 * Arquivo: src/utils/analytics.ts
 * ============================================================================
 * LÓGICA E FLUXO DO ARQUIVO:
 * 1. `definirAppsScriptURL(url)`: Define o endereço do Webhook do Google Apps Script.
 * 2. `logVisita()` e `logSessao60s()`: Chamados no `src/App.tsx` ao abrir o site
 *    para registrar acessos, visitantes recorrentes e permanência > 60 segundos.
 * 3. `logWhatsAppClick(origem, msg)`: Chamado por todos os botões de WhatsApp,
 *    disparando evento de SEO (GA4/GTM + Planilha) e abrindo o número 55429998455688.
 * 4. `enviarLeadAppsScript(input)`: Chamado pelos formulários (`ContactSection.tsx`
 *    e `ContactModal.tsx`). Calcula o valor aproximado, pontua o Lead (0 a 100)
 *    e faz o POST (`fetch`) para o Google Apps Script disparar os 2 e-mails.
 *
 * RASTREAMENTO DE VARIÁVEIS (DE ONDE VÊM):
 * - `SITE_CONFIG.appsScriptUrl`     -> Vem de `src/config/siteConfig.ts` (ou `.env` VITE_GOOGLE_APPS_SCRIPT_URL)
 * - `SITE_CONFIG.whatsappNumber`    -> Vem de `src/config/siteConfig.ts` (55429998455688)
 * - `SITE_CONFIG.ownerEmail`        -> Vem de `src/config/siteConfig.ts` (eletricistajohnny@gmail.com)
 * - `SITE_CONFIG.accessCounterBase` -> Vem de `src/config/siteConfig.ts` (base do contador do rodapé)
 * - `ELECTRICAL_SERVICES`           -> Vem de `src/config/siteConfig.ts` (tabela de preços e pesos)
 * ============================================================================
 */

import { SITE_CONFIG, ELECTRICAL_SERVICES } from "../config/siteConfig";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

// [RASTREIO DE VARIÁVEL]: Inicializa com SITE_CONFIG.appsScriptUrl vindo de src/config/siteConfig.ts
let activeAppsScriptUrl: string = SITE_CONFIG.appsScriptUrl || "";

const STORAGE_VISIT_COUNT_KEY = "jj_eletrica_total_visits";
const STORAGE_VISITOR_ID_KEY = "jj_eletrica_visitor_id";

/**
 * Define a URL do Webhook do Google Apps Script (chamada em src/App.tsx)
 */
export function definirAppsScriptURL(url?: string): void {
  if (url && url.trim() !== "") {
    activeAppsScriptUrl = url.trim();
  }
}

/**
 * Dispara eventos de SEO para Google Analytics 4 (gtag) e Google Tag Manager (dataLayer)
 */
export function dispararEventoGA4eGTM(
  eventName: string,
  params: Record<string, unknown> = {}
): void {
  try {
    if (typeof window !== "undefined") {
      if (typeof window.gtag === "function") {
        window.gtag("event", eventName, {
          ...params,
          business_name: SITE_CONFIG.companyName,
          city: SITE_CONFIG.city,
        });
      }
      if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push({
          event: eventName,
          ...params,
          business_name: SITE_CONFIG.companyName,
          city: SITE_CONFIG.city,
        });
      }
    }
  } catch {
    // Nunca bloqueia a execução caso GA4/GTM não estejam configurados
  }
}

/**
 * Envia log assíncrono via POST (fetch) para o Google Apps Script (Planilha de Logs e Eventos)
 */
function postLogToAppsScript(payload: Record<string, unknown>): void {
  const targetUrl = activeAppsScriptUrl || SITE_CONFIG.appsScriptUrl;
  if (!targetUrl || targetUrl.trim() === "") return;

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const enrichedPayload = {
      action: "log_event",
      timestamp: new Date().toLocaleString("pt-BR"),
      pageUrl: window.location.href,
      referrer: document.referrer || "Acesso Direto / Google Meu Negócio",
      utmSource: urlParams.get("utm_source") || "organico_gmn",
      utmMedium: urlParams.get("utm_medium") || "site_estatico",
      utmCampaign: urlParams.get("utm_campaign") || "ponta_grossa_25anos",
      deviceType: window.innerWidth < 768 ? "Mobile" : "Desktop",
      ...payload,
    };

    fetch(targetUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enrichedPayload),
    }).catch(() => {
      // Falha silenciosa em background
    });
  } catch {
    // Ignora erro de rede
  }
}

/**
 * Registra visita inicial, identifica visitante único vs recorrente e atualiza contador do rodapé
 */
export function logVisita(): { totalVisits: number; isReturning: boolean } {
  let isReturning = false;
  // [RASTREIO DE VARIÁVEL]: SITE_CONFIG.accessCounterBase vindo de src/config/siteConfig.ts
  let totalVisits = SITE_CONFIG.accessCounterBase;

  try {
    const existingVisitorId = localStorage.getItem(STORAGE_VISITOR_ID_KEY);
    if (existingVisitorId) {
      isReturning = true;
    } else {
      localStorage.setItem(
        STORAGE_VISITOR_ID_KEY,
        `JJV-${Date.now()}-${Math.floor(100 + Math.random() * 899)}`
      );
    }

    const savedCount = parseInt(localStorage.getItem(STORAGE_VISIT_COUNT_KEY) || "0", 10);
    totalVisits = (savedCount > 0 ? savedCount : SITE_CONFIG.accessCounterBase) + 1;
    localStorage.setItem(STORAGE_VISIT_COUNT_KEY, String(totalVisits));
  } catch {
    // Ignora caso localStorage esteja restrito
  }

  dispararEventoGA4eGTM("seo_page_view", {
    visitor_type: isReturning ? "recorrente" : "novo",
    total_visits: totalVisits,
  });

  postLogToAppsScript({
    eventType: "seo_page_view",
    label: isReturning ? "Visita Recorrente" : "Novo Visitante Único",
    details: `Contador Rodapé: ${totalVisits}`,
  });

  return { totalVisits, isReturning };
}

/**
 * Retorna o valor atual do contador de acessos para o componente Footer.tsx
 */
export function obterContadorAcessos(): number {
  try {
    const saved = parseInt(localStorage.getItem(STORAGE_VISIT_COUNT_KEY) || "0", 10);
    return saved > 0 ? saved : SITE_CONFIG.accessCounterBase + 1;
  } catch {
    return SITE_CONFIG.accessCounterBase + 1;
  }
}

/**
 * Registra permanência superior a 60 segundos na página (chamada em src/App.tsx)
 */
export function logSessao60s(): void {
  dispararEventoGA4eGTM("engaged_session_60s", {
    engagement_time_msec: 60000,
  });

  postLogToAppsScript({
    eventType: "engaged_session_60s",
    label: "Permanência > 60 Segundos (Engajamento Alto)",
    details: "Visitante permaneceu mais de 1 minuto analisando serviços elétricos",
  });
}

/**
 * Registra abertura de formulário ou modal de orçamento
 */
export function logFormOpen(origem: string): void {
  dispararEventoGA4eGTM("form_open", {
    form_origin: origem,
  });

  postLogToAppsScript({
    eventType: "form_open",
    label: `Abriu Formulário (${origem})`,
    details: `Interesse em orçamento elétrico`,
  });
}

/**
 * Registra clique/inspeção de trabalho elétrico do portfólio (Hero 80%)
 */
export function logPortfolio(projectIdentifier: string): void {
  dispararEventoGA4eGTM("view_portfolio_item", {
    item_id: projectIdentifier,
  });

  postLogToAppsScript({
    eventType: "portfolio_click",
    label: `Ampliou Trabalho Elétrico: ${projectIdentifier}`,
    details: `Visualização no modal 80%`,
  });
}

/**
 * Registra clique em qualquer botão de WhatsApp e abre o número oficial (SITE_CONFIG.whatsappNumber)
 */
export function logWhatsAppClick(origem: string, customMessage?: string): void {
  // [RASTREIO DE VARIÁVEL]: SITE_CONFIG.whatsappDefaultMsg e SITE_CONFIG.whatsappNumber (src/config/siteConfig.ts)
  const message = customMessage || SITE_CONFIG.whatsappDefaultMsg;

  dispararEventoGA4eGTM("whatsapp_click", {
    button_origin: origem,
    whatsapp_number: SITE_CONFIG.whatsappNumber,
  });

  postLogToAppsScript({
    eventType: "cta_whatsapp_click",
    label: `Clique WhatsApp (${origem})`,
    details: `Destino: ${SITE_CONFIG.whatsappNumber} | Msg: ${message.slice(0, 80)}`,
  });

  const url = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
  window.open(url, "_blank", "noopener,noreferrer");
}

/**
 * Registra abertura da nova página do Blog Técnico
 */
export function logBlogOpen(articleSlug?: string): void {
  dispararEventoGA4eGTM("blog_open", {
    article_slug: articleSlug || "index",
  });

  postLogToAppsScript({
    eventType: "blog_page_open",
    label: articleSlug ? `Abriu Artigo: ${articleSlug}` : "Abriu Nova Página do Blog",
    details: "Leitura de conteúdo técnico SEO",
  });
}

// ============================================================================
// QUALIFICADOR DE LEADS & DISPARO DO FORMULÁRIO PARA GOOGLE APPS SCRIPT
// ============================================================================
export interface LeadSubmissionInput {
  name: string;
  phone: string;
  email: string;
  serviceType: "Residencial" | "Comercial";
  selectedServiceIds: string[];
  urgency: "Urgente (Hoje/Amanhã)" | "Esta Semana" | "Planejamento";
  neighborhood: string;
  problemDescription: string;
}

export interface LeadSubmissionResponse {
  protocol: string;
  estimatedMin: number;
  estimatedMax: number;
  leadScore: number;
  leadTier: "QUENTE 🔥 (Prioridade Máxima)" | "MORNO ⚡ (Oportunidade Qualificada)" | "INICIAL 🌱";
  selectedServicesNames: string[];
  webhookDispatched: boolean;
}

export async function enviarLeadAppsScript(
  input: LeadSubmissionInput
): Promise<LeadSubmissionResponse> {
  // 1. Calcula faixa aproximada com base nos serviços escolhidos em ELECTRICAL_SERVICES
  let estimatedMin = 0;
  let estimatedMax = 0;
  let serviceScore = 0;
  const selectedServicesNames: string[] = [];

  input.selectedServiceIds.forEach((id) => {
    const svc = ELECTRICAL_SERVICES.find((s) => s.id === id);
    if (svc) {
      estimatedMin += svc.minPrice;
      estimatedMax += svc.maxPrice;
      serviceScore += svc.scoreWeight;
      selectedServicesNames.push(`${svc.name} (R$ ${svc.minPrice} - R$ ${svc.maxPrice})`);
    }
  });

  if (selectedServicesNames.length === 0) {
    estimatedMin = input.serviceType === "Comercial" ? 280 : 150;
    estimatedMax = input.serviceType === "Comercial" ? 850 : 420;
    serviceScore = 15;
    selectedServicesNames.push(`Atendimento ${input.serviceType} personalizado`);
  }

  // 2. Qualificador de Leads (0 a 100 pontos)
  let score = Math.min(40, serviceScore);
  if (input.serviceType === "Comercial") score += 15;
  else score += 10;

  if (input.urgency === "Urgente (Hoje/Amanhã)") score += 25;
  else if (input.urgency === "Esta Semana") score += 15;
  else score += 8;

  if (input.problemDescription.trim().length > 12) score += 10;
  if (input.email.includes("@") && input.phone.trim().length >= 8) score += 10;

  const leadScore = Math.min(100, Math.max(20, score));
  const leadTier =
    leadScore >= 75
      ? "QUENTE 🔥 (Prioridade Máxima)"
      : leadScore >= 50
      ? "MORNO ⚡ (Oportunidade Qualificada)"
      : "INICIAL 🌱";

  const protocol = `JJ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  // 3. Dispara evento de conversão para Google Analytics 4 / Tag Manager
  dispararEventoGA4eGTM("generate_lead", {
    protocol,
    service_type: input.serviceType,
    lead_score: leadScore,
    lead_tier: leadTier,
    value: estimatedMin,
    currency: "BRL",
  });

  // 4. Monta payload para o Webhook do Google Apps Script (2 e-mails + Planilha)
  const payload = {
    action: "submit_qualified_lead",
    protocol,
    name: input.name.trim(),
    phone: input.phone.trim(),
    email: input.email.trim(), // E-mail 1: Cliente cadastrado
    ownerEmail: SITE_CONFIG.ownerEmail, // E-mail 2: eletricistajohnny@gmail.com
    whatsappTarget: SITE_CONFIG.whatsappNumber, // 55429998455688
    neighborhood: input.neighborhood,
    propertyType: input.serviceType,
    urgency: input.urgency,
    selectedServicesText: selectedServicesNames.join(" | "),
    notes: input.problemDescription.trim() || "Sem descrição adicional",
    estimatedMin,
    estimatedMax,
    leadScore,
    leadTier,
    visitFeePolicy: SITE_CONFIG.visitFeeFormatted,
    createdAt: new Date().toISOString(),
  };

  let webhookDispatched = false;
  const targetUrl = activeAppsScriptUrl || SITE_CONFIG.appsScriptUrl;

  if (targetUrl && targetUrl.trim() !== "") {
    try {
      await fetch(targetUrl, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      webhookDispatched = true;
    } catch {
      webhookDispatched = false;
    }
  } else {
    await new Promise((r) => setTimeout(r, 450));
  }

  return {
    protocol,
    estimatedMin,
    estimatedMax,
    leadScore,
    leadTier,
    selectedServicesNames,
    webhookDispatched,
  };
}
