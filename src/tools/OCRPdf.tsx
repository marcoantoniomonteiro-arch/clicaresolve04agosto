import React, { useState, useCallback } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { FileText, Copy, Download, Loader2, ScanText, Lock } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { createWorker } from "tesseract.js";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

interface Props {
  onBack: () => void;
}

interface PageResult {
  pageNum: number;
  text: string;
}

export function OCRPdf({ onBack }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [language, setLanguage] = useState<"por" | "eng">("por");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");
  const [results, setResults] = useState<PageResult[]>([]);
  const [editableText, setEditableText] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFile = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    const f = files[0];
    if (f.type !== "application/pdf") {
      setError("Selecione um arquivo PDF válido.");
      return;
    }
    setFile(f);
    setError("");
    setResults([]);
    setEditableText("");
    setProgress(0);
    setProgressLabel("");
  }, []);

  const runOcr = async () => {
    if (!file) return;
    setProcessing(true);
    setError("");
    setResults([]);
    setProgress(0);
    setProgressLabel("Carregando PDF...");

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const totalPages = pdf.numPages;
      const allResults: PageResult[] = [];

      setProgressLabel(`Preparando OCR em ${totalPages} página(s)...`);

      const worker = await createWorker(language, 1, {
        logger: (m: any) => {
          if (m.status === "recognizing text") {
            setProgress(Math.round(m.progress * 100));
            setProgressLabel(`Reconhecendo texto — ${Math.round(m.progress * 100)}%`);
          }
        },
      });

      for (let i = 1; i <= totalPages; i++) {
        setProgressLabel(`Renderizando página ${i} de ${totalPages}...`);

        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) continue;
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: ctx, viewport }).promise;

        setProgressLabel(`OCR — página ${i} de ${totalPages}...`);
        setProgress(0);

        const { data } = await worker.recognize(canvas);
        allResults.push({ pageNum: i, text: data.text.trim() });
      }

      await worker.terminate();

      setResults(allResults);
      setEditableText(allResults.map((r) => `--- Página ${r.pageNum} ---\n${r.text}`).join("\n\n"));
      setProgressLabel("");
      setProgress(0);
    } catch {
      setError("Erro ao processar o PDF. Pode estar protegido, corrompido, ou ser muito grande para o navegador.");
    } finally {
      setProcessing(false);
    }
  };

  const copyText = async () => {
    await navigator.clipboard.writeText(editableText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadTxt = () => {
    const blob = new Blob([editableText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = (file?.name.replace(/\.pdf$/i, "") || "ocr") + "-texto.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout
      title="OCR de PDF"
      emoji="🔎"
      category="Utilidades"
      description="Extraia texto de PDFs escaneados ou imagens usando reconhecimento óptico de caracteres (OCR), direto no navegador."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["ocr pdf"]} label="ocr pdf" />}
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

        {file && !processing && results.length === 0 && (
          <>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <p className="text-sm text-white">
                <FileText className="w-4 h-4 inline mr-1" />
                {file.name}
              </p>
            </div>

            <div>
              <span className="text-sm text-gray-400 mb-1 block">Idioma do texto</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setLanguage("por")}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
                    language === "por" ? "bg-blue-500 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  Português
                </button>
                <button
                  onClick={() => setLanguage("eng")}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
                    language === "eng" ? "bg-blue-500 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  Inglês
                </button>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-yellow-400/10 border border-yellow-400/20">
              <p className="text-xs text-yellow-400 text-center">
                O OCR é processamento pesado e pode levar de 10 a 60+ segundos por página, dependendo do tamanho e conteúdo do PDF.
              </p>
            </div>

            <button
              onClick={runOcr}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <ScanText className="w-5 h-5" />
              Extrair Texto
            </button>
          </>
        )}

        {processing && (
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 text-blue-400">
              <Loader2 className="w-5 h-5 animate-spin" />
              <p className="text-sm">{progressLabel || "Processando..."}</p>
            </div>
            <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden border border-white/10">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${progress > 0 ? progress : 15}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 text-center">
              Isso pode levar vários segundos por página. Mantenha esta aba aberta.
            </p>
          </div>
        )}

        {results.length > 0 && !processing && (
          <>
            <div className="p-3 rounded-xl bg-green-400/10 border border-green-400/20 text-center">
              <p className="text-sm text-green-400 font-semibold">
                {results.length} página(s) processada(s) com sucesso
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={copyText}
                className="btn-secondary flex-1 flex items-center justify-center gap-2 text-sm"
              >
                <Copy className="w-4 h-4" />
                {copied ? "Copiado!" : "Copiar texto"}
              </button>
              <button
                onClick={downloadTxt}
                className="btn-secondary flex-1 flex items-center justify-center gap-2 text-sm"
              >
                <Download className="w-4 h-4" />
                Baixar .txt
              </button>
            </div>

            <div>
              <span className="text-sm text-gray-400 mb-1 block">Texto extraído (editável)</span>
              <textarea
                value={editableText}
                onChange={(e) => setEditableText(e.target.value)}
                className="input-field text-sm font-mono w-full min-h-[300px] resize-y"
                placeholder="O texto extraído aparecerá aqui..."
              />
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 text-gray-500">
                <Lock className="w-4 h-4" />
                <p className="text-xs">
                  <span className="text-gray-400 font-medium">PDF pesquisável</span> — Em breve. Por enquanto, use os botões acima para copiar ou baixar o texto extraído.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setFile(null);
                setResults([]);
                setEditableText("");
              }}
              className="text-sm text-gray-400 hover:text-white transition-colors w-full text-center"
            >
              Processar outro PDF
            </button>
          </>
        )}

        {!file && !error && !processing && (
          <div className="text-center py-8 text-gray-500">
            <ScanText className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Selecione um PDF escaneado para extrair o texto</p>
          </div>
        )}
      </div>

      <ToolContent
        toolName="OCR de PDF"
        category="Utilidades"
        data={{
          directAnswer: "OCR (Reconhecimento Óptico de Caracteres) extrai o texto contido em imagens ou PDFs escaneados, transformando o conteúdo visual em texto que pode ser copiado, editado ou pesquisado.",
          howItWorks: "A ferramenta primeiro converte cada página do PDF em uma imagem, depois usa tecnologia de reconhecimento óptico de caracteres (OCR) para identificar e extrair o texto presente nessa imagem — mesmo que o PDF original seja apenas uma digitalização/scanner, sem nenhum texto selecionável. O processamento acontece inteiramente no seu navegador e pode levar alguns segundos por página, dependendo da quantidade de texto e qualidade da imagem original. É especialmente útil para documentos escaneados, fotos de páginas de livros, ou qualquer PDF onde o texto não pode ser selecionado ou copiado diretamente.",
          example: {
            title: "Exemplo: extraindo texto de um documento escaneado",
            steps: [
              "PDF escaneado de 2 páginas, sem texto selecionável",
              "Ferramenta renderiza cada página como imagem",
              "OCR processa e reconhece o texto de cada página (pode levar 20-40 segundos no total)",
              "Resultado: texto extraído e editável de ambas as páginas",
            ],
            result: "O conteúdo que antes só existia como imagem agora pode ser copiado, editado e pesquisado como texto normal.",
          },
          faqs: [
            { question: "O OCR funciona perfeitamente em qualquer documento?", answer: "A precisão depende da qualidade da imagem original — documentos bem escaneados, com texto claro e boa resolução, tendem a ter reconhecimento mais preciso do que fotos de baixa qualidade ou com manuscrito." },
            { question: "Por que o processamento demora tanto?", answer: "O reconhecimento de texto é computacionalmente intenso, e como roda inteiramente no seu navegador (sem enviar para servidores), o tempo depende do processamento do seu próprio dispositivo e da quantidade de páginas/texto." },
            { question: "Meu PDF é enviado para algum servidor?", answer: "Não, todo o processamento de OCR acontece localmente no seu navegador, usando WebAssembly." },
            { question: "Funciona com textos em outros idiomas além do português?", answer: "Esta versão oferece suporte para Português e Inglês; o reconhecimento é mais preciso quando o idioma correto é selecionado antes de processar." },
          ],
        }}
      />
    </ToolLayout>
  );
}
