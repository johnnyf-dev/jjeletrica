/**
 * ============================================================================
 * COMPONENTE: MODAL RÁPIDO DE ORÇAMENTO ELÉTRICO
 * Arquivo: src/components/ContactModal.tsx
 * ============================================================================
 * LÓGICA E FLUXO DO ARQUIVO:
 * 1. Abre quando o visitante clica em "Orçar Serviço" em algum card do portfólio
 *    ou no menu lateral.
 * 2. Envia os dados para `enviarLeadAppsScript()` (`src/utils/analytics.ts`),
 *    exibindo o valor aproximado na tela e disparando os 2 e-mails.
 *
 * RASTREAMENTO DE VARIÁVEIS (DE ONDE VÊM):
 * - `SITE_CONFIG`         -> Vem de `src/config/siteConfig.ts`
 * - `ELECTRICAL_SERVICES` -> Vem de `src/config/siteConfig.ts`
 * ============================================================================
 */

import React, { useState } from "react";
import { X, Send, CheckCircle2, Calculator } from "lucide-react";
import { SITE_CONFIG, ELECTRICAL_SERVICES } from "../config/siteConfig";
import {
  enviarLeadAppsScript,
  LeadSubmissionResponse,
  logWhatsAppClick,
} from "../utils/analytics";
import { WhatsAppOfficialIcon } from "./WhatsAppFloating";

interface ContactModalProps {
  /** Recebido de src/App.tsx: controla se o modal está visível */
  isOpen: boolean;
  /** Recebido de src/App.tsx: fecha o modal */
  onClose: () => void;
  /** Recebido de src/App.tsx: dados pré-preenchidos quando clicado de um serviço */
  initialData?: {
    points?: number;
    standard?: string;
    total?: number;
    projectTitle?: string;
  };
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [serviceType, setServiceType] = useState<"Residencial" | "Comercial">("Residencial");
  const [serviceId, setServiceId] = useState(ELECTRICAL_SERVICES[0].id);
  const [description, setDescription] = useState(
    initialData?.projectTitle ? `Interesse em serviço similar a: ${initialData.projectTitle}` : ""
  );
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<LeadSubmissionResponse | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) return;

    setSubmitting(true);
    try {
      const res = await enviarLeadAppsScript({
        name,
        phone,
        email,
        serviceType,
        selectedServiceIds: [serviceId],
        urgency: "Esta Semana",
        neighborhood: "Ponta Grossa",
        problemDescription:
          description ||
          (initialData?.projectTitle ? `Referência: ${initialData.projectTitle}` : ""),
      });
      setResult(res);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-amber-500/40 p-6 sm:p-7 text-slate-100 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-base sm:text-lg text-white">
                Orçamento Elétrico — {SITE_CONFIG.companyName}
              </h3>
              <p className="text-xs text-amber-400">
                {initialData?.projectTitle || "Receba o valor aproximado na hora e no e-mail"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setResult(null);
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {result ? (
          <div className="mt-5 space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="font-display font-bold text-lg">
              Enviado com Sucesso! Protocolo {result.protocol}
            </h4>
            <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/40">
              <span className="text-xs text-amber-400 font-mono-tech uppercase block">
                Estimativa Preliminar Calculada:
              </span>
              <p className="font-display font-extrabold text-2xl sm:text-3xl text-amber-400 mt-1">
                R$ {result.estimatedMin} a R$ {result.estimatedMax}
              </p>
              <p className="text-xs text-slate-300 mt-2">
                Pessoalmente, após vistoria técnica, apresentarei o valor final exato (visita{" "}
                {SITE_CONFIG.visitFeeFormatted} 100% abatida no fechamento).
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                logWhatsAppClick(
                  "modal_orcamento_whatsapp",
                  `Olá Johnny! Fiz o orçamento ${result.protocol} no site (Estimativa R$ ${result.estimatedMin} a R$ ${result.estimatedMax}) e quero agendar.`
                );
              }}
              className="w-full py-3.5 px-5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-display font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <WhatsAppOfficialIcon className="w-5 h-5" />
              <span>Confirmar no WhatsApp</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Seu Nome Completo *"
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-sm text-white"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Telefone / WhatsApp *"
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-sm text-white"
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu E-mail *"
                className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-sm text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              {(["Residencial", "Comercial"] as const).map((tipo) => (
                <button
                  key={tipo}
                  type="button"
                  onClick={() => setServiceType(tipo)}
                  className={`py-2 rounded-xl text-xs font-bold border cursor-pointer ${
                    serviceType === tipo
                      ? "bg-amber-500 text-slate-950 border-amber-400"
                      : "bg-slate-950 border-slate-800 text-slate-300"
                  }`}
                >
                  {tipo}
                </button>
              ))}
            </div>

            <select
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3.5 py-2.5 text-xs sm:text-sm text-white"
            >
              {ELECTRICAL_SERVICES.map((svc) => (
                <option key={svc.id} value={svc.id}>
                  {svc.name} (R$ {svc.minPrice} - R$ {svc.maxPrice})
                </option>
              ))}
            </select>

            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva o problema (curto-circuito, quadro QDC, instalação LED...)"
              className="w-full rounded-xl bg-slate-950 border border-slate-800 p-3 text-xs sm:text-sm text-white"
            />

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-display font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer btn-shimmer"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? "Calculando..." : "Calcular e Receber por E-mail"}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
