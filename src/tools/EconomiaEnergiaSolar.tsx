import React, { useState, useMemo } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { ToolContent, ToolContentData } from "../components/ToolContent";
import { ExternalLink, MapPin, Zap, AlertCircle, CheckCircle2 } from "lucide-react";

interface EmpresaEnergia {
  nome: string;
  estados: string[];
  consumoMinimo: string;
  observacao: string;
  link: string;
}

const ESTADOS_BR: { sigla: string; nome: string }[] = [
  { sigla: "AC", nome: "Acre" },
  { sigla: "AL", nome: "Alagoas" },
  { sigla: "AP", nome: "Amapá" },
  { sigla: "AM", nome: "Amazonas" },
  { sigla: "BA", nome: "Bahia" },
  { sigla: "CE", nome: "Ceará" },
  { sigla: "DF", nome: "Distrito Federal" },
  { sigla: "ES", nome: "Espírito Santo" },
  { sigla: "GO", nome: "Goiás" },
  { sigla: "MA", nome: "Maranhão" },
  { sigla: "MT", nome: "Mato Grosso" },
  { sigla: "MS", nome: "Mato Grosso do Sul" },
  { sigla: "MG", nome: "Minas Gerais" },
  { sigla: "PA", nome: "Pará" },
  { sigla: "PB", nome: "Paraíba" },
  { sigla: "PR", nome: "Paraná" },
  { sigla: "PE", nome: "Pernambuco" },
  { sigla: "PI", nome: "Piauí" },
  { sigla: "RJ", nome: "Rio de Janeiro" },
  { sigla: "RN", nome: "Rio Grande do Norte" },
  { sigla: "RS", nome: "Rio Grande do Sul" },
  { sigla: "RO", nome: "Rondônia" },
  { sigla: "RR", nome: "Roraima" },
  { sigla: "SC", nome: "Santa Catarina" },
  { sigla: "SP", nome: "São Paulo" },
  { sigla: "SE", nome: "Sergipe" },
  { sigla: "TO", nome: "Tocantins" },
];

const EMPRESAS_ENERGIA_SOLAR: EmpresaEnergia[] = [
  {
    nome: "Órigo Energia",
    estados: ["GO", "MT", "MS", "MG", "SP", "BA", "CE", "PE", "RN", "PA", "MA", "TO", "DF"],
    consumoMinimo: "300 kWh/mês",
    observacao: "Sem obras, sem investimento inicial. Elegível para casas e apartamentos, próprios ou alugados.",
    link: "LINK_AFILIADO_ORIGO_AQUI",
  },
  {
    nome: "Desperta Energia",
    estados: ["RJ", "PR", "SP", "MG", "MT", "MS", "DF", "GO", "BA", "PE", "AL", "RS", "SC", "ES", "PA", "PI", "CE"],
    consumoMinimo: "Consulte no momento da simulação",
    observacao: "Presença em 16 estados + DF, maior cobertura entre as parceiras.",
    link: "LINK_AFILIADO_DESPERTA_AQUI",
  },
  {
    nome: "Nextron Energia",
    estados: ["RJ", "MG", "GO", "BA", "MS", "SP", "SC", "PR", "MA", "RN", "PB"],
    consumoMinimo: "Conta de luz acima de R$ 200/mês (aproximado)",
    observacao: "Modelo de marketplace. Não atende região Norte. Em São Paulo, cobertura pode variar - confirme na simulação.",
    link: "LINK_AFILIADO_NEXTRON_AQUI",
  },
  {
    nome: "Juntos Energia",
    estados: ["MG", "PE", "SP"],
    consumoMinimo: "Conta de luz acima de R$ 150/mês",
    observacao: "ATENÇÃO: cobertura restrita - apenas Minas Gerais (CEMIG), Pernambuco (Neoenergia/CELPE) e PARTE DO INTERIOR de São Paulo (CPFL Piratininga). Não cobre a capital paulista.",
    link: "LINK_AFILIADO_JUNTOS_AQUI",
  },
];

const contentData: ToolContentData = {
  directAnswer:
    "A energia solar por assinatura permite economizar na conta de luz sem investir em painéis solares. Você seleciona seu estado e a ferramenta mostra quais empresas parceiras atendem sua região, com o consumo mínimo exigido e o link para simulação.",
  howItWorks:
    "O modelo de energia solar por assinatura funciona assim: uma empresa parceira instala e mantém os painéis solares em um parque solar compartilhado, sem custo de obra para você. A energia gerada é injetada na rede e abatida na sua fatura, gerando créditos que reduzem o valor da conta de luz. A portabilidade e a adesão são feitas pela própria empresa parceira — você só precisa fazer um cadastro simples, e a empresa cuida de toda a burocracia com a distribuidora. Após a adesão, você passa a receber duas contas por mês: (1) a conta normal da distribuidora (Enel, CEMIG, CPFL, Light, etc.), que continua incluindo impostos e a taxa de iluminação pública, mas com o valor de energia já reduzido pelos créditos solares; e (2) uma nova fatura da empresa de energia solar (Órigo, Desperta, Nextron ou Juntos), cobrando pela energia limpa fornecida. Somando as duas contas, o total combinado costuma ser menor do que o valor que você pagava antes, só com a distribuidora. A elegibilidade depende do seu estado (cada empresa atende UFs específicas) e do seu consumo médio mensal, que determina se o modelo é viável para o seu perfil.",
  example: {
    title: "Descobrindo qual empresa atende seu estado",
    steps: [
      "Selecione seu estado no dropdown acima (ex: São Paulo).",
      "A ferramenta filtra automaticamente as empresas que atendem sua UF.",
      "Compare consumo mínimo, observações e clique no link da empresa para simular.",
      "Se nenhuma empresa atender, uma mensagem indica que não há cobertura no momento.",
    ],
    result: "Você descobre em segundos quais opções de energia solar por assinatura estão disponíveis para a sua região.",
  },
  infoBlocks: [
    {
      title: "Energia Solar por Assinatura para Empresas, Indústrias e Produtores Rurais",
      paragraphs: [
        "O modelo de energia solar por assinatura não é exclusivo para residências - empresas de todos os portes, indústrias e produtores rurais também podem contratar, geralmente com condições específicas para pessoa jurídica (PJ). A Nextron Energia, por exemplo, tem uma parceria confirmada com a Famasul (Federação da Agricultura e Pecuária de Mato Grosso do Sul), atendendo mais de 12.000 produtores rurais associados aos sindicatos rurais do estado. Comércios, fábricas, galpões e propriedades rurais com consumo de energia elevado costumam ter ainda mais a ganhar com esse modelo, já que o desconto é aplicado sobre um valor de conta maior.",
        "Para empresas de médio e grande porte com consumo em ALTA TENSÃO (geralmente acima de 500 kW de demanda contratada), existe ainda uma opção diferente: o Mercado Livre de Energia (Ambiente de Contratação Livre - ACL), que permite negociar diretamente com geradoras e comercializadoras, com potencial de desconto ainda maior, mas exigindo um processo de migração mais técnico e assessoria especializada. Esse modelo é distinto da energia solar por assinatura e costuma valer a pena para consumidores industriais de grande porte, com estrutura para lidar com a complexidade regulatória envolvida.",
        "Se sua empresa é de pequeno ou médio porte (comércios, escritórios, pequenas indústrias, propriedades rurais), a energia solar por assinatura tende a ser o caminho mais simples e rápido para começar a economizar, sem bucracia de migração de mercado.",
      ],
    },
  ],
  faqs: [
    {
      question: "Preciso instalar painéis solares na minha casa?",
      answer:
        "Não. No modelo de energia solar por assinatura, os painéis ficam em um parque solar compartilhado. Você não precisa de obras, telhado próprio nem investimento inicial.",
    },
    {
      question: "Funciona para quem mora de aluguel ou em apartamento?",
      answer:
        "Sim. Como a energia é gerada em um parque solar remoto e abatida na sua fatura, não importa se você mora em casa ou apartamento, próprio ou alugado — desde que a conta de luz esteja no seu nome.",
    },
    {
      question: "Qual é o consumo mínimo para participar?",
      answer:
        "Varia por empresa. A Órigo Energia exige a partir de 300 kWh/mês, a Juntos Energia aceita contas acima de R$ 150/mês e a Nextron pede contas acima de R$ 200/mês. Confira o consumo mínimo de cada empresa no resultado da busca.",
    },
    {
      question: "Todos os estados brasileiros são atendidos?",
      answer:
        "Não. A cobertura varia por empresa e por distribuidora de energia. Use o seletor de estado para verificar quais empresas parceiras atendem sua UF. Novas empresas e regiões são adicionadas com frequência.",
    },
    {
      question: "Qual é a economia média na conta de luz?",
      answer:
        "A economia depende do seu consumo e da empresa escolhida, mas o modelo costuma gerar reduções entre 15% e 30% no valor da fatura. A simulação com a empresa parceira fornece uma estimativa personalizada.",
    },
    {
      question: "Vou receber uma conta só, ou duas contas separadas?",
      answer:
        "Na maioria dos casos, você recebe duas contas: a da sua distribuidora normal (com impostos e taxas, mas com o valor de energia reduzido pelos créditos solares) e a fatura da empresa de energia solar contratada. Somando as duas, o valor total costuma ser menor do que você pagava antes, só com a distribuidora. A portabilidade em si é feita pela própria empresa parceira — você só precisa se cadastrar.",
    },
    {
      question: "Os links são de afiliado? Eu pago a mais por isso?",
      answer:
        "Sim, os links são de afiliado. Você não paga nenhum valor a mais por usar nossos links — o preço da simulação e do serviço é o mesmo. A comissão é paga pela empresa parceira, sem custo adicional para você.",
    },
    {
      question: "Minha empresa/indústria/propriedade rural pode contratar energia solar por assinatura?",
      answer:
        "Sim. Diversas empresas parceiras oferecem planos específicos para pessoa jurídica (PJ), incluindo comércios, indústrias e produtores rurais. A Nextron Energia, por exemplo, tem parceria confirmada com a Famasul, atendendo milhares de produtores rurais no Mato Grosso do Sul. Empresas com consumo muito alto (alta tensão, geralmente acima de 500 kW) também podem considerar o Mercado Livre de Energia como alternativa, que é um modelo diferente e mais indicado para grandes indústrias com estrutura para negociação direta.",
    },
  ],
};

export function EconomiaEnergiaSolar({ onBack }: { onBack: () => void }) {
  const [estadoSelecionado, setEstadoSelecionado] = useState<string>("");

  const empresasDisponiveis = useMemo(() => {
    if (!estadoSelecionado) return [];
    return EMPRESAS_ENERGIA_SOLAR.filter((empresa) => empresa.estados.includes(estadoSelecionado));
  }, [estadoSelecionado]);

  return (
    <ToolLayout
      title="Economia com Energia Solar"
      emoji="☀️"
      category="Casa"
      description="Descubra quais empresas de energia solar por assinatura atendem seu estado e compare consumo mínimo e condições."
      onBack={onBack}
      slug="economia-energia-solar"
      content={<ToolContent data={contentData} toolName="Economia com Energia Solar" category="Casa" />}
    >
      <div className="space-y-6">
        {/* State selector */}
        <div>
          <label htmlFor="estado-solar" className="flex items-center gap-2 text-sm font-semibold text-white mb-2">
            <MapPin className="w-4 h-4 text-green-400" />
            Selecione seu estado
          </label>
          <select
            id="estado-solar"
            value={estadoSelecionado}
            onChange={(e) => setEstadoSelecionado(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-green-400/50 focus:ring-1 focus:ring-green-400/30 transition-colors"
          >
            <option value="" className="bg-gray-800">Escolha um estado...</option>
            {ESTADOS_BR.map((estado) => (
              <option key={estado.sigla} value={estado.sigla} className="bg-gray-800">
                {estado.sigla} — {estado.nome}
              </option>
            ))}
          </select>
        </div>

        {/* Results */}
        {estadoSelecionado && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-green-400" />
              <h2 className="text-sm font-semibold text-white">
                {empresasDisponiveis.length > 0
                  ? `${empresasDisponiveis.length} ${empresasDisponiveis.length === 1 ? "empresa disponível" : "empresas disponíveis"} para ${estadoSelecionado}`
                  : `Nenhuma empresa disponível para ${estadoSelecionado}`}
              </h2>
            </div>

            {empresasDisponiveis.length > 0 ? (
              <div className="space-y-3">
                {empresasDisponiveis.map((empresa) => (
                  <div
                    key={empresa.nome}
                    className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5"
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <h3 className="text-base font-bold text-white">{empresa.nome}</h3>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-400/10 border border-green-400/20 text-xs font-semibold text-green-400 whitespace-nowrap">
                        <CheckCircle2 className="w-3 h-3" />
                        Atende {estadoSelecionado}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider mt-0.5 w-28 flex-shrink-0">
                          Consumo mínimo
                        </span>
                        <span className="text-sm text-gray-300">{empresa.consumoMinimo}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider mt-0.5 w-28 flex-shrink-0">
                          Observação
                        </span>
                        <span className="text-sm text-gray-400 leading-relaxed">{empresa.observacao}</span>
                      </div>
                    </div>

                    <a
                      href={empresa.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold transition-colors duration-200"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Simular com {empresa.nome}</span>
                    </a>
                    <p className="text-xs text-gray-500 mt-2">
                      Link de afiliado — você não paga a mais por isso
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-5 rounded-xl border border-white/10 bg-white/5">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      No momento, nenhuma parceira disponível atende seu estado. Novas empresas são adicionadas com frequência — volte em breve.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {!estadoSelecionado && (
          <div className="p-5 rounded-xl border border-white/10 bg-white/5">
            <p className="text-sm text-gray-400 leading-relaxed text-center">
              Selecione seu estado acima para ver quais empresas de energia solar por assinatura atendem sua região.
            </p>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
