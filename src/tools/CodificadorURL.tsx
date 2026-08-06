import React, { useState } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";

interface Props {
  onBack: () => void;
}

export function CodificadorURL({ onBack }: Props) {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleEncode = () => {
    try {
      setOutput(encodeURIComponent(input));
      setError("");
    } catch (e) {
      setError(`Erro ao codificar: ${(e as Error).message}`);
      setOutput("");
    }
  };

  const handleDecode = () => {
    try {
      setOutput(decodeURIComponent(input));
      setError("");
    } catch (e) {
      setError(`Texto não é uma URL codificada válida: ${(e as Error).message}`);
      setOutput("");
    }
  };

  const handleCopy = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  return (
    <ToolLayout
      title="Codificador de URL"
      emoji="🔗"
      category="Utilidades"
      description="Codifique ou decodifique texto para uso seguro em endereços web (URL)."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["curso web design"]} label="curso web design" />}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setMode("encode")}
            className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
              mode === "encode"
                ? "bg-green-500/20 border-green-500/40 text-green-400"
                : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
            }`}
          >
            Codificar
          </button>
          <button
            onClick={() => setMode("decode")}
            className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
              mode === "decode"
                ? "bg-green-500/20 border-green-500/40 text-green-400"
                : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
            }`}
          >
            Decodificar
          </button>
        </div>

        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">{mode === "encode" ? "Texto original" : "Texto codificado"}</span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "encode" ? "café & pão" : "caf%C3%A9%20%26%20p%C3%A3o"}
            rows={4}
            className="input-field font-mono text-sm"
          />
        </label>

        <button onClick={mode === "encode" ? handleEncode : handleDecode} className="btn-primary w-full">
          {mode === "encode" ? "Codificar" : "Decodificar"}
        </button>

        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">{error}</div>
        )}

        {output && (
          <div className="space-y-2">
            <label className="block">
              <span className="text-sm text-gray-400 mb-1 block">Resultado</span>
              <textarea value={output} readOnly rows={4} className="input-field font-mono text-sm" />
            </label>
            <button onClick={handleCopy} className="btn-primary w-full">Copiar resultado</button>
          </div>
        )}
      </div>

      <ToolContent
        toolName="Codificador de URL"
        category="Utilidades"
        data={{
          directAnswer: "Codificar uma URL substitui caracteres especiais (como espaços, acentos e símbolos) por códigos no formato %XX, garantindo que o texto possa ser usado com segurança dentro de um endereço web.",
          howItWorks: "URLs têm um conjunto limitado de caracteres permitidos. Quando um texto contém espaços, acentos, símbolos (&, =, ?, etc.) ou caracteres especiais, é necessário codificá-los no formato percent-encoding (ex: espaço vira %20) para que a URL funcione corretamente em todos os navegadores e servidores. A decodificação faz o processo inverso, convertendo os códigos de volta ao texto original legível.",
          example: {
            title: "Exemplo: codificando um texto com espaços e acentos",
            steps: [
              `Texto original: "café & pão"`,
              `Ação: Codificar`,
              `Resultado: caf%C3%A9%20%26%20p%C3%A3o`,
            ],
            result: "O texto foi convertido para um formato seguro, pronto para ser usado como parte de uma URL.",
          },
          faqs: [
            { question: "Por que preciso codificar uma URL?", answer: "Porque URLs têm caracteres proibidos ou especiais (espaços, acentos, &, =, ?) que precisam ser convertidos para um formato seguro antes de serem usados em endereços web." },
            { question: "Qual a diferença entre codificar e decodificar?", answer: "Codificar transforma texto normal em formato seguro para URL; decodificar faz o processo inverso, revelando o texto original." },
            { question: "Todo texto precisa ser codificado?", answer: "Não, apenas textos com espaços, acentos ou símbolos especiais. Textos com apenas letras e números comuns já são seguros para uso em URLs." },
            { question: "Isso é o mesmo que Base64?", answer: "Não, são codificações diferentes, com propósitos diferentes. A codificação de URL (percent-encoding) é específica para uso em endereços web." },
          ],
        }}
      />
    </ToolLayout>
  );
}
