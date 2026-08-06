import React, { useState, useRef, useCallback } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { Upload, X, FileDown, Image as ImageIcon } from "lucide-react";
import jsPDF from "jspdf";

interface Props {
  onBack: () => void;
}

interface ImageItem {
  id: string;
  file: File;
  url: string;
}

export function ImagemParaPDF({ onBack }: Props) {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait");
  const [pageSize, setPageSize] = useState<"a4" | "fit">("a4");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    const newImages: ImageItem[] = [];
    Array.from(files).forEach((file) => {
      if (!file.type.match(/^image\/(jpeg|jpg|png|webp)$/)) return;
      newImages.push({
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        file,
        url: URL.createObjectURL(file),
      });
    });
    setImages((prev) => [...prev, ...newImages]);
    setError("");
  }, []);

  const removeImage = (id: string) => {
    setImages((prev) => {
      const target = prev.find((img) => img.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((img) => img.id !== id);
    });
  };

  const moveImage = (index: number, direction: -1 | 1) => {
    setImages((prev) => {
      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      const copy = [...prev];
      [copy[index], copy[newIndex]] = [copy[newIndex], copy[index]];
      return copy;
    });
  };

  const loadImage = (url: string): Promise<{ img: HTMLImageElement; format: "JPEG" | "PNG" }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const format = img.src.startsWith("data:image/png") ? "PNG" : "JPEG";
        resolve({ img, format });
      };
      img.onerror = reject;
      img.src = url;
    });
  };

  const generatePDF = async () => {
    if (images.length === 0) return;
    setProcessing(true);
    setError("");
    try {
      let doc: jsPDF | null = null;

      for (let i = 0; i < images.length; i++) {
        const { img, format } = await loadImage(images[i].url);

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
          doc.addImage(img, format, 0, 0, pageWidth, pageHeight);
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
          doc.addImage(img, format, x, y, w, h);
        }
      }

      doc?.save("imagens-convertidas.pdf");
    } catch {
      setError("Erro ao processar uma das imagens. Tente novamente.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolLayout
      title="Imagem para PDF"
      emoji="📄"
      category="Utilidades"
      description="Converta imagens JPG, PNG e WEBP em um arquivo PDF com cada imagem em uma página."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["editor pdf"]} label="editor pdf" />}
    >
      <div className="space-y-4">
        <div>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Selecione uma ou mais imagens (JPG, PNG, WEBP)</span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={(e) => handleFiles(e.target.files)}
              className="input-field text-sm"
            />
          </label>
        </div>

        {images.length > 0 && (
          <>
            <div className="space-y-2">
              {images.map((item, index) => (
                <div key={item.id} className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/10">
                  <img src={item.url} alt={item.file.name} className="w-12 h-12 object-cover rounded-lg border border-white/10" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{item.file.name}</p>
                    <p className="text-xs text-gray-500">Página {index + 1}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => moveImage(index, -1)}
                      disabled={index === 0}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      aria-label="Mover para cima"
                    >
                      <Upload className="w-4 h-4 rotate-[-45deg]" />
                    </button>
                    <button
                      onClick={() => moveImage(index, 1)}
                      disabled={index === images.length - 1}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      aria-label="Mover para baixo"
                    >
                      <Upload className="w-4 h-4 rotate-[135deg]" />
                    </button>
                    <button
                      onClick={() => removeImage(item.id)}
                      className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors"
                      aria-label="Remover imagem"
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

            {error && (
              <p className="text-sm text-red-400 text-center">{error}</p>
            )}

            <button
              onClick={generatePDF}
              disabled={processing}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {processing ? (
                "Processando..."
              ) : (
                <>
                  <FileDown className="w-5 h-5" />
                  Gerar PDF
                </>
              )}
            </button>
          </>
        )}

        {images.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Selecione uma ou mais imagens para converter em PDF</p>
          </div>
        )}
      </div>

      <ToolContent
        toolName="Imagem para PDF"
        category="Utilidades"
        data={{
          directAnswer: "Para converter imagens em PDF, basta enviar uma ou mais fotos e a ferramenta monta automaticamente um arquivo PDF com cada imagem em uma página separada.",
          howItWorks: "A ferramenta lê cada imagem enviada e a insere em uma página de um novo documento PDF, redimensionando proporcionalmente para caber corretamente na página sem distorcer a imagem original. Quando múltiplas imagens são enviadas, cada uma vira uma página separada no PDF final, na ordem em que foram adicionadas. Todo o processamento acontece localmente no seu navegador — nenhuma imagem é enviada para servidores externos.",
          example: {
            title: "Exemplo: convertendo 3 fotos em um único PDF",
            steps: [
              "Envie 3 imagens (JPG ou PNG)",
              "Escolha orientação Retrato e tamanho A4",
              'Clique em "Gerar PDF"',
              "Resultado: um arquivo PDF de 3 páginas, uma imagem por página",
            ],
            result: "As 3 imagens foram organizadas em um único arquivo PDF, pronto para compartilhar ou imprimir.",
          },
          faqs: [
            { question: "Posso converter várias imagens de uma vez?", answer: "Sim, você pode enviar múltiplas imagens e cada uma vira uma página separada no PDF final." },
            { question: "Minhas imagens são enviadas para algum servidor?", answer: "Não, toda a conversão acontece localmente no seu navegador." },
            { question: "A qualidade da imagem é reduzida na conversão?", answer: "A ferramenta mantém a qualidade original da imagem, apenas ajustando o tamanho para caber na página do PDF." },
            { question: "Posso escolher a ordem das imagens no PDF?", answer: "Sim, as imagens aparecem no PDF na mesma ordem em que foram adicionadas na lista, e você pode remover e reordenar antes de gerar." },
          ],
        }}
      />
    </ToolLayout>
  );
}
