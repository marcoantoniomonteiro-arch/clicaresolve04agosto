import React, { useState, useCallback } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { FileDown, X, Image as ImageIcon, Loader2 } from "lucide-react";
import heic2any from "heic2any";

interface Props {
  onBack: () => void;
}

interface ConvertResult {
  id: string;
  originalName: string;
  blob: Blob | null;
  url: string | null;
  error: string | null;
  status: "processing" | "done" | "error";
}

export function HEICParaJPG({ onBack }: Props) {
  const [results, setResults] = useState<ConvertResult[]>([]);
  const [processing, setProcessing] = useState(false);

  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setProcessing(true);

    const fileArray = Array.from(files).filter(
      (f) => f.type === "image/heic" || f.type === "image/heif" || f.name.match(/\.heic$/i) || f.name.match(/\.heif$/i)
    );

    const newResults: ConvertResult[] = fileArray.map((f) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      originalName: f.name,
      blob: null,
      url: null,
      error: null,
      status: "processing" as const,
    }));

    setResults((prev) => [...prev, ...newResults]);

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      const resultId = newResults[i].id;

      try {
        const converted = await heic2any({
          blob: file,
          toType: "image/jpeg",
          quality: 0.9,
        });

        const blob = Array.isArray(converted) ? converted[0] : converted;
        const url = URL.createObjectURL(blob);

        setResults((prev) =>
          prev.map((r) =>
            r.id === resultId ? { ...r, blob, url, status: "done" as const } : r
          )
        );
      } catch {
        setResults((prev) =>
          prev.map((r) =>
            r.id === resultId
              ? { ...r, status: "error" as const, error: "Não foi possível converter este arquivo HEIC." }
              : r
          )
        );
      }
    }

    setProcessing(false);
  }, []);

  const downloadOne = (result: ConvertResult) => {
    if (!result.blob) return;
    const url = URL.createObjectURL(result.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = result.originalName.replace(/\.heic?$/i, ".jpg");
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAll = () => {
    results
      .filter((r) => r.status === "done" && r.blob)
      .forEach((r, i) => {
        if (!r.blob) return;
        const url = URL.createObjectURL(r.blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = r.originalName.replace(/\.heic?$/i, ".jpg");
        setTimeout(() => URL.revokeObjectURL(url), 100);
        a.click();
      });
  };

  const removeResult = (id: string) => {
    setResults((prev) => {
      const target = prev.find((r) => r.id === id);
      if (target?.url) URL.revokeObjectURL(target.url);
      return prev.filter((r) => r.id !== id);
    });
  };

  const doneCount = results.filter((r) => r.status === "done").length;

  return (
    <ToolLayout
      title="HEIC para JPG"
      emoji="📸"
      category="Utilidades"
      description="Converta fotos HEic do iPhone para JPG, compatível com qualquer dispositivo, direto no navegador."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["conversor heic"]} label="conversor heic" />}
    >
      <div className="space-y-4">
        <div>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Selecione uma ou mais fotos HEIC/HEIF</span>
            <input
              type="file"
              accept=".heic,.heif,image/heic,image/heif"
              multiple
              onChange={(e) => handleFiles(e.target.files)}
              className="input-field text-sm"
            />
          </label>
        </div>

        {processing && (
          <div className="p-3 rounded-xl bg-blue-400/10 border border-blue-400/20 text-center flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
            <p className="text-sm text-blue-400">Processando... isso pode levar alguns segundos por imagem.</p>
          </div>
        )}

        {results.length > 0 && (
          <>
            <div className="space-y-2">
              {results.map((result) => (
                <div key={result.id} className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/10">
                  {result.status === "done" && result.url ? (
                    <img src={result.url} alt={result.originalName} className="w-12 h-12 object-cover rounded-lg border border-white/10 shrink-0" />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      {result.status === "processing" ? (
                        <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
                      ) : (
                        <X className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{result.originalName}</p>
                    {result.status === "processing" && (
                      <p className="text-xs text-gray-500">Convertendo...</p>
                    )}
                    {result.status === "done" && (
                      <p className="text-xs text-green-400">Convertido para JPG</p>
                    )}
                    {result.status === "error" && (
                      <p className="text-xs text-red-400">{result.error}</p>
                    )}
                  </div>
                  {result.status === "done" && (
                    <button
                      onClick={() => downloadOne(result)}
                      className="btn-secondary flex items-center gap-1 text-sm shrink-0"
                    >
                      <FileDown className="w-4 h-4" />
                      Baixar
                    </button>
                  )}
                  <button
                    onClick={() => removeResult(result.id)}
                    className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors shrink-0"
                    aria-label="Remover"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {doneCount > 1 && (
              <button
                onClick={downloadAll}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <FileDown className="w-5 h-5" />
                Baixar Todas ({doneCount})
              </button>
            )}
          </>
        )}

        {results.length === 0 && !processing && (
          <div className="text-center py-8 text-gray-500">
            <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Selecione fotos HEIC do iPhone para converter para JPG</p>
          </div>
        )}
      </div>

      <ToolContent
        toolName="HEIC para JPG"
        category="Utilidades"
        data={{
          directAnswer: "Fotos tiradas em iPhone geralmente são salvas no formato HEIC, que nem todos os dispositivos e sites reconhecem — convertê-las para JPG garante compatibilidade universal.",
          howItWorks: "HEIC (High Efficiency Image Container) é o formato padrão usado por iPhones desde 2017, que comprime fotos com melhor qualidade ocupando menos espaço que o JPG tradicional. No entanto, muitos sites, aplicativos e dispositivos Android/Windows não reconhecem esse formato diretamente. A ferramenta decodifica o arquivo HEIC diretamente no seu navegador (usando processamento local, sem enviar a foto para servidores) e gera uma versão em JPG, compatível com qualquer dispositivo, site ou aplicativo.",
          example: {
            title: "Exemplo: convertendo fotos de iPhone para JPG",
            steps: [
              "Envie 5 fotos .HEIC tiradas no iPhone",
              "A ferramenta processa cada uma (pode levar alguns segundos)",
              "Resultado: 5 arquivos .JPG, com qualidade preservada",
              "Baixe individualmente ou todas de uma vez",
            ],
            result: "As fotos agora estão no formato JPG, compatíveis com qualquer site, rede social ou dispositivo.",
          },
          faqs: [
            { question: "Por que minhas fotos de iPhone vêm em HEIC?", answer: "É o formato padrão de câmera do iPhone desde 2017, que oferece melhor compressão que o JPG tradicional, mas nem todos os sistemas reconhecem esse formato." },
            { question: "Minhas fotos são enviadas para algum servidor?", answer: "Não, toda a conversão acontece localmente no seu navegador, usando processamento local de imagem." },
            { question: "Por que a conversão demora alguns segundos?", answer: "A decodificação do formato HEIC é mais complexa computacionalmente que outros formatos, então cada foto pode levar alguns segundos para processar, especialmente em conexões/dispositivos mais lentos." },
            { question: "Perco qualidade na conversão?", answer: "A ferramenta converte com qualidade alta (90%), preservando a aparência visual da foto original." },
          ],
        }}
      />
    </ToolLayout>
  );
}
