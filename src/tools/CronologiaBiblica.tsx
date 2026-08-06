import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import React, { useState } from "react";


import { ChevronDown, ChevronUp, BookOpen } from "lucide-react";
import { ToolContent } from "../components/ToolContent";

interface Props {
  onBack: () => void;
}

interface Evento {
  id: string;
  nome: string;
  anoAC: number; // Anos antes de Cristo (aproximado)
  descricao: string;
  personagem?: string;
  fontes: string[];
}

const EVENTOS: Evento[] = [
  {
    id: "criacao",
    nome: "Criacao do Mundo",
    anoAC: 3760, // Ano 1 AM segundo tradicao judaica
    descricao: "Segundo a tradicao judaica, o mundo foi criado em 3760 AEC (Ano 1 do calendario hebraico).",
    fontes: ["Genesis 1-2", "Tradição Judaica"],
  },
  {
    id: "adao",
    nome: "Adao e Eva",
    anoAC: 3760,
    descricao: "Primeiro homem e mulher criados por Deus. Viveram no Jardim do Eden.",
    personagem: "Adao",
    fontes: ["Genesis 2-3"],
  },
  {
    id: "noe",
    nome: "Diluvio e Noe",
    anoAC: 2104,
    descricao: "O diluvio universal ocorreu cerca de 1.656 anos apos a criacao. Noe e sua familia foram salvos na arca.",
    personagem: "Noe",
    fontes: ["Genesis 6-9", "Tradição Judaica"],
  },
  {
    id: "torre",
    nome: "Torre de Babel",
    anoAC: 2000,
    descricao: "A humanidade foi dispersa e as linguagens confundidas apos tentar construir uma torre ate o ceu.",
    fontes: ["Genesis 11"],
  },
  {
    id: "abraao",
    nome: "Abraao",
    anoAC: 1812,
    descricao: "Nascimento de Abraao (circa 1812 AEC). Pai da fe monotefsta, fez alianca com Deus.",
    personagem: "Abraao",
    fontes: ["Genesis 12-25", "Tradição Judaica"],
  },
  {
    id: "isaque",
    nome: "Isaque e Jaco",
    anoAC: 1712,
    descricao: "Nascimento de Isaque (filho de Abraao) e posteriormente Jaco (Israel).",
    personagem: "Isaque, Jaco",
    fontes: ["Genesis 21-35"],
  },
  {
    id: "jose",
    nome: "Jose no Egito",
    anoAC: 1522,
    descricao: "Jose vendido pelos irmaos, chega ao Egito e se torna governador.",
    personagem: "Jose",
    fontes: ["Genesis 37-50"],
  },
  {
    id: "moises",
    nome: "Moises e o Exodo",
    anoAC: 1312,
    descricao: "Nascimento de Moises. O Exodo do Egito ocorreu em circa 1312 AEC (ano 2448 AM).",
    personagem: "Moises",
    fontes: ["Exodo 1-15", "Tradição Judaica"],
  },
  {
    id: "sinai",
    nome: "Entrega da Tora no Sinai",
    anoAC: 1312,
    descricao: "Deus entrega a Tora a Moises e ao povo de Israel no Monte Sinai.",
    fontes: ["Exodo 19-24"],
  },
  {
    id: "conquista",
    nome: "Conquista de Canaa",
    anoAC: 1272,
    descricao: "Após 40 anos no deserto, Josue lidera a conquista da Terra Prometida.",
    personagem: "Josue",
    fontes: ["Josue 1-24"],
  },
  {
    id: "juizes",
    nome: "Periodo dos Juizes",
    anoAC: 1270,
    descricao: "Cerca de 300 anos de lideranca dos Juizes antes da monarquia.",
    fontes: ["Juizes"],
  },
  {
    id: "saul",
    nome: "Rei Saul",
    anoAC: 879,
    descricao: "Saul e ungido como primeiro rei de Israel.",
    personagem: "Saul",
    fontes: ["1 Samuel 9-31"],
  },
  {
    id: "davi",
    nome: "Rei Davi",
    anoAC: 839,
    descricao: "Davi se torna rei de Israel. Unifica o reino e escreve muitos Salmos.",
    personagem: "Davi",
    fontes: ["1 Samuel 16 - 1 Reis 2", "Salmos"],
  },
  {
    id: "salomao",
    nome: "Rei Salomao",
    anoAC: 799,
    descricao: "Salomao constroi o Primeiro Templo em Jerusalem. Era de sabedoria e prosperidade.",
    personagem: "Salomao",
    fontes: ["1 Reis 3-11"],
  },
  {
    id: "reinos",
    nome: "Divisao dos Reinos",
    anoAC: 796,
    descricao: "Apos Salomao, Israel se divide: Reino do Norte (Israel) e Reino do Sul (Juda).",
    fontes: ["1 Reis 12"],
  },
  {
    id: "exilio",
    nome: "Exilio Babilonico",
    anoAC: 586,
    descricao: "Nabucodonosor destrói Jerusalem e o Templo. Judeus exilados na Babilonia.",
    fontes: ["2 Reis 24-25", "Jeremias", "Ezequiel"],
  },
  {
    id: "retorno",
    nome: "Retorno e Segundo Templo",
    anoAC: 516,
    descricao: "Retorno do exilio e reconstrucao do Segundo Templo sob Esdras e Neemias.",
    personagem: "Esdras, Neemias",
    fontes: ["Esdras", "Neemias"],
  },
  {
    id: "jesus",
    nome: "Nascimento de Jesus",
    anoAC: 0,
    descricao: "Nascimento de Jesus de Nazare, o Messias cristo. Marco entre AEC e EC.",
    personagem: "Jesus",
    fontes: ["Mateus 1-2", "Lucas 1-2"],
  },
  {
    id: "ministerio",
    nome: "Ministerio de Jesus",
    anoAC: 30,
    descricao: "Ministerio publico de Jesus, crucificacao e ressureicao (circa 30 EC).",
    fontes: ["Mateus", "Marcos", "Lucas", "Joao"],
  },
];

export function CronologiaBiblica({ onBack }: Props) {
  const [expandido, setExpandido] = useState<string | null>("moises");

  const toggleEvento = (id: string) => {
    setExpandido(expandido === id ? null : id);
  };

  // Ordenar do mais antigo para o mais recente (anoAC maior = mais antigo)
  const eventosOrdenados = [...EVENTOS].sort((a, b) => b.anoAC - a.anoAC);

  return (
    <ToolLayout
      title="Cronologia Biblica"
      emoji="⏳"
      category="Religioso"
      description="Linha do tempo interativa dos principais eventos biblicos."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["Bíblia estudo comentada"]} label="Bíblia estudo comentada" />}
    
    >
      <div className="space-y-5">
        <p className="text-xs text-gray-500">
          Cronologia aproximada baseada em tradicao judaica e pesquisas academicas.
          Os anos sao antes de Cristo (AEC) ou era comum (EC).
        </p>

        <div className="relative">
          {/* Linha vertical */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-green-500 to-amber-500" />

          <div className="space-y-4 pl-10">
            {eventosOrdenados.map((evento, idx) => {
              const isExpandido = expandido === evento.id;
              const anoLabel = evento.anoAC > 0
                ? `${evento.anoAC.toLocaleString()} AEC`
                : `${Math.abs(evento.anoAC)} EC`;

              return (
                <div key={evento.id} className="relative">
                  {/* Ponto na linha */}
                  <div
                    className={`absolute left-[-26px] w-4 h-4 rounded-full border-2 ${
                      isExpandido ? "bg-green-500 border-green-400" : "bg-white/10 border-white/20"
                    }`}
                  />

                  <button
                    onClick={() => toggleEvento(evento.id)}
                    className={`w-full p-4 rounded-xl border text-left transition-all ${
                      isExpandido
                        ? "bg-white/8 border-green-500/30"
                        : "bg-white/5 border-white/8 hover:border-white/20"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs text-blue-400 font-mono">{anoLabel}</span>
                          {evento.personagem && (
                            <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-gray-400">
                              {evento.personagem}
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-semibold text-white">{evento.nome}</p>
                      </div>
                      {isExpandido ? (
                        <ChevronUp className="w-4 h-4 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      )}
                    </div>

                    {isExpandido && (
                      <div className="mt-3 pt-3 border-t border-white/8">
                        <p className="text-sm text-gray-300 mb-2">{evento.descricao}</p>
                        <div className="flex items-center gap-1 flex-wrap">
                          <BookOpen className="w-3 h-3 text-gray-500" />
                          {evento.fontes.map((f, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-0.5 rounded bg-white/5 text-gray-400"
                            >
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <ToolContent
        toolName="Cronologia Bíblica"
        category="Religioso"
        data={{
          directAnswer: "A cronologia bíblica organiza os principais eventos e períodos narrados na Bíblia em ordem histórica, desde a criação até o período do Novo Testamento.",
          howItWorks: "A ferramenta apresenta uma linha do tempo com os grandes períodos e eventos bíblicos (Patriarcas, Êxodo, Reis de Israel, Exílio, vida de Jesus, Igreja Primitiva), ajudando no estudo bíblico ao situar cada livro e narrativa dentro do contexto histórico mais amplo das Escrituras.",
          example: {
            title: "Exemplo: situando o período dos Reis de Israel",
            steps: [
              "Período anterior: Época dos Juízes",
              "Período dos Reis: início com Saul, depois Davi e Salomão",
              "Divisão do reino: Israel (Norte) e Judá (Sul)",
              "Período seguinte: Exílio Babilônico",
            ],
            result: "O período dos Reis de Israel situa-se entre a época dos Juízes e o Exílio Babilônico, incluindo a divisão do reino unido em dois reinos separados.",
          },
          faqs: [
            { question: "A cronologia bíblica é uma data histórica exata?", answer: "Estudiosos usam diferentes métodos para estimar datas bíblicas, e há variações entre tradições acadêmicas e religiosas; a cronologia apresentada é uma referência de estudo." },
            { question: "Quais são os principais períodos da cronologia do Antigo Testamento?", answer: "Patriarcas, Êxodo e Deserto, Conquista de Canaã, Juízes, Reino Unido, Reinos Divididos, Exílio e Restauração." },
            { question: "A cronologia ajuda a entender melhor a Bíblia?", answer: "Sim, situar os eventos no tempo ajuda a compreender o contexto histórico e cultural de cada livro e narrativa." },
            { question: "Diferentes tradições cristãs concordam com a mesma cronologia?", answer: "Existem variações entre estudiosos e tradições, mas os grandes períodos e a ordem geral dos eventos são amplamente aceitos." },
          ],
        }}
      />
    </ToolLayout>
  );
}
