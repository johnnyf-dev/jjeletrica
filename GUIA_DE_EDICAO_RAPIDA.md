# GUIA DE EDIÇÃO RÁPIDA — J&J ELÉTRICA (PONTA GROSSA - PR)

Tudo o que você precisa editar no site está concentrado em **um único arquivo comentado**:

👉 **Arquivo Principal de Edição:** `src/config/siteConfig.ts`

---

## 1. Onde Editar o Topo Fixo (Logo JJ, Bolinha Verde e Slogan)
Abra `src/config/siteConfig.ts`:
- **Desligar/Ligar a bolinha verde do ícone `JJ`:** Na `[SEÇÃO 1] FEATURE_FLAGS`, mude `enableLogoGreenDot: false` (ou `true`).
- **Mudar a largura do ícone `JJ`:** Na `[SEÇÃO 2] LAYOUT_ALIGNMENT_CONFIG`, altere `logoBadgeWidth: "wide"` (opções: `"normal"`, `"wide"`, `"extra-wide"`).
- **Mudar a frase do Slogan:** Na `[SEÇÃO 5] SITE_CONFIG`, altere `slogan: "Iluminando seu sonho com segurança e precisão"`.

---

## 2. Onde Editar a Animação (Ícones Laranjas ➔ Verdes) e Quantidade de Itens
Abra `src/config/siteConfig.ts`:
- **Textos e Quantidade de Ícones da Animação:** Vá na **`[SEÇÃO 3] HERO_ANIMATION_CONFIG`**:
  - `maxItemsToShow: 4` (define quantos ícones aparecem).
  - `items: ["Diagnóstico", "QDC NBR 5410", "Iluminação LED", "Garantia Total"]` (edite os textos livremente).
- **Quantidade de Itens Mostrados por Seção:** Vá na **`[SEÇÃO 4] SECTION_ITEMS_CONFIG`** e defina quantos itens aparecem inicialmente no Portfólio, Depoimentos, História, Blog, Formulário e FAQ.

---

## 3. Onde Editar os Botões da Parte Principal (Hero)
Abra `src/config/siteConfig.ts`:
- **Texto do botão principal:** Em `[SEÇÃO 5] SITE_CONFIG`, edite `heroPrimaryBtnText: "Fazer Orçamento Aproximado Agora"`.
- **Ligar/Desligar o texto do botão de WhatsApp ao lado:** Em `[SEÇÃO 1] FEATURE_FLAGS`, a flag `enableHeroWhatsAppButtonText` está `false` (mostra só o símbolo). Mude para `true` se quiser exibir texto.

---

## 4. Onde Estão Salvas as Fotos da Galeria para Edição Futura
Todas as 7 fotos originais estão salvas na pasta:
👉 **`public/galeria/`** (e também em `public/edicao/imagens/`)
Para substituir uma foto, salve o novo arquivo em `public/galeria/` e altere o caminho na **`[SEÇÃO 6] IMAGENS_DO_SITE`** dentro de `src/config/siteConfig.ts`.
