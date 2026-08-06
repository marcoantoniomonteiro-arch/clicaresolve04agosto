import React, { useState, useMemo } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";

interface Props {
  onBack: () => void;
}

type Ingredient = "farinha" | "acucar" | "manteiga" | "leite" | "oleo";

const CONVERSIONS: Record<Ingredient, { xicara: number; colherSopa: number; colherCha: number; copo: number }> = {
  farinha: { xicara: 120, colherSopa: 7.5, colherCha: 2.5, copo: 180 },
  acucar: { xicara: 200, colherSopa: 12.5, colherCha: 4.2, copo: 300 },
  manteiga: { xicara: 225, colherSopa: 14, colherCha: 4.7, copo: 340 },
  leite: { xicara: 240, colherSopa: 15, colherCha: 5, copo: 360 },
  oleo: { xicara: 200, colherSopa: 12.5, colherCha: 4.2, copo: 300 },
};

const INGREDIENT_NAMES: Record<Ingredient, string> = {
  farinha: "Farinha de Trigo",
  acucar: "Acucar",
  manteiga: "Manteiga",
  leite: "Leite",
  oleo: "Oleo",
};

type MeasureUnit = "xicara" | "colherSopa" | "colherCha" | "copo";

const MEASURE_NAMES: Record<MeasureUnit, string> = {
  xicara: "Xicara de Cha",
  colherSopa: "Colher de Sopa",
  colherCha: "Colher de Cha",
  copo: "Copo (250ml)",
};

export function ConversorCozinha({ onBack }: Props) {
  const [ingredient, setIngredient] = useState<Ingredient>("farinha");
  const [measure, setMeasure] = useState<MeasureUnit>("xicara");
  const [quantity, setQuantity] = useState("");

  const result = useMemo(() => {
    const qty = parseFloat(quantity.replace(",", ".")) || 0;
    if (qty <= 0) return null;

    const gramsPerUnit = CONVERSIONS[ingredient][measure];
    const grams = qty * gramsPerUnit;

    const allMeasures: { unit: MeasureUnit; value: number; label: string }[] = [
      { unit: "xicara", value: grams / CONVERSIONS[ingredient].xicara, label: MEASURE_NAMES.xicara },
      { unit: "colherSopa", value: grams / CONVERSIONS[ingredient].colherSopa, label: MEASURE_NAMES.colherSopa },
      { unit: "colherCha", value: grams / CONVERSIONS[ingredient].colherCha, label: MEASURE_NAMES.colherCha },
      { unit: "copo", value: grams / CONVERSIONS[ingredient].copo, label: MEASURE_NAMES.copo },
    ];

    return { grams, allMeasures };
  }, [ingredient, measure, quantity]);

  return (
    <ToolLayout
      title="Conversor de Cozinha"
      emoji="🥄"
      category="Utilidades"
      description="Converta medidas de cozinha entre xicaras, colheres e gramas."
      onBack={onBack}
      affiliateBanner={
        <AffiliateBanner
          terms={["jogo de medidores de cozinha", "balanca digital de cozinha", "medidor de ingredientes"]}
          label="Facilite suas receitas"
        />
      }
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Ingrediente</span>
            <select
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value as Ingredient)}
              className="input-field"
            >
              {(Object.keys(INGREDIENT_NAMES) as Ingredient[]).map((ing) => (
                <option key={ing} value={ing}>
                  {INGREDIENT_NAMES[ing]}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Medida</span>
            <select
              value={measure}
              onChange={(e) => setMeasure(e.target.value as MeasureUnit)}
              className="input-field"
            >
              {(Object.keys(MEASURE_NAMES) as MeasureUnit[]).map((m) => (
                <option key={m} value={m}>
                  {MEASURE_NAMES[m]}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Quantidade</span>
          <input
            type="number"
            step="0.1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="1"
            className="input-field"
          />
        </label>

        {result && (
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
              <p className="text-xs text-green-400 mb-1">Equivalente</p>
              <p className="text-4xl font-black text-green-400">{result.grams.toFixed(0)}g</p>
              <p className="text-sm text-gray-400 mt-1">
                {quantity} {MEASURE_NAMES[measure]} de {INGREDIENT_NAMES[ingredient]}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/8">
              <p className="text-xs text-gray-400 mb-3">Outras equivalencias:</p>
              <div className="space-y-2">
                {result.allMeasures.map((m) => (
                  <div
                    key={m.unit}
                    className={`flex justify-between items-center p-2 rounded-lg ${
                      m.unit === measure ? "bg-white/10" : "bg-white/5"
                    }`}
                  >
                    <span className="text-sm text-gray-400">{m.label}</span>
                    <span className="text-sm font-semibold text-white">{m.value.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-gray-500 text-center">
              Valores aproximados. Podem variar conforme a marca e forma de medir.
            </p>
          </div>
        )}
      </div>
      <ToolContent
        toolName="Conversor de Cozinha"
        category="Utilidades"
        data={{
          directAnswer: "O conversor de medidas de cozinha transforma xícaras, colheres e gramas entre si, permitindo seguir qualquer receita independente da unidade usada originalmente.",
          howItWorks: "A ferramenta converte entre as unidades mais comuns em receitas culinárias: xícaras, colheres de sopa, colheres de chá, mililitros e gramas. Como a conversão de volume para peso varia conforme o ingrediente (farinha, açúcar e líquidos têm densidades diferentes), a ferramenta usa tabelas de referência específicas por tipo de ingrediente para garantir maior precisão.",
          example: {
            title: "Exemplo: converter 2 xícaras de farinha de trigo para gramas",
            steps: [
              "Ingrediente: Farinha de trigo",
              "Quantidade: 2 xícaras",
              "Densidade de referência: 1 xícara = 120g de farinha",
              "Resultado: 240g",
            ],
            result: "2 xícaras de farinha de trigo equivalem a aproximadamente 240 gramas.",
          },
          faqs: [
            { question: "Uma xícara tem sempre o mesmo peso em gramas?", answer: "Não, o peso varia conforme o ingrediente: farinha, açúcar e líquidos têm densidades diferentes, por isso a conversão depende do tipo de ingrediente." },
            { question: "Colher de sopa e colher de chá têm a mesma medida?", answer: "Não, a colher de sopa é maior (cerca de 15ml) enquanto a colher de chá é menor (cerca de 5ml)." },
            { question: "Por que preciso converter medidas em receitas?", answer: "Muitas receitas internacionais usam xícaras e colheres, enquanto receitas brasileiras costumam usar gramas — a conversão evita erros na proporção dos ingredientes." },
            { question: "A conversão funciona para líquidos também?", answer: "Sim, líquidos como água, leite e óleo têm suas próprias equivalências entre mililitros e xícaras/colheres." },
          ],
        }}
      />
    </ToolLayout>
  );
}
