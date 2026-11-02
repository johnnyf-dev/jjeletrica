/**
 * ============================================================================
 * PONTE DE CONFIGURAÇÃO — REDIRECIONA PARA O FUNIL ÚNICO DE EDIÇÃO
 * Arquivo: src/constants/config.ts
 * ============================================================================
 * LÓGICA E RASTREAMENTO DE VARIÁVEIS:
 * - DE ONDE VÊM AS VARIÁVEIS: Todas vêm de `src/config/siteConfig.ts`.
 * - POR QUE ESTE ARQUIVO EXISTE: Para manter 100% de compatibilidade com a
 *   estrutura original do `src/App.tsx` que importa `./constants/config`,
 *   enquanto concentra toda a sua edição em `src/config/siteConfig.ts`.
 *
 * 👉 PARA EDITAR TEXTOS, TELEFONE, WHATSAPP OU FLAGS, ABRA:
 *    `src/config/siteConfig.ts`
 * ============================================================================
 */

export { FEATURE_FLAGS, SITE_CONFIG, IMAGENS_DO_SITE } from "../config/siteConfig";
