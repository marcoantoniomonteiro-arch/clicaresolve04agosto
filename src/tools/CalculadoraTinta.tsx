import React, { useState } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { CONFIG } from "../config";
import { Plus, Trash2 } from "lucide-react";

interface Props { onBack: () => void; }

interface Parede {
  id: number;
  largura: string;
  altura: string;
  descontar: boolean;
  areaDesconto: string;
}

let nextId = 1;

export function CalculadoraTinta({ onBack }: Props) {
  const [paredes, setParedes] = useState<Parede[]>([
    { id: nextId++, largura: "", altura: "", descontar: false, areaDesconto: "" },
  ]);
  const [rendimento, setRendimento] = useState("10");
  const [maos, setMaos] = useState("2");
  const [result, setResult] = useState<null | { area: number; litros: number; latas36: number; latas18: number }>(null);

  function addParede() {
    if (paredes.length >= 4) return;
    setParedes([...paredes, { id: nextId++, largura: "", altura: "", descontar: false, areaDesconto: "" }]);
  }

  function update(id: number, field: keyof Parede, value: string | boolean) {
    setParedes(paredes.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  }

  function remove(id: number) {
    if (paredes.length <= 1) return;
    setParedes(paredes.filter((p) => p.id !== id));
  }

  function calcular() {
    let areaTotal = 0;
    paredes.forEach((p) => {
      const l = parseFloat(p.largura.replace(",", ".")) || 0;
      const h = parseFloat(p.altura.replace(",", ".")) || 0;
      let area = l * h;
      if (p.descontar) area -= parseFloat(p.areaDesconto.replace(",", ".")) || 0;
      areaTotal += Math.max(0, area);
    });

    const rend = parseFloat(rendimento.replace(",", ".")) || 10;
    const numMaos = parseInt(maos) || 2;
    const litros = (areaTotal * numMaos) / rend;
    const latas36 = Math.ceil(litros / 3.6);
    const latas18 = Math.ceil(litros / 18);
    setResult({ area: areaTotal, litros, latas36, latas18 });
  }

  return (
    <ToolLayout
      title="Calculadora de Tinta"
      emoji="🎨"
      category="Utilidades"
      description="Calcule quantos litros e latas de tinta você precisa para pintar seus ambientes."
      onBack={onBack}
      affiliateBanner={
        <AffiliateBanner
          terms={["tinta lavavel", "rolo de pintura", "fita crepe"]}
          label="Materiais para pintura"
          mercadoLivreTerms={["tinta lavável parede"]} mercadoLivreLabel="Encontre no Mercado Livre"
        />
      }
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Rendimento (m²/L)</span>
            <input type="number" value={rendimento} onChange={(e) => setRendimento(e.target.value)} placeholder="10" className="input-field" />
          </label>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Nº de Demãos</span>
            <select value={maos} onChange={(e) => setMaos(e.target.value)} className="input-field">
              <option value="1">1 demão</option>
              <option value="2">2 demãos</option>
              <option value="3">3 demãos</option>
            </select>
          </label>
        </div>

        <p className="text-sm font-medium text-gray-300">Paredes</p>
        <div className="space-y-3">
          {paredes.map((p, i) => (
            <div key={p.id} className="p-3 rounded-xl bg-white/3 border border-white/8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400 font-medium">Parede {i + 1}</span>
                {paredes.length > 1 && (
                  <button onClick={() => remove(p.id)} className="text-gray-600 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input type="number" value={p.largura} onChange={(e) => update(p.id, "largura", e.target.value)} placeholder="Largura (m)" className="input-field" />
                <input type="number" value={p.altura} onChange={(e) => update(p.id, "altura", e.target.value)} placeholder="Altura (m)" className="input-field" />
              </div>
              <label className="flex items-center gap-2 mt-2 text-sm text-gray-400 cursor-pointer">
                <input type="checkbox" checked={p.descontar} onChange={(e) => update(p.id, "descontar", e.target.checked)} className="rounded" />
                Descontar janelas/portas
              </label>
              {p.descontar && (
                <input type="number" value={p.areaDesconto} onChange={(e) => update(p.id, "areaDesconto", e.target.value)} placeholder="Área a descontar (m²)" className="input-field mt-2" />
              )}
            </div>
          ))}
        </div>

        {paredes.length < 4 && (
          <button onClick={addParede} className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors">
            <Plus className="w-4 h-4" /> Adicionar parede
          </button>
        )}

        <button onClick={calcular} className="btn-primary w-full">Calcular Tinta</button>

        {result && (
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-400">Área Total</p>
              <p className="text-xl font-bold text-white">{result.area.toFixed(2)} m²</p>
            </div>
            <div className="bg-white/5 rounded-xl p-4 text-center">
              <p className="text-xs text-gray-400">Litros Necessários</p>
              <p className="text-xl font-bold text-white">{result.litros.toFixed(2)} L</p>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-center">
              <p className="text-xs text-amber-400">Latas de 3,6 L</p>
              <p className="text-2xl font-bold text-amber-400">{result.latas36}</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
              <p className="text-xs text-green-400">Latas de 18 L</p>
              <p className="text-2xl font-bold text-green-400">{result.latas18}</p>
            </div>
          </div>
        )}
      </div>
      <ToolContent
        toolName="CalculadoraTinta"
        category="Transportes"
        data={{
          directAnswer: "Para pintar uma parede de 15m² com 2 demãos e rendimento de 12m²/L, você precisa de 2.5 litros de tinta.",
          howItWorks: "A calculadora estima a quantidade de tinta necessária baseando-se na área total das paredes, no rendimento informado (m²/L) e no número de demãos. Para cada parede, a área é comprimento × altura. Se marcada a opção de descontar, subtrai-se a área de janelas e portas. A área total é multiplicada pelo número de demãos e dividida pelo rendimento. O resultado em litros é arredondado para latas comerciais: 3,6L e 18L. A ferramenta mostra: área total, litros necessários, quantidade de latas de 3,6L e latas de 18L (arredondando para cima).",
          example: {
            title: "Exemplo: parede 4m × 3m, 2 demãos, rendimento 10m²/L",
            steps: [
              "Adicione uma parede: 4m de largura, 3m de altura",
              "Marque 'Descontar janelas/portas' e informe 2m² de desconto",
              "Informe rendimento: 10m²/L e 2 demãos",
              "Calcula área: 4 × 3 = 12m² − 2m² = 10m²",
              "Litros = (10 × 2) / 10 = 2L → latas de 3,6L: 1; latas de 18L: 1"
            ],
            result: "Área: 10 m²; Litros necessários: 2L; Latas de 3,6L: 1; Latas de 18L: 1",
          },
          faqs: [
            { question: "Como calcular tinta?", answer: "Informe as dimensões das paredes, rendimento da tinta e número de demãos. A ferramenta calcula a área e os litros necessários." },
            { question: "Quantas demãos preciso?", answer: "Parede nova: 2 demãos de fundo + 2 de acabamento. Parede já pintada: 1 demão de fundo + 2 de acabamento. Tinta clara sobre escura: +1 demão." },
            { question: "Qual rendimento da tinta?", answer: "PVA: 12-15 m²/L. Acrílica: 10-12 m²/L. Óleo: 8-10 m²/L. Rendimento real pode ser menor em superfícies porosas." },
            { question: "Como economizar tinta?", answer: "Use primer antes, aplique demãos finas (não exagerar na tinta), use rolo de lã melhor (absorção menor) e pinte em dias secos (menos umidade)." },
            { question: "Tinta acrílica ou PVA?", answer: "PVA: mais barata, usada em áreas internas secas. Acrílica: mais resistente, lavável, usada em áreas de maior uso. Para áreas externas: use tinta acrílica ou óleo." },
          ],
        }}
      />
    </ToolLayout>
  );
}
