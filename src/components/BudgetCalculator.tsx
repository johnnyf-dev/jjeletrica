/**
 * ============================================================================
 * COMPONENTE: SIMULADOR POR QUANTIDADE DE PONTOS ELÉTRICOS (OPCIONAL POR FLAG)
 * Arquivo: src/components/BudgetCalculator.tsx
 * ============================================================================
 * LÓGICA E FLUXO DO ARQUIVO:
 * 1. Componente mantido na estrutura do `src/App.tsx` e controlado pela flag
 *    `FEATURE_FLAGS.enableStandaloneCalculatorSection` em `src/config/siteConfig.ts`.
 * 2. Permite simular o custo por quantidade de pontos elétricos (tomadas/interruptores/luz)
 *    e abre o `ContactModal` com o valor pré-calculado.
 * ============================================================================
 */

import React, { useState } from "react";
import { Calculator } from "lucide-react";

interface BudgetCalculatorProps {
  darkMode: boolean;
  onOpenBudgetModalWithData: (data: {
    points?: number;
    standard?: string;
    total?: number;
    projectTitle?: string;
  }) => void;
}

export const BudgetCalculator: React.FC<BudgetCalculatorProps> = ({
  darkMode,
  onOpenBudgetModalWithData,
}) => {
  const [points, setPoints] = useState(10);
  const [standard, setStandard] = useState("Instalação Residencial NBR 5410");
  const estimatedTotal = points * 65;

  return (
    <section
      className={`py-14 border-t ${
        darkMode ? "bg-[#060A14] border-slate-800 text-white" : "bg-slate-50 border-slate-200"
      }`}
    >
      <div className="max-w-3xl mx-auto px-4 text-center space-y-4">
        <h3 className="font-display font-bold text-2xl">Simulador de Pontos Elétricos</h3>
        <div className="flex items-center justify-center gap-4">
          <input
            type="range"
            min={5}
            max={60}
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
          />
          <span className="font-mono-tech font-bold">{points} pontos</span>
        </div>
        <button
          type="button"
          onClick={() => {
            setStandard("Instalação Residencial NBR 5410");
            onOpenBudgetModalWithData({
              points,
              standard,
              total: estimatedTotal,
              projectTitle: `Simulação ${points} pontos elétricos`,
            });
          }}
          className="py-3 px-6 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm inline-flex items-center gap-2 cursor-pointer"
        >
          <Calculator className="w-4 h-4" />
          Solicitar Orçamento (Est. R$ {estimatedTotal})
        </button>
      </div>
    </section>
  );
};
