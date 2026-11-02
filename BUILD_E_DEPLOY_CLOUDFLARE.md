# GUIA DE BUILD, DEPLOY NO CLOUDFLARE PAGES & PLANILHA GOOGLE SHEETS
## J&J Elétrica — Ponta Grossa - PR

---

## PARTE 1: Testar e Gerar o Build no Seu Computador

### 1. Instalar dependências (apenas na primeira vez):
```bash
npm install
```

### 2. Rodar o servidor local de desenvolvimento (para editar e ver na hora):
```bash
npm run dev
```

### 3. Gerar o pacote estático final de produção (pasta `dist/`):
```bash
npm run build
```

---

## PARTE 2: Subir no Cloudflare Pages (Hospedagem Gratuita e Ultrarrápida)

### Opção A — Conectado ao seu GitHub (Recomendado):
1. Crie um repositório no GitHub e envie os arquivos do projeto.
2. Acesse o painel do **Cloudflare** > **Workers & Pages** > **Create** > **Pages** > **Connect to Git**.
3. Selecione o repositório e configure:
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node.js version:** `20` (ou superior)
4. Clique em **Save and Deploy**. A cada alteração no GitHub, o Cloudflare Pages atualiza o site sozinho!

### Opção B — Upload Direto da Pasta `dist/` (Sem GitHub):
1. Rode `npm run build` no seu computador.
2. No painel do Cloudflare Pages, escolha **Direct Upload** e arraste a pasta `dist` gerada.

---

## PARTE 3: Conectar Sua Nova Planilha do Google Sheets (2 E-mails + Logs + SEO + Qualificador)

1. Crie uma nova planilha no **Google Sheets** (ex.: `CRM_Logs_SEO_JJ_Eletrica`).
2. No menu superior da planilha, clique em **Extensões** > **Apps Script**.
3. Apague tudo que estiver lá e cole o conteúdo completo do arquivo **`apps-script/Code.gs`** deste projeto.
4. O script já está configurado com:
   - E-mail principal: `eletricistajohnny@gmail.com`
   - WhatsApp oficial: `55429998455688`
   - Criação automática das 3 abas:
     - `Leads_Qualificados` (com Score de 0 a 100 e classificação Quente/Morno/Inicial)
     - `Logs_Cliques_Eventos` (cliques em WhatsApp, Fotos 80%, Blog, Simulador)
     - `SEO_Trafego_UTM` (origem Google Meu Negócio, dispositivo Mobile/Desktop, UTMs)
   - Disparo automático de **2 E-mails** a cada cadastro:
     - **E-mail 1:** Para o e-mail informado pelo cliente no formulário.
     - **E-mail 2:** Para `eletricistajohnny@gmail.com`.
5. No Apps Script, clique em **Implantar** > **Nova implantação** > Tipo: **App da Web**:
   - **Executar como:** *Eu (eletricistajohnny@gmail.com)*
   - **Quem pode acessar:** *Qualquer pessoa*
6. Copie a **URL do App da Web** gerada (terminada em `/exec`) e cole em `src/config/siteConfig.ts` no campo:
   ```ts
   googleAppsScriptWebAppUrl: "SUA_URL_AQUI/exec"
   ```
7. Rode `npm run build` novamente e publique!
