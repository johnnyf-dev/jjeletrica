# Guia de Hospedagem Estática no Cloudflare Pages & Mesclagem de Projeto
## J&J Elétrica — Ponta Grossa - PR (+25 Anos)

Este projeto foi arquitetado como uma **SPA/Static Build (React + TypeScript + Tailwind CSS + Vite)** pronta para deploy imediato no **Cloudflare Pages** e otimizada para conversão no **Google Meu Negócio**.

---

## 1. Onde Editar Tudo Facilmente (`src/config/siteConfig.ts`)
Todo o conteúdo visível, telefones, WhatsApp, textos, preços de serviços e as **Flags de Ativação/Desativação (`INITIAL_FEATURE_FLAGS`)** estão concentrados em um único arquivo:
👉 **`src/config/siteConfig.ts`**

### Flags Disponíveis (`true` = ligado / `false` = desligado):
- `enableElectricHeroAnimation`: Animação acolhedora de eletricidade e lâmpada abaixo do menu fixo.
- `enableBulbInteractiveSwitch`: Interruptor interativo na lâmpada do Hero.
- `enableHighlightsCarousel`: Carrossel de Destaques com Lightbox 80% (clicou abriu 80%, clicou fechou).
- `enablePortfolioSection`: Galeria de Portfólio filtrável com fotos da pasta `public/images/portfolio/`.
- `enableBudgetCalculator`: Formulário e Calculadora de Orçamento Aproximado + envio Google Sheets.
- `enableInstantPriceEstimate`: Mostra o valor aproximado na hora após enviar o formulário.
- `enableVisitFeeNotice`: Aviso transparente sobre cobrança de orçamento presencial abatida no fechamento.
- `enableGoogleReviewsSection`: Seção de Depoimentos com 5 estrelas do Google.
- `enableGoogleReviewButton`: **Desativado (`false`) por padrão**, conforme solicitado. Mude para `true` quando quiser liberar o botão de avaliar.
- `enableStorySection`: Seção Sobre a História (+25 anos em Ponta Grossa).
- `enableFaqSection`: Perguntas e Respostas (incluindo explicação sobre orçamento presencial).
- `enableSeoCatalogSection`: Seção de SEO Local (serviços e bairros atendidos em Ponta Grossa).
- `enableFloatingWhatsApp`: Botão flutuante de WhatsApp.

---

## 2. Pasta de Imagens (`public/images/portfolio/`)
Todas as fotos de quadros QDC, barramentos de cobre, marcenarias iluminadas com LED e a lâmpada Edison ficam em:
👉 **`public/images/portfolio/`**
Para adicionar ou trocar fotos, basta salvar a imagem nessa pasta e atualizar o caminho em `src/config/siteConfig.ts`.

---

## 3. Como Publicar no Cloudflare Pages
1. Suba este repositório no seu GitHub / GitLab ou use o upload direto (`Direct Upload`).
2. No painel do **Cloudflare Pages**, configure:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
3. O site é 100% estático, rápido (nota máxima no PageSpeed) e gratuito na camada Free do Cloudflare Pages.
