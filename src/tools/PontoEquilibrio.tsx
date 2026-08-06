import React, { useState, useMemo } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { CONFIG } from "../config";

interface Props {
  onBack: () => void;
}

export function PontoEquilibrio({ onBack }: Props) {
  const [custoFixo, setCustoFixo] = useState("");
  const [custoVariavel, setCustoVariavel] = useState("");
  const [precoVenda, setPrecoVenda] = useState("");

  const result = useMemo(() => {
    const cf = parseFloat(custoFixo.replace(",", ".")) || 0;
    const cv = parseFloat(custoVariavel.replace(",", ".")) || 0;
    const pv = parseFloat(precoVenda.replace(",", ".")) || 0;

    if (pv <= cv) return null;

    const mc = pv - cv;
    const unidades = cf / mc;
    const faturamento = unidades * pv;

    return { cf, cv, pv, mc, unidades, faturamento };
  }, [custoFixo, custoVariavel, precoVenda]);

  return (
    <ToolLayout
      title="Ponto de Equilibrio"
      emoji="📈"
      category="Financas"
      description="Descubra quantas unidades precisa vender para cobrir todos os custos."
      onBack={onBack}
      affiliateBanner={
        <AffiliateBanner
          terms={["livro gestao financeira MEI", "controle financeiro pequena empresa"]}
          label="Aprenda mais sobre gestao"
        />
      }
      disclaimer="Simplificacao didatica. Nao considera impostos variaveis, sazonalidade ou custos semi-variaveis."
    >
      <div className="space-y-5">
        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Custo Fixo Mensal (R$)</span>
          <input
            type="number"
            value={custoFixo}
            onChange={(e) => setCustoFixo(e.target.value)}
            placeholder="Ex: 5000"
            className="input-field"
          />
          <p className="text-xs text-gray-600 mt-1">Aluguel, salario, energia, etc.</p>
        </label>

        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Custo Variavel por Unidade (R$)</span>
          <input
            type="number"
            value={custoVariavel}
            onChange={(e) => setCustoVariavel(e.target.value)}
            placeholder="Ex: 15"
            className="input-field"
          />
          <p className="text-xs text-gray-600 mt-1">Materia-prima, embalagem, etc.</p>
        </label>

        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Preco de Venda por Unidade (R$)</span>
          <input
            type="number"
            value={precoVenda}
            onChange={(e) => setPrecoVenda(e.target.value)}
            placeholder="Ex: 30"
            className="input-field"
          />
        </label>

        {result && (
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
              <p className="text-xs text-green-400 mb-1">Ponto de Equilibrio</p>
              <p className="text-4xl font-black text-green-400">
                {Math.ceil(result.unidades)} unidades
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-white/5 text-center">
                <p className="text-xs text-gray-400">Faturamento Minimo</p>
                <p className="text-lg font-bold text-white">
                  R$ {result.faturamento.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
                <p className="text-xs text-blue-400">Margem Contribuicao</p>
                <p className="text-lg font-bold text-blue-400">
                  R$ {result.mc.toFixed(2)}/un
                </p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 text-center">
                <p className="text-xs text-gray-400">Margem %</p>
                <p className="text-lg font-bold text-white">
                  {((result.mc / result.pv) * 100).toFixed(1)}%
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/8">
              <p className="text-xs text-gray-400 mb-2">O que significa?</p>
              <p className="text-sm text-gray-300">
                Voce precisa vender pelo menos <strong className="text-white">{Math.ceil(result.unidades)} unidades</strong> por mes
                (faturando R$ {result.faturamento.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}) para cobrir todos os custos.
                Acima disso, cada unidade vendida gera lucro de R$ {result.mc.toFixed(2)}.
              </p>
            </div>
          </div>
        )}

        {result === null && precoVenda && custoVariavel && parseFloat(precoVenda) <= parseFloat(custoVariavel) && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-center">
            <p className="text-sm text-red-400">
              Preco de venda menor ou igual ao custo variavel. Nao havera lucro.
            </p>
          </div>
        )}
      </div>
      <ToolContent
        toolName="PontoEquilibrio"
        category="Finanças"
        data={{
          directAnswer: "Uma empresa com R$ 5.000 de custo fixo, preço de R$ 100 e custo variável de R$ 40 precisa vender 83 unidades para equilibrar.",
          howItWorks: "O ponto de equilíbrio é o volume de vendas onde receita total = custo total, ou seja, lucro zero. A fórmula é: PE = Custo Fixo / (Preço − Custo Variável). A ferramenta calcula: unidades de equilíbrio, faturamento mínimo, margem de contribuição (preço − custo variável) e margem de contribuição percentual. O resultado é apresentado em cards coloridos: verde para o ponto de equilíbrio, azul para margem de contribuição. Um alerta vermelho aparece se o preço for menor ou igual ao custo variável (impossível ter lucro).",
          example: {
            title: "Exemplo: custo fixo R$ 5.000, preço R$ 100, CV R$ 40",
            steps: [
              "Informe o custo fixo mensal: R$ 5.000",
              "Informe o preço de venda: R$ 100",
              "Informe o custo variável por unidade: R$ 40",
              "Calcula margem de contribuição: R$ 100 − R$ 40 = R$ 60",
              "PE = 5.000 / 60 = 83,3 → arredondado para 84 unidades"
            ],
            result: "Ponto de equilíbrio: 84 unidades; faturamento mínimo: R$ 8.400; margem de contribuição: R$ 60/unidade (60%)",
          },
          glossary: [
            { term: "Custo Fixo", definition: "Gastos que não variam com a produção: aluguel, salários, internet, energia básica." },
            { term: "Custo Variável", definition: "Gastos proporcionais à produção: matéria-prima, comissões, embalagem, frete." }
          ],
          faqs: [
            { question: "Como calcular ponto de equilíbrio?", answer: "Use a fórmula PE = Custo Fixo / (Preço − Custo Variável). A ferramenta faz o cálculo completo: unidades, faturamento e margem de contribuição." },
            { question: "O que é ponto de equilíbrio?", answer: "É o volume de vendas onde o lucro é zero. Antes do PE, há prejuízo; após, lucro. É essencial para planejamento financeiro." },
            { question: "Como reduzir ponto de equilíbrio?", answer: "Reduzir custos fixos (alugar menor, terceirizar) ou aumentar a margem de contribuição (aumentar preço ou reduzir custo variável)." },
            { question: "Ponto de equilíbrio em unidades ou reais?", answer: "A ferramenta mostra ambos. Unidades: quantos itens precisa vender. Em reais: quanto precisa faturar. Use a unidade que fizer mais sentido para seu negócio." },
            { question: "É possível ter lucro antes do PE?", answer: "Não matematicamente. O PE é o ponto de lucro zero. Abaixo dele, prejuízo; acima, lucro. Na prática, lucros podem aparecer em vendas antecipadas ou pagamentos diferidos." },
          ],
        }}
      />
    </ToolLayout>
  );
}
