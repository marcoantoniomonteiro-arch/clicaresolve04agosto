import React, { useState, useCallback } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { FileDown, FileText, Pin } from "lucide-react";
import { PDFDocument } from "pdf-lib";

interface Props {
  onBack: () => void;
}

export function AchatarPDF({ onBack }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [fieldCount, setFieldCount] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const handleFile = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const f = files[0];
    if (f.type !== "application/pdf") return;
    setError("");
    setInfo("");
    try {
      const arrayBuffer = await f.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      setFile(f);
      setPageCount(pdfDoc.getPageCount());
      const form = pdfDoc.getForm();
      const fields = form.getFields();
      setFieldCount(fields.length);
      if (fields.length === 0) {
        setInfo("Este PDF não possui campos de formulário para achatar.");
      } else {
        setInfo(`${fields.length} campo(s) de formulário detectado(s).`);
      }
    } catch {
      setError("Não foi possível ler o PDF. Pode estar protegido por senha ou corrompido.");
    }
  }, []);

  const flattenPdf = async () => {
    if (!file) return;
    setProcessing(true);
    setError("");
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const form = pdfDoc.getForm();
      const fields = form.getFields();

      if (fields.length === 0) {
        setError("Não há campos de formulário para achatar neste PDF.");
        return;
      }

      form.flatten();

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(/\.pdf$/i, "_achatado.pdf");
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Erro ao achatar o PDF. O arquivo pode estar protegido ou corrompido.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolLayout
      title="Achatar PDF"
      emoji="📌"
      category="Utilidades"
      description="Transforme campos de formulário preenchidos em conteúdo fixo e não editável, impedindo alterações posteriores."
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

            {info && (
              <div className={`p-3 rounded-xl border text-center ${
                fieldCount === 0
                  ? "bg-yellow-400/10 border-yellow-400/20"
                  : "bg-green-400/10 border-green-400/20"
              }`}>
                <p className={`text-sm ${fieldCount === 0 ? "text-yellow-400" : "text-green-400"}`}>
                  {info}
                </p>
              </div>
            )}

            <button
              onClick={flattenPdf}
              disabled={processing || fieldCount === 0}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {processing ? "Achatando..." : (
                <>
                  <Pin className="w-5 h-5" />
                  Achatar PDF
                </>
              )}
            </button>

            {fieldCount === 0 && (
              <p className="text-xs text-gray-500 text-center">
                Não há campos de formulário para processar neste PDF
              </p>
            )}
          </>
        )}

        {!file && !error && (
          <div className="text-center py-8 text-gray-500">
            <Pin className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Selecione um PDF com formulário para achatar os campos</p>
          </div>
        )}
      </div>

      <ToolContent
        toolName="Achatar PDF"
        category="Utilidades"
        data={{
          directAnswer: "Achatar um PDF transforma campos de formulário preenchidos (como caixas de texto e checkboxes) em conteúdo fixo e não editável, impedindo alterações posteriores nos dados preenchidos.",
          howItWorks: "PDFs com formulários interativos (campos de texto, checkboxes, menus suspensos) permitem que o conteúdo seja editado por qualquer pessoa que abra o arquivo. Ao 'achatar' o documento, esses campos preenchidos são convertidos permanentemente em texto/imagem fixa, como se fizessem parte do design original da página — o que impede edições futuras e garante que os dados preenchidos permaneçam exatamente como estão.",
          example: {
            title: "Exemplo: achatando um formulário preenchido",
            steps: [
              "PDF original: formulário com campos de texto preenchidos",
              "Processamento: conversão dos campos para conteúdo estático",
              "Resultado: PDF com a mesma aparência, mas sem campos editáveis",
            ],
            result: "O formulário preenchido agora é permanente, sem risco de alteração acidental dos dados.",
          },
          faqs: [
            { question: "O que acontece se o PDF não tiver formulário?", answer: "A ferramenta informa que não há campos de formulário para processar, já que não há nada a achatar." },
            { question: "Meu PDF é enviado para algum servidor?", answer: "Não, todo o processamento acontece localmente no seu navegador." },
            { question: "Depois de achatar, ainda posso editar os campos?", answer: "Não, esse é justamente o objetivo — tornar o conteúdo preenchido permanente e não editável." },
            { question: "A aparência visual do documento muda?", answer: "Não, o conteúdo preenchido mantém a mesma aparência, apenas deixa de ser um campo interativo." },
          ],
        }}
      />
    </ToolLayout>
  );
}
