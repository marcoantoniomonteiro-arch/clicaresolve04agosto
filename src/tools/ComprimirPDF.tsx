import React, { useState, useCallback } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { FileDown, FileText, Minimize2 } from "lucide-react";
import { PDFDocument } from "pdf-lib";

interface Props {
  onBack: () => void;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function ComprimirPDF({ onBack }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [compressedSize, setCompressedSize] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const handleFile = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    const f = files[0];
    if (f.type !== "application/pdf") return;
    setFile(f);
    setOriginalSize(f.size);
    setCompressedBlob(null);
    setCompressedSize(0);
    setError("");
  }, []);

  const compressPdf = async () => {
    if (!file) return;
    setProcessing(true);
    setError("");
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const compressedBytes = await pdfDoc.save({ useObjectStreams: true });
      const blob = new Blob([compressedBytes], { type: "application/pdf" });
      setCompressedBlob(blob);
      setCompressedSize(blob.size);
    } catch {
      setError("Erro ao comprimir o PDF. O arquivo pode estar protegido ou corrompido.");
    } finally {
      setProcessing(false);
    }
  };

  const downloadCompressed = () => {
    if (!compressedBlob || !file) return;
    const url = URL.createObjectURL(compressedBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name.replace(/\.pdf$/i, "_comprimido.pdf");
    a.click();
    URL.revokeObjectURL(url);
  };

  const reduction = originalSize > 0 && compressedSize > 0
    ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
    : 0;

  return (
    <ToolLayout
      title="Comprimir PDF"
      emoji="🗜️"
      category="Utilidades"
      description="Reduza o tamanho de um PDF otimizando sua estrutura interna, direto no navegador."
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

        {file && (
          <>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <p className="text-sm text-white">
                <FileText className="w-4 h-4 inline mr-1" />
                {file.name}
              </p>
              <p className="text-xs text-gray-500 mt-1">Tamanho original: {formatBytes(originalSize)}</p>
            </div>

            <button
              onClick={compressPdf}
              disabled={processing}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {processing ? (
                "Comprimindo..."
              ) : (
                <>
                  <Minimize2 className="w-5 h-5" />
                  Comprimir PDF
                </>
              )}
            </button>

            {compressedBlob && (
              <>
                <div className="p-3 rounded-xl bg-green-400/10 border border-green-400/20 text-center space-y-1">
                  <p className="text-sm text-green-400 font-semibold">
                    Tamanho final: {formatBytes(compressedSize)}
                  </p>
                  {reduction > 0 ? (
                    <p className="text-xs text-green-400/80">Redução de {reduction}%</p>
                  ) : (
                    <p className="text-xs text-gray-500">Sem redução significativa (PDF já otimizado ou baseado em imagens)</p>
                  )}
                </div>

                <button
                  onClick={downloadCompressed}
                  className="btn-secondary w-full flex items-center justify-center gap-2"
                >
                  <FileDown className="w-5 h-5" />
                  Baixar PDF Comprimido
                </button>
              </>
            )}
          </>
        )}

        {!file && !error && (
          <div className="text-center py-8 text-gray-500">
            <Minimize2 className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Selecione um PDF para reduzir seu tamanho</p>
          </div>
        )}
      </div>

      <ToolContent
        toolName="Comprimir PDF"
        category="Utilidades"
        data={{
          directAnswer: "A compressão de PDF no navegador reorganiza a estrutura interna do arquivo para reduzir seu tamanho, funcionando melhor em documentos com texto e menos em PDFs compostos principalmente por imagens grandes.",
          howItWorks: "A ferramenta reprocessa o arquivo PDF otimizando a forma como os objetos internos (texto, formatação, metadados) são armazenados, reduzindo redundâncias. É importante saber que esta compressão, por rodar inteiramente no navegador, tem limitações em comparação a serviços que processam em servidores: ela não recomprime imagens incorporadas no PDF. Por isso, funciona melhor em documentos com bastante texto e formatação, e tem efeito mais limitado em PDFs de scanner ou com fotos em alta resolução.",
          example: {
            title: "Exemplo: comprimindo um PDF de texto",
            steps: [
              "PDF original: 2.4 MB (documento com bastante texto e formatação)",
              "Processamento de otimização de estrutura interna",
              "PDF comprimido: aproximadamente 1.8 MB",
              "Redução: cerca de 25%",
            ],
            result: "O PDF ficou menor, mantendo todo o conteúdo original, ideal para documentos de texto.",
          },
          faqs: [
            { question: "Essa compressão funciona tão bem quanto sites como Smallpdf?", answer: "Parcialmente — por rodar no navegador (sem servidor), esta ferramenta não recomprime imagens incorporadas, funcionando melhor em PDFs com bastante texto do que em PDFs de imagens/scanner." },
            { question: "Meu PDF é enviado para algum servidor?", answer: "Não, todo o processamento acontece localmente no seu navegador." },
            { question: "Vou perder qualidade ou conteúdo do PDF?", answer: "Não, o conteúdo (texto, imagens, formatação) permanece o mesmo — apenas a estrutura interna do arquivo é otimizada." },
            { question: "Por que meu PDF não reduziu muito de tamanho?", answer: "Se o PDF for composto principalmente por imagens de alta resolução ou já estiver otimizado, a redução pode ser pequena, já que este método foca na estrutura interna, não na recompressão de imagens." },
          ],
        }}
      />
    </ToolLayout>
  );
}
