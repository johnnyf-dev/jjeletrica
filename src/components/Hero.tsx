/**
 * ============================================================================
 * COMPONENTE: HERO PRINCIPAL (TEXTOS GRANDES + ANIMAÇÃO VERDE/LARANJA + LÂMPADA)
 * Arquivo: src/components/Hero.tsx
 * ============================================================================
 * LÓGICA E FLUXO DO ARQUIVO:
 * 1. Exibe o título grande (`<h1>`) e o parágrafo descritivo.
 * 2. Exibe a animação elétrica (`HERO_ANIMATION_CONFIG`):
 *    - Os ícones e textos vêm de `HERO_ANIMATION_CONFIG.items` (limitados por `maxItemsToShow`).
 *    - No início do ciclo (`energizedCount = 0`), todos os ícones são LARANJAS (`bg-amber-500`).
 *    - Conforme a energia avança da esquerda para a direita, cada ícone por onde a
 *      energia passa é pintado de VERDE (`bg-emerald-500`).
 *    - Ao completar todos os ícones, o ciclo reseta e todos voltam a ser LARANJAS.
 * 3. Abaixo dos textos grandes, exibe os selos `+25 Anos de Experiência` e
 *    `Residencial e Comercial em Ponta Grossa`.
 * 4. Exibe o botão `"Fazer Orçamento Aproximado Agora"` e o botão do WhatsApp
 *    (com o texto desativado por flag `FEATURE_FLAGS.enableHeroWhatsAppButtonText = false`).
 *
 * RASTREAMENTO DE VARIÁVEIS (DE ONDE VÊM -> `src/config/siteConfig.ts`):
 * - `HERO_ANIMATION_CONFIG`                    -> Define os textos, quantidade de ícones e velocidade da animação
 * - `LAYOUT_ALIGNMENT_CONFIG`                  -> Define alinhamento (esquerda/centro/direita e cima/meio/baixo)
 * - `FEATURE_FLAGS.enableHeroTitleAnimation`   -> Liga/desliga a animação de circuito
 * - `FEATURE_FLAGS.enableHeroWhatsAppButton`   -> Liga/desliga o botão de WhatsApp no Hero
 * - `FEATURE_FLAGS.enableHeroWhatsAppButtonText` -> Liga/desliga o texto no botão de WhatsApp (`false` por padrão)
 * - `SITE_CONFIG.heroPrimaryBtnText`           -> Texto "Fazer Orçamento Aproximado Agora"
 * ============================================================================
 */

import React, { useState, useEffect } from "react";
import {
  Calculator,
  Award,
  MapPin,
  Zap,
  ShieldCheck,
  Lightbulb,
} from "lucide-react";
import {
  SITE_CONFIG,
  FEATURE_FLAGS,
  IMAGENS_DO_SITE,
  HERO_ANIMATION_CONFIG,
  LAYOUT_ALIGNMENT_CONFIG,
} from "../config/siteConfig";
import { logWhatsAppClick } from "../utils/analytics";
import { WhatsAppOfficialIcon } from "./WhatsAppFloating";

interface HeroProps {
  /** Recebido de src/App.tsx: define paleta escura ou clara */
  darkMode: boolean;
  /** Recebido de src/App.tsx: abre modal de orçamento rápido */
  onOpenBudgetModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ darkMode, onOpenBudgetModal }) => {
  const [lampScenario, setLampScenario] = useState<"quente" | "arquitetonico" | "protegido">(
    "arquitetonico"
  );

  // [RASTREIO DE VARIÁVEL]: Lista de itens e quantidade definidas em HERO_ANIMATION_CONFIG (src/config/siteConfig.ts)
  const animationItems = HERO_ANIMATION_CONFIG.items.slice(
    0,
    Math.max(1, HERO_ANIMATION_CONFIG.maxItemsToShow)
  );

  /**
   * Estado `energizedCount`: quantos ícones já receberam a passagem da energia.
   * - `0`: todos os ícones estão LARANJAS (resetado).
   * - `1..N`: os ícones de `0` até `energizedCount - 1` ficam VERDES.
   */
  const [energizedCount, setEnergizedCount] = useState<number>(0);

  useEffect(() => {
    if (!FEATURE_FLAGS.enableHeroTitleAnimation || animationItems.length === 0) return;

    const isAllGreen = energizedCount >= animationItems.length;
    const delay = isAllGreen
      ? HERO_ANIMATION_CONFIG.resetPauseMs
      : HERO_ANIMATION_CONFIG.stepSpeedMs;

    const timer = setTimeout(() => {
      setEnergizedCount((prev) => (prev >= animationItems.length ? 0 : prev + 1));
    }, delay);

    return () => clearTimeout(timer);
  }, [energizedCount, animationItems.length]);

  // Percentual da barra de energia verde entre o primeiro e o último ícone
  const energyProgressPercent =
    animationItems.length <= 1
      ? energizedCount > 0
        ? 100
        : 0
      : energizedCount === 0
      ? 0
      : Math.min(100, ((energizedCount - 1) / (animationItems.length - 1)) * 100);

  // [RASTREIO DE VARIÁVEL]: Alinhamentos vindos de LAYOUT_ALIGNMENT_CONFIG (src/config/siteConfig.ts)
  const textAlignClass =
    LAYOUT_ALIGNMENT_CONFIG.heroTextAlign === "center"
      ? "text-center items-center"
      : LAYOUT_ALIGNMENT_CONFIG.heroTextAlign === "right"
      ? "text-right items-end"
      : "text-left items-start";

  const verticalAlignClass =
    LAYOUT_ALIGNMENT_CONFIG.heroVerticalAlign === "top"
      ? "items-start"
      : LAYOUT_ALIGNMENT_CONFIG.heroVerticalAlign === "bottom"
      ? "items-end"
      : "items-center";

  const handleScrollToFormOrModal = () => {
    const contactEl = document.getElementById("contato");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    } else {
      onOpenBudgetModal();
    }
  };

  return (
    <section
      id="inicio"
      className={`relative pt-24 sm:pt-28 pb-14 sm:pb-20 overflow-hidden transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-b from-[#060A14] via-slate-900/90 to-[#060A14] text-slate-100"
          : "bg-gradient-to-b from-amber-50/60 via-white to-slate-50 text-slate-900"
      }`}
    >
      {/* Luz ambiente sutil de fundo */}
      <div
        className="pointer-events-none absolute -top-24 right-1/4 w-80 h-80 rounded-full bg-amber-500/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 ${verticalAlignClass}`}>
          {/* COLUNA ESQUERDA: TÍTULO GRANDE + ANIMAÇÃO + TEXTO + SELOS ABAIXO + BOTÕES */}
          <div className={`lg:col-span-7 flex flex-col ${textAlignClass} space-y-5`}>
            {/* 1. TÍTULO GRANDE PRINCIPAL */}
            <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-[50px] leading-[1.12] tracking-tight">
              Eletricista Profissional,{" "}
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                Quadros NBR 5410
              </span>{" "}
              e Iluminação de Alto Padrão.
            </h1>

            {/* =================================================================
                2. ANIMAÇÃO DE CIRCUITO ELÉTRICO (PINTA DE VERDE E RESETA P/ LARANJA)
                [ONDE EDITAR TEXTOS E QUANTIDADE DE ITENS]:
                Abra `src/config/siteConfig.ts` -> `HERO_ANIMATION_CONFIG`
               ================================================================= */}
            {FEATURE_FLAGS.enableHeroTitleAnimation && (
              <div
                className={`w-full p-4 rounded-2xl border relative overflow-hidden ${
                  darkMode
                    ? "bg-slate-900/80 border-slate-800"
                    : "bg-white/95 border-amber-200/90 shadow-xs"
                }`}
                aria-label="Etapas de segurança elétrica"
              >
                <div className="relative flex items-center justify-between z-10">
                  {animationItems.map((label, idx) => {
                    // Ícone fica VERDE quando a energia já passou por ele, e LARANJA quando reseta
                    const isGreen = idx < energizedCount;

                    return (
                      <div
                        key={`${label}-${idx}`}
                        className="flex flex-col items-center text-center z-10 px-1"
                      >
                        <div
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center border-2 transition-all duration-300 ${
                            isGreen
                              ? "bg-emerald-500 text-slate-950 border-emerald-300 shadow-lg shadow-emerald-500/40 scale-110"
                              : "bg-amber-500 text-slate-950 border-amber-300 shadow-md shadow-amber-500/25 scale-100"
                          }`}
                        >
                          <Zap className="w-4 h-4 fill-current" />
                        </div>
                        <span
                          className={`text-[11px] sm:text-xs font-display font-bold mt-1.5 transition-colors duration-300 ${
                            isGreen
                              ? "text-emerald-500"
                              : darkMode
                              ? "text-amber-400"
                              : "text-amber-700"
                          }`}
                        >
                          {label}
                        </span>
                      </div>
                    );
                  })}

                  {/* Trilha de fundo Laranja + Trilha de Energia Verde que avança e reseta */}
                  <div className="absolute top-4 sm:top-5 left-6 right-6 h-1 bg-amber-500/25 -z-0 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-500 ease-out rounded-full shadow-sm shadow-emerald-400"
                      style={{ width: `${energyProgressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 3. TEXTO DESCRITIVO PRINCIPAL */}
            <p
              className={`text-sm sm:text-base leading-relaxed max-w-xl ${
                darkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Instalações elétricas residenciais e comerciais, conserto de curto-circuito e queda
              de disjuntor, montagem de quadros QDC impecáveis e fitas de LED em marcenaria com{" "}
              <strong>{SITE_CONFIG.professionalName}</strong>.
            </p>

            {/* =================================================================
                4. SELOS POSICIONADOS ABAIXO DOS TEXTOS GRANDES (CONFORME SOLICITADO)
                [RASTREIO DE VARIÁVEL]: SITE_CONFIG.experienceBadgeText e SITE_CONFIG.regionBadgeText
               ================================================================= */}
            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${
                  darkMode
                    ? "bg-amber-500/15 border-amber-500/40 text-amber-300"
                    : "bg-amber-100 border-amber-300 text-amber-900"
                }`}
              >
                <Award className="w-3.5 h-3.5 text-amber-500" />
                {SITE_CONFIG.experienceBadgeText}
              </span>

              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${
                  darkMode
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                    : "bg-emerald-50 border-emerald-200 text-emerald-800"
                }`}
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                {SITE_CONFIG.regionBadgeText}
              </span>
            </div>

            {/* =================================================================
                5. BOTÕES DE CONVERSÃO:
                - Botão 1: "Fazer Orçamento Aproximado Agora" (SITE_CONFIG.heroPrimaryBtnText)
                - Botão 2: WhatsApp (com texto DESATIVADO por padrão na flag enableHeroWhatsAppButtonText)
               ================================================================= */}
            <div className="w-full pt-1 flex items-center gap-3">
              <button
                type="button"
                onClick={handleScrollToFormOrModal}
                className={`flex-1 py-4 px-5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-display font-extrabold text-sm sm:text-base shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2.5 cursor-pointer transition-all ${
                  FEATURE_FLAGS.enableShimmerCta ? "btn-shimmer" : ""
                }`}
              >
                <Calculator className="w-5 h-5 shrink-0" />
                {/* [RASTREIO DE VARIÁVEL]: SITE_CONFIG.heroPrimaryBtnText ("Fazer Orçamento Aproximado Agora") */}
                <span>{SITE_CONFIG.heroPrimaryBtnText}</span>
              </button>

              {/* [RASTREIO DE VARIÁVEL]: Botão WhatsApp no Hero controlado por FEATURE_FLAGS.enableHeroWhatsAppButton */}
              {FEATURE_FLAGS.enableHeroWhatsAppButton && (
                <button
                  type="button"
                  onClick={() =>
                    logWhatsAppClick(
                      "hero_cta_whatsapp",
                      `Olá Johnny! Vi o site da ${SITE_CONFIG.companyName} em ${SITE_CONFIG.city} e gostaria de falar direto no WhatsApp sobre um orçamento elétrico.`
                    )
                  }
                  aria-label={`Falar no WhatsApp ${SITE_CONFIG.whatsappDisplay}`}
                  title={`Falar Direto no WhatsApp: ${SITE_CONFIG.whatsappDisplay}`}
                  className={`flex items-center justify-center gap-2 py-4 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-display font-bold text-sm sm:text-base shadow-xl shadow-emerald-600/25 cursor-pointer transition-all shrink-0 ${
                    FEATURE_FLAGS.enableShimmerCta ? "btn-shimmer" : ""
                  }`}
                >
                  <WhatsAppOfficialIcon className="w-6 h-6 shrink-0" />
                  {/* [RASTREIO DE VARIÁVEL]: Texto desativado por padrão via FEATURE_FLAGS.enableHeroWhatsAppButtonText */}
                  {FEATURE_FLAGS.enableHeroWhatsAppButtonText && (
                    <span>{SITE_CONFIG.heroWhatsAppBtnText}</span>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* COLUNA DIREITA: FOTO DA LÂMPADA EDISON (Salva em public/galeria/lampada-edison-hero.jpg) */}
          <div className="lg:col-span-5">
            <div
              className={`rounded-3xl p-3 border shadow-2xl transition-all ${
                darkMode
                  ? "bg-slate-900/80 border-amber-500/30 shadow-amber-500/5"
                  : "bg-white border-amber-200 shadow-slate-900/10"
              }`}
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <img
                  src={IMAGENS_DO_SITE.heroLampadaEdison}
                  onError={(e) => {
                    e.currentTarget.src = IMAGENS_DO_SITE.heroLampadaFallbackInternet;
                  }}
                  alt="Iluminação de Alto Padrão - J&J Elétrica Ponta Grossa"
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    lampScenario === "quente"
                      ? "brightness-100 saturate-125"
                      : lampScenario === "arquitetonico"
                      ? "brightness-110 contrast-105"
                      : "brightness-95"
                  }`}
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/30" />
                <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full bg-amber-400/35 blur-2xl animate-filament-glow" />

                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-950/80 text-amber-300 border border-amber-400/30 backdrop-blur-md">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    {SITE_CONFIG.companyName}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono-tech bg-slate-950/80 text-emerald-400 border border-emerald-500/30">
                    <ShieldCheck className="w-3 h-3" /> NBR 5410
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-amber-500/25 text-white flex items-center justify-between text-xs">
                  <span className="font-medium text-amber-200">
                    “{SITE_CONFIG.slogan}”
                  </span>
                  <button
                    type="button"
                    onClick={onOpenBudgetModal}
                    className="text-[11px] font-bold text-amber-400 underline cursor-pointer shrink-0 ml-2"
                  >
                    Orçar
                  </button>
                </div>
              </div>

              {/* [RASTREIO DE VARIÁVEL]: FEATURE_FLAGS.enableBulbScenarioSwitch (src/config/siteConfig.ts) */}
              {FEATURE_FLAGS.enableBulbScenarioSwitch && (
                <div className="mt-2.5 grid grid-cols-3 gap-1.5">
                  {(
                    [
                      { id: "quente", label: "2700K Conforto" },
                      { id: "arquitetonico", label: "3000K Marcenaria" },
                      { id: "protegido", label: "QDC Protegido" },
                    ] as const
                  ).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setLampScenario(item.id)}
                      className={`py-1.5 px-2 rounded-xl text-[11px] font-display font-bold border transition-all cursor-pointer ${
                        lampScenario === item.id
                          ? "bg-amber-500 text-slate-950 border-amber-400"
                          : darkMode
                          ? "bg-slate-950 border-slate-800 text-slate-300"
                          : "bg-slate-50 border-slate-200 text-slate-700"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
