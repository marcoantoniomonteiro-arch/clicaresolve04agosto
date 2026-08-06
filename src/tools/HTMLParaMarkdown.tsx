import React, { useState, useMemo } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { Copy, FileCode, ArrowRightLeft, Sparkles } from "lucide-react";
import TurndownService from "turndown";

interface Props {
  onBack: () => void;
}

export function HTMLParaMarkdown({ onBack }: Props) {
  const [html, setHtml] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const htmlChars = html.length;
  const mdChars = markdown.length;
  const reduction = htmlChars > 0 && mdChars > 0 ? Math.round((1 - mdChars / htmlChars) * 100) : 0;

  const handleConvert = () => {
    if (!html.trim()) {
      setError("Cole algum HTML para converter.");
      setMarkdown("");
      return;
    }
    setError("");
    try {
      const turndownService = new TurndownService({ headingStyle: "atx" });
      const result = turndownService.turndown(html);
      setMarkdown(result);
    } catch {
      setError("Não foi possível converter o HTML informado. Verifique se o código está correto.");
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sampleHtml = useMemo(() => `<h1>Título</h1>\n<p>Este é um <strong>texto</strong> de exemplo.</p>`, []);

  return (
    <ToolLayout
      title="HTML para Markdown"
      emoji="📝"
      category="Utilidades"
      description="Converta HTML para Markdown, reduzindo o tamanho do texto para economizar tokens ao usar IA."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["html para markdown"]} label="html para markdown" />}
    >
      <div className="space-y-4">
        <div>
          <span className="text-sm text-gray-400 mb-1 block">Cole o HTML aqui</span>
          <textarea
            value={html}
            onChange={(e) => setHtml(e.target.value)}
            className="input-field text-sm font-mono w-full min-h-[200px] resize-y"
            placeholder="<h1>Título</h1>&#10;<p>Este é um <strong>texto</strong> de exemplo.</p>"
          />
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs text-gray-500">{htmlChars} caracteres</p>
            <button
              onClick={() => setHtml(sampleHtml)}
              className="text-xs text-green-400 hover:text-green-300 transition-colors"
            >
              Usar exemplo
            </button>
          </div>
        </div>

        {error && <p className="text-sm text-red-400 text-center">{error}</p>}

        <button
          onClick={handleConvert}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          <ArrowRightLeft className="w-5 h-5" />
          Converter para Markdown
        </button>

        {markdown && (
          <>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-green-400/10 border border-green-400/20">
              <Sparkles className="w-4 h-4 text-green-400 shrink-0" />
              <p className="text-xs text-green-400">
                HTML: <strong>{htmlChars}</strong> caracteres → Markdown: <strong>{mdChars}</strong> caracteres
                {reduction > 0 && <> — <strong>{reduction}%</strong> menor</>}
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-400">Markdown resultante</span>
                <button
                  onClick={handleCopy}
                  className="text-xs text-green-400 hover:text-green-300 transition-colors flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copied ? "Copiado!" : "Copiar"}
                </button>
              </div>
              <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="input-field text-sm font-mono w-full min-h-[200px] resize-y"
                placeholder="O Markdown aparecerá aqui..."
              />
              <p className="text-xs text-gray-500 mt-1">{mdChars} caracteres</p>
            </div>

            <div className="p-3 rounded-xl bg-blue-400/10 border border-blue-400/20">
              <p className="text-xs text-blue-400 leading-relaxed">
                <FileCode className="w-4 h-4 inline mr-1 mb-0.5" />
                Markdown usa muito menos caracteres que HTML para o mesmo conteúdo, economizando tokens ao colar textos em ferramentas de IA como ChatGPT ou Claude.
              </p>
            </div>
          </>
        )}
      </div>

      <ToolContent
        toolName="HTML para Markdown"
        category="Utilidades"
        data={{
          directAnswer: "Converter HTML para Markdown remove toda a formatação complexa de tags HTML, mantendo apenas a estrutura essencial do texto (títulos, listas, negrito, links) em um formato muito mais compacto e legível.",
          howItWorks: "HTML usa muitas tags de marcação (como <div>, <span>, <p>, atributos de estilo) que ocupam bastante espaço mas não agregam significado ao conteúdo em si. A ferramenta processa o HTML colado e o converte para Markdown, um formato de texto simples que representa a mesma estrutura (títulos com #, negrito com **, listas com -, etc.) usando muito menos caracteres. Isso é especialmente útil ao colar conteúdo de páginas web em ferramentas de inteligência artificial como ChatGPT ou Claude, já que menos caracteres geralmente significam menos tokens consumidos e processamento mais eficiente.",
          example: {
            title: "Exemplo: convertendo um trecho de página HTML",
            steps: [
              "HTML colado: \"<h1>Título</h1><p>Este é um <strong>texto</strong> de exemplo.</p>\"",
              "Ação: Converter para Markdown",
              "Resultado: \"# Título\\n\\nEste é um **texto** de exemplo.\"",
              "Redução: HTML tinha 68 caracteres, Markdown tem 42 (cerca de 38% menor)",
            ],
            result: "O conteúdo manteve a mesma estrutura visual, mas ocupa significativamente menos espaço em Markdown.",
          },
          faqs: [
            { question: "Por que Markdown economiza tokens ao usar IA?", answer: "Porque usa muito menos caracteres para representar a mesma formatação que o HTML, e ferramentas de IA cobram/processam com base na quantidade de texto (tokens) enviada." },
            { question: "De onde eu pego o HTML de uma página?", answer: "Você pode clicar com o botão direito em qualquer página e escolher \"Ver código-fonte\" ou \"Inspecionar elemento\", copiando o HTML da parte que deseja converter." },
            { question: "Meu conteúdo é enviado para algum servidor?", answer: "Não, toda a conversão acontece localmente no seu navegador." },
            { question: "O Markdown resultante mantém links e imagens?", answer: "Sim, links e referências de imagens do HTML original são convertidos para a sintaxe correspondente do Markdown." },
          ],
        }}
      />
    </ToolLayout>
  );
}
