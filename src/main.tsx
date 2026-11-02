/**
 * ============================================================================
 * PONTO DE ENTRADA DO REACT — J&J ELÉTRICA
 * Arquivo: src/main.tsx
 * ============================================================================
 * LÓGICA E FLUXO DO ARQUIVO:
 * 1. Carrega os estilos globais e animações de `src/index.css`.
 * 2. Monta o componente principal `<App />` (`src/App.tsx`) dentro da `<div id="root">`
 *    do arquivo `index.html`.
 * ============================================================================
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
