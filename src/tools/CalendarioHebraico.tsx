import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import React, { useState, useMemo } from "react";


import { Calendar, Star } from "lucide-react";
import { ToolContent } from "../components/ToolContent";

interface Props {
  onBack: () => void;
}

// Simplificacao - calculos aproximados do calendario hebraico
// O calendario hebraico real e lunissolar e mais complexo

const MESES_HEBRAICOS = [
  { nome: "Nissan", dias: 30 },
  { nome: "Iyar", dias: 29 },
  { nome: "Sivan", dias: 30 },
  { nome: "Tammuz", dias: 29 },
  { nome: "Av", dias: 30 },
  { nome: "Elul", dias: 29 },
  { nome: "Tishrei", dias: 30 },
  { nome: "Cheshvan", dias: 29 },
  { nome: "Kislev", dias: 30 },
  { nome: "Tevet", dias: 29 },
  { nome: "Shevat", dias: 30 },
  { nome: "Adar", dias: 29 },
];

const FESTAS = [
  { nome: "Pessach (Pascoa)", dia: 14, mes: 1, mesNome: "Nissan", descricao: "Liberdade do Egito" },
  { nome: "Shavuot (Pentecostes)", dia: 6, mes: 3, mesNome: "Sivan", descricao: "Entrega da Tora" },
  { nome: "Rosh Hashana", dia: 1, mes: 7, mesNome: "Tishrei", descricao: "Ano Novo Judaico" },
  { nome: "Yom Kippur", dia: 10, mes: 7, mesNome: "Tishrei", descricao: "Dia do Perdao" },
  { nome: "Sucot (Cabanas)", dia: 15, mes: 7, mesNome: "Tishrei", descricao: "Festa das Cabanas" },
  { nome: "Chanuca", dia: 25, mes: 9, mesNome: "Kislev", descricao: "Festa das Luzes (8 dias)" },
  { nome: "Purim", dia: 14, mes: 12, mesNome: "Adar", descricao: "Sorte e Libertacao" },
];

// Aproximacao simples: ano hebraico = ano gregoriano + 3760
// 1 Tishrei de 2024 = ~outubro 2024 (Rosh Hashana 5785)
// Esta é uma simplificação didática

function gregorianoParaHebraico(dia: number, mes: number, ano: number): { diaH: number; mesH: number; anoH: number; mesNome: string } {
  // Janeiro = mes 1, mas no hebraico Tishrei = mes 7 e é o "inicio do ano"
  // Simplificacao: Tishrei comeca em setembro/outubro

  const ANO_HEBRAICO_OFFSET = 3760;

  let diaH = dia;
  let mesH = (mes + 6) % 12 || 12; // Janeiro ~ Tishrei
  let anoH = ano + ANO_HEBRAICO_OFFSET;

  // Ajuste simples: se mes >= setembro (9), ainda e mesmo ano hebraico
  if (mes >= 9) {
    mesH = mes - 8; // Setembro = Tishrei (mes 1 do ano liturgico)
    if (mes === 9) mesH = 1;
    else if (mes === 10) mesH = 2;
    else if (mes === 11) mesH = 3;
    else if (mes === 12) mesH = 4;
  } else {
    // Janeiro-agosto: meses 5-12 do ano hebraico anterior
    mesH = mes + 4;
    anoH = ano + ANO_HEBRAICO_OFFSET - 1;
  }

  const mesNome = MESES_HEBRAICOS[mesH - 1]?.nome || "N/A";

  return { diaH, mesH, anoH, mesNome };
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

    // Verificar festas proximas (simplificado)
    const festasProximas = FESTAS.filter((f) => {
      // Mesmo mes hebraico ou proximo
      return Math.abs(f.mes - heb.mesH) <= 1 || (heb.mesH >= 11 && f.mes <= 2);
    }).map((f) => ({
      ...f,
      status: f.mes === heb.mesH && f.dia === heb.diaH
        ? "Hoje!"
        : f.mes === heb.mesH
        ? "Este mes"
        : "Proximo",
    }));

    return {
      gregoriano: { dia, mes, ano },
      hebraico: heb,
      festas: festasProximas,
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
    
      disclaimer="Esta conversao e uma aproximacao didatica. O calendario hebraico real baseia-se em ciclos lunissolares complexos. Para datas precisas, consulte um calendario oficial."
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
                          : f.status === "Este mes"
                          ? "bg-blue-500/20 text-blue-400"
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
          directAnswer: "O calendário hebraico é lunissolar, com meses baseados no ciclo da lua e ajustes periódicos para se manter alinhado às estações do ano solar.",
          howItWorks: "A ferramenta converte datas entre o calendário gregoriano (o usado no dia a dia) e o calendário hebraico tradicional, que é lunissolar — os meses seguem o ciclo lunar (cerca de 29-30 dias cada), mas periodicamente é adicionado um mês extra (Adar II) para manter o calendário alinhado com as estações do ano, já que 12 meses lunares são mais curtos que um ano solar.",
          example: {
            title: "Exemplo: convertendo uma data gregoriana para o calendário hebraico",
            steps: [
              "Data gregoriana: 15 de setembro de 2026",
              "Conversão para o calendário hebraico",
              "Mês hebraico correspondente: Elul ou Tishrei (dependendo do ano)",
              "Contexto: próximo ao período de Rosh Hashaná (Ano Novo judaico)",
            ],
            result: "A data de 15 de setembro de 2026 corresponde a um período próximo ao Rosh Hashaná no calendário hebraico, que segue o ciclo lunissolar.",
          },
          faqs: [
            { question: "O que significa calendário lunissolar?", answer: "É um calendário que combina o ciclo lunar (meses) com o ciclo solar (ano), usando ajustes periódicos para manter as duas contagens alinhadas." },
            { question: "Por que às vezes há um 13º mês no calendário hebraico?", answer: "Porque 12 meses lunares somam menos dias que um ano solar; o mês extra (Adar II) é adicionado em anos bissextos do calendário hebraico para corrigir essa diferença." },
            { question: "As festas judaicas mudam de data no calendário gregoriano todo ano?", answer: "Sim, como são baseadas no calendário hebraico lunissolar, as datas das festas variam a cada ano quando comparadas ao calendário gregoriano." },
            { question: "O dia hebraico começa à meia-noite como o gregoriano?", answer: "Não, o dia no calendário hebraico tradicionalmente começa ao pôr do sol da véspera, não à meia-noite." },
          ],
        }}
      />
    </ToolLayout>
  );
}
