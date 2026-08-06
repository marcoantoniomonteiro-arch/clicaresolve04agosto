import React from "react";
import { ArrowRight } from "lucide-react";
import { CONFIG } from "../config";

export interface ToolContentData {
  // Direct answer below H1 (1-2 sentences for featured snippets)
  directAnswer?: string;
  // How It Works section
  howItWorks: string;
  // Example section
  example: {
    title: string;
    steps: string[];
    result: string;
  };
  // Saúde attribution
  attribution?: {
    fonte: string;
    data: string;
  };
  // Finanças glossary
  glossary?: { term: string; definition: string }[];
  // Estudos outbound links
  outboundLinks?: { label: string; url: string; source: string }[];
  // Transportes context
  transportContext?: {
    tipo: "gasolina" | "alcool" | "energia" | "tinta";
  };
  // Additional info blocks (rendered before FAQ)
  infoBlocks?: { title: string; paragraphs: string[] }[];
  // FAQ
  faqs: { question: string; answer: string }[];
}

interface Props {
  data: ToolContentData;
  toolName: string;
  category: string;
}

export function ToolContent({ data, toolName, category }: Props) {
  return (
    <div className="space-y-8 mt-8">
      {/* Direct Answer */}
      {data.directAnswer && (
        <div className="p-4 rounded-xl bg-green-400/5 border border-green-400/10">
          <p className="text-sm text-gray-300 leading-relaxed resposta-direta">{data.directAnswer}</p>
        </div>
      )}

      {/* How It Works */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Como funciona o cálculo de {toolName}</h2>
        <div className="p-5 rounded-xl bg-white/5 border border-white/10">
          <p className="text-sm text-gray-300 leading-relaxed">{data.howItWorks}</p>
        </div>
      </div>

      {/* Saúde Attribution */}
      {data.attribution && (
        <div className="p-3 rounded-xl bg-blue-400/5 border border-blue-400/10">
          <p className="text-xs text-blue-400">
            Cálculo baseado em <strong>{data.attribution.fonte}</strong>, revisado em {data.attribution.data}
          </p>
        </div>
      )}

      {/* Finanças Glossary */}
      {data.glossary && data.glossary.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-white mb-4">Glossário de Termos</h2>
          <div className="space-y-2">
            {data.glossary.map((item, i) => (
              <details key={i} className="group rounded-xl bg-white/5 border border-white/10 overflow-hidden">
                <summary className="p-4 text-sm font-semibold text-white cursor-pointer hover:bg-white/5 transition-colors flex items-center justify-between">
                  <span>{item.term}</span>
                  <ArrowRight className="w-4 h-4 text-gray-500 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-4 pb-4 text-sm text-gray-400 leading-relaxed">
                  {item.definition}
                </div>
              </details>
            ))}
          </div>
        </div>
      )}

      {/* Transportes Context */}
      {data.transportContext && (
        <div className="p-4 rounded-xl bg-yellow-400/5 border border-yellow-400/10">
          <h2 className="text-sm font-bold text-white mb-2">Dados de Contexto Atual</h2>
          <p className="text-xs text-gray-400">
            {data.transportContext.tipo === "gasolina" && (
              <>
                Em {CONFIG.anoAtual}, a média do litro da gasolina no Brasil gira em torno de <strong className="text-yellow-400">R$ {CONFIG.precoMedioGasolina2026.toFixed(2)}</strong>. 
                Preços podem variar por região e posto. Atualizado periodicamente.
              </>
            )}
            {data.transportContext.tipo === "alcool" && (
              <>
                Em {CONFIG.anoAtual}, a média do litro do etanol no Brasil gira em torno de <strong className="text-yellow-400">R$ {CONFIG.precoMedioAlcool2026.toFixed(2)}</strong>. 
                A relação ideal com a gasolina é de até 70% para valer a pena abastecer com etanol.
              </>
            )}
            {data.transportContext.tipo === "energia" && (
              <>
                Em {CONFIG.anoAtual}, a tarifa média de energia elétrica residencial no Brasil é de aproximadamente <strong className="text-yellow-400">R$ {CONFIG.tarifaEnergiaKWh.toFixed(2)}/kWh</strong>. 
                Varia por estado e distribuidora.
              </>
            )}
            {data.transportContext.tipo === "tinta" && (
              <>
                Em {CONFIG.anoAtual}, a média de rendimento de tinta é de aproximadamente <strong className="text-yellow-400">{CONFIG.rendimentoTintaPorLitro} m² por litro</strong> por demão. 
                Varia por tipo de tinta, superfície e marca.
              </>
            )}
          </p>
        </div>
      )}

      {/* Example */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Exemplo prático</h2>
        <div className="p-5 rounded-xl bg-white/5 border border-white/10 resultado-principal">
          <p className="text-sm font-bold text-white mb-3">{data.example.title}</p>
          <ol className="space-y-2">
            {data.example.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-sm font-bold text-green-400 w-6 flex-shrink-0">{i + 1}.</span>
                <p className="text-sm text-gray-300 leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-sm text-green-400 font-semibold">{data.example.result}</p>
          </div>
        </div>
      </div>

      {/* Estudos Outbound Links */}
      {data.outboundLinks && data.outboundLinks.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-white mb-4">Fontes e Referências Oficiais</h2>
          <div className="space-y-2">
            {data.outboundLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-400/5 hover:border-blue-400/20 transition-all"
              >
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">{link.label}</p>
                  <p className="text-xs text-gray-500">{link.source}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-500" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Info Blocks */}
      {data.infoBlocks && data.infoBlocks.length > 0 && (
        data.infoBlocks.map((block, i) => (
          <div key={i}>
            <h2 className="text-lg font-bold text-white mb-4">{block.title}</h2>
            <div className="p-5 rounded-xl bg-white/5 border border-white/10 space-y-3">
              {block.paragraphs.map((para, j) => (
                <p key={j} className="text-sm text-gray-300 leading-relaxed">{para}</p>
              ))}
            </div>
          </div>
        ))
      )}

      {/* FAQ */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4">Perguntas Frequentes</h2>
        <dl className="space-y-3">
          {data.faqs.map((faq, i) => (
            <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
              <dt className="text-sm font-semibold text-white mb-2">{faq.question}</dt>
              <dd className="text-sm text-gray-400 leading-relaxed">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
