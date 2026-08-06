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
        toolName="SalarioHora"
        category="Finanças"
        data={{
          directAnswer: "Com salário de R$ 2.640 (mínimo 2026) e 220h mensais, o valor/hora é R$ 12.00. Com horas extras, o valor é R$ 18.00.",
          howItWorks: "O conversor calcula o salário mensal a partir do valor-hora, considerando a jornada de trabalho. A fórmula: salário bruto = valor-hora × horas/dia × dias/semana × 4,33 semanas/mês. A ferramenta aplica a tabela do INSS vigente (alíquotas progressivas: 7,5%, 9%, 12%, 14%) e desconta o valor correspondente. Mostra 4 valores: salário bruto, INSS, salário líquido e horas/mês. A tabela do INSS é atualizada automaticamente conforme a legislação brasileira. O cálculo é aproximado e não considera dependentes, plano de saúde ou outros descontos opcionais.",
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
            { term: "Jornada de Trabalho", definition: "Horas semanais contratadas. Padrão: 44h (220h/mês), 40h (200h/mês), 36h (180h/mês)." },
            { term: "Hora Extra", definition: "Trabalho além da jornada. Valor: 50% a mais (100% em domingos/feriados)." }
          ],
          faqs: [
            { question: "Como calcular salário/hora?", answer: "A ferramenta faz o cálculo inverso: informe o valor-hora, horas/dia e dias/semana. O salário mensal é calculado automaticamente com desconto de INSS." },
            { question: "Quanto ganho por hora extra?", answer: "Hora extra = valor-hora × 1,5. Em domingos/feriados = valor-hora × 2. Ex: R$ 25/hora → extra = R$ 37,50." },
            { question: "Qual jornada de 44h semanais?", answer: "44 horas semanais = 220 horas mensais (considerando 4,33 semanas por mês). É a jornada padrão no Brasil." },
            { question: "Salário/hora inclui benefícios?", answer: "Não, a ferramenta calcula apenas o salário bruto e INSS. Benefícios (VR, VT, plano de saúde) não são descontados do INSS na ferramenta." },
            { question: "Como negociar salário por hora?", answer: "Calcule o valor-hora desejado considerando: 1) seu custo de vida; 2) horas que realmente trabalha; 3) benefícios que não terá (férias, 13º, INSS). Use a ferramenta para simular cenários." },
          ],
        }}
      />
    </ToolLayout>
  );
}
