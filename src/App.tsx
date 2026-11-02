/**
 * =========================================================================
 * ARQUIVO PRINCIPAL DE MONTAGEM DO SITE — J&J ELÉTRICA (PONTA GROSSA - PR)
 * Arquivo: src/App.tsx
 * =========================================================================
 * LÓGICA E FLUXO DO ARQUIVO:
 * 1. Controla o tema visual (`darkMode` = Modo Night Elegante / `false` = Modo Day Conversão).
 * 2. Ao carregar a página, conecta a URL do Google Apps Script (`definirAppsScriptURL`),
 *    registra a visita no contador (`logVisita`) e agenda o evento de 60 segundos (`logSessao60s`).
 * 3. Verifica se a URL contém `?page=blog` para abrir a página dedicada do Blog Técnico,
 *    ou renderiza todas as seções na ordem exata da arquitetura principal.
 *
 * RASTREAMENTO DE VARIÁVEIS (DE ONDE VÊM):
 * - `SITE_CONFIG` e `FEATURE_FLAGS` -> Vêm do funil único `src/config/siteConfig.ts`
 * - `ProjectItem`                   -> Vem de `src/config/siteConfig.ts`
 *
 * 👉 PARA EDITAR QUALQUER TEXTO, IMAGEM, TELEFONE OU FLAG, ABRA:
 *    `src/config/siteConfig.ts`
 * =========================================================================
 */

import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { PortfolioCarousel } from "./components/PortfolioCarousel";
import { PortfolioGrid } from "./components/PortfolioGrid";
import { ProjectModal } from "./components/ProjectModal";
import { BudgetCalculator } from "./components/BudgetCalculator";
import { Testimonials } from "./components/Testimonials";
import { AboutSection } from "./components/AboutSection";
import { ContactSection } from "./components/ContactSection";
import { SeoLocal } from "./components/SeoLocal";
import { ContactModal } from "./components/ContactModal";
import { WhatsAppFloating } from "./components/WhatsAppFloating";
import { Footer } from "./components/Footer";
import { MaintenancePage } from "./components/MaintenancePage";
import { BlogStandalonePage } from "./components/BlogStandalonePage";
// [RASTREIO DE VARIÁVEL]: Importa configurações e tipos do Funil Único src/config/siteConfig.ts
import { SITE_CONFIG, FEATURE_FLAGS, ProjectItem } from "./config/siteConfig";
import {
  logVisita,
  logSessao60s,
  logFormOpen,
  logPortfolio,
  definirAppsScriptURL,
} from "./utils/analytics";

export function App() {
  // =========================================================================
  // 1. ESTADO DO TEMA (DAY / NIGHT MODE FORÇADO & SEGURO PARA CELULARES)
  // =========================================================================
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("jj-eletrica-theme");
    if (saved) return saved === "dark";
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return true;
  });

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (darkMode) {
      root.classList.add("dark");
      root.classList.remove("light");
      root.setAttribute("data-theme", "dark");

      body.classList.add("dark");
      body.classList.remove("light");
      body.setAttribute("data-theme", "dark");

      localStorage.setItem("jj-eletrica-theme", "dark");
    } else {
      root.classList.remove("dark");
      root.classList.add("light");
      root.setAttribute("data-theme", "light");

      body.classList.remove("dark");
      body.classList.add("light");
      body.setAttribute("data-theme", "light");

      localStorage.setItem("jj-eletrica-theme", "light");
    }
  }, [darkMode]);

  const handleToggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  // Detecta se o usuário abriu a página dedicada do Blog Técnico (?page=blog)
  const [isBlogPage, setIsBlogPage] = useState<boolean>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("page") === "blog";
  });
  const [blogArticleSlug] = useState<string | null>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("article");
  });

  // =========================================================================
  // 2. ESTADOS DE MODAIS (ORÇAMENTO ELÉTRICO & GALERIA DE TRABALHOS 80%)
  // =========================================================================
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [budgetModalData, setBudgetModalData] = useState<
    | {
        points?: number;
        standard?: string;
        total?: number;
        projectTitle?: string;
      }
    | undefined
  >(undefined);

  const handleOpenBudgetModal = (initialData?: {
    points?: number;
    standard?: string;
    total?: number;
    projectTitle?: string;
  }) => {
    setBudgetModalData(initialData);
    setIsBudgetModalOpen(true);
    logFormOpen("solicitar_orcamento");
  };

  // VISITA + SESSÃO 60S — roda 1x ao abrir o site (page_view, recorrente, 60s)
  useEffect(() => {
    // [RASTREIO DE VARIÁVEL]: SITE_CONFIG.appsScriptUrl vem de src/config/siteConfig.ts
    definirAppsScriptURL(SITE_CONFIG.appsScriptUrl);
    logVisita();
    const timer60s = setTimeout(() => logSessao60s(), 60000);
    return () => clearTimeout(timer60s);
  }, []);

  // Modal de informações técnicas e garantia elétrica
  const [maintenanceTitle, setMaintenanceTitle] = useState<string | null>(null);
  const handleOpenMaintenance = (title?: string) => {
    setMaintenanceTitle(title || "Garantia Técnica J&J Elétrica");
  };
  const handleCloseMaintenance = () => setMaintenanceTitle(null);

  // =========================================================================
  // 3. RASTREAMENTO DA SEÇÃO ATIVA NA ROLAGEM
  // =========================================================================
  const [activeSection, setActiveSection] = useState<string>("inicio");

  useEffect(() => {
    const sections = [
      "inicio",
      "destaques",
      "portfolio",
      "depoimentos",
      "sobre",
      "contato",
      "seo-servicos",
    ];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      data-theme={darkMode ? "dark" : "light"}
      className={`min-h-screen flex flex-col transition-colors duration-300 relative selection:bg-amber-500 selection:text-slate-950 ${
        darkMode ? "bg-[#060A14] text-slate-100 dark" : "bg-slate-50 text-slate-900 light"
      }`}
    >
      {/* 1. CABEÇALHO / HEADER FIXO (Logo JJ, Slogan J&J Elétrica, Símbolo WhatsApp e Day/Night) */}
      <Header
        darkMode={darkMode}
        onToggleTheme={handleToggleTheme}
        onOpenBudgetModal={() => handleOpenBudgetModal()}
        activeSection={activeSection}
      />

      {/* 2. CONTEÚDO PRINCIPAL (OU PÁGINA DO BLOG SE ABERTA EM ?page=blog) */}
      {isBlogPage ? (
        <main className="flex-1">
          <BlogStandalonePage
            darkMode={darkMode}
            initialSlug={blogArticleSlug}
            onReturnToHome={() => {
              setIsBlogPage(false);
              try {
                window.history.pushState({}, "", window.location.pathname);
              } catch {
                // noop
              }
            }}
            onOpenBudgetModal={(data) => handleOpenBudgetModal(data)}
          />
        </main>
      ) : (
        <main className="flex-1">
          {/* HERO DIVIDIDO EM 2 COLUNAS COM A ANIMAÇÃO DE CIRCUITO ABAIXO DO TÍTULO */}
          <Hero darkMode={darkMode} onOpenBudgetModal={() => handleOpenBudgetModal()} />

          {/* 3. CARROSSEL DE DESTAQUES (TÍTULO CENTRALIZADO E SETAS NO PÉ) */}
          <PortfolioCarousel
            darkMode={darkMode}
            onSelectProject={(project) => {
              setSelectedProject(project);
              logPortfolio(String(project.slug || project.id));
            }}
          />

          {/* 4. GRADE DE PORTFÓLIO ELÉTRICO (EXIBE 1 TRABALHO + BOTÃO "VER MAIS") */}
          <PortfolioGrid
            darkMode={darkMode}
            onSelectProject={(project) => {
              setSelectedProject(project);
              logPortfolio(String(project.slug || project.id));
            }}
            onOpenBudgetModal={() => handleOpenBudgetModal()}
            onOpenMaintenance={(title) => handleOpenMaintenance(title)}
          />

          {/* 5. SIMULADOR DE PONTOS ELÉTRICOS (CONTROLADO POR FLAG EM src/config/siteConfig.ts) */}
          {FEATURE_FLAGS.enableStandaloneCalculatorSection && (
            <BudgetCalculator
              darkMode={darkMode}
              onOpenBudgetModalWithData={(data) => handleOpenBudgetModal(data)}
            />
          )}

          {/* 6. DEPOIMENTOS GOOGLE REVIEWS (EXIBE 1 DEPOIMENTO + BOTÃO "VER MAIS") */}
          <Testimonials darkMode={darkMode} />

          {/* 7. SOBRE A J&J ELÉTRICA + BLOG TÉCNICO (EXIBE 1 ITEM + BOTÃO "VER MAIS") */}
          <AboutSection
            darkMode={darkMode}
            onOpenMaintenance={() => handleOpenMaintenance("Garantia e Certificações NBR 5410")}
          />

          {/* 8. FORMULÁRIO DE CAPTURA DE LEADS, CÁLCULO & QUALIFICADOR (GOOGLE APPS SCRIPT) */}
          <ContactSection
            darkMode={darkMode}
            onOpenBudgetModal={() => handleOpenBudgetModal()}
          />

          {/* 8B. SEO LOCAL VISÍVEL (SERVIÇOS EM PONTA GROSSA + FAQ + BAIRROS) */}
          <SeoLocal darkMode={darkMode} />
        </main>
      )}

      {/* 9. RODAPÉ INSTITUCIONAL COM CONTADOR DE ACESSOS DISCRETO E ELEGANTE */}
      <Footer />

      {/* 10. MODAL INTERATIVO DE PROJETO (HERO 80% — CLICOU ABRIU, CLICOU FECHOU) */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenBudgetModal={() => {
          if (selectedProject) {
            handleOpenBudgetModal({ projectTitle: selectedProject.title });
          } else {
            handleOpenBudgetModal();
          }
        }}
        onOpenMaintenance={(title) => handleOpenMaintenance(title)}
      />

      {/* 11. FORMULÁRIO MODAL CENTRAL DE ORÇAMENTO */}
      <ContactModal
        isOpen={isBudgetModalOpen}
        onClose={() => setIsBudgetModalOpen(false)}
        initialData={budgetModalData}
      />

      {/* 12. BOTÃO FLUTUANTE DO WHATSAPP (APENAS O SÍMBOLO OFICIAL) */}
      <WhatsAppFloating />

      {/* 13. MODAL DE INFORMAÇÕES TÉCNICAS / GARANTIA */}
      {maintenanceTitle && (
        <MaintenancePage
          darkMode={darkMode}
          title={maintenanceTitle}
          onClose={handleCloseMaintenance}
        />
      )}
    </div>
  );
}

export default App;
