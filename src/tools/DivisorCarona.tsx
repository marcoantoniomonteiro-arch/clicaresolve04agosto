import React, { useState } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";

interface Props { onBack: () => void; }

export function DivisorCarona({ onBack }: Props) {
  const [distancia, setDistancia] = useState("");
  const [preco, setPreco] = useState("");
  const [consumo, setConsumo] = useState("12");
  const [passageiros, setPassageiros] = useState("2");
  const [pedagio, setPedagio] = useState("0");
  const [result, setResult] = useState<null | { total: number; porPessoa: number; combustivel: number }>(null);

  function calcular() {
    const d = parseFloat(distancia.replace(",", "."));
    const p = parseFloat(preco.replace(",", "."));
    const c = parseFloat(consumo.replace(",", "."));
    const pass = parseInt(passageiros);
    const ped = parseFloat(pedagio.replace(",", ".")) || 0;

    if (!d || !p || !c || !pass) return;

    const combustivel = (d / c) * p;
    const total = combustivel + ped;
    const porPessoa = total / pass;
    setResult({ total, porPessoa, combustivel });
  }

  const fmt = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <ToolLayout
      title="Divisor de Carona"
      emoji="🚗"
      category="Transportes"
      description="Calcule o custo total da viagem e divida igualmente entre os passageiros."
      onBack={onBack}
      affiliateBanner={
        <AffiliateBanner
          terms={["organizador porta-malas", "suporte celular carro"]}
          label="Acessórios para viagem"
        />
      }
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Distância (km)</span>
            <input type="number" value={distancia} onChange={(e) => setDistancia(e.target.value)} placeholder="Ex: 250" className="input-field" />
          </label>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Preço Combustível (R$/L)</span>
            <input type="number" value={preco} onChange={(e) => setPreco(e.target.value)} placeholder="Ex: 5.79" className="input-field" />
          </label>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Consumo (km/L)</span>
            <input type="number" value={consumo} onChange={(e) => setConsumo(e.target.value)} placeholder="Padrão: 12" className="input-field" />
          </label>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Nº de Passageiros</span>
            <input type="number" min="1" value={passageiros} onChange={(e) => setPassageiros(e.target.value)} placeholder="Ex: 4" className="input-field" />
          </label>
          <label className="block col-span-2">
            <span className="text-sm text-gray-400 mb-1 block">Pedágio Total (R$) — opcional</span>
            <input type="number" value={pedagio} onChange={(e) => setPedagio(e.target.value)} placeholder="Ex: 18.50" className="input-field" />
          </label>
        </div>

        <button onClick={calcular} className="btn-primary w-full">Calcular</button>

        {result && (
          <div className="mt-4 p-5 rounded-xl border border-green-500/30 bg-green-500/8 space-y-3">
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-xs text-gray-400">Combustível</p>
                <p className="text-lg font-bold text-white">{fmt(result.combustivel)}</p>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <p className="text-xs text-gray-400">Total com Pedágio</p>
                <p className="text-lg font-bold text-white">{fmt(result.total)}</p>
              </div>
              <div className="bg-green-500/20 rounded-lg p-3 border border-green-500/30">
                <p className="text-xs text-green-400">Por Pessoa</p>
                <p className="text-xl font-bold text-green-400">{fmt(result.porPessoa)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToolContent
        toolName="Divisor de Carona"
        category="Transportes"
        data={{
          directAnswer: "O divisor de carona calcula o valor que cada passageiro deve pagar, dividindo o custo total da viagem (combustível, pedágio) pelo número de pessoas.",
          howItWorks: "A ferramenta soma os custos da viagem (combustível estimado, pedágios, estacionamento) e divide o total pelo número de pessoas que estão compartilhando a carona, incluindo ou não o motorista na divisão, conforme a escolha do grupo.",
          example: {
            title: "Exemplo: viagem com custo total de R$ 150 dividida entre 4 pessoas",
            steps: [
              "Combustível estimado: R$ 120",
              "Pedágio: R$ 30",
              "Custo total: R$ 150",
              "Divisão entre 4 pessoas: R$ 37,50 cada",
            ],
            result: "Cada uma das 4 pessoas na carona deve contribuir com R$ 37,50 para cobrir o custo total da viagem.",
          },
          faqs: [
            { question: "O motorista também deve pagar sua parte?", answer: "Isso varia por acordo do grupo; muitos grupos optam por isentar o motorista, dividindo o custo apenas entre os passageiros." },
            { question: "Como estimar o custo de combustível da viagem?", answer: "Multiplique a distância total pelo consumo médio do veículo e pelo preço atual do combustível na região." },
            { question: "Devo incluir desgaste do veículo na divisão?", answer: "Não é obrigatório, mas alguns grupos optam por adicionar uma margem extra para manutenção do carro em viagens longas." },
            { question: "A ferramenta calcula rotas ou só divide valores?", answer: "Ela foca na divisão financeira dos custos informados; para cálculo de rota e distância, ferramentas de mapa são mais indicadas." },
          ],
        }}
      />
    </ToolLayout>
  );
}
