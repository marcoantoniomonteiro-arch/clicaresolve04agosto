import React, { useState, useMemo } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { Copy, Printer, Check, Plane } from "lucide-react";

interface Props {
  onBack: () => void;
}

type Clima = "praia" | "frio" | "ameno";
type TipoViagem = "trabalho" | "lazer" | "mochilao";

const ITENS_BASICOS = (dias: number) => [
  "Documentos (RG, passaporte, passagens)",
  "Carregador de celular",
  "Escova de dente e pasta",
  "Remédios pessoais",
  `Roupas íntimas (${dias} peças)`,
];

const ITENS_CLIMA: Record<Clima, string[]> = {
  praia: ["Protetor solar", "Óculos de sol", "Chinelo", "Roupa de banho", "Chapéu/boné"],
  frio: ["Casaco pesado", "Luvas", "Gorro", "Cachecol", "Meias térmicas"],
  ameno: ["Casaco leve", "Guarda-chuva", "Roupas em camadas"],
};

const ITENS_TIPO: Record<TipoViagem, string[]> = {
  trabalho: ["Notebook", "Roupa social", "Cartão de visita", "Adaptador de tomada"],
  lazer: ["Câmera fotográfica", "Jogos de viagem", "Snacks"],
  mochilao: ["Mochila cargueira", "Lanterna", "Kit primeiros socorros", "Garrafa de água reutilizável"],
};

const CATEGORIA_LABEL: Record<string, string> = {
  basicos: "Itens Básicos",
  clima: "Itens por Clima",
  tipo: "Itens por Tipo de Viagem",
};

export function GeradorListaBagagem({ onBack }: Props) {
  const [dias, setDias] = useState<number>(7);
  const [clima, setClima] = useState<Clima>("praia");
  const [tipo, setTipo] = useState<TipoViagem>("lazer");
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [copied, setCopied] = useState(false);

  const checklist = useMemo(() => {
    return [
      { categoria: "basicos", itens: ITENS_BASICOS(dias) },
      { categoria: "clima", itens: ITENS_CLIMA[clima] },
      { categoria: "tipo", itens: ITENS_TIPO[tipo] },
    ];
  }, [dias, clima, tipo]);

  const toggle = (item: string) => {
    setChecked((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const handleCopy = async () => {
    const lines: string[] = [`Lista de Bagagem — ${dias} dias`];
    checklist.forEach((group) => {
      lines.push(`\n${CATEGORIA_LABEL[group.categoria]}:`);
      group.itens.forEach((item) => {
        lines.push(`  ${checked[item] ? "[x]" : "[ ]"} ${item}`);
      });
    });
    await navigator.clipboard.writeText(lines.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => window.print();

  return (
    <ToolLayout
      title="Gerador de Lista de Bagagem"
      emoji="🧳"
      category="Lazer"
      description="Monte um checklist de bagagem personalizado conforme o clima, a duração e o tipo da sua viagem."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["lista bagagem"]} label="lista bagagem" />}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Duração da viagem (dias)</label>
            <input
              type="number"
              min={1}
              max={90}
              value={dias}
              onChange={(e) => setDias(Math.max(1, Math.min(90, Number(e.target.value) || 1)))}
              className="input-field text-sm"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Clima do destino</label>
            <select
              value={clima}
              onChange={(e) => setClima(e.target.value as Clima)}
              className="input-field text-sm"
            >
              <option value="praia">Praia / Calor</option>
              <option value="frio">Frio / Neve</option>
              <option value="ameno">Clima Ameno / Variado</option>
            </select>
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1 block">Tipo de viagem</label>
            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value as TipoViagem)}
              className="input-field text-sm"
            >
              <option value="trabalho">Trabalho</option>
              <option value="lazer">Lazer / Família</option>
              <option value="mochilao">Mochilão / Aventura</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2">
          <button onClick={handleCopy} className="btn-secondary flex-1 flex items-center justify-center gap-2 text-sm">
            <Copy className="w-4 h-4" />
            {copied ? "Copiado!" : "Copiar lista"}
          </button>
          <button onClick={handlePrint} className="btn-secondary flex-1 flex items-center justify-center gap-2 text-sm">
            <Printer className="w-4 h-4" />
            Imprimir
          </button>
        </div>

        <div className="space-y-4">
          {checklist.map((group) => (
            <div key={group.categoria}>
              <h3 className="text-sm font-bold text-white mb-2">{CATEGORIA_LABEL[group.categoria]}</h3>
              <div className="space-y-2">
                {group.itens.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <button
                      type="button"
                      onClick={() => toggle(item)}
                      className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                        checked[item]
                          ? "bg-green-400 border-green-400"
                          : "border-gray-500 hover:border-green-400"
                      }`}
                    >
                      {checked[item] && <Check className="w-3.5 h-3.5 text-black" />}
                    </button>
                    <span className={`text-sm ${checked[item] ? "text-gray-500 line-through" : "text-gray-300"}`}>
                      {item}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-green-400/5 border border-green-400/10 text-center">
          <Plane className="w-5 h-5 text-green-400 mx-auto mb-1" />
          <p className="text-xs text-gray-400">
            {Object.values(checked).filter(Boolean).length} de {checklist.reduce((a, g) => a + g.itens.length, 0)} itens marcados
          </p>
        </div>
      </div>

      <ToolContent
        toolName="Lista de Bagagem"
        category="Lazer"
        data={{
          directAnswer: "A lista de bagagem é gerada combinando itens essenciais com itens específicos baseados no clima do destino e no tipo de viagem escolhidos, criando um checklist personalizado.",
          howItWorks: "A ferramenta combina três informações — duração da viagem, clima do destino e tipo de viagem — para montar uma checklist personalizada. Itens básicos (documentos, higiene pessoal) sempre estão presentes, e itens específicos são adicionados conforme o clima (roupas de frio, protetor solar) e o propósito da viagem (equipamento de trabalho, itens de aventura). Isso ajuda a não esquecer itens importantes e evita o excesso de bagagem desnecessária.",
          example: {
            title: "Exemplo: viagem de 5 dias, praia, lazer/família",
            steps: [
              "Duração: 5 dias",
              "Clima: Praia/Calor",
              "Tipo: Lazer/Família",
              "Lista gerada: itens básicos + protetor solar, óculos de sol, chinelo, roupa de banho + câmera fotográfica, jogos de viagem, snacks",
            ],
            result: "A checklist final combina o essencial com itens específicos para uma viagem de praia em família, pronta para conferir antes de fazer as malas.",
          },
          faqs: [
            { question: "A lista é completa para qualquer viagem?", answer: "A lista cobre os itens mais comuns baseados nas escolhas feitas, mas vale sempre revisar e adicionar itens pessoais específicos da sua viagem." },
            { question: "Posso marcar os itens conforme vou arrumando a mala?", answer: "Sim, cada item tem uma caixa de seleção para marcar como já incluído na bagagem." },
            { question: "Posso imprimir ou salvar a lista?", answer: "Sim, há opção de copiar ou imprimir a checklist gerada." },
            { question: "A quantidade de roupas é calculada pela duração da viagem?", answer: "Sim, itens como roupas íntimas são sugeridos proporcionalmente ao número de dias informado." },
          ],
        }}
      />
    </ToolLayout>
  );
}
