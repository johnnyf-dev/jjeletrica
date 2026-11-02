/**
 * ============================================================================
 * COMPONENTE: BOTÃO FLUTUANTE DO WHATSAPP (APENAS O SÍMBOLO OFICIAL)
 * Arquivo: src/components/WhatsAppFloating.tsx
 * ============================================================================
 * LÓGICA E FLUXO DO ARQUIVO:
 * 1. Exibe um botão circular fixo na tela contendo apenas o símbolo oficial
 *    do WhatsApp.
 * 2. Posição esquerda/direita configurável via `LAYOUT_ALIGNMENT_CONFIG.floatingWhatsappPosition`
 *    em `src/config/siteConfig.ts`.
 * ============================================================================
 */

import React from "react";
import {
  SITE_CONFIG,
  FEATURE_FLAGS,
  LAYOUT_ALIGNMENT_CONFIG,
} from "../config/siteConfig";
import { logWhatsAppClick } from "../utils/analytics";

/** Ícone Vetorial Oficial do WhatsApp */
export const WhatsAppOfficialIcon: React.FC<{ className?: string }> = ({
  className = "w-7 h-7",
}) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12.031 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 0 0 1.333 4.993L2 22l5.233-1.237a9.994 9.994 0 0 0 4.779 1.217h.004c5.505 0 9.988-4.478 9.989-9.984 0-2.669-1.037-5.176-2.922-7.062A9.935 9.935 0 0 0 12.031 2zm5.829 14.126c-.246.693-1.438 1.326-1.988 1.41-.509.077-1.153.11-1.862-.115-.43-.137-.981-.319-1.691-.625-2.976-1.285-4.919-4.281-5.068-4.48-.149-.198-1.212-1.613-1.212-3.077 0-1.463.766-2.183 1.038-2.481.273-.297.595-.372.793-.372.198 0 .397.002.57.01.183.009.428-.069.67.512.248.595.843 2.059.917 2.208.075.149.124.322.025.52-.099.199-.149.323-.297.496-.149.174-.313.388-.446.521-.149.148-.304.31-.131.608.174.297.771 1.272 1.655 2.06 1.137 1.014 2.096 1.328 2.393 1.477.298.149.471.124.645-.074.173-.199.744-.868.942-1.166.198-.298.397-.248.669-.149.273.099 1.735.818 2.033.967.297.149.496.223.57.347.075.124.075.719-.171 1.413z" />
  </svg>
);

export const WhatsAppFloating: React.FC = () => {
  if (!FEATURE_FLAGS.enableFloatingWhatsApp) return null;

  const whatsappUrl = `https://wa.me/${
    SITE_CONFIG.whatsappNumber
  }?text=${encodeURIComponent(SITE_CONFIG.whatsappDefaultMsg)}`;

  // [RASTREIO DE VARIÁVEL]: Posição esquerda ou direita definida em LAYOUT_ALIGNMENT_CONFIG.floatingWhatsappPosition
  const positionClass =
    LAYOUT_ALIGNMENT_CONFIG.floatingWhatsappPosition === "bottom-left"
      ? "bottom-5 left-5"
      : "bottom-5 right-5";

  return (
    <div className={`fixed ${positionClass} z-40`}>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          e.preventDefault();
          logWhatsAppClick("botao_flutuante_whatsapp");
        }}
        aria-label={`Chamar no WhatsApp ${SITE_CONFIG.whatsappDisplay}`}
        title={`WhatsApp: ${SITE_CONFIG.whatsappDisplay}`}
        className={`relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl shadow-emerald-600/40 border-2 border-white/25 hover:scale-110 transition-all duration-300 cursor-pointer ${
          FEATURE_FLAGS.enableShimmerCta ? "btn-shimmer" : ""
        }`}
      >
        <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white border-2 border-[#25D366]" />
        </span>

        <WhatsAppOfficialIcon className="w-7 h-7 sm:w-8 sm:h-8" />
      </a>
    </div>
  );
};
