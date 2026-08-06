import React, { useState } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { CONFIG } from "../config";

interface Props { onBack: () => void; }

const ATIVIDADES = [
  { value: "sedentario", label: "Sedentário (sem exercício)", fator: 1.2 },
  { value: "leve", label: "Levemente ativo (1-3x/sem)", fator: 1.375 },
  { value: "moderado", label: "Moderado (3-5x/sem)", fator: 1.55 },
  { value: "muito", label: "Muito ativo (6-7x/sem)", fator: 1.725 },
  { value: "extremo", label: "Extremamente ativo (2x/dia)", fator: 1.9 },
];

export function GastoCalórico({ onBack }: Props) {
  const [sexo, setSexo] = useState<"m" | "f">("m");
  const [idade, setIdade] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [atividade, setAtividade] = useState("moderado");
  const [result, setResult] = useState<null | { tmb: number; tdee: number; emagrecer: number; ganhar: number }>(null);

  function calcular() {
    const p = parseFloat(peso.replace(",", "."));
    const h = parseFloat(altura.replace(",", "."));
    const i = parseInt(idade);
    const fator = ATIVIDADES.find((a) => a.value === atividade)!.fator;
    if (!p || !h || !i) return;

    const tmb = sexo === "m"
      ? 10 * p + 6.25 * h - 5 * i + 5
      : 10 * p + 6.25 * h - 5 * i - 161;

    const tdee = tmb * fator;
    setResult({ tmb, tdee, emagrecer: tdee - 500, ganhar: tdee + 300 });
  }

  const fmt = (v: number) => Math.round(v).toLocaleString("pt-BR");

  return (
    <ToolLayout
      title="Gasto Calórico"
      emoji="🔥"
      category="Saúde"
      description="Calcule seu metabolismo basal e gasto calórico diário pela fórmula Mifflin-St Jeor."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["whey protein", "balanca de alimentos"]} label="Nutrição e suplementação" />}
      disclaimer="Esta ferramenta é puramente informativa. Não substitui consulta médica ou diagnóstico profissional. Consulte sempre um profissional de saúde habilitado."
    >
      <div className="space-y-4">
        <div className="flex gap-3">
          {(["m", "f"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSexo(s)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                sexo === s ? "border-green-400 bg-green-400/15 text-green-400" : "border-white/10 text-gray-400 hover:border-white/30"
              }`}
            >
              {s === "m" ? "♂ Masculino" : "♀ Feminino"}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Idade</span>
            <input type="number" value={idade} onChange={(e) => setIdade(e.target.value)} placeholder="Anos" className="input-field" />
          </label>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Peso (kg)</span>
            <input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} placeholder="kg" className="input-field" />
          </label>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Altura (cm)</span>
            <input type="number" value={altura} onChange={(e) => setAltura(e.target.value)} placeholder="cm" className="input-field" />
          </label>
        </div>

        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Nível de Atividade</span>
          <select value={atividade} onChange={(e) => setAtividade(e.target.value)} className="input-field">
            {ATIVIDADES.map((a) => <option key={a.value} value={a.value}>{a.label}</option>)}
          </select>
        </label>

        <button onClick={calcular} className="btn-primary w-full">Calcular</button>

        {result && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-400">Metabolismo Basal (TMB)</p>
                <p className="text-xl font-bold text-white">{fmt(result.tmb)} kcal</p>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center">
                <p className="text-xs text-amber-400">Gasto Diário (TDEE)</p>
                <p className="text-xl font-bold text-amber-400">{fmt(result.tdee)} kcal</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-center">
                <p className="text-xs text-red-400">Emagrecer</p>
                <p className="text-sm font-bold text-red-400">{fmt(result.emagrecer)}</p>
                <p className="text-xs text-gray-500">kcal/dia</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 text-center">
                <p className="text-xs text-green-400">Manter</p>
                <p className="text-sm font-bold text-green-400">{fmt(result.tdee)}</p>
                <p className="text-xs text-gray-500">kcal/dia</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 text-center">
                <p className="text-xs text-blue-400">Ganhar Massa</p>
                <p className="text-sm font-bold text-blue-400">{fmt(result.ganhar)}</p>
                <p className="text-xs text-gray-500">kcal/dia</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToolContent
        toolName="Calculadora de Gasto Calórico"
        category="Saúde"
        data={{
          directAnswer: "A média de gasto calórico diário varia de 1.500 a 2.500 kcal, dependendo do sexo, idade, peso e nível de atividade. Use a fórmula de Harris-Benedict para calcular o seu.",
          howItWorks: "A ferramenta calcula o gasto calórico usando a fórmula de Harris-Benedict (revisada por Mifflin-St Jeor, 1990): para homens, TMB = 10 × peso + 6,25 × altura − 5 × idade + 5; para mulheres, TMB = 10 × peso + 6,25 × altura − 5 × idade − 161. O TDEE (gasto total) é a TMB multiplicada pelo fator de atividade (1,2 a 1,9). A ferramenta mostra 4 valores: TMB, TDEE (manutenção), calorias para emagrecer (−500 kcal) e para ganhar massa (+300 kcal). O resultado é apresentado em cards coloridos com visualização clara.",
          example: {
            title: "Exemplo: homem, 30 anos, 70kg, 175cm, moderado",
            steps: [
              "Informe os dados: sexo masculino, 30 anos, 70kg, 175cm",
              "Selecione 'Moderado' (3-5x/semana, fator 1,55)",
              "Calcula TMB: 10 × 70 + 6,25 × 175 − 5 × 30 + 5 = 1.643 kcal",
              "Calcula TDEE: 1.643 × 1,55 = 2.547 kcal (manutenção)",
              "Exibe: emagrecer (2.047 kcal), ganhar massa (2.847 kcal)"
            ],
            result: "TMB: 1.643 kcal, TDEE: 2.547 kcal, para emagrecer: 2.047 kcal, para ganhar massa: 2.847 kcal",
          },
          attribution: { fonte: "Harris-Benedict revisada (Mifflin-St Jeor, 1990)", data: CONFIG.dataRevisãoSaúde },
          faqs: [
            { question: "Como calcular gasto calórico?", answer: "A ferramenta calcula automaticamente. Informe sexo, idade, peso, altura e nível de atividade. A fórmula Mifflin-St Jeor é usada para estimar o metabolismo basal e o gasto total." },
            { question: "Qual a fórmula de Harris-Benedict?", answer: "É uma fórmula para estimar o metabolismo basal. A versão revisada (Mifflin-St Jeor, 1990) é mais precisa: TMB = 10 × peso + 6,25 × altura − 5 × idade + 5 (M) ou − 161 (F)." },
            { question: "Quanto calorias queima em 1 hora de caminhada?", answer: "Aproximadamente 200-300 kcal, dependendo do peso, velocidade e terreno. Caminhada leve: 200 kcal/h. Caminhada rápida: 300-350 kcal/h." },
            { question: "Como aumentar gasto calórico?", answer: "Aumente a atividade física (musculação, cardio), aumente o NEAT (passos diários, escadas), aumente a massa muscular (músculo queima mais calorias em repouso) e durma bem." },
            { question: "Gasto calórico basal vs. total?", answer: "TMB é o gasto em repouso absoluto. TDEE inclui todas as atividades: trabalho, exercício, digestão. O TDEE é o valor real para planejar dieta." },
          ],
        }}
      />
    </ToolLayout>
  );
}
