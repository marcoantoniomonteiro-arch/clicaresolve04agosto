import React, { useState, useCallback } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { FileDown, FileText, Droplet } from "lucide-react";
import { PDFDocument, StandardFonts, degrees, rgb } from "pdf-lib";

interface Props {
  onBack: () => void;
}

export function MarcaDaguaPDF({ onBack }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [watermarkText, setWatermarkText] = useState("CONFIDENCIAL");
  const [fontSize, setFontSize] = useState(50);
  const [opacity, setOpacity] = useState(0.3);
  const [rotation, setRotation] = useState(45);
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

  const addWatermark = async () => {
    if (!file || !watermarkText.trim()) return;
    setProcessing(true);
    setError("");
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const pages = pdfDoc.getPages();

      pages.forEach((page) => {
        const { width, height } = page.getSize();
        const textWidth = font.widthOfTextAtSize(watermarkText, fontSize);
        const x = width / 2 - textWidth / 2;
        const y = height / 2 - fontSize / 2;

        page.drawText(watermarkText, {
          x,
          y,
          size: fontSize,
          font,
          color: rgb(0.5, 0.5, 0.5),
          opacity,
          rotate: degrees(rotation),
        });
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(/\.pdf$/i, "_marca-dagua.pdf");
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Erro ao adicionar marca d'água. O arquivo pode estar protegido ou corrompido.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolLayout
      title="Marca D'Água PDF"
      emoji="💧"
      category="Utilidades"
      description="Adicione uma marca d'água de texto em todas as páginas de um PDF, com opacidade e ângulo ajustáveis."
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
              <span className="text-sm text-gray-400 mb-1 block">Texto da marca d'água</span>
              <input
                type="text"
                value={watermarkText}
                onChange={(e) => setWatermarkText(e.target.value)}
                placeholder="CONFIDENCIAL"
                className="input-field text-sm"
              />
            </div>

            <div>
              <span className="text-sm text-gray-400 mb-1 block">Tamanho da fonte: {fontSize}px</span>
              <input
                type="range"
                min={20}
                max={100}
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>

            <div>
              <span className="text-sm text-gray-400 mb-1 block">Opacidade: {Math.round(opacity * 100)}%</span>
              <input
                type="range"
                min={10}
                max={50}
                value={Math.round(opacity * 100)}
                onChange={(e) => setOpacity(parseInt(e.target.value) / 100)}
                className="w-full accent-blue-500"
              />
            </div>

            <div>
              <span className="text-sm text-gray-400 mb-1 block">Ângulo de rotação: {rotation}°</span>
              <input
                type="range"
                min={0}
                max={90}
                value={rotation}
                onChange={(e) => setRotation(parseInt(e.target.value))}
                className="w-full accent-blue-500"
              />
            </div>

            <button
              onClick={addWatermark}
              disabled={processing || !watermarkText.trim()}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {processing ? (
                "Adicionando..."
              ) : (
                <>
                  <Droplet className="w-5 h-5" />
                  Adicionar Marca D'Água
                </>
              )}
            </button>
          </>
        )}

        {!file && !error && (
          <div className="text-center py-8 text-gray-500">
            <Droplet className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Selecione um PDF para adicionar uma marca d'água</p>
          </div>
        )}
      </div>

      <ToolContent
        toolName="Marca D'Água PDF"
        category="Utilidades"
        data={{
          directAnswer: "Adicionar marca d'água em um PDF sobrepõe um texto semi-transparente (como 'CONFIDENCIAL' ou o nome de uma empresa) em todas as páginas do documento, útil para identificar rascunhos ou proteger documentos.",
          howItWorks: "A ferramenta insere o texto escolhido como marca d'água em todas as páginas do PDF, com opacidade reduzida e um ângulo de rotação (geralmente diagonal) para não atrapalhar a leitura do conteúdo original, mas ainda ser visível. É comumente usado para marcar documentos como 'CONFIDENCIAL', 'RASCUNHO', ou incluir o nome de uma empresa em materiais compartilhados.",
          example: {
            title: "Exemplo: marcando um documento como confidencial",
            steps: [
              "PDF original: 5 páginas",
              'Texto da marca d\'água: "CONFIDENCIAL"',
              "Opacidade: 30%, ângulo: 45°",
              "Resultado: todas as 5 páginas exibem a marca d'água diagonal e semi-transparente",
            ],
            result: "O documento agora tem a marca d'água 'CONFIDENCIAL' visível em todas as páginas, sem prejudicar a leitura do conteúdo original.",
          },
          faqs: [
            { question: "A marca d'água aparece em todas as páginas?", answer: "Sim, ela é aplicada automaticamente em todas as páginas do documento." },
            { question: "Posso ajustar a transparência da marca d'água?", answer: "Sim, use o controle de opacidade para deixá-la mais sutil ou mais visível, conforme necessário." },
            { question: "Meu PDF é enviado para algum servidor?", answer: "Não, todo o processamento acontece localmente no seu navegador." },
            { question: "Posso usar uma imagem/logo como marca d'água ao invés de texto?", answer: "Esta versão da ferramenta trabalha com marca d'água em texto; marca d'água com imagem pode ser uma evolução futura da ferramenta." },
          ],
        }}
      />
    </ToolLayout>
  );
}
