// Links institucionais presentes em todas as páginas (exigência comum na
// revisão do AdSense: Sobre, Contato, Privacidade e Termos sempre acessíveis).
const LINKS = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Metodologia", href: "/metodologia" },
  { label: "Contato", href: "/contato" },
  { label: "Política de Privacidade", href: "/privacidade" },
  { label: "Termos de Uso", href: "/termos" },
];

export function SiteFooterLinks() {
  return (
    <nav aria-label="Links institucionais" className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-3">
      {LINKS.map((l) => (
        <a key={l.href} href={l.href} className="text-xs text-muted hover:text-green-400 transition-colors">
          {l.label}
        </a>
      ))}
    </nav>
  );
}
