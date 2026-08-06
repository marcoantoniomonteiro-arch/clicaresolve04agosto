import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import React, { useState, useMemo } from "react";


import { Plus, Trash2, BookOpen } from "lucide-react";
import { ToolContent } from "../components/ToolContent";
import { CONFIG } from "../config";

interface Props {
  onBack: () => void;
}

interface Materia {
  id: number;
  nome: string;
  peso: number;
  horas: number;
}

const DIAS_SEMANA = ["Segunda", "Terca", "Quarta", "Quinta", "Sexta", "Sabado", "Domingo"];

export function CicloEstudos({ onBack }: Props) {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [novaMateria, setNovaMateria] = useState("");
  const [novoPeso, setNovoPeso] = useState(3);
  const [horasSemana, setHorasSemana] = useState(20);

  const addMateria = () => {
    if (!novaMateria.trim()) return;
    setMaterias((prev) => [
      ...prev,
      { id: Date.now(), nome: novaMateria.trim(), peso: novoPeso, horas: 0 },
    ]);
    setNovaMateria("");
    setNovoPeso(3);
  };

  const removeMateria = (id: number) => {
    setMaterias((prev) => prev.filter((m) => m.id !== id));
  };

  const updatePeso = (id: number, peso: number) => {
    setMaterias((prev) => prev.map((m) => (m.id === id ? { ...m, peso } : m)));
  };

  const distribuicao = useMemo(() => {
    const totalPeso = materias.reduce((acc, m) => acc + m.peso, 0);
    if (totalPeso === 0) return [];

    return materias.map((m) => ({
      ...m,
      horas: Math.round((m.peso / totalPeso) * horasSemana),
    }));
  }, [materias, horasSemana]);

  const gradeSemanal = useMemo(() => {
    if (distribuicao.length === 0) return { dias: [], horasPorDia: 0 };

    const horasPorDia = Math.ceil(horasSemana / 7);
    const blocoMinutos = 30;
    const blocosPorHora = 60 / blocoMinutos;
    const totalBlocos = horasSemana * blocosPorHora;
    const blocosPorDia = Math.ceil(totalBlocos / 7);

    const blocos: { materia: string; cor: string }[] = [];
    distribuicao.forEach((m) => {
      const blocosMateria = Math.round((m.horas / horasSemana) * totalBlocos);
      const cor = `hsl(${(m.id * 137) % 360}, 70%, 45%)`;
      for (let i = 0; i < blocosMateria; i++) {
        blocos.push({ materia: m.nome, cor });
      }
    });

    const dias = DIAS_SEMANA.map((_, diaIdx) => {
      const inicio = diaIdx * blocosPorDia;
      const blocosDia = blocos.slice(inicio, inicio + blocosPorDia);
      return blocosDia;
    });

    return { dias, horasPorDia };
  }, [distribuicao, horasSemana]);

  return (
    <ToolLayout
      title="Montador de Ciclo de Estudos"
      emoji="📚"
      category="Estudos"
      description="Distribua horas de estudo proporcionalmente ao peso de cada materia."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["planner estudos organização"]} label="planner estudos organização" />}
    
    >
      <div className="space-y-5">
        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Horas disponiveis por semana</span>
          <input
            type="number"
            value={horasSemana}
            onChange={(e) => setHorasSemana(parseInt(e.target.value) || 0)}
            className="input-field w-24"
          />
        </label>

        <div className="flex gap-3">
          <input
            type="text"
            value={novaMateria}
            onChange={(e) => setNovaMateria(e.target.value)}
            placeholder="Nome da materia"
            className="input-field flex-1"
            onKeyDown={(e) => e.key === "Enter" && addMateria()}
          />
          <select
            value={novoPeso}
            onChange={(e) => setNovoPeso(parseInt(e.target.value))}
            className="input-field w-20"
          >
            {[1, 2, 3, 4, 5].map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <button onClick={addMateria} className="btn-primary px-4 flex items-center gap-1">
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {materias.length > 0 && (
          <div className="space-y-2">
            {distribuicao.map((m) => (
              <div key={m.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/8">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: `hsl(${(m.id * 137) % 360}, 70%, 45%)` }}
                />
                <span className="flex-1 text-sm text-white">{m.nome}</span>
                <select
                  value={m.peso}
                  onChange={(e) => updatePeso(m.id, parseInt(e.target.value))}
                  className="input-field w-16 text-center"
                >
                  {[1, 2, 3, 4, 5].map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                <span className="text-sm text-green-400 font-semibold w-20 text-right">
                  {m.horas}h/sem
                </span>
                <button
                  onClick={() => removeMateria(m.id)}
                  className="text-gray-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {gradeSemanal.dias.length > 0 && (
          <div className="p-4 rounded-xl bg-white/5 border border-white/8">
            <div className="flex items-center gap-2 mb-3">
              <BookOpen className="w-4 h-4 text-gray-400" />
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                Grade Semanal
              </p>
            </div>
            <div className="grid grid-cols-7 gap-1">
              {gradeSemanal.dias.map((blocos, diaIdx) => (
                <div key={diaIdx} className="text-center">
                  <p className="text-xs text-gray-500 mb-1">{DIAS_SEMANA[diaIdx].slice(0, 3)}</p>
                  <div className="flex flex-col gap-0.5 min-h-24">
                    {blocos.slice(0, 16).map((bloco, i) => (
                      <div
                        key={i}
                        className="h-2 rounded-sm"
                        style={{ backgroundColor: bloco.cor }}
                        title={bloco.materia}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Aprox. {gradeSemanal.horasPorDia}h por dia
            </p>
          </div>
        )}
      </div>
      <ToolContent
        toolName="CicloEstudos"
        category="Estudos"
        data={{
          directAnswer: "O ciclo de estudos divide seu tempo em blocos de 50 minutos de foco + 10 minutos de pausa. Ideal para 4-6 ciclos por dia.",
          howItWorks: "O montador de ciclo de estudos distribui as horas disponíveis por semana entre as matérias de forma proporcional ao peso de cada uma. A fórmula: horas por matéria = (peso / soma dos pesos) × horas/semana. O peso representa a prioridade: 1 (baixa) a 5 (máxima). A ferramenta também gera uma grade semanal visual: divide os dias da semana em blocos de 30 minutos, coloridos por matéria, facilitando a organização do cronograma. Cada matéria recebe uma cor única (cálculo por HSL). A grade semanal mostra aproximadamente quantas horas de estudo por dia. A ferramenta é ideal para concursos, vestibulares e planos de estudo a longo prazo.",
          example: {
            title: "Exemplo: 20h/semana, Matemática peso 5, Português peso 3",
            steps: [
              "Informe 20 horas disponíveis por semana",
              "Adicione matéria 'Matemática' com peso 5",
              "Adicione matéria 'Português' com peso 3",
              "Calcula: soma pesos = 8; Matemática = 5/8 × 20 = 12,5h; Português = 3/8 × 20 = 7,5h",
              "Exibe grade semanal com blocos coloridos para cada matéria"
            ],
            result: "Matemática: 12,5h/semana (≈1,8h/dia); Português: 7,5h/semana (≈1,1h/dia). Total: 20h bem distribuídas.",
          },
          outboundLinks: [
            { label: "Guia de Produtividade Acadêmica", url: "https://www.gov.br/inep/pt-br", source: "INEP - Ministério da Educação" }
          ],
          faqs: [
            { question: "Como fazer ciclo de estudos?", answer: "Liste todas as matérias, atribua pesos (1-5) conforme dificuldade/importância, defina horas/semana e a ferramenta distribui automaticamente." },
            { question: "Quantas horas estudar por dia?", answer: "Depende do objetivo. Concurso: 4-6h. Vestibular: 6-8h. Graduação: 2-4h. Use a ferramenta para distribuir proporcionalmente." },
            { question: "Qual melhor tempo de foco?", answer: "Pesquisas sugerem blocos de 25-50 minutos com pausas de 5-10 minutos. Use Pomodoro (25/5) ou ciclos de 50/10 para matérias densas." },
            { question: "Como estudar sem procrastinar?", answer: "1) Defina horários fixos; 2) Elimine distrações (modo avião); 3) Use técnica Pomodoro; 4) Estude a matéria mais difícil primeiro; 5) Recompense-se após cumprir." },
            { question: "Ciclo de estudos funciona?", answer: "Sim, quando bem planejado. A distribuição proporcional garante que matérias difíceis recebam mais tempo. A grade visual ajuda a manter consistência." },
          ],
        }}
      />
    </ToolLayout>
  );
}
