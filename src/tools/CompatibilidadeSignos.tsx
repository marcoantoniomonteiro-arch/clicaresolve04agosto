import React, { useState, useMemo } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { Heart, AlertTriangle, Sparkles } from "lucide-react";
import { ToolContent } from "../components/ToolContent";

interface Props {
  onBack: () => void;
}

type NivelCompatibilidade = "Alta" | "Media" | "Desafiadora";

interface CompatibilidadeInfo {
  nivel: NivelCompatibilidade;
  descricao: string;
  pontosFortes: string[];
  pontosAtencao: string[];
}

const SIGNOS = [
  "Aries", "Touro", "Gemeos", "Cancer", "Leao", "Virgem",
  "Libra", "Escorpiao", "Sagitario", "Capricornio", "Aquario", "Peixes"
];

// Nomes como aparecem na tela (as chaves internas ficam sem acento)
const SIGNO_NOME: Record<string, string> = {
  Aries: "Áries", Touro: "Touro", Gemeos: "Gêmeos", Cancer: "Câncer", Leao: "Leão", Virgem: "Virgem",
  Libra: "Libra", Escorpiao: "Escorpião", Sagitario: "Sagitário", Capricornio: "Capricórnio", Aquario: "Aquário", Peixes: "Peixes",
};
const NIVEL_NOME: Record<NivelCompatibilidade, string> = { Alta: "Alta", Media: "Média", Desafiadora: "Desafiadora" };
const ELEMENTO_NOME: Record<string, string> = { Fogo: "Fogo", Terra: "Terra", Ar: "Ar", Agua: "Água" };

const COMPATIBILIDADES: Record<string, CompatibilidadeInfo> = {
  "Aries-Leao": { nivel: "Alta", descricao: "Dois signos de Fogo que se entusiasmam juntos. Muita energia, paixão e aventura.", pontosFortes: ["Paixão intensa", "Aventuras compartilhadas", "Mútuo incentivo"], pontosAtencao: ["Disputas de liderança", "Impulsos descontrolados", "Orgulho de ambos"] },
  "Aries-Sagitario": { nivel: "Alta", descricao: "Conexão natural de Fogo. Aventura, liberdade e otimismo definem essa parceria.", pontosFortes: ["Aventuras sem fim", "Independência mútua", "Entusiasmo contagiante"], pontosAtencao: ["Falta de compromisso", "Impaciência recíproca", "Evitar rotina"] },
  "Aries-Aquario": { nivel: "Media", descricao: "Áries traz ação, Aquário traz ideias. Parceria intelectual e dinâmica.", pontosFortes: ["Originalidade", "Independência valorizada", "Projetos inovadores"], pontosAtencao: ["Áries é mais impulsivo", "Aquário pode ser distante", "Dificuldade em se comprometer"] },
  "Aries-Gemeos": { nivel: "Media", descricao: "Energia e comunicação se encontram. Muita atividade, pouca rotina.", pontosFortes: ["Conversas intermináveis", "Espontaneidade", "Adaptabilidade"], pontosAtencao: ["Áries age, Gêmeos pensa", "Inconstância mútua", "Falta de profundidade"] },
  "Touro-Virgem": { nivel: "Alta", descricao: "Dois signos de Terra que valorizam estabilidade, lealdade e construção sólida.", pontosFortes: ["Lealdade inabalável", "Praticidade mútua", "Construção duradoura"], pontosAtencao: ["Teimosia de ambos", "Rotina excessiva", "Resistência a mudanças"] },
  "Touro-Capricornio": { nivel: "Alta", descricao: "Parceria estável e ambiciosa. Juntos constroem a longo prazo.", pontosFortes: ["Metas compartilhadas", "Compromisso sério", "Segurança mútua"], pontosAtencao: ["Excesso de seriedade", "Dificuldade em relaxar", "Trabalho acima do lazer"] },
  "Touro-Cancer": { nivel: "Alta", descricao: "Terra e Água: conforto, lar e emoção se fundem em harmonia.", pontosFortes: ["Cuidado mútuo", "Valorização do lar", "Lealdade profunda"], pontosAtencao: ["Ciúmes potenciais", "Apego ao passado", "Resistência a mudanças"] },
  "Touro-Peixes": { nivel: "Media", descricao: "Touro traz estabilidade, Peixes traz emoção. Complementação suave.", pontosFortes: ["Equilíbrio emocional", "Criatividade prática", "Cuidado genuíno"], pontosAtencao: ["Touro pode ser rígido", "Peixes pode se perder", "Comunicação diferente"] },
  "Gemeos-Libra": { nivel: "Alta", descricao: "Dois signos de Ar: comunicação, intelecto e sociabilidade fluem.", pontosFortes: ["Conversas estimulantes", "Vida social ativa", "Mútuo respeito"], pontosAtencao: ["Indecisão compartilhada", "Falta de profundidade", "Superficialidade"] },
  "Gemeos-Aquario": { nivel: "Alta", descricao: "Mentes brilhantes juntas. Inovação, liberdade e ideias sem fim.", pontosFortes: ["Originalidade", "Independência valorizada", "Intelecto afim"], pontosAtencao: ["Falta de ação prática", "Distância emocional", "Pouca rotina"] },
  "Gemeos-Leao": { nivel: "Media", descricao: "Ar e Fogo: muita energia mental e expressiva. Diversão garantida.", pontosFortes: ["Criatividade", "Carisma conjunto", "Ótima comunicação"], pontosAtencao: ["Ego de Leão", "Inconstância de Gêmeos", "Competição por atenção"] },
  "Cancer-Escorpiao": { nivel: "Alta", descricao: "Dois signos de Água: emoção profunda, intuição e lealdade total.", pontosFortes: ["Conexão emocional profunda", "Lealdade absoluta", "Intuição compartilhada"], pontosAtencao: ["Ciúmes recíproco", "Mudanças de humor", "Rancor potencial"] },
  "Cancer-Peixes": { nivel: "Alta", descricao: "Água com Água: sensibilidade, empatia e conexão espiritual.", pontosFortes: ["Empatia total", "Sonhos compartilhados", "Cuidado mútuo"], pontosAtencao: ["Emoções intensas demais", "Idealização excessiva", "Fugir da realidade"] },
  "Cancer-Touro": { nivel: "Alta", descricao: "Água e Terra: lar, conforto e segurança emocional.", pontosFortes: ["Lar acolhedor", "Lealdade mútua", "Estabilidade emocional"], pontosAtencao: ["Ciúmes", "Teimosia", "Apego excessivo"] },
  "Leao-Sagitario": { nivel: "Alta", descricao: "Fogo com Fogo: expansão, alegria e generosidade sem limites.", pontosFortes: ["Otimismo contagiante", "Grandes planos", "Generosidade mútua"], pontosAtencao: ["Orgulho ferido facilmente", "Exageros", "Falta de foco prático"] },
  "Leao-Aries": { nivel: "Alta", descricao: "Fogo duplo: paixão, ação e liderança compartilhada.", pontosFortes: ["Energia intensa", "Admiração mútua", "Conquistas ousadas"], pontosAtencao: ["Competição por liderança", "Impulsividade", "Orgulho"] },
  "Virgem-Capricornio": { nivel: "Alta", descricao: "Terra + Terra: trabalho, disciplina e metas sólidas.", pontosFortes: ["Dedicação mútua", "Realizações concretas", "Respeito e lealdade"], pontosAtencao: ["Exigência excessiva", "Crítica recíproca", "Pouco relaxamento"] },
  "Virgem-Touro": { nivel: "Alta", descricao: "Terra dupla: estabilidade, praticidade e lealdade duradoura.", pontosFortes: ["Construção sólida", "Confiança mútua", "Rotina organizada"], pontosAtencao: ["Teimosia", "Perfeccionismo", "Resistência a mudanças"] },
  "Libra-Aquario": { nivel: "Alta", descricao: "Ar com Ar: intelecto, idealismo e sociabilidade equilibrada.", pontosFortes: ["Ideias inovadoras", "Independência respeitada", "Amizade forte"], pontosAtencao: ["Distância emocional", "Decisões difíceis", "Pouca ação prática"] },
  "Libra-Gemeos": { nivel: "Alta", descricao: "Ar com Ar: comunicação fluida, charme e vida social ativa.", pontosFortes: ["Conversas estimulantes", "Parceria intelectual", "Versatilidade"], pontosAtencao: ["Superficialidade", "Indecisão", "Falta de compromisso"] },
  "Libra-Leao": { nivel: "Media", descricao: "Ar e Fogo: romance, charme e criatividade se encontram.", pontosFortes: ["Romance", "Estilo e graça", "Admiração mútua"], pontosAtencao: ["Ego de Leão", "Indecisão de Libra", "Competição por atenção"] },
  "Escorpiao-Peixes": { nivel: "Alta", descricao: "Água com Água: profundidade emocional, intuição e conexão espiritual.", pontosFortes: ["Intimidade profunda", "Lealdade total", "Transformação mútua"], pontosAtencao: ["Intensidade excessiva", "Ciúmes", "Dependência emocional"] },
  "Escorpiao-Cancer": { nivel: "Alta", descricao: "Água com Água: emoções profundas, segredos compartilhados.", pontosFortes: ["Confiança absoluta", "Intuição apurada", "Vínculo indissolúvel"], pontosAtencao: ["Manipulação", "Rancor", "Ciúmes"] },
  "Escorpiao-Virgem": { nivel: "Media", descricao: "Água e Terra: profundidade com praticidade. Análise e sentimento.", pontosFortes: ["Dedicação", "Lealdade", "Perfeccionismo útil"], pontosAtencao: ["Críticas de Virgem", "Intensidade de Escorpião", "Desconfiança"] },
  "Sagitario-Aries": { nivel: "Alta", descricao: "Fogo com Fogo: aventura, liberdade e entusiasmo desenfreado.", pontosFortes: ["Aventuras épicas", "Liberdade mútua", "Otimismo"], pontosAtencao: ["Impulsividade", "Falta de compromisso", "Inconsistência"] },
  "Sagitario-Leao": { nivel: "Alta", descricao: "Fogo com Fogo: grandiosidade, viagens e alegria de viver.", pontosFortes: ["Expansão", "Generosidade", "Entusiasmo"], pontosAtencao: ["Orgulho de Leão", "Impaciência de Sagitário", "Exageros"] },
  "Sagitario-Aquario": { nivel: "Media", descricao: "Fogo e Ar: ideias avançadas, liberdade e humanitarismo.", pontosFortes: ["Visão de futuro", "Independência", "Inovação"], pontosAtencao: ["Falta de ação prática", "Distância emocional", "Compromisso duvidoso"] },
  "Capricornio-Touro": { nivel: "Alta", descricao: "Terra com Terra: ambição, estabilidade e construção duradoura.", pontosFortes: ["Metas compartilhadas", "Lealdade", "Perseverança"], pontosAtencao: ["Trabalho demais", "Rigidez", "Pouca espontaneidade"] },
  "Capricornio-Virgem": { nivel: "Alta", descricao: "Terra com Terra: disciplina, trabalho e resultados concretos.", pontosFortes: ["Dedicação", "Responsabilidade", "Sucesso mútuo"], pontosAtencao: ["Cobrança excessiva", "Pouco relaxamento", "Perfeccionismo"] },
  "Capricornio-Escorpiao": { nivel: "Media", descricao: "Terra e Água: poder, determinação e estratégias profundas.", pontosFortes: ["Ambição compartilhada", "Determinação", "Lealdade"], pontosAtencao: ["Desconfiança", "Manipulação", "Controle"] },
  "Aquario-Gemeos": {nivel: "Alta", descricao: "Ar com Ar: ideias, originalidade e amizade acima de tudo.", pontosFortes: ["Mentalidade afim", "Independência", "Inovação"], pontosAtencao: ["Frieza emocional", "Indecisão", "Pouca profundidade"] },
  "Aquario-Libra": { nivel: "Alta", descricao: "Ar com Ar: idealismo, justiça e sociabilidade.", pontosFortes: ["Valores compartilhados", "Amizade forte", "Equilíbrio"], pontosAtencao: ["Distância emocional", "Indecisão", "Idealismo excessivo"] },
  "Aquario-Sagitario": { nivel: "Media",descricao: "Ar e Fogo: aventuras intelectuais, liberdade e visão de futuro.", pontosFortes: ["Expansão mental", "Independência", "Originalidade"], pontosAtencao: ["Pouco aterramento", "Frieza de Aquário", "Impaciência de Sagitário"] },
  "Peixes-Cancer": { nivel: "Alta", descricao: "Água com Água: emoções profundas, intuição e espiritualidade.", pontosFortes: ["Empatia total", "Romance", "Conexão espiritual"], pontosAtencao: ["Dependência emocional", "Fuga da realidade", "Confusão de limites"] },
  "Peixes-Escorpiao": { nivel: "Alta", descricao: "Água com Água: profundidade, transformação e intimidade.", pontosFortes: ["Intimidade profunda", "Lealdade", "Misticismo"], pontosAtencao: ["Intensidade demais", "Manipulação", "Mudanças de humor"] },
  "Peixes-Touro": { nivel: "Media", descricao: "Água e Terra: sonhos com praticidade, arte com estabilidade.", pontosFortes: ["Criatividade", "Cuidado", "Estabilidade emocional"], pontosAtencao: ["Touro rígido", "Peixes escapista", "Comunicação diferente"] },
};

function getCompatibilidade(signo1: string, signo2: string): CompatibilidadeInfo {
  const chave1 = `${signo1}-${signo2}`;
  const chave2 = `${signo2}-${signo1}`;

  if (COMPATIBILIDADES[chave1]) return COMPATIBILIDADES[chave1];
  if (COMPATIBILIDADES[chave2]) return COMPATIBILIDADES[chave2];

  const elementos: Record<string, string[]> = {
    Fogo: ["Aries", "Leao", "Sagitario"],
    Terra: ["Touro", "Virgem", "Capricornio"],
    Ar: ["Gemeos", "Libra", "Aquario"],
    Agua: ["Cancer", "Escorpiao", "Peixes"],
  };

  let el1 = "", el2 = "";
  for (const [el, signs] of Object.entries(elementos)) {
    if (signs.includes(signo1)) el1 = el;
    if (signs.includes(signo2)) el2 = el;
  }

  if (el1 === el2) {
    return {
      nivel: "Alta",
      descricao: `Mesmo elemento (${ELEMENTO_NOME[el1]}): afinidade natural e valores parecidos.`,
      pontosFortes: ["Entendimento natural", "Valores similares", "Harmonia básica"],
      pontosAtencao: ["Excesso de similaridades", "Possíveis conflitos de ego", "Falta de complementação"],
    };
  }

  const complementares = [
    ["Fogo", "Ar"], ["Terra", "Agua"], ["Ar", "Fogo"], ["Agua", "Terra"]
  ];
  const eComplementar = complementares.some(([a, b]) => (el1 === a && el2 === b) || (el1 === b && el2 === a));

  if (eComplementar) {
    return {
      nivel: "Media",
      descricao: `Elementos complementares (${ELEMENTO_NOME[el1]} + ${ELEMENTO_NOME[el2]}): um equilibra o outro.`,
      pontosFortes: ["Equilíbrio", "Complementação", "Aprendizado mútuo"],
      pontosAtencao: ["Diferenças de ritmo", "Possíveis conflitos", "Necessidade de adaptação"],
    };
  }

  return {
    nivel: "Desafiadora",
    descricao: `Elementos diferentes (${ELEMENTO_NOME[el1]} + ${ELEMENTO_NOME[el2]}): desafios e potencial de crescimento.`,
    pontosFortes: ["Crescimento mútuo", "Diversidade de experiências", "Superação de limites"],
    pontosAtencao: ["Muitas diferenças", "Necessidade de paciência", "Esforço extra"],
  };
}

const NIVEL_CORES: Record<NivelCompatibilidade, string> = {
  Alta: "text-green-400",
  Media: "text-yellow-400",
  Desafiadora: "text-orange-400",
};

const NIVEL_CORACOES: Record<NivelCompatibilidade, number> = {
  Alta: 5,
  Media: 3,
  Desafiadora: 1,
};

export function CompatibilidadeSignos({ onBack }: Props) {
  const [signo1, setSigno1] = useState("Aries");
  const [signo2, setSigno2] = useState("Leao");

  const compatibilidade = useMemo(() => getCompatibilidade(signo1, signo2), [signo1, signo2]);

  return (
    <ToolLayout
      title="Compatibilidade entre Signos"
      emoji="💞"
      category="Astrologia"
      description="Descubra a afinidade entre dois signos do zodíaco."
      onBack={onBack}
      affiliateBanner={
        <AffiliateBanner
          terms={["livro de compatibilidade de signos", "presente para casais"]}
          label="Para casais e curiosos"
        />
      }
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-xs text-gray-400 mb-1 block">Seu signo</span>
            <select
              value={signo1}
              onChange={(e) => setSigno1(e.target.value)}
              className="input-field"
            >
              {SIGNOS.map((s) => (
                <option key={s} value={s}>{SIGNO_NOME[s] || s}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-xs text-gray-400 mb-1 block">Signo do parceiro</span>
            <select
              value={signo2}
              onChange={(e) => setSigno2(e.target.value)}
              className="input-field"
            >
              {SIGNOS.map((s) => (
                <option key={s} value={s}>{SIGNO_NOME[s] || s}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="p-5 rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 text-center">
          <div className="flex justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Heart
                key={i}
                className={`w-6 h-6 ${i < NIVEL_CORACOES[compatibilidade.nivel] ? "text-pink-400 fill-pink-400" : "text-gray-600"}`}
              />
            ))}
          </div>
          <p className={`text-2xl font-black ${NIVEL_CORES[compatibilidade.nivel]}`}>
            Compatibilidade {NIVEL_NOME[compatibilidade.nivel]}
          </p>
          <p className="text-sm text-gray-300 mt-2">{compatibilidade.descricao}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-green-400" />
              <p className="text-xs text-green-400 font-semibold">Pontos fortes</p>
            </div>
            <ul className="space-y-1">
              {compatibilidade.pontosFortes.map((p, i) => (
                <li key={i} className="text-xs text-gray-300">+ {p}</li>
              ))}
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
              <p className="text-xs text-yellow-400 font-semibold">Atenção</p>
            </div>
            <ul className="space-y-1">
              {compatibilidade.pontosAtencao.map((p, i) => (
                <li key={i} className="text-xs text-gray-300">! {p}</li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center">
          A compatibilidade astrologica e um guia, não um destino. O livre arbitrio conta muito!
        </p>
      </div>
      <ToolContent
        toolName="Compatibilidade entre Signos"
        category="Astrologia"
        data={{
          directAnswer: "A compatibilidade entre signos é uma tradição da astrologia que associa características de personalidade a cada signo do zodíaco, sem comprovação científica.",
          howItWorks: "A ferramenta compara dois signos do zodíaco com base em características tradicionalmente atribuídas a cada um pela astrologia (elemento, modalidade, planeta regente) e apresenta um resultado de compatibilidade baseado nessas associações culturais e históricas. É importante destacar que a astrologia é uma tradição cultural e de entretenimento, sem base científica comprovada para prever relacionamentos reais.",
          example: {
            title: "Exemplo: comparando Áries com Libra",
            steps: [
              "Signo 1: Áries (elemento Fogo)",
              "Signo 2: Libra (elemento Ar)",
              "Análise: elementos considerados complementares na tradição astrológica",
              "Resultado: compatibilidade classificada como 'Média' (elementos complementares)",
            ],
            result: "Áries e Libra são tradicionalmente considerados compatíveis pela astrologia, por seus elementos (Fogo e Ar) serem vistos como complementares.",
          },
          faqs: [
            { question: "A compatibilidade de signos tem comprovação científica?", answer: "Não, a astrologia é uma tradição cultural sem validação científica; deve ser vista como entretenimento." },
            { question: "O que são os elementos dos signos?", answer: "Cada signo é associado a um dos 4 elementos: Fogo, Terra, Ar ou Água, usados na tradição astrológica para descrever características." },
            { question: "Compatibilidade baixa significa que o relacionamento não vai dar certo?", answer: "Não, relacionamentos reais dependem de fatores muito mais complexos do que a astrologia, como comunicação, valores e experiências compartilhadas." },
            { question: "Todos os astrólogos concordam com essas combinações?", answer: "Não necessariamente; a astrologia tem diferentes escolas e interpretações, e as combinações podem variar conforme a tradição seguida." },
          ],
        }}
      />
    </ToolLayout>
  );
}
