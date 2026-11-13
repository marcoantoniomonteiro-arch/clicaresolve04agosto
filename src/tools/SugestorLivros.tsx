import React, { useState, useMemo, useCallback } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ChevronRight, ChevronLeft, RotateCcw, Share2, BookOpen, Heart, Zap, Brain, Feather, Smile } from "lucide-react";
import { ToolContent } from "../components/ToolContent";
import { CONFIG } from "../config";

interface Props {
  onBack: () => void;
}

type CategoriaEmocional = "Emoção e Drama" | "Aventura e Suspense" | "Crescimento Pessoal" | "Conhecimento Prático" | "Espiritualidade e Fé" | "Risadas e Leveza";
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
  // Emoção e Drama
  { titulo: "A Moreninha", autor: "Joaquim Manuel de Macedo", categoria: "Emoção e Drama", tamanho: "curto", tipo: "ficcao", nivel: "iniciante", sinopse: "Romance clássico brasileiro sobre uma aposta entre estudantes que vira história de amor numa ilha.", buscaAmazon: "A Moreninha Joaquim Manuel de Macedo" },
  { titulo: "Dom Casmurro", autor: "Machado de Assis", categoria: "Emoção e Drama", tamanho: "curto", tipo: "ficcao", nivel: "intermediario", sinopse: "Bentinho conta sua história com Capitu e a dúvida que atravessa gerações de leitores: houve traição?", buscaAmazon: "Dom Casmurro Machado de Assis" },
  { titulo: "O Cortiço", autor: "Aluísio Azevedo", categoria: "Emoção e Drama", tamanho: "medio", tipo: "ficcao", nivel: "intermediario", sinopse: "Retrato cru da vida em um cortiço do Rio de Janeiro no século XIX, marco do naturalismo brasileiro.", buscaAmazon: "O Cortiço Aluísio Azevedo" },
  { titulo: "Capitães da Areia", autor: "Jorge Amado", categoria: "Emoção e Drama", tamanho: "medio", tipo: "ficcao", nivel: "iniciante", sinopse: "A vida de um grupo de meninos de rua em Salvador, entre aventuras, sonhos e abandono.", buscaAmazon: "Capitães da Areia Jorge Amado" },
  { titulo: "As Vinhas da Ira", autor: "John Steinbeck", categoria: "Emoção e Drama", tamanho: "longo", tipo: "ficcao", nivel: "intermediario", sinopse: "Uma família de agricultores atravessa os Estados Unidos em busca de trabalho durante a Grande Depressão.", buscaAmazon: "As Vinhas da Ira John Steinbeck" },
  { titulo: "Orgulho e Preconceito", autor: "Jane Austen", categoria: "Emoção e Drama", tamanho: "medio", tipo: "ficcao", nivel: "iniciante", sinopse: "Elizabeth Bennet e o Sr. Darcy precisam superar primeiras impressões no romance mais famoso de Austen.", buscaAmazon: "Orgulho e Preconceito Jane Austen" },
  { titulo: "A Revolução dos Bichos", autor: "George Orwell", categoria: "Emoção e Drama", tamanho: "curto", tipo: "ficcao", nivel: "iniciante", sinopse: "Fábula sobre animais que tomam uma fazenda e veem a igualdade virar uma nova tirania.", buscaAmazon: "A Revolução dos Bichos George Orwell" },
  { titulo: "Memórias Póstumas de Brás Cubas", autor: "Machado de Assis", categoria: "Emoção e Drama", tamanho: "medio", tipo: "ficcao", nivel: "avancado", sinopse: "Um defunto narra a própria vida com ironia e humor ácido sobre a sociedade brasileira.", buscaAmazon: "Memórias Póstumas de Brás Cubas" },
  { titulo: "O Pequeno Príncipe", autor: "Antoine de Saint-Exupéry", categoria: "Emoção e Drama", tamanho: "curto", tipo: "ficcao", nivel: "iniciante", sinopse: "Um aviador perdido no deserto conhece um pequeno príncipe e aprende sobre amizade e o que é essencial.", buscaAmazon: "O Pequeno Príncipe Saint-Exupéry" },
  { titulo: "A Hora da Estrela", autor: "Clarice Lispector", categoria: "Emoção e Drama", tamanho: "curto", tipo: "ficcao", nivel: "intermediario", sinopse: "A história de Macabéa, nordestina no Rio de Janeiro, contada por um narrador inquieto.", buscaAmazon: "A Hora da Estrela Clarice Lispector" },
  // Aventura e Suspense
  { titulo: "O Senhor dos Anéis", autor: "J.R.R. Tolkien", categoria: "Aventura e Suspense", tamanho: "longo", tipo: "ficcao", nivel: "avancado", sinopse: "A jornada da Sociedade do Anel para destruir o Um Anel e salvar a Terra-média.", buscaAmazon: "O Senhor dos Anéis Tolkien" },
  { titulo: "Harry Potter e a Pedra Filosofal", autor: "J.K. Rowling", categoria: "Aventura e Suspense", tamanho: "medio", tipo: "ficcao", nivel: "iniciante", sinopse: "Um garoto descobre que é bruxo e começa seus estudos em Hogwarts.", buscaAmazon: "Harry Potter e a Pedra Filosofal" },
  { titulo: "O Código Da Vinci", autor: "Dan Brown", categoria: "Aventura e Suspense", tamanho: "medio", tipo: "ficcao", nivel: "iniciante", sinopse: "Um assassinato no Louvre leva um professor de simbologia a uma caçada por segredos históricos.", buscaAmazon: "O Código Da Vinci Dan Brown" },
  { titulo: "Jogos Vorazes", autor: "Suzanne Collins", categoria: "Aventura e Suspense", tamanho: "medio", tipo: "ficcao", nivel: "iniciante", sinopse: "Katniss se oferece no lugar da irmã em uma competição televisionada em que só um sobrevive.", buscaAmazon: "Jogos Vorazes Suzanne Collins" },
  { titulo: "Um Estudo em Vermelho", autor: "Arthur Conan Doyle", categoria: "Aventura e Suspense", tamanho: "curto", tipo: "ficcao", nivel: "iniciante", sinopse: "O primeiro caso de Sherlock Holmes e o início da parceria com o Dr. Watson.", buscaAmazon: "Um Estudo em Vermelho Conan Doyle" },
  { titulo: "O Nome do Vento", autor: "Patrick Rothfuss", categoria: "Aventura e Suspense", tamanho: "longo", tipo: "ficcao", nivel: "intermediario", sinopse: "Kvothe, um herói lendário, conta a verdadeira história da própria vida.", buscaAmazon: "O Nome do Vento Patrick Rothfuss" },
  { titulo: "Percy Jackson e o Ladrão de Raios", autor: "Rick Riordan", categoria: "Aventura e Suspense", tamanho: "medio", tipo: "ficcao", nivel: "iniciante", sinopse: "Um garoto descobre ser filho de um deus grego e parte em uma missão pelos Estados Unidos.", buscaAmazon: "Percy Jackson e o Ladrão de Raios" },
  { titulo: "O Silêncio dos Inocentes", autor: "Thomas Harris", categoria: "Aventura e Suspense", tamanho: "medio", tipo: "ficcao", nivel: "intermediario", sinopse: "Uma agente do FBI pede ajuda ao Dr. Hannibal Lecter para capturar um assassino em série.", buscaAmazon: "O Silêncio dos Inocentes Thomas Harris" },
  { titulo: "As Crônicas de Nárnia", autor: "C.S. Lewis", categoria: "Aventura e Suspense", tamanho: "longo", tipo: "ficcao", nivel: "iniciante", sinopse: "Sete aventuras em um mundo mágico de animais falantes, feiticeiras e reis.", buscaAmazon: "As Crônicas de Nárnia volume único" },
  { titulo: "Duna", autor: "Frank Herbert", categoria: "Aventura e Suspense", tamanho: "longo", tipo: "ficcao", nivel: "avancado", sinopse: "Paul Atreides enfrenta intrigas políticas no planeta desértico mais valioso do universo.", buscaAmazon: "Duna Frank Herbert" },
  // Crescimento Pessoal
  { titulo: "Os 7 Hábitos das Pessoas Altamente Eficazes", autor: "Stephen R. Covey", categoria: "Crescimento Pessoal", tamanho: "medio", tipo: "nao-ficcao", nivel: "intermediario", sinopse: "Princípios para a eficácia pessoal e profissional baseados em caráter e valores.", buscaAmazon: "Os 7 Hábitos das Pessoas Altamente Eficazes" },
  { titulo: "O Poder do Hábito", autor: "Charles Duhigg", categoria: "Crescimento Pessoal", tamanho: "medio", tipo: "nao-ficcao", nivel: "iniciante", sinopse: "Como os hábitos se formam no cérebro e como mudá-los na vida e no trabalho.", buscaAmazon: "O Poder do Hábito Charles Duhigg" },
  { titulo: "Hábitos Atômicos", autor: "James Clear", categoria: "Crescimento Pessoal", tamanho: "medio", tipo: "nao-ficcao", nivel: "iniciante", sinopse: "Pequenas mudanças diárias que, somadas, geram grandes resultados.", buscaAmazon: "Hábitos Atômicos James Clear" },
  { titulo: "Mindset: A Nova Psicologia do Sucesso", autor: "Carol S. Dweck", categoria: "Crescimento Pessoal", tamanho: "medio", tipo: "nao-ficcao", nivel: "intermediario", sinopse: "A diferença entre a mentalidade fixa e a de crescimento, e como ela muda resultados.", buscaAmazon: "Mindset Carol Dweck" },
  { titulo: "Essencialismo", autor: "Greg McKeown", categoria: "Crescimento Pessoal", tamanho: "curto", tipo: "nao-ficcao", nivel: "iniciante", sinopse: "Fazer menos, porém melhor: como focar no que realmente importa.", buscaAmazon: "Essencialismo Greg McKeown" },
  { titulo: "Como Fazer Amigos e Influenciar Pessoas", autor: "Dale Carnegie", categoria: "Crescimento Pessoal", tamanho: "medio", tipo: "nao-ficcao", nivel: "iniciante", sinopse: "Clássico sobre comunicação, empatia e relacionamentos.", buscaAmazon: "Como Fazer Amigos e Influenciar Pessoas" },
  { titulo: "O Milagre da Manhã", autor: "Hal Elrod", categoria: "Crescimento Pessoal", tamanho: "curto", tipo: "nao-ficcao", nivel: "iniciante", sinopse: "Uma rotina matinal simples para começar o dia com mais energia e foco.", buscaAmazon: "O Milagre da Manhã Hal Elrod" },
  { titulo: "Garra: O Poder da Paixão e da Perseverança", autor: "Angela Duckworth", categoria: "Crescimento Pessoal", tamanho: "medio", tipo: "nao-ficcao", nivel: "intermediario", sinopse: "Por que esforço e persistência pesam mais que o talento para chegar longe.", buscaAmazon: "Garra Angela Duckworth" },
  { titulo: "Inteligência Emocional", autor: "Daniel Goleman", categoria: "Crescimento Pessoal", tamanho: "medio", tipo: "nao-ficcao", nivel: "intermediario", sinopse: "Como reconhecer e lidar com as emoções pode ser tão importante quanto o QI.", buscaAmazon: "Inteligência Emocional Daniel Goleman" },
  { titulo: "Em Busca de Sentido", autor: "Viktor E. Frankl", categoria: "Crescimento Pessoal", tamanho: "curto", tipo: "nao-ficcao", nivel: "intermediario", sinopse: "Um psiquiatra sobrevivente dos campos de concentração reflete sobre o sentido da vida.", buscaAmazon: "Em Busca de Sentido Viktor Frankl" },
  // Conhecimento Prático
  { titulo: "Pai Rico, Pai Pobre", autor: "Robert Kiyosaki", categoria: "Conhecimento Prático", tamanho: "medio", tipo: "nao-ficcao", nivel: "iniciante", sinopse: "Lições sobre dinheiro, ativos e passivos a partir de duas figuras paternas.", buscaAmazon: "Pai Rico Pai Pobre" },
  { titulo: "Casais Inteligentes Enriquecem Juntos", autor: "Gustavo Cerbasi", categoria: "Conhecimento Prático", tamanho: "curto", tipo: "nao-ficcao", nivel: "iniciante", sinopse: "Como organizar as finanças a dois e planejar o futuro do casal.", buscaAmazon: "Casais Inteligentes Enriquecem Juntos Cerbasi" },
  { titulo: "Investimentos Inteligentes", autor: "Gustavo Cerbasi", categoria: "Conhecimento Prático", tamanho: "medio", tipo: "nao-ficcao", nivel: "iniciante", sinopse: "Guia para montar uma estratégia de investimentos adequada ao seu perfil.", buscaAmazon: "Investimentos Inteligentes Gustavo Cerbasi" },
  { titulo: "A Estratégia do Oceano Azul", autor: "W. Chan Kim e Renée Mauborgne", categoria: "Conhecimento Prático", tamanho: "medio", tipo: "nao-ficcao", nivel: "avancado", sinopse: "Como criar mercados sem concorrência em vez de disputar os já saturados.", buscaAmazon: "A Estratégia do Oceano Azul" },
  { titulo: "De Zero a Um", autor: "Peter Thiel", categoria: "Conhecimento Prático", tamanho: "curto", tipo: "nao-ficcao", nivel: "intermediario", sinopse: "Ideias sobre inovação e como construir empresas que criam algo novo.", buscaAmazon: "De Zero a Um Peter Thiel" },
  { titulo: "A Arte da Guerra", autor: "Sun Tzu", categoria: "Conhecimento Prático", tamanho: "curto", tipo: "nao-ficcao", nivel: "intermediario", sinopse: "Tratado milenar de estratégia, muito aplicado a negócios e liderança.", buscaAmazon: "A Arte da Guerra Sun Tzu" },
  { titulo: "A Startup Enxuta", autor: "Eric Ries", categoria: "Conhecimento Prático", tamanho: "medio", tipo: "nao-ficcao", nivel: "intermediario", sinopse: "O método de testar ideias rápido e aprender com clientes reais.", buscaAmazon: "A Startup Enxuta Eric Ries" },
  { titulo: "A Meta", autor: "Eliyahu M. Goldratt", categoria: "Conhecimento Prático", tamanho: "medio", tipo: "ficcao", nivel: "intermediario", sinopse: "Romance de negócios sobre um gerente que precisa salvar sua fábrica, base da Teoria das Restrições.", buscaAmazon: "A Meta Eliyahu Goldratt" },
  { titulo: "Rápido e Devagar", autor: "Daniel Kahneman", categoria: "Conhecimento Prático", tamanho: "longo", tipo: "nao-ficcao", nivel: "avancado", sinopse: "Os dois sistemas do pensamento e os vieses que afetam nossas decisões.", buscaAmazon: "Rápido e Devagar Kahneman" },
  { titulo: "A Psicologia Financeira", autor: "Morgan Housel", categoria: "Conhecimento Prático", tamanho: "curto", tipo: "nao-ficcao", nivel: "iniciante", sinopse: "Histórias curtas sobre como emoções e comportamento pesam nas decisões com dinheiro.", buscaAmazon: "A Psicologia Financeira Morgan Housel" },
  // Espiritualidade e Fé
  { titulo: "Bíblia de Jerusalém", autor: "Vários autores", categoria: "Espiritualidade e Fé", tamanho: "longo", tipo: "nao-ficcao", nivel: "intermediario", sinopse: "Tradução muito usada em estudos, com introduções e notas explicativas.", buscaAmazon: "Bíblia de Jerusalém" },
  { titulo: "O Alcorão", autor: "Tradução de Helmi Nasr", categoria: "Espiritualidade e Fé", tamanho: "longo", tipo: "nao-ficcao", nivel: "avancado", sinopse: "O livro sagrado do islamismo em tradução para o português.", buscaAmazon: "Alcorão tradução português" },
  { titulo: "O Profeta", autor: "Khalil Gibran", categoria: "Espiritualidade e Fé", tamanho: "curto", tipo: "ficcao", nivel: "iniciante", sinopse: "Textos poéticos sobre amor, trabalho, alegria, dor e liberdade.", buscaAmazon: "O Profeta Khalil Gibran" },
  { titulo: "O Poder do Agora", autor: "Eckhart Tolle", categoria: "Espiritualidade e Fé", tamanho: "medio", tipo: "nao-ficcao", nivel: "iniciante", sinopse: "Um guia para viver o presente e diminuir a ansiedade.", buscaAmazon: "O Poder do Agora Eckhart Tolle" },
  { titulo: "Cristianismo Puro e Simples", autor: "C.S. Lewis", categoria: "Espiritualidade e Fé", tamanho: "curto", tipo: "nao-ficcao", nivel: "intermediario", sinopse: "Os fundamentos da fé cristã explicados de forma clara e racional.", buscaAmazon: "Cristianismo Puro e Simples C.S. Lewis" },
  { titulo: "Conversando com Deus", autor: "Neale Donald Walsch", categoria: "Espiritualidade e Fé", tamanho: "medio", tipo: "nao-ficcao", nivel: "iniciante", sinopse: "Diálogos espirituais sobre a vida, o amor e o propósito.", buscaAmazon: "Conversando com Deus Neale Donald Walsch" },
  { titulo: "Autobiografia de um Iogue", autor: "Paramahansa Yogananda", categoria: "Espiritualidade e Fé", tamanho: "medio", tipo: "nao-ficcao", nivel: "intermediario", sinopse: "A trajetória espiritual de um mestre indiano que levou a ioga ao Ocidente.", buscaAmazon: "Autobiografia de um Iogue Yogananda" },
  { titulo: "O Livro Tibetano dos Mortos", autor: "Vários autores", categoria: "Espiritualidade e Fé", tamanho: "medio", tipo: "nao-ficcao", nivel: "avancado", sinopse: "Texto budista tradicional sobre a morte e os estados entre uma vida e outra.", buscaAmazon: "O Livro Tibetano dos Mortos" },
  { titulo: "O Monge e o Executivo", autor: "James C. Hunter", categoria: "Espiritualidade e Fé", tamanho: "curto", tipo: "ficcao", nivel: "iniciante", sinopse: "Um executivo passa uma semana em um mosteiro e aprende sobre liderança servidora.", buscaAmazon: "O Monge e o Executivo James Hunter" },
  { titulo: "O Caminho do Peregrino", autor: "John Bunyan", categoria: "Espiritualidade e Fé", tamanho: "medio", tipo: "ficcao", nivel: "intermediario", sinopse: "Alegoria clássica sobre a jornada de fé de um homem chamado Cristão.", buscaAmazon: "O Peregrino John Bunyan" },
  // Risadas e Leveza
  { titulo: "O Diabo Veste Prada", autor: "Lauren Weisberger", categoria: "Risadas e Leveza", tamanho: "medio", tipo: "ficcao", nivel: "iniciante", sinopse: "Uma jovem jornalista sobrevive à chefe mais exigente do mundo da moda.", buscaAmazon: "O Diabo Veste Prada" },
  { titulo: "Diário de um Banana", autor: "Jeff Kinney", categoria: "Risadas e Leveza", tamanho: "curto", tipo: "ficcao", nivel: "iniciante", sinopse: "As trapalhadas de Greg Heffley no colégio, contadas em diário com desenhos.", buscaAmazon: "Diário de um Banana" },
  { titulo: "O Guia do Mochileiro das Galáxias", autor: "Douglas Adams", categoria: "Risadas e Leveza", tamanho: "curto", tipo: "ficcao", nivel: "iniciante", sinopse: "Comédia de ficção científica sobre um terráqueo salvo minutos antes da destruição da Terra.", buscaAmazon: "O Guia do Mochileiro das Galáxias" },
  { titulo: "Comédias para se Ler na Escola", autor: "Luis Fernando Verissimo", categoria: "Risadas e Leveza", tamanho: "curto", tipo: "ficcao", nivel: "iniciante", sinopse: "Crônicas curtas e divertidas sobre situações do cotidiano.", buscaAmazon: "Comédias para se Ler na Escola Verissimo" },
  { titulo: "O Auto da Compadecida", autor: "Ariano Suassuna", categoria: "Risadas e Leveza", tamanho: "curto", tipo: "ficcao", nivel: "iniciante", sinopse: "As armações de João Grilo e Chicó no sertão nordestino, até o julgamento final.", buscaAmazon: "O Auto da Compadecida Ariano Suassuna" },
  { titulo: "Confissões de Adolescente", autor: "Maria Mariana", categoria: "Risadas e Leveza", tamanho: "curto", tipo: "nao-ficcao", nivel: "iniciante", sinopse: "Relatos bem-humorados sobre as descobertas e dramas da adolescência.", buscaAmazon: "Confissões de Adolescente Maria Mariana" },
  { titulo: "O Bem-Amado", autor: "Dias Gomes", categoria: "Risadas e Leveza", tamanho: "curto", tipo: "ficcao", nivel: "intermediario", sinopse: "Sátira sobre Odorico Paraguaçu, prefeito que quer inaugurar um cemitério a qualquer custo.", buscaAmazon: "O Bem-Amado Dias Gomes" },
  { titulo: "Feliz Ano Velho", autor: "Marcelo Rubens Paiva", categoria: "Risadas e Leveza", tamanho: "medio", tipo: "nao-ficcao", nivel: "intermediario", sinopse: "Memórias de um jovem após um acidente, contadas com humor, ironia e coragem.", buscaAmazon: "Feliz Ano Velho Marcelo Rubens Paiva" },
  { titulo: "Bom Dia, Verônica", autor: "Andrea Killmore", categoria: "Aventura e Suspense", tamanho: "medio", tipo: "ficcao", nivel: "intermediario", sinopse: "Uma escrivã da polícia de São Paulo investiga dois casos de violência contra mulheres.", buscaAmazon: "Bom Dia Verônica Andrea Killmore" },
  { titulo: "Os Miseráveis", autor: "Victor Hugo", categoria: "Emoção e Drama", tamanho: "longo", tipo: "ficcao", nivel: "avancado", sinopse: "A redenção de Jean Valjean em meio às injustiças da França do século XIX.", buscaAmazon: "Os Miseráveis Victor Hugo" },
];

const CATEGORIA_CORES: Record<CategoriaEmocional, string> = {
  "Emoção e Drama": "from-rose-500/30 to-pink-500/30 border-rose-500/40",
  "Aventura e Suspense": "from-orange-500/30 to-red-500/30 border-orange-500/40",
  "Crescimento Pessoal": "from-green-500/30 to-emerald-500/30 border-green-500/40",
  "Conhecimento Prático": "from-blue-500/30 to-indigo-500/30 border-blue-500/40",
  "Espiritualidade e Fé": "from-purple-500/30 to-violet-500/30 border-purple-500/40",
  "Risadas e Leveza": "from-yellow-500/30 to-amber-500/30 border-yellow-500/40",
};

const CATEGORIA_ICONS: Record<CategoriaEmocional, React.ReactNode> = {
  "Emoção e Drama": <Heart className="w-6 h-6" />,
  "Aventura e Suspense": <Zap className="w-6 h-6" />,
  "Crescimento Pessoal": <Brain className="w-6 h-6" />,
  "Conhecimento Prático": <BookOpen className="w-6 h-6" />,
  "Espiritualidade e Fé": <Feather className="w-6 h-6" />,
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
    titulo: "O que você quer sentir lendo?",
    opcoes: [
      { valor: "Emoção e Drama", label: "Emoções profundas", sublabel: "Drama, romance, reflexões" },
      { valor: "Aventura e Suspense", label: "Aventura e tensão", sublabel: "Ação, mistério, fantasia" },
      { valor: "Crescimento Pessoal", label: "Crescer como pessoa", sublabel: "Autoajuda, mentalidade, hábitos" },
      { valor: "Conhecimento Prático", label: "Aprender algo útil", sublabel: "Finanças, negócios, produtividade" },
      { valor: "Espiritualidade e Fé", label: "Espiritualidade", sublabel: "Religião, filosofia, autoconhecimento" },
      { valor: "Risadas e Leveza", label: "Rir e relaxar", sublabel: "Humor, crônicas, leitura leve" },
    ],
  },
  {
    titulo: "Quanto tempo você tem para ler?",
    opcoes: [
      { valor: "curto", label: "Pouco tempo", sublabel: "Livros curtos, até 200 páginas" },
      { valor: "medio", label: "Tempo médio", sublabel: "200 a 400 páginas" },
      { valor: "qualquer", label: "Não importa", sublabel: "Aceito qualquer tamanho" },
    ],
  },
  {
    titulo: "Você prefere?",
    opcoes: [
      { valor: "ficcao", label: "Ficção", sublabel: "Histórias inventadas" },
      { valor: "nao-ficcao", label: "Não ficção", sublabel: "Conteúdo real e prático" },
      { valor: "qualquer", label: "Tanto faz", sublabel: "Boa história ou conteúdo útil" },
    ],
  },
  {
    titulo: "Seu nível de leitura?",
    opcoes: [
      { valor: "iniciante", label: "Voltando a ler", sublabel: "Quero retomar o hábito" },
      { valor: "intermediario", label: "Leio às vezes", sublabel: "Um livro por mês ou dois" },
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
    const texto = `Minhas 5 recomendações de livros do CLICAresolve:\n\n${livrosRecomendados.map((l, i) => `${i + 1}. ${l.titulo} - ${l.autor}`).join("\n")}\n\nDescubra seu próximo livro em CLICAresolve!`;
    const url = `https://wa.me/?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank");
  };

  if (finalizado) {
    return (
      <ToolLayout
        title="Descubra Seu Próximo Livro"
        emoji="📚"
        category="Livros e Leitura"
        description="Responda 4 perguntas e receba 5 recomendações."
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
                      href={CONFIG.urlAmazon(livro.buscaAmazon)}
                      target="_blank"
                      rel="noopener noreferrer sponsored"
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
      title="Descubra Seu Próximo Livro"
      emoji="📚"
      category="Livros e Leitura"
      description="Responda 4 perguntas e receba 5 recomendações."
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
            { question: "Quantos livros estão na base de dados?", answer: "A base tem 60 livros reais, organizados em 6 categorias: emoção e drama, aventura e suspense, crescimento pessoal, conhecimento prático, espiritualidade e fé, e risadas e leveza." },
            { question: "Posso refazer o quiz para receber outras sugestões?", answer: "Sim, é possível refazer o quiz quantas vezes quiser, respondendo de forma diferente para explorar outras sugestões." },
            { question: "A ferramenta cobre livros nacionais e internacionais?", answer: "Sim. A lista mistura clássicos e autores brasileiros, como Machado de Assis, Clarice Lispector, Jorge Amado e Ariano Suassuna, com sucessos internacionais." },
            { question: "As sugestões são personalizadas de verdade ou aleatórias?", answer: "As sugestões são cruzadas com base nas respostas do quiz, priorizando livros que combinem com o perfil de leitura identificado." },
          ],
        }}
      />
    </ToolLayout>
  );
}
