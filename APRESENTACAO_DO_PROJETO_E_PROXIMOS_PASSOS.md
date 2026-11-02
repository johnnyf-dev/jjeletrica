# APRESENTAÇÃO DO PROJETO & PRÓXIMOS PASSOS ESTRATÉGICOS
## MVP Oficial: J&J Elétrica (+25 Anos em Ponta Grossa - PR)

---

## 1. Visão Executiva do Projeto
Este projeto foi desenvolvido com arquitetura sênior em **React 19 + TypeScript + Tailwind CSS + Vite**, unindo **Engenharia de Conversão Local**, **Psicologia das Cores (Modo Day / Modo Night)** e **Automação Comercial sem Custo de Servidor** (Cloudflare Pages + Google Apps Script).

### Principais Diferenciais Entregues neste MVP:
1. **Identidade Forte & Topo Fixo Inteligente:**
   - Logo geométrico **JJ** à esquerda, slogan persuasivo centralizado e menu sanduíche completo à direita com alternância instantânea entre **Modo Day (Conversão)** e **Modo Night (Elegante Arquitetônico)**.
2. **Animação de Luz Arquitetônica Discreta e Elegante:**
   - Substituímos animações agressivas por um efeito sofisticado de **Perfil de LED Linear + Respiração Orgânica do Filamento da Lâmpada Edison**, transmitindo paz, segurança e valorização do imóvel.
3. **Redirecionamento Oficial para WhatsApp (`55429998455688`) com Telemetria:**
   - Todos os botões de WhatsApp (Hero, Flutuante, Menu, Calculadora, Blog e FAQ) apontam para `https://wa.me/55429998455688` e gravam um log do clique antes de abrir a conversa.
4. **Calculadora de Orçamento + Qualificador de Leads (Score 0 a 100):**
   - O cliente seleciona os serviços por menu rápido, caixas de marcação ou texto livre.
   - O sistema calcula a faixa aproximada na hora, classifica o lead (**🔥 Quente / ⚡ Morno / 🌱 Inicial**) e dispara **2 e-mails automáticos** (um para o cliente cadastrado e outro para `eletricistajohnny@gmail.com`).
5. **Transparência sobre Cobrança de Orçamento Presencial (`R$ 80,00`):**
   - Explicada com clareza no formulário, nos 2 e-mails disparados e na seção de Perguntas e Respostas (FAQ), destacando que o valor é **100% abatido** no fechamento do serviço.
6. **Blog Técnico de SEO Local (Abrindo em Nova Página `?page=blog`):**
   - Artigos estratégicos sobre Quadros QDC NBR 5410, Fita LED em Marcenaria, Barramento de Cobre Comercial e Reforma de Fiação em Ponta Grossa.
7. **Destaques e Portfólio com Modo Hero 80% ("Clicou Abriu 80%, Clicou Fechou"):**
   - Valoriza suas fotos reais de quadros elétricos e marcenarias iluminadas da pasta `public/images/portfolio/`.

---

## 2. Próximos Passos Recomendados (Pós-Publicação do MVP)

### Passo 1 — Integração Imediata no Google Meu Negócio (Semana 1)
- Colocar o link oficial do Cloudflare Pages no campo **"Website"** do perfil da **J&J Elétrica** no Google Meu Negócio usando parâmetros UTM:
  `https://seudominio.pages.dev/?utm_source=google_meu_negocio&utm_medium=perfil_local&utm_campaign=pg_organico`
- Assim, toda visita vinda do Google Meu Negócio ficará registrada na aba `SEO_Trafego_UTM` da sua planilha!

### Passo 2 — Ativação da Planilha de Logs, Eventos e Disparo Duplo de E-mail (Semana 1)
- Criar a planilha no Google Sheets da conta `eletricistajohnny@gmail.com`, colar o código de `apps-script/Code.gs` e inserir a URL `/exec` em `src/config/siteConfig.ts`.

### Passo 3 — Coleta Controlada de Novas Avaliações 5 Estrelas (Semana 2 a 4)
- O botão "Avaliar no Google" inicia **desativado (`enableGoogleReviewButton: false`)** por segurança.
- Quando finalizar obras com clientes promotores, você pode enviar o link direto ou mudar a flag para `true` temporariamente.

### Passo 4 — Expansão do Blog Local para Bairros de Ponta Grossa (Mês 2)
- Publicar 2 novos artigos por mês em `BLOG_POSTS` focados em demandas reais dos bairros (Oficinas, Jardim Carvalho, Uvaranas, Nova Rússia, Condomínios Fechados), multiplicando as páginas indexadas no Google.

### Passo 5 — Mesclagem com Seus Módulos de Contratos e Campanhas (Mês 2+)
- Como a estrutura deste projeto já segue o padrão da sua arquitetura (`SERVICOS_TABELA.csv`, `apps-script/Code.gs`, configuração centralizada), você pode plugar diretamente seus geradores de contrato em PDF e réguas de follow-up na aba `Leads_Qualificados`.
