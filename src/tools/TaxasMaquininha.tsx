import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import React, { useState, useMemo } from "react";


import { CreditCard, DollarSign, Calendar } from "lucide-react";

interface Props {
  onBack: () => void;
}

type Bandeira = "visa" | "mastercard" | "elo" | "amex" | "hiper";
type Modalidade = "debito" | "credito_vista" | "2x" | "3x" | "4x" | "5x" | "6x" | "7x" | "8x" | "9x" | "10x" | "11x" | "12x";

const MODALIDADES: { value: Modalidade; label: string }[] = [
  { value: "debito", label: "Debito" },
  { value: "credito_vista", label: "Credito a vista" },
  { value: "2x", label: "2x sem juros" },
  { value: "3x", label: "3x sem juros" },
  { value: "4x", label: "4x sem juros" },
  { value: "5x", label: "5x sem juros" },
  { value: "6x", label: "6x sem juros" },
  { value: "7x", label: "7x" },
  { value: "8x", label: "8x" },
  { value: "9x", label: "9x" },
  { value: "10x", label: "10x" },
  { value: "11x", label: "11x" },
  { value: "12x", label: "12x" },
];

const DEFAULT_TAXES: Record<Modalidade, number> = {
  debito: 1.5,
  credito_vista: 2.5,
  "2x": 3.0,
  "3x": 3.2,
  "4x": 3.4,
  "5x": 3.5,
  "6x": 3.5,
  "7x": 4.0,
  "8x": 4.2,
  "9x": 4.3,
  "10x": 4.4,
  "11x": 4.5,
  "12x": 4.5,
};

export function TaxasMaquininha({ onBack }: Props) {
  const [valor, setValor] = useState("");
  const [bandeira, setBandeira] = useState<Bandeira>("visa");
  const [modalidade, setModalidade] = useState<Modalidade>("credito_vista");
  const [taxas, setTaxas] = useState<Record<Modalidade, number>>(DEFAULT_TAXES);
  const [showEdit, setShowEdit] = useState(false);

  const result = useMemo(() => {
    const v = parseFloat(valor.replace(",", ".")) || 0;
    const taxa = taxas[modalidade] || 0;
    const taxaValor = v * (taxa / 100);
    const liquido = v - taxaValor;

    const parcelas = modalidade === "debito" || modalidade === "credito_vista"
      ? 1
      : parseInt(modalidade.replace("x", "")) || 1;

    const valorParcela = liquido / parcelas;
    const diasRecebimento = modalidade === "debito" ? 1 : 30;

    return { valor: v, taxa, taxaValor, liquido, parcelas, valorParcela, diasRecebimento };
  }, [valor, modalidade, taxas]);

  const updateTaxa = (mod: Modalidade, value: string) => {
    const num = parseFloat(value) || 0;
    setTaxas((prev) => ({ ...prev, [mod]: num }));
  };

  return (
    <ToolLayout
      title="Taxas de Maquininha"
      emoji="💳"
      category="Financas"
      description="Calcule o valor liquido das vendas com cartao considerando taxas."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["maquininha cartão"]} label="maquininha cartão" />}
    
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Valor da Venda (R$)</span>
            <input
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="100.00"
              className="input-field"
            />
          </label>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Bandeira</span>
            <select
              value={bandeira}
              onChange={(e) => setBandeira(e.target.value as Bandeira)}
              className="input-field"
            >
              <option value="visa">Visa</option>
              <option value="mastercard">Mastercard</option>
              <option value="elo">Elo</option>
              <option value="amex">American Express</option>
              <option value="hiper">Hipercard</option>
            </select>
          </label>
        </div>

        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Modalidade</span>
          <select
            value={modalidade}
            onChange={(e) => setModalidade(e.target.value as Modalidade)}
            className="input-field"
          >
            {MODALIDADES.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
        </label>

        <button
          onClick={() => setShowEdit((s) => !s)}
          className="w-full text-sm text-gray-400 hover:text-white text-center underline"
        >
          {showEdit ? "Ocultar edicao de taxas" : "Editar taxas manualmente"}
        </button>

        {showEdit && (
          <div className="p-4 rounded-xl bg-white/5 border border-white/8 space-y-2 max-h-64 overflow-y-auto">
            <p className="text-xs text-gray-400 mb-2">Taxas por modalidade (%)</p>
            {MODALIDADES.map((m) => (
              <div key={m.value} className="flex items-center gap-3">
                <span className="text-xs text-gray-500 w-24">{m.label}</span>
                <input
                  type="number"
                  step="0.1"
                  value={taxas[m.value]}
                  onChange={(e) => updateTaxa(m.value, e.target.value)}
                  className="input-field flex-1"
                />
                <span className="text-xs text-gray-500">%</span>
              </div>
            ))}
          </div>
        )}

        {result.valor > 0 && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-white/5 text-center">
                <CreditCard className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                <p className="text-xs text-gray-400">Taxa</p>
                <p className="text-lg font-bold text-red-400">{result.taxa}%</p>
              </div>
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-center">
                <DollarSign className="w-5 h-5 text-red-400 mx-auto mb-1" />
                <p className="text-xs text-red-400">Valor da Taxa</p>
                <p className="text-lg font-bold text-red-400">R$ {result.taxaValor.toFixed(2)}</p>
              </div>
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
                <DollarSign className="w-5 h-5 text-green-400 mx-auto mb-1" />
                <p className="text-xs text-green-400">Voce Recebe</p>
                <p className="text-lg font-bold text-green-400">R$ {result.liquido.toFixed(2)}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">Recebimento</span>
                </div>
                <span className="text-sm font-semibold text-white">
                  {result.diasRecebimento === 1 ? "1 dia util" : `${result.diasRecebimento} dias`}
                </span>
              </div>
              {result.parcelas > 1 && (
                <p className="text-xs text-gray-500 mt-2">
                  {result.parcelas}x de R$ {result.valorParcela.toFixed(2)} (liquido por parcela)
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      <ToolContent
        toolName="Taxas de Maquininha"
        category="Finanças"
        data={{
          directAnswer: "A taxa da maquininha é descontada sobre o valor total da venda antes de cair na sua conta. Uma venda de R$ 100 com taxa de 3,4% (parcelado em 4x) resulta em R$ 96,60 líquidos, divididos entre as parcelas.",
          howItWorks: "As operadoras de cartão (adquirentes) cobram uma taxa percentual sobre cada venda, conhecida como MDR (Merchant Discount Rate ou Taxa de Desconto do Lojista). Essa taxa varia conforme a modalidade: débito costuma ter a menor taxa e recebimento em 1 dia útil; crédito à vista tem taxa intermediária; e crédito parcelado tem taxa crescente conforme o número de parcelas, já que a operadora antecipa o recebimento e assume mais risco. A calculadora aplica a taxa da modalidade escolhida sobre o valor da venda, mostra quanto foi descontado e quanto efetivamente cai na sua conta, além do valor líquido de cada parcela quando aplicável. As taxas padrão exibidas são valores de referência de mercado — cada maquininha (Stone, Cielo, PagSeguro, InfinitePay, Mercado Pago, etc.) pratica taxas próprias, por isso a ferramenta permite editar manualmente cada percentual para refletir seu contrato real.",
          example: {
            title: "Exemplo: venda de R$ 200 em crédito 3x sem juros",
            steps: [
              "Valor da venda: R$ 200,00",
              "Modalidade: 3x sem juros (taxa de referência: 3,2%)",
              "Taxa descontada: R$ 200 × 3,2% = R$ 6,40",
              "Valor líquido total: R$ 200 − R$ 6,40 = R$ 193,60",
            ],
            result: "Você recebe R$ 193,60 líquidos, divididos em 3 parcelas de aproximadamente R$ 64,53 cada",
          },
          glossary: [
            { term: "MDR (Merchant Discount Rate)", definition: "É o nome técnico da taxa que a adquirente (operadora da maquininha) cobra sobre cada transação com cartão. Também chamada de 'taxa de desconto do lojista'." },
            { term: "Adquirente", definition: "Empresa responsável por processar os pagamentos com cartão entre o cliente, a bandeira (Visa, Mastercard, etc.) e o lojista. Exemplos: Stone, Cielo, Rede, PagSeguro, GetNet." },
            { term: "Antecipação de recebíveis", definition: "Serviço oferecido pelas adquirentes para receber o valor das vendas parceladas de forma imediata, em vez de esperar o prazo normal (geralmente 30 dias por parcela). Costuma ter um custo adicional." },
            { term: "Taxa por bandeira", definition: "Algumas adquirentes cobram taxas diferentes conforme a bandeira do cartão (Visa, Mastercard, Elo, Amex costuma ser mais cara). Vale conferir seu contrato." },
          ],
          faqs: [
            { question: "Por que o crédito parcelado tem taxa maior que o débito?", answer: "Porque no parcelado a adquirente antecipa o valor total ao lojista e assume o risco de inadimplência do cliente ao longo dos meses, além do custo de oportunidade do dinheiro parado. No débito, o valor é confirmado e descontado quase imediatamente." },
            { question: "Essas taxas são iguais em todas as maquininhas?", answer: "Não. Cada adquirente (Stone, Cielo, PagSeguro, InfinitePay, Mercado Pago, GetNet, etc.) define suas próprias taxas, que também variam conforme seu volume de vendas e o tipo de plano contratado. Use o botão 'Editar taxas manualmente' para simular com os valores reais do seu contrato." },
            { question: "O cliente paga taxa quando parcela no cartão?", answer: "Depende do lojista. Em 'parcelamento sem juros', quem absorve o custo da taxa é o estabelecimento (é isso que esta calculadora simula). Alguns lojistas repassam esse custo ao cliente via 'parcelamento com juros'." },
            { question: "Quanto tempo demora para o dinheiro cair na conta?", answer: "Débito costuma cair em 1 dia útil. Crédito à vista e parcelado geralmente levam cerca de 30 dias por parcela, salvo se você contratar antecipação de recebíveis (com custo adicional) para receber antes." },
          ],
        }}
      />
    </ToolLayout>
  );
}
