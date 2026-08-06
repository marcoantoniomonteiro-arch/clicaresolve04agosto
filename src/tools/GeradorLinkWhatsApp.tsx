import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import React, { useState, useMemo, useCallback } from "react";


import { MessageCircle, Copy, Check, ExternalLink } from "lucide-react";

interface Props {
  onBack: () => void;
}

export function GeradorLinkWhatsApp({ onBack }: Props) {
  const [numero, setNumero] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [copiado, setCopiado] = useState(false);

  const link = useMemo(() => {
    const numeroLimpo = numero.replace(/\D/g, "");
    if (!numeroLimpo) return "";

    const msgCodificada = mensagem ? encodeURIComponent(mensagem) : "";
    return `https://wa.me/${numeroLimpo}${msgCodificada ? `?text=${msgCodificada}` : ""}`;
  }, [numero, mensagem]);

  const copiar = useCallback(async () => {
    if (!link) return;
    try {
      await navigator.clipboard.writeText(link);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar", err);
    }
  }, [link]);

  const testar = useCallback(() => {
    if (link) window.open(link, "_blank");
  }, [link]);

  const formatarNumero = (value: string) => {
    const nums = value.replace(/\D/g, "");
    if (nums.length <= 2) return nums;
    if (nums.length <= 7) return `(${nums.slice(0, 2)}) ${nums.slice(2)}`;
    if (nums.length <= 11) return `(${nums.slice(0, 2)}) ${nums.slice(2, 7)}-${nums.slice(7)}`;
    return `(${nums.slice(0, 2)}) ${nums.slice(2, 7)}-${nums.slice(7, 11)}`;
  };

  return (
    <ToolLayout
      title="Gerador de Link WhatsApp"
      emoji="💬"
      category="Utilidades"
      description="Gere links diretos para WhatsApp. Ideal para autonomos e pequenos negocios."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["curso marketing digital"]} label="curso marketing digital" />}
    
    >
      <div className="space-y-5">
        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Numero do celular</span>
          <div className="flex gap-2">
            <span className="px-3 py-2 rounded-lg bg-white/5 text-gray-400 text-sm flex items-center">+55</span>
            <input
              type="tel"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              placeholder="(11) 99999-9999"
              className="input-field flex-1"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">Apenas numeros, incluindo DDD</p>
        </label>

        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Mensagem (opcional)</span>
          <textarea
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            placeholder="Ola! Vim pelo site e gostaria de..."
            className="input-field w-full h-24 resize-none p-3"
          />
        </label>

        {link && (
          <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
            <div className="flex items-center gap-2 mb-2">
              <MessageCircle className="w-4 h-4 text-green-400" />
              <p className="text-xs text-green-400 font-semibold">Seu link</p>
            </div>
            <p className="text-sm text-white break-all font-mono bg-white/5 rounded p-2 mb-3">
              {link}
            </p>
            <div className="flex gap-2">
              <button
                onClick={copiar}
                className="flex-1 p-2 rounded-lg bg-green-500/20 text-green-400 text-sm font-semibold flex items-center justify-center gap-1 hover:bg-green-500/30"
              >
                {copiado ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copiado ? "Copiado!" : "Copiar"}
              </button>
              <button
                onClick={testar}
                className="flex-1 p-2 rounded-lg bg-white/10 text-white text-sm font-semibold flex items-center justify-center gap-1 hover:bg-white/20"
              >
                <ExternalLink className="w-4 h-4" />
                Testar
              </button>
            </div>
          </div>
        )}

        <div className="p-3 rounded-lg bg-white/5 text-xs text-gray-500 space-y-2">
          <p className="font-semibold text-gray-400">Como usar:</p>
          <p>1. Digite o numero com DDD (apenas numeros)</p>
          <p>2. Adicione uma mensagem opcional</p>
          <p>3. Copie o link e compartilhe</p>
          <p>4. Cole no Instagram, site, email...</p>
        </div>

        <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <p className="text-xs text-blue-300">
            <span className="font-semibold">Dica:</span> Use em botoes "Fale Conosco" no seu site ou bio do Instagram.
          </p>
        </div>
      </div>
      <ToolContent
        toolName="Gerador de Link WhatsApp"
        category="Utilidades"
        data={{
          directAnswer: "Um link direto do WhatsApp é gerado combinando o número com código internacional e uma mensagem pré-preenchida opcional.",
          howItWorks: "A ferramenta gera um link wa.me que abre uma conversa direta no WhatsApp já com mensagem pré-preenchida. Funciona mesmo sem o número salvo nos contatos, muito usado em cartões de visita digitais e sites.",
          example: {
            title: "Exemplo: gerando link com mensagem padrão",
            steps: [
              "Número: (11) 98888-7777",
              "Código do país: +55",
              'Mensagem: "Olá! Vim através do site."',
              "Link gerado: https://wa.me/5511988887777?text=...",
            ],
            result: "Ao clicar, o WhatsApp abre a conversa com o número e mensagem já preenchidos.",
          },
          faqs: [
            { question: "A pessoa precisa ter meu número salvo?", answer: "Não, o link funciona sem o número salvo nos contatos." },
            { question: "Posso usar em qualquer rede social?", answer: "Sim, em bio, sites, cartões digitais e QR Codes." },
            { question: "O código do país é obrigatório?", answer: "Sim, necessário para o link funcionar em qualquer dispositivo." },
            { question: "A mensagem pode ser editada antes de enviar?", answer: "Sim, aparece pronta no campo de texto, mas pode ser editada." },
          ],
        }}
      />
    </ToolLayout>
  );
}
