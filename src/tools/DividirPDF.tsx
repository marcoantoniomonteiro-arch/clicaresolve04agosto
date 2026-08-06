import React, { useState, useCallback } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { FileDown, FileText, Scissors } from "lucide-react";
import { PDFDocument } from "pdf-lib";

interface Props {
  onBack: () => void;
}

interface SplitResult {
  name: string;
  blob: Blob;
  pages: number;
}

function parseRanges(input: string, maxPages: number): number[][] {
  const ranges: number[][] = [];
  const parts = input.split(",").map((s) => s.trim()).filter(Boolean);
  for (const part of parts) {
    if (part.includes("-")) {
      const [start, end] = part.split("-").map((n) => parseInt(n.trim(), 10));
      if (isNaN(start) || isNaN(end) || start < 1 || end > maxPages || start > end) {
        throw new Error(`Intervalo inválido: ${part}`);
      }
      const indices: number[] = [];
      for (let i = start; i <= end; i++) indices.push(i - 1);
      ranges.push(indices);
    } else {
      const num = parseInt(part, 10);
      if (isNaN(num) || num < 1 || num > maxPages) {
        throw new Error(`Página inválida: ${part}`);
      }
      ranges.push([num - 1]);
    }
  }
  return ranges;
}

export function DividirPDF({ onBack }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [mode, setMode] = useState<"individual" | "custom">("individual");
  const [rangeInput, setRangeInput] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState<SplitResult[]>([]);

  const handleFile = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const f = files[0];
    if (f.type !== "application/pdf") return;
    setResults([]);
    setError("");
    try {
      const arrayBuffer = await f.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      setFile(f);
      setPageCount(pdfDoc.getPageCount());
    } catch {
      setError("Não foi possível ler o PDF. Pode estar protegido por senha ou corrompido.");
    }
  }, []);

  const splitPdf = async () => {
    if (!file) return;
    setProcessing(true);
    setError("");
    setResults([]);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const srcPdf = await PDFDocument.load(arrayBuffer);
      const newResults: SplitResult[] = [];
      const baseName = file.name.replace(/\.pdf$/i, "");

      if (mode === "individual") {
        for (let i = 0; i < pageCount; i++) {
          const newPdf = await PDFDocument.create();
          const [copiedPage] = await newPdf.copyPages(srcPdf, [i]);
          newPdf.addPage(copiedPage);
          const bytes = await newPdf.save();
          newResults.push({
            name: `${baseName}_pagina_${i + 1}.pdf`,
            blob: new Blob([bytes], { type: "application/pdf" }),
            pages: 1,
          });
        }
      } else {
        const ranges = parseRanges(rangeInput, pageCount);
        for (let r = 0; r < ranges.length; r++) {
          const newPdf = await PDFDocument.create();
          const copiedPages = await newPdf.copyPages(srcPdf, ranges[r]);
          copiedPages.forEach((p) => newPdf.addPage(p));
          const bytes = await newPdf.save();
          const first = ranges[r][0] + 1;
          const last = ranges[r][ranges[r].length - 1] + 1;
          newResults.push({
            name: `${baseName}_${first}-${last}.pdf`,
            blob: new Blob([bytes], { type: "application/pdf" }),
            pages: ranges[r].length,
          });
        }
      }

      setResults(newResults);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao dividir o PDF.");
    } finally {
      setProcessing(false);
    }
  };

  const downloadResult = (result: SplitResult) => {
    const url = URL.createObjectURL(result.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = result.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout
      title="Dividir PDF"
      emoji="✂️"
      category="Utilidades"
      description="Divida um PDF em páginas individuais ou em intervalos customizados, direto no navegador."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["editor pdf"]} label="editor pdf" />}
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

        {file && pageCount > 0 && (
          <>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <p className="text-sm text-white">
                <FileText className="w-4 h-4 inline mr-1" />
                {file.name} — {pageCount} página(s)
              </p>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="split-mode"
                  checked={mode === "individual"}
                  onChange={() => setMode("individual")}
                  className="accent-blue-500"
                />
                <span className="text-sm text-gray-300">Todas as páginas separadas (um arquivo por página)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="split-mode"
                  checked={mode === "custom"}
                  onChange={() => setMode("custom")}
                  className="accent-blue-500"
                />
                <span className="text-sm text-gray-300">Intervalo customizado</span>
              </label>
            </div>

            {mode === "custom" && (
              <div>
                <span className="text-sm text-gray-400 mb-1 block">
                  Defina os intervalos (ex: 1-3, 4-6, 7-10)
                </span>
                <input
                  type="text"
                  value={rangeInput}
                  onChange={(e) => setRangeInput(e.target.value)}
                  placeholder="1-3, 4-6"
                  className="input-field text-sm"
                />
              </div>
            )}

            <button
              onClick={splitPdf}
              disabled={processing || (mode === "custom" && !rangeInput.trim())}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {processing ? (
                "Dividindo..."
              ) : (
                <>
                  <Scissors className="w-5 h-5" />
                  Dividir PDF
                </>
              )}
            </button>
          </>
        )}

        {results.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-green-400 font-semibold text-center">
              {results.length} arquivo(s) gerado(s):
            </p>
            {results.map((result, i) => (
              <div key={i} className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/10">
                <FileText className="w-5 h-5 text-red-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{result.name}</p>
                  <p className="text-xs text-gray-500">{result.pages} página(s)</p>
                </div>
                <button
                  onClick={() => downloadResult(result)}
                  className="btn-secondary flex items-center gap-1 text-sm"
                >
                  <FileDown className="w-4 h-4" />
                  Baixar
                </button>
              </div>
            ))}
          </div>
        )}

        {!file && !error && (
          <div className="text-center py-8 text-gray-500">
            <Scissors className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Selecione um PDF para dividir em arquivos menores</p>
          </div>
        )}
      </div>

      <ToolContent
        toolName="Dividir PDF"
        category="Utilidades"
        data={{
          directAnswer: "Dividir um PDF separa suas páginas em arquivos menores, seja em páginas individuais ou em grupos de páginas definidos por você.",
          howItWorks: "A ferramenta lê o PDF original e, conforme a opção escolhida, cria novos arquivos PDF contendo apenas as páginas selecionadas. É possível dividir em páginas individuais (um arquivo por página) ou definir intervalos customizados (por exemplo, separar um documento de 10 páginas em 3 arquivos: páginas 1-3, 4-6 e 7-10). Todo o processamento acontece localmente no navegador.",
          example: {
            title: "Exemplo: dividindo um PDF de 6 páginas em 2 partes",
            steps: [
              "PDF original: 6 páginas",
              'Intervalo definido: "1-3, 4-6"',
              "Resultado: 2 arquivos PDF, o primeiro com páginas 1-3, o segundo com páginas 4-6",
            ],
            result: "O documento original foi dividido em 2 arquivos menores, prontos para download separado.",
          },
          faqs: [
            { question: "Posso dividir em páginas individuais?", answer: 'Sim, escolha a opção "Todas as páginas separadas" para gerar um arquivo PDF para cada página do documento original.' },
            { question: "Como defino intervalos customizados?", answer: 'Digite os intervalos separados por vírgula, por exemplo "1-3, 4-6, 7-10" para criar 3 arquivos com essas páginas.' },
            { question: "Meu PDF é enviado para algum servidor?", answer: "Não, toda a divisão acontece localmente no seu navegador." },
            { question: "PDFs protegidos por senha funcionam?", answer: "PDFs protegidos por senha podem não ser processados corretamente sem autenticação prévia." },
          ],
        }}
      />
    </ToolLayout>
  );
}
