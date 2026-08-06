import React, { useState } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { CONFIG } from "../config";

interface Props { onBack: () => void; }

const OBJETIVOS = [
  { value: "emagrecer", label: "Emagrecer", carbo: 0.40, prot: 0.35, gord: 0.25 },
  { value: "manter", label: "Manter Peso", carbo: 0.50, prot: 0.25, gord: 0.25 },
  { value: "ganhar", label: "Ganhar Massa", carbo: 0.55, prot: 0.25, gord: 0.20 },
];

const FONTES: Record<string, string[]> = {
  carbo: ["Arroz", "Aveia", "Batata-doce", "Macarrão integral", "Frutas", "Pão integral"],
  prot: ["Frango", "Ovos", "Atum", "Feijão", "Whey", "Carne magra"],
  gord: ["Abacate", "Azeite", "Castanhas", "Salmão", "Amendoim", "Chia"],
};

export function Macronutrientes({ onBack }: Props) {
  const [calorias, setCalorias] = useState("");
  const [objetivo, setObjetivo] = useState("manter");
  const [result, setResult] = useState<null | { carboG: number; protG: number; gordG: number; pct: typeof OBJETIVOS[0] }>(null);

  function calcular() {
    const kcal = parseFloat(calorias.replace(",", "."));
    if (!kcal) return;
    const obj = OBJETIVOS.find((o) => o.value === objetivo)!;
    setResult({
      carboG: Math.round((kcal * obj.carbo) / 4),
      protG: Math.round((kcal * obj.prot) / 4),
      gordG: Math.round((kcal * obj.gord) / 9),
      pct: obj,
    });
  }

  return (
    <ToolLayout
      title="Calculadora de Macros"
      emoji="🥗"
      category="Saúde"
      description="Calcule a distribuição ideal de macronutrientes para seu objetivo."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["tabela nutricional", "suplemento proteico"]} label="Suplementação e nutrição" />}
      disclaimer="Esta ferramenta é puramente informativa. Não substitui consulta médica ou diagnóstico profissional. Consulte sempre um profissional de saúde habilitado."
    >
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Calorias diárias alvo (kcal)</span>
          <input type="number" value={calorias} onChange={(e) => setCalorias(e.target.value)} placeholder="Ex: 2000" className="input-field" />
        </label>

        <div>
          <p className="text-sm text-gray-400 mb-2">Objetivo</p>
          <div className="grid grid-cols-3 gap-2">
            {OBJETIVOS.map((o) => (
              <button
                key={o.value}
                onClick={() => setObjetivo(o.value)}
                className={`py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                  objetivo === o.value ? "border-green-400 bg-green-400/15 text-green-400" : "border-white/10 text-gray-400 hover:border-white/30"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        <button onClick={calcular} className="btn-primary w-full">Calcular Macros</button>

        {result && (
          <div className="space-y-3">
            {[
              { key: "carbo", label: "Carboidratos", g: result.carboG, pct: result.pct.carbo, color: "amber", fontes: FONTES.carbo },
              { key: "prot", label: "Proteínas", g: result.protG, pct: result.pct.prot, color: "blue", fontes: FONTES.prot },
              { key: "gord", label: "Gorduras", g: result.gordG, pct: result.pct.gord, color: "rose", fontes: FONTES.gord },
            ].map((m) => (
              <div key={m.key} className={`p-4 rounded-xl bg-${m.color}-500/10 border border-${m.color}-500/20`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-semibold text-${m.color}-400`}>{m.label}</span>
                  <span className="text-xl font-black text-white">{m.g}g <span className="text-sm font-normal text-gray-400">({Math.round(m.pct * 100)}%)</span></span>
                </div>
                <div className={`h-1.5 rounded-full bg-white/10 mb-2`}>
                  <div className={`h-1.5 rounded-full bg-${m.color}-400`} style={{ width: `${m.pct * 100}%` }} />
                </div>
                <p className="text-xs text-gray-500">Fontes: {m.fontes.join(", ")}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      <ToolContent
        toolName="Calculadora de Macronutrientes"
        category="Saúde"
        data={{
          directAnswer: "Para uma pessoa de 70 kg com dieta de 2.000 kcal, a recomendação é: 250g de carboidratos, 100g de proteínas e 67g de gorduras. A distribuição varia conforme o objetivo.",
          howItWorks: "A calculadora distribui calorias em carboidratos, proteínas e gorduras conforme 3 perfis: Emagrecer (40% C, 35% P, 25% G), Manter (50% C, 25% P, 25% G) e Ganhar Massa (55% C, 25% P, 20% G). Cada macro é calculado em gramas: carboidratos e proteínas fornecem 4 kcal/g; gorduras, 9 kcal/g. A ferramenta mostra a quantidade diária em gramas, a proporção percentual e barra de progresso, além de sugerir fontes alimentares para cada macronutriente.",
          example: {
            title: "Exemplo de 2.000 kcal para emagrecer",
            steps: [
              "Informe o valor de 2.000 kcal e selecione o objetivo 'Emagrecer'",
              "A ferramenta aplica a proporção: 40% C, 35% P, 25% G",
              "Calcula: Carboidratos = (2000 × 0,40) / 4 = 200g",
              "Proteínas = (2000 × 0,35) / 4 = 175g, Gorduras = (2000 × 0,25) / 9 = 56g",
              "Exibe as fontes recomendadas: carboidratos (arroz, aveia), proteínas (frango, ovos), gorduras (abacate, azeite)"
            ],
            result: "200g de carboidratos, 175g de proteínas, 56g de gorduras — distribuição ideal para emagrecer com 2.000 kcal",
          },
          attribution: { fonte: "OMS/FAO", data: CONFIG.dataRevisãoSaúde },
          faqs: [
            { question: "O que são macronutrientes?", answer: "São os nutrientes que fornecem energia: carboidratos, proteínas e gorduras. O organismo os utiliza para produzir ATP, construir tecidos e regular hormônios." },
            { question: "Quantas proteínas preciso por dia?", answer: "Para adultos saudáveis, 0,8-1,2 g/kg de peso. Para atletas, 1,6-2,0 g/kg. A ferramenta calcula com base no total de calorias." },
            { question: "Carboidratos fazem mal?", answer: "Não. Carboidratos são a principal fonte de energia. O problema é o consumo excessivo de carboidratos refinados e açúcares. Escolha fontes integrais." },
            { question: "Qual a proporção ideal de macros?", answer: "Depende do objetivo. Manter: 50% C, 25% P, 25% G. Emagrecer: 40% C, 35% P, 25% G. Ganhar massa: 55% C, 25% P, 20% G." },
            { question: "Como calcular macros para perder peso?", answer: "Determine seu gasto calórico (TDEE), subtraia 500 kcal e use a proporção 'Emagrecer' (40% C, 35% P, 25% G). A ferramenta faz isso automaticamente." },
          ],
        }}
      />
    </ToolLayout>
  );
}
