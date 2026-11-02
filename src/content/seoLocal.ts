/**
 * ============================================================================
 * PONTE DE CONTEÚDO SEO LOCAL & FAQ — FUNIL ÚNICO DE EDIÇÃO
 * Arquivo: src/content/seoLocal.ts
 * ============================================================================
 * LÓGICA E RASTREAMENTO DE VARIÁVEIS:
 * - DE ONDE VÊM AS VARIÁVEIS: Vêm de `src/config/siteConfig.ts` (`SEO_LOCAL_CONTENT`).
 * - ONDE SÃO USADAS:
 *   • `SeoLocal.tsx` (exibe os serviços em Ponta Grossa, bairros e FAQ)
 *   • `ContactSection.tsx` (lista de bairros atendidos no formulário de orçamento)
 *
 * 👉 PARA EDITAR OS SERVIÇOS DE SEO, BAIRROS OU PERGUNTAS (FAQ), ABRA:
 *    `src/config/siteConfig.ts`
 * ============================================================================
 */

export { SEO_LOCAL_CONTENT } from "../config/siteConfig";
export type { SeoServicePillar, SeoFaqItem } from "../config/siteConfig";
