import React, { useState } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";

interface Props {
  onBack: () => void;
}

export function FormatadorJSON({ onBack }: Props) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleFormat = () => {
    try {
      const obj = JSON.parse(input);
      setOutput(JSON.stringify(obj, null, 2));
      setError("");
    } catch (e) {
      setError(`JSON inválido: ${(e as Error).message}`);
      setOutput("");
    }
  };

  const handleMinify = () => {
    try {
      const obj = JSON.parse(input);
      setOutput(JSON.stringify(obj));
      setError("");
    } catch (e) {
      setError(`JSON inválido: ${(e as Error).message}`);
      setOutput("");
    }
  };

  const handleCopy = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  return (
    <ToolLayout
      title="Formatador de JSON"
      emoji="🧩"
      category="Utilidades"
      description="Formate ou minifique JSON com indentação legível."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["livro javascript"]} label="livro javascript" />}
    >
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Cole seu JSON aqui</span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"nome":"João","idade":30}'
            rows={6}
            className="input-field font-mono text-sm"
          />
        </label>

        <div className="flex gap-2">
          <button onClick={handleFormat} className="btn-primary flex-1">Formatar</button>
          <button onClick={handleMinify} className="flex-1 p-3 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-gray-300 hover:border-white/20 transition-all">Minificar</button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">
            {error}
          </div>
        )}

        {output && (
          <div className="space-y-2">
            <label className="block">
              <span className="text-sm text-gray-400 mb-1 block">Resultado</span>
              <textarea value={output} readOnly rows={8} className="input-field font-mono text-sm" />
            </label>
            <button onClick={handleCopy} className="btn-primary w-full">Copiar resultado</button>
          </div>
        )}
      </div>

      <ToolContent
        toolName="Formatador de JSON"
        category="Utilidades"
        data={{
          directAnswer: "Um JSON formatado usa indentação e quebras de linha para ficar legível; um JSON minificado remove todos os espaços desnecessários para reduzir o tamanho do arquivo.",
          howItWorks: "A ferramenta processa o texto JSON colado, validando sua estrutura e reorganizando com indentação de 2 espaços para facilitar a leitura, ou removendo todos os espaços extras para minificar. Se houver erro de sintaxe (vírgula faltando, chave não fechada, etc.), a ferramenta indica o problema para facilitar a correção.",
          example: {
            title: "Exemplo: formatando um JSON compacto",
            steps: [
              `JSON original: {"nome":"João","idade":30}`,
              `Ação: Formatar`,
              `Resultado com indentação: chaves e valores organizados em linhas separadas, com 2 espaços de recuo`,
            ],
            result: "O JSON formatado fica muito mais fácil de ler e revisar.",
          },
          faqs: [
            { question: "O que é JSON?", answer: "JSON (JavaScript Object Notation) é um formato de texto usado para troca de dados entre sistemas, muito comum em APIs e arquivos de configuração." },
            { question: "Por que meu JSON dá erro ao formatar?", answer: "Geralmente por erro de sintaxe: vírgula sobrando ou faltando, aspas erradas, ou chaves/colchetes não fechados corretamente." },
            { question: "Qual a diferença entre JSON formatado e minificado?", answer: "O formatado tem espaços e quebras de linha para leitura humana; o minificado remove tudo isso para reduzir o tamanho do arquivo, usado em produção." },
            { question: "Meus dados são enviados para algum servidor?", answer: "Não, todo o processamento acontece no seu navegador, sem enviar dados a lugar nenhum." },
          ],
        }}
      />
    </ToolLayout>
  );
}
