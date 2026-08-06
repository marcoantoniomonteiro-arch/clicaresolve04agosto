import React, { useState } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { CONFIG } from "../config";

interface Props { onBack: () => void; }

function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function addMonths(date: Date, months: number) {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

function fmt(d: Date) {
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

export function DPP({ onBack }: Props) {
  const [dum, setDum] = useState("");
  const [result, setResult] = useState<null | {
    dpp: Date; semanas: number; dias: number; trimestre: number; diasRestantes: number;
  }>(null);

  function calcular() {
    if (!dum) return;
    const base = new Date(dum + "T12:00:00");
    const naegele = addDays(addMonths(base, 9), 7);
    const hoje = new Date();
    const diffMs = hoje.getTime() - base.getTime();
    const totalDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const semanas = Math.floor(totalDias / 7);
    const dias = totalDias % 7;
    const trimestre = semanas < 13 ? 1 : semanas < 27 ? 2 : 3;
    const diasRestantes = Math.max(0, Math.ceil((naegele.getTime() - hoje.getTime()) / (1000 * 60 * 60 * 24)));
    setResult({ dpp: naegele, semanas, dias, trimestre, diasRestantes });
  }

  return (
    <ToolLayout
      title="Data Provável do Parto"
      emoji="🤰"
      category="Saúde"
      description="Calcule a data provável do parto pela Regra de Naegele e acompanhe a gestação."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["livro guia da gestante", "almofada para gestante"]} label="Prepare-se para o grande dia" />}
      disclaimer="Esta ferramenta é puramente informativa. Não substitui consulta médica ou diagnóstico profissional. Consulte sempre um profissional de saúde habilitado."
    >
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Data da Última Menstruação (DUM)</span>
          <input type="date" value={dum} onChange={(e) => setDum(e.target.value)} className="input-field" />
        </label>
        <button onClick={calcular} className="btn-primary w-full">Calcular DPP</button>

        {result && (
          <div className="space-y-3 mt-2">
            <div className="p-5 rounded-xl bg-pink-500/10 border border-pink-500/30 text-center">
              <p className="text-xs text-pink-400 mb-1">Data Provável do Parto</p>
              <p className="text-2xl font-black text-white">{fmt(result.dpp)}</p>
              <p className="text-sm text-pink-300 mt-1">{result.diasRestantes} dias restantes</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-400">Semanas</p>
                <p className="text-xl font-black text-white">{result.semanas}</p>
                <p className="text-xs text-gray-500">+{result.dias} dias</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-400">Trimestre</p>
                <p className="text-xl font-black text-white">{result.trimestre}º</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <p className="text-xs text-gray-400">Progresso</p>
                <p className="text-xl font-black text-white">{Math.min(100, Math.round((result.semanas / 40) * 100))}%</p>
              </div>
            </div>

            <div className="h-3 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-pink-500 to-pink-300 transition-all duration-700"
                style={{ width: `${Math.min(100, (result.semanas / 40) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500">
              <span>DUM</span><span>13 sem</span><span>27 sem</span><span>40 sem</span>
            </div>
          </div>
        )}
      </div>
      <ToolContent
        toolName="DPP"
        category="Saúde"
        data={{
          directAnswer: "A Data Provável do Parto (DPP) é calculada pela Regra de Naegele: adicione 7 dias à data da última menstruação, subtraia 3 meses e some 1 ano.",
          howItWorks: "A ferramenta aplica a Regra de Naegele, método padrão em obstetrícia: DPP = data da última menstruação + 7 dias + 9 meses (ou −3 meses + 1 ano). Além da DPP, a ferramenta calcula: 1) Semanas de gestação — quantas semanas e dias se passaram desde a DUM; 2) Trimestre — 1º (< 13 semanas), 2º (13-27) ou 3º (> 27); 3) Progresso — percentual da gestação com barra visual; 4) Dias restantes — contagem regressiva até a DPP. A data é formatada no padrão brasileiro e a barra de progresso mostra visualmente a evolução da gestação.",
          example: {
            title: "Exemplo: DUM em 1º de janeiro de 2026",
            steps: [
              "Informe a DUM: 01/01/2026",
              "A ferramente aplica Naegele: +7 dias = 08/01/2026",
              "Subtrai 3 meses: 08/10/2026; some 1 ano: 08/10/2027",
              "Calcula semanas de gestação e trimestre atual",
              "Exibe DPP formatada, progresso e dias restantes"
            ],
            result: "DPP: 08 de outubro de 2027; semanas: 12, trimestre: 2º, progresso: 30%, dias restantes: 210",
          },
          attribution: { fonte: "Regra de Naegele, método obstétrico padrão", data: CONFIG.dataRevisãoSaúde },
          faqs: [
            { question: "Como calcular DPP?", answer: "Use a Regra de Naegele: adicione 7 dias à data da última menstruação, subtraia 3 meses e some 1 ano. A ferramenta faz isso automaticamente." },
            { question: "O que é DPP?", answer: "Data Provável do Parto. É uma estimativa baseada na data da última menstruação. Apenas 4% dos bebês nascem exatamente na DPP." },
            { question: "DPP pode estar errada?", answer: "Sim. Ciclos irregulares, data imprecisa da menstruação ou ultrassom tardio podem alterar a estimativa. A DPP pela ultrassom nos primeiros 12 semanas é a mais precisa." },
            { question: "Qual a precisão da DPP?", answer: "A DPP pela Naegele tem margem de erro de ±2 semanas. A ultrassom no 1º trimestre reduz para ±5 dias." },
            { question: "Como saber se o bebê nasceu na DPP?", answer: "A gestação normal varia de 37 a 42 semanas. Bebês nascidos entre 37 e 42 semanas são considerados a termo. Não há preocupação se nascer 1-2 semanas antes ou depois." },
          ],
        }}
      />
    </ToolLayout>
  );
}
