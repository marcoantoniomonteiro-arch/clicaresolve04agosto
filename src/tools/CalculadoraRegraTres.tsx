import React, { useState, useMemo } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";

interface Props {
  onBack: () => void;
}

export function CalculadoraRegraTres({ onBack }: Props) {
  const [type, setType] = useState<"direct" | "inverse">("direct");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");

  const { x, steps } = useMemo(() => {
    const aN = parseFloat(a);
    const bN = parseFloat(b);
    const cN = parseFloat(c);

    if (isNaN(aN) || isNaN(bN) || isNaN(cN) || aN === 0 || cN === 0) {
      return { x: null as number | null, steps: "" };
    }

    let result: number;
    let calc: string;
    if (type === "direct") {
      result = (bN * cN) / aN;
      calc = `X = (${bN} × ${cN}) / ${aN} = ${(bN * cN)} / ${aN} = ${result.toFixed(4).replace(/\.?0+$/, "")}`;
    } else {
      result = (aN * bN) / cN;
      calc = `X = (${aN} × ${bN}) / ${cN} = ${(aN * bN)} / ${cN} = ${result.toFixed(4).replace(/\.?0+$/, "")}`;
    }
    return { x: result, steps: calc };
  }, [a, b, c, type]);

  return (
    <ToolLayout
      title="Calculadora de Regra de Três"
      emoji="➗"
      category="Educação"
      description="Resolva problemas de proporcionalidade com regra de três simples, direta ou inversa."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["livro matemática"]} label="livro matemática" />}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setType("direct")}
            className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
              type === "direct"
                ? "bg-green-500/20 border-green-500/40 text-green-400"
                : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
            }`}
          >
            Direta (proporcional)
          </button>
          <button
            onClick={() => setType("inverse")}
            className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
              type === "inverse"
                ? "bg-green-500/20 border-green-500/40 text-green-400"
                : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
            }`}
          >
            Inversa
          </button>
        </div>

        <p className="text-sm text-gray-400 text-center">
          {type === "direct"
            ? "A está para B, assim como C está para X"
            : "A está para B, inversamente como C está para X"}
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <label className="block">
              <span className="text-sm text-gray-400 mb-1 block">A</span>
              <input type="number" value={a} onChange={(e) => setA(e.target.value)} placeholder="5" className="input-field" />
            </label>
            <label className="block">
              <span className="text-sm text-gray-400 mb-1 block">C</span>
              <input type="number" value={c} onChange={(e) => setC(e.target.value)} placeholder="8" className="input-field" />
            </label>
          </div>
          <div className="space-y-3">
            <label className="block">
              <span className="text-sm text-gray-400 mb-1 block">B</span>
              <input type="number" value={b} onChange={(e) => setB(e.target.value)} placeholder="50" className="input-field" />
            </label>
            <label className="block">
              <span className="text-sm text-gray-400 mb-1 block">X (resultado)</span>
              <div className="input-field bg-green-500/10 border-green-500/20 text-green-400 font-bold">
                {x !== null ? x.toFixed(2).replace(/\.?0+$/, "") : "—"}
              </div>
            </label>
          </div>
        </div>

        {steps && (
          <div className="p-3 rounded-xl bg-white/5 border border-white/10">
            <p className="text-xs text-gray-400 mb-1">Cálculo passo a passo</p>
            <p className="text-sm text-gray-300 font-mono">{steps}</p>
          </div>
        )}
      </div>

      <ToolContent
        toolName="Calculadora de Regra de Três"
        category="Educação"
        data={{
          directAnswer: "Na regra de três simples direta, multiplique os valores cruzados (B × C) e divida pelo valor restante (A) para encontrar o valor desconhecido X.",
          howItWorks: "A regra de três é usada para resolver problemas de proporcionalidade entre duas grandezas. Na regra de três DIRETA (quando as grandezas aumentam ou diminuem juntas, como preço e quantidade), a fórmula é X = (B × C) / A. Na regra de três INVERSA (quando uma grandeza aumenta enquanto a outra diminui, como velocidade e tempo de viagem), a fórmula é X = (A × B) / C. A ferramenta identifica qual tipo foi selecionado e aplica a fórmula correspondente automaticamente.",
          example: {
            title: "Exemplo: se 5 metros de tecido custam R$ 50, quanto custam 8 metros?",
            steps: [
              `A = 5 (metros), B = R$ 50 (preço)`,
              `C = 8 (metros, o que queremos comparar)`,
              `Tipo: Direta (mais metros = mais preço)`,
              `X = (50 × 8) / 5 = R$ 80`,
            ],
            result: "8 metros do mesmo tecido custam R$ 80, mantendo a mesma proporção de preço por metro.",
          },
          faqs: [
            { question: "Qual a diferença entre regra de três direta e inversa?", answer: "Na direta, as grandezas crescem juntas (mais produto = mais preço). Na inversa, uma cresce enquanto a outra diminui (mais velocidade = menos tempo de viagem)." },
            { question: "Como sei qual tipo usar no meu problema?", answer: "Pense se as duas grandezas aumentam juntas (direta) ou se uma aumenta enquanto a outra diminui (inversa) - isso define a fórmula correta." },
            { question: "A regra de três funciona só com 2 grandezas?", answer: "A regra de três simples funciona com 2 grandezas. Para problemas com 3 ou mais grandezas relacionadas, é necessária a regra de três composta." },
            { question: "Onde a regra de três é mais usada no dia a dia?", answer: "É usada em cálculos de receitas culinárias, conversão de unidades, cálculos de velocidade/tempo/distância, e problemas de proporção em geral." },
          ],
        }}
      />
    </ToolLayout>
  );
}
