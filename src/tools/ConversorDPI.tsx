import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import React, { useState, useMemo } from "react";


import { Mouse, Crosshair } from "lucide-react";

interface Props {
  onBack: () => void;
}

interface Jogo {
  nome: string;
  sensBase: number;
}

const JOGOS: Jogo[] = [
  { nome: "CS2", sensBase: 1 },
  { nome: "Valorant", sensBase: 0.3 },
  { nome: "Apex Legends", sensBase: 3 },
  { nome: "Fortnite", sensBase: 0.07 },
  { nome: "Overwatch 2", sensBase: 15 },
  { nome: "Call of Duty", sensBase: 5 },
];

export function ConversorDPI({ onBack }: Props) {
  const [dpiAtual, setDpiAtual] = useState("800");
  const [sensAtual, setSensAtual] = useState("1.5");
  const [dpiNovo, setDpiNovo] = useState("1600");
  const [jogoAtual, setJogoAtual] = useState("CS2");
  const [jogoNovo, setJogoNovo] = useState("Valorant");

  const resultado = useMemo(() => {
    const dpi1 = parseFloat(dpiAtual) || 800;
    const sens1 = parseFloat(sensAtual) || 1;
    const dpi2 = parseFloat(dpiNovo) || 1600;

    const edpi = dpi1 * sens1;

    const novaSens = edpi / dpi2;

    return {
      edpi,
      novaSens: novaSens.toFixed(4),
      multiplicador: (dpi1 / dpi2).toFixed(4),
    };
  }, [dpiAtual, sensAtual, dpiNovo]);

  return (
    <ToolLayout
      title="Conversor de DPI"
      emoji="🖱️"
      category="Utilidades"
      description="Converta sensibilidade entre DPIs diferentes mantendo o mesmo controle."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["mouse gamer DPI"]} label="mouse gamer DPI" mercadoLivreTerms={["mouse gamer rgb"]} mercadoLivreLabel="Encontre no Mercado Livre" />}
    
    >
      <div className="space-y-5">
        <div className="p-4 rounded-xl bg-white/5 border border-white/8">
          <div className="flex items-center gap-2 mb-3">
            <Mouse className="w-4 h-4 text-blue-400" />
            <p className="text-xs text-blue-400 font-semibold">Configuracao Atual</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label className="block">
              <span className="text-xs text-gray-400 mb-1 block">DPI Atual</span>
              <input
                type="number"
                value={dpiAtual}
                onChange={(e) => setDpiAtual(e.target.value)}
                className="input-field"
              />
            </label>
            <label className="block">
              <span className="text-xs text-gray-400 mb-1 block">Sensibilidade</span>
              <input
                type="number"
                step="0.01"
                value={sensAtual}
                onChange={(e) => setSensAtual(e.target.value)}
                className="input-field"
              />
            </label>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/8">
          <div className="flex items-center gap-2 mb-3">
            <Crosshair className="w-4 h-4 text-green-400" />
            <p className="text-xs text-green-400 font-semibold">Nova Configuracao</p>
          </div>
          <label className="block">
            <span className="text-xs text-gray-400 mb-1 block">Novo DPI</span>
            <input
              type="number"
              value={dpiNovo}
              onChange={(e) => setDpiNovo(e.target.value)}
              className="input-field"
            />
          </label>
        </div>

        <div className="p-5 rounded-xl bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 text-center">
          <p className="text-xs text-gray-400 mb-1">Nova Sensibilidade</p>
          <p className="text-4xl font-black text-green-400">{resultado.novaSens}</p>
          <p className="text-xs text-gray-500 mt-2">
            eDPI: {resultado.edpi.toFixed(0)} | Multiplicador: {resultado.multiplicador}x
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/8">
          <p className="text-xs text-gray-400 mb-2">DPIs comuns</p>
          <div className="flex flex-wrap gap-2">
            {[400, 800, 1200, 1600, 3200, 6400].map((dpi) => (
              <button
                key={dpi}
                onClick={() => setDpiNovo(dpi.toString())}
                className="px-3 py-1 rounded bg-white/5 text-xs text-gray-400 hover:bg-white/10"
              >
                {dpi}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/8">
          <p className="text-xs text-gray-400 mb-2">eDPIs de referencia</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded bg-white/5">
              <span className="text-gray-400">Baixo:</span> <span className="text-white">200-400</span>
            </div>
            <div className="p-2 rounded bg-white/5">
              <span className="text-gray-400">Medio:</span> <span className="text-white">800-1600</span>
            </div>
            <div className="p-2 rounded bg-white/5">
              <span className="text-gray-400">Alto:</span> <span className="text-white">2000-3200</span>
            </div>
            <div className="p-2 rounded bg-white/5">
              <span className="text-gray-400">Muito alto:</span> <span className="text-white">4000+</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">Seu eDPI: {resultado.edpi}</p>
        </div>
      </div>
      <ToolContent
        toolName="Conversor de DPI"
        category="Utilidades"
        data={{
          directAnswer: "A sensibilidade equivalente do mouse é calculada multiplicando o DPI pelo valor de sensibilidade no jogo, mantendo essa multiplicação constante entre jogos diferentes.",
          howItWorks: "DPI (dots per inch) determina quantos pontos o cursor se move por polegada de movimento físico do mouse. Jogos diferentes usam escalas de sensibilidade diferentes, então a ferramenta calcula a 'sensibilidade efetiva' (DPI × sensibilidade no jogo) e converte esse valor para manter o mesmo 'feeling' de mira ao trocar de jogo ou de mouse com DPI diferente.",
          example: {
            title: "Exemplo: convertendo sensibilidade de 800 DPI para 1600 DPI",
            steps: [
              "DPI original: 800",
              "Sensibilidade no jogo original: 4.0",
              "Sensibilidade efetiva: 800 × 4.0 = 3200",
              "Nova sensibilidade no jogo (com 1600 DPI): 3200 / 1600 = 2.0",
            ],
            result: "Ao mudar de 800 DPI para 1600 DPI, ajustar a sensibilidade no jogo para 2.0 mantém exatamente a mesma velocidade de mira.",
          },
          faqs: [
            { question: "O que é DPI no mouse?", answer: "DPI (dots per inch) indica quantos pontos o cursor percorre na tela para cada polegada de movimento físico do mouse." },
            { question: "Por que minha mira muda ao trocar de mouse?", answer: "Porque mouses com DPI diferentes geram movimentos de cursor diferentes para o mesmo gesto físico, alterando a sensibilidade percebida se a configuração do jogo não for ajustada." },
            { question: "Qual DPI é ideal para jogos competitivos?", answer: "Não existe um valor único ideal; a maioria dos jogadores profissionais usa entre 400 e 800 DPI, ajustando a sensibilidade no jogo conforme a preferência." },
            { question: "A conversão funciona entre jogos diferentes?", answer: "Sim, desde que se conheça a sensibilidade configurada em cada jogo, é possível calcular um valor equivalente para manter a mesma 'sensação' de mira." },
          ],
        }}
      />
    </ToolLayout>
  );
}
