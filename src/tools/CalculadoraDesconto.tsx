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
          directAnswer: "O preço com desconto é calculado subtraindo do valor original a porcentagem de desconto aplicada.",
          howItWorks: "A ferramenta calcula o valor final após aplicar uma porcentagem de desconto, e também de forma reversa: a partir do preço original e final, descobre a porcentagem aplicada. Fórmula: preço final = preço original × (1 − desconto/100).",
          example: {
            title: "Exemplo: produto de R$ 200 com 30% de desconto",
            steps: [
              "Preço original: R$ 200",
              "Desconto: 30%",
              "Valor do desconto: R$ 60",
              "Preço final: R$ 140",
            ],
            result: "Com 30% de desconto, o produto de R$ 200 sai por R$ 140, economia de R$ 60.",
          },
          faqs: [
            { question: "Como calcular o preço com desconto?", answer: "Multiplique o preço original pela porcentagem para achar o valor do desconto, depois subtraia do preço original." },
            { question: "Como descobrir a porcentagem aplicada?", answer: "Divida a diferença entre preço original e final pelo preço original, multiplique por 100." },
            { question: "Descontos sucessivos se somam diretamente?", answer: "Não, pois o segundo desconto incide sobre o valor já reduzido." },
            { question: "Como calcular o valor original a partir do preço com desconto?", answer: "Divida o preço final por (1 − desconto/100)." },
          ],
        }}
      />
    </ToolLayout>
  );
}
