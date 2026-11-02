/**
 * ============================================================================
 * UTILITÁRIO DE CLASSES TAILWIND CSS
 * Arquivo: src/utils/cn.ts
 * ============================================================================
 * LÓGICA E FLUXO DO ARQUIVO:
 * Combina classes condicionais do Tailwind CSS evitando conflitos de estilo.
 * ============================================================================
 */

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
