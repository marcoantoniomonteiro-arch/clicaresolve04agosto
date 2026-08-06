import React, { useState, useMemo } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";

interface Props {
  onBack: () => void;
}

interface Parcela {
  numero: number;
  valor: number;
  juros: number;
  amortizacao: number;
  saldo: number;
}

function calcularPrice(pv: number, i: number, n: number): Parcela[] {
  const pmt = pv * (i * Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
  const parcelas: Parcela[] = [];
  let saldo = pv;
  for (let m = 1; m <= n; m++) {
    const juros = saldo * i;
    const amortizacao = pmt - juros;
    saldo -= amortizacao;
    parcelas.push({ numero: m, valor: pmt, juros, amortizacao, saldo: Math.max(0, saldo) });
  }
  return parcelas;
}

function calcularSAC(pv: number, i: number, n: number): Parcela[] {
  const amortizacaoConstante = pv / n;
  const parcelas: Parcela[] = [];
  let saldo = pv;
  for (let m = 1; m <= n; m++) {
    const juros = saldo * i;
    const valor = amortizacaoConstante + juros;
    saldo -= amortizacaoConstante;
    parcelas.push({ numero: m, valor, juros, amortizacao: amortizacaoConstante, saldo: Math.max(0, saldo) });
  }
  return parcelas;
}

const fmt = (v: number) => v.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function SimuladorFinanciamento({ onBack }: Props) {
  const [valor, setValor] = useState("");
  const [taxa, setTaxa] = useState("");
  const [parcelas, setParcelas] = useState("");
  const [sistema, setSistema] = useState<"price" | "sac">("price");

  const resultado = useMemo(() => {
    const pv = parseFloat(valor.replace(",", ".")) || 0;
    const i = (parseFloat(taxa.replace(",", ".")) || 0) / 100;
    const n = parseInt(parcelas) || 0;

    if (pv <= 0 || i <= 0 || n <= 0) return null;

    const calcPrice = calcularPrice(pv, i, n);
    const calcSAC = calcularSAC(pv, i, n);

    const totalPagoPrice = calcPrice.reduce((acc, p) => acc + p.valor, 0);
    const totalJurosPrice = calcPrice.reduce((acc, p) => acc + p.juros, 0);
    const totalPagoSAC = calcSAC.reduce((acc, p) => acc + p.valor, 0);
    const totalJurosSAC = calcSAC.reduce((acc, p) => acc + p.juros, 0);

    const parcelasExibidas = (sistema === "price" ? calcPrice : calcSAC).slice(0, 12);

    return {
      parcelasExibidas,
      totalPagoPrice,
      totalJurosPrice,
      totalPagoSAC,
      totalJurosSAC,
      primeiraPrice: calcPrice[0]?.valor ?? 0,
      primeiraSAC: calcSAC[0]?.valor ?? 0,
      ultimaSAC: calcSAC[n - 1]?.valor ?? 0,
      totalParcelas: n,
    };
  }, [valor, taxa, parcelas, sistema]);

  return (
    <ToolLayout
      title="Simulador de Financiamento"
      emoji="🏦"
      category="Finanças"
      description="Simule financiamentos com Tabela Price ou SAC e compare os totais."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["planejamento financeiro"]} label="planejamento financeiro" />}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setSistema("price")}
            className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
              sistema === "price"
                ? "bg-green-500/20 border-green-500/40 text-green-400"
                : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
            }`}
          >
            Tabela Price
          </button>
          <button
            onClick={() => setSistema("sac")}
            className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
              sistema === "sac"
                ? "bg-green-500/20 border-green-500/40 text-green-400"
                : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
            }`}
          >
            Tabela SAC
          </button>
        </div>

        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Valor financiado (R$)</span>
          <input type="number" value={valor} onChange={(e) => setValor(e.target.value)} placeholder="Ex: 50000" className="input-field" />
        </label>
        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Taxa de juros mensal (%)</span>
          <input type="number" step="0.01" value={taxa} onChange={(e) => setTaxa(e.target.value)} placeholder="Ex: 1.5" className="input-field" />
        </label>
        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Número de parcelas</span>
          <input type="number" value={parcelas} onChange={(e) => setParcelas(e.target.value)} placeholder="Ex: 24" className="input-field" />
        </label>

        {resultado && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
                <p className="text-xs text-green-400">Total pago (Price)</p>
                <p className="text-lg font-bold text-white">R$ {fmt(resultado.totalPagoPrice)}</p>
                <p className="text-xs text-gray-500 mt-1">Juros: R$ {fmt(resultado.totalJurosPrice)}</p>
              </div>
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
                <p className="text-xs text-blue-400">Total pago (SAC)</p>
                <p className="text-lg font-bold text-white">R$ {fmt(resultado.totalPagoSAC)}</p>
                <p className="text-xs text-gray-500 mt-1">Juros: R$ {fmt(resultado.totalJurosSAC)}</p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <p className="text-xs text-gray-400">
                Diferença de juros (Price - SAC): <span className="font-bold text-amber-400">R$ {fmt(resultado.totalJurosPrice - resultado.totalJurosSAC)}</span>
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white mb-2">
                Parcelas ({sistema === "price" ? "Price" : "SAC"}) — {Math.min(12, resultado.totalParcelas)} de {resultado.totalParcelas}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-gray-400 border-b border-white/10">
                      <th className="text-left py-2 px-1">#</th>
                      <th className="text-right py-2 px-1">Parcela</th>
                      <th className="text-right py-2 px-1">Juros</th>
                      <th className="text-right py-2 px-1">Amort.</th>
                      <th className="text-right py-2 px-1">Saldo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resultado.parcelasExibidas.map((p) => (
                      <tr key={p.numero} className="border-b border-white/5">
                        <td className="text-left py-1.5 px-1 text-gray-500">{p.numero}</td>
                        <td className="text-right py-1.5 px-1 text-white font-medium">R$ {fmt(p.valor)}</td>
                        <td className="text-right py-1.5 px-1 text-red-400">R$ {fmt(p.juros)}</td>
                        <td className="text-right py-1.5 px-1 text-green-400">R$ {fmt(p.amortizacao)}</td>
                        <td className="text-right py-1.5 px-1 text-gray-400">R$ {fmt(p.saldo)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      <ToolContent
        toolName="Simulador de Financiamento"
        category="Finanças"
        data={{
          directAnswer: "Na Tabela Price as parcelas são fixas do início ao fim; na Tabela SAC as parcelas começam mais altas e vão diminuindo ao longo do financiamento, mas o total de juros pagos costuma ser menor na SAC.",
          howItWorks: "Na Tabela Price, o valor da parcela é calculado para ser sempre o mesmo, usando a fórmula de amortização francesa - no início, a maior parte da parcela é juros, e ao final, a maior parte é amortização do valor financiado. Na Tabela SAC, a amortização (parte que reduz a dívida) é sempre igual em todas as parcelas, e os juros são calculados sobre o saldo devedor restante - como o saldo diminui a cada mês, os juros também diminuem, fazendo a parcela total cair progressivamente. Por isso a SAC começa com parcela mais alta que a Price, mas termina mais barata, e no total costuma gerar menos juros pagos.",
          example: {
            title: "Exemplo: financiamento de R$ 50.000 em 24 meses, 1,5% ao mês",
            steps: [
              `Valor financiado: R$ 50.000`,
              `Taxa: 1,5% ao mês`,
              `Parcelas: 24`,
              `Tabela Price: parcela fixa de aproximadamente R$ 2.495,50 (mesma em todos os meses)`,
              `Tabela SAC: primeira parcela de aproximadamente R$ 2.833,33, diminuindo a cada mês até cerca de R$ 2.104,71 na última`,
            ],
            result: "A SAC começa mais cara mas termina mais barata, e no total gera menos juros pagos que a Price.",
          },
          faqs: [
            { question: "Qual sistema é mais barato no total, Price ou SAC?", answer: "Geralmente a SAC resulta em menos juros pagos no total, porque a dívida é reduzida mais rapidamente no início. A Price tem a vantagem de parcelas previsíveis e iguais." },
            { question: "Por que a parcela da SAC diminui ao longo do tempo?", answer: "Porque a amortização (parte que quita a dívida) é sempre igual, mas os juros incidem sobre o saldo devedor, que vai diminuindo mês a mês." },
            { question: "Qual sistema os bancos costumam usar no financiamento imobiliário?", answer: "Ambos são usados, mas a SAC é mais comum em financiamentos habitacionais no Brasil, enquanto a Price é mais comum em financiamento de veículos." },
            { question: "Simulação garante o valor real do meu financiamento?", answer: "Não, é uma simulação baseada nos dados informados. O valor real depende de condições específicas do banco, seguros obrigatórios, taxas administrativas e sua análise de crédito." },
          ],
        }}
      />
    </ToolLayout>
  );
}
