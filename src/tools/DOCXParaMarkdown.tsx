import React, { useState, useCallback } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { Copy, Download, FileText, Loader2, Upload, AlertTriangle } from "lucide-react";
import TurndownService from "turndown";
import * as mammoth from "mammoth";

interface Props {
  onBack: () => void;
}

export function DOCXParaMarkdown({ onBack }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [markdown, setMarkdown] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFile = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    const f = files[0];
    if (!f.name.toLowerCase().endsWith(".docx")) {
      setError("Selecione um arquivo .docx válido.");
      return;
    }
    setFile(f);
    setError("");
    setMarkdown("");
  }, []);

  const handleConvert = async () => {
    if (!file) return;
    setProcessing(true);
    setError("");
    setMarkdown("");

    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      const turndownService = new TurndownService({ headingStyle: "atx" });
      const md = turndownService.turndown(result.value);
      setMarkdown(md);
    } catch {
      setError("Erro ao processar o DOCX. O arquivo pode estar corrompido ou protegido.");
    } finally {
      setProcessing(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = (file?.name.replace(/\.docx$/i, "") || "documento") + ".md";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout
      title="DOCX para Markdown"
      emoji="📃"
      category="Utilidades"
      description="Converta documentos Word (DOCX) para Markdown, extraindo texto e estrutura em formato compacto."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["docx para markdown"]} label="docx para markdown" />}
    >
      <div className="space-y-4">
        <div>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Selecione um arquivo .docx</span>
            <input
              type="file"
              accept=".docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={(e) => handleFile(e.target.files)}
              className="input-field text-sm"
            />
          </label>
        </div>

        {error && <p className="text-sm text-red-400 text-center">{error}</p>}

        {file && !processing && !markdown && (
          <>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <p className="text-sm text-white">
                <FileText className="w-4 h-4 inline mr-1" />
                {file.name}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-yellow-400/10 border border-yellow-400/20">
              <p className="text-xs text-yellow-400 text-center leading-relaxed">
                <AlertTriangle className="w-4 h-4 inline mr-1 mb-0.5" />
                A conversão preserva títulos, listas, negrito e itálico. Elementos visuais complexos (tabelas complexas, imagens incorporadas, formatação avançada) podem não ser convertidos perfeitamente.
              </p>
            </div>

            <button
              onClick={handleConvert}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <Upload className="w-5 h-5" />
              Converter para Markdown
            </button>
          </>
        )}

        {processing && (
          <div className="flex items-center justify-center gap-2 text-green-400 py-8">
            <Loader2 className="w-5 h-5 animate-spin" />
            <p className="text-sm">Convertendo documento...</p>
          </div>
        )}

        {markdown && !processing && (
          <>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="btn-secondary flex-1 flex items-center justify-center gap-2 text-sm"
              >
                <Copy className="w-4 h-4" />
                {copied ? "Copiado!" : "Copiar"}
              </button>
              <button
                onClick={handleDownload}
                className="btn-secondary flex-1 flex items-center justify-center gap-2 text-sm"
              >
                <Download className="w-4 h-4" />
                Baixar como .md
              </button>
            </div>

            <div>
              <span className="text-sm text-gray-400 mb-1 block">Markdown resultante</span>
              <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="input-field text-sm font-mono w-full min-h-[300px] resize-y"
                placeholder="O Markdown aparecerá aqui..."
              />
            </div>

            <button
              onClick={() => {
                setFile(null);
                setMarkdown("");
              }}
              className="text-sm text-gray-400 hover:text-white transition-colors w-full text-center"
            >
              Converter outro documento
            </button>
          </>
        )}

        {!file && !error && !processing && (
          <div className="text-center py-8 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Selecione um arquivo .docx para converter</p>
          </div>
        )}
      </div>

      <ToolContent
        toolName="DOCX para Markdown"
        category="Utilidades"
        data={{
          directAnswer: "Converter um documento Word (DOCX) para Markdown extrai o texto e a estrutura básica (títulos, listas, negrito) em um formato compacto, ideal para colar em ferramentas de IA ou editores de texto simples.",
          howItWorks: "A ferramenta lê o arquivo DOCX e primeiro o converte para HTML (preservando a estrutura do documento), depois transforma esse HTML em Markdown, um formato de texto simples e muito mais compacto. Elementos básicos como títulos, parágrafos, listas, negrito e itálico são convertidos corretamente. Elementos mais complexos, como tabelas elaboradas ou formatação visual avançada, podem sofrer alguma perda de fidelidade nessa conversão — é uma conversão de conteúdo e estrutura básica, não uma cópia visual exata do documento.",
          example: {
            title: "Exemplo: convertendo um documento com títulos e lista",
            steps: [
              "Documento Word com um título, um parágrafo e uma lista de 3 itens",
              "Processamento: DOCX → HTML → Markdown",
              "Resultado: título vira \"# Título\", lista vira itens com \"-\"",
              "Arquivo .md pronto para baixar ou copiar",
            ],
            result: "O conteúdo do documento Word foi extraído mantendo sua estrutura básica, em um formato de texto muito mais compacto.",
          },
          faqs: [
            { question: "Todos os elementos do Word são convertidos perfeitamente?", answer: "Os elementos básicos (títulos, parágrafos, listas, negrito, itálico) são convertidos bem. Tabelas complexas e formatação visual avançada podem não ser preservadas com fidelidade total." },
            { question: "Meu documento é enviado para algum servidor?", answer: "Não, toda a conversão acontece localmente no seu navegador." },
            { question: "Imagens do documento aparecem no Markdown?", answer: "Referências às imagens podem aparecer, mas as imagens em si não são incorporadas no arquivo de texto Markdown resultante." },
            { question: "Para que serve converter Word para Markdown?", answer: "É útil para reduzir o tamanho do texto ao colar em ferramentas de IA, publicar conteúdo em sites que aceitam Markdown, ou simplesmente ter uma versão de texto simples e limpa do documento." },
          ],
        }}
      />
    </ToolLayout>
  );
}
