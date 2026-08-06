import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import React, { useState, useMemo } from "react";


import { ArrowLeftRight, Clock } from "lucide-react";

interface Props {
  onBack: () => void;
}

function horasParaDecimal(horas: number, minutos: number): number {
  return horas + minutos / 60;
}

function decimalParaHoras(decimal: number): { horas: number; minutos: number } {
  const horas = Math.floor(decimal);
  const minutos = Math.round((decimal - horas) * 60);
  return { horas, minutos };
}

export function HorasDecimais({ onBack }: Props) {
  const [horasInput, setHorasInput] = useState("1");
  const [minutosInput, setMinutosInput] = useState("45");
  const [decimalInput, setDecimalInput] = useState("1.75");

  const deHorarioParaDecimal = useMemo(() => {
    const h = parseInt(horasInput) || 0;
    const m = parseInt(minutosInput) || 0;
    return horasParaDecimal(h, m);
  }, [horasInput, minutosInput]);

  const deDecimalParaHorario = useMemo(() => {
    const d = parseFloat(decimalInput.replace(",", ".")) || 0;
    return decimalParaHoras(d);
  }, [decimalInput]);

  return (
    <ToolLayout
      title="Conversor Horas Decimais"
      emoji="🔢"
      category="DP/RH"
      description="Converta entre formato horario e horas decimais."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["calculadora científica"]} label="calculadora científica" />}
    
      disclaimer="Calculo matematico. Nao inclui adicionais de Convencoes Coletivas (CCT)."
    >
      <div className="space-y-5">
        <div className="p-5 rounded-xl bg-white/5 border border-white/8">
          <div className="flex items-center gap-2 mb-3">
            <ArrowLeftRight className="w-4 h-4 text-blue-400" />
            <p className="text-xs text-blue-400 font-semibold">Horario → Decimal</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="text-xs text-gray-400 mb-1 block">Horas</label>
              <input
                type="number"
                min="0"
                value={horasInput}
                onChange={(e) => setHorasInput(e.target.value)}
                className="input-field text-center"
              />
            </div>
            <span className="text-2xl text-gray-400 mt-4">:</span>
            <div className="flex-1">
              <label className="text-xs text-gray-400 mb-1 block">Minutos</label>
              <input
                type="number"
                min="0"
                max="59"
                value={minutosInput}
                onChange={(e) => setMinutosInput(e.target.value)}
                className="input-field text-center"
              />
            </div>
          </div>
          <div className="mt-4 p-4 rounded-lg bg-blue-500/10 text-center">
            <p className="text-xs text-blue-400">Decimal</p>
            <p className="text-3xl font-black text-blue-400">{deHorarioParaDecimal.toFixed(4)}</p>
            <p className="text-xs text-gray-500 mt-1">= {deHorarioParaDecimal.toFixed(2)} horas</p>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-white/5 border border-white/8">
          <div className="flex items-center gap-2 mb-3">
            <ArrowLeftRight className="w-4 h-4 text-green-400" />
            <p className="text-xs text-green-400 font-semibold">Decimal → Horario</p>
          </div>
          <label className="block">
            <span className="text-xs text-gray-400 mb-1 block">Horas Decimais</span>
            <input
              type="number"
              step="0.01"
              value={decimalInput}
              onChange={(e) => setDecimalInput(e.target.value)}
              placeholder="1.75"
              className="input-field text-center"
            />
          </label>
          <div className="mt-4 p-4 rounded-lg bg-green-500/10 text-center">
            <p className="text-xs text-green-400">Horario</p>
            <p className="text-3xl font-black text-green-400">
              {deDecimalParaHorario.horas}:{deDecimalParaHorario.minutos.toString().padStart(2, "0")}
            </p>
            <p className="text-xs text-gray-500 mt-1">{deDecimalParaHorario.horas}h {deDecimalParaHorario.minutos}min</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/8">
          <p className="text-xs text-gray-400 mb-2">Exemplos Comuns</p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[
              { h: "0:30", d: "0.50" },
              { h: "1:00", d: "1.00" },
              { h: "1:15", d: "1.25" },
              { h: "1:30", d: "1.50" },
              { h: "1:45", d: "1.75" },
              { h: "2:00", d: "2.00" },
              { h: "6:00", d: "6.00" },
              { h: "8:00", d: "8.00" },
            ].map((ex, i) => (
              <div key={i} className="flex justify-between p-2 rounded bg-white/5">
                <span className="text-gray-300">{ex.h}</span>
                <span className="text-gray-500">=</span>
                <span className="text-blue-400">{ex.d}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          <span>Usado para calculo de folha de pagamento e faturamento</span>
        </div>
      </div>
    </ToolLayout>
  );
}
