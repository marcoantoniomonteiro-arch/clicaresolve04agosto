import React, { useState } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { CONFIG } from "../config";

interface Props { onBack: () => void; }

const CATEGORIAS = [
  { value: "popular", label: "Popular", taxa: 0.10 },
  { value: "medio", label: "Médio", taxa: 0.12 },
  { value: "suv", label: "SUV", taxa: 0.14 },
  { value: "pickup", label: "Pickup", taxa: 0.11 },
  { value: "moto", label: "Moto", taxa: 0.15 },
];

export function DepreciacaoVeiculo({ onBack }: Props) {
  const [valor, setValor] = useState("");
  const [ano, setAno] = useState(new Date().getFullYear().toString());
  const [categoria, setCategoria] = useState("popular");
  const [result, setResult] = useState<null | { anos: { n: number; valor: number; perda: number; pct: number }[] }>(null);

  function calcular() {
    const v = parseFloat(valor.replace(/\./g, "").replace(",", "."));
    const cat = CATEGORIAS.find((c) => c.value === categoria)!;
    if (!v) return;

    const anos = [1, 3, 5].map((n) => {
      const futuro = v * Math.pow(1 - cat.taxa, n);
      return {
        n,
        valor: futuro,
        perda: v - futuro,
        pct: ((v - futuro) / v) * 100,
      };
    });

    setResult({ anos });
  }

  const fmt = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <ToolLayout
      title="Depreciação de Veículo"
      emoji="🚙"
      category="Transportes"
      description="Veja quanto seu carro ou moto vai valer em 1, 3 e 5 anos com base na categoria."
      onBack={onBack}
      affiliateBanner={
        <AffiliateBanner
          terms={["pelicula protetora carro", "capa de banco"]}
          label="Proteja seu veículo"
          mercadoLivreTerms={["pelicula automotiva", "capa de banco universal"]} mercadoLivreLabel="Encontre no Mercado Livre"
        />
      }
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <label className="block col-span-2">
            <span className="text-sm text-gray-400 mb-1 block">Valor Atual (R$)</span>
            <input
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="Ex: 45000"
              className="input-field"
            />
          </label>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Ano de Fabricação</span>
            <input
              type="number"
              value={ano}
              onChange={(e) => setAno(e.target.value)}
              placeholder={new Date().getFullYear().toString()}
              className="input-field"
            />
          </label>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Categoria</span>
            <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className="input-field">
              {CATEGORIAS.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label} ({(c.taxa * 100).toFixed(0)}%/ano)
                </option>
              ))}
            </select>
          </label>
        </div>

        <button onClick={calcular} className="btn-primary w-full">Calcular Depreciação</button>

        {result && (
          <div className="mt-4 space-y-3">
            {result.anos.map((a) => (
              <div key={a.n} className="p-4 rounded-xl bg-white/5 border border-white/8">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white">Em {a.n} ano{a.n > 1 ? "s" : ""}</span>
                  <span className="text-xl font-bold text-white">{fmt(a.valor)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-red-400">Perda: {fmt(a.perda)}</span>
                  <span className="text-red-400 font-medium">-{a.pct.toFixed(1)}%</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-white/10">
                  <div className="h-1.5 rounded-full bg-red-400/70" style={{ width: `${a.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ToolContent
        toolName="DepreciacaoVeiculo"
        category="Transportes"
        data={{
          directAnswer: "Um carro de R$ 80.000 sofre depreciação de 20% no 1º ano (R$ 16.000), 15% no 2º (R$ 9.600), 10% no 3º (R$ 5.440), totalizando R$ 49.000 no valor residual.",
          howItWorks: "A ferramenta calcula a depreciação do veículo usando a taxa de mercado por categoria: popular (10%/ano), médio (12%), SUV (14%), pickup (11%), moto (15%). A fórmula é: valor futuro = valor atual × (1 − taxa)^anos. São calculados 3 cenários: 1 ano, 3 anos e 5 anos. Para cada cenário, a ferramenta exibe: valor residual, valor de perda e percentual de depreciação. Uma barra de progresso visual mostra a perda acumulada. A depreciação é diferente da desvalorização: depreciação é um cálculo contábil; desvalorização é o valor real de mercado, que pode ser maior ou menor.",
          example: {
            title: "Exemplo: carro popular de R$ 60.000, ano 2026",
            steps: [
              "Informe o valor atual: R$ 60.000",
              "Informe o ano de fabricação: 2026",
              "Selecione a categoria: Popular (taxa 10%/ano)",
              "A ferramenta calcula: 1 ano = R$ 54.000 (perda R$ 6.000)",
              "3 anos = R$ 43.740 (perda R$ 16.260); 5 anos = R$ 35.431 (perda R$ 24.569)"
            ],
            result: "Valor residual em 1 ano: R$ 54.000; 3 anos: R$ 43.740; 5 anos: R$ 35.431 — depreciação total de 41%.",
          },
          faqs: [
            { question: "Como calcular depreciação?", answer: "Informe o valor atual, ano de fabricação e categoria. A ferramenta aplica a taxa de mercado e calcula o valor residual em 1, 3 e 5 anos." },
            { question: "Qual a depreciação de carro por ano?", answer: "Popular: 10%. Médio: 12%. SUV: 14%. Pickup: 11%. Moto: 15%. A taxa é maior no 1º ano e decresce nos anos seguintes." },
            { question: "Depreciação é a mesma que desvalorização?", answer: "Não. Depreciação é um cálculo contábil para fins fiscais. Desvalorização é o valor real de mercado. Um carro raro pode desvalorizar menos do que deprecia." },
            { question: "Como manter valor do carro?", answer: "Mantenha a revisão em dia, use peças originais, faça higienização periódica, proteja a pintura (cerâmica/película) e evite modificações estruturais." },
            { question: "Carro 0km deprecia mais?", answer: "Sim. O 1º ano é o de maior depreciação (20-30% para alguns modelos). A partir do 2º ano, a taxa diminui. SUVs e luxo costumam depreciar mais." },
          ],
        }}
      />
    </ToolLayout>
  );
}
