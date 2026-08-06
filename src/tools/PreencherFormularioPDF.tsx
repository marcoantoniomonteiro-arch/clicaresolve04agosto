import React, { useState, useCallback } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { FileDown, FileText, FormInput } from "lucide-react";
import { PDFDocument, PDFField } from "pdf-lib";

interface Props {
  onBack: () => void;
}

interface FieldInfo {
  name: string;
  type: string;
  value: string;
  checked: boolean;
  options: string[];
}

function getFieldType(field: PDFField): string {
  try {
    if (field.constructor.name === "PDFTextField") return "text";
    if (field.constructor.name === "PDFCheckBox") return "checkbox";
    if (field.constructor.name === "PDFRadioGroup") return "radio";
    if (field.constructor.name === "PDFDropdown") return "dropdown";
  } catch {
    // ignore
  }
  return "text";
}

export function PreencherFormularioPDF({ onBack }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [fields, setFields] = useState<FieldInfo[]>([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const handleFile = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const f = files[0];
    if (f.type !== "application/pdf") return;
    setError("");
    setInfo("");
    setFields([]);
    try {
      const arrayBuffer = await f.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      setFile(f);
      const form = pdfDoc.getForm();
      const rawFields = form.getFields();

      if (rawFields.length === 0) {
        setInfo("Este PDF não possui campos de formulário interativos.");
        return;
      }

      const fieldInfos: FieldInfo[] = rawFields.map((field) => {
        const type = getFieldType(field);
        let options: string[] = [];
        let value = "";
        let checked = false;

        try {
          if (type === "text") {
            value = (field as any).getText?.() || "";
          } else if (type === "checkbox") {
            checked = (field as any).isChecked?.() || false;
          } else if (type === "radio") {
            options = (field as any).getOptions?.() || [];
            value = (field as any).getSelected?.()?.[0] || "";
          } else if (type === "dropdown") {
            options = (field as any).getOptions?.() || [];
            value = (field as any).getSelected?.()?.[0] || "";
          }
        } catch {
          // ignore field access errors
        }

        return { name: field.getName(), type, value, checked, options };
      });

      setFields(fieldInfos);
      setInfo(`${fieldInfos.length} campo(s) detectado(s).`);
    } catch {
      setError("Não foi possível ler o PDF. Pode estar protegido por senha ou corrompido.");
    }
  }, []);

  const updateField = (index: number, updates: Partial<FieldInfo>) => {
    setFields((prev) => prev.map((f, i) => (i === index ? { ...f, ...updates } : f)));
  };

  const fillForm = async () => {
    if (!file || fields.length === 0) return;
    setProcessing(true);
    setError("");
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      const form = pdfDoc.getForm();

      for (const fieldInfo of fields) {
        try {
          const field = form.getFieldMaybe(fieldInfo.name);
          if (!field) continue;
          const type = getFieldType(field);

          if (type === "text") {
            (field as any).setText(fieldInfo.value);
          } else if (type === "checkbox") {
            if (fieldInfo.checked) (field as any).check();
            else (field as any).uncheck();
          } else if (type === "radio" || type === "dropdown") {
            if (fieldInfo.value) (field as any).select(fieldInfo.value);
          }
        } catch {
          // skip fields that fail
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(/\.pdf$/i, "_preenchido.pdf");
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Erro ao preencher o formulário. O arquivo pode estar protegido ou corrompido.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolLayout
      title="Preencher Formulário PDF"
      emoji="📝"
      category="Utilidades"
      description="Preencha campos de texto, caixas de seleção e opções de formulários PDF interativos, direto no navegador."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["editor pdf"]} label="editor pdf" />}
    >
      <div className="space-y-4">
        <div>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Selecione um PDF com formulário</span>
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
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
            <p className="text-sm text-white">
              <FileText className="w-4 h-4 inline mr-1" />
              {file.name}
            </p>
          </div>
        )}

        {info && (
          <div className={`p-3 rounded-xl border text-center ${
            fields.length === 0
              ? "bg-yellow-400/10 border-yellow-400/20"
              : "bg-green-400/10 border-green-400/20"
          }`}>
            <p className={`text-sm ${fields.length === 0 ? "text-yellow-400" : "text-green-400"}`}>
              {info}
            </p>
          </div>
        )}

        {fields.length > 0 && (
          <>
            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={index} className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">{field.type}</p>
                  <p className="text-sm text-white">{field.name}</p>
                  {field.type === "text" && (
                    <input
                      type="text"
                      value={field.value}
                      onChange={(e) => updateField(index, { value: e.target.value })}
                      placeholder="Digite o valor..."
                      className="input-field text-sm mt-1"
                    />
                  )}
                  {field.type === "checkbox" && (
                    <label className="flex items-center gap-2 mt-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={field.checked}
                        onChange={(e) => updateField(index, { checked: e.target.checked })}
                        className="accent-blue-500"
                      />
                      <span className="text-sm text-gray-300">Marcar</span>
                    </label>
                  )}
                  {(field.type === "radio" || field.type === "dropdown") && field.options.length > 0 && (
                    <select
                      value={field.value}
                      onChange={(e) => updateField(index, { value: e.target.value })}
                      className="input-field text-sm mt-1"
                    >
                      <option value="" className="bg-gray-800">— Selecione —</option>
                      {field.options.map((opt) => (
                        <option key={opt} value={opt} className="bg-gray-800">{opt}</option>
                      ))}
                    </select>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={fillForm}
              disabled={processing}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {processing ? "Preenchendo..." : (
                <>
                  <FileDown className="w-5 h-5" />
                  Aplicar e Baixar
                </>
              )}
            </button>
          </>
        )}

        {file && fields.length === 0 && !info && (
          <p className="text-xs text-gray-500 text-center">Analisando o PDF...</p>
        )}

        {!file && !error && (
          <div className="text-center py-8 text-gray-500">
            <FormInput className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Selecione um PDF com formulário para preencher os campos</p>
          </div>
        )}
      </div>

      <ToolContent
        toolName="Preencher Formulário PDF"
        category="Utilidades"
        data={{
          directAnswer: "Preencher um formulário PDF permite completar campos de texto, caixas de seleção e outras opções interativas de um documento, diretamente no navegador, sem precisar imprimir.",
          howItWorks: "A ferramenta identifica automaticamente todos os campos de formulário existentes no PDF (campos de texto, checkboxes, opções de múltipla escolha) e gera uma interface para preenchê-los. Depois de preenchido, o PDF é regenerado com os valores inseridos diretamente nos campos correspondentes, funcionando apenas com PDFs que já possuem formulários interativos incorporados (não é possível criar novos campos em um PDF que não tenha formulário, apenas preencher os já existentes).",
          example: {
            title: "Exemplo: preenchendo um formulário de cadastro",
            steps: [
              'PDF com formulário: campos de Nome, E-mail e uma checkbox "Aceito os termos"',
              "Ferramenta detecta os 3 campos automaticamente",
              "Usuário preenche cada campo",
              "PDF gerado com os valores preenchidos",
            ],
            result: "O formulário foi preenchido digitalmente, sem precisar imprimir o documento.",
          },
          faqs: [
            { question: "Funciona com qualquer PDF?", answer: "Não, apenas com PDFs que já possuem um formulário interativo incorporado (AcroForm). PDFs sem formulário não terão campos detectados." },
            { question: "Posso criar novos campos de formulário em um PDF comum?", answer: 'Não, esta ferramenta preenche campos já existentes; para criar formulários do zero é necessário um editor de PDF específico para essa função.' },
            { question: "Meu PDF é enviado para algum servidor?", answer: "Não, todo o processamento acontece localmente no seu navegador." },
            { question: "O PDF preenchido ainda permite edição posterior?", answer: 'Sim, a menos que você também use a ferramenta "Achatar PDF" para tornar os valores permanentes.' },
          ],
        }}
      />
    </ToolLayout>
  );
}
