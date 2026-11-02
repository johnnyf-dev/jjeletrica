/**
 * ============================================================================
 * COMPONENTE: CARROSSEL DE DESTAQUES (CLICOU ABRIU HERO 80%, CLICOU FECHOU)
 * Arquivo: src/components/PortfolioCarousel.tsx
 * ============================================================================
 * LÓGICA E FLUXO DO ARQUIVO:
 * 1. Exibe 1 trabalho elétrico de destaque por vez com setas de navegação no pé.
 * 2. Quando o visitante clica no card/foto, dispara `onSelectProject(currentProject)`
 *    que abre o modal `ProjectModal.tsx` ocupando 80% da tela.
 *
 * RASTREAMENTO DE VARIÁVEIS (DE ONDE VÊM):
 * - `PROJECTS_DATA`                       -> Vem de `src/config/siteConfig.ts`
 * - `FEATURE_FLAGS.enablePortfolioCarousel` -> Vem de `src/config/siteConfig.ts`
 * ============================================================================
 */

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, MapPin, Sparkles } from "lucide-react";
import { PROJECTS_DATA, ProjectItem, FEATURE_FLAGS } from "../config/siteConfig";

interface PortfolioCarouselProps {
  /** Recebido de src/App.tsx: tema escuro ou claro */
  darkMode: boolean;
  /** Recebido de src/App.tsx: abre a foto clicada em 80% da tela (ProjectModal) */
  onSelectProject: (project: ProjectItem) => void;
}

export const PortfolioCarousel: React.FC<PortfolioCarouselProps> = ({
  darkMode,
  onSelectProject,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // [RASTREIO DE VARIÁVEL]: Vem de src/config/siteConfig.ts -> FEATURE_FLAGS.enablePortfolioCarousel
  if (!FEATURE_FLAGS.enablePortfolioCarousel || PROJECTS_DATA.length === 0) {
    return null;
  }

  // [RASTREIO DE VARIÁVEL]: Seleciona o item atual da lista PROJECTS_DATA (src/config/siteConfig.ts)
  const currentProject = PROJECTS_DATA[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % PROJECTS_DATA.length);
  };

  return (
    <section
      id="destaques"
      className={`py-14 sm:py-20 border-t transition-colors duration-300 ${
        darkMode
          ? "bg-[#060A14] border-slate-800/80 text-slate-100"
          : "bg-slate-100/70 border-slate-200 text-slate-900"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TÍTULO CENTRALIZADO */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-500 border border-amber-500/30 mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Destaques Reais em Ponta Grossa</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl tracking-tight">
            Padrão de Execução <span className="text-amber-500">J&amp;J Elétrica</span>
          </h2>
          <p
            className={`mt-2 text-xs sm:text-sm ${
              darkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            Toque na foto para ampliar os detalhes da instalação elétrica em 80% da tela.
          </p>
        </div>

        {/* CARD DE DESTAQUE (CLICOU ABRIU 80%) */}
        <div
          onClick={() => onSelectProject(currentProject)}
          className={`group rounded-3xl overflow-hidden border shadow-xl cursor-pointer transition-all ${
            darkMode
              ? "bg-slate-900/90 border-slate-800 hover:border-amber-500/40"
              : "bg-white border-slate-200 hover:border-amber-400"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 items-center">
            <div className="md:col-span-7 relative aspect-[16/10] bg-slate-950 overflow-hidden">
              {/* [RASTREIO DE VARIÁVEL]: currentProject.image com proteção onError */}
              <img
                src={currentProject.image}
                onError={(e) => {
                  e.currentTarget.src = currentProject.fallbackImage;
                }}
                alt={currentProject.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

              <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950">
                {currentProject.category}
              </span>

              <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-950/80 text-amber-300 border border-amber-400/30 backdrop-blur-md">
                <Maximize2 className="w-3.5 h-3.5" />
                Ampliar
              </span>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-200">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {currentProject.location}
                </span>
              </div>
            </div>

            <div className="md:col-span-5 p-6 sm:p-7 space-y-3">
              <span className="text-xs font-mono-tech uppercase tracking-wider text-amber-500 font-bold">
                {currentProject.badge}
              </span>
              <h3 className="font-display font-extrabold text-lg sm:text-xl leading-snug">
                {currentProject.title}
              </h3>
              <p
                className={`text-xs sm:text-sm leading-relaxed ${
                  darkMode ? "text-slate-300" : "text-slate-600"
                }`}
              >
                {currentProject.summary}
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-display font-bold text-amber-500 group-hover:underline">
                  <Maximize2 className="w-3.5 h-3.5" />
                  Ampliar foto na tela
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SETAS E MINIATURAS NO PÉ DO CARROSSEL */}
        <div className="mt-5 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Destaque anterior"
            className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border font-display font-bold text-xs transition-all cursor-pointer ${
              darkMode
                ? "bg-slate-900 border-slate-800 text-slate-200 hover:border-amber-500"
                : "bg-white border-slate-300 text-slate-800 hover:bg-amber-50"
            }`}
          >
            <ChevronLeft className="w-4 h-4 text-amber-500" />
            <span>Anterior</span>
          </button>

          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {PROJECTS_DATA.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Ver ${item.title}`}
                className={`w-11 h-8 rounded-lg overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                  idx === currentIndex
                    ? "border-amber-500 scale-110"
                    : "border-transparent opacity-50 hover:opacity-90"
                }`}
              >
                <img
                  src={item.image}
                  onError={(e) => {
                    e.currentTarget.src = item.fallbackImage;
                  }}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Próximo destaque"
            className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border font-display font-bold text-xs transition-all cursor-pointer ${
              darkMode
                ? "bg-slate-900 border-slate-800 text-slate-200 hover:border-amber-500"
                : "bg-white border-slate-300 text-slate-800 hover:bg-amber-50"
            }`}
          >
            <span>Próximo</span>
            <ChevronRight className="w-4 h-4 text-amber-500" />
          </button>
        </div>
      </div>
    </section>
  );
};
