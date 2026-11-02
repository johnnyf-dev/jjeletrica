/**
 * ============================================================================
 * COMPONENTE: GRADE DE PORTFÓLIO ELÉTRICO (QUANTIDADE INICIAL CONFIGURÁVEL)
 * Arquivo: src/components/PortfolioGrid.tsx
 * ============================================================================
 * LÓGICA E FLUXO DO ARQUIVO:
 * 1. Exibe inicialmente a quantidade de trabalhos definida em
 *    `SECTION_ITEMS_CONFIG.portfolioInitialCount` (padrão: `1`).
 * 2. Quando o visitante clica em "Ver mais trabalhos", expande toda a galeria.
 *
 * RASTREAMENTO DE VARIÁVEIS (DE ONDE VÊM -> `src/config/siteConfig.ts`):
 * - `PROJECTS_DATA`                             -> Lista de fotos e especificações
 * - `SECTION_ITEMS_CONFIG.portfolioInitialCount` -> Quantidade inicial mostrada
 * - `LAYOUT_ALIGNMENT_CONFIG.sectionHeadersAlign` -> Alinhamento do cabeçalho
 * - `FEATURE_FLAGS.enablePortfolioGrid`         -> Liga/desliga esta seção
 * ============================================================================
 */

import React, { useState } from "react";
import { Images, Plus, Minus, Maximize2, Calculator, MapPin, CheckCircle2 } from "lucide-react";
import {
  PROJECTS_DATA,
  ProjectItem,
  FEATURE_FLAGS,
  SECTION_ITEMS_CONFIG,
  LAYOUT_ALIGNMENT_CONFIG,
} from "../config/siteConfig";

interface PortfolioGridProps {
  darkMode: boolean;
  onSelectProject: (project: ProjectItem) => void;
  onOpenBudgetModal: () => void;
  onOpenMaintenance?: (title?: string) => void;
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({
  darkMode,
  onSelectProject,
  onOpenBudgetModal,
}) => {
  const [expanded, setExpanded] = useState(false);

  if (!FEATURE_FLAGS.enablePortfolioGrid) return null;

  // [RASTREIO DE VARIÁVEL]: Quantidade inicial definida em SECTION_ITEMS_CONFIG.portfolioInitialCount (src/config/siteConfig.ts)
  const initialCount = Math.max(1, SECTION_ITEMS_CONFIG.portfolioInitialCount);
  const visibleProjects = expanded
    ? PROJECTS_DATA
    : PROJECTS_DATA.slice(0, initialCount);

  const headerAlignClass =
    LAYOUT_ALIGNMENT_CONFIG.sectionHeadersAlign === "left"
      ? "text-left"
      : LAYOUT_ALIGNMENT_CONFIG.sectionHeadersAlign === "right"
      ? "text-right ml-auto"
      : "text-center mx-auto";

  return (
    <section
      id="portfolio"
      className={`py-14 sm:py-20 border-t transition-colors duration-300 ${
        darkMode
          ? "bg-[#060A14] border-slate-800 text-slate-100"
          : "bg-white border-slate-200 text-slate-900"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`max-w-2xl mb-8 ${headerAlignClass}`}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-500 border border-amber-500/30 mb-2.5">
            <Images className="w-3.5 h-3.5" />
            <span>Portfólio de Instalações Elétricas</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-4xl tracking-tight">
            Serviços Executados em <span className="text-amber-500">Ponta Grossa</span>
          </h2>
        </div>

        {/* Grade de Trabalhos Elétricos */}
        <div
          className={`grid gap-6 ${
            expanded || initialCount > 1
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 max-w-2xl mx-auto"
          }`}
        >
          {visibleProjects.map((project) => (
            <article
              key={project.id}
              className={`rounded-3xl overflow-hidden border flex flex-col justify-between transition-all ${
                darkMode
                  ? "bg-slate-900/90 border-slate-800 hover:border-amber-500/40"
                  : "bg-slate-50 border-slate-200 hover:border-amber-400 shadow-sm"
              }`}
            >
              <div>
                <div
                  onClick={() => onSelectProject(project)}
                  className="relative aspect-[16/10] bg-slate-950 overflow-hidden cursor-pointer group"
                >
                  <img
                    src={project.image}
                    onError={(e) => {
                      e.currentTarget.src = project.fallbackImage;
                    }}
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-500 text-slate-950">
                    {project.category}
                  </span>
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-950/80 text-amber-300 border border-amber-500/30">
                    <Maximize2 className="w-3 h-3" /> Ampliar
                  </span>
                  <span className="absolute bottom-3 left-3 text-xs text-slate-200 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    {project.location}
                  </span>
                </div>

                <div className="p-5 space-y-2.5">
                  <span className="text-[11px] font-mono-tech text-amber-500 font-bold">
                    {project.badge} • Faixa: {project.estimatedRange}
                  </span>
                  <h3 className="font-display font-extrabold text-base sm:text-lg leading-snug">
                    {project.title}
                  </h3>
                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      darkMode ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    {project.summary}
                  </p>
                  <ul className="pt-2 space-y-1">
                    {project.specs.slice(0, 2).map((spec, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className={darkMode ? "text-slate-300" : "text-slate-700"}>
                          {spec}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onSelectProject(project)}
                  className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer ${
                    darkMode
                      ? "bg-slate-950 border-slate-800 text-slate-200 hover:border-amber-500"
                      : "bg-white border-slate-300 text-slate-800 hover:bg-slate-100"
                  }`}
                >
                  <Maximize2 className="w-3.5 h-3.5 text-amber-500" />
                  Ver Foto
                </button>
                <button
                  type="button"
                  onClick={onOpenBudgetModal}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-display font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  Orçar Serviço
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Botão de Expansão Limpo */}
        {PROJECTS_DATA.length > initialCount && (
          <div className="mt-7 text-center">
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl border font-display font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                darkMode
                  ? "bg-slate-900 border-amber-500/40 text-amber-400 hover:bg-amber-500 hover:text-slate-950"
                  : "bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-500 hover:text-slate-950"
              }`}
            >
              {expanded ? (
                <>
                  <Minus className="w-4 h-4" />
                  <span>Recolher trabalhos</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Ver mais trabalhos</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
