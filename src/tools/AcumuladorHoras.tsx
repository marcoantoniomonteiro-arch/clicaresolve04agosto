import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import React, { useState, useMemo, useCallback } from "react";


import { Plus, Trash2, Clock, TrendingUp, TrendingDown } from "lucide-react";

interface Props {
  onBack: () => void;
}

interface Registro {
  id: number;
  entrada: string;
  saida: string;
}

export function AcumuladorHoras({ onBack }: Props) {
  const [registros, setRegistros] = useState<Registro[]>([
    { id: 1, entrada: "08:00", saida: "12:00" },
    { id: 2, entrada: "13:00", saida: "17:00" },
  ]);
  const [jornada, setJornada] = useState<4 | 6 | 8>(8);

  const addRegistro = useCallback(() => {
    if (registros.length >= 14) return;
    setRegistros((prev) => [
      ...prev,
      { id: Date.now(), entrada: "00:00", saida: "00:00" },
    ]);
  }, [registros.length]);

  const removeRegistro = useCallback((id: number) => {
    if (registros.length <= 1) return;
    setRegistros((prev) => prev.filter((r) => r.id !== id));
  }, [registros.length]);

  const updateRegistro = useCallback((id: number, field: "entrada" | "saida", value: string) => {
    setRegistros((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r))
    );
  }, []);

  const calcularMinutos = (hora: string): number => {
    const [h, m] = hora.split(":").map(Number);
    return h * 60 + m;
  };

  const resultado = useMemo(() => {
    let minutosTotal = 0;

    registros.forEach((r) => {
      const entradaMin = calcularMinutos(r.entrada);
      let saidaMin = calcularMinutos(r.saida);

      // Se saída menor que entrada, assume que passou meia-noite
      if (saidaMin < entradaMin) {
        saidaMin += 24 * 60;
      }

      minutosTotal += saidaMin - entradaMin;
    });

    const jornadaMin = jornada * 60;
    const saldoMin = minutosTotal - jornadaMin;

    const formatarHoras = (min: number): string => {
      const h = Math.floor(Math.abs(min) / 60);
      const m = Math.abs(min) % 60;
      return `${h}h${m.toString().padStart(2, "0")}min`;
    };

    return {
      minutosTotal,
      horasTrabalhadas: formatarHoras(minutosTotal),
      jornada: formatarHoras(jornadaMin),
      saldoMin,
      saldo: formatarHoras(Math.abs(saldoMin)),
      saldoPositivo: saldoMin >= 0,
    };
  }, [registros, jornada]);

  return (
    <ToolLayout
      title="Acumulador de Horas"
      emoji="⏰"
      category="DP/RH"
      description="Calcule horas trabalhadas e compare com a jornada contratada."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["relógio de ponto digital"]} label="relógio de ponto digital" />}
    
      disclaimer="Calculo matematico. Nao inclui adicionais de Convencoes Coletivas (CCT)."
    >
      <div className="space-y-5">
        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Jornada Contratada</span>
          <div className="flex gap-2">
            {[4, 6, 8].map((h) => (
              <button
                key={h}
                onClick={() => setJornada(h as any)}
                className={`flex-1 p-2 rounded-lg text-sm font-semibold transition-all ${
                  jornada === h
                    ? "bg-green-500 text-black"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                {h}h
              </button>
            ))}
          </div>
        </label>

        <div className="space-y-2">
          {registros.map((r, idx) => (
            <div key={r.id} className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
              <span className="text-xs text-gray-500 w-6">{idx + 1}</span>
              <input
                type="time"
                value={r.entrada}
                onChange={(e) => updateRegistro(r.id, "entrada", e.target.value)}
                className="input-field flex-1"
              />
              <span className="text-gray-400">→</span>
              <input
                type="time"
                value={r.saida}
                onChange={(e) => updateRegistro(r.id, "saida", e.target.value)}
                className="input-field flex-1"
              />
              {registros.length > 1 && (
                <button
                  onClick={() => removeRegistro(r.id)}
                  className="text-gray-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        {registros.length < 14 && (
          <button
            onClick={addRegistro}
            className="w-full p-2 rounded-lg border border-dashed border-white/20 text-gray-400 hover:border-white/40 hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Adicionar par entrada/saida
          </button>
        )}

        <div className="p-4 rounded-xl bg-white/5 border border-white/8">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-4 h-4 text-gray-400" />
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Resultado</p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-xs text-gray-400">Trabalhado</p>
              <p className="text-lg font-bold text-white">{resultado.horasTrabalhadas}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Jornada</p>
              <p className="text-lg font-bold text-gray-300">{resultado.jornada}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Saldo</p>
              <div className="flex items-center justify-center gap-1">
                {resultado.saldoPositivo ? (
                  <TrendingUp className="w-4 h-4 text-green-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-400" />
                )}
                <p className={`text-lg font-bold ${resultado.saldoPositivo ? "text-green-400" : "text-red-400"}`}>
                  {resultado.saldoPositivo ? "+" : "-"}{resultado.saldo}
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center">
          {registros.length} registro(s) | Maximo 14 por dia
        </p>
      </div>
      <ToolContent
        toolName="Acumulador de Horas"
        category="DP/RH"
        data={{
          directAnswer: "Some cada par de entrada e saída do seu dia, compare o total com a jornada contratada (4h, 6h ou 8h) e veja se ficou com saldo positivo (hora extra) ou negativo (hora devida).",
          howItWorks: "A ferramenta soma o tempo entre cada par de horário de entrada e saída que você registrar — funciona para dias com múltiplos intervalos, como manhã e tarde separadas por almoço. O total trabalhado é comparado com a jornada contratada escolhida (4h, 6h ou 8h). Se você trabalhou mais que a jornada, o saldo aparece como positivo (banco de horas a favor). Se trabalhou menos, aparece como negativo (horas a repor). Quando o horário de saída é menor que o de entrada, a calculadora assume que o expediente passou da meia-noite e ajusta automaticamente.",
          example: {
            title: "Exemplo: jornada de 8h com intervalo de almoço",
            steps: [
              "Registro 1: entrada 08:00, saída 12:00 (4h trabalhadas)",
              "Registro 2: entrada 13:00, saída 17:00 (4h trabalhadas)",
              "Total do dia: 8h00min",
              "Jornada contratada selecionada: 8h",
            ],
            result: "Saldo do dia: 0h00min (bateu exatamente a jornada contratada)",
          },
          faqs: [
            { question: "Serve para calcular banco de horas?", answer: "Sim, o saldo positivo ou negativo exibido é o equivalente ao que normalmente se registra num banco de horas diário. Para o acumulado do mês, some os saldos de vários dias." },
            { question: "A ferramenta calcula hora extra com adicional de 50% ou 100%?", answer: "Não. Ela mostra apenas o saldo de tempo (horas a mais ou a menos). O valor em dinheiro da hora extra depende do acordo ou convenção coletiva da categoria, que a ferramenta não tem como saber." },
            { question: "Posso registrar mais de dois intervalos no mesmo dia?", answer: "Sim, é possível adicionar até 14 pares de entrada e saída, útil para quem tem múltiplas pausas ao longo do expediente." },
            { question: "E se eu trabalhar até depois da meia-noite?", answer: "Se o horário de saída for menor que o de entrada (ex: entrada 22:00, saída 02:00), a calculadora entende que o turno cruzou a meia-noite e soma corretamente." },
          ],
        }}
      />
    </ToolLayout>
  );
}
