/**
 * ============================================================================
 * COMPONENTE: FORMULÁRIO DE CAPTURA DE LEADS, CÁLCULO & QUALIFICADOR
 * Arquivo: src/components/ContactSection.tsx
 * ============================================================================
 * LÓGICA E FLUXO DO ARQUIVO:
 * 1. Captura Nome, Telefone/WhatsApp, E-mail, Tipo de Serviço (Residencial/Comercial),
 *    Serviços selecionados (via menu ou checkboxes) e Descrição do Problema.
 * 2. Calcula em tempo real a estimativa aproximada de mão de obra.
 * 3. Ao enviar, chama `enviarLeadAppsScript()` (de `src/utils/analytics.ts`),
 *    que dispara um POST (`fetch`) para a URL do Google Apps Script
 *    (`import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL`), enviando 2 e-mails
 *    (cliente + `eletricistajohnny@gmail.com`) e gravando na planilha.
 *
 * RASTREAMENTO DE VARIÁVEIS (DE ONDE VÊM):
 * - `ELECTRICAL_SERVICES`               -> Vem de `src/config/siteConfig.ts`
 * - `SEO_LOCAL_CONTENT.neighborhoods`   -> Vem de `src/config/siteConfig.ts`
 * - `SITE_CONFIG.ownerEmail`            -> Vem de `src/config/siteConfig.ts` (eletricistajohnny@gmail.com)
 * - `SITE_CONFIG.visitFeeNotice`        -> Vem de `src/config/siteConfig.ts` (taxa R$ 80,00 abatida)
 * - `FEATURE_FLAGS.enableContactSection` -> Vem de `src/config/siteConfig.ts`
 * ============================================================================
 */

import React, { useState, useMemo } from "react";
import confetti from "canvas-confetti";
import {
  Send,
  CheckCircle2,
  Calculator,
  User,
  Phone,
  Mail,
  Building2,
  FileText,
  Plus,
  Minus,
  CheckSquare,
  Square,
  Sparkles,
  Info,
  RefreshCw,
} from "lucide-react";
import {
  SITE_CONFIG,
  FEATURE_FLAGS,
  ELECTRICAL_SERVICES,
  SEO_LOCAL_CONTENT,
  SECTION_ITEMS_CONFIG,
} from "../config/siteConfig";
import {
  enviarLeadAppsScript,
  LeadSubmissionResponse,
  logWhatsAppClick,
} from "../utils/analytics";
import { WhatsAppOfficialIcon } from "./WhatsAppFloating";

interface ContactSectionProps {
  /** Recebido de src/App.tsx: tema escuro ou claro */
  darkMode: boolean;
  /** Recebido de src/App.tsx: abre modal de orçamento */
  onOpenBudgetModal: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ darkMode }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [serviceType, setServiceType] = useState<"Residencial" | "Comercial">("Residencial");
  const [urgency, setUrgency] = useState<
    "Urgente (Hoje/Amanhã)" | "Esta Semana" | "Planejamento"
  >("Esta Semana");
  const [neighborhood, setNeighborhood] = useState("Centro");
  const [problemDescription, setProblemDescription] = useState("");

  // [RASTREIO DE VARIÁVEL]: Inicia com o 1º item de ELECTRICAL_SERVICES (src/config/siteConfig.ts)
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([
    ELECTRICAL_SERVICES[0].id,
  ]);
  const [expandServicesList, setExpandServicesList] = useState(false);
  const [quickDropdownId, setQuickDropdownId] = useState(ELECTRICAL_SERVICES[0].id);

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [result, setResult] = useState<LeadSubmissionResponse | null>(null);

  const toggleServiceId = (id: string) => {
    setSelectedServiceIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectFromDropdown = (id: string) => {
    setQuickDropdownId(id);
    if (!selectedServiceIds.includes(id)) {
      setSelectedServiceIds((prev) => [...prev, id]);
    }
  };

  // [FLUXO DE CÁLCULO]: Soma minPrice e maxPrice dos serviços marcados em ELECTRICAL_SERVICES
  const livePreviewRange = useMemo(() => {
    let min = 0;
    let max = 0;
    selectedServiceIds.forEach((id) => {
      const s = ELECTRICAL_SERVICES.find((item) => item.id === id);
      if (s) {
        min += s.minPrice;
        max += s.maxPrice;
      }
    });
    if (min === 0) {
      min = serviceType === "Comercial" ? 280 : 150;
      max = serviceType === "Comercial" ? 850 : 420;
    }
    return { min, max };
  }, [selectedServiceIds, serviceType]);

  // [RASTREIO DE VARIÁVEL]: Quantidade inicial de caixas definida em SECTION_ITEMS_CONFIG.formCheckboxesInitialCount (src/config/siteConfig.ts)
  const initialCheckboxesCount = Math.max(1, SECTION_ITEMS_CONFIG.formCheckboxesInitialCount);
  const visibleCheckboxes = expandServicesList
    ? ELECTRICAL_SERVICES
    : ELECTRICAL_SERVICES.slice(0, initialCheckboxesCount);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!name.trim() || !phone.trim() || !email.trim()) {
      setErrorMsg("Preencha Nome, Telefone/WhatsApp e E-mail para calcular e enviar.");
      return;
    }

    setSubmitting(true);
    try {
      // [FLUXO]: Envia dados para src/utils/analytics.ts -> Google Apps Script Webhook
      const response = await enviarLeadAppsScript({
        name,
        phone,
        email,
        serviceType,
        selectedServiceIds,
        urgency,
        neighborhood,
        problemDescription,
      });

      setResult(response);
      try {
        confetti({ particleCount: 55, spread: 60, origin: { y: 0.7 } });
      } catch {
        // Ignora caso o navegador bloqueie animação de canvas
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleSendResultToWhatsApp = () => {
    if (!result) return;
    const msg = [
      `Olá *${SITE_CONFIG.companyName}* (${SITE_CONFIG.professionalName})!`,
      `Acabei de gerar meu pré-orçamento no site (Protocolo *${result.protocol}*).`,
      ``,
      `👤 *Nome:* ${name}`,
      `🏢 *Atendimento:* ${serviceType} (${neighborhood})`,
      `⚡ *Serviços:* ${result.selectedServicesNames.join(" | ")}`,
      problemDescription ? `📝 *Descrição do Problema:* ${problemDescription}` : "",
      `💰 *Estimativa Calculada no Site:* R$ ${result.estimatedMin} a R$ ${result.estimatedMax}`,
      `✅ Ciente de que o valor final será confirmado pessoalmente na vistoria (${SITE_CONFIG.visitFeeFormatted} abatidos no fechamento).`,
    ]
      .filter(Boolean)
      .join("\n");

    logWhatsAppClick("form_sucesso_whatsapp", msg);
  };

  // [RASTREIO DE VARIÁVEL]: Vem de src/config/siteConfig.ts -> FEATURE_FLAGS.enableContactSection
  if (!FEATURE_FLAGS.enableContactSection) return null;

  return (
    <section
      id="contato"
      className={`py-14 sm:py-20 border-t transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-b from-[#060A14] via-slate-900 to-[#060A14] border-slate-800 text-slate-100"
          : "bg-gradient-to-b from-amber-50/40 via-white to-slate-50 border-slate-200 text-slate-900"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-500 border border-amber-500/30 mb-2.5">
            <Calculator className="w-3.5 h-3.5" />
            <span>Orçamento Rápido Online</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl tracking-tight">
            Calcule Seu <span className="text-amber-500">Orçamento Aproximado</span>
          </h2>
          <p
            className={`mt-2 text-xs sm:text-sm ${
              darkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Escolha o serviço elétrico desejado para ver a estimativa na hora e receber no seu
            e-mail.
          </p>
        </div>

        {result ? (
          /* TELA DE CONFIRMAÇÃO COM VALOR APROXIMADO E AVISO DE VISTORIA PESSOAL */
          <div
            className={`rounded-3xl p-6 sm:p-8 border-2 shadow-2xl space-y-5 ${
              darkMode
                ? "bg-slate-900 border-emerald-500/50"
                : "bg-white border-emerald-500"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-500/20">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-mono-tech uppercase text-emerald-500 font-bold">
                    Protocolo {result.protocol}
                  </span>
                  <h3 className="font-display font-extrabold text-lg sm:text-xl">
                    Solicitação Enviada com Sucesso, {name}!
                  </h3>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setResult(null)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-500/30 text-xs font-semibold cursor-pointer self-start sm:self-auto"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Novo Cálculo
              </button>
            </div>

            <div
              className={`p-5 rounded-2xl border-2 text-center ${
                darkMode
                  ? "bg-[#060A14] border-amber-500/50"
                  : "bg-amber-50/70 border-amber-400"
              }`}
            >
              <span className="text-xs font-mono-tech uppercase text-amber-500 font-bold">
                Valor Aproximado de Mão de Obra Estimado
              </span>
              <p className="font-display font-extrabold text-3xl sm:text-4xl text-amber-500 mt-1">
                R$ {result.estimatedMin.toLocaleString("pt-BR")} a R${" "}
                {result.estimatedMax.toLocaleString("pt-BR")}
              </p>
              <p className="mt-2 text-xs sm:text-sm font-medium">
                Este é um valor aproximado preliminar.{" "}
                <strong className="underline decoration-amber-500">
                  Pessoalmente, no local, o {SITE_CONFIG.professionalName} dará o valor final exato.
                </strong>
              </p>
            </div>

            {/* [RASTREIO DE VARIÁVEL]: SITE_CONFIG.ownerEmail e SITE_CONFIG.visitFeeNotice */}
            <div
              className={`p-4 rounded-2xl border flex items-start gap-2.5 text-xs leading-relaxed ${
                darkMode
                  ? "bg-slate-950 border-slate-800 text-slate-300"
                  : "bg-slate-50 border-slate-200 text-slate-700"
              }`}
            >
              <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <strong>Confirmação de E-mails & Visita Técnica:</strong> Os dados foram enviados
                para <strong>{email}</strong> e para <strong>{SITE_CONFIG.ownerEmail}</strong>.{" "}
                {SITE_CONFIG.visitFeeNotice}
              </div>
            </div>

            <button
              type="button"
              onClick={handleSendResultToWhatsApp}
              className={`w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-display font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-600/25 cursor-pointer ${
                FEATURE_FLAGS.enableShimmerCta ? "btn-shimmer" : ""
              }`}
            >
              <WhatsAppOfficialIcon className="w-6 h-6" />
              <span>Confirmar no WhatsApp</span>
            </button>
          </div>
        ) : (
          /* FORMULÁRIO DE CAPTURA DE LEADS RESPONSIVO */
          <form
            onSubmit={handleSubmit}
            className={`rounded-3xl p-5 sm:p-8 border shadow-xl space-y-5 ${
              darkMode
                ? "bg-slate-900/90 border-slate-800"
                : "bg-white border-slate-200 shadow-slate-900/5"
            }`}
          >
            {/* Linha 1: Nome, Telefone/WhatsApp e E-mail */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className="block text-xs font-bold mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-amber-500" />
                  Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Seu nome"
                  className={`w-full rounded-xl px-3.5 py-2.5 text-sm border focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    darkMode
                      ? "bg-[#060A14] border-slate-800 text-white"
                      : "bg-slate-50 border-slate-300 text-slate-900"
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-amber-500" />
                  Telefone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(42) 99999-9999"
                  className={`w-full rounded-xl px-3.5 py-2.5 text-sm border focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    darkMode
                      ? "bg-[#060A14] border-slate-800 text-white"
                      : "bg-slate-50 border-slate-300 text-slate-900"
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-500" />
                  Seu E-mail *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="voce@email.com"
                  className={`w-full rounded-xl px-3.5 py-2.5 text-sm border focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    darkMode
                      ? "bg-[#060A14] border-slate-800 text-white"
                      : "bg-slate-50 border-slate-300 text-slate-900"
                  }`}
                />
              </div>
            </div>

            {/* Linha 2: Tipo de Serviço (Residencial / Comercial), Bairro e Urgência */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className="block text-xs font-bold mb-1 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-amber-500" />
                  Tipo de Serviço *
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {(["Residencial", "Comercial"] as const).map((tipo) => (
                    <button
                      key={tipo}
                      type="button"
                      onClick={() => setServiceType(tipo)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-display font-bold border transition-all cursor-pointer ${
                        serviceType === tipo
                          ? "bg-amber-500 text-slate-950 border-amber-400"
                          : darkMode
                          ? "bg-[#060A14] border-slate-800 text-slate-300"
                          : "bg-slate-50 border-slate-300 text-slate-700"
                      }`}
                    >
                      {tipo}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Bairro em Ponta Grossa</label>
                {/* [RASTREIO DE VARIÁVEL]: SEO_LOCAL_CONTENT.neighborhoods (src/config/siteConfig.ts) */}
                <select
                  value={neighborhood}
                  onChange={(e) => setNeighborhood(e.target.value)}
                  className={`w-full rounded-xl px-3 py-2.5 text-sm border focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    darkMode
                      ? "bg-[#060A14] border-slate-800 text-white"
                      : "bg-slate-50 border-slate-300 text-slate-900"
                  }`}
                >
                  {SEO_LOCAL_CONTENT.neighborhoods.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Urgência</label>
                <select
                  value={urgency}
                  onChange={(e) =>
                    setUrgency(
                      e.target.value as
                        | "Urgente (Hoje/Amanhã)"
                        | "Esta Semana"
                        | "Planejamento"
                    )
                  }
                  className={`w-full rounded-xl px-3 py-2.5 text-sm border focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                    darkMode
                      ? "bg-[#060A14] border-slate-800 text-white"
                      : "bg-slate-50 border-slate-300 text-slate-900"
                  }`}
                >
                  <option value="Urgente (Hoje/Amanhã)">Urgente (Curto / Queda)</option>
                  <option value="Esta Semana">Normal (Esta Semana)</option>
                  <option value="Planejamento">Planejamento Elétrico</option>
                </select>
              </div>
            </div>

            {/* Linha 3: Menu de Seleção Rápida + Caixas de Marcação */}
            <div
              className={`p-4 rounded-2xl border space-y-3 ${
                darkMode
                  ? "bg-[#060A14]/90 border-slate-800"
                  : "bg-slate-50 border-slate-200"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="text-xs font-bold uppercase tracking-wider text-amber-500">
                  Escolha o Serviço no Menu ou Marque nas Caixas:
                </label>
                <span className="text-xs font-mono-tech text-emerald-500 font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Prévia: R$ {livePreviewRange.min} – R$ {livePreviewRange.max}
                </span>
              </div>

              {/* [RASTREIO DE VARIÁVEL]: ELECTRICAL_SERVICES (src/config/siteConfig.ts) */}
              <select
                value={quickDropdownId}
                onChange={(e) => handleSelectFromDropdown(e.target.value)}
                className={`w-full rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium border focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  darkMode
                    ? "bg-slate-900 border-slate-700 text-white"
                    : "bg-white border-slate-300 text-slate-900"
                }`}
              >
                {ELECTRICAL_SERVICES.map((svc) => (
                  <option key={svc.id} value={svc.id}>
                    {svc.name} (R$ {svc.minPrice} a R$ {svc.maxPrice})
                  </option>
                ))}
              </select>

              <div className="space-y-2 pt-1">
                {visibleCheckboxes.map((svc) => {
                  const checked = selectedServiceIds.includes(svc.id);
                  return (
                    <div
                      key={svc.id}
                      onClick={() => toggleServiceId(svc.id)}
                      className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                        checked
                          ? darkMode
                            ? "bg-amber-500/15 border-amber-500/50"
                            : "bg-amber-50 border-amber-400"
                          : darkMode
                          ? "bg-slate-900/60 border-slate-800"
                          : "bg-white border-slate-200"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium">
                        {checked ? (
                          <CheckSquare className="w-4 h-4 text-amber-500 shrink-0" />
                        ) : (
                          <Square className="w-4 h-4 opacity-50 shrink-0" />
                        )}
                        <span>{svc.name}</span>
                      </div>
                      <span className="text-[11px] font-mono-tech text-amber-500 font-bold shrink-0">
                        R$ {svc.minPrice}–{svc.maxPrice}
                      </span>
                    </div>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setExpandServicesList((prev) => !prev)}
                className="inline-flex items-center gap-1.5 text-xs font-display font-bold text-amber-500 hover:underline cursor-pointer"
              >
                {expandServicesList ? (
                  <>
                    <Minus className="w-3.5 h-3.5" />
                    <span>Recolher lista de serviços</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    <span>Ver mais serviços para marcar</span>
                  </>
                )}
              </button>
            </div>

            {/* Linha 4: Descrição do Problema */}
            <div>
              <label className="block text-xs font-bold mb-1 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-500" />
                Descrição do Problema ou Instalação Desejada
              </label>
              <textarea
                rows={3}
                value={problemDescription}
                onChange={(e) => setProblemDescription(e.target.value)}
                placeholder="Descreva brevemente (ex: disjuntor desarmando, curto-circuito, reforma de quadro QDC, instalação de LED em marcenaria...)"
                className={`w-full rounded-xl p-3.5 text-xs sm:text-sm border focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                  darkMode
                    ? "bg-[#060A14] border-slate-800 text-white placeholder:text-slate-500"
                    : "bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400"
                }`}
              />
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/40 text-red-400 text-xs font-semibold">
                {errorMsg}
              </div>
            )}

            {/* Botão Cintilante de Envio */}
            <button
              type="submit"
              disabled={submitting}
              className={`w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-display font-extrabold text-sm sm:text-base shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2.5 cursor-pointer transition-all ${
                FEATURE_FLAGS.enableShimmerCta ? "btn-shimmer" : ""
              }`}
            >
              <Send className="w-5 h-5" />
              <span>
                {submitting
                  ? "Calculando e Enviando..."
                  : "Calcular Valor Aproximado & Enviar por E-mail"}
              </span>
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
