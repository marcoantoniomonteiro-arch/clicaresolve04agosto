import React, { useState, useMemo } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { AlertTriangle, Car, Bus, Plane, Train, TreePine } from "lucide-react";

interface Props {
  onBack: () => void;
}

interface TransportMode {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  factor: number;
  color: string;
}

const MODES: TransportMode[] = [
  { id: "carro", label: "Carro (médio)", icon: Car, factor: 171, color: "text-blue-400" },
  { id: "onibus", label: "Ônibus", icon: Bus, factor: 105, color: "text-green-400" },
  { id: "aviao_curta", label: "Avião (curta distância)", icon: Plane, factor: 255, color: "text-red-400" },
  { id: "aviao_longa", label: "Avião (longa distância)", icon: Plane, factor: 150, color: "text-orange-400" },
  { id: "trem", label: "Trem", icon: Train, factor: 19, color: "text-emerald-400" },
];

const CO2_PER_TREE_PER_YEAR = 22;

export function PegadaCarbonoViagem({ onBack }: Props) {
  const [distance, setDistance] = useState("");
  const [modeId, setModeId] = useState("carro");

  const dist = parseFloat(distance.replace(",", ".")) || 0;
  const mode = MODES.find((m) => m.id === modeId)!;

  const selectedEmission = useMemo(() => {
    const grams = dist * mode.factor;
    const kg = grams / 1000;
    const trees = kg / CO2_PER_TREE_PER_YEAR;
    return { grams, kg, trees };
  }, [dist, mode]);

  const allEmissions = useMemo(() => {
    return MODES.map((m) => {
      const grams = dist * m.factor;
      const kg = grams / 1000;
      const trees = kg / CO2_PER_TREE_PER_YEAR;
      return { ...m, kg, trees };
    });
  }, [dist]);

  const maxKg = Math.max(...allEmissions.map((e) => e.kg), 1);

  return (
    <ToolLayout
      title="Pegada de Carbono de Viagem"
      emoji="🌍"
      category="Lazer"
      description="Estime a emissão de CO2 da sua viagem e quantas árvores seriam necessárias para compensar."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["garrafa reutilizavel"]} label="Itens sustentáveis" />}
    >
      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Distância da viagem (km)</label>
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="Ex: 500"
            className="input-field"
          />
        </div>

        <div>
          <label className="text-sm text-gray-400 mb-2 block">Meio de transporte</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {MODES.map((m) => {
              const Icon = m.icon;
              return (
                <button
                  key={m.id}
                  onClick={() => setModeId(m.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                    modeId === m.id
                      ? "bg-green-400/15 border border-green-400/40 text-green-400"
                      : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${modeId === m.id ? "text-green-400" : "text-gray-500"}`} />
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>

        {dist > 0 && (
          <div className="p-5 rounded-xl bg-gradient-to-br from-green-400/10 to-emerald-400/10 border border-green-400/20">
            <div className="text-center mb-4">
              <p className="text-3xl font-bold text-white">{selectedEmission.kg.toLocaleString("pt-BR", { maximumFractionDigits: 2 })} kg</p>
              <p className="text-sm text-gray-400">CO2 emitido na viagem</p>
            </div>
            <div className="flex items-center justify-center gap-2 text-green-400">
              <TreePine className="w-5 h-5" />
              <p className="text-sm">
                <strong>{selectedEmission.trees.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}</strong> árvores/ano para compensar
              </p>
            </div>
          </div>
        )}

        {dist > 0 && (
          <div>
            <h3 className="text-sm font-bold text-white mb-3">Comparação entre meios de transporte</h3>
            <div className="space-y-2">
              {allEmissions.map((e) => {
                const Icon = e.icon;
                const widthPct = (e.kg / maxKg) * 100;
                const isCurrent = e.id === modeId;
                return (
                  <div key={e.id} className="flex items-center gap-3">
                    <div className="w-32 shrink-0 flex items-center gap-2">
                      <Icon className={`w-4 h-4 ${e.color}`} />
                      <span className="text-xs text-gray-400 truncate">{e.label}</span>
                    </div>
                    <div className="flex-1 bg-white/5 rounded-full h-6 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${isCurrent ? "bg-green-400" : "bg-gray-600"}`}
                        style={{ width: `${widthPct}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-300 w-20 text-right shrink-0">
                      {e.kg.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} kg
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="p-4 rounded-xl bg-yellow-400/10 border border-yellow-400/20">
          <p className="text-xs text-yellow-400 leading-relaxed flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              Valores baseados em médias internacionais de referência (IEA, DEFRA). A emissão real varia conforme o veículo específico, ocupação, rota e outros fatores.
            </span>
          </p>
        </div>
      </div>

      <ToolContent
        toolName="Pegada de Carbono de Viagem"
        category="Lazer"
        data={{
          directAnswer: "A pegada de carbono de uma viagem é estimada multiplicando a distância percorrida pelo fator médio de emissão de CO2 por quilômetro do meio de transporte escolhido.",
          howItWorks: "Cada meio de transporte tem uma média de emissão de CO2 por quilômetro percorrido por passageiro, baseada em dados internacionais de referência (como IEA e DEFRA). A ferramenta multiplica a distância informada por esse fator para estimar a emissão total da viagem, e converte esse valor em uma equivalência prática: quantas árvores seriam necessárias, ao longo de um ano, para absorver essa quantidade de CO2 (considerando a média de 22 kg de CO2 absorvidos por árvore por ano). Trens são consistentemente o meio de transporte com menor emissão por passageiro, enquanto voos de curta distância tendem a ter a maior emissão relativa.",
          example: {
            title: "Exemplo: viagem de 500km de carro vs. trem",
            steps: [
              "Distância: 500 km",
              "De carro: 500 × 171g = 85.500g = 85,5 kg de CO2",
              "De trem: 500 × 19g = 9.500g = 9,5 kg de CO2",
              "Árvores para compensar: carro precisaria de ~3,9 árvores/ano; trem precisaria de ~0,4 árvores/ano",
            ],
            result: "Para a mesma distância, o trem emite quase 9 vezes menos CO2 que o carro nesta estimativa.",
          },
          faqs: [
            { question: "Esses valores são exatos para o meu veículo específico?", answer: "Não, são médias de referência internacionais. A emissão real varia conforme o modelo do veículo, ocupação, condições da via e outros fatores." },
            { question: "Por que o trem emite tanto menos CO2?", answer: "Trens elétricos, especialmente em países com matriz energética limpa, são muito mais eficientes energeticamente por passageiro transportado que carros ou aviões." },
            { question: "Como é calculada a equivalência em árvores?", answer: "Usamos a referência comum de que uma árvore absorve em média 22 kg de CO2 por ano ao longo de seu crescimento." },
            { question: "Essa ferramenta considera o número de passageiros no veículo?", answer: "O cálculo já é por passageiro (não por veículo), usando médias de ocupação típica de cada meio de transporte." },
          ],
        }}
      />
    </ToolLayout>
  );
}
