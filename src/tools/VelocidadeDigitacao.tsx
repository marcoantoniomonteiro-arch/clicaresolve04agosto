import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import React, { useState, useEffect, useMemo, useCallback } from "react";


import { RefreshCw, Trophy } from "lucide-react";
import { ToolContent } from "../components/ToolContent";

interface Props {
  onBack: () => void;
}

const TEXTOS_EXEMPLO = [
  "O desenvolvimento de softwares modernos exige cada vez mais atencão a questões de usabilidade e experiencia do usuario. Interfaces intuitivas e responsivas sao fundamentais para garantir que aplicacoes sejam acessiveis a todos os tipos de usuarios, independemente de seu nivel de conhecimento tecnologico.",
  "A tecnologia evolui rapidamente e transforma a maneira como nos comunicamos trabalhamos e vivemos. Smartphones inteligencia artificial e internet das coisas sao apenas algumas das inovacoes que revolucionaram nosso cotidiano nos ultimos anos.",
  "A educacao e a base para o desenvolvimento de qualquer sociedade. Investir em conhecimento e formacao de pessoas qualificadas garante um futuro mais prospero e sustentavel para todos os cidadaos de um pais.",
];

const CLASSIFICACOES = [
  { min: 0, max: 30, label: "Iniciante", cor: "text-gray-400" },
  { min: 30, max: 50, label: "Intermediario", cor: "text-blue-400" },
  { min: 50, max: 70, label: "Avancado", cor: "text-green-400" },
  { min: 70, max: 999, label: "Profissional", cor: "text-yellow-400" },
];

export function VelocidadeDigitacao({ onBack }: Props) {
  const [textoOriginal, setTextoOriginal] = useState("");
  const [digitado, setDigitado] = useState("");
  const [inicio, setInicio] = useState<number | null>(null);
  const [fim, setFim] = useState<number | null>(null);
  const [erros, setErros] = useState(0);

  useEffect(() => {
    novoTexto();
  }, []);

  const novoTexto = useCallback(() => {
    const texto = TEXTOS_EXEMPLO[Math.floor(Math.random() * TEXTOS_EXEMPLO.length)];
    setTextoOriginal(texto);
    setDigitado("");
    setInicio(null);
    setFim(null);
    setErros(0);
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const valor = e.target.value;

    if (!inicio && valor.length === 1) {
      setInicio(Date.now());
    }

    let errCount = 0;
    for (let i = 0; i < valor.length; i++) {
      if (valor[i] !== textoOriginal[i]) {
        errCount++;
      }
    }
    setErros(errCount);
    setDigitado(valor);

    if (valor.length >= textoOriginal.length && !fim) {
      setFim(Date.now());
    }
  }, [inicio, textoOriginal, fim]);

  const resultado = useMemo(() => {
    if (!inicio || !digitado) return null;

    const tempoFim = fim || Date.now();
    const tempoMs = tempoFim - inicio;
    const tempoMin = tempoMs / 60000;

    const palavrasCorretas = digitado.split(/\s+/).filter((p, i) => {
      const start = textoOriginal.indexOf(p);
      return start !== -1;
    }).length;

    const palavrasOriginais = textoOriginal.trim().split(/\s+/).length;
    const palavrasDigitadas = Math.min(digitado.trim().split(/\s+/).length, palavrasOriginais);
    const wpm = palavrasDigitadas / tempoMin;

    const charsCorretos = digitado.split("").filter((c, i) => c === textoOriginal[i]).length;
    const precisao = digitado.length > 0 ? (charsCorretos / digitado.length) * 100 : 0;

    const classificacao = CLASSIFICACOES.find((c) => wpm >= c.min && wpm < c.max) || CLASSIFICACOES[0];

    return { wpm, precisao, erros, tempoMinutos: tempoMin, classificacao };
  }, [inicio, fim, digitado, textoOriginal, erros]);

  return (
    <ToolLayout
      title="Velocidade de Digitacao"
      emoji="⌨️"
      category="Estudos"
      description="Teste sua velocidade de digitacao e veja sua classificacao."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["curso digitação teclado"]} label="curso digitação teclado" />}
    
    >
      <div className="space-y-5">
        <div className="p-4 rounded-xl bg-white/5 border border-white/8">
          <p className="text-xs text-gray-400 mb-2">Digite o texto abaixo:</p>
          <p className="text-sm text-gray-300 leading-relaxed select-none">
            {textoOriginal.split("").map((char, i) => {
              const dig = digitado[i];
              let cor = "text-gray-500";
              if (dig !== undefined) {
                cor = dig === char ? "text-green-400" : "text-red-400 bg-red-500/20";
              }
              if (dig !== undefined) {
                if (dig === char) cor = "text-green-400";
                else if (dig !== undefined) cor = "text-red-400 bg-red-500/20 rounded";
              } else {
                cor = "text-gray-500";
              }
              return (
                <span key={i} className={cor}>
                  {char}
                </span>
              );
            })}
          </p>
        </div>

        <textarea
          value={digitado}
          onChange={handleChange}
          placeholder="Comece a digitar aqui..."
          className="input-field w-full h-32 resize-none p-4"
          disabled={!!fim}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />

        {resultado && (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
                <p className="text-xs text-green-400">WPM</p>
                <p className="text-3xl font-black text-green-400">{resultado.wpm.toFixed(0)}</p>
                <p className="text-xs text-gray-500">palavras/min</p>
              </div>
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
                <p className="text-xs text-blue-400">Precisao</p>
                <p className="text-3xl font-black text-blue-400">{resultado.precisao.toFixed(0)}%</p>
              </div>
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-center">
                <p className="text-xs text-red-400">Erros</p>
                <p className="text-3xl font-black text-red-400">{resultado.erros}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span className="text-sm text-gray-400">Classificacao</span>
              </div>
              <span className={`text-xl font-bold ${resultado.classificacao.cor}`}>
                {resultado.classificacao.label}
              </span>
            </div>

            <p className="text-xs text-gray-500 text-center">
              Tempo: {(resultado.tempoMinutos * 60).toFixed(0)} segundos
            </p>
          </div>
        )}

        <button
          onClick={novoTexto}
          className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-400 hover:border-white/20 hover:text-white transition-all flex items-center justify-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Novo Texto
        </button>
      </div>
      <ToolContent
        toolName="Velocidade de Digitação"
        category="Utilidades"
        data={{
          directAnswer: "A velocidade de digitação é medida em palavras por minuto (PPM/WPM), calculada contando quantas palavras corretas foram digitadas em um intervalo de tempo determinado.",
          howItWorks: "A ferramenta exibe um texto para ser digitado e cronometra o tempo, calculando ao final a velocidade em palavras por minuto (WPM) e a porcentagem de precisão (considerando erros de digitação). É uma forma popular de treinar e medir a habilidade de digitação, útil para quem trabalha muito com teclado ou quer melhorar essa habilidade.",
          example: {
            title: "Exemplo: teste de digitação de 1 minuto",
            steps: [
              "Texto digitado no período: 220 caracteres",
              "Palavras corretas: 42",
              "Tempo do teste: 1 minuto",
              "Velocidade calculada: 42 WPM (palavras por minuto)",
            ],
            result: "Com 42 palavras corretas digitadas em 1 minuto, a velocidade de digitação registrada foi de 42 WPM, próxima da média geral.",
          },
          faqs: [
            { question: "Qual é considerada uma boa velocidade de digitação?", answer: "A média geral fica em torno de 40 WPM, enquanto digitadores profissionais costumam atingir 65-75+ WPM." },
            { question: "Erros de digitação afetam o resultado?", answer: "Sim, a precisão é calculada junto com a velocidade; muitos erros reduzem tanto a pontuação de precisão quanto o WPM líquido considerado." },
            { question: "Praticar regularmente aumenta a velocidade de digitação?", answer: "Sim, digitação é uma habilidade motora que melhora com prática consistente, assim como outras habilidades manuais." },
            { question: "O teste é feito só em português?", answer: "Depende da configuração da ferramenta; muitas oferecem testes em diferentes idiomas ou com textos variados." },
          ],
        }}
      />
    </ToolLayout>
  );
}
