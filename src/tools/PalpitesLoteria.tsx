import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import React, { useState, useCallback } from "react";


import { Shuffle } from "lucide-react";

interface Props {
  onBack: () => void;
}

type GameType = "megasena" | "lotofacil";

const GAME_CONFIG = {
  megasena: {
    name: "Mega-Sena",
    totalNumbers: 60,
    numbersPerGame: 6,
    minNum: 1,
    color: "bg-gradient-to-br from-green-500 to-emerald-600",
  },
  lotofacil: {
    name: "Lotofacil",
    totalNumbers: 25,
    numbersPerGame: 15,
    minNum: 1,
    color: "bg-gradient-to-br from-purple-500 to-violet-600",
  },
};

function generateNumbers(game: GameType): number[] {
  const config = GAME_CONFIG[game];
  const nums = new Set<number>();
  while (nums.size < config.numbersPerGame) {
    nums.add(Math.floor(Math.random() * config.totalNumbers) + config.minNum);
  }
  return Array.from(nums).sort((a, b) => a - b);
}

export function PalpitesLoteria({ onBack }: Props) {
  const [gameType, setGameType] = useState<GameType>("megasena");
  const [numGames, setNumGames] = useState(1);
  const [games, setGames] = useState<number[][]>([]);
  const [animating, setAnimating] = useState(false);

  const generateGames = useCallback(() => {
    setAnimating(true);
    setTimeout(() => {
      const newGames: number[][] = [];
      for (let i = 0; i < numGames; i++) {
        newGames.push(generateNumbers(gameType));
      }
      setGames(newGames);
      setAnimating(false);
    }, 300);
  }, [gameType, numGames]);

  const config = GAME_CONFIG[gameType];

  return (
    <ToolLayout
      title="Palpites Loteria"
      emoji="🍀"
      category="Financas"
      description="Gere palpites aleatorios para Mega-Sena ou Lotofacil."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["kit loteria bolão"]} label="kit loteria bolão" />}
    
      disclaimer="Esta ferramenta e apenas para entretenimento. Jogo responsavel. Os numeros sao gerados aleatoriamente e nao garantem qualquer resultado."
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setGameType("megasena")}
            className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
              gameType === "megasena"
                ? "bg-green-500/20 border-green-500/40 text-green-400"
                : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
            }`}
          >
            Mega-Sena (6/60)
          </button>
          <button
            onClick={() => setGameType("lotofacil")}
            className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
              gameType === "lotofacil"
                ? "bg-purple-500/20 border-purple-500/40 text-purple-400"
                : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
            }`}
 >
            Lotofacil (15/25)
          </button>
        </div>

        <div>
          <label className="text-sm text-gray-400 mb-2 block">Quantidade de jogos</label>
          <div className="flex gap-2">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setNumGames(n)}
                className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all ${
                  numGames === n
                    ? "bg-green-500 text-black"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <button onClick={generateGames} className="btn-primary w-full flex items-center justify-center gap-2">
          <Shuffle className="w-4 h-4" />
          Gerar Palpites
        </button>

        {games.length > 0 && (
          <div className={`space-y-3 transition-opacity ${animating ? "opacity-30" : ""}`}>
            {games.map((game, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/8">
                <p className="text-xs text-gray-500 mb-2">Jogo {idx + 1}</p>
                <div className="flex flex-wrap gap-2">
                  {game.map((num, i) => (
                    <div
                      key={i}
                      className={`w-10 h-10 rounded-full ${config.color} flex items-center justify-center text-white font-bold text-sm shadow-lg`}
                    >
                      {String(num).padStart(2, "0")}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/5">
          <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider mb-3">Link Útil</p>
          <div className="flex flex-wrap gap-2">
            <a
              href="https://loterias.caixa.gov.br"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold transition-colors"
            >
              Site oficial da Caixa Loterias
            </a>
          </div>
        </div>
      </div>
      <ToolContent
        toolName="Palpites de Loteria"
        category="Sorte"
        data={{
          directAnswer: "O gerador de palpites de loteria sorteia combinações aleatórias de números dentro da faixa e quantidade exigida por cada modalidade de jogo.",
          howItWorks: "A ferramenta gera combinações aleatórias de números respeitando as regras de cada loteria (por exemplo, 6 números entre 1 e 60 na Mega-Sena). É importante destacar que loterias são jogos de azar puro — nenhuma fórmula ou algoritmo consegue prever ou aumentar as chances reais de acerto, já que cada sorteio é estatisticamente independente dos anteriores.",
          example: {
            title: "Exemplo: gerando um palpite para a Mega-Sena",
            steps: [
              "Modalidade: Mega-Sena",
              "Quantidade de números: 6",
              "Faixa: 1 a 60",
              "Palpite gerado: 04, 15, 23, 31, 42, 55",
            ],
            result: "O palpite gerado é uma combinação aleatória válida para a Mega-Sena, sem qualquer garantia estatística de acerto — todas as combinações têm exatamente a mesma probabilidade.",
          },
          faqs: [
            { question: "Um algoritmo pode aumentar minhas chances de ganhar na loteria?", answer: "Não, sorteios de loteria são eventos aleatórios e independentes; nenhuma fórmula, padrão ou algoritmo altera a probabilidade real de acerto." },
            { question: "Números 'quentes' (que saem mais) têm mais chance de sair de novo?", answer: "Não, cada sorteio é estatisticamente independente dos anteriores — a frequência passada não influencia sorteios futuros." },
            { question: "A ferramenta pode gerar múltiplos jogos de uma vez?", answer: "Sim, é possível gerar vários palpites diferentes para aumentar as combinações jogadas, ainda que a chance individual de cada uma permaneça igual." },
            { question: "Qual a real chance de ganhar na Mega-Sena, por exemplo?", answer: "A chance de acertar as 6 dezenas na Mega-Sena com um único jogo simples é de aproximadamente 1 em 50 milhões." },
          ],
        }}
      />
    </ToolLayout>
  );
}
