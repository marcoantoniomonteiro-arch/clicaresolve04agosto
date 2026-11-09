import type { GuideContent } from "./guides";

// Guias de casa, transporte e contas do dia a dia
export const GUIDES_EXTRA_3: Record<string, GuideContent> = {
  "alcool-ou-gasolina-qual-compensa": {
    slug: "alcool-ou-gasolina-qual-compensa",
    updated: "2026-11-09",
    intro: [
      "Quem tem carro flex se faz a mesma pergunta toda vez que para no posto: álcool ou gasolina? A resposta depende da relação entre os preços dos dois combustíveis e de quanto o seu carro rende com cada um.",
      "Neste guia você entende a famosa regra dos 70%, de onde ela vem, quando vale fazer uma conta mais precisa e o que mudou com a gasolina com mais etanol.",
    ],
    sections: [
      {
        heading: "A regra dos 70%",
        paragraphs: [
          "Divida o preço do litro do etanol pelo preço do litro da gasolina. Se o resultado for menor que 0,70, o etanol compensa. Se for maior, a gasolina compensa.",
          "Exemplo: etanol a R$ 4,19 e gasolina a R$ 6,29. 4,19 ÷ 6,29 = 0,666, ou 66,6%. Como está abaixo de 70%, vale abastecer com etanol.",
        ],
      },
      {
        heading: "Por que 70%",
        paragraphs: [
          "O etanol tem menos energia por litro do que a gasolina. Na prática, um carro flex costuma rodar cerca de 30% a menos com etanol. Se o carro faz 10 km/l com gasolina, faria algo perto de 7 km/l com etanol. Por isso, o etanol só vale a pena se custar até 70% do preço da gasolina: acima disso, você paga mais por quilômetro rodado.",
          "Com a mudança da gasolina comum para 32% de etanol anidro, a gasolina passou a ter um pouco menos de energia por litro, o que eleva levemente o ponto de equilíbrio, para cerca de 70,4%. A calculadora do site permite escolher entre os dois cenários.",
        ],
      },
      {
        heading: "A conta mais precisa: custo por quilômetro",
        paragraphs: [
          "Cada carro tem um rendimento diferente. Se você sabe quanto o seu carro faz com cada combustível, compare o custo por quilômetro: preço do litro ÷ km por litro.",
          "Exemplo: gasolina a R$ 6,29 com 11 km/l custa R$ 0,57 por km. Etanol a R$ 4,49 com 7,5 km/l custa R$ 0,60 por km. Mesmo com a relação de preços em 71%, nesse carro a gasolina sai um pouco mais barata.",
          "Para descobrir o rendimento real, encha o tanque, zere o hodômetro parcial, rode normalmente e, no próximo abastecimento completo, divida os quilômetros rodados pelos litros colocados.",
        ],
      },
      {
        heading: "Outros pontos a considerar",
        list: [
          "Na estrada, a diferença de rendimento entre os combustíveis pode mudar um pouco em relação à cidade.",
          "Em dias muito frios, motores flex mais antigos podem ter partida mais difícil com etanol.",
          "Alternar combustíveis não faz mal ao motor flex.",
          "O preço do etanol costuma ser mais competitivo nos estados produtores, como São Paulo, Goiás, Minas Gerais e Mato Grosso.",
        ],
      },
      {
        heading: "Viajando com amigos",
        paragraphs: [
          "Se a viagem for dividida, o guia de como dividir gastos de viagem mostra como calcular o combustível por pessoa, incluindo pedágios e estacionamento.",
        ],
      },
    ],
    faqs: [
      { question: "Quando o álcool compensa mais que a gasolina?", answer: "Quando o preço do etanol for menor que 70% do preço da gasolina. Divida um pelo outro: abaixo de 0,70, abasteça com etanol." },
      { question: "Por que a regra é de 70%?", answer: "Porque, em média, os carros flex rodam cerca de 30% menos com etanol do que com gasolina." },
      { question: "A regra vale para todos os carros?", answer: "É uma média. Para precisão, compare o custo por quilômetro usando o rendimento real do seu carro com cada combustível." },
      { question: "Misturar álcool e gasolina no tanque faz mal?", answer: "Não para carros flex: eles são projetados para funcionar com qualquer proporção dos dois." },
    ],
  },

  "consumo-de-energia-dos-eletrodomesticos": {
    slug: "consumo-de-energia-dos-eletrodomesticos",
    updated: "2026-11-09",
    intro: [
      "A conta de luz chega com um total, mas não diz quanto cada aparelho custou. Saber calcular o consumo dos eletrodomésticos ajuda a descobrir os vilões da conta e a decidir onde vale economizar ou trocar um aparelho antigo.",
      "A conta é simples e só precisa de três informações: a potência do aparelho, quanto tempo ele fica ligado e o preço do kWh na sua cidade.",
    ],
    sections: [
      {
        heading: "Watts, kWh e a tarifa",
        paragraphs: [
          "A potência, em watts (W), aparece na etiqueta ou no manual do aparelho. A energia consumida é medida em quilowatt-hora (kWh), que é a unidade cobrada pela distribuidora. Um aparelho de 1.000 W ligado por uma hora consome 1 kWh.",
          "Consumo mensal (kWh) = potência (W) × horas de uso por dia × dias de uso no mês ÷ 1.000.",
          "Custo mensal = consumo em kWh × tarifa. A tarifa por kWh, com impostos, aparece na sua conta de luz e muda conforme a distribuidora e a bandeira tarifária.",
        ],
      },
      {
        heading: "Exemplos",
        table: {
          caption: "Estimativas com tarifa de R$ 0,90 por kWh. Potências e tempos são exemplos; confira os dados do seu aparelho.",
          headers: ["Aparelho", "Potência", "Uso", "kWh/mês", "Custo/mês"],
          rows: [
            ["Chuveiro elétrico", "5.500 W", "40 min/dia", "110", "R$ 99,00"],
            ["Ar-condicionado 12.000 BTUs (inverter)", "≈ 1.000 W médios", "8 h/dia", "240", "R$ 216,00"],
            ["Geladeira frost free", "selo: ≈ 40 kWh/mês", "24 h", "40", "R$ 36,00"],
            ["TV LED 50\"", "100 W", "5 h/dia", "15", "R$ 13,50"],
            ["Ferro de passar", "1.200 W", "3 h/semana", "≈ 15", "R$ 13,50"],
            ["Lâmpada LED 9 W", "9 W", "6 h/dia", "1,6", "R$ 1,46"],
          ],
        },
        after: [
          "Aparelhos que esquentam ou esfriam, como chuveiro, ar-condicionado, aquecedor, secadora e forno elétrico, costumam ser os que mais pesam. Já lâmpadas LED e carregadores pesam pouco.",
        ],
      },
      {
        heading: "Geladeira e ar-condicionado: use o selo Procel",
        paragraphs: [
          "Aparelhos com motor e compressor não funcionam na potência máxima o tempo todo. Por isso, para geladeiras e ar-condicionado, o valor mais confiável é o consumo mensal em kWh informado na etiqueta do Inmetro/Procel, e não a potência multiplicada por 24 horas.",
        ],
      },
      {
        heading: "Dicas para economizar",
        list: [
          "Reduza o tempo de banho e use o chuveiro na posição verão sempre que possível.",
          "Mantenha a borracha da porta da geladeira em bom estado e não coloque comida quente dentro.",
          "No ar-condicionado, 23 °C a 24 °C costuma ser uma temperatura confortável e mais econômica; limpe os filtros com frequência.",
          "Troque lâmpadas antigas por LED.",
          "Junte roupas para passar de uma vez e use a máquina de lavar com carga completa.",
          "Desligue aparelhos em stand-by que ficam o dia todo na tomada.",
          "Para quem gasta muito, a energia solar por assinatura pode reduzir a conta sem precisar instalar placas.",
        ],
      },
    ],
    faqs: [
      { question: "Como calcular o consumo de um aparelho?", answer: "Multiplique a potência em watts pelas horas de uso por dia e pelos dias do mês, e divida por 1.000 para ter o consumo em kWh." },
      { question: "Quanto custa 1 kWh?", answer: "Depende da distribuidora, dos impostos e da bandeira tarifária. O valor com impostos aparece na sua conta de luz." },
      { question: "Qual eletrodoméstico gasta mais energia?", answer: "Normalmente os que aquecem ou resfriam: chuveiro elétrico, ar-condicionado, aquecedor, secadora e forno elétrico." },
      { question: "Aparelho em stand-by gasta energia?", answer: "Sim, pouco por aparelho, mas vários ligados o mês inteiro somam alguns kWh." },
    ],
  },

  "quanta-tinta-preciso-para-pintar": {
    slug: "quanta-tinta-preciso-para-pintar",
    updated: "2026-11-09",
    intro: [
      "Comprar tinta de menos faz a pintura parar no meio; comprar demais desperdiça dinheiro. A quantidade certa depende de três coisas: a área a ser pintada, o rendimento da tinta e o número de demãos.",
      "Este guia mostra a conta passo a passo, com exemplo de um quarto inteiro.",
    ],
    sections: [
      {
        heading: "1. Calcule a área das paredes",
        paragraphs: [
          "Área de uma parede = largura × altura. Para um cômodo retangular, uma forma rápida é: perímetro (soma das larguras de todas as paredes) × pé-direito.",
          "Exemplo: quarto de 3 m × 4 m com pé-direito de 2,60 m. Perímetro = 3 + 4 + 3 + 4 = 14 m. Área das paredes = 14 × 2,60 = 36,4 m².",
        ],
      },
      {
        heading: "2. Desconte portas e janelas",
        paragraphs: [
          "Uma porta comum tem cerca de 0,80 m × 2,10 m = 1,68 m². Uma janela de 1,20 m × 1,00 m tem 1,2 m². No exemplo, com uma porta e uma janela: 36,4 − 1,68 − 1,2 ≈ 33,5 m².",
          "Se for pintar o teto, some a área dele: 3 × 4 = 12 m². Como o teto costuma levar uma tinta diferente, faça a conta separada.",
        ],
      },
      {
        heading: "3. Multiplique pelas demãos",
        paragraphs: [
          "A maioria das pinturas precisa de 2 demãos; cores escuras, troca de cor forte ou paredes novas podem precisar de 3. No exemplo, 33,5 m² × 2 demãos = 67 m² a cobrir.",
        ],
      },
      {
        heading: "4. Divida pelo rendimento",
        paragraphs: [
          "O rendimento vem na embalagem, em m² por litro ou por lata, por demão. Tintas acrílicas costumam render algo entre 8 e 12 m² por litro por demão, dependendo da qualidade e da diluição.",
          "Com rendimento de 10 m² por litro: 67 ÷ 10 = 6,7 litros. Um galão de 3,6 litros não basta; dois galões (7,2 litros) atendem com pequena sobra.",
        ],
        table: {
          caption: "Embalagens mais comuns no Brasil.",
          headers: ["Embalagem", "Volume", "Cobre aproximadamente (10 m²/l, 1 demão)"],
          rows: [
            ["Quarto (quartinho)", "0,9 litro", "9 m²"],
            ["Galão", "3,6 litros", "36 m²"],
            ["Lata", "18 litros", "180 m²"],
          ],
        },
      },
      {
        heading: "Dicas para a pintura render mais",
        list: [
          "Paredes novas, com reboco ou massa corrida, precisam de selador ou fundo preparador; sem ele, a tinta é absorvida e o consumo sobe.",
          "Respeite a diluição indicada pelo fabricante: diluir demais reduz a cobertura e pode exigir mais demãos.",
          "Compre toda a tinta de uma vez, do mesmo lote, para evitar diferença de tom.",
          "Acrescente de 5% a 10% de margem para retoques.",
          "Para medir a área do cômodo, use a calculadora de metros quadrados; para a tinta, a calculadora de tinta faz toda a conta, incluindo portas e janelas.",
        ],
      },
    ],
    faqs: [
      { question: "Quantos litros de tinta para um quarto?", answer: "Um quarto de 3 × 4 m com pé-direito de 2,60 m tem cerca de 33 m² de paredes. Com duas demãos e rendimento de 10 m²/l, são aproximadamente 7 litros, ou dois galões." },
      { question: "Um galão de tinta pinta quantos metros?", answer: "Um galão de 3,6 litros cobre cerca de 30 a 40 m² por demão, dependendo do rendimento da tinta." },
      { question: "Quantas demãos de tinta são necessárias?", answer: "Normalmente duas. Cores escuras, mudança de cor muito diferente ou paredes novas podem precisar de três." },
      { question: "Preciso descontar portas e janelas?", answer: "Sim, para uma conta mais precisa. Se estiver em dúvida, mantenha a área delas como margem de segurança." },
    ],
  },

  "como-calcular-porcentagem": {
    slug: "como-calcular-porcentagem",
    updated: "2026-11-09",
    intro: [
      "Porcentagem aparece em todo lugar: descontos, aumentos de preço, rendimentos, reajustes de salário e notas. Apesar disso, muita gente se confunde na hora de fazer a conta, principalmente quando precisa descobrir o valor original antes de um desconto ou aumento.",
      "Neste guia você aprende as quatro contas de porcentagem mais usadas, com exemplos do dia a dia.",
    ],
    sections: [
      {
        heading: "1. Quanto é X% de um valor",
        paragraphs: [
          "Multiplique o valor pela porcentagem e divida por 100. 15% de R$ 80 = 80 × 15 ÷ 100 = R$ 12.",
          "Atalho: para 10%, basta \"andar\" a vírgula uma casa para a esquerda (10% de 80 = 8). Para 5%, é a metade de 10%. Para 1%, duas casas.",
        ],
      },
      {
        heading: "2. Que porcentagem um valor representa",
        paragraphs: [
          "Divida a parte pelo total e multiplique por 100. Se você economizou R$ 30 em uma compra de R$ 120: 30 ÷ 120 × 100 = 25%.",
        ],
      },
      {
        heading: "3. Aumento e desconto",
        paragraphs: [
          "Para aplicar um desconto, multiplique por (1 − porcentagem). Produto de R$ 250 com 20% de desconto: 250 × 0,80 = R$ 200.",
          "Para aplicar um aumento, multiplique por (1 + porcentagem). Aluguel de R$ 1.500 com reajuste de 6%: 1.500 × 1,06 = R$ 1.590.",
          "Atenção: descontos seguidos não se somam. 20% de desconto e depois mais 10% dão 28% no total (0,80 × 0,90 = 0,72), e não 30%.",
        ],
      },
      {
        heading: "4. Variação percentual entre dois valores",
        paragraphs: [
          "Variação = (valor novo − valor antigo) ÷ valor antigo × 100. Se a gasolina foi de R$ 5,80 para R$ 6,29: (6,29 − 5,80) ÷ 5,80 × 100 ≈ 8,4% de aumento.",
          "Uma armadilha comum: um aumento de 50% seguido de uma queda de 50% não volta ao valor inicial. R$ 100 + 50% = R$ 150; R$ 150 − 50% = R$ 75.",
        ],
      },
      {
        heading: "Porcentagem reversa: descobrindo o valor original",
        paragraphs: [
          "Se um produto custa R$ 180 já com 10% de desconto, o preço original não é R$ 198. O certo é dividir: 180 ÷ 0,90 = R$ 200.",
          "Da mesma forma, se um salário de R$ 3.180 já tem um aumento de 6%, o valor anterior era 3.180 ÷ 1,06 = R$ 3.000.",
          "Essa é a conta que mais gera erro e é a especialidade da calculadora de porcentagem reversa do site. Para descontos em compras, a calculadora de desconto mostra o preço final e a economia.",
        ],
      },
    ],
    faqs: [
      { question: "Como calcular porcentagem de um valor?", answer: "Multiplique o valor pela porcentagem e divida por 100. Exemplo: 15% de 80 = 80 × 15 ÷ 100 = 12." },
      { question: "Como calcular o desconto de um produto?", answer: "Multiplique o preço por (1 − desconto). Com 20% de desconto, multiplique por 0,80." },
      { question: "Como descobrir o valor antes do desconto?", answer: "Divida o preço com desconto por (1 − desconto). Um produto de R$ 180 com 10% de desconto custava R$ 200." },
      { question: "Dois descontos seguidos de 10% dão 20%?", answer: "Não. Dão 19%, porque o segundo desconto incide sobre o valor já reduzido (0,90 × 0,90 = 0,81)." },
    ],
  },

  "regra-de-tres-simples-e-inversa": {
    slug: "regra-de-tres-simples-e-inversa",
    updated: "2026-11-09",
    intro: [
      "A regra de três é uma das contas mais úteis da matemática do dia a dia. Ela resolve qualquer problema em que três valores são conhecidos e se quer descobrir o quarto, desde ajustar uma receita até calcular o consumo do carro ou o tempo de uma tarefa.",
      "O segredo é identificar se as grandezas são diretamente ou inversamente proporcionais.",
    ],
    sections: [
      {
        heading: "Regra de três direta",
        paragraphs: [
          "As grandezas são diretamente proporcionais quando, se uma aumenta, a outra aumenta na mesma proporção. Exemplo: se 3 kg de carne servem 10 pessoas, quantos quilos servem 25 pessoas?",
          "Monte a proporção: 3 está para 10 assim como X está para 25. Multiplique cruzado: 10 × X = 3 × 25, então X = 75 ÷ 10 = 7,5 kg.",
        ],
      },
      {
        heading: "Regra de três inversa",
        paragraphs: [
          "As grandezas são inversamente proporcionais quando, se uma aumenta, a outra diminui. Exemplo: 4 pintores fazem um serviço em 6 dias. Em quantos dias 8 pintores fazem o mesmo serviço?",
          "Mais pintores significa menos dias. Nesse caso, multiplique em linha: 4 × 6 = 8 × X, então X = 24 ÷ 8 = 3 dias.",
        ],
      },
      {
        heading: "Como saber se é direta ou inversa",
        list: [
          "Pergunte: se eu dobrar um valor, o outro dobra ou cai pela metade?",
          "Dobra: direta. Exemplos: quantidade e preço, distância e combustível, ingredientes e porções.",
          "Cai pela metade: inversa. Exemplos: velocidade e tempo de viagem, número de trabalhadores e prazo, vazão da torneira e tempo para encher.",
        ],
      },
      {
        heading: "Mais exemplos do dia a dia",
        list: [
          "Receita: um bolo leva 2 xícaras de farinha para 8 fatias. Para 12 fatias: 2 × 12 ÷ 8 = 3 xícaras (direta).",
          "Viagem: a 80 km/h a viagem leva 3 horas. A 100 km/h: 80 × 3 ÷ 100 = 2,4 horas, ou 2 h 24 min (inversa).",
          "Porcentagem: se 45 questões certas em 60 são quantos por cento? 45 × 100 ÷ 60 = 75% (direta).",
          "Câmbio: se 1 dólar vale R$ 5,40, quanto valem 250 dólares? 250 × 5,40 = R$ 1.350 (direta).",
        ],
      },
      {
        heading: "Regra de três composta",
        paragraphs: [
          "Quando há mais de duas grandezas, resolva comparando cada uma com a grandeza procurada, separadamente, e multiplique as razões. Exemplo: 5 máquinas produzem 400 peças em 8 horas. Quantas peças 3 máquinas produzem em 10 horas? Máquinas (direta): 400 × 3 ÷ 5 = 240. Horas (direta): 240 × 10 ÷ 8 = 300 peças.",
          "A calculadora de regra de três do site resolve os casos direto e inverso e mostra a conta montada, o que ajuda também a conferir exercícios escolares.",
        ],
      },
    ],
    faqs: [
      { question: "Como fazer regra de três?", answer: "Monte a proporção com os três valores conhecidos e o desconhecido. Na direta, multiplique cruzado; na inversa, multiplique em linha." },
      { question: "Como saber se a regra de três é inversa?", answer: "Se ao aumentar uma grandeza a outra diminui, como velocidade e tempo, as grandezas são inversamente proporcionais." },
      { question: "Regra de três serve para porcentagem?", answer: "Sim. Porcentagem é uma regra de três direta em que o total corresponde a 100%." },
      { question: "O que é regra de três composta?", answer: "É quando há três ou mais grandezas envolvidas; resolve-se comparando cada grandeza com a procurada." },
    ],
  },

  "quanto-ganho-por-hora": {
    slug: "quanto-ganho-por-hora",
    updated: "2026-11-09",
    intro: [
      "Saber quanto vale a sua hora de trabalho ajuda a conferir horas extras, comparar propostas de emprego e, para autônomos, definir quanto cobrar por um serviço.",
      "Veja como transformar o salário mensal em valor por hora e quais cuidados ter no cálculo.",
    ],
    sections: [
      {
        heading: "Valor da hora para quem é CLT",
        paragraphs: [
          "Para jornada de 44 horas semanais, usa-se o divisor 220 horas por mês, previsto na prática trabalhista (ele já considera o descanso semanal remunerado). Para 40 horas semanais, o divisor é 200.",
          "Valor da hora = salário mensal ÷ divisor. Um salário de R$ 3.300 com jornada de 44 horas: 3.300 ÷ 220 = R$ 15,00 por hora.",
        ],
        table: {
          headers: ["Jornada semanal", "Divisor mensal"],
          rows: [
            ["44 horas", "220"],
            ["40 horas", "200"],
            ["36 horas", "180"],
            ["30 horas", "150"],
          ],
        },
      },
      {
        heading: "Hora extra",
        paragraphs: [
          "A Constituição garante adicional mínimo de 50% sobre a hora normal, e muitos acordos e convenções coletivas preveem percentuais maiores, principalmente aos domingos e feriados (frequentemente 100%).",
          "No exemplo acima: R$ 15 × 1,5 = R$ 22,50 por hora extra. Dez horas extras no mês somam R$ 225, que ainda refletem em férias, 13º e FGTS.",
          "Para somar as horas trabalhadas e comparar com a jornada, use o acumulador de horas. Para converter horas e minutos em decimal (8h30 = 8,5), use o conversor de horas decimais.",
        ],
      },
      {
        heading: "Quanto cobrar por hora como autônomo",
        paragraphs: [
          "Para quem trabalha por conta própria, dividir a renda desejada pelas horas do mês dá um valor baixo demais, porque o autônomo paga custos que o empregador pagaria e não trabalha todas as horas do mês em projetos pagos.",
          "Uma conta mais realista: (renda mensal desejada + custos do negócio + impostos e INSS + reserva para férias e 13º) ÷ horas efetivamente faturáveis por mês.",
          "Exemplo: quer receber R$ 5.000 por mês, tem R$ 800 de custos e quer reservar 25% para impostos, previdência, férias e imprevistos. (5.000 + 800) ÷ 0,75 ≈ R$ 7.733. Se fatura 100 horas por mês (o resto vai para administração, prospecção e deslocamentos), a hora deve custar cerca de R$ 77.",
        ],
      },
      {
        heading: "Cuidados",
        list: [
          "O salário bruto não é o que cai na conta: INSS e imposto de renda são descontados.",
          "Benefícios como vale-refeição, plano de saúde e FGTS fazem parte da remuneração total e devem entrar na comparação entre propostas.",
          "Regras específicas da sua categoria (convenção coletiva) podem mudar divisores e adicionais.",
        ],
      },
    ],
    faqs: [
      { question: "Como calcular o salário por hora?", answer: "Divida o salário mensal pelo divisor da jornada: 220 para 44 horas semanais ou 200 para 40 horas semanais." },
      { question: "Quanto vale a hora extra?", answer: "No mínimo a hora normal mais 50%. Acordos coletivos podem prever percentuais maiores, como 100% em domingos e feriados." },
      { question: "Por que o divisor é 220 e não 176?", answer: "Porque o divisor de 220 inclui as horas do descanso semanal remunerado, que também são pagas." },
      { question: "Como um autônomo define o valor da hora?", answer: "Somando renda desejada, custos e reservas para impostos e férias, e dividindo pelas horas que de fato consegue faturar no mês." },
    ],
  },
};
