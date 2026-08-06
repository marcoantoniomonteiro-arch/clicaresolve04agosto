import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import React, { useState, useMemo } from "react";


import { Plus, Trash2, Check, Download } from "lucide-react";
import { ToolContent } from "../components/ToolContent";
import { CONFIG } from "../config";

interface Props {
  onBack: () => void;
}

interface Topico {
  id: number;
  nome: string;
  peso: number;
  concluido: boolean;
}

export function CalculadoraEdital({ onBack }: Props) {
  const [topicos, setTopicos] = useState<Topico[]>([]);
  const [novoTopico, setNovoTopico] = useState("");
  const [novoPeso, setNovoPeso] = useState(1);

  const addTopico = () => {
    if (!novoTopico.trim()) return;
    setTopicos((prev) => [
      ...prev,
      { id: Date.now(), nome: novoTopico.trim(), peso: novoPeso, concluido: false },
    ]);
    setNovoTopico("");
    setNovoPeso(1);
  };

  const removeTopico = (id: number) => {
    setTopicos((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleConcluido = (id: number) => {
    setTopicos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, concluido: !t.concluido } : t))
    );
  };

  const updatePeso = (id: number, peso: number) => {
    setTopicos((prev) => prev.map((t) => (t.id === id ? { ...t, peso } : t)));
  };

  const progresso = useMemo(() => {
    if (topicos.length === 0) return { percent: 0, concluidos: 0, total: 0 };
    const totalPeso = topicos.reduce((acc, t) => acc + t.peso, 0);
    const pesoConcluido = topicos
      .filter((t) => t.concluido)
      .reduce((acc, t) => acc + t.peso, 0);
    return {
      percent: totalPeso > 0 ? (pesoConcluido / totalPeso) * 100 : 0,
      concluidos: topicos.filter((t) => t.concluido).length,
      total: topicos.length,
    };
  }, [topicos]);

  const exportar = () => {
    const texto = topicos
      .map((t) => `${t.concluido ? "[x]" : "[ ]"} ${t.nome} (peso: ${t.peso})`)
      .join("\n");
    const blob = new Blob([texto], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "edital-checklist.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout
      title="Calculadora de Edital"
      emoji="📋"
      category="Estudos"
      description="Acompanhe seu progresso nos topicos do edital com peso e exportacao."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["livros concurso público"]} label="livros concurso público" />}
    
    >
      <div className="space-y-5">
        <div className="flex gap-3">
          <input
            type="text"
            value={novoTopico}
            onChange={(e) => setNovoTopico(e.target.value)}
            placeholder="Novo topico do edital"
            className="input-field flex-1"
            onKeyDown={(e) => e.key === "Enter" && addTopico()}
          />
          <select
            value={novoPeso}
            onChange={(e) => setNovoPeso(parseInt(e.target.value))}
            className="input-field w-20"
          >
            {[1, 2, 3, 4, 5].map((p) => (
              <option key={p} value={p}>
                Peso {p}
              </option>
            ))}
          </select>
          <button onClick={addTopico} className="btn-primary px-4">
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {topicos.length > 0 && (
          <>
            <div className="p-4 rounded-xl bg-white/5 border border-white/8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-400">Progresso</span>
                <span className="text-sm font-bold text-green-400">
                  {progresso.percent.toFixed(1)}%
                </span>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full transition-all duration-500"
                  style={{ width: `${progresso.percent}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {progresso.concluidos} de {progresso.total} topicos concluidos
              </p>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {topicos.map((t) => (
                <div
                  key={t.id}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                    t.concluido
                      ? "bg-green-500/10 border-green-500/30"
                      : "bg-white/5 border-white/8"
                  }`}
                >
                  <button
                    onClick={() => toggleConcluido(t.id)}
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                      t.concluido
                        ? "bg-green-500 border-green-500 text-black"
                        : "border-gray-500 hover:border-green-400"
                    }`}
                  >
                    {t.concluido && <Check className="w-4 h-4" />}
                  </button>
                  <span
                    className={`flex-1 text-sm ${
                      t.concluido ? "text-green-400 line-through" : "text-white"
                    }`}
                  >
                    {t.nome}
                  </span>
                  <select
                    value={t.peso}
                    onChange={(e) => updatePeso(t.id, parseInt(e.target.value))}
                    className="input-field w-16 text-center text-xs"
                  >
                    {[1, 2, 3, 4, 5].map((p) => (
                      <option key={p} value={p}>
                        {p}x
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => removeTopico(t.id)}
                    className="text-gray-500 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={exportar}
              className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-400 hover:border-white/20 hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Exportar Checklist
            </button>
          </>
        )}
      </div>
      <ToolContent
        toolName="Calculadora de Edital"
        category="Estudos"
        data={{
          directAnswer: "Com notas de 80 (matérias A e B) e 70 (matérias C e D) e pesos 2,1,2,1, a nota final é 76.7. A fórmula é: Σ (nota × peso) / Σ pesos.",
          howItWorks: "A ferramenta simula a nota final de um concurso público com base nas notas de cada matéria e seus pesos. A fórmula: nota final = Σ (nota × peso) / Σ pesos. O usuário adiciona cada matéria do edital, informa a nota e o peso. A ferramenta calcula em tempo real: nota final, nota mínima necessária para aprovação e mostra um gráfico de barras com o desempenho por matéria. A nota final é apresentada com cor: verde (aprovado), vermelho (reprovado) ou amarelo (próximo do limite). A ferramenta também permite exportar o resultado em PDF para acompanhamento. É ideal para simular provas de concurso, vestibulares e avaliações com pesos diferentes.",
          example: {
            title: "Exemplo: concurso com 4 matérias, pesos 2,1,2,1",
            steps: [
              "Adicione matéria 'Direito Constitucional' com nota 80 e peso 2",
              "Adicione matéria 'Direito Administrativo' com nota 75 e peso 1",
              "Adicione matéria 'Direito Penal' com nota 70 e peso 2",
              "Adicione matéria 'Direito Processual' com nota 65 e peso 1",
              "Calcula: (80×2 + 75×1 + 70×2 + 65×1) / 6 = 73,3"
            ],
            result: "Nota final: 73,3. Se a nota de corte for 70, o candidato está aprovado. O gráfico mostra que Constitucional e Penal são as áreas mais fortes.",
          },
          outboundLinks: [
            { label: "Concursos Públicos - Portal da Transparência", url: "https://www.gov.br/transparencia/pt-br", source: "Gov.br" }
          ],
          faqs: [
            { question: "Como calcular nota de concurso?", answer: "Adicione cada matéria com sua nota e peso. A ferramenta calcula a média ponderada: Σ (nota × peso) / Σ pesos." },
            { question: "O que são pesos de matéria?", answer: "São multiplicadores que indicam a importância de cada matéria no edital. Matéria com peso 2 vale o dobro de uma com peso 1." },
            { question: "Nota final é média simples?", answer: "Somente quando todos os pesos são iguais. Se os pesos são diferentes, a nota final é ponderada. A ferramenta calcula automaticamente." },
            { question: "Como gabaritar concurso?", answer: "Estude as matérias de maior peso com mais intensidade. Use o simulador para identificar quanto precisa tirar em cada matéria para atingir a nota de corte." },
            { question: "Qual nota mínima para concurso?", answer: "Varia por edital. Geralmente: nota mínima por matéria (ex: 5/10) e nota mínima final (ex: 60/100). Consulte o edital do concurso desejado." },
          ],
        }}
      />
    </ToolLayout>
  );
}
