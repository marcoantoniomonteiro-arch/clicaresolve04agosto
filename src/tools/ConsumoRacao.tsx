import React, { useState } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { Bone } from "lucide-react";

interface Props {
  onBack: () => void;
}

const ATIVIDADE_MULTIPLICADOR: Record<string, number> = {
  baixo: 0.9,
  moderado: 1.0,
  alto: 1.15,
};

const FASE_PCT: Record<string, Record<string, number>> = {
  cao: {
    filhote: 6.0,
    adulto: 2.5,
    idoso: 2.0,
  },
  gato: {
    filhote: 5.0,
    adulto: 3.0,
    idoso: 2.0,
  },
};

function calcularConsumo(especie: string, peso: number, atividade: string, fase: string): { gramas: number; refeicoes: number } {
  const base = (peso * FASE_PCT[especie][fase]) / 100;
  const gramas = Math.round(base * 1000 * ATIVIDADE_MULTIPLICADOR[atividade]);
  const refeicoes = fase === "filhote" ? 4 : 2;
  return { gramas, refeicoes };
}

export function ConsumoRacao({ onBack }: Props) {
  const [especie, setEspecie] = useState<"cao" | "gato">("cao");
  const [peso, setPeso] = useState(5);
  const [atividade, setAtividade] = useState<"baixo" | "moderado" | "alto">("moderado");
  const [fase, setFase] = useState<"filhote" | "adulto" | "idoso">("adulto");
  const [result, setResult] = useState<{ gramas: number; refeicoes: number } | null>(null);

  function calcular() {
    setResult(calcularConsumo(especie, peso, atividade, fase));
  }

  return (
    <ToolLayout
      title="Consumo de Ração Diária"
      emoji="🍖"
      category="Pet"
      description="Calcule a quantidade ideal de ração diária para seu pet."
      onBack={onBack}
      affiliateBanner={
        <AffiliateBanner
          terms={["racao para caes", "comedouro automatico"]}
          label="Produtos para alimentação do seu pet"
          mercadoLivreTerms={["comedouro automático pet"]} mercadoLivreLabel="Encontre no Mercado Livre"
          shopeeTerms={["comedouro automático pet"]} shopeeLabel="Ver na Shopee"
        />
      }
      disclaimer="Esta ferramenta é apenas uma estimativa. Consulte sempre as instruções da embalagem da ração específica e um médico-veterinário."
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

        <div>
          <span className="text-sm text-gray-400 mb-1 block">Fase de vida</span>
          <div className="flex gap-2">
            {(["filhote", "adulto", "idoso"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFase(f)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all capitalize ${
                  fase === f
                    ? "bg-teal-500/20 border-teal-500/40 text-teal-300"
                    : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="text-sm text-gray-400 mb-1 block">Nível de atividade</span>
          <div className="flex gap-2">
            {([
              { v: "baixo", l: "Baixo" },
              { v: "moderado", l: "Moderado" },
              { v: "alto", l: "Alto" },
            ] as const).map((a) => (
              <button
                key={a.v}
                onClick={() => setAtividade(a.v)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                  atividade === a.v
                    ? "bg-teal-500/20 border-teal-500/40 text-teal-300"
                    : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
                }`}
              >
                {a.l}
              </button>
            ))}
          </div>
        </div>

        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Peso do pet (kg)</span>
          <input
            type="number"
            min={0.1}
            step={0.1}
            value={peso}
            onChange={(e) => setPeso(Math.max(0.1, parseFloat(e.target.value) || 0))}
            className="input-field w-full"
          />
        </label>

        <button onClick={calcular} className="btn-primary w-full flex items-center justify-center gap-2">
          <Bone className="w-4 h-4" />
          Calcular Consumo
        </button>

        {result && (
          <div className="space-y-3 mt-2">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-center">
              <p className="text-xs text-amber-400 mb-1 uppercase tracking-wider font-semibold">
                Ração recomendada por dia
              </p>
              <p className="text-5xl font-black text-white">{result.gramas} <span className="text-2xl">g</span></p>
              <p className="text-sm text-amber-300 mt-2">
                Dividir em {result.refeicoes}x refeições ao dia
                {fase === "filhote" ? " (filhotes precisam de mais refeições)" : ""}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-gray-400 mb-2 font-semibold uppercase tracking-wider">Como dividir:</p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Por refeição</span>
                  <span className="text-sm font-semibold text-white">
                    {Math.round(result.gramas / result.refeicoes)} g
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Por semana</span>
                  <span className="text-sm font-semibold text-white">
                    {result.gramas * 7} g
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Por mês</span>
                  <span className="text-sm font-semibold text-white">
                    {result.gramas * 30} g
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <ToolContent
        toolName="Consumo de Ração Diária"
        category="Pet"
        data={{
          directAnswer: "A quantidade diária de ração é calculada com base no peso do pet, na fase de vida e no nível de atividade, seguindo as recomendações do fabricante da ração.",
          howItWorks: "A ferramenta estima a porção diária ideal de ração considerando o peso atual do pet, se ele é filhote, adulto ou idoso, e seu nível de atividade física (sedentário, moderado ou muito ativo). Esses fatores influenciam diretamente a necessidade calórica diária do animal. É sempre recomendado ajustar a porção com base na tabela específica da embalagem da ração utilizada, já que a densidade calórica varia entre marcas.",
          example: {
            title: "Exemplo: cão adulto de 15kg, nível de atividade moderado",
            steps: [
              "Peso do pet: 15 kg",
              "Fase de vida: Adulto",
              "Nível de atividade: Moderado",
              "Porção diária estimada: aproximadamente 220g de ração seca",
            ],
            result: "Um cão adulto de 15kg com atividade moderada precisa de cerca de 220g de ração por dia, divididos em 2 refeições.",
          },
          faqs: [
            { question: "A quantidade de ração é a mesma para todas as marcas?", answer: "Não, cada ração tem densidade calórica diferente. Sempre consulte a tabela específica da embalagem do produto usado." },
            { question: "Filhotes comem mais que cães adultos?", answer: "Proporcionalmente ao peso, sim — filhotes têm necessidade calórica maior por estarem em fase de crescimento." },
            { question: "Como saber se meu pet está com o peso ideal?", answer: "O veterinário pode avaliar através de exame físico e, se necessário, ajustar a quantidade de ração recomendada." },
            { question: "Devo dividir a ração em quantas refeições por dia?", answer: "Geralmente recomenda-se 2 refeições diárias para cães e gatos adultos, mas filhotes podem precisar de 3 a 4 refeições menores." },
          ],
        }}
      />
    </ToolLayout>
  );
}
