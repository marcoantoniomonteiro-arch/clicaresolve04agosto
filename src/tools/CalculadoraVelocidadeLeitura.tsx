import React, { useState, useMemo } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { Gauge, Mic, AudioLines } from "lucide-react";

interface Props {
  onBack: () => void;
}

const RITMOS = [
  { label: "Lento", ppm: 110, icon: Mic, color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20" },
  { label: "Normal", ppm: 150, icon: AudioLines, color: "text-green-400", bg: "bg-green-400/10 border-green-400/20" },
  { label: "Rápido", ppm: 190, icon: Gauge, color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/20" },
];

function formatTime(totalSeconds: number): string {
  if (totalSeconds < 1) return "0 segundos";
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.round(totalSeconds % 60);
  if (minutes === 0) return `${seconds} segundos`;
  if (seconds === 0) return `${minutes} minuto${minutes > 1 ? "s" : ""}`;
  return `${minutes} minuto${minutes > 1 ? "s" : ""} e ${seconds} segundo${seconds > 1 ? "s" : ""}`;
}

export function CalculadoraVelocidadeLeitura({ onBack }: Props) {
  const [text, setText] = useState("");

  const wordCount = useMemo(() => {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  }, [text]);

  return (
    <ToolLayout
      title="Calculadora de Velocidade de Leitura"
      emoji="🎙️"
      category="Utilidades"
      description="Calcule quanto tempo seu roteiro leva para ser narrado em voz alta, em três ritmos diferentes."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["velocidade leitura"]} label="velocidade leitura" />}
    >
      <div className="space-y-4">
        <div>
          <span className="text-sm text-gray-400 mb-1 block">Cole seu roteiro ou texto aqui</span>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="input-field text-sm w-full min-h-[200px] resize-y"
            placeholder="Cole aqui o roteiro que será narrado em voz alta..."
          />
          <p className="text-xs text-gray-500 mt-1">{wordCount.toLocaleString("pt-BR")} palavras</p>
        </div>

        {wordCount > 0 ? (
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white">Tempo estimado de narração</h3>
            {RITMOS.map((ritmo) => {
              const totalSeconds = (wordCount / ritmo.ppm) * 60;
              const Icon = ritmo.icon;
              return (
                <div key={ritmo.label} className={`p-4 rounded-xl border ${ritmo.bg} flex items-center gap-4`}>
                  <Icon className={`w-8 h-8 ${ritmo.color} shrink-0`} />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{ritmo.label}</p>
                    <p className="text-xs text-gray-500">{ritmo.ppm} palavras/minuto</p>
                  </div>
                  <p className={`text-lg font-bold ${ritmo.color} text-right`}>{formatTime(totalSeconds)}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <Mic className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Cole um roteiro para ver o tempo estimado de narração</p>
          </div>
        )}
      </div>

      <ToolContent
        toolName="Velocidade de Leitura"
        category="Utilidades"
        data={{
          directAnswer: "O tempo de leitura em voz alta de um texto é calculado dividindo o número de palavras pela velocidade de fala (palavras por minuto), que varia entre ritmo lento, normal e rápido.",
          howItWorks: "A ferramenta conta o número de palavras do texto colado e calcula quanto tempo levaria para ser narrado em voz alta, considerando três ritmos de fala diferentes: lento (110 palavras/minuto, comum em narrações pausadas ou didáticas), normal (150 palavras/minuto, ritmo de conversação natural) e rápido (190 palavras/minuto, comum em vídeos dinâmicos ou apresentadores experientes). É muito útil para criadores de conteúdo, produtores de podcast e roteiristas que precisam calcular a duração de um vídeo ou episódio antes de gravar.",
          example: {
            title: "Exemplo: calculando a duração de um roteiro de 450 palavras",
            steps: [
              "Roteiro colado: 450 palavras",
              "Ritmo lento (110 ppm): 450/110 = 4 minutos e 5 segundos",
              "Ritmo normal (150 ppm): 450/150 = 3 minutos",
              "Ritmo rápido (190 ppm): 450/190 = 2 minutos e 22 segundos",
            ],
            result: "Dependendo do ritmo de narração escolhido, o vídeo terá entre 2 e 4 minutos de duração aproximada.",
          },
          faqs: [
            { question: "Essas velocidades de fala são universais?", answer: "São médias de referência comuns em produção de conteúdo; a velocidade real de cada narrador pode variar um pouco para mais ou para menos." },
            { question: "Serve para calcular podcasts também?", answer: "Sim, funciona para qualquer roteiro que será narrado em voz alta: vídeos, podcasts, audiolivros, apresentações." },
            { question: "A ferramenta considera pausas do roteiro?", answer: "Não, o cálculo é baseado apenas na contagem de palavras; pausas dramáticas ou de respiração não são contabilizadas automaticamente." },
            { question: "Meu texto é enviado para algum servidor?", answer: "Não, toda a contagem e cálculo acontece localmente no seu navegador." },
          ],
        }}
      />
    </ToolLayout>
  );
}
