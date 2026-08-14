import React from "react";
import { SEOHead } from "./SEOHead";
import { ArrowLeft } from "lucide-react";

interface StaticPageProps {
  title: string;
  description: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  onBack: () => void;
  children: React.ReactNode;
}

export function StaticPage({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  onBack,
  children,
}: StaticPageProps) {
  return (
    <div className="min-h-screen bg-bg text-text pt-16">
      <SEOHead
        title={title}
        description={description}
        canonical={canonical}
        ogTitle={ogTitle || title}
        ogDescription={ogDescription || description}
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

        <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-xl">
          {children}
        </div>
      </div>
    </div>
  );
}
