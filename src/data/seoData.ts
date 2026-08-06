export interface CategorySEOData {
  slug: string;
  title: string;
  h1: string;
  metaDescription: string;
  intro: string;
  diferenciais: string[];
  ogTitle: string;
  ogDescription: string;
  categoryName: string;
  categoryFilter: string;
  emoji: string;
  toolCount?: number;
  schemaKeywords: string[];
}

export const CATEGORY_SEO_DATA: Record<string, CategorySEOData> = {
  "casa-transportes": {
    slug: "casa-transportes",
    title: "Calculadoras para Casa e Transporte — BTU, Tinta, Energia, Limpeza e Mais",
    h1: "Calculadoras para Casa e Transporte Online Grátis",
    metaDescription: "Ferramentas gratuitas para casa e veículo: BTU, tinta, consumo de energia, limpeza por zonas, metros quadrados, álcool ou gasolina, depreciação de veículo e mais. Sem cadastro.",
    intro: "Organizar a casa, economizar energia e tomar decisões inteligentes sobre o veículo são tarefas diárias que exigem precisão. O CLICAresolve reúne as melhores calculadoras e utilitários para Casa e Transporte, tudo gratuito e sem cadastro. Nossa calculadora de BTU ajuda você a escolher o ar-condicionado ideal para cada ambiente. A calculadora de tinta evita desperdício de material e dinheiro. O comparador de álcool ou gasolina mostra qual combustível compensa mais no posto. A ferramenta de depreciação de veículo calcula o valor de revenda do seu carro ao longo do tempo. Já o organizador de limpeza por zonas transforma a faxina da casa em um processo simples e produtivo. Cada ferramenta foi desenvolvida com foco em precisão, privacidade e velocidade: seus dados nunca saem do navegador. Explore nosso hub e descubra como economizar tempo, dinheiro e energia com um clique.",
    diferenciais: [
      "100% gratuito — sem assinaturas, sem anúncios invasivos",
      "Privacidade total — seus dados ficam no navegador, nunca são enviados a servidores",
      "Respostas instantâneas — sem cadastro, sem espera",
      "Mais de 10 ferramentas especializadas em casa e transporte"
    ],
    ogTitle: "Calculadoras para Casa e Transporte — BTU, Tinta, Energia e Mais",
    ogDescription: "Ferramentas gratuitas para casa e veículo. Sem cadastro, sem anúncios, total privacidade.",
    categoryName: "Casa e Transporte",
    categoryFilter: "Casa",
    emoji: "🏠",
    schemaKeywords: ["calculadora btu", "calculadora de tinta", "consumo de energia", "limpeza por zonas", "alcool ou gasolina", "depreciação veiculo", "metros quadrados", "parcelamento multas"]
  },
  "saude-bem-estar": {
    slug: "saude-bem-estar",
    title: "Calculadoras de Saúde e Bem-Estar Online Grátis — IMC, Calorias, Sono e Mais",
    h1: "Calculadoras de Saúde e Bem-Estar Online Grátis",
    metaDescription: "Ferramentas gratuitas de saúde: IMC avançada, gasto calórico, frequência cardíaca, macronutrientes, limite de cafeína, ciclos do sono, período fértil, DPP, contrações e mais. Sem cadastro.",
    intro: "Sua saúde é o seu maior patrimônio. O CLICAresolve oferece um conjunto completo de calculadoras e utilitários de saúde e bem-estar, todas gratuitas e sem cadastro. Nossa IMC Avançada vai além do cálculo simples, mostrando sua classificação ideal e peso saudável. A calculadora de gasto calórico estima quantas calorias você queima em diferentes atividades. O monitor de frequência cardíaca define suas zonas de treino personalizadas. Para gestantes, temos a calculadora de DPP (Data Provável do Parto), o cronômetro de contrações e o calculador de período fértil. Para quem busca performance, o ciclo de sono encontra o melhor horário para dormir, e o limite de cafeína calcula sua dose segura diária. A calculadora de macronutrientes distribui proteínas, carboidratos e gorduras de forma personalizada. Cada ferramenta respeita sua privacidade: nenhum dado é armazenado em servidores. Cuide da sua saúde com inteligência e precisão.",
    diferenciais: [
      "Calculadoras validadas por referências médicas — sem substituir profissionais, mas complementando informação",
      "Privacidade absoluta — dados de saúde nunca saem do seu dispositivo",
      "Acesso instantâneo — sem cadastro, sem formulários longos",
      "Ferramentas para toda a família: gestantes, atletas, idosos e crianças"
    ],
    ogTitle: "Calculadoras de Saúde e Bem-Estar — IMC, Calorias, Sono e Mais",
    ogDescription: "Mais de 10 ferramentas de saúde gratuitas. Sem cadastro, sem anúncios, privacidade total.",
    categoryName: "Saúde e Bem-Estar",
    categoryFilter: "Saúde",
    emoji: "❤️",
    schemaKeywords: ["calculadora imc", "gasto calorico", "frequencia cardiaca", "ciclos sono", "periodo fertil", "dpp", "macronutrientes", "limite cafeina", "alerta agua", "contracoes"]
  },
  "viagem": {
    slug: "viagem",
    title: "Ferramentas para Viagem e Lazer — Roteiros, Streaming e Mais",
    h1: "Ferramentas para Viagem e Lazer Online Grátis",
    metaDescription: "Planeje sua viagem e lazer com ferramentas gratuitas: roteirizador de viagem, onde assistir filmes e séries, divisor de carona e mais. Sem cadastro, tudo no navegador.",
    intro: "Viajar é uma das melhores experiências da vida, mas o planejamento pode ser estressante. O CLICAresolve simplifica cada etapa com ferramentas gratuitas para viagem e lazer. Nosso roteirizador de viagem permite organizar dias, atividades e pontos turísticos em um cronograma claro. O utilitário 'Onde Assistir' ajuda a descobrir em qual streaming está seu filme ou série favorita. O divisor de carona calcula a divisão justa dos gastos entre todos os passageiros. O gerador de link para WhatsApp facilita compartilhar itinerários e informações. E o organizador de listas é perfeito para packing lists e checklists de viagem. Tudo gratuito, sem cadastro e com privacidade garantida: seus planos de viagem ficam apenas no seu navegador. Transforme o planejamento em diversão.",
    diferenciais: [
      "Planejamento completo em um só lugar — roteiro, divisão de custos e streaming",
      "Compartilhamento fácil — gera links prontos para WhatsApp",
      "100% gratuito — sem anúncios, sem assinatura",
      "Privacidade total — seus planos de viagem não são compartilhados com ninguém"
    ],
    ogTitle: "Ferramentas para Viagem e Lazer — Roteiros, Streaming e Mais",
    ogDescription: "Planeje viagens, descubra onde assistir e divida custos. Gratuito, sem cadastro.",
    categoryName: "Viagem e Lazer",
    categoryFilter: "Lazer",
    emoji: "✈️",
    schemaKeywords: ["roteirizador viagem", "onde assistir", "divisor carona", "gerador link whatsapp", "organizador listas"]
  },
  "esportes": {
    slug: "esportes",
    title: "Ferramentas para Esportes e Apostas — Bolão, Equipes, Placar e Mais",
    h1: "Ferramentas para Esportes e Apostas Online Grátis",
    metaDescription: "Ferramentas esportivas gratuitas: gerador de bolão, sorteador de equipes, placar poliesportivo, probabilidades de classificação, palpites de loteria e mais. Sem cadastro.",
    intro: "Seja você um jogador de futebol de final de semana, um organizador de campeonatos ou um fã de apostas esportivas, o CLICAresolve tem as ferramentas que você precisa. Nosso gerador de bolão cria palpites aleatórios para a Mega-Sena e outras loterias. O sorteador de equipes divide jogadores em times equilibrados automaticamente. O placar poliesportivo funciona como cronômetro e marcador para diversos esportes. A calculadora de probabilidades de classificação simula cenários de campeonatos. E o painel de bingo é perfeito para jogos em família e eventos. Cada ferramenta é gratuita, sem cadastro e funciona offline no navegador. Organize seu jogo, aposte com inteligência e acompanhe cada ponto com precisão.",
    diferenciais: [
      "Ferramentas para todos os perfis: jogadores, organizadores e apostadores",
      "Funciona offline — sem depender de conexão durante o jogo",
      "Sorteios justos e aleatórios com algoritmos transparentes",
      "100% gratuito — sem limites de uso, sem assinatura"
    ],
    ogTitle: "Ferramentas para Esportes e Apostas — Bolão, Equipes, Placar e Mais",
    ogDescription: "Bolão, sorteio de equipes, placar poliesportivo e probabilidades. Gratuito, sem cadastro.",
    categoryName: "Esportes e Apostas",
    categoryFilter: "Esportes",
    emoji: "⚽",
    schemaKeywords: ["gerador bolao", "sorteador equipes", "placar poliesportivo", "probabilidades classificacao", "palpites loteria", "painel bingo"]
  },
  "financas": {
    slug: "financas",
    title: "Calculadoras Financeiras Online Grátis — Juros, Markup, Moedas e Mais",
    h1: "Calculadoras Financeiras Online Grátis",
    metaDescription: "Ferramentas financeiras gratuitas: juros compostos, simulador de markup, ponto de equilíbrio, conversor de moedas, salário/hora, comparador de preço, taxas de maquininha e mais. Sem cadastro.",
    intro: "Tomar decisões financeiras inteligentes exige números precisos. O CLICAresolve reúne as calculadoras financeiras mais úteis do Brasil, todas gratuitas e sem cadastro. Nosso simulador de juros compostos mostra o poder do dinheiro no tempo. A calculadora de markup descobre seu custo real, markup e margem de lucro. O ponto de equilíbrio calcula quanto você precisa faturar para cobrir todos os custos. O conversor de moedas atualiza taxas em tempo real. A calculadora de salário/hora revela seu valor real por hora trabalhada. O comparador de preço encontra a melhor relação custo-benefício entre embalagens. E o simulador de porcentagem reversa resolve qualquer problema de desconto ou aumento. Para profissionais liberais, temos ainda o gerador de recibo e o calculador de taxas de maquininha. Cada ferramenta respeita sua privacidade: nenhum dado financeiro é armazenado. Faça contas inteligentes e tome decisões informadas.",
    diferenciais: [
      "Calculadoras aprovadas por contadores e empreendedores reais",
      "Taxas de câmbio atualizadas automaticamente",
      "Simulações completas com gráficos e projeções de longo prazo",
      "Privacidade total — seus dados financeiros nunca saem do navegador"
    ],
    ogTitle: "Calculadoras Financeiras Online Grátis — Juros, Markup, Moedas e Mais",
    ogDescription: "15+ ferramentas financeiras gratuitas: juros, markup, ponto de equilíbrio, moedas e mais. Sem cadastro.",
    categoryName: "Finanças",
    categoryFilter: "Finanças",
    emoji: "💰",
    schemaKeywords: ["juros compostos", "simulador markup", "ponto equilibrio", "conversor moedas", "salario hora", "comparador preco", "taxas maquininha", "calculadora desconto", "porcentagem reversa", "gerador recibo"]
  },
  "estudos": {
    slug: "estudos",
    title: "Ferramentas para Estudos e Educação — Pomodoro, SISU, Editais e Mais",
    h1: "Ferramentas para Estudos e Educação Online Grátis",
    metaDescription: "Ferramentas educacionais gratuitas: ciclo de estudos, simulador SISU, calculadora de edital, mapeamento de erros, pomodoro, velocidade de digitação e mais. Sem cadastro.",
    intro: "Estudar com eficiência é uma habilidade que se aprende. O CLICAresolve oferece ferramentas gratuitas para maximizar seu rendimento acadêmico e profissional. Nosso ciclo de estudos organiza seu tempo em blocos produtivos com pausas estratégicas. O simulador SISU calcula sua nota de corte e chances de aprovação. A calculadora de edital soma pontos com pesos por matéria. O mapeamento de erros identifica padrões de dificuldade para direcionar seu estudo. O timer Pomodoro mantém foco com intervalos científicos. O teste de velocidade de digitação mede seu WPM. E o contador de caracteres ajuda a formatar textos acadêmicos. Cada ferramenta é gratuita, sem cadastro e funciona offline. Estude de forma inteligente, organize seu tempo e alcance seus objetivos com mais eficiência.",
    diferenciais: [
      "Métodos comprovados de produtividade: Pomodoro, ciclo de estudos e mapeamento de erros",
      "Simuladores realistas baseados em dados oficiais de vestibulares e concursos",
      "Acesso offline — estude em qualquer lugar, sem depender de internet",
      "100% gratuito — sem limites de uso, sem assinatura"
    ],
    ogTitle: "Ferramentas para Estudos e Educação — Pomodoro, SISU, Editais e Mais",
    ogDescription: "Ferramentas gratuitas para estudantes: ciclo de estudos, SISU, editais, Pomodoro e mais. Sem cadastro.",
    categoryName: "Estudos e Educação",
    categoryFilter: "Educação",
    emoji: "📚",
    schemaKeywords: ["ciclo estudos", "simulador sisu", "calculadora edital", "mapeamento erros", "pomodoro", "velocidade digitacao", "contador caracteres", "simulador sisu"]
  },
  "religioso": {
    slug: "religioso",
    title: "Ferramentas de Estudos Religiosos — Bíblia, Hebraico, Cronologia e Mais",
    h1: "Ferramentas de Estudos Religiosos Online Grátis",
    metaDescription: "Ferramentas religiosas gratuitas: plano de leitura bíblica, cronologia bíblica, conversor calendário hebraico, roteiro de estudos do judaísmo, fichamento SOAP e mais. Sem cadastro.",
    intro: "Aprofunde sua fé e conhecimento espiritual com as ferramentas religiosas do CLICAresolve. Nosso plano de leitura bíblica em 365 dias acompanha seu progresso diário. A cronologia bíblica interativa mostra a linha do tempo dos principais eventos. O conversor de calendário hebraico traduz datas gregorianas para o calendário judaico e mostra as próximas festas. O roteiro de estudos do judaísmo oferece uma trilha em 4 fases: Torá, Tanakh, filosofia e Kabalah. O fichamento SOAP estrutura seu estudo bíblico em Scripture, Observation, Application e Prayer. Cada ferramenta é gratuita, sem cadastro e respeita sua privacidade: seus dados de estudo espiritual ficam apenas no seu dispositivo. Cresça na fé com organização e profundidade.",
    diferenciais: [
      "Conteúdo teológico respeitoso e academicamente fundamentado",
      "Plano de leitura bíblica completo com acompanhamento de progresso",
      "Conversor de calendário hebraico com festas judaicas atualizadas",
      "Privacidade total — seus estudos espirituais são apenas seus"
    ],
    ogTitle: "Ferramentas Religiosas — Bíblia, Hebraico, Cronologia e Mais",
    ogDescription: "Plano de leitura bíblica, cronologia, calendário hebraico e roteiro judaico. Gratuito, sem cadastro.",
    categoryName: "Estudos Religiosos",
    categoryFilter: "Religioso",
    emoji: "📖",
    schemaKeywords: ["plano leitura biblica", "cronologia biblica", "calendario hebraico", "roteiro judaismo", "fichamento soap"]
  },
  "calendario-tempo": {
    slug: "calendario-tempo",
    title: "Ferramentas de Calendário e Tempo — Feriados, Diferença de Datas, Horas e Mais",
    h1: "Ferramentas de Calendário e Tempo Online Grátis",
    metaDescription: "Ferramentas de calendário e tempo gratuitas: calendário de feriados, diferença entre datas, acumulador de horas, conversor de horas decimais, dias de vida e contadores. Sem cadastro.",
    intro: "O tempo é o recurso mais valioso que temos. O CLICAresolve oferece ferramentas gratuitas para gerenciar datas, horas e prazos com precisão. Nosso calendário de feriados mostra feriados nacionais e móveis de 2025-2026 com contador regressivo. A diferença entre datas calcula intervalos em anos, meses, dias e horas. O acumulador de horas soma jornadas de trabalho e compara com a contratada. O conversor de horas decimais traduz entre formato horário e decimal. E o contador de dias de vida mostra quanto tempo você já viveu em diferentes unidades. Cada ferramenta é gratuita, sem cadastro e funciona offline. Organize seu tempo, planeje prazos e celebre cada momento da vida.",
    diferenciais: [
      "Feriados nacionais e móveis atualizados automaticamente para 2025-2026",
      "Cálculos precisos de diferença de datas incluindo anos bissextos",
      "Acesso offline — funciona sem internet em qualquer dispositivo",
      "100% gratuito — sem limites, sem cadastro"
    ],
    ogTitle: "Ferramentas de Calendário e Tempo — Feriados, Datas, Horas e Mais",
    ogDescription: "Calendário de feriados, diferença de datas, horas decimais e contadores. Gratuito, sem cadastro.",
    categoryName: "Calendário e Tempo",
    categoryFilter: "Utilidades",
    emoji: "📅",
    schemaKeywords: ["calendario feriados", "diferenca datas", "acumulador horas", "horas decimais", "dias vida", "contador tempo"]
  },
  "utilidades": {
    slug: "utilidades",
    title: "Utilitários Online Grátis — QR Code, Senhas, Listas, Conversores e Mais",
    h1: "Utilitários Online Grátis para o Dia a Dia",
    metaDescription: "Utilitários gratuitos: gerador de QR Code, gerador de senhas, organizador de listas, conversor de DPI, conversor de proporção, extrator de paleta de cores, gerador de link WhatsApp e mais. Sem cadastro.",
    intro: "No dia a dia, pequenas tarefas demandam ferramentas específicas. O CLICAresolve reúne dezenas de utilitários gratuitos que resolvem problemas comuns em segundos. Nosso gerador de QR Code cria códigos prontos para digitalização. O gerador de senhas cria senhas seguras e personalizáveis. O organizador de listas remove duplicatas, ordena, numera e inverte linhas. O conversor de DPI traduz sensibilidade de mouse entre diferentes DPIs. O extrator de paleta de cores identifica as cores dominantes de qualquer imagem. O conversor de proporção calcula aspect ratios e dimensões. O gerador de link para WhatsApp cria links de mensagem direta. E o formatador de texto transforma entre maiúsculas, minúsculas, capitalizado e mais. Tudo gratuito, sem cadastro e com privacidade total. Resolva problemas pequenos com grandes ferramentas.",
    diferenciais: [
      "Mais de 15 utilitários em uma única plataforma",
      "Processamento local — nenhum dado é enviado a servidores",
      "Funciona offline em qualquer navegador moderno",
      "100% gratuito — sem limites de uso, sem assinatura"
    ],
    ogTitle: "Utilitários Online Grátis — QR Code, Senhas, Listas, Conversores e Mais",
    ogDescription: "Dezenas de utilitários gratuitos: QR Code, senhas, listas, conversores e mais. Sem cadastro.",
    categoryName: "Utilitários",
    categoryFilter: "Utilidades",
    emoji: "🛠️",
    schemaKeywords: ["gerador qrcode", "gerador senhas", "organizador listas", "conversor dpi", "conversor proporcao", "paleta cores", "link whatsapp", "formatador texto", "descobridor anagramas", "calculadora churrasco"]
  },
  "micro-nichos": {
    slug: "micro-nichos",
    title: "Ferramentas para Nichos Específicos — Produtividade, DP/RH, Redes Sociais e Mais",
    h1: "Ferramentas para Nichos Específicos Online Grátis",
    metaDescription: "Ferramentas especializadas gratuitas: produtividade, DP/RH, redes sociais, culinária, calculadoras gerais e muito mais. Sem cadastro, tudo no navegador.",
    intro: "Cada profissão e hobby tem suas necessidades específicas. O CLICAresolve oferece ferramentas especializadas para nichos únicos, todas gratuitas e sem cadastro. Para produtividade, temos o Pomodoro, o ciclo de estudos e o velocidade de digitação. Para DP/RH, oferecemos o acumulador de horas, o conversor de horas decimais e o gerador de recibo. Para redes sociais, temos a taxa de engajamento e o formatador de legendas. Para culinária, o conversor de medidas e a calculadora de churrasco. Para gamers, o backlog de jogos e o cronômetro de spawn. Para beleza, o cronograma capilar e o custo de nail designer. Para cada nicho, uma solução precisa e privada. Explore nosso hub de micro-nichos e descubra ferramentas que você nem sabia que precisava.",
    diferenciais: [
      "Ferramentas desenvolvidas com feedback de profissionais reais de cada nicho",
      "Privacidade garantida — dados sensíveis de trabalho e negócio nunca saem do navegador",
      "Acesso offline — funciona sem internet em qualquer dispositivo",
      "100% gratuito — sem limites de uso, sem assinatura"
    ],
    ogTitle: "Ferramentas para Nichos Específicos — Produtividade, DP/RH, Redes Sociais e Mais",
    ogDescription: "Ferramentas especializadas para produtividade, DP/RH, redes sociais, culinária e mais. Gratuito.",
    categoryName: "Nichos Específicos",
    categoryFilter: "Produtividade",
    emoji: "🎯",
    schemaKeywords: ["pomodoro", "ciclo estudos", "acumulador horas", "taxa engajamento", "conversor cozinha", "backlog gamer", "cronograma capilar"]
  },
  "familia-bebes": {
    slug: "familia-bebes",
    title: "Ferramentas para Família e Bebês — Significado de Nomes, DPP e Mais",
    h1: "Ferramentas para Família e Bebês Online Grátis",
    metaDescription: "Ferramentas gratuitas para família e bebês: significado de nomes, DPP (Data Provável do Parto), período fértil, cronômetro de contrações e mais. Sem cadastro.",
    intro: "A chegada de um bebê transforma tudo. O CLICAresolve oferece ferramentas gratuitas para apoiar famílias em cada etapa dessa jornada. Nosso descobridor de significado de nomes revela a origem, significado e curiosidades de mais de 150 nomes de bebês, com busca inteligente e sugestões de nomes similares. A calculadora de DPP (Data Provável do Parto) usa a Regra de Naegele para estimar a data do parto. O calculador de período fértil ajuda a planejar a gravidez. E o cronômetro de contrações acompanha o progresso do trabalho de parto. Cada ferramenta é gratuita, sem cadastro e respeita a privacidade da família: dados sensíveis de saúde nunca são armazenados. Prepare-se para o grande dia com informação e tranquilidade.",
    diferenciais: [
      "Base de dados com 150+ nomes de bebês com origem, significado e curiosidades",
      "Calculadoras de gravidez validadas por referências médicas",
      "Privacidade absoluta — dados de saúde familiar nunca saem do navegador",
      "100% gratuito — sem limites, sem cadastro, sem anúncios"
    ],
    ogTitle: "Ferramentas para Família e Bebês — Significado de Nomes, DPP e Mais",
    ogDescription: "Significado de nomes, DPP, período fértil e cronômetro de contrações. Gratuito, sem cadastro.",
    categoryName: "Família e Bebês",
    categoryFilter: "Família e Bebês",
    emoji: "👶",
    schemaKeywords: ["significado nomes", "dpp", "periodo fertil", "contracoes", "nomes bebe"]
  },
  "pet": {
    slug: "pet",
    title: "Ferramentas para Pets — Idade, Ração, Nomes e Vacinas",
    h1: "Ferramentas para Pets Online Grátis",
    metaDescription: "Ferramentas gratuitas para pets: calculadora de idade pet, consumo de ração, gerador de nomes, rastreador de vacinas e vitrine de produtos. Sem cadastro.",
    intro: "Seu pet é parte da família. O CLICAresolve oferece ferramentas gratuitas para cuidar melhor do seu cão ou gato. Nossa calculadora de idade pet converte a idade real em anos humanos, considerando espécie e porte. A calculadora de consumo de ração indica a quantidade ideal diária por peso, fase de vida e atividade. O gerador de nomes para pets cria nomes criativos com filtros por cor do pelo e tema (Nerd, Clássico, Engraçado, Comida, Famosos). E o rastreador de vacinas cadastra múltiplos pets, acompanha vacinas e vermifugação com alertas visuais de atraso. Incluímos ainda uma vitrine de produtos pet com links para compra. Cada ferramenta é gratuita, sem cadastro e funciona offline. Cuide do seu pet com informação e carinho.",
    diferenciais: [
      "Calculadoras veterinárias baseadas em protocolos médicos de cães e gatos",
      "Gerador de nomes com 100+ opções por tema e característica",
      "Rastreador de vacinas com alertas visuais e persistência local",
      "100% gratuito — sem limites, sem cadastro, sem anúncios"
    ],
    ogTitle: "Ferramentas para Pets — Idade, Ração, Nomes e Vacinas",
    ogDescription: "Calculadora de idade pet, consumo de ração, gerador de nomes e rastreador de vacinas. Gratuito.",
    categoryName: "Pets",
    categoryFilter: "Pet",
    emoji: "🐾",
    schemaKeywords: ["idade pet", "consumo racao", "nomes pets", "vacinas pet", "calculadora pet", "rastreador vacinas"]
  },
  "astrologia": {
    slug: "astrologia",
    title: "Ferramentas de Astrologia — Signo, Compatibilidade, Numerologia e Mais",
    h1: "Ferramentas de Astrologia Online Grátis",
    metaDescription: "Ferramentas astrológicas gratuitas: descobridor de signo, compatibilidade entre signos, mapa numerológico e mais. Sem cadastro, tudo no navegador.",
    intro: "Descubra o que as estrelas têm a dizer sobre você com as ferramentas astrológicas do CLICAresolve. Nosso descobridor de signo identifica seu signo solar e mostra características, elemento, regente e qualidade. A compatibilidade entre signos calcula a afinidade amorosa, amizade e profissional entre dois signos. E o mapa numerológico revela seu Número do Destino a partir da data de nascimento. Cada ferramenta é gratuita, sem cadastro e respeita sua privacidade: dados pessoais de astrologia ficam apenas no seu navegador. Explore o universo astrológico com curiosidade e diversão.",
    diferenciais: [
      "Informações astrológicas completas: signo, elemento, regente, qualidade e características",
      "Compatibilidade amorosa, amizade e profissional entre todos os signos",
      "Numerologia do destino com interpretação detalhada",
      "100% gratuito — sem limites, sem cadastro, sem anúncios"
    ],
    ogTitle: "Ferramentas de Astrologia — Signo, Compatibilidade, Numerologia e Mais",
    ogDescription: "Descubra seu signo, compatibilidade amorosa e mapa numerológico. Gratuito, sem cadastro.",
    categoryName: "Astrologia",
    categoryFilter: "Astrologia",
    emoji: "♈",
    schemaKeywords: ["descobridor signo", "compatibilidade signos", "mapa numerologico", "signo solar", "numerologia destino"]
  },
  "livros": {
    slug: "livros",
    title: "Ferramentas para Livros e Leitura — Sugestões, Cronologia e Mais",
    h1: "Ferramentas para Livros e Leitura Online Grátis",
    metaDescription: "Ferramentas literárias gratuitas: sugestor de livros, cronologia bíblica, plano de leitura bíblica e mais. Descubra seu próximo livro com um quiz personalizado. Sem cadastro.",
    intro: "A leitura enriquece a alma e expande a mente. O CLICAresolve oferece ferramentas gratuitas para leitores e estudiosos de todas as áreas. Nosso sugestor de livros usa um quiz com 4 perguntas para encontrar sua próxima leitura ideal. A cronologia bíblica interativa mostra a linha do tempo dos eventos sagrados. O plano de leitura bíblica em 365 dias acompanha seu progresso diário. E o roteiro de estudos do judaísmo oferece uma trilha completa de conhecimento. Cada ferramenta é gratuita, sem cadastro e respeita sua privacidade. Encontre sua próxima leitura, organize seu estudo e aprofunde seu conhecimento.",
    diferenciais: [
      "Quiz de sugestão de livros com 4 perguntas personalizadas",
      "Plano de leitura bíblica completo com progresso salvo no navegador",
      "Cronologia interativa de eventos bíblicos e históricos",
      "100% gratuito — sem limites, sem cadastro, sem anúncios"
    ],
    ogTitle: "Ferramentas para Livros e Leitura — Sugestões, Cronologia e Mais",
    ogDescription: "Sugestor de livros, cronologia bíblica, plano de leitura e mais. Gratuito, sem cadastro.",
    categoryName: "Livros e Leitura",
    categoryFilter: "Livros e Leitura",
    emoji: "📚",
    schemaKeywords: ["sugestor livros", "cronologia biblica", "plano leitura biblica", "roteiro judaismo", "fichamento soap"]
  },
  "pdf-documentos": {
    slug: "pdf-documentos",
    title: "Ferramentas de PDF Online Grátis — Juntar, Dividir, Comprimir e Mais",
    h1: "Ferramentas de PDF e Documentos Online Grátis",
    metaDescription: "Mais de 20 ferramentas gratuitas para PDF: juntar, dividir, comprimir, girar, assinar, numerar páginas, converter HEIC e Markdown, fazer OCR e muito mais. Tudo direto no navegador, sem upload para servidores externos.",
    intro: "Trabalhar com PDF no dia a dia costuma exigir programas pagos ou sites que pedem cadastro só para uma tarefa simples. O CLICAresolve reúne mais de 20 ferramentas de PDF gratuitas que rodam direto no navegador: juntar vários arquivos em um só, dividir um PDF grande em partes, comprimir para caber no limite de anexo de e-mail, girar páginas na orientação errada, adicionar marca d'água, numerar páginas, extrair páginas específicas, preencher formulários e até assinar digitalmente. Também oferecemos conversores para quem lida com fotos de iPhone (HEIC para JPG e PDF) e para quem trabalha com documentação técnica (HTML, DOCX e PDF para Markdown, além de OCR para tornar PDFs escaneados pesquisáveis). Como o processamento acontece no seu navegador, os arquivos não são enviados a nenhum servidor — sua privacidade fica garantida mesmo em documentos sensíveis.",
    diferenciais: [
      "Mais de 20 ferramentas de PDF em um só lugar, sem precisar instalar nada",
      "Processamento local no navegador — seus arquivos não sobem para servidores externos",
      "Conversores HEIC, OCR e Markdown pouco comuns em outras ferramentas gratuitas",
      "100% gratuito — sem limites, sem cadastro, sem marca d'água forçada"
    ],
    ogTitle: "Ferramentas de PDF Online Grátis — Juntar, Dividir, Comprimir e Mais",
    ogDescription: "Mais de 20 ferramentas gratuitas de PDF, processadas direto no navegador. Sem cadastro, sem upload para servidores.",
    categoryName: "PDF e Documentos",
    categoryFilter: "PDF e Documentos",
    emoji: "📄",
    schemaKeywords: ["juntar pdf", "dividir pdf", "comprimir pdf", "assinar pdf", "heic para pdf", "ocr pdf", "numerar paginas pdf"]
  },
  "ferramentas-dev": {
    slug: "ferramentas-dev",
    title: "Ferramentas para Desenvolvedores Online Grátis — JSON, Regex, UUID e Mais",
    h1: "Ferramentas para Desenvolvedores Online Grátis",
    metaDescription: "Ferramentas gratuitas para desenvolvedores: formatador de JSON, testador de regex, gerador de UUID e hash, codificador Base64 e URL, validador de CPF/CNPJ, conversor de CSV e JSON. Tudo no navegador.",
    intro: "Tarefas rápidas do dia a dia de quem programa — formatar um JSON bagunçado, testar uma expressão regular, gerar um UUID ou validar um CPF — não deveriam exigir abrir um projeto ou instalar uma extensão. O CLICAresolve reúne um conjunto de utilitários técnicos gratuitos: formatador e validador de JSON, testador de regex com destaque de correspondências, gerador de UUID e de hash (MD5, SHA), codificador e decodificador Base64 e de URL, validador de CPF e CNPJ com dígitos verificadores, além de conversores entre CSV, JSON e Excel. Todas as ferramentas rodam localmente no navegador, então dados sensíveis (como um token de API ou dado de cliente que você só quer formatar rapidamente) nunca saem da sua máquina.",
    diferenciais: [
      "Processamento 100% local — nenhum dado enviado a servidores externos",
      "Ferramentas essenciais do dia a dia: JSON, Regex, UUID, Base64, Hash",
      "Validador de CPF/CNPJ com verificação real de dígitos",
      "100% gratuito — sem limites, sem cadastro, sem anúncios"
    ],
    ogTitle: "Ferramentas para Desenvolvedores — JSON, Regex, UUID e Mais",
    ogDescription: "Utilitários técnicos gratuitos processados localmente no navegador. Sem cadastro, sem upload de dados.",
    categoryName: "Ferramentas Dev",
    categoryFilter: "Ferramentas Dev",
    emoji: "💻",
    schemaKeywords: ["formatador json", "testador regex", "gerador uuid", "codificador base64", "validador cpf cnpj", "gerador hash"]
  },
  "imagem-design": {
    slug: "imagem-design",
    title: "Ferramentas de Imagem e Design Online Grátis — Compressor, Paleta de Cores e Mais",
    h1: "Ferramentas de Imagem e Design Online Grátis",
    metaDescription: "Ferramentas gratuitas de imagem: compressor, redimensionador, extrator de paleta de cores, seletor de cores e conversores de DPI e proporção. Tudo direto no navegador, sem upload.",
    intro: "Ajustes rápidos de imagem — reduzir o tamanho de um arquivo pesado, redimensionar para um formato específico, extrair a paleta de cores de uma foto ou converter a proporção para redes sociais — costumam exigir abrir um editor completo para uma tarefa de segundos. O CLICAresolve reúne ferramentas gratuitas de imagem e design que resolvem isso direto no navegador: compressor de imagem (reduz o peso do arquivo mantendo qualidade visual), redimensionador (ajusta largura e altura mantendo proporção), extrator de paleta de cores (identifica as cores dominantes de uma imagem), seletor de cores (converte entre HEX, RGB e HSL) e conversores de DPI e proporção para quem prepara arquivos para impressão ou redes sociais. Como tudo roda localmente, suas imagens não são enviadas a nenhum servidor externo.",
    diferenciais: [
      "Compressão e redimensionamento sem perder qualidade perceptível",
      "Extrator de paleta de cores útil para design e branding",
      "Processamento local — suas imagens não saem do navegador",
      "100% gratuito — sem limites, sem marca d'água, sem cadastro"
    ],
    ogTitle: "Ferramentas de Imagem e Design — Compressor, Paleta de Cores e Mais",
    ogDescription: "Ferramentas gratuitas de imagem processadas no navegador. Sem cadastro, sem upload para servidores.",
    categoryName: "Imagem e Design",
    categoryFilter: "Imagem e Design",
    emoji: "🎨",
    schemaKeywords: ["compressor imagem", "redimensionador imagem", "extrator paleta cores", "seletor cores", "conversor dpi"]
  }
};

export const CATEGORY_SLUGS = Object.keys(CATEGORY_SEO_DATA);
