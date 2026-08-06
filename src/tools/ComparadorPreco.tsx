import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import React, { useState, useMemo } from "react";


import { Plus, Trash2 } from "lucide-react";
import { ToolContent } from "../components/ToolContent";
import { CONFIG } from "../config";

interface Props {
  onBack: () => void;
}

interface Product {
  id: number;
  name: string;
  price: string;
  quantity: string;
  unit: "g" | "kg" | "ml" | "L";
}

const UNITS = ["g", "kg", "ml", "L"] as const;

export function ComparadorPreco({ onBack }: Props) {
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "", price: "", quantity: "", unit: "g" },
    { id: 2, name: "", price: "", quantity: "", unit: "g" },
  ]);

  const addProduct = () => {
    if (products.length >= 4) return;
    setProducts((prev) => [
      ...prev,
      { id: Date.now(), name: "", price: "", quantity: "", unit: "g" },
    ]);
  };

  const removeProduct = (id: number) => {
    if (products.length <= 2) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateProduct = (
    id: number,
    field: keyof Product,
    value: string
  ) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const results = useMemo(() => {
    const parsed = products.map((p) => {
      const price = parseFloat(p.price.replace(",", ".")) || 0;
      const qty = parseFloat(p.quantity.replace(",", ".")) || 0;
      let normalizedQty = qty;

      if (p.unit === "kg") normalizedQty = qty * 1000;
      else if (p.unit === "L") normalizedQty = qty * 1000;

      const unit = p.unit === "kg" ? "g" : p.unit === "L" ? "ml" : p.unit;
      const pricePerUnit = normalizedQty > 0 ? price / normalizedQty : Infinity;

      return {
        ...p,
        price,
        normalizedQty,
        unit,
        pricePerUnit,
        valid: price > 0 && qty > 0,
      };
    });

    const validItems = parsed.filter((p) => p.valid);
    if (validItems.length < 2) return null;

    const sorted = [...validItems].sort((a, b) => a.pricePerUnit - b.pricePerUnit);
    const cheapest = sorted[0];
    const mostExpensive = sorted[sorted.length - 1];

    return {
      items: parsed,
      cheapestId: cheapest.id,
      mostExpensiveId: mostExpensive.id,
    };
  }, [products]);

  return (
    <ToolLayout
      title="Comparador de Preco"
      emoji="⚖️"
      category="Financas"
      description="Compare precos e encontre o produto mais vantajoso."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["organizador compras lista"]} label="organizador compras lista" />}
    
    >
      <div className="space-y-4">
        {products.map((product, idx) => {
          const isCheapest = results?.cheapestId === product.id;
          const isMostExpensive = results?.mostExpensiveId === product.id;

          return (
            <div
              key={product.id}
              className={`p-4 rounded-xl border transition-all ${
                isCheapest
                  ? "bg-green-500/10 border-green-500/30"
                  : isMostExpensive
                  ? "bg-red-500/10 border-red-500/30"
                  : "bg-white/5 border-white/10"
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="text-gray-500 font-bold w-6">#{idx + 1}</span>
                <div className="flex-1 space-y-3">
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) => updateProduct(product.id, "name", e.target.value)}
                    placeholder="Nome do produto"
                    className="input-field"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Preco (R$)</label>
                      <input
                        type="number"
                        value={product.price}
                        onChange={(e) => updateProduct(product.id, "price", e.target.value)}
                        placeholder="0.00"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Quantidade</label>
                      <input
                        type="number"
                        value={product.quantity}
                        onChange={(e) => updateProduct(product.id, "quantity", e.target.value)}
                        placeholder="0"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1 block">Unidade</label>
                      <select
                        value={product.unit}
                        onChange={(e) => updateProduct(product.id, "unit", e.target.value as any)}
                        className="input-field"
                      >
                        {UNITS.map((u) => (
                          <option key={u} value={u}>
                            {u}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                {products.length > 2 && (
                  <button
                    onClick={() => removeProduct(product.id)}
                    className="text-gray-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {products.length < 4 && (
          <button
            onClick={addProduct}
            className="w-full p-3 rounded-xl border border-dashed border-white/20 text-gray-400 hover:border-white/40 hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Adicionar produto
          </button>
        )}

        {results && (
          <div className="p-4 rounded-xl bg-white/5 border border-white/8 space-y-3">
            {results.items
              .filter((p) => p.valid)
              .sort((a, b) => a.pricePerUnit - b.pricePerUnit)
              .map((item, idx) => {
                const isCheapest = item.id === results.cheapestId;
                const isExpensive = item.id === results.mostExpensiveId;
                return (
                  <div
                    key={item.id}
                    className={`p-3 rounded-lg ${
                      isCheapest
                        ? "bg-green-500/15 border border-green-500/30"
                        : isExpensive
                        ? "bg-red-500/15 border border-red-500/30"
                        : "bg-white/5"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-white">
                          {item.name || `Produto ${results.items.indexOf(item) + 1}`}
                        </p>
                        <p className="text-xs text-gray-400">
                          R$ {item.price.toFixed(2)} / {item.normalizedQty.toFixed(0)} {item.unit}
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-lg font-black ${
                            isCheapest ? "text-green-400" : isExpensive ? "text-red-400" : "text-white"
                          }`}
                        >
                          R$ {item.pricePerUnit.toFixed(4)}/{item.unit}
                        </p>
                        {isCheapest && (
                          <span className="text-xs text-green-400 font-semibold">MELHOR PRECO</span>
                        )}
                        {isExpensive && (
                          <span className="text-xs text-red-400 font-semibold">MAIS CARO</span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
      <ToolContent
        toolName="ComparadorPreco"
        category="Finanças"
        data={{
          directAnswer: "Comparando 2kg de arroz a R$ 12.00 (R$ 6.00/kg) vs 5kg a R$ 25.00 (R$ 5.00/kg), a embalagem de 5kg tem melhor custo-benefício.",
          howItWorks: "A ferramenta normaliza preços de diferentes embalagens para a mesma unidade base (g ou ml), calculando o preço por unidade. Compara até 4 produtos e identifica o mais barato (card verde) e o mais caro (card vermelho). Suporta unidades: g, kg, ml, L. A conversão automática: kg → g, L → ml. Cada produto é exibido em um card com borda colorida conforme a classificação. A ferramenta é ideal para compras no supermercado, farmácia e lojas online, onde embalagens de tamanhos diferentes confundem o consumidor.",
          example: {
            title: "Exemplo: arroz 2kg vs 5kg",
            steps: [
              "Adicione produto 1: 2kg, preço R$ 12,00",
              "Adicione produto 2: 5kg, preço R$ 25,00",
              "A ferramenta normaliza: 2kg = 2000g → R$ 12/2000g = R$ 0,006/g",
              "5kg = 5000g → R$ 25/5000g = R$ 0,005/g",
              "Exibe: produto 2 (5kg) como 'MELHOR PREÇO' (verde) e produto 1 como 'MAIS CARO' (vermelho)"
            ],
            result: "Produto 2 (5kg) é mais vantajoso: R$ 0,005/g vs R$ 0,006/g — economia de 17% por grama.",
          },
          glossary: [
            { term: "Preço por Unidade", definition: "Preço dividido pela quantidade em unidade base (g ou ml). Permite comparar embalagens de tamanhos diferentes." },
            { term: "Custo-Benefício", definition: "Relação entre o preço pago e a quantidade/qualidade recebida. Melhor custo-benefício = menor preço por unidade." }
          ],
          faqs: [
            { question: "Como comparar preço por kg?", answer: "A ferramenta faz isso automaticamente. Informe o preço e a quantidade (ex: 2kg, 500g). Ela converte para gramas e calcula o preço/g." },
            { question: "Qual embalagem compensa mais?", answer: "Geralmente, embalagens maiores têm menor preço por unidade. Mas nem sempre. Use a ferramenta para comparar exatamente." },
            { question: "Como calcular custo-benefício?", answer: "Divida o preço pela quantidade em unidade base (g, ml, L). Compare os valores. A ferramenta mostra visualmente qual é mais barato." },
            { question: "Como economizar no supermercado?", answer: "Compare preço por unidade, não apenas preço total. Compre embalagens maiores quando o preço/unidade for menor. Use a ferramenta antes de comprar." },
            { question: "Preço por unidade é confiável?", answer: "Sim, é a métrica mais justa para comparar produtos. Mas considere também: validade, qualidade, marca e se você vai usar todo o produto antes de vencer." },
          ],
        }}
      />
    </ToolLayout>
  );
}
