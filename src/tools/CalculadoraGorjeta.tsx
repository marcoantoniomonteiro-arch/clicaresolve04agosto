import React, { useState, useMemo } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";

interface Props {
  onBack: () => void;
}

export function CalculadoraGorjeta({ onBack }: Props) {
  const [bill, setBill] = useState("");
  const [tipPercent, setTipPercent] = useState(10);
  const [people, setPeople] = useState("1");

  const { tipAmount, total, perPerson } = useMemo(() => {
    const b = parseFloat(bill) || 0;
    const p = parseInt(people) || 1;
    const tip = b * (tipPercent / 100);
    const t = b + tip;
    return { tipAmount: tip, total: t, perPerson: t / p };
  }, [bill, tipPercent, people]);

  const fmt = (v: number) =>
    v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <ToolLayout
      title="Calculadora de Gorjeta"
      emoji="🍽️"
      category="Finanças"
      description="Calcule gorjeta e divida a conta entre várias pessoas."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["cartão crédito"]} label="cartão crédito" />}
    >
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Valor da conta (R$)</span>
          <input
            type="number"
            value={bill}
            onChange={(e) => setBill(e.target.value)}
            placeholder="180.00"
            className="input-field"
          />
        </label>

        <div>
          <span className="text-sm text-gray-400 mb-2 block">Porcentagem de gorjeta: {tipPercent}%</span>
          <div className="flex gap-2 mb-3">
            {[10, 15, 20].map((p) => (
              <button
                key={p}
                onClick={() => setTipPercent(p)}
                className={`flex-1 p-2.5 rounded-xl border text-sm font-semibold transition-all ${
                  tipPercent === p
                    ? "bg-green-500/20 border-green-500/40 text-green-400"
                    : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
                }`}
              >
                {p}%
              </button>
            ))}
          </div>
          <input
            type="range"
            min="0"
            max="30"
            step="1"
            value={tipPercent}
            onChange={(e) => setTipPercent(parseInt(e.target.value))}
            className="w-full accent-green-500"
          />
        </div>

        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Número de pessoas</span>
          <input
            type="number"
            min="1"
            value={people}
            onChange={(e) => setPeople(e.target.value)}
            className="input-field"
          />
        </label>

        {parseFloat(bill) > 0 && (
          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-gray-400">Gorjeta ({tipPercent}%)</p>
              <p className="text-xl font-bold text-green-400">{fmt(tipAmount)}</p>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-gray-400">Total com gorjeta</p>
              <p className="text-xl font-bold text-white">{fmt(total)}</p>
            </div>
            <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
              <p className="text-xs text-green-400">Por pessoa ({people} {parseInt(people) === 1 ? "pessoa" : "pessoas"})</p>
              <p className="text-2xl font-bold text-green-400">{fmt(perPerson)}</p>
            </div>
          </div>
        )}
      </div>

      <ToolContent
        toolName="Calculadora de Gorjeta"
        category="Finanças"
        data={{
          directAnswer: "O valor da gorjeta é calculado multiplicando o valor da conta pela porcentagem desejada, e o valor por pessoa é obtido dividindo o total (conta + gorjeta) pelo número de pessoas.",
          howItWorks: "A ferramenta calcula a gorjeta aplicando a porcentagem escolhida sobre o valor da conta, soma ao valor original para obter o total a pagar, e divide esse total pelo número de pessoas presentes, facilitando a divisão justa da conta em grupo. No Brasil, a gorjeta de 10% já costuma vir incluída na conta de restaurantes como 'taxa de serviço' (opcional por lei), então vale conferir se já não está incluída antes de adicionar uma gorjeta extra.",
          example: {
            title: "Exemplo: conta de R$ 180 dividida entre 4 pessoas, 10% de gorjeta",
            steps: [
              `Valor da conta: R$ 180`,
              `Gorjeta: 10% = R$ 18`,
              `Total: R$ 198`,
              `Dividido por 4 pessoas: R$ 49,50 cada`,
            ],
            result: "Cada pessoa deve contribuir com R$ 49,50 para cobrir a conta com a gorjeta incluída.",
          },
          faqs: [
            { question: "A gorjeta de 10% é obrigatória no Brasil?", answer: "Não, a taxa de serviço de 10% cobrada em restaurantes é opcional por lei - você pode recusar o pagamento se desejar, embora seja um costume social comum." },
            { question: "Como sei se a gorjeta já está incluída na conta?", answer: "Verifique a nota fiscal ou pergunte ao garçom - muitos estabelecimentos já incluem a taxa de serviço de 10% automaticamente." },
            { question: "Posso calcular sem dividir entre várias pessoas?", answer: "Sim, basta deixar o número de pessoas como 1 para ver apenas o valor total com gorjeta." },
            { question: "Qual porcentagem de gorjeta é considerada padrão?", answer: "No Brasil, 10% é o padrão mais comum, mas pode variar conforme a qualidade do serviço e o costume local." },
          ],
        }}
      />
    </ToolLayout>
  );
}
