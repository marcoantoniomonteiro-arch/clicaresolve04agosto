import React, { useState, useMemo } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { Users, Beer, Flame } from "lucide-react";
import { ToolContent } from "../components/ToolContent";

interface Props {
  onBack: () => void;
}

export function CalculadoraChurrasco({ onBack }: Props) {
  const [homens, setHomens] = useState("10");
  const [mulheres, setMulheres] = useState("10");
  const [criancas, setCriancas] = useState("5");

  const resultado = useMemo(() => {
    const h = parseInt(homens) || 0;
    const m = parseInt(mulheres) || 0;
    const c = parseInt(criancas) || 0;

    const totalPessoas = h + m + c;
    const adultos = h + m;

    const picanha = (h * 0.15 + m * 0.1 + c * 0.05);
    const frango = (h * 0.1 + m * 0.1 + c * 0.08);
    const linguica = (h * 0.1 + m * 0.08 + c * 0.05);
    const totalCarne = picanha + frango + linguica;

    const carvao = Math.ceil(totalPessoas / 3);

    const cerveja = adultos * 3;
    const refrigerante = Math.ceil(totalPessoas / 3);

    const paoAlho = Math.ceil(totalPessoas * 0.5);

    return {
      totalPessoas,
      adultos,
      carnes: {
        picanha: picanha.toFixed(2),
        frango: frango.toFixed(2),
        linguica: linguica.toFixed(2),
        totalCarne: totalCarne.toFixed(2),
      },
      carvao,
      bebidas: {
        cerveja,
        refrigerante,
      },
      acompanhamentos: {
        paoAlho,
      },
    };
  }, [homens, mulheres, criancas]);

  return (
    <ToolLayout
      title="Calculadora de Churrasco"
      emoji="🥩"
      category="Utilidades"
      description="Calcule a quantidade de carne, carvao e bebidas para seu churrasco."
      onBack={onBack}
      affiliateBanner={
        <AffiliateBanner
          terms={["grelha churrasco", "kit churrasco", "espeto churrasco"]}
          label="Itens para seu churrasco"
        />
      }
    >
      <div className="space-y-5">
        <div className="grid grid-cols-3 gap-3">
          <label className="block">
            <span className="text-xs text-gray-400 mb-1 block">Homens</span>
            <input
              type="number"
              min="0"
              value={homens}
              onChange={(e) => setHomens(e.target.value)}
              className="input-field text-center"
            />
          </label>
          <label className="block">
            <span className="text-xs text-gray-400 mb-1 block">Mulheres</span>
            <input
              type="number"
              min="0"
              value={mulheres}
              onChange={(e) => setMulheres(e.target.value)}
              className="input-field text-center"
            />
          </label>
          <label className="block">
            <span className="text-xs text-gray-400 mb-1 block">Criancas</span>
            <input
              type="number"
              min="0"
              value={criancas}
              onChange={(e) => setCriancas(e.target.value)}
              className="input-field text-center"
            />
          </label>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/8 text-center">
          <Users className="w-5 h-5 text-gray-400 mx-auto mb-1" />
          <p className="text-3xl font-black text-white">{resultado.totalPessoas}</p>
          <p className="text-xs text-gray-400">pessoas ({resultado.adultos} adultos)</p>
        </div>

        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
          <div className="flex items-center gap-2 mb-3">
            <Flame className="w-4 h-4 text-red-400" />
            <p className="text-xs text-red-400 font-semibold">Carnes</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Picanha</span>
              <span className="text-white font-semibold">{resultado.carnes.picanha} kg</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Frango</span>
              <span className="text-white font-semibold">{resultado.carnes.frango} kg</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Linguica</span>
              <span className="text-white font-semibold">{resultado.carnes.linguica} kg</span>
            </div>
            <div className="border-t border-white/10 pt-2 flex justify-between">
              <span className="text-sm font-semibold text-gray-300">Total de carne</span>
              <span className="font-bold text-red-400">{resultado.carnes.totalCarne} kg</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <Flame className="w-4 h-4 text-amber-400 mb-2" />
            <p className="text-2xl font-bold text-white">{resultado.carvao} kg</p>
            <p className="text-xs text-gray-400">Carvao</p>
          </div>
          <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
            <span className="text-2xl">🍞</span>
            <p className="text-2xl font-bold text-white">{resultado.acompanhamentos.paoAlho}</p>
            <p className="text-xs text-gray-400">Paes de alho</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <div className="flex items-center gap-2 mb-3">
            <Beer className="w-4 h-4 text-blue-400" />
            <p className="text-xs text-blue-400 font-semibold">Bebidas</p>
          </div>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-white">{resultado.bebidas.cerveja}</p>
              <p className="text-xs text-gray-400">Latas de cerveja</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{resultado.bebidas.refrigerante}L</p>
              <p className="text-xs text-gray-400">Refrigerante</p>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-white/5 text-xs text-gray-500">
          <p className="font-semibold text-gray-400 mb-1">Calculo por pessoa (picanha + frango + linguica):</p>
          <p>Homens: 350g carne, Mulheres: 280g, Criancas: 180g</p>
          <p>Cerveja: 3 latas/adulto, Refri: 1L/3 pessoas</p>
          <p>Carvao: 1kg/3 pessoas</p>
        </div>
      </div>
      <ToolContent
        toolName="Calculadora de Churrasco"
        category="Lazer"
        data={{
          directAnswer: "A ferramenta soma três tipos de carne (picanha, frango e linguiça) usando uma média fixa por pessoa: 350g por homem, 280g por mulher e 180g por criança.",
          howItWorks: "A ferramenta calcula, separadamente para homens, mulheres e crianças, a quantidade de picanha, frango e linguiça necessária, somando tudo em um total de carne. Na prática, isso equivale a uma média de 350g por homem, 280g por mulher e 180g por criança. O carvão é calculado com base no número total de convidados — aproximadamente 1kg de carvão para cada 3 pessoas, independentemente da quantidade de carne. As bebidas seguem a mesma lógica de contagem por pessoa: 3 latas de cerveja por adulto e 1 litro de refrigerante para cada 3 convidados.",
          example: {
            title: "Exemplo: churrasco para 10 homens, 10 mulheres e 5 crianças (25 pessoas)",
            steps: [
              "Convidados: 10 homens, 10 mulheres e 5 crianças (25 pessoas, 20 adultos)",
              "Carne: 10 × 350g (homens) + 10 × 280g (mulheres) + 5 × 180g (crianças) ≈ 7,2kg de picanha, frango e linguiça",
              "Carvão: 25 pessoas ÷ 3 ≈ 9kg (1kg a cada 3 convidados)",
              "Bebidas: 60 latas de cerveja (3 por adulto) e 9L de refrigerante",
            ],
            result: "Para esse grupo, a ferramenta sugere cerca de 7,2kg de carne no total, 9kg de carvão, 60 latas de cerveja e 9L de refrigerante.",
          },
          faqs: [
            { question: "Quanto de carne por pessoa é o ideal?", answer: "A ferramenta usa uma média fixa por grupo: 350g por homem, 280g por mulher e 180g por criança, somando picanha, frango e linguiça." },
            { question: "Crianças contam a mesma quantidade que adultos?", answer: "Não. Na fórmula desta calculadora, cada criança consome cerca de 180g no total, valor próximo à metade da média entre homem (350g) e mulher (280g)." },
            { question: "Quanto carvão é necessário?", answer: "A ferramenta calcula aproximadamente 1kg de carvão para cada 3 convidados, com base no número de pessoas — não na quantidade de carne." },
            { question: "A ferramenta considera diferentes tipos de carne?", answer: "Sim. O total é dividido automaticamente entre picanha, frango e linguiça, em proporções diferentes para homens, mulheres e crianças. Não é possível escolher outros cortes ou ajustar essas proporções manualmente." },
          ],
        }}
      />
    </ToolLayout>
  );
}
