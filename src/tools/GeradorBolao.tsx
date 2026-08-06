import React, { useState } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { CONFIG } from "../config";
import { Plus, Trash2, Share2 } from "lucide-react";

interface Props { onBack: () => void; }

interface Participante {
  id: number;
  nome: string;
  palpite: string;
}

let nextId = 1;

export function GeradorBolao({ onBack }: Props) {
  const [jogo, setJogo] = useState("");
  const [data, setData] = useState("");
  const [mandante, setMandante] = useState("");
  const [visitante, setVisitante] = useState("");
  const [participantes, setParticipantes] = useState<Participante[]>([
    { id: nextId++, nome: "", palpite: "" },
    { id: nextId++, nome: "", palpite: "" },
  ]);
  const [gerado, setGerado] = useState("");
  const [copied, setCopied] = useState(false);

  function add() {
    if (participantes.length >= 20) return;
    setParticipantes([...participantes, { id: nextId++, nome: "", palpite: "" }]);
  }

  function update(id: number, field: "nome" | "palpite", value: string) {
    setParticipantes(participantes.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  }

  function remove(id: number) {
    if (participantes.length <= 2) return;
    setParticipantes(participantes.filter((p) => p.id !== id));
  }

  function gerar() {
    const dataFmt = data ? new Date(data + "T12:00:00").toLocaleDateString("pt-BR") : "";
    const header = [
      `🏆 *BOLÃO — ${jogo || "Jogo"}*`,
      dataFmt ? `📅 ${dataFmt}` : "",
      mandante && visitante ? `⚽ ${mandante} x ${visitante}` : "",
      "",
      "*Palpites:*",
    ].filter(Boolean).join("\n");

    const lista = participantes
      .filter((p) => p.nome)
      .map((p, i) => `${i + 1}. *${p.nome}*: ${p.palpite || "—"}`)
      .join("\n");

    const footer = [
      "",
      "─────────────────",
      `🎰 Aposte de forma oficial: ${CONFIG.linkBet}`,
      "_Gerado pelo CLICAresolve_",
    ].join("\n");

    setGerado(`${header}\n${lista}${footer}`);
  }

  function enviarWpp() {
    if (!gerado) return;
    window.open(`https://wa.me/?text=${encodeURIComponent(gerado)}`, "_blank");
  }

  function copiar() {
    if (!gerado) return;
    navigator.clipboard.writeText(gerado);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <ToolLayout
      title="Gerador de Bolão"
      emoji="📲"
      category="Esportes"
      description="Monte o bolão do jogo, colete palpites e envie para o grupo no WhatsApp."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["kit torcedor futebol"]} label="kit torcedor futebol" />}
    
    >
      <div className="space-y-4">
        {/* Bet banner */}
        <a
          href={CONFIG.linkBet}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition-colors"
        >
          <span className="text-sm text-amber-400 font-semibold">🎰 {CONFIG.nomeBet} — {CONFIG.textoBet}</span>
          <span className="text-xs text-amber-300 shrink-0 underline">Apostar agora</span>
        </a>

        <div className="grid grid-cols-2 gap-3">
          <label className="block col-span-2">
            <span className="text-xs text-gray-400 mb-1 block">Nome do jogo / campeonato</span>
            <input value={jogo} onChange={(e) => setJogo(e.target.value)} placeholder="Ex: Brasileirão Série A" className="input-field" />
          </label>
          <label className="block col-span-2">
            <span className="text-xs text-gray-400 mb-1 block">Data do jogo</span>
            <input type="date" value={data} onChange={(e) => setData(e.target.value)} className="input-field" />
          </label>
          <label className="block">
            <span className="text-xs text-gray-400 mb-1 block">Mandante</span>
            <input value={mandante} onChange={(e) => setMandante(e.target.value)} placeholder="Ex: Flamengo" className="input-field" />
          </label>
          <label className="block">
            <span className="text-xs text-gray-400 mb-1 block">Visitante</span>
            <input value={visitante} onChange={(e) => setVisitante(e.target.value)} placeholder="Ex: Palmeiras" className="input-field" />
          </label>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-300">Participantes e Palpites</p>
          {participantes.map((p, i) => (
            <div key={p.id} className="flex gap-2 items-center">
              <span className="text-xs text-gray-600 w-5 shrink-0">{i + 1}.</span>
              <input value={p.nome} onChange={(e) => update(p.id, "nome", e.target.value)} placeholder="Nome" className="input-field flex-1" />
              <input value={p.palpite} onChange={(e) => update(p.id, "palpite", e.target.value)} placeholder="Ex: 2x1" className="input-field w-20" />
              {participantes.length > 2 && (
                <button onClick={() => remove(p.id)} className="text-gray-600 hover:text-red-400 transition-colors shrink-0">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        {participantes.length < 20 && (
          <button onClick={add} className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors">
            <Plus className="w-4 h-4" /> Adicionar participante
          </button>
        )}

        <button onClick={gerar} className="btn-primary w-full">Gerar Bolão</button>

        {gerado && (
          <div className="space-y-3">
            <pre className="p-4 rounded-xl bg-white/5 border border-white/8 text-xs text-gray-300 whitespace-pre-wrap font-mono overflow-auto max-h-64">
              {gerado}
            </pre>
            <div className="flex gap-2">
              <button
                onClick={enviarWpp}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-green-600 hover:bg-green-500 text-white text-sm font-semibold transition-colors"
              >
                <Share2 className="w-4 h-4" /> Enviar no WhatsApp
              </button>
              <button
                onClick={copiar}
                className="px-4 py-2.5 rounded-xl border border-white/10 text-gray-300 hover:text-white text-sm transition-colors"
              >
                {copied ? "Copiado!" : "Copiar"}
              </button>
            </div>
          </div>
        )}
      </div>
      <ToolContent
        toolName="Gerador de Bolão"
        category="Esportes"
        data={{
          directAnswer: "O gerador de bolão organiza um grupo de apostas compartilhadas, dividindo o custo total entre os participantes e registrando os números escolhidos por cada um.",
          howItWorks: "A ferramenta ajuda a organizar bolões de loteria entre grupos de amigos ou colegas, calculando o valor que cada participante deve contribuir com base no número total de cotas e no valor total da aposta. Também auxilia no registro de quem participa e quais números foram escolhidos, evitando desentendimentos na hora de dividir um eventual prêmio.",
          example: {
            title: "Exemplo: bolão de 10 pessoas para uma aposta de R$ 200",
            steps: [
              "Valor total da aposta: R$ 200",
              "Número de participantes: 10",
              "Valor por cota: R$ 200 / 10 = R$ 20",
              "Registro de participantes e números escolhidos",
            ],
            result: "Cada um dos 10 participantes contribui com R$ 20 para completar a aposta total de R$ 200, com a divisão do prêmio já registrada previamente entre o grupo.",
          },
          faqs: [
            { question: "É importante formalizar a divisão do bolão?", answer: "Sim, é altamente recomendado documentar por escrito quem participa e qual a porcentagem de cada um antes do sorteio, para evitar conflitos em caso de prêmio." },
            { question: "Posso organizar bolões de qualquer loteria?", answer: "Sim, a ferramenta serve como organizador geral, adaptável a qualquer modalidade de loteria ou aposta em grupo." },
            { question: "Como dividir o prêmio de forma justa?", answer: "O mais comum é dividir proporcionalmente ao valor investido por cada participante, conforme registrado na organização do bolão." },
            { question: "A ferramenta faz a aposta oficial pelo usuário?", answer: "Não, ela apenas organiza o grupo e os valores; a aposta oficial deve ser feita através dos canais autorizados da loteria." },
          ],
        }}
      />
    </ToolLayout>
  );
}
