import React from "react";
import { StaticPage } from "../components/StaticPage";
import { Guide } from "../data/guides";
import { ArrowRight, Clock } from "lucide-react";
import { useNavigation } from "../context/NavigationContext";

interface Props {
  guide: Guide;
  onBack: () => void;
}

export function GuiaArticlePage({ guide, onBack }: Props) {
  const { onSelectTool } = useNavigation();

  return (
    <StaticPage
      title={`${guide.title} — CLICAresolve`}
      description={guide.description}
      canonical={`/guia/${guide.slug}`}
      ogTitle={guide.title}
      ogDescription={guide.description}
      onBack={onBack}
    >
      <div className="mb-8">
        <div className="text-5xl mb-3">{guide.emoji}</div>
        <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full border text-green-400 bg-green-400/10 border-green-400/20 mb-3">
          {guide.category}
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-white mb-3 leading-tight">{guide.title}</h1>
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
          <Clock className="w-3.5 h-3.5" />
          <span>{guide.readingTime}</span>
          <span>•</span>
          <span>Atualizado em {guide.updatedAt}</span>
        </div>
        <p className="text-sm text-gray-300 leading-relaxed">{guide.intro}</p>
      </div>

      <div className="space-y-8">
        {guide.sections.map((section, i) => (
          <div key={i}>
            <h2 className="text-lg font-bold text-white mb-3">{section.heading}</h2>
            <div className="space-y-3">
              {section.paragraphs.map((p, j) => (
                <p key={j} className="text-sm text-gray-300 leading-relaxed">{p}</p>
              ))}
            </div>
            {section.list && (
              <ul className="mt-3 space-y-2">
                {section.list.map((item, k) => (
                  <li key={k} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-green-400 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {guide.relatedTools.length > 0 && (
        <div className="mt-10 pt-6 border-t border-white/5">
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-3">
            Ferramentas relacionadas a este guia
          </p>
          <div className="flex flex-wrap gap-2">
            {guide.relatedTools.map((tool) => (
              <button
                key={tool.slug}
                onClick={() => onSelectTool(tool.slug)}
                className="group flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-green-400/30 hover:bg-green-400/5 text-sm text-gray-300 hover:text-white transition-all"
              >
                {tool.name}
                <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}
          </div>
        </div>
      )}
    </StaticPage>
  );
}
