/**
 * ============================================================================
 * COMPONENTE: PÁGINA DEDICADA DO BLOG TÉCNICO (?page=blog)
 * Arquivo: src/components/BlogStandalonePage.tsx
 * ============================================================================
 * LÓGICA E FLUXO DO ARQUIVO:
 * 1. Renderiza quando a URL possui `?page=blog` (aberto em uma nova aba).
 * 2. Permite ler os artigos completos de elétrica e clicar para simular
 *    orçamento ou chamar no WhatsApp.
 *
 * RASTREAMENTO DE VARIÁVEIS (DE ONDE VÊM):
 * - `BLOG_ARTICLES` -> Vem de `src/config/siteConfig.ts`
 * - `SITE_CONFIG`   -> Vem de `src/config/siteConfig.ts`
 * ============================================================================
 */

import React, { useState } from "react";
import {
  BookOpen,
  ArrowLeft,
  CheckCircle2,
  Calculator,
  Clock,
} from "lucide-react";
import { BLOG_ARTICLES, BlogArticle, SITE_CONFIG } from "../config/siteConfig";
import { logWhatsAppClick } from "../utils/analytics";
import { WhatsAppOfficialIcon } from "./WhatsAppFloating";

interface BlogStandalonePageProps {
  darkMode: boolean;
  initialSlug?: string | null;
  onReturnToHome: () => void;
  onOpenBudgetModal: (initialData?: { projectTitle?: string }) => void;
}

export const BlogStandalonePage: React.FC<BlogStandalonePageProps> = ({
  darkMode,
  initialSlug,
  onReturnToHome,
  onOpenBudgetModal,
}) => {
  // [RASTREIO DE VARIÁVEL]: Busca artigo em BLOG_ARTICLES (src/config/siteConfig.ts)
  const found = BLOG_ARTICLES.find((a) => a.slug === initialSlug) || BLOG_ARTICLES[0];
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle>(found);

  return (
    <div
      className={`pt-24 pb-20 min-h-screen transition-colors duration-300 ${
        darkMode ? "bg-[#060A14] text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Topo da Página do Blog */}
        <div
          className={`rounded-3xl p-6 sm:p-8 border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
            darkMode
              ? "bg-slate-900 border-amber-500/30"
              : "bg-white border-amber-300 shadow-sm"
          }`}
        >
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950 mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              Blog Técnico • {SITE_CONFIG.companyName}
            </span>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl">
              Dicas de Engenharia & Segurança Elétrica em {SITE_CONFIG.city}
            </h1>
          </div>

          <button
            type="button"
            onClick={onReturnToHome}
            className="inline-flex items-center gap-2 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-display font-bold text-xs cursor-pointer self-start sm:self-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Site Principal
          </button>
        </div>

        {/* Seletor de Artigos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {BLOG_ARTICLES.map((art) => {
            const active = art.slug === selectedArticle.slug;
            return (
              <button
                key={art.slug}
                type="button"
                onClick={() => setSelectedArticle(art)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  active
                    ? darkMode
                      ? "bg-amber-500/15 border-amber-500"
                      : "bg-amber-50 border-amber-500"
                    : darkMode
                    ? "bg-slate-900/70 border-slate-800 hover:border-slate-700"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <span className="text-[10px] font-mono-tech uppercase text-amber-500 font-bold block">
                  {art.category}
                </span>
                <p className="font-display font-bold text-xs sm:text-sm line-clamp-2 mt-1">
                  {art.title}
                </p>
              </button>
            );
          })}
        </div>

        {/* Leitura do Artigo */}
        <article
          className={`rounded-3xl overflow-hidden border shadow-xl ${
            darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
          }`}
        >
          <div className="relative aspect-[16/8] max-h-[380px] w-full bg-slate-950 overflow-hidden">
            <img
              src={selectedArticle.image}
              onError={(e) => {
                e.currentTarget.src = selectedArticle.fallbackImage;
              }}
              alt={selectedArticle.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <div className="flex items-center gap-3 text-xs text-amber-300 mb-1">
                <span>{selectedArticle.category}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {selectedArticle.readTime}
                </span>
              </div>
              <h2 className="font-display font-extrabold text-xl sm:text-3xl">
                {selectedArticle.title}
              </h2>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-5">
            {selectedArticle.content.map((paragraph, idx) => (
              <p
                key={idx}
                className={`text-sm sm:text-base leading-relaxed ${
                  darkMode ? "text-slate-300" : "text-slate-700"
                }`}
              >
                {paragraph}
              </p>
            ))}

            <div
              className={`p-5 rounded-2xl border space-y-2 ${
                darkMode
                  ? "bg-[#060A14] border-slate-800"
                  : "bg-amber-50/60 border-amber-200"
              }`}
            >
              <p className="font-display font-bold text-xs uppercase tracking-wider text-amber-500">
                Checklist de Segurança J&amp;J Elétrica:
              </p>
              {selectedArticle.checklist.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={() =>
                  onOpenBudgetModal({ projectTitle: selectedArticle.title })
                }
                className="w-full sm:w-auto py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-display font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer btn-shimmer"
              >
                <Calculator className="w-4 h-4" />
                Simular Orçamento para Este Serviço
              </button>

              <button
                type="button"
                onClick={() =>
                  logWhatsAppClick(
                    `blog_artigo_${selectedArticle.slug}`,
                    `Olá Johnny! Li seu artigo "${selectedArticle.title}" no Blog da J&J Elétrica e gostaria de um orçamento.`
                  )
                }
                className="w-full sm:w-auto py-3 px-5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-display font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <WhatsAppOfficialIcon className="w-5 h-5" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
