/**
 * ============================================================================
 * COMPONENTE: DEPOIMENTOS DO GOOGLE (QUANTIDADE INICIAL CONFIGURÁVEL)
 * Arquivo: src/components/Testimonials.tsx
 * ============================================================================
 * LÓGICA E FLUXO DO ARQUIVO:
 * 1. Exibe o selo 5.0 no Google Meu Negócio e o botão "Avaliar no Google"
 *    (desativado por padrão via `FEATURE_FLAGS.enableGoogleReviewButton = false`).
 * 2. Exibe inicialmente a quantidade definida em `SECTION_ITEMS_CONFIG.testimonialsInitialCount`.
 * ============================================================================
 */

import React, { useState } from "react";
import { Star, Plus, Minus, CheckCircle2, Lock, ExternalLink, MapPin } from "lucide-react";
import {
  TESTIMONIALS_DATA,
  SITE_CONFIG,
  FEATURE_FLAGS,
  SECTION_ITEMS_CONFIG,
} from "../config/siteConfig";

interface TestimonialsProps {
  darkMode: boolean;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ darkMode }) => {
  const [expanded, setExpanded] = useState(false);

  if (!FEATURE_FLAGS.enableTestimonialsSection) return null;

  // [RASTREIO DE VARIÁVEL]: Quantidade inicial definida em SECTION_ITEMS_CONFIG.testimonialsInitialCount (src/config/siteConfig.ts)
  const initialCount = Math.max(1, SECTION_ITEMS_CONFIG.testimonialsInitialCount);
  const visibleReviews = expanded
    ? TESTIMONIALS_DATA
    : TESTIMONIALS_DATA.slice(0, initialCount);

  return (
    <section
      id="depoimentos"
      className={`py-14 sm:py-20 border-t transition-colors duration-300 ${
        darkMode
          ? "bg-slate-900/50 border-slate-800 text-slate-100"
          : "bg-slate-100/80 border-slate-200 text-slate-900"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho Google Meu Negócio */}
        <div
          className={`rounded-3xl p-5 sm:p-6 border mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
            darkMode
              ? "bg-[#060A14] border-slate-800"
              : "bg-white border-slate-200 shadow-xs"
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shrink-0">
              <svg className="w-7 h-7" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96z"
                />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-xl sm:text-2xl">5.0</span>
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-xs opacity-75">
                Avaliações de Clientes no Google • {SITE_CONFIG.city}/{SITE_CONFIG.state}
              </p>
            </div>
          </div>

          {FEATURE_FLAGS.enableGoogleReviewButton ? (
            <a
              href={SITE_CONFIG.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-display font-bold text-xs transition-all"
            >
              <Star className="w-3.5 h-3.5 fill-slate-950" />
              <span>Avaliar no Google</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          ) : (
            <button
              type="button"
              disabled
              aria-disabled="true"
              className={`inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border font-display font-bold text-xs opacity-60 cursor-not-allowed ${
                darkMode
                  ? "bg-slate-900 border-slate-800 text-slate-400"
                  : "bg-slate-100 border-slate-300 text-slate-500"
              }`}
            >
              <Lock className="w-3.5 h-3.5 text-amber-500" />
              <span>Avaliar no Google</span>
            </button>
          )}
        </div>

        {/* Lista de Depoimentos */}
        <div
          className={`grid gap-5 ${
            expanded || initialCount > 1
              ? "grid-cols-1 md:grid-cols-2"
              : "grid-cols-1 max-w-2xl mx-auto"
          }`}
        >
          {visibleReviews.map((rev) => (
            <article
              key={rev.id}
              className={`rounded-3xl p-6 border flex flex-col justify-between transition-all ${
                darkMode
                  ? "bg-[#060A14] border-slate-800"
                  : "bg-white border-slate-200 shadow-xs"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 text-slate-950 font-display font-extrabold text-sm flex items-center justify-center">
                      {rev.initials}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-sm">{rev.name}</h3>
                      <span className="text-[11px] opacity-65 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-amber-500" />
                        {rev.neighborhood}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-amber-500/15 text-amber-500 mb-2.5">
                  {rev.service}
                </span>

                <p
                  className={`text-xs sm:text-sm leading-relaxed ${
                    darkMode ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  “{rev.text}”
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-500/15 flex items-center justify-between text-[11px] text-emerald-500 font-semibold">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Cliente Verificado em PG
                </span>
                <span className="opacity-70">{rev.dateLabel}</span>
              </div>
            </article>
          ))}
        </div>

        {/* Botão de Expansão */}
        {TESTIMONIALS_DATA.length > initialCount && (
          <div className="mt-7 text-center">
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl border font-display font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                darkMode
                  ? "bg-slate-900 border-amber-500/40 text-amber-400 hover:bg-amber-500 hover:text-slate-950"
                  : "bg-white border-amber-300 text-amber-900 hover:bg-amber-500 hover:text-slate-950"
              }`}
            >
              {expanded ? (
                <>
                  <Minus className="w-4 h-4" />
                  <span>Recolher avaliações</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Ver mais avaliações</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
