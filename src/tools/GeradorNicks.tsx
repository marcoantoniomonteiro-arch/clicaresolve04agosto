import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import React, { useState, useCallback, useMemo } from "react";


import { User, RefreshCw, Copy, Check, Wand2 } from "lucide-react";
import { ToolContent } from "../components/ToolContent";

interface Props {
  onBack: () => void;
}

type Estilo = "epico" | "fofo" | "profissional" | "gamer";

const PREFIXOS: Record<Estilo, string[]> = {
  epico: ["Shadow", "Dark", "Night", "Storm", "Thunder", "Dragon", "Fire", "Ice", "Royal", "Mystic"],
  fofo: ["Sweet", "Little", "Baby", "Honey", "Love", "Cute", "Tiny", "Soft", "Angel", "Star"],
  profissional: ["Pro", "Elite", "Master", "Prime", "Core", "Nexus", "Tech", "Logic", "Apex", "Beta"],
  gamer: ["Xx", "Dark", "Ninja", "Ghost", "Cyber", "Neon", "Zero", "Alpha", "Omega", "Elite"],
};

const SUFIXOS: Record<Estilo, string[]> = {
  epico: ["Lord", "King", "Knight", "Slayer", "Hunter", "Warrior", "Blade", "Fury", "Strike", "Wolf"],
  fofo: ["Bunny", "Bear", "Kitty", "Panda", "Puff", "Pie", "Muffin", "Cherry", "Dream", "Sparkle"],
  profissional: ["Dev", "Hub", "Labs", "Studio", "Works", "Media", "Co", "Group", "Team", "One"],
  gamer: ["xX", "xD", "BR", "YT", "TV", "Live", "Pro", "God", "King", "Master"],
};

const ZEROS = ["0", "69", "420", "777", "99", "13", "21", "42", "100", "1"];

export function GeradorNicks({ onBack }: Props) {
  const [palavraChave, setPalavraChave] = useState("");
  const [estilo, setEstilo] = useState<Estilo>("gamer");
  const [nicks, setNicks] = useState<string[]>([]);
  const [copiado, setCopiado] = useState<string | null>(null);

  const gerar = useCallback(() => {
    const prefixos = PREFIXOS[estilo];
    const sufixos = SUFIXOS[estilo];
    const gerados: string[] = [];

    for (let i = 0; i < 10; i++) {
      const rand = Math.random();
      let nick = "";

      if (palavraChave.trim()) {
        const palavra = palavraChave.trim();
        if (rand < 0.3) {
          nick = `${prefixos[Math.floor(Math.random() * prefixos.length)]}${palavra}`;
        } else if (rand < 0.6) {
          nick = `${palavra}${sufixos[Math.floor(Math.random() * sufixos.length)]}`;
        } else {
          nick = `${prefixos[Math.floor(Math.random() * prefixos.length)]}${palavra}${sufixos[Math.floor(Math.random() * sufixos.length)]}`;
        }
      } else {
        nick = `${prefixos[Math.floor(Math.random() * prefixos.length)]}${sufixos[Math.floor(Math.random() * sufixos.length)]}`;
      }

      if (rand > 0.7) {
        nick += ZEROS[Math.floor(Math.random() * ZEROS.length)];
      }

      if (estilo === "gamer" && rand > 0.8) {
        nick = nick.toLowerCase();
      }

      gerados.push(nick);
    }

    setNicks(gerados);
  }, [palavraChave, estilo]);

  const copiar = async (nick: string) => {
    try {
      await navigator.clipboard.writeText(nick);
      setCopiado(nick);
      setTimeout(() => setCopiado(null), 2000);
    } catch (err) {
      console.error("Erro ao copiar", err);
    }
  };

  React.useEffect(() => {
    gerar();
  }, [gerar]);

  return (
    <ToolLayout
      title="Gerador de Nicks"
      emoji="🎭"
      category="Utilidades"
      description="Gere nicks criativos para jogos e redes sociais."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["headset gamer"]} label="headset gamer" />}
    
    >
      <div className="space-y-5">
        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Palavra-chave (opcional)</span>
          <input
            type="text"
            value={palavraChave}
            onChange={(e) => setPalavraChave(e.target.value)}
            placeholder="Ex: Dragon, Luna, Pro..."
            className="input-field"
          />
        </label>

        <div className="grid grid-cols-2 gap-2">
          {[
            { value: "epico", label: "Epico", desc: "Sombrio, medieval" },
            { value: "fofo", label: "Fofo", desc: "Carinhoso, kawaii" },
            { value: "profissional", label: "Profissional", desc: "Limpo, serio" },
            { value: "gamer", label: "Gamer", desc: "Leet, numerico" },
          ].map((e) => (
            <button
              key={e.value}
              onClick={() => setEstilo(e.value as Estilo)}
              className={`p-3 rounded-lg text-left transition-all ${
                estilo === e.value
                  ? "bg-blue-500/20 border border-blue-500/40"
                  : "bg-white/5 border border-white/8"
              }`}
            >
              <p className="text-sm font-semibold text-white">{e.label}</p>
              <p className="text-xs text-gray-400">{e.desc}</p>
            </button>
          ))}
        </div>

        <button
          onClick={gerar}
          className="w-full p-3 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-400 font-semibold flex items-center justify-center gap-2 hover:bg-purple-500/30 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Gerar Nicks
        </button>

        <div className="grid grid-cols-2 gap-2">
          {nicks.map((nick, i) => (
            <div
              key={i}
              className="p-3 rounded-lg bg-white/5 border border-white/8 flex items-center justify-between"
            >
              <span className="text-sm font-semibold text-white truncate">{nick}</span>
              <button
                onClick={() => copiar(nick)}
                className="ml-2 text-gray-400 hover:text-white"
              >
                {copiado === nick ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-500 text-center">
          Clique em um nick para copiar
        </p>
      </div>
      <ToolContent
        toolName="Gerador de Nicks"
        category="Jogos"
        data={{
          directAnswer: "O gerador de nicknames cria sugestões de nomes de usuário criativos e únicos para uso em jogos, redes sociais e plataformas online.",
          howItWorks: "A ferramenta combina palavras, prefixos, sufixos e números de forma aleatória para gerar sugestões de nicknames criativos, com opção de filtrar por estilo (gamer, sério, engraçado) ou tema, ajudando quem está sem inspiração para escolher um nome de usuário original.",
          example: {
            title: "Exemplo: gerando nicks com estilo gamer",
            steps: [
              "Estilo escolhido: Gamer",
              "Elementos combinados: adjetivo + substantivo + número",
              "Sugestões geradas: ShadowWolf99, PixelHunter, NightBladeX",
              "Nick escolhido: ShadowWolf99",
            ],
            result: "A ferramenta gerou 3 sugestões de nicks no estilo gamer, prontas para uso em plataformas de jogos.",
          },
          faqs: [
            { question: "Os nicknames gerados estão garantidamente disponíveis?", answer: "Não, a disponibilidade depende da plataforma específica onde o nick será usado; a ferramenta apenas sugere ideias criativas." },
            { question: "Posso escolher o tema das sugestões?", answer: "Sim, geralmente é possível filtrar por estilos como gamer, engraçado, sério ou temático." },
            { question: "Posso gerar nicks com um número específico de caracteres?", answer: "Algumas versões permitem definir um comprimento aproximado para as sugestões geradas." },
            { question: "A ferramenta serve para nomes de canal ou perfil também?", answer: "Sim, os nicknames gerados podem ser usados em qualquer contexto que exija um nome de usuário único e criativo." },
          ],
        }}
      />
    </ToolLayout>
  );
}
