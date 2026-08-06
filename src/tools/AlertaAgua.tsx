import React, { useState, useEffect, useRef, useCallback } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { Play, Pause, RotateCcw } from "lucide-react";
import { ToolContent } from "../components/ToolContent";

interface Props { onBack: () => void; }

const MENSAGENS = [
  { text: "Hora de beber água!", emoji: "💧" },
  { text: "Levante e alongue!", emoji: "🧘" },
  { text: "Descanse os olhos!", emoji: "👀" },
];

export function AlertaAgua({ onBack }: Props) {
  const [intervalo, setIntervalo] = useState(50);
  const [ativo, setAtivo] = useState(false);
  const [restante, setRestante] = useState(0);
  const [alerta, setAlerta] = useState<null | { text: string; emoji: string }>(null);
  const [msgIdx, setMsgIdx] = useState(0);
  const timerRef = useRef<number | null>(null);
  const endRef = useRef<number>(0);

  const dispararAlerta = useCallback(() => {
    const msg = MENSAGENS[msgIdx % MENSAGENS.length];
    setMsgIdx((i) => i + 1);
    setAlerta(msg);

    // Sound via AudioContext
    try {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.8);
    } catch {}

    // Browser notification
    if (Notification.permission === "granted") {
      new Notification(`CLICAresolve — ${msg.text}`, { body: msg.text, icon: "/vite.svg" });
    }

    setTimeout(() => setAlerta(null), 5000);
  }, [msgIdx]);

  useEffect(() => {
    if (!ativo) return;

    endRef.current = Date.now() + intervalo * 60 * 1000;

    timerRef.current = window.setInterval(() => {
      const rem = Math.max(0, Math.ceil((endRef.current - Date.now()) / 1000));
      setRestante(rem);
      if (rem === 0) {
        dispararAlerta();
        endRef.current = Date.now() + intervalo * 60 * 1000;
      }
    }, 1000);

    setRestante(intervalo * 60);

    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [ativo, intervalo]);

  function iniciar() {
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
    setAtivo(true);
  }

  function pausar() {
    setAtivo(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }

  function resetar() {
    pausar();
    setRestante(0);
    setAlerta(null);
  }

  function fmtTime(s: number) {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  }

  const progress = ativo && restante > 0 ? ((intervalo * 60 - restante) / (intervalo * 60)) * 100 : 0;

  return (
    <ToolLayout
      title="Alerta de Pausa para Água"
      emoji="💧"
      category="Saúde"
      description="Configure lembretes periódicos para beber água, alongar e descansar os olhos."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["garrafa de agua com marcacao de horas", "squeeze motivacional"]} label="Hidratação e bem-estar" />}
      disclaimer="Esta ferramenta é puramente informativa. Não substitui consulta médica ou diagnóstico profissional. Consulte sempre um profissional de saúde habilitado."
    >
      <div className="space-y-6">
        {alerta && (
          <div className="p-6 rounded-2xl bg-blue-500/20 border-2 border-blue-500/60 text-center animate-bounce">
            <p className="text-5xl mb-2">{alerta.emoji}</p>
            <p className="text-xl font-black text-blue-300">{alerta.text}</p>
          </div>
        )}

        <div className="text-center">
          <div className="relative inline-flex items-center justify-center w-40 h-40">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
              <circle
                cx="50" cy="50" r="44" fill="none"
                stroke={ativo ? "#22d3ee" : "rgba(255,255,255,0.15)"}
                strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 44}`}
                strokeDashoffset={`${2 * Math.PI * 44 * (1 - progress / 100)}`}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 1s linear" }}
              />
            </svg>
            <div className="text-center">
              <p className="text-3xl font-black text-white">{ativo ? fmtTime(restante) : fmtTime(intervalo * 60)}</p>
              <p className="text-xs text-gray-500">restantes</p>
            </div>
          </div>
        </div>

        <label className="block">
          <span className="text-sm text-gray-400 mb-2 block">Intervalo: <strong className="text-white">{intervalo} min</strong></span>
          <input
            type="range"
            min="20"
            max="90"
            step="5"
            value={intervalo}
            onChange={(e) => { setIntervalo(parseInt(e.target.value)); resetar(); }}
            className="w-full accent-cyan-400"
            disabled={ativo}
          />
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>20 min</span><span>55 min</span><span>90 min</span>
          </div>
        </label>

        <div className="flex gap-3">
          {!ativo ? (
            <button onClick={iniciar} className="flex-1 flex items-center justify-center gap-2 btn-primary">
              <Play className="w-4 h-4" /> Iniciar
            </button>
          ) : (
            <button
              onClick={pausar}
              className="flex-1 flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm transition-all"
            >
              <Pause className="w-4 h-4" /> Pausar
            </button>
          )}
          <button
            onClick={resetar}
            className="w-11 h-11 flex items-center justify-center rounded-xl border border-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
      <ToolContent
        toolName="Alerta de Água"
        category="Saúde"
        data={{
          directAnswer: "O alerta de pausa para água lembra periodicamente a pessoa de beber água ao longo do dia, ajudando a manter uma boa hidratação.",
          howItWorks: "A ferramenta funciona como um lembrete configurável que notifica o usuário em intervalos regulares (por exemplo, a cada 1-2 horas) para fazer uma pausa e beber água, ajudando pessoas que passam muito tempo concentradas no trabalho e esquecem de se hidratar adequadamente ao longo do dia.",
          example: {
            title: "Exemplo: configurando lembretes a cada 90 minutos",
            steps: [
              "Intervalo configurado: 90 minutos",
              "Primeiro lembrete: 9h30",
              "Segundo lembrete: 11h00",
              "Terceiro lembrete: 12h30",
            ],
            result: "Com lembretes a cada 90 minutos, a pessoa recebe cerca de 5-6 notificações ao longo de um dia de trabalho para se hidratar.",
          },
          faqs: [
            { question: "Qual o intervalo ideal entre os lembretes de água?", answer: "Não há um número universal, mas intervalos de 1 a 2 horas são comumente recomendados para manter a hidratação ao longo do dia." },
            { question: "Quanto de água devo beber por dia?", answer: "A recomendação geral é de cerca de 35ml por kg de peso corporal, mas isso pode variar conforme atividade física e clima." },
            { question: "Os lembretes funcionam com o navegador fechado?", answer: "Isso depende da configuração específica; notificações no navegador geralmente exigem que a aba ou o navegador estejam abertos." },
            { question: "Esqueci de beber água em um lembrete, o que fazer?", answer: "Sem problema, basta continuar seguindo os próximos lembretes normalmente; o objetivo é criar o hábito ao longo do tempo." },
          ],
        }}
      />
    </ToolLayout>
  );
}
