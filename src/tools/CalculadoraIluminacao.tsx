import React, { useState, useMemo } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { Lightbulb } from "lucide-react";

interface Props {
  onBack: () => void;
}

interface RoomType {
  id: string;
  label: string;
  min: number;
  max: number;
}

const ROOM_TYPES: RoomType[] = [
  { id: "sala", label: "Sala de Estar/Jantar", min: 100, max: 150 },
  { id: "quarto", label: "Quarto", min: 100, max: 150 },
  { id: "cozinha", label: "Cozinha", min: 300, max: 500 },
  { id: "banheiro", label: "Banheiro", min: 200, max: 400 },
  { id: "escritorio", label: "Escritório/Estudo", min: 400, max: 500 },
  { id: "corredor", label: "Corredor", min: 100, max: 200 },
];

const LED_LUMENS = 800;

export function CalculadoraIluminacao({ onBack }: Props) {
  const [width, setWidth] = useState("");
  const [length, setLength] = useState("");
  const [roomId, setRoomId] = useState("sala");

  const room = ROOM_TYPES.find((r) => r.id === roomId)!;

  const result = useMemo(() => {
    const w = parseFloat(width.replace(",", ".")) || 0;
    const l = parseFloat(length.replace(",", ".")) || 0;
    const area = w * l;
    const minLumens = area * room.min;
    const maxLumens = area * room.max;
    const minLamps = Math.ceil(minLumens / LED_LUMENS);
    const maxLamps = Math.ceil(maxLumens / LED_LUMENS);
    return { area, minLumens, maxLumens, minLamps, maxLamps };
  }, [width, length, room]);

  return (
    <ToolLayout
      title="Calculadora de Iluminação"
      emoji="💡"
      category="Casa"
      description="Descubra quantos lúmens e lâmpadas LED seu ambiente precisa para a iluminação ideal."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["lampada led"]} label="Ilumine seu ambiente" />}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Largura (m)</span>
            <input
              type="number"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              placeholder="Ex: 4"
              className="input-field"
            />
          </label>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Comprimento (m)</span>
            <input
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              placeholder="Ex: 5"
              className="input-field"
            />
          </label>
        </div>

        <div>
          <label className="text-sm text-gray-400 mb-1 block">Tipo de ambiente</label>
          <select
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="input-field"
          >
            {ROOM_TYPES.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label}
              </option>
            ))}
          </select>
        </div>

        {result.area > 0 && (
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-gradient-to-br from-yellow-400/10 to-amber-400/10 border border-yellow-400/20">
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-1">Área do ambiente</p>
                <p className="text-2xl font-bold text-white">
                  {result.area.toLocaleString("pt-BR", { maximumFractionDigits: 2 })} m²
                </p>
              </div>
              <div className="h-px bg-white/10 my-4" />
              <div className="text-center">
                <p className="text-sm text-gray-400 mb-1">Lúmens necessários</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {result.minLumens.toLocaleString("pt-BR")} - {result.maxLumens.toLocaleString("pt-BR")} lm
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Faixa: {room.min}-{room.max} lumens/m²
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                <Lightbulb className="w-8 h-8 text-yellow-400 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-white">Lâmpadas LED necessárias</p>
                  <p className="text-lg font-bold text-yellow-400">
                    {result.minLamps === result.maxLamps
                      ? `${result.minLamps} lâmpada${result.minLamps > 1 ? "s" : ""}`
                      : `${result.minLamps} a ${result.maxLamps} lâmpadas`}
                  </p>
                  <p className="text-xs text-gray-500">
                    Baseado em lâmpadas LED padrão de {LED_LUMENS} lumens cada
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {result.area === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Lightbulb className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Informe as dimensões do ambiente para calcular</p>
          </div>
        )}
      </div>

      <ToolContent
        toolName="Calculadora de Iluminação"
        category="Casa"
        data={{
          directAnswer: "A quantidade ideal de iluminação para um ambiente é calculada multiplicando a área do cômodo pela faixa de lúmens por metro quadrado recomendada para aquele tipo de uso.",
          howItWorks: "Cada tipo de ambiente tem uma necessidade diferente de iluminação: espaços de relaxamento como salas e quartos precisam de menos luz (100-150 lumens/m²), enquanto áreas de trabalho detalhado como cozinhas e escritórios precisam de bem mais luz (300-500 lumens/m²), seguindo referências técnicas de iluminação residencial amplamente utilizadas. A ferramenta multiplica a área do seu ambiente pela faixa recomendada para o uso escolhido, e sugere quantas lâmpadas LED padrão (800 lumens cada) seriam necessárias para atingir essa iluminação.",
          example: {
            title: "Exemplo: iluminando uma cozinha de 10m²",
            steps: [
              "Ambiente: Cozinha, 10 m² (ex: 2m × 5m)",
              "Faixa recomendada: 300-500 lumens/m²",
              "Lúmens necessários: 3.000 a 5.000 lumens totais",
              "Lâmpadas LED de 800 lumens necessárias: aproximadamente 4 a 6 lâmpadas",
            ],
            result: "Uma cozinha de 10m² precisa de aproximadamente 4 a 6 lâmpadas LED padrão para atingir a iluminação ideal para preparo de alimentos.",
          },
          faqs: [
            { question: "Por que a cozinha precisa de mais luz que a sala?", answer: "Porque atividades de preparo de alimentos e uso de objetos cortantes exigem mais precisão visual, enquanto salas de estar priorizam ambiente aconchegante." },
            { question: "Essas faixas são normas técnicas oficiais?", answer: "São baseadas em referências de iluminação residencial amplamente utilizadas por profissionais de design de interiores e elétrica." },
            { question: "Posso usar lâmpadas de lúmens diferentes de 800?", answer: "Sim, o cálculo de lúmens totais necessários continua válido — basta dividir pelo valor de lúmens da lâmpada específica que você for usar." },
            { question: "Preciso de toda essa luz em um único ponto central?", answer: "Não, o total é melhor distribuído entre luminária central, luminárias de canto, arandelas e iluminação de tarefa, dependendo do ambiente." },
          ],
        }}
      />
    </ToolLayout>
  );
}
