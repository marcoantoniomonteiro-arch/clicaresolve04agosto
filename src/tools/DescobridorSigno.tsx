import React, { useState, useMemo } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { Sun, Flame, Droplets, Wind, Mountain } from "lucide-react";
import { ToolContent } from "../components/ToolContent";

interface Props {
  onBack: () => void;
}

interface Signo {
  nome: string;
  emoji: string;
  elemento: "Fogo" | "Terra" | "Ar" | "Agua";
  qualidade: "Cardinal" | "Fixo" | "Mutavel";
  regente: string;
  caracteristicas: string[];
  inicio: { mes: number; dia: number };
  fim: { mes: number; dia: number };
}

const SIGNOS: Signo[] = [
  {
    nome: "Aries",
    emoji: "♈",
    elemento: "Fogo",
    qualidade: "Cardinal",
    regente: "Marte",
    caracteristicas: ["Corajoso e pioneiro", "Direto e honesto", "Impulsivo e energetico", "Lider nato"],
    inicio: { mes: 3, dia: 21 },
    fim: { mes: 4, dia: 19 },
  },
  {
    nome: "Touro",
    emoji: "♉",
    elemento: "Terra",
    qualidade: "Fixo",
    regente: "Venus",
    caracteristicas: ["Pratico e determinado", "Amante de conforto", "Paciente e leal", "Sensual e artistico"],
    inicio: { mes: 4, dia: 20 },
    fim: { mes: 5, dia: 20 },
  },
  {
    nome: "Gemeos",
    emoji: "♊",
    elemento: "Ar",
    qualidade: "Mutavel",
    regente: "Mercurio",
    caracteristicas: ["Comunicativo e curioso", "Versatil e adaptavel", "Intelectual e agil", "Social e divertido"],
    inicio: { mes: 5, dia: 21 },
    fim: { mes: 6, dia: 20 },
  },
  {
    nome: "Cancer",
    emoji: "♋",
    elemento: "Agua",
    qualidade: "Cardinal",
    regente: "Lua",
    caracteristicas: ["Emotivo e intutivo", "Protetor e carinhoso", "Ligado a familia e lar", "Sensivel e imaginativo"],
    inicio: { mes: 6, dia: 21 },
    fim: { mes: 7, dia: 22 },
  },
  {
    nome: "Leao",
    emoji: "♌",
    elemento: "Fogo",
    qualidade: "Fixo",
    regente: "Sol",
    caracteristicas: ["Carismatico e brilhante", "Criativo e expressivo", "Generoso e leal", "Orgulhoso e confiante"],
    inicio: { mes: 7, dia: 23 },
    fim: { mes: 8, dia: 22 },
  },
  {
    nome: "Virgem",
    emoji: "♍",
    elemento: "Terra",
    qualidade: "Mutavel",
    regente: "Mercurio",
    caracteristicas: ["Analitico e perfeccionista", "Trabalhador e organizado", "Modesto e util", "Detalhista e eficiente"],
    inicio: { mes: 8, dia: 23 },
    fim: { mes: 9, dia: 22 },
  },
  {
    nome: "Libra",
    emoji: "♎",
    elemento: "Ar",
    qualidade: "Cardinal",
    regente: "Venus",
    caracteristicas: ["Diplomata e harmonioso", "Sociavel e charmoso", "Busca equilibrio e justica", "Esteta e romatico"],
    inicio: { mes: 9, dia: 23 },
    fim: { mes: 10, dia: 22 },
  },
  {
    nome: "Escorpiao",
    emoji: "♏",
    elemento: "Agua",
    qualidade: "Fixo",
    regente: "Plutao",
    caracteristicas: ["Intenso e profundo", "Misterioso e magnetico", "Determinado e resiliente", "Transformador e poderoso"],
    inicio: { mes: 10, dia: 23 },
    fim: { mes: 11, dia: 21 },
  },
  {
    nome: "Sagitario",
    emoji: "♐",
    elemento: "Fogo",
    qualidade: "Mutavel",
    regente: "Jupiter",
    caracteristicas: ["Otimista e aventureiro", "Filosofico e livre", "Honesto e entusiasmado", "Explorador nato"],
    inicio: { mes: 11, dia: 22 },
    fim: { mes: 12, dia: 21 },
  },
  {
    nome: "Capricornio",
    emoji: "♑",
    elemento: "Terra",
    qualidade: "Cardinal",
    regente: "Saturno",
    caracteristicas: ["Ambicioso e disciplinado", "Responsavel e prudente", "Determinado e paciente", "Tradicional e serio"],
    inicio: { mes: 12, dia: 22 },
    fim: { mes: 1, dia: 19 },
  },
  {
    nome: "Aquario",
    emoji: "♒",
    elemento: "Ar",
    qualidade: "Fixo",
    regente: "Urano",
    caracteristicas: ["Original e independente", "Humanitario e visionario", "Intelectual e livre", "Inovador e rebelde"],
    inicio: { mes: 1, dia: 20 },
    fim: { mes: 2, dia: 18 },
  },
  {
    nome: "Peixes",
    emoji: "♓",
    elemento: "Agua",
    qualidade: "Mutavel",
    regente: "Netuno",
    caracteristicas: ["Sonhador e intuitivo", "Compassivo e artistico", "Espiritual e sensivel", "Empatico e profundo"],
    inicio: { mes: 2, dia: 19 },
    fim: { mes: 3, dia: 20 },
  },
];

function descobrirSigno(dataNascimento: string): Signo | null {
  if (!dataNascimento) return null;

  const partes = dataNascimento.split("-");
  const mes = parseInt(partes[1]);
  const dia = parseInt(partes[2]);

  for (const signo of SIGNOS) {
    if (signo.inicio.mes === 12 && signo.fim.mes === 1) {
      if ((mes === 12 && dia >= signo.inicio.dia) || (mes === 1 && dia <= signo.fim.dia)) {
        return signo;
      }
    } else {
      if (
        (mes === signo.inicio.mes && dia >= signo.inicio.dia) ||
        (mes === signo.fim.mes && dia <= signo.fim.dia) ||
        (mes > signo.inicio.mes && mes < signo.fim.mes)
      ) {
        return signo;
      }
    }
  }

  return null;
}

const ELEMENTO_CORES: Record<string, string> = {
  Fogo: "bg-red-500/20 border-red-500/30 text-red-400",
  Terra: "bg-amber-500/20 border-amber-500/30 text-amber-400",
  Ar: "bg-sky-500/20 border-sky-500/30 text-sky-400",
  Agua: "bg-blue-500/20 border-blue-500/30 text-blue-400",
};

const ELEMENTO_ICON: Record<string, React.ReactNode> = {
  Fogo: <Flame className="w-4 h-4" />,
  Terra: <Mountain className="w-4 h-4" />,
  Ar: <Wind className="w-4 h-4" />,
  Agua: <Droplets className="w-4 h-4" />,
};

export function DescobridorSigno({ onBack }: Props) {
  const [dataNascimento, setDataNascimento] = useState("");

  const signo = useMemo(() => descobrirSigno(dataNascimento), [dataNascimento]);

  return (
    <ToolLayout
      title="Descobridor de Signo"
      emoji="♈"
      category="Astrologia"
      description="Descubra seu signo solar e suas caracteristicas principais."
      onBack={onBack}
      affiliateBanner={
        <AffiliateBanner
          terms={["livro de astrologia para iniciantes", "mapa astral"]}
          label="Aprofunde-se na astrologia"
        />
      }
    >
      <div className="space-y-5">
        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Data de nascimento</span>
          <input
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            className="input-field"
          />
        </label>

        {signo && (
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-center">
              <p className="text-6xl mb-2">{signo.emoji}</p>
              <h2 className="text-3xl font-black text-white">{signo.nome}</h2>
              <p className="text-sm text-gray-400 mt-1">
                {signo.inicio.dia}/{String(signo.inicio.mes).padStart(2, "0")} - {signo.fim.dia}/{String(signo.fim.mes).padStart(2, "0")}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className={`p-3 rounded-xl ${ELEMENTO_CORES[signo.elemento]} border flex flex-col items-center`}>
                {ELEMENTO_ICON[signo.elemento]}
                <p className="text-xs mt-1 font-semibold">{signo.elemento}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <p className="text-xs text-gray-400">Qualidade</p>
                <p className="text-sm font-semibold text-white">{signo.qualidade}</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <p className="text-xs text-gray-400">Regente</p>
                <p className="text-sm font-semibold text-white">{signo.regente}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-gray-400 mb-2">Caracteristicas principais</p>
              <ul className="space-y-1">
                {signo.caracteristicas.map((c, i) => (
                  <li key={i} className="text-sm text-white flex items-center gap-2">
                    <Sun className="w-3 h-3 text-yellow-400" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {!signo && dataNascimento && (
          <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
            <p className="text-sm text-gray-400">Selecione uma data valida</p>
          </div>
        )}

        <p className="text-xs text-gray-500 text-center">
          O signo solar e determinado pela posicao do Sol no momento do seu nascimento
        </p>
      </div>
      <ToolContent
        toolName="Descobridor de Signo"
        category="Astrologia"
        data={{
          directAnswer: "O signo solar é determinado pela posição do Sol no momento do nascimento, definido pela data de aniversário dentro do calendário zodiacal.",
          howItWorks: "A ferramenta identifica o signo do zodíaco correspondente à data de nascimento informada, com base nas datas tradicionais de início e fim de cada signo (por exemplo, Áries vai de 21 de março a 19 de abril). Esse é o 'signo solar', o mais popularmente conhecido, embora a astrologia também considere outros elementos do mapa astral completo, como signo lunar e ascendente.",
          example: {
            title: "Exemplo: descobrindo o signo de quem nasceu em 5 de maio",
            steps: [
              "Data de nascimento: 5 de maio",
              "Período de Touro: 20 de abril a 20 de maio",
              "Verificação: 5 de maio está dentro do período de Touro",
              "Signo solar: Touro",
            ],
            result: "Quem nasce em 5 de maio tem o signo solar de Touro, segundo o calendário zodiacal tradicional.",
          },
          faqs: [
            { question: "O signo é definido só pela data de nascimento?", answer: "O signo solar (o mais conhecido) sim, mas o mapa astral completo também considera hora e local de nascimento para outros elementos, como ascendente." },
            { question: "Por que às vezes a data de início de um signo varia um dia?", answer: "Porque o zodíaco é baseado na posição real do Sol, que pode variar ligeiramente de ano para ano nas datas de transição entre signos." },
            { question: "O que é signo ascendente?", answer: "É o signo que estava subindo no horizonte no momento exato do nascimento, calculado com base na hora e local, e é diferente do signo solar." },
            { question: "Todo mundo do mesmo signo tem a mesma personalidade?", answer: "Não, segundo a própria tradição astrológica, personalidade é influenciada por muitos outros fatores do mapa astral completo, não apenas o signo solar." },
          ],
        }}
      />
    </ToolLayout>
  );
}
