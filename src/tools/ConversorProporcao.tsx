import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import React, { useState, useMemo } from "react";


import { Maximize2, ArrowRight } from "lucide-react";

interface Props {
  onBack: () => void;
}

const FORMATOS_PREDEFINIDOS: { nome: string; ratio: string; largura: number; altura: number }[] = [
  { nome: "16:9", ratio: "16:9", largura: 1920, altura: 1080 },
  { nome: "9:16", ratio: "9:16", largura: 1080, altura: 1920 },
  { nome: "4:5", ratio: "4:5", largura: 1080, altura: 1350 },
  { nome: "1:1", ratio: "1:1", largura: 1080, altura: 1080 },
  { nome: "4:3", ratio: "4:3", largura: 1440, altura: 1080 },
  { nome: "21:9", ratio: "21:9", largura: 2560, altura: 1080 },
  { nome: "2.39:1", ratio: "2.39:1", largura: 2048, altura: 858 },
  { nome: "2.35:1", ratio: "2.35:1", largura: 1920, altura: 817 },
];

function parseRatio(ratio: string): [number, number] | null {
  const match = ratio.match(/^(\d+(?:\.\d+)?)\s*[:/]\s*(\d+(?:\.\d+)?)$/);
  if (match) {
    return [parseFloat(match[1]), parseFloat(match[2])];
  }
  const dec = parseFloat(ratio);
  if (!isNaN(dec)) {
    return [dec, 1];
  }
  return null;
}

function simplifyRatio(a: number, b: number): string {
  const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y));
  const g = gcd(Math.round(a), Math.round(b));
  return `${Math.round(a / g)}:${Math.round(b / g)}`;
}

export function ConversorProporcao({ onBack }: Props) {
  const [modo, setModo] = useState<"calcular" | "converter">("calcular");
  const [largura, setLargura] = useState("1920");
  const [altura, setAltura] = useState("1080");
  const [ratioInput, setRatioInput] = useState("16:9");
  const [valorConhecido, setValorConhecido] = useState("1920");

  const resultado = useMemo(() => {
    if (modo === "calcular") {
      const w = parseFloat(largura) || 0;
      const h = parseFloat(altura) || 0;
      if (w <= 0 || h <= 0) return null;

      const ratio = w / h;
      const simplificado = simplifyRatio(w, h);

      return {
        tipo: "calcular",
        ratio: ratio.toFixed(3),
        simplificado,
      };
    } else {
      const parsed = parseRatio(ratioInput);
      if (!parsed) return null;

      const [rW, rH] = parsed;
      const val = parseFloat(valorConhecido) || 0;
      if (val <= 0) return null;

      const larguraCalculada = (rW / rH) * val;
      const alturaCalculada = (rH / rW) * val;

      return {
        tipo: "converter",
        largura: larguraCalculada > 1 ? Math.round(larguraCalculada) : undefined,
        altura: alturaCalculada > 1 ? Math.round(alturaCalculada) : undefined,
      };
    }
  }, [modo, largura, altura, ratioInput, valorConhecido]);

  return (
    <ToolLayout
      title="Conversor de Proporcao"
      emoji="📐"
      category="Utilidades"
      description="Calcule aspect ratio ou converte entre dimensoes mantendo a proporcao."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["tripé celular vídeo"]} label="tripé celular vídeo" />}
    
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => setModo("calcular")}
            className={`p-2 rounded text-sm font-semibold ${
              modo === "calcular" ? "bg-blue-500 text-white" : "bg-white/5 text-gray-400"
            }`}
          >
            Calcular Ratio
          </button>
          <button
            onClick={() => setModo("converter")}
            className={`p-2 rounded text-sm font-semibold ${
              modo === "converter" ? "bg-blue-500 text-white" : "bg-white/5 text-gray-400"
            }`}
          >
            Converter Dimensoes
          </button>
        </div>

        {modo === "calcular" ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-xs text-gray-400 mb-1 block">Largura</span>
                <input
                  type="number"
                  value={largura}
                  onChange={(e) => setLargura(e.target.value)}
                  className="input-field"
                />
              </label>
              <label className="block">
                <span className="text-xs text-gray-400 mb-1 block">Altura</span>
                <input
                  type="number"
                  value={altura}
                  onChange={(e) => setAltura(e.target.value)}
                  className="input-field"
                />
              </label>
            </div>

            {resultado && resultado.tipo === "calcular" && (
              <div className="p-5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Maximize2 className="w-5 h-5 text-blue-400" />
                  <p className="text-xs text-blue-400">Aspect Ratio</p>
                </div>
                <p className="text-4xl font-black text-white">{resultado.simplificado}</p>
                <p className="text-sm text-gray-400 mt-1">{resultado.ratio}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <label className="block">
              <span className="text-xs text-gray-400 mb-2 block">Formato</span>
              <div className="grid grid-cols-4 gap-1 mb-2">
                {FORMATOS_PREDEFINIDOS.map((f) => (
                  <button
                    key={f.ratio}
                    onClick={() => setRatioInput(f.ratio)}
                    className={`p-2 rounded text-xs ${
                      ratioInput === f.ratio
                        ? "bg-blue-500 text-white"
                        : "bg-white/5 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    {f.nome}
                  </button>
                ))}
              </div>
              <input
                type="text"
                value={ratioInput}
                onChange={(e) => setRatioInput(e.target.value)}
                placeholder="16:9"
                className="input-field"
              />
            </label>

            <label className="block">
              <span className="text-xs text-gray-400 mb-1 block">Valor conhecido</span>
              <input
                type="number"
                value={valorConhecido}
                onChange={(e) => setValorConhecido(e.target.value)}
                placeholder="1920"
                className="input-field"
              />
            </label>

            {resultado && resultado.tipo === "converter" && (
              <div className="p-5 rounded-xl bg-green-500/10 border border-green-500/20">
                <div className="grid grid-cols-2 gap-4 text-center">
                  {resultado.largura && (
                    <div>
                      <p className="text-xs text-gray-400">Largura</p>
                      <p className="text-2xl font-bold text-green-400">{resultado.largura}px</p>
                    </div>
                  )}
                  {resultado.altura && (
                    <div>
                      <p className="text-xs text-gray-400">Altura</p>
                      <p className="text-2xl font-bold text-green-400">{resultado.altura}px</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="p-4 rounded-xl bg-white/5 border border-white/8">
          <p className="text-xs text-gray-400 mb-2">Formatos Populares</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {FORMATOS_PREDEFINIDOS.slice(0, 6).map((f) => (
              <div key={f.nome} className="p-2 rounded bg-white/5 flex justify-between">
                <span className="text-gray-300">{f.nome}</span>
                <span className="text-gray-500">{f.largura}x{f.altura}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToolContent
        toolName="Conversor de Proporcao"
        category="Utilidades"
        data={{
          directAnswer: "A proporção (aspect ratio) determina a relação entre largura e altura de uma imagem ou tela, como 16:9 ou 4:3.",
          howItWorks: "A ferramenta calcula a largura ou altura correta para manter uma proporção específica, útil ao redimensionar imagens, vídeos ou definir resoluções de tela sem distorcer o conteúdo. Basta informar duas das três variáveis (largura, altura, proporção) para calcular a terceira automaticamente.",
          example: {
            title: "Exemplo: redimensionar uma imagem de 1920px de largura mantendo proporção 16:9",
            steps: [
              "Largura desejada: 1920px",
              "Proporção: 16:9",
              "Cálculo: altura = largura × (9/16)",
              "Resultado: altura = 1080px",
            ],
            result: "Para manter a proporção 16:9 com 1920px de largura, a altura correta é 1080px (a clássica resolução Full HD).",
          },
          faqs: [
            { question: "O que significa a proporção 16:9?", answer: "Significa que, para cada 16 unidades de largura, há 9 unidades de altura — é o padrão mais comum em telas e vídeos widescreen atualmente." },
            { question: "Por que manter a proporção é importante ao redimensionar imagens?", answer: "Para evitar distorção — se a proporção original não for respeitada, a imagem fica 'esticada' ou 'achatada'." },
            { question: "Qual a diferença entre 4:3 e 16:9?", answer: "4:3 é o formato mais quadrado, usado em TVs antigas; 16:9 é o formato widescreen, padrão atual para vídeos e monitores." },
            { question: "Posso usar essa ferramenta para redes sociais?", answer: "Sim, é útil para calcular dimensões corretas para posts, stories e vídeos em formatos específicos como 1:1 (quadrado) ou 9:16 (vertical)." },
          ],
        }}
      />
    </ToolLayout>
  );
}
