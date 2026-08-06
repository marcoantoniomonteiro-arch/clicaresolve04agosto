import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import React, { useState, useMemo } from "react";


import { TrendingUp, Heart, MessageCircle, Share2 } from "lucide-react";
import { ToolContent } from "../components/ToolContent";

interface Props {
  onBack: () => void;
}

const CLASSIFICACOES = [
  { min: 0, max: 1, label: "Abaixo da media", cor: "text-red-400", bg: "bg-red-500/20" },
  { min: 1, max: 3, label: "Media", cor: "text-yellow-400", bg: "bg-yellow-500/20" },
  { min: 3, max: 6, label: "Bom", cor: "text-green-400", bg: "bg-green-500/20" },
  { min: 6, max: 999, label: "Excelente", cor: "text-emerald-400", bg: "bg-emerald-500/20" },
];

export function TaxaEngajamento({ onBack }: Props) {
  const [seguidores, setSeguidores] = useState("");
  const [curtidasMedias, setCurtidasMedias] = useState("");
  const [comentariosMedios, setComentariosMedios] = useState("");
  const [compartilhamentos, setCompartilhamentos] = useState("");

  const resultado = useMemo(() => {
    const seg = parseFloat(seguidores.replace(/\D/g, "")) || 0;
    const curt = parseFloat(curtidasMedias.replace(/\D/g, "")) || 0;
    const com = parseFloat(comentariosMedios.replace(/\D/g, "")) || 0;
    const comp = parseFloat(compartilhamentos.replace(/\D/g, "")) || 0;

    if (seg <= 0) return null;

    const engajamentoTotal = ((curt + com + comp) / seg) * 100;
    const taxaCurtidas = seg > 0 ? (curt / seg) * 100 : 0;
    const taxaComentarios = seg > 0 ? (com / seg) * 100 : 0;
    const taxaCompartilhamentos = seg > 0 ? (comp / seg) * 100 : 0;

    const classificacao = CLASSIFICACOES.find((c) => engajamentoTotal >= c.min && engajamentoTotal < c.max)
      || CLASSIFICACOES[CLASSIFICACOES.length - 1];

    return {
      total: engajamentoTotal,
      curtidas: taxaCurtidas,
      comentarios: taxaComentarios,
      compartilhamentos: taxaCompartilhamentos,
      classificacao,
      seg,
      curt,
      com,
      comp,
    };
  }, [seguidores, curtidasMedias, comentariosMedios, compartilhamentos]);

  return (
    <ToolLayout
      title="Taxa de Engajamento"
      emoji="📱"
      category="Redes Sociais"
      description="Calcule a taxa de engajamento do seu perfil e veja sua classificacao."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["curso instagram marketing"]} label="curso instagram marketing" />}
    
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Seguidores</span>
            <input
              type="number"
              value={seguidores}
              onChange={(e) => setSeguidores(e.target.value)}
              placeholder="10000"
              className="input-field"
            />
          </label>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Curtidas Medias</span>
            <input
              type="number"
              value={curtidasMedias}
              onChange={(e) => setCurtidasMedias(e.target.value)}
              placeholder="500"
              className="input-field"
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Comentarios Medios</span>
            <input
              type="number"
              value={comentariosMedios}
              onChange={(e) => setComentariosMedios(e.target.value)}
              placeholder="50"
              className="input-field"
            />
          </label>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Compartilhamentos Medios</span>
            <input
              type="number"
              value={compartilhamentos}
              onChange={(e) => setCompartilhamentos(e.target.value)}
              placeholder="20"
              className="input-field"
            />
          </label>
        </div>

        {resultado && (
          <div className="space-y-4">
            <div className="p-6 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
              <p className="text-xs text-green-400 mb-1">Taxa de Engajamento</p>
              <p className="text-5xl font-black text-green-400">{resultado.total.toFixed(2)}%</p>
            </div>

            <div className={`p-4 rounded-xl ${resultado.classificacao.bg} text-center`}>
              <p className={`text-lg font-bold ${resultado.classificacao.cor}`}>
                {resultado.classificacao.label}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-center">
                <Heart className="w-5 h-5 text-red-400 mx-auto mb-1" />
                <p className="text-xs text-red-400">Curtidas</p>
                <p className="text-lg font-bold text-red-400">{resultado.curtidas.toFixed(2)}%</p>
              </div>
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
                <MessageCircle className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                <p className="text-xs text-blue-400">Comentarios</p>
                <p className="text-lg font-bold text-blue-400">{resultado.comentarios.toFixed(2)}%</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 text-center">
                <Share2 className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                <p className="text-xs text-purple-400">Compart.</p>
                <p className="text-lg font-bold text-purple-400">{resultado.compartilhamentos.toFixed(2)}%</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/8">
              <p className="text-xs text-gray-400 mb-2">Classificacao de Engajamento</p>
              <div className="space-y-2">
                {CLASSIFICACOES.map((c) => (
                  <div key={c.label} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${c.bg} ${c.cor === resultado?.classificacao.cor ? "ring-2 ring-white" : ""}`} />
                    <span className="text-xs text-gray-400">{c.min}% - {c.max}%</span>
                    <span className={`text-xs font-semibold ${c.cor}`}>{c.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-gray-500 text-center">
              Calculado:                 ({resultado.curt} + {resultado.com} + {resultado.comp}) / {resultado.seg} x 100
            </p>
          </div>
        )}
      </div>
      <ToolContent
        toolName="Taxa de Engajamento"
        category="Redes Sociais"
        data={{
          directAnswer: "A taxa de engajamento é calculada dividindo o total de interações (curtidas, comentários, compartilhamentos) pelo número de seguidores ou alcance, multiplicado por 100.",
          howItWorks: "A ferramenta calcula a taxa de engajamento de uma publicação ou perfil em redes sociais, somando as interações (curtidas, comentários, compartilhamentos) e dividindo pelo número de seguidores (ou pelo alcance da publicação), resultando em uma porcentagem que indica o quanto o público está interagindo com o conteúdo.",
          example: {
            title: "Exemplo: post com 500 curtidas, 50 comentários, 10.000 seguidores",
            steps: [
              "Curtidas: 500",
              "Comentários: 50",
              "Total de interações: 550",
              "Cálculo: (550 / 10.000) × 100 = 5,5%",
            ],
            result: "A publicação teve uma taxa de engajamento de 5,5% em relação ao total de seguidores do perfil.",
          },
          faqs: [
            { question: "O que é considerada uma boa taxa de engajamento?", answer: "Varia por nicho e tamanho de conta, mas geralmente entre 1% e 5% é considerado bom, e acima de 5% é considerado excelente na maioria dos nichos." },
            { question: "Devo calcular com base em seguidores ou alcance?", answer: "Ambos são usados; taxa baseada em seguidores mostra engajamento do público fiel, enquanto taxa baseada em alcance mostra desempenho da publicação específica." },
            { question: "Contas menores costumam ter taxas de engajamento maiores?", answer: "Sim, geralmente contas menores têm taxas de engajamento proporcionalmente mais altas do que contas muito grandes." },
            { question: "Compartilhamentos contam como interação?", answer: "Sim, compartilhamentos costumam ser incluídos no cálculo total de interações, junto com curtidas e comentários." },
          ],
        }}
      />
    </ToolLayout>
  );
}
