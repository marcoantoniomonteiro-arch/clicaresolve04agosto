import React, { useState } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { CONFIG } from "../config";

interface Props { onBack: () => void; }

const CLASSIFICATIONS = [
  { max: 18.5, label: "Abaixo do Peso", color: "text-blue-400", bg: "bg-blue-400", pct: 10 },
  { max: 25, label: "Peso Normal", color: "text-green-400", bg: "bg-green-400", pct: 30 },
  { max: 30, label: "Sobrepeso", color: "text-yellow-400", bg: "bg-yellow-400", pct: 55 },
  { max: 35, label: "Obesidade Grau I", color: "text-orange-400", bg: "bg-orange-400", pct: 72 },
  { max: 40, label: "Obesidade Grau II", color: "text-red-400", bg: "bg-red-400", pct: 87 },
  { max: 999, label: "Obesidade Grau III", color: "text-red-600", bg: "bg-red-600", pct: 100 },
];

function classify(imc: number) {
  return CLASSIFICATIONS.find((c) => imc < c.max) || CLASSIFICATIONS[CLASSIFICATIONS.length - 1];
}

export function IMCAvancada({ onBack }: Props) {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [result, setResult] = useState<null | {
    imc: number; label: string; color: string; bg: string; pct: number;
    minIdeal: number; maxIdeal: number; agua: number;
  }>(null);

  function calcular() {
    const p = parseFloat(peso.replace(",", "."));
    let h = parseFloat(altura.replace(",", "."));
    if (!p || !h) return;
    if (h > 3) h = h / 100;
    const imc = p / (h * h);
    const cls = classify(imc);
    setResult({
      imc,
      label: cls.label,
      color: cls.color,
      bg: cls.bg,
      pct: cls.pct,
      minIdeal: 18.5 * h * h,
      maxIdeal: 24.9 * h * h,
      agua: Math.round(p * 35),
    });
  }

  return (
    <ToolLayout
      title="IMC Avançada"
      emoji="⚖️"
      category="Saúde"
      description="Calcule seu IMC com classificação OMS, peso ideal e hidratação recomendada."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["balanca digital", "fita metrica corporal"]} label="Monitore sua saúde" />}
      disclaimer="Esta ferramenta é puramente informativa. Não substitui consulta médica ou diagnóstico profissional. Consulte sempre um profissional de saúde habilitado."
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Peso (kg)</span>
            <input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} placeholder="Ex: 70" className="input-field" aria-label="Peso em quilogramas" />
          </label>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Altura (m ou cm)</span>
            <input type="number" value={altura} onChange={(e) => setAltura(e.target.value)} placeholder="Ex: 1.70 ou 170" className="input-field" aria-label="Altura em metros ou centímetros" />
          </label>
        </div>
        <button onClick={calcular} className="btn-primary w-full" aria-label="Calcular Índice de Massa Corporal">Calcular IMC</button>

        {result && (
          <div className="space-y-4 mt-2 resultado-principal">
            <div className="p-5 rounded-xl bg-white/5 border border-white/8 text-center" aria-label={`Seu IMC é ${result.imc.toFixed(1)}, classificado como ${result.label}`}>
              <p className="text-5xl font-black mb-1">{result.imc.toFixed(1)}</p>
              <p className={`text-lg font-bold ${result.color}`}>{result.label}</p>
            </div>

            <div aria-label="Gráfico de classificação do IMC com faixas de peso">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>10</span><span>18.5</span><span>25</span><span>30</span><span>40+</span>
              </div>
              <div className="h-3 rounded-full bg-white/10 relative overflow-hidden" role="img" aria-label={`Barra de progresso do IMC: ${result.imc.toFixed(1)} na faixa ${result.label}`}>
                <div className={`h-3 rounded-full ${result.bg} transition-all duration-700`} style={{ width: `${Math.min(result.pct, 100)}%` }} />
                <div className="absolute top-0 h-3 w-0.5 bg-white/30" style={{ left: `${Math.min((result.imc / 40) * 100, 100)}%` }} aria-label="Indicador do seu IMC na escala" />
              </div>
              <div className="flex gap-1 mt-1" role="img" aria-label="Legenda de cores: abaixo do peso (azul), normal (verde), sobrepeso (amarelo), obesidade I (laranja), obesidade II (vermelho), obesidade III (vermelho escuro)">
                {["blue-400","green-400","yellow-400","orange-400","red-400","red-600"].map((c, i) => (
                  <div key={i} className={`h-1.5 rounded-full bg-${c} flex-1`} />
                ))}
              </div>
            </div>

            <ul className="grid grid-cols-3 gap-3 list-none" aria-label="Resultados do IMC: peso mínimo ideal, peso máximo ideal e ingestão de água diária">
              <li className="bg-white/5 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-400">Peso Mínimo Ideal</p>
                <p className="text-base font-bold text-white">{result.minIdeal.toFixed(1)} kg</p>
              </li>
              <li className="bg-white/5 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-400">Peso Máximo Ideal</p>
                <p className="text-base font-bold text-white">{result.maxIdeal.toFixed(1)} kg</p>
              </li>
              <li className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 text-center">
                <p className="text-xs text-blue-400">Água/dia</p>
                <p className="text-base font-bold text-blue-400">{(result.agua / 1000).toFixed(1)} L</p>
              </li>
            </ul>
          </div>
        )}
      </div>
      <ToolContent
        toolName="IMC"
        category="Saúde"
        data={{
          directAnswer: "O IMC (Índice de Massa Corporal) é calculado dividindo o peso em quilogramas pela altura em metros ao quadrado. Uma pessoa com 70 kg e 1,75 m de altura tem IMC de 22.9, que é classificado como 'peso normal' segundo a OMS.",
          howItWorks: "O IMC Avançada calcula seu Índice de Massa Corporal usando a fórmula padrão da Organização Mundial da Saúde (OMS): IMC = peso (kg) / altura² (m). A ferramenta vai além do cálculo simples: determina sua classificação (abaixo do peso, normal, sobrepeso, obesidade I, II, III), calcula o peso mínimo e máximo ideal para sua altura, e estima a ingestão diária recomendada de água. A classificação segue os parâmetros da OMS (1997): <18.5 = abaixo do peso, 18.5-24.9 = normal, 25-29.9 = sobrepeso, 30-34.9 = obesidade I, 35-39.9 = obesidade II, ≥40 = obesidade III. A meta de água é calculada como 35ml/kg de peso. A faixa de peso ideal usa a inversa da fórmula: peso mínimo = 18.5 × altura² e peso máximo = 24.9 × altura². Essa ferramenta é informativa e não substitui avaliação médica.",
          example: {
            title: "Exemplo: Maria, 28 anos, 70 kg, 1.75 m",
            steps: [
              "Peso: 70 kg / Altura: 1.75 m",
              "IMC = 70 / (1.75 × 1.75) = 70 / 3.06 = 22.9",
              "Classificação: peso normal (18.5-24.9)",
              "Peso mínimo ideal: 18.5 × 3.06 = 56.6 kg",
              "Peso máximo ideal: 24.9 × 3.06 = 76.2 kg",
              "Meta de água: 35 × 70 = 2.450 ml (2.45 L por dia)",
            ],
            result: "Maria está na faixa de peso ideal com IMC 22.9. Seu peso ideal varia entre 56.6 kg e 76.2 kg. Deve consumir 2.45 L de água por dia.",
          },
          attribution: {
            fonte: "Organização Mundial da Saúde (OMS)",
            data: CONFIG.dataRevisãoSaúde,
          },
          faqs: [
            { question: "O que é IMC?", answer: "IMC é o Índice de Massa Corporal, um indicador de peso em relação à altura. É calculado dividindo o peso em kg pela altura ao quadrado em metros. Serve como screening populacional, mas não considera composição corporal (massa muscular vs. gordura)." },
            { question: "IMC é confiável?", answer: "O IMC é um indicador de uso populacional reconhecido pela OMS. No entanto, não considera massa muscular, idade, sexo, etnia ou composição corporal. Atletas e idosos podem ter classificação imprecisa. Sempre consulte um médico para avaliação completa." },
            { question: "Qual o IMC ideal para mulher?", answer: "Para mulheres adultas, o IMC ideal é entre 18.5 e 24.9. Durante a gravidez, o IMC não é usado como indicador de peso saudável. A OMS recomenda que as grávidas sigam acompanhamento médico." },
            { question: "Qual o IMC ideal para homem?", answer: "Para homens adultos, o IMC ideal também é entre 18.5 e 24.9. A OMS usa a mesma classificação para ambos os sexos, embora alguns estudos sugiram ajustes por sexo e idade." },
            { question: "Como baixar o IMC?", answer: "Para baixar o IMC, é necessário reduzir o peso corporal através de dieta equilibrada, atividade física regular e hábitos saudáveis. A meta é atingir o peso ideal calculado pela ferramenta (entre 18.5 e 24.9). Consulte um médico antes de iniciar qualquer programa de emagrecimento." },
            { question: "O IMC pode estar errado?", answer: "Sim, o IMC pode ser impreciso para atletas (massa muscular elevada), idosos (perda de massa muscular), gestantes e crianças. Para avaliação individual, é necessário medidas complementares como circunferência abdominal, percentual de gordura e exames clínicos." },
          ],
        }}
      />
    </ToolLayout>
  );
}
