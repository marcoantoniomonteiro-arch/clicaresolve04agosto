import React, { useState } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";

interface Props {
  onBack: () => void;
}

export function RemovedorAcentos({ onBack }: Props) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [replaceSpaces, setReplaceSpaces] = useState<"none" | "underline" | "hyphen">("none");

  const handleRemove = () => {
    let result = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (replaceSpaces === "underline") {
      result = result.replace(/\s+/g, "_");
    } else if (replaceSpaces === "hyphen") {
      result = result.replace(/\s+/g, "-");
    }
    setOutput(result);
  };

  const handleCopy = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  return (
    <ToolLayout
      title="Removedor de Acentos"
      emoji="🔤"
      category="Utilidades"
      description="Remova acentos e caracteres especiais do seu texto."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["livro português"]} label="livro português" />}
    >
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Texto com acentos</span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Programação em Português é ótima"
            rows={5}
            className="input-field"
          />
        </label>

        <div className="space-y-2">
          <span className="text-sm text-gray-400 block">Substituir espaços por:</span>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setReplaceSpaces("none")}
              className={`p-2 rounded-xl border text-xs font-semibold transition-all ${
                replaceSpaces === "none"
                  ? "bg-green-500/20 border-green-500/40 text-green-400"
                  : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
              }`}
            >
              Manter
            </button>
            <button
              onClick={() => setReplaceSpaces("underline")}
              className={`p-2 rounded-xl border text-xs font-semibold transition-all ${
                replaceSpaces === "underline"
                  ? "bg-green-500/20 border-green-500/40 text-green-400"
                  : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
              }`}
            >
              Underline
            </button>
            <button
              onClick={() => setReplaceSpaces("hyphen")}
              className={`p-2 rounded-xl border text-xs font-semibold transition-all ${
                replaceSpaces === "hyphen"
                  ? "bg-green-500/20 border-green-500/40 text-green-400"
                  : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
              }`}
            >
              Hífen
            </button>
          </div>
        </div>

        <button onClick={handleRemove} className="btn-primary w-full">Remover acentos</button>

        {output && (
          <div className="space-y-2">
            <label className="block">
              <span className="text-sm text-gray-400 mb-1 block">Resultado</span>
              <textarea value={output} readOnly rows={5} className="input-field" />
            </label>
            <button onClick={handleCopy} className="btn-primary w-full">Copiar resultado</button>
          </div>
        )}
      </div>

      <ToolContent
        toolName="Removedor de Acentos"
        category="Utilidades"
        data={{
          directAnswer: "Remover acentos de um texto substitui letras acentuadas (á, ç, õ, etc.) pela versão sem acento (a, c, o), útil para nomes de arquivo, sistemas antigos e URLs amigáveis.",
          howItWorks: "A ferramenta usa a normalização Unicode do próprio navegador para separar cada letra acentuada em sua letra base mais o sinal de acentuação, depois remove apenas o sinal, mantendo a letra. Isso preserva a legibilidade do texto (diferente de simplesmente apagar os caracteres), sendo especialmente útil para nomes de arquivos, identificadores de sistema, URLs (slugs) e sistemas legados que não suportam acentuação.",
          example: {
            title: "Exemplo: removendo acentos de uma frase",
            steps: [
              `Texto original: "Programação em Português é ótima"`,
              `Ação: Remover acentos`,
              `Resultado: "Programacao em Portugues e otima"`,
            ],
            result: "O texto perdeu os acentos mas manteve todas as letras e a estrutura original, pronto para uso em sistemas que não aceitam acentuação.",
          },
          faqs: [
            { question: "Para que serve remover acentos de um texto?", answer: "É útil para criar nomes de arquivo, URLs amigáveis (slugs), ou para compatibilidade com sistemas antigos que não suportam caracteres acentuados." },
            { question: "A ferramenta remove cedilha (ç) também?", answer: "Sim, o 'ç' é convertido para 'c', seguindo o mesmo processo de normalização." },
            { question: "Meu texto original é alterado no meu computador?", answer: "Não, você precisa copiar o resultado manualmente; o texto original que você colou não é modificado em nenhum arquivo seu." },
            { question: "Funciona com textos grandes?", answer: "Sim, não há limite prático de tamanho, já que o processamento acontece no navegador." },
          ],
        }}
      />
    </ToolLayout>
  );
}
