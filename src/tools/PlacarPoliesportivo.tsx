import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import React, { useState, useEffect, useRef } from "react";


import { Play, Pause, RotateCcw, Plus, Minus } from "lucide-react";
import { ToolContent } from "../components/ToolContent";

interface Props { onBack: () => void; }

type Modalidade = "futebol" | "volei" | "basquete" | "beach";

interface Time { nome: string; pontos: number; sets: number[] }

const MODALIDADES: { value: Modalidade; label: string; emoji: string }[] = [
  { value: "futebol", label: "Futebol", emoji: "⚽" },
  { value: "volei", label: "Vôlei", emoji: "🏐" },
  { value: "basquete", label: "Basquete", emoji: "🏀" },
  { value: "beach", label: "Beach Tennis", emoji: "🎾" },
];

export function PlacarPoliesportivo({ onBack }: Props) {
  const [modalidade, setModalidade] = useState<Modalidade>("futebol");
  const [times, setTimes] = useState<[Time, Time]>([
    { nome: "Time A", pontos: 0, sets: [0, 0, 0] },
    { nome: "Time B", pontos: 0, sets: [0, 0, 0] },
  ]);
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [setAtual, setSetAtual] = useState(0);
  const [melhorDe, setMelhorDe] = useState<3 | 5>(3);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = window.setInterval(() => setElapsed((e) => e + 1), 1000);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  function fmtTime(s: number) {
    return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  }

  function updateNome(idx: 0 | 1, nome: string) {
    setTimes((prev) => {
      const n = [...prev] as [Time, Time];
      n[idx] = { ...n[idx], nome };
      return n;
    });
  }

  function addPonto(idx: 0 | 1, pts = 1) {
    setTimes((prev) => {
      const n = [...prev] as [Time, Time];
      if (modalidade === "volei") {
        const newSets = [...n[idx].sets];
        newSets[setAtual] = (newSets[setAtual] || 0) + 1;
        const pts0 = newSets[setAtual];
        const pts1 = n[1 - idx].sets[setAtual] || 0;
        const maxSets = melhorDe;
        const limite = setAtual === maxSets - 1 ? 15 : 25;
        const isDeuce = pts0 >= limite - 1 && pts1 >= limite - 1;
        if (pts0 >= limite && (!isDeuce || pts0 - pts1 >= 2)) {
          n[idx] = { ...n[idx], sets: newSets, pontos: n[idx].pontos + 1 };
          if (setAtual < maxSets - 1) setSetAtual((s) => s + 1);
        } else {
          n[idx] = { ...n[idx], sets: newSets };
        }
      } else {
        n[idx] = { ...n[idx], pontos: n[idx].pontos + pts };
      }
      return n;
    });
  }

  function resetar() {
    if (!window.confirm("Resetar o placar?")) return;
    setTimes([
      { nome: times[0].nome, pontos: 0, sets: [0, 0, 0] },
      { nome: times[1].nome, pontos: 0, sets: [0, 0, 0] },
    ]);
    setElapsed(0);
    setRunning(false);
    setSetAtual(0);
  }

  return (
    <ToolLayout
      title="Placar Poliesportivo"
      emoji="🏆"
      category="Esportes"
      description="Placar ao vivo para futebol, vôlei, basquete e beach tennis com cronômetro."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["apito árbitro esporte"]} label="apito árbitro esporte" />}
    
    >
      <div className="space-y-4">
        {/* Modalidade */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {MODALIDADES.map((m) => (
            <button
              key={m.value}
              onClick={() => { setModalidade(m.value); resetar(); }}
              className={`shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all ${
                modalidade === m.value ? "border-green-400 bg-green-400/15 text-green-400" : "border-white/10 text-gray-400"
              }`}
            >
              {m.emoji} {m.label}
            </button>
          ))}
        </div>

        {modalidade === "volei" && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">Melhor de:</span>
            {([3, 5] as const).map((n) => (
              <button
                key={n}
                onClick={() => setMelhorDe(n)}
                className={`px-3 py-1 rounded-lg text-sm border transition-all ${melhorDe === n ? "border-green-400 text-green-400 bg-green-400/10" : "border-white/10 text-gray-400"}`}
              >
                {n} sets
              </button>
            ))}
          </div>
        )}

        {/* Placar */}
        <div className="grid grid-cols-2 gap-4">
          {([0, 1] as const).map((idx) => (
            <div key={idx} className={`p-4 rounded-2xl border ${idx === 0 ? "border-blue-500/30 bg-blue-500/5" : "border-red-500/30 bg-red-500/5"}`}>
              <input
                value={times[idx].nome}
                onChange={(e) => updateNome(idx, e.target.value)}
                className={`w-full bg-transparent text-center font-bold text-base border-b pb-1 mb-3 outline-none ${idx === 0 ? "text-blue-400 border-blue-400/30" : "text-red-400 border-red-400/30"}`}
              />
              <div className={`text-5xl font-black text-center mb-4 ${idx === 0 ? "text-blue-400" : "text-red-400"}`}>
                {modalidade === "volei" ? times[idx].pontos : times[idx].pontos}
              </div>

              {modalidade === "volei" && (
                <div className="flex justify-center gap-1 mb-3">
                  {Array.from({ length: melhorDe }).map((_, i) => (
                    <div key={i} className={`text-xs px-2 py-1 rounded font-mono ${i === setAtual ? "bg-white/15 text-white" : "bg-white/5 text-gray-500"}`}>
                      {times[idx].sets[i] || 0}
                    </div>
                  ))}
                </div>
              )}

              {modalidade === "basquete" ? (
                <div className="flex justify-center gap-2">
                  {[1, 2, 3].map((pts) => (
                    <button
                      key={pts}
                      onClick={() => addPonto(idx, pts)}
                      className={`w-9 h-9 rounded-lg font-bold text-sm ${idx === 0 ? "bg-blue-500/20 hover:bg-blue-500/40 text-blue-300" : "bg-red-500/20 hover:bg-red-500/40 text-red-300"} transition-colors`}
                    >
                      +{pts}
                    </button>
                  ))}
                </div>
              ) : (
                <button
                  onClick={() => addPonto(idx)}
                  className={`w-full py-2.5 rounded-xl font-bold text-lg transition-all ${idx === 0 ? "bg-blue-500/20 hover:bg-blue-500/40 text-blue-300" : "bg-red-500/20 hover:bg-red-500/40 text-red-300"}`}
                >
                  + Ponto
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Cronômetro */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/8">
          <span className="text-2xl font-mono font-bold text-white">{fmtTime(elapsed)}</span>
          <div className="flex gap-2">
            <button onClick={() => setRunning((r) => !r)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-500/20 hover:bg-green-500/30 text-green-400 text-sm font-medium transition-colors">
              {running ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {running ? "Pausar" : "Iniciar"}
            </button>
            <button onClick={() => { setElapsed(0); setRunning(false); }} className="p-1.5 rounded-lg border border-white/10 text-gray-400 hover:text-white transition-colors">
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <button onClick={resetar} className="w-full py-2 rounded-xl border border-white/10 text-gray-500 hover:text-red-400 hover:border-red-400/30 text-sm transition-colors">
          Resetar placar
        </button>
      </div>
      <ToolContent
        toolName="Placar Poliesportivo"
        category="Esportes"
        data={{
          directAnswer: "O placar poliesportivo é um marcador digital simples que pode ser usado para acompanhar a pontuação de qualquer esporte ou jogo, direto do celular ou computador.",
          howItWorks: "A ferramenta oferece um contador de pontos simples para dois times ou jogadores, com botões para adicionar ou remover pontos. Por ser genérico (não vinculado a regras específicas de um esporte), pode ser usado em vôlei, basquete, jogos de tabuleiro, sinuca ou qualquer atividade que precise de contagem de pontos.",
          example: {
            title: "Exemplo: acompanhando um jogo de vôlei de praia",
            steps: [
              "Time A: 0 pontos iniciais",
              "Time B: 0 pontos iniciais",
              "Pontos adicionados ao longo do jogo",
              "Placar final: Time A 21 x 18 Time B",
            ],
            result: "O placar foi atualizado em tempo real durante o jogo, terminando com vitória do Time A por 21 a 18.",
          },
          faqs: [
            { question: "O placar serve para qualquer esporte?", answer: "Sim, por ser um contador genérico de pontos, funciona para praticamente qualquer esporte ou jogo que precise de contagem." },
            { question: "Posso resetar o placar durante o jogo?", answer: "Sim, há uma opção para zerar a pontuação e começar um novo jogo ou set." },
            { question: "O placar salva o histórico de jogos anteriores?", answer: "Depende da versão da ferramenta; geralmente o foco é no acompanhamento em tempo real do jogo atual." },
            { question: "Posso usar em torneios com várias partidas?", answer: "Sim, basta resetar o placar entre uma partida e outra para acompanhar cada jogo separadamente." },
          ],
        }}
      />
    </ToolLayout>
  );
}
