import React, { useState, useCallback } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { Copy, Sparkles, Dices } from "lucide-react";

interface Props {
  onBack: () => void;
}

const PERSONAGENS = [
  "Uma detetive aposentada",
  "Um robô com medo de escuro",
  "Uma bibliotecária que fala com fantasmas",
  "Um pirata que enjoa no mar",
  "Uma cientista que perdeu a memória",
  "Um garoto que enxerga o futuro",
  "Uma cozinheira com receitas mágicas",
  "Um carteiro que entrega cartas do passado",
  "Uma bailarina que dança só à meia-noite",
  "Um vampiro vegetariano",
  "Uma jardineira que cultiva plantas falantes",
  "Um velho faroleiro solitário",
  "Uma menina que coleciona sombras",
  "Um músico cujas notas viram cristais",
  "Uma costureira que cose destinos",
  "Um taxista que transporta almas",
  "Uma professora que ensina sonhos",
  "Um relojoeiro que conserta o tempo",
  "Uma sereia que não sabe nadar",
  "Um detetive que resolve crimes através de sonhos",
  "Uma fotógrafa que captura memórias",
  "Um padeiro cujo pão revela segredos",
];

const CENARIOS = [
  "Uma estação espacial abandonada",
  "Uma cidade que só existe à noite",
  "Um restaurante no fim do mundo",
  "Uma biblioteca infinita",
  "Um farol isolado numa ilha nebulosa",
  "Um trem que nunca para",
  "Uma ilha onde o tempo não passa",
  "Um hospital para criaturas míticas",
  "Uma cidade submersa que ressurge a cada século",
  "Um convento no alto de montanhas geladas",
  "Uma loja que vende lembranças esquecidas",
  "Um circo que aparece apenas para quem precisa",
  "Uma escola flutuante acima das nuvens",
  "Um beco que muda de lugar a cada lua cheia",
  "Um café onde os mortos se despedem",
  "Uma floresta que sussurra segredos",
  "Um navio preso em garrafa gigante",
  "Uma estação de trem que leva ao passado",
  "Um vilarejo onde todos esquecem ao amanhecer",
  "Uma torre sem porta nem janela",
  "Um mercado que troca destinos por moedas",
  "Um observatório no deserto mais profundo",
];

const CONFLITOS = [
  "precisa recuperar algo roubado antes do amanhecer",
  "descobre um segredo que muda tudo",
  "está preso em um loop temporal",
  "precisa escolher entre dois entes queridos",
  "encontra uma carta que não deveria ter lido",
  "faz uma promessa que não pode quebrar",
  "é acusado de um crime que não cometeu",
  "descobre que sua vida inteira foi uma mentira",
  "precisa entregar uma mensagem para alguém que morreu",
  "herda uma maldição de família",
  "encontra um mapa para um lugar que não existe",
  "faz um pacto com uma entidade misteriosa",
  "precisa desvendar um assassinato sem pistas",
  "descobre que pode ouvir os pensamentos de alguém perigoso",
  "tem 24 horas para desfazer um erro fatal",
  "perde algo que todos diziam ser impossível de perder",
  "precisa convencer um estranho a não desistir",
  "descobre uma porta que só abre uma vez a cada cem anos",
  "é o único que percebe que o mundo está desaparecendo",
  "recebe uma visita de uma versão futura de si mesmo",
  "precisa proteger um segredo que pode destruir uma cidade",
  "encontra alguém idêntico a si mesmo em tudo",
];

interface Idea {
  personagem: string;
  cenario: string;
  conflito: string;
}

export function GeradorIdeiasEscrita({ onBack }: Props) {
  const [idea, setIdea] = useState<Idea | null>(null);
  const [copied, setCopied] = useState(false);

  const pick = useCallback(<T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)], []);

  const handleGenerate = () => {
    setIdea({
      personagem: pick(PERSONAGENS),
      cenario: pick(CENARIOS),
      conflito: pick(CONFLITOS),
    });
    setCopied(false);
  };

  const ideaText = idea
    ? `Personagem: ${idea.personagem} | Cenário: ${idea.cenario} | Conflito: ${idea.conflito}`
    : "";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(ideaText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout
      title="Gerador de Ideias para Escrita"
      emoji="✍️"
      category="Utilidades"
      description="Combine personagens, cenários e conflitos aleatórios para superar o bloqueio criativo."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["ideias escrita"]} label="ideias escrita" />}
    >
      <div className="space-y-4">
        <button
          onClick={handleGenerate}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          <Dices className="w-5 h-5" />
          {idea ? "Gerar Nova Ideia" : "Gerar Ideia"}
        </button>

        {idea && (
          <>
            <div className="p-6 rounded-xl bg-gradient-to-br from-green-400/10 to-blue-400/10 border border-green-400/20 animate-fade-in-up">
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-semibold text-green-400 uppercase tracking-wider">Personagem</span>
                  <p className="text-base text-white mt-1">{idea.personagem}</p>
                </div>
                <div className="h-px bg-white/10" />
                <div>
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Cenário</span>
                  <p className="text-base text-white mt-1">{idea.cenario}</p>
                </div>
                <div className="h-px bg-white/10" />
                <div>
                  <span className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">Conflito</span>
                  <p className="text-base text-white mt-1">{idea.conflito}</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-sm text-gray-300 leading-relaxed">
                <Sparkles className="w-4 h-4 inline mr-1 text-green-400" />
                {idea.personagem}, em {idea.cenario.toLowerCase()}, {idea.conflito}.
              </p>
            </div>

            <button
              onClick={handleCopy}
              className="btn-secondary w-full flex items-center justify-center gap-2 text-sm"
            >
              <Copy className="w-4 h-4" />
              {copied ? "Copiado!" : "Copiar ideia"}
            </button>
          </>
        )}

        {!idea && (
          <div className="text-center py-12 text-gray-500">
            <Dices className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Clique para gerar uma ideia de história</p>
          </div>
        )}
      </div>

      <ToolContent
        toolName="Ideias para Escrita"
        category="Utilidades"
        data={{
          directAnswer: "O gerador de ideias combina aleatoriamente um personagem, um cenário e um conflito para criar o ponto de partida de uma história, ajudando a superar o bloqueio criativo.",
          howItWorks: "A ferramenta sorteia aleatoriamente um elemento de cada uma de três categorias (personagem, cenário e conflito) de uma base com dezenas de opções, criando combinações únicas e inesperadas a cada clique. É uma técnica popular entre escritores, roteiristas e estudantes de escrita criativa para superar o bloqueio criativo e começar a escrever sem precisar pensar na ideia inicial do zero.",
          example: {
            title: "Exemplo: gerando uma ideia de história",
            steps: [
              "Clique em \"Gerar Ideia\"",
              "Personagem sorteado: \"Uma detetive aposentada\"",
              "Cenário sorteado: \"Uma cidade que só existe à noite\"",
              "Conflito sorteado: \"descobre um segredo que muda tudo\"",
            ],
            result: "A combinação sorteada já forma o início de uma história: uma detetive aposentada, em uma cidade que só existe à noite, descobre um segredo que muda tudo.",
          },
          faqs: [
            { question: "Posso gerar quantas ideias eu quiser?", answer: "Sim, não há limite — clique em \"Gerar Nova Ideia\" quantas vezes quiser até encontrar uma combinação que te inspire." },
            { question: "Serve para que tipo de escrita?", answer: "É útil para contos, roteiros, romances, redações criativas, ou qualquer exercício de escrita que precise de um ponto de partida." },
            { question: "As combinações podem se repetir?", answer: "Como o sorteio é aleatório entre dezenas de opções em cada categoria, é possível repetir ocasionalmente, mas a variedade de combinações possíveis é grande." },
            { question: "Posso usar essas ideias comercialmente?", answer: "Sim, as ideias geradas são pontos de partida genéricos que você pode desenvolver livremente em qualquer projeto próprio." },
          ],
        }}
      />
    </ToolLayout>
  );
}
