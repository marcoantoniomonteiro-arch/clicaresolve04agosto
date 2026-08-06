import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AdPlaceholder } from "./AdPlaceholder";
import { SEOHead } from "./SEOHead";
import { TOOLS } from "../data/tools";
import { CATEGORY_SEO_DATA } from "../data/seoData";
import { getToolSEO } from "../data/toolSeoData";
import { useNavigation } from "../context/NavigationContext";
import { toolsSeoENByPtSlug } from "../i18n/tools/en";
import { wasScrolling } from "../utils/touchHandler";

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
  const { onSelectCategory, onSelectTool, lang } = useNavigation();
  const toolSlug = slug || TOOLS.find((t) => t.name === title)?.slug || "";
  const seoEN = lang === "en" ? toolsSeoENByPtSlug[toolSlug] : null;
  const categorySlug = CATEGORY_SLUG_MAP[category] || "";
  const categoryData = CATEGORY_SEO_DATA[categorySlug];
  const categoryName = categoryData?.categoryName || category;

  const seo = getToolSEO(toolSlug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const relatedTools = TOOLS
    .filter((t) => t.category === category && t.name !== title)
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

  if (seo.hasFAQ && seo.faqs && seo.faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: seo.faqs.map((faq) => ({
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
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
          <button onClick={onBack} className="hover:text-green-400 transition-colors">{lang === "en" ? "Home" : "Início"}</button>
          <span>/</span>
          {categorySlug ? (
            <button onClick={() => onSelectCategory(categorySlug)} className="hover:text-green-400 transition-colors">
              {categoryName}
            </button>
          ) : (
            <span>{categoryName}</span>
          )}
          <span>/</span>
          <span className="text-gray-300">{title}</span>
        </nav>

        <button
          onClick={onBack}
          onTouchEnd={(e) => { e.preventDefault(); if (wasScrolling()) return; onBack(); }}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-green-400 transition-colors mb-4"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <ArrowLeft className="w-4 h-4" />
          {lang === "en" ? "Back to Menu" : "Voltar ao Menu"}
        </button>

        <AdPlaceholder size="banner" slot="topo" />

        <div className="flex flex-col md:flex-row items-start gap-4 mb-10">
          <div className="flex-1 bg-card rounded-2xl p-6 border border-white/5 shadow-xl animate-fade-in-up">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0" style={{ background: 'rgba(0,200,83,0.12)' }}>{emoji}</div>
              <div>
                <span className="text-xs font-semibold text-green-400 uppercase tracking-wider">{category}</span>
                <h1 className="text-2xl font-bold text-white mt-0.5">{seoEN ? seoEN.h1 : title}</h1>
                <p className="text-sm text-gray-400 mt-1">{seoEN ? seoEN.intro : description}</p>
              </div>
            </div>

            {children}
          </div>

          {/* Internal promo banner */}
          <SolarPromoBanner currentSlug={toolSlug} onNavigate={onSelectTool} />
        </div>

        {affiliateBanner}

        <AdPlaceholder size="quadrado" slot="meio" />

        {disclaimer && (
          <div className="my-6 p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 text-yellow-300 text-sm">
            <strong>Aviso:</strong> {disclaimer}
          </div>
        )}

        {/* Expanded content sections */}
        <div className="border-t border-white/5 pt-8 mt-2">
          {content}
        </div>

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <div className="mt-12 mb-8 border-t border-white/5 pt-8">
            <h2 className="text-lg font-bold text-white mb-4">
              Ferramentas relacionadas em {categoryName}
            </h2>
            <div className="space-y-3">
              {relatedTools.map((tool, i) => (
                <button
                  key={tool.id}
                  onClick={() => onSelectTool(tool.slug)}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-green-400/5 hover:border-green-400/30 transition-all duration-200 text-left group hover:translate-x-1 animate-fade-in-up"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <span className="text-xl transition-transform group-hover:scale-110">{tool.emoji}</span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">{tool.name}</p>
                    <p className="text-xs text-gray-500 line-clamp-1">{tool.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-green-400 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Link to category page */}
        {categorySlug && (
          <div className="mt-6 mb-6">
            <button
              onClick={() => onSelectCategory(categorySlug)}
              className="w-full p-3 rounded-xl bg-green-400/10 border border-green-400/20 hover:bg-green-400/20 transition-all text-sm font-semibold text-green-400 flex items-center justify-center gap-2"
            >
              <span>Ver todas as ferramentas de {categoryName}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        <footer className="text-center text-xs text-gray-600 mt-8 pb-6">
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
  const promo = useMemo(
    () => SOLAR_PROMO_MESSAGES[Math.floor(Math.random() * SOLAR_PROMO_MESSAGES.length)],
    []
  );
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
