# CLICAresolve

Portal brasileiro de 130+ ferramentas e calculadoras gratuitas, 100% client-side, sem cadastro.

---

## Como publicar no Netlify

1. Execute `npm run build` na raiz do projeto
2. A pasta `dist/` será gerada com os arquivos de produção
3. Acesse [netlify.com](https://netlify.com) e crie uma conta
4. Clique em **Add new site** → **Deploy manually**
5. Arraste a pasta `dist/` para a área de upload
6. O site estará online em ~1 minuto
7. (Opcional) Vá em **Site settings** → **Domain management** → **Add custom domain** para apontar seu domínio

## Como apontar domínio próprio

### Netlify
- Na aba **Domain settings**, clique em **Add custom domain**
- Digite seu domínio (ex: `seudominio.com.br`)
- Netlify fornecerá nameservers ou registros DNS A/CNAME
- No registrador do seu domínio (Registro.br, GoDaddy, etc.), aponte os DNS para os do Netlify
- Aguarde propagação (até 48h)

### Cloudflare (recomendado para performance)
- Use Cloudflare como DNS do seu domínio
- Adicione um CNAME apontando `www` para `seu-site.netlify.app`
- Ative CDN e compressão Brotli
- Cloudflare melhora LCP e TTFB significativamente

## Como ativar cada fonte de monetização

Edite apenas o arquivo `src/config.ts` — **não precisa modificar nenhum outro arquivo**.

### 1. Google AdSense
```typescript
adsenseId: "ca-pub-XXXXXXXXXXXXXXXX",
adsenseSlot: {
  topo: "1234567890",     // substitua pelo slot real do AdSense
  meio: "0987654321",     // substitua pelo slot real do AdSense
  rodape: "1122334455",   // substitua pelo slot real do AdSense
}
```
- Crie conta em [google.com/adsense](https://google.com/adsense)
- Obtenha o ID da conta (`ca-pub-...`) e os IDs dos slots
- Substitua no `config.ts` e remova `"XXXXX"` do ID
- O código real do AdSense já está comentado no componente `AdPlaceholder.tsx` — descomente após aprovação
- Anúncios aparecem automaticamente em 3 posições: topo (banner), meio (quadrado) e rodape (mobile)

### 2. Amazon Afiliados
```typescript
tagAmazon: "clicaresolve-20",
```
- Cadastre-se em [associates.amazon.com.br](https://associates.amazon.com.br)
- Substitua `"clicaresolve-20"` pela sua tag de associado
- Links de produtos aparecem automaticamente no banner de afiliados em cada ferramenta
- O banner `AffiliateBanner` exibe links para produtos relacionados na Amazon

### 3. Shopee Afiliados
```typescript
tagShopee: "clicaresolve.shopee",
```
- Cadastre-se no programa de afiliados da Shopee
- Substitua pela sua tag de afiliado
- (Atualmente usado como referência — implementação futura)

### 4. Google Analytics
```typescript
googleAnalyticsId: "G-XXXXXXXXXX",
```
- Crie uma propriedade em [analytics.google.com](https://analytics.google.com)
- Obtenha o ID de medição (formato `G-XXXXXXXXXX`)
- Substitua no `config.ts`
- O script de GA4 será injetado automaticamente via Helmet

### 5. Google Search Console
```typescript
searchConsoleVerification: "codigo-de-verificacao",
```
- Acesse [search.google.com/search-console](https://search.google.com/search-console)
- Adicione seu site e escolha o método de verificação por meta tag
- Copie o código e cole no `config.ts`
- A meta tag será injetada automaticamente no `<head>` de todas as páginas

---

## Checklist de Pré-Lançamento

### SEO
- [ ] `siteUrl` no `config.ts` aponta para o domínio real
- [ ] Google Search Console verificação ativa
- [ ] Sitemap (`/sitemap.xml`) acessível
- [ ] `robots.txt` presente
- [ ] `llms.txt` presente (para crawlers de IA)
- [ ] Meta tags OG (Open Graph) preenchidas em todas as páginas
- [ ] Schema.org JSON-LD em todas as páginas de ferramentas
- [ ] Canonical URLs corretos
- [ ] Breadcrumbs em todas as páginas
- [ ] FAQ Schema em páginas de categoria e ferramentas
- [ ] Speakable Schema (GEO) para assistentes de IA

### Performance
- [ ] `npm run build` passa sem erros
- [ ] LCP < 2.5s (verifique no PageSpeed Insights)
- [ ] Nenhuma imagem pesada sem lazy loading
- [ ] CSS inline (44KB) aceitável
- [ ] Fonte Inter carregada com `display=swap`
- [ ] `lang="pt-BR"` na tag `<html>`

### Acessibilidade
- [ ] Todos os inputs têm `<label>` associado
- [ ] Contraste de cores AA (verificado: text-gray-400 sobre #0f0f12 = 6.6:1)
- [ ] Todos os botões/links clicáveis com altura mínima 44px
- [ ] `aria-label` em elementos visuais importantes
- [ ] Navegação por teclado funcional

### Monetização
- [ ] AdSense ID configurado (ou placeholder ativo)
- [ ] Amazon tag de afiliado configurada
- [ ] Banners de afiliados aparecem em ferramentas relevantes
- [ ] 2 slots de AdSense em cada página de ferramenta (topo + meio)
- [ ] Cookie banner LGPD ativo
- [ ] Página de Política de Privacidade publicada

### Conteúdo
- [ ] Todas as ferramentas têm botão "Voltar ao Menu"
- [ ] Todas as páginas de ferramenta têm banner afiliado
- [ ] Todas as páginas de ferramenta têm 2 slots de AdSense
- [ ] Página 404.html personalizada presente
- [ ] Conteúdo de SEO (directAnswer, FAQ, exemplo) em todas as ferramentas

### Domínio e Infraestrutura
- [ ] Domínio próprio configurado (ou subdomínio Netlify)
- [ ] HTTPS ativo (certificado SSL automático no Netlify)
- [ ] DNS propagado corretamente
- [ ] Google Analytics 4 ativo
- [ ] Search Console verificação ativa
- [ ] `llms.txt` acessível na raiz

---

## Estrutura do Projeto

```
project/
├── public/
│   ├── 404.html              # Página 404 personalizada
│   ├── robots.txt            # Diretrizes para crawlers
│   ├── sitemap.xml           # Sitemap SEO
│   └── llms.txt              # Diretrizes para IAs generativas
├── src/
│   ├── config.ts             # ÚNICO arquivo de monetização
│   ├── App.tsx               # Roteamento e layout principal
│   ├── components/
│   │   ├── AdPlaceholder.tsx # Slots de AdSense (3 posições)
│   │   ├── AffiliateBanner.tsx # Banner de afiliados Amazon
│   │   ├── CookieBanner.tsx   # Banner LGPD
│   │   ├── SEOHead.tsx        # Helmet SEO + Schema.org
│   │   ├── ToolLayout.tsx     # Layout padrão de ferramenta
│   │   ├── ToolContent.tsx    # Conteúdo SEO (FAQ, exemplo, etc.)
│   │   ├── StaticPage.tsx     # Layout de páginas estáticas
│   │   ├── CategoryPage.tsx   # Página de categoria
│   │   └── Header.tsx          # Cabeçalho global
│   ├── data/
│   │   ├── tools.ts           # ferramentas cadastradas (ver TOOLS.length)
│   │   ├── seoData.ts         # SEO de categorias
│   │   └── toolSeoData.ts     # SEO de ferramentas (22+ completos)
│   ├── pages/                 # Páginas estáticas (Sobre, Contato, etc.)
│   └── tools/                 # componentes de ferramentas (um por ferramenta)
├── index.html                 # HTML principal com meta tags
└── package.json
```

---

## Tecnologias

- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS (estilização)
- Lucide React (ícones)
- React Helmet Async (SEO head tags)
- 100% client-side (sem servidor backend)

---

## Contato

- Email: suporterapido77@yahoo.com
- Website: https://www.clicaresolve.com.br
