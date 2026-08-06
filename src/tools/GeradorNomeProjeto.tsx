import React, { useState, useCallback } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { Copy, Dices, Lightbulb } from "lucide-react";

interface Props {
  onBack: () => void;
}

const PREFIXOS = [
  "Dev", "Byte", "Nova", "Pixel", "Cloud", "Quantum", "Neo", "Hyper",
  "Meta", "Sync", "Flux", "Core", "Cyber", "Omni", "Prime", "Apex",
  "Lumen", "Vortex", "Echo", "Nexus", "Forge", "Orbit", "Pulse",
];

const SUFIXOS = [
  "Hub", "Forge", "Stack", "Flow", "Lab", "Kit", "Base", "Wave",
  "Craft", "Works", "Studio", "Engine", "Grid", "Loop", "Sphere",
  "Deck", "Vault", "Node", "Shift", "Bridge", "Port", "Zone",
];

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateNames(keyword: string): string[] {
  const names = new Set<string>();
  const kw = keyword.trim();

  while (names.size < 5) {
    let name: string;
    const useKeyword = kw && Math.random() < 0.4;
    if (useKeyword) {
      name = capitalize(kw) + pick(SUFIXOS);
    } else {
      name = pick(PREFIXOS) + pick(SUFIXOS);
    }
    names.add(name);
  }

  return Array.from(names);
}

export function GeradorNomeProjeto({ onBack }: Props) {
  const [keyword, setKeyword] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGenerate = useCallback(() => {
    setSuggestions(generateNames(keyword));
    setCopiedIndex(null);
  }, [keyword]);

  const handleCopy = async (name: string, index: number) => {
    await navigator.clipboard.writeText(name);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <ToolLayout
      title="Gerador de Nome de Projeto"
      emoji="💻"
      category="Utilidades"
      description="Combine prefixos e sufixos com tema tecnológico para gerar ideias de nomes para projetos, repositórios ou startups."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["nome projeto"]} label="nome projeto" />}
    >
      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-400 mb-1 block">
            Palavra-chave (opcional)
          </label>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="input-field text-sm"
            placeholder="Ex: Chat, Data, Pay, Health..."
          />
          <p className="text-xs text-gray-500 mt-1">
            Se preenchido, algumas sugestões incluirão essa palavra.
          </p>
        </div>

        <button
          onClick={handleGenerate}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          <Dices className="w-5 h-5" />
          {suggestions.length > 0 ? "Gerar Novas Sugestões" : "Gerar Nome"}
        </button>

        {suggestions.length > 0 && (
          <div className="space-y-2">
            {suggestions.map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-green-400/20 transition-all group animate-fade-in-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <Lightbulb className="w-4 h-4 text-green-400 shrink-0" />
                <span className="flex-1 text-sm font-semibold text-white">{name}</span>
                <button
                  onClick={() => handleCopy(name, i)}
                  className="text-xs text-gray-400 hover:text-green-400 transition-colors flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copiedIndex === i ? "Copiado!" : "Copiar"}
                </button>
              </div>
            ))}
          </div>
        )}

        {suggestions.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Dices className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Clique para gerar 5 sugestões de nome</p>
          </div>
        )}
      </div>

      <ToolContent
        toolName="Nome de Projeto"
        category="Utilidades"
        data={{
          directAnswer: "O gerador de nomes combina prefixos e sufixos com tema tecnológico para sugerir ideias de nomes criativos para projetos, repositórios de código, startups ou canais online.",
          howItWorks: "A ferramenta combina aleatoriamente termos de duas listas — prefixos com sonoridade tecnológica (como Dev, Byte, Nova, Quantum) e sufixos comuns em produtos de software (como Hub, Forge, Stack, Flow) — gerando nomes únicos e com boa sonoridade para projetos. Também é possível incluir uma palavra-chave própria para gerar sugestões mais personalizadas relacionadas ao tema do seu projeto.",
          example: {
            title: "Exemplo: gerando nomes para um novo projeto",
            steps: [
              "Clique em \"Gerar Nome\"",
              "Sugestões geradas: DevForge, PixelStack, QuantumHub, NovaFlow, CoreCraft",
              "Escolha a que mais combina com seu projeto",
            ],
            result: "Em segundos, você tem 5 opções de nome para considerar para seu novo projeto ou repositório.",
          },
          faqs: [
            { question: "Os nomes gerados estão disponíveis para registro?", answer: "A ferramenta apenas sugere combinações criativas; a disponibilidade como domínio, usuário do GitHub ou marca registrada deve ser verificada separadamente." },
            { question: "Posso incluir uma palavra específica do meu projeto?", answer: "Sim, use o campo de palavra-chave opcional para gerar sugestões que incluam um termo relacionado ao seu projeto." },
            { question: "Serve para nomear canais do YouTube também?", answer: "Sim, a lógica de combinação funciona bem para qualquer tipo de nome criativo: projetos, repositórios, canais, ou marcas pessoais." },
            { question: "Posso gerar quantas sugestões eu quiser?", answer: "Sim, não há limite — clique em \"Gerar Novas Sugestões\" quantas vezes desejar." },
          ],
        }}
      />
    </ToolLayout>
  );
}
