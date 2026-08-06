import React, { useState } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { CONFIG } from "../config";

interface Props { onBack: () => void; }

const BTU_MODELS = [
  { max: 9000, label: "9.000 BTUs" },
  { max: 12000, label: "12.000 BTUs" },
  { max: 18000, label: "18.000 BTUs" },
  { max: 24000, label: "24.000 BTUs" },
  { max: 30000, label: "30.000 BTUs" },
  { max: 36000, label: "36.000 BTUs" },
];

export function CalculadoraBTU({ onBack }: Props) {
  const [comp, setComp] = useState("");
  const [larg, setLarg] = useState("");
  const [pe, setPe] = useState("2.7");
  const [sol, setSol] = useState(false);
  const [pessoas, setPessoas] = useState("1");
  const [equipamentos, setEquipamentos] = useState("1");
  const [result, setResult] = useState<null | { btu: number; modelo: string }>(null);

  function calcular() {
    const c = parseFloat(comp.replace(",", ".")) || 0;
    const l = parseFloat(larg.replace(",", ".")) || 0;
    const peD = parseFloat(pe.replace(",", ".")) || 2.7;
    const p = parseInt(pessoas) || 1;
    const eq = parseInt(equipamentos) || 1;

    if (!c || !l) return;

    const area = c * l;
    let btu = area * 600;
    if (peD > 2.7) btu *= 1.1;
    if (sol) btu *= 1.1;
    btu += Math.max(0, p - 2) * 600;
    btu += Math.max(0, eq - 1) * 400;

    const modelo = BTU_MODELS.find((m) => btu <= m.max) || BTU_MODELS[BTU_MODELS.length - 1];
    setResult({ btu: Math.round(btu), modelo: modelo.label });
  }

  return (
    <ToolLayout
      title="Calculadora de BTU"
      emoji="❄️"
      category="Utilidades"
      description="Descubra a potência ideal de ar-condicionado para cada cômodo da sua casa."
      onBack={onBack}
      affiliateBanner={
        <AffiliateBanner
          terms={["ar-condicionado split", "suporte para ar-condicionado"]}
          label="Climatize seu ambiente"
          mercadoLivreTerms={["ar condicionado split 12000 btus", "suporte ar condicionado"]} mercadoLivreLabel="Encontre no Mercado Livre"
        />
      }
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Comprimento (m)</span>
            <input type="number" value={comp} onChange={(e) => setComp(e.target.value)} placeholder="Ex: 5.0" className="input-field" />
          </label>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Largura (m)</span>
            <input type="number" value={larg} onChange={(e) => setLarg(e.target.value)} placeholder="Ex: 4.0" className="input-field" />
          </label>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Pé-direito (m)</span>
            <input type="number" value={pe} onChange={(e) => setPe(e.target.value)} placeholder="2.7" className="input-field" />
          </label>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Nº de Pessoas</span>
            <input type="number" min="1" value={pessoas} onChange={(e) => setPessoas(e.target.value)} placeholder="1" className="input-field" />
          </label>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Equipamentos Eletrônicos</span>
            <input type="number" min="0" value={equipamentos} onChange={(e) => setEquipamentos(e.target.value)} placeholder="1" className="input-field" />
          </label>
          <div className="flex items-end pb-2">
            <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
              <input type="checkbox" checked={sol} onChange={(e) => setSol(e.target.checked)} className="rounded w-4 h-4" />
              Incide sol direto
            </label>
          </div>
        </div>

        <button onClick={calcular} className="btn-primary w-full">Calcular BTUs</button>

        {result && (
          <div className="mt-4 flex flex-col items-center gap-3 p-6 rounded-xl bg-blue-500/10 border border-blue-500/30">
            <p className="text-4xl">❄️</p>
            <p className="text-gray-400 text-sm">Potência necessária</p>
            <p className="text-3xl font-black text-blue-400">{result.btu.toLocaleString("pt-BR")} BTUs</p>
            <div className="bg-blue-500/20 rounded-lg px-4 py-2 border border-blue-500/40">
              <p className="text-xs text-gray-400 text-center">Modelo recomendado</p>
              <p className="text-xl font-bold text-white text-center">{result.modelo}</p>
            </div>
          </div>
        )}
      </div>
      <ToolContent
        toolName="Calculadora de BTU"
        category="Transportes"
        data={{
          directAnswer: "Um quarto de 12m² com 2 pessoas e 1 computador precisa de 8.400 BTU/h. A fórmula é: área × 600 + pessoas × 600 + equipamentos × 600.",
          howItWorks: "A calculadora de BTU usa a fórmula padrão do mercado de climatização: BTU = área (m²) × 600 + (pessoas − 2) × 600 + (equipamentos − 1) × 400 + ajustes. Fatores de ajuste: pé-direito acima de 2,7m (+10%), sol incidindo diretamente (+10%). A área é comprimento × largura. Pessoas além de 2 geram +600 BTU cada. Equipamentos além do primeiro geram +400 BTU cada. O resultado é arredondado e comparado com modelos comerciais: 9.000, 12.000, 18.000, 24.000, 30.000, 36.000 BTUs. A ferramenta mostra a potência necessária e o modelo recomendado.",
          example: {
            title: "Exemplo: quarto 4m × 3m, 2 pessoas, 1 PC, sol direto",
            steps: [
              "Informe comprimento: 4m e largura: 3m",
              "Informe pé-direito: 2,7m (padrão), pessoas: 2, equipamentos: 1",
              "Marque 'Incide sol direto' (verdadeiro)",
              "Calcula: área = 12m²; BTU = 12 × 600 = 7.200",
              "Aplica ajuste sol: 7.200 × 1,1 = 7.920 → arredondado: 8.000 BTU/h"
            ],
            result: "Potência necessária: 8.000 BTU/h; Modelo recomendado: 9.000 BTUs (modelo comercial mais próximo acima)",
          },
          faqs: [
            { question: "Como calcular BTU?", answer: "A ferramenta calcula automaticamente. Informe comprimento, largura, pessoas, equipamentos e se incide sol. A fórmula é: área × 600 + ajustes." },
            { question: "Qual BTU ideal para sala?", answer: "Sala de 20m²: ~12.000 BTU. Sala de 30m²: ~18.000 BTU. Sala de 40m²: ~24.000 BTU. Varia conforme pessoas e equipamentos." },
            { question: "BTU é a mesma coisa que potência?", answer: "BTU/h é a unidade de potência térmica mais usada em ar-condicionados. 1 BTU/h ≈ 0,293 W. Um split de 9.000 BTU/h ≈ 2.637 W." },
            { question: "Ar de 9.000 BTU gasta muito?", answer: "O consumo depende do tempo ligado e da eficiência (SEER). Um 9.000 BTU ligado 8h/dia consome ~150 kWh/mês. Use o simulador de Consumo de Energia para calcular exatamente." },
            { question: "Como escolher ar-condicionado?", answer: "1) Calcule BTU necessário; 2) Escolha modelo Inverter (economia de 40-60%); 3) Verifique SEER (mais alto = mais econômico); 4) Considere instalação e manutenção." },
          ],
        }}
      />
    </ToolLayout>
  );
}
