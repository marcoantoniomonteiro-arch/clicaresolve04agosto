import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import React, { useState, useMemo } from "react";


import { Type, FileText, Clock } from "lucide-react";
import { ToolContent } from "../components/ToolContent";
import { CONFIG } from "../config";

interface Props {
  onBack: () => void;
}

const LIMITES = [
  { nome: "Twitter/X", limite: 280, cor: "bg-sky-500" },
  { nome: "Instagram", limite: 2200, cor: "bg-pink-500" },
  { nome: "Redacao ENEM", limite: 1800, cor: "bg-green-500" },
];

export function ContadorCaracteres({ onBack }: Props) {
  const [texto, setTexto] = useState("");

  const stats = useMemo(() => {
    const charsComEspaco = texto.length;
    const charsSemEspaco = texto.replace(/\s/g, "").length;
    const palavras = texto.trim() ? texto.trim().split(/\s+/).length : 0;
    const linhas = texto ? texto.split(/\n/).length : 0;
    const paragrafos = texto.trim() ? texto.trim().split(/\n\s*\n/).filter(Boolean).length : 0;

    const palavrasPorMinuto = 200;
    const tempoLeitura = palavras / palavrasPorMinuto;
    const minutos = Math.floor(tempoLeitura);
    const segundos = Math.round((tempoLeitura - minutos) * 60);

    return {
      charsComEspaco,
      charsSemEspaco,
      palavras,
      linhas,
      paragrafos,
      tempoMinutos: minutos,
      tempoSegundos: segundos,
    };
  }, [texto]);

  const statusLimites = useMemo(() => {
    return LIMITES.map((l) => ({
      ...l,
      usado: stats.charsComEspaco,
      pct: Math.min((stats.charsComEspaco / l.limite) * 100, 100),
      ok: stats.charsComEspaco <= l.limite,
    }));
  }, [stats.charsComEspaco]);

  return (
    <ToolLayout
      title="Contador de Caracteres"
      emoji="📝"
      category="Estudos"
      description="Conte caracteres, palavras, linhas e tempo de leitura em tempo real."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["teclado mecânico digitação"]} label="teclado mecânico digitação" />}
    
    >
      <div className="space-y-5">
        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Digite ou cole seu texto aqui..."
          className="input-field w-full h-48 resize-none p-4"
        />

        <div className="grid grid-cols-5 gap-3">
          <div className="p-3 rounded-xl bg-white/5 text-center">
            <Type className="w-4 h-4 text-gray-400 mx-auto mb-1" />
            <p className="text-xs text-gray-400">Chars</p>
            <p className="text-lg font-bold text-white">{stats.charsComEspaco}</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 text-center">
            <p className="text-xs text-gray-400 mt-2">Sem espaco</p>
            <p className="text-lg font-bold text-white">{stats.charsSemEspaco}</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 text-center">
            <FileText className="w-4 h-4 text-gray-400 mx-auto mb-1" />
            <p className="text-xs text-gray-400">Palavras</p>
            <p className="text-lg font-bold text-white">{stats.palavras}</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 text-center">
            <p className="text-xs text-gray-400 mt-2">Linhas</p>
            <p className="text-lg font-bold text-white">{stats.linhas}</p>
          </div>
          <div className="p-3 rounded-xl bg-white/5 text-center">
            <p className="text-xs text-gray-400 mt-2">Paragrafos</p>
            <p className="text-lg font-bold text-white">{stats.paragrafos}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-blue-400" />
            <p className="text-xs text-blue-400">Tempo estimado de leitura</p>
          </div>
          <p className="text-2xl font-bold text-blue-400">
            {stats.tempoMinutos > 0 ? `${stats.tempoMinutos}m ` : ""}
            {stats.tempoSegundos}s
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Baseado em 200 palavras por minuto
          </p>
        </div>

        <div className="p-4 rounded-xl bg-white/5 border border-white/8">
          <p className="text-xs text-gray-400 mb-3">Limites de Referencia</p>
          <div className="space-y-3">
            {statusLimites.map((l) => (
              <div key={l.nome}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">{l.nome}</span>
                  <span className={l.ok ? "text-green-400" : "text-red-400"}>
                    {l.usado} / {l.limite}
                  </span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded transition-all ${l.cor}`}
                    style={{ width: `${l.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToolContent
        toolName="ContadorCaracteres"
        category="Estudos"
        data={{
          directAnswer: "O texto 'Olá mundo' tem 9 caracteres (com espaço) e 2 palavras. O contador também mostra linhas e caracteres sem espaço.",
          howItWorks: "A ferramenta conta em tempo real: caracteres com espaço, caracteres sem espaço, palavras, linhas, parágrafos e tempo estimado de leitura. O tempo de leitura é calculado com base em 200 palavras por minuto (média adulta). Para palavras, a ferramenta divide o texto por espaços e remove espaços duplicados. Para parágrafos, divide por linhas em branco duplas. O contador de limites mostra 3 referências: Twitter/X (280 caracteres), Instagram (2.200 caracteres) e Redação ENEM (1.800 caracteres). Cada limite é exibido com barra de progresso e cor: verde (dentro do limite) ou vermelho (excedido). É útil para escrever posts, redações, resumos e limitar textos para plataformas digitais.",
          example: {
            title: "Exemplo: redação de 200 palavras para o ENEM",
            steps: [
              "Digite o texto na área de texto",
              "A ferramenta atualiza em tempo real: caracteres, palavras, linhas",
              "Verifica se está dentro do limite da Redação ENEM (1.800 caracteres)",
              "Mostra tempo estimado de leitura: 200 palavras → 1 minuto",
              "Ajusta o texto conforme os limites desejados"
            ],
            result: "200 palavras, 1.200 caracteres, 8 linhas, 3 parágrafos, tempo de leitura: 1 min — dentro do limite do ENEM.",
          },
          outboundLinks: [
            { label: "INEP - Redação ENEM", url: "https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacoes-e-exames/nacional-enem", source: "INEP - Ministério da Educação" }
          ],
          faqs: [
            { question: "Como contar caracteres?", answer: "Cole ou digite o texto na ferramenta. O contador atualiza automaticamente: caracteres com e sem espaço, palavras, linhas e parágrafos." },
            { question: "O que é limite de caracteres?", answer: "É o número máximo de caracteres permitido em uma plataforma. Twitter/X: 280. Instagram: 2.200. WhatsApp: 65.536. A ferramenta mostra 3 referências." },
            { question: "Twitter tem limite de caracteres?", answer: "Sim, 280 caracteres por post. A ferramenta mostra uma barra de progresso para o Twitter e alerta quando o texto excede o limite." },
            { question: "Como contar palavras no Word?", answer: "No Word, vá em 'Revisão' > 'Contar palavras'. Ou cole o texto na ferramenta CLICAresolve para contar palavras, caracteres e tempo de leitura." },
            { question: "Quantos caracteres cabem em uma página?", answer: "Aproximadamente 2.000-3.000 caracteres por página A4, fonte Arial 12, espaçamento 1,5. Com espaçamento duplo: ~1.500 caracteres." },
          ],
        }}
      />
    </ToolLayout>
  );
}
