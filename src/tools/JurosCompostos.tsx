import React, { useState, useMemo } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { TrendingUp } from "lucide-react";
import { ToolContent } from "../components/ToolContent";
import { CONFIG } from "../config";

interface Props {
  onBack: () => void;
}

export function JurosCompostos({ onBack }: Props) {
  const [initial, setInitial] = useState("");
  const [monthly, setMonthly] = useState("");
  const [rate, setRate] = useState("");
  const [period, setPeriod] = useState("");
  const [periodType, setPeriodType] = useState<"meses" | "anos">("anos");

  const result = useMemo(() => {
    const C = parseFloat(initial.replace(",", ".")) || 0;
    const P = parseFloat(monthly.replace(",", ".")) || 0;
    const r = parseFloat(rate.replace(",", ".")) || 0;
    const t = parseFloat(period.replace(",", ".")) || 0;
    const months = periodType === "anos" ? t * 12 : t;

    if (C <= 0 && P <= 0) return null;
    if (months <= 0) return null;

    const i = r / 100 / 12;
    let total = C;
    let invested = C;
    for (let m = 0; m < months; m++) {
      total = total * (1 + i) + P;
      invested += P;
    }
    const earnings = total - invested;

    return { total, invested, earnings, months, i };
  }, [initial, monthly, rate, period, periodType]);

  return (
    <ToolLayout
      title="Juros Compostos"
      emoji="📈"
      category="Financas"
      description="Simule o crescimento do seu investimento com juros compostos."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["livro investimentos renda fixa"]} label="livro investimentos renda fixa" />}
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setPeriodType("anos")}
            className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
              periodType === "anos"
                ? "bg-green-500/20 border-green-500/40 text-green-400"
                : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
            }`}
          >
            Anos
          </button>
          <button
            onClick={() => setPeriodType("meses")}
            className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
              periodType === "meses"
                ? "bg-green-500/20 border-green-500/40 text-green-400"
                : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
            }`}
          >
            Meses
          </button>
        </div>

        <div className="space-y-3">
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Investimento Inicial (R$)</span>
            <input
              type="number"
              value={initial}
              onChange={(e) => setInitial(e.target.value)}
              placeholder="Ex: 10000"
              className="input-field"
            />
          </label>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Aporte Mensal (R$)</span>
            <input
              type="number"
              value={monthly}
              onChange={(e) => setMonthly(e.target.value)}
              placeholder="Ex: 500"
              className="input-field"
            />
          </label>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Taxa de Juros Anual (%)</span>
            <input
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              placeholder={`Ex: ${CONFIG.taxaCDI2026.toFixed(2)} (CDI)`}
              className="input-field"
            />
            <span className="text-xs text-gray-500 mt-1 block">
              Sugestão baseada no CDI de referência ({CONFIG.taxaCDI2026.toFixed(2)}%, {CONFIG.anoAtual}) — informe a taxa do seu investimento.
            </span>
          </label>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Periodo ({periodType})</span>
            <input
              type="number"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              placeholder={periodType === "anos" ? "Ex: 10" : "Ex: 120"}
              className="input-field"
            />
          </label>
        </div>

        {result && (
          <div className="space-y-3">
            <div className="p-5 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
              <p className="text-xs text-green-400 mb-1">Montante Final</p>
              <p className="text-4xl font-black text-green-400">
                R$ {result.total.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-white/5 text-center">
                <p className="text-xs text-gray-400">Investido</p>
                <p className="text-base font-bold text-white">
                  R$ {result.invested.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
                <p className="text-xs text-green-400">Rendimento</p>
                <p className="text-base font-bold text-green-400">
                  R$ {result.earnings.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
                <p className="text-xs text-blue-400">Rentabilidade</p>
                <p className="text-base font-bold text-blue-400">
                  {((result.earnings / result.invested) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <ToolContent
        toolName="Juros Compostos"
        category="Finanças"
        data={{
          directAnswer: "Juros compostos incidem sobre o capital somado aos juros já acumulados em períodos anteriores — por isso o rendimento cresce de forma acelerada (exponencial) com o tempo, ao contrário dos juros simples, que incidem sempre sobre o valor inicial fixo.",
          howItWorks: `A ferramenta simula, mês a mês, o crescimento de um investimento com aportes mensais recorrentes. Em cada mês, aplica a taxa sobre o saldo acumulado até ali (capital inicial + rendimentos anteriores) e depois soma o novo aporte, repetindo esse processo pelo número total de meses informado. Isso é diferente de multiplicar o valor inicial pela taxa uma única vez: o efeito composto significa que o rendimento de um mês passa a gerar rendimento no mês seguinte, criando uma curva de crescimento cada vez mais acentuada. Ao final, a calculadora mostra três números: o total que você efetivamente investiu (soma de todos os aportes), o montante final acumulado, e o rendimento (a diferença entre os dois). Como referência, a ferramenta usa a taxa CDI ${CONFIG.taxaCDI2026.toFixed(2)}% e a Selic ${CONFIG.taxaSelic2026.toFixed(2)}% de ${CONFIG.anoAtual}, mas você pode simular com qualquer taxa — de poupança a CDBs, fundos ou Tesouro Direto.`,
          example: {
            title: "Exemplo: R$ 10.000 inicial, R$ 500/mês, 13.25% a.a., 10 anos",
            steps: [
              `Investimento inicial: R$ 10.000`,
              `Aporte mensal: R$ 500`,
              `Taxa anual: 13.25% (CDI ${CONFIG.anoAtual})`,
              `Período: 10 anos (120 meses)`,
              `Taxa mensal: 13.25% / 12 = ~1.10%`,
              `Montante final: R$ 166.000+`
            ],
            result: "Em 10 anos, você investe R$ 70.000 e recebe aproximadamente R$ 166.000 — rendimento de R$ 96.000 (137% de rentabilidade).",
          },
          glossary: [
            { term: "Juros simples", definition: "Incidem apenas sobre o valor inicial (principal), sem considerar os rendimentos já acumulados. Crescem de forma linear, não exponencial." },
            { term: "Efeito composto", definition: "O fenômeno pelo qual os rendimentos de um período passam a render juros nos períodos seguintes, acelerando o crescimento do total investido ao longo do tempo." },
            { term: "CDI", definition: "Certificado de Depósito Interbancário — taxa média usada como referência para a rentabilidade da maioria dos investimentos de renda fixa no Brasil." },
          ],
          faqs: [
            { question: "O que são juros compostos?", answer: "São juros calculados sobre o capital somado aos rendimentos anteriores, e não apenas sobre o valor inicial. A fórmula clássica (sem aportes) é M = C × (1 + i)^t, onde C é o capital, i é a taxa por período e t é o número de períodos." },
            { question: "Como a simulação considera os aportes mensais?", answer: "A cada mês, a ferramenta aplica a taxa sobre o saldo acumulado até aquele momento e, em seguida, soma o novo aporte ao saldo — esse processo se repete mês a mês até completar o período total, o que reflete melhor a realidade de quem investe todo mês, em vez de um único depósito." },
            { question: "Qual a diferença entre CDI e Selic?", answer: "A Selic é a taxa básica de juros da economia, definida pelo Banco Central. O CDI é a taxa média dos empréstimos entre bancos e costuma ficar ligeiramente abaixo da Selic (diferença de cerca de 0,10 ponto percentual). A maioria dos investimentos de renda fixa usa o CDI como referência de rentabilidade." },
            { question: "Vale mais a pena investir um valor alto de uma vez ou aportar todo mês?", answer: "Depende do seu momento financeiro. Quem já tem o capital disponível se beneficia de mais tempo de rendimento composto sobre aquele valor. Já os aportes mensais são a forma mais realista de construir patrimônio para quem está poupando parte da renda mês a mês — o importante é começar e manter a constância." },
          ],
        }}
      />
    </ToolLayout>
  );
}
