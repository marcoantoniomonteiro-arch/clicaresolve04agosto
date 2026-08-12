import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";

interface Props {
  onBack: () => void;
}

interface PreviewRow {
  cells: string[];
}

export function ConversorCSVExcel({ onBack }: Props) {
  const [preview, setPreview] = useState<PreviewRow[]>([]);
  const [fileName, setFileName] = useState("");
  const [direction, setDirection] = useState<"csv-to-xlsx" | "xlsx-to-csv" | null>(null);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setError("");
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setPreview([]);
    setDownloadUrl("");
    setFileName(file.name);

    const isCsv = file.name.toLowerCase().endsWith(".csv");
    const isXlsx = file.name.toLowerCase().endsWith(".xlsx") || file.name.toLowerCase().endsWith(".xls");

    if (!isCsv && !isXlsx) {
      setError("Por favor, envie um arquivo .csv ou .xlsx");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        if (isCsv) {
          setDirection("csv-to-xlsx");
          const text = e.target?.result as string;
          const wb = XLSX.read(text, { type: "string" });
          const ws = wb.Sheets[wb.SheetNames[0]];
          const rows: PreviewRow[] = XLSX.utils.sheet_to_json(ws, { header: 1 }).map((r: unknown) => ({
            cells: (r as (string | number)[]).map((c) => String(c ?? "")),
          }));
          setPreview(rows.slice(0, 10));

          const newWb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(newWb, ws, "Planilha1");
          const out = XLSX.write(newWb, { bookType: "xlsx", type: "array" });
          const blob = new Blob([out], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
          setDownloadUrl(URL.createObjectURL(blob));
        } else {
          setDirection("xlsx-to-csv");
          const data = e.target?.result as ArrayBuffer;
          const wb = XLSX.read(data, { type: "array" });
          const ws = wb.Sheets[wb.SheetNames[0]];
          const rows: PreviewRow[] = XLSX.utils.sheet_to_json(ws, { header: 1 }).map((r: unknown) => ({
            cells: (r as (string | number)[]).map((c) => String(c ?? "")),
          }));
          setPreview(rows.slice(0, 10));

          const csv = XLSX.utils.sheet_to_csv(ws);
          const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
          setDownloadUrl(URL.createObjectURL(blob));
        }
      } catch (err) {
        setError(`Erro ao processar arquivo: ${(err as Error).message}`);
      }
    };
    reader.onerror = () => setError("Erro ao ler o arquivo.");

    if (isCsv) reader.readAsText(file);
    else reader.readAsArrayBuffer(file);
  };

  const handleDownload = () => {
    if (!downloadUrl) return;
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = direction === "csv-to-xlsx"
      ? fileName.replace(/\.csv$/i, "") + ".xlsx"
      : fileName.replace(/\.xlsx?$/i, "") + ".csv";
    a.click();
  };

  return (
    <ToolLayout
      title="Conversor de CSV para Excel"
      emoji="📊"
      category="Utilidades"
      description="Converta arquivos CSV para Excel (XLSX) ou Excel para CSV, direto no navegador."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["planilhas online"]} label="planilhas online" />}
    >
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Selecione um arquivo CSV ou XLSX</span>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
            className="input-field text-sm"
          />
        </label>

        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">{error}</div>
        )}

        {direction && preview.length > 0 && (
          <>
            <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
              <p className="text-sm text-green-400 font-semibold">
                {direction === "csv-to-xlsx" ? "CSV → Excel (XLSX)" : "Excel (XLSX) → CSV"}
              </p>
              <p className="text-xs text-gray-500 mt-1">Arquivo: {fileName}</p>
            </div>

            {direction === "xlsx-to-csv" && (
              <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-xs text-yellow-400">
                Atenção: apenas a primeira aba da planilha é convertida. Se o arquivo tiver múltiplas abas, as demais não serão incluídas no CSV.
              </div>
            )}

            <div>
              <h3 className="text-sm font-semibold text-white mb-2">Preview (primeiras {Math.min(10, preview.length)} linhas)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <tbody>
                    {preview.map((row, i) => (
                      <tr key={i} className={i === 0 ? "bg-white/10 font-semibold" : "border-b border-white/5"}>
                        {row.cells.map((c, j) => (
                          <td key={j} className="py-1.5 px-2 text-gray-300 whitespace-nowrap max-w-[160px] overflow-hidden text-ellipsis">
                            {c}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <button onClick={handleDownload} className="btn-primary w-full">
              Baixar {direction === "csv-to-xlsx" ? "Excel (.xlsx)" : "CSV (.csv)"}
            </button>
          </>
        )}
      </div>

      <ToolContent
        toolName="Conversor de CSV para Excel"
        category="Utilidades"
        data={{
          directAnswer: "A conversão entre CSV e Excel (XLSX) transforma dados tabulares de um formato de texto simples separado por vírgulas para uma planilha formatada, ou vice-versa.",
          howItWorks: "CSV (Comma-Separated Values) é um formato de texto simples onde cada linha representa uma linha da planilha e as colunas são separadas por vírgula ou ponto-e-vírgula. XLSX é o formato nativo do Excel, que suporta formatação, múltiplas abas e fórmulas. A ferramenta detecta automaticamente o formato do arquivo enviado e realiza a conversão para o formato oposto, processando tudo localmente no seu navegador, sem enviar os dados para nenhum servidor. Importante: ao converter de Excel para CSV, apenas a primeira aba da planilha é processada — outras abas não são incluídas no arquivo CSV gerado.",
          example: {
            title: "Exemplo: convertendo um CSV simples para Excel",
            steps: [
              `Arquivo CSV enviado: nome,idade\\nJoão,30\\nMaria,25`,
              `Ferramenta detecta formato CSV`,
              `Conversão para estrutura de planilha`,
              `Arquivo XLSX gerado, pronto para download`,
            ],
            result: "Os dados do CSV foram organizados em uma planilha Excel formatada, mantendo a estrutura de colunas e linhas.",
          },
          faqs: [
            { question: "Meus dados são enviados para algum servidor?", answer: "Não, toda a conversão acontece localmente no seu navegador, sem enviar o arquivo a nenhum lugar." },
            { question: "A ferramenta detecta automaticamente o separador do CSV (vírgula ou ponto-e-vírgula)?", answer: "A ferramenta tenta identificar o separador mais comum no arquivo, mas arquivos com formatação incomum podem exigir ajuste manual." },
            { question: "Fórmulas do Excel são preservadas na conversão para CSV?", answer: "Não, o formato CSV não suporta fórmulas - apenas os valores calculados são mantidos." },
            { question: "Existe limite de tamanho de arquivo?", answer: "Depende da capacidade do seu navegador, mas arquivos de uso comum (até alguns milhares de linhas) funcionam normalmente." },
          ],
        }}
      />
    </ToolLayout>
  );
}
