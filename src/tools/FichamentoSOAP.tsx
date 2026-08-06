import React, { useState } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { Copy, Check, BookOpen } from "lucide-react";
import { ToolContent } from "../components/ToolContent";

interface Props {
  onBack: () => void;
}

export function FichamentoSOAP({ onBack }: Props) {
  const [scripture, setScripture] = useState("");
  const [observation, setObservation] = useState("");
  const [application, setApplication] = useState("");
  const [prayer, setPrayer] = useState("");
  const [copiado, setCopiado] = useState(false);

  const textoFormatado = `📖 SCRIPTURE
${scripture || "..."}

🔍 OBSERVATION
${observation || "..."}

✝️ APPLICATION
${application || "..."}

🙏 PRAYER
${prayer || "..."}

---
Estudo via CLICAresolve`;

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(textoFormatado);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar", err);
    }
  };

  const limpar = () => {
    setScripture("");
    setObservation("");
    setApplication("");
    setPrayer("");
  };

  const preenchido = scripture || observation || application || prayer;

  return (
    <ToolLayout
      title="Fichamento SOAP"
      emoji="✍️"
      category="Religioso"
      description="Metodo SOAP para estudo biblico: Scripture, Observation, Application, Prayer."
      onBack={onBack}
      affiliateBanner={
        <AffiliateBanner
          terms={["diario de estudos biblicos", "caderno devocional", "bloco de notas espirituais"]}
          label="Registre seus estudos"
        />
      }
    >
      <div className="space-y-5">
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <p className="text-xs text-blue-400 mb-2">Metodo SOAP</p>
          <div className="grid grid-cols-4 gap-2 text-xs text-center">
            <div className="p-2 rounded bg-white/5">
              <p className="font-bold text-blue-400">S</p>
              <p className="text-gray-400">Scripture</p>
            </div>
            <div className="p-2 rounded bg-white/5">
              <p className="font-bold text-green-400">O</p>
              <p className="text-gray-400">Observation</p>
            </div>
            <div className="p-2 rounded bg-white/5">
              <p className="font-bold text-yellow-400">A</p>
              <p className="text-gray-400">Application</p>
            </div>
            <div className="p-2 rounded bg-white/5">
              <p className="font-bold text-pink-400">P</p>
              <p className="text-gray-400">Prayer</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm text-blue-400 mb-1">
              <BookOpen className="w-4 h-4" />
              Scripture (Versiculo)
            </label>
            <textarea
              value={scripture}
              onChange={(e) => setScripture(e.target.value)}
              placeholder="Cole aqui o versiculo ou passagem que deseja estudar..."
              className="input-field w-full h-20 resize-none p-3"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm text-green-400 mb-1">
              <span className="w-4 h-4 flex items-center justify-center text-xs font-bold bg-green-500/20 rounded">O</span>
              Observation (O que diz?)
            </label>
            <textarea
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              placeholder="O que este texto esta dizendo? Qual e o contexto? A quem foi escrito?"
              className="input-field w-full h-20 resize-none p-3"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm text-yellow-400 mb-1">
              <span className="w-4 h-4 flex items-center justify-center text-xs font-bold bg-yellow-500/20 rounded">A</span>
              Application (Aplicacao pessoal)
            </label>
            <textarea
              value={application}
              onChange={(e) => setApplication(e.target.value)}
              placeholder="Como posso aplicar isso na minha vida hoje? O que Deus esta me falando?"
              className="input-field w-full h-20 resize-none p-3"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm text-pink-400 mb-1">
              <span className="w-4 h-4 flex items-center justify-center text-xs font-bold bg-pink-500/20 rounded">P</span>
              Prayer (Oracao)
            </label>
            <textarea
              value={prayer}
              onChange={(e) => setPrayer(e.target.value)}
              placeholder="Senhor, ajuda-me a..."
              className="input-field w-full h-20 resize-none p-3"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={copiar}
            disabled={!preenchido}
            className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {copiado ? (
              <>
                <Check className="w-4 h-4" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copiar Texto
              </>
            )}
          </button>
          <button
            onClick={limpar}
            className="px-4 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors"
          >
            Limpar
          </button>
        </div>

        {preenchido && (
          <div className="p-4 rounded-xl bg-white/5 border border-white/8">
            <p className="text-xs text-gray-400 mb-2">Pre-visualizacao</p>
            <pre className="text-xs text-gray-300 whitespace-pre-wrap font-mono">
              {textoFormatado}
            </pre>
          </div>
        )}
      </div>
      <ToolContent
        toolName="Fichamento SOAP"
        category="Religioso"
        data={{
          directAnswer: "O método SOAP (Scripture, Observation, Application, Prayer) é uma técnica de estudo bíblico estruturada em 4 etapas para reflexão e aplicação pessoal das Escrituras.",
          howItWorks: "A ferramenta organiza o estudo bíblico seguindo o método SOAP: Scripture (escrever a passagem bíblica lida), Observation (observações sobre o que o texto diz), Application (como aplicar esse ensinamento na vida pessoal) e Prayer (uma oração relacionada à reflexão feita). Esse método ajuda a transformar a leitura bíblica em um estudo mais profundo e pessoal.",
          example: {
            title: "Exemplo: fichamento SOAP de um versículo",
            steps: [
              "Scripture: o versículo escolhido é copiado",
              "Observation: o que o texto ensina, contexto histórico",
              "Application: como aplicar esse ensinamento no dia a dia",
              "Prayer: uma oração curta relacionada à reflexão",
            ],
            result: "O método SOAP transforma a leitura de um único versículo em um momento estruturado de reflexão pessoal e oração.",
          },
          faqs: [
            { question: "O que significa a sigla SOAP?", answer: "Scripture (Escritura), Observation (Observação), Application (Aplicação) e Prayer (Oração) — as 4 etapas do método de estudo." },
            { question: "Esse método é usado por alguma denominação específica?", answer: "Não, é um método popular entre diferentes tradições cristãs para estudo bíblico pessoal e devocional." },
            { question: "Preciso seguir a ordem das 4 etapas?", answer: "Recomenda-se seguir a ordem, já que cada etapa se constrói sobre a anterior, partindo do texto até chegar à aplicação e oração." },
            { question: "Posso usar esse método em grupo?", answer: "Sim, o método SOAP também é usado em estudos bíblicos em grupo, com cada participante compartilhando suas observações e aplicações." },
          ],
        }}
      />
    </ToolLayout>
  );
}
