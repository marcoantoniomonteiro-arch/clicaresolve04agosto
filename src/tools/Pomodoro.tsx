import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import React, { useState, useEffect, useRef, useCallback } from "react";


import { Play, Pause, RotateCcw, Bell, Settings } from "lucide-react";
import { ToolContent } from "../components/ToolContent";
import { CONFIG } from "../config";

interface Props {
  onBack: () => void;
}

type Phase = "foco" | "pausaCurta" | "pausaLonga";

const PHASE_CONFIG = {
  foco: { label: "Foco", cor: "text-red-400", bg: "bg-red-500/20", border: "border-red-500/30" },
  pausaCurta: { label: "Pausa Curta", cor: "text-green-400", bg: "bg-green-500/20", border: "border-green-500/30" },
  pausaLonga: { label: "Pausa Longa", cor: "text-blue-400", bg: "bg-blue-500/20", border: "border-blue-500/30" },
};

export function Pomodoro({ onBack }: Props) {
  const [config, setConfig] = useState(() => {
    const saved = localStorage.getItem("pomodoro-config");
    return saved ? JSON.parse(saved) : { foco: 25, pausaCurta: 5, pausaLonga: 15 };
  });
  const [phase, setPhase] = useState<Phase>("foco");
  const [seconds, setSeconds] = useState(config.foco * 60);
  const [running, setRunning] = useState(false);
  const [ciclos, setCiclos] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    localStorage.setItem("pomodoro-config", JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    if (!running) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          playBeep();
          notificar();
          nextPhase();
          return 0;
        }
        return s - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const playBeep = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.value = 800;
    osc.type = "sine";
    gain.gain.value = 0.3;
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
    setTimeout(() => {
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.frequency.value = 1000;
      osc2.type = "sine";
      gain2.gain.value = 0.3;
      osc2.start();
      osc2.stop(ctx.currentTime + 0.3);
    }, 250);
  }, []);

  const notificar = useCallback(() => {
    if ("Notification" in window && Notification.permission === "granted") {
      const phaseLabel = PHASE_CONFIG[phase].label;
      new Notification("Pomodoro - CLICAresolve", {
        body: `${phaseLabel} concluido!`,
        icon: "🍅",
      });
    }
  }, [phase]);

  const nextPhase = useCallback(() => {
    setRunning(false);
    setCiclos((c) => c + 1);

    if (phase === "foco") {
      const novaPausa = (ciclos + 1) % 4 === 0 ? "pausaLonga" : "pausaCurta";
      setPhase(novaPausa);
      setSeconds(config[novaPausa] * 60);
    } else {
      setPhase("foco");
      setSeconds(config.foco * 60);
    }
  }, [phase, ciclos, config]);

  const toggleTimer = useCallback(() => {
    setRunning((r) => !r);
  }, []);

  const reset = useCallback(() => {
    setRunning(false);
    setSeconds(config[phase] * 60);
  }, [config, phase]);

  const skipPhase = useCallback(() => {
    setRunning(false);
    setCiclos((c) => c + 1);

    if (phase === "foco") {
      const novaPausa = (ciclos + 1) % 4 === 0 ? "pausaLonga" : "pausaCurta";
      setPhase(novaPausa);
      setSeconds(config[novaPausa] * 60);
    } else {
      setPhase("foco");
      setSeconds(config.foco * 60);
    }
  }, [phase, ciclos, config]);

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  const phaseInfo = PHASE_CONFIG[phase];
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <ToolLayout
      title="Pomodoro"
      emoji="🍅"
      category="Estudos"
      description="Timer de foco com pausas configuraveis e notificacoes."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["timer físico estudo"]} label="timer físico estudo" />}
    
    >
      <div className="space-y-5">
        <div className={`p-8 rounded-2xl ${phaseInfo.bg} border ${phaseInfo.border} text-center`}>
          <p className={`text-sm font-semibold ${phaseInfo.cor} mb-2`}>{phaseInfo.label}</p>
          <p className="text-7xl font-black text-white tabular-nums">
            {String(minutes).padStart(2, "0")}:{String(secs).padStart(2, "0")}
          </p>
          <p className="text-xs text-gray-500 mt-2">Ciclo {ciclos + 1}</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={toggleTimer}
            className="btn-primary flex-1 flex items-center justify-center gap-2"
          >
            {running ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {running ? "Pausar" : "Iniciar"}
          </button>
          <button
            onClick={reset}
            className="px-4 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={skipPhase}
          className="w-full text-sm text-gray-400 hover:text-white underline"
        >
          Pular para proxima fase
        </button>

        <div className="p-4 rounded-xl bg-white/5 border border-white/8">
          <div className="flex items-center gap-2 mb-3">
            <Settings className="w-4 h-4 text-gray-400" />
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Configuracao</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {[
              { key: "foco", label: "Foco (min)" },
              { key: "pausaCurta", label: "Pausa Curta" },
              { key: "pausaLonga", label: "Pausa Longa" },
            ].map(({ key, label }) => (
              <label key={key} className="block text-center">
                <span className="text-xs text-gray-500">{label}</span>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={config[key as keyof typeof config]}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 1;
                    setConfig((prev: any) => ({ ...prev, [key]: val }));
                    if (phase === key && !running) {
                      setSeconds(val * 60);
                    }
                  }}
                  className="input-field text-center mt-1"
                />
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
          <Bell className="w-3 h-3" />
          <span>Notificacoes {Notification.permission === "granted" ? "ativas" : "inativas"}</span>
        </div>
      </div>
      <ToolContent
        toolName="Técnica Pomodoro"
        category="Estudos"
        data={{
          directAnswer: "A técnica Pomodoro usa 25 minutos de foco intenso + 5 minutos de pausa. Após 4 ciclos, faça uma pausa longa de 15-30 minutos.",
          howItWorks: "A técnica Pomodoro foi criada por Francesco Cirillo em 1980. É baseada em 4 princípios: 1) Trabalho focado em blocos curtos (25 min); 2) Pausas obrigatórias entre os blocos; 3) Após 4 ciclos, pausa longa de 15-30 min; 4) Registro de interrupções para melhorar o foco. A ferramenta implementa um timer completo com 3 fases: Foco (padrão 25 min), Pausa Curta (5 min) e Pausa Longa (15 min). O timer mostra o tempo restante em formato grande, toca um beep sonoro no final de cada fase e envia notificações do navegador (se permitido). As configurações (tempos de cada fase) são salvas no localStorage. O ciclo conta quantos Pomodoros foram completados e alterna automaticamente entre foco e pausa.",
          example: {
            title: "Exemplo: sessão de 2 horas de estudo com Pomodoro",
            steps: [
              "Inicie o timer na fase 'Foco' (25 minutos)",
              "Trabalhe sem interrupções até o timer tocar",
              "Timer automaticamente alterna para 'Pausa Curta' (5 min)",
              "Após 4 ciclos, o timer alterna para 'Pausa Longa' (15 min)",
              "Repita até completar a sessão de estudo planejada"
            ],
            result: "Em 2 horas: 4 Pomodoros de 25 min = 100 min de foco + 15 min de pausa = 115 min totais. Alta produtividade com menos cansaço.",
          },
          outboundLinks: [
            { label: "Técnica Pomodoro - Cirillo", url: "https://francescocirillo.com/products/pomodoro-technique", source: "Francesco Cirillo (criador)" }
          ],
          faqs: [
            { question: "O que é técnica Pomodoro?", answer: "É um método de produtividade que divide o trabalho em blocos de 25 minutos de foco + 5 minutos de pausa. Criada por Francesco Cirillo em 1980." },
            { question: "Quanto tempo dura um Pomodoro?", answer: "Padrão: 25 minutos de foco + 5 minutos de pausa. Após 4 ciclos: pausa longa de 15-30 minutos. Os tempos são configuráveis na ferramenta." },
            { question: "Pomodoro funciona para estudos?", answer: "Sim. Pesquisas mostram que blocos curtos de foco aumentam retenção e reduzem procrastinação. Ideal para estudar para concursos e vestibulares." },
            { question: "Como fazer pausa no Pomodoro?", answer: "Levante-se, alongue-se, beba água, evite telas. A pausa é parte do método — não é perda de tempo. Não verifique redes sociais." },
            { question: "Quantos Pomodoros por dia?", answer: "Para estudos intensos: 8-12 Pomodoros (4-6 horas de foco). Para trabalho: 6-8. Mais que isso pode levar à fadiga mental." },
          ],
        }}
      />
    </ToolLayout>
  );
}
