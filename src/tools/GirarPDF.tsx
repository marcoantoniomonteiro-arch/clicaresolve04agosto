import React, { useState, useCallback } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { FileDown, FileText, RotateCw } from "lucide-react";
import { PDFDocument, degrees } from "pdf-lib";

interface Props {
  onBack: () => void;
}

type Angle = 90 | 180 | 270;

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
  return [...new Set(result)];
}

export function GirarPDF({ onBack }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [target, setTarget] = useState<"all" | "specific">("all");
  const [pageInput, setPageInput] = useState("");
  const [angle, setAngle] = useState<Angle>(90);
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

  const rotatePdf = async () => {
    if (!file) return;
    setProcessing(true);
    setError("");
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();

      let indicesToRotate: number[];
      if (target === "all") {
        indicesToRotate = pages.map((_, i) => i);
      } else {
        indicesToRotate = parsePages(pageInput, pageCount);
      }

      for (const idx of indicesToRotate) {
        const page = pages[idx];
        const currentRotation = page.getRotation().angle;
        page.setRotation(degrees((currentRotation + angle) % 360));
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(/\.pdf$/i, "_girado.pdf");
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao girar o PDF.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolLayout
      title="Girar PDF"
      emoji="🔄"
      category="Utilidades"
      description="Gire páginas de um PDF em 90°, 180° ou 270°, corrigindo a orientação de documentos escaneados."
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
                  name="rotate-target"
                  checked={target === "all"}
                  onChange={() => setTarget("all")}
                  className="accent-blue-500"
                />
                <span className="text-sm text-gray-300">Girar todas as páginas</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="rotate-target"
                  checked={target === "specific"}
                  onChange={() => setTarget("specific")}
                  className="accent-blue-500"
                />
                <span className="text-sm text-gray-300">Girar páginas específicas</span>
              </label>
            </div>

            {target === "specific" && (
              <div>
                <span className="text-sm text-gray-400 mb-1 block">
                  Quais páginas girar (ex: 2, 4 ou 1-3, 5-7)
                </span>
                <input
                  type="text"
                  value={pageInput}
                  onChange={(e) => setPageInput(e.target.value)}
                  placeholder="2, 4"
                  className="input-field text-sm"
                />
              </div>
            )}

            <div>
              <span className="text-sm text-gray-400 mb-1 block">Ângulo de rotação</span>
              <div className="flex gap-2">
                {([90, 180, 270] as Angle[]).map((a) => (
                  <button
                    key={a}
                    onClick={() => setAngle(a)}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
                      angle === a
                        ? "bg-blue-500 text-white"
                        : "bg-white/5 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    {a}°
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={rotatePdf}
              disabled={processing || (target === "specific" && !pageInput.trim())}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {processing ? (
                "Girando..."
              ) : (
                <>
                  <RotateCw className="w-5 h-5" />
                  Girar PDF
                </>
              )}
            </button>
          </>
        )}

        {!file && !error && (
          <div className="text-center py-8 text-gray-500">
            <RotateCw className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Selecione um PDF para girar suas páginas</p>
          </div>
        )}
      </div>

      <ToolContent
        toolName="Girar PDF"
        category="Utilidades"
        data={{
          directAnswer: "Girar um PDF ajusta a orientação de uma ou mais páginas em 90°, 180° ou 270°, útil para corrigir documentos escaneados de lado ou de cabeça para baixo.",
          howItWorks: "A ferramenta lê o PDF e aplica uma rotação nas páginas selecionadas, sem alterar o conteúdo em si — apenas o ângulo de visualização da página. Isso é comumente necessário quando um documento foi escaneado incorretamente ou quando páginas específicas precisam de orientação diferente do restante do arquivo. Você pode escolher girar todas as páginas de uma vez ou apenas páginas específicas do documento.",
          example: {
            title: "Exemplo: girando páginas escaneadas de lado",
            steps: [
              "PDF com 5 páginas, sendo as páginas 2 e 4 escaneadas de lado",
              "Seleção: páginas 2 e 4",
              "Ângulo escolhido: 90°",
              "Resultado: PDF com todas as páginas na orientação correta",
            ],
            result: "As páginas selecionadas foram giradas para a orientação correta, sem afetar o restante do documento.",
          },
          faqs: [
            { question: "Posso girar apenas algumas páginas específicas?", answer: "Sim, você pode selecionar quais páginas girar, sem afetar as demais." },
            { question: "Quais ângulos de rotação estão disponíveis?", answer: "90°, 180° e 270°, cobrindo os casos mais comuns de correção de orientação." },
            { question: "Meu PDF é enviado para algum servidor?", answer: "Não, todo o processamento acontece localmente no seu navegador." },
            { question: "Girar o PDF afeta a qualidade do conteúdo?", answer: "Não, apenas o ângulo de exibição da página é alterado — o conteúdo original permanece intacto." },
          ],
        }}
      />
    </ToolLayout>
  );
}
