import React, { useState, useRef, useCallback } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { FileDown, X, FileText, ChevronUp, ChevronDown } from "lucide-react";
import { PDFDocument } from "pdf-lib";

interface Props {
  onBack: () => void;
}

interface PdfItem {
  id: string;
  file: File;
  name: string;
  pageCount: number;
}

export function JuntarPDF({ onBack }: Props) {
  const [pdfs, setPdfs] = useState<PdfItem[]>([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files) return;
    const newItems: PdfItem[] = [];
    for (const file of Array.from(files)) {
      if (file.type !== "application/pdf") continue;
      try {
        const arrayBuffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        newItems.push({
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          file,
          name: file.name,
          pageCount: pdfDoc.getPageCount(),
        });
      } catch {
        setError(`Não foi possível ler "${file.name}". Pode estar protegido por senha ou corrompido.`);
      }
    }
    setPdfs((prev) => {
      const updated = [...prev, ...newItems];
      setTotalPages(updated.reduce((sum, p) => sum + p.pageCount, 0));
      return updated;
    });
  }, []);

  const removePdf = (id: string) => {
    setPdfs((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      setTotalPages(updated.reduce((sum, p) => sum + p.pageCount, 0));
      return updated;
    });
  };

  const movePdf = (index: number, direction: -1 | 1) => {
    setPdfs((prev) => {
      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      const copy = [...prev];
      [copy[index], copy[newIndex]] = [copy[newIndex], copy[index]];
      return copy;
    });
  };

  const mergePdfs = async () => {
    if (pdfs.length < 2) return;
    setProcessing(true);
    setError("");
    try {
      const mergedPdf = await PDFDocument.create();

      for (const item of pdfs) {
        const arrayBuffer = await item.file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const pdfBytes = await mergedPdf.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "documentos-juntados.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Erro ao juntar os PDFs. Verifique se todos os arquivos estão válidos.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolLayout
      title="Juntar PDFs"
      emoji="📎"
      category="Utilidades"
      description="Junte vários arquivos PDF em um único documento, na ordem que você definir, direto no navegador."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["editor pdf"]} label="editor pdf" />}
    >
      <div className="space-y-4">
        <div>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Selecione dois ou mais arquivos PDF</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              multiple
              onChange={(e) => handleFiles(e.target.files)}
              className="input-field text-sm"
            />
          </label>
        </div>

        {error && (
          <p className="text-sm text-red-400 text-center">{error}</p>
        )}

        {pdfs.length > 0 && (
          <>
            <div className="space-y-2">
              {pdfs.map((item, index) => (
                <div key={item.id} className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/10">
                  <div className="w-10 h-10 rounded-lg bg-red-400/10 border border-red-400/20 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-red-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.pageCount} página(s)</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => movePdf(index, -1)}
                      disabled={index === 0}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      aria-label="Mover para cima"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => movePdf(index, 1)}
                      disabled={index === pdfs.length - 1}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      aria-label="Mover para baixo"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removePdf(item.id)}
                      className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors"
                      aria-label="Remover PDF"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-green-400/10 border border-green-400/20 text-center">
              <p className="text-sm text-green-400 font-semibold">
                Total: {totalPages} página(s) em {pdfs.length} arquivo(s)
              </p>
            </div>

            <button
              onClick={mergePdfs}
              disabled={processing || pdfs.length < 2}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {processing ? (
                "Juntando..."
              ) : (
                <>
                  <FileDown className="w-5 h-5" />
                  Juntar PDFs
                </>
              )}
            </button>

            {pdfs.length < 2 && (
              <p className="text-xs text-gray-500 text-center">
                Adicione pelo menos 2 arquivos PDF para juntar
              </p>
            )}
          </>
        )}

        {pdfs.length === 0 && !error && (
          <div className="text-center py-8 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Selecione dois ou mais PDFs para juntar em um único arquivo</p>
          </div>
        )}
      </div>

      <ToolContent
        toolName="Juntar PDFs"
        category="Utilidades"
        data={{
          directAnswer: "Para juntar vários arquivos PDF em um único documento, basta enviar os arquivos na ordem desejada e a ferramenta os combina automaticamente, preservando todas as páginas de cada um.",
          howItWorks: "A ferramenta lê cada arquivo PDF enviado e copia todas as suas páginas, na ordem em que os arquivos foram organizados na lista, para um novo documento PDF único. Isso é diferente de simplesmente 'colar' os arquivos — cada página é processada e reinserida no documento final, preservando o conteúdo original de texto e imagens. Você pode reordenar os arquivos antes de juntar, arrastando-os na lista ou usando os botões de mover, para controlar exatamente a ordem final das páginas.",
          example: {
            title: "Exemplo: juntando 3 PDFs em um único arquivo",
            steps: [
              "Envie 3 arquivos: Contrato.pdf (2 páginas), Anexo1.pdf (1 página), Anexo2.pdf (3 páginas)",
              "Organize a ordem desejada na lista",
              'Clique em "Juntar PDFs"',
              "Resultado: um único arquivo PDF com 6 páginas no total, na ordem definida",
            ],
            result: "Os 3 documentos separados viraram um único arquivo PDF de 6 páginas, pronto para compartilhar ou imprimir.",
          },
          faqs: [
            { question: "Meus arquivos PDF são enviados para algum servidor?", answer: "Não, toda a junção acontece localmente no seu navegador, sem enviar os arquivos para nenhum lugar." },
            { question: "Posso juntar mais de 2 arquivos de uma vez?", answer: "Sim, não há limite prático de arquivos — você pode adicionar quantos PDFs quiser à lista antes de juntar." },
            { question: "Posso mudar a ordem dos arquivos antes de juntar?", answer: "Sim, use os botões de reordenar (ou arraste) para definir a ordem exata em que os arquivos aparecerão no documento final." },
            { question: "PDFs protegidos por senha podem ser juntados?", answer: "PDFs protegidos por senha podem não ser processados corretamente, já que exigem autenticação antes de serem abertos e manipulados." },
          ],
        }}
      />
    </ToolLayout>
  );
}
