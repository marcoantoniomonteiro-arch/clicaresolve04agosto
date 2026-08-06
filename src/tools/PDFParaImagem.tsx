import React, { useState, useRef, useCallback } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { FileUp, FileDown, FileText, AlertCircle } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

interface Props {
  onBack: () => void;
}

interface PageImage {
  pageNum: number;
  url: string;
}

export function PDFParaImagem({ onBack }: Props) {
  const [pages, setPages] = useState<PageImage[]>([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    if (!file || file.type !== "application/pdf") {
      setError("Selecione um arquivo PDF válido.");
      return;
    }
    setProcessing(true);
    setError("");
    setFileName(file.name.replace(/\.pdf$/i, ""));

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const newPages: PageImage[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) continue;
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: ctx, viewport }).promise;

        const blob = await new Promise<Blob | null>((resolve) =>
          canvas.toBlob(resolve, "image/png")
        );
        if (blob) {
          newPages.push({ pageNum: i, url: URL.createObjectURL(blob) });
        }
      }

      setPages(newPages);
    } catch {
      setError("Não foi possível processar o PDF. Pode estar protegido por senha ou corrompido.");
    } finally {
      setProcessing(false);
    }
  }, []);

  const downloadPage = (pageNum: number, url: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fileName || "pdf"}-pagina-${pageNum}.png`;
    a.click();
  };

  const downloadAll = () => {
    pages.forEach((page, i) => {
      setTimeout(() => downloadPage(page.pageNum, page.url), i * 300);
    });
  };

  const reset = () => {
    pages.forEach((p) => URL.revokeObjectURL(p.url));
    setPages([]);
    setFileName("");
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <ToolLayout
      title="PDF para Imagem"
      emoji="🖼️"
      category="Utilidades"
      description="Converta cada página de um PDF em um arquivo de imagem PNG separado, direto no navegador."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["editor pdf"]} label="editor pdf" />}
    >
      <div className="space-y-4">
        <div>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Selecione um arquivo PDF</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFile(file);
              }}
              className="input-field text-sm"
            />
          </label>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-red-400/10 border border-red-400/20">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {processing && (
          <p className="text-sm text-gray-500 text-center">Processando PDF...</p>
        )}

        {pages.length > 0 && !processing && (
          <>
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-gray-400">{pages.length} página(s) convertida(s)</p>
              <button onClick={reset} className="text-sm text-gray-400 hover:text-white transition-colors">
                Limpar
              </button>
            </div>

            <button
              onClick={downloadAll}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <FileDown className="w-5 h-5" />
              Baixar todas as imagens
            </button>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {pages.map((page) => (
                <div key={page.pageNum} className="space-y-2">
                  <div className="relative rounded-xl overflow-hidden border border-white/10 bg-white/5">
                    <img src={page.url} alt={`Página ${page.pageNum}`} className="w-full h-auto" />
                    <span className="absolute top-1.5 left-1.5 text-xs font-bold text-black bg-white/80 px-1.5 py-0.5 rounded">
                      {page.pageNum}
                    </span>
                  </div>
                  <button
                    onClick={() => downloadPage(page.pageNum, page.url)}
                    className="w-full px-2 py-1.5 rounded-lg text-xs font-medium bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-all flex items-center justify-center gap-1.5"
                  >
                    <FileDown className="w-3.5 h-3.5" />
                    Baixar
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {pages.length === 0 && !processing && !error && (
          <div className="text-center py-8 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Selecione um arquivo PDF para converter em imagens PNG</p>
          </div>
        )}
      </div>

      <ToolContent
        toolName="PDF para Imagem"
        category="Utilidades"
        data={{
          directAnswer: "Para converter um PDF em imagens, cada página do documento é transformada em um arquivo de imagem PNG separado, mantendo a qualidade visual do conteúdo original.",
          howItWorks: "A ferramenta lê o arquivo PDF diretamente no seu navegador e renderiza cada página como uma imagem de alta qualidade, sem precisar enviar o arquivo para nenhum servidor externo. Cada página do PDF se torna um arquivo PNG independente, que pode ser baixado individualmente ou em lote. Isso é útil para extrair uma imagem específica de um documento, usar o conteúdo em apresentações, ou compartilhar uma página específica sem enviar o PDF inteiro.",
          example: {
            title: "Exemplo: convertendo um PDF de 3 páginas em imagens",
            steps: [
              "Envie um arquivo PDF de 3 páginas",
              "A ferramenta processa e renderiza cada página",
              "Resultado: 3 arquivos PNG, um para cada página do documento",
              "Baixe individualmente ou todos de uma vez",
            ],
            result: "Cada página do PDF virou uma imagem PNG separada, pronta para uso.",
          },
          faqs: [
            { question: "Meu PDF é enviado para algum servidor?", answer: "Não, todo o processamento acontece localmente no seu navegador." },
            { question: "Qual a qualidade das imagens geradas?", answer: "A ferramenta renderiza as páginas em boa resolução, adequada para visualização em tela e a maioria dos usos práticos." },
            { question: "PDFs protegidos por senha funcionam?", answer: "PDFs protegidos por senha podem não ser processados corretamente, já que exigem autenticação antes de serem abertos." },
            { question: "Existe limite de páginas do PDF?", answer: "Depende da capacidade do seu navegador, mas documentos de uso comum (até algumas dezenas de páginas) funcionam normalmente." },
          ],
        }}
      />
    </ToolLayout>
  );
}
