import type { GuideContent } from "./guides";

// Guias sazonais (feriados do próximo ano e Black Friday)
export const GUIDES_EXTRA_5: Record<string, GuideContent> = {
  "feriados-2027": {
    slug: "feriados-2027",
    updated: "2026-11-09",
    intro: [
      "Quem planeja viagem, férias ou folga no trabalho costuma olhar o calendário do ano seguinte já em novembro. Em 2027, vários feriados caem em terça, quinta, sexta ou segunda-feira, o que abre espaço para bons feriados prolongados.",
      "Abaixo está a lista completa dos feriados nacionais e pontos facultativos de 2027, com o dia da semana de cada um, as datas que formam emendas e os feriados próprios do estado e da cidade de São Paulo.",
    ],
    sections: [
      {
        heading: "Feriados nacionais de 2027",
        table: {
          headers: ["Data", "Dia da semana", "Feriado"],
          rows: [
            ["1º de janeiro", "sexta-feira", "Confraternização Universal"],
            ["26 de março", "sexta-feira", "Sexta-feira Santa (Paixão de Cristo)"],
            ["21 de abril", "quarta-feira", "Tiradentes"],
            ["1º de maio", "sábado", "Dia do Trabalho"],
            ["7 de setembro", "terça-feira", "Independência do Brasil"],
            ["12 de outubro", "terça-feira", "Nossa Senhora Aparecida"],
            ["2 de novembro", "terça-feira", "Finados"],
            ["15 de novembro", "segunda-feira", "Proclamação da República"],
            ["20 de novembro", "sábado", "Dia Nacional de Zumbi e da Consciência Negra"],
            ["25 de dezembro", "sábado", "Natal"],
          ],
          caption: "Datas calculadas pelo calendário de feriados do CLICAresolve. A Páscoa de 2027 cai em 28 de março.",
        },
        after: [
          "O Dia da Consciência Negra virou feriado nacional pela Lei 14.759/2023 e vale desde 2024. Em 2027 ele cai num sábado, assim como o Dia do Trabalho e o Natal.",
        ],
      },
      {
        heading: "Pontos facultativos de 2027",
        paragraphs: [
          "Pontos facultativos não são feriados obrigatórios em todo o país. O governo federal dá folga aos seus servidores, mas empresas privadas decidem se liberam ou não os funcionários, a não ser que uma lei estadual ou municipal transforme a data em feriado.",
        ],
        table: {
          headers: ["Data", "Dia da semana", "Ponto facultativo"],
          rows: [
            ["8 de fevereiro", "segunda-feira", "Carnaval"],
            ["9 de fevereiro", "terça-feira", "Carnaval"],
            ["10 de fevereiro", "quarta-feira", "Quarta-feira de Cinzas (até 14h)"],
            ["27 de maio", "quinta-feira", "Corpus Christi"],
          ],
        },
      },
      {
        heading: "Feriados prolongados de 2027",
        paragraphs: [
          "Um feriado vira \"prolongado\" quando cai na sexta ou na segunda (três dias de folga) ou quando cai na terça ou na quinta e a empresa libera o dia do meio, a chamada emenda ou ponte.",
        ],
        list: [
          "1º de janeiro (sexta): o ano começa com fim de semana de 3 dias.",
          "Carnaval (8 e 9 de fevereiro): de sábado, dia 6, até a Quarta-feira de Cinzas.",
          "Sexta-feira Santa (26 de março): 3 dias seguidos, até o domingo de Páscoa.",
          "Corpus Christi (quinta, 27 de maio): com emenda na sexta, 4 dias de folga onde a data é feriado.",
          "Independência (terça, 7 de setembro): com emenda na segunda, 4 dias.",
          "Nossa Senhora Aparecida (terça, 12 de outubro): com emenda na segunda, 4 dias.",
          "Finados (terça, 2 de novembro): com emenda na segunda, 4 dias.",
          "Proclamação da República (segunda, 15 de novembro): fim de semana de 3 dias.",
        ],
        after: [
          "Na prática, 2027 tem 4 fins de semana prolongados garantidos e mais 4 possíveis emendas de terça ou quinta. Quem pode tirar a segunda ou a sexta de folga consegue até 4 dias de descanso gastando só 1 dia de férias.",
        ],
      },
      {
        heading: "Feriados de São Paulo em 2027",
        list: [
          "25 de janeiro (segunda-feira): aniversário da cidade de São Paulo, feriado municipal na capital. Forma um fim de semana de 3 dias.",
          "9 de julho (sexta-feira): Revolução Constitucionalista de 1932, feriado estadual em todo o estado de São Paulo. Também forma um fim de semana de 3 dias.",
          "Corpus Christi (27 de maio) é feriado municipal na capital paulista, por isso quem trabalha na cidade costuma folgar.",
        ],
        after: [
          "Outros estados e cidades têm datas próprias, como aniversários de cidades e padroeiros. Vale conferir o calendário oficial da prefeitura e do governo do seu estado.",
        ],
      },
      {
        heading: "Como aproveitar melhor os feriados",
        list: [
          "Combine férias com os feriados: tirar 4 dias úteis entre o Carnaval e um fim de semana, por exemplo, rende mais de uma semana de descanso.",
          "Reserve cedo: passagens e hospedagem para Carnaval, Semana Santa e feriados de novembro costumam subir de preço conforme a data se aproxima.",
          "Confira com a empresa: emendas e pontos facultativos dependem do empregador ou de acordo coletivo.",
          "Use o calendário de feriados do site para ver qualquer ano e a contagem regressiva para o próximo feriado.",
        ],
      },
    ],
    faqs: [
      { question: "Quantos feriados nacionais tem 2027?", answer: "São 10 feriados nacionais. Três deles (Dia do Trabalho, Consciência Negra e Natal) caem em sábado. Há ainda 4 pontos facultativos: as duas datas de Carnaval, a Quarta-feira de Cinzas e Corpus Christi." },
      { question: "Quando é o Carnaval de 2027?", answer: "O Carnaval de 2027 é em 8 e 9 de fevereiro (segunda e terça), e a Quarta-feira de Cinzas é em 10 de fevereiro." },
      { question: "Quando é a Páscoa de 2027?", answer: "A Páscoa de 2027 é no domingo, 28 de março. A Sexta-feira Santa é em 26 de março." },
      { question: "Corpus Christi é feriado em 2027?", answer: "É ponto facultativo nacional, em 27 de maio (quinta-feira). Em muitas cidades, como São Paulo, é feriado municipal." },
      { question: "O 20 de novembro é feriado nacional?", answer: "Sim. Desde 2024 o Dia da Consciência Negra é feriado nacional. Em 2027 ele cai num sábado." },
    ],
  },

  "black-friday-como-saber-se-o-desconto-e-real": {
    slug: "black-friday-como-saber-se-o-desconto-e-real",
    updated: "2026-11-09",
    intro: [
      "A Black Friday de 2026 é na sexta-feira, 27 de novembro, e muitas lojas começam as ofertas semanas antes. Junto com as promoções de verdade aparecem também os descontos de fachada: o preço sobe antes e \"cai\" de volta no dia, o famoso \"tudo pela metade do dobro\".",
      "Este guia mostra como conferir se um desconto é real, como calcular a porcentagem verdadeira de uma oferta e como se proteger de golpes na hora de comprar.",
    ],
    sections: [
      {
        heading: "1. Anote os preços antes da Black Friday",
        paragraphs: [
          "A forma mais segura de saber se o desconto existe é comparar com o preço que o produto tinha nas semanas anteriores. Faça uma lista do que você quer comprar e anote o preço de hoje, ou tire um print com a data.",
          "Sites comparadores de preço mostram o histórico de valores de muitos produtos. Se o gráfico mostra que o preço subiu em outubro e voltou ao normal em novembro, não é promoção.",
        ],
      },
      {
        heading: "2. Calcule a porcentagem real do desconto",
        paragraphs: [
          "Lojas costumam destacar o \"de\" e o \"por\". Para saber o desconto real, use a fórmula: desconto (%) = (preço antigo − preço novo) ÷ preço antigo × 100.",
          "Exemplo: um fone que custava R$ 250 nas semanas anteriores e está por R$ 199 tem desconto de (250 − 199) ÷ 250 × 100 = 20,4%. Se a loja anuncia \"de R$ 399 por R$ 199 (50% off)\", mas o preço real era R$ 250, o desconto de verdade é de cerca de 20%.",
        ],
        after: [
          "A calculadora de desconto do site faz essa conta e também mostra o preço final quando você já sabe a porcentagem.",
        ],
      },
      {
        heading: "3. Compare o preço por unidade",
        paragraphs: [
          "Em supermercado, produtos de higiene e ração, as ofertas muitas vezes vêm em kits ou embalagens maiores. Um kit com \"leve 3 pague 2\" só compensa se o preço por unidade, quilo ou litro ficar menor do que na embalagem comum.",
          "O comparador de preço por unidade mostra qual opção sai mais barata, mesmo com embalagens de tamanhos diferentes.",
        ],
      },
      {
        heading: "4. Atenção ao parcelamento, ao frete e ao Pix",
        list: [
          "Parcelado \"sem juros\" pode esconder um preço maior do que o valor à vista. Compare o total das parcelas com o preço no Pix ou no boleto.",
          "Some o frete. Um produto R$ 30 mais barato com frete de R$ 40 sai mais caro.",
          "Desconfie de descontos exagerados só no Pix em lojas que você não conhece: depois de pago, o Pix é muito difícil de recuperar.",
        ],
      },
      {
        heading: "5. Como evitar golpes na Black Friday",
        list: [
          "Digite o endereço da loja no navegador em vez de clicar em links recebidos por WhatsApp, SMS ou e-mail.",
          "Confira se o site tem CNPJ, endereço e canais de contato, e pesquise a reputação da loja antes de comprar.",
          "Desconfie de preços muito abaixo de todas as outras lojas e de perfis de redes sociais criados há pouco tempo.",
          "Prefira cartão de crédito virtual em lojas novas para você: ele pode ser cancelado depois da compra.",
        ],
      },
      {
        heading: "Seus direitos nas compras pela internet",
        paragraphs: [
          "Pelo Código de Defesa do Consumidor (artigo 49), compras feitas fora da loja física, como pela internet ou por telefone, podem ser canceladas em até 7 dias depois do recebimento do produto, com devolução do valor pago, inclusive o frete.",
          "A loja também é obrigada a cumprir o preço e as condições anunciadas. Guarde prints do anúncio, do carrinho e da confirmação do pedido: eles servem de prova se algo der errado. Em caso de problema, procure o Procon ou o site consumidor.gov.br.",
        ],
      },
    ],
    faqs: [
      { question: "Quando é a Black Friday de 2026?", answer: "A Black Friday de 2026 é na sexta-feira, 27 de novembro. Muitas lojas fazem ofertas durante todo o mês e a Cyber Monday é na segunda seguinte, 30 de novembro." },
      { question: "Como calcular a porcentagem de desconto?", answer: "Subtraia o preço novo do antigo, divida pelo preço antigo e multiplique por 100. De R$ 250 por R$ 199, o desconto é de 20,4%." },
      { question: "Como saber se o preço subiu antes da Black Friday?", answer: "Anote os preços com antecedência ou consulte o histórico em sites comparadores de preço. Se o valor subiu nas semanas anteriores, o desconto é menor do que parece." },
      { question: "Posso devolver um produto comprado na Black Friday?", answer: "Sim. Em compras pela internet, o Código de Defesa do Consumidor garante o direito de desistir em até 7 dias após o recebimento, com reembolso total." },
    ],
  },
};
