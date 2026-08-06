import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import React, { useState, useCallback } from "react";


import { Copy, Check, SortAsc, SortDesc, Shuffle, ListOrdered, X } from "lucide-react";

interface Props {
  onBack: () => void;
}

export function OrganizadorListas({ onBack }: Props) {
  const [entrada, setEntrada] = useState("");
  const [saida, setSaida] = useState("");
  const [copiado, setCopiado] = useState(false);

  const removerDuplicatas = useCallback(() => {
    const linhas = entrada.split("\n").filter(Boolean);
    const unicas = [...new Set(linhas)];
    setSaida(unicas.join("\n"));
  }, [entrada]);

  const ordenarAZ = useCallback(() => {
    const linhas = entrada.split("\n").filter(Boolean);
    const ordenadas = [...linhas].sort((a, b) => a.localeCompare(b, "pt-BR"));
    setSaida(ordenadas.join("\n"));
  }, [entrada]);

  const ordenarZA = useCallback(() => {
    const linhas = entrada.split("\n").filter(Boolean);
    const ordenadas = [...linhas].sort((a, b) => b.localeCompare(a, "pt-BR"));
    setSaida(ordenadas.join("\n"));
  }, [entrada]);

  const inverter = useCallback(() => {
    const linhas = entrada.split("\n").filter(Boolean);
    const invertidas = [...linhas].reverse();
    setSaida(invertidas.join("\n"));
  }, [entrada]);

  const numerar = useCallback(() => {
    const linhas = entrada.split("\n").filter(Boolean);
    const numeradas = linhas.map((l, i) => `${i + 1}. ${l}`);
    setSaida(numeradas.join("\n"));
  }, [entrada]);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(saida);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar", err);
    }
  };

  const limpar = () => {
    setEntrada("");
    setSaida("");
  };

  const estatisticas = {
    linhasEntrada: entrada.split("\n").filter(Boolean).length,
    linhasSaida: saida.split("\n").filter(Boolean).length,
  };

  return (
    <ToolLayout
      title="Organizador de Listas"
      emoji="📋"
      category="Utilidades"
      description="Organize listas: remova duplicatas, ordene, inverta e numere linhas."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["caderno bullet journal"]} label="caderno bullet journal" />}
    
    >
      <div className="space-y-5">
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
          <button
            onClick={removerDuplicatas}
            className="p-3 rounded-lg bg-white/5 text-xs text-gray-400 hover:bg-white/10 hover:text-white transition-all flex flex-col items-center gap-1"
          >
            <X className="w-4 h-4" />
            Duplicatas
          </button>
          <button
            onClick={ordenarAZ}
            className="p-3 rounded-lg bg-white/5 text-xs text-gray-400 hover:bg-white/10 hover:text-white transition-all flex flex-col items-center gap-1"
          >
            <SortAsc className="w-4 h-4" />
            A-Z
          </button>
          <button
            onClick={ordenarZA}
            className="p-3 rounded-lg bg-white/5 text-xs text-gray-400 hover:bg-white/10 hover:text-white transition-all flex flex-col items-center gap-1"
          >
            <SortDesc className="w-4 h-4" />
            Z-A
          </button>
          <button
            onClick={inverter}
            className="p-3 rounded-lg bg-white/5 text-xs text-gray-400 hover:bg-white/10 hover:text-white transition-all flex flex-col items-center gap-1"
          >
            <Shuffle className="w-4 h-4" />
            Inverter
          </button>
          <button
            onClick={numerar}
            className="p-3 rounded-lg bg-white/5 text-xs text-gray-400 hover:bg-white/10 hover:text-white transition-all flex flex-col items-center gap-1"
          >
            <ListOrdered className="w-4 h-4" />
            Numerar
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-400">Entrada</span>
              <span className="text-xs text-gray-500">{estatisticas.linhasEntrada} linhas</span>
            </div>
            <textarea
              value={entrada}
              onChange={(e) => setEntrada(e.target.value)}
              placeholder="Cole sua lista aqui, uma linha por item..."
              className="input-field w-full h-48 resize-none p-3 text-sm"
            />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-400">Saida</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">{estatisticas.linhasSaida} linhas</span>
                {saida && (
                  <button
                    onClick={copiar}
                    className="p-1 rounded bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    {copiado ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                )}
              </div>
            </div>
            <textarea
              value={saida}
              readOnly
              placeholder="Resultado aparecera aqui..."
              className="input-field w-full h-48 resize-none p-3 text-sm bg-white/3"
            />
          </div>
        </div>

        {entrada && saida && (
          <button
            onClick={limpar}
            className="w-full text-sm text-gray-500 hover:text-red-400 underline"
          >
            Limpar tudo
          </button>
        )}
      </div>
      <ToolContent
        toolName="Organizador de Listas"
        category="Utilidades"
        data={{
          directAnswer: "O organizador ordena itens em ordem alfabética ou numérica e remove duplicatas automaticamente.",
          howItWorks: "A ferramenta recebe uma lista (um item por linha) e permite ordenar A-Z, Z-A, numericamente, remover duplicatas ou embaralhar aleatoriamente. Útil para listas de compras, participantes ou tarefas.",
          example: {
            title: "Exemplo: organizando lista com duplicatas",
            steps: [
              "Original: Banana, Maçã, banana, Uva, Maçã",
              "Ação: remover duplicatas + ordenar A-Z",
              "Duplicatas removidas: Banana, Maçã, Uva",
              "Resultado: Banana, Maçã, Uva",
            ],
            result: "A lista foi limpa e organizada em segundos.",
          },
          faqs: [
            { question: "Diferencia maiúsculas de minúsculas ao remover duplicatas?", answer: 'Por padrão trata "Banana" e "banana" como duplicados.' },
            { question: "Posso ordenar números junto com texto?", answer: "Sim, a ferramenta detecta números e oferece ordenação numérica." },
            { question: "Posso embaralhar a lista?", answer: "Sim, útil para sorteios ou ordem aleatória." },
            { question: "Existe limite de itens?", answer: "Não rígido, mas listas muito grandes podem demorar mais para processar." },
          ],
        }}
      />
    </ToolLayout>
  );
}
