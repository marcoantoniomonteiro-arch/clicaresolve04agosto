import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AdPlaceholder } from "./AdPlaceholder";
import { SiteFooterLinks } from "./SiteFooterLinks";
import { ShareButtons } from "./ShareButtons";
import { getGuidesForTool } from "../data/guidesMeta";
import { ToolContent } from "./ToolContent";
import { SEOHead } from "./SEOHead";
import { TOOLS } from "../data/tools";
import { CATEGORY_SEO_DATA } from "../data/seoData";
import { getToolSEO } from "../data/toolSeoData";
import { useNavigation } from "../context/NavigationContext";
import { toolsSeoENByPtSlug } from "../i18n/tools/en";
import { wasScrolling } from "../utils/touchHandler";

type FAQ = { question: string; answer: string };

/** Procura um <ToolContent> entre os filhos e devolve as perguntas dele. */
function findContentFaqs(node: React.ReactNode, depth = 0): FAQ[] | null {
  if (depth > 3) return null;
  let found: FAQ[] | null = null;
  React.Children.forEach(node, (child) => {
    if (found || !React.isValidElement(child)) return;
    const el = child as React.ReactElement<{ data?: { faqs?: FAQ[] }; children?: React.ReactNode }>;
    if (el.type === ToolContent && el.props.data?.faqs?.length) {
      found = el.props.data.faqs;
    } else if (el.props.children) {
      found = findContentFaqs(el.props.children, depth + 1);
    }
  });
  return found;
}

interface ToolLayoutProps {
  title: string;
  emoji: string;
  category: string;
  description: string;
  onBack: () => void;
  children: React.ReactNode;
  affiliateBanner?: React.ReactNode;
  disclaimer?: string;
  slug?: string;
  content?: React.ReactNode;
}

const CATEGORY_SLUG_MAP: Record<string, string> = {
  "Casa": "casa-transportes",
  "Saúde": "saude-bem-estar",
  "Finanças": "financas",
  "Esportes": "esportes",
  "Educação": "estudos",
  "Produtividade": "micro-nichos",
  "Utilidades": "utilidades",
  "DP/RH": "micro-nichos",
  "Redes Sociais": "micro-nichos",
  "Religioso": "religioso",
  "Astrologia": "astrologia",
  "Livros e Leitura": "livros",
  "Família e Bebês": "familia-bebes",
  "Pet": "pet",
  "Lazer": "viagem",
  "Calculadoras": "casa-transportes",
  "Culinária": "micro-nichos",
  "Sorte": "esportes",
};

export function ToolLayout({
  title,
  emoji,
  category,
  description,
  onBack,
  children,
  affiliateBanner,
  disclaimer,
  slug,
  content,
}: ToolLayoutProps) {
  const { onSelectCategory, onSelectTool, lang, activeTool } = useNavigation();
  const toolSlug = slug || activeTool || TOOLS.find((t) => t.name === title)?.slug || "";
  const seoEN = lang === "en" ? toolsSeoENByPtSlug[toolSlug] : null;
  const categorySlug = CATEGORY_SLUG_MAP[category] || "";
  const categoryData = CATEGORY_SEO_DATA[categorySlug];
  const categoryName = categoryData?.categoryName || category;

  const seo = getToolSEO(toolSlug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const relatedTools = TOOLS
    .filter((t) => t.category === category && t.slug !== toolSlug)
    .slice(0, 4);

  const breadcrumbs = [
    { name: "Início", url: "/" },
    { name: categoryName, url: `/categoria/${categorySlug}` },
    { name: title, url: `/${toolSlug}` },
  ];

  const baseSchema = {
    "@context": "https://schema.org",
    "@type": seo.schemaType === "MedicalWebPage" ? "MedicalWebPage" : "SoftwareApplication",
    name: title,
    description: seo.description,
    url: `https://www.clicaresolve.com.br/${toolSlug}`,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "BRL",
    },
    about: {
      "@type": "Thing",
      name: categoryName,
    },
  };

  const schemas: Record<string, unknown>[] = [baseSchema];

  // As perguntas da própria ferramenta (ToolContent) têm prioridade; as do
  // arquivo de SEO só aparecem quando a ferramenta não tem FAQ própria.
  // Assim a página nunca mostra duas seções de FAQ com respostas diferentes.
  const contentFaqs = findContentFaqs(children);
  const seoFaqs = seo.hasFAQ && seo.faqs && seo.faqs.length > 0 ? seo.faqs : null;
  const pageFaqs = contentFaqs || seoFaqs;
  const showSeoFaqBlock = !contentFaqs && !!seoFaqs;

  if (pageFaqs) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: pageFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    });
  }

  return (
    <div className="min-h-screen bg-bg text-text pt-16" style={{ WebkitOverflowScrolling: 'touch' }}>
      <SEOHead
        title={seoEN ? seoEN.title : seo.title}
        description={seoEN ? seoEN.metaDescription : seo.description}
        canonical={seoEN ? `/en/${seoEN.enSlug}` : `/${toolSlug}`}
        ogTitle={seoEN ? seoEN.title : `${title} — CLICAresolve`}
        ogDescription={seoEN ? seoEN.metaDescription : seo.description}
        ogType="website"
        schema={schemas}
        breadcrumbs={breadcrumbs}
        speakable={true}
        lang={lang}
        alternateUrl={seoEN ? `/${toolSlug}` : (toolsSeoENByPtSlug[toolSlug] ? `/en/${toolsSeoENByPtSlug[toolSlug].enSlug}` : undefined)}
      />

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted mb-4" aria-label="Breadcrumb">
          <a href="/" onClick={(e) => { if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); onBack(); }} className="hover:text-green-400 transition-colors">{lang === "en" ? "Home" : "Início"}</a>
          <span>/</span>
          {categorySlug ? (
            <a href={`/categoria/${categorySlug}`} onClick={(e) => { if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); onSelectCategory(categorySlug); }} className="hover:text-green-400 transition-colors">
              {categoryName}
            </a>
          ) : (
            <span>{categoryName}</span>
          )}
          <span>/</span>
          <span className="text-muted">{title}</span>
        </nav>

        <a
          href="/"
          onClick={(e) => { if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); onBack(); }}
          onTouchEnd={(e) => { e.preventDefault(); if (wasScrolling()) return; onBack(); }}
          className="flex items-center gap-2 text-sm text-muted hover:text-green-400 transition-colors mb-4"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <ArrowLeft className="w-4 h-4" />
          {lang === "en" ? "Back to Menu" : "Voltar ao Menu"}
        </a>

        <AdPlaceholder size="banner" slot="topo" />

        <div className="flex flex-col md:flex-row items-start gap-4 mb-10">
          <div className="flex-1 bg-card rounded-2xl p-6 border border-border shadow-xl animate-fade-in-up">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0" style={{ background: 'rgba(0,200,83,0.12)' }}>{emoji}</div>
              <div>
                <span className="text-xs font-semibold text-green-400 uppercase tracking-wider">{category}</span>
                <h1 className="text-2xl font-bold text-text mt-0.5">{seoEN ? seoEN.h1 : title}</h1>
                <p className="text-sm text-muted mt-1">{seoEN ? seoEN.intro : description}</p>
              </div>
            </div>

            {children}
          </div>

          {/* Internal promo banner */}
          <SolarPromoBanner currentSlug={toolSlug} onNavigate={onSelectTool} />
        </div>

        <ShareButtons
          url={`https://www.clicaresolve.com.br${seoEN ? `/en/${seoEN.enSlug}` : `/${toolSlug}`}`}
          text={seoEN ? seoEN.h1 : `${title} — grátis no CLICAresolve`}
          className="mb-6"
        />

        {getGuidesForTool(toolSlug).map((g) => (
          <a
            key={g.slug}
            href={`/guia/${g.slug}`}
            className="flex items-center gap-3 p-4 mb-6 rounded-xl bg-blue-400/5 border border-blue-400/20 hover:bg-blue-400/10 transition-colors"
          >
            <span className="text-2xl">{g.emoji}</span>
            <span className="flex-1">
              <span className="block text-xs font-semibold text-blue-400 uppercase tracking-wider">Guia completo</span>
              <span className="block text-sm font-bold text-text">{g.title}</span>
            </span>
            <ArrowRight className="w-4 h-4 text-blue-400" />
          </a>
        ))}

        {affiliateBanner}

        <AdPlaceholder size="quadrado" slot="meio" />

        {disclaimer && (
          <div className="my-6 p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 text-yellow-300 text-sm">
            <strong>Aviso:</strong> {disclaimer}
          </div>
        )}

        {/* Expanded content sections */}
        <div className="border-t border-border pt-8 mt-2">
          {content}
        </div>

        {/* FAQ visível — reaproveita seo.faqs, já usado no JSON-LD acima */}
        {showSeoFaqBlock && seoFaqs && (
          <div className="mt-10 border-t border-border pt-8">
            <h2 className="text-lg font-bold text-text mb-4">Perguntas Frequentes</h2>
            <div className="space-y-4">
              {seoFaqs.map((faq, i) => (
                <div key={i}>
                  <h3 className="text-sm font-semibold text-text mb-1">{faq.question}</h3>
                  <p className="text-sm text-muted leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <div className="mt-12 mb-8 border-t border-border pt-8">
            <h2 className="text-lg font-bold text-text mb-4">
              Ferramentas relacionadas em {categoryName}
            </h2>
            <div className="space-y-3">
              {relatedTools.map((tool, i) => (
                <a
                  key={tool.id}
                  href={`/${tool.slug}`}
                  onClick={(e) => { if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); onSelectTool(tool.slug); }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:bg-green-400/5 hover:border-green-400/30 transition-all duration-200 text-left group hover:translate-x-1 animate-fade-in-up"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <span className="text-xl transition-transform group-hover:scale-110">{tool.emoji}</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-text">{tool.name}</p>
                    <p className="text-xs text-muted line-clamp-1">{tool.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted group-hover:text-green-400 group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Link to category page */}
        {categorySlug && (
          <div className="mt-6 mb-6">
            <a
              href={`/categoria/${categorySlug}`}
              onClick={(e) => { if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); onSelectCategory(categorySlug); }}
              className="w-full p-3 rounded-xl bg-green-400/10 border border-green-400/20 hover:bg-green-400/20 transition-all text-sm font-semibold text-green-400 flex items-center justify-center gap-2"
            >
              <span>Ver todas as ferramentas de {categoryName}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        )}

        <footer className="text-center text-xs text-muted mt-8 pb-6 border-t border-border pt-6">
          <SiteFooterLinks />
          © {new Date().getFullYear()} CLICAresolve — Ferramentas gratuitas para o dia a dia
        </footer>
      </div>
    </div>
  );
}

const SOLAR_PROMO_MESSAGES = [
  { title: "Conta de luz menor", cta: "Simule grátis" },
  { title: "Economize na energia", cta: "Ver como" },
  { title: "Reduza sua conta", cta: "Simular agora" },
];

function SolarPromoBanner({ currentSlug, onNavigate }: { currentSlug: string; onNavigate: (slug: string) => void }) {
  // Escolha fixa por página (o HTML pré-renderizado e o navegador mostram o mesmo texto)
  const promo = useMemo(() => {
    let h = 0;
    for (const c of currentSlug) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    return SOLAR_PROMO_MESSAGES[h % SOLAR_PROMO_MESSAGES.length];
  }, [currentSlug]);
  if (currentSlug === "economia-energia-solar") return null;
  return (
    <button
      onClick={() => onNavigate("economia-energia-solar")}
      className="relative w-[150px] h-[150px] shrink-0 flex flex-col items-center justify-center gap-1.5 p-3 rounded-2xl bg-gradient-to-br from-amber-400/20 via-amber-500/15 to-green-500/20 border border-amber-400/40 hover:border-amber-400/70 hover:from-amber-400/30 hover:to-green-500/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-400/20 text-center overflow-hidden"
    >
      <span className="absolute top-1.5 right-1.5 text-[9px] font-bold text-black bg-amber-400 px-1.5 py-0.5 rounded-full">
        NOVO
      </span>
      <div className="text-2xl">☀️</div>
      <span className="text-xs font-bold text-white leading-tight">
        {promo.title}
      </span>
      <span className="text-[10px] font-semibold text-amber-300 flex items-center gap-0.5">
        {promo.cta}
        <ArrowRight className="w-3 h-3" />
      </span>
    </button>
  );
}
