import React, { useState } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { Plus, Trash2 } from "lucide-react";

interface Props { onBack: () => void; }

const BEBIDAS = [
  { id: "espresso", label: "Espresso (1 dose)", mg: 63 },
  { id: "coado", label: "Café coado (240ml)", mg: 95 },
  { id: "energetico", label: "Energético (250ml)", mg: 80 },
  { id: "cha_preto", label: "Chá preto (240ml)", mg: 47 },
  { id: "cha_verde", label: "Chá verde (240ml)", mg: 28 },
  { id: "cola", label: "Refrigerante cola (350ml)", mg: 34 },
  { id: "cappuccino", label: "Cappuccino (240ml)", mg: 75 },
];

interface Item { id: string; bebidaId: string; qtd: string; }
let nextId = 1;

export function LimiteCafeina({ onBack }: Props) {
  const [peso, setPeso] = useState("");
  const [items, setItems] = useState<Item[]>([{ id: String(nextId++), bebidaId: "coado", qtd: "1" }]);
  const [result, setResult] = useState<null | { total: number; limite: number; pct: number }>(null);

  function addItem() {
    setItems([...items, { id: String(nextId++), bebidaId: "coado", qtd: "1" }]);
  }

  function update(id: string, field: keyof Item, value: string) {
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  }

  function remove(id: string) {
    if (items.length <= 1) return;
    setItems(items.filter((i) => i.id !== id));
  }

  function calcular() {
    const p = parseFloat(peso.replace(",", ".")) || 70;
    const limite = Math.min(400, p * 3);
    const total = items.reduce((s, item) => {
      const bev = BEBIDAS.find((b) => b.id === item.bebidaId);
      return s + (bev ? bev.mg * (parseFloat(item.qtd) || 0) : 0);
    }, 0);
    setResult({ total, limite, pct: Math.min((total / limite) * 100, 120) });
  }

  function barColor(pct: number) {
    if (pct < 60) return "bg-green-400";
    if (pct < 85) return "bg-yellow-400";
    return "bg-red-500";
  }

  return (
    <ToolLayout
      title="Limite de Cafeína"
      emoji="☕"
      category="Saúde"
      description="Calcule o total de cafeína consumida e compare com o limite diário seguro."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["cafe especial", "garrafa termica"]} label="Para os amantes de café" />}
      disclaimer="Esta ferramenta é puramente informativa. Não substitui consulta médica ou diagnóstico profissional. Consulte sempre um profissional de saúde habilitado."
    >
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Peso (kg) — para calcular limite personalizado</span>
          <input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} placeholder="Ex: 70 (padrão)" className="input-field" />
        </label>

        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex gap-2 items-center">
              <select value={item.bebidaId} onChange={(e) => update(item.id, "bebidaId", e.target.value)} className="input-field flex-1">
                {BEBIDAS.map((b) => <option key={b.id} value={b.id}>{b.label} ({b.mg}mg)</option>)}
              </select>
              <input
                type="number"
                min="0"
                value={item.qtd}
                onChange={(e) => update(item.id, "qtd", e.target.value)}
                className="input-field w-20"
                placeholder="Qtd"
              />
              {items.length > 1 && (
                <button onClick={() => remove(item.id)} className="text-gray-600 hover:text-red-400 transition-colors shrink-0">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        <button onClick={addItem} className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors">
          <Plus className="w-4 h-4" /> Adicionar bebida
        </button>

        <button onClick={calcular} className="btn-primary w-full">Calcular Cafeína</button>

        {result && (
          <div className="space-y-3 mt-2">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-3xl font-black text-white">{result.total.toFixed(0)} mg</p>
                <p className="text-sm text-gray-400">de {result.limite.toFixed(0)} mg limite</p>
              </div>
              <p className={`text-xl font-bold ${result.pct >= 100 ? "text-red-400" : result.pct >= 80 ? "text-yellow-400" : "text-green-400"}`}>
                {result.pct.toFixed(0)}%
              </p>
            </div>
            <div className="h-4 rounded-full bg-white/10 overflow-hidden">
              <div
                className={`h-4 rounded-full transition-all duration-700 ${barColor(result.pct)}`}
                style={{ width: `${Math.min(result.pct, 100)}%` }}
              />
            </div>
            <p className="text-sm text-center">
              {result.total > result.limite
                ? <span className="text-red-400 font-semibold">Acima do limite! Reduza o consumo.</span>
                : result.pct >= 80
                ? <span className="text-yellow-400">Perto do limite. Fique atento.</span>
                : <span className="text-green-400">Dentro do limite seguro.</span>
              }
            </p>
          </div>
        )}
      </div>
      <ToolContent
        toolName="Limite de Cafeína"
        category="Saúde"
        data={{
          directAnswer: "O limite seguro de cafeína para a maioria dos adultos saudáveis é de até 400mg por dia, o equivalente a cerca de 4 xícaras de café.",
          howItWorks: "A ferramenta soma a quantidade de cafeína consumida ao longo do dia, considerando diferentes fontes (café, chá, energéticos, refrigerantes) e compara com o limite diário recomendado para o seu peso corporal. Também é possível ver o tempo estimado para a cafeína ser metabolizada, já que sua meia-vida no organismo é de cerca de 5 horas.",
          example: {
            title: "Exemplo: 3 xícaras de café + 1 lata de energético",
            steps: [
              "3 xícaras de café (95mg cada): 285mg",
              "1 lata de energético (80mg): 80mg",
              "Total consumido: 365mg",
              "Limite diário recomendado: 400mg",
            ],
            result: "Com 365mg consumidos, a pessoa está próxima do limite diário recomendado de 400mg, mas ainda dentro da faixa considerada segura.",
          },
          faqs: [
            { question: "Qual o limite seguro de cafeína por dia?", answer: "Para adultos saudáveis, até 400mg por dia é geralmente considerado seguro." },
            { question: "Quanto tempo a cafeína fica no organismo?", answer: "A meia-vida da cafeína é de cerca de 5 horas, podendo variar de pessoa para pessoa." },
            { question: "Gestantes podem consumir a mesma quantidade?", answer: "Não, recomenda-se limitar a cafeína a 200mg por dia durante a gravidez. Consulte um médico." },
            { question: "Quais alimentos além do café contêm cafeína?", answer: "Chá preto e verde, chocolate, refrigerantes tipo cola e bebidas energéticas também contêm cafeína." },
          ],
        }}
      />
    </ToolLayout>
  );
}
