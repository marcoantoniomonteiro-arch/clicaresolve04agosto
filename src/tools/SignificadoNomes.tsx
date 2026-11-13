import React, { useState, useEffect } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { Search, Sparkles, Globe, BookOpen, RotateCcw } from "lucide-react";
import { NAMES_DB } from "./namesData";
import { ToolContent } from "../components/ToolContent";
import { SEOHead } from "../components/SEOHead";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { getNameStats, sameOrigin, nameFaqs, formatNumber, DECADE_LABELS } from "./namesInfo";

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
  // Primeiro as grafias alternativas, depois os nomes principais: assim um nome
  // que tem página própria nunca é "engolido" pelo apelido de outro
  // (ex.: "Davi" é nome próprio, não uma grafia de "Deivid").
  for (const entry of NAMES_DB) {
    for (const alias of entry.aliases || []) {
      const key = normalizeName(alias);
      if (!map.has(key)) map.set(key, entry);
    }
  }
  for (const entry of NAMES_DB) {
    map.set(normalizeName(entry.name), entry);
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

function popularityText(name: string, st: NonNullable<ReturnType<typeof getNameStats>>): string {
  const share = Math.round(((st.gender === "feminino" ? st.women : st.men) / Math.max(1, st.men + st.women)) * 100);
  const genero = st.gender === "unissex"
    ? "usado para os dois gêneros"
    : `${st.gender} (${share}% ${st.gender === "feminino" ? "mulheres" : "homens"})`;
  const rank = st.rank > 0
    ? ` e o ${st.rank}º mais comum entre os ${st.rankOf} nomes ${st.gender === "feminino" ? "femininos" : "masculinos"} do nosso guia`
    : "";
  const auge = st.peakIndex === 0 ? `entre os nascidos ${st.peakText}` : `na ${st.peakText}`;
  return `Segundo o Censo 2010 do IBGE, ${formatNumber(st.total)} pessoas se chamavam ${name} no Brasil. É um nome ${genero}${rank}. O auge foi ${auge}, e o nome está ${st.trend} nos registros mais recentes.`;
}

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
  const pageStats = initialResult ? getNameStats(initialResult.name) : null;
  const seoTitle = isNamePage
    ? `Significado do Nome ${pageName}: Origem e Popularidade`
    : "Significado de Nomes — Origem e Significado dos Nomes";
  const seoDescription = (() => {
    if (!isNamePage || !initialResult) return "Descubra o significado, a origem e a popularidade de mais de 580 nomes, com dados do IBGE. Grátis e sem cadastro.";
    const base = `${initialResult.name} significa "${initialResult.meaning.charAt(0).toLowerCase() + initialResult.meaning.slice(1)}" e tem origem ${initialResult.origin.toLowerCase()}.`;
    const stats = pageStats ? ` ${formatNumber(pageStats.total)} brasileiros têm esse nome (IBGE).` : "";
    // Mantém a descrição em até ~160 caracteres para não ser cortada no Google
    for (const d of [base + stats + " Veja nomes parecidos.", base + stats, base]) if (d.length <= 160) return d;
    return base;
  })();
  const pageFaqs = isNamePage && initialResult ? nameFaqs(initialResult, pageStats) : [];
  const stats = result ? getNameStats(result.name) : null;
  const originNames = result && DB_MAP.get(normalizeName(result.name)) ? sameOrigin(result, 10) : [];
  const maxDecade = stats ? Math.max(...stats.decades, 1) : 1;
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
      affiliateBanner={<AffiliateBanner terms={["enxoval de bebê"]} label="enxoval de bebê" />}
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
          schema={isNamePage && initialResult ? [{
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: seoTitle,
            description: seoDescription,
            url: `https://www.clicaresolve.com.br${seoCanonical}`,
            inLanguage: "pt-BR",
          }, {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: pageFaqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }] : undefined}
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
                <p className="text-sm text-gray-300">{result.name} é um nome de origem {result.origin.toLowerCase()}.</p>
                {originNames.length > 0 && (
                  <p className="text-sm text-gray-400 mt-2">
                    Outros nomes de origem {result.origin.split("/")[0].toLowerCase()}:{" "}
                    {originNames.map((n, i) => (
                      <React.Fragment key={n.name}>
                        {i > 0 && ", "}
                        <a href={`/significado-nome/${slugify(n.name)}`} className="text-green-400 hover:text-green-300">{n.name}</a>
                      </React.Fragment>
                    ))}
                  </p>
                )}
              </div>

              {stats && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-base">📊</span>
                    <p className="text-xs font-semibold text-pink-300 uppercase tracking-wider">Popularidade no Brasil</p>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed">{popularityText(result.name, stats)}</p>
                  <div className="mt-4 flex items-end gap-1.5 h-28" role="img" aria-label={`Nascidos com o nome ${result.name} por década`}>
                    {stats.decades.map((d, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                        <div className="w-full rounded-t bg-gradient-to-t from-pink-500/70 to-sky-400/70" style={{ height: `${Math.max(2, Math.round((d / maxDecade) * 100))}%` }} title={`${DECADE_LABELS[i]}: ${formatNumber(d)}`} />
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-1.5 mt-1">
                    {DECADE_LABELS.map((l, i) => (
                      <span key={i} className="flex-1 text-center text-[10px] text-gray-500">{i === 0 ? "<1930" : l}</span>
                    ))}
                  </div>
                  <p className="text-[11px] text-gray-500 mt-2">Nascidos por década. Fonte: IBGE, Censo Demográfico 2010.</p>
                </div>
              )}

              {result.aliases && result.aliases.length > 0 && (
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="text-xs font-semibold text-sky-300 uppercase tracking-wider mb-2">Variações e grafias</p>
                  <p className="text-sm text-gray-300">{[result.name, ...result.aliases].join(" · ")}</p>
                </div>
              )}
            </div>

            {isNamePage && pageFaqs.length > 0 && (
              <div className="space-y-2">
                <h2 className="text-lg font-bold text-text mt-2">Perguntas frequentes sobre o nome {pageName}</h2>
                {pageFaqs.map((f) => (
                  <details key={f.question} className="p-4 rounded-xl bg-white/5 border border-white/10" open>
                    <summary className="text-sm font-semibold text-white cursor-pointer">{f.question}</summary>
                    <p className="text-sm text-gray-300 mt-2 leading-relaxed">{f.answer}</p>
                  </details>
                ))}
              </div>
            )}

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
      {/* Índice de todos os nomes: só na página geral. Nas páginas de nome, a
          lista inteira (580+ links iguais em todas) viraria conteúdo repetido. */}
      {isNamePage ? (
        <p className="mt-8 text-sm text-muted">
          <a href="/significado-nomes" className="text-green-400 hover:text-green-300">Ver o significado de todos os nomes da A a Z →</a>
        </p>
      ) : (
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
      )}
      <ToolContent
        toolName="Significado dos Nomes"
        category="Utilidades"
        data={{
          directAnswer: "O significado de um nome é consultado em uma base de dados com origens etimológicas e interpretações tradicionalmente associadas a cada nome próprio.",
          howItWorks: "A ferramenta busca em uma base com mais de 580 nomes o significado, origem etimológica (grega, latina, hebraica, etc) e curiosidades associadas a cada nome, ajudando pais que estão escolhendo um nome para o bebê ou pessoas curiosas sobre a origem do próprio nome.",
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
            { question: "Nomes compostos também são consultados?", answer: "Sim. Os compostos mais populares, como João Pedro, Pedro Henrique, Maria Eduarda e Ana Clara, têm página própria. Para os demais, consulte cada nome separadamente." },
            { question: "A popularidade do nome também é mostrada?", answer: "Em muitos casos sim, com dados sobre a frequência de uso do nome ao longo dos anos no Brasil." },
          ],
        }}
      />
    </ToolLayout>
  );
}
