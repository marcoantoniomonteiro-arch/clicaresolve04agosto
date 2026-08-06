import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import React, { useState, useMemo } from "react";


import { GraduationCap } from "lucide-react";
import { ToolContent } from "../components/ToolContent";
import { CONFIG } from "../config";

interface Props {
  onBack: () => void;
}

interface PesoCurso {
  nome: string;
  ling: number;
  humanas: number;
  natureza: number;
  mat: number;
  redacao: number;
}

const CURSOS_PADRAO: PesoCurso[] = [
  { nome: "Medicina", ling: 1, humanas: 1, natureza: 1, mat: 1, redacao: 2 },
  { nome: "Direito", ling: 2, humanas: 2, natureza: 1, mat: 1, redacao: 2 },
  { nome: "Engenharia", ling: 1, humanas: 1, natureza: 2, mat: 2, redacao: 1 },
  { nome: "Customizar", ling: 1, humanas: 1, natureza: 1, mat: 1, redacao: 1 },
];

export function SimuladorSISU({ onBack }: Props) {
  const [ling, setLing] = useState("");
  const [humanas, setHumanas] = useState("");
  const [natureza, setNatureza] = useState("");
  const [mat, setMat] = useState("");
  const [redacao, setRedacao] = useState("");
  const [cursoIdx, setCursoIdx] = useState(0);
  const [pesosCustom, setPesosCustom] = useState({ ling: 1, humanas: 1, natureza: 1, mat: 1, redacao: 1 });

  const curso = cursoIdx === 3
    ? { nome: "Personalizado", ...pesosCustom }
    : CURSOS_PADRAO[cursoIdx];

  const resultados = useMemo(() => {
    const notas = {
      ling: parseFloat(ling) || 0,
      humanas: parseFloat(humanas) || 0,
      natureza: parseFloat(natureza) || 0,
      mat: parseFloat(mat) || 0,
      redacao: parseFloat(redacao) || 0,
    };

    const soma = notas.ling + notas.humanas + notas.natureza + notas.mat + notas.redacao;
    const mediaSimples = soma / 5;

    const somaPonderada =
      notas.ling * curso.ling +
      notas.humanas * curso.humanas +
      notas.natureza * curso.natureza +
      notas.mat * curso.mat +
      notas.redacao * curso.redacao;

    const somaPesos = curso.ling + curso.humanas + curso.natureza + curso.mat + curso.redacao;
    const mediaPonderada = somaPonderada / somaPesos;

    let faixa = "";
    let faixaCor = "text-gray-400";
    if (mediaPonderada >= 800) { faixa = "Excelente"; faixaCor = "text-green-400"; }
    else if (mediaPonderada >= 700) { faixa = "Muito boa"; faixaCor = "text-green-400"; }
    else if (mediaPonderada >= 600) { faixa = "Boa"; faixaCor = "text-blue-400"; }
    else if (mediaPonderada >= 500) { faixa = "Media"; faixaCor = "text-yellow-400"; }
    else { faixa = "Baixa"; faixaCor = "text-red-400"; }

    return { mediaSimples, mediaPonderada, faixa, faixaCor, notas };
  }, [ling, humanas, natureza, mat, redacao, curso]);

  return (
    <ToolLayout
      title="Simulador SISU"
      emoji="🎓"
      category="Estudos"
      description="Calcule sua media do ENEM com pesos por curso."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["redação ENEM livro"]} label="redação ENEM livro" />}
    
    >
      <div className="space-y-5">
        <div className="p-4 rounded-xl bg-white/5 border border-white/8">
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap className="w-4 h-4 text-gray-400" />
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Notas ENEM</p>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {[
              { label: "Linguagens", value: ling, setter: setLing },
              { label: "Humanas", value: humanas, setter: setHumanas },
              { label: "Natureza", value: natureza, setter: setNatureza },
              { label: "Matematica", value: mat, setter: setMat },
              { label: "Redacao", value: redacao, setter: setRedacao },
            ].map((n) => (
              <div key={n.label}>
                <p className="text-xs text-gray-500 text-center mb-1">{n.label}</p>
                <input
                  type="number"
                  min="0"
                  max="1000"
                  value={n.value}
                  onChange={(e) => n.setter(e.target.value)}
                  className="input-field text-center"
                />
              </div>
            ))}
          </div>
        </div>

        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Curso/Pesos</span>
          <select
            value={cursoIdx}
            onChange={(e) => setCursoIdx(parseInt(e.target.value))}
            className="input-field"
          >
            {CURSOS_PADRAO.map((c, i) => (
              <option key={c.nome} value={i}>{c.nome}</option>
            ))}
          </select>
        </label>

        {cursoIdx === 3 && (
          <div className="grid grid-cols-5 gap-2">
            {Object.entries(pesosCustom).map(([key, val]) => (
              <div key={key}>
                <p className="text-xs text-gray-500 text-center mb-1">Peso {key}</p>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={val}
                  onChange={(e) => setPesosCustom((prev) => ({ ...prev, [key]: parseInt(e.target.value) || 1 }))}
                  className="input-field text-center"
                />
              </div>
            ))}
          </div>
        )}

        <div className="p-4 rounded-xl bg-white/5 border border-white/8">
          <p className="text-xs text-gray-400 mb-2">Pesos utilizados</p>
          <div className="flex justify-between text-xs">
            <span>Ling: {curso.ling}x</span>
            <span>Hum: {curso.humanas}x</span>
            <span>Nat: {curso.natureza}x</span>
            <span>Mat: {curso.mat}x</span>
            <span>Red: {curso.redacao}x</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-white/5 text-center">
            <p className="text-xs text-gray-400">Media Simples</p>
            <p className="text-3xl font-black text-white">{resultados.mediaSimples.toFixed(1)}</p>
          </div>
          <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
            <p className="text-xs text-green-400">Media Ponderada</p>
            <p className="text-3xl font-black text-green-400">{resultados.mediaPonderada.toFixed(1)}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/8">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Classificacao</span>
            <span className={`text-lg font-bold ${resultados.faixaCor}`}>{resultados.faixa}</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full mt-2 relative">
            <div className="absolute left-[50%] top-0 h-2 w-0.5 bg-yellow-500" />
            <div className="absolute left-[60%] top-0 h-2 w-0.5 bg-green-500/50" />
            <div className="absolute left-[80%] top-0 h-2 w-0.5 bg-green-500" />
            <div
              className="h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full transition-all"
              style={{ width: `${Math.min(resultados.mediaPonderada / 10, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0</span>
            <span>500</span>
            <span>600</span>
            <span>800</span>
            <span>1000</span>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center">
          Simulacao aproximada. A nota de corte real varia por instituicao e semestre.
        </p>
      </div>
      <ToolContent
        toolName="Simulador SISU"
        category="Estudos"
        data={{
          directAnswer: "Com notas ENEM de 700 (redação), 650 (LC), 600 (CH), 550 (CN), 500 (MT) e pesos 1,1,1,1,2 para Medicina, sua média ponderada é 580.",
          howItWorks: "O simulador SISU calcula a média simples e a média ponderada das notas do ENEM, usando os pesos por curso definidos pelo MEC. A média ponderada é: Σ (nota × peso) / Σ pesos. A ferramenta inclui 4 cursos pré-configurados: Medicina (redação 2x), Direito (linguagens 2x, humanas 2x), Engenharia (natureza 2x, matemática 2x) e personalizado. Para cada curso, a média ponderada é recalculada em tempo real. A ferramenta exibe: média simples (média aritmética), média ponderada (com pesos), classificação em faixa (Excelente, Muito boa, Boa, Média, Baixa) e uma barra de progresso com gradiente de cores. A faixa de classificação ajuda a estimar se a nota é competitiva para o curso desejado.",
          example: {
            title: "Exemplo: notas ENEM para Medicina (pesos 1,1,1,1,2)",
            steps: [
              "Informe as notas: Linguagens 650, Humanas 600, Natureza 700, Matemática 550, Redação 750",
              "Selecione o curso 'Medicina' (peso redação = 2)",
              "Calcula média simples: (650+600+700+550+750) / 5 = 650",
              "Calcula média ponderada: (650×1 + 600×1 + 700×1 + 550×1 + 750×2) / 6 = 666,7",
              "Exibe classificação: 'Muito boa' com barra de progresso em 66,7%"
            ],
            result: "Média simples: 650; Média ponderada: 666,7; Classificação: Muito boa — competitiva para cursos de média dificuldade.",
          },
          outboundLinks: [
            { label: "SISU - Sistema de Seleção Unificada", url: "https://sisu.mec.gov.br", source: "MEC/INEP" },
            { label: "Notas de Corte SISU", url: "https://sisu.mec.gov.br/#/relatorio", source: "INEP - Notas de corte históricas" }
          ],
          faqs: [
            { question: "Como funciona SISU?", answer: "O SISU usa as notas do ENEM para selecionar candidatos para vagas em universidades federais. Cada curso tem pesos diferentes para cada área do ENEM." },
            { question: "Como calcular nota SISU?", answer: "A nota SISU é a média ponderada das notas ENEM com os pesos do curso. A ferramenta calcula automaticamente: informe suas notas e escolha o curso." },
            { question: "O que são pesos por área?", answer: "São multiplicadores que cada curso aplica às notas ENEM. Medicina valoriza redação (peso 2). Engenharia valoriza matemática e natureza (peso 2 cada)." },
            { question: "Como saber nota de corte?", answer: "Consulte o portal do SISU ou o link 'Notas de Corte SISU' na ferramenta. A nota de corte varia a cada semestre e por instituição." },
            { question: "SISU usa nota ENEM de qual ano?", answer: "O SISU do 1º semestre usa o ENEM do ano anterior. O SISU do 2º semestre pode usar o mesmo ENEM ou um mais recente. Confirme no edital do MEC." },
          ],
        }}
      />
    </ToolLayout>
  );
}
