import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import React from "react";


import { CONFIG } from "../config";

interface Props { onBack: () => void; }

interface Canal {
  emoji: string;
  nome: string;
  tipo: "aberta" | "fechada" | "streaming";
  descricao: string;
}

const CANAIS: Canal[] = [
  { emoji: "📡", nome: "Band", tipo: "aberta", descricao: "Fórmula 1, Jogos Olímpicos, futebol nacional" },
  { emoji: "📡", nome: "Record", tipo: "aberta", descricao: "Transmissões esporádicas de futebol e lutas" },
  { emoji: "📡", nome: "SBT", tipo: "aberta", descricao: "Copa do Mundo, eventos internacionais" },
  { emoji: "📺", nome: "SporTV 1/2/3", tipo: "fechada", descricao: "Futebol brasileiro, Copa Libertadores, ciclismo, atletismo" },
  { emoji: "📺", nome: "ESPN / ESPN2", tipo: "fechada", descricao: "NBA, NFL, tênis Grand Slams, MLB, NHL" },
  { emoji: "📺", nome: "TNT Sports", tipo: "fechada", descricao: "Champions League, Europa League, basquete FIBA" },
  { emoji: "📺", nome: "Cazé TV (YouTube)", tipo: "fechada", descricao: "Transmissões gratuitas — futebol, MMA, boxe, NBA" },
  { emoji: "📺", nome: "Fox Sports", tipo: "fechada", descricao: "UFC, futebol europeu, automobilismo" },
  { emoji: "🖥️", nome: "Amazon Prime Video", tipo: "streaming", descricao: "NFL (exclusive), Brasileirão Série A, MotoGP" },
  { emoji: "🖥️", nome: "Globoplay", tipo: "streaming", descricao: "Brasileirão, Copa do Brasil, Copas da FIFA" },
  { emoji: "🖥️", nome: "Disney+ / Star+", tipo: "streaming", descricao: "ESPN+: NFL, NBA, UFC, tênis, futebol europeu" },
  { emoji: "🖥️", nome: "YouTube — Cazé TV", tipo: "streaming", descricao: "100% gratuito — eventos ao vivo sem assinatura" },
  { emoji: "🖥️", nome: "DAZN", tipo: "streaming", descricao: "Boxe, MMA, futebol europeu de menor expressão" },
];

const TIPO_LABELS: Record<Canal["tipo"], { label: string; color: string }> = {
  aberta: { label: "TV Aberta", color: "text-green-400 bg-green-400/10 border-green-400/20" },
  fechada: { label: "TV Fechada", color: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
  streaming: { label: "Streaming", color: "text-purple-400 bg-purple-400/10 border-purple-400/20" },
};

const GRUPOS: Canal["tipo"][] = ["aberta", "fechada", "streaming"];

export function OndeAssistir({ onBack }: Props) {
  return (
    <ToolLayout
      title="Onde Assistir Hoje"
      emoji="📺"
      category="Esportes"
      description="Guia completo dos canais esportivos do Brasil — TV aberta, fechada e streaming."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["suporte tv parede"]} label="suporte tv parede" />}
      disclaimer="Esta é uma referência geral de quais canais e plataformas costumam transmitir cada tipo de conteúdo esportivo — não é uma agenda de jogos do dia. Direitos de transmissão mudam com o tempo; para saber onde um jogo específico vai passar, confirme diretamente com o canal ou a competição."
    >
      <div className="space-y-6">
        {/* Banners */}
        <div className="grid grid-cols-1 gap-3">
          <a
            href={CONFIG.linkPrime}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between gap-3 p-3 rounded-xl bg-green-600/20 border border-green-600/40 hover:bg-green-600/30 transition-colors"
          >
            <span className="text-sm text-green-400 font-semibold">📺 Assine o Amazon Prime Video e assista ao Brasileirão + NFL</span>
            <span className="text-xs text-green-300 shrink-0 underline">Assinar</span>
          </a>
        </div>

        {GRUPOS.map((tipo) => {
          const label = TIPO_LABELS[tipo];
          const canais = CANAIS.filter((c) => c.tipo === tipo);
          return (
            <div key={tipo}>
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold mb-3 ${label.color}`}>
                {label.label}
              </div>
              <div className="space-y-2">
                {canais.map((canal) => (
                  <div key={canal.nome} className="flex items-start gap-3 p-3 rounded-xl bg-white/3 border border-white/8">
                    <span className="text-xl shrink-0 mt-0.5">{canal.emoji}</span>
                    <div>
                      <p className="text-sm font-semibold text-white">{canal.nome}</p>
                      <p className="text-xs text-gray-400 leading-relaxed">{canal.descricao}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <ToolContent
        toolName="Onde Assistir Hoje"
        category="Esportes"
        data={{
          directAnswer: "Esta ferramenta reúne, por tipo de conteúdo esportivo, quais canais de TV aberta, TV fechada e plataformas de streaming costumam transmitir cada modalidade no Brasil — é um guia geral de referência, não uma agenda com os jogos específicos do dia.",
          howItWorks: "A ferramenta organiza os principais canais e plataformas esportivas do Brasil em três grupos (TV aberta, TV fechada e streaming), indicando de forma geral que tipo de competição cada um costuma exibir — por exemplo, que a ESPN geralmente transmite NBA e tênis, ou que o Amazon Prime Video tem a NFL. A ideia é ajudar a decidir qual canal ou assinatura faz sentido para acompanhar os esportes que você gosta, não mostrar o placar ou horário de uma partida específica. Como direitos de transmissão mudam com contratos e temporadas, vale sempre confirmar com o canal a programação exata de um jogo específico.",
          example: {
            title: "Exemplo: quero saber onde assistir futebol europeu",
            steps: [
              "Consulto os grupos de TV fechada e streaming na lista",
              "TNT Sports (TV fechada): Champions League, Europa League",
              "Disney+ / Star+ (streaming, via ESPN+): futebol europeu, NBA, UFC",
              "DAZN (streaming): futebol europeu de menor expressão",
            ],
            result: "Com base na lista, dá pra ver que TNT Sports, Disney+/Star+ e DAZN são os canais/plataformas mais relevantes para futebol europeu no Brasil — mas o jogo específico que você quer assistir ainda precisa ser confirmado na programação do canal.",
          },
          faqs: [
            { question: "Essa ferramenta mostra os jogos de hoje e seus horários?", answer: "Não. É uma lista de referência sobre qual canal ou plataforma costuma transmitir cada tipo de esporte, não uma agenda ao vivo com jogos e horários do dia. Para saber o horário de um jogo específico, consulte diretamente o canal ou a competição." },
            { question: "Essa lista de canais é sempre atualizada?", answer: "Os direitos de transmissão de competições esportivas mudam periodicamente (por licitação, fim de contrato, etc.), então a associação entre canal e competição pode mudar com o tempo. Trate como uma referência geral, não como garantia definitiva." },
            { question: "Cobre apenas futebol?", answer: "Não — a lista inclui canais e plataformas com conteúdo de diversos esportes, como NBA, NFL, UFC, tênis, automobilismo e ciclismo, além de futebol nacional e internacional." },
            { question: "Preciso de assinatura para assistir ao conteúdo listado?", answer: "Depende do canal ou plataforma: alguns (como TV aberta e o YouTube da Cazé TV) são gratuitos, enquanto TV fechada e a maioria dos serviços de streaming exigem assinatura paga." },
          ],
        }}
      />
    </ToolLayout>
  );
}
