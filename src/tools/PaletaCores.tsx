import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import React, { useState, useRef, useCallback } from "react";


import { Upload, Copy, Check, Palette } from "lucide-react";

interface Props {
  onBack: () => void;
}

interface Cor {
  hex: string;
  rgb: { r: number; g: number; b: number };
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
}

export function PaletaCores({ onBack }: Props) {
  const [cores, setCores] = useState<Cor[]>([]);
  const [copiado, setCopiado] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const extrairCores = useCallback((file: File) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const maxSize = 100;
      const scale = Math.min(maxSize / img.width, maxSize / img.height);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      const colorMap = new Map<string, { count: number; r: number; g: number; b: number }>();

      for (let i = 0; i < data.length; i += 4) {
        const r = Math.round(data[i] / 32) * 32;
        const g = Math.round(data[i + 1] / 32) * 32;
        const b = Math.round(data[i + 2] / 32) * 32;

        const key = `${r},${g},${b}`;
        const existing = colorMap.get(key);
        if (existing) {
          existing.count++;
        } else {
          colorMap.set(key, { count: 1, r, g, b });
        }
      }

      const sorted = Array.from(colorMap.values())
        .sort((a, b) => b.count - a.count)
        .slice(0, 6)
        .map((c) => ({
          hex: rgbToHex(Math.min(255, c.r), Math.min(255, c.g), Math.min(255, c.b)),
          rgb: { r: c.r, g: c.g, b: c.b },
        }));

      setCores(sorted);
    };

    reader.readAsDataURL(file);
  }, []);

  const copiar = async (cor: string) => {
    try {
      await navigator.clipboard.writeText(cor);
      setCopiado(cor);
      setTimeout(() => setCopiado(null), 2000);
    } catch (err) {
      console.error("Erro ao copiar", err);
    }
  };

  return (
    <ToolLayout
      title="Extrator de Paleta"
      emoji="🎨"
      category="Utilidades"
      description="Extraia as cores dominantes de uma imagem. Tudo processado localmente."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["tablet desenho digital"]} label="tablet desenho digital" />}
    
    >
      <div className="space-y-5">
        <label className="block">
          <div className="p-6 rounded-xl border-2 border-dashed border-white/20 hover:border-white/40 transition-colors cursor-pointer text-center">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-400">Clique ou arraste uma imagem</p>
            <p className="text-xs text-gray-500 mt-1">Processamento local, sem upload</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) extrairCores(file);
              }}
              className="hidden"
            />
          </div>
        </label>

        <canvas ref={canvasRef} className="hidden" />

        {cores.length > 0 && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
              {cores.map((cor, i) => (
                <div key={i} className="text-center">
                  <div
                    className="w-full aspect-square rounded-xl mb-1 cursor-pointer hover:scale-105 transition-transform border border-white/10"
                    style={{ backgroundColor: cor.hex }}
                    onClick={() => copiar(cor.hex)}
                  />
                  <p className="text-xs font-bold text-white">{cor.hex.toUpperCase()}</p>
                  <p className="text-xs text-gray-500">{cor.rgb.r},{cor.rgb.g},{cor.rgb.b}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/8">
              <p className="text-xs text-gray-400 mb-2">Copiar</p>
              <div className="space-y-2">
                <button
                  onClick={() => copiar(cores.map((c) => c.hex).join(", "))}
                  className="w-full p-2 rounded bg-white/5 text-xs text-gray-300 hover:bg-white/10"
                >
                  HEX: {cores.map((c) => c.hex).join(", ")}
                </button>
                <button
                  onClick={() => copiar(cores.map((c) => `rgb(${c.rgb.r},${c.rgb.g},${c.rgb.b})`).join(", "))}
                  className="w-full p-2 rounded bg-white/5 text-xs text-gray-300 hover:bg-white/10"
                >
                  RGB: {cores.map((c) => `${c.rgb.r},${c.rgb.g},${c.rgb.b}`).join(" | ")}
                </button>
              </div>
            </div>

            {copiado && (
              <div className="p-2 rounded bg-green-500/20 text-center">
                <Check className="w-4 h-4 text-green-400 inline mr-1" />
                <span className="text-xs text-green-400">Copiado!</span>
              </div>
            )}
          </div>
        )}

        {cores.length === 0 && (
          <div className="p-4 rounded-xl bg-white/5 border border-white/8 text-center">
            <Palette className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-400">Carregue uma imagem para extrair as cores</p>
          </div>
        )}
      </div>
      <ToolContent
        toolName="Extrator de Paleta"
        category="Utilidades"
        data={{
          directAnswer: "A paleta de cores de uma imagem é extraída identificando os tons predominantes através da análise dos pixels, retornando os códigos HEX e RGB de cada cor.",
          howItWorks: "A ferramenta analisa a imagem enviada pixel a pixel e agrupa cores semelhantes para identificar as tonalidades mais frequentes e representativas. O resultado é uma paleta com as cores dominantes, cada uma com seu código HEX (usado em CSS/design) e RGB (usado em edição de imagem), prontos para uso em projetos de design gráfico ou desenvolvimento web.",
          example: {
            title: "Exemplo: extraindo paleta de uma foto de pôr do sol",
            steps: [
              "Imagem enviada: foto de pôr do sol",
              "Cores dominantes identificadas: 5 tons",
              "Cor principal: laranja avermelhado — HEX #E8622A / RGB (232, 98, 42)",
              "Cores secundárias: tons de roxo, azul escuro e amarelo dourado",
            ],
            result: "A paleta extraída da foto do pôr do sol traz 5 cores dominantes, prontas para uso em um projeto de design com a mesma identidade visual da imagem.",
          },
          faqs: [
            { question: "Que tipos de imagem posso enviar?", answer: "A maioria dos formatos comuns, como JPG, PNG e WEBP, é suportada pela ferramenta." },
            { question: "O que é o código HEX de uma cor?", answer: "É uma representação hexadecimal da cor (ex: #FFFFFF para branco), amplamente usada em design web e CSS." },
            { question: "Quantas cores a paleta extrai por imagem?", answer: "Geralmente entre 5 e 8 cores dominantes, dependendo da variedade de tons presentes na imagem original." },
            { question: "Posso usar as cores extraídas comercialmente?", answer: "Sim, as cores em si (códigos HEX/RGB) não têm direitos autorais — apenas confira se a imagem original usada tem os direitos de uso adequados para o seu projeto." },
          ],
        }}
      />
    </ToolLayout>
  );
}
