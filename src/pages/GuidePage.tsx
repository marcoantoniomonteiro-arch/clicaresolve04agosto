import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import { SEOHead } from "../components/SEOHead";
import { SiteFooterLinks } from "../components/SiteFooterLinks";
import { ShareButtons } from "../components/ShareButtons";
import { GUIDES } from "../data/guides";
import { GUIDES_META } from "../data/guidesMeta";
import { TOOLS } from "../data/tools";

const SITE_URL = "https://www.clicaresolve.com.br";

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
  return `${d} de ${meses[m - 1]} de ${y}`;
}

export function GuidePage({ slug }: { slug: string; onBack?: () => void }) {
  const meta = GUIDES_META.find((g) => g.slug === slug);
  const guide = GUIDES[slug];
  if (!meta || !guide) return null;

  const url = `${SITE_URL}/guia/${slug}`;
  const tools = meta.toolSlugs.map((s) => TOOLS.find((t) => t.slug === s)).filter(Boolean) as typeof TOOLS;
  const others = GUIDES_META.filter((g) => g.slug !== slug).slice(0, 4);

  const schemas: Record<string, unknown>[] = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: meta.title,
      description: meta.description,
      datePublished: guide.updated,
      dateModified: guide.updated,
      inLanguage: "pt-BR",
      mainEntityOfPage: url,
      author: { "@type": "Organization", name: "CLICAresolve", url: SITE_URL },
      publisher: { "@type": "Organization", name: "CLICAresolve", logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` } },
      image: `${SITE_URL}/og.png`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: guide.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
    },
  ];

  return (
    <div className="min-h-screen bg-bg text-text pt-16">
      <SEOHead
        title={meta.title}
        description={meta.description}
        canonical={`/guia/${slug}`}
        ogType="article"
        schema={schemas}
        breadcrumbs={[
          { name: "Início", url: "/" },
          { name: "Guias", url: "/guias" },
          { name: meta.title, url: `/guia/${slug}` },
        ]}
      />

      <article className="max-w-2xl mx-auto px-4 py-8">
        <nav className="flex items-center gap-2 text-sm text-muted mb-4 flex-wrap" aria-label="Breadcrumb">
          <a href="/" className="hover:text-green-400 transition-colors">Início</a>
          <span>/</span>
          <a href="/guias" className="hover:text-green-400 transition-colors">Guias</a>
        </nav>

        <a href="/guias" className="flex items-center gap-2 text-sm text-muted hover:text-green-400 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Todos os guias
        </a>

        <header className="mb-8">
          <div className="text-4xl mb-3">{meta.emoji}</div>
          <h1 className="text-3xl font-extrabold text-text leading-tight mb-3">{meta.title}</h1>
          <p className="text-xs text-muted">Atualizado em {formatDate(guide.updated)} · CLICAresolve</p>
        </header>

        <div className="space-y-4 mb-8">
          {guide.intro.map((p, i) => (
            <p key={i} className="text-base text-muted leading-relaxed">{p}</p>
          ))}
        </div>

        {tools[0] && (
          <a
            href={`/${tools[0].slug}`}
            className="flex items-center gap-3 p-4 mb-10 rounded-xl bg-green-400/10 border border-green-400/30 hover:bg-green-400/15 transition-colors"
          >
            <span className="text-2xl">{tools[0].emoji}</span>
            <span className="flex-1">
              <span className="block text-sm font-bold text-text">Faça a conta na hora: {tools[0].name}</span>
              <span className="block text-xs text-muted">{tools[0].description}</span>
            </span>
            <ArrowRight className="w-4 h-4 text-green-400" />
          </a>
        )}

        <div className="space-y-10">
          {guide.sections.map((s, i) => (
            <section key={i}>
              <h2 className="text-xl font-bold text-text mb-4">{s.heading}</h2>
              {s.paragraphs?.map((p, j) => (
                <p key={j} className="text-sm text-muted leading-relaxed mb-3">{p}</p>
              ))}
              {s.list && (
                <ul className="list-disc pl-5 space-y-2 mb-3">
                  {s.list.map((li, j) => <li key={j} className="text-sm text-muted leading-relaxed">{li}</li>)}
                </ul>
              )}
              {s.table && (
                <div className="overflow-x-auto my-4 rounded-xl border border-border">
                  <table className="w-full text-sm">
                    <thead className="bg-card">
                      <tr>
                        {s.table.headers.map((h) => <th key={h} className="text-left font-semibold text-text px-4 py-2 border-b border-border">{h}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {s.table.rows.map((r, j) => (
                        <tr key={j} className="border-b border-border last:border-0">
                          {r.map((c, k) => <td key={k} className="px-4 py-2 text-muted">{c}</td>)}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {s.table.caption && <p className="text-xs text-muted px-4 py-2 bg-card">{s.table.caption}</p>}
                </div>
              )}
              {s.after?.map((p, j) => (
                <p key={j} className="text-sm text-muted leading-relaxed mb-3">{p}</p>
              ))}
            </section>
          ))}
        </div>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-text mb-4">Perguntas frequentes</h2>
          <dl className="space-y-3">
            {guide.faqs.map((f, i) => (
              <div key={i} className="p-4 rounded-xl bg-card border border-border">
                <dt className="text-sm font-semibold text-text mb-2">{f.question}</dt>
                <dd className="text-sm text-muted leading-relaxed">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-bold text-text mb-4">Ferramentas usadas neste guia</h2>
          <div className="space-y-3">
            {tools.map((t) => (
              <a key={t.slug} href={`/${t.slug}`} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-green-400/30 hover:bg-green-400/5 transition-all">
                <span className="text-xl">{t.emoji}</span>
                <span className="flex-1">
                  <span className="block text-sm font-semibold text-text">{t.name}</span>
                  <span className="block text-xs text-muted line-clamp-1">{t.description}</span>
                </span>
                <ArrowRight className="w-4 h-4 text-muted" />
              </a>
            ))}
          </div>
        </section>

        <ShareButtons url={url} text={meta.title} className="mt-10" />

        <section className="mt-12">
          <h2 className="text-lg font-bold text-text mb-4 flex items-center gap-2"><BookOpen className="w-5 h-5 text-green-400" /> Outros guias</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {others.map((g) => (
              <a key={g.slug} href={`/guia/${g.slug}`} className="p-4 rounded-xl bg-card border border-border hover:border-green-400/30 transition-colors">
                <span className="text-xl">{g.emoji}</span>
                <span className="block text-sm font-semibold text-text mt-1">{g.title}</span>
              </a>
            ))}
          </div>
        </section>

        <footer className="text-center text-xs text-muted mt-12 pb-6 border-t border-border pt-6">
          <SiteFooterLinks />
          © {new Date().getFullYear()} CLICAresolve — Ferramentas gratuitas para o dia a dia
        </footer>
      </article>
    </div>
  );
}
