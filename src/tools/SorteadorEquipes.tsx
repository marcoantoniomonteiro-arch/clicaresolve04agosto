import React, { useState } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { Shuffle, Copy } from "lucide-react";

interface Props { onBack: () => void; }

const TEAM_COLORS = [
  { bg: "bg-blue-500/10 border-blue-500/30", text: "text-blue-400", header: "bg-blue-500/20" },
  { bg: "bg-red-500/10 border-red-500/30", text: "text-red-400", header: "bg-red-500/20" },
  { bg: "bg-amber-500/10 border-amber-500/30", text: "text-amber-400", header: "bg-amber-500/20" },
  { bg: "bg-purple-500/10 border-purple-500/30", text: "text-purple-400", header: "bg-purple-500/20" },
];

export function SorteadorEquipes({ onBack }: Props) {
  const [jogadores, setJogadores] = useState("");
  const [numTimes, setNumTimes] = useState(2);
  const [temGoleiro, setTemGoleiro] = useState(false);
  const [teams, setTeams] = useState<string[][] | null>(null);
  const [goleiros, setGoleiros] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  function sortear() {
    const nomes = jogadores
      .split("\n")
      .map((n) => n.trim())
      .filter(Boolean);

    if (nomes.length < numTimes) return;

    const shuffled = [...nomes].sort(() => Math.random() - 0.5);
    const gols: string[] = [];

    if (temGoleiro && shuffled.length >= numTimes) {
      for (let i = 0; i < numTimes; i++) gols.push(shuffled.splice(0, 1)[0]);
    }

    const result: string[][] = Array.from({ length: numTimes }, () => []);
    shuffled.forEach((nome, i) => result[i % numTimes].push(nome));

    setGoleiros(gols);
    setTeams(result);
  }

  function copiarWpp() {
    if (!teams) return;
    const linhas = teams.map((t, i) => {
      const header = `*Time ${i + 1}*${goleiros[i] ? ` — Goleiro: ${goleiros[i]}` : ""}`;
      return `${header}\n${t.map((n) => `  - ${n}`).join("\n")}`;
    });
    const texto = `⚽ *Sorteio de Times — CLICAresolve*\n\n${linhas.join("\n\n")}`;
    navigator.clipboard.writeText(texto);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <ToolLayout
      title="Sorteador de Equipes"
      emoji="🎲"
      category="Esportes"
      description="Sorteie times equilibrados a partir de uma lista de jogadores."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["bola de futebol", "colete de jogo"]} label="Equipe completa" />}
    >
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Jogadores (um por linha)</span>
          <textarea
            value={jogadores}
            onChange={(e) => setJogadores(e.target.value)}
            placeholder={"João\nMaria\nCarlos\nAna\nPedro\nLucia"}
            rows={6}
            className="input-field resize-none"
            style={{ height: "auto", minHeight: "140px" }}
          />
          <span className="text-xs text-gray-600">{jogadores.split("\n").filter((n) => n.trim()).length} jogadores</span>
        </label>

        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Número de times</span>
            <select value={numTimes} onChange={(e) => setNumTimes(parseInt(e.target.value))} className="input-field">
              {[2, 3, 4].map((n) => <option key={n} value={n}>{n} times</option>)}
            </select>
          </label>
          <div className="flex items-end pb-2">
            <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
              <input type="checkbox" checked={temGoleiro} onChange={(e) => setTemGoleiro(e.target.checked)} className="rounded w-4 h-4" />
              Sorteio de goleiro
            </label>
          </div>
        </div>

        <button onClick={sortear} className="btn-primary w-full flex items-center justify-center gap-2">
          <Shuffle className="w-4 h-4" /> Sortear Times
        </button>

        {teams && (
          <div className="space-y-3">
            <div className={`grid gap-3 ${numTimes === 2 ? "grid-cols-2" : numTimes === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
              {teams.map((time, i) => {
                const c = TEAM_COLORS[i];
                return (
                  <div key={i} className={`rounded-xl border ${c.bg}`}>
                    <div className={`px-3 py-2 rounded-t-xl ${c.header}`}>
                      <p className={`text-sm font-bold ${c.text}`}>Time {i + 1}</p>
                      {goleiros[i] && <p className="text-xs text-gray-400">Goleiro: {goleiros[i]}</p>}
                    </div>
                    <ul className="p-3 space-y-1">
                      {time.map((n) => (
                        <li key={n} className="text-sm text-white flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-500 inline-block shrink-0" />
                          {n}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            <button
              onClick={copiarWpp}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-600 hover:bg-green-500 text-white text-sm font-semibold transition-colors"
            >
              <Copy className="w-4 h-4" />
              {copied ? "Copiado!" : "Copiar para WhatsApp"}
            </button>
          </div>
        )}
      </div>
      <ToolContent
        toolName="Sorteador de Equipes"
        category="Esportes"
        data={{
          directAnswer: "O sorteador de equipes divide uma lista de nomes aleatoriamente em grupos equilibrados, ideal para peladas, jogos e atividades em grupo.",
          howItWorks: "A ferramenta recebe a lista de participantes e o número de times desejado, embaralhando os nomes aleatoriamente e distribuindo-os em grupos com quantidade equilibrada de integrantes. Isso evita discussões sobre 'quem escolhe primeiro' e garante um sorteio justo e imparcial para jogos casuais.",
          example: {
            title: "Exemplo: sorteando 10 pessoas em 2 times",
            steps: [
              "Total de participantes: 10",
              "Número de times: 2",
              "Sorteio aleatório aplicado",
              "Time A: 5 jogadores / Time B: 5 jogadores",
            ],
            result: "Os 10 participantes foram divididos aleatoriamente em 2 times equilibrados de 5 jogadores cada.",
          },
          faqs: [
            { question: "O sorteio é realmente aleatório?", answer: "Sim, a distribuição usa um método de embaralhamento aleatório, sem favorecer nenhum participante." },
            { question: "Posso sortear um número ímpar de participantes?", answer: "Sim, nesse caso um dos times ficará com um jogador a mais, distribuído também aleatoriamente." },
            { question: "Como funciona quando o número de participantes não divide igualmente entre os times?", answer: "A ferramenta distribui o excedente de forma equilibrada, deixando a diferença entre os times o menor possível (no máximo 1 jogador de diferença)." },
            { question: "Posso sortear novamente se não gostar do resultado?", answer: "Sim, é possível gerar um novo sorteio quantas vezes quiser até o resultado desejado." },
          ],
        }}
      />
    </ToolLayout>
  );
}
