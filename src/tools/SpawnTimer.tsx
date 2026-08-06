import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import React, { useState, useEffect, useCallback, useRef } from "react";


import { Timer, Plus, Trash2, Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { ToolContent } from "../components/ToolContent";

interface Props {
  onBack: () => void;
}

interface SpawnTimerItem {
  id: number;
  nome: string;
  segundos: number;
  segundosRestantes: number;
  rodando: boolean;
}

export function SpawnTimer({ onBack }: Props) {
  const [timers, setTimers] = useState<SpawnTimerItem[]>([]);
  const [novoNome, setNovoNome] = useState("Boss");
  const [novoTempo, setNovoTempo] = useState("60");
  const [somAtivo, setSomAtivo] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbY2TVkCAi");
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((prev) =>
        prev.map((t) => {
          if (!t.rodando || t.segundosRestantes <= 0) return t;
          const novoRestante = t.segundosRestantes - 1;
          if (novoRestante === 0 && somAtivo && audioRef.current) {
            audioRef.current.play().catch(() => {});
          }
          return { ...t, segundosRestantes: novoRestante };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [somAtivo]);

  const addTimer = useCallback(() => {
    if (timers.length >= 6) return;
    const segundos = parseInt(novoTempo) || 60;
    setTimers((prev) => [
      ...prev,
      {
        id: Date.now(),
        nome: novoNome || "Timer",
        segundos,
        segundosRestantes: segundos,
        rodando: false,
      },
    ]);
    setNovoNome("Boss");
    setNovoTempo("60");
  }, [timers.length, novoNome, novoTempo]);

  const removeTimer = useCallback((id: number) => {
    setTimers((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toggleTimer = useCallback((id: number) => {
    setTimers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, rodando: !t.rodando } : t))
    );
  }, []);

  const resetTimer = useCallback((id: number) => {
    setTimers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, segundosRestantes: t.segundos, rodando: false } : t))
    );
  }, []);

  const formatarTempo = (seg: number) => {
    const m = Math.floor(seg / 60);
    const s = seg % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <ToolLayout
      title="Cronometro de Spawn"
      emoji="⏲️"
      category="Utilidades"
      description="Multiplos timers para monitorar spawns em jogos. Ideal como segunda tela."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["segundo monitor setup"]} label="segundo monitor setup" mercadoLivreTerms={["monitor gamer 24 polegadas"]} mercadoLivreLabel="Encontre no Mercado Livre" />}
    
    >
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-400">{timers.length}/6 timers</p>
          <button
            onClick={() => setSomAtivo(!somAtivo)}
            className={`p-2 rounded ${somAtivo ? "text-green-400" : "text-gray-500"}`}
          >
            {somAtivo ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>

        {timers.length < 6 && (
          <div className="p-4 rounded-xl bg-white/5 border border-white/8">
            <div className="grid grid-cols-2 gap-2 mb-2">
              <input
                type="text"
                value={novoNome}
                onChange={(e) => setNovoNome(e.target.value)}
                placeholder="Nome"
                className="input-field"
              />
              <input
                type="number"
                value={novoTempo}
                onChange={(e) => setNovoTempo(e.target.value)}
                placeholder="Segundos"
                className="input-field"
              />
            </div>
            <div className="flex gap-2 flex-wrap mb-2">
              {[30, 60, 120, 180, 300].map((s) => (
                <button
                  key={s}
                  onClick={() => setNovoTempo(s.toString())}
                  className="px-2 py-1 rounded bg-white/5 text-xs text-gray-400 hover:bg-white/10"
                >
                  {formatarTempo(s)}
                </button>
              ))}
            </div>
            <button onClick={addTimer} className="btn-primary w-full flex items-center justify-center gap-1">
              <Plus className="w-4 h-4" /> Adicionar Timer
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {timers.map((t) => {
            const progresso = t.segundos > 0 ? (t.segundosRestantes / t.segundos) * 100 : 0;
            const acabando = t.segundosRestantes <= 10 && t.segundosRestantes > 0;
            const zerado = t.segundosRestantes === 0;

            return (
              <div
                key={t.id}
                className={`p-4 rounded-xl border ${
                  zerado
                    ? "bg-red-500/20 border-red-500/40"
                    : acabando
                    ? "bg-yellow-500/20 border-yellow-500/40 animate-pulse"
                    : "bg-white/5 border-white/8"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white">{t.nome}</span>
                  <button onClick={() => removeTimer(t.id)} className="text-gray-500 hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-center mb-3">
                  <p className={`text-4xl font-black ${zerado ? "text-red-400" : acabando ? "text-yellow-400" : "text-white"}`}>
                    {formatarTempo(t.segundosRestantes)}
                  </p>
                  {zerado && <p className="text-xs text-red-400 animate-pulse">SPAWN!</p>}
                </div>

                <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                  <div
                    className={`h-full rounded-full transition-all ${
                      zerado ? "bg-red-500" : acabando ? "bg-yellow-500" : "bg-blue-500"
                    }`}
                    style={{ width: `${progresso}%` }}
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleTimer(t.id)}
                    className={`flex-1 p-2 rounded text-sm font-semibold ${
                      t.rodando ? "bg-yellow-500/20 text-yellow-400" : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {t.rodando ? <Pause className="w-4 h-4 mx-auto" /> : <Play className="w-4 h-4 mx-auto" />}
                  </button>
                  <button
                    onClick={() => resetTimer(t.id)}
                    className="flex-1 p-2 rounded bg-white/10 text-gray-400 text-sm font-semibold hover:bg-white/20"
                  >
                    <RotateCcw className="w-4 h-4 mx-auto" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ToolContent
        toolName="Spawn Timer"
        category="Jogos"
        data={{
          directAnswer: "O spawn timer conta regressivamente o tempo até o reaparecimento (respawn) de um item, chefe ou ponto estratégico em jogos competitivos.",
          howItWorks: "A ferramenta funciona como um cronômetro regressivo configurável, usado para acompanhar quando um item, power-up, chefe ou zona específica volta a aparecer em um jogo, ajudando jogadores competitivos a planejar estrategicamente seus movimentos com base nesses tempos de espera.",
          example: {
            title: "Exemplo: cronometrando o respawn de um item raro",
            steps: [
              "Tempo de respawn configurado: 5 minutos",
              "Cronômetro iniciado após o item ser coletado",
              "Contagem regressiva exibida em tempo real",
              "Alerta ao completar os 5 minutos",
            ],
            result: "O timer avisa exatamente quando o item volta a aparecer, permitindo ao jogador planejar o momento certo de retornar ao local.",
          },
          faqs: [
            { question: "Posso configurar timers diferentes para itens diferentes?", answer: "Sim, é possível ajustar o tempo de contagem conforme o item ou evento específico do jogo." },
            { question: "É possível rodar múltiplos timers ao mesmo tempo?", answer: "Sim, dependendo da versão, é possível acompanhar vários timers simultaneamente para diferentes pontos do jogo." },
            { question: "O timer emite algum alerta sonoro?", answer: "Muitas versões incluem alerta visual e/ou sonoro ao final da contagem regressiva." },
            { question: "Funciona para qualquer jogo?", answer: "Sim, é uma ferramenta genérica de cronometragem, adaptável a qualquer jogo com mecânicas de respawn ou tempo de espera." },
          ],
        }}
      />
    </ToolLayout>
  );
}
