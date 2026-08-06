import React, { useState, useMemo } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { Calculator, Sparkles } from "lucide-react";
import { ToolContent } from "../components/ToolContent";

interface Props {
  onBack: () => void;
}

interface NumeroInfo {
  titulo: string;
  descricao: string;
  caracteristicas: string[];
  desafios: string[];
  cores: string[];
}

const NUMEROS: Record<number, NumeroInfo> = {
  1: {
    titulo: "O Lider",
    descricao: "Pioneiros, independentes e determinados. Nascem para comandar e inovar.",
    caracteristicas: ["Independencia", "Lideranca", "Originalidade", "Determinacao"],
    desafios: ["Arrogancia", "Impaciencia", "Egoismo", "Teimosia"],
    cores: ["Vermelho", "Dourado", "Laranja"],
  },
  2: {
    titulo: "O Diplomata",
    descricao: "Pacificadores, intuitivos e cooperativos. Trazem harmonia e parceria.",
    caracteristicas: ["Cooperacao", "Sensibilidade", "Paciencia", "Intuicao"],
    desafios: ["Indecisao", "Dependencia", "Passividade", "Oversensibilidade"],
    cores: ["Branco", "Prata", "Verde claro"],
  },
  3: {
    titulo: "O Comunicador",
    descricao: "Expressivos, criaros e otimistas. Trazem alegria e arte ao mundo.",
    caracteristicas: ["Criatividade", "Comunicacao", "Otimismo", "Expressao"],
    desafios: ["Superficialidade", "Dispersao", "Exagero", "Imaturidade"],
    cores: ["Amarelo", "Rosa", "Azul claro"],
  },
  4: {
    titulo: "O Construtor",
    descricao: "Praticos, trabalhardores e disciplinados. Constroem alicerces solidos.",
    caracteristicas: ["Organizacao", "Disciplina", "Estabilidade", "Trabalho duro"],
    desafios: ["Rigidez", "Teimosia", "Pessimismo", "Controle"],
    cores: ["Verde escuro", "Marrom", "Cinza"],
  },
  5: {
    titulo: "O Liberdade",
    descricao: "Aventureiros, versaceis e curiosos. Buscam liberdade e novas experiencias.",
    caracteristicas: ["Liberdade", "Aventura", "Versatilidade", "Curiosidade"],
    desafios: ["Inquietude", "Impulsividade", "Inconstancia", "Escapismo"],
    cores: ["Azul turquesa", "Lils", "Prata"],
  },
  6: {
    titulo: "O Nutridor",
    descricao: "Amorosos, responsaveis e harmoniosos. Cuidam da familia e do lar.",
    caracteristicas: ["Amor", "Responsabilidade", "Harmonia", "Cuidado"],
    desafios: ["Autossacrificio", "Preocupacao excessiva", "Perfeccionismo", "Controle"],
    cores: ["Rosa", "Azul", "Indigo"],
  },
  7: {
    titulo: "O Buscador",
    descricao: "Analiticos, espirituais e introspectivos. Buscam verdades profundas.",
    caracteristicas: ["Sabedoria", "Introspeccao", "Espiritualidade", "Analise"],
    desafios: ["Isolamento", "Ceticismo", "Frieza", "Distanciamento"],
    cores: ["Violeta", "Roxo", "Branco"],
  },
  8: {
    titulo: "O Poder",
    descricao: "Ambiciosos, executivos e materialistas. Atingem sucesso e autoridade.",
    caracteristicas: ["Sucesso", "Autoridade", "Organizacao", "Prosperidade"],
    desafios: ["Ambicao cega", "Materialismo", "Controle", "Arrogancia"],
    cores: ["Dourado", "Preto", "Cinza escuro"],
  },
  9: {
    titulo: "O Humanitario",
    descricao: "Compassivos, universais e artisticos. Servem a humanidade.",
    caracteristicas: ["Compaixao", "Universalidade", "Generosidade", "Sabedoria"],
    desafios: ["Desapego excessivo", "Vitimizacao", "Idealismo irreal", "Emocoes ciclicas"],
    cores: ["Dourado", "Vermelho", "Rosa"],
  },
  11: {
    titulo: "O Mestre Iluminador",
    descricao: "Numeros mestres trazem maior potencial espiritual e intuicao. Visionarios e inspiradores.",
    caracteristicas: ["Intuicao elevada", "Inspiracao", "Visionario", "Espiritualidade"],
    desafios: ["Nervosismo", "Autocrítica", "Idealismo excessivo", "Pressao interna"],
    cores: ["Prata", "Violeta", "Dourado"],
  },
  22: {
    titulo: "O Mestre Construtor",
    descricao: "Numeros mestres trazem maior potencial de realizacao. Constroem grandes projetos.",
    caracteristicas: ["Mestre construtor", "Visao pratica", "Lideranca global", "Realizacoes"],
    desafios: ["Pressao enorme", "Autocobranca", "Rigidez", "Desesperanca"],
    cores: ["Dourado", "Branco", "Preto"],
  },
};

function calcularNumeroDestino(dataNascimento: string): number {
  const nums = dataNascimento.replace(/\D/g, "");
  let soma = 0;
  for (const num of nums) {
    soma += parseInt(num);
  }

  while (soma > 9 && soma !== 11 && soma !== 22) {
    let novaSoma = 0;
    const digitos = soma.toString();
    for (const d of digitos) {
      novaSoma += parseInt(d);
    }
    soma = novaSoma;
  }

  return soma;
}

export function MapaNumerologico({ onBack }: Props) {
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  const numeroDestino = useMemo(() => {
    if (!dataNascimento) return null;
    return calcularNumeroDestino(dataNascimento);
  }, [dataNascimento]);

  const info = numeroDestino ? NUMEROS[numeroDestino] : null;

  const corGradiente = numeroDestino === 11
    ? "from-purple-500/20 to-indigo-500/20 border-purple-500/30"
    : numeroDestino === 22
    ? "from-amber-500/20 to-orange-500/20 border-amber-500/30"
    : "from-blue-500/20 to-cyan-500/20 border-blue-500/30";

  return (
    <ToolLayout
      title="MapaNumerologico"
      emoji="🔢"
      category="Astrologia"
      description="Descubra seu Nmero do Destino baseado na sua data de nascimento."
      onBack={onBack}
      affiliateBanner={
        <AffiliateBanner
          terms={["livro de numerologia", "numerologia cabalistica"]}
          label="Aprofunde-se na numerologia"
        />
      }
    >
      <div className="space-y-5">
        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Nome completo (opcional)</span>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome completo"
            className="input-field"
          />
        </label>

        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Data de nascimento</span>
          <input
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            className="input-field"
          />
        </label>

        {numeroDestino && info && (
          <div className="space-y-4">
            <div className={`p-6 rounded-2xl bg-gradient-to-br ${corGradiente} text-center`}>
              <div className="flex items-center justify-center gap-2 mb-2">
                {numeroDestino >= 11 && <Sparkles className="w-5 h-5 text-yellow-400" />}
                <p className="text-xs text-gray-400">Numero do Destino</p>
              </div>
              <p className="text-6xl font-black text-white mb-2">{numeroDestino}</p>
              <p className="text-xl font-bold text-blue-400">{info.titulo}</p>
              <p className="text-sm text-gray-300 mt-2">{info.descricao}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                <p className="text-xs text-green-400 font-semibold mb-2">Caracteristicas</p>
                <ul className="space-y-1">
                  {info.caracteristicas.map((c, i) => (
                    <li key={i} className="text-sm text-gray-300">{c}</li>
                  ))}
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                <p className="text-xs text-red-400 font-semibold mb-2">Desafios</p>
                <ul className="space-y-1">
                  {info.desafios.map((d, i) => (
                    <li key={i} className="text-sm text-gray-300">{d}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-xs text-gray-400 mb-2">Cores favoraveis</p>
              <div className="flex gap-2">
                {info.cores.map((cor, i) => (
                  <span key={i} className="px-2 py-1 rounded bg-white/10 text-xs text-gray-300">{cor}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
          <p className="text-xs text-yellow-300">
            <span className="font-semibold">Como calcular:</span> Soma-se todos os digitos da data de nascimentoo ate obter um nmero de 1 a 9 (ou 11/22 que saoo nmeros mestres).
          </p>
        </div>

        <p className="text-xs text-gray-500 text-center">
          Conteudo de entretenimento e autoconhecimento, sem carar cientifico.
        </p>
      </div>
      <ToolContent
        toolName="Mapa Numerológico"
        category="Astrologia"
        data={{
          directAnswer: "O mapa numerológico calcula números baseados na data de nascimento e no nome da pessoa, atribuindo significados tradicionais a cada número segundo a numerologia.",
          howItWorks: "A ferramenta soma os dígitos da data de nascimento (e, em algumas versões, valores atribuídos às letras do nome) até chegar a um número reduzido, geralmente entre 1 e 9 (ou números 'mestres' como 11 e 22). Cada número tem um significado tradicional associado na numerologia, uma prática esotérica sem comprovação científica, mas usada por muitas pessoas como ferramenta de autoconhecimento e reflexão.",
          example: {
            title: "Exemplo: calculando o número do caminho de vida para 15/07/1990",
            steps: [
              "Data de nascimento: 15/07/1990",
              "Soma dos dígitos: 1+5+0+7+1+9+9+0 = 32",
              "Redução: 3+2 = 5",
              "Número do caminho de vida: 5",
            ],
            result: "A data 15/07/1990 resulta no número de caminho de vida 5, associado tradicionalmente à liberdade e adaptabilidade na numerologia.",
          },
          faqs: [
            { question: "A numerologia tem base científica?", answer: "Não, é uma prática esotérica tradicional, sem comprovação científica, usada como ferramenta de reflexão e autoconhecimento." },
            { question: "O que são os 'números mestres'?", answer: "São os números 11, 22 e 33, considerados especiais na numerologia e geralmente não reduzidos a um único dígito." },
            { question: "O número muda se eu mudar de nome?", answer: "Em sistemas que consideram o nome, sim, o resultado pode mudar; já o número baseado apenas na data de nascimento permanece fixo." },
            { question: "Existe um único sistema de numerologia?", answer: "Não, existem diferentes tradições (pitagórica, cabalística, entre outras) que podem gerar resultados e interpretações diferentes." },
          ],
        }}
      />
    </ToolLayout>
  );
}
