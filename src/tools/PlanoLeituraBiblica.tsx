import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import React, { useState, useEffect, useMemo, useCallback } from "react";


import { Book, Check, Share2, RotateCcw } from "lucide-react";
import { ToolContent } from "../components/ToolContent";

interface Props {
  onBack: () => void;
}

const STORAGE_KEY = "leitura-biblica-progresso";

// Plano simplificado - 365 dias com ~3-4 capitulos por dia
const generatePlano = (): { dia: number; livro: string; capitulos: string }[] => {
  const plano: { dia: number; livro: string; capitulos: string }[] = [];

  const livros = [
    { nome: "Genesis", caps: 50 },
    { nome: "Exodo", caps: 40 },
    { nome: "Levitico", caps: 27 },
    { nome: "Numeros", caps: 36 },
    { nome: "Deuteronomio", caps: 34 },
    { nome: "Josue", caps: 24 },
    { nome: "Juizes", caps: 21 },
    { nome: "Rute", caps: 4 },
    { nome: "1 Samuel", caps: 31 },
    { nome: "2 Samuel", caps: 24 },
    { nome: "1 Reis", caps: 22 },
    { nome: "2 Reis", caps: 25 },
    { nome: "1 Cronicas", caps: 29 },
    { nome: "2 Cronicas", caps: 36 },
    { nome: "Esdras", caps: 10 },
    { nome: "Neemias", caps: 13 },
    { nome: "Ester", caps: 10 },
    { nome: "Job", caps: 42 },
    { nome: "Salmos", caps: 150 },
    { nome: "Proverbios", caps: 31 },
    { nome: "Eclesiastes", caps: 12 },
    { nome: "Canticos", caps: 8 },
    { nome: "Isaias", caps: 66 },
    { nome: "Jeremias", caps: 52 },
    { nome: "Lamentacoes", caps: 5 },
    { nome: "Ezequiel", caps: 48 },
    { nome: "Daniel", caps: 12 },
    { nome: "Oseias", caps: 14 },
    { nome: "Joel", caps: 3 },
    { nome: "Amos", caps: 9 },
    { nome: "Obadias", caps: 1 },
    { nome: "Jonas", caps: 4 },
    { nome: "Miqueias", caps: 7 },
    { nome: "Naum", caps: 3 },
    { nome: "Habacuque", caps: 3 },
    { nome: "Sofonias", caps: 3 },
    { nome: "Ageu", caps: 2 },
    { nome: "Zacarias", caps: 14 },
    { nome: "Malaquias", caps: 4 },
    { nome: "Mateus", caps: 28 },
    { nome: "Marcos", caps: 16 },
    { nome: "Lucas", caps: 24 },
    { nome: "Joao", caps: 21 },
    { nome: "Atos", caps: 28 },
    { nome: "Romanos", caps: 16 },
    { nome: "1 Corintios", caps: 16 },
    { nome: "2 Corintios", caps: 13 },
    { nome: "Galatas", caps: 6 },
    { nome: "Efesios", caps: 6 },
    { nome: "Filipenses", caps: 4 },
    { nome: "Colossenses", caps: 4 },
    { nome: "1 Tessalonicenses", caps: 5 },
    { nome: "2 Tessalonicenses", caps: 3 },
    { nome: "1 Timoteo", caps: 6 },
    { nome: "2 Timoteo", caps: 4 },
    { nome: "Tito", caps: 3 },
    { nome: "Filemom", caps: 1 },
    { nome: "Hebreus", caps: 13 },
    { nome: "Tiago", caps: 5 },
    { nome: "1 Pedro", caps: 5 },
    { nome: "2 Pedro", caps: 3 },
    { nome: "1 Joao", caps: 5 },
    { nome: "2 Joao", caps: 1 },
    { nome: "3 Joao", caps: 1 },
    { nome: "Judas", caps: 1 },
    { nome: "Apocalipse", caps: 22 },
  ];

  let dia = 1;
  let livroIdx = 0;
  let capAtual = 1;

  while (dia <= 365 && livroIdx < livros.length) {
    const livro = livros[livroIdx];
    const capsRestantes = livro.caps - capAtual + 1;

    if (capsRestantes <= 3) {
      plano.push({
        dia,
        livro: livro.nome,
        capitulos: `${capAtual}-${livro.caps}`,
      });
      livroIdx++;
      capAtual = 1;
    } else {
      const ate = Math.min(capAtual + 2, livro.caps);
      plano.push({
        dia,
        livro: livro.nome,
        capitulos: `${capAtual}-${ate}`,
      });
      capAtual = ate + 1;
    }
    dia++;
  }

  return plano;
};

const PLANO = generatePlano();

export function PlanoLeituraBiblica({ onBack }: Props) {
  const [concluidos, setConcluidos] = useState<Record<number, boolean>>({});
  const [diaAtual, setDiaAtual] = useState(1);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setConcluidos(data.concluidos || {});
        setDiaAtual(data.diaAtual || 1);
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ concluidos, diaAtual }));
  }, [concluidos, diaAtual]);

  const toggleDia = useCallback((dia: number) => {
    setConcluidos((prev) => ({ ...prev, [dia]: !prev[dia] }));
  }, []);

  const progresso = useMemo(() => {
    const concluido = Object.values(concluidos).filter(Boolean).length;
    return { total: 365, concluido, percent: (concluido / 365) * 100 };
  }, [concluidos]);

  const leituraDeHoje = useMemo(() => {
    return PLANO.find((p) => p.dia === diaAtual);
  }, [diaAtual]);

  const compartilhar = useCallback(() => {
    if (!leituraDeHoje) return;
    const texto = `📖 *Leitura Biblica do Dia ${diaAtual}*\n\n📚 ${leituraDeHoje.livro} ${leituraDeHoje.capitulos}\n\n_CLICAresolve - Ferramentas para o dia a dia_`;
    const url = `https://wa.me/?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank");
  }, [diaAtual, leituraDeHoje]);

  const resetar = useCallback(() => {
    if (confirm("Tem certeza que deseja reiniciar o plano?")) {
      setConcluidos({});
      setDiaAtual(1);
    }
  }, []);

  return (
    <ToolLayout
      title="Plano de Leitura Biblica"
      emoji="📖"
      category="Religioso"
      description="Plano de 365 dias para ler a Biblia inteira. Progresso salvo automaticamente."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["Bíblia leitura diária"]} label="Bíblia leitura diária" />}
    
    >
      <div className="space-y-5">
        <div className="p-4 rounded-xl bg-white/5 border border-white/8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Progresso Anual</span>
            <span className="text-sm font-bold text-green-400">{progresso.percent.toFixed(1)}%</span>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full transition-all duration-500"
              style={{ width: `${progresso.percent}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">{progresso.concluido} de {progresso.total} dias</p>
        </div>

        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-blue-400 font-semibold">Dia Atual</span>
            <span className="text-xs text-gray-400">({diaAtual}/365)</span>
          </div>
          {leituraDeHoje && (
            <>
              <div className="flex items-center gap-3">
                <Book className="w-6 h-6 text-blue-400" />
                <div className="flex-1">
                  <p className="text-lg font-bold text-white">{leituraDeHoje.livro}</p>
                  <p className="text-sm text-gray-400">Capitulos {leituraDeHoje.capitulos}</p>
                </div>
                <button
                  onClick={() => toggleDia(diaAtual)}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                    concluidos[diaAtual]
                      ? "bg-green-500 text-black"
                      : "bg-white/10 text-gray-400 hover:bg-white/20"
                  }`}
                >
                  <Check className="w-5 h-5" />
                </button>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={compartilhar}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-green-500/20 text-green-400 text-sm hover:bg-green-500/30 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  WhatsApp
                </button>
                <button
                  disabled={diaAtual <= 1}
                  onClick={() => setDiaAtual((d) => Math.max(1, d - 1))}
                  className="px-4 py-2 rounded-lg bg-white/10 text-gray-400 text-sm hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Anterior
                </button>
                <button
                  disabled={diaAtual >= 365}
                  onClick={() => setDiaAtual((d) => Math.min(365, d + 1))}
                  className="px-4 py-2 rounded-lg bg-white/10 text-gray-400 text-sm hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Proximo
                </button>
              </div>
            </>
          )}
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/8 max-h-64 overflow-y-auto">
          <p className="text-xs text-gray-400 mb-2">Historico</p>
          <div className="grid grid-cols-7 gap-1">
            {PLANO.slice(0, Math.max(diaAtual + 7, 35)).map((p) => (
              <button
                key={p.dia}
                onClick={() => setDiaAtual(p.dia)}
                className={`h-8 rounded text-xs font-medium transition-all ${
                  p.dia === diaAtual
                    ? "bg-blue-500 text-white"
                    : concluidos[p.dia]
                    ? "bg-green-500/30 text-green-400"
                    : "bg-white/5 text-gray-500 hover:bg-white/10"
                }`}
              >
                {p.dia}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={resetar}
          className="w-full text-sm text-gray-500 hover:text-red-400 underline flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-3 h-3" />
          Reiniciar Plano
        </button>
      </div>
      <ToolContent
        toolName="Plano de Leitura Bíblica"
        category="Religioso"
        data={{
          directAnswer: "Um plano de leitura bíblica organiza a leitura da Bíblia em um período determinado (como 1 ano), dividindo os capítulos em doses diárias administráveis.",
          howItWorks: "A ferramenta divide o total de capítulos da Bíblia em um cronograma diário, permitindo que a pessoa complete a leitura de toda a Bíblia (ou de livros específicos) dentro do prazo desejado, sem sobrecarregar com uma quantidade excessiva de leitura em um único dia.",
          example: {
            title: "Exemplo: plano de leitura da Bíblia completa em 1 ano",
            steps: [
              "Total de capítulos da Bíblia: 1.189",
              "Período do plano: 365 dias",
              "Média diária: aproximadamente 3-4 capítulos por dia",
              "Progresso: acompanhamento diário de capítulos lidos",
            ],
            result: "Seguindo uma média de 3-4 capítulos por dia, é possível completar a leitura de toda a Bíblia em 1 ano.",
          },
          faqs: [
            { question: "Quanto tempo leva para ler a Bíblia inteira?", answer: "Seguindo uma média de 3-4 capítulos por dia, é possível completar a leitura em aproximadamente 1 ano." },
            { question: "Posso seguir um plano só do Novo Testamento?", answer: "Sim, muitos planos são organizados especificamente para o Novo Testamento, que é mais curto e pode ser lido em poucos meses." },
            { question: "O que fazer se eu atrasar no plano de leitura?", answer: "A maioria dos planos permite retomar de onde parou ou ajustar o ritmo, sem prejuízo ao objetivo final de completar a leitura." },
            { question: "Existe uma ordem recomendada para ler a Bíblia?", answer: "Existem diferentes abordagens: ordem cronológica dos eventos, ordem tradicional dos livros, ou planos temáticos — a escolha depende do objetivo do leitor." },
          ],
        }}
      />
    </ToolLayout>
  );
}
