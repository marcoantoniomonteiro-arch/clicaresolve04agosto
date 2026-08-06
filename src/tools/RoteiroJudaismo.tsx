import React, { useState, useEffect, useMemo } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { Book, Check, ChevronDown, ChevronUp } from "lucide-react";
import { CONFIG } from "../config";
import { ToolContent } from "../components/ToolContent";

interface Props {
  onBack: () => void;
}

interface Obra {
  id: string;
  nome: string;
  descricao: string;
  termoAmazon: string;
}

interface Fase {
  id: number;
  titulo: string;
  descricao: string;
  obras: Obra[];
}

const FASES: Fase[] = [
  {
    id: 1,
    titulo: "Fase 1: Tora e Tehilim",
    descricao: "Fundamento - Os 5 livros de Moises e os Salmos",
    obras: [
      { id: "genesis", nome: "Genesis (Bereshit)", descricao: "Criacao, patriarcas e origem do povo hebreu", termoAmazon: "Genesis Bereshit Hebraico" },
      { id: "exodo", nome: "Exodo (Shemot)", descricao: "Saida do Egito, entrega da Tora no Sinai", termoAmazon: "Exodo Shemot Hebraico" },
      { id: "levitico", nome: "Levitico (Vayicra)", descricao: "Leis de santidade e servico no Templo", termoAmazon: "Levitico Vayicra" },
      { id: "numeros", nome: "Numeros (Bamidbar)", descricao: "Jornada pelo deserto, censos e preparacao", termoAmazon: "Numeros Bamidbar" },
      { id: "deuteronomio", nome: "Deuteronomio (Devarim)", descricao: "Revisao da lei antes da entrada em Canaa", termoAmazon: "Deuteronomio Devarim" },
      { id: "tehilim", nome: "Tehilim (Salmos)", descricao: "150 salmos de louvor, suplica e gratidao", termoAmazon: "Salmos Tehilim Hebraico" },
    ],
  },
  {
    id: 2,
    titulo: "Fase 2: Tanakh e Comentarios",
    descricao: "Profundidade - Tanakh completo com Rashi",
    obras: [
      { id: "profetas", nome: "Neviim (Profetas)", descricao: "Josue, Juizes, Samuel, Reis e Profetas posteriores", termoAmazon: "Profetas Neviim Hebraico" },
      { id: "escritos", nome: "Ketuvim (Escritos)", descricao: "Salmos, Proverbios, Job, Meguilot e outros", termoAmazon: "Escritos Ketuvim Hebraico" },
      { id: "rashi", nome: "Comentarios de Rashi", descricao: "O principal comentario medieval da Tora", termoAmazon: "Rashi comentario Torah" },
    ],
  },
  {
    id: 3,
    titulo: "Fase 3: Filosofia Judaica",
    descricao: "Reflexao - Maimonides e pensamento",
    obras: [
      { id: "guia", nome: "Guia dos Perplexos", descricao: "Obra filosofica de Maimonides sobre fe e razao", termoAmazon: "Guia dos Perplexos Maimonides" },
    ],
  },
  {
    id: 4,
    titulo: "Fase 4: Etica e Misticismo",
    descricao: "Elevacao - Etica, Kabalah e Zohar",
    obras: [
      { id: "pirkei", nome: "Pirkei Avot (Etica dos Pais)", descricao: "Ensinamentos eticos dos sabios", termoAmazon: "Pirkei Avot Etica dos Pais" },
      { id: "kabalah", nome: "Introducao a Kabalah", descricao: "Conceitos basicos do misticismo judeu", termoAmazon: "Introducao Cabala Judaica" },
      { id: "zohar", nome: "Zohar (Brilho)", descricao: "Obra central da Kabalah", termoAmazon: "Zohar Livro Esplendor" },
    ],
  },
];

const STORAGE_KEY = "judaismo-progresso";

export function RoteiroJudaismo({ onBack }: Props) {
  const [concluidos, setConcluidos] = useState<Record<string, boolean>>({});
  const [faseAberta, setFaseAberta] = useState<number>(1);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setConcluidos(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(concluidos));
  }, [concluidos]);

  const toggleObra = (obraId: string) => {
    setConcluidos((prev) => ({ ...prev, [obraId]: !prev[obraId] }));
  };

  const progresso = useMemo(() => {
    let total = 0;
    let concluido = 0;
    FASES.forEach((f) => {
      f.obras.forEach((o) => {
        total++;
        if (concluidos[o.id]) concluido++;
      });
    });
    return { total, concluido, percent: total > 0 ? (concluido / total) * 100 : 0 };
  }, [concluidos]);

  return (
    <ToolLayout
      title="Roteiro de Estudos do Judaismo"
      emoji="✡️"
      category="Religioso"
      description="Trilha de estudos em 4 fases sobre judaismo com progresso salvo."
      onBack={onBack}
      affiliateBanner={
        <AffiliateBanner
          terms={["Tora em portugues", "Biblia Hebraica", "Tanakh completo"]}
          label="Adquira os livros"
        />
      }
    >
      <div className="space-y-5">
        <div className="p-4 rounded-xl bg-white/5 border border-white/8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Progresso Geral</span>
            <span className="text-sm font-bold text-green-400">{progresso.percent.toFixed(0)}%</span>
          </div>
          <div className="h-3 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-500"
              style={{ width: `${progresso.percent}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">{progresso.concluido} de {progresso.total} obras</p>
        </div>

        <div className="space-y-3">
          {FASES.map((fase) => {
            const obrasFase = fase.obras.length;
            const concluidosFase = fase.obras.filter((o) => concluidos[o.id]).length;
            const pctFase = obrasFase > 0 ? (concluidosFase / obrasFase) * 100 : 0;
            const estaAberto = faseAberta === fase.id;

            return (
              <div key={fase.id} className="rounded-xl border border-white/8 overflow-hidden">
                <button
                  onClick={() => setFaseAberta(estaAberto ? 0 : fase.id)}
                  className="w-full p-4 bg-white/5 flex items-center justify-between hover:bg-white/8 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm">
                      {fase.id}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-white">{fase.titulo}</p>
                      <p className="text-xs text-gray-500">{fase.descricao}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-gray-400">{concluidosFase}/{obrasFase}</span>
                    {estaAberto ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </div>
                </button>

                {estaAberto && (
                  <div className="p-3 space-y-2 bg-white/3">
                    {fase.obras.map((obra) => (
                      <div
                        key={obra.id}
                        className={`p-3 rounded-lg border ${
                          concluidos[obra.id]
                            ? "bg-green-500/10 border-green-500/30"
                            : "bg-white/5 border-white/8"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => toggleObra(obra.id)}
                            className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                              concluidos[obra.id]
                                ? "bg-green-500 border-green-500 text-black"
                                : "border-gray-500 hover:border-green-400"
                            }`}
                          >
                            {concluidos[obra.id] && <Check className="w-4 h-4" />}
                          </button>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm font-semibold ${concluidos[obra.id] ? "text-green-400 line-through" : "text-white"}`}>
                              {obra.nome}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">{obra.descricao}</p>
                          </div>
                          <a
                            href={CONFIG.urlAmazon(obra.termoAmazon)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-shrink-0 px-2 py-1 rounded text-xs bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 transition-colors"
                          >
                            Amazon
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={() => setConcluidos({})}
          className="w-full text-sm text-gray-500 hover:text-red-400 underline"
        >
          Limpar progresso
        </button>
      </div>
      <ToolContent
        toolName="Roteiro de Estudos do Judaísmo"
        category="Religioso"
        data={{
          directAnswer: "O roteiro de estudos do judaísmo organiza um plano estruturado para aprender sobre a Torá, tradições e calendário judaico de forma progressiva.",
          howItWorks: "A ferramenta organiza tópicos de estudo sobre o judaísmo em uma sequência lógica, cobrindo temas como a Torá, o calendário hebraico, as festas judaicas e tradições, ajudando tanto praticantes quanto pessoas interessadas em aprender sobre a cultura e religião judaica de forma estruturada.",
          example: {
            title: "Exemplo: plano de estudo introdutório",
            steps: [
              "Módulo 1: Introdução à Torá e seus 5 livros",
              "Módulo 2: Calendário hebraico e principais festas",
              "Módulo 3: Práticas e tradições do Shabat",
              "Módulo 4: Festas maiores (Pessach, Rosh Hashaná, Yom Kipur)",
            ],
            result: "O roteiro de estudo introdutório cobre os fundamentos da Torá, do calendário e das principais práticas e festas judaicas.",
          },
          faqs: [
            { question: "Esse roteiro serve para quem não é judeu?", answer: "Sim, é útil tanto para praticantes quanto para qualquer pessoa interessada em conhecer a cultura e religião judaica." },
            { question: "O que é a Torá?", answer: "São os 5 primeiros livros da Bíblia hebraica (Gênesis, Êxodo, Levítico, Números e Deuteronômio), centrais na tradição judaica." },
            { question: "O calendário judaico é igual ao calendário comum?", answer: "Não, o calendário hebraico é lunissolar, com meses baseados no ciclo lunar e ajustes para acompanhar as estações do ano." },
            { question: "Quais são as principais festas judaicas?", answer: "Entre as mais importantes estão Rosh Hashaná (Ano Novo), Yom Kipur (Dia do Perdão), Pessach (Páscoa judaica) e Sucot." },
          ],
        }}
      />
    </ToolLayout>
  );
}
