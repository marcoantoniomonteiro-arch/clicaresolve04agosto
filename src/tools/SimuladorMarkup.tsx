import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import React, { useState, useMemo } from "react";


import { ToolContent } from "../components/ToolContent";
import { CONFIG } from "../config";

interface Props {
  onBack: () => void;
}

export function SimuladorMarkup({ onBack }: Props) {
  const [custo, setCusto] = useState("");
  const [impostos, setImpostos] = useState("");
  const [comissao, setComissao] = useState("");
  const [margemDesejada, setMargemDesejada] = useState("");

  const result = useMemo(() => {
    const c = parseFloat(custo.replace(",", ".")) || 0;
    const impPct = parseFloat(impostos.replace(",", ".")) || 0;
    const comPct = parseFloat(comissao.replace(",", ".")) || 0;
    const margemPct = parseFloat(margemDesejada.replace(",", ".")) || 0;

    if (c <= 0) return null;

    const markup = 1 / (1 - (impPct / 100) - (comPct / 100) - (margemPct / 100));
    const precoVenda = c * markup;

    const valorImpostos = precoVenda * (impPct / 100);
    const valorComissao = precoVenda * (comPct / 100);
    const lucroBruto = precoVenda - c - valorImpostos - valorComissao;
    const margemReal = precoVenda > 0 ? (lucroBruto / precoVenda) * 100 : 0;

    return { c, impPct, comPct, margemPct, markup, precoVenda, valorImpostos, valorComissao, lucroBruto, margemReal };
  }, [custo, impostos, comissao, margemDesejada]);

  return (
    <ToolLayout
      title="Simulador de Markup"
      emoji="🛒"
      category="Financas"
      description="Calcule o preco de venda ideal considerando custos, impostos e margem de lucro."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["curso vendas online"]} label="curso vendas online" />}
    
    >
      <div className="space-y-5">
        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Custo do Produto (R$)</span>
          <input
            type="number"
            value={custo}
            onChange={(e) => setCusto(e.target.value)}
            placeholder="Ex: 50"
            className="input-field"
          />
        </label>

        <div className="grid grid-cols-3 gap-3">
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Impostos (%)</span>
            <input
              type="number"
              value={impostos}
              onChange={(e) => setImpostos(e.target.value)}
              placeholder="Ex: 18"
              className="input-field"
            />
          </label>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Comissao (%)</span>
            <input
              type="number"
              value={comissao}
              onChange={(e) => setComissao(e.target.value)}
              placeholder="Ex: 15"
              className="input-field"
            />
          </label>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Margem Desejada (%)</span>
            <input
              type="number"
              value={margemDesejada}
              onChange={(e) => setMargemDesejada(e.target.value)}
              placeholder="Ex: 20"
              className="input-field"
            />
          </label>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
              <p className="text-xs text-green-400 mb-1">Preco de Venda Ideal</p>
              <p className="text-4xl font-black text-green-400">
                R$ {result.precoVenda.toFixed(2)}
              </p>
              <p className="text-sm text-gray-400 mt-1">Markup: {result.markup.toFixed(2)}x</p>
            </div>

            <div className="grid grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-white/5 text-center">
                <p className="text-xs text-gray-400">Custo</p>
                <p className="text-sm font-bold text-white">R$ {result.c.toFixed(2)}</p>
              </div>
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-center">
                <p className="text-xs text-red-400">Impostos</p>
                <p className="text-sm font-bold text-red-400">R$ {result.valorImpostos.toFixed(2)}</p>
              </div>
              <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-center">
                <p className="text-xs text-yellow-400">Comissao</p>
                <p className="text-sm font-bold text-yellow-400">R$ {result.valorComissao.toFixed(2)}</p>
              </div>
              <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
                <p className="text-xs text-green-400">Lucro</p>
                <p className="text-sm font-bold text-green-400">R$ {result.lucroBruto.toFixed(2)}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/8">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Margem Real</span>
                <span className={`text-lg font-bold ${result.margemReal >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {result.margemReal.toFixed(1)}%
                </span>
              </div>
              <div className="h-2 bg-white/10 rounded-full mt-2">
                <div
                  className={`h-2 rounded-full ${result.margemReal >= 0 ? "bg-green-500" : "bg-red-500"}`}
                  style={{ width: `${Math.min(Math.abs(result.margemReal), 100)}%` }}
                />
              </div>
            </div>

            <p className="text-xs text-gray-500 text-center">
              Cada venda de R$ {result.precoVenda.toFixed(2)} gera R$ {result.lucroBruto.toFixed(2)} de lucro liquido.
            </p>
          </div>
        )}
      </div>
      <ToolContent
        toolName="SimuladorMarkup"
        category="Finanças"
        data={{
          directAnswer: "Para uma empresa com 20% de despesas fixas, 10% de despesas variáveis e 15% de lucro desejado, o markup é 1.82 (preço = custo × 1.82).",
          howItWorks: "O simulador de markup calcula o preço de venda ideal a partir do custo do produto, somando impostos, comissão e margem de lucro desejada. A fórmula usada é: Markup = 1 / (1 − (impostos% + comissão% + margem%)). O preço de venda = custo × markup. A ferramenta então apura: valor dos impostos em reais, valor da comissão, lucro bruto e margem real. Um gráfico de barra mostra a composição do preço de venda (custo, impostos, comissão, lucro). A margem real é comparada com a margem desejada, e um alerta é exibido caso seja diferente.",
          example: {
            title: "Exemplo: custo R$ 50, 18% impostos, 15% comissão, 20% margem",
            steps: [
              "Informe o custo: R$ 50,00",
              "Informe impostos: 18%, comissão: 15%, margem: 20%",
              "Calcula markup: 1 / (1 − 0,53) = 1 / 0,47 = 2,13",
              "Preço de venda: R$ 50 × 2,13 = R$ 106,38",
              "Verifica: impostos R$ 19,15, comissão R$ 15,96, lucro R$ 21,28 → margem real 20,0%"
            ],
            result: "Preço de venda: R$ 106,38; markup: 2.13; lucro: R$ 21,28 por venda; margem real: 20,0%",
          },
          glossary: [
            { term: "Markup", definition: "Fator multiplicador do custo para chegar ao preço de venda. Ex: markup 2.0 = preço = custo × 2." },
            { term: "Margem de Lucro", definition: "Percentual de lucro sobre o preço de venda. Diferente do markup, que é sobre o custo." }
          ],
          faqs: [
            { question: "Como calcular markup?", answer: "Informe o custo, impostos, comissão e margem desejada. A ferramenta calcula: markup = 1 / (1 − soma%). O preço = custo × markup." },
            { question: "Qual markup ideal?", answer: "Depende do setor. Varejo: 2.0-3.0. Serviços: 1.5-2.5. Indústria: 1.3-1.8. O ideal é aquele que cobre todos os custos e gera lucro sustentável." },
            { question: "Diferença entre markup e margem?", answer: "Markup é sobre o custo (preço = custo × markup). Margem é sobre o preço de venda (lucro / preço). Margem de 20% = markup de 1,25." },
            { question: "Como precificar serviços?", answer: "Calcule o custo-hora (salário + benefícios + overhead), estime as horas do projeto e aplique o markup desejado. A ferramenta ajuda a testar cenários." },
            { question: "O que é preço de venda?", answer: "É o valor que o cliente paga. Deve cobrir: custo do produto/serviço + impostos + comissões + despesas fixas + margem de lucro." },
          ],
        }}
      />
    </ToolLayout>
  );
}
