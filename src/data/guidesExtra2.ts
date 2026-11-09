import type { GuideContent } from "./guides";

// Guias de saúde e bem-estar. Conteúdo informativo, não substitui orientação profissional.
export const GUIDES_EXTRA_2: Record<string, GuideContent> = {
  "como-calcular-imc": {
    slug: "como-calcular-imc",
    updated: "2026-11-09",
    intro: [
      "O IMC, Índice de Massa Corporal, é a forma mais usada no mundo para estimar se o peso de um adulto está adequado para a sua altura. Ele é simples, rápido e serve como um primeiro sinal de alerta, mas tem limitações importantes.",
      "Neste guia você aprende a calcular o IMC, entende a tabela de classificação da Organização Mundial da Saúde e vê quando o índice pode enganar.",
    ],
    sections: [
      {
        heading: "A fórmula do IMC",
        paragraphs: [
          "IMC = peso (kg) ÷ altura² (m). Primeiro eleve a altura ao quadrado, depois divida o peso pelo resultado.",
          "Exemplo: uma pessoa de 70 kg e 1,75 m. Altura² = 1,75 × 1,75 = 3,0625. IMC = 70 ÷ 3,0625 ≈ 22,9.",
        ],
      },
      {
        heading: "Tabela de classificação (OMS, adultos)",
        table: {
          headers: ["IMC", "Classificação"],
          rows: [
            ["abaixo de 18,5", "Abaixo do peso"],
            ["18,5 a 24,9", "Peso adequado (eutrofia)"],
            ["25,0 a 29,9", "Sobrepeso"],
            ["30,0 a 34,9", "Obesidade grau I"],
            ["35,0 a 39,9", "Obesidade grau II"],
            ["40,0 ou mais", "Obesidade grau III"],
          ],
        },
        after: [
          "Para a pessoa do exemplo, com IMC 22,9, o resultado está na faixa de peso adequado.",
        ],
      },
      {
        heading: "Peso ideal pela altura",
        paragraphs: [
          "Invertendo a fórmula dá para saber a faixa de peso considerada adequada para uma altura: peso mínimo = 18,5 × altura² e peso máximo = 24,9 × altura². Para 1,75 m, a faixa vai de cerca de 56,7 kg a 76,3 kg.",
          "Essa faixa é larga de propósito: pessoas da mesma altura têm estruturas ósseas e musculares diferentes.",
        ],
      },
      {
        heading: "Limitações do IMC",
        list: [
          "Não diferencia músculo de gordura: atletas e pessoas muito musculosas podem ter IMC alto sem excesso de gordura.",
          "Não mostra onde a gordura está. A gordura abdominal é a mais associada a riscos à saúde; por isso a medida da cintura complementa o IMC.",
          "Em idosos, a perda de massa muscular pode fazer o IMC parecer normal mesmo com composição corporal desfavorável.",
          "Para crianças e adolescentes, o IMC é avaliado com curvas por idade e sexo, e não com a tabela de adultos.",
          "Gestantes não devem usar a tabela comum.",
        ],
      },
      {
        heading: "Como usar o resultado",
        paragraphs: [
          "O IMC é um ponto de partida, não um diagnóstico. Se o resultado ficar fora da faixa adequada, o ideal é conversar com um médico ou nutricionista, que vai avaliar outros fatores, como exames, histórico, medida da cintura e composição corporal.",
          "A calculadora de IMC do site mostra o índice, a classificação e a faixa de peso adequada para a sua altura. Para planejar alimentação e treino, veja também as calculadoras de gasto calórico e de macronutrientes.",
        ],
      },
    ],
    faqs: [
      { question: "Como calcular o IMC?", answer: "Divida o peso em quilos pela altura em metros elevada ao quadrado. Exemplo: 70 ÷ (1,75 × 1,75) ≈ 22,9." },
      { question: "Qual é o IMC normal?", answer: "Para adultos, a OMS considera adequado o IMC entre 18,5 e 24,9." },
      { question: "O IMC serve para atletas?", answer: "Com cautela. Como não separa músculo de gordura, pessoas musculosas podem aparecer com sobrepeso sem ter excesso de gordura." },
      { question: "Crianças podem usar a mesma tabela?", answer: "Não. Para crianças e adolescentes o IMC é comparado com curvas de crescimento por idade e sexo." },
    ],
  },

  "quantas-calorias-gasto-por-dia": {
    slug: "quantas-calorias-gasto-por-dia",
    updated: "2026-11-09",
    intro: [
      "Saber quantas calorias o corpo gasta por dia ajuda a planejar a alimentação, seja para manter, perder ou ganhar peso. Esse gasto tem duas partes principais: o metabolismo basal, que é a energia para manter o corpo funcionando em repouso, e a energia gasta com movimento e exercício.",
      "As fórmulas dão uma estimativa, não um valor exato. Mesmo assim, são muito úteis como ponto de partida.",
    ],
    sections: [
      {
        heading: "Metabolismo basal (TMB)",
        paragraphs: [
          "A taxa metabólica basal é a energia que o corpo usa para respirar, manter a temperatura, bater o coração e fazer todas as funções vitais. Uma das fórmulas mais usadas hoje é a de Mifflin-St Jeor:",
          "Homens: TMB = 10 × peso (kg) + 6,25 × altura (cm) − 5 × idade + 5.",
          "Mulheres: TMB = 10 × peso (kg) + 6,25 × altura (cm) − 5 × idade − 161.",
          "Exemplo: mulher de 30 anos, 65 kg e 165 cm. TMB = 650 + 1.031,25 − 150 − 161 ≈ 1.370 kcal por dia.",
        ],
      },
      {
        heading: "Gasto total: multiplicando pelo nível de atividade",
        table: {
          headers: ["Nível de atividade", "Fator"],
          rows: [
            ["Sedentário (pouco ou nenhum exercício)", "1,2"],
            ["Levemente ativo (exercício 1 a 3 vezes por semana)", "1,375"],
            ["Moderadamente ativo (3 a 5 vezes por semana)", "1,55"],
            ["Muito ativo (6 a 7 vezes por semana)", "1,725"],
            ["Extremamente ativo (treino intenso diário ou trabalho físico pesado)", "1,9"],
          ],
        },
        after: [
          "Na mulher do exemplo, moderadamente ativa: 1.370 × 1,55 ≈ 2.120 kcal por dia. Esse é o gasto estimado para manter o peso.",
        ],
      },
      {
        heading: "Calorias gastas em atividades",
        paragraphs: [
          "Para atividades específicas, usa-se o MET (equivalente metabólico), que indica quantas vezes a atividade gasta mais energia do que o repouso. A conta é: kcal ≈ MET × peso (kg) × horas de atividade.",
          "Exemplos de MET aproximados: caminhada leve (3,5), bicicleta em ritmo moderado (7), corrida a 8 km/h (8), musculação moderada (3,5 a 5). Uma pessoa de 70 kg correndo por 30 minutos a 8 km/h gasta cerca de 8 × 70 × 0,5 = 280 kcal.",
        ],
      },
      {
        heading: "Como usar o resultado para mudar o peso",
        list: [
          "Para perder peso, o mais seguro costuma ser um déficit moderado, de algo entre 300 e 500 kcal por dia abaixo do gasto total.",
          "Para ganhar massa, um pequeno superávit, junto com treino de força e proteína adequada.",
          "Evite dietas com calorias muito abaixo do metabolismo basal sem acompanhamento profissional.",
          "Reavalie a cada poucas semanas: conforme o peso muda, o gasto também muda.",
        ],
      },
      {
        heading: "Por que o resultado é uma estimativa",
        paragraphs: [
          "Fórmulas não enxergam a composição corporal, a genética, o sono, o estresse e doenças como o hipotireoidismo. Por isso, use a calculadora de gasto calórico como ponto de partida e ajuste conforme os resultados reais. Para distribuir as calorias entre proteínas, carboidratos e gorduras, use a calculadora de macronutrientes. Pessoas com condições de saúde devem buscar orientação de nutricionista ou médico.",
        ],
      },
    ],
    faqs: [
      { question: "Quantas calorias eu gasto por dia?", answer: "Calcule o metabolismo basal (por exemplo, pela fórmula de Mifflin-St Jeor) e multiplique pelo fator do seu nível de atividade, que vai de 1,2 a 1,9." },
      { question: "O que é metabolismo basal?", answer: "É a energia que o corpo gasta em repouso para manter as funções vitais, como respiração, circulação e temperatura." },
      { question: "Quantas calorias cortar para emagrecer?", answer: "Um déficit moderado, de cerca de 300 a 500 kcal por dia, costuma ser mais sustentável. Para planos específicos, procure um nutricionista." },
      { question: "As calculadoras são exatas?", answer: "Não. Elas dão estimativas baseadas em médias da população; o gasto real pode variar de pessoa para pessoa." },
    ],
  },

  "frequencia-cardiaca-zonas-de-treino": {
    slug: "frequencia-cardiaca-zonas-de-treino",
    updated: "2026-11-09",
    intro: [
      "Treinar na intensidade certa faz diferença: muito leve, o corpo não evolui; muito forte o tempo todo, aumenta o risco de lesão e cansaço excessivo. A frequência cardíaca é uma das formas mais práticas de controlar essa intensidade.",
      "Neste guia você aprende a estimar a frequência cardíaca máxima, a calcular as zonas de treino e a usar cada uma no dia a dia.",
    ],
    sections: [
      {
        heading: "Frequência cardíaca máxima (FCmáx)",
        paragraphs: [
          "A fórmula mais conhecida é FCmáx = 220 − idade. Uma pessoa de 40 anos teria FCmáx estimada de 180 batimentos por minuto (bpm).",
          "Outra fórmula, considerada mais precisa por muitos estudos, é a de Tanaka: FCmáx = 208 − 0,7 × idade. Para 40 anos, dá 180 bpm também, mas os resultados se afastam para pessoas mais jovens ou mais velhas.",
          "Todas são estimativas: a frequência máxima real pode variar 10 a 15 bpm para mais ou para menos. Um teste ergométrico ou ergoespirométrico é a forma mais precisa de saber o seu valor.",
        ],
      },
      {
        heading: "Frequência cardíaca de repouso",
        paragraphs: [
          "Meça os batimentos logo ao acordar, ainda deitado, durante um minuto, por alguns dias seguidos, e faça a média. Adultos costumam ficar entre 60 e 100 bpm; pessoas bem condicionadas podem ter valores menores.",
        ],
      },
      {
        heading: "Calculando as zonas pelo método de Karvonen",
        paragraphs: [
          "O método de Karvonen usa a frequência de reserva, que é a diferença entre a máxima e a de repouso: FC alvo = FC repouso + (FCmáx − FC repouso) × intensidade.",
          "Exemplo: 40 anos (FCmáx 180) e repouso de 60 bpm. Reserva = 120. Para 70% de intensidade: 60 + 120 × 0,7 = 144 bpm.",
        ],
      },
      {
        heading: "As cinco zonas de treino",
        table: {
          caption: "Faixas aproximadas, em porcentagem da frequência de reserva.",
          headers: ["Zona", "Intensidade", "Para que serve"],
          rows: [
            ["Zona 1", "50% a 60%", "Recuperação, aquecimento, caminhada leve"],
            ["Zona 2", "60% a 70%", "Base aeróbica e resistência; dá para conversar"],
            ["Zona 3", "70% a 80%", "Ritmo moderado a forte; melhora o condicionamento"],
            ["Zona 4", "80% a 90%", "Limiar; treinos intervalados e de ritmo"],
            ["Zona 5", "90% a 100%", "Esforço máximo, em tiros curtos"],
          ],
        },
        after: [
          "Para iniciantes e para quem treina para saúde, a maior parte do volume costuma ficar nas zonas 2 e 3, com treinos mais intensos uma ou duas vezes por semana.",
        ],
      },
      {
        heading: "Cuidados",
        list: [
          "Quem tem doença cardíaca, pressão alta, usa medicamentos que alteram os batimentos (como betabloqueadores) ou está começando depois dos 40 anos deve fazer avaliação médica antes de treinos intensos.",
          "Sintomas como dor no peito, falta de ar desproporcional, tontura ou palpitações são motivo para parar o exercício e procurar atendimento.",
          "Relógios e pulseiras medem bem a tendência, mas podem errar em exercícios com muito movimento de braço.",
        ],
      },
    ],
    faqs: [
      { question: "Como calcular a frequência cardíaca máxima?", answer: "A estimativa mais simples é 220 menos a idade. A fórmula de Tanaka (208 − 0,7 × idade) é uma alternativa considerada mais precisa." },
      { question: "O que é o método de Karvonen?", answer: "É o cálculo das zonas de treino usando a frequência de reserva: FC repouso + (FCmáx − FC repouso) × intensidade." },
      { question: "Qual zona queima mais gordura?", answer: "As zonas mais leves usam proporcionalmente mais gordura como combustível, mas o gasto total de energia é maior em intensidades mais altas. A combinação das duas costuma trazer melhores resultados." },
      { question: "A FC máxima estimada é exata?", answer: "Não. Ela pode variar de 10 a 15 bpm em relação ao valor real; um teste ergométrico mede com precisão." },
    ],
  },

  "quanta-agua-beber-por-dia": {
    slug: "quanta-agua-beber-por-dia",
    updated: "2026-11-09",
    intro: [
      "A água participa de praticamente todas as funções do corpo: regula a temperatura, transporta nutrientes, ajuda os rins e o intestino. A recomendação de \"dois litros por dia\" é conhecida, mas a necessidade real varia com o peso, o clima e o nível de atividade.",
      "Veja como estimar a sua quantidade diária e como perceber se você está bebendo pouca água.",
    ],
    sections: [
      {
        heading: "A conta mais usada: 35 ml por quilo",
        paragraphs: [
          "Uma estimativa prática muito usada para adultos saudáveis é de cerca de 35 ml de água por quilo de peso por dia. Uma pessoa de 70 kg precisaria de aproximadamente 70 × 35 = 2.450 ml, ou 2,45 litros.",
          "Esse total inclui a água que vem dos alimentos, como frutas, verduras e sopas, que costuma responder por uma parte importante da hidratação diária.",
        ],
      },
      {
        heading: "Quando é preciso beber mais",
        list: [
          "Dias quentes e úmidos, quando o corpo transpira mais.",
          "Exercício físico: reponha antes, durante e depois, principalmente em treinos longos.",
          "Febre, diarreia ou vômitos, que aumentam a perda de líquidos.",
          "Gestação e amamentação.",
          "Ambientes com ar-condicionado, que ressecam o ar.",
        ],
      },
      {
        heading: "Sinais de que você está bebendo pouca água",
        list: [
          "Urina escura e em pouca quantidade: o ideal é que ela fique amarelo-clara.",
          "Boca seca, dor de cabeça e cansaço.",
          "Intestino preso.",
          "Tontura ao levantar rápido.",
        ],
        after: [
          "Idosos sentem menos sede e por isso correm mais risco de desidratação; para eles, vale criar horários para beber água.",
        ],
      },
      {
        heading: "Dá para beber água demais?",
        paragraphs: [
          "Para pessoas saudáveis é raro, mas beber volumes muito grandes em pouco tempo pode diluir o sódio do sangue, condição chamada hiponatremia. Pessoas com insuficiência cardíaca ou doença renal podem ter restrição de líquidos e devem seguir a orientação médica, e não a conta por quilo.",
        ],
      },
      {
        heading: "Dicas para lembrar de beber água",
        list: [
          "Deixe uma garrafa sempre à vista e saiba quantos mililitros ela tem.",
          "Associe a água a rotinas: ao acordar, a cada refeição, ao chegar do trabalho.",
          "Use lembretes no celular ou a ferramenta de alerta de água do site, que calcula a sua meta e acompanha o consumo ao longo do dia.",
          "Café e chá também hidratam, mas em excesso a cafeína pode atrapalhar o sono; veja o guia sobre limite de cafeína.",
        ],
      },
    ],
    faqs: [
      { question: "Quantos litros de água devo beber por dia?", answer: "Uma estimativa comum para adultos saudáveis é de cerca de 35 ml por quilo de peso por dia. Para 70 kg, aproximadamente 2,45 litros, incluindo a água dos alimentos." },
      { question: "Café conta como água?", answer: "Bebidas como café e chá contribuem para a hidratação, mas a água pura continua sendo a melhor opção para a maior parte da ingestão diária." },
      { question: "Como saber se estou hidratado?", answer: "Um bom sinal é a urina amarelo-clara. Urina escura e em pouca quantidade indica que é preciso beber mais." },
      { question: "Quem não deve seguir a conta por quilo?", answer: "Pessoas com doenças renais, cardíacas ou com orientação médica de restrição de líquidos." },
    ],
  },

  "quanto-cafe-posso-tomar-por-dia": {
    slug: "quanto-cafe-posso-tomar-por-dia",
    updated: "2026-11-09",
    intro: [
      "O café é a bebida preferida de muitos brasileiros e, em quantidades moderadas, faz parte de uma rotina saudável. Mas a cafeína tem limite: em excesso, pode causar insônia, ansiedade, taquicardia e dor de estômago.",
      "Neste guia você descobre qual é o limite de cafeína recomendado, quanto existe em cada bebida e como evitar que o cafezinho atrapalhe o sono.",
    ],
    sections: [
      {
        heading: "Qual é o limite diário de cafeína",
        paragraphs: [
          "Para adultos saudáveis, autoridades como a EFSA (Europa) e a FDA (Estados Unidos) consideram que até cerca de 400 mg de cafeína por dia não está associado a riscos para a maioria das pessoas. Uma dose única de até 200 mg também é considerada segura para adultos.",
          "Para gestantes e lactantes, a recomendação é não passar de 200 mg por dia. Crianças e adolescentes devem consumir bem menos, e pessoas com arritmia, ansiedade, refluxo ou pressão alta podem ser mais sensíveis.",
        ],
      },
      {
        heading: "Quanta cafeína tem em cada bebida",
        table: {
          caption: "Valores aproximados; variam conforme o grão, o preparo e a marca.",
          headers: ["Bebida", "Porção", "Cafeína aproximada"],
          rows: [
            ["Café coado", "xícara de 150 ml", "80 a 120 mg"],
            ["Espresso", "dose de 50 ml", "60 a 100 mg"],
            ["Café solúvel", "xícara de 150 ml", "50 a 80 mg"],
            ["Chá preto", "xícara de 200 ml", "40 a 60 mg"],
            ["Chá verde / mate", "xícara de 200 ml", "20 a 40 mg"],
            ["Refrigerante de cola", "lata de 350 ml", "30 a 45 mg"],
            ["Energético", "lata de 250 ml", "cerca de 80 mg"],
            ["Chocolate amargo", "barra de 25 g", "15 a 25 mg"],
          ],
        },
        after: [
          "Na prática, quatro xícaras médias de café coado ao longo do dia já chegam perto do limite de 400 mg.",
        ],
      },
      {
        heading: "Cafeína e sono",
        paragraphs: [
          "A cafeína tem meia-vida de cerca de 5 horas em adultos, o que significa que metade dela ainda está no organismo cinco horas depois. Um café às 17h pode continuar agindo na hora de dormir.",
          "Para quem tem dificuldade para dormir, uma regra prática é evitar cafeína nas 6 a 8 horas antes de deitar. Veja também o guia sobre ciclos do sono.",
        ],
      },
      {
        heading: "Sinais de excesso",
        list: [
          "Agitação, nervosismo ou ansiedade.",
          "Coração acelerado ou palpitações.",
          "Insônia ou sono leve.",
          "Dor de estômago, azia ou vontade frequente de urinar.",
          "Dor de cabeça quando fica sem café, sinal de dependência.",
        ],
        after: [
          "Se você quer reduzir, diminua aos poucos, trocando uma xícara por vez por café descafeinado ou chá sem cafeína, para evitar dor de cabeça de abstinência.",
        ],
      },
    ],
    faqs: [
      { question: "Quantas xícaras de café posso tomar por dia?", answer: "Para adultos saudáveis, até cerca de 400 mg de cafeína por dia, o que equivale a aproximadamente 3 a 4 xícaras de café coado." },
      { question: "Grávida pode tomar café?", answer: "A recomendação é limitar a cafeína a até 200 mg por dia na gestação e na amamentação, e conversar com o obstetra." },
      { question: "Quanto tempo a cafeína fica no corpo?", answer: "A meia-vida em adultos é de cerca de 5 horas, podendo variar de 3 a 7 horas conforme a pessoa." },
      { question: "Energético tem mais cafeína que café?", answer: "Uma lata de 250 ml costuma ter cerca de 80 mg, parecido com uma xícara de café coado, mas é fácil consumir várias latas." },
    ],
  },

  "que-horas-dormir-ciclos-do-sono": {
    slug: "que-horas-dormir-ciclos-do-sono",
    updated: "2026-11-09",
    intro: [
      "Já dormiu oito horas e acordou se sentindo quebrado? Muitas vezes o problema não é quanto você dormiu, mas em que momento do sono o despertador tocou. O sono acontece em ciclos, e acordar no meio de um ciclo profundo dá aquela sensação de cansaço e confusão.",
      "Entender os ciclos ajuda a escolher a hora de deitar e de acordar e a dormir melhor.",
    ],
    sections: [
      {
        heading: "Como funciona um ciclo de sono",
        paragraphs: [
          "Durante a noite, o cérebro passa várias vezes pelas mesmas fases: sono leve, sono profundo e sono REM, fase em que acontecem os sonhos mais vívidos. Cada ciclo completo dura, em média, cerca de 90 minutos, podendo variar entre 70 e 120 minutos.",
          "Ao longo da noite, os primeiros ciclos têm mais sono profundo e os últimos têm mais sono REM. Um adulto costuma completar de 4 a 6 ciclos por noite.",
        ],
      },
      {
        heading: "Calculando a hora de dormir",
        paragraphs: [
          "Partindo da hora em que você precisa acordar, volte em blocos de 90 minutos e some cerca de 15 minutos, o tempo médio para pegar no sono.",
          "Exemplo: para acordar às 7h, 5 ciclos (7h30 de sono) levam a dormir às 23h30; somando 15 minutos para adormecer, o ideal é deitar por volta das 23h15. Com 6 ciclos (9 horas), deitar às 21h45.",
        ],
        table: {
          caption: "Horários para deitar considerando 15 minutos para pegar no sono.",
          headers: ["Acordar às", "5 ciclos (7h30)", "6 ciclos (9h)", "4 ciclos (6h)"],
          rows: [
            ["5h30", "21h45", "20h15", "23h15"],
            ["6h00", "22h15", "20h45", "23h45"],
            ["6h30", "22h45", "21h15", "0h15"],
            ["7h00", "23h15", "21h45", "0h45"],
            ["7h30", "23h45", "22h15", "1h15"],
          ],
        },
      },
      {
        heading: "Quantas horas de sono são necessárias",
        paragraphs: [
          "Para a maioria dos adultos, as recomendações de entidades de medicina do sono ficam entre 7 e 9 horas por noite. Adolescentes precisam de mais (8 a 10 horas) e idosos costumam ter sono mais leve e fragmentado. Dormir 6 horas de vez em quando não é um problema, mas como hábito costuma deixar um déficit de sono acumulado.",
        ],
      },
      {
        heading: "Dicas para dormir melhor",
        list: [
          "Mantenha horários regulares, inclusive no fim de semana.",
          "Evite cafeína nas 6 a 8 horas antes de dormir.",
          "Reduza telas e luz forte na última hora antes de deitar.",
          "Deixe o quarto escuro, silencioso e com temperatura agradável.",
          "Evite refeições pesadas e álcool perto da hora de dormir: o álcool ajuda a pegar no sono, mas piora a qualidade do sono na segunda metade da noite.",
          "Se a insônia, o ronco forte ou o cansaço diurno forem frequentes, procure um médico: podem ser sinais de distúrbios como apneia do sono.",
        ],
      },
    ],
    faqs: [
      { question: "Quanto dura um ciclo de sono?", answer: "Em média cerca de 90 minutos, variando entre 70 e 120 minutos de pessoa para pessoa e ao longo da noite." },
      { question: "Que horas devo dormir para acordar às 7h?", answer: "Para completar 5 ciclos, deite por volta das 23h15; para 6 ciclos, por volta das 21h45, já contando 15 minutos para adormecer." },
      { question: "Por que acordo cansado mesmo dormindo muito?", answer: "Acordar no meio de um ciclo de sono profundo causa sensação de cansaço. Também podem influenciar horários irregulares, álcool, cafeína e distúrbios como a apneia." },
      { question: "A conta dos ciclos é exata?", answer: "Não. Os 90 minutos são uma média; use o cálculo como referência e observe como você se sente." },
    ],
  },

  "como-calcular-periodo-fertil": {
    slug: "como-calcular-periodo-fertil",
    updated: "2026-11-09",
    intro: [
      "Saber quando acontece o período fértil ajuda quem quer engravidar a planejar as relações nos dias de maior chance e ajuda a entender melhor o próprio ciclo menstrual. O cálculo pelo calendário, conhecido como tabelinha, é simples, mas tem limitações importantes.",
      "Importante: o cálculo do período fértil não é um método seguro para evitar gravidez. Para isso, converse com um ginecologista sobre métodos contraceptivos.",
    ],
    sections: [
      {
        heading: "Como funciona o ciclo menstrual",
        paragraphs: [
          "O ciclo começa no primeiro dia da menstruação e termina no dia anterior à menstruação seguinte. Em média dura 28 dias, mas ciclos entre 21 e 35 dias são considerados comuns em adultas.",
          "A ovulação, quando o ovário libera o óvulo, costuma acontecer cerca de 14 dias antes da próxima menstruação. Em um ciclo de 28 dias, isso cai por volta do 14º dia; em um ciclo de 32 dias, por volta do 18º dia.",
        ],
      },
      {
        heading: "Como calcular o período fértil",
        paragraphs: [
          "Os espermatozoides podem sobreviver até cerca de 5 dias no corpo da mulher, e o óvulo vive cerca de 24 horas após a ovulação. Por isso, a janela fértil vai de aproximadamente 5 dias antes da ovulação até o dia da ovulação.",
          "Exemplo: menstruação começou em 1º de março, ciclo de 28 dias. Próxima menstruação prevista: 29 de março. Ovulação estimada: 15 de março (14 dias antes). Período fértil: de 10 a 15 de março.",
        ],
      },
      {
        heading: "Ciclos irregulares",
        paragraphs: [
          "Se a duração do ciclo muda bastante de um mês para outro, a previsão perde precisão. Uma forma de lidar com isso é anotar a duração dos ciclos por alguns meses e usar o mais curto e o mais longo para estimar uma janela maior.",
          "Situações como estresse, mudanças de peso, amamentação, uso recente de anticoncepcional e condições como a síndrome dos ovários policísticos podem alterar a ovulação.",
        ],
      },
      {
        heading: "Sinais que ajudam a identificar a ovulação",
        list: [
          "Muco cervical transparente e elástico, parecido com clara de ovo.",
          "Pequeno aumento da temperatura basal (medida ao acordar) depois da ovulação.",
          "Testes de ovulação de farmácia, que detectam o pico do hormônio LH.",
          "Algumas mulheres sentem uma dor leve em um lado do baixo-ventre.",
        ],
      },
      {
        heading: "Quando procurar um médico",
        paragraphs: [
          "Casais com menos de 35 anos que tentam engravidar por 12 meses sem sucesso, ou mulheres com 35 anos ou mais depois de 6 meses de tentativas, devem procurar avaliação. Ciclos muito irregulares, ausência de menstruação ou dor intensa também merecem consulta.",
          "Quando a gravidez acontecer, a calculadora de data provável do parto ajuda a acompanhar as semanas de gestação.",
        ],
      },
    ],
    faqs: [
      { question: "Como calcular o período fértil?", answer: "Estime a ovulação cerca de 14 dias antes da próxima menstruação. O período fértil vai de aproximadamente 5 dias antes da ovulação até o dia da ovulação." },
      { question: "A tabelinha serve para evitar gravidez?", answer: "Não é um método seguro, principalmente em ciclos irregulares. Para evitar gravidez, procure orientação sobre métodos contraceptivos." },
      { question: "Quantos dias dura o período fértil?", answer: "Cerca de 6 dias: os 5 dias antes da ovulação e o dia da ovulação." },
      { question: "Ciclo irregular tem período fértil?", answer: "Sim, mas é mais difícil prever. Testes de ovulação e a observação do muco cervical ajudam." },
    ],
  },

  "data-provavel-do-parto": {
    slug: "data-provavel-do-parto",
    updated: "2026-11-09",
    intro: [
      "Uma das primeiras perguntas depois do teste positivo é: quando o bebê vai nascer? A data provável do parto, a DPP, é calculada a partir da data da última menstruação e serve de referência para acompanhar toda a gestação.",
      "Veja como fazer a conta, como contar as semanas de gestação e por que a data é uma estimativa.",
    ],
    sections: [
      {
        heading: "A regra de Naegele",
        paragraphs: [
          "O método clássico soma 280 dias (40 semanas) ao primeiro dia da última menstruação (DUM). Uma forma prática de fazer a conta é: some 7 dias à data da DUM e subtraia 3 meses, ajustando o ano se necessário.",
          "Exemplo: DUM em 10 de março. Somando 7 dias: 17 de março. Subtraindo 3 meses: 17 de dezembro. Essa é a DPP.",
        ],
      },
      {
        heading: "Por que conta a partir da menstruação",
        paragraphs: [
          "A concepção acontece, em média, cerca de duas semanas depois do início da menstruação, mas a data exata é difícil de saber. Por isso, a gestação é contada a partir da DUM: quando se fala em \"40 semanas\", cerca de duas delas são anteriores à fecundação.",
          "Essa regra considera ciclos de cerca de 28 dias. Em ciclos mais longos ou mais curtos, a data real pode ser diferente.",
        ],
      },
      {
        heading: "Semanas de gestação e trimestres",
        table: {
          headers: ["Período", "Semanas", "Marcos importantes"],
          rows: [
            ["1º trimestre", "1 a 13", "Formação dos órgãos; primeira ultrassonografia"],
            ["2º trimestre", "14 a 27", "Ultrassom morfológico; início dos movimentos percebidos"],
            ["3º trimestre", "28 a 40", "Crescimento e ganho de peso do bebê"],
          ],
        },
        after: [
          "Um bebê é considerado a termo entre 37 e 41 semanas e 6 dias. Antes de 37 semanas, o parto é considerado prematuro.",
        ],
      },
      {
        heading: "A ultrassonografia corrige a data",
        paragraphs: [
          "A ultrassonografia do primeiro trimestre, idealmente entre 7 e 13 semanas, é a forma mais precisa de datar a gestação. Se houver diferença relevante em relação à DPP calculada pela menstruação, o médico costuma adotar a data do ultrassom.",
        ],
      },
      {
        heading: "Poucos bebês nascem na data prevista",
        paragraphs: [
          "Apenas uma pequena parte dos bebês nasce exatamente na DPP. A maioria nasce nas duas semanas antes ou depois dela. Por isso, é melhor pensar na DPP como o centro de uma janela de tempo, e não como um dia marcado.",
          "Na reta final, a ferramenta de cronômetro de contrações ajuda a registrar a frequência e a duração das contrações para informar à equipe médica. Qualquer dúvida ou sinal de alerta, como sangramento, perda de líquido ou redução dos movimentos do bebê, deve ser comunicado ao obstetra.",
        ],
      },
    ],
    faqs: [
      { question: "Como calcular a data provável do parto?", answer: "Some 280 dias ao primeiro dia da última menstruação, ou some 7 dias e subtraia 3 meses (regra de Naegele)." },
      { question: "A DPP pelo ultrassom é mais precisa?", answer: "Sim, principalmente o ultrassom do primeiro trimestre, que costuma ser usado para confirmar ou corrigir a data." },
      { question: "Quantas semanas tem uma gestação?", answer: "Cerca de 40 semanas contadas a partir da última menstruação. O bebê é considerado a termo entre 37 e 42 semanas incompletas." },
      { question: "O bebê nasce na data prevista?", answer: "Raramente no dia exato. A maioria nasce nas duas semanas antes ou depois da DPP." },
    ],
  },
};
