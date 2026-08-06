import React, { useState, useMemo, useEffect } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { Calendar, Clock, Plane } from "lucide-react";
import { ToolContent } from "../components/ToolContent";

interface Props {
  onBack: () => void;
}

interface Feriado {
  data: Date;
  nome: string;
  tipo: "nacional" | "movel";
}

function calcularPascoa(ano: number): Date {
  const a = ano % 19;
  const b = Math.floor(ano / 100);
  const c = ano % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const mes = Math.floor((h + l - 7 * m + 114) / 31);
  const dia = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(ano, mes - 1, dia);
}

function gerarFeriados(ano: number): Feriado[] {
  const feriados: Feriado[] = [];

  const pascoa = calcularPascoa(ano);
  const carnaval = new Date(pascoa);
  carnaval.setDate(carnaval.getDate() - 47);
  const corpusChristi = new Date(pascoa);
  corpusChristi.setDate(corpusChristi.getDate() + 60);

  const fixos: [number, number, string][] = [
    [1, 1, "Confraternizacao Universal"],
    [21, 4, "Tiradentes"],
    [1, 5, "Dia do Trabalho"],
    [7, 9, "Independencia do Brasil"],
    [12, 10, "Nossa Senhora Aparecida"],
    [2, 11, "Finados"],
    [15, 11, "Proclamacao da Republica"],
    [25, 12, "Natal"],
  ];

  fixos.forEach(([dia, mes, nome]) => {
    feriados.push({
      data: new Date(ano, mes - 1, dia),
      nome,
      tipo: "nacional",
    });
  });

  feriados.push(
    { data: carnaval, nome: "Carnaval", tipo: "movel" },
    { data: pascoa, nome: "Pascoa", tipo: "movel" },
    { data: corpusChristi, nome: "Corpus Christi", tipo: "movel" }
  );

  return feriados.sort((a, b) => a.data.getTime() - b.data.getTime());
}

const MESES = [
  "Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const DIAS_SEMANA = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

export function CalendarioFeriados({ onBack }: Props) {
  const [ano, setAno] = useState(new Date().getFullYear());
  const [agora, setAgora] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setAgora(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const feriados = useMemo(() => gerarFeriados(ano), [ano]);

  const proximoFeriado = useMemo(() => {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    return feriados.find((f) => f.data >= hoje) || feriados[0];
  }, [feriados]);

  const diasAteProximo = useMemo(() => {
    if (!proximoFeriado) return 0;
    const diff = proximoFeriado.data.getTime() - agora.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }, [proximoFeriado, agora]);

  const calendarioMes = (mes: number) => {
    const dias: (number | null)[] = [];
    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();
    const diaSemana = primeiroDia.getDay();

    for (let i = 0; i < diaSemana; i++) dias.push(null);
    for (let i = 1; i <= ultimoDia; i++) dias.push(i);

    return dias;
  };

  const ehFeriado = (dia: number, mes: number) => {
    return feriados.find((f) => {
      return f.data.getDate() === dia && f.data.getMonth() === mes;
    });
  };

  const ehEmenda = (dia: number, mes: number) => {
    const data = new Date(ano, mes, dia);
    const diaSemana = data.getDay();
    return diaSemana === 0 || diaSemana === 6;
  };

  return (
    <ToolLayout
      title="Calendario de Feriados"
      emoji="📆"
      category="Utilidades"
      description={`Calendario com feriados nacionais e moveis de ${new Date().getFullYear()} e ${new Date().getFullYear() + 1}.`}
      onBack={onBack}
      affiliateBanner={
        <AffiliateBanner
          terms={["mala de viagem", "mochila de viagem", "necessaire"]}
          label="Prepare sua viagem"
        />
      }
      disclaimer="Calculo matematico. Nao inclui adicionais de Convencoes Coletivas (CCT)."
    >
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setAno((a) => a - 1)}
            className="px-3 py-1 rounded bg-white/10 text-gray-400 hover:bg-white/20"
          >
            {"<"}
          </button>
          <span className="text-2xl font-bold text-white">{ano}</span>
          <button
            onClick={() => setAno((a) => a + 1)}
            className="px-3 py-1 rounded bg-white/10 text-gray-400 hover:bg-white/20"
          >
            {">"}
          </button>
        </div>

        {proximoFeriado && (
          <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-green-400" />
              <div className="flex-1">
                <p className="text-xs text-green-400">Proximo Feriado</p>
                <p className="text-sm font-bold text-white">{proximoFeriado.nome}</p>
                <p className="text-xs text-gray-400">
                  {proximoFeriado.data.toLocaleDateString("pt-BR")} - {diasAteProximo} dias
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MESES.map((nomeMes, mesIdx) => {
            const dias = calendarioMes(mesIdx);
            const feriadosMes = feriados.filter((f) => f.data.getMonth() === mesIdx);

            return (
              <div key={mesIdx} className="rounded-xl bg-white/5 border border-white/8 p-3">
                <p className="text-sm font-semibold text-center text-gray-300 mb-2">{nomeMes}</p>
                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                  {DIAS_SEMANA.map((d) => (
                    <span key={d} className="text-gray-600">{d}</span>
                  ))}
                  {dias.map((dia, i) => {
                    if (dia === null) return <div key={i} />;
                    const feriado = ehFeriado(dia, mesIdx);
                    const emenda = ehEmenda(dia, mesIdx);

                    return (
                      <div
                        key={i}
                        className={`h-7 flex items-center justify-center rounded text-xs ${
                          feriado
                            ? "bg-green-500 text-black font-bold"
                            : emenda
                            ? "bg-blue-500/20 text-blue-400"
                            : "text-gray-400"
                        }`}
                        title={feriado?.nome}
                      >
                        {dia}
                      </div>
                    );
                  })}
                </div>
                {feriadosMes.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {feriadosMes.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs">
                        <span className="w-6 text-gray-500">{f.data.getDate()}</span>
                        <span className="text-green-400">{f.nome}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-green-500" /> Feriado
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-blue-500/20" /> Final de Semana
          </span>
        </div>
      </div>
      <ToolContent
        toolName="Calendário de Feriados"
        category="Utilidades"
        data={{
          directAnswer: "O calendário de feriados nacionais reúne as datas oficiais de feriados no Brasil ao longo do ano, incluindo feriados fixos e móveis.",
          howItWorks: "A ferramenta organiza os feriados nacionais brasileiros (fixos, como Natal e Independência, e móveis, como Carnaval e Páscoa, que mudam de data a cada ano conforme o calendário lunar), ajudando no planejamento de viagens, folgas e organização do calendário anual.",
          example: {
            title: "Exemplo: consultando feriados de um determinado ano",
            steps: [
              "Feriados fixos: 1º de janeiro, 21 de abril, 7 de setembro, 25 de dezembro",
              "Feriados móveis calculados: Carnaval, Sexta-feira Santa, Corpus Christi",
              "Total de feriados nacionais no ano: 12",
              "Próximo feriado a partir de hoje: destacado no calendário",
            ],
            result: "O calendário reúne os 12 feriados nacionais do ano, incluindo tanto as datas fixas quanto as móveis calculadas conforme o calendário litúrgico.",
          },
          faqs: [
            { question: "Qual a diferença entre feriado fixo e feriado móvel?", answer: "Feriados fixos ocorrem sempre na mesma data todo ano (como 25 de dezembro), enquanto feriados móveis mudam de data conforme cálculos do calendário lunar/litúrgico, como a Páscoa e o Carnaval." },
            { question: "O calendário inclui feriados estaduais e municipais?", answer: "O foco principal costuma ser nos feriados nacionais; feriados estaduais e municipais variam por localidade e podem não estar incluídos." },
            { question: "Como é calculada a data da Páscoa a cada ano?", answer: "A Páscoa é calculada com base no primeiro domingo após a primeira lua cheia depois do equinócio de março, o que faz sua data variar anualmente." },
            { question: "Pontos facultativos são incluídos no calendário?", answer: "Pontos facultativos (como Segunda-feira de Carnaval) geralmente são diferenciados dos feriados oficiais, já que não são obrigatórios por lei em todo o território nacional." },
          ],
        }}
      />
    </ToolLayout>
  );
}
