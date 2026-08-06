import React, { useState } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";

interface Props {
  onBack: () => void;
}

export function CodificadorBase64({ onBack }: Props) {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleEncode = () => {
    try {
      const encoded = btoa(unescape(encodeURIComponent(input)));
      setOutput(encoded);
      setError("");
    } catch (e) {
      setError(`Erro ao codificar: ${(e as Error).message}`);
      setOutput("");
    }
  };

  const handleDecode = () => {
    try {
      const decoded = decodeURIComponent(escape(atob(input)));
      setOutput(decoded);
      setError("");
    } catch (e) {
      setError(`Texto não é um Base64 válido: ${(e as Error).message}`);
      setOutput("");
    }
  };

  const handleCopy = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  return (
    <ToolLayout
      title="Codificador Base64"
      emoji="🔐"
      category="Utilidades"
      description="Codifique ou decodifique texto em Base64 com suporte a acentos."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["livro segurança digital"]} label="livro segurança digital" />}
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
          <span className="text-sm text-gray-400 mb-1 block">{mode === "encode" ? "Texto original" : "Texto em Base64"}</span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "encode" ? "Olá, mundo!" : "T2zDoSwgbXVuZG8h"}
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
        toolName="Codificador Base64"
        category="Utilidades"
        data={{
          directAnswer: "Base64 é um método de codificação que transforma texto ou dados binários em uma sequência de caracteres ASCII, usado para transmitir dados com segurança em sistemas que só aceitam texto.",
          howItWorks: "A codificação Base64 converte cada grupo de 3 bytes de dados em 4 caracteres ASCII, usando um alfabeto de 64 caracteres (letras maiúsculas, minúsculas, números e mais dois símbolos). É amplamente usada para embutir imagens em HTML/CSS, transmitir anexos de e-mail, e codificar tokens de autenticação. Importante: Base64 não é criptografia - é apenas codificação, facilmente reversível.",
          example: {
            title: "Exemplo: codificando um texto simples",
            steps: [
              `Texto original: "Olá, mundo!"`,
              `Ação: Codificar`,
              `Resultado em Base64: T2zDoSwgbXVuZG8h`,
            ],
            result: "O texto foi convertido para uma representação em Base64, pronta para ser usada em contextos que exigem texto puro (como URLs ou JSON).",
          },
          faqs: [
            { question: "Base64 é uma forma de criptografia?", answer: "Não. Base64 é apenas codificação - qualquer pessoa pode decodificar o texto de volta facilmente. Não deve ser usado para proteger informações sensíveis." },
            { question: "Para que serve o Base64?", answer: "É usado para transmitir dados binários (como imagens) em formatos que só aceitam texto, como e-mails, URLs e arquivos JSON/XML." },
            { question: "Por que o texto em Base64 é maior que o original?", answer: "Porque a codificação usa 4 caracteres para representar 3 bytes originais, aumentando o tamanho em aproximadamente 33%." },
            { question: "Posso codificar acentos e caracteres especiais?", answer: "Sim, a ferramenta trata corretamente acentos e caracteres especiais em português." },
          ],
        }}
      />
    </ToolLayout>
  );
}
