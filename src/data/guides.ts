// Conteúdo completo dos guias. Carregado só na página de cada guia.
export interface GuideSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
  table?: { headers: string[]; rows: string[][]; caption?: string };
  /** Parágrafos exibidos depois da lista/tabela */
  after?: string[];
}

export interface GuideContent {
  slug: string;
  updated: string; // AAAA-MM-DD
  intro: string[];
  sections: GuideSection[];
  faqs: { question: string; answer: string }[];
}

export const GUIDES: Record<string, GuideContent> = {
  "quantos-btus-preciso": {
    slug: "quantos-btus-preciso",
    updated: "2026-10-28",
    intro: [
      "Comprar um ar-condicionado fraco demais para o cômodo é um dos erros mais comuns: o aparelho trabalha sem parar, gasta mais energia e mesmo assim não deixa o ambiente fresco. Já um aparelho potente demais custa mais caro e liga e desliga o tempo todo.",
      "A medida que resolve isso é o BTU (British Thermal Unit), que indica quanto calor o aparelho consegue retirar do ambiente por hora. Neste guia você aprende a regra prática usada pela nossa calculadora, vê uma tabela por tamanho de cômodo e entende quando é preciso aumentar a potência.",
    ],
    sections: [
      {
        heading: "A regra básica: 600 BTUs por metro quadrado",
        paragraphs: [
          "O ponto de partida é multiplicar a área do cômodo (comprimento × largura) por 600. Um quarto de 3 m × 4 m tem 12 m², então a base é 12 × 600 = 7.200 BTUs.",
          "Esse valor já considera até duas pessoas no ambiente, um aparelho eletrônico ligado (como uma TV) e pé-direito comum, de até 2,70 m. Como os aparelhos são vendidos em potências fixas, você escolhe o primeiro modelo igual ou acima do resultado: no exemplo, um de 9.000 BTUs.",
        ],
      },
      {
        heading: "Ajustes que aumentam a potência necessária",
        list: [
          "Sol forte: se o cômodo recebe sol direto (principalmente à tarde), acrescente 10%.",
          "Pé-direito alto: acima de 2,70 m há mais ar para resfriar, então acrescente 10%.",
          "Pessoas: a partir da terceira pessoa que costuma ficar no ambiente, some 600 BTUs por pessoa.",
          "Aparelhos: para cada eletrônico além do primeiro (computador, videogame, geladeira), some 400 BTUs.",
        ],
        after: [
          "Exemplo: uma sala de 18 m² com sol da tarde, quatro pessoas e TV mais computador. Base: 18 × 600 = 10.800. Com sol: 11.880. Duas pessoas extras: + 1.200 = 13.080. Um aparelho extra: + 400 = 13.480 BTUs. O modelo indicado é o de 18.000 BTUs, já que o de 12.000 ficaria abaixo do necessário.",
        ],
      },
      {
        heading: "Tabela de BTUs por tamanho do cômodo",
        table: {
          caption: "Considerando até 2 pessoas, 1 aparelho, sem sol direto e pé-direito de até 2,70 m.",
          headers: ["Área do cômodo", "Cálculo base", "Modelo indicado"],
          rows: [
            ["até 15 m²", "até 9.000 BTUs", "9.000 BTUs"],
            ["de 15 a 20 m²", "9.001 a 12.000", "12.000 BTUs"],
            ["de 20 a 30 m²", "12.001 a 18.000", "18.000 BTUs"],
            ["de 30 a 40 m²", "18.001 a 24.000", "24.000 BTUs"],
            ["de 40 a 50 m²", "24.001 a 30.000", "30.000 BTUs"],
            ["de 50 a 60 m²", "30.001 a 36.000", "36.000 BTUs"],
          ],
        },
        after: [
          "Se o cômodo tiver sol forte ou mais gente, refaça a conta com os ajustes: muitas vezes é isso que faz um quarto de 14 m² precisar de 12.000 BTUs em vez de 9.000.",
        ],
      },
      {
        heading: "Dicas antes de comprar",
        list: [
          "Prefira modelos inverter: eles ajustam a potência em vez de ligar e desligar o compressor, o que costuma reduzir o consumo de energia.",
          "Confira o selo Procel/Inmetro de eficiência energética na embalagem.",
          "Cômodos integrados (sala com cozinha americana, por exemplo) devem ser medidos como um único ambiente.",
          "Em regiões muito quentes ou cômodos com muitas janelas de vidro, vale escolher a potência imediatamente acima.",
          "Para estimar quanto o aparelho vai pesar na conta de luz, use a calculadora de consumo de energia.",
        ],
      },
    ],
    faqs: [
      { question: "Quantos BTUs para um quarto de 12 m²?", answer: "Pela regra de 600 BTUs por m², 12 m² dão 7.200 BTUs, então um aparelho de 9.000 BTUs atende. Se o quarto bater sol forte ou tiver pé-direito alto, acrescente 10% para cada caso." },
      { question: "9.000 BTUs gela quantos metros quadrados?", answer: "Em condições comuns (até 2 pessoas, um aparelho e sem sol direto), um ar de 9.000 BTUs atende cômodos de até cerca de 15 m²." },
      { question: "Ar-condicionado maior que o necessário é problema?", answer: "Ele resfria rápido, mas tende a ligar e desligar com frequência, controla pior a umidade e custa mais caro. O ideal é escolher o primeiro modelo igual ou acima do cálculo." },
      { question: "A regra vale para qualquer região do Brasil?", answer: "Ela é uma estimativa prática. Em locais muito quentes, com muito vidro ou pouca vedação, a necessidade pode ser maior; nesses casos, peça uma avaliação a um instalador." },
    ],
  },

  "como-calcular-metro-quadrado": {
    slug: "como-calcular-metro-quadrado",
    updated: "2026-10-28",
    intro: [
      "Saber calcular o metro quadrado é essencial para comprar piso, porcelanato, tinta, grama ou até para comparar o preço de um imóvel. A conta é simples, mas alguns detalhes, como cômodos em L e a margem de quebra, fazem diferença na hora de comprar o material.",
    ],
    sections: [
      {
        heading: "A fórmula do metro quadrado",
        paragraphs: [
          "Para áreas retangulares ou quadradas, a área é o comprimento multiplicado pela largura, com as duas medidas em metros: área (m²) = comprimento × largura.",
          "Um quarto de 3,5 m por 4 m tem 3,5 × 4 = 14 m². Se você mediu em centímetros, divida cada medida por 100 antes de multiplicar: 350 cm vira 3,5 m.",
        ],
      },
      {
        heading: "Cômodos em L ou com recortes",
        paragraphs: [
          "Divida o ambiente em retângulos menores, calcule cada um e some. Uma sala em L pode virar um retângulo de 4 × 5 m (20 m²) mais outro de 2 × 3 m (6 m²), totalizando 26 m².",
          "Para recortes que não fazem parte do piso, como um pilar ou o espaço de uma banheira, calcule a área do recorte e subtraia do total.",
        ],
      },
      {
        heading: "Quanto comprar de piso: a margem de quebra",
        paragraphs: [
          "Na instalação sempre há peças cortadas e perdidas. Por isso, a recomendação comum é comprar cerca de 10% a mais do que a área medida. Para 26 m², compre em torno de 28,6 m², arredondando para cima conforme o número de caixas.",
          "Pisos assentados na diagonal ou com muitos recortes costumam exigir uma margem maior, perto de 15%. A nossa calculadora de metros quadrados já oferece a opção de somar os 10%.",
        ],
      },
      {
        heading: "Metro quadrado de parede (para tinta e revestimento)",
        paragraphs: [
          "Para paredes, multiplique a largura de cada parede pela altura (pé-direito) e some todas. Depois, desconte portas e janelas: uma porta comum tem cerca de 1,6 m² (0,80 × 2,10 m).",
          "Com a área de parede em mãos, a calculadora de tinta estima quantos litros você precisa, considerando o número de demãos.",
        ],
      },
      {
        heading: "Erros comuns",
        list: [
          "Misturar centímetros e metros na mesma conta.",
          "Medir só um lado do cômodo: paredes raramente são perfeitamente paralelas, então meça os dois lados e use a maior medida.",
          "Esquecer a margem de quebra e ter de voltar à loja, correndo o risco de não encontrar o mesmo lote de piso.",
        ],
      },
    ],
    faqs: [
      { question: "Como calcular o metro quadrado de um terreno?", answer: "Se o terreno for retangular, multiplique a frente pelo fundo. Um terreno de 10 m × 25 m tem 250 m². Terrenos irregulares devem ser divididos em figuras menores ou medidos por um profissional." },
      { question: "Quantos metros quadrados tem um quarto de 3 por 4?", answer: "3 × 4 = 12 m²." },
      { question: "Qual a diferença entre metro quadrado e metro linear?", answer: "O metro linear mede só o comprimento (por exemplo, rodapé ou bancada). O metro quadrado mede a área, multiplicando comprimento por largura." },
    ],
  },

  "quanto-de-carne-por-pessoa-churrasco": {
    slug: "quanto-de-carne-por-pessoa-churrasco",
    updated: "2026-10-28",
    intro: [
      "Faltar carne no churrasco é ruim, mas sobrar muita também pesa no bolso. A boa notícia é que dá para chegar bem perto da quantidade certa com algumas médias simples, ajustando para o perfil dos convidados.",
    ],
    sections: [
      {
        heading: "Quantidade de carne por pessoa",
        paragraphs: [
          "Uma referência comum é de 300 g a 400 g de carne por adulto, somando todos os tipos. A nossa calculadora usa médias fixas por grupo, que funcionam bem para a maioria dos encontros:",
        ],
        table: {
          headers: ["Convidado", "Carne por pessoa"],
          rows: [
            ["Homem adulto", "350 g"],
            ["Mulher adulta", "280 g"],
            ["Criança", "180 g"],
          ],
        },
      },
      {
        heading: "Quando aumentar ou diminuir",
        list: [
          "Churrasco longo, de tarde inteira, ou turma que come muito: aumente cerca de 20%.",
          "Com muitos acompanhamentos (arroz, farofa, salada, maionese, pão de alho): dá para reduzir um pouco.",
          "Cortes com osso (costela, asinha de frango) rendem menos carne aproveitável: compre um pouco mais.",
          "Se o churrasco for o almoço principal e não um petisco, prefira o valor mais alto da média.",
        ],
      },
      {
        heading: "Exemplo: churrasco para 25 pessoas",
        paragraphs: [
          "Com 10 homens, 10 mulheres e 5 crianças: 10 × 350 g + 10 × 280 g + 5 × 180 g = 7,2 kg de carne. Uma divisão possível é misturar picanha ou contrafilé, frango e linguiça, que agradam a maioria e têm preços diferentes.",
        ],
      },
      {
        heading: "Carvão, bebidas e o resto da lista",
        list: [
          "Carvão: cerca de 1 kg para cada 3 convidados. Para 25 pessoas, uns 9 kg.",
          "Cerveja: em média 3 latas por adulto que bebe.",
          "Refrigerante e água: cerca de 1 litro para cada 3 pessoas, mais água à vontade em dias quentes.",
          "Pão de alho: 1 a 2 unidades a cada 2 pessoas.",
          "Sal grosso, gelo, guardanapos e espetos costumam ser esquecidos: coloque na lista.",
        ],
        after: [
          "Na hora de dividir a conta entre os amigos, a calculadora de divisão de gastos ajuda a acertar quem pagou o quê.",
        ],
      },
    ],
    faqs: [
      { question: "Quanto de carne para 10 pessoas?", answer: "Para 10 adultos, algo entre 3 kg e 3,5 kg de carne no total costuma ser suficiente. Se forem 5 homens e 5 mulheres, a calculadora indica 3,15 kg." },
      { question: "Criança come quanto no churrasco?", answer: "Em média, cerca de metade de um adulto. A calculadora considera 180 g por criança." },
      { question: "Quanto carvão para 20 pessoas?", answer: "Pela média de 1 kg para cada 3 convidados, cerca de 7 kg de carvão." },
    ],
  },

  "como-converter-horas-em-decimais": {
    slug: "como-converter-horas-em-decimais",
    updated: "2026-10-28",
    intro: [
      "Folhas de ponto, planilhas de banco de horas e cálculos de salário costumam usar horas em formato decimal, como 8,5 em vez de 8h30. Converter de um formato para o outro é simples quando você lembra que uma hora tem 60 minutos, e não 100.",
    ],
    sections: [
      {
        heading: "De horas e minutos para decimal",
        paragraphs: [
          "Divida os minutos por 60 e some às horas inteiras: horas decimais = horas + (minutos ÷ 60).",
          "Exemplo: 8h30 → 8 + 30 ÷ 60 = 8 + 0,5 = 8,5. Já 7h45 → 7 + 45 ÷ 60 = 7,75.",
        ],
        table: {
          headers: ["Minutos", "Decimal"],
          rows: [
            ["6 min", "0,1"],
            ["12 min", "0,2"],
            ["15 min", "0,25"],
            ["20 min", "0,333…"],
            ["30 min", "0,5"],
            ["40 min", "0,666…"],
            ["45 min", "0,75"],
          ],
        },
      },
      {
        heading: "De decimal para horas e minutos",
        paragraphs: [
          "Faça o caminho inverso: a parte inteira são as horas, e a parte decimal multiplicada por 60 dá os minutos.",
          "Exemplo: 6,3 horas → 6 horas + 0,3 × 60 = 18 minutos, ou seja, 6h18. Um erro muito comum é ler 6,3 como 6h30.",
        ],
      },
      {
        heading: "Para que serve na prática",
        list: [
          "Somar jornadas: é mais fácil somar 8,5 + 7,75 + 9 = 25,25 horas do que somar horas e minutos.",
          "Calcular pagamento: horas decimais multiplicadas pelo valor da hora. 25,25 h × R$ 20,00 = R$ 505,00.",
          "Banco de horas: comparar horas trabalhadas com a jornada contratada.",
          "Emissão de notas e relatórios de horas para clientes.",
        ],
        after: [
          "Para somar várias jornadas e comparar com a carga contratada, use o acumulador de horas. Para descobrir quanto vale a sua hora de trabalho, use a calculadora de salário por hora.",
        ],
      },
    ],
    faqs: [
      { question: "Quanto é 8h30 em decimal?", answer: "8,5 horas, porque 30 minutos são metade de uma hora." },
      { question: "O que são horas centesimais?", answer: "É outro nome para horas em formato decimal, em que a hora é dividida em 100 partes, como 8,50 para 8h30." },
      { question: "Quanto é 0,2 hora em minutos?", answer: "0,2 × 60 = 12 minutos." },
    ],
  },

  "quantos-dias-eu-ja-vivi": {
    slug: "quantos-dias-eu-ja-vivi",
    updated: "2026-10-28",
    intro: [
      "Você sabe quantos dias, horas ou minutos já viveu? Além de curioso, o número ajuda a celebrar marcos diferentes, como os 10.000 dias de vida, que muita gente comemora como um segundo aniversário.",
    ],
    sections: [
      {
        heading: "Como o cálculo é feito",
        paragraphs: [
          "Conte os dias corridos entre a data de nascimento e hoje, incluindo os anos bissextos (com 29 de fevereiro). Depois, multiplique para chegar às outras unidades: dias × 24 = horas, horas × 60 = minutos, minutos × 60 = segundos.",
          "Fazer isso à mão é trabalhoso por causa dos meses com tamanhos diferentes e dos anos bissextos. A calculadora de horas e dias de vida faz a conta exata a partir da sua data de nascimento.",
        ],
      },
      {
        heading: "Quantos dias você viveu em cada idade (aproximado)",
        table: {
          caption: "Valores aproximados, usando 365,25 dias por ano.",
          headers: ["Idade", "Dias vividos", "Horas vividas"],
          rows: [
            ["18 anos", "≈ 6.574", "≈ 157.800"],
            ["25 anos", "≈ 9.131", "≈ 219.150"],
            ["30 anos", "≈ 10.957", "≈ 262.980"],
            ["40 anos", "≈ 14.610", "≈ 350.640"],
            ["50 anos", "≈ 18.262", "≈ 438.300"],
            ["60 anos", "≈ 21.915", "≈ 525.960"],
          ],
        },
      },
      {
        heading: "Marcos curiosos para comemorar",
        list: [
          "10.000 dias de vida: acontece por volta dos 27 anos e 4 meses.",
          "20.000 dias: por volta dos 54 anos e 9 meses.",
          "1 bilhão de segundos: chega perto dos 31 anos e 8 meses.",
          "500.000 horas: por volta dos 57 anos.",
        ],
        after: [
          "Para descobrir a data exata em que você completa um desses marcos, ou o tempo entre duas datas quaisquer, use a calculadora de diferença entre datas.",
        ],
      },
    ],
    faqs: [
      { question: "Como saber quantos dias eu já vivi?", answer: "Informe sua data de nascimento na calculadora de horas e dias de vida: ela conta os dias corridos até hoje, incluindo anos bissextos." },
      { question: "Com quantos anos se completa 10.000 dias de vida?", answer: "Por volta dos 27 anos e 4 meses de idade." },
      { question: "Quantas horas tem um ano?", answer: "Um ano comum tem 8.760 horas (365 × 24). Um ano bissexto tem 8.784." },
    ],
  },

  "como-converter-sensibilidade-dpi": {
    slug: "como-converter-sensibilidade-dpi",
    updated: "2026-10-28",
    intro: [
      "Trocou de mouse ou mudou o DPI e a mira ficou estranha? Isso acontece porque o movimento na tela depende de dois valores ao mesmo tempo: o DPI do mouse e a sensibilidade configurada no jogo. Ajustando um, você precisa compensar o outro.",
    ],
    sections: [
      {
        heading: "DPI, sensibilidade e eDPI",
        paragraphs: [
          "DPI (ou CPI) é quantos pontos o sensor do mouse lê por polegada de movimento. Quanto maior o DPI, mais o cursor anda com o mesmo gesto.",
          "A sensibilidade é o multiplicador do jogo. O resultado prático dos dois juntos é o eDPI: eDPI = DPI × sensibilidade. Se o eDPI se mantém igual, o movimento da mira também se mantém.",
        ],
      },
      {
        heading: "A fórmula para trocar de DPI",
        paragraphs: [
          "Nova sensibilidade = sensibilidade atual × DPI atual ÷ DPI novo.",
          "Exemplo: você joga com 800 DPI e sensibilidade 1,5 (eDPI 1.200). Ao passar para 1.600 DPI, a nova sensibilidade é 1,5 × 800 ÷ 1.600 = 0,75. O eDPI continua 1.200 e a mira se comporta igual.",
        ],
        table: {
          caption: "Mantendo eDPI de 1.200",
          headers: ["DPI", "Sensibilidade"],
          rows: [
            ["400", "3,0"],
            ["800", "1,5"],
            ["1.600", "0,75"],
            ["3.200", "0,375"],
          ],
        },
      },
      {
        heading: "Dicas para não perder a mira",
        list: [
          "Desative a aceleração do mouse no Windows (opção \"Aumentar precisão do ponteiro\") para o movimento ser sempre proporcional.",
          "Compare eDPI apenas dentro do mesmo jogo: cada jogo usa uma escala própria de sensibilidade.",
          "Depois de mudar, jogue algumas partidas antes de ajustar de novo; a memória muscular leva um tempo para se acostumar.",
        ],
      },
    ],
    faqs: [
      { question: "DPI maior é melhor?", answer: "Não necessariamente. O que importa é o eDPI final. Muitos jogadores usam 400 a 1.600 DPI e ajustam a sensibilidade no jogo." },
      { question: "Como calcular o eDPI?", answer: "Multiplique o DPI pela sensibilidade do jogo. 800 DPI com sensibilidade 1,5 dá eDPI 1.200." },
      { question: "A fórmula vale para Valorant, CS2 e Fortnite?", answer: "Sim, para converter dentro do mesmo jogo. Para passar a sensibilidade de um jogo para outro, é preciso também considerar a escala de cada um, como faz o conversor de DPI." },
    ],
  },
};
