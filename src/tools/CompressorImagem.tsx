import React, { useState, useRef, useEffect } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";

interface Props {
  onBack: () => void;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function CompressorImagem({ onBack }: Props) {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [quality, setQuality] = useState(0.7);
  const [originalUrl, setOriginalUrl] = useState("");
  const [compressedUrl, setCompressedUrl] = useState("");
  const [originalSize, setOriginalSize] = useState(0);
  const [compressedSize, setCompressedSize] = useState(0);
  const [compressed, setCompressed] = useState(false);
  const [processing, setProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFile = (file: File) => {
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (compressedUrl) URL.revokeObjectURL(compressedUrl);
    const url = URL.createObjectURL(file);
    setOriginalFile(file);
    setOriginalUrl(url);
    setOriginalSize(file.size);
    setCompressed(false);
    setCompressedUrl("");
    setCompressedSize(0);

    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      processCompression(img, quality);
    };
    img.src = url;
  };

  const processCompression = (img: HTMLImageElement, q: number) => {
    setProcessing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(img, 0, 0);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          if (compressedUrl) URL.revokeObjectURL(compressedUrl);
          const url = URL.createObjectURL(blob);
          setCompressedUrl(url);
          setCompressedSize(blob.size);
          setCompressed(true);
        }
        setProcessing(false);
      },
      "image/jpeg",
      q
    );
  };

  useEffect(() => {
    if (imgRef.current) {
      processCompression(imgRef.current, quality);
    }
  }, [quality]);

  useEffect(() => {
    return () => {
      if (originalUrl) URL.revokeObjectURL(originalUrl);
      if (compressedUrl) URL.revokeObjectURL(compressedUrl);
    };
  }, []);

  const reduction =
    originalSize > 0 && compressedSize > 0
      ? Math.round((1 - compressedSize / originalSize) * 100)
      : 0;

  const handleDownload = () => {
    if (!compressedUrl) return;
    const a = document.createElement("a");
    a.href = compressedUrl;
    a.download = "imagem-comprimida.jpg";
    a.click();
  };

  return (
    <ToolLayout
      title="Compressor de Imagem"
      emoji="🗜️"
      category="Utilidades"
      description="Comprima imagens JPG, PNG e WEBP reduzindo o tamanho do arquivo."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["armazenamento nuvem"]} label="armazenamento nuvem" />}
    >
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Selecione uma imagem (JPG, PNG, WEBP)</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
            className="input-field text-sm"
          />
        </label>

        <canvas ref={canvasRef} className="hidden" />

        {originalFile && (
          <>
            <div>
              <label className="block">
                <span className="text-sm text-gray-400 mb-1 block">
                  Qualidade: {Math.round(quality * 100)}%
                </span>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.05"
                  value={quality}
                  onChange={(e) => setQuality(parseFloat(e.target.value))}
                  className="w-full accent-green-500"
                />
              </label>
            </div>

            {processing && (
              <p className="text-sm text-gray-500 text-center">Processando...</p>
            )}

            {compressed && !processing && (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                    <p className="text-xs text-gray-400">Original</p>
                    <p className="text-base font-bold text-white">{formatBytes(originalSize)}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
                    <p className="text-xs text-green-400">Comprimida</p>
                    <p className="text-base font-bold text-green-400">{formatBytes(compressedSize)}</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center">
                  <p className="text-sm text-amber-400 font-semibold">Redução de {reduction}%</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-400 mb-1 text-center">Original</p>
                    <img src={originalUrl} alt="Original" className="w-full rounded-xl border border-white/10" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1 text-center">Comprimida</p>
                    <img src={compressedUrl} alt="Comprimida" className="w-full rounded-xl border border-white/10" />
                  </div>
                </div>

                <button onClick={handleDownload} className="btn-primary w-full">
                  Baixar imagem comprimida
                </button>
              </>
            )}
          </>
        )}
      </div>

      <ToolContent
        toolName="Compressor de Imagem"
        category="Utilidades"
        data={{
          directAnswer: "Compressão de imagem reduz o tamanho do arquivo diminuindo a qualidade JPEG de forma controlada, mantendo a imagem visualmente parecida com o original, mas ocupando menos espaço.",
          howItWorks: "A ferramenta carrega sua imagem diretamente no navegador (sem enviar para nenhum servidor) e a redesenha em um canvas, aplicando o nível de qualidade JPEG escolhido no controle deslizante. Quanto menor a qualidade, menor o arquivo final, mas com mais perda de detalhes visuais. Para a maioria dos usos (envio por WhatsApp, upload em formulários, e-mail), uma qualidade entre 60% e 80% já reduz bastante o tamanho sem perda visível de qualidade.",
          example: {
            title: "Exemplo: comprimindo uma foto de 4MB",
            steps: [
              `Imagem original: 4.2 MB (foto tirada por celular)`,
              `Qualidade escolhida: 70%`,
              `Processamento no navegador`,
              `Imagem comprimida: aproximadamente 850 KB`,
              `Redução: cerca de 80% menor`,
            ],
            result: "A imagem comprimida fica bem menor, ideal para enviar por e-mail ou WhatsApp sem perder qualidade visual perceptível.",
          },
          faqs: [
            { question: "Minha imagem é enviada para algum servidor?", answer: "Não, todo o processamento de compressão acontece localmente no seu navegador. A imagem nunca sai do seu dispositivo." },
            { question: "Qual qualidade devo escolher?", answer: "Para a maioria dos usos do dia a dia, entre 60% e 80% oferece um bom equilíbrio entre tamanho reduzido e qualidade visual preservada." },
            { question: "A compressão funciona com PNG?", answer: "A ferramenta converte a imagem para JPEG durante a compressão, que costuma gerar arquivos bem menores. Para imagens com transparência, isso pode alterar o resultado." },
            { question: "Existe limite de tamanho de imagem?", answer: "Depende da capacidade do navegador do seu dispositivo, mas imagens de uso comum (fotos de celular) funcionam normalmente." },
          ],
        }}
      />
    </ToolLayout>
  );
}
