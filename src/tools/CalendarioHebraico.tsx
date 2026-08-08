import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import React, { useState, useMemo } from "react";


import { Calendar, Star } from "lucide-react";
import { ToolContent } from "../components/ToolContent";

interface Props {
  onBack: () => void;
}

// ============================================================
// MOTOR DO CALENDARIO HEBRAICO — algoritmo aritmetico tradicional
// (o mesmo usado oficialmente desde o seculo IV EC: calculo do
// Molad de Tishrei + as 4 regras de adiamento / Dechiyot).
// Nao e uma aproximacao: e o algoritmo determinístico real.
// Referencias: jewfaq.org/calendr2.htm, Dershowitz & Reingold
// "Calendrical Calculations", validado contra datas conhecidas
// (Rosh Hashana 5732/1971, 5784-5787/2023-2026, Purim 5784).
// ============================================================

const PARTS_PER_HOUR = 1080;
const PARTS_PER_DAY = 24 * PARTS_PER_HOUR;
const MONTH_PARTS = 29 * PARTS_PER_DAY + 12 * PARTS_PER_HOUR + 793; // duracao media do mes lunar

const LEAP_POSITIONS = new Set([3, 6, 8, 11, 14, 17, 19]); // posicoes bissextas no ciclo metonico de 19 anos
function cyclePos(year: number) { return ((year - 1) % 19) + 1; }
function isLeapYear(year: number) { return LEAP_POSITIONS.has(cyclePos(year)); }

function monthsElapsed(year: number): number {
  const priorYears = year - 1;
  const cycles = Math.floor(priorYears / 19);
  const remainder = priorYears % 19;
  let months = cycles * 235; // 235 meses por ciclo de 19 anos
  for (let k = 1; k <= remainder; k++) {
    months += isLeapYear(cycles * 19 + k) ? 13 : 12;
  }
  return months;
}

// Ancora verificavel: Molad de Tishrei 5732 = 2d 7h 743p, correspondente
// a 20/09/1971 (fonte: jewfaq.org). Evita trabalhar com datas proletpticas antigas (ano 1 = 3761 AEC).
const ANCHOR_YEAR = 5732;
const ANCHOR_GREG = Date.UTC(1971, 8, 20);
const ANCHOR_DAY_INDEX = Math.floor(ANCHOR_GREG / 86400000);
const ANCHOR_TIME_PARTS = 7 * PARTS_PER_HOUR + 743;
const ANCHOR_DOW = new Date(ANCHOR_GREG).getUTCDay();
const ANCHOR_MONTHS = monthsElapsed(ANCHOR_YEAR);
const ANCHOR_M_PARTS = ANCHOR_DAY_INDEX * PARTS_PER_DAY + ANCHOR_TIME_PARTS;

function dowOf(dayIndex: number) {
  return (((dayIndex - ANCHOR_DAY_INDEX + ANCHOR_DOW) % 7) + 7) % 7; // 0=Dom...6=Sab
}

function moladTishreiParts(year: number) {
  return ANCHOR_M_PARTS + (monthsElapsed(year) - ANCHOR_MONTHS) * MONTH_PARTS;
}

// Aplica as 4 regras de Dechiyot para achar o dia real de Rosh Hashana
function roshHashanaDayIndex(year: number): number {
  const mParts = moladTishreiParts(year);
  const dayIndex = Math.floor(mParts / PARTS_PER_DAY);
  const timeParts = mParts - dayIndex * PARTS_PER_DAY;
  const dow = dowOf(dayIndex);

  let postponement = 0;
  if (!isLeapYear(year) && dow === 2 && timeParts >= 9 * PARTS_PER_HOUR + 204) {
    postponement = 2; // GaTaRaD
  } else if (isLeapYear(year - 1) && dow === 1 && timeParts >= 15 * PARTS_PER_HOUR + 589) {
    postponement = 1; // BeTuTeKaPoT
  } else if (timeParts >= 18 * PARTS_PER_HOUR) {
    postponement = 1; // Molad Zaken
  }

  let finalDay = dayIndex + postponement;
  if ([0, 3, 5].includes(dowOf(finalDay))) finalDay += 1; // Lo ADU Rosh (Dom/Qua/Sex)
  return finalDay;
}

function yearLength(year: number) { return roshHashanaDayIndex(year + 1) - roshHashanaDayIndex(year); }

interface MesInfo { nome: string; dias: number; }

function mesesDoAno(year: number): MesInfo[] {
  const len = yearLength(year);
  const cheshvanDias = len === 355 || len === 385 ? 30 : 29;
  const kislevDias = len === 353 || len === 383 ? 29 : 30;
  const meses: MesInfo[] = [
    { nome: "Tishrei", dias: 30 },
    { nome: "Cheshvan", dias: cheshvanDias },
    { nome: "Kislev", dias: kislevDias },
    { nome: "Tevet", dias: 29 },
    { nome: "Shevat", dias: 30 },
  ];
  if (isLeapYear(year)) {
    meses.push({ nome: "Adar I", dias: 30 }, { nome: "Adar II", dias: 29 });
  } else {
    meses.push({ nome: "Adar", dias: 29 });
  }
  meses.push(
    { nome: "Nissan", dias: 30 },
    { nome: "Iyar", dias: 29 },
    { nome: "Sivan", dias: 30 },
    { nome: "Tammuz", dias: 29 },
    { nome: "Av", dias: 30 },
    { nome: "Elul", dias: 29 }
  );
  return meses;
}

function gregorianoParaHebraico(dia: number, mes: number, ano: number) {
  const dayIndex = Math.floor(Date.UTC(ano, mes - 1, dia) / 86400000);
  let year = ano + 3760;
  while (roshHashanaDayIndex(year) > dayIndex) year--;
  while (roshHashanaDayIndex(year + 1) <= dayIndex) year++;
  const rh = roshHashanaDayIndex(year);
  let offset = dayIndex - rh;
  const meses = mesesDoAno(year);
  for (const mo of meses) {
    if (offset < mo.dias) {
      return { diaH: offset + 1, mesNome: mo.nome, anoH: year, isLeap: isLeapYear(year), dayIndex };
    }
    offset -= mo.dias;
  }
  // Nunca deveria chegar aqui se os invariantes do calendario estiverem corretos
  return { diaH: 1, mesNome: "Tishrei", anoH: year, isLeap: isLeapYear(year), dayIndex };
}

function hebraicoParaGregoriano(year: number, mesNome: string, dia: number) {
  const meses = mesesDoAno(year);
  const idx = meses.findIndex((m) => m.nome === mesNome);
  if (idx === -1 || dia < 1 || dia > meses[idx].dias) return null;
  let dayIndex = roshHashanaDayIndex(year);
  for (let i = 0; i < idx; i++) dayIndex += meses[i].dias;
  dayIndex += dia - 1;
  return new Date(dayIndex * 86400000);
}

const FESTAS = [
  { nome: "Pessach (Pascoa)", dia: 14, mesNome: "Nissan", descricao: "Liberdade do Egito" },
  { nome: "Shavuot (Pentecostes)", dia: 6, mesNome: "Sivan", descricao: "Entrega da Tora" },
  { nome: "Rosh Hashana", dia: 1, mesNome: "Tishrei", descricao: "Ano Novo Judaico" },
  { nome: "Yom Kippur", dia: 10, mesNome: "Tishrei", descricao: "Dia do Perdao" },
  { nome: "Sucot (Cabanas)", dia: 15, mesNome: "Tishrei", descricao: "Festa das Cabanas" },
  { nome: "Chanuca", dia: 25, mesNome: "Kislev", descricao: "Festa das Luzes (8 dias)" },
  { nome: "Purim", dia: 14, mesNome: "Adar", descricao: "Sorte e Libertacao" }, // ajustado p/ Adar II em ano bissexto
];

function festasProximas(dataRef: Date, anoHebraico: number) {
  const candidatos: { nome: string; dia: number; mesNome: string; descricao: string; data: Date }[] = [];
  // Verifica as festas no ano hebraico atual e no anterior/seguinte (cobre viradas de ano)
  for (const anoH of [anoHebraico - 1, anoHebraico, anoHebraico + 1]) {
    for (const f of FESTAS) {
      const mesAjustado = f.mesNome === "Adar" && isLeapYear(anoH) ? "Adar II" : f.mesNome;
      const data = hebraicoParaGregoriano(anoH, mesAjustado, f.dia);
      if (data) candidatos.push({ ...f, mesNome: mesAjustado, data });
    }
  }
  const umDia = 86400000;
  return candidatos
    .map((f) => ({ ...f, diffDias: Math.round((f.data.getTime() - dataRef.getTime()) / umDia) }))
    .filter((f) => Math.abs(f.diffDias) <= 45)
    .sort((a, b) => Math.abs(a.diffDias) - Math.abs(b.diffDias))
    .slice(0, 5)
    .map((f) => ({
      ...f,
      status: f.diffDias === 0 ? "Hoje!" : f.diffDias > 0 && f.diffDias <= 30 ? "Em breve" : f.diffDias < 0 && f.diffDias >= -7 ? "Recente" : "Proximo",
    }));
}

export function CalendarioHebraico({ onBack }: Props) {
  const [dataGregoriana, setDataGregoriana] = useState(() => {
    const hoje = new Date();
    return hoje.toISOString().split("T")[0];
  });

  const resultado = useMemo(() => {
    const data = new Date(dataGregoriana + "T12:00:00");
    if (isNaN(data.getTime())) return null;

    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();

    const heb = gregorianoParaHebraico(dia, mes, ano);
    const dataUTC = new Date(Date.UTC(ano, mes - 1, dia));
    const festas = festasProximas(dataUTC, heb.anoH);

    return {
      gregoriano: { dia, mes, ano },
      hebraico: heb,
      festas,
    };
  }, [dataGregoriana]);

  return (
    <ToolLayout
      title="Conversor Calendario Hebraico"
      emoji="🕍"
      category="Religioso"
      description="Converta datas gregorianas para o calendario hebraico e veja festas proximas."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["Torá em português livro"]} label="Torá em português livro" />}
    
      disclaimer="Calculado pelo algoritmo aritmético tradicional do calendário hebraico (em uso desde o século IV). Importante: no calendário hebraico, o dia começa ao pôr do sol da véspera — a data convertida aqui corresponde à maior parte das horas de luz do dia gregoriano informado."
    >
      <div className="space-y-5">
        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Data Gregoriana</span>
          <input
            type="date"
            value={dataGregoriana}
            onChange={(e) => setDataGregoriana(e.target.value)}
            className="input-field"
          />
        </label>

        {resultado && (
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
              <p className="text-xs text-blue-400 mb-1">Data Hebraica</p>
              <p className="text-3xl font-black text-blue-400">
                {resultado.hebraico.diaH} de {resultado.hebraico.mesNome}
              </p>
              <p className="text-lg font-bold text-white mt-1">
                {resultado.hebraico.anoH} AM
              </p>
              <p className="text-xs text-gray-500 mt-1">
                (Anno Mundi - Ano desde a Criacao)
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/8">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="w-4 h-4 text-gray-400" />
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                  Comparacao
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-xs text-gray-500">Gregoriano</p>
                  <p className="text-sm font-semibold text-white">
                    {resultado.gregoriano.dia}/{resultado.gregoriano.mes}/{resultado.gregoriano.ano}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Hebraico</p>
                  <p className="text-sm font-semibold text-blue-400">
                    {resultado.hebraico.diaH} {resultado.hebraico.mesNome} {resultado.hebraico.anoH}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/8">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-4 h-4 text-amber-400" />
                <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                  Festas Judaicas
                </p>
              </div>
              <div className="space-y-2">
                {resultado.festas.map((f, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 rounded-lg bg-white/5"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white">{f.nome}</p>
                      <p className="text-xs text-gray-500">{f.dia} {f.mesNome} - {f.descricao}</p>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded ${
                        f.status === "Hoje!"
                          ? "bg-green-500/20 text-green-400"
                          : f.status === "Em breve"
                          ? "bg-blue-500/20 text-blue-400"
                          : f.status === "Recente"
                          ? "bg-purple-500/20 text-purple-400"
                          : "bg-white/5 text-gray-400"
                      }`}
                    >
                      {f.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <ToolContent
        toolName="Calendário Hebraico"
        category="Religioso"
        data={{
          directAnswer: "O calendário hebraico é lunissolar: os meses seguem o ciclo da lua (29 ou 30 dias), e a cada poucos anos um mês extra (Adar II) é inserido para manter o calendário alinhado às estações do ano solar — em um ciclo fixo de 19 anos, 7 são anos bissextos (com 13 meses).",
          howItWorks: "A ferramenta usa o algoritmo aritmético tradicional do calendário hebraico — o mesmo método utilizado desde o século IV EC. Ele calcula o Molad (momento médio da conjunção lunar) de Tishrei para o ano desejado e aplica as 4 regras tradicionais de adiamento (Dechiyot) que determinam a data exata de Rosh Hashaná, evitando que certas festas caiam em dias proibidos da semana. A duração de cada ano (353 a 385 dias, dependendo se é comum ou bissexto) é obtida comparando o Rosh Hashaná de anos consecutivos, o que determina se Cheshvan e Kislev têm 29 ou 30 dias naquele ano específico. Nos anos bissextos (7 a cada 19 anos), o mês de Adar é dividido em Adar I (30 dias) e Adar II (29 dias) — e festas como Purim são celebradas em Adar II nesses anos, para manter a proximidade correta com Pessach.",
          example: {
            title: "Exemplo: convertendo 23 de setembro de 2025",
            steps: [
              "Data gregoriana: 23/09/2025",
              "O algoritmo calcula o Molad de Tishrei de 5786 e aplica as regras de Dechiyot",
              "Resultado: 1 de Tishrei de 5786 — o próprio Rosh Hashaná",
            ],
            result: "23/09/2025 corresponde a 1 de Tishrei de 5786 (Rosh Hashaná, Ano Novo judaico) — data verificada de forma independente em fontes de referência do calendário hebraico.",
          },
          faqs: [
            { question: "O que significa calendário lunissolar?", answer: "É um calendário que combina o ciclo lunar (meses de 29-30 dias) com o ciclo solar (ano de ~365 dias), usando um mês extra periódico (Adar II) para manter as duas contagens alinhadas ao longo do tempo." },
            { question: "Por que às vezes há um 13º mês no calendário hebraico?", answer: "Porque 12 meses lunares somam cerca de 354 dias — 11 dias a menos que o ano solar. Sem correção, as festas (que têm significado agrícola/sazonal, como Pessach na primavera) iriam gradualmente se deslocar pelas estações. Por isso, 7 vezes a cada ciclo de 19 anos, um 13º mês (Adar II) é inserido." },
            { question: "As festas judaicas mudam de data no calendário gregoriano todo ano?", answer: "Sim — como são baseadas no calendário hebraico lunissolar, cada festa cai num dia fixo do calendário hebraico, mas sua data correspondente no calendário gregoriano varia de um ano para outro, dentro de uma janela de cerca de um mês." },
            { question: "O dia hebraico começa à meia-noite como o gregoriano?", answer: "Não. O dia no calendário hebraico começa ao pôr do sol da véspera. Por isso, ao converter uma data gregoriana, a maior parte das horas de luz do dia geralmente corresponde à data hebraica calculada — mas o fim de tarde/noite já pertence ao próximo dia hebraico." },
            { question: "O algoritmo usa aproximação ou é matematicamente exato?", answer: "É o algoritmo aritmético tradicional e determinístico do calendário hebraico fixo (em uso desde o século IV EC), não uma aproximação. Ele foi testado nesta ferramenta contra datas de Rosh Hashaná e Purim de anos conhecidos, incluindo anos bissextos." },
          ],
        }}
      />
    </ToolLayout>
  );
}
