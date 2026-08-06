import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import React, { useState, useMemo } from "react";


import { Calendar, Clock } from "lucide-react";

interface Props {
  onBack: () => void;
}

export function DiferencaDatas({ onBack }: Props) {
  const [data1, setData1] = useState("");
  const [data2, setData2] = useState("");
  const [modo, setModo] = useState<"diferenca" | "idade">("diferenca");

  const resultado = useMemo(() => {
    if (!data1 || !data2) return null;

    const d1 = new Date(data1 + "T12:00:00");
    const d2 = new Date(data2 + "T12:00:00");

    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return null;

    const inicio = d1 < d2 ? d1 : d2;
    const fim = d1 < d2 ? d2 : d1;

    const diffMs = fim.getTime() - inicio.getTime();
    const diasTotal = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const semanas = Math.floor(diasTotal / 7);
    const horasTotal = diasTotal * 24;
    const minutosTotal = horasTotal * 60;

    // Calcular anos, meses e dias
    let anos = fim.getFullYear() - inicio.getFullYear();
    let meses = fim.getMonth() - inicio.getMonth();
    let dias = fim.getDate() - inicio.getDate();

    if (dias < 0) {
      meses--;
      const mesAnterior = new Date(fim.getFullYear(), fim.getMonth(), 0);
      dias += mesAnterior.getDate();
    }

    if (meses < 0) {
      anos--;
      meses += 12;
    }

    return {
      anos,
      meses,
      dias,
      diasTotal,
      semanas,
      horasTotal,
      minutosTotal,
      inicio,
      fim,
    };
  }, [data1, data2]);

  return (
    <ToolLayout
      title="Diferenca entre Datas"
      emoji="📅"
      category="Utilidades"
      description="Calcule a diferenca entre duas datas em anos, meses, dias e mais."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["agenda planner anual"]} label="agenda planner anual" />}
    
      disclaimer="Calculo matematico. Nao inclui adicionais de Convencoes Coletivas (CCT)."
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setModo("diferenca")}
            className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
              modo === "diferenca"
                ? "bg-green-500/20 border-green-500/40 text-green-400"
                : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
            }`}
          >
            Diferenca
          </button>
          <button
            onClick={() => setModo("idade")}
            className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
              modo === "idade"
                ? "bg-blue-500/20 border-blue-500/40 text-blue-400"
                : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
            }`}
          >
            Idade Exata
          </button>
        </div>

        {modo === "diferenca" ? (
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm text-gray-400 mb-1 block">Data 1</span>
              <input
                type="date"
                value={data1}
                onChange={(e) => setData1(e.target.value)}
                className="input-field"
              />
            </label>
            <label className="block">
              <span className="text-sm text-gray-400 mb-1 block">Data 2</span>
              <input
                type="date"
                value={data2}
                onChange={(e) => setData2(e.target.value)}
                className="input-field"
              />
            </label>
          </div>
        ) : (
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Data de Nascimento</span>
            <input
              type="date"
              value={data1}
              onChange={(e) => setData1(e.target.value)}
              className="input-field"
            />
          </label>
        )}

        {modo === "idade" && data1 && (
          <p className="text-xs text-gray-500 text-center">
            Calculando ate hoje ({new Date().toLocaleDateString("pt-BR")})
          </p>
        )}

        {resultado && (
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
              {modo === "idade" ? (
                <>
                  <p className="text-xs text-green-400 mb-1">Sua Idade</p>
                  <p className="text-3xl font-black text-green-400">
                    {resultado.anos} anos
                  </p>
                  <p className="text-sm text-white mt-1">
                    {resultado.meses} meses e {resultado.dias} dias
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xs text-green-400 mb-1">Diferenca</p>
                  <p className="text-3xl font-black text-green-400">
                    {resultado.anos}a {resultado.meses}m {resultado.dias}d
                  </p>
                </>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-white/5 text-center">
                <Calendar className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                <p className="text-xs text-gray-400">Dias Total</p>
                <p className="text-lg font-bold text-white">{resultado.diasTotal.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 text-center">
                <p className="text-xs text-gray-400 mt-2">Semanas</p>
                <p className="text-lg font-bold text-white">{resultado.semanas.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 text-center">
                <Clock className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                <p className="text-xs text-gray-400">Horas</p>
                <p className="text-lg font-bold text-white">{resultado.horasTotal.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 text-center">
                <p className="text-xs text-gray-400 mt-2">Minutos</p>
                <p className="text-lg font-bold text-white">{resultado.minutosTotal.toLocaleString()}</p>
              </div>
            </div>

            {modo === "diferenca" && (
              <div className="p-3 rounded-lg bg-white/5 text-xs text-gray-400 text-center">
                De {resultado.inicio.toLocaleDateString("pt-BR")} ate {resultado.fim.toLocaleDateString("pt-BR")}
              </div>
            )}
          </div>
        )}
      </div>
      <ToolContent
        toolName="Diferença entre Datas"
        category="Utilidades"
        data={{
          directAnswer: "A diferença entre datas é calculada contando o número de dias corridos entre a data inicial e a data final, convertendo esse total em anos, meses, semanas e dias completos.",
          howItWorks: "A calculadora subtrai a data inicial da data final e retorna o total de dias corridos entre elas. Esse total é decomposto em anos, meses e dias completos, considerando o número real de dias de cada mês e anos bissextos. Também exibe o total em semanas, útil para contratos, prazos legais e planejamento de eventos.",
          example: {
            title: "Exemplo: de 15/03/2026 até 22/11/2026",
            steps: [
              "Data inicial: 15/03/2026",
              "Data final: 22/11/2026",
              "Total de dias corridos: 252 dias",
              "Em semanas: 36 semanas",
              "Decomposição: 8 meses e 7 dias",
            ],
            result: "Entre as duas datas há 252 dias, equivalente a 8 meses e 7 dias.",
          },
          faqs: [
            { question: "Como calcular a diferença entre duas datas?", answer: "Basta subtrair o número de dias entre a data inicial e a final, considerando o calendário real. A ferramenta faz isso automaticamente." },
            { question: "A ferramenta conta o dia inicial e o final juntos?", answer: "Calcula os dias corridos entre as datas, sem contar duas vezes o dia inicial." },
            { question: "Posso calcular datas futuras?", answer: "Sim, funciona tanto para prazos futuros quanto períodos passados." },
            { question: "A ferramenta considera anos bissextos?", answer: "Sim, o cálculo usa o calendário real, incluindo fevereiro com 29 dias em anos bissextos." },
          ],
        }}
      />
    </ToolLayout>
  );
}
