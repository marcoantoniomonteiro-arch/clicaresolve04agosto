import React from "react";
import { StaticPage } from "../components/StaticPage";
import { GUIDES } from "../data/guides";
import { Clock, ArrowRight } from "lucide-react";
import { useNavigation } from "../context/NavigationContext";

interface Props {
  onBack: () => void;
}

export function GuiasPage({ onBack }: Props) {
  const { onSelectGuide } = useNavigation();

  return (
    <StaticPage
      title="Guias — Conteúdo Completo sobre Finanças, Saúde e Casa | CLICAresolve"
      description="Guias completos e gratuitos sobre finanças pessoais, manutenção do carro e saúde, escritos para complementar nossas calculadoras com contexto real."
      canonical="/guias"
      ogTitle="Guias do CLICAresolve"
      ogDescription="Conteúdo completo e gratuito para te ajudar a tomar decisões melhores no dia a dia."
      onBack={onBack}
    >
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">📚</div>
        <h1 className="text-3xl font-black text-white mb-2">Guias</h1>
        <p className="text-sm text-gray-400 max-w-xl mx-auto">
          Conteúdo completo para complementar nossas ferramentas — sem enrolação, direto ao ponto,
          escrito para te ajudar a entender o "porquê" por trás do cálculo.
        </p>
      </div>

      <div className="space-y-4">
        {GUIDES.map((guide) => (
          <button
            key={guide.slug}
            onClick={() => onSelectGuide(guide.slug)}
            className="group w-full text-left p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-green-400/30 hover:bg-green-400/5 transition-all"
          >
            <div className="flex items-start gap-4">
              <div className="text-3xl shrink-0">{guide.emoji}</div>
              <div className="flex-1 min-w-0">
                <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full border text-green-400 bg-green-400/10 border-green-400/20 mb-2">
                  {guide.category}
                </span>
                <h2 className="text-base font-bold text-white mb-1 leading-tight group-hover:text-green-400 transition-colors">
                  {guide.title}
                </h2>
                <p className="text-sm text-gray-400 leading-relaxed mb-2">{guide.description}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{guide.readingTime}</span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-green-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
            </div>
          </button>
        ))}
      </div>
    </StaticPage>
  );
}
