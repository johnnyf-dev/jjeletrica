/**
 * ============================================================================
 * COMPONENTE: CABEÇALHO FIXO (ÍCONE JJ ALARGADO + SLOGAN 90%+ + MENU SANDUÍCHE)
 * Arquivo: src/components/Header.tsx
 * ============================================================================
 * LÓGICA E FLUXO DO ARQUIVO:
 * 1. Fica fixo no topo da tela durante a rolagem (`fixed top-0`).
 * 2. Lado Esquerdo: Exibe o ícone alargado com as iniciais `JJ` (com a bolinha
 *    verde controlada pela flag `FEATURE_FLAGS.enableLogoGreenDot`) e o nome
 *    limpo `J&J Elétrica` (sem raio e sem "+25 Anos • PG").
 * 3. Meio da Barra: Exibe o Slogan ocupando 90%+ do espaço central disponível
 *    para que a frase apareça completa.
 * 4. Lado Direito: Exibe atalho para o Blog (nova página), botão Day/Night e
 *    o Menu Sanduíche (sem botão de WhatsApp no título, pois o flutuante já é fixo).
 *
 * RASTREAMENTO DE VARIÁVEIS (DE ONDE VÊM):
 * - `SITE_CONFIG.companyName`              -> Vem de `src/config/siteConfig.ts`
 * - `SITE_CONFIG.logoInitials`             -> Vem de `src/config/siteConfig.ts`
 * - `SITE_CONFIG.slogan`                   -> Vem de `src/config/siteConfig.ts`
 * - `FEATURE_FLAGS.enableLogoGreenDot`     -> Vem de `src/config/siteConfig.ts`
 * - `FEATURE_FLAGS.enableBlogSection`      -> Vem de `src/config/siteConfig.ts`
 * - `LAYOUT_ALIGNMENT_CONFIG`              -> Vem de `src/config/siteConfig.ts`
 * ============================================================================
 */

import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Sun,
  Moon,
  Zap,
  Calculator,
  Images,
  Star,
  Award,
  MapPin,
  Sparkles,
  ChevronRight,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import {
  SITE_CONFIG,
  FEATURE_FLAGS,
  LAYOUT_ALIGNMENT_CONFIG,
} from "../config/siteConfig";
import { logWhatsAppClick, logBlogOpen } from "../utils/analytics";
import { WhatsAppOfficialIcon } from "./WhatsAppFloating";

interface HeaderProps {
  /** Recebido de src/App.tsx: indica se o tema escuro está ativo */
  darkMode: boolean;
  /** Recebido de src/App.tsx: função para alternar entre modo Day e Night */
  onToggleTheme: () => void;
  /** Recebido de src/App.tsx: abre o modal de orçamento rápido */
  onOpenBudgetModal: () => void;
  /** Recebido de src/App.tsx: seção atualmente visível na tela */
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleTheme,
  onOpenBudgetModal,
  activeSection,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "inicio", label: "Início", href: "#inicio", icon: Zap },
    { id: "destaques", label: "Destaques", href: "#destaques", icon: Sparkles },
    { id: "portfolio", label: "Portfólio Elétrico", href: "#portfolio", icon: Images },
    { id: "depoimentos", label: "Avaliações Google", href: "#depoimentos", icon: Star },
    { id: "sobre", label: "Nossa História", href: "#sobre", icon: Award },
    {
      id: "contato",
      label: "Simular Orçamento",
      href: "#contato",
      icon: Calculator,
      highlight: true,
    },
    { id: "seo-servicos", label: "Serviços e Dúvidas", href: "#seo-servicos", icon: MapPin },
  ];

  const handleNavClick = (href: string) => {
    setDrawerOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenBlogNewTab = () => {
    logBlogOpen();
    window.open("?page=blog", "_blank", "noopener,noreferrer");
  };

  // [RASTREIO DE VARIÁVEL]: Largura do ícone JJ definida em LAYOUT_ALIGNMENT_CONFIG.logoBadgeWidth (src/config/siteConfig.ts)
  const logoWidthClass =
    LAYOUT_ALIGNMENT_CONFIG.logoBadgeWidth === "extra-wide"
      ? "w-16 sm:w-20 h-10 sm:h-11 px-4"
      : LAYOUT_ALIGNMENT_CONFIG.logoBadgeWidth === "wide"
      ? "w-14 sm:w-16 h-10 sm:h-11 px-3"
      : "w-10 sm:w-11 h-10 sm:h-11";

  // [RASTREIO DE VARIÁVEL]: Alinhamento do Slogan definido em LAYOUT_ALIGNMENT_CONFIG.headerSloganAlign (src/config/siteConfig.ts)
  const sloganJustifyClass =
    LAYOUT_ALIGNMENT_CONFIG.headerSloganAlign === "left"
      ? "justify-start text-left"
      : LAYOUT_ALIGNMENT_CONFIG.headerSloganAlign === "right"
      ? "justify-end text-right"
      : "justify-center text-center";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          darkMode
            ? scrolled
              ? "bg-[#060A14]/95 border-amber-500/25 shadow-lg shadow-amber-500/5 backdrop-blur-xl py-2"
              : "bg-[#060A14]/88 border-slate-800/80 backdrop-blur-md py-3"
            : scrolled
            ? "bg-white/95 border-slate-200 shadow-md shadow-slate-900/5 backdrop-blur-xl py-2"
            : "bg-white/92 border-slate-200/80 backdrop-blur-md py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* LADO ESQUERDO: ÍCONE "JJ" ALARGADO + NOME "J&J Elétrica" LIMPO */}
            <div className="flex items-center shrink-0">
              <a
                href="#inicio"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("#inicio");
                }}
                className="group flex items-center gap-2.5 focus:outline-none"
              >
                {/* [RASTREIO DE VARIÁVEL]: SITE_CONFIG.logoImagePath e SITE_CONFIG.logoInitials */}
                {SITE_CONFIG.logoImagePath ? (
                  <img
                    src={SITE_CONFIG.logoImagePath}
                    alt={SITE_CONFIG.companyName}
                    className={`${logoWidthClass} rounded-xl object-cover border border-amber-500/40`}
                  />
                ) : (
                  <div
                    className={`relative flex items-center justify-center ${logoWidthClass} rounded-xl bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 text-slate-950 font-display font-extrabold text-lg sm:text-xl tracking-wider shadow-md shadow-amber-500/25 border border-amber-300/60 group-hover:scale-105 transition-transform`}
                  >
                    <span>{SITE_CONFIG.logoInitials}</span>

                    {/* [RASTREIO DE VARIÁVEL]: Bolinha verde controlada por FEATURE_FLAGS.enableLogoGreenDot em src/config/siteConfig.ts */}
                    {FEATURE_FLAGS.enableLogoGreenDot && (
                      <span
                        className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950"
                        title="Status Ativo (Desative em FEATURE_FLAGS.enableLogoGreenDot)"
                      />
                    )}
                  </div>
                )}

                {/* Nome da empresa limpo (removidos o raio e "+25 Anos • PG" conforme solicitado) */}
                <span
                  className={`font-display font-extrabold text-sm sm:text-lg leading-tight tracking-tight ${
                    darkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  {SITE_CONFIG.companyName}
                </span>
              </a>
            </div>

            {/* MEIO DA BARRA DO MENU FIXO: SLOGAN OCUPANDO MAIS DE 90% DO ESPAÇO CENTRAL */}
            <div className={`flex-1 flex items-center ${sloganJustifyClass} min-w-0 px-1 sm:px-3`}>
              <div
                className={`w-full max-w-[96%] inline-flex items-center justify-center gap-1.5 px-3 sm:px-5 py-1.5 rounded-full border transition-all ${
                  darkMode
                    ? "bg-amber-500/10 border-amber-500/30 text-amber-200"
                    : "bg-amber-50 border-amber-300/80 text-slate-800"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 hidden md:inline-block" />
                {/* [RASTREIO DE VARIÁVEL]: SITE_CONFIG.slogan (src/config/siteConfig.ts) */}
                <p className="font-display font-semibold text-[11px] sm:text-xs md:text-sm tracking-tight leading-snug text-center">
                  {SITE_CONFIG.slogan}
                </p>
              </div>
            </div>

            {/* LADO DIREITO: BLOG + DAY/NIGHT + MENU SANDUÍCHE (Sem botão de Whats no título) */}
            <div className="flex items-center justify-end gap-1.5 sm:gap-2 shrink-0">
              {/* [RASTREIO DE VARIÁVEL]: FEATURE_FLAGS.enableBlogSection */}
              {FEATURE_FLAGS.enableBlogSection && (
                <a
                  href="?page=blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    handleOpenBlogNewTab();
                  }}
                  title="Abrir Blog de Dicas Elétricas em Nova Página"
                  className={`hidden lg:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-display font-bold transition-all cursor-pointer ${
                    darkMode
                      ? "bg-slate-900 border-slate-700 text-amber-300 hover:border-amber-500"
                      : "bg-slate-100 border-slate-300 text-slate-800 hover:bg-amber-50"
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                  <span>Blog</span>
                  <ExternalLink className="w-3 h-3 opacity-70" />
                </a>
              )}

              {/* Alternador Modo Day / Modo Night */}
              <button
                type="button"
                onClick={onToggleTheme}
                aria-label={darkMode ? "Ativar Modo Day" : "Ativar Modo Night"}
                title={darkMode ? "Modo Day (Claro)" : "Modo Night (Escuro)"}
                className={`flex items-center justify-center w-9 h-9 rounded-xl border transition-all cursor-pointer ${
                  darkMode
                    ? "bg-slate-900 border-slate-700 text-amber-400 hover:bg-slate-800"
                    : "bg-slate-100 border-slate-300 text-slate-700 hover:bg-amber-50"
                }`}
              >
                {darkMode ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700" />
                )}
              </button>

              {/* MENU DE SANDUÍCHE NO CANTO DIREITO DO TÍTULO (FIXO AO ROLAR) */}
              <button
                type="button"
                onClick={() => setDrawerOpen((prev) => !prev)}
                aria-expanded={drawerOpen}
                aria-label="Abrir menu"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-display font-bold text-xs sm:text-sm border transition-all cursor-pointer ${
                  darkMode
                    ? "bg-amber-500 text-slate-950 border-amber-400 hover:bg-amber-400"
                    : "bg-slate-900 text-white border-slate-800 hover:bg-slate-800"
                }`}
              >
                {drawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                <span className="hidden sm:inline">Menu</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* DRAWER LATERAL DO MENU SANDUÍCHE */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />

          <aside
            className={`relative z-10 w-full max-w-sm h-full flex flex-col justify-between overflow-y-auto p-6 border-l shadow-2xl ${
              darkMode
                ? "bg-[#060A14] border-slate-800 text-slate-100"
                : "bg-white border-slate-200 text-slate-900"
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-500/20">
                <div className="flex items-center gap-2.5">
                  <div className="w-12 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 text-slate-950 font-display font-extrabold flex items-center justify-center">
                    {SITE_CONFIG.logoInitials}
                  </div>
                  <div>
                    <p className="font-display font-bold text-base leading-none">
                      {SITE_CONFIG.companyName}
                    </p>
                    <p className="text-xs text-amber-500 font-medium mt-0.5">
                      {SITE_CONFIG.city} - {SITE_CONFIG.state}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className="p-2 rounded-lg border border-slate-500/20 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Opção de Blog abrindo uma página nova */}
              {FEATURE_FLAGS.enableBlogSection && (
                <div className="mt-4">
                  <a
                    href="?page=blog"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.preventDefault();
                      setDrawerOpen(false);
                      handleOpenBlogNewTab();
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl border font-display font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                      darkMode
                        ? "bg-amber-500/15 border-amber-500/40 text-amber-300 hover:bg-amber-500 hover:text-slate-950"
                        : "bg-amber-50 border-amber-300 text-amber-950 hover:bg-amber-500"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <BookOpen className="w-4 h-4 text-amber-500" />
                      <span>Blog de Dicas Elétricas</span>
                    </span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}

              <nav className="mt-4 space-y-1.5">
                {navItems.map((item) => {
                  const IconComp = item.icon;
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all ${
                        item.highlight
                          ? "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold"
                          : isActive
                          ? darkMode
                            ? "bg-slate-900 text-amber-400 border border-amber-500/30"
                            : "bg-amber-50 text-amber-800 border border-amber-200"
                          : darkMode
                          ? "text-slate-200 hover:bg-slate-900"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <IconComp
                          className={`w-4 h-4 ${
                            item.highlight ? "text-slate-950" : "text-amber-500"
                          }`}
                        />
                        {item.label}
                      </span>
                      <ChevronRight className="w-4 h-4 opacity-60" />
                    </a>
                  );
                })}
              </nav>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-500/20 flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setDrawerOpen(false);
                  onOpenBudgetModal();
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-display font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                Simular Orçamento
              </button>

              <button
                type="button"
                onClick={() => {
                  setDrawerOpen(false);
                  logWhatsAppClick("menu_sanduiche");
                }}
                aria-label="WhatsApp"
                title={`WhatsApp: ${SITE_CONFIG.whatsappDisplay}`}
                className="w-12 h-12 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center shadow-md cursor-pointer shrink-0"
              >
                <WhatsAppOfficialIcon className="w-6 h-6" />
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};
