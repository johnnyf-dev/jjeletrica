# 📘 DOCUMENTAÇÃO COMPLETA DO PROJETO & RASTREAMENTO DE VARIÁVEIS
## J&J Elétrica — Ponta Grossa - PR (+25 Anos)

Esta documentação mostra exatamente **onde editar cada item**, **como centralizar ou alinhar elementos (esquerda, direita, cima e baixo)**, **onde alterar os textos da animação e a quantidade de itens** e **como rastrear cada variável** a partir do arquivo central **`src/config/siteConfig.ts`**.

---

## 1. Mapa das 11 Seções do Arquivo Principal de Edição (`src/config/siteConfig.ts`)

| Seção em `src/config/siteConfig.ts` | O Que Você Edita Lá | Onde Impacta no Site |
| :--- | :--- | :--- |
| **`[SEÇÃO 1] FEATURE_FLAGS`** | Ligar (`true`) ou desligar (`false`) a bolinha verde da logo (`enableLogoGreenDot`), o texto do botão de Whats no Hero (`enableHeroWhatsAppButtonText`), a animação do título (`enableHeroTitleAnimation`), o botão de avaliar no Google (`enableGoogleReviewButton`), o Blog e o contador do rodapé. | `Header.tsx`, `Hero.tsx`, `Testimonials.tsx`, `Footer.tsx`, `WhatsAppFloating.tsx` |
| **`[SEÇÃO 2] LAYOUT_ALIGNMENT_CONFIG`** | Centralizar (`"center"`), pôr para a esquerda (`"left"`), direita (`"right"`), cima (`"top"`), meio (`"middle"`) ou baixo (`"bottom"`), além da largura do ícone `JJ` (`"wide"`). | `Header.tsx`, `Hero.tsx`, `PortfolioGrid.tsx`, `WhatsAppFloating.tsx` |
| **`[SEÇÃO 3] HERO_ANIMATION_CONFIG`** | Editar os **textos dos ícones da animação** (`items`), a **quantidade de ícones** (`maxItemsToShow`) e a velocidade em que a energia pinta cada ícone de **verde** e reseta para **laranja**. | `src/components/Hero.tsx` |
| **`[SEÇÃO 4] SECTION_ITEMS_CONFIG`** | Definir a **quantidade inicial de itens** que aparece em cada seção antes de o visitante clicar em *"Ver mais"*. | `PortfolioGrid.tsx`, `Testimonials.tsx`, `AboutSection.tsx`, `ContactSection.tsx`, `SeoLocal.tsx` |
| **`[SEÇÃO 5] SITE_CONFIG`** | Nome `J&J Elétrica`, Slogan da barra fixa, texto do botão principal (`"Fazer Orçamento Aproximado Agora"`), WhatsApp (`55429998455688`), E-mail (`eletricistajohnny@gmail.com`) e URL do Google Apps Script. | Todo o site e `src/utils/analytics.ts` |
| **`[SEÇÃO 6] IMAGENS_DO_SITE`** | Caminhos das fotos salvas na galeria (`public/galeria/`) ou links da internet (`https://...`). | `Hero.tsx`, `PortfolioCarousel.tsx`, `PortfolioGrid.tsx`, `AboutSection.tsx` |
| **`[SEÇÃO 7] PROJECTS_DATA`** | Títulos, descrições técnicas e faixas de preço das obras do Carrossel e Portfólio. | `PortfolioCarousel.tsx`, `PortfolioGrid.tsx`, `ProjectModal.tsx` |
| **`[SEÇÃO 8] ELECTRICAL_SERVICES`** | Serviços elétricos e preços mínimo/máximo usados no cálculo automático do formulário. | `ContactSection.tsx`, `ContactModal.tsx`, `src/utils/analytics.ts` |
| **`[SEÇÃO 9] TESTIMONIALS_DATA`** | Depoimentos 5 estrelas de clientes de Ponta Grossa. | `src/components/Testimonials.tsx` |
| **`[SEÇÃO 10] BLOG_ARTICLES`** | Artigos técnicos de elétrica que abrem em uma nova página (`?page=blog`). | `AboutSection.tsx`, `BlogStandalonePage.tsx` |
| **`[SEÇÃO 11] SEO_LOCAL_CONTENT`** | Serviços em Ponta Grossa, bairros atendidos e Perguntas e Respostas (FAQ). | `SeoLocal.tsx`, `ContactSection.tsx` |

---

## 2. Como Centralizar e Alinhar Elementos (Esquerda, Direita, Cima e Baixo)

Abra **`src/config/siteConfig.ts`** na **`[SEÇÃO 2] LAYOUT_ALIGNMENT_CONFIG`**:

```ts
export const LAYOUT_ALIGNMENT_CONFIG = {
  // Alinhamento do Slogan no meio da barra fixa: "left" (Esquerda) | "center" (Centro) | "right" (Direita)
  headerSloganAlign: "center",

  // Largura do ícone com as iniciais "JJ": "normal" | "wide" (Alargado) | "extra-wide" (Bem largo)
  logoBadgeWidth: "wide",

  // Alinhamento dos textos principais do Hero: "left" | "center" | "right"
  heroTextAlign: "left",

  // Alinhamento vertical entre textos do Hero e foto da lâmpada: "top" (Cima) | "middle" (Meio) | "bottom" (Baixo)
  heroVerticalAlign: "middle",

  // Alinhamento dos títulos das seções: "left" | "center" | "right"
  sectionHeadersAlign: "center",

  // Posição do botão flutuante do WhatsApp: "bottom-right" (Direita) | "bottom-left" (Esquerda)
  floatingWhatsappPosition: "bottom-right",
};
```

---

## 3. Onde Editar os Textos da Animação e a Quantidade de Itens

### A) Editar Textos e Quantidade de Ícones da Animação (`HERO_ANIMATION_CONFIG`):
Em **`src/config/siteConfig.ts`** (`[SEÇÃO 3]`):
- Para mudar os nomes abaixo dos ícones que ficam verdes quando a energia passa, edite a lista `items`:
  ```ts
  items: [
    "Diagnóstico",
    "QDC NBR 5410",
    "Iluminação LED",
    "Garantia Total",
  ],
  ```
- Para mostrar menos ou mais ícones (ex.: 3, 4 ou 5), basta mudar o número em `maxItemsToShow: 4`.

### B) Editar a Quantidade Inicial de Itens de Cada Seção (`SECTION_ITEMS_CONFIG`):
Em **`src/config/siteConfig.ts`** (`[SEÇÃO 4]`):
- Altere qualquer número abaixo para definir quantos cards aparecem antes do botão *"Ver mais"*:
  - `portfolioInitialCount: 1` (Obras no Portfólio)
  - `testimonialsInitialCount: 1` (Avaliações do Google)
  - `aboutPillarsInitialCount: 1` (Diferenciais na História)
  - `blogInitialCount: 1` (Artigos do Blog)
  - `formCheckboxesInitialCount: 1` (Caixas de serviço no formulário)
  - `seoServicesInitialCount: 1` (Especialidades na seção de SEO)
  - `faqInitialCount: 1` (Perguntas Frequentes)
