import React, { useState } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";

interface Props {
  onBack: () => void;
}

export function GeradorUUID({ onBack }: Props) {
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState<string[]>([]);

  const generate = () => {
    const n = Math.max(1, Math.min(1000, count));
    const list: string[] = [];
    for (let i = 0; i < n; i++) {
      list.push(crypto.randomUUID());
    }
    setUuids(list);
  };

  const handleCopy = (uuid: string) => {
    navigator.clipboard.writeText(uuid);
  };

  const handleCopyAll = () => {
    if (uuids.length) navigator.clipboard.writeText(uuids.join("\n"));
  };

  return (
    <ToolLayout
      title="Gerador de UUID"
      emoji="🔑"
      category="Utilidades"
      description="Gere identificadores únicos no padrão UUID v4."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["livro programação"]} label="livro programação" />}
    >
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Quantidade</span>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value) || 1)}
            min={1}
            max={1000}
            className="input-field"
          />
        </label>

        <button onClick={generate} className="btn-primary w-full">Gerar UUID</button>

        {uuids.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">{uuids.length} UUID(s) gerado(s)</span>
              <button onClick={handleCopyAll} className="text-xs text-green-400 hover:text-green-300">Copiar todos</button>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {uuids.map((uuid, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/5 border border-white/10">
                  <code className="text-xs text-gray-300 font-mono flex-1 break-all">{uuid}</code>
                  <button onClick={() => handleCopy(uuid)} className="text-xs text-green-400 hover:text-green-300 flex-shrink-0">Copiar</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <ToolContent
        toolName="Gerador de UUID"
        category="Utilidades"
        data={{
          directAnswer: "Um UUID (Universally Unique Identifier) é um código de 128 bits gerado aleatoriamente, usado para identificar registros de forma única em sistemas e bancos de dados.",
          howItWorks: "A ferramenta usa a função nativa crypto.randomUUID() do navegador para gerar identificadores únicos no padrão UUID versão 4, que combina números aleatórios em um formato padronizado de 36 caracteres (32 dígitos hexadecimais e 4 hífens). A chance de colisão (dois UUIDs iguais sendo gerados) é estatisticamente desprezível.",
          example: {
            title: "Exemplo: gerando um UUID",
            steps: [
              `Clique em "Gerar UUID"`,
              `UUID gerado: 3f7a1c9e-8b2d-4e6f-9a1c-7d3e5f8b2c4a`,
              `Formato: 8-4-4-4-12 caracteres hexadecimais separados por hífen`,
            ],
            result: "Cada UUID gerado é praticamente impossível de se repetir, mesmo gerando bilhões deles.",
          },
          faqs: [
            { question: "O que é UUID?", answer: "É um identificador único universal, usado para identificar registros em bancos de dados e sistemas sem risco prático de duplicação." },
            { question: "Dois UUIDs podem ser iguais?", answer: "A chance é tão baixa que é considerada praticamente nula, mesmo gerando trilhões de UUIDs." },
            { question: "Para que serve um UUID?", answer: "É usado como identificador único de registros em bancos de dados, sessões de usuário, arquivos, e em APIs." },
            { question: "Existem diferentes versões de UUID?", answer: "Sim, esta ferramenta gera a versão 4, a mais comum, baseada em números aleatórios." },
          ],
        }}
      />
    </ToolLayout>
  );
}
