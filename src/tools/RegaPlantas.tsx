import React, { useState, useMemo } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { Droplets, Sun, CloudRain } from "lucide-react";

interface Props {
  onBack: () => void;
}

interface PlantType {
  id: string;
  label: string;
  baseDays: [number, number];
  tip: string;
}

const PLANT_TYPES: PlantType[] = [
  { id: "suculenta", label: "Suculenta/Cacto", baseDays: [14, 21], tip: "Deixe o solo secar completamente entre as regas." },
  { id: "samambaia", label: "Samambaia", baseDays: [2, 3], tip: "Mantenha o solo sempre úmido, sem encharcar." },
  { id: "orquidea", label: "Orquídea", baseDays: [7, 7], tip: "Regue e deixe escorrer bem o excesso." },
  { id: "folhagem", label: "Folhagem Comum (Jiboia, Costela-de-Adão)", baseDays: [5, 7], tip: "Mantenha o solo levemente úmido." },
  { id: "flor", label: "Planta com Flor", baseDays: [3, 5], tip: "Regue com regularidade durante a floração." },
];

type Season = "verao" | "inverno" | "intermediario";
type Light = "sol_direto" | "luz_indireta" | "pouca_luz";

function adjustInterval(base: [number, number], season: Season, light: Light): [number, number] {
  let [min, max] = base;
  if (season === "verao") {
    min = Math.max(1, Math.round(min * 0.7));
    max = Math.max(1, Math.round(max * 0.7));
  } else if (season === "inverno") {
    min = Math.round(min * 1.4);
    max = Math.round(max * 1.4);
  }
  if (light === "sol_direto") {
    min = Math.max(1, Math.round(min * 0.85));
    max = Math.max(1, Math.round(max * 0.85));
  } else if (light === "pouca_luz") {
    min = Math.round(min * 1.15);
    max = Math.round(max * 1.15);
  }
  return [min, max];
}

export function RegaPlantas({ onBack }: Props) {
  const [plantId, setPlantId] = useState("suculenta");
  const [season, setSeason] = useState<Season>("intermediario");
  const [light, setLight] = useState<Light>("luz_indireta");

  const plant = PLANT_TYPES.find((p) => p.id === plantId)!;

  const result = useMemo(() => {
    const adjusted = adjustInterval(plant.baseDays, season, light);
    return adjusted;
  }, [plant, season, light]);

  const formatInterval = (interval: [number, number]): string => {
    const [min, max] = interval;
    if (min === max) return `a cada ${min} dia${min > 1 ? "s" : ""}`;
    return `a cada ${min} a ${max} dias`;
  };

  return (
    <ToolLayout
      title="Rega de Plantas"
      emoji="🌱"
      category="Casa"
      description="Descubra a frequência ideal de rega para suas plantas conforme o tipo, a estação e a luz."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["regador plantas"]} label="Acessórios de jardinagem" />}
    >
      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-400 mb-1 block">Tipo de planta</label>
          <select
            value={plantId}
            onChange={(e) => setPlantId(e.target.value)}
            className="input-field"
          >
            {PLANT_TYPES.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-400 mb-2 block">Estação do ano</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "verao", label: "Verão", icon: Sun },
              { id: "intermediario", label: "Primavera/Outono", icon: CloudRain },
              { id: "inverno", label: "Inverno", icon: CloudRain },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => setSeason(s.id as Season)}
                  className={`px-2 py-2.5 rounded-xl text-xs font-medium transition-all text-center ${
                    season === s.id
                      ? "bg-green-400/15 border border-green-400/40 text-green-400"
                      : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-4 h-4 mx-auto mb-1" />
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-400 mb-2 block">Luminosidade do local</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "sol_direto", label: "Sol Direto" },
              { id: "luz_indireta", label: "Luz Indireta" },
              { id: "pouca_luz", label: "Pouca Luz" },
            ].map((l) => (
              <button
                key={l.id}
                onClick={() => setLight(l.id as Light)}
                className={`px-2 py-2.5 rounded-xl text-xs font-medium transition-all text-center ${
                  light === l.id
                    ? "bg-green-400/15 border border-green-400/40 text-green-400"
                    : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-xl bg-gradient-to-br from-green-400/10 to-emerald-400/10 border border-green-400/20">
          <div className="flex items-center gap-3 mb-2">
            <Droplets className="w-6 h-6 text-green-400" />
            <p className="text-sm font-semibold text-white">Frequência sugerida</p>
          </div>
          <p className="text-2xl font-bold text-green-400 text-center">{formatInterval(result)}</p>
        </div>

        <div className="p-4 rounded-xl bg-blue-400/5 border border-blue-400/10">
          <p className="text-xs text-blue-400 leading-relaxed">
            <strong>Dica:</strong> {plant.tip} Para conferir, enfie o dedo 2-3cm no solo — se estiver seco, é hora de regar.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-yellow-400/10 border border-yellow-400/20">
          <p className="text-xs text-yellow-400 leading-relaxed">
            <strong>Aviso:</strong> Estas são orientações gerais. Cada planta individual pode variar — observe sempre os sinais da sua planta específica (folhas murchas, solo seco, amarelamento).
          </p>
        </div>
      </div>

      <ToolContent
        toolName="Rega de Plantas"
        category="Casa"
        data={{
          directAnswer: "A frequência ideal de rega varia conforme o tipo de planta, a estação do ano e a quantidade de luz que ela recebe — suculentas precisam de rega bem espaçada, enquanto samambaias precisam de solo sempre úmido.",
          howItWorks: "Cada tipo de planta tem uma necessidade natural de água diferente: suculentas e cactos armazenam água em suas folhas e raízes, por isso toleram longos períodos sem rega; já samambaias e orquídeas preferem ambientes mais úmidos. A ferramenta ajusta essa frequência base considerando também a estação do ano (no verão, o solo seca mais rápido devido ao calor; no inverno, as plantas geralmente entram em um ritmo de crescimento mais lento e precisam de menos água) e a quantidade de luz que a planta recebe (mais luz solar direta acelera a evaporação da água do solo).",
          example: {
            title: "Exemplo: suculenta com luz indireta no verão",
            steps: [
              "Planta: Suculenta/Cacto",
              "Frequência base: a cada 14-21 dias",
              "Ajuste de verão: reduzir intervalo em ~30%",
              "Frequência final sugerida: a cada 10-14 dias",
            ],
            result: "No verão, com luz indireta, a suculenta deve ser regada a cada 10-14 dias, sempre deixando o solo secar completamente entre uma rega e outra.",
          },
          faqs: [
            { question: "Regar demais pode prejudicar a planta?", answer: "Sim, o excesso de água é uma das causas mais comuns de morte de plantas domésticas, causando apodrecimento das raízes — na dúvida, é mais seguro regar menos do que mais." },
            { question: "Como sei se minha planta precisa de água?", answer: "Enfie o dedo 2-3cm no solo — se estiver seco nessa profundidade, geralmente é hora de regar; se ainda estiver úmido, espere mais alguns dias." },
            { question: "Essas frequências servem para qualquer clima?", answer: "São orientações gerais — climas muito secos ou muito úmidos, e ambientes com ar condicionado, podem exigir ajustes adicionais na frequência." },
            { question: "Todas as suculentas têm a mesma necessidade de água?", answer: "Existe alguma variação entre espécies específicas, mas a maioria das suculentas e cactos compartilha a preferência por regas espaçadas e solo bem seco entre uma rega e outra." },
          ],
        }}
      />
    </ToolLayout>
  );
}
