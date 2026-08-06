import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import React, { useState } from "react";


import { CONFIG } from "../config";

interface Props { onBack: () => void; }

type Status = "classificado" | "depende" | "em_risco" | "rebaixado" | null;

export function ProbabilidadesClassificacao({ onBack }: Props) {
  const [pontos, setPontos] = useState("");
  const [jogosRestantes, setJogosRestantes] = useState("");
  const [posicao, setPosicao] = useState("");
  const [pontosG4, setPontosG4] = useState("");
  const [pontosZ4, setPontosZ4] = useState("");
  const [result, setResult] = useState<null | {
    maxPontos: number;
    necessarioG4: number | null;
    necessarioTitulo: number | null;
    necessarioZ4: number | null;
    aprovG4: number | null;
    aprovZ4: number | null;
    statusG4: Status;
    statusZ4: Status;
  }>(null);

  function calcular() {
    const p = parseInt(pontos);
    const jr = parseInt(jogosRestantes);
    const pg4 = pontosG4 ? parseInt(pontosG4) : null;
    const pz4 = pontosZ4 ? parseInt(pontosZ4) : null;

    if (!p || !jr) return;

    const maxPontos = p + jr * 3;
    const necessarioG4 = pg4 ? Math.max(0, pg4 - p + 1) : null;
    const necessarioTitulo = pg4 ? Math.max(0, pg4 + 1 - p) : null;
    const necessarioZ4 = pz4 ? Math.max(0, pz4 - p) : null;

    function calcAprov(necessario: number | null) {
      if (necessario === null) return null;
      return Math.ceil((necessario / (jr * 3)) * 100);
    }

    function statusG4(): Status {
      if (!pg4) return null;
      if (p > pg4) return "classificado";
      if (maxPontos < pg4) return "rebaixado";
      return "depende";
    }

    function statusZ4(): Status {
      if (!pz4) return null;
      if (p < pz4 && maxPontos < pz4) return "rebaixado";
      if (p >= pz4) return "classificado";
      return "em_risco";
    }

    setResult({
      maxPontos,
      necessarioG4,
      necessarioTitulo,
      necessarioZ4,
      aprovG4: calcAprov(necessarioG4),
      aprovZ4: calcAprov(necessarioZ4),
      statusG4: statusG4(),
      statusZ4: statusZ4(),
    });
  }

  const STATUS_CONFIG = {
    classificado: { text: "Matematicamente Classificado", color: "text-green-400 bg-green-400/10 border-green-400/30" },
    depende: { text: "Depende dos Resultados", color: "text-amber-400 bg-amber-400/10 border-amber-400/30" },
    em_risco: { text: "Em Risco de Rebaixamento", color: "text-red-400 bg-red-400/10 border-red-400/30" },
    rebaixado: { text: "Matematicamente Rebaixado", color: "text-red-600 bg-red-600/10 border-red-600/30" },
  };

  return (
    <ToolLayout
      title="Probabilidades de Classificação"
      emoji="📊"
      category="Esportes"
      description="Calcule chances de classificação, título e risco de rebaixamento do seu time."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["camisa time futebol"]} label="camisa time futebol" />}
    
    >
      <div className="space-y-4">
        {/* Bet banner */}
        <a
          href={CONFIG.linkBet}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition-colors"
        >
          <span className="text-sm text-amber-400 font-semibold">🎯 Aposte no seu time — {CONFIG.nomeBet}</span>
          <span className="text-xs text-amber-300 shrink-0 underline">Apostar</span>
        </a>

        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Pontos atuais</span>
            <input type="number" value={pontos} onChange={(e) => setPontos(e.target.value)} placeholder="Ex: 38" className="input-field" />
          </label>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Jogos restantes</span>
            <input type="number" value={jogosRestantes} onChange={(e) => setJogosRestantes(e.target.value)} placeholder="Ex: 10" className="input-field" />
          </label>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Posição atual</span>
            <input type="number" value={posicao} onChange={(e) => setPosicao(e.target.value)} placeholder="Ex: 5" className="input-field" />
          </label>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Pontos do 4º colocado</span>
            <input type="number" value={pontosG4} onChange={(e) => setPontosG4(e.target.value)} placeholder="Para G4 (opcional)" className="input-field" />
          </label>
          <label className="block col-span-2">
            <span className="text-sm text-gray-400 mb-1 block">Pontos do 1º da Z4 (rebaixamento)</span>
            <input type="number" value={pontosZ4} onChange={(e) => setPontosZ4(e.target.value)} placeholder="Para evitar queda (opcional)" className="input-field" />
          </label>
        </div>

        <button onClick={calcular} className="btn-primary w-full">Calcular Probabilidades</button>

        {result && (
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-white/5 border border-white/8 text-center">
              <p className="text-xs text-gray-400">Pontos máximos possíveis</p>
              <p className="text-3xl font-black text-white">{result.maxPontos} pts</p>
            </div>

            {result.statusG4 && (
              <div className="space-y-2">
                <div className={`p-3 rounded-xl border text-center font-semibold text-sm ${STATUS_CONFIG[result.statusG4].color}`}>
                  G4: {STATUS_CONFIG[result.statusG4].text}
                </div>
                {result.necessarioG4 !== null && result.aprovG4 !== null && (
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white/5 rounded-xl p-3 text-center">
                      <p className="text-xs text-gray-400">Pts necessários (G4)</p>
                      <p className="text-xl font-bold text-white">{result.necessarioG4}</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 text-center">
                      <p className="text-xs text-gray-400">Aproveitamento necessário</p>
                      <p className={`text-xl font-bold ${result.aprovG4 > 100 ? "text-red-400" : result.aprovG4 > 70 ? "text-amber-400" : "text-green-400"}`}>
                        {result.aprovG4}%
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {result.statusZ4 && result.statusZ4 !== "classificado" && (
              <div className="space-y-2">
                <div className={`p-3 rounded-xl border text-center font-semibold text-sm ${STATUS_CONFIG[result.statusZ4].color}`}>
                  Rebaixamento: {STATUS_CONFIG[result.statusZ4].text}
                </div>
                {result.necessarioZ4 !== null && result.aprovZ4 !== null && (
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white/5 rounded-xl p-3 text-center">
                      <p className="text-xs text-gray-400">Pts para escapar</p>
                      <p className="text-xl font-bold text-white">{result.necessarioZ4}</p>
                    </div>
                    <div className="bg-white/5 rounded-xl p-3 text-center">
                      <p className="text-xs text-gray-400">Aproveitamento necessário</p>
                      <p className={`text-xl font-bold ${result.aprovZ4 > 100 ? "text-red-400" : result.aprovZ4 > 70 ? "text-amber-400" : "text-green-400"}`}>
                        {result.aprovZ4}%
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      <ToolContent
        toolName="Probabilidades de Classificação"
        category="Esportes"
        data={{
          directAnswer: "A probabilidade de classificação de um time é estimada com base na posição atual na tabela, número de jogos restantes e desempenho histórico da competição.",
          howItWorks: "A ferramenta considera a posição atual do time no campeonato, quantos pontos ele já tem, quantos jogos ainda faltam disputar, e a pontuação necessária para atingir a zona de classificação (ou fuga do rebaixamento). Com base nesses números, estima um cenário de probabilidade — não é uma previsão exata, mas uma referência estatística baseada na situação atual da tabela.",
          example: {
            title: "Exemplo: time em 8º lugar, precisa de mais 12 pontos em 8 jogos",
            steps: [
              "Posição atual: 8º lugar",
              "Pontos necessários para classificar: mais 12 pontos",
              "Jogos restantes: 8",
              "Média necessária: 1,5 pontos por jogo (equivalente a vencer metade dos jogos restantes)",
            ],
            result: "Para se classificar, o time precisa de um aproveitamento de pelo menos 50% nos 8 jogos restantes, um cenário considerado viável mas que exige consistência.",
          },
          faqs: [
            { question: "Essa é uma previsão garantida?", answer: "Não, é uma estimativa estatística baseada na situação atual da tabela, não uma previsão exata do resultado final." },
            { question: "O que é 'aproveitamento' no futebol?", answer: "É a porcentagem de pontos conquistados em relação ao total possível nos jogos disputados (vitória = 3 pontos, empate = 1, derrota = 0)." },
            { question: "A ferramenta considera o histórico de confrontos diretos?", answer: "Geralmente não; o cálculo foca na matemática de pontos necessários, não em fatores específicos como confrontos diretos ou saldo de gols." },
            { question: "Posso usar para qualquer campeonato?", answer: "Sim, desde que você tenha os dados de posição, pontos e jogos restantes do campeonato desejado." },
          ],
        }}
      />
    </ToolLayout>
  );
}
