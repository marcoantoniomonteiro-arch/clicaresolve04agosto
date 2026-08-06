import React, { useState, useMemo } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { Droplets } from "lucide-react";
import { ToolContent } from "../components/ToolContent";

interface Props {
  onBack: () => void;
}

type Porosidade = "baixa" | "media" | "alta";
type Objetivo = "hidratacao" | "nutricao" | "reconstrucao";

const CRONOGRAMAS: Record<Porosidade, Record<Objetivo, string[]>> = {
  baixa: {
    hidratacao: ["H", "H", "H", "H", "N", "H", "R"],
    nutricao: ["H", "N", "H", "N", "H", "N", "R"],
    reconstrucao: ["H", "N", "H", "R", "H", "N", "R"],
  },
  media: {
    hidratacao: ["H", "H", "N", "H", "H", "N", "R"],
    nutricao: ["H", "N", "H", "N", "H", "R", "H"],
    reconstrucao: ["H", "N", "R", "H", "N", "H", "R"],
  },
  alta: {
    hidratacao: ["H", "H", "N", "H", "H", "N", "H"],
    nutricao: ["H", "N", "H", "N", "H", "N", "H"],
    reconstrucao: ["H", "N", "H", "R", "H", "N", "H"],
  },
};

const DICAS: Record<string, Record<string, string[]>> = {
  H: {
    titulo: "Hidratacao",
    cor: "bg-blue-500",
    dicas: [
      "Use mascaras com glicerina, aloe vera, pantenol",
      "Lave com agua morna, nao quente",
      "Deixe a mascara agir por 15-20 min",
      "Use touca termica para potencializar",
    ],
  },
  N: {
    titulo: "Nutricao",
    cor: "bg-yellow-500",
    dicas: [
      "Use mascaras com oleos: argan, coco, rícino",
      "Aplique do comprimento as pontas",
      "Evite na raiz se tiver cabelo oleoso",
      "Leave-in apos o procedimento",
    ],
  },
  R: {
    titulo: "Reconstrucao",
    cor: "bg-red-500",
    dicas: [
      "Use produtos com queratina, colageno, cisteina",
      "Nao exagere: maximo 1x por semana",
      "Siga tempo de pausa indicado no produto",
      "Hidrate apos reconstrucao",
    ],
  },
};

const DIAS_SEMANA = ["Domingo", "Segunda", "Terca", "Quarta", "Quinta", "Sexta", "Sabado"];

export function CronogramaCapilar({ onBack }: Props) {
  const [porosidade, setPorosidade] = useState<Porosidade>("media");
  const [objetivo, setObjetivo] = useState<Objetivo>("hidratacao");

  const cronograma = useMemo(() => {
    return CRONOGRAMAS[porosidade][objetivo];
  }, [porosidade, objetivo]);

  return (
    <ToolLayout
      title="Cronograma Capilar"
      emoji="💇"
      category="Utilidades"
      description="Cronograma HNR personalizado para seu tipo de cabelo."
      onBack={onBack}
      affiliateBanner={
        <AffiliateBanner
          terms={["mascara capilar", "oleo para cabelo", "creme de pentear"]}
          label="Produtos para seu cabelo"
          shopeeTerms={["máscara capilar"]} shopeeLabel="Ver na Shopee"
        />
      }
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm text-gray-400 mb-2 block">Porosidade</span>
            <div className="space-y-2">
              {[
                { value: "baixa", label: "Baixa", desc: "Cabelo resistente, nao absorve bem" },
                { value: "media", label: "Media", desc: "Equilibrado, absorve e retem" },
                { value: "alta", label: "Alta", desc: "Absorve rapido, perde facil" },
              ].map((p) => (
                <button
                  key={p.value}
                  onClick={() => setPorosidade(p.value as Porosidade)}
                  className={`w-full p-3 rounded-lg text-left transition-all ${
                    porosidade === p.value
                      ? "bg-green-500/20 border border-green-500/40"
                      : "bg-white/5 border border-white/8"
                  }`}
                >
                  <p className="text-sm font-semibold text-white">{p.label}</p>
                  <p className="text-xs text-gray-400">{p.desc}</p>
                </button>
              ))}
            </div>
          </label>

          <label className="block">
            <span className="text-sm text-gray-400 mb-2 block">Objetivo Principal</span>
            <div className="space-y-2">
              {[
                { value: "hidratacao", label: "Hidratacao", desc: "Fios ressecados" },
                { value: "nutricao", label: "Nutricao", desc: "Fios sem brilho/opacos" },
                { value: "reconstrucao", label: "Reconstrucao", desc: "Fios danificados" },
              ].map((o) => (
                <button
                  key={o.value}
                  onClick={() => setObjetivo(o.value as Objetivo)}
                  className={`w-full p-3 rounded-lg text-left transition-all ${
                    objetivo === o.value
                      ? "bg-blue-500/20 border border-blue-500/40"
                      : "bg-white/5 border border-white/8"
                  }`}
                >
                  <p className="text-sm font-semibold text-white">{o.label}</p>
                  <p className="text-xs text-gray-400">{o.desc}</p>
                </button>
              ))}
            </div>
          </label>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/8">
          <div className="flex items-center gap-2 mb-3">
            <Droplets className="w-4 h-4 text-blue-400" />
            <p className="text-xs text-blue-400 font-semibold uppercase tracking-wider">Seu Cronograma Semanal</p>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cronograma.map((dia, i) => {
              const config = DICAS[dia];
              return (
                <div key={i} className="text-center">
                  <p className="text-xs text-gray-500 mb-1">{DIAS_SEMANA[i].slice(0, 3)}</p>
                  <div
                    className={`w-10 h-10 mx-auto rounded-lg flex items-center justify-center text-lg font-bold text-white ${config.cor}`}
                  >
                    {dia}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center gap-4 mt-3 text-xs">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-blue-500" /> Hidratacao
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-yellow-500" /> Nutricao
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded bg-red-500" /> Reconstrucao
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {Object.entries(DICAS).map(([key, config]) => (
            <div key={key} className="p-4 rounded-xl bg-white/5 border border-white/8">
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-6 h-6 rounded flex items-center justify-center text-white text-xs font-bold ${config.cor}`}>
                  {key}
                </span>
                <p className="text-sm font-semibold text-white">{config.titulo}</p>
              </div>
              <ul className="text-xs text-gray-400 space-y-1">
                {config.dicas.map((dica, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-gray-500">•</span>
                    {dica}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <ToolContent
        toolName="Cronograma Capilar"
        category="Utilidades"
        data={{
          directAnswer: "O cronograma capilar organiza um calendário alternando entre hidratação, nutrição e reconstrução do cabelo, conforme a necessidade identificada pelo tipo e condição dos fios.",
          howItWorks: "A ferramenta monta um calendário semanal ou mensal alternando os 3 tipos de tratamento capilar: hidratação (repõe água), nutrição (repõe lipídios/óleos) e reconstrução (repõe proteína), na proporção ideal para o tipo de cabelo informado (seco, oleoso, danificado, cacheado, etc), ajudando a manter a saúde e a beleza dos fios ao longo do tempo.",
          example: {
            title: "Exemplo: cronograma para cabelo danificado por química",
            steps: [
              "Semana 1: Reconstrução (proteína) + Hidratação",
              "Semana 2: Nutrição (óleos) + Hidratação",
              "Semana 3: Reconstrução + Hidratação",
              "Semana 4: Nutrição + Hidratação",
            ],
            result: "Para cabelos danificados por química, o cronograma prioriza reconstrução e nutrição intercaladas, sempre com hidratação semanal.",
          },
          faqs: [
            { question: "Qual a diferença entre hidratação, nutrição e reconstrução?", answer: "Hidratação repõe água, nutrição repõe lipídios (óleos), e reconstrução repõe proteínas perdidas — cada tipo de cabelo precisa de uma proporção diferente entre esses 3 tratamentos." },
            { question: "Com que frequência devo fazer cada etapa?", answer: "Isso varia conforme o tipo e condição do cabelo; cabelos muito danificados podem precisar de reconstrução mais frequente, enquanto cabelos saudáveis focam mais em hidratação e nutrição." },
            { question: "Posso seguir o cronograma sem produtos profissionais?", answer: "Sim, existem produtos caseiros e de farmácia que cumprem cada uma das 3 funções, mas produtos profissionais tendem a ter resultados mais consistentes." },
            { question: "Excesso de proteína pode prejudicar o cabelo?", answer: "Sim, o excesso de reconstrução sem hidratação suficiente pode deixar o cabelo rígido e quebradiço — por isso o equilíbrio entre as 3 etapas é importante." },
          ],
        }}
      />
    </ToolLayout>
  );
}
