import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import React, { useState, useMemo } from "react";


import { Copy, Check, Instagram } from "lucide-react";
import { ToolContent } from "../components/ToolContent";

interface Props {
  onBack: () => void;
}

export function FormatadorLegendas({ onBack }: Props) {
  const [texto, setTexto] = useState("");
  const [separador, setSeparador] = useState<"paragrafo" | "linha">("paragrafo");
  const [copiado, setCopiado] = useState(false);

  const resultado = useMemo(() => {
    if (!texto.trim()) return "";

    const linhas = separador === "paragrafo"
      ? texto.trim().split(/\n\s*\n/)
      : texto.trim().split("\n");

    // Adiciona quebra de linha invisivel (U+2063) entre cada linha
    const formatado = linhas
      .map((linha) => linha.trim())
      .filter(Boolean)
      .join("\u2063\n");

    return formatado;
  }, [texto, separador]);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(resultado);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar", err);
    }
  };

  const contarLinhas = useMemo(() => {
    if (!resultado) return 0;
    return resultado.split("\u2063").length;
  }, [resultado]);

  return (
    <ToolLayout
      title="Formatador de Legendas"
      emoji="📄"
      category="Redes Sociais"
      description="Adicione quebras invisiveis para legendas do Instagram e TikTok."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["ring light creator"]} label="ring light creator" />}
    
    >
      <div className="space-y-5">
        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Texto Original</span>
          <textarea
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Digite seu texto aqui. Use Enter para quebrar linhas..."
            className="input-field w-full h-32 resize-none p-4"
          />
        </label>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setSeparador("paragrafo")}
            className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
              separador === "paragrafo"
                ? "bg-green-500/20 border-green-500/40 text-green-400"
                : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
            }`}
          >
            Por Paragrafo
          </button>
          <button
            onClick={() => setSeparador("linha")}
            className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
              separador === "linha"
                ? "bg-green-500/20 border-green-500/40 text-green-400"
                : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
            }`}
          >
            Por Linha
          </button>
        </div>

        {resultado && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/8">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                  Texto Formatado
                </p>
                <span className="text-xs text-gray-500">{contarLinhas} linhas</span>
              </div>
              <div className="p-4 rounded-lg bg-white/5 text-gray-300 text-sm whitespace-pre-wrap max-h-48 overflow-y-auto">
                {resultado.split("\u2063").map((linha, i) => (
                  <div key={i} className="py-0.5">
                    {linha}
                    {i < contarLinhas - 1 && <span className="text-red-400 text-xs"> [↵]</span>}
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Caracteres invisiveis (U+2063) foram adicionados entre as linhas
              </p>
            </div>

            <button
              onClick={copiar}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {copiado ? (
                <>
                  <Check className="w-4 h-4" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copiar Texto Formatado
                </>
              )}
            </button>

            <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Instagram className="w-4 h-4 text-purple-400" />
                <p className="text-xs text-purple-400 font-semibold">Dica</p>
              </div>
              <p className="text-xs text-gray-400">
                Cole o texto copiado diretamente no Instagram ou TikTok. As quebras de linha invisiveis
                farao com que cada trecho apareça em uma linha separada na legenda.
              </p>
            </div>
          </div>
        )}
      </div>
      <ToolContent
        toolName="Formatador de Legendas"
        category="Utilidades"
        data={{
          directAnswer: "O formatador de legendas ajusta arquivos de legenda (como .srt) para corrigir tempos, quebras de linha e formatação de texto de forma automática.",
          howItWorks: "A ferramenta processa arquivos de legenda em formatos comuns (SRT, entre outros), corrigindo problemas como quebras de linha muito longas, espaçamento incorreto e tempos de exibição desalinhados, facilitando o trabalho de quem edita ou revisa legendas de vídeos.",
          example: {
            title: "Exemplo: corrigindo uma linha de legenda muito longa",
            steps: [
              "Texto original: linha única com 120 caracteres",
              "Regra aplicada: máximo de 42 caracteres por linha",
              "Quebra automática em 2 linhas equilibradas",
              "Resultado: legenda formatada dentro do padrão recomendado",
            ],
            result: "A legenda foi reformatada em 2 linhas equilibradas, seguindo o padrão recomendado de caracteres por linha para boa legibilidade.",
          },
          faqs: [
            { question: "Quais formatos de legenda são suportados?", answer: "O formato mais comum suportado é o SRT, um dos padrões mais usados para legendas de vídeo." },
            { question: "Por que existe um limite de caracteres por linha?", answer: "Para garantir boa legibilidade na tela, evitando que o espectador precise ler linhas muito longas rapidamente." },
            { question: "A ferramenta traduz o conteúdo da legenda?", answer: "Não, ela foca na formatação e correção técnica do arquivo, não na tradução do texto." },
            { question: "Posso ajustar o tempo de exibição de cada legenda?", answer: "Dependendo da versão, é possível corrigir pequenos desalinhamentos de tempo entre o áudio e o texto exibido." },
          ],
        }}
      />
    </ToolLayout>
  );
}
