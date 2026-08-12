import React, { useState } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";

interface Props {
  onBack: () => void;
}

function jsonToCsv(json: string): string {
  const data = JSON.parse(json);
  if (!Array.isArray(data)) throw new Error("O JSON deve ser um array de objetos.");
  if (data.length === 0) return "";

  if (typeof data[0] !== "object" || data[0] === null || Array.isArray(data[0])) {
    throw new Error("O JSON deve ser um array de objetos (ex: [{\"nome\":\"João\"}]), não um array de valores simples como números ou textos.");
  }

  const keys = Object.keys(data[0]);
  const escapeVal = (v: unknown): string => {
    const s = v === null || v === undefined ? "" : typeof v === "object" ? JSON.stringify(v) : String(v);
    if (/[",\n;]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };

  const header = keys.map(escapeVal).join(",");
  const rows = data.map((obj: Record<string, unknown>) =>
    keys.map((k) => escapeVal(obj[k])).join(",")
  );
  return [header, ...rows].join("\n");
}

function csvToJson(csv: string): string {
  const delimiter = detectDelimiter(csv);
  const rows = parseCsvRows(csv, delimiter);
  if (rows.length < 1) return "[]";
  const headers = rows[0];
  const result = rows.slice(1).map((row) => {
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => {
      obj[h] = row[i] ?? "";
    });
    return obj;
  });
  return JSON.stringify(result, null, 2);
}

// Detecta o delimitador predominante (',' ou ';') olhando a primeira linha do CSV,
// ignorando caracteres dentro de aspas. Isso evita tratar ',' e ';' como equivalentes,
// o que corrompia valores decimais em formato brasileiro (ex: "1234,56" em CSV
// delimitado por ';' virava "1234", perdendo os centavos).
function detectDelimiter(text: string): "," | ";" {
  let inQuotes = false;
  let commaCount = 0;
  let semicolonCount = 0;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
      continue;
    }
    if (inQuotes) continue;
    if (ch === "\n") break;
    if (ch === ",") commaCount++;
    else if (ch === ";") semicolonCount++;
  }
  return semicolonCount > commaCount ? ";" : ",";
}

function parseCsvRows(text: string, delimiter: "," | ";"): string[][] {
  const rows: string[][] = [];
  let current: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === delimiter) {
        current.push(field);
        field = "";
      } else if (ch === "\n") {
        current.push(field);
        rows.push(current);
        current = [];
        field = "";
      } else if (ch !== "\r") {
        field += ch;
      }
    }
  }
  if (field !== "" || current.length > 0) {
    current.push(field);
    rows.push(current);
  }
  return rows.filter((r) => r.some((c) => c.trim() !== ""));
}

export function ConversorJSONCSV({ onBack }: Props) {
  const [mode, setMode] = useState<"json-to-csv" | "csv-to-json">("json-to-csv");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleConvert = () => {
    try {
      if (mode === "json-to-csv") {
        setOutput(jsonToCsv(input));
      } else {
        setOutput(csvToJson(input));
      }
      setError("");
    } catch (e) {
      setError(`Erro: ${(e as Error).message}`);
      setOutput("");
    }
  };

  const handleCopy = () => {
    if (output) navigator.clipboard.writeText(output);
  };

  const handleDownload = () => {
    if (!output) return;
    const ext = mode === "json-to-csv" ? "csv" : "json";
    const blob = new Blob([output], { type: ext === "csv" ? "text/csv;charset=utf-8" : "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `convertido.${ext}`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <ToolLayout
      title="Conversor de JSON para CSV"
      emoji="🔄"
      category="Utilidades"
      description="Converta JSON para CSV ou CSV para JSON, direto no navegador."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["planilhas online"]} label="planilhas online" />}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setMode("json-to-csv")}
            className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
              mode === "json-to-csv"
                ? "bg-green-500/20 border-green-500/40 text-green-400"
                : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
            }`}
          >
            JSON → CSV
          </button>
          <button
            onClick={() => setMode("csv-to-json")}
            className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
              mode === "csv-to-json"
                ? "bg-green-500/20 border-green-500/40 text-green-400"
                : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
            }`}
          >
            CSV → JSON
          </button>
        </div>

        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">{mode === "json-to-csv" ? "JSON de entrada (array de objetos)" : "CSV de entrada"}</span>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "json-to-csv" ? '[{"nome":"João","idade":30}]' : "nome,idade\nJoão,30"}
            rows={6}
            className="input-field font-mono text-sm"
          />
        </label>

        <button onClick={handleConvert} className="btn-primary w-full">Converter</button>

        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">{error}</div>
        )}

        {output && (
          <div className="space-y-2">
            <label className="block">
              <span className="text-sm text-gray-400 mb-1 block">Resultado</span>
              <textarea value={output} readOnly rows={6} className="input-field font-mono text-sm" />
            </label>
            <div className="flex gap-2">
              <button onClick={handleCopy} className="btn-primary flex-1">Copiar</button>
              <button onClick={handleDownload} className="flex-1 p-3 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-gray-300 hover:border-white/20 transition-all">
                Baixar arquivo
              </button>
            </div>
          </div>
        )}
      </div>

      <ToolContent
        toolName="Conversor de JSON para CSV"
        category="Utilidades"
        data={{
          directAnswer: "A conversão entre JSON e CSV transforma dados estruturados em objetos (JSON) para o formato de tabela simples (CSV), ou vice-versa, facilitando a troca de dados entre sistemas diferentes.",
          howItWorks: "JSON representa dados como uma coleção de objetos com pares chave-valor, enquanto CSV representa os mesmos dados como uma tabela simples de linhas e colunas separadas por vírgula. Ao converter JSON para CSV, a ferramenta usa as chaves do primeiro objeto como cabeçalho de colunas e extrai os valores de cada objeto como linhas. Ao converter CSV para JSON, a primeira linha do arquivo é interpretada como os nomes dos campos, e cada linha seguinte se torna um objeto JSON.",
          example: {
            title: "Exemplo: convertendo JSON para CSV",
            steps: [
              `JSON de entrada: [{"nome":"João","idade":30},{"nome":"Maria","idade":25}]`,
              `Cabeçalho CSV extraído: nome,idade`,
              `Linhas geradas: João,30 e Maria,25`,
              `Resultado CSV completo, pronto para copiar ou baixar`,
            ],
            result: "O array de objetos JSON foi convertido em uma tabela CSV simples, mantendo todos os dados organizados.",
          },
          faqs: [
            { question: "Meus dados são processados em algum servidor?", answer: "Não, toda a conversão acontece localmente no seu navegador." },
            { question: "O que acontece se meus objetos JSON tiverem campos diferentes entre si?", answer: "A ferramenta usa os campos do primeiro objeto como referência para o cabeçalho; campos ausentes em outros objetos ficam em branco na respectiva linha." },
            { question: "Como a ferramenta lida com vírgulas dentro dos valores?", answer: "Valores que contêm vírgulas são automaticamente colocados entre aspas no CSV, seguindo o padrão do formato, para não quebrar a estrutura de colunas." },
            { question: "Posso converter um JSON aninhado (objetos dentro de objetos)?", answer: "A ferramenta funciona melhor com estruturas simples (uma lista de objetos com valores diretos). JSONs muito aninhados podem precisar de ajuste antes da conversão." },
          ],
        }}
      />
    </ToolLayout>
  );
}
