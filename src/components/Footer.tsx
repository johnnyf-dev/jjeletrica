/**
 * ============================================================================
 * COMPONENTE: RODAPÉ INSTITUCIONAL COM REDES SOCIAIS & CONTADOR DE ACESSOS
 * Arquivo: src/components/Footer.tsx
 * ============================================================================
 * LÓGICA E FLUXO DO ARQUIVO:
 * 1. Exibe a identidade da J&J Elétrica, contatos em Ponta Grossa, link para
 *    o Blog em nova página e ícones de redes sociais (incluindo botão do WhatsApp
 *    apenas com o símbolo oficial).
 * 2. Exibe na barra inferior o Contador de Acessos Discreto e Elegante, lendo
 *    o valor de `obterContadorAcessos()` (`src/utils/analytics.ts`).
 *
 * RASTREAMENTO DE VARIÁVEIS (DE ONDE VÊM):
 * - `SITE_CONFIG`                             -> Vem de `src/config/siteConfig.ts`
 * - `FEATURE_FLAGS.enableBlogSection`         -> Vem de `src/config/siteConfig.ts`
 * - `FEATURE_FLAGS.enableFooterAccessCounter` -> Vem de `src/config/siteConfig.ts`
 * ============================================================================
 */

import React, { useState, useEffect } from "react";
import {
  Zap,
  MapPin,
  Mail,
  BookOpen,
  ExternalLink,
  Eye,
} from "lucide-react";
import { SITE_CONFIG, FEATURE_FLAGS } from "../config/siteConfig";
import { obterContadorAcessos, logWhatsAppClick, logBlogOpen } from "../utils/analytics";
import { WhatsAppOfficialIcon } from "./WhatsAppFloating";

export const Footer: React.FC = () => {
  // [RASTREIO DE VARIÁVEL]: Inicia com SITE_CONFIG.accessCounterBase (src/config/siteConfig.ts)
  const [accessCount, setAccessCount] = useState<number>(SITE_CONFIG.accessCounterBase + 1);

  useEffect(() => {
    setAccessCount(obterContadorAcessos());
  }, []);

  return (
    <footer className="bg-[#060A14] border-t border-slate-800/90 text-slate-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8 border-b border-slate-800/80">
          {/* Coluna 1: Identidade J&J Elétrica */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-slate-950 font-display font-extrabold text-lg flex items-center justify-center">
                {SITE_CONFIG.logoInitials}
              </div>
              <div>
                <span className="font-display font-extrabold text-lg text-white block leading-none">
                  {SITE_CONFIG.companyName}
                </span>
                <span className="text-xs text-amber-400">
                  {SITE_CONFIG.experienceYears} Anos • {SITE_CONFIG.city} - {SITE_CONFIG.state}
                </span>
              </div>
            </div>

            <p className="text-xs text-amber-300 font-display font-semibold">
              “{SITE_CONFIG.slogan}”
            </p>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Instalações elétricas residenciais e comerciais, quadros QDC padrão NBR 5410,
              solução de curto-circuito e iluminação LED em marcenaria.
            </p>
          </div>

          {/* Coluna 2: Contatos e Blog em Nova Página */}
          <div className="md:col-span-4 space-y-2.5 text-xs">
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-amber-400">
              Atendimento em {SITE_CONFIG.city}
            </h3>
            <p className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>
                {SITE_CONFIG.city} - {SITE_CONFIG.state} ({SITE_CONFIG.region})
              </span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <a href={`mailto:${SITE_CONFIG.ownerEmail}`} className="hover:text-amber-400">
                {SITE_CONFIG.ownerEmail}
              </a>
            </p>
            {FEATURE_FLAGS.enableBlogSection && (
              <p className="pt-1">
                <a
                  href="?page=blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    logBlogOpen();
                    window.open("?page=blog", "_blank", "noopener,noreferrer");
                  }}
                  className="inline-flex items-center gap-1.5 text-amber-400 font-bold hover:underline cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Abrir Blog Técnico em Nova Página</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </p>
            )}
          </div>

          {/* Coluna 3: Redes Sociais e Símbolo do WhatsApp */}
          <div className="md:col-span-3 space-y-3">
            <h3 className="font-display font-bold text-xs uppercase tracking-wider text-amber-400">
              Redes Sociais & WhatsApp
            </h3>
            <div className="flex items-center gap-2.5">
              {/* Botão apenas com o Símbolo Oficial do WhatsApp */}
              <button
                type="button"
                onClick={() => logWhatsAppClick("rodape_icone_whatsapp")}
                aria-label="WhatsApp"
                title={`WhatsApp: ${SITE_CONFIG.whatsappDisplay}`}
                className="w-9 h-9 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white flex items-center justify-center transition-transform hover:scale-105 cursor-pointer"
              >
                <WhatsAppOfficialIcon className="w-5 h-5" />
              </button>

              {SITE_CONFIG.social.instagram && (
                <a
                  href={SITE_CONFIG.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-amber-500 text-slate-300 hover:text-slate-950 border border-slate-800 flex items-center justify-center transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              )}
              {SITE_CONFIG.social.facebook && (
                <a
                  href={SITE_CONFIG.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-amber-500 text-slate-300 hover:text-slate-950 border border-slate-800 flex items-center justify-center transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                </a>
              )}
              {SITE_CONFIG.social.youtube && (
                <a
                  href={SITE_CONFIG.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-xl bg-slate-900 hover:bg-amber-500 text-slate-300 hover:text-slate-950 border border-slate-800 flex items-center justify-center transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* BARRA INFERIOR COM CONTADOR DE ACESSOS DISCRETO E ELEGANTE */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>
              © {new Date().getFullYear()} <strong>{SITE_CONFIG.companyName}</strong> — Todos os
              direitos reservados.
            </span>
          </p>

          {/* [RASTREIO DE VARIÁVEL]: FEATURE_FLAGS.enableFooterAccessCounter (src/config/siteConfig.ts) */}
          {FEATURE_FLAGS.enableFooterAccessCounter && (
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800/90 text-[11px] font-mono-tech text-slate-300 shadow-inner"
              title="Contador de visitas registradas"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span className="opacity-75">Acessos:</span>
              <span className="font-bold text-amber-400 tracking-wider">
                {accessCount.toLocaleString("pt-BR")}
              </span>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};
