import React, { useState, useEffect, useRef } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";

interface Props {
  onBack: () => void;
}

interface TimeParts {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
}

function calcDiff(target: Date, now: Date): TimeParts {
  const diffMs = target.getTime() - now.getTime();
  const absMs = Math.abs(diffMs);
  const totalSeconds = Math.floor(absMs / 1000);

  let years = target.getFullYear() - now.getFullYear();
  let months = target.getMonth() - now.getMonth();
  let days = target.getDate() - now.getDate();
  let hours = target.getHours() - now.getHours();
  let minutes = target.getMinutes() - now.getMinutes();
  let seconds = target.getSeconds() - now.getSeconds();

  if (diffMs >= 0) {
    if (seconds < 0) { seconds += 60; minutes--; }
    if (minutes < 0) { minutes += 60; hours--; }
    if (hours < 0) { hours += 24; days--; }
    if (days < 0) {
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
      months--;
    }
    if (months < 0) { months += 12; years--; }
  } else {
    if (seconds > 0) { seconds -= 60; minutes++; }
    if (minutes > 0) { minutes -= 60; hours++; }
    if (hours > 0) { hours -= 24; days--; }
    if (days > 0) {
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days -= prevMonth.getDate();
      months++;
    }
    if (months > 0) { months -= 12; years++; }
  }

  return {
    years: Math.abs(years),
    months: Math.abs(months),
    days: Math.abs(days),
    hours: Math.abs(hours),
    minutes: Math.abs(minutes),
    seconds: Math.abs(seconds),
    totalSeconds,
  };
}

export function ContadorTempoDecorrido({ onBack }: Props) {
  const [dateStr, setDateStr] = useState("");
  const [now, setNow] = useState(new Date());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (dateStr) {
      intervalRef.current = setInterval(() => setNow(new Date()), 1000);
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [dateStr]);

  const target = dateStr ? new Date(dateStr) : null;
  const isFuture = target ? target.getTime() > now.getTime() : true;
  const parts = target ? calcDiff(target, now) : null;

  const fmtNum = (n: number) => n.toLocaleString("pt-BR");

  return (
    <ToolLayout
      title="Contador de Tempo Decorrido"
      emoji="⏱️"
      category="Calculadoras"
      description="Calcule em tempo real quanto tempo passou ou falta até uma data."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["calendário digital"]} label="calendário digital" />}
    >
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Data e hora do evento</span>
          <input
            type="datetime-local"
            value={dateStr}
            onChange={(e) => setDateStr(e.target.value)}
            className="input-field"
          />
        </label>

        {parts && target && (
          <>
            <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
              <p className="text-sm font-semibold text-green-400">
                {isFuture ? "Falta:" : "Passou:"}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "Anos", value: parts.years },
                { label: "Meses", value: parts.months },
                { label: "Dias", value: parts.days },
                { label: "Horas", value: parts.hours },
                { label: "Minutos", value: parts.minutes },
                { label: "Segundos", value: parts.seconds },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                  <p className="text-2xl font-bold text-white">{String(item.value).padStart(2, "0")}</p>
                  <p className="text-xs text-gray-400">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <p className="text-sm text-gray-400">
                ou <span className="font-bold text-green-400">{fmtNum(parts.totalSeconds)}</span> segundos no total
              </p>
            </div>
          </>
        )}

        {!dateStr && (
          <p className="text-sm text-gray-500 text-center">Selecione uma data e hora para começar a contagem.</p>
        )}
      </div>

      <ToolContent
        toolName="Contador de Tempo Decorrido"
        category="Calculadoras"
        data={{
          directAnswer: "O tempo decorrido entre duas datas é calculado convertendo a diferença total em milissegundos para anos, meses, dias, horas, minutos e segundos completos.",
          howItWorks: "A ferramenta calcula a diferença exata entre o momento atual e a data/hora informada, atualizando em tempo real a cada segundo. Se a data informada for no passado, mostra quanto tempo já passou desde então; se for no futuro, mostra a contagem regressiva até o evento. É útil para acompanhar aniversários, prazos, contagens regressivas de eventos especiais, ou simplesmente saber há quanto tempo algo aconteceu.",
          example: {
            title: "Exemplo: quanto tempo até o Ano Novo",
            steps: [
              `Data do evento: 01/01/2027 00:00`,
              `Momento atual: verificado em tempo real`,
              `Ferramenta calcula a diferença e atualiza a cada segundo`,
              `Exibição: "Faltam X dias, Y horas, Z minutos e W segundos"`,
            ],
            result: "O contador mostra em tempo real quanto tempo falta para o evento, atualizando automaticamente a cada segundo.",
          },
          faqs: [
            { question: "O contador atualiza sozinho?", answer: "Sim, a contagem é atualizada automaticamente a cada segundo, sem precisar recarregar a página." },
            { question: "Funciona para datas passadas também?", answer: "Sim, ao informar uma data no passado, a ferramenta mostra quanto tempo já se passou desde aquele momento até agora." },
            { question: "A ferramenta considera fuso horário?", answer: "A ferramenta usa o fuso horário configurado no seu dispositivo/navegador para os cálculos." },
            { question: "Posso usar para contagem regressiva de eventos?", answer: "Sim, é ideal para acompanhar quanto tempo falta para datas especiais, como aniversários, formaturas, viagens ou lançamentos." },
          ],
        }}
      />
    </ToolLayout>
  );
}
