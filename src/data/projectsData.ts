/**
 * ============================================================================
 * PONTE DE DADOS DO PORTFÓLIO, SERVIÇOS E BLOG — FUNIL ÚNICO DE EDIÇÃO
 * Arquivo: src/data/projectsData.ts
 * ============================================================================
 * LÓGICA E RASTREAMENTO DE VARIÁVEIS:
 * - DE ONDE VÊM AS VARIÁVEIS: Todas vêm de `src/config/siteConfig.ts`.
 * - ONDE SÃO USADAS:
 *   • `PROJECTS_DATA` e `ProjectItem` -> `PortfolioCarousel.tsx`, `PortfolioGrid.tsx`, `ProjectModal.tsx`
 *   • `ELECTRICAL_SERVICES` -> `ContactSection.tsx`, `ContactModal.tsx`, `analytics.ts`
 *   • `TESTIMONIALS_DATA` -> `Testimonials.tsx`
 *   • `BLOG_ARTICLES` -> `AboutSection.tsx`, `BlogStandalonePage.tsx`
 *
 * 👉 PARA EDITAR FOTOS, PROJETOS, PREÇOS OU ARTIGOS, ABRA:
 *    `src/config/siteConfig.ts`
 * ============================================================================
 */

export {
  HERO_LAMP_IMAGE,
  PROJECTS_DATA,
  ELECTRICAL_SERVICES,
  TESTIMONIALS_DATA,
  BLOG_ARTICLES,
} from "../config/siteConfig";

export type {
  ProjectItem,
  ElectricalServiceOption,
  TestimonialItem,
  BlogArticle,
} from "../config/siteConfig";
