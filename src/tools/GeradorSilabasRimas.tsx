import React, { useState, useMemo } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";

interface Props {
  onBack: () => void;
}

const rhymeBase: Record<string, string[]> = {
  "ão": ["coração", "paixão", "canção", "emoção", "razão", "lição", "verão", "botão"],
  "ar": ["amar", "cantar", "voar", "sonhar", "encontrar", "lembrar", "chorar", "andar"],
  "ida": ["vida", "partida", "saída", "querida", "ferida", "guia", "subida", "descida"],
  "ado": ["passado", "cuidado", "amado", "sonhado", "abraçado", "abraço", "pecado", "dado"],
  "ente": ["gente", "mente", "presente", "serpente", "fonte", "quentemente", "dormente", "crente"],
  "ura": ["altura", "ventura", "pintura", "abertura", "bravura", "brandura", "doçura", "lisura"],
  "agem": ["viagem", "coragem", "homenagem", "paragem", "passagem", "mensagem", "folhagem", "vantagem"],
  "eza": ["beleza", "natureza", "riqueza", "pureza", "forteza", "cruzeza", "lebreza", "dureza"],
  "ina": ["menina", "rapina", "divina", "ruína", "oficina", "cozinha", "lagartixa", "quina"],
  "ito": ["bonito", "infinito", "bendito", "amigo", "escrevito", "permito", "desdito", "invito"],
  "ado2": ["macho", "tacho", "facho", "sacho", "cacho", "lacho", "nacho", "bacho"],
  "el": ["mel", "fel", "papel", "pastel", "cordel", "pincel", "rebel", "anel"],
  "or": ["amor", "dor", "flor", "cor", "calor", "rumor", "ardor", "mordor"],
  "al": ["mal", "tal", "cal", "val", "nadal", "sinal", "final", "rural"],
  "oz": ["feroz", "atroz", "voz", "noz", "veloz", "froz", "algoz", "choz"],
  "uz": ["luz", "cruz", "conduz", "traduz", "reduz", "induz", "seduz", "produz"],
  "ar2": ["mar", "lar", "far", "bar", "tar", "gar", "char", "var"],
  "aria": ["alegria", "harmonia", "poesia", "energia", "melhoria", "sintonia", "guia", "dia"],
  "eira": ["bandeja", "geleira", "fruteira", "cadeira", "peneira", "besteira", "traveira", "ladeira"],
  "oso": ["formoso", "doloroso", "amoroso", "precioso", "valioso", "corajoso", "saboroso", "frondoso"],
};

function countSyllables(word: string): number {
  const clean = word.toLowerCase().trim();
  if (!clean) return 0;
  const groups = clean.match(/[aeiouáéíóúâêîôûãõäëïöü]+/g);
  if (!groups) return 0;
  return groups.length;
}

function findRhymes(word: string): string[] {
  const clean = word.toLowerCase().trim().replace(/[^a-záéíóúâêîôûãõç]/g, "");
  if (clean.length < 2) return [];
  const result = new Set<string>();
  for (const ending of Object.keys(rhymeBase)) {
    const stripped = ending.replace(/\d+$/, "");
    if (clean.endsWith(stripped) && clean.length > stripped.length) {
      for (const candidate of rhymeBase[ending]) {
        if (candidate !== clean) result.add(candidate);
      }
    }
  }
  return [...result].slice(0, 12);
}

export function GeradorSilabasRimas({ onBack }: Props) {
  const [text, setText] = useState("");

  const { syllables, rhymes, words } = useMemo(() => {
    const words = text.trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) return { syllables: 0, rhymes: [] as string[], words: [] as string[] };
    const totalSyl = words.reduce((sum, w) => sum + countSyllables(w), 0);
    const lastWord = words[words.length - 1];
    const rhymes = findRhymes(lastWord);
    return { syllables: totalSyl, rhymes, words };
  }, [text]);

  const copy = (val: string) => {
    if (val) navigator.clipboard.writeText(val);
  };

  return (
    <ToolLayout
      title="Contador de Sílabas e Rimas"
      emoji="🎵"
      category="Educação"
      description="Conte sílabas aproximadas e encontre rimas para palavras em português."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["livro poesia"]} label="livro poesia" />}
    >
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Digite uma palavra ou frase</span>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="coração"
            className="input-field"
          />
        </label>

        {text.trim() && (
          <>
            <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
              <p className="text-xs text-green-400">Sílabas (aproximado)</p>
              <p className="text-3xl font-bold text-green-400">{syllables}</p>
              <p className="text-xs text-gray-500 mt-1">
                {words.length} {words.length === 1 ? "palavra" : "palavras"}
              </p>
            </div>

            {words.length > 0 && (
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs text-gray-400 mb-1">Palavra analisada</p>
                <p className="text-sm font-mono text-white">{words[words.length - 1]}</p>
              </div>
            )}

            <div>
              <p className="text-sm text-gray-400 mb-2">Sugestões de rima</p>
              {rhymes.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {rhymes.map((r) => (
                    <button
                      key={r}
                      onClick={() => copy(r)}
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 hover:border-green-500/40 hover:text-green-400 transition-all"
                    >
                      {r}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">Nenhuma rima encontrada na base para esta palavra.</p>
              )}
            </div>
          </>
        )}

        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
          <p className="text-xs text-gray-500 leading-relaxed">
            A contagem de sílabas é uma aproximação baseada em grupos de vogais. A separação silábica oficial tem regras mais complexas que podem gerar pequenas diferenças.
          </p>
        </div>
      </div>

      <ToolContent
        toolName="Contador de Sílabas e Rimas"
        category="Educação"
        data={{
          directAnswer: "A contagem de sílabas identifica quantos grupos sonoros (vogais ou ditongos) existem em uma palavra; o gerador de rimas sugere palavras que terminam com o mesmo som, útil para quem escreve letras de música ou poesia.",
          howItWorks: "A contagem de sílabas usa uma aproximação baseada na identificação de grupos de vogais na palavra - cada grupo de vogais consecutivas geralmente forma uma sílaba em português. Esta é uma estimativa útil para o dia a dia, mas a separação silábica oficial da língua portuguesa tem regras mais complexas (ditongos, hiatos, dígrafos) que podem gerar pequenas diferenças em casos específicos. O gerador de rimas busca, em uma base de palavras comuns organizadas por terminação sonora, sugestões que rimam com a palavra digitada.",
          example: {
            title: "Exemplo: contando sílabas e buscando rimas para 'coração'",
            steps: [
              `Palavra: coração`,
              `Grupos de vogais identificados: co-ra-ção`,
              `Contagem aproximada: 3 sílabas`,
              `Rimas sugeridas (terminação 'ão'): paixão, canção, emoção`,
            ],
            result: "A palavra tem aproximadamente 3 sílabas, e há opções de rima disponíveis na mesma terminação sonora.",
          },
          faqs: [
            { question: "A contagem de sílabas é 100% precisa?", answer: "É uma aproximação boa para uso geral, mas casos com ditongos, hiatos ou dígrafos específicos podem ter pequenas variações em relação à separação silábica oficial." },
            { question: "De onde vêm as sugestões de rima?", answer: "De uma base de palavras comuns em português, organizadas pela terminação sonora final, útil para composição de letras de música e poesia." },
            { question: "Nem toda palavra tem rima sugerida?", answer: "Correto, a base de dados cobre as terminações mais comuns, mas palavras muito específicas ou raras podem não ter sugestões disponíveis ainda." },
            { question: "Serve para que tipo de escrita?", answer: "É útil para quem escreve letras de música, poesias, raps, jingles publicitários ou qualquer texto que se beneficie de rimas." },
          ],
        }}
      />
    </ToolLayout>
  );
}
