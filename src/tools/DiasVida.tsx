import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import React, { useState, useEffect, useMemo } from "react";


import { Cake, Share2, Calendar, Clock, Star } from "lucide-react";
import { Gift, PartyPopper } from "lucide-react";

interface Props {
  onBack: () => void;
}

const MARCOS = [
  { dias: 100, emoji: "e2e" },
  { dias: 1000, emoji: "dizzy" },
  { dias: 5000, emoji: "star" },
  { dias: 10000, emoji: "rocket" },
  { dias: 15000, emoji: "stars" },
  { dias: 20000, emoji: "fire" },
  { dias: 25000, emoji: "trophy" },
  { dias: 30000, emoji: "crown" },
];

export function DiasVida({ onBack }: Props) {
  const [dataNascimento, setDataNascimento] = useState("");
  const [agora, setAgora] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setAgora(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const resultado = useMemo(() => {
    if (!dataNascimento) return null;

    const nascimento = new Date(dataNascimento + "T00:00:00");
    if (isNaN(nascimento.getTime())) return null;

    const diffMs = agora.getTime() - nascimento.getTime();
    if (diffMs < 0) return null;

    const dias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const semanas = Math.floor(dias / 7);
    const meses = Math.floor(dias / 30.44);
    const anos = Math.floor(dias / 365.25);
    const horas = Math.floor(diffMs / (1000 * 60 * 60));
    const minutos = Math.floor(diffMs / (1000 * 60));
    const segundos = Math.floor(diffMs / 1000);

    // Proximo marco
    const proximoMarco = MARCOS.find((m) => m.dias > dias);
    const diasAteProximoMarco = proximoMarco ? proximoMarco.dias - dias : null;

    // Marcos alcancados
    const marcosAlcancados = MARCOS.filter((m) => dias >= m.dias);

    return {
      dias,
      semanas,
      meses,
      anos,
      horas,
      minutos,
      segundos,
      proximoMarco,
      diasAteProximoMarco,
      marcosAlcancados,
    };
  }, [dataNascimento, agora]);

  const compartilhar = () => {
    if (!resultado) return;
    const texto = `🎂 Estou vivo ha ${resultado.dias.toLocaleString()} dias!\n\n` +
      `📅 ${resultado.anos} anos, ${resultado.meses} meses e ${resultado.dias % 30} dias\n` +
      `⏰ ${resultado.horas.toLocaleString()} horas\n` +
      `💓 ${resultado.minutos.toLocaleString()} minutos\n\n` +
      `_Calculado no CLICAresolve_`;
    const url = `https://wa.me/?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank");
  };

  const proximoAniversario = useMemo(() => {
    if (!dataNascimento) return null;

    const nascimento = new Date(dataNascimento + "T00:00:00");
    const hoje = new Date();
    const anoAtual = hoje.getFullYear();
    const aniversario = new Date(anoAtual, nascimento.getMonth(), nascimento.getDate());

    if (aniversario < hoje) {
      aniversario.setFullYear(anoAtual + 1);
    }

    const diff = aniversario.getTime() - hoje.getTime();
    const diasFaltando = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return { data: aniversario, diasFaltando };
  }, [dataNascimento]);

  return (
    <ToolLayout
      title="Contador de Dias de Vida"
      emoji="🎂"
      category="Utilidades"
      description="Descubra quantos dias, horas e minutos voce ja viveu."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["diário pessoal caderno"]} label="diário pessoal caderno" />}
    
    >
      <div className="space-y-5">
        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block flex items-center gap-2">
            <Cake className="w-4 h-4" /> Data de Nascimento
          </span>
          <input
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            className="input-field"
          />
        </label>

        {resultado && (
          <div className="space-y-4">
            <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-center">
              <p className="text-xs text-purple-400 mb-1">Dias de Vida</p>
              <p className="text-5xl font-black text-white">{resultado.dias.toLocaleString()}</p>
              <p className="text-sm text-gray-400 mt-1">
                {resultado.anos} anos, {resultado.meses - resultado.anos * 12} meses
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-white/5 text-center">
                <Calendar className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                <p className="text-xs text-gray-400">Semanas</p>
                <p className="text-lg font-bold text-white">{resultado.semanas.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 text-center">
                <Clock className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                <p className="text-xs text-gray-400">Horas</p>
                <p className="text-lg font-bold text-white">{resultado.horas.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 text-center">
                <p className="text-xs text-gray-400 mt-2">Minutos</p>
                <p className="text-lg font-bold text-white">{resultado.minutos.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 text-center">
                <p className="text-xs text-gray-400 mt-2">Segundos</p>
                <p className="text-lg font-bold text-white">{resultado.segundos.toLocaleString()}</p>
              </div>
            </div>

            {resultado.proximoMarco && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-amber-400" />
                  <p className="text-xs text-amber-400 font-semibold">Proximo Marco</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white">{resultado.proximoMarco.dias.toLocaleString()} dias</span>
                  <span className="text-sm text-amber-400">
                    Faltam {resultado.diasAteProximoMarco?.toLocaleString()} dias
                  </span>
                </div>
                <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all"
                    style={{ width: `${(resultado.dias / resultado.proximoMarco.dias) * 100}%` }}
                  />
                </div>
              </div>
            )}

            {resultado.marcosAlcancados.length > 0 && (
              <div className="p-4 rounded-xl bg-white/5 border border-white/8">
                <p className="text-xs text-gray-400 mb-2">Marcos Alcancados</p>
                <div className="flex flex-wrap gap-2">
                  {resultado.marcosAlcancados.map((m) => (
                    <span
                      key={m.dias}
                      className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold"
                    >
                      {m.dias.toLocaleString()} dias
                    </span>
                  ))}
                </div>
              </div>
            )}

            {proximoAniversario && (
              <div className="p-4 rounded-xl bg-pink-500/10 border border-pink-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Gift className="w-4 h-4 text-pink-400" />
                  <p className="text-xs text-pink-400 font-semibold">Proximo Aniversario</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white">
                    {proximoAniversario.data.toLocaleDateString("pt-BR", { day: "numeric", month: "long" })}
                  </span>
                  <span className="text-sm text-pink-400">
                    {proximoAniversario.diasFaltando} dias
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={compartilhar}
              className="w-full p-3 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 font-semibold flex items-center justify-center gap-2 hover:bg-green-500/30 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Compartilhar no WhatsApp
            </button>
          </div>
        )}
      </div>
      <ToolContent
        toolName="Contador de Dias de Vida"
        category="Utilidades"
        data={{
          directAnswer: "O total de dias vividos é calculado contando os dias corridos entre a data de nascimento e a data de hoje, já considerando os anos bissextos que aconteceram nesse período.",
          howItWorks: "A ferramenta pega a data de nascimento informada e calcula a diferença exata até a data de hoje em dias corridos, convertendo também esse total em semanas, meses e anos completos. O cálculo considera os anos bissextos ocorridos no intervalo (que têm 366 dias em vez de 365), o que evita o erro comum de simplesmente multiplicar '365 dias × anos de idade'. Além do total vivido, a ferramenta calcula quantos dias faltam para o próximo aniversário, comparando a data atual com o próximo dia e mês de nascimento que ainda vai ocorrer no calendário.",
          example: {
            title: "Exemplo: pessoa nascida em 10/05/1995",
            steps: [
              "Nascimento: 10/05/1995",
              "Hoje: 12/07/2026",
              "Total de dias vividos: 11.386 dias",
              "Equivalente: 31 anos, 2 meses e 2 dias",
            ],
            result: "Uma pessoa nascida em 10/05/1995 viveu 11.386 dias até 12/07/2026.",
          },
          faqs: [
            { question: "Como calcular quantos dias uma pessoa já viveu?", answer: "Basta contar os dias corridos entre a data de nascimento e hoje, levando em conta os anos bissextos que ocorreram no período — é exatamente esse cálculo que a ferramenta faz automaticamente ao informar a data de nascimento." },
            { question: "A ferramenta mostra quanto falta para o próximo aniversário?", answer: "Sim. Além do total de dias já vividos, ela calcula a contagem regressiva em dias até a próxima vez que o dia e mês de nascimento se repetirem no calendário." },
            { question: "O cálculo considera anos bissextos?", answer: "Sim, o resultado usa o calendário real com todos os anos bissextos (366 dias) ocorridos entre a data de nascimento e hoje, o que evita pequenas imprecisões que apareceriam numa conta simplificada." },
            { question: "Posso usar para calcular a idade em dias de outra pessoa, como meu filho?", answer: "Sim, a ferramenta funciona para qualquer data de nascimento que você informar — é bastante usada para acompanhar marcos de bebês (como os '1.000 dias de vida') ou apenas por curiosidade sobre datas marcantes." },
            { question: "Por que saber a idade em dias, e não só em anos?", answer: "Contar em dias é uma forma comum de celebrar marcos específicos (como completar 10.000 dias de vida) e também é usado em contextos médicos, principalmente no acompanhamento de bebês nos primeiros meses." },
          ],
        }}
      />
    </ToolLayout>
  );
}
