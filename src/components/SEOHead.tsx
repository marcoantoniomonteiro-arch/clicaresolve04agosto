import React from "react";
import { Helmet } from "react-helmet-async";
import { TOOLS } from "../data/tools";

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  schema?: Record<string, unknown> | Record<string, unknown>[];
  breadcrumbs?: { name: string; url: string }[];
  speakable?: boolean;
  lang?: "pt" | "en";
  alternateUrl?: string;
}

const SITE_URL = "https://www.clicaresolve.com.br";
const DEFAULT_SEO_DESCRIPTION = `CLICAresolve — ${TOOLS.length} ferramentas gratuitas: calculadoras, conversores, utilitários e muito mais. Sem cadastro, tudo no navegador.`;

export function SEOHead({
  title,
  description = DEFAULT_SEO_DESCRIPTION,
  canonical,
  ogTitle,
  ogDescription,
  ogType = "website",
  schema,
  breadcrumbs,
  speakable,
  lang = "pt",
  alternateUrl,
}: SEOHeadProps) {
  const fullTitle = title ? `${title} | CLICAresolve` : "CLICAresolve — Ferramentas Gratuitas para o Dia a Dia";
  const og = ogTitle || title || "CLICAresolve";
  const ogDesc = ogDescription || description;
  const url = canonical ? `${SITE_URL}${canonical}` : SITE_URL;

  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((b, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: b.name,
          item: b.url.startsWith("http") ? b.url : `${SITE_URL}${b.url}`,
        })),
      }
    : null;

  let allSchemas = schema
    ? breadcrumbSchema
      ? Array.isArray(schema) ? [...schema, breadcrumbSchema] : [schema, breadcrumbSchema]
      : Array.isArray(schema) ? schema : [schema]
    : breadcrumbSchema
      ? [breadcrumbSchema]
      : null;

  if (speakable && allSchemas) {
    allSchemas = allSchemas.map((s) => {
      if (s["@type"] === "SoftwareApplication" || s["@type"] === "MedicalWebPage" || s["@type"] === "LegalService" || s["@type"] === "Article" || s["@type"] === "WebPage" || s["@type"] === "CollectionPage" || s["@type"] === "FAQPage") {
        return {
          ...s,
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: [".resposta-direta", ".resultado-principal"],
          },
        };
      }
      return s;
    });
  }

  return (
    <Helmet htmlAttributes={{ lang: lang === "en" ? "en" : "pt-BR" }}>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {lang === "en" ? (
        <>
          <link rel="alternate" hreflang="en" href={url} />
          {alternateUrl && (
            <link rel="alternate" hreflang="pt-BR" href={`${SITE_URL}${alternateUrl}`} />
          )}
          {alternateUrl && (
            <link rel="alternate" hreflang="x-default" href={`${SITE_URL}${alternateUrl}`} />
          )}
        </>
      ) : (
        <>
          <link rel="alternate" hreflang="pt-BR" href={url} />
          {alternateUrl && (
            <link rel="alternate" hreflang="en" href={`${SITE_URL}${alternateUrl}`} />
          )}
          <link rel="alternate" hreflang="x-default" href={url} />
        </>
      )}
      <meta property="og:title" content={og} />
      <meta property="og:description" content={ogDesc} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="CLICAresolve" />
      <meta property="og:locale" content={lang === "en" ? "en_US" : "pt_BR"} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={og} />
      <meta name="twitter:description" content={ogDesc} />
      {allSchemas && allSchemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}
