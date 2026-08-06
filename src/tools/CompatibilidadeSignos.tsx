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

const COMPATIBILIDADES: Record<string, CompatibilidadeInfo> = {
  "Aries-Leao": { nivel: "Alta", descricao: "Dois signos de Fogo que se entusiasmam juntos. Muita energia, paixao e aventura.", pontosFortes: ["Paixao intensa", "Aventuras compartilhadas", "Mutuo incentivo"], pontosAtencao: ["Disputas de lideranca", "Impulsos descontrolados", "Orgulho de ambos"] },
  "Aries-Sagitario": { nivel: "Alta", descricao: "Conexao natural de Fogo. Aventura, liberdade e otimismo definem essa parceria.", pontosFortes: ["Aventuras sem fim", "Independencia mutua", "Entusiasmo contagiante"], pontosAtencao: ["Falta de compromisso", "Impaciencia reciproca", "Evitar rotina"] },
  "Aries-Aquario": { nivel: "Media", descricao: "Aries traz acao, Aquario traz ideias. Parceria intelectual e dinamica.", pontosFortes: ["Originalidade", "Independencia valorizada", "Projetos inovadores"], pontosAtencao: ["Aries e mais impulsivo", "Aquario pode ser distante", "Dificuldade em se comprometer"] },
  "Aries-Gemeos": { nivel: "Media", descricao: "Energia e comunicacao se encontram. Muita atividade, pouca rotina.", pontosFortes: ["Conversas interminaveis", "Espontaneidade", "Adaptabilidade"], pontosAtencao: ["Aries age, Gemeos pensa", "Inconstancia mutua", "Falta de profundidade"] },
  "Touro-Virgem": { nivel: "Alta", descricao: "Dois signos de Terra que valorizam estabilidade, lealdade e construcao solida.", pontosFortes: ["Lealdade inabalavel", "Praticidade mutua", "Construcao duradoura"], pontosAtencao: ["Teimosia de ambos", "Rotina excessiva", "Resistencia a mudancas"] },
  "Touro-Capricornio": { nivel: "Alta", descricao: "Parceria estavel e ambiciosa. Juntos constroem a longo prazo.", pontosFortes: ["Metas compartilhadas", "Compromisso serio", "Seguranca mutua"], pontosAtencao: ["Excesso de seriedade", "Dificuldade em relaxar", "Trabalho acima do lazer"] },
  "Touro-Cancer": { nivel: "Alta", descricao: "Terra e Agua: conforto, lar e emocao se fundem em harmonia.", pontosFortes: ["Cuidado mutuo", "Valorizacao do lar", "Lealdade profunda"], pontosAtencao: ["Ciumes potenciais", "Apego ao passado", "Resistencia a mudancas"] },
  "Touro-Peixes": { nivel: "Media", descricao: "Touro da estabilidade, Peixes traz emocoes. Complementacao suave.", pontosFortes: ["Equilibrio emocional", "Creatividade pratica", "Cuidado genuino"], pontosAtencao: ["Touro pode ser rigido", "Peixes pode se perder", "Comunicacao diferente"] },
  "Gemeos-Libra": { nivel: "Alta", descricao: "Dois signos de Ar: comunicacao, intelecto e sociabilidade fluem.", pontosFortes: ["Conversas estimulantes", "Vida social ativa", "Mutuo respeito"], pontosAtencao: ["Indecisao compartilhada", "Falta de profundidade", "Superficialidade"] },
  "Gemeos-Aquario": { nivel: "Alta", descricao: "Mentes brilhantes juntas. Inovacao, liberdade e ideias sem fim.", pontosFortes: ["Originalidade", "Independencia valorizada", "Intelecto afim"], pontosAtencao: ["Falta de acao pratica", "Distancia emocional", "Pouca rotina"] },
  "Gemeos-Leao": { nivel: "Media", descricao: "Ar e Fogo: muita energia mental e expressiva. Diversao garantida.", pontosFortes: ["Criatividade", "Carisma conjunto", "Otima comunicacao"], pontosAtencao: ["Ego de Leao", "Inconstancia de Gemeos", "Competicao por atencao"] },
  "Cancer-Escorpiao": { nivel: "Alta", descricao: "Dois signos de Agua: emocao profunda, intuicao e lealdade total.", pontosFortes: ["Conexao emocional profunda", "Lealdade absoluta", "Intuicao compartilhada"], pontosAtencao: ["Ciumes reciproco", "Mudancas de humor", "Rancor potencial"] },
  "Cancer-Peixes": { nivel: "Alta", descricao: "Agua com Agua: sensibilidade, empatia e conexao espiritual.", pontosFortes: ["Empatia total", "Sonhos compartilhados", "Cuidado mutuo"], pontosAtencao: ["Emocoes intensas demais", "Idealizacao excessiva", "Fugir da realidade"] },
  "Cancer-Touro": { nivel: "Alta", descricao: "Agua e Terra: lar, conforto e seguranca emocional.", pontosFortes: ["Lar acolhedor", "Lealdade mutua", "Estabilidade emocional"], pontosAtencao: ["Ciumes", "Teimosia", "Apego excessivo"] },
  "Leao-Sagitario": { nivel: "Alta", descricao: "Fogo com Fogo: expansao, alegria e generosidade sem limites.", pontosFortes: ["Otimismo contagiante", "Grandes planos", "Generosidade mutua"], pontosAtencao: ["Orgulho ferido facilmente", "Exageros", "Falta de foco pratico"] },
  "Leao-Aries": { nivel: "Alta", descricao: "Fogo duplo: paixao, acao e lideranca compartilhada.", pontosFortes: ["Energia intensa", "Admiracao mutua", "Conquistas ousadas"], pontosAtencao: ["Competicao por lideranca", "Impulsividade", "Orgulho"] },
  "Virgem-Capricornio": { nivel: "Alta", descricao: "Terra + Terra: trabalho, disciplina e metas solidas.", pontosFortes: ["Dedicacao mutua", "Realizacoes concretas", "Respeito e lealdade"], pontosAtencao: ["Exigencia excessiva", "Critica reciproca", "Pouco relaxamento"] },
  "Virgem-Touro": { nivel: "Alta", descricao: "Terra dupla: estabilidade, praticidade e lealdade duradoura.", pontosFortes: ["Construcao solida", "Confianca mutua", "Rotina organizada"], pontosAtencao: ["Teimosia", "Perfeccionismo", "Resistencia a mudancas"] },
  "Libra-Aquario": { nivel: "Alta", descricao: "Ar com Ar: intelecto, idealismo e sociabilidade equilibrada.", pontosFortes: ["Ideias inovadoras", "Independencia respeitada", "Amizade forte"], pontosAtencao: ["Distancia emocional", "Decisoes dificeis", "Pouca acao pratica"] },
  "Libra-Gemeos": { nivel: "Alta", descricao: "Ar com Ar: comunicacao fluida, charme e vida social ativa.", pontosFortes: ["Conversas estimulantes", "Parceria intelectual", "Versatilidade"], pontosAtencao: ["Superficialidade", "Indecisao", "Falta de compromisso"] },
  "Libra-Leao": { nivel: "Media", descricao: "Ar e Fogo: romance, charme e criatividade se encontram.", pontosFortes: ["Romance", "Estilo e graca", "Admiracao mutua"], pontosAtencao: ["Ego de Leao", "Indecisao de Libra", "Competicao por atencao"] },
  "Escorpiao-Peixes": { nivel: "Alta", descricao: "Agua com Agua: profundidade emocional, intuiçao e conexao espiritual.", pontosFortes: ["Intimidade profunda", "Lealdade total", "Transformacao mutua"], pontosAtencao: ["Intensidade excessiva", "Ciumes", "Dependencia emocional"] },
  "Escorpiao-Cancer": { nivel: "Alta", descricao: "Agua com Agua: emocoes profundas, segredos compartilhados.", pontosFortes: ["Confianca absoluta", "Intuição apurada", "Vinculo indissoluvel"], pontosAtencao: ["Manipulacao", "Rancor", "Ciumes"] },
  "Escorpiao-Virgem": { nivel: "Media", descricao: "Agua e Terra: profundidade com praticidade. Analise e sentimento.", pontosFortes: ["Dedicacao", "Lealdade", "Perfeccionismo util"], pontosAtencao: ["Criticas de Virgem", "Intensidade de Escorpiao", "Desconfianca"] },
  "Sagitario-Aries": { nivel: "Alta", descricao: "Fogo com Fogo: aventura, liberdade e entusiasmo desenfreado.", pontosFortes: ["Aventuras epicas", "Liberdade mutua", "Otimismo"], pontosAtencao: ["Impulsividade", "Falta de compromisso", "Inconsistencia"] },
  "Sagitario-Leao": { nivel: "Alta", descricao: "Fogo com Fogo: grandiosidade, viajes e alegria de viver.", pontosFortes: ["Expansao", "Generosidade", "Entusiasmo"], pontosAtencao: ["Orgulho de Leao", "Tatemba de Sagitario", "Exageros"] },
  "Sagitario-Aquario": { nivel: "Media", descricao: "Fogo e Ar: ideias avancadas, liberdade e humanitarismo.", pontosFortes: ["Visao de futuro", "Independencia", "Inovacao"], pontosAtencao: ["Falta de acao pratica", "Distancia emocional", "Compromisso duvidoso"] },
  "Capricornio-Touro": { nivel: "Alta", descricao: "Terra com Terra: ambicao, estabilidade e construçao duradoura.", pontosFortes: ["Metas compartilhadas", "Lealdade", "Perseveranca"], pontosAtencao: ["Trabalho demais", "Rigidez", "Pouca espontaneidade"] },
  "Capricornio-Virgem": { nivel: "Alta", descricao: "Terra com Terra: disciplina, trabalho e resultados concretos.", pontosFortes: ["Dedicacao", "Responsabilidade", "Sucesso mutuo"], pontosAtencao: ["Cobranca excessiva", "Pouco relaxamento", "Perfeccionismo"] },
  "Capricornio-Escorpiao": { nivel: "Media", descricao: "Terra e Agua: poder, determinacao e estrategias profundas.", pontosFortes: ["Ambicao compartilhada", "Determinacao", "Lealdade"], pontosAtencao: ["Desconfianca", "Manipulacao", "Controle"] },
  "Aquario-Gemeos": {nivel: "Alta", descricao: "Ar com Ar: ideias, originaldade e amizade acima de tudo.", pontosFortes: ["Mentalidade afim", "Independencia", "Inovação"], pontosAtencao: ["Frieza emocional", "Indecisao", "Pouca profundidade"] },
  "Aquario-Libra": { nivel: "Alta", descricao: "Ar com Ar: idealismo, justica e sociabilidade.", pontosFortes: ["Valores compartilhados", "Amizade forte", "Equilibrio"], pontosAtencao: ["Distancia emocional", "Indecisao", "Idealismo excessivo"] },
  "Aquario-Sagitario": { nivel: "Media",descricao: "Ar e Fogo: aventuras intelectuais, liberdade e visao de futuro.", pontosFortes: ["Expansao mental", "Independencia", "Originalidade"], pontosAtencao: ["Pouco aterramento", "Frieza de Aquario", "Impaciencia de Sagitario"] },
  "Peixes-Cancer": { nivel: "Alta", descricao: "Agua com Agua: emocoes profundas, intuição e espiritualidade.", pontosFortes: ["Empatia total", "Romance", "Conexao espiritual"], pontosAtencao: ["Dependencia emocional", "Fuga da realidade", "Confusão de limites"] },
  "Peixes-Escorpiao": { nivel: "Alta", descricao: "Agua com Agua: profundidade, transformacao e intimidade.", pontosFortes: ["Intimidade profunda", "Lealdade", "Misticismo"], pontosAtencao: ["Intensidade demais", "Manipulacao", "Mudancas de humor"] },
  "Peixes-Touro": { nivel: "Media", descricao: "Agua e Terra: sonhos com praticidade, arte com estabilidade.", pontosFortes: ["Creatividade", "Cuidado", "Estabilidade emocional"], pontosAtencao: ["Touro rigido", "Peixes escapista", "Comunicacao diferente"] },
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
      descricao: `Mesmo elemento (${el1}): afinidade natural e valores similares.`,
      pontosFortes: ["Entendimento natural", "Valores similares", "Harmonia basica"],
      pontosAtencao: ["Excesso de similaridades", "Possiveis conflitos de ego", "Falta de complementacao"],
    };
  }

  const complementares = [
    ["Fogo", "Ar"], ["Terra", "Agua"], ["Ar", "Fogo"], ["Agua", "Terra"]
  ];
  const eComplementar = complementares.some(([a, b]) => (el1 === a && el2 === b) || (el1 === b && el2 === a));

  if (eComplementar) {
    return {
      nivel: "Media",
      descricao: `Elementos complementares (${el1} + ${el2}): um equilibra o outro.`,
      pontosFortes: ["Equilibrio", "Complementacao", "Aprendizado mutuo"],
      pontosAtencao: ["Diferencas de ritmo", "Possiveis conflitos", "Necessidade de adaptacao"],
    };
  }

  return {
    nivel: "Desafiadora",
    descricao: `Elementos diferentes (${el1} + ${el2}): desafios e crescimento potencial.`,
    pontosFortes: ["Crescimento mutuo", "Diversidade de experiencias", "Superação de limites"],
    pontosAtencao: ["Muitas diferenças", "Necessidade de paciencia", "Esforço extra"],
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
      description="Descubra a afinidade entre dois signos do zodiaco."
      onBack={onBack}
      affiliateBanner={
        <AffiliateBanner
          terms={["livro de compatibilidade de signos", "presente para casais"]}
          label="Para casais e curiosoos"
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
                <option key={s} value={s}>{s}</option>
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
                <option key={s} value={s}>{s}</option>
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
            Compatibilidade {compatibilidade.nivel}
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
              <p className="text-xs text-yellow-400 font-semibold">Atencao</p>
            </div>
            <ul className="space-y-1">
              {compatibilidade.pontosAtencao.map((p, i) => (
                <li key={i} className="text-xs text-gray-300">! {p}</li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center">
          A compatibilidade astrologica e um guia, nao um destino. O livre arbitrio conta muito!
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
              "Resultado: compatibilidade classificada como 'Boa' segundo a tradição",
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
