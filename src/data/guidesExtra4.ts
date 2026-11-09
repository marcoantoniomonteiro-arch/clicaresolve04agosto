import type { GuideContent } from "./guides";

// Guias de tecnologia, estudos, pets e redes sociais
export const GUIDES_EXTRA_4: Record<string, GuideContent> = {
  "como-juntar-dividir-e-comprimir-pdf": {
    slug: "como-juntar-dividir-e-comprimir-pdf",
    updated: "2026-11-09",
    intro: [
      "Juntar documentos para uma inscrição, separar só as páginas que interessam de um contrato ou diminuir um arquivo que não passa no limite do e-mail: tarefas com PDF aparecem a toda hora, e muitos sites cobram por elas ou pedem cadastro.",
      "As ferramentas de PDF do CLICAresolve funcionam direto no navegador, sem instalar nada. Este guia mostra como fazer cada tarefa e dá dicas para obter o melhor resultado.",
    ],
    sections: [
      {
        heading: "Seus arquivos não saem do seu aparelho",
        paragraphs: [
          "As ferramentas de PDF do site processam os arquivos no próprio navegador, usando a capacidade do seu computador ou celular. Os documentos não são enviados para um servidor, o que é importante quando se trata de RG, comprovantes, contratos e exames.",
        ],
      },
      {
        heading: "Como juntar vários PDFs em um só",
        list: [
          "Abra a ferramenta Juntar PDFs e selecione os arquivos (no celular, pelo gerenciador de arquivos).",
          "Arraste para colocar os documentos na ordem certa: por exemplo, identidade, comprovante de residência e diploma.",
          "Clique em juntar e baixe o arquivo final.",
        ],
        after: [
          "Dica: dê nomes claros aos arquivos antes, como \"01-rg.pdf\" e \"02-comprovante.pdf\". Assim fica mais fácil conferir a ordem.",
        ],
      },
      {
        heading: "Como dividir um PDF ou extrair páginas",
        paragraphs: [
          "Para separar todas as páginas em arquivos individuais ou em intervalos (por exemplo, 1-3 e 4-10), use a ferramenta Dividir PDF.",
          "Se você quer só algumas páginas de um documento grande, como a página de assinaturas de um contrato, a ferramenta Extrair Páginas cria um PDF novo apenas com as páginas escolhidas.",
        ],
      },
      {
        heading: "Como diminuir o tamanho de um PDF",
        paragraphs: [
          "Muitos portais de inscrição e e-mails limitam anexos a poucos megabytes. A ferramenta Comprimir PDF otimiza a estrutura interna do arquivo para reduzir o tamanho.",
          "O quanto o arquivo diminui depende do conteúdo. PDFs com imagens grandes, como documentos escaneados em alta resolução, costumam diminuir mais. PDFs só de texto já são leves e mudam pouco.",
        ],
        list: [
          "Se o PDF é uma digitalização, escanear em 150 a 200 dpi e em tons de cinza já gera arquivos bem menores e legíveis.",
          "Fotos de documentos tiradas no celular podem ser comprimidas antes, com o compressor de imagem, e depois convertidas em PDF com a ferramenta Imagem para PDF.",
          "Se mesmo assim o arquivo ficar grande, divida-o em partes.",
        ],
      },
      {
        heading: "Outras tarefas úteis",
        list: [
          "Girar PDF: corrige páginas escaneadas de lado ou de cabeça para baixo.",
          "Numerar páginas: adiciona numeração automática, útil em trabalhos e processos.",
          "Assinar PDF: insere sua assinatura desenhada, digitada ou em imagem, sem imprimir.",
          "OCR de PDF: transforma um documento escaneado em texto que pode ser copiado.",
        ],
      },
    ],
    faqs: [
      { question: "Como juntar PDFs de graça?", answer: "Use a ferramenta Juntar PDFs: selecione os arquivos, organize a ordem e baixe o PDF único, sem cadastro." },
      { question: "Meus documentos ficam salvos no site?", answer: "Não. O processamento acontece no seu navegador e os arquivos não são enviados para servidores." },
      { question: "Como deixar um PDF menor que 2 MB?", answer: "Comprima o arquivo; se for uma digitalização, escaneie em resolução menor (150 a 200 dpi) ou divida o documento em partes." },
      { question: "Funciona no celular?", answer: "Sim, as ferramentas funcionam no navegador do celular e do computador." },
    ],
  },

  "como-abrir-foto-heic-do-iphone": {
    slug: "como-abrir-foto-heic-do-iphone",
    updated: "2026-11-09",
    intro: [
      "Você passou as fotos do iPhone para o computador e elas não abrem, ou um site não aceita o arquivo? Provavelmente as fotos estão no formato HEIC, padrão dos iPhones desde o iOS 11.",
      "Neste guia você entende o que é o HEIC, por que ele dá problema fora do ecossistema da Apple e como converter para JPG ou PDF.",
    ],
    sections: [
      {
        heading: "O que é o formato HEIC",
        paragraphs: [
          "HEIC é a versão usada pela Apple do formato HEIF (High Efficiency Image File). Ele guarda fotos com qualidade parecida à do JPG ocupando aproximadamente metade do espaço, o que economiza armazenamento no celular e na nuvem.",
          "O problema é a compatibilidade: versões antigas do Windows, alguns programas, sites de órgãos públicos e sistemas de inscrição aceitam apenas JPG ou PNG.",
        ],
      },
      {
        heading: "Como converter HEIC para JPG",
        list: [
          "Abra a ferramenta HEIC para JPG no navegador.",
          "Selecione uma ou várias fotos.",
          "Baixe as imagens convertidas em JPG.",
        ],
        after: [
          "A conversão acontece no seu aparelho, sem enviar as fotos para a internet. Se precisar de arquivos menores, passe as imagens pelo compressor de imagem depois.",
        ],
      },
      {
        heading: "Como transformar fotos do iPhone em PDF",
        paragraphs: [
          "Para enviar documentos fotografados, como RG, CNH ou comprovantes, a ferramenta HEIC para PDF junta várias fotos em um único PDF, uma por página. É o formato mais aceito por bancos, empresas e órgãos públicos.",
        ],
      },
      {
        heading: "Como fazer o iPhone salvar em JPG",
        paragraphs: [
          "Se você prefere evitar o problema de vez, dá para mudar o formato da câmera: Ajustes > Câmera > Formatos > \"Mais Compatível\". A partir daí, as novas fotos serão salvas em JPG, ocupando mais espaço.",
          "Outra opção é manter o HEIC e deixar o iPhone converter na transferência: Ajustes > Fotos > \"Transferir para Mac ou PC\" > Automático.",
        ],
      },
      {
        heading: "A conversão perde qualidade?",
        paragraphs: [
          "Como o JPG também comprime a imagem, há uma pequena perda, normalmente imperceptível em fotos comuns. Para trabalhos profissionais de edição, o ideal é manter o original HEIC guardado.",
        ],
      },
    ],
    faqs: [
      { question: "O que é arquivo HEIC?", answer: "É o formato de imagem de alta eficiência usado pelos iPhones, que ocupa cerca de metade do espaço de um JPG com qualidade semelhante." },
      { question: "Como abrir HEIC no Windows?", answer: "Converta para JPG com uma ferramenta online ou instale as extensões de imagem HEIF da Microsoft Store." },
      { question: "Converter HEIC para JPG perde qualidade?", answer: "Há uma pequena perda pela compressão do JPG, geralmente imperceptível em fotos do dia a dia." },
      { question: "Como fazer o iPhone tirar fotos em JPG?", answer: "Em Ajustes > Câmera > Formatos, escolha \"Mais Compatível\"." },
    ],
  },

  "metodo-pomodoro-como-usar": {
    slug: "metodo-pomodoro-como-usar",
    updated: "2026-11-09",
    intro: [
      "A técnica Pomodoro foi criada nos anos 1980 pelo italiano Francesco Cirillo, que usava um timer de cozinha em forma de tomate (pomodoro, em italiano) para estudar. A ideia é simples: trabalhar em blocos curtos de foco total, com pausas programadas.",
      "Ela ajuda a vencer a procrastinação, reduz o cansaço mental e torna mais fácil medir quanto tempo cada tarefa realmente leva.",
    ],
    sections: [
      {
        heading: "Como funciona",
        list: [
          "Escolha uma tarefa.",
          "Programe 25 minutos e trabalhe só nela, sem celular, e-mail ou redes sociais.",
          "Quando o timer tocar, faça uma pausa de 5 minutos.",
          "A cada 4 pomodoros, faça uma pausa longa, de 15 a 30 minutos.",
        ],
        after: [
          "Se surgir uma distração no meio do bloco, anote em um papel para resolver depois e volte à tarefa. Se o pomodoro for interrompido de verdade, o ideal é recomeçá-lo.",
        ],
      },
      {
        heading: "Adaptando o tempo",
        paragraphs: [
          "Os 25 minutos são o padrão, mas não uma regra fixa. Quem está começando ou tem dificuldade de concentração pode usar blocos de 15 ou 20 minutos. Para tarefas que exigem imersão, como programação ou redação longa, muitas pessoas preferem blocos de 45 a 50 minutos com pausas de 10.",
          "O importante é manter o ritmo de foco e pausa. Teste por uma semana e ajuste.",
        ],
      },
      {
        heading: "O que fazer nas pausas",
        list: [
          "Levante, alongue e beba água.",
          "Olhe para longe da tela para descansar a vista.",
          "Evite redes sociais: elas costumam esticar a pausa e prender a atenção.",
          "Na pausa longa, faça um lanche ou uma caminhada curta.",
        ],
      },
      {
        heading: "Pomodoro para estudar",
        paragraphs: [
          "Para concursos, vestibular e faculdade, o Pomodoro combina bem com um ciclo de estudos, em que as matérias se revezam conforme o peso de cada uma. Um exemplo: 2 pomodoros de matemática, 1 de português e 1 de revisão, repetindo o ciclo ao longo do dia.",
          "Ao fim de cada sessão, registre os erros dos exercícios na ferramenta de mapeamento de erros. Assim você descobre quais assuntos precisam de mais pomodoros.",
        ],
      },
      {
        heading: "Erros comuns",
        list: [
          "Usar o celular \"só um pouquinho\" durante o bloco de foco.",
          "Pular as pausas quando está rendendo: elas evitam o esgotamento no fim do dia.",
          "Escolher tarefas grandes demais. Divida \"estudar direito constitucional\" em \"ler o capítulo 3 e fazer 20 questões\".",
          "Desistir no primeiro dia: o hábito costuma se firmar depois de algumas semanas.",
        ],
      },
    ],
    faqs: [
      { question: "O que é a técnica Pomodoro?", answer: "É um método de gestão de tempo com blocos de 25 minutos de foco e pausas de 5 minutos, com uma pausa longa a cada 4 blocos." },
      { question: "Posso mudar o tempo do pomodoro?", answer: "Sim. Blocos de 15 a 50 minutos funcionam bem; o importante é manter a alternância entre foco e pausa." },
      { question: "Quantos pomodoros fazer por dia?", answer: "Depende da rotina. Muitas pessoas fazem entre 8 e 12 pomodoros em um dia de estudo ou trabalho intenso." },
      { question: "O Pomodoro funciona para concursos?", answer: "Sim, principalmente combinado a um ciclo de estudos que reveza as matérias." },
    ],
  },

  "idade-do-cachorro-e-do-gato-em-anos-humanos": {
    slug: "idade-do-cachorro-e-do-gato-em-anos-humanos",
    updated: "2026-11-09",
    intro: [
      "Quase todo mundo já ouviu que um ano de cachorro equivale a sete anos humanos. A regra é fácil de lembrar, mas não corresponde ao que acontece de verdade: cães e gatos amadurecem muito rápido nos primeiros anos e, depois, envelhecem em ritmos diferentes conforme a espécie e o porte.",
      "Veja como funciona a conversão mais usada por veterinários e por que ela importa para os cuidados com o seu pet.",
    ],
    sections: [
      {
        heading: "Por que a regra do \"vezes 7\" está errada",
        paragraphs: [
          "Com um ano, um cão já é capaz de se reproduzir e tem o corpo de um adulto jovem, o que corresponde a algo como 15 anos humanos, e não 7. No segundo ano, ele chega a cerca de 24 anos humanos. A partir daí, o envelhecimento desacelera e passa a depender bastante do porte.",
        ],
      },
      {
        heading: "Cães: o porte faz diferença",
        table: {
          caption: "Estimativas aproximadas, usadas como referência por muitas tabelas veterinárias.",
          headers: ["Idade do cão", "Pequeno (até 9 kg)", "Médio (10 a 22 kg)", "Grande (23 kg ou mais)"],
          rows: [
            ["1 ano", "15", "15", "15"],
            ["2 anos", "24", "24", "24"],
            ["5 anos", "36", "37", "40"],
            ["7 anos", "44", "47", "50"],
            ["10 anos", "56", "60", "66"],
            ["13 anos", "68", "74", "82"],
          ],
        },
        after: [
          "Cães grandes envelhecem mais rápido e costumam ser considerados idosos a partir dos 6 a 7 anos; cães pequenos, por volta dos 9 a 10 anos.",
        ],
      },
      {
        heading: "Gatos",
        paragraphs: [
          "Nos gatos, a referência mais comum é: 1 ano equivale a cerca de 15 anos humanos, 2 anos a cerca de 24, e a partir daí soma-se aproximadamente 4 anos humanos por ano. Um gato de 10 anos teria por volta de 56 anos humanos.",
          "Gatos que vivem dentro de casa, castrados e com acompanhamento veterinário costumam viver bem mais do que gatos com acesso à rua.",
        ],
      },
      {
        heading: "Cuidados em cada fase",
        list: [
          "Filhote: vacinas, vermifugação, socialização e alimentação própria para filhotes.",
          "Adulto: vacinas em dia, consultas anuais, controle de peso e atividade física.",
          "Idoso: check-ups a cada 6 meses, exames de sangue, atenção aos dentes, articulações e mudanças de comportamento, e ração adequada à idade.",
        ],
        after: [
          "A calculadora de consumo de ração ajuda a ajustar a quantidade diária conforme o peso, e o rastreador de vacinas lembra das datas de reforço. Em caso de dúvida, o médico-veterinário é quem deve orientar.",
        ],
      },
    ],
    faqs: [
      { question: "Um ano de cachorro equivale a quantos anos humanos?", answer: "O primeiro ano equivale a cerca de 15 anos humanos e o segundo, a cerca de 24. Depois, depende do porte do cão." },
      { question: "A regra de multiplicar por 7 está certa?", answer: "Não. Ela subestima a idade nos primeiros anos e não considera as diferenças entre portes." },
      { question: "Quantos anos humanos tem um gato de 10 anos?", answer: "Por volta de 56 anos humanos, segundo as tabelas mais usadas." },
      { question: "Cachorro grande envelhece mais rápido?", answer: "Sim. Cães de grande porte costumam ser considerados idosos mais cedo que os de pequeno porte." },
    ],
  },

  "como-criar-senha-forte": {
    slug: "como-criar-senha-forte",
    updated: "2026-11-09",
    intro: [
      "Senhas fracas e repetidas ainda são uma das principais portas de entrada para golpes, invasões de redes sociais e acesso indevido a contas de banco e e-mail. A boa notícia é que dá para ter senhas fortes sem precisar decorar dezenas de combinações impossíveis.",
      "Veja o que torna uma senha segura e quais hábitos protegem suas contas de verdade.",
    ],
    sections: [
      {
        heading: "O que deixa uma senha forte",
        list: [
          "Comprimento: é o fator mais importante. Prefira pelo menos 12 a 16 caracteres.",
          "Variedade: letras maiúsculas, minúsculas, números e símbolos aumentam as combinações possíveis.",
          "Imprevisibilidade: nada de datas de nascimento, nomes de filhos, pets, times ou sequências como 123456.",
          "Exclusividade: cada conta com uma senha diferente.",
        ],
        after: [
          "Cada caractere a mais multiplica o número de combinações. Uma senha aleatória de 8 caracteres pode ser quebrada por força bruta muito mais rápido do que uma de 16, mesmo usando os mesmos tipos de caractere.",
        ],
      },
      {
        heading: "Frases-senha: fortes e fáceis de lembrar",
        paragraphs: [
          "Uma frase com quatro ou mais palavras sem relação entre si, como \"cadeira-laranja-violino-nuvem\", é longa, difícil de adivinhar e mais fácil de lembrar do que uma sequência aleatória curta. Acrescentar um número e um símbolo deixa a frase ainda mais forte.",
        ],
      },
      {
        heading: "Por que nunca repetir senhas",
        paragraphs: [
          "Quando um site sofre vazamento, as senhas expostas são testadas automaticamente em e-mails, bancos e redes sociais. Se você usa a mesma senha em vários lugares, um único vazamento compromete todas as contas.",
        ],
      },
      {
        heading: "Gerenciador de senhas",
        paragraphs: [
          "Um gerenciador de senhas guarda todas as suas senhas com criptografia e preenche os campos automaticamente. Você só precisa lembrar de uma senha principal, que deve ser muito forte. Os navegadores modernos e os sistemas do celular já trazem gerenciadores integrados.",
        ],
      },
      {
        heading: "Verificação em duas etapas",
        paragraphs: [
          "Ative a verificação em duas etapas (2FA) sempre que possível, principalmente no e-mail, no WhatsApp, nas redes sociais e no banco. Mesmo que alguém descubra a sua senha, ainda vai precisar do código do seu celular. Aplicativos autenticadores são mais seguros do que códigos por SMS.",
        ],
      },
      {
        heading: "Como usar o gerador de senhas",
        paragraphs: [
          "O gerador de senhas do site cria combinações aleatórias no seu próprio navegador, com o tamanho e os tipos de caractere que você escolher. Gere, copie direto para o gerenciador de senhas e não reutilize a mesma senha em outro lugar.",
        ],
      },
    ],
    faqs: [
      { question: "Quantos caracteres deve ter uma senha forte?", answer: "Pelo menos 12, e de preferência 16 ou mais, misturando letras maiúsculas, minúsculas, números e símbolos." },
      { question: "É seguro usar a mesma senha em vários sites?", answer: "Não. Se um site vazar, todas as contas com aquela senha ficam expostas." },
      { question: "Gerenciador de senhas é seguro?", answer: "Os gerenciadores confiáveis guardam as senhas com criptografia forte e são mais seguros do que repetir senhas ou anotá-las em papel." },
      { question: "O que é verificação em duas etapas?", answer: "É uma camada extra de segurança: além da senha, o login exige um código temporário gerado no celular." },
    ],
  },

  "como-criar-link-do-whatsapp": {
    slug: "como-criar-link-do-whatsapp",
    updated: "2026-11-09",
    intro: [
      "Um link do WhatsApp abre a conversa com o seu número direto, sem que o cliente precise salvar o contato. Com uma mensagem pronta, ele ainda chega sabendo o que perguntar. É uma das formas mais simples de aumentar o contato de clientes vindos do Instagram, do Google ou de um cartão de visita.",
    ],
    sections: [
      {
        heading: "Como funciona o link wa.me",
        paragraphs: [
          "O formato oficial é https://wa.me/ seguido do número com código do país e DDD, só com dígitos. Para um celular de São Paulo (11) 98765-4321: https://wa.me/5511987654321.",
          "Para incluir uma mensagem, acrescente ?text= e o texto codificado para URL. Por exemplo, os espaços viram %20. A ferramenta de link do WhatsApp faz essa codificação automaticamente.",
        ],
      },
      {
        heading: "Passo a passo",
        list: [
          "Digite o número com DDD.",
          "Escreva a mensagem que o cliente vai enviar, como \"Olá! Vi seu perfil e quero um orçamento.\"",
          "Gere e copie o link.",
          "Teste abrindo em outro celular antes de divulgar.",
        ],
      },
      {
        heading: "Onde usar",
        list: [
          "Link da bio do Instagram e do TikTok.",
          "Botão no site ou na página de contato.",
          "Perfil da empresa no Google.",
          "Assinatura de e-mail.",
          "Anúncios e posts.",
          "Material impresso: transforme o link em QR Code com o gerador de QR Code e coloque em cardápios, cartões, panfletos e na vitrine.",
        ],
      },
      {
        heading: "Mensagens prontas que funcionam",
        list: [
          "Loja: \"Olá! Vi o produto no Instagram e quero saber se tem disponível.\"",
          "Serviços: \"Olá! Gostaria de um orçamento para…\"",
          "Restaurante: \"Olá! Quero fazer um pedido para entrega.\"",
          "Agendamentos: \"Olá! Quero agendar um horário.\"",
        ],
        after: [
          "Mensagens que identificam a origem (\"Vi no Instagram\", \"Vi no Google\") ajudam a saber de onde vêm seus clientes.",
        ],
      },
      {
        heading: "Cuidados",
        list: [
          "Não esqueça o 55 (código do Brasil) no começo do número.",
          "Se usar WhatsApp Business, configure mensagem de saudação e de ausência.",
          "Responda rápido: o link aumenta os contatos, mas a demora na resposta faz o cliente desistir.",
        ],
      },
    ],
    faqs: [
      { question: "Como criar um link do WhatsApp?", answer: "Use https://wa.me/ seguido do número com 55, DDD e telefone, só com dígitos. Para mensagem pronta, acrescente ?text= e o texto codificado." },
      { question: "Precisa salvar o contato para usar o link?", answer: "Não. O link abre a conversa diretamente com o número." },
      { question: "Funciona com WhatsApp Business?", answer: "Sim, o link funciona igual para contas pessoais e comerciais." },
      { question: "Como transformar o link em QR Code?", answer: "Cole o link no gerador de QR Code e baixe a imagem para imprimir ou divulgar." },
    ],
  },

  "taxa-de-engajamento-instagram": {
    slug: "taxa-de-engajamento-instagram",
    updated: "2026-11-09",
    intro: [
      "Número de seguidores não diz tudo. Um perfil com 2 mil seguidores muito ativos pode ter mais impacto do que um com 50 mil seguidores que não interagem. A taxa de engajamento mostra quanto o público realmente reage ao conteúdo e é uma das métricas mais olhadas por marcas e agências.",
    ],
    sections: [
      {
        heading: "Fórmula por seguidores",
        paragraphs: [
          "Taxa de engajamento = (curtidas + comentários + salvamentos + compartilhamentos) ÷ número de seguidores × 100.",
          "Exemplo: um post com 300 curtidas, 25 comentários, 40 salvamentos e 15 compartilhamentos em um perfil de 10 mil seguidores. (300 + 25 + 40 + 15) ÷ 10.000 × 100 = 3,8%.",
          "Para avaliar o perfil, calcule a média dos últimos 10 a 20 posts, e não de um post isolado.",
        ],
      },
      {
        heading: "Fórmula por alcance",
        paragraphs: [
          "Taxa por alcance = interações ÷ contas alcançadas × 100. Ela mostra quanto o conteúdo engajou quem realmente o viu, inclusive não seguidores. É mais útil para avaliar Reels, que alcançam muita gente de fora.",
          "Os dados de alcance aparecem nos insights de contas profissionais do Instagram.",
        ],
      },
      {
        heading: "O que é uma boa taxa",
        paragraphs: [
          "Não existe um número universal: a taxa varia por nicho, formato e tamanho do perfil, e muda conforme o algoritmo. De forma geral, perfis menores tendem a ter taxas proporcionalmente mais altas, porque o público é mais próximo. Mais do que comparar com médias de mercado, compare o seu perfil com ele mesmo ao longo do tempo e com perfis parecidos do seu nicho.",
        ],
      },
      {
        heading: "Nem toda interação vale o mesmo",
        paragraphs: [
          "Salvamentos e compartilhamentos indicam que o conteúdo foi útil a ponto de a pessoa querer guardar ou mostrar para alguém, e costumam ser sinais fortes para a distribuição. Por isso, posts com dicas práticas, listas e tutoriais tendem a gerar mais desses dois tipos de interação.",
        ],
      },
      {
        heading: "Como aumentar o engajamento",
        list: [
          "Publique com regularidade, nos horários em que seu público está online (veja nos insights).",
          "Comece os vídeos com um gancho forte nos primeiros segundos.",
          "Faça perguntas na legenda e responda os comentários na primeira hora.",
          "Use carrosséis com conteúdo útil, que incentivam salvar.",
          "Escreva legendas organizadas, com parágrafos: o formatador de legendas do site preserva as quebras de linha.",
          "Use Stories com enquetes e caixinhas de perguntas para manter o público próximo.",
        ],
      },
    ],
    faqs: [
      { question: "Como calcular a taxa de engajamento do Instagram?", answer: "Some curtidas, comentários, salvamentos e compartilhamentos, divida pelo número de seguidores e multiplique por 100." },
      { question: "Qual é uma boa taxa de engajamento?", answer: "Depende do nicho e do tamanho do perfil; perfis menores costumam ter taxas maiores. Compare seu perfil com ele mesmo ao longo do tempo." },
      { question: "Engajamento por alcance é melhor?", answer: "Ele mostra o desempenho entre quem viu o conteúdo, o que é útil principalmente para Reels, que alcançam não seguidores." },
      { question: "Salvamentos contam no engajamento?", answer: "Sim, e são uma das interações mais valiosas, porque indicam conteúdo útil." },
    ],
  },
};
