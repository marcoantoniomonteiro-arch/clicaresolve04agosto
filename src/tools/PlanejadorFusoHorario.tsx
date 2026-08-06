import React, { useState, useEffect, useMemo } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { Globe, Plus, X, Clock } from "lucide-react";

interface Props {
  onBack: () => void;
}

interface CityOption {
  id: string;
  label: string;
  timeZone: string;
}

const CITIES: CityOption[] = [
  { id: "sao_paulo", label: "São Paulo", timeZone: "America/Sao_Paulo" },
  { id: "nova_york", label: "Nova York", timeZone: "America/New_York" },
  { id: "los_angeles", label: "Los Angeles", timeZone: "America/Los_Angeles" },
  { id: "londres", label: "Londres", timeZone: "Europe/London" },
  { id: "lisboa", label: "Lisboa", timeZone: "Europe/Lisbon" },
  { id: "paris", label: "Paris", timeZone: "Europe/Paris" },
  { id: "berlim", label: "Berlim", timeZone: "Europe/Berlin" },
  { id: "dubai", label: "Dubai", timeZone: "Asia/Dubai" },
  { id: "nova_delhi", label: "Nova Deli", timeZone: "Asia/Kolkata" },
  { id: "tokio", label: "Tóquio", timeZone: "Asia/Tokyo" },
  { id: "xangai", label: "Xangai", timeZone: "Asia/Shanghai" },
  { id: "sydney", label: "Sydney", timeZone: "Australia/Sydney" },
];

const BUSINESS_START = 9;
const BUSINESS_END = 18;

function getHourInZone(timeZone: string, baseDate: Date): number {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    hour12: false,
  });
  const hourStr = formatter.format(baseDate);
  return parseInt(hourStr, 10) % 24;
}

function formatTimeInZone(timeZone: string, date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

export function PlanejadorFusoHorario({ onBack }: Props) {
  const [selectedIds, setSelectedIds] = useState<string[]>(["sao_paulo", "tokio"]);
  const [now, setNow] = useState(new Date());
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const selectedCities = useMemo(
    () => CITIES.filter((c) => selectedIds.includes(c.id)),
    [selectedIds]
  );

  const timelineData = useMemo(() => {
    return selectedCities.map((city) => {
      const hours: { hour: number; isBusiness: boolean }[] = [];
      for (let h = 0; h < 24; h++) {
        hours.push({
          hour: h,
          isBusiness: h >= BUSINESS_START && h < BUSINESS_END,
        });
      }
      return { city, hours };
    });
  }, [selectedCities]);

  const overlap = useMemo(() => {
    if (selectedCities.length < 2) return null;
    const overlapHours: number[] = [];
    for (let h = 0; h < 24; h++) {
      const allBusiness = selectedCities.every((city) => {
        const cityHour = getHourInZone(city.timeZone, new Date(now.getFullYear(), now.getMonth(), now.getDate(), h, 0, 0));
        return cityHour >= BUSINESS_START && cityHour < BUSINESS_END;
      });
      if (allBusiness) overlapHours.push(h);
    }
    return overlapHours;
  }, [selectedCities, now]);

  const addCity = (id: string) => {
    if (selectedIds.length < 4 && !selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
    }
    setShowAdd(false);
  };

  const removeCity = (id: string) => {
    if (selectedIds.length > 1) {
      setSelectedIds(selectedIds.filter((sid) => sid !== id));
    }
  };

  return (
    <ToolLayout
      title="Planejador de Fuso Horário"
      emoji="🌐"
      category="Utilidades"
      description="Encontre a janela de horário comercial comum entre cidades para agendar reuniões internacionais."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["relogio mundial"]} label="Relógios mundiais" />}
    >
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Cidades selecionadas ({selectedIds.length}/4)</span>
            {selectedIds.length < 4 && (
              <button
                onClick={() => setShowAdd(!showAdd)}
                className="text-xs text-green-400 hover:text-green-300 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Adicionar cidade
              </button>
            )}
          </div>

          {showAdd && (
            <div className="grid grid-cols-2 gap-2 mb-2 p-3 rounded-xl bg-white/5 border border-white/10">
              {CITIES.filter((c) => !selectedIds.includes(c.id)).map((c) => (
                <button
                  key={c.id}
                  onClick={() => addCity(c.id)}
                  className="text-xs text-gray-400 hover:text-green-400 px-2 py-1.5 rounded-lg hover:bg-white/5 text-left"
                >
                  {c.label}
                </button>
              ))}
            </div>
          )}

          <div className="space-y-2">
            {selectedCities.map((city) => (
              <div
                key={city.id}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10"
              >
                <div>
                  <p className="text-sm font-medium text-white">{city.label}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatTimeInZone(city.timeZone, now)}
                  </p>
                </div>
                {selectedIds.length > 1 && (
                  <button
                    onClick={() => removeCity(city.id)}
                    className="text-gray-500 hover:text-red-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {selectedCities.length >= 2 && (
          <div>
            <h3 className="text-sm font-bold text-white mb-3">Linhas do tempo (24h)</h3>
            <div className="space-y-3 overflow-x-auto">
              {timelineData.map(({ city, hours }) => (
                <div key={city.id} className="flex items-center gap-2">
                  <div className="w-20 shrink-0 text-xs text-gray-400 truncate">{city.label}</div>
                  <div className="flex gap-px flex-1 min-w-[480px]">
                    {hours.map(({ hour, isBusiness }) => (
                      <div
                        key={hour}
                        className={`flex-1 h-8 rounded-sm flex items-center justify-center text-[8px] ${
                          isBusiness ? "bg-green-400/40 text-white" : "bg-white/5 text-gray-600"
                        }`}
                        title={`${hour}h`}
                      >
                        {hour % 6 === 0 ? hour : ""}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-2 text-xs">
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-sm bg-green-400/40" />
                <span className="text-gray-400">Horário comercial (9h-18h)</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-3 h-3 rounded-sm bg-white/5" />
                <span className="text-gray-400">Fora do expediente</span>
              </span>
            </div>
          </div>
        )}

        {selectedCities.length >= 2 && (
          <div className="p-4 rounded-xl bg-white/5 border border-white/10">
            {overlap && overlap.length > 0 ? (
              <div className="text-center">
                <p className="text-sm font-semibold text-green-400 mb-1">Janela de sobreposição encontrada</p>
                <p className="text-lg font-bold text-white">
                  {overlap[0]}h - {overlap[overlap.length - 1] + 1}h (horário de referência)
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Todas as cidades estão em horário comercial simultaneamente neste intervalo.
                </p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-sm font-semibold text-yellow-400 mb-1">Sem sobreposição de horário comercial</p>
                <p className="text-xs text-gray-400">
                  Não há horário em que todas as cidades selecionadas estejam simultaneamente dentro do expediente (9h-18h). Considere agendar no início ou fim do expediente de uma das partes.
                </p>
              </div>
            )}
          </div>
        )}

        {selectedCities.length < 2 && (
          <div className="text-center py-12 text-gray-500">
            <Globe className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Selecione pelo menos 2 cidades para comparar</p>
          </div>
        )}
      </div>

      <ToolContent
        toolName="Fuso Horário"
        category="Utilidades"
        data={{
          directAnswer: "O planejador de fuso horário encontra automaticamente o horário em que todas as cidades selecionadas estão dentro do expediente comercial (9h às 18h) ao mesmo tempo, facilitando o agendamento de reuniões internacionais.",
          howItWorks: "A ferramenta calcula a diferença de fuso horário entre as cidades selecionadas e exibe visualmente o horário comercial padrão (9h às 18h) de cada uma em uma linha do tempo de 24 horas. Quando os períodos de expediente de todas as cidades se sobrepõem, esse intervalo é destacado como a 'janela ideal' para marcar reuniões, já que todos os participantes estariam dentro do horário de trabalho. Isso evita o cálculo manual de fusos horários e a frustração de agendar reuniões em horários inconvenientes para parte da equipe.",
          example: {
            title: "Exemplo: reunião entre São Paulo e Tóquio",
            steps: [
              "Cidades selecionadas: São Paulo e Tóquio",
              "Diferença de fuso horário: Tóquio está à frente de São Paulo",
              "Ferramenta calcula os horários comerciais sobrepostos",
              "Resultado: pode haver pouca ou nenhuma sobreposição direta, exigindo horário alternativo (ex: início ou fim do expediente de uma das partes)",
            ],
            result: "A ferramenta mostra claramente se existe (ou não) uma janela de horário comercial comum, evitando tentativa e erro manual.",
          },
          faqs: [
            { question: "A ferramenta considera horário de verão automaticamente?", answer: "Sim, ao usar os fusos horários padrão do sistema, mudanças de horário de verão em vigor são consideradas automaticamente." },
            { question: "Posso comparar mais de 2 cidades ao mesmo tempo?", answer: "Sim, é possível selecionar até 4 cidades simultaneamente para encontrar a janela de sobreposição entre todas elas." },
            { question: "O que acontece se não houver sobreposição de horário comercial?", answer: "A ferramenta informa claramente essa situação e sugere o horário mais próximo de sobreposição parcial, para facilitar a negociação de um horário viável." },
            { question: "O horário comercial considerado é sempre 9h às 18h?", answer: "Sim, esta versão usa o padrão comercial mais comum internacionalmente como referência para o cálculo." },
          ],
        }}
      />
    </ToolLayout>
  );
}
