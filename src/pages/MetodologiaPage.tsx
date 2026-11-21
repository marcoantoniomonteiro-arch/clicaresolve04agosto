import React from "react";
import { StaticPage } from "../components/StaticPage";
import { BookOpen, CheckCircle } from "lucide-react";

interface Props {
  onBack: () => void;
}

// Cada descrição confere com o código da ferramenta (revisado em 21/11/2026).
// Ao mudar uma fórmula numa ferramenta, atualize aqui também.
const METHODOLOGIES = [
  {
    category: "Saúde e Bem-Estar",
    tools: [
      { name: "IMC Avançada", source: "IMC = peso (kg) ÷ altura² (m), com a classificação de faixas da Organização Mundial da Saúde (OMS)." },
      { name: "Gasto Calórico", source: "Metabolismo basal pela equação de Mifflin-St Jeor (1990): 10 × peso + 6,25 × altura − 5 × idade, +5 para homens e −161 para mulheres. O gasto total multiplica o basal pelo fator de atividade (1,2 a 1,9)." },
      { name: "Frequência Cardíaca", source: "Frequência máxima estimada por 220 − idade. Se você informar a frequência de repouso, as zonas usam o método de Karvonen (reserva cardíaca); sem ela, são porcentagens da máxima (50% a 100%)." },
      { name: "Macronutrientes", source: "Divide as calorias pelo objetivo escolhido (emagrecer 40/35/25, manter 50/25/25, ganhar massa 55/25/20 de carboidrato/proteína/gordura) e converte em gramas com 4 kcal/g para carboidrato e proteína e 9 kcal/g para gordura." },
      { name: "Limite de Cafeína", source: "Limite diário de até 400 mg para adultos saudáveis (FDA e EFSA), ajustado para 3 mg por kg de peso quando esse valor é menor. A FAQ indica 200 mg/dia para gestantes (EFSA). Teores das bebidas são valores médios de referência." },
      { name: "Ciclos do Sono", source: "Ciclos de cerca de 90 minutos, somando 15 minutos para pegar no sono, para sugerir horários de dormir ou acordar entre ciclos." },
      { name: "DPP (Data Provável do Parto)", source: "Regra de Naegele: data da última menstruação + 7 dias − 3 meses + 1 ano, com a idade gestacional em semanas." },
      { name: "Período Fértil", source: "Método do calendário: ovulação estimada em (duração do ciclo − 14) dias após a menstruação e janela fértil de 5 dias antes até o dia da ovulação. Não é método contraceptivo." },
      { name: "Cronômetro de Contrações", source: "Registra a duração de cada contração e o intervalo entre elas. Não substitui a orientação médica." },
      { name: "Alerta de Água", source: "Lembretes em intervalos que você escolhe. A FAQ usa a referência geral de cerca de 35 ml de água por kg de peso por dia." },
    ],
  },
  {
    category: "Finanças e Empreendedorismo",
    tools: [
      { name: "Juros Compostos", source: "Fórmula M = C × (1 + i)^t, com aportes mensais opcionais." },
      { name: "Simulador de Markup", source: "Markup = 1 ÷ (1 − impostos% − comissão% − margem%); preço de venda = custo × markup. Avisa quando a soma das porcentagens chega a 100%." },
      { name: "Ponto de Equilíbrio", source: "Ponto de equilíbrio = custos fixos ÷ (preço − custo variável por unidade), em unidades e em faturamento." },
      { name: "Simulador de Financiamento", source: "Tabelas Price (parcelas iguais) e SAC (amortização constante), com juros compostos sobre o saldo devedor." },
      { name: "Conversor de Moedas", source: "Usa cotações de referência que não são atualizadas automaticamente. Você pode editar cada cotação com o valor do dia informado pelo seu banco." },
      { name: "Salário por Hora", source: "Horas por mês = horas por dia × dias por semana × 4,33. Valor da hora = salário ÷ horas por mês, com hora extra de 50% e desconto estimado do INSS." },
      { name: "Taxas de Maquininha", source: "Taxas de referência por modalidade (débito, crédito à vista e parcelado), que você ajusta para as taxas da sua maquininha. Calcula o valor líquido que você recebe, o valor de cada parcela e o prazo de recebimento." },
      { name: "Comparador de Preço", source: "Preço por unidade de medida (preço ÷ quantidade) para comparar embalagens de tamanhos diferentes." },
      { name: "Porcentagem Reversa e Desconto", source: "Fórmulas de porcentagem: valor original a partir do valor com desconto ou aumento, variação percentual e desconto em reais." },
      { name: "Álcool ou Gasolina", source: "Relação preço do etanol ÷ preço da gasolina, comparada com a regra prática de 70% (ou 70,4% considerando a gasolina com 32% de etanol), que reflete o menor rendimento do etanol." },
      { name: "Depreciação de Veículo", source: "Estimativa com taxa anual por tipo de veículo (de 10% a 15% ao ano). Não substitui a consulta à Tabela FIPE para o valor de mercado." },
      { name: "Divisor de Carona", source: "Custo da viagem = distância ÷ consumo × preço do combustível, mais pedágios, dividido pelo número de pessoas." },
    ],
  },
  {
    category: "Estudos e Trabalho",
    tools: [
      { name: "Simulador SISU", source: "Média ponderada das notas do ENEM com os pesos que você escolhe ou que o curso costuma usar. É uma simulação: a nota de corte real varia por instituição e edição." },
      { name: "Ciclo de Estudos e Pomodoro", source: "Distribui as horas da semana pelo peso de cada matéria; o Pomodoro usa blocos de foco e pausas (25/5 minutos por padrão, ajustáveis)." },
      { name: "Regra de Três", source: "Regra de três simples e inversa." },
      { name: "Horas Decimais", source: "Conversão minutos ÷ 60 (ex.: 1h30 = 1,5 h) e o caminho inverso." },
    ],
  },
  {
    category: "Casa",
    tools: [
      { name: "Calculadora de BTU", source: "Regra prática de 600 BTU por m², mais 600 BTU por pessoa além de duas e 400 BTU por aparelho eletrônico além do primeiro, arredondado para o modelo comercial mais próximo. Para projetos, consulte um instalador." },
      { name: "Calculadora de Tinta", source: "Litros = área a pintar × número de demãos ÷ rendimento da tinta (10 m²/L por padrão, ajustável conforme a lata)." },
      { name: "Consumo de Energia", source: "kWh = potência (W) × horas de uso por dia × dias ÷ 1.000; custo = kWh × tarifa informada." },
      { name: "Metros Quadrados", source: "Área = largura × comprimento, somando até 5 ambientes, com margem opcional para quebra de piso." },
    ],
  },
  {
    category: "Pet",
    tools: [
      { name: "Consumo de Ração", source: "Quantidade diária como porcentagem do peso do animal, conforme espécie e fase da vida, ajustada pelo nível de atividade. Confirme com o veterinário e com a embalagem da ração." },
      { name: "Carteirinha de Vacinas Pet", source: "Calendário de referência das vacinas mais comuns por espécie, com datas e reforços que você pode editar conforme a orientação do seu veterinário." },
    ],
  },
  {
    category: "Religioso",
    tools: [
      { name: "Cronologia Bíblica", source: "Linha do tempo com datas aproximadas usadas tradicionalmente por estudiosos; várias datas antigas são debatidas e aparecem como aproximadas." },
      { name: "Calendário Hebraico", source: "Conversão entre datas gregorianas e hebraicas pelas regras do calendário hebraico (meses lunares e anos bissextos de 13 meses)." },
      { name: "Fichamento SOAP", source: "Modelo de estudo bíblico em quatro partes: Escritura, Observação, Aplicação e Oração." },
    ],
  },
  {
    category: "Calendário e Tempo",
    tools: [
      { name: "Calendário de Feriados", source: "Feriados nacionais definidos em leis federais (incluindo o Dia da Consciência Negra, feriado nacional desde 2024) e pontos facultativos, com a Páscoa calculada pelo método tradicional." },
      { name: "Diferença entre Datas e Dias de Vida", source: "Contagem de dias pelo calendário gregoriano, considerando anos bissextos." },
    ],
  },
];

export function MetodologiaPage({ onBack }: Props) {
  return (
    <StaticPage
      title="Metodologia e Fontes Técnicas"
      description="Veja a fórmula e a fonte de cada calculadora do CLICAresolve: IMC, gasto calórico, juros compostos, BTU, DPP e outras."
      canonical="/metodologia"
      ogTitle="Metodologia e Fontes — CLICAresolve"
      ogDescription="A fórmula e a fonte de cada calculadora: OMS, Mifflin-St Jeor, Regra de Naegele, juros compostos e mais."
      onBack={onBack}
    >
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">📋</div>
        <h1 className="text-3xl font-black text-white mb-2">Metodologia e Fontes Técnicas</h1>
        <p className="text-sm text-gray-400">
          A fórmula usada em cada calculadora, conferida com o código da ferramenta
        </p>
      </div>

      <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20 mb-6">
        <p className="text-sm text-yellow-300">
          <strong>Nota importante:</strong> As ferramentas do CLICAresolve são instrumentos informativos e 
          não substituem aconselhamento profissional. Para decisões médicas, financeiras ou jurídicas, 
          consulte sempre um especialista qualificado.
        </p>
      </div>

      <div className="p-5 rounded-xl bg-green-400/5 border border-green-400/10 mb-6">
        <h2 className="text-lg font-bold text-white mb-3">Resumo das metodologias principais</h2>
        <ul className="space-y-2 text-sm text-gray-300">
          <li><strong>IMC:</strong> OMS</li>
          <li><strong>Gasto Calórico:</strong> Mifflin-St Jeor (1990)</li>
          <li><strong>DPP:</strong> Regra de Naegele</li>
          <li><strong>Frequência Cardíaca:</strong> 220 − idade e método de Karvonen</li>
          <li><strong>Juros Compostos:</strong> M = C(1+i)^t</li>
          <li><strong>BTU:</strong> regra prática de 600 BTU/m²</li>
        </ul>
        <p className="text-xs text-gray-400 mt-3">
          Todos os cálculos são estimativas — consulte sempre um profissional habilitado.
        </p>
      </div>

      <div className="space-y-8">
        {METHODOLOGIES.map((section) => (
          <div key={section.category}>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-green-400" />
              <h2 className="text-lg font-bold text-white">{section.category}</h2>
            </div>
            <div className="space-y-2">
              {section.tools.map((tool) => (
                <div key={tool.name} className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-white">{tool.name}</p>
                      <p className="text-xs text-gray-400 mt-1 leading-relaxed">{tool.source}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-8 border-t border-white/10 mt-8">
        <p className="text-sm text-gray-500">
          CLICAresolve © {new Date().getFullYear()} — Encontrou um erro? Escreva para nós pela página de Contato.
        </p>
      </div>
    </StaticPage>
  );
}
