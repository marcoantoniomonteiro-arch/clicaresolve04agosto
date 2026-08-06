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

function fmt(d: Date) {
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

const MONTHS_PT = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
const DAYS_PT = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];

export function PeriodoFertil({ onBack }: Props) {
  const [dum, setDum] = useState("");
  const [ciclo, setCiclo] = useState("28");
  const [result, setResult] = useState<null | {
    ovulacao: Date; fMin: Date; fMax: Date; proxMens: Date; cicloN: number;
  }>(null);

  function calcular() {
    if (!dum) return;
    const base = new Date(dum + "T12:00:00");
    const c = parseInt(ciclo) || 28;
    const ovulacao = addDays(base, c - 14);
    const fMin = addDays(ovulacao, -5);
    const fMax = addDays(ovulacao, 1);
    const proxMens = addDays(base, c);
    setResult({ ovulacao, fMin, fMax, proxMens, cicloN: c });
  }

  function getDayClass(day: Date) {
    if (!result) return "";
    const t = day.getTime();
    if (t === result.ovulacao.getTime()) return "bg-pink-500 text-white rounded-full font-bold";
    if (t >= result.fMin.getTime() && t <= result.fMax.getTime()) return "bg-pink-400/30 text-pink-300 rounded-full";
    return "";
  }

  function renderCalendar() {
    if (!result) return null;
    const base = new Date(dum + "T12:00:00");
    const year = base.getFullYear();
    const month = base.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: React.ReactNode[] = [];
    for (let i = 0; i < firstDay; i++) cells.push(<div key={`e${i}`} />);
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(year, month, d);
      const cls = getDayClass(date);
      cells.push(
        <div key={d} className={`text-center text-xs py-1 ${cls || "text-gray-400"}`}>{d}</div>
      );
    }

    return (
      <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/8">
        <p className="text-sm font-semibold text-white mb-3 text-center">
          {MONTHS_PT[month]} {year}
        </p>
        <div className="grid grid-cols-7 gap-1 mb-1">
          {DAYS_PT.map((d) => <div key={d} className="text-center text-xs text-gray-600 font-medium">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">{cells}</div>
        <div className="flex gap-4 mt-3 justify-center text-xs">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-pink-500 inline-block" /> Ovulação</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-pink-400/40 inline-block" /> Fértil</span>
        </div>
      </div>
    );
  }

  return (
    <ToolLayout
      title="Período Fértil"
      emoji="🌸"
      category="Saúde"
      description="Calcule seu período fértil e data de ovulação com calendário visual."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["teste de ovulacao", "vitamina acido folico"]} label="Saúde reprodutiva" />}
      disclaimer="Esta ferramenta é puramente informativa. Não substitui consulta médica ou diagnóstico profissional. Consulte sempre um profissional de saúde habilitado. Este método de estimativa NÃO é método contraceptivo."
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <label className="block col-span-2">
            <span className="text-sm text-gray-400 mb-1 block">1º dia da última menstruação</span>
            <input type="date" value={dum} onChange={(e) => setDum(e.target.value)} className="input-field" />
          </label>
          <label className="block col-span-2">
            <span className="text-sm text-gray-400 mb-1 block">Duração média do ciclo (dias)</span>
            <input type="number" value={ciclo} onChange={(e) => setCiclo(e.target.value)} placeholder="28" className="input-field" />
          </label>
        </div>
        <button onClick={calcular} className="btn-primary w-full">Calcular</button>

        {result && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-pink-500/10 border border-pink-500/20 text-center">
                <p className="text-xs text-pink-400">Ovulação Provável</p>
                <p className="text-sm font-bold text-white">{fmt(result.ovulacao)}</p>
              </div>
              <div className="p-3 rounded-xl bg-pink-400/10 border border-pink-400/20 text-center">
                <p className="text-xs text-pink-300">Próxima Menstruação</p>
                <p className="text-sm font-bold text-white">{fmt(result.proxMens)}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/8 text-center col-span-2">
                <p className="text-xs text-gray-400">Janela Fértil</p>
                <p className="text-sm font-bold text-white">{fmt(result.fMin)} a {fmt(result.fMax)}</p>
              </div>
            </div>
            {renderCalendar()}
          </div>
        )}
      </div>
      <ToolContent
        toolName="PeriodoFertil"
        category="Saúde"
        data={{
          directAnswer: "O período fértil ocorre em média 14 dias antes da próxima menstruação, com janela de 5 dias antes da ovulação + dia da ovulação.",
          howItWorks: "A ferramenta utiliza o Método Ogino-Knaus para estimar o período fértil. Recebe a data da última menstruação e a duração média do ciclo. A ovulação é calculada como ciclo − 14 dias. A janela fértil inclui os 5 dias antes da ovulação (duração do espermatozoide no trato reprodutivo) + dia da ovulação. A ferramenta exibe: 1) Data da ovulação; 2) Próxima menstruação; 3) Janela fértil com datas; 4) Calendário visual colorido com marcadores de ovulação e dias férteis. O calendário usa cores: rosa para ovulação, rosa claro para período fértil. A ferramenta NÃO é método contraceptivo.",
          example: {
            title: "Exemplo: ciclo de 28 dias, menstruação em 01/01",
            steps: [
              "Informe a DUM: 01/01/2026 e ciclo de 28 dias",
              "A ferramenta calcula ovulação: 01/01 + 14 = 15/01/2026",
              "Janela fértil: 10/01 a 16/01/2026 (5 dias antes + dia da ovulação)",
              "Próxima menstruação: 29/01/2026",
              "Calendário visual mostra os dias com cores distintas"
            ],
            result: "Ovulação: 15/01; Janela Fértil: 10/01 a 16/01; Próxima menstruação: 29/01",
          },
          attribution: { fonte: "Método Ogino-Knaus (OMS, 1988)", data: CONFIG.dataRevisãoSaúde },
          faqs: [
            { question: "Como calcular período fértil?", answer: "Informe a data da última menstruação e a duração média do ciclo. A ferramenta calcula a ovulação (ciclo − 14 dias) e a janela fértil (5 dias antes + dia da ovulação)." },
            { question: "Quanto dura o período fértil?", answer: "A janela fértil dura 6 dias: 5 dias antes da ovulação (duração do espermatozoide) + dia da ovulação. O óvulo só vive 12-24 horas." },
            { question: "Posso engravidar fora do período fértil?", answer: "A probabilidade é muito baixa, mas não zero. Espermatozoides podem sobreviver até 5 dias. Métodos naturais não são 100% eficazes." },
            { question: "O que é ovulação?", answer: "É a liberação do óvulo pelo ovário, geralmente no meio do ciclo. É o momento em que a mulher está mais fértil." },
            { question: "Como saber se estou ovulando?", answer: "Sinais incluem: muco cervical claro e elástico, leve dor no baixo-ventre (dor ovulatória), aumento da temperatura basal e mudanças hormonais detectáveis em testes de ovulação." },
          ],
        }}
      />
    </ToolLayout>
  );
}
