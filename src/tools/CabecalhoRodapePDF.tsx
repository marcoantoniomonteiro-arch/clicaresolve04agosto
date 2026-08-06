import React, { useState, useCallback } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { FileDown, FileText, Heading } from "lucide-react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

interface Props {
  onBack: () => void;
}

type Align = "left" | "center" | "right";

export function CabecalhoRodapePDF({ onBack }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [headerText, setHeaderText] = useState("");
  const [footerText, setFooterText] = useState("");
  const [headerAlign, setHeaderAlign] = useState<Align>("center");
  const [footerAlign, setFooterAlign] = useState<Align>("left");
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

  const drawAlignedText = (
    page: any,
    text: string,
    font: any,
    fontSize: number,
    align: Align,
    y: number,
    isTop: boolean
  ) => {
    const { width, height } = page.getSize();
    const textWidth = font.widthOfTextAtSize(text, fontSize);
    const margin = 30;
    let x: number;
    switch (align) {
      case "left": x = margin; break;
      case "center": x = width / 2 - textWidth / 2; break;
      case "right": x = width - textWidth - margin; break;
    }
    const drawY = isTop ? height - margin : margin;
    page.drawText(text, { x, y: drawY, size: fontSize, font, color: rgb(0, 0, 0) });
  };

  const applyHeaderFooter = async () => {
    if (!file) return;
    if (!headerText.trim() && !footerText.trim()) {
      setError("Preencha pelo menos o cabeçalho ou o rodapé.");
      return;
    }
    setProcessing(true);
    setError("");
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontSize = 10;
      const pages = pdfDoc.getPages();

      pages.forEach((page) => {
        if (headerText.trim()) {
          drawAlignedText(page, headerText, font, fontSize, headerAlign, 0, true);
        }
        if (footerText.trim()) {
          drawAlignedText(page, footerText, font, fontSize, footerAlign, 0, false);
        }
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(/\.pdf$/i, "_cabecalho-rodape.pdf");
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Erro ao processar o PDF. O arquivo pode estar protegido ou corrompido.");
    } finally {
      setProcessing(false);
    }
  };

  const alignButtons = (value: Align, onChange: (a: Align) => void) => (
    <div className="flex gap-2">
      {(["left", "center", "right"] as Align[]).map((a) => (
        <button
          key={a}
          onClick={() => onChange(a)}
          className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
            value === a ? "bg-blue-500 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"
          }`}
        >
          {a === "left" ? "Esquerda" : a === "center" ? "Centro" : "Direita"}
        </button>
      ))}
    </div>
  );

  return (
    <ToolLayout
      title="Cabeçalho e Rodapé PDF"
      emoji="📋"
      category="Utilidades"
      description="Adicione um texto fixo no topo e/ou na base de todas as páginas de um PDF, com alinhamento independente."
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
              <span className="text-sm text-gray-400 block">Cabeçalho (opcional)</span>
              <input
                type="text"
                value={headerText}
                onChange={(e) => setHeaderText(e.target.value)}
                placeholder="Ex: Relatório Anual 2026"
                className="input-field text-sm"
              />
              {alignButtons(headerAlign, setHeaderAlign)}
            </div>

            <div className="space-y-2">
              <span className="text-sm text-gray-400 block">Rodapé (opcional)</span>
              <input
                type="text"
                value={footerText}
                onChange={(e) => setFooterText(e.target.value)}
                placeholder="Ex: Confidencial — Uso Interno"
                className="input-field text-sm"
              />
              {alignButtons(footerAlign, setFooterAlign)}
            </div>

            <button
              onClick={applyHeaderFooter}
              disabled={processing}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {processing ? "Processando..." : (
                <>
                  <FileDown className="w-5 h-5" />
                  Gerar PDF
                </>
              )}
            </button>
          </>
        )}

        {!file && !error && (
          <div className="text-center py-8 text-gray-500">
            <Heading className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Selecione um PDF para adicionar cabeçalho e/ou rodapé</p>
          </div>
        )}
      </div>

      <ToolContent
        toolName="Cabeçalho e Rodapé PDF"
        category="Utilidades"
        data={{
          directAnswer: "Adicionar cabeçalho e rodapé insere um texto fixo (como o nome de um documento ou empresa) no topo e/ou na base de todas as páginas do PDF.",
          howItWorks: "A ferramenta insere o texto definido para cabeçalho no topo de cada página e o texto de rodapé na base, mantendo o mesmo alinhamento e posição em todas as páginas do documento. É útil para identificar relatórios, contratos ou apostilas com informações recorrentes como nome do documento, data ou empresa responsável.",
          example: {
            title: "Exemplo: adicionando cabeçalho e rodapé a um relatório",
            steps: [
              "PDF original: 8 páginas",
              'Cabeçalho: "Relatório Anual 2026" (centralizado)',
              'Rodapé: "Confidencial - Uso Interno" (esquerda)',
              "Resultado: todas as páginas exibem o cabeçalho e rodapé definidos",
            ],
            result: "O documento agora tem identificação consistente em todas as páginas.",
          },
          faqs: [
            { question: "Posso usar só cabeçalho ou só rodapé?", answer: "Sim, basta preencher apenas o campo que deseja usar." },
            { question: "O texto aparece em todas as páginas?", answer: "Sim, é aplicado automaticamente em todas as páginas do documento." },
            { question: "Meu PDF é enviado para algum servidor?", answer: "Não, todo o processamento acontece localmente no seu navegador." },
            { question: "Posso alinhar o texto de forma diferente no cabeçalho e no rodapé?", answer: "Sim, cada um tem sua própria opção de alinhamento independente." },
          ],
        }}
      />
    </ToolLayout>
  );
}
