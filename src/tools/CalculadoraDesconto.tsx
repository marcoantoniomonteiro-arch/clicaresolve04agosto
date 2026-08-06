import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import React, { useState, useMemo } from "react";



interface Props {
  onBack: () => void;
}

type Mode = "calcDiscount" | "findPercent";

export function CalculadoraDesconto({ onBack }: Props) {
  const [mode, setMode] = useState<Mode>("calcDiscount");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [finalPrice, setFinalPrice] = useState("");

  const result = useMemo(() => {
    if (mode === "calcDiscount") {
      const original = parseFloat(originalPrice.replace(",", ".")) || 0;
      const percent = parseFloat(discountPercent.replace(",", ".")) || 0;
      if (original <= 0) return null;
      const discountValue = original * (percent / 100);
      const final = original - discountValue;
      return {
        original,
        percent,
        discountValue,
        final,
      };
    } else {
      const original = parseFloat(originalPrice.replace(",", ".")) || 0;
      const final = parseFloat(finalPrice.replace(",", ".")) || 0;
      if (original <= 0) return null;
      const discountValue = original - final;
      const percent = original > 0 ? (discountValue / original) * 100 : 0;
      return {
        original,
        percent,
        discountValue,
        final,
      };
    }
  }, [mode, originalPrice, discountPercent, finalPrice]);

  return (
    <ToolLayout
      title="Calculadora de Desconto"
      emoji="🏷️"
      category="Financas"
      description="Calcule descontos ou descubra a porcentagem de desconto aplicada."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["calculadora financeira"]} label="calculadora financeira" />}
    
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setMode("calcDiscount")}
            className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
              mode === "calcDiscount"
                ? "bg-green-500/20 border-green-500/40 text-green-400"
                : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
            }`}
          >
            Calcular Desconto
          </button>
          <button
            onClick={() => setMode("findPercent")}
            className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
              mode === "findPercent"
                ? "bg-green-500/20 border-green-500/40 text-green-400"
                : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
            }`}
          >
            Descobrir Porcentagem
          </button>
        </div>

        <div className="space-y-3">
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Preco Original (R$)</span>
            <input
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
              placeholder="100.00"
              className="input-field"
            />
          </label>

          {mode === "calcDiscount" ? (
            <label className="block">
              <span className="text-sm text-gray-400 mb-1 block">Porcentagem de Desconto (%)</span>
              <input
                type="number"
                step="0.1"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
                placeholder="20"
                className="input-field"
              />
            </label>
          ) : (
            <label className="block">
              <span className="text-sm text-gray-400 mb-1 block">Preco Final (R$)</span>
              <input
                type="number"
                value={finalPrice}
                onChange={(e) => setFinalPrice(e.target.value)}
                placeholder="80.00"
                className="input-field"
              />
            </label>
          )}
        </div>

        {result && result.original > 0 && (
          <div className="space-y-3">
            <div className="p-5 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
              <p className="text-xs text-green-400 mb-1">Preco com Desconto</p>
              <p className="text-4xl font-black text-green-400">
                R$ {result.final.toFixed(2)}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-white/5 text-center">
                <p className="text-xs text-gray-400">Original</p>
                <p className="text-base font-bold text-white">R$ {result.original.toFixed(2)}</p>
              </div>
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-center">
                <p className="text-xs text-red-400">Desconto</p>
                <p className="text-base font-bold text-red-400">-{result.percent.toFixed(1)}%</p>
              </div>
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-center">
                <p className="text-xs text-red-400">Economia</p>
                <p className="text-base font-bold text-red-400">R$ {result.discountValue.toFixed(2)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToolContent
        toolName="Calculadora de Desconto"
        category="Finanças"
        data={{
          directAnswer: "O preço com desconto é calculado subtraindo do valor original a porcentagem de desconto aplicada: multiplique o preço original pela porcentagem (em decimal) para achar o valor descontado, e subtraia esse valor do preço original.",
          howItWorks: "A ferramenta calcula o valor final após aplicar uma porcentagem de desconto, usando a fórmula preço final = preço original × (1 − desconto/100). Ela também funciona no sentido inverso: se você já sabe o preço original e o preço final (por exemplo, viu numa etiqueta 'de R$ 200 por R$ 140'), a calculadora descobre qual foi a porcentagem de desconto realmente aplicada — útil para conferir se uma promoção é tão vantajosa quanto anunciada. Um ponto que costuma gerar confusão é quando há descontos sucessivos (ex: '20% + 10%'): eles não se somam para virar 30%, porque o segundo desconto incide sobre o valor já reduzido pelo primeiro, resultando em um desconto total um pouco menor do que a soma simples.",
          example: {
            title: "Exemplo: produto de R$ 200 com 30% de desconto",
            steps: [
              "Preço original: R$ 200",
              "Desconto: 30%",
              "Valor do desconto: R$ 200 × 0,30 = R$ 60",
              "Preço final: R$ 200 − R$ 60 = R$ 140",
            ],
            result: "Com 30% de desconto, o produto de R$ 200 sai por R$ 140, economia de R$ 60.",
          },
          faqs: [
            { question: "Como calcular o preço com desconto?", answer: "Multiplique o preço original pela porcentagem de desconto (em decimal, ex: 30% = 0,30) para achar o valor do desconto, depois subtraia esse valor do preço original. O resultado é o preço final." },
            { question: "Como descobrir a porcentagem de desconto que foi aplicada?", answer: "Subtraia o preço final do preço original, divida essa diferença pelo preço original e multiplique por 100. Isso é útil para conferir se um desconto anunciado bate com o valor real cobrado." },
            { question: "Descontos sucessivos (ex: 20% + 10%) se somam para 30%?", answer: "Não. O segundo desconto incide sobre o valor já reduzido pelo primeiro, não sobre o preço original. Exemplo: R$ 100 com 20% de desconto vira R$ 80; aplicando mais 10% sobre R$ 80, o preço final é R$ 72 — um desconto total de 28%, não 30%." },
            { question: "Como calcular o valor original a partir do preço com desconto?", answer: "Divida o preço final por (1 − desconto/100). Por exemplo, se um produto custa R$ 140 com 30% de desconto já aplicado, o preço original era R$ 140 ÷ 0,70 = R$ 200." },
          ],
        }}
      />
    </ToolLayout>
  );
}
