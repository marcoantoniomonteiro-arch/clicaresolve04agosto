import React, { useState, useEffect } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { Share2 } from "lucide-react";
import { ToolContent } from "../components/ToolContent";

interface Props { onBack: () => void; }

interface Task {
  id: string;
  label: string;
  freq: "diaria" | "semanal" | "mensal";
  done: boolean;
}

interface Zone {
  id: string;
  name: string;
  emoji: string;
  tasks: Task[];
}

const STORAGE_KEY = "clicaresolve-limpeza";

function defaultZones(): Zone[] {
  return [
    {
      id: "cozinha", name: "Cozinha", emoji: "🍳",
      tasks: [
        { id: "c1", label: "Lavar louça", freq: "diaria", done: false },
        { id: "c2", label: "Limpar fogão", freq: "diaria", done: false },
        { id: "c3", label: "Limpar geladeira", freq: "semanal", done: false },
        { id: "c4", label: "Lavar armários", freq: "mensal", done: false },
        { id: "c5", label: "Tirar lixo", freq: "diaria", done: false },
      ],
    },
    {
      id: "banheiro", name: "Banheiro", emoji: "🚿",
      tasks: [
        { id: "b1", label: "Limpar pia", freq: "diaria", done: false },
        { id: "b2", label: "Lavar vaso", freq: "semanal", done: false },
        { id: "b3", label: "Lavar box/banheira", freq: "semanal", done: false },
        { id: "b4", label: "Limpar espelho", freq: "semanal", done: false },
        { id: "b5", label: "Lavar azulejos", freq: "mensal", done: false },
      ],
    },
    {
      id: "sala", name: "Sala", emoji: "🛋️",
      tasks: [
        { id: "s1", label: "Varrer/aspirar", freq: "semanal", done: false },
        { id: "s2", label: "Passar pano", freq: "semanal", done: false },
        { id: "s3", label: "Limpar móveis", freq: "semanal", done: false },
        { id: "s4", label: "Limpar janelas", freq: "mensal", done: false },
      ],
    },
    {
      id: "quartos", name: "Quartos", emoji: "🛏️",
      tasks: [
        { id: "q1", label: "Fazer cama", freq: "diaria", done: false },
        { id: "q2", label: "Varrer/aspirar", freq: "semanal", done: false },
        { id: "q3", label: "Trocar roupa de cama", freq: "semanal", done: false },
        { id: "q4", label: "Limpar guarda-roupa", freq: "mensal", done: false },
      ],
    },
    {
      id: "externa", name: "Área Externa", emoji: "🌿",
      tasks: [
        { id: "e1", label: "Varrer quintal", freq: "semanal", done: false },
        { id: "e2", label: "Lavar calçada", freq: "semanal", done: false },
        { id: "e3", label: "Regar plantas", freq: "diaria", done: false },
        { id: "e4", label: "Limpar garagem", freq: "mensal", done: false },
      ],
    },
  ];
}

const FREQ_COLORS: Record<string, string> = {
  diaria: "text-blue-400 bg-blue-400/10",
  semanal: "text-green-400 bg-green-400/10",
  mensal: "text-amber-400 bg-amber-400/10",
};

export function LimpezaZonas({ onBack }: Props) {
  const [zones, setZones] = useState<Zone[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultZones();
    } catch {
      return defaultZones();
    }
  });
  const [activeZone, setActiveZone] = useState("cozinha");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(zones));
  }, [zones]);

  function toggleTask(zoneId: string, taskId: string) {
    setZones(zones.map((z) =>
      z.id === zoneId
        ? { ...z, tasks: z.tasks.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t)) }
        : z
    ));
  }

  function zoneProgress(zone: Zone) {
    if (!zone.tasks.length) return 0;
    return Math.round((zone.tasks.filter((t) => t.done).length / zone.tasks.length) * 100);
  }

  const totalDone = zones.reduce((s, z) => s + z.tasks.filter((t) => t.done).length, 0);
  const totalTasks = zones.reduce((s, z) => s + z.tasks.length, 0);
  const totalProgress = totalTasks ? Math.round((totalDone / totalTasks) * 100) : 0;

  function gerarWhatsApp() {
    const pending = zones.flatMap((z) =>
      z.tasks.filter((t) => !t.done).map((t) => `${z.emoji} ${z.name}: ${t.label} (${t.freq})`)
    );
    const msg = `*Lista de Limpeza CLICAresolve*\n\n${pending.map((p) => `- ${p}`).join("\n")}\n\n_Gerado por CLICAresolve_`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, "_blank");
  }

  const active = zones.find((z) => z.id === activeZone)!;

  return (
    <ToolLayout
      title="Organizador de Limpeza"
      emoji="🧹"
      category="Utilidades"
      description="Gerencie tarefas de limpeza por zona com checklists diários, semanais e mensais."
      onBack={onBack}
      affiliateBanner={
        <AffiliateBanner
          terms={["kit de limpeza", "pano microfibra", "rodo profissional"]}
          label="Produtos de limpeza"
        />
      }
    >
      <div className="space-y-4">
        <div className="p-3 rounded-xl bg-white/5 border border-white/8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Progresso Geral</span>
            <span className="text-sm font-bold text-white">{totalDone}/{totalTasks}</span>
          </div>
          <div className="h-2 rounded-full bg-white/10">
            <div
              className="h-2 rounded-full bg-green-400 transition-all duration-500"
              style={{ width: `${totalProgress}%` }}
            />
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {zones.map((z) => {
            const prog = zoneProgress(z);
            return (
              <button
                key={z.id}
                onClick={() => setActiveZone(z.id)}
                className={`shrink-0 flex flex-col items-center gap-1 px-3 py-2 rounded-xl border transition-all text-xs ${
                  activeZone === z.id
                    ? "border-green-400/50 bg-green-400/10 text-green-400"
                    : "border-white/8 bg-white/3 text-gray-400 hover:border-white/20"
                }`}
              >
                <span className="text-lg">{z.emoji}</span>
                <span className="font-medium">{z.name}</span>
                <span className={prog === 100 ? "text-green-400" : "text-gray-500"}>{prog}%</span>
              </button>
            );
          })}
        </div>

        <div className="space-y-2">
          {active.tasks.map((task) => (
            <label
              key={task.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-white/3 border border-white/8 cursor-pointer hover:bg-white/5 transition-colors"
            >
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(active.id, task.id)}
                className="w-4 h-4 rounded"
              />
              <span className={`flex-1 text-sm ${task.done ? "line-through text-gray-600" : "text-white"}`}>
                {task.label}
              </span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${FREQ_COLORS[task.freq]}`}>
                {task.freq}
              </span>
            </label>
          ))}
        </div>

        <button
          onClick={gerarWhatsApp}
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-green-600 hover:bg-green-500 text-white text-sm font-semibold transition-colors"
        >
          <Share2 className="w-4 h-4" />
          Gerar lista para WhatsApp
        </button>
      </div>
      <ToolContent
        toolName="Limpeza por Zonas"
        category="Utilidades"
        data={{
          directAnswer: "O organizador de limpeza por zonas divide a casa em áreas específicas e distribui as tarefas de limpeza ao longo da semana, evitando sobrecarga em um único dia.",
          howItWorks: "A ferramenta divide a casa em zonas (cozinha, banheiros, quartos, sala, áreas externas) e distribui tarefas de limpeza específicas de cada zona ao longo dos dias da semana, seguindo o método de 'limpeza por zonas', que evita ter que limpar a casa inteira de uma vez, tornando a rotina de limpeza mais leve e constante.",
          example: {
            title: "Exemplo: distribuição semanal de limpeza",
            steps: [
              "Segunda-feira: Cozinha (geladeira, fogão, armários)",
              "Terça-feira: Banheiros (box, vaso, pia)",
              "Quarta-feira: Quartos (troca de roupa de cama, organização)",
              "Quinta-feira: Sala e áreas comuns",
            ],
            result: "A distribuição por zonas divide a limpeza profunda da casa ao longo da semana, evitando concentrar tudo em um único dia.",
          },
          faqs: [
            { question: "O que é o método de limpeza por zonas?", answer: "É uma técnica de organização doméstica que divide a casa em áreas específicas, distribuindo as tarefas de limpeza profunda ao longo dos dias da semana." },
            { question: "Preciso limpar a casa toda todo dia mesmo com esse método?", answer: "Não, tarefas rápidas do dia a dia (como lavar louça) continuam diárias, mas a limpeza mais profunda de cada zona é feita em dias específicos." },
            { question: "Posso personalizar as zonas conforme meu tipo de casa?", answer: "Sim, a divisão de zonas pode ser adaptada ao tamanho e cômodos específicos de cada residência." },
            { question: "Esse método funciona para quem mora sozinho?", answer: "Sim, o método é adaptável tanto para famílias quanto para pessoas que moram sozinhas, ajustando a frequência conforme a necessidade." },
          ],
        }}
      />
    </ToolLayout>
  );
}
