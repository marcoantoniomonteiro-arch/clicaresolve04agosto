import React, { useState } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";

interface Props { onBack: () => void; }

interface Parcela {
  n: number;
  vencimento: string;
  valor: number;
}

export function ParcelamentoMultas({ onBack }: Props) {
  const [valorMulta, setValorMulta] = useState("");
  const [numParcelas, setNumParcelas] = useState("6");
  const [taxa, setTaxa] = useState("2.99");
  const [result, setResult] = useState<null | { parcela: number; total: number; juros: number; tabela: Parcela[] }>(null);

  function calcular() {
    const v = parseFloat(valorMulta.replace(",", "."));
    const n = parseInt(numParcelas);
    const t = parseFloat(taxa.replace(",", ".")) / 100;

    if (!v || !n || !t) return;

    const parcela = (v * (t * Math.pow(1 + t, n))) / (Math.pow(1 + t, n) - 1);
    const total = parcela * n;
    const juros = total - v;

    const hoje = new Date();
    const tabela: Parcela[] = Array.from({ length: n }, (_, i) => {
      const venc = new Date(hoje);
      venc.setMonth(venc.getMonth() + i + 1);
      return {
        n: i + 1,
        vencimento: venc.toLocaleDateString("pt-BR"),
        valor: parcela,
      };
    });

    setResult({ parcela, total, juros, tabela });
  }

  const fmt = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <ToolLayout
      title="Parcelamento de Multas"
      emoji="🚦"
      category="Finanças"
      description="Simule o parcelamento de multas de trânsito com juros e tabela de vencimentos."
      onBack={onBack}
      affiliateBanner={
        <AffiliateBanner
          terms={["curso legislacao transito", "livro CNH"]}
          label="Aprenda sobre trânsito"
        />
      }
      disclaimer="Simulação estimativa. Consulte o órgão emissor da multa para valores oficiais e condições reais de parcelamento."
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <label className="block col-span-2">
            <span className="text-sm text-gray-400 mb-1 block">Valor da Multa (R$)</span>
            <input type="number" value={valorMulta} onChange={(e) => setValorMulta(e.target.value)} placeholder="Ex: 293.47" className="input-field" />
          </label>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Nº de Parcelas</span>
            <select value={numParcelas} onChange={(e) => setNumParcelas(e.target.value)} className="input-field">
              {Array.from({ length: 11 }, (_, i) => i + 2).map((n) => (
                <option key={n} value={n}>{n}x</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Taxa de Juros (%/mês)</span>
            <input type="number" value={taxa} onChange={(e) => setTaxa(e.target.value)} placeholder="2.99" className="input-field" />
          </label>
        </div>

        <button onClick={calcular} className="btn-primary w-full">Simular Parcelamento</button>

        {result && (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-400">Parcela</p>
                <p className="text-lg font-bold text-green-400">{fmt(result.parcela)}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-400">Total a Pagar</p>
                <p className="text-lg font-bold text-white">{fmt(result.total)}</p>
              </div>
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-center">
                <p className="text-xs text-red-400">Total de Juros</p>
                <p className="text-lg font-bold text-red-400">{fmt(result.juros)}</p>
              </div>
            </div>

            <div className="max-h-64 overflow-y-auto rounded-xl border border-white/8">
              <table className="w-full text-sm">
                <thead className="bg-white/5 sticky top-0">
                  <tr>
                    <th className="text-left p-3 text-gray-400 font-medium">Parcela</th>
                    <th className="text-left p-3 text-gray-400 font-medium">Vencimento</th>
                    <th className="text-right p-3 text-gray-400 font-medium">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {result.tabela.map((p) => (
                    <tr key={p.n} className="border-t border-white/5 hover:bg-white/3">
                      <td className="p-3 text-white">{p.n}ª</td>
                      <td className="p-3 text-gray-300">{p.vencimento}</td>
                      <td className="p-3 text-right text-white font-medium">{fmt(p.valor)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
