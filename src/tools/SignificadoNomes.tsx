import React, { useState, useEffect } from "react";
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

/** Mapa nome normalizado -> entrada (inclui apelidos/grafias alternativas) */
const DB_MAP: Map<string, typeof NAMES_DB[0]> = (() => {
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
})();

/** Procura um nome da base (usado também na pré-renderização das páginas de nome) */
export function findName(name: string): typeof NAMES_DB[0] | undefined {
  return DB_MAP.get(normalizeName(name.replace(/-/g, " ").trim()));
}

/** Todos os nomes da base, em ordem alfabética, sem repetir o mesmo endereço */
export const ALL_NAME_SLUGS: { name: string; slug: string }[] = (() => {
  const seen = new Set<string>();
  const list: { name: string; slug: string }[] = [];
  for (const entry of [...NAMES_DB].sort((a, b) => a.name.localeCompare(b.name, "pt-BR"))) {
    const slug = slugify(entry.name);
    if (!slug || seen.has(slug)) continue;
    seen.add(slug);
    list.push({ name: entry.name, slug });
  }
  return list;
})();

export function SignificadoNomes({ onBack, initialName }: Props) {
  // O resultado inicial é calculado já na primeira renderização, para que a
  // página /significado-nome/x saia pronta no HTML (o Google vê o conteúdo).
  const initialResult = initialName ? findName(initialName) ?? null : null;
  const [query, setQuery] = useState(initialResult ? initialResult.name : "");
  const [result, setResult] = useState<typeof NAMES_DB[0] | null>(initialResult);
  const [notFound, setNotFound] = useState(false);
  const [suggestions, setSuggestions] = useState<typeof NAMES_DB>([]);
  const isNamePage = !!(initialName && initialResult);
  const pageName = initialResult?.name;

  const dbMap = DB_MAP;

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
    if (initialName && !initialResult) {
      setQuery(initialName);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Páginas de nome: endereço próprio, título próprio e liberadas para o Google.
  // Nome que não está na base: aponta para a página geral e não é indexado.
  const seoTitle = isNamePage
    ? `Significado do Nome ${pageName}: Origem e Curiosidades`
    : "Significado de Nomes — Origem e Significado dos Nomes";
  const seoDescription = isNamePage && initialResult
    ? `O nome ${initialResult.name} tem origem ${initialResult.origin.toLowerCase()} e significa: ${initialResult.meaning.charAt(0).toLowerCase() + initialResult.meaning.slice(1)}. Veja curiosidades e nomes parecidos.`
    : "Descubra a origem, significado e curiosidades sobre nomes de bebês.";
  const seoCanonical = isNamePage && pageName
    ? `/significado-nome/${slugify(pageName)}`
    : "/significado-nomes";
  const sameLetter = pageName
    ? ALL_NAME_SLUGS.filter((n) => normalizeName(n.name)[0] === normalizeName(pageName)[0] && n.name !== pageName).slice(0, 12)
    : [];

  return (
    <ToolLayout
      title={isNamePage ? `Significado do Nome ${pageName}` : "Significado de Nomes"}
      customSeo={!!initialName}
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
                href={CONFIG.urlAmazon("lista de bebê enxoval")}
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
      {initialName && (
        <SEOHead
          title={seoTitle}
          description={seoDescription}
          canonical={seoCanonical}
          noindex={!isNamePage}
          breadcrumbs={isNamePage ? [
            { name: "Início", url: "/" },
            { name: "Significado de Nomes", url: "/significado-nomes" },
            { name: `Nome ${pageName}`, url: seoCanonical },
          ] : undefined}
          schema={isNamePage && initialResult ? {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: seoTitle,
            description: seoDescription,
            url: `https://www.clicaresolve.com.br${seoCanonical}`,
            inLanguage: "pt-BR",
          } : undefined}
        />
      )}
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

        {/* Nomes com a mesma letra (páginas de nome) */}
        {isNamePage && sameLetter.length > 0 && (
          <div>
            <p className="text-xs text-gray-400 mb-3 uppercase tracking-wider font-semibold">
              Outros nomes com a letra {pageName?.charAt(0)}:
            </p>
            <div className="flex flex-wrap gap-2">
              {sameLetter.map((n) => (
                <a
                  key={n.slug}
                  href={`/significado-nome/${n.slug}`}
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-sm text-white transition-colors"
                >
                  {n.name}
                </a>
              ))}
            </div>
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
      {/* Índice de todos os nomes: cada um tem a sua própria página */}
      <nav aria-label="Todos os nomes" className="mt-8">
        <h2 className="text-lg font-bold text-text mb-3">Significado de todos os nomes da A a Z</h2>
        <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-sm">
          {ALL_NAME_SLUGS.map((n) => (
            <a key={n.slug} href={`/significado-nome/${n.slug}`} className="text-muted hover:text-green-400 transition-colors">
              {n.name}
            </a>
          ))}
        </div>
      </nav>
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
