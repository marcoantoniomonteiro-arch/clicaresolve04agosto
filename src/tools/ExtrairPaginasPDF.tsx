import React, { useState, useCallback } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { FileDown, FileText, FilePlus } from "lucide-react";
import { PDFDocument } from "pdf-lib";

interface Props {
  onBack: () => void;
}

function parsePages(input: string, maxPages: number): number[] {
  const result: number[] = [];
  const parts = input.split(",").map((s) => s.trim()).filter(Boolean);
  for (const part of parts) {
    if (part.includes("-")) {
      const [start, end] = part.split("-").map((n) => parseInt(n.trim(), 10));
      if (isNaN(start) || isNaN(end) || start < 1 || end > maxPages || start > end) {
        throw new Error(`Intervalo inválido: ${part}`);
      }
      for (let i = start; i <= end; i++) result.push(i - 1);
    } else {
      const num = parseInt(part, 10);
      if (isNaN(num) || num < 1 || num > maxPages) {
        throw new Error(`Página inválida: ${part}`);
      }
      result.push(num - 1);
    }
  }
  return result;
}

export function ExtrairPaginasPDF({ onBack }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [pageInput, setPageInput] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [resultInfo, setResultInfo] = useState<{ pages: number; downloaded: boolean } | null>(null);

  const handleFile = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const f = files[0];
    if (f.type !== "application/pdf") return;
    setError("");
    setResultInfo(null);
    try {
      const arrayBuffer = await f.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      setFile(f);
      setPageCount(pdfDoc.getPageCount());
    } catch {
      setError("Não foi possível ler o PDF. Pode estar protegido por senha ou corrompido.");
    }
  }, []);

  const extractPages = async () => {
    if (!file || !pageInput.trim()) return;
    setProcessing(true);
    setError("");
    setResultInfo(null);
    try {
      const indices = parsePages(pageInput, pageCount);
      const arrayBuffer = await file.arrayBuffer();
      const srcPdf = await PDFDocument.load(arrayBuffer);
      const newPdf = await PDFDocument.create();
      const copiedPages = await newPdf.copyPages(srcPdf, indices);
      copiedPages.forEach((p) => newPdf.addPage(p));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(/\.pdf$/i, "_paginas-extraidas.pdf");
      a.click();
      URL.revokeObjectURL(url);

      setResultInfo({ pages: indices.length, downloaded: true });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao extrair páginas do PDF.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolLayout
      title="Extrair Páginas PDF"
      emoji="📑"
      category="Utilidades"
      description="Crie um novo PDF com apenas as páginas específicas que você escolher de um documento maior."
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

            <div>
              <span className="text-sm text-gray-400 mb-1 block">
                Páginas a extrair (ex: 1, 3, 5-7)
              </span>
              <input
                type="text"
                value={pageInput}
                onChange={(e) => setPageInput(e.target.value)}
                placeholder="1, 3, 5-7"
                className="input-field text-sm"
              />
            </div>

            <button
              onClick={extractPages}
              disabled={processing || !pageInput.trim()}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {processing ? (
                "Extraindo..."
              ) : (
                <>
                  <FilePlus className="w-5 h-5" />
                  Extrair Páginas
                </>
              )}
            </button>

            {resultInfo && (
              <div className="p-3 rounded-xl bg-green-400/10 border border-green-400/20 text-center">
                <p className="text-sm text-green-400 font-semibold">
                  Novo PDF com {resultInfo.pages} página(s) gerado e baixado!
                </p>
              </div>
            )}
          </>
        )}

        {!file && !error && (
          <div className="text-center py-8 text-gray-500">
            <FilePlus className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Selecione um PDF para extrair páginas específicas</p>
          </div>
        )}
      </div>

      <ToolContent
        toolName="Extrair Páginas PDF"
        category="Utilidades"
        data={{
          directAnswer: "Extrair páginas de um PDF cria um novo arquivo contendo apenas as páginas específicas que você escolher, descartando o restante do documento original.",
          howItWorks: "A ferramenta permite selecionar páginas específicas (por número individual ou intervalo, como '1, 3, 5-7') de um PDF maior, e gera um novo arquivo contendo apenas essas páginas selecionadas, na ordem especificada. É útil quando você precisa compartilhar apenas uma parte relevante de um documento extenso, sem enviar o arquivo completo.",
          example: {
            title: "Exemplo: extraindo páginas específicas de um relatório",
            steps: [
              "PDF original: relatório de 20 páginas",
              'Páginas selecionadas: "1, 5, 10-12"',
              "Processamento: cópia apenas dessas páginas para um novo documento",
              "Resultado: novo PDF com 5 páginas (1, 5, 10, 11, 12)",
            ],
            result: "Apenas as páginas relevantes foram extraídas para um novo arquivo, pronto para compartilhar separadamente.",
          },
          faqs: [
            { question: "Como especifico quais páginas quero extrair?", answer: 'Digite os números separados por vírgula, podendo usar intervalos, por exemplo "1, 3, 5-7" extrai as páginas 1, 3, 5, 6 e 7.' },
            { question: "A ordem das páginas extraídas pode ser diferente do original?", answer: "A ordem segue como você especificar no campo, permitindo inclusive reorganizar a ordem das páginas extraídas." },
            { question: "Meu PDF é enviado para algum servidor?", answer: "Não, todo o processamento acontece localmente no seu navegador." },
            { question: "O arquivo original é alterado?", answer: "Não, a ferramenta cria um novo arquivo PDF com as páginas extraídas, sem modificar o arquivo original que você enviou." },
          ],
        }}
      />
    </ToolLayout>
  );
}
