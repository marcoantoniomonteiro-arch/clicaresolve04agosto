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
          directAnswer: "Um hash é uma sequência de caracteres gerada a partir de um texto, usada para verificar a integridade de arquivos — o mesmo texto sempre gera o mesmo hash, e é inviável descobrir o texto original a partir dele. Não é o mesmo que criptografia, e não deve ser usado sozinho para armazenar senhas.",
          howItWorks: "A ferramenta usa a Web Crypto API nativa do navegador para calcular o hash SHA-256 (mais seguro, 64 caracteres) e SHA-1 (mais curto, 40 caracteres, hoje considerado fraco para uso criptográfico) do texto informado. Qualquer alteração no texto original, mesmo de um único caractere, gera um hash completamente diferente. Hash é diferente de criptografia: criptografia é reversível (existe uma chave para 'destrancar' e recuperar o dado original), enquanto hash é uma função de mão única — não existe chave, e o processo não é feito para ser revertido. Esta ferramenta não oferece MD5, pois esse algoritmo não é suportado nativamente pelos navegadores modernos por ser considerado inseguro.",
          example: {
            title: "Exemplo: gerando hash de um texto",
            steps: [
              `Texto: "documento-contrato-v1"`,
              `Hash SHA-256 gerado: uma sequência de 64 caracteres hexadecimais`,
              `Se o texto mudar 1 caractere (ex: "v2" em vez de "v1"), o hash muda completamente`,
            ],
            result: "Comparar o hash de um arquivo antes e depois de um envio, por exemplo, mostra se o conteúdo foi alterado no caminho.",
          },
          faqs: [
            { question: "Posso reverter um hash para descobrir o texto original?", answer: "Na prática, não — hash é uma função de mão única, e é computacionalmente inviável reverter um hash SHA-256 para descobrir o texto que o gerou (embora, matematicamente, colisões teóricas existam para qualquer função de hash, encontrá-las é impraticável com a tecnologia atual)." },
            { question: "Essa ferramenta é segura para gerar hash de senhas para armazenar em um banco de dados?", answer: "Não. SHA-256 e SHA-1 puros são rápidos demais e não devem ser usados sozinhos para armazenar senhas — eles são vulneráveis a ataques de força bruta e tabelas pré-computadas (rainbow tables) em escala. Para senhas, o correto é usar funções feitas especificamente para isso, como bcrypt, Argon2 ou PBKDF2, que são propositalmente lentas e usam 'salt' (dado aleatório único por senha). Esta ferramenta serve para verificar integridade de arquivos e textos, não para proteger senhas." },
            { question: "Por que não tem opção de MD5?", answer: "Navegadores modernos não implementam MD5 na Web Crypto API nativa, por ser considerado um algoritmo criptograficamente quebrado. SHA-256 é a alternativa recomendada para verificação de integridade." },
            { question: "O mesmo texto sempre gera o mesmo hash?", answer: "Sim, o mesmo texto de entrada sempre produz exatamente o mesmo hash de saída, de forma consistente e determinística." },
          ],
        }}
      />
    </ToolLayout>
  );
}
