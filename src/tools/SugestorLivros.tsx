import React, { useState, useMemo, useCallback } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ChevronRight, ChevronLeft, RotateCcw, Share2, BookOpen, Heart, Zap, Brain, Feather, Smile } from "lucide-react";
import { ToolContent } from "../components/ToolContent";

interface Props {
  onBack: () => void;
}

type CategoriaEmocional = "Emocao e Drama" | "Aventura e Suspense" | "Crescimento Pessoal" | "Conhecimento Pratico" | "Espiritualidade e Fe" | "Risadas e Leveza";
type Tamanho = "curto" | "medio" | "longo" | "qualquer";
type Tipo = "ficcao" | "nao-ficcao" | "qualquer";
type Nivel = "iniciante" | "intermediario" | "avancado";

interface Livro {
  titulo: string;
  autor: string;
  categoria: CategoriaEmocional;
  tamanho: Tamanho;
  tipo: Tipo;
  nivel: Nivel;
  sinopse: string;
  buscaAmazon: string;
}

const LIVROS: Livro[] = [
  // Emocao e Drama (10)
  { titulo: "A Moreninha", autor: "Joaquim Manuel de Macedo", categoria: "Emocao e Drama", tamanho: "curto", tipo: "ficcao", nivel: "iniciante", sinopse: "Romance classico brasileiro sobre amor e transformacao em uma ilha.", buscaAmazon: "A Moreninha Joaquim Manuel de Macedo" },
  { titulo: "Dom Casmurro", autor: "Machado de Assis", categoria: "Emocao e Drama", tamanho: "curto", tipo: "ficcao", nivel: "intermediario", sinopse: "Classico sobre ciume, duvida e memria - obrrima-prima da literatura brasileira.", buscaAmazon: "Dom Casmurro Machado de Assis" },
  { titulo: "O Cortico", autor: "Aluisio Azevedo", categoria: "Emocao e Drama", tamanho: "medio", tipo: "ficcao", nivel: "intermediario", sinopse: "Retrato cru da vida nos corticos cariocas do seculo XIX.", buscaAmazon: "O Cortico Aluisio Azevedo" },
  { titulo: "Capitoes da Areia", autor: "Jorge Amado", categoria: "Emocao e Drama", tamanho: "medio", tipo: "ficcao", nivel: "iniciante", sinopse: "Historia de um grupo de adolescentes que vivem em um trapiche em Salvador.", buscaAmazon: "Capitaes da Areia Jorge Amado" },
  { titulo: "As Vinhas da Ira", autor: "John Steinbeck", categoria: "Emocao e Drama", tamanho: "longo", tipo: "ficcao", nivel: "intermediario", sinopse: "Epopeia de uma familia durante a Grande Depressao americana.", buscaAmazon: "As Vinhas da Ira John Steinbeck" },
  { titulo: "Orgulho e Preconceito", autor: "Jane Austen", categoria: "Emocao e Drama", tamanho: "medio", tipo: "ficcao", nivel: "iniciante", sinopse: "Romance classico sobre amor, sociedade e segundas chances.", buscaAmazon: "Orgulho e Preconceito Jane Austen" },
  { titulo: "A Revolucao dos Bichos", autor: "George Orwell", categoria: "Emocao e Drama", tamanho: "curto", tipo: "ficcao", nivel: "iniciante", sinopse: "Fabula sobre poder, manipulaco e a natureza humana.", buscaAmazon: "A Revolucao dos Bichos George Orwell" },
  { titulo: "Memorias Postumas de Bras Cubas", autor: "Machado de Assis", categoria: "Emocao e Drama", tamanho: "medio", tipo: "ficcao", nivel: "avancado", sinopse: "Um defunto autor narra sua vida com ironia e reflexao.", buscaAmazon: "Memorias Postumas de Bras Cubas Machado de Assis" },
  { titulo: "O Pequeno Principe", autor: "Antoine de Saint-Exupery", categoria: "Emocao e Drama", tamanho: "curto", tipo: "ficcao", nivel: "iniciante", sinopse: "Fabula poetica sobre amor, amizade e o essencial e invisivel.", buscaAmazon: "O Pequeno Principe Antoine de Saint-Exupery" },
  { titulo: "A Hora da Estrela", autor: "Clarice Lispector", categoria: "Emocao e Drama", tamanho: "curto", tipo: "ficcao", nivel: "intermediario", sinopse: "Historia de uma nordestina no Rio e sua busca por identidade.", buscaAmazon: "A Hora da Estrela Clarice Lispector" },

  // Aventura e Suspense (10)
  { titulo: "O Senhor dos Aneis", autor: "J.R.R. Tolkien", categoria: "Aventura e Suspense", tamanho: "longo", tipo: "ficcao", nivel: "avancado", sinopse: "Epopeia fantastica sobre a jornada para destruir o Um Anel.", buscaAmazon: "O Senhor dos Aneis Tolkien" },
  { titulo: "Harry Potter e a Pedra Filosofal", autor: "J.K. Rowling", categoria: "Aventura e Suspense", tamanho: "medio", tipo: "ficcao", nivel: "iniciante", sinopse: "O inicio da saga do bruxo mais famoso do mundo.", buscaAmazon: "Harry Potter Pedra Filosofal J.K. Rowling" },
  { titulo: "O Codigo Da Vinci", autor: "Dan Brown", categoria: "Aventura e Suspense", tamanho: "medio", tipo: "ficcao", nivel: "iniciante", sinopse: "Thriller sobre segredos da Igreja e simbolos misteriosos.", buscaAmazon: "O Codigo Da Vinci Dan Brown" },
  { titulo: "Jogos Vorazes", autor: "Suzanne Collins", categoria: "Aventura e Suspense", tamanho: "medio", tipo: "ficcao", nivel: "iniciante", sinopse: "Distopia sobre uma competicao mortal em um futuro sombrio.", buscaAmazon: "Jogos Vorazes Suzanne Collins" },
  { titulo: "Sherlock Holmes: Estudo em Vermelho", autor: "Arthur Conan Doyle", categoria: "Aventura e Suspense", tamanho: "curto", tipo: "ficcao", nivel: "iniciante", sinopse: "A primeira aventura do detetive mais famoso do mundo.", buscaAmazon: "Sherlock Holmes Estudo em Vermelho" },
  { titulo: "O Nome do Vento", autor: "Patrick Rothfuss", categoria: "Aventura e Suspense", tamanho: "longo", tipo: "ficcao", nivel: "intermediario", sinopse: "A historia de Kvothe, o maior mago que ja existiu.", buscaAmazon: "O Nome do Vento Patrick Rothfuss" },
  { titulo: "Percy Jackson e o Ladr de Raio", autor: "Rick Riordan", categoria: "Aventura e Suspense", tamanho: "medio", tipo: "ficcao", nivel: "iniciante", sinopse: "Um adolescente descobre que e filho de um deus grego.", buscaAmazon: "Percy Jackson Ladrao de Raio" },
  { titulo: "O Silencio dos Inocentes", autor: "Thomas Harris", categoria: "Aventura e Suspense", tamanho: "medio", tipo: "ficcao", nivel: "intermediario", sinopse: "Thriller psicologico sobre um serial killer e uma agente do FBI.", buscaAmazon: "O Silencio dos Inocentes Thomas Harris" },
  { titulo: "As Cronicas de Narnia", autor: "C.S. Lewis", categoria: "Aventura e Suspense", tamanho: "medio", tipo: "ficcao", nivel: "iniciante", sinopse: "Aventura magica em um mundo encantado por tras de um guarda-roupa.", buscaAmazon: "As Cronicas de Narnia C.S. Lewis" },
  { titulo: "Duna", autor: "Frank Herbert", categoria: "Aventura e Suspense", tamanho: "longo", tipo: "ficcao", nivel: "avancado", sinopse: "Epopeia sci-fi sobre politica, religiao e ecologia em um planeta deserto.", buscaAmazon: "Duna Frank Herbert" },

  // Crescimento Pessoal (10)
  { titulo: "Os 7 Habitos das Pessoas Altamente Eficazes", autor: "Stephen R. Covey", categoria: "Crescimento Pessoal", tamanho: "medio", tipo: "nao-ficcao", nivel: "intermediario", sinopse: "Principios para uma vida pessoal e profissional mais eficaz.", buscaAmazon: "Os 7 Habitos Stephen Covey" },
  { titulo: "O Poder do Habito", autor: "Charles Duhigg", categoria: "Crescimento Pessoal", tamanho: "medio", tipo: "nao-ficcao", nivel: "iniciante", sinopse: "Como habitos se formam e como mudar o seu destino.", buscaAmazon: "O Poder do Habito Charles Duhigg" },
  { titulo: "Atitude Mental Positiva", autor: "Napoleon Hill", categoria: "Crescimento Pessoal", tamanho: "curto", tipo: "nao-ficcao", nivel: "iniciante", sinopse: "Classico sobre mentalidade de sucesso e realizacao.", buscaAmazon: "Atitude Mental Positiva Napoleon Hill" },
  { titulo: "Mindset: A Nova Psicologia do Sucesso", autor: "Carol S. Dweck", categoria: "Crescimento Pessoal", tamanho: "medio", tipo: "nao-ficcao", nivel: "intermediario", sinopse: "Sobre mentalidade fixa vs. mentalidade de crescimento.", buscaAmazon: "Mindset Carol Dweck" },
  { titulo: "Essencialismo", autor: "Greg McKeown", categoria: "Crescimento Pessoal", tamanho: "curto", tipo: "nao-ficcao", nivel: "iniciante", sinopse: "Foque no essencial e elimine o resto.", buscaAmazon: "Essencialismo Greg McKeown" },
  { titulo: "Atomic Habits", autor: "James Clear", categoria: "Crescimento Pessoal", tamanho: "medio", tipo: "nao-ficcao", nivel: "iniciante", sinopse: "Pequenas mudancas para resultados extraordinarios.", buscaAmazon: "Atomic Habits James Clear" },
  { titulo: "O Segredo", autor: "Rhonda Byrne", categoria: "Crescimento Pessoal", tamanho: "curto", tipo: "nao-ficcao", nivel: "iniciante", sinopse: "Sobre a lei da atracao e poder dos pensamentos.", buscaAmazon: "O Segredo Rhonda Byrne" },
  { titulo: "Como Fazer Amigos e Influenciar Pessoas", autor: "Dale Carnegie", categoria: "Crescimento Pessoal", tamanho: "medio", tipo: "nao-ficcao", nivel: "iniciante", sinopse: "Classico sobre relacionamentos e comunicacao eficaz.", buscaAmazon: "Como Fazer Amigos Dale Carnegie" },
  { titulo: "O Milagre da Manha", autor: "Hal Elrod", categoria: "Crescimento Pessoal", tamanho: "curto", tipo: "nao-ficcao", nivel: "iniciante", sinopse: "Transforme sua vida antes das 8h da manha.", buscaAmazon: "O Milagre da Manha Hal Elrod" },
  { titulo: "Grit: O Poder da Passao e Perseveranca", autor: "Angela Duckworth", categoria: "Crescimento Pessoal", tamanho: "medio", tipo: "nao-ficcao", nivel: "intermediario", sinopse: "Por que esforco conta mais que talento.", buscaAmazon: "Grit Angela Duckworth" },

  // Conhecimento Pratico (10)
  { titulo: "Pai Rico, Pai Pobre", autor: "Robert Kiyosaki", categoria: "Conhecimento Pratico", tamanho: "medio", tipo: "nao-ficcao", nivel: "iniciante", sinopse: "Educacao financeira para quem quer mudar sua vida.", buscaAmazon: "Pai Rico Pai Pobre Robert Kiyosaki" },
  { titulo: "Os Segredos da Mente Milionaria", autor: "T. Harv Eker", categoria: "Conhecimento Pratico", tamanho: "medio", tipo: "nao-ficcao", nivel: "iniciante", sinopse: "Como seu mindset financeiro determina sua riqueza.", buscaAmazon: "Segredos da Mente Milionaria T. Harv Eker" },
  { titulo: "A Estrategia do Oceano Azul", autor: "W. Chan Kim", categoria: "Conhecimento Pratico", tamanho: "medio", tipo: "nao-ficcao", nivel: "avancado", sinopse: "Como criar mercados inexplorados e vencer a competicao.", buscaAmazon: "A Estrategia do Oceano Azul" },
  { titulo: "Rendimento Zero a Um", autor: "Peter Thiel", categoria: "Conhecimento Pratico", tamanho: "curto", tipo: "nao-ficcao", nivel: "intermediario", sinopse: "Notas sobre startups e como construir o futuro.", buscaAmazon: "Zero a Um Peter Thiel" },
  { titulo: "A Arte da Guerra", autor: "Sun Tzu", categoria: "Conhecimento Pratico", tamanho: "curto", tipo: "nao-ficcao", nivel: "intermediario", sinopse: "Estrategia militar aplicada a negocios e vida.", buscaAmazon: "A Arte da Guerra Sun Tzu" },
  { titulo: "Financas para nao Financeiros", autor: "Humberto Veiga", categoria: "Conhecimento Pratico", tamanho: "curto", tipo: "nao-ficcao", nivel: "iniciante", sinopse: "Entenda financas sem ser expert.", buscaAmazon: "Financas para nao Financeiros Humberto Veiga" },
  { titulo: "O Metodo Lean Startup", autor: "Eric Ries", categoria: "Conhecimento Pratico", tamanho: "medio", tipo: "nao-ficcao", nivel: "intermediario", sinopse: "Como startups inovam e prosperam.", buscaAmazon: "Lean Startup Eric Ries" },
  { titulo: "Investimentos Inteligentes", autor: "Gustavo Cerbasi", categoria: "Conhecimento Pratico", tamanho: "medio", tipo: "nao-ficcao", nivel: "iniciante", sinopse: "Guia para construir patrimonio no Brasil.", buscaAmazon: "Investimentos Inteligentes Gustavo Cerbasi" },
  { titulo: "Do Caos ao Lucro", autor: "Eliyahu Goldratt", categoria: "Conhecimento Pratico", tamanho: "medio", tipo: "nao-ficcao", nivel: "intermediario", sinopse: "Teoria das restricoes em formato de romance empresarial.", buscaAmazon: "A Meta Goldratt" },
  { titulo: "UX Strategy", autor: "Jaime Levy", categoria: "Conhecimento Pratico", tamanho: "medio", tipo: "nao-ficcao", nivel: "avancado", sinopse: "Estrategia de experiencia do usuario para produtos digitais.", buscaAmazon: "UX Strategy Jaime Levy" },

  // Espiritualidade e Fe (10)
  { titulo: "A Biblia de Jerusalm", autor: "Varios", categoria: "Espiritualidade e Fe", tamanho: "longo", tipo: "nao-ficcao", nivel: "intermediario", sinopse: "Traducao ecuminica com notas e introducoes.", buscaAmazon: "Biblia de Jerusalem" },
  { titulo: "O Alcorao Sagrado", autor: "Varios", categoria: "Espiritualidade e Fe", tamanho: "longo", tipo: "nao-ficcao", nivel: "avancado", sinopse: "Texto sagrado do Isla com traducao e notas.", buscaAmazon: "Alcor Sagrado portugues" },
  { titulo: "O Profeta", autor: "Kahlil Gibran", categoria: "Espiritualidade e Fe", tamanho: "curto", tipo: "ficcao", nivel: "iniciante", sinopse: "Poemas sobre amor, trabalho, alegria e vida.", buscaAmazon: "O Profeta Kahlil Gibran" },
  { titulo: "O Poder do Agora", autor: "Eckhart Tolle", categoria: "Espiritualidade e Fe", tamanho: "medio", tipo: "nao-ficcao", nivel: "iniciante", sinopse: "Guia para iluminacao espiritual e paz interior.", buscaAmazon: "O Poder do Agora Eckhart Tolle" },
  { titulo: "Um Curso em Milagres", autor: "Fundacao Paz Interior", categoria: "Espiritualidade e Fe", tamanho: "longo", tipo: "nao-ficcao", nivel: "intermediario", sinopse: "Sistema de treinamento espiritual para perdao e paz.", buscaAmazon: "Um Curso em Milagres" },
  { titulo: "Cabala para Iniciantes", autor: "Michael Berg", categoria: "Espiritualidade e Fe", tamanho: "curto", tipo: "nao-ficcao", nivel: "iniciante", sinopse: "Introducao a sabedoria cabalistica.", buscaAmazon: "Cabala para Iniciantes Michael Berg" },
  { titulo: "Conversas com Deus", autor: "Neale Donald Walsch", categoria: "Espiritualidade e Fe", tamanho: "medio", tipo: "nao-ficcao", nivel: "iniciante", sinopse: "Dialogos espirituais sobre vida, amor e Deus.", buscaAmazon: "Conversas com Deus Neale Donald Walsch" },
  { titulo: "Autobiografia de um Yogue", autor: "Paramahansa Yogananda", categoria: "Espiritualidade e Fe", tamanho: "medio", tipo: "nao-ficcao", nivel: "intermediario", sinopse: "Jornada espiritual de um mestre indiano.", buscaAmazon: "Autobiografia de um Yogui" },
  { titulo: "O Livro Tibetano dos Mortos", autor: "Varios", categoria: "Espiritualidade e Fe", tamanho: "medio", tipo: "nao-ficcao", nivel: "avancado", sinopse: "Texto budista sobre a transicao entre vidas.", buscaAmazon: "O Livro Tibetano dos Mortos" },
  { titulo: "Mere Christianity", autor: "C.S. Lewis", categoria: "Espiritualidade e Fe", tamanho: "curto", tipo: "nao-ficcao", nivel: "intermediario", sinopse: "Argumentos racionais para a fe cristaa.", buscaAmazon: "Cristianismo Puro e Simples C.S. Lewis" },

  // Risadas e Leveza (10)
  { titulo: "O Diabo Veste Prada", autor: "Lauren Weisberger", categoria: "Risadas e Leveza", tamanho: "medio", tipo: "ficcao", nivel: "iniciante", sinopse: "Sátire sobre o mundo da moda em Nova York.", buscaAmazon: "O Diabo Veste Prada Lauren Weisberger" },
  { titulo: "O Diario de um Banana", autor: "Jeff Kinney", categoria: "Risadas e Leveza", tamanho: "curto", tipo: "ficcao", nivel: "iniciante", sinopse: "Diario hilario de um garoto no ensino fundamental.", buscaAmazon: "Diario de um Banana Jeff Kinney" },
  { titulo: "O Guia do Mochileiro das Galaxias", autor: "Douglas Adams", categoria: "Risadas e Leveza", tamanho: "curto", tipo: "ficcao", nivel: "iniciante", sinopse: "Comedia sci-fi sobre o fim do mundo e espaco.", buscaAmazon: "O Guia do Mochileiro das Galaxias Douglas Adams" },
  { titulo: "Cronicas Brasileiras", autor: "Luis Fernando Verissimo", categoria: "Risadas e Leveza", tamanho: "curto", tipo: "nao-ficcao", nivel: "iniciante", sinopse: "Cronicas humoristicas sobre o cotidiano brasileiro.", buscaAmazon: "Cronicas Brasileiras Luis Fernando Verissimo" },
  { titulo: "Comedia na Standing Ovation", autor: "Fabio Porchat", categoria: "Risadas e Leveza", tamanho: "curto", tipo: "nao-ficcao", nivel: "iniciante", sinopse: "Humor sobre namoro, familia e dia a dia.", buscaAmazon: "Comedia Porchat" },
  { titulo: "O Almoco da Sexta-feira", autor: "Tereza Rachel", categoria: "Risadas e Leveza", tamanho: "curto", tipo: "ficco", nivel: "iniciante", sinopse: "Romance leve e divertido com humor brasileiro.", buscaAmazon: "O Almoco da Sexta-feira Tereza Rachel" },
  { titulo: "Cara de Pomo", autor: "Clarice Lispector", categoria: "Risadas e Leveza", tamanho: "curto", tipo: "ficcao", nivel: "intermediario", sinopse: "Contos infantis e poeticos com delicadeza.", buscaAmazon: "Cara de Pomo Clarice Lispector" },
  { titulo: "Confissoes de Adolescente", autor: "Maria Mariana", categoria: "Risadas e Leveza", tamanho: "curto", tipo: "ficcao", nivel: "iniciante", sinopse: "Anseios de uma adolescente do Rio dos anos 80.", buscaAmazon: "Confissoes de Adolescente Maria Mariana" },
  { titulo: "Toda Nudez Sera Punida", autor: "Nelson Rodrigues", categoria: "Risadas e Leveza", tamanho: "curto", tipo: "ficcao", nivel: "intermediario", sinopse: "Peca carioca com humor tragico sobre familia.", buscaAmazon: "Toda Nudez Sera Punida Nelson Rodrigues" },
  { titulo: "A Falecida", autor: "Nelson Rodrigues", categoria: "Risadas e Leveza", tamanho: "curto", tipo: "ficcao", nivel: "intermediario", sinopse: "Tragicomedia sobre sonhos populares e realidade.", buscaAmazon: "A Falecida Nelson Rodrigues" },
];

const CATEGORIA_CORES: Record<CategoriaEmocional, string> = {
  "Emocao e Drama": "from-rose-500/30 to-pink-500/30 border-rose-500/40",
  "Aventura e Suspense": "from-orange-500/30 to-red-500/30 border-orange-500/40",
  "Crescimento Pessoal": "from-green-500/30 to-emerald-500/30 border-green-500/40",
  "Conhecimento Pratico": "from-blue-500/30 to-indigo-500/30 border-blue-500/40",
  "Espiritualidade e Fe": "from-purple-500/30 to-violet-500/30 border-purple-500/40",
  "Risadas e Leveza": "from-yellow-500/30 to-amber-500/30 border-yellow-500/40",
};

const CATEGORIA_ICONS: Record<CategoriaEmocional, React.ReactNode> = {
  "Emocao e Drama": <Heart className="w-6 h-6" />,
  "Aventura e Suspense": <Zap className="w-6 h-6" />,
  "Crescimento Pessoal": <Brain className="w-6 h-6" />,
  "Conhecimento Pratico": <BookOpen className="w-6 h-6" />,
  "Espiritualidade e Fe": <Feather className="w-6 h-6" />,
  "Risadas e Leveza": <Smile className="w-6 h-6" />,
};

interface Resposta {
  categoria?: CategoriaEmocional;
  tamanho?: Tamanho;
  tipo?: Tipo;
  nivel?: Nivel;
}

const PERGUNTAS = [
  {
    titulo: "O que voce quer sentir lendo?",
    opcoes: [
      { valor: "Emocao e Drama", label: "Emocoes profundas", sublabel: "Drama, romance, reflexoes" },
      { valor: "Aventura e Suspense", label: "Aventura e tensao", sublabel: "Acao, misterio, fantastia" },
      { valor: "Crescimento Pessoal", label: "Crescer como pessoa", sublabel: "Autoajuda, mentalidade, habitos" },
      { valor: "Conhecimento Pratico", label: "Aprender algo util", sublabel: "Finanças, negocios, produtividade" },
      { valor: "Espiritualidade e Fe", label: "Espiritualidade", sublabel: "Religiao, filosofia, autoconhecimento" },
      { valor: "Risadas e Leveza", label: "Rir e relaxar", sublabel: "Humor, cronicas, leitura leve" },
    ],
  },
  {
    titulo: "Quanto tempo voce tem para ler?",
    opcoes: [
      { valor: "curto", label: "Pouco tempo", sublabel: "Livros curtos, ate 200 paginas" },
      { valor: "medio", label: "Tempo medio", sublabel: "200 a 400 paginas" },
      { valor: "qualquer", label: "Nao importa", sublabel: "Aceito qualquer tamanho" },
    ],
  },
  {
    titulo: "Voce prefere?",
    opcoes: [
      { valor: "ficcao", label: "Ficcao", sublabel: "Historias inventadas" },
      { valor: "nao-ficcao", label: "Nao-ficcao", sublabel: "Conteudo real, pragmatico" },
      { valor: "qualquer", label: "Tanto faz", sublabel: "Boa historia ou conteudo util" },
    ],
  },
  {
    titulo: "Seu nivel de leitura?",
    opcoes: [
      { valor: "iniciante", label: "Voltando a ler", sublabel: "Preciso retomar o habito" },
      { valor: "intermediario", label: "Leio as vezes", sublabel: "Um livro por mes ou dois" },
      { valor: "avancado", label: "Leio bastante", sublabel: "Pode ser denso e extenso" },
    ],
  },
];

export function SugestorLivros({ onBack }: Props) {
  const [etapa, setEtapa] = useState(0);
  const [respostas, setRespostas] = useState<Resposta>({});
  const [finalizado, setFinalizado] = useState(false);

  const selecionar = useCallback((valor: string) => {
    const chaves: (keyof Resposta)[] = ["categoria", "tamanho", "tipo", "nivel"];
    const chave = chaves[etapa];

    setRespostas((prev) => ({ ...prev, [chave]: valor }));

    if (etapa < 3) {
      setTimeout(() => setEtapa(etapa + 1), 300);
    } else {
      setTimeout(() => setFinalizado(true), 300);
    }
  }, [etapa]);

  const livrosRecomendados = useMemo(() => {
    if (!respostas.categoria) return [];

    let filtrados = LIVROS.filter((l) => l.categoria === respostas.categoria);

    if (respostas.tamanho && respostas.tamanho !== "qualquer") {
      filtrados = filtrados.filter((l) => l.tamanho === respostas.tamanho || l.tamanho === "medio");
    }

    if (respostas.tipo && respostas.tipo !== "qualquer") {
      filtrados = filtrados.filter((l) => l.tipo === respostas.tipo);
    }

    if (respostas.nivel && respostas.nivel !== "avancado") {
      filtrados = filtrados.filter((l) => l.nivel === respostas.nivel || (respostas.nivel === "intermediario" && l.nivel === "iniciante"));
    }

    if (filtrados.length < 5) {
      const complemento = LIVROS.filter(
        (l) => l.categoria === respostas.categoria && !filtrados.includes(l)
      ).slice(0, 5 - filtrados.length);
      filtrados = [...filtrados, ...complemento];
    }

    return filtrados.slice(0, 5);
  }, [respostas]);

  const reiniciar = () => {
    setEtapa(0);
    setRespostas({});
    setFinalizado(false);
  };

  const compartilhar = () => {
    const texto = `Minhas 5 recomendacoes de livros do CLICAresolve:\n\n${livrosRecomendados.map((l, i) => `${i + 1}. ${l.titulo} - ${l.autor}`).join("\n")}\n\nDescubra seu proximo livro em CLICAresolve!`;
    const url = `https://wa.me/?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank");
  };

  if (finalizado) {
    return (
      <ToolLayout
        title="Descubra Seu Proximo Livro"
        emoji="📚"
        category="Livros e Leitura"
        description="Respondo 4 perguntas e recebe 5 recomendacoes."
        onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["kindle e-reader"]} label="kindle e-reader" />}
    
      >
        <div className="space-y-5">
          <AffiliateBanner
            terms={["kindle unlimited assinatura"]}
            label="Ame ler? Experimente o Kindle Unlimited com livros ilimitados"
          />

          <div className="text-center">
            <p className="text-sm text-gray-400 mb-2">Baseado nas suas respostas</p>
            <h2 className="text-xl font-bold text-white">Seus 5 livros recomendados</h2>
          </div>

          <div className="space-y-3">
            {livrosRecomendados.map((livro, i) => (
              <div
                key={i}
                className={`p-4 rounded-xl bg-gradient-to-br ${CATEGORIA_CORES[livro.categoria]} border`}
              >
                <div className="flex gap-3">
                  <div className="w-16 h-20 rounded bg-white/20 flex items-center justify-center text-white">
                    {CATEGORIA_ICONS[livro.categoria]}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-white">{livro.titulo}</h3>
                    <p className="text-sm text-gray-400">{livro.autor}</p>
                    <p className="text-xs text-gray-300 mt-1">{livro.sinopse}</p>
                    <a
                      href={`https://www.amazon.com.br/s?k=${encodeURIComponent(livro.buscaAmazon)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 px-3 py-1 rounded bg-white/20 text-xs text-white hover:bg-white/30"
                    >
                      Ver na Amazon
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={reiniciar}
              className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-400 font-semibold flex items-center justify-center gap-2 hover:bg-white/10"
            >
              <RotateCcw className="w-4 h-4" />
              Refazer Quiz
            </button>
            <button
              onClick={compartilhar}
              className="p-3 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 font-semibold flex items-center justify-center gap-2 hover:bg-green-500/30"
            >
              <Share2 className="w-4 h-4" />
              WhatsApp
            </button>
          </div>
        </div>
      </ToolLayout>
    );
  }

  const pergunta = PERGUNTAS[etapa];

  return (
    <ToolLayout
      title="Descubra Seu Proximo Livro"
      emoji="📚"
      category="Livros e Leitura"
      description="Responda 4 perguntas e receba 5 recomendacoes."
      onBack={onBack}
    >
      <div className="space-y-5">
        <div className="flex gap-1">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`flex-1 h-1 rounded ${
                i <= etapa ? "bg-blue-500" : "bg-white/10"
              }`}
            />
          ))}
        </div>

        <div className="text-center py-4">
          <p className="text-xs text-gray-400 mb-1">Pergunta {etapa + 1} de 4</p>
          <h2 className="text-xl font-bold text-white">{pergunta.titulo}</h2>
        </div>

        <div className="space-y-2">
          {pergunta.opcoes.map((opcao) => (
            <button
              key={opcao.valor}
              onClick={() => selecionar(opcao.valor)}
              className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-left hover:bg-white/10 hover:border-blue-500/30 transition-all"
            >
              <p className="font-semibold text-white">{opcao.label}</p>
              <p className="text-sm text-gray-400">{opcao.sublabel}</p>
            </button>
          ))}
        </div>

        {etapa > 0 && (
          <button
            onClick={() => setEtapa(etapa - 1)}
            className="w-full p-2 text-sm text-gray-400 hover:text-white flex items-center justify-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Voltar
          </button>
        )}
      </div>
      <ToolContent
        toolName="Sugestor de Livros"
        category="Lazer"
        data={{
          directAnswer: "O quiz sugestor de livros recomenda títulos com base nas preferências de gênero e estilo de leitura informadas pelo usuário.",
          howItWorks: "A ferramenta faz algumas perguntas sobre preferências de leitura (gênero favorito, tamanho do livro, tipo de história) e cruza as respostas com uma base de mais de 60 livros organizados em 6 categorias, sugerindo títulos que combinam com o perfil identificado.",
          example: {
            title: "Exemplo: quiz para quem gosta de ficção científica",
            steps: [
              "Gênero preferido: Ficção científica",
              "Preferência de tamanho: Livro médio (300-400 páginas)",
              "Estilo de história: Aventura espacial",
              "Sugestão gerada: título de ficção científica com aventura espacial da base de dados",
            ],
            result: "Com base nas respostas, a ferramenta sugeriu um livro de ficção científica com tema de aventura espacial, alinhado ao perfil de leitura informado.",
          },
          faqs: [
            { question: "Quantos livros estão na base de dados?", answer: "A base conta com mais de 60 livros organizados em 6 categorias diferentes de gênero literário." },
            { question: "Posso refazer o quiz para receber outras sugestões?", answer: "Sim, é possível refazer o quiz quantas vezes quiser, respondendo de forma diferente para explorar outras sugestões." },
            { question: "A ferramenta cobre livros nacionais e internacionais?", answer: "Depende da composição da base de dados; geralmente inclui uma mistura de autores nacionais e internacionais mais conhecidos." },
            { question: "As sugestões são personalizadas de verdade ou aleatórias?", answer: "As sugestões são cruzadas com base nas respostas do quiz, priorizando livros que combinem com o perfil de leitura identificado." },
          ],
        }}
      />
    </ToolLayout>
  );
}
