import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import React, { useState, useEffect, useRef } from "react";


import { Download, QrCode } from "lucide-react";

interface Props {
  onBack: () => void;
}

declare global {
  interface Window {
    QRCode: any;
  }
}

export function GeradorQRCode({ onBack }: Props) {
  const [texto, setTexto] = useState("https://clicaresolve.com");
  const [tamanho, setTamanho] = useState<128 | 256 | 512>(256);
  const qrRef = useRef<HTMLDivElement>(null);
  const qrInstanceRef = useRef<any>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js";
    script.async = true;
    script.onload = () => gerarQR();
    document.body.appendChild(script);

    return () => {
      if (qrInstanceRef.current) {
        qrInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (window.QRCode && texto) {
      gerarQR();
    }
  }, [texto, tamanho]);

  const gerarQR = () => {
    if (!qrRef.current || !window.QRCode || !texto) return;

    qrRef.current.innerHTML = "";

    qrInstanceRef.current = new window.QRCode(qrRef.current, {
      text: texto,
      width: tamanho,
      height: tamanho,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: window.QRCode.CorrectLevel.H,
    });
  };

  const downloadPNG = () => {
    if (!qrRef.current) return;

    const canvas = qrRef.current.querySelector("canvas");
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <ToolLayout
      title="Gerador de QR Code"
      emoji="📱"
      category="Utilidades"
      description="Gere QR Codes a partir de textos ou URLs."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["impressora portátil"]} label="impressora portátil" mercadoLivreTerms={["impressora termica portatil"]} mercadoLivreLabel="Encontre no Mercado Livre" />}
    
    >
      <div className="space-y-5">
        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Texto ou URL</span>
          <input
            type="text"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="https://exemplo.com"
            className="input-field"
          />
        </label>

        <div className="flex gap-2">
          {[128, 256, 512].map((size) => (
            <button
              key={size}
              onClick={() => setTamanho(size as any)}
              className={`flex-1 p-2 rounded-lg text-sm font-semibold transition-all ${
                tamanho === size
                  ? "bg-blue-500 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {size}px
            </button>
          ))}
        </div>

        <div className="p-6 rounded-xl bg-white border border-white/20 flex items-center justify-center min-h-64">
          <div ref={qrRef} className="flex items-center justify-center">
            {!texto && <QrCode className="w-24 h-24 text-gray-300" />}
          </div>
        </div>

        {texto && (
          <button
            onClick={downloadPNG}
            className="w-full p-3 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 font-semibold flex items-center justify-center gap-2 hover:bg-green-500/30 transition-colors"
          >
            <Download className="w-4 h-4" />
            Baixar PNG
          </button>
        )}

        <p className="text-xs text-gray-500 text-center">
          QR gerado localmente no seu navegador
        </p>
      </div>
      <ToolContent
        toolName="Gerador de QR Code"
        category="Utilidades"
        data={{
          directAnswer: "Um QR Code é gerado convertendo um texto, link ou informação em um padrão visual que pode ser lido por câmeras de celular.",
          howItWorks: "A ferramenta converte o texto ou link informado em um código QR (Quick Response). Qualquer câmera de smartphone com leitor de QR Code consegue escanear e abrir o conteúdo automaticamente. O QR Code gerado pode ser baixado como imagem e usado em cartões de visita, cardápios ou materiais impressos.",
          example: {
            title: "Exemplo: gerando um QR Code para um link de site",
            steps: [
              "Conteúdo: https://www.exemplo.com.br",
              "Tipo: Link (URL)",
              "QR Code gerado: imagem pronta para download",
              "Teste: ao escanear com a câmera, o link abre automaticamente",
            ],
            result: "O QR Code gerado pode ser baixado em segundos e usado em materiais digitais ou impressos.",
          },
          faqs: [
            { question: "O QR Code gerado expira?", answer: "Não, a imagem sempre vai apontar para o conteúdo inserido na criação." },
            { question: "Preciso de aplicativo para ler QR Code?", answer: "Não, a maioria dos smartphones lê pela câmera nativa." },
            { question: "Posso usar em material impresso?", answer: "Sim, pode ser baixado como imagem e impresso em banners, cartões e embalagens." },
            { question: "Qual tamanho mínimo para impressão?", answer: "Recomenda-se pelo menos 2x2 cm para leitura fácil." },
          ],
        }}
      />
    </ToolLayout>
  );
}
