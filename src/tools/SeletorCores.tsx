import React, { useState, useMemo } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";

interface Props {
  onBack: () => void;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace(/^#/, "");
  if (!/^[0-9a-fA-F]{6}$/.test(clean) && !/^[0-9a-fA-F]{3}$/.test(clean)) return null;
  const full = clean.length === 3
    ? clean.split("").map((c) => c + c).join("")
    : clean;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return { r, g, b };
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const rN = r / 255;
  const gN = g / 255;
  const bN = b / 255;
  const max = Math.max(rN, gN, bN);
  const min = Math.min(rN, gN, bN);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rN: h = (gN - bN) / d + (gN < bN ? 6 : 0); break;
      case gN: h = (bN - rN) / d + 2; break;
      case bN: h = (rN - gN) / d + 4; break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function SeletorCores({ onBack }: Props) {
  const [hex, setHex] = useState("#FF5733");

  const { rgb, hsl, valid } = useMemo(() => {
    const rgbVal = hexToRgb(hex);
    if (!rgbVal) return { rgb: null, hsl: null, valid: false };
    return { rgb: rgbVal, hsl: rgbToHsl(rgbVal.r, rgbVal.g, rgbVal.b), valid: true };
  }, [hex]);

  const rgbStr = rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : "";
  const hslStr = hsl ? `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` : "";

  const handleColorPick = (val: string) => {
    setHex(val.toUpperCase());
  };

  const handleHexInput = (val: string) => {
    let v = val.trim();
    if (v && !v.startsWith("#")) v = "#" + v;
    setHex(v);
  };

  const copy = (text: string) => {
    if (text) navigator.clipboard.writeText(text);
  };

  return (
    <ToolLayout
      title="Seletor de Cores"
      emoji="🎨"
      category="Utilidades"
      description="Escolha cores e converta entre HEX, RGB e HSL instantaneamente."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["curso design"]} label="curso design" />}
    >
      <div className="space-y-4">
        <div className="flex flex-col items-center gap-4">
          <input
            type="color"
            value={valid ? hex : "#000000"}
            onChange={(e) => handleColorPick(e.target.value)}
            className="w-24 h-24 rounded-2xl border border-white/10 cursor-pointer bg-transparent"
          />
          <div
            className="w-full h-24 rounded-2xl border border-white/10"
            style={{ backgroundColor: valid ? hex : "#000" }}
          />
        </div>

        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Código HEX</span>
          <input
            type="text"
            value={hex}
            onChange={(e) => handleHexInput(e.target.value)}
            placeholder="#FF5733"
            className={`input-field font-mono ${valid ? "" : "border-red-500/40"}`}
          />
        </label>

        {valid && rgb && hsl && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex-1 p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-gray-400 mb-0.5">HEX</p>
                <p className="text-sm font-mono text-white">{hex.toUpperCase()}</p>
              </div>
              <button onClick={() => copy(hex.toUpperCase())} className="text-xs text-green-400 hover:text-green-300 px-2">Copiar</button>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-gray-400 mb-0.5">RGB</p>
                <p className="text-sm font-mono text-white">{rgbStr}</p>
              </div>
              <button onClick={() => copy(rgbStr)} className="text-xs text-green-400 hover:text-green-300 px-2">Copiar</button>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-gray-400 mb-0.5">HSL</p>
                <p className="text-sm font-mono text-white">{hslStr}</p>
              </div>
              <button onClick={() => copy(hslStr)} className="text-xs text-green-400 hover:text-green-300 px-2">Copiar</button>
            </div>
          </div>
        )}

        {!valid && (
          <p className="text-sm text-red-400">Código HEX inválido. Use o formato #RRGGBB ou #RGB.</p>
        )}
      </div>

      <ToolContent
        toolName="Seletor de Cores"
        category="Utilidades"
        data={{
          directAnswer: "HEX, RGB e HSL são três formas diferentes de representar a mesma cor: HEX usa código hexadecimal, RGB usa valores de vermelho/verde/azul de 0 a 255, e HSL usa matiz/saturação/luminosidade.",
          howItWorks: "A ferramenta permite escolher uma cor visualmente ou digitar um código HEX, e converte automaticamente entre os três formatos mais usados em design e desenvolvimento web: HEX (usado em CSS e a maioria dos softwares de design), RGB (usado quando se trabalha com intensidade de cada cor primária de luz) e HSL (mais intuitivo para ajustar tonalidade, saturação e brilho de uma cor).",
          example: {
            title: "Exemplo: convertendo uma cor laranja",
            steps: [
              `Cor selecionada: #FF5733`,
              `Conversão para RGB: rgb(255, 87, 51)`,
              `Conversão para HSL: hsl(9, 100%, 60%)`,
            ],
            result: "A mesma cor laranja pode ser representada nos três formatos, dependendo do que seu projeto de design ou código precisar.",
          },
          faqs: [
            { question: "Qual formato devo usar no meu projeto?", answer: "HEX é o mais comum em CSS e ferramentas de design. RGB é útil quando se trabalha com transparência (RGBA). HSL é mais intuitivo para ajustar tonalidade e brilho manualmente." },
            { question: "O que significa cada letra em HSL?", answer: "H (Hue/Matiz) é a cor em si (0-360°), S (Saturation/Saturação) é a intensidade da cor (0-100%), e L (Lightness/Luminosidade) é o quão claro ou escuro é (0-100%)." },
            { question: "Por que HEX usa letras e números?", answer: "HEX é um sistema hexadecimal (base 16), que usa números de 0-9 e letras de A-F para representar valores de 0 a 255 de forma mais compacta." },
            { question: "RGB e RGBA são a mesma coisa?", answer: "RGB tem 3 valores (vermelho, verde, azul). RGBA adiciona um 4º valor (Alpha) para controlar a transparência da cor." },
          ],
        }}
      />
    </ToolLayout>
  );
}
