/**
 * ============================================================================
 * COMPONENTE: MODAL DE VISUALIZAÇÃO DE TRABALHO ELÉTRICO (HERO 80%)
 * Arquivo: src/components/ProjectModal.tsx
 * ============================================================================
 * LÓGICA E FLUXO DO ARQUIVO:
 * 1. Recebe a variável `project` selecionada no Carrossel (`PortfolioCarousel.tsx`)
 *    ou na Grade (`PortfolioGrid.tsx`).
 * 2. Exibe a imagem ampliada ocupando 80% da tela (`w-[80vw] h-[80vh]`).
 * 3. Ao clicar em qualquer parte da foto/fundo ou pressionar `ESC`, fecha o modal.
 *
 * RASTREAMENTO DE VARIÁVEIS (DE ONDE VÊM):
 * - `project` (tipo `ProjectItem`) -> Dados originais vêm de `PROJECTS_DATA` em `src/config/siteConfig.ts`
 * ============================================================================
 */

import React, { useEffect } from "react";
import { X, CheckCircle2, Calculator, Sparkles, MapPin } from "lucide-react";
import { ProjectItem } from "../config/siteConfig";

interface ProjectModalProps {
  /** Recebido de src/App.tsx: trabalho elétrico clicado pelo visitante */
  project: ProjectItem | null;
  /** Recebido de src/App.tsx: função para fechar o modal */
  onClose: () => void;
  /** Recebido de src/App.tsx: abre modal de orçamento para este serviço */
  onOpenBudgetModal: () => void;
  /** Recebido de src/App.tsx: abre modal informativo complementar */
  onOpenMaintenance?: (title?: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onOpenBudgetModal,
}) => {
  useEffect(() => {
    if (!project) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/88 backdrop-blur-md p-2 sm:p-4 cursor-pointer"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      title="Clique para fechar"
    >
      {/* Container de 80% da tela (clicou abriu, clicou fechou) */}
      <div
        className="relative w-[94vw] md:w-[80vw] h-[84vh] md:h-[80vh] bg-slate-900 border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row"
        onClick={onClose}
      >
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-3 right-3 z-30 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-slate-950/85 hover:bg-amber-500 text-white hover:text-slate-950 font-display font-bold text-xs border border-white/20 cursor-pointer"
        >
          <X className="w-4 h-4" />
          <span>Fechar</span>
        </button>

        {/* Foto em 80% com proteção anti-quebra */}
        <div className="relative flex-1 h-[58%] lg:h-full bg-slate-950 flex items-center justify-center overflow-hidden">
          <img
            src={project.image}
            onError={(e) => {
              e.currentTarget.src = project.fallbackImage;
            }}
            alt={project.title}
            className="w-full h-full object-contain max-h-full p-2 sm:p-4"
          />
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-950/80 border border-amber-500/30 text-[11px] text-amber-300 pointer-events-none">
            Clique na imagem para fechar
          </div>
        </div>

        {/* Detalhes da Instalação Elétrica */}
        <div className="w-full lg:w-96 h-[42%] lg:h-full bg-slate-900/95 border-t lg:border-t-0 lg:border-l border-slate-800 p-5 sm:p-6 flex flex-col justify-between overflow-y-auto text-slate-100">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              {project.badge}
            </span>

            <h3 className="font-display font-extrabold text-lg sm:text-xl text-white">
              {project.title}
            </h3>

            <p className="text-xs text-amber-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              {project.location}
            </p>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {project.summary}
            </p>

            <div className="pt-3 border-t border-slate-800 space-y-2">
              <p className="text-xs font-mono-tech uppercase text-amber-400 font-bold">
                Especificações Técnicas:
              </p>
              {project.specs.map((spec, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{spec}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
                onOpenBudgetModal();
              }}
              className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-display font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer btn-shimmer"
            >
              <Calculator className="w-4 h-4" />
              Solicitar Orçamento ({project.estimatedRange})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
