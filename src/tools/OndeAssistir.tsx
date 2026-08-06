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
          directAnswer: "A ferramenta 'Onde Assistir Hoje' reúne informações sobre em quais canais ou plataformas de streaming os jogos e eventos esportivos do dia estão sendo transmitidos.",
          howItWorks: "A ferramenta organiza a programação esportiva do dia, indicando os jogos disponíveis e em quais canais de TV aberta, fechada ou plataformas de streaming cada partida pode ser assistida, facilitando o planejamento de quem não quer perder nenhum jogo importante.",
          example: {
            title: "Exemplo: consultando os jogos de um sábado",
            steps: [
              "Data consultada: sábado",
              "Jogo 1: Campeonato Brasileiro — transmissão em canal fechado + streaming",
              "Jogo 2: Campeonato Europeu — transmissão apenas em streaming",
              "Horários organizados em ordem cronológica",
            ],
            result: "A consulta mostrou 2 jogos disponíveis no sábado, com suas respectivas transmissões e horários organizados.",
          },
          faqs: [
            { question: "A informação de transmissão é sempre atualizada?", answer: "A programação esportiva pode mudar por decisão das emissoras; sempre vale confirmar próximo ao horário do jogo." },
            { question: "Cobre apenas futebol?", answer: "Depende da abrangência da ferramenta; muitas dessas ferramentas focam em futebol, mas podem incluir outros esportes populares." },
            { question: "Mostra jogos de qualquer país?", answer: "Geralmente prioriza competições de maior interesse do público local, podendo incluir campeonatos internacionais relevantes." },
            { question: "Preciso de assinatura para assistir aos jogos indicados?", answer: "Depende do canal ou plataforma de cada transmissão — alguns jogos são exibidos em canais abertos, gratuitos, enquanto outros exigem assinatura paga." },
          ],
        }}
      />
    </ToolLayout>
  );
}
