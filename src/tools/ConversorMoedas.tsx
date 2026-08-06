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
          directAnswer: "A conversão multiplica (ou divide, dependendo do sentido) o valor informado pela taxa de câmbio entre a moeda de origem e a de destino. Essa taxa é uma referência de mercado — o valor final numa operação real de câmbio costuma ser diferente por causa do spread cobrado pela instituição financeira.",
          howItWorks: "A ferramenta usa a taxa de câmbio de referência entre as duas moedas selecionadas para calcular o valor equivalente. É uma estimativa baseada em cotações de mercado, que variam continuamente ao longo do dia útil conforme a oferta e demanda no mercado internacional. É importante entender que essa cotação de referência (próxima da taxa PTAX, usada pelo Banco Central como parâmetro oficial) não é o valor que você efetivamente paga ou recebe numa operação real: bancos, corretoras e casas de câmbio aplicam um spread cambial — uma margem entre o preço de compra e o de venda da moeda — além de possíveis tarifas fixas por operação. Por isso, o valor mostrado aqui serve como referência para planejamento, não como cotação de fechamento de uma transação específica.",
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
          glossary: [
            { term: "Spread cambial", definition: "A diferença entre o preço de compra e o preço de venda de uma moeda, cobrada por bancos e casas de câmbio como margem da operação. É o motivo pelo qual o valor 'na prática' costuma ser pior do que a cotação de referência exibida em conversores." },
            { term: "PTAX", definition: "Taxa de câmbio de referência calculada e divulgada pelo Banco Central do Brasil, usada como parâmetro oficial em contratos e balanços, embora não seja necessariamente a taxa aplicada em operações de varejo." },
            { term: "Câmbio flutuante", definition: "Sistema em que o valor de uma moeda em relação a outra é definido pelo mercado (oferta e demanda), e não fixado por um governo — é o regime adotado pelo Brasil desde 1999." },
          ],
          faqs: [
            { question: "A cotação mostrada é a mesma que vou pagar no banco ou casa de câmbio?", answer: "Não necessariamente. É uma referência de mercado próxima da cotação oficial. Bancos, corretoras e casas de câmbio aplicam spread (margem entre compra e venda) e, às vezes, tarifas fixas — por isso o valor final de uma operação real costuma ser um pouco pior do que a cotação de referência." },
            { question: "Com que frequência a cotação muda?", answer: "As cotações de câmbio variam continuamente ao longo do dia útil, seguindo o mercado financeiro internacional, e ficam praticamente paradas nos fins de semana e feriados, quando os mercados estão fechados." },
            { question: "Posso converter qualquer par de moedas na ferramenta?", answer: "Sim, entre as principais moedas disponíveis na lista de seleção — as mais usadas em viagens e comércio internacional, como dólar, euro, libra e peso argentino." },
            { question: "Por que o preço de compra e o de venda de uma moeda são diferentes?", answer: "Instituições financeiras cobram uma margem (spread) entre o preço pelo qual compram e o preço pelo qual vendem a moeda estrangeira — é assim que remuneram o serviço de câmbio, além de eventuais tarifas adicionais." },
          ],
        }}
      />
    </ToolLayout>
  );
}
