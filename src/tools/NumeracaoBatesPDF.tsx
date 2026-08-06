import React, { useState, useCallback } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { FileDown, FileText, Scale } from "lucide-react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

interface Props {
  onBack: () => void;
}

export function NumeracaoBatesPDF({ onBack }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [prefix, setPrefix] = useState("PROC-2026-");
  const [digits, setDigits] = useState(6);
  const [startNumber, setStartNumber] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const handleFile = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const f = files[0];
    if (f.type !== "application/pdf") return;
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

  const applyBates = async () => {
    if (!file) return;
    setProcessing(true);
    setError("");
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontSize = 9;
      const pages = pdfDoc.getPages();

      pages.forEach((page, index) => {
        const currentNum = startNumber + index;
        const padded = String(currentNum).padStart(digits, "0");
        const code = `${prefix}${padded}`;
        const textWidth = font.widthOfTextAtSize(code, fontSize);
        const { width } = page.getSize();
        const margin = 15;

        page.drawText(code, {
          x: width - textWidth - margin,
          y: margin,
          size: fontSize,
          font,
          color: rgb(0, 0, 0),
        });
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(/\.pdf$/i, "_bates.pdf");
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Erro ao aplicar a numeração Bates. O arquivo pode estar protegido ou corrompido.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolLayout
      title="Numeração Bates PDF"
      emoji="⚖️"
      category="Utilidades"
      description="Aplique numeração Bates (código sequencial com prefixo e zeros à esquerda) em todas as páginas de um PDF."
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
              <span className="text-sm text-gray-400 mb-1 block">Prefixo (opcional)</span>
              <input
                type="text"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                placeholder="PROC-2026-"
                className="input-field text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-sm text-gray-400 mb-1 block">Dígitos (zeros à esquerda)</span>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={digits}
                  onChange={(e) => setDigits(Math.max(1, Math.min(10, parseInt(e.target.value) || 6)))}
                  className="input-field text-sm"
                />
              </div>
              <div>
                <span className="text-sm text-gray-400 mb-1 block">Número inicial</span>
                <input
                  type="number"
                  min={1}
                  value={startNumber}
                  onChange={(e) => setStartNumber(Math.max(1, parseInt(e.target.value) || 1))}
                  className="input-field text-sm"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <p className="text-xs text-gray-400">Prévia do primeiro código:</p>
              <p className="text-sm text-white font-mono mt-1">
                {prefix}{String(startNumber).padStart(digits, "0")}
              </p>
            </div>

            <button
              onClick={applyBates}
              disabled={processing}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {processing ? "Numerando..." : (
                <>
                  <Scale className="w-5 h-5" />
                  Aplicar Numeração Bates
                </>
              )}
            </button>
          </>
        )}

        {!file && !error && (
          <div className="text-center py-8 text-gray-500">
            <Scale className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Selecione um PDF para aplicar a numeração Bates</p>
          </div>
        )}
      </div>

      <ToolContent
        toolName="Numeração Bates PDF"
        category="Utilidades"
        data={{
          directAnswer: "A numeração Bates é um sistema de identificação único usado em processos jurídicos, onde cada página recebe um código sequencial (geralmente com prefixo e zeros à esquerda) para referência e organização de documentos.",
          howItWorks: "A ferramenta aplica um código sequencial único em cada página do PDF, seguindo o padrão de numeração Bates comumente usado em processos legais e due diligence: um prefixo opcional (identificando o caso ou empresa), seguido de um número com zeros à esquerda para manter um comprimento fixo (por exemplo, 000001, 000002, etc.). Isso facilita a referência exata de qualquer página específica em grandes volumes de documentos.",
          example: {
            title: "Exemplo: numerando um processo com 3 páginas",
            steps: [
              'Prefixo: "PROC-2026-"',
              "Dígitos: 6, número inicial: 1",
              "Resultado: PROC-2026-000001, PROC-2026-000002, PROC-2026-000003",
              "Cada página exibe seu código único no rodapé",
            ],
            result: "Cada página agora tem um identificador único e sequencial, facilitando a referência em processos jurídicos.",
          },
          faqs: [
            { question: "O que é numeração Bates?", answer: "É um sistema de identificação sequencial de páginas, muito usado em processos jurídicos e due diligence, para referenciar documentos de forma exata e organizada." },
            { question: "Posso usar sem prefixo?", answer: "Sim, o prefixo é opcional — você pode usar apenas a numeração sequencial se preferir." },
            { question: "Meu PDF é enviado para algum servidor?", answer: "Não, todo o processamento acontece localmente no seu navegador." },
            { question: "Posso definir quantos dígitos o número deve ter?", answer: "Sim, você escolhe quantos dígitos usar (com zeros à esquerda), sendo 6 dígitos o padrão mais comum." },
          ],
        }}
      />
    </ToolLayout>
  );
}
