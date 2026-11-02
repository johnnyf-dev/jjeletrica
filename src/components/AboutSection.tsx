/**
 * ============================================================================
 * COMPONENTE: NOSSA HISTÓRIA (25 ANOS) & BLOG TÉCNICO DE ELÉTRICA
 * Arquivo: src/components/AboutSection.tsx
 * ============================================================================
 * LÓGICA E FLUXO DO ARQUIVO:
 * 1. Exibe a trajetória da J&J Elétrica em Ponta Grossa e os pilares técnicos
 *    (quantidade inicial controlada por `SECTION_ITEMS_CONFIG.aboutPillarsInitialCount`).
 * 2. Exibe a prévia do Blog Técnico (quantidade inicial controlada por
 *    `SECTION_ITEMS_CONFIG.blogInitialCount`) com abertura em página nova (`?page=blog`).
 * ============================================================================
 */

import React, { useState } from "react";
import {
  Award,
  ShieldCheck,
  Zap,
  Clock,
  HeartHandshake,
  Plus,
  Minus,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import {
  SITE_CONFIG,
  FEATURE_FLAGS,
  IMAGENS_DO_SITE,
  BLOG_ARTICLES,
  SECTION_ITEMS_CONFIG,
} from "../config/siteConfig";
import { logBlogOpen } from "../utils/analytics";

interface AboutSectionProps {
  darkMode: boolean;
  onOpenMaintenance?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  darkMode,
  onOpenMaintenance,
}) => {
  const [expandedAbout, setExpandedAbout] = useState(false);
  const [expandedBlog, setExpandedBlog] = useState(false);

  if (!FEATURE_FLAGS.enableAboutSection) return null;

  const pillars = [
    {
      icon: ShieldCheck,
      title: "Padrão Rigoroso ABNT NBR 5410 em Ponta Grossa",
      desc: "Quadros elétricos (QDC) montados com terminais prensados, barramentos de cobre, proteção DR contra choques e DPS contra surtos elétricos. Zero gambiarras ou fios soltos.",
    },
    {
      icon: Zap,
      title: "Especialista em Iluminação LED & Marcenaria",
      desc: "Integração limpa de perfis lineares de LED 3000K em cristaleiras, painéis ripados e estantes planejadas com fontes chaveadas ocultas.",
    },
    {
      icon: HeartHandshake,
      title: "Orçamento Honesto e Atendimento Pessoal",
      desc: "O Eletricista Johnny avalia pessoalmente sua instalação em Ponta Grossa para apresentar o valor final justo, abatendo 100% da taxa de visita no fechamento.",
    },
    {
      icon: Clock,
      title: "Diagnóstico Rápido de Curto-Circuito e Sobrecarga",
      desc: "Localização precisa de quedas de disjuntor, tomadas derretidas e fugas de corrente com instrumentos digitais.",
    },
  ];

  // [RASTREIO DE VARIÁVEL]: Quantidades iniciais definidas em SECTION_ITEMS_CONFIG (src/config/siteConfig.ts)
  const initialPillarsCount = Math.max(1, SECTION_ITEMS_CONFIG.aboutPillarsInitialCount);
  const initialBlogCount = Math.max(1, SECTION_ITEMS_CONFIG.blogInitialCount);

  const visiblePillars = expandedAbout ? pillars : pillars.slice(0, initialPillarsCount);
  const visibleArticles = expandedBlog
    ? BLOG_ARTICLES
    : BLOG_ARTICLES.slice(0, initialBlogCount);

  return (
    <section
      id="sobre"
      className={`py-14 sm:py-20 border-t transition-colors duration-300 ${
        darkMode
          ? "bg-[#060A14] border-slate-800 text-slate-100"
          : "bg-white border-slate-200 text-slate-900"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* BLOCO 1: SOBRE A HISTÓRIA DA J&J ELÉTRICA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-xl aspect-[4/3]">
              <img
                src={IMAGENS_DO_SITE.obraQdcComercialCobre}
                onError={(e) => {
                  e.currentTarget.src = IMAGENS_DO_SITE.obraQdcComercialFallback;
                }}
                alt="Quadro Elétrico com Barramento de Cobre - J&J Elétrica"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <div>
                  <p className="font-display font-extrabold text-xl text-amber-400">
                    {SITE_CONFIG.experienceYears} Anos de Experiência
                  </p>
                  <p className="text-xs text-slate-200">
                    Elétrica Residencial e Comercial em {SITE_CONFIG.city}
                  </p>
                </div>
                {onOpenMaintenance && (
                  <button
                    type="button"
                    onClick={onOpenMaintenance}
                    className="px-3 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-display font-bold text-xs cursor-pointer"
                  >
                    Garantia
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-500 border border-amber-500/30">
              <Award className="w-3.5 h-3.5" />
              <span>Nossa Trajetória • {SITE_CONFIG.companyName}</span>
            </div>

            <h2 className="font-display font-extrabold text-2xl sm:text-4xl tracking-tight leading-tight">
              Mais de {SITE_CONFIG.experienceYears} Anos{" "}
              <span className="text-amber-500">Iluminando Sonhos</span> com Segurança.
            </h2>

            <p
              className={`text-xs sm:text-sm leading-relaxed ${
                darkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
              Com mais de duas décadas e meia atuando em <strong>{SITE_CONFIG.city} e região</strong>,
              a <strong>{SITE_CONFIG.companyName} ({SITE_CONFIG.professionalName})</strong> é
              especialista em instalações elétricas onde a organização técnica dentro do quadro é
              tão impecável quanto o acabamento de iluminação na sua residência ou comércio.
            </p>

            <div className="space-y-3 pt-1">
              {visiblePillars.map((pillar, idx) => {
                const IconComp = pillar.icon;
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border ${
                      darkMode
                        ? "bg-slate-900/80 border-slate-800"
                        : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <div className="flex items-center gap-2 font-display font-bold text-sm text-amber-500">
                      <IconComp className="w-4 h-4 shrink-0" />
                      <span className={darkMode ? "text-white" : "text-slate-900"}>
                        {pillar.title}
                      </span>
                    </div>
                    <p
                      className={`mt-1 text-xs leading-relaxed ${
                        darkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>

            {pillars.length > initialPillarsCount && (
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setExpandedAbout((prev) => !prev)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border font-display font-bold text-xs transition-all cursor-pointer ${
                    darkMode
                      ? "bg-slate-900 border-amber-500/40 text-amber-400 hover:bg-amber-500 hover:text-slate-950"
                      : "bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-500 hover:text-slate-950"
                  }`}
                >
                  {expandedAbout ? (
                    <>
                      <Minus className="w-3.5 h-3.5" />
                      <span>Recolher diferenciais</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Ver mais diferenciais</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* BLOCO 2: BLOG TÉCNICO DE ELÉTRICA (ABRE EM PÁGINA NOVA) */}
        {FEATURE_FLAGS.enableBlogSection && (
          <div className="pt-10 border-t border-slate-500/15">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-500 border border-amber-500/30 mb-2">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Blog Técnico & Dicas Elétricas</span>
                </div>
                <h3 className="font-display font-extrabold text-xl sm:text-3xl">
                  Artigos de Segurança e <span className="text-amber-500">Economia de Energia</span>
                </h3>
              </div>

              <a
                href="?page=blog"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  logBlogOpen();
                  window.open("?page=blog", "_blank", "noopener,noreferrer");
                }}
                className="inline-flex items-center gap-2 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-display font-bold text-xs cursor-pointer self-start sm:self-auto"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Abrir Blog em Nova Página</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div
              className={`grid gap-5 ${
                expandedBlog || initialBlogCount > 1
                  ? "grid-cols-1 md:grid-cols-3"
                  : "grid-cols-1 max-w-2xl mx-auto"
              }`}
            >
              {visibleArticles.map((art) => (
                <article
                  key={art.slug}
                  className={`rounded-3xl overflow-hidden border flex flex-col justify-between ${
                    darkMode
                      ? "bg-slate-900/90 border-slate-800"
                      : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div>
                    <a
                      href={`?page=blog&article=${art.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.preventDefault();
                        logBlogOpen(art.slug);
                        window.open(
                          `?page=blog&article=${art.slug}`,
                          "_blank",
                          "noopener,noreferrer"
                        );
                      }}
                      className="block relative aspect-[16/9] bg-slate-950 overflow-hidden"
                    >
                      <img
                        src={art.image}
                        onError={(e) => {
                          e.currentTarget.src = art.fallbackImage;
                        }}
                        alt={art.title}
                        loading="lazy"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950">
                        {art.category}
                      </span>
                    </a>
                    <div className="p-5">
                      <h4 className="font-display font-bold text-sm sm:text-base leading-snug">
                        {art.title}
                      </h4>
                      <p
                        className={`mt-2 text-xs leading-relaxed ${
                          darkMode ? "text-slate-400" : "text-slate-600"
                        }`}
                      >
                        {art.summary}
                      </p>
                    </div>
                  </div>
                  <div className="px-5 pb-5">
                    <a
                      href={`?page=blog&article=${art.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        e.preventDefault();
                        logBlogOpen(art.slug);
                        window.open(
                          `?page=blog&article=${art.slug}`,
                          "_blank",
                          "noopener,noreferrer"
                        );
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-display font-bold text-amber-500 hover:underline"
                    >
                      <span>Ler artigo em nova página</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </article>
              ))}
            </div>

            {BLOG_ARTICLES.length > initialBlogCount && (
              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => setExpandedBlog((prev) => !prev)}
                  className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border font-display font-bold text-xs cursor-pointer ${
                    darkMode
                      ? "bg-slate-900 border-amber-500/40 text-amber-400 hover:bg-amber-500 hover:text-slate-950"
                      : "bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-500"
                  }`}
                >
                  {expandedBlog ? (
                    <>
                      <Minus className="w-3.5 h-3.5" />
                      <span>Recolher artigos</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5" />
                      <span>Ver mais artigos</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
