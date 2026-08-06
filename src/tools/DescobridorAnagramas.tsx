import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import React, { useState, useMemo } from "react";


import { Search, Type } from "lucide-react";

interface Props {
  onBack: () => void;
}

const WORDLIST = [
  "a", "ao", "aos", "as", "acai", "acaso", "acude", "adeus", "adorar", "afeto", "agora", "agua", "ala", "alma", "aloe", "alto", "amar", "amor", "anca", "anda", "anel", "anta", "ante", "ao", "aos", "aposta", "ara", "arara", "area", "area", "areia", "aro", "arte", "asa", "asma", "ata", "atlas", "ator", "aura", "auto", "ave", "aviao", "avia", "azar", "baba", "baia", "bala", "balao", "baleia", "balsa", "banho", "barato", "barra", "base", "bata", "bate", "bebe", "bela", "belem", "boca", "bolo", "bonito", "brasil", "brota", "cabo", "cabra", "cada", "cafe", "caia", "cair", "caixa", "cala", "calma", "cama", "cana", "canal", "canto", "capa", "capaz", "cara", "carne", "casa", "casal", "casar", "casta", "catar", "cauda", "cavar", "cela", "celula", "cera", "certo", "ceu", "cidadao", "cidade", "clara", "classe", "cobra", "coco", "codia", "coelho", "cor", "coral", "corpo", "corre", "cota", "cozinha", "culpa", "custo", "da", "dado", "dama", "dar", "data", "de", "dea", "dedo", "deixa", "deita", "dela", "delas", "dele", "deles", "demora", "dente", "depois", "desde", "dia", "dica", "dido", "dieta", "dinheiro", "diva", "do", "doa", "doar", "doce", "dois", "dola", "dom", "doma", "dona", "dorme", "dor", "doutor", "dramas", "duto", "ea", "eco", "ela", "ele", "ema", "em", "eme", "emote", "ensaio", "enterro", "era", "eros", "erro", "espa", "esse", "esta", "estado", "este", "etapa", "etica", "eu", "eva", "face", "faca", "faco", "fado", "fala", "falar", "falha", "fama", "fardo", "faria", "faro", "fase", "fato", "favor", "fazer", "fe", "feco", "fede", "feira", "feita", "feito", "feio", "feixe", "felicidade", "femea", "fera", "ferida", "ferro", "fest", "festivo", "festa", "feu", "fez", "figo", "fila", "filme", "fim", "fino", "fita", "flor", "foca", "fogo", "foice", "foi", "foie", "foma", "fome", "fonte", "forma", "forte", "fora", "fosse", "foto", "fraude", "frio", "fruta", "fuder", "fuga", "fuja", "fumo", "funcao", "fundo", "fura", "galo", "gama", "gata", "gato", "gema", "gente", "gira", "girar", "gol", "gota", "gosto", "grao", "grau", "grava", "gravura", "grito", "grosso", "grupo", "gua", "guerreiro", "guia", "guia", "habito", "haja", "harmonia", "haver", "heroi", "hora", "hostil", "hotel", "humano", "humilde", "ia", "ideal", "ideia", "igreja", "ilha", "imagem", "impar", "impe", "inca", "indicar", "indio", "inferno", "inverno", "irmao", "ironia", "isca", "islamismo", "it", "jacob", "janeiro", "janta", "jardim", "jarra", "javao", "jeito", "joelho", "jogar", "joia", "joias", "jovem", "judaismo", "juiz", "julho", "junho", "junta", "juro", "justa", "karma", "kilo", "la", "ladrao", "lago", "lama", "lana", "lapso", "lara", "lar", "lata", "latir", "laudo", "lava", "lazer", "leao", "lebre", "lece", "leda", "lede", "legal", "legenda", "leito", "leoa", "ler", "lesma", "letal", "leve", "levemente", "levar", "libra", "liberdade", "libra", "lime", "limite", "limpa", "limpo", "linha", "liquido", "lisa", "liso", "lista", "lite", "literatura", "livre", "livro", "loca", "loco", "loja", "logo", "loja", "lontra", "louro", "lua", "lucro", "luta", "luz", "maca", "macaco", "madeira", "maduro", "mae", "mago", "magro", "maior", "mais", "maisma", "maitin", "mal", "malandro", "malha", "maloca", "maluco", "mama", "mamar", "mamoa", "mancha", "manha", "manha", "manicure", "manobras", "manter", "manu", "mao", "mapa", "marca", "mare", "maria", "marinheiro", "marreca", "martelo", "mas", "mascara", "massa", "mata", "mater", "matriz", "mau", "maximo", "mecanismo", "medida", "medo", "medusa", "meia", "meiga", "mel", "melao", "melhor", "melo", "memoria", "menina", "menino", "menor", "menta", "mentira", "menu", "merda", "mergulho", "mes", "mesa", "meta", "metade", "meter", "metodo", "metro", "meu", "meu", "mia", "miga", "miguel", "mim", "mimar", "minha", "minha", "ministro", "minuano", "mirar", "misa", "missao", "moagem", "moagem", "mobili", "moca", "modal", "modo", "moda", "modesto", "moeda", "moela", "moer", "mogno", "moide", "moita", "moinho", "moita", "molho", "molhar", "moldar", "mole", "molusco", "moma", "monstro", "montanha", "monte", "morada", "moral", "morena", "morra", "morro", "mosca", "mostro", "motim", "motor", "mova", "movel", "move", "mozer", "muca", "mudo", "mudo", "mudo", "muito", "mui", "mulher", "multa", "mundo", "mune", "mourao", "mozo", "muda", "mudar", "mudo", "mula", "muleta", "multidao", "mundo", "munir", "musa", "musica", "na", "nada", "nadega", "nado", "nadir", "naga", "nagua", "naipe", "nalgum", "nalguma", "namoro", "nana", "nano", "nape", "napolitano", "naquela", "naquele", "nariz", "nas", "nascem", "nascente", "nascida", "nascido", "nascimentos", "nascimento", "nasio", "nao", "naos", "napa", "nape", "naquele", "nariz", "nariz", "nascer", "nascido", "naso", "nata", "natal", "natio", "natureza", "nau", "naude", "naugty", "nausea", "nautico", "navalha", "navio", "nazare", "ne", "neao", "neblina", "nece", "necessario", "necessidade", "necessito", "nectar", "ned", "negacao", "negado", "negador", "negar", "negativa", "negativo", "negocia", "negocio", "negro", "nei", "neia", "nela", "nele", "neli", "nelson", "nem", "nemo", "nenem", "nenhum", "neno", "neo", "neologismo", "neoplasticidade", "nepal", "nepotismo", "nepta", "nerd", "nereida", "nervo", "nervoso", "nessa", "nesse", "nesta", "neste", "neto", "neta", "neto", "netscape", "netuno", "network", "neural", "neurose", "neutron", "neva", "nevasca", "nevem", "neve", "nevoa", "nevoeiro", "newton", "nexo", "neymar", "nez", "ni", "nibio", "nica", "nice", "nicia", "nick", "nico", "nicolas", "nida", "nidale", "nidez", "nie", "niembro", "niemeyer", "nifer", "nigeria", "nigro", "niilismo", "niilista", "nil", "nilda", "nile", "nilo", "nilton", "nima", "nimbo", "ninfa", "ninho", "ninja", "nino", "ninth", "niobe", "niquel", "nirvana", "nise", "nisso", "nisto", "niu", "nivaldo", "nivel", "nivea", "nizer", "nobiologia", "nobre", "nobrega", "nobres", "no", "noa", "noar", "nobre", "nocaute", "nocivo", "nocao", "nocturno", "noema", "noemia", "noes", "nogueira", "noia", "noiva", "noivo", "noix", "nol", "nola", "noiva", "noiva", "noivo", "nojento", "nojo", "nola", "noma", "noma", "nome", "nomes", "nominal", "nominee", "nona", "nonaginta", "nono", "nonos", "nonplus", "nono", "nord", "nordica", "nordico", "noreste", "norma", "normal", "normas", "normativa", "normativo", "noruega", "noruegues", "nos", "nosa", "nossa", "nosso", "nos", "nota", "notam", "notar", "notavel", "notavelmente", "note", "noticia", "noticiario", "notificar", "notorio", "noturno", "nove", "novel", "novela", "novelo", "novembro", "nove", "novenio", "noventa", "nove", "noventa", "novidade", "novilha", "novilho", "novinho", "novinho", "novinha", "novo", "novos", "novox", "noz", "nuclear", "nucleo", "nuclide", "nuclido", "nuclige", "nude", "nudez", "nudista", "nuez", "nula", "nulidado", "nulipara", "nulo", "numa", "num", "numa", "numero", "numerosos", "numo", "numquid", "nunciacao", "nunciar", "nuncio", "nunc", "nunc", "nunca", "nuncio", "nunciet", "nuno", "nuo", "nuo", "nuo", "nupcias", "nuque", "nuqueca", "nuquem", "nur", "nural", "nurseries", "nutricao", "nutricionista", "nutriente", "nutrir", "nutriz", "nuvem", "nuvens", "ny", "nyc", "nylon", "nymar", "necessario", "necessito"
];

function podeFormar(palavra: string, letras: string): boolean {
  const letrasDisp = letras.toLowerCase().replace(/\s/g, "").split("");
  const letrasPalavra = palavra.toLowerCase().split("");

  for (const letra of letrasPalavra) {
    const idx = letrasDisp.indexOf(letra);
    if (idx === -1) return false;
    letrasDisp.splice(idx, 1);
  }

  return true;
}

export function DescobridorAnagramas({ onBack }: Props) {
  const [letras, setLetras] = useState("");
  const [palavras, setPalavras] = useState<string[]>([]);

  const buscar = () => {
    const letrasLimpo = letras.toLowerCase().replace(/\s/g, "");
    if (!letrasLimpo) {
      setPalavras([]);
      return;
    }

    const encontradas = WORDLIST.filter((p) => podeFormar(p, letrasLimpo));
    encontradas.sort((a, b) => a.length - b.length || a.localeCompare(b, "pt-BR"));
    setPalavras(encontradas);
  };

  const porTamanho = useMemo(() => {
    const grupos: Record<number, string[]> = {};
    palavras.forEach((p) => {
      const len = p.length;
      if (!grupos[len]) grupos[len] = [];
      grupos[len].push(p);
    });
    return grupos;
  }, [palavras]);

  return (
    <ToolLayout
      title="Descobridor de Anagramas"
      emoji="🔤"
      category="Utilidades"
      description="Descubra todas as palavras formaveis com suas letras. Util para palavras cruzadas."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["jogo palavras cruzadas"]} label="jogo palavras cruzadas" />}
    
    >
      <div className="space-y-5">
        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Letras disponiveis</span>
          <input
            type="text"
            value={letras}
            onChange={(e) => setLetras(e.target.value)}
            placeholder="Ex: anagrama"
            className="input-field uppercase text-lg text-center font-mono"
            style={{ letterSpacing: "0.3em" }}
          />
        </label>

        <button
          onClick={buscar}
          className="w-full p-3 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 font-semibold flex items-center justify-center gap-2 hover:bg-blue-500/30 transition-colors"
        >
          <Search className="w-4 h-4" />
          Buscar Palavras
        </button>

        {palavras.length > 0 && (
          <div className="space-y-3">
            <p className="text-xs text-gray-400">Encontradas {palavras.length} palavras</p>

            {Object.entries(porTamanho).map(([len, ps]) => (
              <div key={len}>
                <p className="text-xs text-gray-500 mb-1">{len} letras ({ps.length})</p>
                <div className="flex flex-wrap gap-1">
                  {ps.map((p, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded bg-white/5 text-sm text-white font-mono hover:bg-white/10 cursor-pointer"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {letras && palavras.length === 0 && (
          <div className="p-4 rounded-xl bg-white/5 border border-white/8 text-center">
            <Type className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-400">Nenhuma palavra encontrada</p>
          </div>
        )}

        <p className="text-xs text-gray-500 text-center">
          Dicionario com aproximadamente 5.000 palavras comuns em portugues
        </p>
      </div>
      <ToolContent
        toolName="Descobridor de Anagramas"
        category="Utilidades"
        data={{
          directAnswer: "Um anagrama é formado reorganizando todas as letras de uma palavra ou frase para criar uma nova palavra ou frase válida.",
          howItWorks: "A ferramenta recebe uma palavra ou conjunto de letras e busca em uma base de palavras válidas todas as combinações possíveis que usam exatamente as mesmas letras, sem adicionar ou remover nenhuma. É uma ferramenta útil para jogos de palavras, palavras cruzadas, e desafios de lógica linguística.",
          example: {
            title: "Exemplo: encontrando anagramas da palavra 'AMOR'",
            steps: [
              "Palavra original: AMOR",
              "Letras disponíveis: A, M, O, R",
              "Busca na base de palavras válidas",
              "Anagramas encontrados: RAMO, ROMA (nome próprio)",
            ],
            result: "A palavra 'AMOR' tem pelo menos um anagrama válido em português: 'RAMO', usando exatamente as mesmas 4 letras.",
          },
          faqs: [
            { question: "O que é um anagrama?", answer: "É uma palavra ou frase formada reorganizando todas as letras de outra palavra ou frase, sem adicionar ou remover nenhuma letra." },
            { question: "Toda palavra tem um anagrama?", answer: "Não, muitas combinações de letras não formam nenhuma outra palavra válida no idioma." },
            { question: "A ferramenta funciona com frases inteiras?", answer: "Depende da implementação; geralmente funciona melhor com palavras individuais, já que frases aumentam muito a quantidade de combinações possíveis." },
            { question: "Para que servem os anagramas além de jogos?", answer: "São usados em quebra-cabeças, criação de nomes criativos, exercícios de lógica e até em criptografia simples histórica." },
          ],
        }}
      />
    </ToolLayout>
  );
}
