import React, { useState, useEffect, useCallback, useMemo } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { Star, Plus, Trash2, Award } from "lucide-react";
import { ToolContent } from "../components/ToolContent";

interface Props {
  onBack: () => void;
}

interface Tarefa {
  id: number;
  nome: string;
  estrelas: 0 | 1 | 2 | 3;
}

interface Filho {
  id: number;
  nome: string;
  idade: number;
  tarefas: Tarefa[];
}

const STORAGE_KEY = "tarefas-infantil";

const TAREFAS_SUGERIDAS = [
  "Arrumar a cama",
  "Escovar os dentes",
  "Estudar",
  "Brincar fora",
  "Ajudar na casa",
  "Ler um livro",
  "Dormir cedo",
  "Comer verduras",
];

export function TarefasInfantil({ onBack }: Props) {
  const [filhos, setFilhos] = useState<Filho[]>([]);
  const [novoNome, setNovoNome] = useState("");
  const [novaIdade, setNovaIdade] = useState("5");
  const [filhoAtivo, setFilhoAtivo] = useState<number | null>(null);
  const [novaTarefa, setNovaTarefa] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setFilhos(data);
        if (data.length > 0) setFilhoAtivo(data[0].id);
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filhos));
  }, [filhos]);

  const addFilho = useCallback(() => {
    if (!novoNome.trim()) return;
    const novo: Filho = {
      id: Date.now(),
      nome: novoNome.trim(),
      idade: parseInt(novaIdade) || 5,
      tarefas: [],
    };
    setFilhos((prev) => [...prev, novo]);
    setFilhoAtivo(novo.id);
    setNovoNome("");
    setNovaIdade("5");
  }, [novoNome, novaIdade]);

  const removeFilho = useCallback((id: number) => {
    setFilhos((prev) => prev.filter((f) => f.id !== id));
    if (filhoAtivo === id) setFilhoAtivo(null);
  }, [filhoAtivo]);

  const addTarefa = useCallback(() => {
    if (!novaTarefa.trim() || !filhoAtivo) return;
    setFilhos((prev) =>
      prev.map((f) =>
        f.id === filhoAtivo
          ? { ...f, tarefas: [...f.tarefas, { id: Date.now(), nome: novaTarefa.trim(), estrelas: 0 }] }
          : f
      )
    );
    setNovaTarefa("");
  }, [novaTarefa, filhoAtivo]);

  const setEstrelas = useCallback((filhoId: number, tarefaId: number, estrelas: 0 | 1 | 2 | 3) => {
    setFilhos((prev) =>
      prev.map((f) =>
        f.id === filhoId
          ? {
              ...f,
              tarefas: f.tarefas.map((t) => (t.id === tarefaId ? { ...t, estrelas } : t)),
            }
          : f
      )
    );
  }, []);

  const filhoAtual = useMemo(() => filhos.find((f) => f.id === filhoAtivo), [filhos, filhoAtivo]);

  const totalEstrelas = useMemo(() => {
    if (!filhoAtual) return 0;
    return filhoAtual.tarefas.reduce((acc, t) => acc + t.estrelas, 0);
  }, [filhoAtual]);

  const corGradiente = filhoAtual?.idade && filhoAtual.idade <= 4
    ? "from-pink-400 to-purple-400"
    : filhoAtual?.idade && filhoAtual.idade <= 7
    ? "from-yellow-400 to-orange-400"
    : "from-blue-400 to-cyan-400";

  return (
    <ToolLayout
      title="Quadro de Tarefas Infantil"
      emoji="👶"
      category="Utilidades"
      description="Quadro gamificado de tarefas com estrelinhas para criancas."
      onBack={onBack}
      affiliateBanner={
        <AffiliateBanner
          terms={["quadro de rotina infantil", "livro de habitos infantil", "quadro de tarejas"]}
          label="Motivacao para os pequenos"
        />
      }
    >
      <div className="space-y-5">
        {filhos.length === 0 ? (
          <div className={`p-6 rounded-2xl bg-gradient-to-br ${corGradiente} bg-opacity-20 border border-white/20 text-center`}>
            <p className="text-4xl mb-2">🌟</p>
            <p className="text-white font-semibold mb-4">Adicione uma crianca para comecar</p>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                value={novoNome}
                onChange={(e) => setNovoNome(e.target.value)}
                placeholder="Nome da crianca"
                className="input-field"
              />
              <input
                type="number"
                value={novaIdade}
                onChange={(e) => setNovaIdade(e.target.value)}
                placeholder="Idade"
                min="1"
                max="12"
                className="input-field"
              />
            </div>
            <button onClick={addFilho} className="btn-primary w-full">
              <Plus className="w-4 h-4 inline mr-1" /> Adicionar
            </button>
          </div>
        ) : (
          <>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {filhos.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilhoAtivo(f.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                    filhoAtivo === f.id
                      ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                      : "bg-white/5 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  {f.nome} ({f.idade} anos)
                </button>
              ))}
              <button
                onClick={() => {
                  setNovoNome("");
                  setNovaIdade("5");
                  const shouldShow = true;
                  if (shouldShow) {
                    const nome = prompt("Nome da crianca?");
                    if (nome) {
                      const idade = prompt("Idade?", "5");
                      setFilhos((prev) => [
                        ...prev,
                        { id: Date.now(), nome, idade: parseInt(idade || "5") || 5, tarefas: [] },
                      ]);
                    }
                  }
                }}
                className="px-3 py-2 rounded-xl bg-white/5 text-gray-400 hover:bg-white/10 text-sm"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {filhoAtual && (
              <div className={`p-5 rounded-2xl bg-gradient-to-br ${corGradiente} bg-opacity-10 border border-white/20`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{filhoAtual.nome}</h3>
                    <p className="text-sm text-gray-300">{filhoAtual.idade} aninhos</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(totalEstrelas)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs text-gray-400">Total: {totalEstrelas} estrelas</p>
                  <button onClick={() => removeFilho(filhoAtual.id)} className="text-xs text-gray-500 hover:text-red-400">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>

                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={novaTarefa}
                    onChange={(e) => setNovaTarefa(e.target.value)}
                    placeholder="Nova tarefa..."
                    className="input-field flex-1"
                    onKeyDown={(e) => e.key === "Enter" && addTarefa()}
                  />
                  <button onClick={addTarefa} className="btn-primary px-4">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mb-4 text-xs">
                  {TAREFAS_SUGERIDAS.filter((t) => !filhoAtual.tarefas.find((ft) => ft.nome === t)).slice(0, 5).map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setFilhos((prev) =>
                          prev.map((f) =>
                            f.id === filhoAtual.id
                              ? { ...f, tarefas: [...f.tarefas, { id: Date.now(), nome: t, estrelas: 0 }] }
                              : f
                          )
                        );
                      }}
                      className="px-2 py-1 rounded bg-white/10 text-gray-300 hover:bg-white/20"
                    >
                      + {t}
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  {filhoAtual.tarefas.map((t) => (
                    <div key={t.id} className="flex items-center gap-2 p-2 rounded-xl bg-white/10">
                      <span className="flex-1 text-sm text-white">{t.nome}</span>
                      <div className="flex gap-1">
                        {[0, 1, 2, 3].map((n) => (
                          <button
                            key={n}
                            onClick={() => setEstrelas(filhoAtual.id, t.id, n as any)}
                            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                              t.estrelas >= n
                                ? "bg-yellow-400 text-black"
                                : "bg-white/10 text-gray-500"
                            }`}
                          >
                            <Star className={`w-3 h-3 ${t.estrelas >= n ? "fill-current" : ""}`} />
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() =>
                          setFilhos((prev) =>
                            prev.map((f) =>
                              f.id === filhoAtual.id
                                ? { ...f, tarefas: f.tarefas.filter((ft) => ft.id !== t.id) }
                                : f
                            )
                          )
                        }
                        className="text-gray-500 hover:text-red-400"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {totalEstrelas >= 10 && (
                  <div className="mt-4 p-3 rounded-xl bg-yellow-500/20 border border-yellow-500/30 flex items-center gap-2">
                    <Award className="w-5 h-5 text-yellow-400" />
                    <p className="text-sm text-yellow-300 font-semibold">Parabens! {totalEstrelas} estrelas!</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
      <ToolContent
        toolName="Tarefas Infantil"
        category="Utilidades"
        data={{
          directAnswer: "O quadro de tarefas infantil organiza responsabilidades diárias das crianças de forma visual e lúdica, incentivando hábitos e senso de responsabilidade.",
          howItWorks: "A ferramenta cria um quadro visual com tarefas do dia a dia (arrumar a cama, escovar os dentes, guardar brinquedos), permitindo marcar cada tarefa como concluída. Esse tipo de recurso visual é usado por pais e educadores para incentivar rotina, autonomia e senso de conquista nas crianças de forma lúdica.",
          example: {
            title: "Exemplo: quadro de tarefas de um dia",
            steps: [
              "Tarefa 1: Arrumar a cama ✓",
              "Tarefa 2: Escovar os dentes ✓",
              "Tarefa 3: Guardar os brinquedos (pendente)",
              "Progresso do dia: 2 de 3 tarefas concluídas",
            ],
            result: "O quadro mostra visualmente que a criança completou 2 das 3 tarefas do dia, faltando apenas guardar os brinquedos.",
          },
          faqs: [
            { question: "A partir de que idade esse tipo de quadro funciona bem?", answer: "Costuma funcionar bem a partir dos 3-4 anos, quando a criança já entende símbolos visuais simples e conquistas." },
            { question: "Posso personalizar as tarefas do quadro?", answer: "Sim, é possível adicionar, remover ou editar as tarefas conforme a rotina específica de cada família." },
            { question: "O quadro pode ser usado para mais de uma criança?", answer: "Depende da versão da ferramenta; muitas permitem criar quadros separados para cada criança da casa." },
            { question: "Esse tipo de recurso realmente ajuda no desenvolvimento infantil?", answer: "Educadores costumam recomendar quadros visuais de tarefas como forma de estimular autonomia, organização e senso de conquista nas crianças." },
          ],
        }}
      />
    </ToolLayout>
  );
}
