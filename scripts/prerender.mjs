// Pré-renderização: depois do `vite build`, gera um arquivo HTML completo
// para cada rota do site (título, descrição, canonical e conteúdo visível).
// O navegador continua carregando o React normalmente por cima.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const ssrEntry = path.join(root, "dist-ssr", "entry-server.js");

const template = fs.readFileSync(path.join(distDir, "index.html"), "utf8");
if (!template.includes('<div id="root"></div>')) {
  console.error("[prerender] dist/index.html já foi pré-renderado. Rode `npm run build` completo.");
  process.exit(1);
}
const { render, getPrerenderRoutes, checkEnglishSlugs } = await import(pathToFileURL(ssrEntry).href);

const missingSlugs = checkEnglishSlugs();
if (missingSlugs.length) {
  console.error("[prerender] Dados incompletos:\n  " + missingSlugs.join("\n  "));
  process.exit(1);
}

// Tags do index.html que cada página define por conta própria (via Helmet)
const PER_PAGE_TAGS = [
  /<title>[\s\S]*?<\/title>\s*/i,
  /<meta\s+name="description"[^>]*>\s*/i,
  /<link\s+rel="canonical"[^>]*>\s*/i,
  /<meta\s+property="og:(title|description|url|type|locale|site_name)"[^>]*>\s*/gi,
  /<meta\s+name="twitter:(title|description)"[^>]*>\s*/gi,
];

function stripDefaults(html) {
  let out = html;
  for (const re of PER_PAGE_TAGS) out = out.replace(re, "");
  // Remove o JSON-LD "WebSite" genérico (a página inicial gera o seu próprio)
  out = out.replace(/<script type="application\/ld\+json">\s*\{\s*"@context":\s*"https:\/\/schema.org",\s*"@type":\s*"WebSite"[\s\S]*?<\/script>\s*/i, "");
  return out;
}

const baseTemplate = stripDefaults(template);

function outFileFor(route) {
  if (route === "/") return path.join(distDir, "index.html");
  return path.join(distDir, `${route.replace(/^\//, "")}.html`);
}

const routes = getPrerenderRoutes();
const failures = [];
let ok = 0;

for (const route of routes) {
  try {
    const { html, head, htmlAttributes } = await render(route);
    let page = baseTemplate.replace("</head>", `${head}\n</head>`);
    if (htmlAttributes) page = page.replace(/<html[^>]*>/i, `<html ${htmlAttributes}>`);
    page = page.replace('<div id="root"></div>', `<div id="root">${html}</div>`);
    const file = outFileFor(route);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, page);
    ok++;
  } catch (err) {
    // Garante que a URL continua funcionando (carrega via JavaScript)
    const file = outFileFor(route);
    if (route !== "/") {
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, template);
    }
    failures.push({ route, message: String(err && err.message ? err.message : err).split("\n")[0] });
  }
}

console.log(`\n[prerender] ${ok}/${routes.length} páginas geradas.`);
if (failures.length) {
  console.log(`[prerender] ${failures.length} rota(s) com erro (ficam só com o carregamento via JavaScript):`);
  for (const f of failures) console.log(`  - ${f.route}: ${f.message}`);
  // Não derruba o deploy por uma página, mas falha se a maioria quebrar
  if (failures.length > routes.length / 2) process.exit(1);
}

// Sitemap gerado a partir das páginas que existem de fato
const today = new Date().toISOString().slice(0, 10);
const okRoutes = routes.filter((r) => !failures.some((f) => f.route === r));
const priority = (r) => (r === "/" ? "1.0" : r.startsWith("/categoria/") || r === "/guias" ? "0.8" : r.startsWith("/guia/") ? "0.8" : "0.6");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${okRoutes.map((r) => `  <url>
    <loc>https://www.clicaresolve.com.br${r === "/" ? "/" : r}</loc>
    <lastmod>${today}</lastmod>
    <priority>${priority(r)}</priority>
  </url>`).join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(distDir, "sitemap.xml"), sitemap);
console.log(`[prerender] sitemap.xml com ${okRoutes.length} endereços.`);

fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
