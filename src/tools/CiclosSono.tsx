import React, { useState } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";

interface Props { onBack: () => void; }

const CYCLE = 90; // minutes
const SLEEP_LATENCY = 15; // minutes

function fmtHM(date: Date) {
  return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

function addMin(date: Date, min: number) {
  return new Date(date.getTime() + min * 60000);
}

function subMin(date: Date, min: number) {
  return new Date(date.getTime() - min * 60000);
}

export function CiclosSono({ onBack }: Props) {
  const [modo, setModo] = useState<"acordar" | "dormir">("acordar");
  const [hora, setHora] = useState("");
  const [result, setResult] = useState<null | { opcoes: { hora: Date; ciclos: number }[] }>(null);

  function calcular() {
    if (!hora) return;
    const [h, m] = hora.split(":").map(Number);
    const ref = new Date();
    ref.setHours(h, m, 0, 0);

    const opcoes = [4, 5, 6, 7].map((ciclos) => {
      const duracao = ciclos * CYCLE + SLEEP_LATENCY;
      if (modo === "acordar") {
        return { hora: subMin(ref, duracao), ciclos };
      } else {
        return { hora: addMin(ref, duracao), ciclos };
      }
    });

    setResult({ opcoes });
  }

  return (
    <ToolLayout
      title="Ciclos de Sono"
      emoji="🌙"
      category="Saúde"
      description="Calcule os melhores horários para dormir ou acordar com base nos ciclos de 90 minutos."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["mascara de dormir", "tapa-ouvido para dormir"]} label="Durma melhor" />}
      disclaimer="Esta ferramenta é puramente informativa. Não substitui consulta médica ou diagnóstico profissional. Consulte sempre um profissional de saúde habilitado."
    >
      <div className="space-y-4">
        <div className="flex gap-3">
          {(["acordar", "dormir"] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setModo(m); setResult(null); }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                modo === m ? "border-blue-400 bg-blue-400/15 text-blue-400" : "border-white/10 text-gray-400 hover:border-white/30"
              }`}
            >
              {m === "acordar" ? "Quero acordar às..." : "Vou dormir às..."}
            </button>
          ))}
        </div>

        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">
            {modo === "acordar" ? "Horário que quer acordar" : "Horário que vai dormir"}
          </span>
          <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} className="input-field" />
        </label>

        <button onClick={calcular} className="btn-primary w-full">Calcular Ciclos</button>

        {result && (
          <div className="space-y-2 mt-2">
            <p className="text-sm text-gray-400">
              {modo === "acordar" ? "Melhores horários para dormir:" : "Você vai acordar às:"}
            </p>
            {[...result.opcoes].reverse().map((op, i) => (
              <div
                key={i}
                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                  i === 0
                    ? "border-blue-400/50 bg-blue-400/10"
                    : "border-white/8 bg-white/3"
                }`}
              >
                <div>
                  <p className={`text-xl font-black ${i === 0 ? "text-blue-400" : "text-white"}`}>
                    {fmtHM(op.hora)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {op.ciclos} ciclos × 90 min + 15 min adormecer
                  </p>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: op.ciclos }).map((_, j) => (
                    <div key={j} className={`w-2 h-6 rounded-full ${i === 0 ? "bg-blue-400" : "bg-gray-600"}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ToolContent
        toolName="Ciclos de Sono"
        category="Saúde"
        data={{
          directAnswer: "O melhor horário para dormir ou acordar é calculado em ciclos de 90 minutos, para você acordar entre ciclos e se sentir mais descansado.",
          howItWorks: "O sono acontece em ciclos de aproximadamente 90 minutos, alternando entre sono leve, profundo e REM. Acordar no meio de um ciclo (especialmente durante o sono profundo) causa a sensação de cansaço, mesmo dormindo várias horas. A ferramenta calcula os melhores horários para dormir ou acordar, sempre em múltiplos de 90 minutos, considerando também cerca de 15 minutos para pegar no sono.",
          example: {
            title: "Exemplo: preciso acordar às 7h, que horas devo dormir?",
            steps: [
              "Horário de despertar desejado: 7h00",
              "Tempo médio para pegar no sono: 15 minutos",
              "Ciclos de 90 minutos contados para trás: 5 ciclos (7h30) ou 6 ciclos (9h)",
              "Melhor horário para dormir: 23h15 (5 ciclos completos) ou 21h45 (6 ciclos completos)",
            ],
            result: "Para acordar descansado às 7h, o ideal é dormir às 23h15 (5 ciclos) ou 21h45 (6 ciclos completos).",
          },
          faqs: [
            { question: "Quanto dura um ciclo de sono?", answer: "Aproximadamente 90 minutos, passando por sono leve, profundo e REM." },
            { question: "Por que acordar no meio do ciclo é ruim?", answer: "Interrompe o sono profundo ou o REM, causando sensação de grogue e cansaço mesmo após dormir várias horas." },
            { question: "Quantos ciclos de sono são recomendados por noite?", answer: "Entre 5 e 6 ciclos completos (7h30 a 9h) é considerado ideal para a maioria dos adultos." },
            { question: "O tempo para pegar no sono varia de pessoa para pessoa?", answer: "Sim, a média de 15 minutos é uma referência, mas pode variar bastante individualmente." },
          ],
        }}
      />
    </ToolLayout>
  );
}
