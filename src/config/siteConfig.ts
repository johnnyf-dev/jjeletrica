/**
 * ============================================================================
 * ARQUIVO PRINCIPAL DE EDIÇÃO (FUNIL ÚNICO) — J&J ELÉTRICA (PONTA GROSSA - PR)
 * Caminho: src/config/siteConfig.ts
 * ============================================================================
 * ÍNDICE RÁPIDO DO QUE VOCÊ PODE EDITAR NESTE ARQUIVO:
 * [SEÇÃO 1] FEATURE_FLAGS           -> Ligar (`true`) ou Desligar (`false`) recursos, bolinha verde, texto do Whats, animação.
 * [SEÇÃO 2] LAYOUT_ALIGNMENT_CONFIG -> Centralizar, pôr para Esquerda, Direita, Cima ou Baixo (com guia comentado).
 * [SEÇÃO 3] HERO_ANIMATION_CONFIG   -> Editar os textos da animação elétrica, a quantidade de ícones e a velocidade.
 * [SEÇÃO 4] SECTION_ITEMS_CONFIG    -> Definir a quantidade inicial de itens mostrados em cada seção (ex: 1 item).
 * [SEÇÃO 5] SITE_CONFIG             -> Editar Slogan, Texto do Botão, WhatsApp (55429998455688), E-mail (eletricistajohnny@gmail.com).
 * [SEÇÃO 6] IMAGENS_DO_SITE         -> Trocar imagens (salvas em `public/galeria/` ou links da internet).
 * [SEÇÃO 7] PROJECTS_DATA           -> Editar os trabalhos elétricos do Carrossel e do Portfólio.
 * [SEÇÃO 8] ELECTRICAL_SERVICES     -> Editar os serviços e preços da Calculadora de Orçamento.
 * [SEÇÃO 9] TESTIMONIALS_DATA       -> Editar os depoimentos 5 estrelas do Google.
 * [SEÇÃO 10] BLOG_ARTICLES          -> Editar os artigos do Blog Técnico (que abrem em nova página).
 * [SEÇÃO 11] SEO_LOCAL_CONTENT      -> Editar textos de SEO em Ponta Grossa, bairros e Perguntas Frequentes (FAQ).
 * ============================================================================
 */

import { EMBEDDED_PORTFOLIO_IMAGES } from "./portfolioImages";

// Leitura segura das variáveis de ambiente do arquivo `.env` (import.meta.env)
const env = (import.meta as unknown as { env?: Record<string, string | undefined> }).env || {};

// ============================================================================
// [SEÇÃO 1] FLAGS DE ATIVAÇÃO / DESATIVAÇÃO (Mude para `true` ou `false`)
// ============================================================================
export const FEATURE_FLAGS = {
  /**
   * [USADO EM: src/components/Header.tsx]
   * Liga (`true`) ou desliga (`false`) a bolinha verde de status no canto do ícone "JJ".
   */
  enableLogoGreenDot: true,

  /**
   * [USADO EM: src/components/Hero.tsx]
   * Liga/desliga a animação dos ícones que ficam verdes conforme a energia passa
   * e voltam a ficar laranjas ao resetar.
   */
  enableHeroTitleAnimation: true,

  /**
   * [USADO EM: src/components/Hero.tsx]
   * Liga/desliga o botão secundário de WhatsApp ao lado do botão "Fazer Orçamento Aproximado Agora".
   */
  enableHeroWhatsAppButton: true,

  /**
   * [USADO EM: src/components/Hero.tsx]
   * Liga/desliga o TEXTO dentro do botão de WhatsApp da parte principal (Hero).
   * DESATIVADO (`false`) por padrão conforme solicitado: mostra apenas o símbolo do WhatsApp.
   * Se mudar para `true`, aparece o texto ao lado do símbolo.
   */
  enableHeroWhatsAppButtonText: false,

  /**
   * [USADO EM: src/components/Hero.tsx]
   * Liga/desliga os 3 botões de cenário de iluminação abaixo da foto da lâmpada.
   */
  enableBulbScenarioSwitch: true,

  /**
   * [USADO EM: src/components/PortfolioCarousel.tsx]
   * Liga/desliga a seção de Destaques (Carrossel que abre foto em 80% da tela).
   */
  enablePortfolioCarousel: true,

  /**
   * [USADO EM: src/components/PortfolioGrid.tsx]
   * Liga/desliga a grade de Portfólio (inicia com a quantidade definida em SECTION_ITEMS_CONFIG).
   */
  enablePortfolioGrid: true,

  /**
   * [USADO EM: src/App.tsx -> BudgetCalculator.tsx]
   * Simulador secundário por barra deslizante de pontos elétricos (`false` por padrão).
   */
  enableStandaloneCalculatorSection: false,

  /**
   * [USADO EM: src/components/Testimonials.tsx]
   * Liga/desliga a seção de Depoimentos 5 estrelas do Google.
   */
  enableTestimonialsSection: true,

  /**
   * [USADO EM: src/components/Testimonials.tsx]
   * Botão "Avaliar no Google". Inicia DESATIVADO (`false`) conforme solicitado.
   */
  enableGoogleReviewButton: false,

  /**
   * [USADO EM: src/components/AboutSection.tsx]
   * Liga/desliga a seção "Sobre a J&J Elétrica (+25 Anos)".
   */
  enableAboutSection: true,

  /**
   * [USADO EM: src/components/Header.tsx, AboutSection.tsx, Footer.tsx]
   * Liga/desliga o Blog Técnico de Elétrica (abre em uma nova página `?page=blog`).
   */
  enableBlogSection: true,

  /**
   * [USADO EM: src/components/ContactSection.tsx]
   * Liga/desliga o Formulário de Captura de Leads e Cálculo de Orçamento na página.
   */
  enableContactSection: true,

  /**
   * [USADO EM: src/components/SeoLocal.tsx]
   * Liga/desliga a seção de SEO Local (Serviços em Ponta Grossa, Bairros e FAQ).
   */
  enableSeoLocalSection: true,

  /**
   * [USADO EM: src/components/WhatsAppFloating.tsx]
   * Liga/desliga o botão flutuante redondo fixo na tela com o símbolo oficial do WhatsApp.
   */
  enableFloatingWhatsApp: true,

  /**
   * [USADO EM: Hero.tsx, ContactSection.tsx, WhatsAppFloating.tsx]
   * Liga/desliga o brilho cintilante nos botões principais de conversão (CTA).
   */
  enableShimmerCta: true,

  /**
   * [USADO EM: src/components/Footer.tsx]
   * Liga/desliga o contador discreto e elegante de acessos no rodapé da página.
   */
  enableFooterAccessCounter: true,
};

// ============================================================================
// [SEÇÃO 2] GUIA E CONFIGURAÇÃO DE FORMATAÇÃO E ALINHAMENTOS
// (CENTRALIZAR, ESQUERDA, DIREITA, CIMA E BAIXO)
// ============================================================================
/**
 * COMO MUDAR ALINHAMENTOS NO SITE (INSTRUÇÕES COMENTADAS):
 *
 * 1) ALINHAMENTO HORIZONTAL (ESQUERDA, CENTRO, DIREITA):
 *    - Para alinhar à ESQUERDA: use `"left"`
 *    - Para CENTRALIZAR:        use `"center"`
 *    - Para alinhar à DIREITA:  use `"right"`
 *
 * 2) ALINHAMENTO VERTICAL ENTRE COLUNAS (CIMA, MEIO, BAIXO):
 *    - Para alinhar pelo TOPO (Cima):   use `"top"`
 *    - Para alinhar pelo MEIO (Centro): use `"middle"`
 *    - Para alinhar por BAIXO (Base):   use `"bottom"`
 *
 * 3) POSIÇÃO DO BOTÃO FLUTUANTE DO WHATSAPP:
 *    - Canto Inferior Direito (Padrão): `floatingWhatsappPosition: "bottom-right"`
 *    - Canto Inferior Esquerdo:         `floatingWhatsappPosition: "bottom-left"`
 *
 * 4) TABELA DE CLASSES TAILWIND (Caso queira editar direto em um componente `.tsx`):
 *    - Texto à Esquerda: `text-left`   | Texto Centralizado: `text-center`   | Texto à Direita: `text-right`
 *    - Flex na Esquerda: `justify-start` | Flex no Centro: `justify-center` | Flex na Direita: `justify-end`
 *    - Flex em Cima:     `items-start`   | Flex no Meio:   `items-center`   | Flex em Baixo:   `items-end`
 *    - Subir elemento (margem/padding): diminua `pt-...` ou use `-mt-2`
 *    - Descer elemento (margem/padding): aumente `mt-4` ou `pt-6`
 */
export const LAYOUT_ALIGNMENT_CONFIG = {
  /**
   * [USADO EM: src/components/Header.tsx]
   * Alinhamento do Slogan no meio da barra fixa superior: `"left"` | `"center"` | `"right"`
   */
  headerSloganAlign: "center" as "left" | "center" | "right",

  /**
   * [USADO EM: src/components/Header.tsx]
   * Largura do ícone que carrega as iniciais "JJ":
   * - `"normal"` (quadrado 40px)
   * - `"wide"`   (alargado retangular elegante 56px - PADRÃO SOLICITADO)
   * - `"extra-wide"` (bem largo 68px)
   */
  logoBadgeWidth: "wide" as "normal" | "wide" | "extra-wide",

  /**
   * [USADO EM: src/components/Hero.tsx]
   * Alinhamento dos textos principais do Hero: `"left"` (Esquerda) | `"center"` (Centralizado) | `"right"` (Direita)
   */
  heroTextAlign: "left" as "left" | "center" | "right",

  /**
   * [USADO EM: src/components/Hero.tsx]
   * Alinhamento vertical entre a coluna de textos e a foto da lâmpada:
   * `"top"` (Em cima) | `"middle"` (No meio) | `"bottom"` (Embaixo)
   */
  heroVerticalAlign: "middle" as "top" | "middle" | "bottom",

  /**
   * [USADO EM: PortfolioCarousel.tsx, PortfolioGrid.tsx, Testimonials.tsx, ContactSection.tsx, SeoLocal.tsx]
   * Alinhamento dos títulos das seções: `"left"` | `"center"` | `"right"`
   */
  sectionHeadersAlign: "center" as "left" | "center" | "right",

  /**
   * [USADO EM: src/components/WhatsAppFloating.tsx]
   * Posição do botão flutuante do WhatsApp na tela: `"bottom-right"` (Direita) | `"bottom-left"` (Esquerda)
   */
  floatingWhatsappPosition: "bottom-right" as "bottom-right" | "bottom-left",
};

// ============================================================================
// [SEÇÃO 3] CONFIGURAÇÃO DA ANIMAÇÃO ELÉTRICA DO HERO (TEXTOS, QUANTIDADE E CORES)
// [USADO EM: src/components/Hero.tsx]
// ============================================================================
/**
 * COMO EDITAR A ANIMAÇÃO ABAIXO DO TÍTULO:
 * 1. Para mudar os TEXTOS de cada ícone: basta alterar as palavras dentro da lista `items` abaixo.
 * 2. Para mudar a QUANTIDADE de ícones mostrados: altere o número em `maxItemsToShow`
 *    (ex: `3`, `4` ou `5`) ou adicione/remova itens da lista `items`.
 * 3. Como funciona o efeito visual:
 *    - Todos os ícones começam LARANJAS (`amber-500`).
 *    - Conforme a energia avança, cada ícone por onde a energia passa fica VERDE (`emerald-500`).
 *    - Quando todos ficam verdes, o ciclo reseta e todos voltam a ficar LARANJAS.
 */
export const HERO_ANIMATION_CONFIG = {
  /** Quantidade de itens que serão exibidos na barra de animação (ex: 3, 4 ou 5) */
  maxItemsToShow: 4,

  /** Velocidade (em milissegundos) com que a energia passa de um ícone para o próximo */
  stepSpeedMs: 850,

  /** Tempo (em milissegundos) que todos permanecem verdes antes de resetar para laranja */
  resetPauseMs: 1100,

  /**
   * Textos dos itens da animação (edite os nomes livremente abaixo).
   * Se quiser 3 itens, mude `maxItemsToShow: 3` acima. Se quiser 5, mude para `5`.
   */
  items: [
    "Diagnóstico",
    "QDC NBR 5410",
    "Iluminação LED",
    "Garantia Total",
    "Plantão PG", // 5º item opcional (aparece se você mudar maxItemsToShow para 5)
  ],
};

// ============================================================================
// [SEÇÃO 4] QUANTIDADE INICIAL DE ITENS POR SEÇÃO (ANTES DE CLICAR EM "VER MAIS")
// [USADO EM: PortfolioGrid.tsx, Testimonials.tsx, AboutSection.tsx, ContactSection.tsx, SeoLocal.tsx]
// ============================================================================
export const SECTION_ITEMS_CONFIG = {
  /** Quantas fotos aparecem inicialmente na grade de Portfólio antes de clicar em "Ver mais" */
  portfolioInitialCount: 1,

  /** Quantos depoimentos do Google aparecem inicialmente antes de clicar em "Ver mais" */
  testimonialsInitialCount: 1,

  /** Quantos diferenciais aparecem inicialmente na seção Nossa História */
  aboutPillarsInitialCount: 1,

  /** Quantos artigos do Blog aparecem inicialmente na página inicial */
  blogInitialCount: 1,

  /** Quantas caixas de serviços aparecem inicialmente no formulário de orçamento */
  formCheckboxesInitialCount: 1,

  /** Quantas especialidades de SEO aparecem inicialmente na seção de Serviços em PG */
  seoServicesInitialCount: 1,

  /** Quantas perguntas frequentes (FAQ) aparecem inicialmente */
  faqInitialCount: 1,

  /** Quantos bairros de Ponta Grossa aparecem inicialmente antes de clicar em "Ver todos" */
  neighborhoodsInitialCount: 6,
};

// ============================================================================
// [SEÇÃO 5] DADOS GERAIS DA EMPRESA, SLOGAN, BOTÕES, WHATSAPP E E-MAILS
// ============================================================================
export const SITE_CONFIG = {
  /** [USADO EM: Header.tsx, Hero.tsx, Footer.tsx] Nome da empresa e iniciais do ícone */
  companyName: "J&J Elétrica",
  professionalName: "Eletricista Johnny",
  logoInitials: "JJ",
  logoImagePath: "",

  /**
   * [USADO EM: Header.tsx (no centro da barra fixa), Hero.tsx, Footer.tsx]
   * Slogan ajustado para aparecer completo ocupando até 90%+ do espaço central da barra.
   */
  slogan: "Iluminando seu sonho com segurança e precisão",
  sloganMobile: "Iluminando seu sonho",

  /**
   * [USADO EM: Hero.tsx -> Selos posicionados ABAIXO dos textos grandes]
   */
  experienceYears: 25,
  experienceBadgeText: "+25 Anos de Experiência",
  regionBadgeText: "Residencial e Comercial em Ponta Grossa",
  city: "Ponta Grossa",
  state: "PR",
  region: "Campos Gerais",

  /**
   * [USADO EM: Hero.tsx -> Texto do botão principal de orçamento]
   */
  heroPrimaryBtnText: "Fazer Orçamento Aproximado Agora",
  heroWhatsAppBtnText: "WhatsApp",

  /**
   * [USADO EM: analytics.ts -> logWhatsAppClick(), WhatsAppFloating.tsx, Hero.tsx, ContactSection.tsx]
   * Número oficial do WhatsApp cadastrado: 55429998455688
   */
  whatsappNumber: env.VITE_WHATSAPP_NUMBER || "55429998455688",
  whatsappDisplay: "(42) 99984-55688",
  whatsappDefaultMsg:
    "Olá Johnny! Vi o site da J&J Elétrica em Ponta Grossa e gostaria de solicitar um orçamento elétrico.",

  /**
   * [USADO EM: analytics.ts -> enviarLeadAppsScript(), ContactSection.tsx, Footer.tsx]
   * E-mail principal que recebe o 2º disparo automático de cada orçamento.
   */
  ownerEmail: env.VITE_OWNER_EMAIL || "eletricistajohnny@gmail.com",
  businessHours: "Seg a Sex: 08h às 18h30 | Sáb: 08h às 13h",

  /**
   * [USADO EM: src/App.tsx e src/utils/analytics.ts]
   * URL do Webhook do Google Apps Script (definida em `.env` -> VITE_GOOGLE_APPS_SCRIPT_URL)
   */
  appsScriptUrl: env.VITE_GOOGLE_APPS_SCRIPT_URL || "",
  ga4MeasurementId: env.VITE_GA4_MEASUREMENT_ID || "",
  gtmId: env.VITE_GTM_ID || "",

  /**
   * [USADO EM: ContactSection.tsx, ContactModal.tsx, SeoLocal.tsx]
   * Política transparente de cobrança de visita técnica / orçamento presencial.
   */
  visitFeeFormatted: "R$ 80,00",
  visitFeeNotice:
    "O valor calculado no site é uma estimativa aproximada inicial. Pessoalmente, após vistoria técnica no local em Ponta Grossa, apresentarei o valor final exato. A visita técnica de diagnóstico e orçamento detalhado possui taxa de R$ 80,00 (100% abatida/descontada caso você feche o serviço conosco).",

  /** [USADO EM: Testimonials.tsx e Footer.tsx] Links externos e redes sociais */
  googleReviewUrl:
    "https://search.google.com/local/writereview?placeid=SEU_PLACE_ID_GOOGLE_MEU_NEGOCIO",
  social: {
    instagram: "https://instagram.com/jjeletricapg",
    facebook: "https://facebook.com/jjeletricapg",
    youtube: "https://youtube.com/@jjeletricapg",
    maps: "https://maps.google.com/?q=Ponta+Grossa+PR",
  },

  /** [USADO EM: Footer.tsx e analytics.ts] Número base do contador de acessos no rodapé */
  accessCounterBase: 4820,
};

// ============================================================================
// [SEÇÃO 6] GALERIA DE IMAGENS SALVAS NO PROJETO (`public/galeria/`)
// Como editar futuramente:
// - Todas as fotos estão salvas na pasta `public/galeria/` e `public/edicao/imagens/`.
// - Para trocar por outra foto da galeria, use `"/galeria/nome-da-foto.jpg"`
//   ou cole um link direto da internet `"https://..."`.
// ============================================================================
export const IMAGENS_DO_SITE = {
  /** [USADO EM: src/components/Hero.tsx] Foto principal da lâmpada Edison (salva em public/galeria/lampada-edison-hero.jpg) */
  heroLampadaEdison: EMBEDDED_PORTFOLIO_IMAGES.lampadaEdisonHero,
  heroLampadaGaleriaPath: "/galeria/lampada-edison-hero.jpg",
  heroLampadaFallbackInternet:
    "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=85",

  /** [USADO EM: PROJECTS_DATA[0]] Quadro QDC Residencial NBR 5410 (salva em public/galeria/qdc-residencial-padrao-nbr5410.jpg) */
  obraQdcResidencial: EMBEDDED_PORTFOLIO_IMAGES.qdcResidencialNbr5410,
  obraQdcResidencialGaleriaPath: "/galeria/qdc-residencial-padrao-nbr5410.jpg",
  obraQdcResidencialFallback:
    "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=85",

  /** [USADO EM: PROJECTS_DATA[1]] Cristaleira Iluminação LED 3000K (salva em public/galeria/cristaleira-led-quente.jpg) */
  obraCristaleiraLed: EMBEDDED_PORTFOLIO_IMAGES.cristaleiraLedQuente,
  obraCristaleiraGaleriaPath: "/galeria/cristaleira-led-quente.jpg",
  obraCristaleiraFallback:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",

  /** [USADO EM: PROJECTS_DATA[2] e AboutSection.tsx] Quadro Comercial Barramento de Cobre (salva em public/galeria/qdc-comercial-barramento-cobre.jpg) */
  obraQdcComercialCobre: EMBEDDED_PORTFOLIO_IMAGES.qdcComercialCobre,
  obraQdcComercialGaleriaPath: "/galeria/qdc-comercial-barramento-cobre.jpg",
  obraQdcComercialFallback:
    "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85",

  /** [USADO EM: PROJECTS_DATA[3]] Estante com Nichos Iluminados em LED (salva em public/galeria/estante-nichos-led.jpg) */
  obraEstanteNichosLed: EMBEDDED_PORTFOLIO_IMAGES.estanteNichosLed,
  obraEstanteGaleriaPath: "/galeria/estante-nichos-led.jpg",
  obraEstanteFallback:
    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=85",

  /** [USADO EM: PROJECTS_DATA[4]] Quadro QDC Setorizado por Suítes (salva em public/galeria/qdc-suites-alto-padrao.jpg) */
  obraQdcSuites: EMBEDDED_PORTFOLIO_IMAGES.qdcSuitesAltoPadrao,
  obraQdcSuitesGaleriaPath: "/galeria/qdc-suites-alto-padrao.jpg",
  obraQdcSuitesFallback:
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85",

  /** [USADO EM: PROJECTS_DATA[5]] Painel Ripado com Fita de LED e Tomadas (salva em public/galeria/painel-ripado-iluminacao.jpg) */
  obraPainelRipadoLed: EMBEDDED_PORTFOLIO_IMAGES.painelRipadoLed,
  obraPainelRipadoGaleriaPath: "/galeria/painel-ripado-iluminacao.jpg",
  obraPainelRipadoFallback:
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
};

export const HERO_LAMP_IMAGE = IMAGENS_DO_SITE.heroLampadaEdison;

// ============================================================================
// [SEÇÃO 7] LISTA DE TRABALHOS ELÉTRICOS (CARROSSEL DE DESTAQUES & PORTFÓLIO)
// [USADO EM: PortfolioCarousel.tsx, PortfolioGrid.tsx e ProjectModal.tsx]
// ============================================================================
export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: "Residencial" | "Comercial" | "Quadros QDC" | "Iluminação LED";
  location: string;
  image: string;
  galeriaPath: string;
  fallbackImage: string;
  badge: string;
  summary: string;
  specs: string[];
  estimatedRange: string;
  relatedServiceId: string;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "1",
    slug: "qdc-residencial-nbr5410",
    title: "Quadro de Distribuição (QDC) Padrão ABNT NBR 5410",
    category: "Quadros QDC",
    location: "Condomínio Residencial • Ponta Grossa - PR",
    image: IMAGENS_DO_SITE.obraQdcResidencial,
    galeriaPath: IMAGENS_DO_SITE.obraQdcResidencialGaleriaPath,
    fallbackImage: IMAGENS_DO_SITE.obraQdcResidencialFallback,
    badge: "Engenharia & Segurança NBR 5410",
    summary:
      "Montagem cirúrgica de quadro elétrico com 4 barramentos DIN, cabeamento penteado e identificado por circuito, proteção DR contra choques e DPS contra raios.",
    specs: [
      "Disjuntor geral trifásico Soprano + DPS Classe II contra surtos elétricos",
      "Identificação individual de todos os circuitos (Suítes, Ar, Forno, Chuveiros)",
      "Terminais tubulares prensados em 100% dos cabos (zero mau contato)",
      "Separação rigorosa de barramentos Neutro (azul) e Terra (verde)",
    ],
    estimatedRange: "R$ 480 a R$ 1.250",
    relatedServiceId: "qdc-montagem",
  },
  {
    id: "2",
    slug: "cristaleira-iluminacao-led-quente",
    title: "Iluminação Arquitetônica LED 3000K em Cristaleira Reflecta",
    category: "Iluminação LED",
    location: "Jardim Carvalho • Ponta Grossa - PR",
    image: IMAGENS_DO_SITE.obraCristaleiraLed,
    galeriaPath: IMAGENS_DO_SITE.obraCristaleiraGaleriaPath,
    fallbackImage: IMAGENS_DO_SITE.obraCristaleiraFallback,
    badge: "Alto Padrão em Marcenaria",
    summary:
      "Instalação de perfis de alumínio com fita LED branco quente 3000K embutidos em cristaleira de pé-direito duplo, com fontes ocultas e fiação 100% invisível.",
    specs: [
      "Fita LED profissional de alto índice de reprodução de cor (IRC > 90)",
      "Fontes chaveadas slim alocadas em nicho técnico ventilado",
      "Acionamento instantâneo sem cintilação (flicker-free)",
      "Valorização imediata da arquitetura e marcenaria do imóvel",
    ],
    estimatedRange: "R$ 220 a R$ 540",
    relatedServiceId: "led-marcenaria",
  },
  {
    id: "3",
    slug: "qdc-comercial-barramento-cobre",
    title: "Quadro Comercial Trifásico com Barramento Espinha de Peixe em Cobre",
    category: "Comercial",
    location: "Centro • Ponta Grossa - PR",
    image: IMAGENS_DO_SITE.obraQdcComercialCobre,
    galeriaPath: IMAGENS_DO_SITE.obraQdcComercialGaleriaPath,
    fallbackImage: IMAGENS_DO_SITE.obraQdcComercialFallback,
    badge: "Alta Capacidade Comercial",
    summary:
      "Infraestrutura elétrica comercial com barramento central de cobre eletrolítico maciço, balanceamento de fases e proteção trifásica para climatização e equipamentos.",
    specs: [
      "Barramento de cobre dimensionado para operação contínua sem aquecimento",
      "3 Dispositivos DPS vermelhos de proteção contra descargas atmosféricas",
      "Equilíbrio entre fases R, S e T reduzindo desperdício na fatura",
      "Adequado para laudos técnicos, clínicas, lojas e escritórios",
    ],
    estimatedRange: "R$ 890 a R$ 2.400",
    relatedServiceId: "eletrica-comercial",
  },
  {
    id: "4",
    slug: "estante-planejada-perfis-led",
    title: "Estante Planejada com Perfis Lineares de LED Difuso",
    category: "Iluminação LED",
    location: "Uvaranas • Ponta Grossa - PR",
    image: IMAGENS_DO_SITE.obraEstanteNichosLed,
    galeriaPath: IMAGENS_DO_SITE.obraEstanteGaleriaPath,
    fallbackImage: IMAGENS_DO_SITE.obraEstanteFallback,
    badge: "Conforto Visual 3000K",
    summary:
      "Distribuição luminosa homogênea nos 6 nichos da estante planejada, com soldas isoladas em termo-retrátil e cálculo exato de tensão.",
    specs: [
      "Perfil embutido com difusor leitoso sem pontos marcados de LED",
      "Baixíssimo consumo energético e durabilidade superior a 30.000h",
      "Integração limpa durante a montagem da marcenaria",
    ],
    estimatedRange: "R$ 220 a R$ 540",
    relatedServiceId: "led-marcenaria",
  },
  {
    id: "5",
    slug: "qdc-suites-alto-padrao",
    title: "Quadro QDC Setorizado por Suítes com Terminais Isolados",
    category: "Quadros QDC",
    location: "Oficinas • Ponta Grossa - PR",
    image: IMAGENS_DO_SITE.obraQdcSuites,
    galeriaPath: IMAGENS_DO_SITE.obraQdcSuitesGaleriaPath,
    fallbackImage: IMAGENS_DO_SITE.obraQdcSuitesFallback,
    badge: "Organização Milimétrica",
    summary:
      "Quadro setorizado para suítes master e hóspedes, separando circuitos de iluminação, tomadas, chuveiros de alta potência e cortinas motorizadas.",
    specs: [
      "Crimpagem com terminais tubulares amarelos isolados em todos os disjuntores",
      "Curvas de cabos alinhadas para dissipação térmica ideal",
      "Reserva técnica prevista para ampliações futuras",
    ],
    estimatedRange: "R$ 480 a R$ 1.250",
    relatedServiceId: "qdc-montagem",
  },
  {
    id: "6",
    slug: "painel-ripado-iluminacao-tomadas",
    title: "Painel Ripado com Iluminação Indireta e Circuitos Dedicados",
    category: "Residencial",
    location: "Nova Rússia • Ponta Grossa - PR",
    image: IMAGENS_DO_SITE.obraPainelRipadoLed,
    galeriaPath: IMAGENS_DO_SITE.obraPainelRipadoGaleriaPath,
    fallbackImage: IMAGENS_DO_SITE.obraPainelRipadoFallback,
    badge: "Acabamento Fino",
    summary:
      "Luz linear valorizando o relevo da madeira ripada combinada com tomadas de alto padrão e circuito exclusivo para Home Theater.",
    specs: [
      "Nivelamento a laser de caixas e espelhos de tomada",
      "Isolamento contra interferência elétrica em cabos de áudio/vídeo",
      "Entrega limpa e testada com multímetro digital",
    ],
    estimatedRange: "R$ 180 a R$ 450",
    relatedServiceId: "instalacao-tomadas",
  },
];

// ============================================================================
// [SEÇÃO 8] TABELA DE SERVIÇOS E PREÇOS APROXIMADOS (FORMULÁRIO DE LEADS)
// [USADO EM: ContactSection.tsx, ContactModal.tsx e src/utils/analytics.ts]
// ============================================================================
export interface ElectricalServiceOption {
  id: string;
  name: string;
  type: "Residencial" | "Comercial" | "Ambos";
  minPrice: number;
  maxPrice: number;
  unit: string;
  scoreWeight: number;
}

export const ELECTRICAL_SERVICES: ElectricalServiceOption[] = [
  {
    id: "qdc-montagem",
    name: "Montagem / Reforma de Quadro Elétrico (QDC) NBR 5410",
    type: "Ambos",
    minPrice: 480,
    maxPrice: 1250,
    unit: "por quadro",
    scoreWeight: 25,
  },
  {
    id: "curto-circuito",
    name: "Conserto de Curto-Circuito, Queda de Disjuntor ou Fuga de Energia",
    type: "Ambos",
    minPrice: 140,
    maxPrice: 290,
    unit: "por diagnóstico/reparo",
    scoreWeight: 22,
  },
  {
    id: "led-marcenaria",
    name: "Iluminação Fita / Perfil de LED em Marcenaria, Cristaleira ou Sanca",
    type: "Ambos",
    minPrice: 220,
    maxPrice: 540,
    unit: "por móvel/ambiente",
    scoreWeight: 20,
  },
  {
    id: "troca-fiacao",
    name: "Reforma Elétrica Completa / Troca de Fiação Antiga",
    type: "Residencial",
    minPrice: 1400,
    maxPrice: 3400,
    unit: "por imóvel (base)",
    scoreWeight: 30,
  },
  {
    id: "eletrica-comercial",
    name: "Instalação / Manutenção Elétrica Comercial e Quadro Trifásico Cobre",
    type: "Comercial",
    minPrice: 890,
    maxPrice: 2400,
    unit: "por projeto/quadro",
    scoreWeight: 30,
  },
  {
    id: "instalacao-tomadas",
    name: "Instalação de Tomadas 127V/220V, Interruptores, Chuveiros ou Torneiras",
    type: "Residencial",
    minPrice: 130,
    maxPrice: 310,
    unit: "por pacote/ponto",
    scoreWeight: 12,
  },
  {
    id: "lustres-iluminacao",
    name: "Instalação de Lustres, Pendentes, Plafons, Spots ou Sensores",
    type: "Ambos",
    minPrice: 160,
    maxPrice: 360,
    unit: "por pacote (até 5 pts)",
    scoreWeight: 15,
  },
  {
    id: "padrao-aterramento",
    name: "Aterramento Elétrico, Proteção DPS (Raios) e Adequação de Carga",
    type: "Ambos",
    minPrice: 320,
    maxPrice: 780,
    unit: "por serviço",
    scoreWeight: 20,
  },
];

// ============================================================================
// [SEÇÃO 9] DEPOIMENTOS DO GOOGLE MEU NEGÓCIO (5 ESTRELAS)
// [USADO EM: src/components/Testimonials.tsx]
// ============================================================================
export interface TestimonialItem {
  id: string;
  name: string;
  initials: string;
  neighborhood: string;
  dateLabel: string;
  service: string;
  text: string;
  rating: number;
}

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "t1",
    name: "Carlos Eduardo Moro",
    initials: "CM",
    neighborhood: "Jardim Carvalho • Ponta Grossa",
    dateLabel: "Avaliação 5★ no Google",
    service: "Quadro QDC NBR 5410 + LED em Cristaleira",
    text: "Difícil encontrar eletricista com esse nível de capricho hoje em dia em Ponta Grossa. O quadro elétrico da minha casa ficou uma obra de arte, tudo identificado e alinhado. As fitas de LED na cristaleira valorizaram demais a sala!",
    rating: 5,
  },
  {
    id: "t2",
    name: "Dra. Fernanda Ribas",
    initials: "FR",
    neighborhood: "Centro • Ponta Grossa",
    dateLabel: "Avaliação 5★ no Google",
    service: "Quadro Comercial Trifásico com Barramento de Cobre",
    text: "Contratamos o Johnny (J&J Elétrica) para refazer o quadro trifásico da nossa clínica no Centro. Serviço extremamente limpo, pontual e seguro. Os disjuntores nunca mais desarmaram com os aparelhos de ar-condicionado ligados.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Marcos Vinícius & Juliana",
    initials: "MJ",
    neighborhood: "Oficinas • Ponta Grossa",
    dateLabel: "Avaliação 5★ no Google",
    service: "Reforma Elétrica + Painel Ripado Iluminado",
    text: "Mais de 25 anos de experiência fazem toda a diferença. Explicou cada detalhe no orçamento presencial, abatemos o valor da visita no fechamento e entregou antes do prazo combinado. Recomendamos de olhos fechados!",
    rating: 5,
  },
  {
    id: "t4",
    name: "Roberto Stadler",
    initials: "RS",
    neighborhood: "Uvaranas • Ponta Grossa",
    dateLabel: "Avaliação 5★ no Google",
    service: "Solução de Curto-Circuito + Proteção DPS e DR",
    text: "Eu tinha medo de curto-circuito porque a fiação antiga esquentava. A J&J Elétrica refez todo o quadro com terminais prensados e proteção contra raios. Profissional nota 1000.",
    rating: 5,
  },
];

// ============================================================================
// [SEÇÃO 10] ARTIGOS DO BLOG TÉCNICO (ABRE EM PÁGINA NOVA ?page=blog)
// [USADO EM: src/components/AboutSection.tsx e src/components/BlogStandalonePage.tsx]
// ============================================================================
export interface BlogArticle {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  fallbackImage: string;
  summary: string;
  content: string[];
  checklist: string[];
  relatedServiceId: string;
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: "como-evitar-curto-circuito-quadro-qdc-nbr-5410",
    title: "Quadro Elétrico (QDC) NBR 5410: Como Evitar Curto-Circuito e Reduzir a Conta de Luz",
    category: "Segurança & Quadros QDC",
    readTime: "4 min",
    date: "Outubro 2026",
    image: IMAGENS_DO_SITE.obraQdcResidencial,
    fallbackImage: IMAGENS_DO_SITE.obraQdcResidencialFallback,
    summary:
      "Fios embolados e disjuntores sem terminais geram aquecimento invisível que encarece a fatura de energia e coloca seu imóvel em risco. Veja como funciona a padronização NBR 5410.",
    content: [
      "O Quadro de Distribuição de Circuitos (QDC) é o coração da instalação elétrica da sua residência ou empresa em Ponta Grossa. Quando existem conexões frouxas ou emendas improvisadas, a corrente elétrica encontra resistência e se transforma em calor (Efeito Joule) — energia que você paga todo mês sem utilizar.",
      "Com mais de 25 anos de atuação, na J&J Elétrica organizamos cada circuito individualmente, utilizando terminais tubulares prensados, barramentos de cobre isolados, proteção DR (contra choques elétricos) e DPS (contra surtos e raios).",
    ],
    checklist: [
      "Disjuntores DIN dimensionados para a bitola exata de cada cabo",
      "Interruptor Diferencial Residual (IDR) que protege crianças e animais contra choques",
      "DPS Classe II para evitar queima de geladeira, TV e ar-condicionado em dias de chuva",
      "Etiquetas claras identificando cada ambiente do imóvel",
    ],
    relatedServiceId: "qdc-montagem",
  },
  {
    slug: "iluminacao-led-marcenaria-cristaleira-sem-fios-aparentes",
    title: "Iluminação LED em Marcenaria e Cristaleiras: O Acabamento que Valoriza seu Imóvel",
    category: "Iluminação Arquitetônica",
    readTime: "3 min",
    date: "Outubro 2026",
    image: IMAGENS_DO_SITE.obraCristaleiraLed,
    fallbackImage: IMAGENS_DO_SITE.obraCristaleiraFallback,
    summary:
      "Vai instalar móveis planejados, cristaleira em vidro reflecta ou painel ripado? Entenda como planejar perfis de LED 3000K com fontes ocultas.",
    content: [
      "O segredo de uma marcenaria iluminada de alto padrão está na preparação elétrica antes e durante a montagem do móvel. Utilizando perfis de alumínio com difusor acrílico e fitas LED 3000K, criamos uma linha de luz contínua e aconchegante.",
      "Além da estética impecável, posicionamos as fontes chaveadas em locais ventilados e invisíveis, garantindo manutenção simples por muitos anos.",
    ],
    checklist: [
      "Luz quente 3000K que proporciona conforto visual imediato na sala ou área gourmet",
      "Zero fios aparentes ou fontes penduradas atrás do móvel",
      "Soldas protegidas com termo-retrátil de alta isolação",
    ],
    relatedServiceId: "led-marcenaria",
  },
  {
    slug: "manutencao-eletrica-comercial-barramento-cobre-ponta-grossa",
    title: "Elétrica Comercial em Ponta Grossa: Por que Usar Barramento Espinha de Peixe em Cobre?",
    category: "Elétrica Comercial",
    readTime: "4 min",
    date: "Setembro 2026",
    image: IMAGENS_DO_SITE.obraQdcComercialCobre,
    fallbackImage: IMAGENS_DO_SITE.obraQdcComercialFallback,
    summary:
      "Clínicas, lojas e escritórios não podem parar por queda de disjuntor. Conheça a durabilidade dos quadros trifásicos com barramento de cobre.",
    content: [
      "Ambientes comerciais exigem climatização ligada o dia inteiro, iluminação intensa e computadores operando sem oscilação. O barramento espinha de peixe em cobre eletrolítico suporta altas cargas com estabilidade térmica superior.",
      "Também realizamos o balanceamento das 3 fases (R, S, T), evitando sobrecarga em uma única fase e garantindo conformidade com seguradoras e Corpo de Bombeiros.",
    ],
    checklist: [
      "Distribuição equilibrada para aparelhos de ar-condicionado e equipamentos comerciais",
      "Alta condutividade elétrica e resistência mecânica",
      "Facilidade para expansão futura de novos circuitos",
    ],
    relatedServiceId: "eletrica-comercial",
  },
];

// ============================================================================
// [SEÇÃO 11] CONTEÚDO DE SEO LOCAL (SERVIÇOS ATENDIDOS, BAIRROS DE PG E FAQ)
// [USADO EM: src/components/SeoLocal.tsx e src/components/ContactSection.tsx]
// ============================================================================
export interface SeoServicePillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  keywords: string[];
}

export interface SeoFaqItem {
  question: string;
  answer: string;
  badge?: string;
}

export const SEO_LOCAL_CONTENT = {
  sectionTitle: "Eletricista Residencial e Comercial em Ponta Grossa - PR",
  sectionSubtitle:
    "Mais de 25 anos atendendo residências, condomínios e empresas com instalações elétricas, conserto de curto-circuito, quadros QDC NBR 5410 e iluminação LED.",

  servicePillars: [
    {
      id: "pilar-qdc-curto",
      title: "Montagem de Quadros QDC NBR 5410 & Solução de Curto-Circuito",
      subtitle: "Proteção contra choques (DR), raios (DPS) e eliminação de quedas de disjuntor",
      description:
        "Diagnosticamos aquecimento de cabos, disjuntores desarmando, cheiro de queimado e fuga de energia que aumenta a conta da Copel. Refazemos quadros elétricos com terminais prensados e identificação completa de cada circuito.",
      keywords: [
        "Eletricista urgente Ponta Grossa",
        "Conserto de curto-circuito PG",
        "Montagem de quadro elétrico QDC",
        "Instalação de DR e DPS",
      ],
    },
    {
      id: "pilar-led-marcenaria",
      title: "Iluminação LED em Marcenaria, Cristaleiras, Painel Ripado e Gesso",
      subtitle: "Acabamento luminotécnico 3000K com fontes chaveadas ocultas",
      description:
        "Instalação limpa de fitas e perfis de LED em móveis planejados, cristaleiras de vidro reflecta, estantes com nichos, sancas de gesso, lustres e pendentes decorativos.",
      keywords: [
        "Fita LED marcenaria Ponta Grossa",
        "Iluminação cristaleira e painel ripado",
        "Instalação de lustres e pendentes",
      ],
    },
    {
      id: "pilar-comercial-trifasico",
      title: "Elétrica Comercial Trifásica & Manutenção para Empresas",
      subtitle: "Quadros com barramento espinha de peixe em cobre e balanceamento de fases",
      description:
        "Atendimento especializado para clínicas, lojas, escritórios e restaurantes em Ponta Grossa. Dimensionamento de circuitos para ar-condicionado, iluminação comercial e adequação de carga.",
      keywords: [
        "Eletricista comercial Ponta Grossa",
        "Quadro trifásico barramento cobre",
        "Manutenção elétrica preventiva empresas",
      ],
    },
    {
      id: "pilar-reforma-residencial",
      title: "Reforma Elétrica Residencial, Tomadas 220V e Chuveiros",
      subtitle: "Substituição de fiação antiga e adequação para eletrodomésticos modernos",
      description:
        "Troca de cabos rígidos ou ressecados por cabos flexíveis normatizados, criação de circuitos dedicados para forno elétrico, cooktop por indução, AirFryer e chuveiros de alta potência.",
      keywords: [
        "Reforma elétrica residencial PG",
        "Troca de fiação antiga",
        "Instalação de chuveiro e tomada 220V",
      ],
    },
  ] as SeoServicePillar[],

  neighborhoods: [
    "Centro",
    "Oficinas",
    "Jardim Carvalho",
    "Uvaranas",
    "Nova Rússia",
    "Estrela",
    "Órfãs",
    "Boa Vista",
    "Contorno",
    "Neves",
    "Ronda",
    "Olarias",
    "Chapada",
    "Colônia Dona Luiza",
    "Condomínios Fechados em PG",
  ],

  faqs: [
    {
      question: "Como funciona o orçamento aproximado pelo site e a visita técnica presencial?",
      badge: "Transparência",
      answer:
        "Pelo formulário aqui do site você escolhe os serviços e recebe imediatamente na tela (e no seu e-mail cadastrado) uma estimativa aproximada de mão de obra. Para entregar o valor final exato, o Eletricista Johnny vai pessoalmente até o seu imóvel em Ponta Grossa avaliar conduítes, distância de fiação e o quadro elétrico. Essa vistoria e orçamento presencial possui taxa técnica de R$ 80,00, que é 100% ABATIDA/DESCONTADA do valor do serviço assim que você fechar o serviço conosco!",
    },
    {
      question: "Atendem emergências de curto-circuito e disjuntor desarmando em Ponta Grossa?",
      answer:
        "Sim! Realizamos diagnóstico preciso com instrumentos digitais (alicate amperímetro e teste de isolação) para identificar sobrecarga, curto-circuito ou fuga de corrente em residências e comércios.",
    },
    {
      question: "Por que contratar a J&J Elétrica (+25 anos de experiência)?",
      answer:
        "Com mais de 25 anos atuando em Ponta Grossa, seguimos rigorosamente a norma ABNT NBR 5410. Não fazemos emendas improvisadas: entregamos quadros QDC organizados fio a fio, com terminais prensados, segurança contra incêndio e garantia técnica.",
    },
    {
      question: "Vocês instalam fitas de LED em móveis planejados e cristaleiras?",
      answer:
        "Sim! Somos especialistas em iluminação para marcenaria (cristaleiras, estantes, painéis ripados e cozinhas planejadas), ocultando 100% dos fios e posicionando as fontes em locais ventilados de fácil acesso.",
    },
  ] as SeoFaqItem[],
};
