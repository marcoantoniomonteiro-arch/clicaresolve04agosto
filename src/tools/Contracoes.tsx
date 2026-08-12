import React, { useState, useRef } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";

interface Props { onBack: () => void; }

interface Contracao {
  inicio: Date;
  duracao: number | null;
  intervalo: number | null;
}

export function Contracoes({ onBack }: Props) {
  const [contracoes, setContracoes] = useState<Contracao[]>([]);
  const [active, setActive] = useState(false);
  const activeStart = useRef<Date | null>(null);
  const [alerta511, setAlerta511] = useState(false);

  function registrar() {
    const agora = new Date();

    if (!active) {
      activeStart.current = agora;
      setActive(true);
      if (navigator.vibrate) navigator.vibrate(200);
    } else {
      const duracao = activeStart.current
        ? Math.round((agora.getTime() - activeStart.current.getTime()) / 1000)
        : null;

      setContracoes((prev) => {
        const last = prev[prev.length - 1];
        const intervalo =
          last && activeStart.current
            ? Math.round((activeStart.current.getTime() - last.inicio.getTime()) / 1000)
            : null;

        const nova: Contracao = { inicio: activeStart.current!, duracao, intervalo };
        const novas = [...prev, nova].slice(-10);

        // Check 5-1-1 pattern
        if (novas.length >= 3) {
          const ultimas = novas.slice(-3);
          const intervalosOk = ultimas.every((c) => c.intervalo !== null && c.intervalo <= 300);
          if (intervalosOk) setAlerta511(true);
        }

        return novas;
      });

      activeStart.current = null;
      setActive(false);
      if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
    }
  }

  function resetar() {
    setContracoes([]);
    setAlerta511(false);
    setActive(false);
    activeStart.current = null;
  }

  function fmtTime(d: Date) {
    return d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  }

  function fmtSec(s: number | null) {
    if (s === null) return "—";
    if (s < 60) return `${s}s`;
    return `${Math.floor(s / 60)}m${s % 60}s`;
  }

  return (
    <ToolLayout
      title="Cronômetro de Contrações"
      emoji="⏱️"
      category="Saúde"
      description="Registre e monitore contrações com alertas para o padrão 5-1-1."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["bolsa maternidade", "travesseiro amamentacao"]} label="Prepare sua bolsa maternidade" />}
      disclaimer="Esta ferramenta é puramente informativa. Não substitui consulta médica ou diagnóstico profissional. Consulte sempre um profissional de saúde habilitado."
    >
      <div className="space-y-4">
        {alerta511 && (
          <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/50 text-center animate-pulse">
            <p className="text-red-400 font-bold text-lg">INTERVALO DE ~5 MIN DETECTADO</p>
            <p className="text-red-300 text-sm">
              Suas últimas contrações estão com intervalo de cerca de 5 minutos. Esta é uma indicação simplificada baseada apenas no intervalo — não confirma sozinha a regra 5-1-1 completa (que também leva em conta duração de ~1 minuto e persistência por pelo menos 1 hora). Contate seu médico ou vá à maternidade para avaliação.
            </p>
          </div>
        )}

        <button
          onClick={registrar}
          className={`w-full py-8 rounded-2xl text-xl font-black transition-all duration-200 border-2 ${
            active
              ? "bg-red-500/20 border-red-500 text-red-400 hover:bg-red-500/30"
              : "bg-green-500/20 border-green-500 text-green-400 hover:bg-green-500/30"
          }`}
        >
          {active ? "⏹ PARAR CONTRAÇÃO" : "▶ REGISTRAR CONTRAÇÃO"}
        </button>

        <div className="text-center text-sm text-gray-400">
          {active ? <span className="text-red-400 font-semibold animate-pulse">Contração em andamento...</span> : `${contracoes.length} contrações registradas`}
        </div>

        {contracoes.length > 0 && (
          <div className="rounded-xl border border-white/8 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-white/5">
                <tr>
                  <th className="text-left p-3 text-gray-400 font-medium">#</th>
                  <th className="text-left p-3 text-gray-400 font-medium">Horário</th>
                  <th className="text-right p-3 text-gray-400 font-medium">Duração</th>
                  <th className="text-right p-3 text-gray-400 font-medium">Intervalo</th>
                </tr>
              </thead>
              <tbody>
                {[...contracoes].reverse().map((c, i) => (
                  <tr key={i} className="border-t border-white/5">
                    <td className="p-3 text-gray-500">{contracoes.length - i}</td>
                    <td className="p-3 text-white">{fmtTime(c.inicio)}</td>
                    <td className="p-3 text-right text-amber-400">{fmtSec(c.duracao)}</td>
                    <td className={`p-3 text-right font-medium ${c.intervalo !== null && c.intervalo <= 300 ? "text-red-400" : "text-gray-300"}`}>
                      {fmtSec(c.intervalo)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {contracoes.length > 0 && (
          <button onClick={resetar} className="w-full py-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-white text-sm transition-colors">
            Resetar tudo
          </button>
        )}
      </div>
      <ToolContent
        toolName="Cronômetro de Contrações"
        category="Saúde"
        data={{
          directAnswer: "O cronômetro de contrações registra a duração de cada contração e o intervalo entre elas, ajudando a identificar o momento de ir para a maternidade.",
          howItWorks: "A ferramenta cronometra cada contração (do início ao fim) e calcula automaticamente o intervalo entre o início de uma contração e o início da seguinte. Esses dois dados — duração e frequência — são acompanhados pelos médicos para avaliar o estágio do trabalho de parto. Um padrão comum observado é a 'regra 5-1-1': contrações a cada 5 minutos, durando 1 minuto, por pelo menos 1 hora.",
          example: {
            title: "Exemplo: registrando 3 contrações consecutivas",
            steps: [
              "Contração 1: início 14h00, duração 45 segundos",
              "Contração 2: início 14h06, duração 50 segundos",
              "Contração 3: início 14h11, duração 55 segundos",
              "Intervalo médio entre contrações: aproximadamente 5-6 minutos",
            ],
            result: "Com contrações a cada 5-6 minutos e duração aumentando, é recomendado entrar em contato com o médico ou maternidade para orientação.",
          },
          faqs: [
            { question: "Quando devo ir para a maternidade?", answer: "Isso varia por gestação; siga sempre a orientação específica do seu médico ou obstetra." },
            { question: "O que é a regra 5-1-1?", answer: "Um padrão de referência: contrações a cada 5 minutos, durando 1 minuto, por pelo menos 1 hora — mas cada caso deve ser avaliado individualmente." },
            { question: "O alerta da ferramenta confirma a regra 5-1-1 completa?", answer: "Não. O alerta é uma indicação simplificada baseada apenas no intervalo entre as contrações. Duração de cerca de 1 minuto e persistência por pelo menos 1 hora — as outras partes da regra 5-1-1 — não são verificadas automaticamente; avalie esses pontos você mesma ou com seu médico." },
            { question: "A ferramenta substitui acompanhamento médico?", answer: "Não, é uma ferramenta de apoio para registro. O acompanhamento médico durante o trabalho de parto é essencial." },
            { question: "Posso registrar contrações irregulares?", answer: "Sim, a ferramenta registra cada contração individualmente, mesmo que os intervalos não sejam regulares no início do trabalho de parto." },
          ],
        }}
      />
    </ToolLayout>
  );
}
