import React, { useState, useCallback } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { Copy, Download, FileText, Loader2, Upload, AlertTriangle, ScanSearch } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

interface Props {
  onBack: () => void;
}

interface TextItem {
  str: string;
  transform: number[];
  height: number;
}

export function PDFParaMarkdown({ onBack }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [markdown, setMarkdown] = useState("");
  const [processing, setProcessing] = useState(false);
  const [progressLabel, setProgressLabel] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFile = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    const f = files[0];
    if (f.type !== "application/pdf") {
      setError("Selecione um arquivo PDF válido.");
      return;
    }
    setFile(f);
    setError("");
    setMarkdown("");
  }, []);

  const convertPageToMarkdown = (textContent: { items: TextItem[] }): string => {
    const items = textContent.items.filter((item) => item.str.trim().length > 0);
    if (items.length === 0) return "";

    const heights = items.map((i) => i.height).filter((h) => h > 0);
    const avgHeight = heights.length > 0 ? heights.reduce((a, b) => a + b, 0) / heights.length : 12;

    const lines: { text: string; height: number; y: number }[] = [];
    let currentLine = "";
    let currentHeight = avgHeight;
    let currentY = items[0]?.transform[5] ?? 0;

    for (const item of items) {
      const itemY = item.transform[5];
      if (Math.abs(itemY - currentY) > 2 && currentLine.trim()) {
        lines.push({ text: currentLine.trim(), height: currentHeight, y: currentY });
        currentLine = "";
      }
      currentLine += item.str;
      currentHeight = item.height || currentHeight;
      currentY = itemY;
    }
    if (currentLine.trim()) {
      lines.push({ text: currentLine.trim(), height: currentHeight, y: currentY });
    }

    const mdLines: string[] = [];
    for (const line of lines) {
      const trimmed = line.text.trim();
      if (!trimmed) continue;

      const isListItem = /^[•·●○\-*]\s+/.test(trimmed) || /^\d+[.)]\s+/.test(trimmed);

      if (isListItem) {
        const cleaned = trimmed.replace(/^[•·●○\-*]\s+/, "- ").replace(/^\d+[.)]\s+/, "- ");
        mdLines.push(cleaned);
      } else if (line.height > avgHeight * 1.4) {
        mdLines.push(`# ${trimmed}`);
      } else if (line.height > avgHeight * 1.15) {
        mdLines.push(`## ${trimmed}`);
      } else {
        mdLines.push(trimmed);
      }
      mdLines.push("");
    }

    return mdLines.join("\n");
  };

  const handleConvert = async () => {
    if (!file) return;
    setProcessing(true);
    setError("");
    setMarkdown("");
    setProgressLabel("Carregando PDF...");

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const totalPages = pdf.numPages;
      const allPages: string[] = [];

      for (let i = 1; i <= totalPages; i++) {
        setProgressLabel(`Extraindo texto da página ${i} de ${totalPages}...`);
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageMd = convertPageToMarkdown(textContent as { items: TextItem[] });
        if (pageMd.trim()) {
          allPages.push(`<!-- Página ${i} -->\n${pageMd}`);
        }
      }

      if (allPages.length === 0) {
        setError("Nenhum texto encontrado no PDF. Pode ser um PDF escaneado (apenas imagem) — use a ferramenta de OCR PDF primeiro.");
      } else {
        setMarkdown(allPages.join("\n\n---\n\n"));
      }
    } catch {
      setError("Erro ao processar o PDF. O arquivo pode estar protegido, corrompido ou muito grande.");
    } finally {
      setProcessing(false);
      setProgressLabel("");
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
    a.download = (file?.name.replace(/\.pdf$/i, "") || "documento") + ".md";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout
      title="PDF para Markdown"
      emoji="📋"
      category="Utilidades"
      description="Extraia texto de PDFs e converta para Markdown com estrutura aproximada de títulos e listas."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["pdf para markdown"]} label="pdf para markdown" />}
    >
      <div className="space-y-4">
        <div>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Selecione um arquivo PDF</span>
            <input
              type="file"
              accept="application/pdf"
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
                Conversão aproximada: a estrutura (títulos vs. parágrafos) é estimada pelo tamanho da fonte, não garantida 100% correta. Para PDFs escaneados (imagens), use primeiro o OCR PDF.
              </p>
            </div>

            <button
              onClick={handleConvert}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <ScanSearch className="w-5 h-5" />
              Converter para Markdown
            </button>
          </>
        )}

        {processing && (
          <div className="flex items-center justify-center gap-2 text-green-400 py-8">
            <Loader2 className="w-5 h-5 animate-spin" />
            <p className="text-sm">{progressLabel || "Processando..."}</p>
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
              Converter outro PDF
            </button>
          </>
        )}

        {!file && !error && !processing && (
          <div className="text-center py-8 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Selecione um PDF para converter</p>
          </div>
        )}
      </div>

      <ToolContent
        toolName="PDF para Markdown"
        category="Utilidades"
        data={{
          directAnswer: "Converter PDF para Markdown extrai o texto do documento e tenta identificar títulos e listas por meio do tamanho da fonte original, gerando uma versão aproximada em formato de texto compacto.",
          howItWorks: "A ferramenta lê o texto de cada página do PDF e analisa o tamanho da fonte de cada trecho: textos com fonte visivelmente maior que a média são interpretados como títulos, e linhas que começam com marcadores (como • ou números) são interpretadas como itens de lista. Esta é uma conversão APROXIMADA baseada em heurística — funciona bem para PDFs com estrutura simples e clara, mas pode não identificar perfeitamente a formatação em documentos com design mais complexo. Para PDFs escaneados (que são apenas imagens, sem texto real embutido), é necessário usar primeiro a ferramenta de OCR PDF do site para extrair o texto, e depois formatá-lo manualmente.",
          example: {
            title: "Exemplo: convertendo um PDF simples com título e lista",
            steps: [
              "PDF com um título grande, um parágrafo e uma lista com marcadores",
              "Ferramenta identifica o título pelo tamanho de fonte maior",
              "Identifica a lista pelos marcadores no início das linhas",
              "Resultado: Markdown com \"# Título\", parágrafo normal, e itens de lista com \"-\"",
            ],
            result: "O conteúdo foi extraído e estruturado automaticamente, pronto para revisão e uso em ferramentas de texto ou IA.",
          },
          faqs: [
            { question: "A conversão é sempre perfeita?", answer: "Não, é uma conversão aproximada baseada em heurística de tamanho de fonte — PDFs com design simples convertem melhor que documentos com formatação visual complexa." },
            { question: "Funciona com PDFs escaneados (fotos de documentos)?", answer: "Não diretamente, porque PDFs escaneados são apenas imagens, sem texto real para extrair. Use primeiro a ferramenta de OCR PDF do site para extrair o texto, depois formate manualmente." },
            { question: "Meu PDF é enviado para algum servidor?", answer: "Não, toda a extração e conversão acontece localmente no seu navegador." },
            { question: "Por que alguns títulos não foram identificados corretamente?", answer: "A identificação usa o tamanho da fonte como referência; se o documento usa tamanhos de fonte incomuns ou pouca diferenciação visual entre títulos e texto normal, a identificação pode não ser precisa." },
          ],
        }}
      />
    </ToolLayout>
  );
}
