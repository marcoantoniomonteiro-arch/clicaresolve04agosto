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
  tipo: "nacional" | "facultativo";
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

function somarDias(base: Date, dias: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + dias);
  return d;
}

// Feriados nacionais (Lei 662/1949, Lei 6.802/1980, Lei 9.093/1995 e Lei 14.759/2023)
// e pontos facultativos federais divulgados todo ano pelo governo
function gerarFeriados(ano: number): Feriado[] {
  const pascoa = calcularPascoa(ano);

  const fixos: [number, number, string][] = [
    [1, 1, "Confraternização Universal"],
    [21, 4, "Tiradentes"],
    [1, 5, "Dia do Trabalho"],
    [7, 9, "Independência do Brasil"],
    [12, 10, "Nossa Senhora Aparecida"],
    [2, 11, "Finados"],
    [15, 11, "Proclamação da República"],
    [25, 12, "Natal"],
  ];

  const feriados: Feriado[] = fixos.map(([dia, mes, nome]) => ({
    data: new Date(ano, mes - 1, dia),
    nome,
    tipo: "nacional" as const,
  }));

  // Dia Nacional de Zumbi e da Consciência Negra: feriado nacional desde 2024
  if (ano >= 2024) {
    feriados.push({ data: new Date(ano, 10, 20), nome: "Consciência Negra", tipo: "nacional" });
  }

  feriados.push(
    { data: somarDias(pascoa, -2), nome: "Sexta-feira Santa", tipo: "nacional" },
    { data: somarDias(pascoa, -48), nome: "Carnaval (segunda)", tipo: "facultativo" },
    { data: somarDias(pascoa, -47), nome: "Carnaval (terça)", tipo: "facultativo" },
    { data: somarDias(pascoa, -46), nome: "Quarta-feira de Cinzas (até 14h)", tipo: "facultativo" },
    { data: somarDias(pascoa, 60), nome: "Corpus Christi", tipo: "facultativo" }
  );

  return feriados.sort((a, b) => a.data.getTime() - b.data.getTime());
}

const DIAS_SEMANA_LONGO = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

// Feriados que caem perto do fim de semana e formam folga longa
function feriadosProlongados(feriados: Feriado[]): { feriado: Feriado; dica: string }[] {
  const lista: { feriado: Feriado; dica: string }[] = [];
  feriados.forEach((f) => {
    if (f.nome.startsWith("Carnaval (terça)") || f.nome.startsWith("Quarta")) return;
    const dia = f.data.getDay();
    if (f.nome.startsWith("Carnaval")) lista.push({ feriado: f, dica: "sábado a terça (e quarta até 14h)" });
    else if (dia === 1) lista.push({ feriado: f, dica: "fim de semana de 3 dias (sábado a segunda)" });
    else if (dia === 5) lista.push({ feriado: f, dica: "fim de semana de 3 dias (sexta a domingo)" });
    else if (dia === 2) lista.push({ feriado: f, dica: "emenda na segunda: 4 dias de folga" });
    else if (dia === 4) lista.push({ feriado: f, dica: "emenda na sexta: 4 dias de folga" });
  });
  return lista;
}

const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const DIAS_SEMANA = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export function CalendarioFeriados({ onBack }: Props) {
  const [ano, setAno] = useState(new Date().getFullYear());
  const [agora, setAgora] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setAgora(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const feriados = useMemo(() => gerarFeriados(ano), [ano]);
  const prolongados = useMemo(() => feriadosProlongados(feriados), [feriados]);

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
      title="Calendário de Feriados"
      emoji="📆"
      category="Utilidades"
      description="Feriados nacionais, pontos facultativos e feriados prolongados de 2026, 2027 e qualquer outro ano."
      onBack={onBack}
      affiliateBanner={
        <AffiliateBanner
          terms={["mala de viagem", "mochila de viagem", "necessaire"]}
          label="Prepare sua viagem"
        />
      }
      disclaimer="Feriados nacionais e pontos facultativos federais. Feriados estaduais e municipais variam conforme a cidade."
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
                <p className="text-xs text-green-400">Próximo Feriado</p>
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
                            ? feriado.tipo === "nacional"
                              ? "bg-green-500 text-black font-bold"
                              : "bg-yellow-500/70 text-black font-bold"
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
                        <span className={f.tipo === "nacional" ? "text-green-400" : "text-yellow-400"}>
                          {f.nome}{f.tipo === "facultativo" ? " · ponto facultativo" : ""}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {prolongados.length > 0 && (
          <div className="rounded-xl bg-white/5 border border-white/8 p-4">
            <h2 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
              <Plane className="w-4 h-4 text-blue-400" /> Feriados prolongados em {ano}
            </h2>
            <ul className="space-y-1 text-xs text-gray-300">
              {prolongados.map(({ feriado, dica }, i) => (
                <li key={i}>
                  <strong className="text-white">
                    {feriado.data.toLocaleDateString("pt-BR")} ({DIAS_SEMANA_LONGO[feriado.data.getDay()]})
                  </strong>{" "}
                  — {feriado.nome.replace(" (segunda)", "")}: {dica}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-green-500" /> Feriado nacional
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded bg-yellow-500/70" /> Ponto facultativo
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
              "Feriados fixos: 1º de janeiro, 21 de abril, 1º de maio, 7 de setembro, 12 de outubro, 2, 15 e 20 de novembro e 25 de dezembro",
              "Datas móveis calculadas a partir da Páscoa: Carnaval, Sexta-feira Santa e Corpus Christi",
              "Total: 10 feriados nacionais (incluindo a Consciência Negra) e 4 pontos facultativos",
              "Próximo feriado a partir de hoje: destacado no calendário",
            ],
            result: "O calendário mostra os feriados nacionais, os pontos facultativos (Carnaval, Quarta-feira de Cinzas e Corpus Christi) e quais datas formam feriados prolongados.",
          },
          faqs: [
            { question: "Qual a diferença entre feriado fixo e feriado móvel?", answer: "Feriados fixos ocorrem sempre na mesma data todo ano (como 25 de dezembro), enquanto feriados móveis mudam de data conforme cálculos do calendário lunar/litúrgico, como a Páscoa e o Carnaval." },
            { question: "O calendário inclui feriados estaduais e municipais?", answer: "O foco principal costuma ser nos feriados nacionais; feriados estaduais e municipais variam por localidade e podem não estar incluídos." },
            { question: "Como é calculada a data da Páscoa a cada ano?", answer: "A Páscoa é calculada com base no primeiro domingo após a primeira lua cheia depois do equinócio de março, o que faz sua data variar anualmente." },
            { question: "Pontos facultativos são incluídos no calendário?", answer: "Sim, em amarelo. Carnaval, Quarta-feira de Cinzas e Corpus Christi são pontos facultativos federais: a folga depende do empregador e de leis estaduais ou municipais." },
            { question: "O Dia da Consciência Negra é feriado nacional?", answer: "Sim. Desde 2024, o 20 de novembro é feriado nacional pela Lei 14.759/2023." },
            { question: "Quais são os feriados prolongados de 2027?", answer: "Em 2027 caem perto do fim de semana: 1º de janeiro (sexta), Carnaval (8 e 9 de fevereiro), Sexta-feira Santa (26 de março), Corpus Christi (quinta, 27 de maio), 7 de setembro, 12 de outubro e 2 de novembro (terças) e 15 de novembro (segunda)." },
          ],
        }}
      />
    </ToolLayout>
  );
}
