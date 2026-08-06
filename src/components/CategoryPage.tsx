import React from "react";
import { SEOHead } from "./SEOHead";
import { TOOLS } from "../data/tools";
import { CATEGORY_SEO_DATA, CategorySEOData } from "../data/seoData";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

interface CategoryPageProps {
  slug: string;
  onBack: () => void;
  onSelectTool: (slug: string) => void;
  onSelectCategory: (cat: string) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  "Casa": "text-blue-400 bg-blue-400/10 border-blue-400/20",
  "Saúde": "text-pink-400 bg-pink-400/10 border-pink-400/20",
  "Finanças": "text-green-400 bg-green-400/10 border-green-400/20",
  "Esportes": "text-orange-400 bg-orange-400/10 border-orange-400/20",
  "Educação": "text-purple-400 bg-purple-400/10 border-purple-400/20",
  "Utilidades": "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  "DP/RH": "text-amber-400 bg-amber-400/10 border-amber-400/20",
  "Redes Sociais": "text-rose-400 bg-rose-400/10 border-rose-400/20",
  "Religioso": "text-violet-400 bg-violet-400/10 border-violet-400/20",
  "Astrologia": "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
  "Livros e Leitura": "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  "Família e Bebês": "text-pink-400 bg-pink-400/10 border-pink-400/20",
  "Pet": "text-teal-400 bg-teal-400/10 border-teal-400/20",
  "Lazer": "text-sky-400 bg-sky-400/10 border-sky-400/20",
  "Calculadoras": "text-lime-400 bg-lime-400/10 border-lime-400/20",
  "Produtividade": "text-fuchsia-400 bg-fuchsia-400/10 border-fuchsia-400/20",
  "Culinária": "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  "Sorte": "text-red-400 bg-red-400/10 border-red-400/20",
};

export function CategoryPage({ slug, onBack, onSelectTool, onSelectCategory }: CategoryPageProps) {
  const data: CategorySEOData = CATEGORY_SEO_DATA[slug];
  if (!data) return null;

  const categoryTools = TOOLS.filter((t) => {
    // Map category filter to actual tool categories
    const map: Record<string, string[]> = {
      "Casa": ["Casa", "Calculadoras"],
      "Saúde": ["Saúde"],
      "Finanças": ["Finanças"],
      "Esportes": ["Esportes", "Sorte"],
      "Educação": ["Educação", "Produtividade"],
      "Utilidades": ["Utilidades"],
      "DP/RH": ["DP/RH"],
      "Redes Sociais": ["Redes Sociais"],
      "Religioso": ["Religioso"],
      "Astrologia": ["Astrologia"],
      "Livros e Leitura": ["Livros e Leitura"],
      "Família e Bebês": ["Família e Bebês"],
      "Pet": ["Pet"],
      "Lazer": ["Lazer"],
      "Produtividade": ["Produtividade", "Educação"],
      "Culinária": ["Culinária"],
    };
    const cats = map[data.categoryFilter] || [data.categoryFilter];
    return cats.includes(t.category);
  });

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: data.h1,
    description: data.metaDescription,
    url: `https://www.clicaresolve.com.br/categoria/${slug}`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: categoryTools.map((t, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: t.name,
        url: `https://www.clicaresolve.com.br/${t.slug}`,
      })),
    },
    about: {
      "@type": "Thing",
      name: data.categoryName,
      description: data.intro.slice(0, 200),
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `As ferramentas de ${data.categoryName} são gratuitas?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Sim, todas as ferramentas de ${data.categoryName} no CLICAresolve são 100% gratuitas, sem cadastro e sem limites de uso.`,
        },
      },
      {
        "@type": "Question",
        name: `As calculadoras de ${data.categoryName} são precisas?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Todas as ferramentas seguem metodologias científicas e técnicas reconhecidas. Os cálculos acontecem no seu navegador, garantindo privacidade e precisão.`,
        },
      },
      {
        "@type": "Question",
        name: `Preciso criar conta para usar as ferramentas de ${data.categoryName}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Não. Nenhuma ferramenta do CLICAresolve exige cadastro. Basta acessar e usar diretamente no navegador.`,
        },
      },
    ],
  };

  const breadcrumbs = [
    { name: "Início", url: "/" },
    { name: data.categoryName, url: `/categoria/${slug}` },
  ];

  return (
    <div className="min-h-screen bg-bg text-text pt-16">
      <SEOHead
        title={data.title}
        description={data.metaDescription}
        canonical={`/categoria/${slug}`}
        ogTitle={data.ogTitle}
        ogDescription={data.ogDescription}
        ogType="website"
        schema={[collectionSchema, faqSchema]}
        breadcrumbs={breadcrumbs}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted mb-6" aria-label="Breadcrumb">
          <button onClick={onBack} className="hover:text-green-400 transition-colors">Início</button>
          <span>/</span>
          <span className="text-muted">{data.categoryName}</span>
        </nav>

        {/* H1 + Emoji */}
        <div className="mb-8">
          <div className="text-5xl mb-3">{data.emoji}</div>
          <h1 className="text-3xl sm:text-4xl font-black text-text leading-tight mb-3">
            {data.h1}
          </h1>
          <p className="text-sm text-muted">{categoryTools.length} ferramentas gratuitas</p>
        </div>

        {/* Intro text */}
        <div className="p-6 rounded-2xl bg-card border border-border mb-8">
          <h2 className="text-lg font-bold text-text mb-3">Sobre as ferramentas de {data.categoryName}</h2>
          <p className="text-muted leading-relaxed text-sm">{data.intro}</p>
        </div>

        {/* Diferenciais */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-text mb-4">Por que usar nossas ferramentas de {data.categoryName.toLowerCase()}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.diferenciais.map((d, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted">{d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-text mb-4">Todas as ferramentas de {data.categoryName}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {categoryTools.map((tool) => {
              const catColor = CATEGORY_COLORS[tool.category] || "text-gray-400 bg-gray-400/10 border-gray-400/20";
              return (
                <button
                  key={tool.id}
                  onClick={() => onSelectTool(tool.slug)}
                  className="group text-left p-4 rounded-xl bg-card border border-border hover:border-green-400/30 hover:bg-green-400/5 transition-all duration-200 flex items-start gap-3"
                >
                  <div className="text-2xl">{tool.emoji}</div>
                  <div className="flex-1">
                    <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full border mb-1 ${catColor}`}>
                      {tool.category}
                    </span>
                    <h3 className="text-sm font-bold text-text leading-tight">{tool.name}</h3>
                    <p className="text-xs text-muted mt-1 line-clamp-2">{tool.description}</p>
                    <div className="mt-2 flex items-center gap-1 text-xs text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span>Abrir</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-8">
          <h2 className="text-lg font-bold text-text mb-4">Perguntas Frequentes sobre {data.categoryName}</h2>
          <div className="space-y-3">
            {[
              {
                q: `As ferramentas de ${data.categoryName} são gratuitas?`,
                a: `Sim, todas as ferramentas de ${data.categoryName} no CLICAresolve são 100% gratuitas, sem cadastro e sem limites de uso.`,
              },
              {
                q: `As calculadoras de ${data.categoryName} são precisas?`,
                a: `Todas as ferramentas seguem metodologias científicas e técnicas reconhecidas. Os cálculos acontecem no seu navegador, garantindo privacidade e precisão.`,
              },
              {
                q: `Preciso criar conta para usar as ferramentas de ${data.categoryName}?`,
                a: `Não. Nenhuma ferramenta do CLICAresolve exige cadastro. Basta acessar e usar diretamente no navegador.`,
              },
              {
                q: `Meus dados ficam seguros ao usar as ferramentas de ${data.categoryName}?`,
                a: `Sim. 100% dos cálculos acontecem no seu navegador. Nenhum dado é enviado a servidores. Sua privacidade é total.`,
              },
            ].map((faq, i) => (
              <div key={i} className="p-4 rounded-xl bg-card border border-border">
                <h3 className="text-sm font-semibold text-text mb-2">{faq.q}</h3>
                <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Back to home */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-muted hover:text-green-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Início
        </button>
      </div>

      <footer className="text-center text-xs text-muted py-8 border-t border-border">
        © {new Date().getFullYear()} CLICAresolve — Ferramentas gratuitas para o dia a dia
      </footer>
    </div>
  );
}
