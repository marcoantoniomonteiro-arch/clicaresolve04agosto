import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import React, { useState, useMemo } from "react";


import { ToolContent } from "../components/ToolContent";
import { CONFIG } from "../config";

interface Props {
  onBack: () => void;
}

const INSS_RATES = [
  { limit: 1412, rate: 0.075, deduction: 0 },
  { limit: 2666.68, rate: 0.09, deduction: 21.18 },
  { limit: 4000.03, rate: 0.12, deduction: 101.18 },
  { limit: 7786.02, rate: 0.14, deduction: 181.18 },
];

export function SalarioHora({ onBack }: Props) {
  const [valorHora, setValorHora] = useState("");
  const [horasDia, setHorasDia] = useState("8");
  const [diasSemana, setDiasSemana] = useState("5");

  const result = useMemo(() => {
    const hora = parseFloat(valorHora.replace(",", ".")) || 0;
    const hDia = parseInt(horasDia) || 8;
    const dSemana = parseInt(diasSemana) || 5;

    const horasMes = hDia * dSemana * 4.33;
    const bruto = hora * horasMes;

    let inss = 0;
    for (let i = INSS_RATES.length - 1; i >= 0; i--) {
      if (bruto <= INSS_RATES[i].limit) {
        inss = bruto * INSS_RATES[i].rate - INSS_RATES[i].deduction;
        break;
      } else if (i === INSS_RATES.length - 1 && bruto > INSS_RATES[i].limit) {
        inss = INSS_RATES[i].limit * INSS_RATES[i].rate - INSS_RATES[i].deduction;
      }
    }
    inss = Math.max(0, inss);

    const liquido = bruto - inss;

    return { hora, horasMes, bruto, inss, liquido, hDia, dSemana };
  }, [valorHora, horasDia, diasSemana]);

  return (
    <ToolLayout
      title="Conversor Salario Hora/Mensal"
      emoji="💼"
      category="DP/RH"
      description="Calcule o salario mensal a partir do valor por hora."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["livro CLT comentada"]} label="livro CLT comentada" />}
    
      disclaimer="Valores aproximados. O calculo do INSS segue a tabela oficial e nao considera dependentes ou outras deducoes."
    >
      <div className="space-y-5">
        <div className="grid grid-cols-3 gap-3">
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">R$/hora</span>
            <input
              type="number"
              value={valorHora}
              onChange={(e) => setValorHora(e.target.value)}
              placeholder="25.00"
              className="input-field"
            />
          </label>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Horas/dia</span>
            <input
              type="number"
              value={horasDia}
              onChange={(e) => setHorasDia(e.target.value)}
              className="input-field"
            />
          </label>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Dias/semana</span>
            <input
              type="number"
              value={diasSemana}
              onChange={(e) => setDiasSemana(e.target.value)}
              className="input-field"
            />
          </label>
        </div>

        {result.hora > 0 && (
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
              <p className="text-xs text-green-400 mb-1">Salario Liquido Estimado</p>
              <p className="text-4xl font-black text-green-400">
                R$ {result.liquido.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-white/5 text-center">
                <p className="text-xs text-gray-400">Horas/Mes</p>
                <p className="text-lg font-bold text-white">{result.horasMes.toFixed(0)}</p>
              </div>
              <div className="p-4 rounded-xl bg-white/5 text-center">
                <p className="text-xs text-gray-400">Bruto</p>
                <p className="text-lg font-bold text-white">
                  R$ {result.bruto.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-center">
                <p className="text-xs text-red-400">INSS</p>
                <p className="text-lg font-bold text-red-400">
                  R$ {result.inss.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-white/5 text-xs text-gray-400">
              <p>
                Considerando: {result.hDia}h/dia x {result.dSemana} dias/semana = {result.horasMes.toFixed(0)} horas/mes
              </p>
            </div>
          </div>
        )}
      </div>
      <ToolContent
        toolName="Salário por Hora"
        category="Finanças"
        data={{
          directAnswer: "Com salário mínimo de R$ 2.640 (2026) e jornada de 220h mensais, o valor da hora trabalhada é de R$ 12,00. Considerando hora extra com adicional de 50%, o valor sobe para R$ 18,00.",
          howItWorks: "O conversor calcula o salário mensal a partir do valor-hora informado, considerando a jornada de trabalho escolhida. A fórmula usada é: salário bruto = valor-hora × horas por dia × dias por semana × 4,33 (média de semanas por mês). Em seguida, a ferramenta aplica a tabela vigente do INSS — que tem alíquotas progressivas de 7,5%, 9%, 12% e 14% conforme a faixa salarial — e desconta o valor correspondente para chegar ao salário líquido. O resultado mostra quatro números: salário bruto, desconto de INSS, salário líquido e o total de horas trabalhadas no mês. Vale lembrar que o cálculo é uma aproximação e não considera outros descontos possíveis, como imposto de renda, plano de saúde ou pensão alimentícia.",
          example: {
            title: "Exemplo: R$ 25/hora, 8h/dia, 5 dias/semana",
            steps: [
              "Informe o valor-hora: R$ 25,00",
              "Informe horas/dia: 8 e dias/semana: 5",
              "Calcula horas/mês: 8 × 5 × 4,33 = 173,3 horas",
              "Salário bruto: 25 × 173,3 = R$ 4.332,50",
              "Desconta INSS (alíquota 12% − dedução): R$ 398,71 → líquido: R$ 3.933,79"
            ],
            result: "Bruto: R$ 4.332,50; INSS: R$ 398,71; Líquido: R$ 3.933,79; 173 horas/mês",
          },
          glossary: [
            { term: "Jornada de Trabalho", definition: "Total de horas semanais contratadas. As mais comuns no Brasil são 44h semanais (220h/mês), 40h (200h/mês) e 36h (180h/mês)." },
            { term: "Hora Extra", definition: "Trabalho realizado além da jornada normal contratada. Por lei, deve ser remunerada com adicional mínimo de 50% em dias normais, e 100% em domingos e feriados, salvo acordo/convenção coletiva mais vantajoso." }
          ],
          faqs: [
            { question: "Como faço para calcular meu salário a partir do valor-hora?", answer: "A ferramenta faz o cálculo inverso: você informa o valor que quer ganhar por hora, mais as horas por dia e dias por semana que pretende trabalhar, e ela calcula o salário mensal correspondente, já com o desconto de INSS." },
            { question: "Quanto vale minha hora extra?", answer: "A hora extra em dias normais equivale ao valor-hora multiplicado por 1,5 (adicional de 50%). Em domingos e feriados, multiplica-se por 2 (adicional de 100%). Exemplo: valor-hora de R$ 25 → hora extra normal de R$ 37,50." },
            { question: "Por que a jornada de 44h semanais equivale a 220h por mês?", answer: "Porque o mês tem em média 4,33 semanas (52 semanas ÷ 12 meses). Multiplicando 44 horas semanais por 4,33, chega-se a aproximadamente 220 horas mensais — essa é a jornada padrão mais comum no Brasil." },
            { question: "O valor calculado já inclui vale-refeição, vale-transporte ou plano de saúde?", answer: "Não. A ferramenta calcula apenas o salário bruto e o desconto de INSS. Benefícios como VR, VT e plano de saúde não entram nesse cálculo, pois variam de empresa para empresa." },
            { question: "Como usar essa ferramenta para negociar um salário como freelancer ou PJ?", answer: "Ao definir seu valor-hora, considere não só o salário desejado, mas também seu custo de vida, as horas que realmente vai trabalhar (descontando período sem contrato) e benefícios que você não terá automaticamente, como férias remuneradas, 13º salário e recolhimento de INSS." },
          ],
        }}
      />
    </ToolLayout>
  );
}
