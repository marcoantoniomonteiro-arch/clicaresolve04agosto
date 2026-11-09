import type { GuideContent } from "./guides";

// Guias de finanças
export const GUIDES_EXTRA_1: Record<string, GuideContent> = {
  "juros-compostos-como-calcular": {
    slug: "juros-compostos-como-calcular",
    updated: "2026-11-09",
    intro: [
      "Juros compostos são os famosos \"juros sobre juros\": a cada período, os juros do mês anterior passam a fazer parte do valor que rende no mês seguinte. No começo a diferença parece pequena, mas, com o passar dos anos, é ela que faz um investimento crescer muito mais rápido do que o dinheiro guardado.",
      "O mesmo mecanismo funciona contra você nas dívidas: no cartão de crédito e no cheque especial, os juros compostos fazem uma dívida pequena dobrar em poucos meses. Neste guia você aprende a fórmula, vê exemplos com números reais e entende como usar a nossa calculadora para simular os seus próprios cenários.",
    ],
    sections: [
      {
        heading: "Juros simples × juros compostos",
        paragraphs: [
          "Nos juros simples, a taxa incide sempre sobre o valor inicial. Se você aplica R$ 1.000 a 1% ao mês, ganha R$ 10 todo mês, e depois de 12 meses terá R$ 1.120.",
          "Nos juros compostos, a taxa incide sobre o saldo acumulado. No primeiro mês você ganha R$ 10; no segundo, 1% de R$ 1.010, ou seja, R$ 10,10; e assim por diante. Depois de 12 meses o saldo é de R$ 1.126,83. Em um ano a diferença é de poucos reais, mas em 10 anos os juros simples levariam o valor a R$ 2.200, enquanto os compostos chegariam a R$ 3.300.",
        ],
      },
      {
        heading: "A fórmula dos juros compostos",
        paragraphs: [
          "A fórmula é M = C × (1 + i)ⁿ, em que M é o montante final, C é o capital inicial, i é a taxa de juros por período (em decimal) e n é o número de períodos.",
          "Exemplo: R$ 5.000 aplicados a 0,9% ao mês durante 36 meses. M = 5.000 × (1,009)³⁶ = 5.000 × 1,3807 ≈ R$ 6.903,50. Os juros ganhos foram de cerca de R$ 1.903,50.",
          "Um cuidado importante: a taxa e o prazo precisam estar na mesma unidade. Se a taxa é mensal, o prazo deve estar em meses. Para transformar uma taxa anual em mensal, não basta dividir por 12: a taxa mensal equivalente é (1 + taxa anual)^(1/12) − 1. Uma taxa de 12% ao ano equivale a cerca de 0,949% ao mês, e não a 1%.",
        ],
      },
      {
        heading: "O poder dos aportes mensais",
        paragraphs: [
          "Na vida real, quase ninguém aplica um valor só e espera. O mais comum é guardar um pouco todo mês. Nesse caso, cada depósito começa a render a partir do mês em que entra, e o efeito dos juros compostos fica ainda mais visível.",
        ],
        table: {
          caption: "Simulação com aporte de R$ 300 por mês, sem valor inicial, a 0,8% ao mês (cerca de 10% ao ano), sem descontar impostos.",
          headers: ["Prazo", "Total depositado", "Saldo aproximado", "Juros ganhos"],
          rows: [
            ["5 anos", "R$ 18.000", "R$ 23.000", "R$ 5.000"],
            ["10 anos", "R$ 36.000", "R$ 60.000", "R$ 24.000"],
            ["20 anos", "R$ 72.000", "R$ 216.000", "R$ 144.000"],
          ],
        },
        after: [
          "Repare que, em 20 anos, os juros passam a ser maiores que todo o dinheiro depositado. É por isso que começar cedo costuma pesar mais do que o valor de cada aporte. Os números são aproximados e servem para mostrar o efeito: rendimentos reais variam e, em muitos investimentos, há imposto de renda sobre o ganho.",
        ],
      },
      {
        heading: "Juros compostos nas dívidas",
        paragraphs: [
          "O rotativo do cartão de crédito costuma cobrar taxas muito acima das de qualquer investimento. Com uma taxa de 10% ao mês, uma dívida de R$ 1.000 vira cerca de R$ 1.772 em 6 meses e R$ 3.138 em 12 meses, sem nenhuma compra nova.",
          "Por isso, a regra prática de finanças pessoais é: antes de investir, quite dívidas caras. Nenhuma aplicação comum rende o suficiente para compensar juros de cartão ou cheque especial.",
        ],
      },
      {
        heading: "Erros comuns ao calcular",
        list: [
          "Misturar taxa anual com prazo em meses (ou o contrário).",
          "Dividir a taxa anual por 12 em vez de usar a taxa equivalente.",
          "Esquecer o imposto de renda e as taxas de administração, que reduzem o ganho real.",
          "Ignorar a inflação: um rendimento de 10% ao ano com inflação de 5% representa um ganho real de cerca de 4,8%.",
          "Comparar investimentos só pela taxa, sem olhar prazo de resgate, risco e garantia.",
        ],
      },
      {
        heading: "Como usar a calculadora de juros compostos",
        paragraphs: [
          "Na ferramenta, informe o valor inicial, o aporte mensal, a taxa e o prazo. Ela mostra o saldo final, quanto foi depositado e quanto veio dos juros, mês a mês. Experimente mudar uma variável por vez: aumentar o prazo em cinco anos normalmente faz mais diferença do que aumentar um pouco o aporte.",
        ],
      },
    ],
    faqs: [
      { question: "Qual é a fórmula dos juros compostos?", answer: "M = C × (1 + i)ⁿ, em que M é o montante, C o capital inicial, i a taxa por período em decimal e n o número de períodos." },
      { question: "Como transformar taxa anual em mensal?", answer: "Use (1 + taxa anual)^(1/12) − 1. Por exemplo, 12% ao ano equivalem a cerca de 0,949% ao mês." },
      { question: "Juros compostos são bons ou ruins?", answer: "Depende do lado em que você está: eles aceleram o crescimento dos investimentos e também o das dívidas, como o rotativo do cartão." },
      { question: "A calculadora desconta imposto de renda?", answer: "Não. O resultado é bruto; para saber o valor líquido, desconte o imposto e as taxas do investimento escolhido." },
    ],
  },

  "tabela-price-ou-sac": {
    slug: "tabela-price-ou-sac",
    updated: "2026-11-09",
    intro: [
      "Quem vai financiar um imóvel ou um carro quase sempre precisa escolher entre duas formas de pagamento: a Tabela Price e o Sistema de Amortização Constante, o SAC. Os dois cobram a mesma taxa de juros, mas organizam as parcelas de jeitos diferentes, e isso muda quanto você paga no total e quanto aperta o orçamento no começo.",
      "Neste guia você entende como cada sistema funciona, vê um exemplo lado a lado e descobre em que situação cada um costuma valer mais a pena.",
    ],
    sections: [
      {
        heading: "Amortização e juros: as duas partes da parcela",
        paragraphs: [
          "Toda parcela de financiamento tem duas partes: a amortização, que é o pedaço que realmente diminui a dívida, e os juros, calculados sobre o saldo que ainda falta pagar. A diferença entre Price e SAC está em como essas duas partes se distribuem ao longo do tempo.",
        ],
      },
      {
        heading: "Como funciona a Tabela Price",
        paragraphs: [
          "Na Price, as parcelas são iguais do começo ao fim (sem contar correções como a TR ou seguros). No início, a maior parte da parcela é juros e só um pedaço pequeno amortiza a dívida. Com o tempo essa proporção se inverte.",
          "A vantagem é a previsibilidade e uma primeira parcela menor. A desvantagem é que a dívida cai devagar no começo e, no total, você paga mais juros.",
        ],
      },
      {
        heading: "Como funciona o SAC",
        paragraphs: [
          "No SAC, a amortização é sempre a mesma: o valor financiado dividido pelo número de parcelas. Como o saldo devedor cai mais rápido, os juros de cada mês também caem, e as parcelas vão diminuindo.",
          "A vantagem é pagar menos juros no total e ver a dívida diminuir rápido. A desvantagem é que as primeiras parcelas são mais altas, o que exige mais renda no início.",
        ],
      },
      {
        heading: "Exemplo lado a lado",
        table: {
          caption: "Financiamento de R$ 200.000 em 360 meses a 0,8% ao mês, sem seguros e sem correção monetária. Valores aproximados.",
          headers: ["", "Tabela Price", "SAC"],
          rows: [
            ["1ª parcela", "R$ 1.696", "R$ 2.156"],
            ["Parcela no meio do prazo (mês 180)", "R$ 1.696", "R$ 1.360"],
            ["Última parcela", "R$ 1.696", "R$ 560"],
            ["Total de juros pago", "≈ R$ 411.000", "≈ R$ 289.000"],
          ],
        },
        after: [
          "Nesse exemplo, o SAC economiza mais de R$ 120 mil em juros, mas exige cerca de R$ 460 a mais de parcela no primeiro mês. É exatamente esse equilíbrio que você precisa avaliar.",
        ],
      },
      {
        heading: "Qual escolher?",
        list: [
          "SAC: costuma ser melhor para quem tem renda para pagar as parcelas iniciais mais altas e quer pagar menos juros no total. É o mais usado em financiamentos imobiliários no Brasil.",
          "Price: pode fazer sentido quando a renda atual está no limite e a parcela inicial menor é o que viabiliza o financiamento, ou quando você planeja quitar antes com amortizações extras.",
          "Nos dois casos, amortizar antecipadamente (pagar um valor extra para abater o saldo) reduz bastante os juros. Peça ao banco para reduzir o prazo, e não a parcela, se o objetivo for economizar mais.",
          "Compare sempre o CET (Custo Efetivo Total), que inclui seguros e tarifas, e não só a taxa de juros.",
        ],
      },
      {
        heading: "Como usar o simulador de financiamento",
        paragraphs: [
          "Informe o valor financiado, a taxa e o prazo. O simulador mostra as parcelas das duas tabelas e o total pago em cada uma, para você comparar com números do seu caso. Lembre que bancos acrescentam seguros obrigatórios e, em imóveis, correção pela TR, então a parcela real tende a ser um pouco maior.",
        ],
      },
    ],
    faqs: [
      { question: "Qual a diferença entre Price e SAC?", answer: "Na Price as parcelas são fixas e os juros pesam mais no começo; no SAC a amortização é fixa, as parcelas começam mais altas e diminuem, e o total de juros é menor." },
      { question: "Qual tabela paga menos juros?", answer: "Com a mesma taxa e prazo, o SAC paga menos juros no total, porque a dívida diminui mais rápido." },
      { question: "Posso trocar de Price para SAC depois?", answer: "Depende do contrato e do banco. Em geral é mais fácil escolher na contratação ou usar a portabilidade para outra instituição." },
      { question: "Vale a pena amortizar o financiamento?", answer: "Normalmente sim, principalmente no início. Reduzir o prazo costuma gerar mais economia de juros do que reduzir o valor da parcela." },
    ],
  },

  "como-calcular-markup": {
    slug: "como-calcular-markup",
    updated: "2026-11-09",
    intro: [
      "Definir preço \"no olho\" ou copiando o concorrente é um dos motivos mais comuns de prejuízo em pequenos negócios. O markup é um índice que você multiplica pelo custo do produto para chegar a um preço de venda que cubra impostos, taxas, despesas e ainda deixe o lucro que você quer.",
      "Neste guia você aprende a fórmula do markup, entende por que ele é diferente da margem de lucro e vê um exemplo completo, do custo ao preço final.",
    ],
    sections: [
      {
        heading: "Markup não é a mesma coisa que margem",
        paragraphs: [
          "Muita gente acha que, para ter 30% de lucro, basta somar 30% ao custo. Não é assim. Se um produto custa R$ 100 e você vende por R$ 130, o lucro de R$ 30 representa 23% do preço de venda, e não 30%.",
          "A margem é sempre calculada sobre o preço de venda. O markup é o multiplicador aplicado sobre o custo. Por isso, o correto é partir das porcentagens que incidem sobre a venda (impostos, comissões, taxas e lucro) e chegar ao multiplicador.",
        ],
      },
      {
        heading: "A fórmula do markup",
        paragraphs: [
          "Markup = 1 ÷ [1 − (impostos + taxas + despesas fixas + lucro desejado)], com tudo em porcentagem do preço de venda e escrito em decimal.",
          "Preço de venda = custo do produto × markup.",
        ],
      },
      {
        heading: "Exemplo completo",
        list: [
          "Custo do produto (compra + frete + embalagem): R$ 40,00",
          "Impostos sobre a venda (Simples Nacional, por exemplo): 6%",
          "Taxa média da maquininha: 3%",
          "Despesas fixas rateadas (aluguel, internet, salários) sobre o faturamento: 15%",
          "Lucro desejado: 15%",
        ],
        after: [
          "Somando: 6% + 3% + 15% + 15% = 39%, ou 0,39. Markup = 1 ÷ (1 − 0,39) = 1 ÷ 0,61 ≈ 1,64. Preço de venda = R$ 40 × 1,64 ≈ R$ 65,60.",
          "Conferindo: de R$ 65,60, saem R$ 3,94 de imposto, R$ 1,97 de maquininha e R$ 9,84 de despesas fixas. Sobram R$ 49,85 − R$ 40 de custo = cerca de R$ 9,84 de lucro, exatamente 15% do preço.",
        ],
      },
      {
        heading: "Como descobrir o percentual de despesas fixas",
        paragraphs: [
          "Some as despesas fixas de um mês (aluguel, contador, internet, salários, pró-labore) e divida pelo faturamento médio mensal. Se as despesas são R$ 4.500 e você fatura R$ 30.000, as despesas fixas representam 15% do faturamento.",
          "Se o faturamento cair, esse percentual sobe e o markup precisa ser revisto. Por isso vale recalcular os preços a cada poucos meses.",
        ],
      },
      {
        heading: "Erros comuns",
        list: [
          "Esquecer custos \"invisíveis\": frete de compra, embalagem, perdas e brindes.",
          "Calcular o lucro sobre o custo e achar que é margem sobre a venda.",
          "Não incluir a taxa da maquininha, principalmente no parcelado.",
          "Usar o mesmo markup para produtos com custos e giros muito diferentes.",
          "Dar descontos sem conferir se o preço com desconto ainda cobre os custos: use a calculadora de desconto para checar.",
        ],
      },
      {
        heading: "Markup × preço do mercado",
        paragraphs: [
          "O markup diz qual é o preço mínimo saudável para o seu negócio. Se ele ficar muito acima do que o mercado pratica, o problema geralmente está no custo de compra ou nas despesas fixas, e não no preço. Nesse caso, renegociar fornecedores ou aumentar o volume de vendas costuma ser melhor do que cortar o lucro.",
          "Para saber quanto você precisa vender por mês para cobrir as despesas, veja também o guia de ponto de equilíbrio.",
        ],
      },
    ],
    faqs: [
      { question: "Qual a fórmula do markup?", answer: "Markup = 1 ÷ [1 − (impostos + taxas + despesas fixas + lucro)], com as porcentagens em decimal. O preço de venda é o custo multiplicado pelo markup." },
      { question: "Qual a diferença entre markup e margem de lucro?", answer: "Markup é o multiplicador aplicado ao custo; margem é a porcentagem do preço de venda que sobra como lucro." },
      { question: "Um markup de 2 significa 100% de lucro?", answer: "Não. Markup 2 significa que o preço é o dobro do custo, mas parte dessa diferença vai para impostos, taxas e despesas fixas." },
      { question: "De quanto em quanto tempo devo recalcular o markup?", answer: "Sempre que custos, impostos ou faturamento mudarem de forma relevante, e pelo menos a cada seis meses." },
    ],
  },

  "ponto-de-equilibrio": {
    slug: "ponto-de-equilibrio",
    updated: "2026-11-09",
    intro: [
      "Ponto de equilíbrio é o faturamento mínimo que um negócio precisa ter para pagar todos os custos sem lucro nem prejuízo. Abaixo dele, a empresa perde dinheiro; acima, começa a lucrar.",
      "Saber esse número ajuda a definir metas de venda, avaliar se vale abrir um negócio, contratar alguém ou mudar de ponto comercial. Veja como calculá-lo passo a passo.",
    ],
    sections: [
      {
        heading: "Custos fixos e custos variáveis",
        paragraphs: [
          "Custos fixos são os que existem mesmo que você não venda nada: aluguel, salários, contador, internet, sistemas. Custos variáveis acompanham as vendas: mercadoria, comissão, impostos sobre a venda, taxa da maquininha, embalagem.",
          "Separar bem os dois tipos é o passo mais importante. Um erro aqui distorce todo o resultado.",
        ],
      },
      {
        heading: "Margem de contribuição",
        paragraphs: [
          "Margem de contribuição é o que sobra de cada venda depois de pagar os custos variáveis. É esse valor que \"contribui\" para pagar os custos fixos e, depois, gerar lucro.",
          "Exemplo: um produto vendido a R$ 50 com custos variáveis de R$ 30 tem margem de contribuição de R$ 20, ou 40% do preço.",
        ],
      },
      {
        heading: "A fórmula",
        paragraphs: [
          "Ponto de equilíbrio em faturamento = custos fixos ÷ margem de contribuição percentual.",
          "Ponto de equilíbrio em unidades = custos fixos ÷ margem de contribuição por unidade.",
          "Com custos fixos de R$ 8.000 e margem de 40%: 8.000 ÷ 0,40 = R$ 20.000 de faturamento por mês. Em unidades: 8.000 ÷ 20 = 400 produtos por mês.",
        ],
      },
      {
        heading: "Incluindo o lucro desejado",
        paragraphs: [
          "Se você quer saber quanto vender para ter um lucro específico, some o lucro aos custos fixos. Para lucrar R$ 4.000 no exemplo acima: (8.000 + 4.000) ÷ 0,40 = R$ 30.000 de faturamento mensal.",
        ],
      },
      {
        heading: "Como usar o resultado",
        list: [
          "Transforme o ponto de equilíbrio mensal em meta diária: R$ 20.000 em 25 dias úteis são R$ 800 por dia.",
          "Simule cenários: quanto o ponto de equilíbrio muda se o aluguel subir ou se você der 10% de desconto?",
          "Descontos reduzem a margem de contribuição e aumentam muito o volume necessário. Com margem de 40%, um desconto de 10% derruba a margem para cerca de 33% e eleva o ponto de equilíbrio em cerca de 20%.",
          "Revise o cálculo sempre que mudar custos fixos, fornecedores ou impostos.",
        ],
      },
      {
        heading: "Ponto de equilíbrio e preço",
        paragraphs: [
          "Se o ponto de equilíbrio está muito acima do que você consegue vender, há três caminhos: reduzir custos fixos, aumentar a margem (comprar melhor ou ajustar o preço) ou aumentar o volume. A calculadora de markup ajuda a ver se o preço atual cobre todos os custos.",
        ],
      },
    ],
    faqs: [
      { question: "O que é ponto de equilíbrio?", answer: "É o faturamento em que a receita cobre exatamente os custos fixos e variáveis, sem lucro nem prejuízo." },
      { question: "Qual a fórmula do ponto de equilíbrio?", answer: "Custos fixos divididos pela margem de contribuição percentual, para o valor em reais, ou pela margem por unidade, para a quantidade de produtos." },
      { question: "O que entra nos custos fixos?", answer: "Despesas que existem mesmo sem vendas, como aluguel, salários, pró-labore, contador, internet e sistemas." },
      { question: "Imposto é custo fixo ou variável?", answer: "Impostos calculados sobre a venda, como os do Simples Nacional, são custos variáveis." },
    ],
  },

  "taxas-da-maquininha-de-cartao": {
    slug: "taxas-da-maquininha-de-cartao",
    updated: "2026-11-09",
    intro: [
      "Toda venda no cartão tem um custo: a taxa cobrada pela maquininha. Ela parece pequena em cada venda, mas no fim do mês pode consumir boa parte do lucro, principalmente em vendas parceladas e quando o dinheiro é antecipado.",
      "Neste guia você entende os tipos de taxa, aprende a calcular quanto realmente cai na conta e vê como repassar esse custo para o preço de forma correta.",
    ],
    sections: [
      {
        heading: "Os tipos de taxa",
        list: [
          "Débito: geralmente a menor taxa, com o dinheiro disponível em até um dia útil.",
          "Crédito à vista: taxa intermediária; o prazo padrão de recebimento costuma ser de cerca de 30 dias.",
          "Crédito parcelado: taxa maior, que costuma subir com o número de parcelas.",
          "Antecipação: quando você recebe antes do prazo, há um desconto extra, semelhante a juros, por cada mês antecipado.",
          "Pix na maquininha: algumas empresas cobram uma taxa pequena; outras, nenhuma.",
        ],
        after: [
          "Os valores variam bastante entre empresas e planos e mudam com frequência, por isso vale sempre conferir a tabela atual do seu contrato antes de fazer as contas.",
        ],
      },
      {
        heading: "Como calcular quanto você recebe",
        paragraphs: [
          "Valor líquido = valor da venda × (1 − taxa). Uma venda de R$ 200 no crédito à vista com taxa de 3% rende R$ 200 × 0,97 = R$ 194.",
          "Se a venda for parcelada em 6 vezes com taxa de 8% e você antecipar o recebimento, o valor líquido pode cair para algo como R$ 175 ou menos, dependendo da taxa de antecipação. Em vendas de ticket alto, essa diferença pesa bastante.",
        ],
      },
      {
        heading: "Como repassar a taxa para o preço",
        paragraphs: [
          "O erro mais comum é somar a porcentagem da taxa ao preço. Para receber R$ 100 líquidos com taxa de 5%, não basta cobrar R$ 105: R$ 105 × 0,95 = R$ 99,75.",
          "A conta certa é dividir: preço = valor que você quer receber ÷ (1 − taxa). R$ 100 ÷ 0,95 = R$ 105,27. Para taxas maiores a diferença cresce: com 12%, o certo é cobrar R$ 113,64, e não R$ 112.",
        ],
      },
      {
        heading: "Dicas para pagar menos",
        list: [
          "Compare as taxas de pelo menos três empresas, considerando o seu mix real de débito, crédito e parcelado.",
          "Negocie: com volume de vendas maior, quase sempre é possível conseguir taxas melhores.",
          "Só antecipe quando realmente precisar do dinheiro; o custo da antecipação costuma ser alto.",
          "Ofereça desconto no Pix ou no dinheiro quando a margem permitir.",
          "Inclua a taxa média da maquininha no cálculo do markup.",
        ],
      },
      {
        heading: "Como usar a calculadora de taxas",
        paragraphs: [
          "Informe o valor da venda, a modalidade e as taxas do seu plano. A ferramenta mostra quanto você recebe e quanto fica com a maquininha, e permite comparar cenários, como à vista versus parcelado, para decidir quando vale oferecer parcelamento sem juros.",
        ],
      },
    ],
    faqs: [
      { question: "Como calcular a taxa da maquininha?", answer: "Multiplique o valor da venda pela taxa para saber o custo, ou por (1 − taxa) para saber o valor líquido que você recebe." },
      { question: "Como repassar a taxa do cartão ao cliente?", answer: "Divida o valor que você quer receber por (1 − taxa). Somar a porcentagem ao preço faz você receber um pouco menos que o esperado." },
      { question: "O que é antecipação de recebíveis?", answer: "É receber antes do prazo normal das vendas no crédito, pagando um desconto proporcional ao tempo antecipado." },
      { question: "Posso cobrar preço diferente no cartão e no dinheiro?", answer: "Sim. A lei brasileira permite diferenciar preços conforme a forma de pagamento, desde que a informação esteja clara para o cliente." },
    ],
  },

  "depreciacao-de-carro": {
    slug: "depreciacao-de-carro",
    updated: "2026-11-09",
    intro: [
      "Depreciação é a perda de valor que um carro sofre com o tempo e o uso. É um dos maiores custos de ter um veículo, mesmo sem aparecer em nenhum boleto: você só percebe na hora de vender ou trocar.",
      "Entender como ela funciona ajuda a escolher o carro, decidir o melhor momento de troca e calcular o custo real de cada quilômetro rodado.",
    ],
    sections: [
      {
        heading: "Quanto um carro costuma desvalorizar",
        paragraphs: [
          "A perda é maior nos primeiros anos. Um carro zero costuma perder uma fatia relevante do valor logo no primeiro ano, e a desvalorização anual tende a diminuir depois. Como referência prática, muitos modelos populares perdem algo entre 10% e 20% ao ano nos primeiros anos, mas isso varia bastante conforme marca, modelo, procura no mercado e estado de conservação.",
          "Para ter uma ideia do seu caso, compare o preço do seu modelo na tabela FIPE de anos diferentes: a diferença entre o zero e o usado de dois ou três anos mostra a desvalorização real daquele carro.",
        ],
      },
      {
        heading: "Como calcular a depreciação",
        paragraphs: [
          "O método mais usado em simulações é o de taxa anual fixa sobre o valor do ano anterior: valor futuro = valor atual × (1 − taxa)ⁿ, em que n é o número de anos.",
          "Exemplo: um carro de R$ 90.000 com depreciação de 12% ao ano. Depois de 1 ano: R$ 79.200. Depois de 3 anos: 90.000 × 0,88³ ≈ R$ 61.330. Depois de 5 anos: ≈ R$ 47.490.",
        ],
      },
      {
        heading: "O que acelera ou segura a desvalorização",
        list: [
          "Quilometragem alta para o ano do carro.",
          "Histórico de manutenção sem comprovação, batidas e repintura.",
          "Modelos que saem de linha ou têm baixa procura.",
          "Cores e versões menos procuradas.",
          "Por outro lado, revisões em dia, manual e chave reserva, e modelos com boa fama de revenda costumam perder menos valor.",
        ],
      },
      {
        heading: "Depreciação no custo de ter um carro",
        paragraphs: [
          "Para saber o custo real do carro por mês, some depreciação, IPVA, seguro, licenciamento, manutenção, combustível e estacionamento. Em carros novos, a depreciação muitas vezes é o maior item da lista.",
          "Se o carro foi financiado, os juros também entram na conta. O simulador de financiamento ajuda a ver quanto você paga a mais pelo prazo.",
        ],
      },
      {
        heading: "Quando trocar de carro",
        paragraphs: [
          "Não existe resposta única, mas uma estratégia comum é comprar seminovos de dois ou três anos, depois da fase de maior desvalorização, e ficar com eles por mais tempo. Trocar de carro todo ano costuma ser a forma mais cara de ter um veículo.",
        ],
      },
    ],
    faqs: [
      { question: "Quanto um carro desvaloriza por ano?", answer: "Varia muito por modelo, mas a perda costuma ser maior nos primeiros anos e diminuir depois. Comparar a tabela FIPE de anos diferentes mostra a depreciação real do seu modelo." },
      { question: "Como calcular a depreciação de um veículo?", answer: "Uma forma prática é aplicar uma taxa anual sobre o valor do ano anterior: valor futuro = valor atual × (1 − taxa) elevado ao número de anos." },
      { question: "Carro zero desvaloriza mais?", answer: "Sim, a maior perda costuma acontecer nos primeiros anos de uso." },
      { question: "A calculadora usa a tabela FIPE?", answer: "Não. Ela faz uma estimativa com a taxa que você informar; para preços de mercado, consulte a tabela FIPE." },
    ],
  },

  "como-dividir-gastos-de-viagem": {
    slug: "como-dividir-gastos-de-viagem",
    updated: "2026-11-09",
    intro: [
      "Dividir os gastos de uma viagem ou de uma carona parece simples até alguém perguntar: \"mas o pedágio entra?\", \"e quem foi só na volta?\". Combinar as regras antes e fazer a conta com critério evita desconforto e deixa todo mundo tranquilo.",
      "Este guia mostra como calcular o custo de combustível, como dividir pedágio e estacionamento e como acertar a conta do restaurante com gorjeta.",
    ],
    sections: [
      {
        heading: "Quanto custa o combustível da viagem",
        paragraphs: [
          "Combustível = distância total ÷ consumo do carro (km/l) × preço do litro.",
          "Exemplo: ida e volta somando 400 km, carro que faz 12 km/l e gasolina a R$ 6,20. 400 ÷ 12 = 33,3 litros × R$ 6,20 = R$ 206,67. Com quatro pessoas no carro, cerca de R$ 51,67 para cada.",
          "Antes de abastecer, vale conferir se o álcool compensa mais na sua região: a calculadora de álcool ou gasolina faz essa conta em segundos.",
        ],
      },
      {
        heading: "O que mais entra na divisão",
        list: [
          "Pedágios: somam-se ao total da viagem e são divididos igualmente.",
          "Estacionamento: entra na conta de todos que usaram o carro naquele trecho.",
          "Desgaste do carro: alguns grupos acrescentam um valor por quilômetro para o dono do carro, cobrindo pneus, óleo e manutenção. Se for usar, combine antes.",
          "Quem vai só em um trecho paga proporcionalmente aos quilômetros que percorreu.",
        ],
      },
      {
        heading: "O motorista paga também?",
        paragraphs: [
          "Depende do combinado. Em viagens entre amigos, o mais comum é dividir igualmente entre todos, incluindo o motorista. Em caronas do dia a dia, muitas vezes os passageiros dividem apenas o combustível e o motorista não paga a sua parte, como forma de compensar o uso do carro. O importante é deixar claro antes de sair.",
        ],
      },
      {
        heading: "Dividindo a conta do restaurante",
        paragraphs: [
          "Em restaurantes, a taxa de serviço (geralmente 10%) é opcional, mas costuma ser paga. Some a taxa ao total e divida pelo número de pessoas.",
          "Se o consumo foi muito diferente, a forma mais justa é cada um pagar o que consumiu, mais a sua parte da taxa de serviço e dos itens compartilhados, como entradas e bebidas de mesa. A calculadora de gorjeta faz essa divisão automaticamente.",
        ],
      },
      {
        heading: "Dicas para evitar confusão",
        list: [
          "Combine as regras antes de sair: quem paga o quê e como o motorista entra.",
          "Use um único pagador para o combustível e acerte tudo no fim, por Pix.",
          "Guarde os comprovantes de pedágio e estacionamento.",
          "Arredonde valores para facilitar, sempre a favor de quem pagou.",
        ],
      },
    ],
    faqs: [
      { question: "Como calcular o gasto de combustível de uma viagem?", answer: "Divida a distância total pelo consumo do carro em km/l e multiplique pelo preço do litro." },
      { question: "Pedágio entra na divisão da carona?", answer: "Normalmente sim. Pedágios e estacionamentos são somados ao combustível e divididos entre todos." },
      { question: "O motorista paga parte da gasolina?", answer: "Depende do combinado. Em viagens entre amigos é comum dividir por todos; em caronas do dia a dia, muitas vezes só os passageiros dividem." },
      { question: "A taxa de 10% do restaurante é obrigatória?", answer: "Não. A taxa de serviço é opcional, embora seja comum pagá-la quando o atendimento foi bom." },
    ],
  },
};
