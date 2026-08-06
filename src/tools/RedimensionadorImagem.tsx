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

export function RedimensionadorImagem({ onBack }: Props) {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState("");
  const [originalSize, setOriginalSize] = useState(0);
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [newWidth, setNewWidth] = useState(0);
  const [newHeight, setNewHeight] = useState(0);
  const [keepAspect, setKeepAspect] = useState(true);
  const [mode, setMode] = useState<"pixels" | "percent">("pixels");
  const [percent, setPercent] = useState(50);
  const [resizedUrl, setResizedUrl] = useState("");
  const [resizedSize, setResizedSize] = useState(0);
  const [done, setDone] = useState(false);
  const [processing, setProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const handleFile = (file: File) => {
    if (originalUrl) URL.revokeObjectURL(originalUrl);
    if (resizedUrl) URL.revokeObjectURL(resizedUrl);
    const url = URL.createObjectURL(file);
    setOriginalFile(file);
    setOriginalUrl(url);
    setOriginalSize(file.size);
    setDone(false);
    setResizedUrl("");
    setResizedSize(0);

    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      setOriginalWidth(img.naturalWidth);
      setOriginalHeight(img.naturalHeight);
      setNewWidth(img.naturalWidth);
      setNewHeight(img.naturalHeight);
      setPercent(50);
    };
    img.src = url;
  };

  const handleWidthChange = (w: number) => {
    setNewWidth(w);
    if (keepAspect && originalWidth > 0) {
      setNewHeight(Math.round((w / originalWidth) * originalHeight));
    }
  };

  const handleHeightChange = (h: number) => {
    setNewHeight(h);
    if (keepAspect && originalHeight > 0) {
      setNewWidth(Math.round((h / originalHeight) * originalWidth));
    }
  };

  const handlePercentChange = (p: number) => {
    setPercent(p);
    if (originalWidth > 0) {
      setNewWidth(Math.round((originalWidth * p) / 100));
      setNewHeight(Math.round((originalHeight * p) / 100));
    }
  };

  const processResize = () => {
    if (!imgRef.current || newWidth <= 0 || newHeight <= 0) return;
    setProcessing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = newWidth;
    canvas.height = newHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(imgRef.current, 0, 0, newWidth, newHeight);

    canvas.toBlob(
      (blob) => {
        if (blob) {
          if (resizedUrl) URL.revokeObjectURL(resizedUrl);
          const url = URL.createObjectURL(blob);
          setResizedUrl(url);
          setResizedSize(blob.size);
          setDone(true);
        }
        setProcessing(false);
      },
      "image/png"
    );
  };

  useEffect(() => {
    return () => {
      if (originalUrl) URL.revokeObjectURL(originalUrl);
      if (resizedUrl) URL.revokeObjectURL(resizedUrl);
    };
  }, []);

  const handleDownload = () => {
    if (!resizedUrl) return;
    const a = document.createElement("a");
    a.href = resizedUrl;
    a.download = "imagem-redimensionada.png";
    a.click();
  };

  return (
    <ToolLayout
      title="Redimensionador de Imagem"
      emoji="📐"
      category="Utilidades"
      description="Redimensione imagens alterando largura e altura em pixels ou porcentagem."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["hospedagem site"]} label="hospedagem site" />}
    >
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Selecione uma imagem</span>
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
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <p className="text-sm text-gray-400">
                Dimensões originais: <span className="font-bold text-white">{originalWidth} x {originalHeight} px</span> ({formatBytes(originalSize)})
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setMode("pixels")}
                className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
                  mode === "pixels"
                    ? "bg-green-500/20 border-green-500/40 text-green-400"
                    : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
                }`}
              >
                Pixels
              </button>
              <button
                onClick={() => setMode("percent")}
                className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
                  mode === "percent"
                    ? "bg-green-500/20 border-green-500/40 text-green-400"
                    : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
                }`}
              >
                Porcentagem
              </button>
            </div>

            {mode === "pixels" ? (
              <>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={keepAspect}
                    onChange={(e) => setKeepAspect(e.target.checked)}
                    className="accent-green-500"
                  />
                  <span className="text-sm text-gray-300">Manter proporção</span>
                </label>

                <div className="grid grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-sm text-gray-400 mb-1 block">Largura (px)</span>
                    <input
                      type="number"
                      value={newWidth}
                      onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                      className="input-field"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm text-gray-400 mb-1 block">Altura (px)</span>
                    <input
                      type="number"
                      value={newHeight}
                      onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                      className="input-field"
                    />
                  </label>
                </div>
              </>
            ) : (
              <label className="block">
                <span className="text-sm text-gray-400 mb-1 block">
                  Redimensionar para: {percent}% ({Math.round((originalWidth * percent) / 100)} x {Math.round((originalHeight * percent) / 100)} px)
                </span>
                <input
                  type="range"
                  min="1"
                  max="200"
                  step="1"
                  value={percent}
                  onChange={(e) => handlePercentChange(parseInt(e.target.value))}
                  className="w-full accent-green-500"
                />
              </label>
            )}

            <button onClick={processResize} className="btn-primary w-full">
              Redimensionar
            </button>

            {processing && <p className="text-sm text-gray-500 text-center">Processando...</p>}

            {done && !processing && (
              <>
                <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
                  <p className="text-sm text-green-400">
                    Nova imagem: <span className="font-bold">{newWidth} x {newHeight} px</span> ({formatBytes(resizedSize)})
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-400 mb-1 text-center">Preview</p>
                  <img src={resizedUrl} alt="Redimensionada" className="w-full max-w-md mx-auto rounded-xl border border-white/10" />
                </div>

                <button onClick={handleDownload} className="btn-primary w-full">
                  Baixar imagem redimensionada
                </button>
              </>
            )}
          </>
        )}
      </div>

      <ToolContent
        toolName="Redimensionador de Imagem"
        category="Utilidades"
        data={{
          directAnswer: "Redimensionar uma imagem altera suas dimensões em pixels, mantendo (ou não) a proporção original entre largura e altura, sem cortar ou distorcer o conteúdo quando a proporção é mantida.",
          howItWorks: "A ferramenta carrega sua imagem no navegador e a redesenha em um canvas com as novas dimensões especificadas. Ao manter a opção 'Manter proporção' ativada, alterar a largura recalcula automaticamente a altura correspondente (e vice-versa), evitando que a imagem fique esticada ou achatada. Isso é útil para adequar fotos a requisitos específicos de tamanho, como fotos de perfil, banners ou uploads em formulários com limite de dimensão.",
          example: {
            title: "Exemplo: redimensionando uma foto para postagem",
            steps: [
              `Imagem original: 4000 x 3000 pixels`,
              `Nova largura desejada: 1200 pixels`,
              `Com "Manter proporção" ativado, altura calculada automaticamente: 900 pixels`,
              `Imagem final: 1200 x 900 pixels, mesma proporção do original`,
            ],
            result: "A imagem foi redimensionada mantendo a proporção original, sem distorção.",
          },
          faqs: [
            { question: "Minha imagem fica distorcida ao redimensionar?", answer: "Não, se você manter a opção \"Manter proporção\" ativada, a ferramenta ajusta automaticamente a outra dimensão para preservar as proporções originais." },
            { question: "Posso redimensionar para um tamanho maior que o original?", answer: "Sim, mas aumentar muito o tamanho pode reduzir a nitidez da imagem, já que não é possível criar detalhes que não existiam na imagem original." },
            { question: "Minha imagem é enviada para algum servidor?", answer: "Não, todo o processamento acontece localmente no seu navegador." },
            { question: "Qual a diferença entre redimensionar e comprimir?", answer: "Redimensionar muda as dimensões em pixels (largura e altura); comprimir reduz a qualidade/tamanho do arquivo mantendo as mesmas dimensões. Para reduzir ao máximo o tamanho do arquivo, você pode usar as duas ferramentas em conjunto." },
          ],
        }}
      />
    </ToolLayout>
  );
}
