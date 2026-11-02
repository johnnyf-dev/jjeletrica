/**
 * ============================================================================
 * COMPONENTE: MODAL DE INFORMAÇÕES TÉCNICAS E GARANTIA ELÉTRICA
 * Arquivo: src/components/MaintenancePage.tsx
 * ============================================================================
 * LÓGICA E FLUXO DO ARQUIVO:
 * 1. Abre quando o visitante clica em "Garantia" ou em links informativos
 *    complementares.
 * 2. Exibe as credenciais de +25 anos do Eletricista Johnny e botão de contato
 *    direto pelo WhatsApp.
 *
 * RASTREAMENTO DE VARIÁVEIS (DE ONDE VÊM):
 * - `SITE_CONFIG.companyName`      -> Vem de `src/config/siteConfig.ts`
 * - `SITE_CONFIG.professionalName` -> Vem de `src/config/siteConfig.ts`
 * - `SITE_CONFIG.experienceYears`  -> Vem de `src/config/siteConfig.ts`
 * - `SITE_CONFIG.city`             -> Vem de `src/config/siteConfig.ts`
 * ============================================================================
 */

import React, { useEffect } from "react";
import { X, Wrench, ShieldCheck } from "lucide-react";
import { SITE_CONFIG } from "../config/siteConfig";
import { logWhatsAppClick } from "../utils/analytics";
import { WhatsAppOfficialIcon } from "./WhatsAppFloating";

interface MaintenancePageProps {
  darkMode: boolean;
  title: string;
  onClose: () => void;
}

export const MaintenancePage: React.FC<MaintenancePageProps> = ({
  darkMode,
  title,
  onClose,
}) => {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-md rounded-3xl p-6 sm:p-8 border text-center space-y-4 shadow-2xl ${
          darkMode
            ? "bg-slate-900 border-amber-500/40 text-slate-100"
            : "bg-white border-amber-300 text-slate-900"
        }`}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-500/10 hover:bg-slate-500/20 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-500 flex items-center justify-center mx-auto">
          <Wrench className="w-6 h-6" />
        </div>

        <h3 className="font-display font-extrabold text-xl">{title}</h3>

        {/* [RASTREIO DE VARIÁVEL]: SITE_CONFIG vindo de src/config/siteConfig.ts */}
        <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
          A <strong>{SITE_CONFIG.companyName}</strong> ({SITE_CONFIG.professionalName}) atua há mais
          de <strong>{SITE_CONFIG.experienceYears} anos em {SITE_CONFIG.city}</strong> com
          instalações elétricas residenciais e comerciais, quadros QDC padrão ABNT NBR 5410 e
          iluminação LED de alto padrão.
        </p>

        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs flex items-center justify-center gap-2 text-amber-500 font-semibold">
          <ShieldCheck className="w-4 h-4" />
          <span>Atendimento Garantido em Toda Ponta Grossa</span>
        </div>

        <button
          type="button"
          onClick={() => {
            onClose();
            logWhatsAppClick(
              "modal_manutencao",
              `Olá Johnny! Estava vendo a seção "${title}" no site da J&J Elétrica e gostaria de conversar.`
            );
          }}
          className="w-full py-3.5 px-5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-display font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <WhatsAppOfficialIcon className="w-5 h-5" />
          <span>Chamar no WhatsApp</span>
        </button>
      </div>
    </div>
  );
};
