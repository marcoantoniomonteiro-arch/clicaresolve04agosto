import React, { useState, useCallback } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { FileDown, FileText, Hash } from "lucide-react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

interface Props {
  onBack: () => void;
}

type Position = "footer-center" | "footer-right" | "footer-left" | "top-right" | "top-center" | "top-left";
type Format = "1" | "page-1" | "1-of-n" | "page-1-of-n";

export function NumerarPaginasPDF({ onBack }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [position, setPosition] = useState<Position>("footer-center");
  const [format, setFormat] = useState<Format>("1-of-n");
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

  const formatPageText = (current: number, total: number): string => {
    switch (format) {
      case "1": return `${current}`;
      case "page-1": return `Página ${current}`;
      case "1-of-n": return `${current} de ${total}`;
      case "page-1-of-n": return `Página ${current} de ${total}`;
    }
  };

  const numberPdf = async () => {
    if (!file) return;
    setProcessing(true);
    setError("");
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontSize = 10;
      const pages = pdfDoc.getPages();

      pages.forEach((page, index) => {
        const currentNum = startNumber + index;
        const text = formatPageText(currentNum, pageCount);
        const textWidth = font.widthOfTextAtSize(text, fontSize);
        const { width, height } = page.getSize();
        const margin = 15;

        let x: number, y: number;
        switch (position) {
          case "footer-center":
            x = width / 2 - textWidth / 2;
            y = margin;
            break;
          case "footer-right":
            x = width - textWidth - margin;
            y = margin;
            break;
          case "footer-left":
            x = margin;
            y = margin;
            break;
          case "top-right":
            x = width - textWidth - margin;
            y = height - margin - fontSize;
            break;
          case "top-center":
            x = width / 2 - textWidth / 2;
            y = height - margin - fontSize;
            break;
          case "top-left":
            x = margin;
            y = height - margin - fontSize;
            break;
        }

        page.drawText(text, {
          x,
          y,
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
      a.download = file.name.replace(/\.pdf$/i, "_numerado.pdf");
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Erro ao numerar o PDF. O arquivo pode estar protegido ou corrompido.");
    } finally {
      setProcessing(false);
    }
  };

  const positions: { value: Position; label: string }[] = [
    { value: "footer-center", label: "Rodapé — Centro" },
    { value: "footer-right", label: "Rodapé — Direita" },
    { value: "footer-left", label: "Rodapé — Esquerda" },
    { value: "top-right", label: "Topo — Direita" },
    { value: "top-center", label: "Topo — Centro" },
    { value: "top-left", label: "Topo — Esquerda" },
  ];

  const formats: { value: Format; label: string }[] = [
    { value: "1", label: "1" },
    { value: "page-1", label: "Página 1" },
    { value: "1-of-n", label: "1 de N" },
    { value: "page-1-of-n", label: "Página 1 de N" },
  ];

  return (
    <ToolLayout
      title="Numerar Páginas PDF"
      emoji="🔢"
      category="Utilidades"
      description="Adicione numeração automática nas páginas de um PDF, na posição e formato que você escolher."
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
              <span className="text-sm text-gray-400 mb-1 block">Posição do número</span>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value as Position)}
                className="input-field text-sm"
              >
                {positions.map((p) => (
                  <option key={p.value} value={p.value} className="bg-gray-800">
                    {p.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <span className="text-sm text-gray-400 mb-1 block">Formato da numeração</span>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as Format)}
                className="input-field text-sm"
              >
                {formats.map((f) => (
                  <option key={f.value} value={f.value} className="bg-gray-800">
                    {f.label}
                  </option>
                ))}
              </select>
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

            <button
              onClick={numberPdf}
              disabled={processing}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {processing ? (
                "Numerando..."
              ) : (
                <>
                  <Hash className="w-5 h-5" />
                  Numerar PDF
                </>
              )}
            </button>
          </>
        )}

        {!file && !error && (
          <div className="text-center py-8 text-gray-500">
            <Hash className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Selecione um PDF para adicionar numeração nas páginas</p>
          </div>
        )}
      </div>

      <ToolContent
        toolName="Numerar Páginas PDF"
        category="Utilidades"
        data={{
          directAnswer: "Numerar páginas de um PDF adiciona automaticamente o número de cada página no local escolhido (rodapé ou topo), facilitando a organização e referência do documento.",
          howItWorks: "A ferramenta insere um texto com o número da página em cada página do documento, na posição e formato escolhidos (por exemplo, apenas o número, ou 'Página X de Y'). Isso é útil para documentos longos, contratos, apostilas ou qualquer material que se beneficie de numeração clara para referência e organização.",
          example: {
            title: "Exemplo: numerando um PDF de 10 páginas",
            steps: [
              "PDF original: 10 páginas, sem numeração",
              "Posição escolhida: rodapé, centro",
              'Formato escolhido: "Página 1 de 10"',
              "Resultado: cada página exibe sua numeração no rodapé central",
            ],
            result: "O documento agora tem numeração clara em todas as páginas, facilitando referências e organização.",
          },
          faqs: [
            { question: "Posso escolher onde o número aparece na página?", answer: "Sim, você pode escolher entre rodapé ou topo, em diferentes alinhamentos (esquerda, centro, direita)." },
            { question: "Posso começar a numeração de um número diferente de 1?", answer: "Sim, é possível definir um número inicial customizado, útil quando o documento é parte de uma sequência maior." },
            { question: "Meu PDF é enviado para algum servidor?", answer: "Não, todo o processamento acontece localmente no seu navegador." },
            { question: "A numeração pode ser removida depois?", answer: "Esta ferramenta gera um novo arquivo com a numeração já incorporada ao conteúdo; para removê-la seria necessário editar o PDF em outro editor." },
          ],
        }}
      />
    </ToolLayout>
  );
}
