import React, { useState } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { CONFIG } from "../config";
import { Plus, Trash2 } from "lucide-react";

interface Props { onBack: () => void; }

interface Ambiente {
  id: number;
  nome: string;
  comp: string;
  larg: string;
}

let nextId = 1;

export function MetrosQuadrados({ onBack }: Props) {
  const [ambientes, setAmbientes] = useState<Ambiente[]>([
    { id: nextId++, nome: "Sala", comp: "", larg: "" },
  ]);
  const [margem, setMargem] = useState(false);
  const [result, setResult] = useState<null | { items: { nome: string; area: number }[]; total: number; comMargem: number }>(null);

  function addAmbiente() {
    if (ambientes.length >= 5) return;
    setAmbientes([...ambientes, { id: nextId++, nome: "", comp: "", larg: "" }]);
  }

  function update(id: number, field: keyof Ambiente, value: string) {
    setAmbientes(ambientes.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
  }

  function remove(id: number) {
    if (ambientes.length <= 1) return;
    setAmbientes(ambientes.filter((a) => a.id !== id));
  }

  function calcular() {
    const items = ambientes
      .filter((a) => a.comp && a.larg)
      .map((a) => ({
        nome: a.nome || "Ambiente",
        area: parseFloat(a.comp.replace(",", ".")) * parseFloat(a.larg.replace(",", ".")),
      }));

    const total = items.reduce((s, i) => s + i.area, 0);
    setResult({ items, total, comMargem: total * 1.1 });
  }

  return (
    <ToolLayout
      title="Calculadora de m²"
      emoji="📐"
      category="Utilidades"
      description="Meça a área de até 5 ambientes e calcule o total com margem para quebra de piso."
      onBack={onBack}
      affiliateBanner={
        <AffiliateBanner
          terms={["piso vinilico", "azulejo", "argamassa"]}
          label="Materiais para piso"
          mercadoLivreTerms={["piso vinílico"]} mercadoLivreLabel="Encontre no Mercado Livre"
        />
      }
    >
      <div className="space-y-4">
        <div className="space-y-3">
          {ambientes.map((a, i) => (
            <div key={a.id} className="p-3 rounded-xl bg-white/3 border border-white/8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400 font-medium">Ambiente {i + 1}</span>
                {ambientes.length > 1 && (
                  <button onClick={() => remove(a.id)} className="text-gray-600 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <input value={a.nome} onChange={(e) => update(a.id, "nome", e.target.value)} placeholder="Nome" className="input-field" />
                <input type="number" value={a.comp} onChange={(e) => update(a.id, "comp", e.target.value)} placeholder="Comp (m)" className="input-field" />
                <input type="number" value={a.larg} onChange={(e) => update(a.id, "larg", e.target.value)} placeholder="Larg (m)" className="input-field" />
              </div>
            </div>
          ))}
        </div>

        {ambientes.length < 5 && (
          <button onClick={addAmbiente} className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors">
            <Plus className="w-4 h-4" /> Adicionar ambiente
          </button>
        )}

        <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
          <input type="checkbox" checked={margem} onChange={(e) => setMargem(e.target.checked)} className="rounded w-4 h-4" />
          Adicionar 10% de margem para quebra de piso
        </label>

        <button onClick={calcular} className="btn-primary w-full">Calcular m²</button>

        {result && (
          <div className="mt-4 space-y-2">
            {result.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <span className="text-sm text-white">{item.nome}</span>
                <span className="text-white font-medium">{item.area.toFixed(2)} m²</span>
              </div>
            ))}
            <div className="h-px bg-white/10" />
            <div className="flex items-center justify-between p-3 rounded-xl bg-white/8">
              <span className="text-sm text-gray-400">Área Total</span>
              <span className="text-xl font-bold text-white">{result.total.toFixed(2)} m²</span>
            </div>
            {margem && (
              <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <span className="text-sm text-amber-400">Com 10% de margem</span>
                <span className="text-xl font-bold text-amber-400">{result.comMargem.toFixed(2)} m²</span>
              </div>
            )}
          </div>
        )}
      </div>
      <ToolContent
        toolName="MetrosQuadrados"
        category="Transportes"
        data={{
          directAnswer: "Uma sala de 4m de largura por 5m de comprimento tem 20 metros quadrados. Para L em forma, divida em retângulos e some.",
          howItWorks: "A ferramenta calcula a área de até 5 ambientes, somando os resultados. Cada ambiente é tratado como um retângulo: área = comprimento (m) × largura (m). Se houver margem de 10% (para quebra de piso), o total é multiplicado por 1,1. Para ambientes em L, divida em 2 retângulos e adicione ambos como ambientes separados. A ferramenta exibe: área de cada ambiente, área total e, se marcada, área com margem. É ideal para comprar pisos, revestimentos, tintas e estimar custos de reforma.",
          example: {
            title: "Exemplo: sala 4m × 5m + quarto 3m × 3m, com margem",
            steps: [
              "Adicione ambiente 1: Sala, 4m, 5m",
              "Adicione ambiente 2: Quarto, 3m, 3m",
              "Marque 'Adicionar 10% de margem para quebra de piso'",
              "Calcula: sala = 20m², quarto = 9m², total = 29m²",
              "Com margem: 29 × 1,1 = 31,9 m²"
            ],
            result: "Área total: 29 m²; Com margem: 31,9 m². Você precisará comprar 32 m² de piso.",
          },
          faqs: [
            { question: "Como calcular metros quadrados?", answer: "Multiplique comprimento pela largura em metros. Ex: 4m × 5m = 20m². A ferramenta calcula automaticamente para vários ambientes." },
            { question: "Como medir área de L?", answer: "Divida em 2 retângulos e some as áreas. Ex: L de 6m × 4m com recorte de 2m × 2m = (6×2) + (4×2) = 12 + 8 = 20m²." },
            { question: "Como calcular área triangular?", answer: "Área = (base × altura) / 2. A ferramenta não calcula triângulos diretamente, mas você pode convertê-lo em um retângulo imaginário e dividir por 2." },
            { question: "Como converter m² para hectares?", answer: "1 hectare = 10.000 m². Divida a área em m² por 10.000. Ex: 50.000 m² = 5 hectares." },
            { question: "Como medir terreno?", answer: "Use trena ou medidor a laser. Para terrenos irregulares, divida em formas simples (retângulos, triângulos), meça cada uma e some. Use a ferramenta para somar múltiplas áreas." },
          ],
        }}
      />
    </ToolLayout>
  );
}
