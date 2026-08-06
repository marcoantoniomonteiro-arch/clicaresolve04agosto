import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import React, { useState, useMemo } from "react";


import { Plus, Trash2, TrendingDown, TrendingUp, AlertTriangle } from "lucide-react";
import { ToolContent } from "../components/ToolContent";
import { CONFIG } from "../config";

interface Props {
  onBack: () => void;
}

interface Materia {
  id: number;
  nome: string;
  total: number;
  acertos: number;
}

export function MapeamentoErros({ onBack }: Props) {
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [novaMateria, setNovaMateria] = useState("");
  const [novoTotal, setNovoTotal] = useState("");
  const [novosAcertos, setNovosAcertos] = useState("");

  const addMateria = () => {
    if (!novaMateria.trim()) return;
    const total = parseInt(novoTotal) || 0;
    const acertos = parseInt(novosAcertos) || 0;
    setMaterias((prev) => [
      ...prev,
      { id: Date.now(), nome: novaMateria.trim(), total, acertos: Math.min(acertos, total) },
    ]);
    setNovaMateria("");
    setNovoTotal("");
    setNovosAcertos("");
  };

  const removeMateria = (id: number) => {
    setMaterias((prev) => prev.filter((m) => m.id !== id));
  };

  const updateMateria = (id: number, field: "total" | "acertos", value: number) => {
    setMaterias((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        const newTotal = field === "total" ? value : m.total;
        const newAcertos = field === "acertos" ? Math.min(value, newTotal) : m.acertos;
        return { ...m, total: newTotal, acertos: newAcertos };
      })
    );
  };

  const stats = useMemo(() => {
    if (materias.length === 0) return null;

    const comDados = materias.filter((m) => m.total > 0);
    if (comDados.length === 0) return null;

    const sorted = [...comDados].sort((a, b) => {
      const pctA = a.total > 0 ? (a.acertos / a.total) * 100 : 0;
      const pctB = b.total > 0 ? (b.acertos / b.total) * 100 : 0;
      return pctA - pctB;
    });

    const maisFraca = sorted[0];
    const maisForte = sorted[sorted.length - 1];

    const totalQuestoes = comDados.reduce((acc, m) => acc + m.total, 0);
    const totalAcertos = comDados.reduce((acc, m) => acc + m.acertos, 0);
    const mediaGeral = totalQuestoes > 0 ? (totalAcertos / totalQuestoes) * 100 : 0;

    return { sorted, maisFraca, maisForte, totalQuestoes, totalAcertos, mediaGeral };
  }, [materias]);

  return (
    <ToolLayout
      title="Mapeamento de Erros"
      emoji="📉"
      category="Estudos"
      description="Identifique suas materias mais fracas com base na taxa de acertos."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["caderno questões concurso"]} label="caderno questões concurso" />}
    
    >
      <div className="space-y-5">
        <div className="grid grid-cols-3 gap-3">
          <input
            type="text"
            value={novaMateria}
            onChange={(e) => setNovaMateria(e.target.value)}
            placeholder="Materia"
            className="input-field"
            onKeyDown={(e) => e.key === "Enter" && addMateria()}
          />
          <input
            type="number"
            value={novoTotal}
            onChange={(e) => setNovoTotal(e.target.value)}
            placeholder="Total"
            className="input-field"
          />
          <input
            type="number"
            value={novosAcertos}
            onChange={(e) => setNovosAcertos(e.target.value)}
            placeholder="Acertos"
            className="input-field"
          />
        </div>
        <button onClick={addMateria} className="btn-primary w-full">
          Adicionar Materia
        </button>

        {materias.length > 0 && (
          <div className="space-y-3">
            <div className="grid gap-2 max-h-48 overflow-y-auto">
              {materias.map((m) => {
                const pct = m.total > 0 ? (m.acertos / m.total) * 100 : 0;
                const isMaisFraca = stats?.maisFraca?.id === m.id;
                return (
                  <div
                    key={m.id}
                    className={`flex items-center gap-3 p-3 rounded-xl border ${
                      isMaisFraca
                        ? "bg-red-500/10 border-red-500/30"
                        : "bg-white/5 border-white/8"
                    }`}
                  >
                    <span className="flex-1 text-sm text-white">{m.nome}</span>
                    <input
                      type="number"
                      value={m.total}
                      onChange={(e) => updateMateria(m.id, "total", parseInt(e.target.value) || 0)}
                      className="input-field w-16 text-center text-xs"
                      placeholder="Total"
                    />
                    <input
                      type="number"
                      value={m.acertos}
                      onChange={(e) => updateMateria(m.id, "acertos", parseInt(e.target.value) || 0)}
                      className="input-field w-16 text-center text-xs"
                      placeholder="Acertos"
                    />
                    <span
                      className={`text-xs font-bold w-12 text-right ${
                        pct < 50 ? "text-red-400" : pct < 70 ? "text-yellow-400" : "text-green-400"
                      }`}
                    >
                      {pct.toFixed(0)}%
                    </span>
                    <button
                      onClick={() => removeMateria(m.id)}
                      className="text-gray-500 hover:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            {stats && (
              <>
                <div className="p-4 rounded-xl bg-white/5 border border-white/8">
                  <p className="text-xs text-gray-400 mb-3">Grafico de Acertos por Materia</p>
                  <div className="space-y-2">
                    {stats.sorted.map((m) => {
                      const pct = m.total > 0 ? (m.acertos / m.total) * 100 : 0;
                      const isMaisFraca = m.id === stats.maisFraca?.id;
                      return (
                        <div key={m.id} className="flex items-center gap-3">
                          <span className="text-xs text-gray-400 w-24 truncate">{m.nome}</span>
                          <div className="flex-1 h-5 bg-white/10 rounded relative overflow-hidden">
                            <div
                              className={`h-full rounded transition-all duration-500 ${
                                isMaisFraca
                                  ? "bg-red-500"
                                  : pct < 50
                                  ? "bg-orange-500"
                                  : pct < 70
                                  ? "bg-yellow-500"
                                  : "bg-green-500"
                              }`}
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-300 w-10 text-right">
                            {pct.toFixed(0)}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-center">
                    <AlertTriangle className="w-5 h-5 text-red-400 mx-auto mb-1" />
                    <p className="text-xs text-red-400">Mais Fraca</p>
                    <p className="text-sm font-bold text-red-400">{stats.maisFraca?.nome}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
                    <TrendingUp className="w-5 h-5 text-green-400 mx-auto mb-1" />
                    <p className="text-xs text-green-400">Mais Forte</p>
                    <p className="text-sm font-bold text-green-400">{stats.maisForte?.nome}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
                    <TrendingDown className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                    <p className="text-xs text-blue-400">Media Geral</p>
                    <p className="text-sm font-bold text-blue-400">{stats.mediaGeral.toFixed(1)}%</p>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-white/5 text-center text-xs text-gray-400">
                  {stats.totalAcertos} acertos de {stats.totalQuestoes} questoes
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <ToolContent
        toolName="Mapeamento de Erros"
        category="Estudos"
        data={{
          directAnswer: "Registrar erros de cada simulado revela padrões: se você erra 60% de questões de matemática, essa é sua área de foco.",
          howItWorks: "A ferramenta registra o total de questões e acertos por matéria, calculando a taxa de acertos: (acertos / total) × 100. Matérias são ordenadas por desempenho (da mais fraca à mais forte). A matéria mais fraca é destacada em vermelho e a mais forte em verde. A ferramenta exibe: 1) Lista de matérias com barras de progresso coloridas; 2) Gráfico de barras comparativo; 3) Cards de resumo: Matéria Mais Fraca (vermelho), Mais Forte (verde) e Média Geral (azul). A análise de padrões ajuda a direcionar o estudo: investir mais tempo na matéria mais fraca enquanto mantém a mais forte. A média geral é calculada sobre todas as matérias com dados. É ideal para acompanhar simulados de ENEM, concursos e vestibulares.",
          example: {
            title: "Exemplo: 3 matérias após simulado",
            steps: [
              "Adicione 'Matemática' com 10 questões e 4 acertos (40%)",
              "Adicione 'Português' com 10 questões e 7 acertos (70%)",
              "Adicione 'História' com 10 questões e 9 acertos (90%)",
              "A ferramenta ordena: Matemática (mais fraca) → Português → História",
              "Exibe: média geral 66,7%, Matemática em vermelho, História em verde"
            ],
            result: "Matemática é a área de foco (40% de acerto). Média geral: 66,7%. História está bem (90%). Direcione 50% do tempo de estudo para Matemática.",
          },
          outboundLinks: [
            { label: "INEP - Resultados ENEM", url: "https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacoes-e-exames/nacional-enem", source: "INEP - Ministério da Educação" }
          ],
          faqs: [
            { question: "Como mapear erros de estudo?", answer: "Após cada simulado, registre o total de questões e acertos por matéria. A ferramenta calcula a taxa de acertos e mostra a matéria mais fraca." },
            { question: "O que é análise de erros?", answer: "É o processo de identificar padrões de erro para direcionar o estudo. Matérias com menos de 50% de acertos são prioridade." },
            { question: "Como melhorar nota em matemática?", answer: "Mapeie erros por tópico (álgebra, geometria, estatística). Estude o tópico mais fraco, refaça questões similares e acompanhe a evolução." },
            { question: "Como identificar padrões de erro?", answer: "Use a ferramenta após 3+ simulados. Se a taxa de acertos em uma matéria não melhora, revise a metodologia de estudo daquela área." },
            { question: "Mapeamento de erros funciona?", answer: "Sim. Estudos de aprendizagem mostram que feedback imediato e direcionado aumenta a retenção em 25-40%. A ferramenta automatiza esse processo." },
          ],
        }}
      />
    </ToolLayout>
  );
}
