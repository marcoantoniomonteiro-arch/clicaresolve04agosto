import React, { useState, useMemo } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { Ruler } from "lucide-react";

interface Props {
  onBack: () => void;
}

type RoomKind = "sala_estar" | "quarto" | "sala_jantar";

interface RoomConfig {
  id: RoomKind;
  label: string;
  rule: string;
}

const ROOM_CONFIGS: RoomConfig[] = [
  { id: "sala_estar", label: "Sala de Estar", rule: "70-80% das dimensões do espaço" },
  { id: "quarto", label: "Quarto", rule: "45-60cm além das laterais e pé da cama" },
  { id: "sala_jantar", label: "Sala de Jantar", rule: "60-90cm a mais que a mesa em cada lado" },
];

const STANDARD_SIZES = [
  { w: 1.4, l: 2.0 },
  { w: 1.6, l: 2.3 },
  { w: 2.0, l: 2.5 },
  { w: 2.0, l: 3.0 },
  { w: 2.5, l: 3.0 },
  { w: 2.5, l: 3.5 },
  { w: 3.0, l: 4.0 },
  { w: 3.0, l: 5.0 },
  { w: 3.5, l: 4.0 },
  { w: 4.0, l: 5.0 },
];

function fmt(n: number): string {
  return n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function CalculadoraTamanhoTapete({ onBack }: Props) {
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [roomKind, setRoomKind] = useState<RoomKind>("sala_estar");

  const result = useMemo(() => {
    const w = parseFloat(width.replace(",", ".")) || 0;
    const l = parseFloat(length.replace(",", ".")) || 0;
    if (w <= 0 || l <= 0) return null;

    let minW: number, maxW: number, minL: number, maxL: number;

    if (roomKind === "sala_estar") {
      minW = w * 0.7;
      maxW = w * 0.8;
      minL = l * 0.7;
      maxL = l * 0.8;
    } else if (roomKind === "quarto") {
      const ext = 0.45;
      const extMax = 0.6;
      minW = w + ext * 2;
      maxW = w + extMax * 2;
      minL = l + ext * 2;
      maxL = l + extMax * 2;
    } else {
      const ext = 0.6;
      const extMax = 0.9;
      minW = w + ext * 2;
      maxW = w + extMax * 2;
      minL = l + ext * 2;
      maxL = l + extMax * 2;
    }

    const targetW = (minW + maxW) / 2;
    const targetL = (minL + maxL) / 2;

    const closest = STANDARD_SIZES
      .map((s) => ({
        ...s,
        diff: Math.abs(s.w - targetW) + Math.abs(s.l - targetL),
      }))
      .sort((a, b) => a.diff - b.diff)
      .slice(0, 3);

    return { minW, maxW, minL, maxL, closest };
  }, [width, length, roomKind]);

  const roomConfig = ROOM_CONFIGS.find((r) => r.id === roomKind)!;

  return (
    <ToolLayout
      title="Calculadora de Tamanho de Tapete"
      emoji="🏠"
      category="Casa"
      description="Descubra o tamanho ideal de tapete para sua sala, quarto ou sala de jantar."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["tapete sala"]} label="Tapetes para sua casa" />}
    >
      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Tipo de cômodo</label>
          <select
            value={roomKind}
            onChange={(e) => setRoomKind(e.target.value as RoomKind)}
            className="input-field"
          >
            {ROOM_CONFIGS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label}
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">{roomConfig.rule}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Largura do ambiente (m)</span>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              placeholder="Ex: 4"
              className="input-field"
            />
          </label>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Comprimento do ambiente (m)</span>
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              placeholder="Ex: 5"
              className="input-field"
            />
          </label>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-400/10 to-cyan-400/10 border border-blue-400/20">
              <div className="flex items-center gap-3 mb-3">
                <Ruler className="w-6 h-6 text-blue-400" />
                <p className="text-sm font-semibold text-white">Tamanho sugerido do tapete</p>
              </div>
              <p className="text-2xl font-bold text-blue-400 text-center">
                {fmt(result.minW)}×{fmt(result.minL)}m a {fmt(result.maxW)}×{fmt(result.maxL)}m
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white mb-2">Tamanhos padrão mais próximos</h3>
              <div className="space-y-2">
                {result.closest.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10"
                  >
                    <span className="text-sm text-gray-300">{fmt(s.w)} × {fmt(s.l)} m</span>
                    {i === 0 && (
                      <span className="text-xs text-green-400 font-semibold">Mais próximo</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {!result && (
          <div className="text-center py-12 text-gray-500">
            <Ruler className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Informe as dimensões do ambiente para calcular</p>
          </div>
        )}
      </div>

      <ToolContent
        toolName="Tamanho de Tapete"
        category="Casa"
        data={{
          directAnswer: "O tamanho ideal de tapete depende do cômodo: na sala, deve cobrir pelo menos as patas dianteiras dos móveis; no quarto, deve se estender além das laterais da cama; na sala de jantar, deve caber todas as cadeiras mesmo puxadas para trás.",
          howItWorks: "Cada cômodo tem uma regra prática de design de interiores para definir o tamanho ideal do tapete. Na sala de estar, o objetivo é 'ancorar' visualmente os móveis, o que geralmente significa um tapete grande o suficiente para que pelo menos as patas dianteiras do sofá e poltronas fiquem apoiadas sobre ele. No quarto, o tapete deve se estender além das bordas da cama para criar uma sensação de conforto ao pisar. Na sala de jantar, o tapete precisa ser grande o suficiente para que as cadeiras permaneçam sobre ele mesmo quando puxadas para trás ao sentar ou levantar, evitando que as pernas da cadeira fiquem presas na borda.",
          example: {
            title: "Exemplo: tapete para sala de estar de 4x5 metros",
            steps: [
              "Ambiente: Sala de Estar, 4m × 5m",
              "Regra: 70-80% das dimensões do espaço de estar",
              "Tamanho sugerido: aproximadamente 3,00m × 3,50m a 3,20m × 4,00m",
              "Tamanho padrão mais próximo disponível: 3,00m × 4,00m",
            ],
            result: "Um tapete de aproximadamente 3x4 metros seria ideal para ancorar os móveis nesta sala.",
          },
          faqs: [
            { question: "O tapete precisa cobrir toda a sala?", answer: "Não necessariamente, mas deve ser grande o suficiente para que os móveis principais fiquem, pelo menos parcialmente, apoiados sobre ele, criando uma sensação de unidade visual." },
            { question: "Por que o tapete de sala de jantar precisa ser tão grande?", answer: "Para que as cadeiras permaneçam sobre o tapete mesmo quando as pessoas as puxam para trás ao sentar ou levantar da mesa." },
            { question: "Essas são regras rígidas ou sugestões?", answer: "São diretrizes práticas amplamente usadas em design de interiores, mas o gosto pessoal e o estilo do ambiente também influenciam a escolha final." },
            { question: "Existe um tamanho mínimo recomendado?", answer: "Tapetes muito pequenos em relação ao ambiente tendem a fazer o espaço parecer desproporcional; seguir as proporções sugeridas ajuda a evitar esse efeito." },
          ],
        }}
      />
    </ToolLayout>
  );
}
