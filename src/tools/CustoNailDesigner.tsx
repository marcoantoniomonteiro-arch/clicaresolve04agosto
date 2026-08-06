import React, { useState, useMemo, useCallback } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { Plus, Trash2, Calculator, Droplets } from "lucide-react";
import { ToolContent } from "../components/ToolContent";

interface Props {
  onBack: () => void;
}

interface Insumo {
  id: number;
  nome: string;
  custo: number;
  quantidade: number;
}

const INSUMOS_SUGERIDOS = [
  { nome: "Gel", custo: 0 },
  { nome: "Tips", custo: 0 },
  { nome: "Base", custo: 0 },
  { nome: "Top Coat", custo: 0 },
  { nome: "Lixa", custo: 0 },
  { nome: "Primer", custo: 0 },
  { nome: "Pó Decoração", custo: 0 },
];

export function CustoNailDesigner({ onBack }: Props) {
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [novoInsumo, setNovoInsumo] = useState("");
  const [novoCusto, setNovoCusto] = useState("");
  const [novaQtd, setNovaQtd] = useState("1");
  const [tempoMinutos, setTempoMinutos] = useState("60");
  const [valorHora, setValorHora] = useState("50");

  const addInsumo = useCallback(() => {
    if (!novoInsumo.trim()) return;
    setInsumos((prev) => [
      ...prev,
      {
        id: Date.now(),
        nome: novoInsumo.trim(),
        custo: parseFloat(novoCusto) || 0,
        quantidade: parseFloat(novaQtd) || 1,
      },
    ]);
    setNovoInsumo("");
    setNovoCusto("");
    setNovaQtd("1");
  }, [novoInsumo, novoCusto, novaQtd]);

  const removeInsumo = useCallback((id: number) => {
    setInsumos((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const addSugerido = (nome: string) => {
    if (insumos.find((i) => i.nome === nome)) return;
    setInsumos((prev) => [...prev, { id: Date.now(), nome, custo: 0, quantidade: 1 }]);
  };

  const updateInsumo = (id: number, field: "custo" | "quantidade", value: number) => {
    setInsumos((prev) => prev.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  const resultado = useMemo(() => {
    const custoInsumos = insumos.reduce((acc, i) => acc + i.custo * i.quantidade, 0);
    const minutos = parseInt(tempoMinutos) || 0;
    const hora = parseFloat(valorHora) || 0;
    const custoMaoDeObra = (minutos / 60) * hora;
    const precoMinimo = custoInsumos + custoMaoDeObra;
    const precoMargem = precoMinimo * 1.3;

    return {
      custoInsumos,
      custoMaoDeObra,
      precoMinimo,
      precoMargem,
    };
  }, [insumos, tempoMinutos, valorHora]);

  return (
    <ToolLayout
      title="Custo Nail Designer"
      emoji="💅"
      category="Utilidades"
      description="Calcule o custo real dos seus servicos de nail designer."
      onBack={onBack}
      affiliateBanner={
        <AffiliateBanner
          terms={["kit alongamento unhas", "gel para unhas", "lampada uv nail"]}
          label="Materiais para nail"
          shopeeTerms={["kit unhas gel"]} shopeeLabel="Ver na Shopee"
        />
      }
    >
      <div className="space-y-5">
        <div className="p-4 rounded-xl bg-white/5 border border-white/8">
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="w-4 h-4 text-gray-400" />
            <p className="text-xs text-gray-400">Insumos Rapidos</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {INSUMOS_SUGERIDOS.filter((s) => !insumos.find((i) => i.nome === s.nome)).map((s) => (
              <button
                key={s.nome}
                onClick={() => addSugerido(s.nome)}
                className="px-2 py-1 rounded bg-white/5 text-xs text-gray-400 hover:bg-white/10"
              >
                + {s.nome}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <input
            type="text"
            value={novoInsumo}
            onChange={(e) => setNovoInsumo(e.target.value)}
            placeholder="Nome do insumo"
            className="input-field"
            onKeyDown={(e) => e.key === "Enter" && addInsumo()}
          />
          <input
            type="number"
            value={novoCusto}
            onChange={(e) => setNovoCusto(e.target.value)}
            placeholder="Custo unit."
            className="input-field"
          />
          <input
            type="number"
            value={novaQtd}
            onChange={(e) => setNovaQtd(e.target.value)}
            placeholder="Qtd"
            className="input-field"
          />
        </div>

        {insumos.length > 0 && (
          <div className="space-y-2">
            {insumos.map((i) => (
              <div
                key={i.id}
                className="flex items-center gap-2 p-2 rounded-lg bg-white/5"
              >
                <span className="flex-1 text-sm text-white">{i.nome}</span>
                <input
                  type="number"
                  value={i.custo}
                  onChange={(e) => updateInsumo(i.id, "custo", parseFloat(e.target.value) || 0)}
                  className="input-field w-20 text-center text-xs"
                  placeholder="R$"
                />
                <input
                  type="number"
                  value={i.quantidade}
                  onChange={(e) => updateInsumo(i.id, "quantidade", parseFloat(e.target.value) || 0)}
                  className="input-field w-16 text-center text-xs"
                />
                <span className="text-xs text-gray-400 w-16 text-right">
                  R$ {(i.custo * i.quantidade).toFixed(2)}
                </span>
                <button
                  onClick={() => removeInsumo(i.id)}
                  className="text-gray-500 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-xs text-gray-400 mb-1 block">Tempo (minutos)</span>
            <input
              type="number"
              value={tempoMinutos}
              onChange={(e) => setTempoMinutos(e.target.value)}
              className="input-field"
            />
          </label>
          <label className="block">
            <span className="text-xs text-gray-400 mb-1 block">Valor/hora desejado</span>
            <input
              type="number"
              value={valorHora}
              onChange={(e) => setValorHora(e.target.value)}
              className="input-field"
            />
          </label>
        </div>

        <div className="p-4 rounded-xl bg-pink-500/10 border border-pink-500/20">
          <div className="flex items-center gap-2 mb-3">
            <Calculator className="w-4 h-4 text-pink-400" />
            <p className="text-xs text-pink-400 font-semibold">Precificacao</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Custo insumos</span>
              <span className="text-white">R$ {resultado.custoInsumos.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Mao de obra</span>
              <span className="text-white">R$ {resultado.custoMaoDeObra.toFixed(2)}</span>
            </div>
            <div className="border-t border-white/10 pt-2 flex justify-between">
              <span className="text-sm font-semibold text-gray-300">Preco minimo</span>
              <span className="font-bold text-white">R$ {resultado.precoMinimo.toFixed(2)}</span>
            </div>
            <div className="flex justify-between bg-white/5 rounded p-2">
              <span className="text-sm font-semibold text-pink-400">Com margem 30%</span>
              <span className="font-bold text-pink-400">R$ {resultado.precoMargem.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      <ToolContent
        toolName="Custo Nail Designer"
        category="Utilidades"
        data={{
          directAnswer: "O custo de um atendimento de nail designer é calculado somando o valor dos materiais utilizados, o tempo de trabalho e a margem de lucro desejada pela profissional.",
          howItWorks: "A ferramenta ajuda a precificar corretamente os serviços de nail design, considerando o custo dos materiais usados (esmalte, produtos, descartáveis), o tempo gasto no atendimento, custos fixos do espaço de trabalho, e a margem de lucro desejada, evitando que a profissional cobre um valor abaixo do que realmente cobre seus custos e gera lucro.",
          example: {
            title: "Exemplo: precificando um alongamento em gel",
            steps: [
              "Custo de materiais: R$ 15",
              "Tempo de trabalho: 2 horas",
              "Valor da hora de trabalho desejado: R$ 25/hora = R$ 50",
              "Preço sugerido: R$ 15 + R$ 50 = R$ 65 (antes da margem de lucro)",
            ],
            result: "Considerando materiais e tempo de trabalho, o preço mínimo para cobrir custos do alongamento em gel seria R$ 65, antes de aplicar a margem de lucro desejada.",
          },
          faqs: [
            { question: "Por que é importante calcular o custo antes de definir o preço?", answer: "Para garantir que o valor cobrado cubra todos os gastos (materiais, tempo, espaço) e ainda gere lucro, evitando trabalhar no prejuízo sem perceber." },
            { question: "Devo incluir o aluguel do espaço no cálculo?", answer: "Sim, se você paga aluguel ou usa um espaço compartilhado, esse custo fixo deve ser diluído entre os atendimentos realizados no mês." },
            { question: "Como definir minha margem de lucro ideal?", answer: "Isso varia conforme a região e o mercado, mas uma margem comum no setor de beleza costuma ficar entre 30% e 50% sobre o custo total." },
            { question: "Preciso recalcular o preço sempre que o preço dos materiais mudar?", answer: "Sim, é recomendado revisar a precificação periodicamente, especialmente quando há aumento significativo no custo dos materiais utilizados." },
          ],
        }}
      />
    </ToolLayout>
  );
}
