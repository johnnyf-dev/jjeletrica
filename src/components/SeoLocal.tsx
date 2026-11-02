/**
 * ============================================================================
 * COMPONENTE: SEO LOCAL (SERVIÇOS ATENDIDOS + FAQ + BAIRROS DE PONTA GROSSA)
 * Arquivo: src/components/SeoLocal.tsx
 * ============================================================================
 * LÓGICA E FLUXO DO ARQUIVO:
 * 1. Exibe a quantidade inicial de especialidades e perguntas frequentes definida
 *    em `SECTION_ITEMS_CONFIG` (`src/config/siteConfig.ts`).
 * 2. Permite expandir os demais itens clicando em "Ver mais".
 * ============================================================================
 */

import React, { useState } from "react";
import {
  MapPin,
  Zap,
  HelpCircle,
  ChevronDown,
  Plus,
  Minus,
  Sparkles,
} from "lucide-react";
import {
  SEO_LOCAL_CONTENT,
  SITE_CONFIG,
  FEATURE_FLAGS,
  SECTION_ITEMS_CONFIG,
} from "../config/siteConfig";
import { dispararEventoGA4eGTM } from "../utils/analytics";

interface SeoLocalProps {
  darkMode: boolean;
}

export const SeoLocal: React.FC<SeoLocalProps> = ({ darkMode }) => {
  const [expandPillars, setExpandPillars] = useState(false);
  const [expandFaqs, setExpandFaqs] = useState(false);
  const [expandNeighborhoods, setExpandNeighborhoods] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  if (!FEATURE_FLAGS.enableSeoLocalSection) return null;

  // [RASTREIO DE VARIÁVEL]: Quantidades iniciais definidas em SECTION_ITEMS_CONFIG (src/config/siteConfig.ts)
  const initialServicesCount = Math.max(1, SECTION_ITEMS_CONFIG.seoServicesInitialCount);
  const initialFaqCount = Math.max(1, SECTION_ITEMS_CONFIG.faqInitialCount);
  const initialNeighborhoodsCount = Math.max(1, SECTION_ITEMS_CONFIG.neighborhoodsInitialCount);

  const visiblePillars = expandPillars
    ? SEO_LOCAL_CONTENT.servicePillars
    : SEO_LOCAL_CONTENT.servicePillars.slice(0, initialServicesCount);

  const visibleFaqs = expandFaqs
    ? SEO_LOCAL_CONTENT.faqs
    : SEO_LOCAL_CONTENT.faqs.slice(0, initialFaqCount);

  const visibleNeighborhoods = expandNeighborhoods
    ? SEO_LOCAL_CONTENT.neighborhoods
    : SEO_LOCAL_CONTENT.neighborhoods.slice(0, initialNeighborhoodsCount);

  return (
    <section
      id="seo-servicos"
      className={`py-14 sm:py-20 border-t transition-colors duration-300 ${
        darkMode
          ? "bg-[#060A14] border-slate-800 text-slate-100"
          : "bg-white border-slate-200 text-slate-900"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* PARTE 1: SERVIÇOS ELÉTRICOS ATENDIDOS EM PONTA GROSSA */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-500 border border-amber-500/30 mb-2.5">
              <Zap className="w-3.5 h-3.5" />
              <span>Especialidades em {SITE_CONFIG.city} - {SITE_CONFIG.state}</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight">
              {SEO_LOCAL_CONTENT.sectionTitle}
            </h2>
            <p
              className={`mt-2 text-xs sm:text-sm ${
                darkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              {SEO_LOCAL_CONTENT.sectionSubtitle}
            </p>
          </div>

          <div
            className={`grid gap-5 ${
              expandPillars || initialServicesCount > 1
                ? "grid-cols-1 md:grid-cols-2"
                : "grid-cols-1 max-w-2xl mx-auto"
            }`}
          >
            {visiblePillars.map((pillar) => (
              <article
                key={pillar.id}
                className={`p-6 rounded-3xl border transition-all ${
                  darkMode
                    ? "bg-slate-900/80 border-slate-800"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                <span className="text-[11px] font-mono-tech text-amber-500 font-bold block mb-1">
                  {pillar.subtitle}
                </span>
                <h3 className="font-display font-extrabold text-base sm:text-lg">
                  {pillar.title}
                </h3>
                <p
                  className={`mt-2 text-xs sm:text-sm leading-relaxed ${
                    darkMode ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {pillar.description}
                </p>
                <div className="mt-3 pt-3 border-t border-slate-500/15 flex flex-wrap gap-1.5">
                  {pillar.keywords.map((kw, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[10px] font-mono-tech bg-amber-500/10 text-amber-500"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {SEO_LOCAL_CONTENT.servicePillars.length > initialServicesCount && (
            <div className="mt-5 text-center">
              <button
                type="button"
                onClick={() => {
                  setExpandPillars((prev) => !prev);
                  dispararEventoGA4eGTM("seo_pillars_toggle", { expanded: !expandPillars });
                }}
                className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border font-display font-bold text-xs cursor-pointer ${
                  darkMode
                    ? "bg-slate-900 border-amber-500/40 text-amber-400 hover:bg-amber-500 hover:text-slate-950"
                    : "bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-500"
                }`}
              >
                {expandPillars ? (
                  <>
                    <Minus className="w-3.5 h-3.5" />
                    <span>Recolher especialidades</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    <span>Ver mais especialidades elétricas</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* PARTE 2: PERGUNTAS E RESPOSTAS (FAQ) */}
        <div id="faq" className="pt-8 border-t border-slate-500/15 max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-500 border border-amber-500/30 mb-2">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Perguntas e Respostas</span>
            </div>
            <h3 className="font-display font-extrabold text-xl sm:text-2xl">
              Dúvidas sobre <span className="text-amber-500">Orçamento e Atendimento</span>
            </h3>
          </div>

          <div className="space-y-3">
            {visibleFaqs.map((item, idx) => {
              const isOpen = openFaqIdx === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border overflow-hidden ${
                    darkMode
                      ? "bg-slate-900/90 border-slate-800"
                      : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 cursor-pointer"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-display font-bold text-xs sm:text-sm">
                        {item.question}
                      </span>
                      {item.badge && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950">
                          <Sparkles className="w-2.5 h-2.5" />
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-amber-500 shrink-0 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div
                      className={`px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm leading-relaxed border-t ${
                        darkMode
                          ? "border-slate-800 text-slate-300"
                          : "border-slate-200 text-slate-600"
                      }`}
                    >
                      <p className="pt-3">{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {SEO_LOCAL_CONTENT.faqs.length > initialFaqCount && (
            <div className="mt-5 text-center">
              <button
                type="button"
                onClick={() => setExpandFaqs((prev) => !prev)}
                className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border font-display font-bold text-xs cursor-pointer ${
                  darkMode
                    ? "bg-slate-900 border-amber-500/40 text-amber-400 hover:bg-amber-500 hover:text-slate-950"
                    : "bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-500"
                }`}
              >
                {expandFaqs ? (
                  <>
                    <Minus className="w-3.5 h-3.5" />
                    <span>Recolher perguntas</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    <span>Ver mais perguntas frequentes</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* PARTE 3: BAIRROS ATENDIDOS EM PONTA GROSSA */}
        <div
          className={`p-5 rounded-3xl border text-center ${
            darkMode
              ? "bg-slate-900/60 border-slate-800"
              : "bg-slate-50 border-slate-200"
          }`}
        >
          <p className="text-xs font-display font-bold uppercase tracking-wider text-amber-500 mb-3">
            Regiões e Bairros Atendidos em {SITE_CONFIG.city} - {SITE_CONFIG.state}:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {visibleNeighborhoods.map((bairro) => (
              <span
                key={bairro}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs border ${
                  darkMode
                    ? "bg-[#060A14] border-slate-800 text-slate-300"
                    : "bg-white border-slate-200 text-slate-700"
                }`}
              >
                <MapPin className="w-3 h-3 text-amber-500" />
                {bairro}
              </span>
            ))}

            {SEO_LOCAL_CONTENT.neighborhoods.length > initialNeighborhoodsCount && (
              <button
                type="button"
                onClick={() => setExpandNeighborhoods((prev) => !prev)}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/15 text-amber-500 border border-amber-500/30 cursor-pointer"
              >
                {expandNeighborhoods ? "Recolher bairros" : "Ver todos os bairros"}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
