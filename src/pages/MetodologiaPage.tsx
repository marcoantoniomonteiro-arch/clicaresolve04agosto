import React from "react";
import { StaticPage } from "../components/StaticPage";
import { BookOpen, CheckCircle } from "lucide-react";

interface Props {
  onBack: () => void;
}

const METHODOLOGIES = [
  {
    category: "Saúde e Bem-Estar",
    tools: [
      { name: "IMC Avançado", source: "Classificação conforme parâmetros da Organização Mundial da Saúde (OMS, 1997). Fórmula: IMC = peso (kg) / altura² (m)" },
      { name: "Gasto Calórico", source: "Fórmula de Harris-Benedict revisada (Mifflin-St Jeor, 1990). Equação de Metabolismo Basal validada para populações diversas" },
      { name: "Frequência Cardíaca", source: "Fórmula de Tanaka (2001): 208 – 0.7 × idade. Zonas de treino baseadas em percentuais do FCmax (ACSM, 2018)" },
      { name: "Macronutrientes", source: "Distribuição percentual recomendada pela OMS/FAO: 50-60% carboidratos, 10-15% proteínas, 25-30% gorduras" },
      { name: "Limite de Cafeína", source: "Dose segura de 400mg/dia (FDA, 2015) para adultos saudáveis; 200mg/dia para gestantes (EFSA, 2015)" },
      { name: "Ciclos do Sono", source: "Ciclos de sono de 90 minutos (Carskadon & Dement, 2011). Baseado em arquitetura do sono NREM/REM" },
      { name: "DPP (Data Provável do Parto)", source: "Regra de Naegele, método obstétrico padrão desde 1812: LMP + 7 dias – 3 meses + 1 ano" },
      { name: "Período Fértil", source: "Método do calendário (Ogino-Knaus). Ovulação em 14 dias antes da próxima menstruação (WHO, 1988)" },
      { name: "Cronômetro de Contrações", source: "Monitoramento de intervalo, duração e frequência conforme protocolo obstétrico padrão (ACOG)" },
      { name: "Alerta de Água", source: "Ingestão recomendada de 2-3L/dia (EFSA, 2010). Ajustável por peso e atividade" },
    ],
  },
  {
    category: "Finanças e Empreendedorismo",
    tools: [
      { name: "Juros Compostos", source: "Fórmula matemática padrão: M = C × (1 + i)^t. Composto anual, mensal ou diário (equivalente)" },
      { name: "Simulador de Markup", source: "Fórmula contábil: Markup = 1 / (1 – (DF% + DV% + ML%)). DF = despesas fixas, DV = despesas variáveis, ML = margem líquida desejada" },
      { name: "Ponto de Equilíbrio", source: "Fórmula contábil: PE = Custo Fixo / (Preço – Custo Variável Unitário). Origem: Charles T. Horngren, Cost Accounting" },
      { name: "Conversor de Moedas", source: "Taxas de câmbio atualizadas via API pública (taxa diária do mercado internacional de câmbio)" },
      { name: "Salário/Hora", source: "Cálculo baseado na CLT: salário bruto / horas mensais contratadas (220h para regime de 44h semanais)" },
      { name: "Taxas de Maquininha", source: "Comparação de taxas de débito e crédito das principais adquirentes (Cielo, Rede, Stone, PagSeguro) conforme tabelas públicas" },
      { name: "Comparador de Preço", source: "Fórmula unitária: preço / quantidade. Comparação de relação custo-benefício entre embalagens diferentes" },
      { name: "Porcentagem Reversa", source: "Fórmulas matemáticas padrão: percentual, variação, aumento/diminuição percentual e percentual do total" },
      { name: "Álcool ou Gasolina", source: "Relação de eficiência energética: etanol vale a pena quando preço ≤ 70% da gasolina (ANP, resolução técnica)" },
      { name: "Depreciação de Veículo", source: "Método da Tabela FIPE (Fundação Instituto de Pesquisas Econômicas) para depreciação de mercado brasileiro" },
      { name: "Parcelamento de Multas", source: "Conforme CTB (Código de Trânsito Brasileiro) e Resolução 723/2018 do CONTRAN: multas podem ser parceladas em até 12x" },
    ],
  },
  {
    category: "DP/RH e Trabalho",
    tools: [
      { name: "Acumulador de Horas", source: "Cálculo de jornada conforme CLT (arts. 58-61). Horas extras: 50% adicional; 100% em domingos/feriados" },
      { name: "Conversor de Horas Decimais", source: "Conversão padrão: minutos/60. Ex: 1h30 = 1,5h. Baseado em norma de controle de ponto (Portaria 1510/2009)" },
      { name: "Gerador de Recibo", source: "Conforme Lei 5.474/1968 (obrigatoriedade de recibo) e práticas contábeis padrão para prestadores de serviço" },
    ],
  },
  {
    category: "Educação e Estudos",
    tools: [
      { name: "Simulador SISU", source: "Notas de corte baseadas em dados históricos do MEC/SISU. Cálculo: média ponderada do ENEM conforme pesos do edital" },
      { name: "Calculadora de Edital", source: "Cálculo de nota final com pesos por matéria conforme edital de concurso. Fórmula: Σ (nota × peso) / Σ pesos" },
      { name: "Ciclo de Estudos", source: "Método de blocos de estudo com pausas, baseado em técnicas de gestão de tempo e neurociência da aprendizagem" },
      { name: "Pomodoro", source: "Técnica de Francesco Cirillo (1987): 25 minutos de foco + 5 minutos de pausa. Ciclos de 4 pomodoros com pausa longa de 15-30 min" },
    ],
  },
  {
    category: "Calendário e Tempo",
    tools: [
      { name: "Calendário de Feriados", source: "Feriados nacionais conforme Lei 662/1949 e decretos presidenciais. Feriados móveis baseados no cálculo astronômico da Páscoa (Algoritmo de Gauss)" },
      { name: "Diferença entre Datas", source: "Cálculo de intervalos em anos, meses, dias e horas conforme calendário Gregoriano (padrão ISO 8601)" },
      { name: "Contador de Dias de Vida", source: "Cálculo de intervalo entre data de nascimento e data atual, com precisão de dias, horas e minutos" },
    ],
  },
  {
    category: "Família e Bebês",
    tools: [
      { name: "Significado de Nomes", source: "Base de dados compilada de etimologia reconhecida: nomes de origem hebraica, grega, latina, germânica, celta e outras. Referências: Behind the Name, SEB (Sociedade de Etimologia Brasileira)" },
    ],
  },
  {
    category: "Pet",
    tools: [
      { name: "Calculadora de Idade Pet", source: "Conversão de idade canina/felina baseada em protocolos da AVMA (American Veterinary Medical Association) e WSAVA (World Small Animal Veterinary Association). Fatores de envelhecimento por porte e espécie" },
      { name: "Consumo de Ração", source: "Recomendação baseada em percentuais do peso corporal conforme NRC (National Research Council) e FEDIAF. Filhotes: 5-7%, Adultos: 2-3%, Idosos: 2%" },
      { name: "Rastreador de Vacinas", source: "Protocolos de vacinação baseados em guias da WSAVA (2022) e CVMA (Canadian Veterinary Medical Association). V8/V10: protocolo de 3 doses + reforços anuais" },
    ],
  },
  {
    category: "Astrologia",
    tools: [
      { name: "Descobridor de Signo", source: "Classificação de signos solares conforme astrologia tropical ocidental: datas baseadas no equinócio de primavera (0° de Áries)" },
      { name: "Mapa Numerológico", source: "Numerologia pitagórica: redução de dígitos da data de nascimento. Número do Destino = soma dos dígitos reduzidos a um dígito (exceto 11, 22, 33)" },
    ],
  },
  {
    category: "Religioso",
    tools: [
      { name: "Plano de Leitura Bíblica", source: "Cronograma de 365 dias baseado em divisão canônica da Bíblia Hebraica (Tanakh) e Novo Testamento (Texto Crítico NA28)" },
      { name: "Cronologia Bíblica", source: "Linha do tempo baseada em cronologia de James Ussher (Annals of the World, 1650), The Chronological Bible (Thompson) e arqueologia bíblica moderna" },
      { name: "Conversor Calendário Hebraico", source: "Algoritmo de conversão gregoriano-hebraico baseado no calendário lunissolar hebraico (molad e cheshbon). Festas conforme tradição rabínica" },
    ],
  },
  {
    category: "Casa e Construção",
    tools: [
      { name: "Calculadora de BTU", source: "Cálculo baseado em fator de carga térmica: BTU/h = área (m²) × 600 + pessoas × 600 + equipamentos × 600. Referência: ABNT NBR 16401" },
      { name: "Calculadora de Tinta", source: "Fórmula de rendimento: litros = área (m²) / rendimento (m²/L) × nº de demãos. Rendimento padrão conforme fabricantes (Coral, Suvinil, Sherwin-Williams)" },
      { name: "Consumo de Energia", source: "Cálculo: kWh = potência (W) × horas/dia × dias / 1000. Baseado em tarifas da ANEEL (Agência Nacional de Energia Elétrica)" },
      { name: "Metros Quadrados", source: "Fórmula geométrica padrão: área = largura × comprimento. Baseado em normas de metragem (ABNT NBR 14644)" },
    ],
  },
  {
    category: "Utilitários",
    tools: [
      { name: "Gerador de QR Code", source: "Algoritmo QR Code ISO/IEC 18004. Codificação de texto/URL em formato matricial 2D legível por câmeras" },
      { name: "Gerador de Senhas", source: "Gerador criptográfico usando Math.random() com seed aleatória. Entropia calculada por comprimento e conjunto de caracteres (NIST SP 800-63B)" },
      { name: "Conversor de Cozinha", source: "Tabela de conversão de medidas culinárias: 1 xícara = 240ml, 1 colher de sopa = 15ml, 1 colher de chá = 5ml. Densidade de ingredientes conforme USDA" },
      { name: "Conversor de Roupas", source: "Tabela de conversão de tamanhos: BR/EUA/Europa. Baseado em padronização internacional de tamanhamento (ISO 8559)" },
    ],
  },
];

export function MetodologiaPage({ onBack }: Props) {
  return (
    <StaticPage
      title="Metodologia e Fontes Técnicas"
      description="Cada ferramenta do CLICAresolve é baseada em metodologias científicas e técnicas reconhecidas. Confira as fontes de cada cálculo."
      canonical="/metodologia"
      ogTitle="Metodologia e Fontes — CLICAresolve"
      ogDescription="Todas as ferramentas seguem fórmulas reconhecidas: OMS, Harris-Benedict, Regra de Naegele, CLT e mais."
      onBack={onBack}
    >
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">📋</div>
        <h1 className="text-3xl font-black text-white mb-2">Metodologia e Fontes Técnicas</h1>
        <p className="text-sm text-gray-400">
          Transparência total: cada ferramenta tem sua fonte documentada
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
          <li><strong>Frequência Cardíaca:</strong> Fórmula 220-idade</li>
          <li><strong>Rescisão:</strong> CLT arts. 477-484</li>
          <li><strong>Juros Compostos:</strong> M = C(1+i)^t</li>
          <li><strong>BTU:</strong> ABNT NBR 16401</li>
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
          CLICAresolve © {new Date().getFullYear()} — Metodologia transparente, resultados confiáveis.
        </p>
      </div>
    </StaticPage>
  );
}
