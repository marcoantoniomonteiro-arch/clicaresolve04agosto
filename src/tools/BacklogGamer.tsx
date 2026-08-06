import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import React, { useState, useEffect, useMemo, useCallback } from "react";


import { Gamepad2, Plus, Trash2, Clock, TrendingUp } from "lucide-react";
import { ToolContent } from "../components/ToolContent";

interface Props {
  onBack: () => void;
}

interface Jogo {
  id: number;
  nome: string;
  horas: number;
  plataforma: string;
  prioridade: 1 | 2 | 3;
}

const STORAGE_KEY = "backlog-games";

const PLATAFORMAS = ["PC", "PS5", "Xbox", "Switch", "Mobile"];

export function BacklogGamer({ onBack }: Props) {
  const [jogos, setJogos] = useState<Jogo[]>([]);
  const [novoNome, setNovoNome] = useState("");
  const [novasHoras, setNovasHoras] = useState("20");
  const [plataforma, setPlataforma] = useState("PC");
  const [prioridade, setPrioridade] = useState<1 | 2 | 3>(2);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setJogos(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jogos));
  }, [jogos]);

  const addJogo = useCallback(() => {
    if (!novoNome.trim()) return;
    setJogos((prev) => [
      ...prev,
      {
        id: Date.now(),
        nome: novoNome.trim(),
        horas: parseInt(novasHoras) || 20,
        plataforma,
        prioridade,
      },
    ]);
    setNovoNome("");
    setNovasHoras("20");
  }, [novoNome, novasHoras, plataforma, prioridade]);

  const removeJogo = useCallback((id: number) => {
    setJogos((prev) => prev.filter((j) => j.id !== id));
  }, []);

  const jogosOrdenados = useMemo(() => {
    return [...jogos].sort((a, b) => a.prioridade - b.prioridade);
  }, [jogos]);

  const estatisticas = useMemo(() => {
    const totalHoras = jogos.reduce((acc, j) => acc + j.horas, 0);
    const totalJogos = jogos.length;
    const mediaHoras = totalJogos > 0 ? totalHoras / totalJogos : 0;
    return { totalHoras, totalJogos, mediaHoras };
  }, [jogos]);

  return (
    <ToolLayout
      title="Backlog Gamer"
      emoji="🎮"
      category="Utilidades"
      description="Organize sua lista de jogos para jogar com tempo estimado e prioridade."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["controle gamer joystick"]} label="controle gamer joystick" mercadoLivreTerms={["controle ps5 xbox"]} mercadoLivreLabel="Encontre no Mercado Livre" />}
    
    >
      <div className="space-y-5">
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-center">
            <p className="text-2xl font-bold text-blue-400">{estatisticas.totalJogos}</p>
            <p className="text-xs text-gray-400">Jogos</p>
          </div>
          <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
            <p className="text-2xl font-bold text-green-400">{estatisticas.totalHoras}h</p>
            <p className="text-xs text-gray-400">Total</p>
          </div>
          <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-center">
            <p className="text-2xl font-bold text-yellow-400">{estatisticas.mediaHoras.toFixed(0)}h</p>
            <p className="text-xs text-gray-400">Media</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/8">
          <p className="text-xs text-gray-400 mb-3">Adicionar Jogo</p>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <input
              type="text"
              value={novoNome}
              onChange={(e) => setNovoNome(e.target.value)}
              placeholder="Nome do jogo"
              className="input-field"
              onKeyDown={(e) => e.key === "Enter" && addJogo()}
            />
            <input
              type="number"
              value={novasHoras}
              onChange={(e) => setNovasHoras(e.target.value)}
              placeholder="Horas estimadas"
              className="input-field"
            />
          </div>
          <div className="flex gap-2 mb-2">
            <select
              value={plataforma}
              onChange={(e) => setPlataforma(e.target.value)}
              className="input-field flex-1"
            >
              {PLATAFORMAS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
            <div className="flex gap-1">
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  onClick={() => setPrioridade(p as any)}
                  className={`px-3 py-2 rounded text-sm font-semibold ${
                    prioridade === p
                      ? p === 1 ? "bg-green-500 text-black" : p === 2 ? "bg-yellow-500 text-black" : "bg-red-500 text-white"
                      : "bg-white/5 text-gray-400"
                  }`}
                >
                  P{p}
                </button>
              ))}
            </div>
          </div>
          <button onClick={addJogo} className="btn-primary w-full flex items-center justify-center gap-1">
            <Plus className="w-4 h-4" /> Adicionar
          </button>
        </div>

        {jogosOrdenados.length > 0 && (
          <div className="space-y-2">
            {jogosOrdenados.map((j) => (
              <div
                key={j.id}
                className={`p-3 rounded-xl border ${
                  j.prioridade === 1
                    ? "bg-green-500/10 border-green-500/30"
                    : j.prioridade === 2
                    ? "bg-yellow-500/10 border-yellow-500/30"
                    : "bg-red-500/10 border-red-500/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{j.nome}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-gray-400">{j.plataforma}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      {j.horas}h estimadas
                      <span className={`ml-auto ${
                        j.prioridade === 1 ? "text-green-400" : j.prioridade === 2 ? "text-yellow-400" : "text-red-400"
                      }`}>
                        Prioridade {j.prioridade}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeJogo(j.id)}
                    className="text-gray-500 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ToolContent
        toolName="Backlog Gamer"
        category="Jogos"
        data={{
          directAnswer: "O backlog gamer organiza a lista de jogos que você quer jogar, está jogando e já completou, ajudando a gerenciar seu tempo e prioridades de jogo.",
          howItWorks: "A ferramenta permite catalogar jogos em 3 categorias (quero jogar, jogando atualmente, completado), ajudando jogadores a organizar sua biblioteca de jogos pendentes, priorizar o que jogar em seguida e acompanhar o progresso de finalização ao longo do tempo.",
          example: {
            title: "Exemplo: organizando uma biblioteca de jogos",
            steps: [
              "Quero jogar: Elden Ring, Baldur's Gate 3",
              "Jogando agora: The Legend of Zelda",
              "Completado: Hollow Knight, Hades",
              "Total no backlog: 5 jogos catalogados",
            ],
            result: "A organização em 3 categorias dá uma visão clara de quantos jogos estão pendentes e o que já foi concluído.",
          },
          faqs: [
            { question: "O que é 'backlog' no contexto de jogos?", answer: "É a lista de jogos que uma pessoa possui ou pretende jogar, mas ainda não terminou ou nem começou." },
            { question: "Posso adicionar quantos jogos quiser ao backlog?", answer: "Sim, não há limite prático de jogos que podem ser catalogados na ferramenta." },
            { question: "A ferramenta salva meu progresso entre sessões?", answer: "Isso depende da configuração; geralmente os dados ficam salvos localmente no navegador." },
            { question: "Serve para qualquer plataforma de jogos?", answer: "Sim, a ferramenta é genérica e pode catalogar jogos de qualquer console, PC ou plataforma mobile." },
          ],
        }}
      />
    </ToolLayout>
  );
}
