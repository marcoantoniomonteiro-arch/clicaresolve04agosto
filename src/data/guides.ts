export interface GuideSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export interface Guide {
  slug: string;
  title: string;
  description: string;
  emoji: string;
  category: string;
  readingTime: string;
  updatedAt: string;
  intro: string;
  sections: GuideSection[];
  relatedTools: { slug: string; name: string }[];
}

export const GUIDES: Guide[] = [
  {
    slug: "como-organizar-financas-pessoais",
    title: "Como organizar suas finanças pessoais: um guia prático",
    description: "Um passo a passo realista para sair do vermelho, entender juros compostos e criar o hábito de guardar dinheiro todo mês — sem planilhas complicadas.",
    emoji: "💰",
    category: "Finanças",
    readingTime: "8 min de leitura",
    updatedAt: "2026",
    intro: "Organizar as finanças não é sobre fazer planilhas bonitas — é sobre entender três coisas: quanto entra, quanto sai, e para onde vai a diferença. A maioria das pessoas erra não por falta de disciplina, mas por falta de clareza. Este guia reúne o essencial para você sair do modo 'apagar incêndio' no fim do mês e começar a construir alguma folga financeira real.",
    sections: [
      {
        heading: "1. Descubra para onde seu dinheiro realmente vai",
        paragraphs: [
          "Antes de qualquer meta ambiciosa, é preciso saber exatamente quanto você gasta e em quê. A forma mais simples é revisar os últimos 2 ou 3 meses de extrato bancário e fatura do cartão, separando os gastos em categorias amplas: moradia, alimentação, transporte, assinaturas, lazer e 'outros'.",
          "Esse exercício costuma revelar dois tipos de surpresa: gastos fixos que você esqueceu que existem (assinaturas de serviços que não usa mais) e gastos variáveis que se somam sem você perceber (delivery, aplicativos de transporte, compras por impulso). Não é preciso cortar tudo — é preciso saber que existe, para decidir com consciência o que vale a pena manter.",
        ],
      },
      {
        heading: "2. Construa uma reserva de emergência antes de qualquer investimento",
        paragraphs: [
          "Um erro comum é tentar investir em algo mais arrojado antes de ter uma reserva básica. A reserva de emergência é o dinheiro que existe para imprevistos — perda de renda, conserto urgente, problema de saúde — e deve ficar em algo de liquidez imediata, mesmo que renda pouco.",
          "Uma referência comum é guardar de 3 a 6 meses do seu custo de vida mensal. Parece muito, mas o importante é começar: guardar uma pequena parte do salário todo mês, de forma automática, já cria o hábito. É aqui que entender juros compostos ajuda — mesmo aportes pequenos e constantes crescem de forma acelerada ao longo do tempo, porque cada mês os rendimentos anteriores também passam a render.",
        ],
      },
      {
        heading: "3. Entenda a diferença entre dívida boa e dívida cara",
        paragraphs: [
          "Nem toda dívida é um problema — um financiamento com juros baixos para algo que gera valor (como um imóvel ou um curso que aumenta sua renda) é diferente de uma dívida de cartão de crédito rotativo ou cheque especial, que costuma ter os juros mais altos do mercado financeiro brasileiro.",
          "Se você tem mais de um tipo de dívida, a estratégia matematicamente mais eficiente é sempre priorizar o pagamento da que tem a maior taxa de juros primeiro, mesmo que o saldo dela seja menor que o de outras. Isso reduz o total de juros pagos ao longo do tempo, mais do que quitar primeiro a dívida de menor valor.",
        ],
      },
      {
        heading: "4. Simule antes de decidir — não confie só na 'sensação'",
        paragraphs: [
          "Decisões como 'vale a pena parcelar essa compra?' ou 'quanto vou ter guardado daqui a 5 anos se eu investir R$ 300 por mês?' são difíceis de responder de cabeça, porque envolvem juros compostos, que não crescem de forma linear e intuitiva.",
          "Antes de tomar decisões financeiras maiores, vale simular os números com uma calculadora — isso costuma revelar se um parcelamento 'sem juros' realmente não tem custo embutido, ou mostrar visualmente o quanto um hábito pequeno de poupança pode se transformar em um valor considerável no longo prazo.",
        ],
      },
      {
        heading: "5. Revise mensalmente, não anualmente",
        paragraphs: [
          "Orçamento não é algo que se define uma vez e esquece. Renda muda, gastos mudam, prioridades mudam. Reserve 15 minutos no início de cada mês para olhar o que entrou, o que saiu, e ajustar o que for preciso. Esse pequeno ritual é o que separa quem realmente organiza as finanças de quem só faz planilhas que nunca mais abre.",
        ],
      },
    ],
    relatedTools: [
      { slug: "juros-compostos", name: "Calculadora de Juros Compostos" },
      { slug: "calculadora-desconto", name: "Calculadora de Desconto" },
      { slug: "ponto-equilibrio", name: "Ponto de Equilíbrio" },
      { slug: "salario-hora", name: "Salário por Hora" },
    ],
  },
  {
    slug: "manutencao-preventiva-carro",
    title: "Manutenção preventiva do carro: o que fazer e quando",
    description: "Um checklist realista de manutenção automotiva para evitar surpresas caras, economizar combustível e manter o valor de revenda do veículo.",
    emoji: "🚗",
    category: "Casa",
    readingTime: "7 min de leitura",
    updatedAt: "2026",
    intro: "Manutenção preventiva é mais barata do que manutenção corretiva — trocar um item por desgaste natural custa uma fração do que consertar o estrago que a falta dele pode causar. Este guia resume os principais pontos de atenção para manter o carro seguro, econômico e com bom valor de revenda.",
    sections: [
      {
        heading: "Itens que pedem atenção regular",
        paragraphs: [
          "Alguns componentes do carro têm vida útil previsível e merecem revisão em intervalos regulares, independentemente de o carro 'parecer' estar funcionando bem:",
        ],
        list: [
          "Óleo do motor e filtro — geralmente a cada 10.000 km ou 1 ano, o que vier primeiro (verifique o manual do seu modelo, pois varia)",
          "Pastilhas e discos de freio — desgaste varia muito com o estilo de condução; ruído ao frear é sinal de alerta",
          "Calibragem e desgaste dos pneus — verificar mensalmente; pneu desalinhado ou descalibrado aumenta o consumo de combustível",
          "Filtro de ar do motor e do ar-condicionado — normalmente trocados a cada 10.000–15.000 km",
          "Correia dentada (em motores que a utilizam) — intervalo específico do fabricante, geralmente entre 40.000 e 60.000 km; sua ruptura pode causar dano grave ao motor",
          "Bateria — vida útil média de 2 a 4 anos; sinais de fraqueza incluem dificuldade para dar partida",
        ],
      },
      {
        heading: "Álcool ou gasolina: a conta muda de posto para posto",
        paragraphs: [
          "Em carros flex, a escolha entre álcool e gasolina deve ser refeita a cada abastecimento, porque a relação de preços entre os dois combustíveis varia — inclusive de bomba para bomba na mesma cidade. A regra prática mais usada é: se o preço do álcool for até 70% do preço da gasolina, o álcool compensa (o etanol rende menos por litro, mas costuma ser mais barato).",
          "Essa conta de 70% é uma média — o rendimento real do etanol varia conforme o motor do veículo, podendo ficar entre 65% e 75%. Vale a pena calcular com os preços do dia antes de decidir, em vez de seguir sempre a mesma regra de cabeça.",
        ],
      },
      {
        heading: "Como a manutenção afeta o valor de revenda",
        paragraphs: [
          "Carros com histórico de manutenção em dia (idealmente com notas fiscais guardadas) costumam ter valor de revenda mais alto e vendem mais rápido, porque reduzem a incerteza do comprador. Já a depreciação natural do veículo — a perda de valor só pelo tempo de uso e quilometragem — acontece independentemente da manutenção, mas é mais acentuada nos primeiros anos de vida do carro.",
          "Ao planejar a troca de veículo, vale simular como o valor de mercado do seu carro deve evoluir nos próximos anos, para decidir o melhor momento de vender ou trocar — geralmente antes que grandes itens de manutenção (como a correia dentada) vençam, o que costuma reduzir o interesse de compradores.",
        ],
      },
      {
        heading: "Sinais de que algo precisa de atenção imediata",
        paragraphs: [
          "Alguns sinais não devem esperar a próxima revisão programada: luzes de alerta no painel acesas, ruídos novos ao frear ou acelerar, vibração no volante em velocidade de cruzeiro, cheiro de queimado, ou vazamento de fluido visível embaixo do carro. Ignorar esses sinais é o caminho mais comum para transformar um reparo simples em um problema caro.",
        ],
      },
    ],
    relatedTools: [
      { slug: "alcool-gasolina", name: "Álcool ou Gasolina" },
      { slug: "depreciacao-veiculo", name: "Depreciação de Veículo" },
      { slug: "parcelamento-multas", name: "Parcelamento de Multas" },
    ],
  },
  {
    slug: "entenda-seu-gasto-calorico",
    title: "TMB, TDEE e macronutrientes: entenda seu gasto calórico de verdade",
    description: "Sem fórmulas mágicas: como o corpo gasta energia, por que duas pessoas com o mesmo peso podem ter necessidades calóricas diferentes, e como usar isso para definir metas realistas.",
    emoji: "🔥",
    category: "Saúde",
    readingTime: "7 min de leitura",
    updatedAt: "2026",
    intro: "Emagrecer, manter o peso ou ganhar massa muscular são, no fundo, questões de balanço energético — mas entender os termos por trás disso ajuda a definir metas mais realistas do que seguir dietas genéricas. Este guia explica, de forma direta, como o corpo gasta calorias e como isso se conecta às suas escolhas do dia a dia.",
    sections: [
      {
        heading: "O que é Taxa Metabólica Basal (TMB)",
        paragraphs: [
          "A TMB é a quantidade de energia que seu corpo gasta apenas para manter as funções vitais em repouso absoluto — respirar, bater o coração, regular a temperatura corporal, entre outras. É o 'piso' do seu gasto calórico diário, mesmo que você passasse o dia inteiro deitado sem se mover.",
          "A TMB varia principalmente com peso, altura, idade e sexo biológico, mas também é influenciada pela quantidade de massa muscular — músculo consome mais energia em repouso do que gordura, o que explica por que duas pessoas com o mesmo peso podem ter TMB diferentes.",
        ],
      },
      {
        heading: "O que é TDEE e por que ele importa mais no dia a dia",
        paragraphs: [
          "O TDEE (gasto energético total diário) é a TMB somada a tudo que você gasta se movendo: trabalho, exercício, tarefas domésticas, e até a digestão dos alimentos. É o número que realmente importa para decidir quantas calorias consumir, porque reflete sua rotina real, não só o repouso.",
          "Para emagrecer, o princípio básico é consumir menos calorias do que o TDEE (déficit calórico). Para ganhar massa, o oposto (superávit calórico), geralmente combinado com treino de força. A margem recomendada costuma ser moderada — grandes déficits ou superávits tendem a ser difíceis de manter e podem trazer efeitos indesejados, como perda de massa muscular em déficits muito agressivos.",
        ],
      },
      {
        heading: "Macronutrientes: não é só sobre quantidade, é sobre composição",
        paragraphs: [
          "Calorias totais definem se você ganha, perde ou mantém peso, mas a composição de macronutrientes (proteínas, carboidratos e gorduras) influencia como seu corpo usa essa energia — saciedade, preservação de massa muscular e desempenho físico, por exemplo.",
          "Proteína tem papel central na preservação (ou ganho) de massa muscular, especialmente durante um déficit calórico. Carboidratos são a principal fonte de energia rápida, importantes para desempenho em treinos intensos. Gorduras são essenciais para produção hormonal e não devem ser cortadas de forma extrema, mesmo em dietas de emagrecimento.",
        ],
      },
      {
        heading: "Por que os números de calculadoras são estimativas, não sentenças",
        paragraphs: [
          "Fórmulas como a de Mifflin-St Jeor (uma das mais usadas para estimar TMB) são baseadas em médias populacionais — elas dão um ponto de partida razoável, mas o gasto calórico real de cada pessoa pode variar alguns pontos percentuais para mais ou para menos, por fatores individuais que uma fórmula não consegue capturar completamente.",
          "A forma mais confiável de calibrar esses números é usá-los como estimativa inicial e observar o resultado real ao longo de 2 a 3 semanas: se o peso não se move na direção esperada mantendo a mesma rotina, ajuste as calorias gradualmente, em vez de confiar cegamente no número calculado.",
        ],
      },
    ],
    relatedTools: [
      { slug: "gasto-calorico", name: "Calculadora de Gasto Calórico" },
      { slug: "macronutrientes", name: "Calculadora de Macronutrientes" },
      { slug: "imc-avancada", name: "IMC Avançado" },
      { slug: "frequencia-cardiaca", name: "Frequência Cardíaca" },
    ],
  },
];
