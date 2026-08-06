import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import React, { useState, useMemo } from "react";



interface Props {
  onBack: () => void;
}

type Moeda = "BRL" | "USD" | "EUR" | "ARS" | "GBP" | "BTC";

const DEFAULT_RATES: Record<Moeda, number> = {
  BRL: 1,
  USD: 5.85,
  EUR: 6.40,
  ARS: 0.006,
  GBP: 7.40,
  BTC: 350000,
};

const MOEDA_NAMES: Record<Moeda, string> = {
  BRL: "Real Brasileiro",
  USD: "Dolar Americano",
  EUR: "Euro",
  ARS: "Peso Argentino",
  GBP: "Libra Esterlina",
  BTC: "Bitcoin",
};

const MOEDA_SYMBOLS: Record<Moeda, string> = {
  BRL: "R$",
  USD: "$",
  EUR: "€",
  ARS: "$",
  GBP: "£",
  BTC: "₿",
};

export function ConversorMoedas({ onBack }: Props) {
  const [rates, setRates] = useState(DEFAULT_RATES);
  const [valor, setValor] = useState("");
  const [moedaOrigem, setMoedaOrigem] = useState<Moeda>("BRL");
  const [showEdit, setShowEdit] = useState(false);

  const results = useMemo(() => {
    const v = parseFloat(valor.replace(",", ".")) || 0;
    const taxaOrigem = rates[moedaOrigem];
    const valorEmBRL = moedaOrigem === "BRL" ? v : v * taxaOrigem;

    const conversions: { moeda: Moeda; valor: number; symbol: string; name: string }[] = [];

    (Object.keys(rates) as Moeda[]).forEach((m) => {
      if (m === moedaOrigem) {
        conversions.push({ moeda: m, valor: v, symbol: MOEDA_SYMBOLS[m], name: MOEDA_NAMES[m] });
      } else if (m === "BRL") {
        conversions.push({ moeda: m, valor: valorEmBRL, symbol: MOEDA_SYMBOLS[m], name: MOEDA_NAMES[m] });
      } else {
        conversions.push({
          moeda: m,
          valor: valorEmBRL / rates[m],
          symbol: MOEDA_SYMBOLS[m],
          name: MOEDA_NAMES[m],
        });
      }
    });

    return conversions;
  }, [valor, moedaOrigem, rates]);

  const updateRate = (moeda: Moeda, value: string) => {
    const num = parseFloat(value.replace(",", ".")) || 0;
    setRates((prev) => ({ ...prev, [moeda]: num }));
  };

  return (
    <ToolLayout
      title="Conversor de Moedas"
      emoji="💱"
      category="Financas"
      description="Converta valores entre diferentes moedas com taxas editaveis."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["livro educação financeira"]} label="livro educação financeira" />}
    
      disclaimer="Cotacoes aproximadas. Atualize conforme o cambio do dia. Os valores podem variar entre corretoras."
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Valor</span>
            <input
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="100"
              className="input-field"
            />
          </label>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Moeda de Origem</span>
            <select
              value={moedaOrigem}
              onChange={(e) => setMoedaOrigem(e.target.value as Moeda)}
              className="input-field"
            >
              {(Object.keys(MOEDA_NAMES) as Moeda[]).map((m) => (
                <option key={m} value={m}>
                  {m} - {MOEDA_NAMES[m]}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button
          onClick={() => setShowEdit((s) => !s)}
          className="w-full text-sm text-gray-400 hover:text-white text-center underline"
        >
          {showEdit ? "Ocultar edicao de taxas" : "Editar cotacoes"}
        </button>

        {showEdit && (
          <div className="p-4 rounded-xl bg-white/5 border border-white/8 space-y-3">
            <p className="text-xs text-gray-400 mb-2">Taxas em BRL (1 moeda = X reais)</p>
            {(Object.keys(rates) as Moeda[]).filter((m) => m !== "BRL").map((m) => (
              <div key={m} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-16">{m}</span>
                <input
                  type="number"
                  step="0.01"
                  value={rates[m]}
                  onChange={(e) => updateRate(m, e.target.value)}
                  className="input-field flex-1"
                />
                <span className="text-xs text-gray-500">BRL</span>
              </div>
            ))}
          </div>
        )}

        {valor && parseFloat(valor) > 0 && (
          <div className="space-y-3">
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
              Conversoes
            </p>
            {results.map((r) => (
              <div
                key={r.moeda}
                className={`p-4 rounded-xl flex items-center justify-between ${
                  r.moeda === moedaOrigem
                    ? "bg-green-500/10 border border-green-500/20"
                    : "bg-white/5 border border-white/8"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{r.symbol}</span>
                  <div>
                    <p className="font-semibold text-white">{r.moeda}</p>
                    <p className="text-xs text-gray-500">{r.name}</p>
                  </div>
                </div>
                <p className="text-xl font-bold text-white">
                  {r.symbol} {r.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: r.moeda === "BTC" ? 8 : 2 })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <ToolContent
        toolName="Conversor de Moedas"
        category="Finanças"
        data={{
          directAnswer: "A conversão de moedas multiplica o valor informado pela taxa de câmbio atual entre a moeda de origem e a de destino.",
          howItWorks: "A ferramenta usa a taxa de câmbio de referência entre as duas moedas selecionadas para calcular o valor equivalente. É uma estimativa baseada em cotações de mercado, que variam ao longo do dia. Em transações reais, bancos e casas de câmbio costumam aplicar spread cambial e taxas adicionais.",
          example: {
            title: "Exemplo: converter R$ 1.000 para Dólar, cotação R$ 5,20",
            steps: [
              "Valor: R$ 1.000",
              "Cotação USD: R$ 5,20",
              "Cálculo: 1.000 / 5,20",
              "Resultado: US$ 192,31",
            ],
            result: "R$ 1.000 equivalem a aproximadamente US$ 192,31 na cotação informada.",
          },
          faqs: [
            { question: "A cotação mostrada é a mesma do banco?", answer: "É uma referência de mercado. Bancos e casas de câmbio aplicam spread, então o valor final pode diferir." },
            { question: "Com que frequência a cotação é atualizada?", answer: "As cotações variam ao longo do dia útil, seguindo o mercado financeiro internacional." },
            { question: "Posso converter qualquer par de moedas?", answer: "Sim, entre as principais moedas disponíveis na lista de seleção." },
            { question: "Por que compra e venda têm valores diferentes?", answer: "Instituições financeiras cobram uma margem (spread) entre o preço de compra e o de venda." },
          ],
        }}
      />
    </ToolLayout>
  );
}
