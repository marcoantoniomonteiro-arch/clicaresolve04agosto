import React, { useState, useEffect } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";

interface Props {
  onBack: () => void;
}

async function digest(algo: string, text: string): Promise<string> {
  const buf = await crypto.subtle.digest(algo, new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function GeradorHash({ onBack }: Props) {
  const [text, setText] = useState("");
  const [sha256, setSha256] = useState("");
  const [sha1, setSha1] = useState("");

  useEffect(() => {
    if (!text) {
      setSha256("");
      setSha1("");
      return;
    }
    digest("SHA-256", text).then(setSha256);
    digest("SHA-1", text).then(setSha1);
  }, [text]);

  const handleCopy = (value: string) => {
    if (value) navigator.clipboard.writeText(value);
  };

  return (
    <ToolLayout
      title="Gerador de Hash"
      emoji="#️⃣"
      category="Utilidades"
      description="Gere hashes SHA-256 e SHA-1 de qualquer texto, direto no navegador."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["livro segurança digital"]} label="livro segurança digital" />}
    >
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Texto para gerar o hash</span>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Digite ou cole o texto aqui..."
            rows={4}
            className="input-field font-mono text-sm"
          />
        </label>

        {sha256 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-400 font-semibold">SHA-256</span>
              <button onClick={() => handleCopy(sha256)} className="text-xs text-green-400 hover:text-green-300">Copiar</button>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300 font-mono break-all">
              {sha256}
            </div>
          </div>
        )}

        {sha1 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-400 font-semibold">SHA-1</span>
              <button onClick={() => handleCopy(sha1)} className="text-xs text-blue-400 hover:text-blue-300">Copiar</button>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300 font-mono break-all">
              {sha1}
            </div>
          </div>
        )}

        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
          <p className="text-xs text-gray-500 leading-relaxed">
            Esta ferramenta não oferece MD5, pois navegadores modernos não suportam esse algoritmo nativamente por questões de segurança. SHA-256 é a alternativa recomendada.
          </p>
        </div>
      </div>

      <ToolContent
        toolName="Gerador de Hash"
        category="Utilidades"
        data={{
          directAnswer: "Um hash é uma sequência única de caracteres gerada a partir de um texto, usada para verificar integridade de arquivos ou armazenar senhas de forma segura - o mesmo texto sempre gera o mesmo hash, mas é praticamente impossível descobrir o texto original a partir do hash.",
          howItWorks: "A ferramenta usa a Web Crypto API nativa do navegador para calcular o hash SHA-256 (mais seguro, 64 caracteres) e SHA-1 (mais curto, 40 caracteres, mas considerado menos seguro para uso criptográfico atualmente) do texto informado. Qualquer alteração no texto original, mesmo de um único caractere, gera um hash completamente diferente. Esta ferramenta não oferece MD5, pois esse algoritmo não é suportado nativamente pelos navegadores modernos por questões de segurança - o SHA-256 é a alternativa recomendada atualmente.",
          example: {
            title: "Exemplo: gerando hash de um texto",
            steps: [
              `Texto: "senha123"`,
              `Hash SHA-256 gerado: uma sequência de 64 caracteres hexadecimais única para esse texto`,
              `Se alterar para "Senha123" (letra maiúscula), o hash muda completamente`,
            ],
            result: "Cada texto gera um hash único e irreversível, útil para verificação de integridade sem expor o conteúdo original.",
          },
          faqs: [
            { question: "Posso reverter um hash para descobrir o texto original?", answer: "Não, hash é uma função de mão única - é matematicamente inviável reverter um hash SHA-256 para descobrir o texto que o gerou." },
            { question: "Por que não tem opção de MD5?", answer: "Navegadores modernos não suportam MD5 nativamente por ser considerado um algoritmo inseguro atualmente. SHA-256 é a alternativa recomendada." },
            { question: "Para que serve gerar um hash?", answer: "É usado para verificar se um arquivo não foi alterado (comparando hashes), armazenar senhas de forma segura em bancos de dados, e verificar integridade de downloads." },
            { question: "O mesmo texto sempre gera o mesmo hash?", answer: "Sim, o mesmo texto de entrada sempre produz exatamente o mesmo hash de saída, de forma consistente." },
          ],
        }}
      />
    </ToolLayout>
  );
}
