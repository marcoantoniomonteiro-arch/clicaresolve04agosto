import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import React, { useState, useMemo } from "react";


import { Percent, TrendingUp, TrendingDown, Minus, ArrowRight } from "lucide-react";

interface Props {
  onBack: () => void;
}

type Modo = "percentoDe" | "qualPercento" | "variacao" | "aumentarDiminuir";

export function PorcentagemReversa({ onBack }: Props) {
  const [modo, setModo] = useState<Modo>("percentoDe");
  const [valor1, setValor1] = useState("");
  const [valor2, setValor2] = useState("");

  const resultado = useMemo(() => {
    const x = parseFloat(valor1.replace(",", ".")) || 0;
    const y = parseFloat(valor2.replace(",", ".")) || 0;

    switch (modo) {
      case "percentoDe":
        return {
          formula: `${x}% de ${y}`,
          resultado: (x / 100) * y,
        };
      case "qualPercento":
        if (y === 0) return null;
        return {
          formula: `${x} é qual % de ${y}`,
          resultado: (x / y) * 100,
          sufixo: "%",
        };
      case "variacao":
        if (y === 0) return null;
        const variacao = ((x - y) / y) * 100;
        return {
          formula: `Variação de ${y} para ${x}`,
          resultado: variacao,
          sufixo: "%",
          sinal: variacao >= 0 ? "+" : "",
        };
      case "aumentarDiminuir":
        return {
          formula: `${y > 0 ? "Aumentar" : "Diminuir"} ${Math.abs(x)}% de ${y}`,
          resultado: y > 0 ? y * (1 + x / 100) : y * (1 - Math.abs(x) / 100),
        };
      default:
        return null;
    }
  }, [modo, valor1, valor2]);

  const MODO_CONFIG: Record<Modo, { label: string; placeholder1: string; placeholder2: string }> = {
    percentoDe: {
      label: "X% de Y",
      placeholder1: "Percentual (X)",
      placeholder2: "Valor total (Y)",
    },
    qualPercento: {
      label: "X é qual % de Y",
      placeholder1: "Valor parcial (X)",
      placeholder2: "Valor total (Y)",
    },
    variacao: {
      label: "Variação % de X a Y",
      placeholder1: "Valor final (X)",
      placeholder2: "Valor inicial (Y)",
    },
    aumentarDiminuir: {
      label: "Aumentar/Diminuir X em Y%",
      placeholder1: "Percentual (use negativo para diminuir)",
      placeholder2: "Valor base",
    },
  };

  const config = MODO_CONFIG[modo];

  return (
    <ToolLayout
      title="Porcentagem Reversa"
      emoji="%"
      category="Financas"
      description="4 modos de calculo de porcentagem em uma so ferramenta."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["calculadora de bolso"]} label="calculadora de bolso" />}
    
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(MODO_CONFIG).map(([key, cfg]) => (
            <button
              key={key}
              onClick={() => setModo(key as Modo)}
              className={`p-2 rounded-lg text-xs font-semibold transition-all text-center ${
                modo === key
                  ? "bg-green-500 text-black"
                  : "bg-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {cfg.label}
            </button>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/8">
          <p className="text-xs text-gray-400 mb-3">{config.label}</p>
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs text-gray-500 mb-1 block">{config.placeholder1}</span>
              <input
                type="number"
                step="any"
                value={valor1}
                onChange={(e) => setValor1(e.target.value)}
                placeholder="0"
                className="input-field"
              />
            </label>
            <label className="block">
              <span className="text-xs text-gray-500 mb-1 block">{config.placeholder2}</span>
              <input
                type="number"
                step="any"
                value={valor2}
                onChange={(e) => setValor2(e.target.value)}
                placeholder="0"
                className="input-field"
              />
            </label>
          </div>
        </div>

        {resultado && (
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                {modo === "variacao" ? (
                  resultado.resultado >= 0 ? (
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-400" />
                  )
                ) : (
                  <Percent className="w-5 h-5 text-green-400" />
                )}
                <p className="text-xs text-green-400">Resultado</p>
              </div>
              <p className="text-4xl font-black text-white">
                {resultado.sinal || ""}
                {resultado.resultado.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}
                {resultado.sufixo || ""}
              </p>
              <p className="text-xs text-gray-400 mt-2">{resultado.formula}</p>
            </div>

            {modo === "variacao" && (
              <div className="p-3 rounded-lg bg-white/5 text-center text-xs">
                <ArrowRight className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                {resultado.resultado >= 0 ? "Aumento" : "Reducao"} de{" "}
                {Math.abs(resultado.resultado).toFixed(2)}%
              </div>
            )}
          </div>
        )}
      </div>
      <ToolContent
        toolName="Porcentagem Reversa"
        category="Finanças"
        data={{
          directAnswer: "Para calcular quanto é X% de um valor, multiplique o valor pela porcentagem e divida por 100.",
          howItWorks: "A ferramenta calcula porcentagens de diferentes formas: quanto é X% de um valor, que porcentagem um número representa de outro, e o cálculo reverso (a partir de um resultado, descobrir o valor original). Fórmula base: (valor × porcentagem) / 100.",
          example: {
            title: "Exemplo: quanto é 15% de R$ 350?",
            steps: [
              "Valor: R$ 350",
              "Porcentagem: 15%",
              "Cálculo: 350 × 15 / 100",
              "Resultado: R$ 52,50",
            ],
            result: "15% de R$ 350 é igual a R$ 52,50.",
          },
          faqs: [
            { question: "Como calcular porcentagem de um valor?", answer: "Multiplique o valor pela porcentagem e divida por 100." },
            { question: "Como calcular a porcentagem reversa?", answer: "Divida o resultado conhecido pela porcentagem em decimal." },
            { question: "Como saber quanto um número representa de outro em %?", answer: "Divida o menor pelo maior e multiplique por 100." },
            { question: "Qual a diferença entre desconto e porcentagem simples?", answer: "O desconto subtrai a porcentagem do valor original; a porcentagem simples só encontra a fração do valor." },
          ],
        }}
      />
    </ToolLayout>
  );
}
