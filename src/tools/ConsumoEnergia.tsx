import React, { useState } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { CONFIG } from "../config";
import { Plus, Trash2 } from "lucide-react";

interface Props { onBack: () => void; }

interface Aparelho {
  id: number;
  nome: string;
  potencia: string;
  horas: string;
  dias: string;
}

let nextId = 1;

export function ConsumoEnergia({ onBack }: Props) {
  const [tarifa, setTarifa] = useState("0.75");
  const [aparelhos, setAparelhos] = useState<Aparelho[]>([
    { id: nextId++, nome: "Geladeira", potencia: "150", horas: "24", dias: "30" },
  ]);
  const [result, setResult] = useState<null | { items: { nome: string; kwh: number; custo: number }[]; totalKwh: number; totalCusto: number }>(null);

  function addAparelho() {
    if (aparelhos.length >= 5) return;
    setAparelhos([...aparelhos, { id: nextId++, nome: "", potencia: "", horas: "", dias: "30" }]);
  }

  function updateAparelho(id: number, field: keyof Aparelho, value: string) {
    setAparelhos(aparelhos.map((a) => (a.id === id ? { ...a, [field]: value } : a)));
  }

  function removeAparelho(id: number) {
    if (aparelhos.length <= 1) return;
    setAparelhos(aparelhos.filter((a) => a.id !== id));
  }

  function calcular() {
    const t = parseFloat(tarifa.replace(",", ".")) || 0.75;
    const items = aparelhos
      .filter((a) => a.potencia && a.horas && a.dias)
      .map((a) => {
        const kwh = (parseFloat(a.potencia) * parseFloat(a.horas) * parseFloat(a.dias)) / 1000;
        return { nome: a.nome || "Aparelho", kwh, custo: kwh * t };
      });

    const totalKwh = items.reduce((s, i) => s + i.kwh, 0);
    const totalCusto = items.reduce((s, i) => s + i.custo, 0);
    setResult({ items, totalKwh, totalCusto });
  }

  const fmt = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <ToolLayout
      title="Consumo de Energia"
      emoji="💡"
      category="Utilidades"
      description="Saiba quanto cada aparelho gasta na sua conta de luz todo mês."
      onBack={onBack}
      affiliateBanner={
        <AffiliateBanner
          terms={["tomada inteligente", "medidor de consumo de energia"]}
          label="Economize energia"
          mercadoLivreTerms={["tomada inteligente wifi"]} mercadoLivreLabel="Encontre no Mercado Livre"
        />
      }
    >
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Tarifa de energia (R$/kWh)</span>
          <input type="number" value={tarifa} onChange={(e) => setTarifa(e.target.value)} placeholder="0.75" className="input-field max-w-xs" />
        </label>

        <div className="space-y-3">
          {aparelhos.map((a, i) => (
            <div key={a.id} className="p-3 rounded-xl bg-white/3 border border-white/8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-gray-400 font-medium">Aparelho {i + 1}</span>
                {aparelhos.length > 1 && (
                  <button onClick={() => removeAparelho(a.id)} className="text-gray-600 hover:text-red-400 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input value={a.nome} onChange={(e) => updateAparelho(a.id, "nome", e.target.value)} placeholder="Nome (ex: TV)" className="input-field col-span-2" />
                <input type="number" value={a.potencia} onChange={(e) => updateAparelho(a.id, "potencia", e.target.value)} placeholder="Potência (W)" className="input-field" />
                <input type="number" value={a.horas} onChange={(e) => updateAparelho(a.id, "horas", e.target.value)} placeholder="Horas/dia" className="input-field" />
                <input type="number" value={a.dias} onChange={(e) => updateAparelho(a.id, "dias", e.target.value)} placeholder="Dias/mês" className="input-field col-span-2" />
              </div>
            </div>
          ))}
        </div>

        {aparelhos.length < 5 && (
          <button onClick={addAparelho} className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors">
            <Plus className="w-4 h-4" /> Adicionar aparelho
          </button>
        )}

        <button onClick={calcular} className="btn-primary w-full">Calcular Consumo</button>

        {result && (
          <div className="mt-4 space-y-2">
            {result.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <div>
                  <p className="text-sm font-medium text-white">{item.nome}</p>
                  <p className="text-xs text-gray-500">{item.kwh.toFixed(2)} kWh/mês</p>
                </div>
                <span className="text-amber-400 font-semibold">{fmt(item.custo)}</span>
              </div>
            ))}
            <div className="flex items-center justify-between p-4 rounded-xl bg-green-500/10 border border-green-500/30">
              <div>
                <p className="text-sm font-medium text-white">Total Mensal</p>
                <p className="text-xs text-gray-400">{result.totalKwh.toFixed(2)} kWh</p>
              </div>
              <span className="text-2xl font-bold text-green-400">{fmt(result.totalCusto)}</span>
            </div>
          </div>
        )}
      </div>
      <ToolContent
        toolName="ConsumoEnergia"
        category="Transportes"
        data={{
          directAnswer: "Um ar-condicionado de 9.000 BTU ligado 8h/dia consome ~17.28 kWh/mês, custando aproximadamente R$ 14.70/mês (tarifa R$ 0.85/kWh).",
          howItWorks: "O simulador calcula o consumo de energia de cada aparelho com a fórmula: kWh/mês = (potência (W) × horas/dia × dias/mês) / 1000. O custo é: kWh × tarifa (R$/kWh). A ferramenta permite adicionar até 5 aparelhos e mostra o consumo individual e total. Para cada aparelho, informe nome, potência (W), horas de uso por dia e dias por mês. O resultado mostra: consumo de cada aparelho (kWh), custo individual e total. É ideal para identificar quais equipamentos mais pesam na conta de luz.",
          example: {
            title: "Exemplo: geladeira 150W + TV 100W + ar-condicionado 900W",
            steps: [
              "Adicione aparelho 1: Geladeira, 150W, 24h/dia, 30 dias",
              "Adicione aparelho 2: TV, 100W, 5h/dia, 30 dias",
              "Adicione aparelho 3: Ar-condicionado, 900W, 8h/dia, 30 dias",
              "Informe tarifa: R$ 0,85/kWh",
              "Calcula: geladeira 108 kWh (R$ 91,80), TV 15 kWh (R$ 12,75), ar 216 kWh (R$ 183,60)"
            ],
            result: "Total: 339 kWh/mês, custo mensal: R$ 288,15. O ar-condicionado é o item mais caro (63% da conta).",
          },
          faqs: [
            { question: "Como calcular consumo de energia?", answer: "Informe a potência (W), horas de uso por dia e dias por mês. A ferramenta calcula: kWh = (W × h × dias) / 1000." },
            { question: "Quanto gasta um ar-condicionado?", answer: "Um split de 9.000 BTU (≈ 900W) ligado 8h/dia consome ~216 kWh/mês. A R$ 0,85/kWh: ~R$ 184/mês. Inverter economiza 40-60%." },
            { question: "Como reduzir conta de luz?", answer: "Use lâmpadas LED, desligue aparelhos em stand-by, use ar-condicionado Inverter, mantenha geladeira longe do fogão e aproveite luz natural." },
            { question: "O que é kWh?", answer: "Kilowatt-hora é a unidade de energia elétrica consumida. 1 kWh = 1000 watts durante 1 hora. É a base da cobrança da conta de luz." },
            { question: "Qual tarifa de energia?", answer: "Varia por estado e concessionária. No Brasil: R$ 0,60 a R$ 1,20/kWh. Consulte sua conta de luz. A ferramenta usa R$ 0,75 como padrão." },
          ],
        }}
      />
    </ToolLayout>
  );
}
