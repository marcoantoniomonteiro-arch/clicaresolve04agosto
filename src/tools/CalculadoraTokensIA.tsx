import React, { useState, useMemo } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { AlertTriangle } from "lucide-react";

interface Props {
  onBack: () => void;
}

interface ModelPricing {
  name: string;
  input: number;
  output: number;
  approximate?: boolean;
}

const MODELS: ModelPricing[] = [
  { name: "Claude Sonnet 5", input: 2.0, output: 10.0 },
  { name: "Claude Opus 4.5", input: 5.0, output: 25.0 },
  { name: "Claude Haiku 4.5", input: 1.0, output: 5.0 },
  { name: "GPT-4o (OpenAI)", input: 2.5, output: 10.0, approximate: true },
  { name: "GPT-4o-mini (OpenAI)", input: 0.15, output: 0.6, approximate: true },
];

export function CalculadoraTokensIA({ onBack }: Props) {
  const [text, setText] = useState("");

  const stats = useMemo(() => {
    const chars = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const tokens = Math.ceil(chars / 4);
    return { chars, words, tokens };
  }, [text]);

  const formatCost = (cost: number): string => {
    if (cost === 0) return "$0.00";
    if (cost < 0.0001) return cost.toExponential(2);
    return `$${cost.toFixed(6)}`;
  };

  return (
    <ToolLayout
      title="Calculadora de Tokens de IA"
      emoji="🤖"
      category="Utilidades"
      description="Estime quantos tokens seu texto consome e o custo aproximado nos principais modelos de IA."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["tokens ia"]} label="tokens ia" />}
    >
      <div className="space-y-4">
        <div>
          <span className="text-sm text-gray-400 mb-1 block">Cole seu prompt ou texto aqui</span>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="input-field text-sm w-full min-h-[200px] resize-y"
            placeholder="Cole aqui o texto que pretende enviar para um modelo de IA..."
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
            <p className="text-2xl font-bold text-white">{stats.chars.toLocaleString("pt-BR")}</p>
            <p className="text-xs text-gray-500 mt-1">Caracteres</p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
            <p className="text-2xl font-bold text-white">{stats.words.toLocaleString("pt-BR")}</p>
            <p className="text-xs text-gray-500 mt-1">Palavras</p>
          </div>
          <div className="p-4 rounded-xl bg-green-400/10 border border-green-400/20 text-center">
            <p className="text-2xl font-bold text-green-400">{stats.tokens.toLocaleString("pt-BR")}</p>
            <p className="text-xs text-gray-500 mt-1">Tokens estimados</p>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-blue-400/5 border border-blue-400/10">
          <p className="text-xs text-blue-400 leading-relaxed">
            Estimativa baseada na heurística padrão da indústria: <strong>1 token ≈ 4 caracteres</strong>. Em português, o valor real pode variar um pouco, pois a tokenização exata depende do modelo específico.
          </p>
        </div>

        {stats.tokens > 0 && (
          <div>
            <h3 className="text-sm font-bold text-white mb-3">Custo estimado por envio (input)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-2 px-2 text-xs font-semibold text-gray-400">Modelo</th>
                    <th className="text-right py-2 px-2 text-xs font-semibold text-gray-400">Input / 1M</th>
                    <th className="text-right py-2 px-2 text-xs font-semibold text-gray-400">Output / 1M</th>
                    <th className="text-right py-2 px-2 text-xs font-semibold text-gray-400">Custo estimado</th>
                  </tr>
                </thead>
                <tbody>
                  {MODELS.map((model) => {
                    const cost = (stats.tokens / 1_000_000) * model.input;
                    return (
                      <tr key={model.name} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-2.5 px-2">
                          <span className="text-white font-medium">{model.name}</span>
                          {model.approximate && (
                            <span className="text-[10px] text-yellow-400 ml-1">aprox.</span>
                          )}
                        </td>
                        <td className="text-right py-2.5 px-2 text-gray-400">${model.input.toFixed(2)}</td>
                        <td className="text-right py-2.5 px-2 text-gray-400">${model.output.toFixed(2)}</td>
                        <td className="text-right py-2.5 px-2 text-green-400 font-semibold">{formatCost(cost)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Custo calculado para enviar o texto uma vez. O custo de output depende da resposta gerada pela IA.
            </p>
          </div>
        )}

        <div className="p-4 rounded-xl bg-yellow-400/10 border border-yellow-400/20">
          <p className="text-xs text-yellow-400 leading-relaxed flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              <strong>Estimativa aproximada.</strong> A contagem real de tokens varia por modelo e idioma. Preços de IA mudam com frequência — confirme sempre os valores atualizados no site oficial de cada provedor antes de qualquer decisão de custo.
            </span>
          </p>
        </div>
      </div>

      <ToolContent
        toolName="Tokens de IA"
        category="Utilidades"
        data={{
          directAnswer: "Um token é a unidade básica que modelos de IA usam para processar texto — em média, 1 token equivale a aproximadamente 4 caracteres em inglês (em português pode variar um pouco).",
          howItWorks: "Modelos de inteligência artificial como ChatGPT e Claude não processam texto por palavra ou caractere, mas sim por 'tokens', pequenos pedaços de texto que podem ser uma palavra inteira, parte de uma palavra, ou até um único caractere, dependendo do idioma e do modelo. A ferramenta estima o número de tokens do seu texto usando a aproximação padrão da indústria (cerca de 4 caracteres por token), e calcula o custo estimado de enviar aquele texto para os principais modelos de IA disponíveis atualmente, usando as tabelas de preço oficiais. Essa estimativa é útil para quem usa APIs de IA e quer ter noção prévia do custo antes de enviar grandes volumes de texto.",
          example: {
            title: "Exemplo: estimando o custo de um prompt de 2000 caracteres",
            steps: [
              "Texto colado: 2000 caracteres (aproximadamente 350 palavras)",
              "Tokens estimados: 2000 / 4 = 500 tokens",
              "Custo estimado no Claude Sonnet 5 (input): 500 / 1.000.000 × $2,00 = $0,001",
              "Custo estimado no GPT-4o-mini (input): 500 / 1.000.000 × $0,15 = $0,000075",
            ],
            result: "Prompts individuais custam frações muito pequenas de centavo — o custo se torna relevante principalmente em uso em grande volume ou automatizado.",
          },
          faqs: [
            { question: "A contagem de tokens é exata?", answer: "Não, é uma estimativa baseada na aproximação padrão da indústria (4 caracteres por token). A contagem exata depende do tokenizador específico de cada modelo e pode variar, especialmente em português e outros idiomas não-ingleses." },
            { question: "Por que economizar tokens é importante?", answer: "Menos tokens significa processamento mais rápido, menor custo em APIs pagas, e em alguns casos evita ultrapassar o limite de contexto de um modelo." },
            { question: "Os preços mostrados estão sempre atualizados?", answer: "Os preços dos modelos Claude são baseados em dados oficiais atuais. Preços de outros provedores (como OpenAI) são aproximados e podem ter mudado — sempre confirme no site oficial antes de decisões de custo importantes." },
            { question: "Meu texto é enviado para algum servidor?", answer: "Não, toda a estimativa é calculada localmente no seu navegador, sem enviar seu texto a nenhuma IA ou servidor externo." },
          ],
        }}
      />
    </ToolLayout>
  );
}
