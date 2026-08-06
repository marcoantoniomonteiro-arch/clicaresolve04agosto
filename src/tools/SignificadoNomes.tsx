import React, { useState, useMemo, useEffect } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { Baby, Search, Sparkles, Globe, BookOpen, RotateCcw } from "lucide-react";
import { CONFIG } from "../config";
import { NAMES_DB } from "./namesData";
import { ToolContent } from "../components/ToolContent";
import { SEOHead } from "../components/SEOHead";

interface Props {
  onBack: () => void;
  initialName?: string;
}

const ORIGIN_ICONS: Record<string, string> = {
  "Hebraica": "✡️",
  "Grega": "🏛️",
  "Latina": "🏺",
  "Germânica": "⚔️",
  "Celta": "🍀",
  "Nórdica": "⚡",
  "Anglo-Saxã": "🏰",
  "Tupi-Guarani": "🌿",
  "Árabe": "🌙",
  "Persa": "🦁",
  "Egípcia": "🔺",
  "Turca": "🎭",
  "Italiana": "🍝",
  "Espanhola": "💃",
  "Russa": "🪆",
  "Escocesa": "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  "Aramaica": "📜",
  "Basco": "⛰️",
  "Persa/Árabe": "🌙",
  "Hebraica/Grega": "✡️",
  "Hebraica/Italiana": "✡️",
  "Hebraica/Espanhola": "✡️",
  "Celta/Italiana": "🍀",
  "Latina/Grega": "🏺",
};

function getOriginIcon(origin: string): string {
  return ORIGIN_ICONS[origin] || "🌍";
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function findSimilarNames(query: string, count: number = 6): typeof NAMES_DB {
  const first = normalizeName(query)[0];
  if (!first) return [];
  return NAMES_DB
    .filter((n) => normalizeName(n.name)[0] === first)
    .slice(0, count);
}

export function SignificadoNomes({ onBack, initialName }: Props) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<typeof NAMES_DB[0] | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [suggestions, setSuggestions] = useState<typeof NAMES_DB>([]);

  const dbMap = useMemo(() => {
    const map = new Map<string, typeof NAMES_DB[0]>();
    for (const entry of NAMES_DB) {
      map.set(normalizeName(entry.name), entry);
      if (entry.aliases) {
        for (const alias of entry.aliases) {
          map.set(normalizeName(alias), entry);
        }
      }
    }
    return map;
  }, []);

  function search() {
    const trimmed = query.trim();
    const key = normalizeName(trimmed);
    if (!key) return;
    const found = dbMap.get(key);
    if (found) {
      setResult(found);
      setNotFound(false);
      setSuggestions([]);
      return;
    }
    const parts = trimmed.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      const partEntries = parts.map((p) => dbMap.get(normalizeName(p)));
      if (partEntries.every((e) => e !== undefined)) {
        const entries = partEntries as typeof NAMES_DB;
        const combinedMeaning = entries
          .map((e) => `"${e.name}" significa ${e.meaning.charAt(0).toLowerCase() + e.meaning.slice(1)}`)
          .join("; ");
        const combinedOrigin = Array.from(new Set(entries.map((e) => e.origin))).join(" e ");
        const combinedCuriosity = `Nome composto formado pela junção de ${entries.map((e) => e.name).join(" + ")}. ${entries[0].curiosity}`;
        const compoundResult = {
          name: trimmed,
          origin: combinedOrigin,
          meaning: combinedMeaning,
          curiosity: combinedCuriosity,
        };
        setResult(compoundResult);
        setNotFound(false);
        setSuggestions([]);
        return;
      }
    }
    setResult(null);
    setNotFound(true);
    setSuggestions(findSimilarNames(key));
  }

  function reset() {
    setQuery("");
    setResult(null);
    setNotFound(false);
    setSuggestions([]);
  }

  function selectName(name: string) {
    setQuery(name);
    const key = normalizeName(name);
    const found = dbMap.get(key);
    if (found) {
      setResult(found);
      setNotFound(false);
      setSuggestions([]);
    }
  }

  useEffect(() => {
    if (initialName) {
      selectName(initialName);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const seoTitle = initialName && result
    ? `Significado do Nome ${result.name} — Origem e Curiosidades`
    : "Significado de Nomes — Origem e Significado dos Nomes";
  const seoDescription = initialName && result
    ? `${result.name}: nome de origem ${result.origin}. ${result.meaning}`
    : "Descubra a origem, significado e curiosidades sobre nomes de bebês.";
  const seoCanonical = initialName && result
    ? `/significado-nome/${slugify(result.name)}`
    : "/significado-nomes";

  return (
    <ToolLayout
      title="Significado de Nomes"
      emoji="👶"
      category="Família e Bebês"
      description="Descubra a origem, significado e curiosidades sobre nomes de bebês."
      onBack={onBack}
      affiliateBanner={
        <div
          className="my-6 p-5 rounded-2xl border border-pink-200/20"
          style={{ background: "linear-gradient(135deg, #ffd6e8, #d6e8ff)" }}
        >
          <div className="flex items-start gap-3">
            <div className="text-3xl">🍼</div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-800 mb-1">
                Decidindo o nome do seu bebê? Comece a planejar o futuro dele!
              </p>
              <p className="text-xs text-gray-700 mb-3">
                Crie sua Lista de Bebê Oficial na Amazon com descontos exclusivos.
              </p>
              <a
                href={CONFIG.urlAmazon("lista de bebe enxoval")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 hover:bg-white text-pink-700 text-sm font-bold shadow-sm transition-all duration-200"
              >
                <Baby className="w-4 h-4" />
                Criar Lista de Bebê
              </a>
              <a
                href={CONFIG.urlShopee("enxoval bebê")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-white text-sm font-bold shadow-sm transition-all duration-200"
              >
                🛍️ Ver na Shopee
              </a>
            </div>
          </div>
        </div>
      }
    >
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonical={seoCanonical}
      />
      <div className="space-y-5">
        {/* Search input */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && search()}
              placeholder="Digite um nome (ex: Noah, Maria, Davi)..."
              className="input-field w-full pr-10"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          </div>
          <button onClick={search} className="btn-primary px-5">
            Buscar
          </button>
        </div>

        {/* Result card */}
        {result && (
          <div className="space-y-4">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-pink-500/20 to-sky-500/20 border border-pink-500/20 text-center">
              <div className="text-5xl mb-3">👶</div>
              <h2 className="text-3xl font-black text-white mb-1">{result.name}</h2>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 mt-2">
                <span className="text-lg">{getOriginIcon(result.origin)}</span>
                <span className="text-sm font-semibold text-pink-300">{result.origin}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <p className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">Significado</p>
                </div>
                <p className="text-lg font-semibold text-white">{result.meaning}</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-sky-400" />
                  <p className="text-xs font-semibold text-sky-400 uppercase tracking-wider">Curiosidade</p>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">{result.curiosity}</p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="w-4 h-4 text-green-400" />
                  <p className="text-xs font-semibold text-green-400 uppercase tracking-wider">Origem</p>
                </div>
                <p className="text-sm text-gray-300">{result.origin} — {result.name} é um nome de origem {result.origin.toLowerCase()}, com raízes históricas que remontam a séculos de tradição cultural e linguística.</p>
              </div>
            </div>

            <button onClick={reset} className="btn-primary w-full flex items-center justify-center gap-2">
              <RotateCcw className="w-4 h-4" />
              Buscar outro nome
            </button>
          </div>
        )}

        {/* Not found + suggestions */}
        {notFound && (
          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-white/5 border border-white/10 text-center">
              <p className="text-sm text-gray-400 mb-1">
                Nome "<span className="text-white font-semibold">{query}</span>" não encontrado em nossa base.
              </p>
              <p className="text-xs text-gray-500">Buscando os mais próximos...</p>
            </div>

            {suggestions.length > 0 && (
              <div>
                <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider font-semibold">
                  Nomes parecidos com a mesma letra inicial:
                </p>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((s) => (
                    <button
                      key={s.name}
                      onClick={() => selectName(s.name)}
                      className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-white transition-colors"
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button onClick={reset} className="btn-primary w-full flex items-center justify-center gap-2">
              <RotateCcw className="w-4 h-4" />
              Buscar outro nome
            </button>
          </div>
        )}

        {/* Quick popular names */}
        {!result && !notFound && (
          <div>
            <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider font-semibold">
              Nomes populares:
            </p>
            <div className="flex flex-wrap gap-2">
              {["Noah", "Maria", "Davi", "Alice", "Miguel", "Helena", "Sophia", "Arthur", "Laura", "Heitor"].map((n) => (
                <button
                  key={n}
                  onClick={() => selectName(n)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-white transition-colors"
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <ToolContent
        toolName="Significado dos Nomes"
        category="Utilidades"
        data={{
          directAnswer: "O significado de um nome é consultado em uma base de dados com origens etimológicas e interpretações tradicionalmente associadas a cada nome próprio.",
          howItWorks: "A ferramenta busca em uma base com mais de 150 nomes o significado, origem etimológica (grega, latina, hebraica, etc) e curiosidades associadas a cada nome, ajudando pais que estão escolhendo um nome para o bebê ou pessoas curiosas sobre a origem do próprio nome.",
          example: {
            title: "Exemplo: consultando o significado do nome 'Sofia'",
            steps: [
              "Nome consultado: Sofia",
              "Origem: Grega",
              "Significado: 'sabedoria'",
              "Curiosidade: um dos nomes femininos mais populares no Brasil nas últimas décadas",
            ],
            result: "O nome Sofia tem origem grega e significa 'sabedoria', sendo também um dos nomes mais populares do país.",
          },
          faqs: [
            { question: "A base de nomes cobre nomes de todas as origens?", answer: "A base cobre uma ampla variedade de origens (grega, latina, hebraica, entre outras), mas nem todo nome existente estará necessariamente catalogado." },
            { question: "O significado de um nome influencia a personalidade da pessoa?", answer: "Não há comprovação científica disso; o significado é uma informação cultural e etimológica, não uma previsão de personalidade." },
            { question: "Nomes compostos também são consultados?", answer: "Geralmente a consulta funciona melhor para nomes individuais; nomes compostos podem ser consultados separadamente, parte por parte." },
            { question: "A popularidade do nome também é mostrada?", answer: "Em muitos casos sim, com dados sobre a frequência de uso do nome ao longo dos anos no Brasil." },
          ],
        }}
      />
    </ToolLayout>
  );
}
