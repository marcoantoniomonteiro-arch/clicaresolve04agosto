import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import React, { useState, useCallback } from "react";


import { Sparkles, RotateCcw, Trash2 } from "lucide-react";

interface Props {
  onBack: () => void;
}

const BINGO_COLS = ["B", "I", "N", "G", "O"];
const COL_RANGES = [
  [1, 15],
  [16, 30],
  [31, 45],
  [46, 60],
  [61, 75],
];

export function PainelBingo({ onBack }: Props) {
  const [drawn, setDrawn] = useState<Set<number>>(new Set());
  const [lastDrawn, setLastDrawn] = useState<number | null>(null);
  const [history, setHistory] = useState<number[]>([]);

  const drawNumber = useCallback(() => {
    if (drawn.size >= 75) return;
    const remaining: number[] = [];
    for (let i = 1; i <= 75; i++) {
      if (!drawn.has(i)) remaining.push(i);
    }
    const num = remaining[Math.floor(Math.random() * remaining.length)];
    setDrawn((prev) => new Set(prev).add(num));
    setLastDrawn(num);
    setHistory((prev) => [...prev, num]);
  }, [drawn]);

  const reset = useCallback(() => {
    setDrawn(new Set());
    setLastDrawn(null);
    setHistory([]);
  }, []);

  const getColForNum = (num: number): number => {
    for (let i = 0; i < COL_RANGES.length; i++) {
      if (num >= COL_RANGES[i][0] && num <= COL_RANGES[i][1]) return i;
    }
    return 0;
  };

  return (
    <ToolLayout
      title="Painel de Bingo"
      emoji="🎱"
      category="Utilidades"
      description="Sorteie numeros para jogar bingo com amigos."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["kit bingo família"]} label="kit bingo família" />}
    
    >
      <div className="space-y-5">
        <div className="p-6 rounded-xl bg-white/5 border border-white/8 text-center">
          <p className="text-xs text-gray-500 mb-2">Ultimo numero sorteado</p>
          {lastDrawn !== null ? (
            <div className="inline-flex items-center gap-3">
              <span className="text-3xl font-black text-yellow-400">
                {BINGO_COLS[getColForNum(lastDrawn)]}
              </span>
              <span className="text-6xl font-black text-white animate-pulse">
                {lastDrawn}
              </span>
            </div>
          ) : (
            <p className="text-3xl font-bold text-gray-600">---</p>
          )}
          <p className="text-sm text-gray-400 mt-2">
            {drawn.size}/75 numeros sorteados
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={drawNumber}
            disabled={drawn.size >= 75}
            className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles className="w-4 h-4" />
            Sortear Proximo
          </button>
          <button
            onClick={reset}
            className="px-4 py-2 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {BINGO_COLS.map((col) => (
                  <th
                    key={col}
                    className="w-14 py-2 bg-white/5 text-green-400 font-bold text-lg border border-white/10"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 15 }, (_, rowIdx) => (
                <tr key={rowIdx}>
                  {COL_RANGES.map((range, colIdx) => {
                    const num = range[0] + rowIdx;
                    const isDrawn = drawn.has(num);
                    const isLast = lastDrawn === num;
                    return (
                      <td
                        key={colIdx}
                        className={`w-14 h-9 text-center border border-white/5 text-sm font-medium transition-all ${
                          isLast
                            ? "bg-yellow-500/30 text-yellow-300 scale-110"
                            : isDrawn
                            ? "bg-green-500/20 text-green-400 line-through"
                            : "text-gray-500"
                        }`}
                      >
                        {num}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {history.length > 0 && (
          <div className="p-4 rounded-xl bg-white/5 border border-white/8">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                Historico
              </p>
              <button
                onClick={() => setHistory([])}
                className="text-xs text-gray-500 hover:text-red-400"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
              {history.map((num, idx) => (
                <span
                  key={idx}
                  className={`px-2 py-0.5 rounded text-xs font-medium ${
                    idx === history.length - 1
                      ? "bg-yellow-500/30 text-yellow-300"
                      : "bg-white/5 text-gray-400"
                  }`}
                >
                  {BINGO_COLS[getColForNum(num)]}-{num}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <ToolContent
        toolName="Painel de Bingo"
        category="Sorte"
        data={{
          directAnswer: "O painel de bingo sorteia números aleatórios e os exibe em tela, substituindo o globo físico tradicional em jogos de bingo.",
          howItWorks: "A ferramenta sorteia números aleatoriamente (geralmente de 1 a 75 ou 1 a 90, dependendo do formato do bingo) e os exibe na tela conforme vão sendo chamados, mantendo o histórico dos números já sorteados visível para conferência das cartelas dos participantes.",
          example: {
            title: "Exemplo: sorteio de bingo tradicional (1 a 90)",
            steps: [
              "Faixa de números: 1 a 90",
              "Primeiro número sorteado: 42",
              "Segundo número sorteado: 17",
              "Histórico exibido: 42, 17, e assim por diante conforme o jogo avança",
            ],
            result: "O painel sorteia e exibe cada número chamado, com histórico visível para os participantes conferirem suas cartelas em tempo real.",
          },
          faqs: [
            { question: "Os números podem repetir durante o mesmo jogo?", answer: "Não, cada número sorteado é removido da lista disponível até o final da partida, evitando repetições." },
            { question: "Posso escolher a faixa de números do sorteio?", answer: "Sim, é possível configurar diferentes faixas conforme o formato do bingo (75, 90 bolas, etc)." },
            { question: "O painel funciona em tela grande para eventos?", answer: "Sim, pode ser projetado em telão ou TV para facilitar a visualização em eventos com muitos participantes." },
            { question: "É possível reiniciar o sorteio para uma nova partida?", answer: "Sim, há sempre a opção de reiniciar e começar um novo jogo do zero." },
          ],
        }}
      />
    </ToolLayout>
  );
}
