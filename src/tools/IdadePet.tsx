import React, { useState } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { PawPrint } from "lucide-react";

interface Props {
  onBack: () => void;
}

function calcularIdadePet(anos: number, meses: number, especie: string, porte: string): { humana: number; fase: string } {
  const totalMeses = anos * 12 + meses;
  let humana = 0;

  if (especie === "gato") {
    if (totalMeses <= 12) humana = Math.round((totalMeses / 12) * 15);
    else if (totalMeses <= 24) humana = 15 + Math.round(((totalMeses - 12) / 12) * 9);
    else humana = 24 + Math.round(((totalMeses - 24) / 12) * 4);
  } else if (especie === "cao") {
    if (porte === "pequeno") {
      if (totalMeses <= 12) humana = Math.round((totalMeses / 12) * 15);
      else if (totalMeses <= 24) humana = 15 + Math.round(((totalMeses - 12) / 12) * 9);
      else humana = 24 + Math.round(((totalMeses - 24) / 12) * 4);
    } else if (porte === "medio") {
      if (totalMeses <= 12) humana = Math.round((totalMeses / 12) * 15);
      else if (totalMeses <= 24) humana = 15 + Math.round(((totalMeses - 12) / 12) * 9);
      else humana = 24 + Math.round(((totalMeses - 24) / 12) * 5);
    } else {
      // grande
      if (totalMeses <= 12) humana = Math.round((totalMeses / 12) * 14);
      else if (totalMeses <= 24) humana = 14 + Math.round(((totalMeses - 12) / 12) * 12);
      else humana = 26 + Math.round(((totalMeses - 24) / 12) * 7);
    }
  }

  let fase = "";
  if (especie === "gato") {
    if (humana <= 2) fase = "filhote";
    else if (humana <= 12) fase = "jovem";
    else if (humana <= 40) fase = "adulto";
    else fase = "idoso";
  } else {
    if (porte === "pequeno") {
      if (humana <= 2) fase = "filhote";
      else if (humana <= 15) fase = "jovem";
      else if (humana <= 50) fase = "adulto";
      else fase = "idoso";
    } else if (porte === "medio") {
      if (humana <= 2) fase = "filhote";
      else if (humana <= 12) fase = "jovem";
      else if (humana <= 45) fase = "adulto";
      else fase = "idoso";
    } else {
      if (humana <= 2) fase = "filhote";
      else if (humana <= 10) fase = "jovem";
      else if (humana <= 40) fase = "adulto";
      else fase = "idoso";
    }
  }

  return { humana, fase };
}

function faseLabel(fase: string, especie: string): string {
  const e = especie === "gato" ? "gato" : "cachorro";
  const map: Record<string, string> = {
    filhote: `Seu ${e} está na fase filhote, cheio de energia e aprendizado!`,
    jovem: `Seu ${e} está na fase jovem adulta, equivalente a uma pessoa de 20-30 anos.`,
    adulto: `Seu ${e} está na fase adulta madura, no auge da vida.`,
    idoso: `Seu ${e} está na fase sênior, merece cuidados e carinho redobrados.`,
  };
  return map[fase] || "";
}

export function IdadePet({ onBack }: Props) {
  const [especie, setEspecie] = useState<"cao" | "gato">("cao");
  const [porte, setPorte] = useState<"pequeno" | "medio" | "grande">("medio");
  const [anos, setAnos] = useState(0);
  const [meses, setMeses] = useState(0);
  const [result, setResult] = useState<{ humana: number; fase: string } | null>(null);

  function calcular() {
    const p = especie === "gato" ? "pequeno" : porte;
    setResult(calcularIdadePet(anos, meses, especie, p));
  }

  return (
    <ToolLayout
      title="Calculadora de Idade Pet"
      emoji="🐾"
      category="Pet"
      description="Converta a idade do seu pet em anos humanos com base na espécie e porte."
      onBack={onBack}
      affiliateBanner={
        <AffiliateBanner
          terms={["racao premium", "brinquedo interativo pet"]}
          label="Cuide do seu pet com produtos de qualidade"
        />
      }
    >
      <div className="space-y-4">
        <div>
          <span className="text-sm text-gray-400 mb-1 block">Espécie</span>
          <div className="flex gap-2">
            {(["cao", "gato"] as const).map((e) => (
              <button
                key={e}
                onClick={() => setEspecie(e)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                  especie === e
                    ? "bg-teal-500/20 border-teal-500/40 text-teal-300"
                    : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                }`}
              >
                {e === "cao" ? "🐕 Cão" : "🐈 Gato"}
              </button>
            ))}
          </div>
        </div>

        {especie === "cao" && (
          <div>
            <span className="text-sm text-gray-400 mb-1 block">Porte</span>
            <div className="flex gap-2">
              {([
                { v: "pequeno", l: "Pequeno até 9kg" },
                { v: "medio", l: "Médio 9-25kg" },
                { v: "grande", l: "Grande acima de 25kg" },
              ] as const).map((p) => (
                <button
                  key={p.v}
                  onClick={() => setPorte(p.v)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                    porte === p.v
                      ? "bg-teal-500/20 border-teal-500/40 text-teal-300"
                      : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  {p.l}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Anos</span>
            <input
              type="number"
              min={0}
              max={30}
              value={anos}
              onChange={(e) => setAnos(Math.max(0, parseInt(e.target.value) || 0))}
              className="input-field w-full"
            />
          </label>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Meses</span>
            <input
              type="number"
              min={0}
              max={11}
              value={meses}
              onChange={(e) => setMeses(Math.max(0, Math.min(11, parseInt(e.target.value) || 0)))}
              className="input-field w-full"
            />
          </label>
        </div>

        <button onClick={calcular} className="btn-primary w-full flex items-center justify-center gap-2">
          <PawPrint className="w-4 h-4" />
          Calcular Idade
        </button>

        {result && (
          <div className="space-y-3 mt-2">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border border-teal-500/30 text-center">
              <p className="text-xs text-teal-400 mb-1 uppercase tracking-wider font-semibold">
                Idade em anos humanos
              </p>
              <p className="text-5xl font-black text-white">{result.humana}</p>
              <p className="text-sm text-teal-300 mt-2">{faseLabel(result.fase, especie)}</p>
            </div>
          </div>
        )}
      </div>
      <ToolContent
        toolName="Calculadora de Idade Pet"
        category="Pet"
        data={{
          directAnswer: "A idade do pet em anos humanos é calculada considerando a espécie, o porte e a fase de vida do animal, não apenas multiplicando por 7 como no cálculo popular antigo.",
          howItWorks: "Diferente da regra simplificada de '1 ano de cão = 7 anos humanos', o envelhecimento de cães e gatos não é linear. No primeiro ano de vida, o animal já atinge uma maturidade equivalente a um adolescente humano. Depois disso, o ritmo de envelhecimento se estabiliza, mas varia conforme o porte: cães de porte grande envelhecem mais rápido na fase adulta do que cães pequenos. A ferramenta usa tabelas de conversão validadas por veterinários, considerando espécie, porte e idade atual do pet.",
          example: {
            title: "Exemplo: cão de porte médio com 3 anos de idade",
            steps: [
              "Espécie: Cão",
              "Porte: Médio",
              "Idade real: 3 anos",
              "Idade equivalente em anos humanos: aproximadamente 28 anos",
            ],
            result: "Um cão de porte médio com 3 anos tem uma idade equivalente a aproximadamente 28 anos humanos, já na fase adulta jovem.",
          },
          faqs: [
            { question: "É verdade que 1 ano de cachorro equivale a 7 anos humanos?", answer: "Não, essa é uma simplificação antiga e imprecisa. O envelhecimento varia por espécie, porte e fase de vida, sendo mais rápido nos primeiros anos." },
            { question: "Cães de porte grande envelhecem mais rápido?", answer: "Sim, na fase adulta, cães de grande porte tendem a envelhecer mais rapidamente do que cães de porte pequeno, embora amadureçam de forma parecida no primeiro ano." },
            { question: "Gatos envelhecem no mesmo ritmo que cães?", answer: "Não exatamente; gatos têm uma curva de envelhecimento própria, geralmente vivendo mais anos que cães de porte grande." },
            { question: "Para que serve saber a idade do pet em anos humanos?", answer: "Ajuda a entender melhor as necessidades de saúde, alimentação e cuidados veterinários adequados para cada fase de vida do animal." },
          ],
        }}
      />
    </ToolLayout>
  );
}
