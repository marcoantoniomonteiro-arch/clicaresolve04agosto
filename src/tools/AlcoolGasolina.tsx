import React, { useState } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { Info } from "lucide-react";

interface Props {
  onBack: () => void;
}

// --- Modular scenario configuration ---
// Energy density constants (MJ/L)
const PURE_GASOLINE_ENERGY = 32.2;
const ETHANOL_ENERGY = 23.5;
// Practical efficiency factor: flex engines extract more useful work from
// ethanol (higher octane → higher compression), lowering the real-world
// break-even ratio from the pure-energy ~0.79 down to the observed ~0.70.
const EFFICIENCY_FACTOR = 0.8813;

interface FuelScenario {
  id: string;
  label: string;
  shortLabel: string;
  ethanolBlend: number;
  description: string;
  breakEvenRatio: number;
}

function calcBreakEvenRatio(ethanolBlendPercent: number): number {
  const blendEnergy =
    ((100 - ethanolBlendPercent) / 100) * PURE_GASOLINE_ENERGY +
    (ethanolBlendPercent / 100) * ETHANOL_ENERGY;
  return (ETHANOL_ENERGY / blendEnergy) * EFFICIENCY_FACTOR;
}

const SCENARIOS: FuelScenario[] = [
  {
    id: "old",
    label: "Padrão Anterior (30%)",
    shortLabel: "Padrão Anterior",
    ethanolBlend: 30,
    description: "Gasolina com 30% de etanol anidro — padrão vigente até 2025.",
    breakEvenRatio: calcBreakEvenRatio(30),
  },
  {
    id: "new",
    label: "Nova Mistura (32%)",
    shortLabel: "Nova Mistura 32%",
    ethanolBlend: 32,
    description: "Gasolina com 32% de etanol anidro — novo padrão a partir de 2025.",
    breakEvenRatio: calcBreakEvenRatio(32),
  },
];

export function AlcoolGasolina({ onBack }: Props) {
  const [alcool, setAlcool] = useState("");
  const [gasolina, setGasolina] = useState("");
  const [scenarioId, setScenarioId] = useState<string>("new");
  const [erro, setErro] = useState<string | null>(null);
  const [result, setResult] = useState<
    null | {
      compensa: "alcool" | "gasolina";
      ratio: number;
      threshold: number;
      scenarioLabel: string;
    }
  >(null);

  const scenario = SCENARIOS.find((s) => s.id === scenarioId)!;

  function calcular() {
    const a = parseFloat(alcool.replace(",", "."));
    const g = parseFloat(gasolina.replace(",", "."));
    if (!Number.isFinite(a) || !Number.isFinite(g) || a <= 0 || g <= 0) {
      setErro("Informe preços válidos e maiores que zero para álcool e gasolina.");
      setResult(null);
      return;
    }
    setErro(null);
    const ratio = a / g;
    setResult({
      compensa: ratio < scenario.breakEvenRatio ? "alcool" : "gasolina",
      ratio,
      threshold: scenario.breakEvenRatio,
      scenarioLabel: scenario.label,
    });
  }

  return (
    <ToolLayout
      title="Álcool ou Gasolina"
      emoji="⛽"
      category="Transportes"
      description="Descubra qual combustível compensa mais no seu tanque com base nos preços atuais."
      onBack={onBack}
      affiliateBanner={
        <AffiliateBanner
          terms={["funil de abastecimento", "testador de combustivel"]}
          label="Acessórios para o seu carro"
          mercadoLivreTerms={["funil abastecimento combustivel", "testador de combustivel gasolina"]}
          mercadoLivreLabel="Encontre no Mercado Livre"
        />
      }
    >
      <div className="space-y-4">
        {/* Scenario selector */}
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-sm text-gray-400">Cenário da gasolina</span>
            <Info className="w-3.5 h-3.5 text-gray-500" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {SCENARIOS.map((s) => (
              <button
                key={s.id}
                onClick={() => setScenarioId(s.id)}
                className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-center ${
                  scenarioId === s.id
                    ? "bg-green-400/15 border border-green-400/40 text-green-400"
                    : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2 leading-relaxed">
            {scenario.description} O teor de etanol na gasolina afeta seu poder
            calorífico e, consequentemente, o ponto de equilíbrio entre os
            combustíveis.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">
              Preço do Álcool (R$/L)
            </span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={alcool}
              onChange={(e) => setAlcool(e.target.value)}
              placeholder="Ex: 3.89"
              className="input-field"
            />
          </label>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">
              Preço da Gasolina (R$/L)
            </span>
            <input
              type="number"
              min="0"
              step="0.01"
              value={gasolina}
              onChange={(e) => setGasolina(e.target.value)}
              placeholder="Ex: 5.79"
              className="input-field"
            />
          </label>
        </div>

        <button onClick={calcular} className="btn-primary w-full">
          Calcular
        </button>

        {erro && (
          <p className="text-sm text-red-400 text-center">{erro}</p>
        )}

        {result && (
          <div
            className={`mt-4 p-5 rounded-xl border text-center ${
              result.compensa === "alcool"
                ? "border-green-500/40 bg-green-500/10"
                : "border-amber-500/40 bg-amber-500/10"
            }`}
          >
            <p className="text-4xl mb-2">
              {result.compensa === "alcool" ? "⛽" : "🛢️"}
            </p>
            <p
              className={`text-2xl font-bold ${
                result.compensa === "alcool"
                  ? "text-green-400"
                  : "text-amber-400"
              }`}
            >
              {result.compensa === "alcool"
                ? "Use Álcool!"
                : "Use Gasolina!"}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Relação álcool/gasolina:{" "}
              <strong>{result.ratio.toFixed(3)}</strong>
              {result.compensa === "alcool"
                ? ` (abaixo de ${result.threshold.toFixed(2)} — álcool é mais econômico)`
                : ` (acima de ${result.threshold.toFixed(2)} — gasolina rende mais)`}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Cenário: {result.scenarioLabel}
            </p>
          </div>
        )}
      </div>
      <ToolContent
        toolName="AlcoolGasolina"
        category="Finanças"
        data={{
          directAnswer:
            "Exemplo ilustrativo: com etanol a R$ 4,89/L e gasolina a R$ 6,29/L (valores informados por você), a relação é 77,7%, portanto a gasolina compensaria mais (limite: 70%). Informe os preços atuais do seu posto para o resultado real.",
          howItWorks:
            "A ferramenta calcula a relação álcool/gasolina: preço do litro de álcool ÷ preço do litro de gasolina. A regra prática brasileira é: se a relação for menor que o ponto de equilíbrio (aproximadamente 70%), o álcool compensa mais; se for maior, a gasolina é mais vantajosa. Isso se deve ao fato de que o álcool tem menor rendimento energético (aproximadamente 30% a menos que a gasolina). O ponto de equilíbrio exato depende do teor de etanol anidro misturado na gasolina comercial: com o novo padrão de 32% (antes 30%), a gasolina tem ligeiramente menos energia por litro, o que eleva o ponto de equilíbrio de 0,70 para aproximadamente 0,704. A ferramenta permite alternar entre os dois cenários para comparar.",
          example: {
            title: "Exemplo: álcool a R$ 4.89 e gasolina a R$ 6.29",
            steps: [
              "Informe o preço do álcool: R$ 4,89",
              "Informe o preço da gasolina: R$ 6,29",
              "A ferramenta calcula: 4,89 ÷ 6,29 = 0,777 (77,7%)",
              "Compara com o limite do cenário selecionado (70% ou 70,4%)",
              "Exibe: 'Use Gasolina!' com a relação exata",
            ],
            result:
              "Relação: 77.7% — acima do ponto de equilíbrio, portanto a gasolina rende mais e compensa mais.",
          },
          glossary: [
            {
              term: "Relação Álcool/Gasolina",
              definition:
                "Razão entre o preço do litro de etanol e o preço do litro de gasolina. Usada para determinar qual combustível compensa mais economicamente.",
            },
            {
              term: "Poder Calorífico",
              definition:
                "Quantidade de energia liberada na combustão. A gasolina tem ~30% mais energia por litro que o etanol.",
            },
            {
              term: "Teor de Etanol Anidro",
              definition:
                "Percentual de etanol misturado na gasolina comercial (gasolina C). O padrão anterior era 30%; o novo padrão é 32%. Quanto maior o teor, menor a energia da gasolina por litro, elevando o ponto de equilíbrio entre álcool e gasolina.",
            },
          ],
          faqs: [
            {
              question: "Quando álcool compensa?",
              answer:
                "Quando a relação álcool/gasolina é menor que o ponto de equilíbrio do cenário (70% no padrão antigo, ~70,4% na nova mistura). Ex: álcool a R$ 3,50 e gasolina a R$ 5,00 → relação = 70%, compensa usar álcool.",
            },
            {
              question: "Como calcular relação álcool/gasolina?",
              answer:
                "Divida o preço do álcool pelo preço da gasolina. A ferramenta faz isso automaticamente: informe os preços e clique em 'Calcular'.",
            },
            {
              question: "O que mudou com a nova mistura de 32%?",
              answer:
                "O teor de etanol anidro na gasolina comercial subiu de 30% para 32%. Como o etanol tem menos energia por litro que a gasolina pura, a gasolina ficou ligeiramente menos energética, elevando o ponto de equilíbrio de 0,70 para aproximadamente 0,704 — ou seja, o álcool precisa ser um pouco mais barato (em termos relativos) para compensar.",
            },
            {
              question: "Qual o rendimento do álcool?",
              answer:
                "O etanol rende aproximadamente 70% do que a gasolina rende. Ou seja, para a mesma distância, consome cerca de 30% a mais de litros.",
            },
            {
              question: "Como economizar combustível?",
              answer:
                "Verifique a relação no momento do abastecimento, mantenha a calibragem dos pneus, evite acelerações bruscas e reduza o peso do veículo.",
            },
          ],
        }}
      />
    </ToolLayout>
  );
}
