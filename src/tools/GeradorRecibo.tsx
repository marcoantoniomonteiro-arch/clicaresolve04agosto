import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import React, { useState, useMemo } from "react";


import { FileText, Printer, Download } from "lucide-react";

interface Props {
  onBack: () => void;
}

export function GeradorRecibo({ onBack }: Props) {
  const [pagadorNome, setPagadorNome] = useState("");
  const [pagadorDoc, setPagadorDoc] = useState("");
  const [recebedorNome, setRecebedorNome] = useState("");
  const [recebedorDoc, setRecebedorDoc] = useState("");
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState(new Date().toISOString().split("T")[0]);

  const valorExtenso = useMemo(() => {
    const num = parseFloat(valor) || 0;
    if (num === 0) return "";

    const unidades = ["", "um", "dois", "tres", "quatro", "cinco", "seis", "sete", "oito", "nove"];
    const dezADezenove = ["dez", "onze", "doze", "treze", "quatorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"];
    const dezenas = ["", "", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
    const centenas = ["", "cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"];

    const extenso = (n: number): string => {
      if (n === 0) return "";
      if (n < 10) return unidades[n];
      if (n < 20) return dezADezenove[n - 10];
      if (n < 100) return dezenas[Math.floor(n / 10)] + (n % 10 ? " e " + unidades[n % 10] : "");
      if (n === 100) return "cem";
      return centenas[Math.floor(n / 100)] + (n % 100 ? " e " + extenso(n % 100) : "");
    };

    const reais = Math.floor(num);
    const centavos = Math.round((num - reais) * 100);

    let resultado = "";
    if (reais > 0) {
      if (reais === 1) resultado = "um real";
      else if (reais < 1000) resultado = extenso(reais) + " reais";
      else {
        const milhares = Math.floor(reais / 1000);
        const resto = reais % 1000;
        if (milhares === 1) resultado = "mil";
        else resultado = extenso(milhares) + " mil";
        if (resto > 0) resultado += " e " + extenso(resto);
        resultado += " reais";
      }
    }

    if (centavos > 0) {
      if (reais > 0) resultado += " e ";
      if (centavos === 1) resultado += "um centavo";
      else resultado += extenso(centavos) + " centavos";
    }

    return resultado;
  }, [valor]);

  const valorFormatado = useMemo(() => {
    const num = parseFloat(valor) || 0;
    return num.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }, [valor]);

  const podeImprimir = pagadorNome && recebedorNome && valor && data;

  const imprimir = () => {
    window.print();
  };

  return (
    <ToolLayout
      title="Gerador de Recibo"
      emoji="📄"
      category="DP/RH"
      description="Gere recibos formatados prontos para imprimir."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["bloco recibo fiscal"]} label="bloco recibo fiscal" />}
    
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-xs text-gray-400 mb-1 block">Pagador (nome)</span>
            <input
              type="text"
              value={pagadorNome}
              onChange={(e) => setPagadorNome(e.target.value)}
              placeholder="Nome do pagador"
              className="input-field"
            />
          </label>
          <label className="block">
            <span className="text-xs text-gray-400 mb-1 block">CPF/CNPJ (opcional)</span>
            <input
              type="text"
              value={pagadorDoc}
              onChange={(e) => setPagadorDoc(e.target.value)}
              placeholder="000.000.000-00"
              className="input-field"
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-xs text-gray-400 mb-1 block">Recebedor (nome)</span>
            <input
              type="text"
              value={recebedorNome}
              onChange={(e) => setRecebedorNome(e.target.value)}
              placeholder="Nome do recebedor"
              className="input-field"
            />
          </label>
          <label className="block">
            <span className="text-xs text-gray-400 mb-1 block">CPF (opcional)</span>
            <input
              type="text"
              value={recebedorDoc}
              onChange={(e) => setRecebedorDoc(e.target.value)}
              placeholder="000.000.000-00"
              className="input-field"
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-xs text-gray-400 mb-1 block">Valor (R$)</span>
            <input
              type="number"
              step="0.01"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="0,00"
              className="input-field"
            />
          </label>
          <label className="block">
            <span className="text-xs text-gray-400 mb-1 block">Data</span>
            <input
              type="date"
              value={data}
              onChange={(e) => setData(e.target.value)}
              className="input-field"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-xs text-gray-400 mb-1 block">Descricao do servico</span>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Ex: Servicos de consultoria prestados em junho/2026"
            className="input-field w-full h-20 resize-none p-3"
          />
        </label>

        {podeImprimir && (
          <button
            onClick={imprimir}
            className="w-full p-3 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 font-semibold flex items-center justify-center gap-2 hover:bg-blue-500/30 transition-colors"
          >
            <Printer className="w-4 h-4" />
            Imprimir / Salvar PDF
          </button>
        )}

        {podeImprimir && (
          <div className="print:block hidden print:pt-8">
            <div className="max-w-2xl mx-auto bg-white text-black p-8 border border-gray-300 rounded-lg">
              <div className="text-center border-b-2 border-black pb-4 mb-6">
                <h1 className="text-2xl font-bold">RECIBO</h1>
                <p className="text-sm text-gray-600 mt-1">Nº {Date.now()}</p>
              </div>

              <div className="space-y-6">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Valor: <strong className="text-lg">{valorFormatado}</strong></p>
                </div>

                <div className="border-l-4 border-gray-300 pl-4">
                  <p className="text-sm leading-relaxed">
                    Recebi de <strong>{pagadorNome}</strong>
                    {pagadorDoc && <span>, CPF/CNPJ: {pagadorDoc}</span>}, a quantia de <strong>{valorExtenso}</strong> ({valorFormatado}), referente a:
                  </p>
                  <p className="mt-2 font-semibold">{descricao || "Servicos prestados"}</p>
                </div>

                <div className="mt-8">
                  <p className="text-sm text-gray-600 mb-1">Local e data</p>
                  <p className="font-semibold">{new Date(data).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}</p>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-300">
                  <div className="text-center">
                    <p className="border-t border-black pt-2 inline-block px-16">
                      {recebedorNome}
                    </p>
                    {recebedorDoc && <p className="text-sm text-gray-600">CPF: {recebedorDoc}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <p className="text-xs text-gray-500 text-center">
          Clique em "Imprimir" e selecione "Salvar como PDF" para guardar o recibo
        </p>
      </div>
    </ToolLayout>
  );
}
