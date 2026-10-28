import { ArrowLeft, ArrowRight } from "lucide-react";
import { SEOHead } from "../components/SEOHead";
import { SiteFooterLinks } from "../components/SiteFooterLinks";
import { GUIDES_META } from "../data/guidesMeta";

export function GuidesIndexPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="min-h-screen bg-bg text-text pt-16">
      <SEOHead
        title="Guias Práticos: Como Calcular BTU, m², Horas e Mais"
        description="Guias explicados passo a passo: quantos BTUs comprar, como calcular metro quadrado, carne por pessoa no churrasco, horas em decimais e mais."
        canonical="/guias"
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Guias práticos do CLICAresolve",
          url: "https://www.clicaresolve.com.br/guias",
          mainEntity: {
            "@type": "ItemList",
            itemListElement: GUIDES_META.map((g, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: g.title,
              url: `https://www.clicaresolve.com.br/guia/${g.slug}`,
            })),
          },
        }}
        breadcrumbs={[{ name: "Início", url: "/" }, { name: "Guias", url: "/guias" }]}
      />

      <div className="max-w-3xl mx-auto px-4 py-8">
        <a
          href="/"
          onClick={(e) => { if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); onBack(); }}
          className="flex items-center gap-2 text-sm text-muted hover:text-green-400 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Início
        </a>

        <h1 className="text-3xl font-extrabold text-text mb-3">Guias práticos</h1>
        <p className="text-base text-muted leading-relaxed mb-8">
          Explicações passo a passo, com fórmulas, tabelas e exemplos, para você entender a conta antes de
          usar a ferramenta — ou fazer à mão, se preferir.
        </p>

        <div className="space-y-3">
          {GUIDES_META.map((g) => (
            <a
              key={g.slug}
              href={`/guia/${g.slug}`}
              className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border hover:border-green-400/30 hover:bg-green-400/5 transition-all"
            >
              <span className="text-3xl">{g.emoji}</span>
              <span className="flex-1">
                <span className="block text-base font-bold text-text mb-1">{g.title}</span>
                <span className="block text-sm text-muted leading-relaxed">{g.description}</span>
              </span>
              <ArrowRight className="w-4 h-4 text-muted mt-1" />
            </a>
          ))}
        </div>

        <footer className="text-center text-xs text-muted mt-12 pb-6 border-t border-border pt-6">
          <SiteFooterLinks />
          © {new Date().getFullYear()} CLICAresolve — Ferramentas gratuitas para o dia a dia
        </footer>
      </div>
    </div>
  );
}
