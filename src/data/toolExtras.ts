// Conteúdo explicativo extra das ferramentas (exibido abaixo da ferramenta, em português).
// Foco: quando usar, exemplo prático e cuidados — texto próprio de cada ferramenta.
export interface ToolExtraSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}

export const TOOL_EXTRAS: Record<string, ToolExtraSection[]> = {
  "acumulador-horas": [
    { heading: "Para que serve o acumulador de horas", paragraphs: [
      "O acumulador soma vários períodos de trabalho, como entradas e saídas de cada dia, e compara o total com a jornada contratada. É útil para conferir o espelho de ponto, controlar banco de horas, calcular horas extras ou registrar horas trabalhadas em projetos de freelancer.",
    ] },
    { heading: "Exemplo prático", paragraphs: [
      "Uma pessoa com jornada de 8 horas diárias trabalhou 8h45, 9h10, 7h50, 8h30 e 9h00 na semana. O total é 43h15. Como a jornada semanal é de 40 horas, sobram 3h15 de horas extras ou de crédito no banco de horas.",
      "Para transformar 3h15 em número decimal, usado em planilhas e no cálculo de pagamento, divida os minutos por 60: 15 ÷ 60 = 0,25, ou seja, 3,25 horas. O conversor de horas decimais faz essa conta direto.",
    ] },
    { heading: "Cuidados ao conferir o ponto", list: [
      "Desconte o intervalo de almoço, que normalmente não conta como hora trabalhada.",
      "Verifique na convenção coletiva da sua categoria se há tolerância de minutos na entrada e na saída.",
      "Banco de horas precisa estar previsto em acordo; confira prazo de compensação.",
      "Guarde seus registros: eles ajudam a resolver divergências com o RH.",
    ] },
  ],
  "parcelamento-multas": [
    { heading: "Como funciona o parcelamento de multas de trânsito", paragraphs: [
      "Multas de trânsito podem ser parceladas no cartão de crédito por meio de empresas credenciadas pelos órgãos de trânsito, em plataformas indicadas pelo Detran do seu estado ou pela Senatran. O valor total costuma ter acréscimo de taxas e juros do parcelamento, por isso vale simular antes.",
      "Há também descontos para quem paga em dia: o pagamento até o vencimento costuma ter 20% de desconto, e quem adere ao Sistema de Notificação Eletrônica (SNE) e não recorre pode ter 40%, conforme as regras do Código de Trânsito Brasileiro.",
    ] },
    { heading: "Quando vale parcelar", list: [
      "Quando é preciso regularizar o veículo para licenciar ou transferir e não há dinheiro para pagar tudo de uma vez.",
      "Quando várias multas somadas pesariam demais no orçamento do mês.",
      "Compare o total parcelado com o valor à vista com desconto: muitas vezes o desconto do pagamento em dia compensa mais do que parcelar.",
    ] },
    { heading: "Cuidados", list: [
      "Use só os canais indicados pelo Detran ou pela Senatran; desconfie de links recebidos por mensagem.",
      "Confira o CET (custo total) do parcelamento antes de confirmar.",
      "Parcelar não suspende os pontos na CNH nem o direito de recorrer, mas pagar pode encerrar a discussão em alguns casos: informe-se antes.",
    ] },
  ],
  "taxas-maquininha": [
    { heading: "Para que serve a calculadora de taxas", paragraphs: [
      "Ela mostra quanto do valor de uma venda fica com a empresa da maquininha e quanto cai na sua conta, em cada modalidade: débito, crédito à vista e parcelado. Assim você sabe o custo real de cada venda e consegue definir preços que protegem a sua margem.",
    ] },
    { heading: "Exemplo prático", paragraphs: [
      "Uma venda de R$ 300 em 3 vezes com taxa de 6% resulta em R$ 282 líquidos: R$ 18 ficam com a maquininha. Se você quer receber os R$ 300 inteiros, o preço no parcelado deveria ser 300 ÷ 0,94 = R$ 319,15.",
    ] },
    { heading: "Dicas", list: [
      "Use as taxas do seu contrato atual; elas mudam conforme a empresa, o plano e o volume de vendas.",
      "Antecipação de recebíveis tem custo próprio; inclua na conta se você antecipa as vendas.",
      "O guia sobre taxas da maquininha explica como repassar o custo e negociar taxas menores.",
    ] },
  ],
  "gerador-recibo": [
    { heading: "Quando usar um recibo", paragraphs: [
      "O recibo é um documento simples que comprova que um pagamento foi feito. É muito usado por autônomos, prestadores de serviço, locadores de imóveis e em vendas entre pessoas físicas, como a venda de um móvel ou de um carro usado.",
    ] },
    { heading: "O que um recibo precisa ter", list: [
      "Nome completo e CPF ou CNPJ de quem recebeu e de quem pagou.",
      "Valor em números e por extenso, que dificulta alterações.",
      "Descrição do que foi pago: serviço, produto, aluguel de qual mês.",
      "Forma de pagamento (Pix, dinheiro, transferência).",
      "Data, local e assinatura de quem recebeu.",
    ] },
    { heading: "Recibo não substitui nota fiscal", paragraphs: [
      "Empresas e MEIs que vendem para outras empresas geralmente precisam emitir nota fiscal. O recibo serve como comprovante entre as partes, mas não tem efeito fiscal no lugar da nota. Para aluguel, o recibo mensal ajuda o inquilino a comprovar pagamentos e o locador a declarar a renda no imposto de renda.",
    ] },
  ],
  "calculadora-desconto": [
    { heading: "Quando usar a calculadora de desconto", paragraphs: [
      "Na hora de comprar, ela mostra o preço final e quanto você economiza. Para quem vende, ajuda a definir promoções sem vender abaixo do custo e a aplicar aumentos de preço com a porcentagem exata.",
    ] },
    { heading: "Exemplo prático", paragraphs: [
      "Um tênis de R$ 349,90 com 25% de desconto sai por 349,90 × 0,75 = R$ 262,43, uma economia de R$ 87,47. Se ainda houver 5% a mais no Pix, o desconto não vira 30%: 262,43 × 0,95 = R$ 249,31, um desconto total de cerca de 28,7%.",
    ] },
    { heading: "Dicas para não cair em armadilhas", list: [
      "Confira o histórico de preço do produto: alguns descontos partem de um preço inflado.",
      "Compare o preço final com o frete incluso.",
      "Descontos seguidos não se somam; use a calculadora para ver o efeito real.",
      "Lojistas: confira se a margem continua positiva depois do desconto e da taxa do cartão.",
    ] },
  ],
  "porcentagem-reversa": [
    { heading: "As quatro contas de porcentagem", list: [
      "X% de Y: quanto é 15% de 200? Resposta: 30.",
      "X é qual porcentagem de Y: 30 é quanto de 200? Resposta: 15%.",
      "Variação: de 200 para 230, quanto subiu? Resposta: 15%.",
      "Aumentar ou diminuir: 200 com 15% a mais? Resposta: 230.",
    ] },
    { heading: "O que é porcentagem reversa", paragraphs: [
      "É descobrir o valor original quando você só conhece o valor depois do aumento ou do desconto. Se um produto custa R$ 255 já com 15% de desconto, o preço original era 255 ÷ 0,85 = R$ 300, e não 255 + 15%.",
      "A mesma lógica vale para salários: se o novo salário é R$ 2.650 depois de um reajuste de 6%, o anterior era 2.650 ÷ 1,06 = R$ 2.500.",
    ] },
    { heading: "Onde essa conta aparece", list: [
      "Descobrir o preço sem imposto ou sem taxa de serviço.",
      "Calcular quanto valia um investimento antes do rendimento.",
      "Conferir se uma promoção é real comparando com o preço anterior.",
    ] },
  ],
  "horas-decimais": [
    { heading: "Por que converter horas em decimais", paragraphs: [
      "Planilhas, sistemas de folha de pagamento e cobranças por hora trabalham com números decimais. O problema é que uma hora tem 60 minutos, e não 100: 8h30 não é 8,30, e sim 8,5 horas.",
    ] },
    { heading: "A conta", paragraphs: [
      "Horas em decimal = horas + minutos ÷ 60. Exemplos: 7h15 = 7,25; 7h20 ≈ 7,33; 7h45 = 7,75.",
      "No caminho inverso, multiplique a parte decimal por 60: 6,4 horas = 6 horas + 0,4 × 60 = 6h24.",
    ] },
    { heading: "Exemplo no pagamento", paragraphs: [
      "Um freelancer cobra R$ 80 por hora e trabalhou 12h40 em um projeto. Em decimal, 12 + 40 ÷ 60 ≈ 12,67 horas. Valor: 12,67 × 80 ≈ R$ 1.013,33. Se tivesse multiplicado 12,40 × 80, cobraria R$ 992 e perderia mais de R$ 20.",
    ] },
  ],
  "organizador-listas": [
    { heading: "O que o organizador de listas faz", paragraphs: [
      "Ele recebe uma lista com um item por linha e permite remover itens repetidos, ordenar em ordem alfabética, inverter a ordem, numerar e limpar linhas vazias. Tudo acontece no navegador, sem enviar seus dados.",
    ] },
    { heading: "Usos comuns", list: [
      "Limpar listas de e-mails ou de contatos com duplicados antes de importar em outro sistema.",
      "Organizar listas de compras, de convidados ou de chamada em ordem alfabética.",
      "Numerar perguntas, tópicos de aula ou itens de um checklist.",
      "Preparar dados copiados de planilhas para colar em outro lugar.",
    ] },
    { heading: "Dicas", list: [
      "Itens com espaços extras ou letras maiúsculas diferentes podem não ser reconhecidos como duplicados; padronize antes, se necessário, com o formatador de texto.",
      "Para listas muito grandes, cole em partes se o navegador ficar lento.",
    ] },
  ],
  "velocidade-digitacao": [
    { heading: "Como a velocidade é medida", paragraphs: [
      "A velocidade de digitação é medida em palavras por minuto (PPM, ou WPM em inglês). Em muitos testes, uma \"palavra\" equivale a 5 caracteres, incluindo espaços, para que palavras longas e curtas sejam comparáveis. A precisão, que é a porcentagem de caracteres corretos, também conta.",
    ] },
    { heading: "Referências", list: [
      "Até 30 PPM: digitação iniciante, ainda olhando bastante para o teclado.",
      "De 40 a 50 PPM: média de quem usa computador no dia a dia.",
      "De 60 a 80 PPM: digitação rápida, comum em quem trabalha muito com texto.",
      "Acima de 90 PPM: nível muito avançado.",
    ] },
    { heading: "Como melhorar", list: [
      "Aprenda a posição correta dos dedos (as teclas F e J têm marcações para os indicadores).",
      "Priorize a precisão: velocidade vem com a prática, e corrigir erros custa tempo.",
      "Pratique 10 a 15 minutos por dia, de preferência sem olhar para o teclado.",
      "Mantenha postura confortável e pulsos apoiados para evitar dores.",
    ] },
  ],
  "conversor-moedas": [
    { heading: "Como usar o conversor", paragraphs: [
      "O conversor faz a conta entre o real e outras moedas usando uma cotação de referência, que você pode ajustar para a cotação do dia ou a cotação que o seu banco ou casa de câmbio está oferecendo.",
    ] },
    { heading: "Cotação comercial, turismo e cartão", list: [
      "Comercial: usada entre bancos e empresas; é a que aparece nos noticiários.",
      "Turismo: usada para compra de dinheiro em espécie; costuma ser mais alta que a comercial.",
      "Cartão de crédito no exterior: segue a cotação do dia da compra ou do pagamento, conforme o banco, mais o IOF.",
    ] },
    { heading: "Exemplo e cuidados", paragraphs: [
      "Para levar 500 dólares em uma viagem com o dólar turismo a R$ 5,70, você precisaria de cerca de R$ 2.850, sem contar o IOF e a taxa da casa de câmbio. Compare o custo total entre dinheiro em espécie, cartão pré-pago, cartão de crédito e contas globais antes de decidir.",
    ] },
  ],
  "formatador-texto": [
    { heading: "O que o formatador de texto faz", list: [
      "MAIÚSCULAS: transforma tudo em letras maiúsculas.",
      "minúsculas: o contrário, útil para padronizar listas e e-mails.",
      "Capitalizado: primeira letra de cada palavra em maiúscula, bom para nomes e títulos.",
      "Inverter texto e outras transformações rápidas.",
    ] },
    { heading: "Quando usar", paragraphs: [
      "É útil quando você copia um texto que veio todo em maiúsculas de um sistema antigo, quando precisa padronizar nomes em uma planilha ou quando escreveu um título e quer ajustar a capitalização sem redigitar.",
    ] },
    { heading: "Dicas", list: [
      "Nomes próprios com preposições, como \"Maria da Silva\", podem precisar de ajuste manual depois da capitalização.",
      "Para remover acentos antes de importar dados em sistemas antigos, use o removedor de acentos.",
      "Para contar caracteres e palavras do texto final, use o contador de caracteres.",
    ] },
  ],
  "dias-vida": [
    { heading: "Como a contagem é feita", paragraphs: [
      "A ferramenta calcula a diferença entre a data de nascimento e o momento atual e mostra o resultado em anos, meses, dias, horas e minutos. Os anos bissextos são considerados, por isso a conta é mais precisa do que multiplicar a idade por 365.",
    ] },
    { heading: "Marcos curiosos", list: [
      "10.000 dias: por volta dos 27 anos e 4 meses. Muita gente comemora essa data.",
      "20.000 dias: perto dos 54 anos e 9 meses.",
      "1 bilhão de segundos: por volta dos 31 anos e 8 meses.",
      "Meio milhão de horas: aos 57 anos, aproximadamente.",
    ] },
    { heading: "Outras ideias", paragraphs: [
      "Dá para usar a mesma lógica para calcular há quantos dias você está em um relacionamento, no emprego atual ou desde uma data importante. Para contar o tempo entre duas datas quaisquer, use a calculadora de diferença entre datas; para uma contagem ao vivo, o contador de tempo decorrido. O guia \"Quantos dias eu já vivi?\" traz exemplos por idade.",
    ] },
  ],
  "formatador-legendas": [
    { heading: "Por que as quebras de linha somem no Instagram", paragraphs: [
      "Quando você escreve uma legenda com parágrafos, o aplicativo muitas vezes junta tudo em um bloco só, principalmente se houver linhas em branco ou espaços no fim das linhas. O formatador insere um caractere invisível nas linhas vazias para que os parágrafos se mantenham.",
    ] },
    { heading: "Como usar", list: [
      "Escreva a legenda com os parágrafos como quer que apareçam.",
      "Cole no formatador e copie o resultado.",
      "Cole no Instagram, TikTok ou outra rede e publique.",
    ] },
    { heading: "Dicas de legenda", list: [
      "A primeira linha aparece antes do \"mais\": use-a como gancho.",
      "Parágrafos curtos são mais fáceis de ler no celular.",
      "Termine com uma chamada para ação, como uma pergunta ou um convite para salvar o post.",
      "Veja o guia de taxa de engajamento para entender quais interações mais ajudam o alcance.",
    ] },
  ],
  "divisor-carona": [
    { heading: "Como a divisão é calculada", paragraphs: [
      "O divisor soma combustível, pedágios e outros custos da viagem e divide pelo número de pessoas. O combustível é estimado pela distância, pelo consumo do carro e pelo preço do litro.",
    ] },
    { heading: "Exemplo", paragraphs: [
      "Viagem de 280 km ida e volta, carro que faz 11 km/l, gasolina a R$ 6,20 e R$ 38 de pedágio. Combustível: 280 ÷ 11 × 6,20 ≈ R$ 157,82. Total: R$ 195,82. Para 4 pessoas, cerca de R$ 48,96 cada.",
    ] },
    { heading: "Dicas para combinar", list: [
      "Decida antes se o motorista entra na divisão.",
      "Quem vai só em um trecho paga proporcionalmente aos quilômetros.",
      "Veja no guia de divisão de gastos de viagem como incluir estacionamento e restaurante.",
    ] },
  ],
  "sugestor-livros": [
    { heading: "Como funciona o sugestor", paragraphs: [
      "Você responde a quatro perguntas sobre o que gosta de ler, como gênero, ritmo e tamanho do livro, e a ferramenta sugere títulos que combinam com o seu perfil. É uma forma rápida de sair do bloqueio de \"não sei o que ler agora\".",
    ] },
    { heading: "Dicas para criar o hábito de leitura", list: [
      "Comece com livros curtos ou de um gênero que você já gosta.",
      "Leia um pouco todos os dias: 15 minutos antes de dormir já somam cerca de um livro por mês para muita gente.",
      "Tudo bem abandonar um livro que não está agradando.",
      "Alterne entre livros leves e mais densos.",
      "Bibliotecas públicas e aplicativos de empréstimo digital são ótimas formas de ler sem gastar.",
    ] },
    { heading: "Quanto tempo leva para ler um livro", paragraphs: [
      "Um leitor médio lê de 200 a 250 palavras por minuto. Um livro de 300 páginas tem cerca de 75 a 90 mil palavras, o que dá entre 5 e 7 horas de leitura. A calculadora de velocidade de leitura ajuda a estimar o tempo para textos e roteiros.",
    ] },
  ],
  "gerador-uuid": [
    { heading: "O que é um UUID", paragraphs: [
      "UUID (Universally Unique Identifier) é um identificador de 128 bits, escrito como 32 caracteres hexadecimais em cinco grupos, por exemplo 3f1c9a2e-8b4d-4c6a-9e2f-7a1b5c0d9e84. A versão 4, gerada por esta ferramenta, é baseada em números aleatórios.",
    ] },
    { heading: "Para que serve", list: [
      "Chaves primárias de bancos de dados, especialmente em sistemas distribuídos.",
      "Identificar arquivos, pedidos, sessões e eventos sem depender de um contador central.",
      "Gerar nomes únicos para arquivos enviados por usuários.",
      "Testes e dados de exemplo em desenvolvimento de software.",
    ] },
    { heading: "Pode repetir?", paragraphs: [
      "Na prática, não. Um UUID v4 tem 122 bits aleatórios, o que dá mais de 5 × 10³⁶ combinações. A chance de dois UUIDs gerados corretamente serem iguais é tão pequena que pode ser ignorada em qualquer aplicação comum. Os identificadores são gerados no seu navegador com o gerador de números aleatórios seguro do sistema.",
    ] },
  ],
  "taxa-engajamento": [
    { heading: "Como a taxa é calculada", paragraphs: [
      "Taxa de engajamento = interações (curtidas, comentários, salvamentos e compartilhamentos) ÷ seguidores × 100. Para posts e Reels que alcançam muitos não seguidores, também vale calcular sobre o alcance.",
    ] },
    { heading: "Exemplo", paragraphs: [
      "Um post com 520 curtidas, 34 comentários e 61 salvamentos em um perfil de 18 mil seguidores tem (520 + 34 + 61) ÷ 18.000 × 100 ≈ 3,4% de engajamento.",
    ] },
    { heading: "Dicas", list: [
      "Use a média de vários posts para avaliar o perfil.",
      "Compare formatos: carrossel, Reels e foto costumam ter resultados diferentes.",
      "O guia de taxa de engajamento explica as fórmulas e como melhorar o resultado.",
    ] },
  ],
  "conversor-cozinha": [
    { heading: "Por que converter medidas", paragraphs: [
      "Receitas brasileiras costumam usar xícaras e colheres, enquanto receitas estrangeiras e de confeitaria usam gramas, mililitros ou onças. Como cada ingrediente tem densidade diferente, uma xícara de farinha não pesa o mesmo que uma xícara de açúcar.",
    ] },
    { heading: "Referências úteis", list: [
      "1 xícara (240 ml) de farinha de trigo ≈ 120 g.",
      "1 xícara de açúcar refinado ≈ 180 a 200 g.",
      "1 xícara de manteiga ≈ 200 a 230 g.",
      "1 colher de sopa ≈ 15 ml; 1 colher de chá ≈ 5 ml.",
    ] },
    { heading: "Dicas para não errar", list: [
      "Para farinha, encha a xícara com uma colher e nivele com uma faca, sem apertar.",
      "Em confeitaria, a balança é mais precisa do que medidas em xícara.",
      "Para aumentar ou diminuir uma receita, use a regra de três com todos os ingredientes.",
    ] },
  ],
  "sorteador-equipes": [
    { heading: "Como o sorteio funciona", paragraphs: [
      "Você informa os nomes dos participantes e o número de times, e a ferramenta distribui as pessoas de forma aleatória. Com a opção de equilibrar, é possível separar os melhores jogadores para que fiquem em times diferentes, deixando o jogo mais disputado.",
    ] },
    { heading: "Usos comuns", list: [
      "Pelada de futebol, vôlei e basquete com os amigos.",
      "Grupos de trabalho na escola ou na faculdade.",
      "Gincanas, jogos de tabuleiro em equipe e dinâmicas de empresa.",
    ] },
    { heading: "Dicas para um sorteio justo", list: [
      "Faça o sorteio na frente de todos, compartilhando a tela.",
      "Se houver goleiros, sorteie-os separadamente para cada time ficar com um.",
      "Use o placar poliesportivo para marcar os pontos e o tempo do jogo.",
    ] },
  ],
  "gerador-senhas": [
    { heading: "O que faz uma senha forte", list: [
      "Ter pelo menos 12 caracteres, de preferência 16 ou mais.",
      "Misturar letras maiúsculas, minúsculas, números e símbolos.",
      "Não ter informações pessoais, como datas e nomes.",
      "Ser diferente para cada conta.",
    ] },
    { heading: "Segurança do gerador", paragraphs: [
      "As senhas são criadas no seu navegador com o gerador de números aleatórios criptograficamente seguro do sistema e não são enviadas nem guardadas pelo site.",
    ] },
    { heading: "Depois de gerar", list: [
      "Salve a senha em um gerenciador de senhas, em vez de anotar em papel ou no bloco de notas.",
      "Ative a verificação em duas etapas nas contas importantes.",
      "Veja o guia \"Como criar uma senha forte\" para mais dicas.",
    ] },
  ],
  "juros-compostos": [
    { heading: "Exemplo de simulação", paragraphs: [
      "Com R$ 1.000 iniciais, aporte de R$ 200 por mês e taxa de 0,85% ao mês por 10 anos, o saldo final fica perto de R$ 44.200, sendo R$ 25.000 depositados e cerca de R$ 19.200 vindos dos juros. Experimente mudar uma variável por vez para ver o efeito do prazo, da taxa e do aporte.",
    ] },
    { heading: "Cuidados ao interpretar", list: [
      "O resultado é bruto: desconte imposto de renda e taxas do investimento.",
      "Considere a inflação para saber o ganho real.",
      "Taxas passadas não garantem rendimento futuro.",
      "O guia sobre juros compostos explica a fórmula e a diferença em relação aos juros simples.",
    ] },
  ],
  "link-whatsapp": [
    { heading: "Por que usar um link do WhatsApp", paragraphs: [
      "O link abre a conversa com o seu número sem que o cliente precise salvar o contato, e pode trazer uma mensagem pronta. Isso reduz o atrito e aumenta a quantidade de pessoas que realmente entram em contato.",
    ] },
    { heading: "Onde colocar", list: [
      "Bio do Instagram e do TikTok.",
      "Site, perfil da empresa no Google e assinatura de e-mail.",
      "Material impresso, transformando o link em QR Code.",
    ] },
    { heading: "Dicas", list: [
      "Inclua o código do país (55) e o DDD.",
      "Crie mensagens diferentes para cada canal e descubra de onde vêm os clientes.",
      "Veja o guia completo sobre link do WhatsApp para exemplos de mensagens.",
    ] },
  ],
  "dividir-pdf": [
    { heading: "Quando dividir um PDF", list: [
      "Enviar só parte de um documento grande, como um capítulo ou a página de assinaturas.",
      "Separar vários documentos que foram escaneados juntos em um único arquivo.",
      "Reduzir o tamanho de cada envio quando um sistema limita o tamanho do anexo.",
    ] },
    { heading: "Como informar os intervalos", paragraphs: [
      "Você pode separar todas as páginas em arquivos individuais ou escolher intervalos, como 1-3, 4-7 e 8-12. Cada intervalo vira um PDF próprio. As páginas mantêm a qualidade original, porque o conteúdo não é recomprimido.",
    ] },
    { heading: "Privacidade", paragraphs: [
      "O arquivo é processado no seu navegador e não é enviado para servidores, o que é importante para contratos, extratos e documentos pessoais. Para juntar arquivos ou diminuir o tamanho, veja o guia de como juntar, dividir e comprimir PDF.",
    ] },
  ],
  "palpites-loteria": [
    { heading: "Como funcionam os palpites", paragraphs: [
      "A ferramenta sorteia números aleatórios dentro das regras de cada loteria, como a Mega-Sena (6 de 60), a Quina (5 de 80) e a Lotofácil (15 de 25). Os números não têm nenhuma chance maior de sair: servem apenas para quem prefere não escolher os próprios números.",
    ] },
    { heading: "As chances reais", list: [
      "Mega-Sena, aposta simples de 6 números: 1 chance em 50.063.860.",
      "Quina, aposta de 5 números: 1 chance em 24.040.016.",
      "Lotofácil, aposta de 15 números: 1 chance em 3.268.760.",
    ] },
    { heading: "Jogue com responsabilidade", paragraphs: [
      "Loteria é entretenimento, não investimento. Defina um valor que você pode gastar sem afetar contas e compromissos e não tente recuperar perdas aumentando as apostas. Se jogar estiver causando prejuízos ou ansiedade, procure ajuda especializada.",
    ] },
  ],
  "cabecalho-rodape-pdf": [
    { heading: "Para que serve", paragraphs: [
      "Adicionar cabeçalho e rodapé a um PDF é útil para identificar documentos com o nome da empresa, número de processo, título do trabalho, data ou um aviso como \"Confidencial\" em todas as páginas, sem precisar editar o arquivo original.",
    ] },
    { heading: "Exemplos de uso", list: [
      "Trabalhos acadêmicos: nome do aluno e da disciplina no rodapé.",
      "Documentos jurídicos: número do processo no cabeçalho.",
      "Propostas comerciais: nome da empresa e contato no rodapé.",
      "Materiais internos: aviso de uso restrito.",
    ] },
    { heading: "Dicas", list: [
      "Use textos curtos para não cobrir o conteúdo da página.",
      "Para numeração automática, use a ferramenta de numerar páginas.",
      "O processamento é feito no navegador, sem enviar o arquivo.",
    ] },
  ],
  "gerador-nicks": [
    { heading: "Como criar um bom nick", list: [
      "Seja curto e fácil de lembrar e de digitar.",
      "Evite números aleatórios demais, que dificultam ser encontrado.",
      "Combine com o estilo do jogo ou da rede social.",
      "Confira se o nome está disponível em todas as plataformas que você usa.",
    ] },
    { heading: "Como o gerador funciona", paragraphs: [
      "A ferramenta combina palavras, prefixos e sufixos em diferentes estilos, como épico, engraçado ou minimalista, para dar ideias. Gere várias opções, misture partes de que gostar e adapte para criar algo único.",
    ] },
    { heading: "Cuidados", list: [
      "Não use seu nome completo, data de nascimento ou cidade no nick público.",
      "Evite nomes que possam ser ofensivos ou que infrinjam marcas registradas.",
    ] },
  ],
  "placar-poliesportivo": [
    { heading: "Para que serve", paragraphs: [
      "O placar transforma o celular, tablet ou computador em um marcador de pontos com cronômetro, para jogos de futebol, vôlei, basquete, handebol, futevôlei e outros esportes. É prático em peladas, campeonatos amadores e aulas de educação física.",
    ] },
    { heading: "Dicas de uso", list: [
      "Coloque o aparelho em modo tela cheia para todos verem o placar.",
      "Defina o tempo de cada período antes de começar.",
      "Use o sorteador de equipes para montar os times de forma equilibrada.",
      "Em campeonatos, anote os resultados de cada jogo para não perder o histórico.",
    ] },
  ],
  "formatador-json": [
    { heading: "O que é JSON", paragraphs: [
      "JSON é o formato de texto mais usado para trocar dados entre sistemas, APIs e aplicativos. Ele organiza informações em pares de chave e valor, listas e objetos aninhados.",
    ] },
    { heading: "Para que formatar ou minificar", list: [
      "Formatar (indentar) deixa o JSON legível, o que ajuda a entender a estrutura e encontrar erros.",
      "Minificar remove espaços e quebras de linha, reduzindo o tamanho para envio e armazenamento.",
      "A ferramenta também aponta erros de sintaxe, como vírgula sobrando ou aspas faltando.",
    ] },
    { heading: "Erros comuns em JSON", list: [
      "Usar aspas simples em vez de aspas duplas.",
      "Deixar vírgula depois do último item de uma lista ou objeto.",
      "Colocar comentários, que não são permitidos no padrão JSON.",
      "Para transformar JSON em planilha, use o conversor de JSON para CSV.",
    ] },
  ],
  "gerador-qrcode": [
    { heading: "Usos mais comuns do QR Code", list: [
      "Link do cardápio, do site ou do Instagram.",
      "Link do WhatsApp com mensagem pronta.",
      "Rede Wi-Fi para visitantes.",
      "Avaliação no Google, formulários e pesquisas.",
    ] },
    { heading: "Dicas para imprimir", list: [
      "Use tamanho mínimo de cerca de 2 × 2 cm em cartões; em cartazes, quanto maior a distância de leitura, maior o código.",
      "Mantenha bom contraste: código escuro sobre fundo claro.",
      "Teste com mais de um celular antes de imprimir em quantidade.",
      "Use links curtos: quanto menos caracteres, mais simples e fácil de ler o código.",
    ] },
    { heading: "Segurança", paragraphs: [
      "QR Codes podem levar a qualquer link. Como usuário, confira o endereço que aparece antes de abrir, principalmente em códigos colados em locais públicos ou recebidos por mensagem.",
    ] },
  ],
  "descobridor-anagramas": [
    { heading: "O que são anagramas", paragraphs: [
      "Anagramas são palavras formadas pelas mesmas letras de outra, em ordem diferente, como \"amor\" e \"Roma\", ou \"Iracema\" e \"América\". O descobridor encontra palavras que podem ser formadas com as letras que você digitar.",
    ] },
    { heading: "Para que usar", list: [
      "Jogos de palavras, como palavras cruzadas, Scrabble e jogos de letras no celular.",
      "Criar nomes de marcas, personagens ou apelidos.",
      "Atividades de alfabetização e jogos educativos.",
    ] },
    { heading: "Dicas", list: [
      "Comece com letras comuns, como vogais e S, R, N e T, que geram mais palavras.",
      "Para contar letras e sílabas de palavras, use também o contador de sílabas e rimas.",
    ] },
  ],
  "codificador-base64": [
    { heading: "O que é Base64", paragraphs: [
      "Base64 é uma forma de representar dados binários, como imagens ou arquivos, usando apenas 64 caracteres de texto. É usado para enviar dados por meios que só aceitam texto, como e-mails, JSON e URLs de dados.",
    ] },
    { heading: "Usos comuns", list: [
      "Incorporar pequenas imagens direto no HTML ou CSS.",
      "Enviar arquivos em APIs que trabalham com JSON.",
      "Autenticação básica em requisições HTTP.",
    ] },
    { heading: "Importante", list: [
      "Base64 não é criptografia: qualquer pessoa consegue decodificar. Não use para proteger senhas ou dados sensíveis.",
      "O texto codificado fica cerca de 33% maior que o original.",
      "A ferramenta trata corretamente acentos e caracteres especiais (UTF-8).",
    ] },
  ],
  "contador-tempo-decorrido": [
    { heading: "Para que serve", paragraphs: [
      "O contador mostra, em tempo real, quanto tempo passou desde uma data ou quanto falta até ela, em anos, meses, dias, horas, minutos e segundos. Funciona como um relógio de contagem progressiva ou regressiva.",
    ] },
    { heading: "Ideias de uso", list: [
      "Tempo de namoro, de casamento ou de amizade.",
      "Dias sem fumar ou sem um hábito que você quer deixar.",
      "Contagem regressiva para viagens, formaturas, provas e casamentos.",
      "Tempo desde o início de um projeto ou de uma empresa.",
    ] },
    { heading: "Ferramentas relacionadas", paragraphs: [
      "Para uma diferença fixa entre duas datas, use a calculadora de diferença entre datas. Para saber quantos dias você já viveu, use o contador de dias de vida. Para ver os feriados do ano, use o calendário de feriados.",
    ] },
  ],
  "achatar-pdf": [
    { heading: "O que é achatar um PDF", paragraphs: [
      "Achatar (flatten) transforma campos de formulário preenchidos, anotações e assinaturas em parte fixa da página. Depois disso, o conteúdo não pode mais ser editado nos campos, e o documento aparece igual em qualquer leitor de PDF.",
    ] },
    { heading: "Quando usar", list: [
      "Depois de preencher um formulário que será enviado a uma empresa ou órgão público.",
      "Para evitar que alguém altere valores ou respostas.",
      "Quando um formulário aparece em branco ou com campos estranhos em outro programa.",
    ] },
    { heading: "Dica", paragraphs: [
      "Guarde uma cópia do arquivo original editável antes de achatar, caso precise corrigir algo depois. Para preencher o formulário, use a ferramenta de preencher formulário PDF.",
    ] },
  ],
  "girar-pdf": [
    { heading: "Quando girar páginas", list: [
      "Documentos escaneados de lado ou de cabeça para baixo.",
      "Tabelas e gráficos em formato paisagem no meio de um documento em retrato.",
      "Fotos de documentos convertidas em PDF com orientação errada.",
    ] },
    { heading: "Como funciona", paragraphs: [
      "Você escolhe a rotação de 90°, 180° ou 270° e as páginas que devem girar. A alteração muda a orientação da página sem recomprimir o conteúdo, então a qualidade se mantém. O processamento acontece no navegador.",
    ] },
    { heading: "Dica", paragraphs: [
      "Ao escanear documentos pelo celular, use o modo de digitalização do próprio aplicativo de câmera ou de notas: ele costuma corrigir a orientação e o enquadramento automaticamente.",
    ] },
  ],
  "spawn-timer": [
    { heading: "Para que serve o cronômetro de spawn", paragraphs: [
      "Em muitos jogos, itens, chefes e objetivos voltam a aparecer depois de um tempo fixo, o chamado respawn. Controlar esses tempos dá vantagem estratégica: você sabe quando se posicionar e quando o adversário pode ir atrás do objetivo.",
    ] },
    { heading: "Como usar", list: [
      "Crie um timer para cada objetivo, com o tempo de respawn do jogo.",
      "Inicie o timer assim que o objetivo for pego ou derrotado.",
      "Use os alertas para se preparar antes do tempo acabar.",
    ] },
    { heading: "Dica", paragraphs: [
      "Mantenha o cronômetro em uma segunda tela ou no celular para não precisar trocar de janela durante a partida. Para organizar os jogos que você quer zerar, use o backlog gamer.",
    ] },
  ],
  "numerar-paginas-pdf": [
    { heading: "Quando numerar páginas", list: [
      "Trabalhos acadêmicos, TCCs e relatórios.",
      "Documentos jurídicos e processos.",
      "Manuais, apostilas e propostas comerciais.",
    ] },
    { heading: "Opções", paragraphs: [
      "Você pode escolher a posição do número (topo ou rodapé, à esquerda, no centro ou à direita), o formato (\"1\", \"Página 1\" ou \"1 de 10\") e a página em que a numeração começa, útil para não numerar a capa.",
    ] },
    { heading: "Dicas", list: [
      "Em trabalhos acadêmicos, siga a norma exigida pela instituição.",
      "Para documentos jurídicos com numeração sequencial entre vários arquivos, veja a numeração Bates.",
      "O arquivo é processado no navegador, sem envio para servidores.",
    ] },
  ],
  "mapa-numerologico": [
    { heading: "Como o número do destino é calculado", paragraphs: [
      "Na numerologia, o número do destino é obtido somando todos os dígitos da data de nascimento até chegar a um único dígito. Exemplo: 14/07/1992 → 1 + 4 + 0 + 7 + 1 + 9 + 9 + 2 = 33 → 3 + 3 = 6. Algumas correntes mantêm os chamados números mestres (11, 22 e 33) sem reduzir.",
    ] },
    { heading: "Entretenimento, não ciência", paragraphs: [
      "A numerologia é uma tradição esotérica, sem comprovação científica. As descrições de cada número devem ser lidas como curiosidade e diversão, e não como orientação para decisões de vida, saúde ou dinheiro.",
    ] },
    { heading: "Outras curiosidades", paragraphs: [
      "Se você gosta do tema, também pode descobrir seu signo solar e testar a compatibilidade entre signos nas ferramentas de astrologia do site.",
    ] },
  ],
  "removedor-acentos": [
    { heading: "Quando remover acentos", list: [
      "Importar dados em sistemas antigos que não aceitam caracteres especiais.",
      "Criar nomes de arquivos, pastas e endereços de páginas (URLs).",
      "Padronizar listas para comparar nomes escritos com e sem acento.",
      "Preparar textos para códigos, logins e senhas que não aceitam acentos.",
    ] },
    { heading: "Como funciona", paragraphs: [
      "A ferramenta troca letras acentuadas pelas letras sem acento (á → a, ç → c, õ → o) e pode remover caracteres especiais. O texto não sai do seu navegador.",
    ] },
    { heading: "Cuidado", paragraphs: [
      "Em textos para leitura, mantenha os acentos: eles mudam o sentido de palavras, como \"está\" e \"esta\" ou \"avó\" e \"avô\". Remova acentos só quando o sistema exigir.",
    ] },
  ],
  "extrair-paginas-pdf": [
    { heading: "Quando extrair páginas", list: [
      "Enviar só a página de assinaturas de um contrato.",
      "Separar um boleto ou comprovante de um PDF com vários documentos.",
      "Montar uma apostila com partes de vários materiais.",
    ] },
    { heading: "Diferença para dividir PDF", paragraphs: [
      "Extrair cria um único PDF novo só com as páginas escolhidas, como 2, 5 e 9 a 12. Dividir separa o documento em vários arquivos. Para juntar o resultado com outros arquivos, use a ferramenta de juntar PDFs.",
    ] },
    { heading: "Privacidade", paragraphs: [
      "O processamento é feito no seu navegador: o documento original não é enviado para nenhum servidor.",
    ] },
  ],
  "codificador-url": [
    { heading: "O que é codificação de URL", paragraphs: [
      "Endereços da web só aceitam alguns caracteres. Espaços, acentos e símbolos como &, ? e # precisam ser convertidos em códigos com %, a chamada codificação percentual. Um espaço vira %20, e \"ç\" vira %C3%A7.",
    ] },
    { heading: "Quando usar", list: [
      "Montar links com parâmetros, como o link do WhatsApp com mensagem pronta.",
      "Passar textos em links de busca, formulários e campanhas com parâmetros UTM.",
      "Ler (decodificar) links compridos e cheios de % para entender o conteúdo.",
    ] },
    { heading: "Dica", paragraphs: [
      "Codifique apenas o valor dos parâmetros, e não o endereço inteiro, para não quebrar os caracteres que separam as partes do link, como : e /.",
    ] },
  ],
};
