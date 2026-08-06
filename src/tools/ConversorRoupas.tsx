import React, { useState } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";

interface Props {
  onBack: () => void;
}

type Category = "feminino" | "masculino" | "calcado";

const FEMININO_TABLE = [
  { br: "PP", brNum: "36", usa: "XS", eu: "32", china: "155-160/80-84" },
  { br: "P", brNum: "38", usa: "S", eu: "34", china: "160-165/84-88" },
  { br: "M", brNum: "40", usa: "M", eu: "36", china: "165-170/88-92" },
  { br: "G", brNum: "42", usa: "L", eu: "38", china: "170-175/92-96" },
  { br: "GG", brNum: "44", usa: "XL", eu: "40", china: "175-180/96-100" },
  { br: "XGG", brNum: "46", usa: "XXL", eu: "42", china: "180-185/100-104" },
];

const MASCULINO_TABLE = [
  { br: "PP", brNum: "38", usa: "XS", eu: "44", china: "160-165/80-84" },
  { br: "P", brNum: "40", usa: "S", eu: "46", china: "165-170/84-88" },
  { br: "M", brNum: "42", usa: "M", eu: "48", china: "170-175/88-92" },
  { br: "G", brNum: "44", usa: "L", eu: "50", china: "175-180/92-96" },
  { br: "GG", brNum: "46", usa: "XL", eu: "52", china: "180-185/96-100" },
  { br: "XGG", brNum: "48", usa: "XXL", eu: "54", china: "185-190/100-104" },
];

const CALCADO_TABLE = [
  { br: "33", usa: "4.5", eu: "34", china: "21" },
  { br: "34", usa: "5", eu: "35", china: "22" },
  { br: "35", usa: "5.5", eu: "36", china: "22.5" },
  { br: "36", usa: "6", eu: "37", china: "23" },
  { br: "37", usa: "7", eu: "38", china: "24" },
  { br: "38", usa: "7.5", eu: "39", china: "24.5" },
  { br: "39", usa: "8.5", eu: "40", china: "25" },
  { br: "40", usa: "9", eu: "41", china: "25.5" },
  { br: "41", usa: "10", eu: "42", china: "26" },
  { br: "42", usa: "10.5", eu: "43", china: "26.5" },
  { br: "43", usa: "11", eu: "44", china: "27" },
  { br: "44", usa: "12", eu: "45", china: "28" },
];

export function ConversorRoupas({ onBack }: Props) {
  const [category, setCategory] = useState<Category>("feminino");

  const getTable = () => {
    if (category === "feminino") return FEMININO_TABLE;
    if (category === "masculino") return MASCULINO_TABLE;
    return CALCADO_TABLE;
  };

  const table = getTable();
  const isCalcado = category === "calcado";

  return (
    <ToolLayout
      title="Conversor de Roupas"
      emoji="👕"
      category="Utilidades"
      description="Converta tamanhos de roupas entre padroes BR, EUA, Europa e China."
      onBack={onBack}
      affiliateBanner={
        <AffiliateBanner
          terms={["guia de tamanhos roupas", "fitas metricas costura", "medidor de corpo"]}
          label="Facilite suas compras"
          shopeeTerms={["roupas femininas"]} shopeeLabel="Ver na Shopee"
        />
      }
    >
      <div className="space-y-5">
        <div className="grid grid-cols-3 gap-2">
          {(["feminino", "masculino", "calcado"] as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`p-3 rounded-xl border text-sm font-semibold transition-all ${
                category === cat
                  ? "bg-green-500/20 border-green-500/40 text-green-400"
                  : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20"
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-white/5">
                <th className="p-2 text-left text-green-400 font-semibold border border-white/10">BR</th>
                {!isCalcado && (
                  <th className="p-2 text-left text-gray-400 border border-white/10">BR Num.</th>
                )}
                <th className="p-2 text-left text-gray-400 border border-white/10">EUA</th>
                <th className="p-2 text-left text-gray-400 border border-white/10">Europa</th>
                <th className="p-2 text-left text-gray-400 border border-white/10">China</th>
              </tr>
            </thead>
            <tbody>
              {table.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors">
                  <td className="p-2 text-white font-semibold border border-white/5">
                    {isCalcado ? (row as any).br : (row as any).br}
                  </td>
                  {!isCalcado && (
                    <td className="p-2 text-gray-300 border border-white/5">
                      {(row as any).brNum}
                    </td>
                  )}
                  <td className="p-2 text-gray-300 border border-white/5">{row.usa}</td>
                  <td className="p-2 text-gray-300 border border-white/5">{row.eu}</td>
                  <td className="p-2 text-gray-300 border border-white/5">{row.china}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-xs text-gray-500 text-center">
          Tamanhos aproximados. Podem variar entre marcas e fabricantes.
          Lojas como Shein, Shopee e AliExpress geralmente seguem o padrao da China.
        </p>
      </div>
      <ToolContent
        toolName="Conversor de Roupas"
        category="Utilidades"
        data={{
          directAnswer: "O tamanho de roupa equivalente entre países é obtido através de uma tabela de conversão entre os sistemas de numeração (Brasil, EUA, Europa, Reino Unido).",
          howItWorks: "Cada país usa um sistema de numeração diferente para tamanhos de roupas e calçados. A ferramenta cruza esses sistemas através de tabelas de equivalência padronizadas pela indústria da moda, permitindo saber, por exemplo, qual tamanho americano (S, M, L) corresponde a um tamanho brasileiro (40, 42, 44).",
          example: {
            title: "Exemplo: convertendo tamanho brasileiro 42 para o sistema americano",
            steps: [
              "Tamanho brasileiro: 42",
              "Categoria: Roupa feminina",
              "Tabela de equivalência aplicada",
              "Tamanho americano equivalente: M (Medium)",
            ],
            result: "O tamanho brasileiro 42 (roupa feminina) equivale aproximadamente ao tamanho M no sistema americano.",
          },
          faqs: [
            { question: "Os tamanhos são exatamente iguais entre marcas?", answer: "Não, a conversão é uma referência geral; cada marca pode ter uma modelagem ligeiramente diferente, então é sempre bom conferir a tabela específica da marca quando disponível." },
            { question: "A conversão funciona para calçados também?", answer: "Sim, calçados têm suas próprias tabelas de conversão entre os sistemas brasileiro, americano e europeu." },
            { question: "Por que os tamanhos variam tanto entre países?", answer: "Cada país desenvolveu seu próprio sistema de numeração ao longo do tempo, baseado em medidas antropométricas locais, o que gerou diferenças entre os sistemas." },
            { question: "Roupas infantis seguem a mesma tabela de conversão?", answer: "Não, tamanhos infantis geralmente seguem tabelas próprias baseadas em idade e altura da criança, diferentes das tabelas de roupas adultas." },
          ],
        }}
      />
    </ToolLayout>
  );
}
