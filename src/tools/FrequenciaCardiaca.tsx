import React, { useState } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { CONFIG } from "../config";

interface Props { onBack: () => void; }

const ZONAS = [
  { n: 1, label: "Zona 1 — Recuperação", pctMin: 50, pctMax: 60, cor: "bg-blue-400", desc: "Muito leve. Aquecimento e recuperação ativa." },
  { n: 2, label: "Zona 2 — Base Aeróbica", pctMin: 60, pctMax: 70, cor: "bg-green-400", desc: "Leve. Queima de gordura, melhora resistência." },
  { n: 3, label: "Zona 3 — Aeróbico", pctMin: 70, pctMax: 80, cor: "bg-yellow-400", desc: "Moderado. Melhora condicionamento cardiovascular." },
  { n: 4, label: "Zona 4 — Limiar", pctMin: 80, pctMax: 90, cor: "bg-orange-400", desc: "Intenso. Aumenta velocidade e potência." },
  { n: 5, label: "Zona 5 — Máximo", pctMin: 90, pctMax: 100, cor: "bg-red-500", desc: "Máximo. Sprints curtos, alta performance." },
];

export function FrequenciaCardiaca({ onBack }: Props) {
  const [idade, setIdade] = useState("");
  const [fcRepouso, setFcRepouso] = useState("");
  const [result, setResult] = useState<null | { fcMax: number; zonas: { label: string; min: number; max: number; cor: string; desc: string }[] }>(null);

  function calcular() {
    const i = parseInt(idade);
    if (!i) return;
    const fcMax = 220 - i;
    const fcRep = parseInt(fcRepouso) || 0;

    const zonas = ZONAS.map((z) => {
      if (fcRep > 0) {
        const min = Math.round(fcRep + (fcMax - fcRep) * (z.pctMin / 100));
        const max = Math.round(fcRep + (fcMax - fcRep) * (z.pctMax / 100));
        return { label: z.label, min, max, cor: z.cor, desc: z.desc };
      }
      return {
        label: z.label,
        min: Math.round(fcMax * (z.pctMin / 100)),
        max: Math.round(fcMax * (z.pctMax / 100)),
        cor: z.cor,
        desc: z.desc,
      };
    });

    setResult({ fcMax, zonas });
  }

  return (
    <ToolLayout
      title="Frequência Cardíaca Alvo"
      emoji="❤️"
      category="Saúde"
      description="Calcule sua frequência cardíaca máxima e 5 zonas de treino personalizadas."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["monitor cardiaco", "smartwatch"]} label="Monitore seu treino" />}
      disclaimer="Esta ferramenta é puramente informativa. Não substitui consulta médica ou diagnóstico profissional. Consulte sempre um profissional de saúde habilitado."
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Idade (anos)</span>
            <input type="number" value={idade} onChange={(e) => setIdade(e.target.value)} placeholder="Ex: 30" className="input-field" />
          </label>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">FC de Repouso (bpm) — opcional</span>
            <input type="number" value={fcRepouso} onChange={(e) => setFcRepouso(e.target.value)} placeholder="Ex: 60" className="input-field" />
          </label>
        </div>
        <p className="text-xs text-gray-500">Com FC de repouso, usa fórmula de Karvonen (mais precisa).</p>

        <button onClick={calcular} className="btn-primary w-full">Calcular Zonas</button>

        {result && (
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-center">
              <p className="text-xs text-red-400">Frequência Cardíaca Máxima</p>
              <p className="text-3xl font-black text-white">{result.fcMax} <span className="text-base font-normal text-gray-400">bpm</span></p>
            </div>
            {result.zonas.map((z, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/8">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-white">{z.label}</span>
                  <span className="text-sm font-bold text-white">{z.min}–{z.max} bpm</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 mb-1.5">
                  <div
                    className={`h-2 rounded-full ${z.cor}`}
                    style={{ width: `${((i + 1) / 5) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500">{z.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <ToolContent
        toolName="Frequência Cardíaca"
        category="Saúde"
        data={{
          directAnswer: "A frequência cardíaca máxima estimada para uma pessoa de 30 anos é de 190 batimentos por minuto, usando a fórmula 220 − idade. Com FC de repouso, a fórmula de Karvonen define 5 zonas de treino.",
          howItWorks: "A frequência cardíaca máxima (FCmax) é estimada pela fórmula clássica 220 − idade (anos). Quando informada a frequência de repouso (FCrep), a ferramenta utiliza a fórmula de Karvonen para calcular as zonas de treino: FC alvo = FCrep + (FCmax − FCrep) × % da zona. As 5 zonas são: 1) Recuperação (50-60%) — aquecimento e recuperação; 2) Base Aeróbica (60-70%) — queima de gordura e resistência; 3) Aeróbico (70-80%) — condicionamento cardiovascular; 4) Limiar (80-90%) — velocidade e potência; 5) Máximo (90-100%) — alta performance. Cada zona tem uma barra de progresso visual e descrição. A ferramenta mostra a FCmax, as zonas personalizadas e orienta sobre o uso correto de cada intensidade.",
          example: {
            title: "Exemplo de zonas para 30 anos, FCrep 60 bpm",
            steps: [
              "Informe a idade (30 anos) e a FC de repouso (60 bpm)",
              "A ferramenta calcula FCmax = 220 − 30 = 190 bpm",
              "Aplica Karvonen: Zona 2 = 60 + (190 − 60) × 0,60 = 138 bpm",
              "Mostra todas as zonas com intervalos personalizados",
              "O usuário visualiza a zona ideal para cada objetivo de treino"
            ],
            result: "Zona 1: 125-134 bpm, Zona 2: 138-151 bpm, Zona 3: 151-164 bpm, Zona 4: 164-177 bpm, Zona 5: 177-190 bpm",
          },
          attribution: { fonte: "Tanaka et al., 2001 / Karvonen", data: CONFIG.dataRevisãoSaúde },
          faqs: [
            { question: "Como calcular FCmax?", answer: "Use a fórmula 220 − idade (anos). Ex: 30 anos → 190 bpm. Para maior precisão, faça um teste de esforço supervisionado." },
            { question: "Qual frequência cardíaca ideal para treino?", answer: "Depende do objetivo. Para queima de gordura, 60-70% da FCmax. Para resistência, 70-80%. Para performance, 80-90%." },
            { question: "O que são zonas de treino?", answer: "São faixas de intensidade baseadas na % da FCmax. Cada zona treina uma capacidade diferente: aeróbica, anaeróbica, limiar, etc." },
            { question: "FCmax é diferente por sexo?", answer: "A fórmula 220 − idade é unissex. Estudos recentes sugerem pequenas variações, mas a diferença é marginal para a maioria dos praticantes." },
            { question: "Como medir frequência cardíaca?", answer: "Use smartwatch, monitor cardíaco de peito ou meça manualmente na artéria radial (punho) por 15 segundos e multiplique por 4." },
          ],
        }}
      />
    </ToolLayout>
  );
}
