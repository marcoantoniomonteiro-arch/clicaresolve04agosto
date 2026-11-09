import { SEOHead } from "../components/SEOHead";
import { toolsSeoEN } from "../i18n/tools/en";
import { TOOLS } from "../data/tools";

/** Página inicial em inglês (/en): lista todas as ferramentas que têm versão em inglês. */
export function EnglishHomePage({ onSelectTool }: { onSelectTool: (ptSlug: string) => void }) {
  const tools = toolsSeoEN
    .map((t) => ({ ...t, emoji: TOOLS.find((x) => x.slug === t.ptSlug)?.emoji || "🛠️" }))
    .sort((a, b) => a.h1.localeCompare(b.h1, "en"));

  return (
    <main className="min-h-screen bg-bg text-text pt-16">
      <SEOHead
        title="CLICAresolve — Free Online Calculators and Tools"
        description={`${tools.length} free online calculators and everyday tools: finance, health, PDF, home, pets and more. No sign-up, everything runs in your browser.`}
        canonical="/en"
        lang="en"
        alternateUrl="/"
        schema={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "CLICAresolve — Free Online Calculators and Tools",
          url: "https://www.clicaresolve.com.br/en",
          inLanguage: "en",
          hasPart: tools.map((t) => ({
            "@type": "WebPage",
            name: t.h1,
            url: `https://www.clicaresolve.com.br/en/${t.enSlug}`,
          })),
        }}
      />

      <section className="text-center py-20 px-4 border-b border-border">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 tracking-tight">
            <span className="text-text">Click. </span>
            <span className="text-gradient-primary" style={{ backgroundImage: "linear-gradient(90deg, #00c853, #38bdf8, #fbbf24, #00c853)" }}>Solved.</span>
          </h1>
          <p className="text-muted text-base sm:text-lg">
            {tools.length} free online tools for everyday life — no sign-up, no downloads, everything runs in your browser.
          </p>
          <p className="text-sm text-muted mt-4">
            <a href="/" className="text-green-400 hover:text-green-300">Versão em português →</a>
          </p>
        </div>
      </section>

      <section className="max-w-screen-2xl mx-auto px-4 py-10">
        <h2 className="text-xl font-bold text-text mb-6">All tools</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {tools.map((t) => (
            <a
              key={t.enSlug}
              href={`/en/${t.enSlug}`}
              onClick={(e) => { if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); onSelectTool(t.ptSlug); }}
              className="group text-left p-5 rounded-2xl bg-card border border-border hover:border-green-400/30 hover:bg-green-400/5 transition-all"
            >
              <div className="text-3xl mb-3">{t.emoji}</div>
              <h3 className="text-sm font-bold text-text mb-1 leading-tight">{t.h1}</h3>
              <p className="text-xs text-muted leading-relaxed line-clamp-2">{t.metaDescription}</p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
