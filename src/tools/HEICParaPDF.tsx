import React, { useState, useCallback } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { FileDown, X, ChevronUp, ChevronDown, Image as ImageIcon, Loader2 } from "lucide-react";
import jsPDF from "jspdf";
import heic2any from "heic2any";

interface Props {
  onBack: () => void;
}

interface HeicItem {
  id: string;
  file: File;
  name: string;
  status: "processing" | "ready" | "error";
  blob: Blob | null;
  url: string | null;
  error: string | null;
}

export function HEICParaPDF({ onBack }: Props) {
  const [items, setItems] = useState<HeicItem[]>([]);
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait");
  const [pageSize, setPageSize] = useState<"a4" | "fit">("a4");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const handleFiles = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setError("");

    const fileArray = Array.from(files).filter(
      (f) => f.type === "image/heic" || f.type === "image/heif" || f.name.match(/\.heic$/i) || f.name.match(/\.heif$/i)
    );

    const newItems: HeicItem[] = fileArray.map((f) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      file: f,
      name: f.name,
      status: "processing" as const,
      blob: null,
      url: null,
      error: null,
    }));

    setItems((prev) => [...prev, ...newItems]);

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      const itemId = newItems[i].id;

      try {
        const converted = await heic2any({
          blob: file,
          toType: "image/jpeg",
          quality: 0.9,
        });

        const blob = Array.isArray(converted) ? converted[0] : converted;
        const url = URL.createObjectURL(blob);

        setItems((prev) =>
          prev.map((item) =>
            item.id === itemId ? { ...item, status: "ready" as const, blob, url } : item
          )
        );
      } catch {
        setItems((prev) =>
          prev.map((item) =>
            item.id === itemId
              ? { ...item, status: "error" as const, error: "Falha ao converter este arquivo HEIC." }
              : item
          )
        );
      }
    }
  }, []);

  const removeItem = (id: string) => {
    setItems((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target?.url) URL.revokeObjectURL(target.url);
      return prev.filter((item) => item.id !== id);
    });
  };

  const moveItem = (index: number, direction: -1 | 1) => {
    setItems((prev) => {
      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      const copy = [...prev];
      [copy[index], copy[newIndex]] = [copy[newIndex], copy[index]];
      return copy;
    });
  };

  const loadImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = url;
    });
  };

  const generatePDF = async () => {
    const readyItems = items.filter((item) => item.status === "ready" && item.url);
    if (readyItems.length === 0) return;

    setProcessing(true);
    setError("");
    try {
      let doc: jsPDF | null = null;

      for (let i = 0; i < readyItems.length; i++) {
        const img = await loadImage(readyItems[i].url!);

        let pageWidth: number;
        let pageHeight: number;

        if (pageSize === "fit") {
          const orientationFit = img.width > img.height ? "landscape" : "portrait";
          doc = doc || new jsPDF({
            orientation: orientationFit,
            unit: "px",
            format: [img.width, img.height],
          });
          if (i > 0) doc.addPage([img.width, img.height], orientationFit);
          pageWidth = img.width;
          pageHeight = img.height;
          doc.addImage(img, "JPEG", 0, 0, pageWidth, pageHeight);
        } else {
          doc = doc || new jsPDF({
            orientation,
            unit: "mm",
            format: "a4",
          });
          if (i > 0) doc.addPage("a4", orientation);
          pageWidth = doc.internal.pageSize.getWidth();
          pageHeight = doc.internal.pageSize.getHeight();

          const margin = 10;
          const availW = pageWidth - margin * 2;
          const availH = pageHeight - margin * 2;
          const ratio = Math.min(availW / img.width, availH / img.height);
          const w = img.width * ratio;
          const h = img.height * ratio;
          const x = (pageWidth - w) / 2;
          const y = (pageHeight - h) / 2;
          doc.addImage(img, "JPEG", x, y, w, h);
        }
      }

      doc?.save("heic-convertido.pdf");
    } catch {
      setError("Erro ao gerar o PDF. Verifique se todas as fotos foram convertidas corretamente.");
    } finally {
      setProcessing(false);
    }
  };

  const readyCount = items.filter((item) => item.status === "ready").length;
  const processingCount = items.filter((item) => item.status === "processing").length;

  return (
    <ToolLayout
      title="HEIC para PDF"
      emoji="📱"
      category="Utilidades"
      description="Converta múltiplas fotos HEIC do iPhone em um único arquivo PDF, uma foto por página, direto no navegador."
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

        {processingCount > 0 && (
          <div className="p-3 rounded-xl bg-blue-400/10 border border-blue-400/20 text-center flex items-center justify-center gap-2">
            <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
            <p className="text-sm text-blue-400">Processando {processingCount} foto(s)... isso pode levar alguns segundos por imagem.</p>
          </div>
        )}

        {error && <p className="text-sm text-red-400 text-center">{error}</p>}

        {items.length > 0 && (
          <>
            <div className="space-y-2">
              {items.map((item, index) => (
                <div key={item.id} className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/10">
                  {item.status === "ready" && item.url ? (
                    <img src={item.url} alt={item.name} className="w-12 h-12 object-cover rounded-lg border border-white/10 shrink-0" />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                      {item.status === "processing" ? (
                        <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
                      ) : (
                        <X className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{item.name}</p>
                    {item.status === "processing" && <p className="text-xs text-gray-500">Convertendo...</p>}
                    {item.status === "ready" && <p className="text-xs text-green-400">Pronto — página {index + 1}</p>}
                    {item.status === "error" && <p className="text-xs text-red-400">{item.error}</p>}
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => moveItem(index, -1)}
                      disabled={index === 0 || item.status !== "ready"}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      aria-label="Mover para cima"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveItem(index, 1)}
                      disabled={index === items.length - 1 || item.status !== "ready"}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      aria-label="Mover para baixo"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors"
                      aria-label="Remover foto"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-sm text-gray-400 mb-1 block">Orientação</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setOrientation("portrait")}
                    className={`flex-1 px-3 py-2 rounded-xl text-sm font-medium border transition-all ${
                      orientation === "portrait"
                        ? "bg-green-400/10 border-green-400/30 text-green-400"
                        : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30"
                    }`}
                  >
                    Retrato
                  </button>
                  <button
                    onClick={() => setOrientation("landscape")}
                    className={`flex-1 px-3 py-2 rounded-xl text-sm font-medium border transition-all ${
                      orientation === "landscape"
                        ? "bg-green-400/10 border-green-400/30 text-green-400"
                        : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30"
                    }`}
                  >
                    Paisagem
                  </button>
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-400 mb-1 block">Tamanho da página</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPageSize("a4")}
                    className={`flex-1 px-3 py-2 rounded-xl text-sm font-medium border transition-all ${
                      pageSize === "a4"
                        ? "bg-green-400/10 border-green-400/30 text-green-400"
                        : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30"
                    }`}
                  >
                    A4
                  </button>
                  <button
                    onClick={() => setPageSize("fit")}
                    className={`flex-1 px-3 py-2 rounded-xl text-sm font-medium border transition-all ${
                      pageSize === "fit"
                        ? "bg-green-400/10 border-green-400/30 text-green-400"
                        : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30"
                    }`}
                  >
                    Ajustar à imagem
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={generatePDF}
              disabled={processing || readyCount === 0}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {processing ? (
                "Gerando PDF..."
              ) : (
                <>
                  <FileDown className="w-5 h-5" />
                  Gerar PDF ({readyCount} {readyCount === 1 ? "foto" : "fotos"})
                </>
              )}
            </button>
          </>
        )}

        {items.length === 0 && !error && (
          <div className="text-center py-8 text-gray-500">
            <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Selecione fotos HEIC do iPhone para converter em PDF</p>
          </div>
        )}
      </div>

      <ToolContent
        toolName="HEIC para PDF"
        category="Utilidades"
        data={{
          directAnswer: "Fotos HEIC do iPhone podem ser convertidas diretamente em um único arquivo PDF, útil para compartilhar múltiplas fotos como um documento único, sem precisar converter uma por uma.",
          howItWorks: "A ferramenta primeiro decodifica cada foto HEIC (convertendo internamente para um formato compatível), e depois monta um documento PDF com cada foto em uma página separada, na ordem em que foram organizadas. É especialmente útil para juntar várias fotos de iPhone (como fotos de documentos, recibos ou páginas de um caderno) em um único arquivo PDF, sem precisar de aplicativos externos ou converter cada imagem individualmente antes.",
          example: {
            title: "Exemplo: juntando 4 fotos HEIC em um PDF único",
            steps: [
              "Envie 4 fotos .HEIC (por exemplo, páginas de um documento fotografado)",
              "Organize a ordem desejada",
              "Escolha orientação e tamanho de página",
              "Resultado: um único arquivo PDF de 4 páginas, uma foto por página",
            ],
            result: "As 4 fotos HEIC foram convertidas e organizadas em um único documento PDF, pronto para compartilhar.",
          },
          faqs: [
            { question: "Minhas fotos são enviadas para algum servidor?", answer: "Não, toda a conversão e montagem do PDF acontece localmente no seu navegador." },
            { question: "Posso reordenar as fotos antes de gerar o PDF?", answer: "Sim, você pode organizar a ordem das fotos na lista antes de gerar o documento final." },
            { question: "Por que o processamento demora um pouco?", answer: "A decodificação de cada foto HEIC leva alguns segundos, então quanto mais fotos você enviar, mais tempo o processo total leva." },
            { question: "Posso misturar fotos HEIC com outros formatos?", answer: 'Esta ferramenta é específica para arquivos HEIC/HEIF; para juntar formatos mistos (JPG, PNG e HEIC juntos), use primeiro esta ferramenta para converter as HEIC, depois use a ferramenta "Imagem para PDF" com todos os arquivos já convertidos.' },
          ],
        }}
      />
    </ToolLayout>
  );
}
