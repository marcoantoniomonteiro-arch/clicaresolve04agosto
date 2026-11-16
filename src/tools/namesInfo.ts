// Informações extras das páginas de nome, calculadas a partir da base de nomes
// e dos dados do IBGE (Censo 2010). Tudo é calculado na hora, sem texto repetido.
import { NAMES_DB, NameEntry } from "./namesData";
import { IBGE_NOMES } from "./namesIbge";

export function nameSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export const DECADE_LABELS = ["antes de 1930", "1930", "1940", "1950", "1960", "1970", "1980", "1990", "2000"];
const DECADE_TEXT = ["antes de 1930", "década de 1930", "década de 1940", "década de 1950", "década de 1960", "década de 1970", "década de 1980", "década de 1990", "década de 2000"];

export interface NameStats {
  total: number;
  men: number;
  women: number;
  decades: number[];
  peakIndex: number;
  peakText: string;
  gender: "masculino" | "feminino" | "unissex";
  /** Posição entre os nomes do mesmo gênero na base do site (1 = mais comum) */
  rank: number;
  rankOf: number;
  trend: "em alta" | "em queda" | "estável";
}

const RANKS: { masculino: string[]; feminino: string[] } = (() => {
  const list = Object.entries(IBGE_NOMES).map(([slug, v]) => ({ slug, total: v[0], g: genderOf(v) }));
  const by = (g: string) => list.filter((x) => x.g === g || (x.g === "unissex")).sort((a, b) => b.total - a.total).map((x) => x.slug);
  return { masculino: by("masculino"), feminino: by("feminino") };
})();

function genderOf(v: number[]): "masculino" | "feminino" | "unissex" {
  const [, m, f] = v;
  if (m + f === 0) return "unissex";
  if (m / (m + f) >= 0.8) return "masculino";
  if (f / (m + f) >= 0.8) return "feminino";
  return "unissex";
}

export function getNameStats(name: string): NameStats | null {
  const slug = nameSlug(name);
  const v = IBGE_NOMES[slug];
  if (!v || !v[0]) return null;
  const [total, men, women, ...decades] = v;
  let peakIndex = 0;
  decades.forEach((d, i) => { if (d > decades[peakIndex]) peakIndex = i; });
  const gender = genderOf(v);
  const pool = gender === "feminino" ? RANKS.feminino : RANKS.masculino;
  const rank = pool.indexOf(slug) + 1;
  const last = decades[8], prev = decades[7];
  const trend = prev === 0 ? (last > 0 ? "em alta" : "estável") : last / prev >= 1.15 ? "em alta" : last / prev <= 0.85 ? "em queda" : "estável";
  return { total, men, women, decades, peakIndex, peakText: DECADE_TEXT[peakIndex], gender, rank, rankOf: pool.length, trend };
}

export function formatNumber(n: number): string {
  return n.toLocaleString("pt-BR");
}

/** Outros nomes da mesma origem (a origem principal, antes de "/") */
export function sameOrigin(entry: NameEntry, limit = 10): NameEntry[] {
  const main = entry.origin.split("/")[0].trim().toLowerCase();
  const self = nameSlug(entry.name);
  const seen = new Set<string>([self]);
  const out: NameEntry[] = [];
  for (const n of NAMES_DB) {
    const s = nameSlug(n.name);
    if (seen.has(s)) continue;
    if (n.origin.split("/")[0].trim().toLowerCase() === main) {
      seen.add(s);
      out.push(n);
    }
  }
  // Os mais populares primeiro
  out.sort((a, b) => (IBGE_NOMES[nameSlug(b.name)]?.[0] || 0) - (IBGE_NOMES[nameSlug(a.name)]?.[0] || 0));
  return out.slice(0, limit);
}

/** Perguntas frequentes da página do nome (texto e dados próprios de cada nome) */
export function nameFaqs(entry: NameEntry, stats: NameStats | null): { question: string; answer: string }[] {
  const m = entry.meaning.charAt(0).toLowerCase() + entry.meaning.slice(1);
  const faqs = [
    { question: `O que significa o nome ${entry.name}?`, answer: `${entry.name} significa "${m}". ${entry.curiosity}` },
    { question: `Qual é a origem do nome ${entry.name}?`, answer: `O nome ${entry.name} tem origem ${entry.origin.toLowerCase()}.` },
  ];
  if (stats) {
    faqs.push({
      question: `Quantas pessoas se chamam ${entry.name} no Brasil?`,
      answer: `Segundo o Censo 2010 do IBGE, ${formatNumber(stats.total)} pessoas se chamavam ${entry.name} no Brasil. O nome teve seu auge ${stats.peakIndex === 0 ? "entre os nascidos" : "na"} ${stats.peakText}.`,
    });
    faqs.push({
      question: `${entry.name} é nome masculino ou feminino?`,
      answer: stats.gender === "unissex"
        ? `${entry.name} é usado para os dois gêneros: ${formatNumber(stats.women)} mulheres e ${formatNumber(stats.men)} homens no Censo 2010.`
        : `${entry.name} é um nome ${stats.gender}: ${Math.round(((stats.gender === "feminino" ? stats.women : stats.men) / Math.max(1, stats.men + stats.women)) * 100)}% dos registros no Censo 2010 são de ${stats.gender === "feminino" ? "mulheres" : "homens"}.`,
    });
  }
  if (entry.aliases && entry.aliases.length) {
    faqs.push({ question: `Quais são as variações do nome ${entry.name}?`, answer: `As grafias mais comuns são: ${[entry.name, ...entry.aliases].join(", ")}.` });
  }
  return faqs;
}

const NAME_BY_SLUG: Map<string, string> = (() => {
  const m = new Map<string, string>();
  for (const n of NAMES_DB) if (!m.has(nameSlug(n.name))) m.set(nameSlug(n.name), n.name);
  return m;
})();

export interface NameLink { name: string; slug: string; note?: string }

// Pares que a regra de terminação acertaria por acaso, mas que não são o mesmo nome
const NOT_PAIRS = new Set(["maria", "mario"]);

/** Nome correspondente do outro gênero (Rafael → Rafaela, Paulo → Paula), se estiver na base */
export function counterpartName(name: string, stats: NameStats | null): NameLink | null {
  if (!stats || stats.gender === "unissex") return null;
  const s = nameSlug(name);
  if (NOT_PAIRS.has(s)) return null;
  const cands = stats.gender === "masculino"
    ? [s + "a", s.replace(/o$/, "a"), s.replace(/e$/, "a"), s.replace(/os$/, "a")]
    : [s.replace(/a$/, "o"), s.replace(/a$/, ""), s.replace(/a$/, "e")];
  for (const c of cands) {
    if (c === s || !NAME_BY_SLUG.has(c)) continue;
    const v = IBGE_NOMES[c];
    if (!v || !v[0] || genderOf(v) === stats.gender || genderOf(v) === "unissex") continue;
    return { name: NAME_BY_SLUG.get(c)!, slug: c, note: formatNumber(v[0]) };
  }
  return null;
}

/** Nomes vizinhos no ranking de popularidade (mesmo gênero) */
export function rankNeighbors(name: string, stats: NameStats | null, each = 2): NameLink[] {
  if (!stats || stats.rank <= 0) return [];
  const pool = stats.gender === "feminino" ? RANKS.feminino : RANKS.masculino;
  const i = stats.rank - 1;
  const out: NameLink[] = [];
  for (let j = Math.max(0, i - each); j <= Math.min(pool.length - 1, i + each); j++) {
    if (j === i) continue;
    const slug = pool[j];
    const n = NAME_BY_SLUG.get(slug);
    if (n) out.push({ name: n, slug, note: `${j + 1}º` });
  }
  return out;
}

/** Fatos calculados só com os dados do próprio nome (texto diferente em cada página) */
export function nameFacts(name: string, stats: NameStats | null): string[] {
  const letters = name.replace(/[^\p{L}]/gu, "");
  const vowels = letters.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^aeiouAEIOU]/g, "").length;
  const facts = [
    `${name} tem ${letters.length} letras (${vowels} vogais e ${letters.length - vowels} consoantes) e começa com a letra ${letters.charAt(0).toUpperCase()}.`,
  ];
  if (!stats) return facts;
  const d = stats.decades;
  const sum = d.reduce((a, b) => a + b, 0) || 1;
  const since1980 = Math.round(((d[6] + d[7] + d[8]) / sum) * 100);
  facts.push(`${since1980}% das pessoas chamadas ${name} no Censo 2010 nasceram a partir de 1980.`);
  if (stats.peakIndex !== 8 && d[stats.peakIndex] > 0) {
    const ratio = d[8] / d[stats.peakIndex];
    facts.push(ratio < 1
      ? `${formatNumber(d[8])} pessoas com esse nome nasceram nos anos 2000, ${Math.round((1 - ratio) * 100)}% a menos que no auge (${formatNumber(d[stats.peakIndex])} ${stats.peakIndex === 0 ? "nascidas antes de 1930" : "na " + stats.peakText}).`
      : `${formatNumber(d[8])} pessoas com esse nome nasceram nos anos 2000.`);
  } else {
    facts.push(`O nome nunca foi tão usado quanto nos anos 2000: ${formatNumber(d[8])} pessoas com esse nome nasceram na década.`);
  }
  const perMil = (stats.total / 190_755_799) * 1000;
  facts.push(perMil >= 1
    ? `Isso equivale a cerca de ${perMil.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} em cada mil brasileiros.`
    : `Isso equivale a cerca de 1 em cada ${formatNumber(Math.round(190_755_799 / stats.total))} brasileiros.`);
  return facts;
}
