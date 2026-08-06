export const CONFIG = {
  // ============================================
  // CONFIGURACOES GERAIS DO SITE
  // ============================================

  /** URL do site publicado — substitua pelo seu dominio real */
  siteUrl: "https://www.clicaresolve.com.br",

  /** Nome do site — exibido em meta tags, headers e footers */
  siteName: "CLICAresolve",

  /** Descricao padrao do site — exibida em meta tags e SEO */
  siteDescription: "Ferramentas gratuitas para resolver o dia a dia com um clique",

  /** ID do Google Analytics 4 (formato: G-XXXXXXXXXX) — deixe vazio para desativar */
  googleAnalyticsId: "",

  /** Codigo de verificacao do Google Search Console (meta tag) — deixe vazio para desativar */
  searchConsoleVerification: "",

  // ============================================
  // DADOS DE MERCADO (atualizaveis periodicamente)
  // ============================================

  /** Preco medio do litro da gasolina no Brasil (atualizado em 2026) — usado na calculadora Alcool x Gasolina */
  precoMedioGasolina2026: 6.29,

  /** Preco medio do litro do etanol no Brasil (atualizado em 2026) — usado na calculadora Alcool x Gasolina */
  precoMedioAlcool2026: 4.89,

  /** Ano atual para referencia em textos e calculadoras */
  anoAtual: 2026,

  // ============================================
  // ESTATISTICAS DE MERCADO (bloco Casa)
  // ============================================

  /** Rendimento medio da tinta por litro (m²/L por demao) — usado na Calculadora de Tinta */
  rendimentoTintaPorLitro: 12,

  /** Tarifa media de energia eletrica residencial no Brasil (R$/kWh) — usada na Calculadora de Consumo de Energia */
  tarifaEnergiaKWh: 0.85,

  // ============================================
  // FONTE E-A-T SAUDE (bloco Saúde — E-E-A-T)
  // ============================================

  /** Fonte de referencia para calculadoras de saude — exibida em selo de autoridade */
  fonteSaúde: "Organização Mundial da Saúde (OMS)",

  /** Data da ultima revisao dos dados de saude — exibida em selo de autoridade */
  dataRevisãoSaúde: "Junho/2026",

  // ============================================
  // TAXAS DE JUROS (bloco Finanças)
  // ============================================

  /** Taxa CDI de referência (%) — NÃO exibida diretamente ao usuário como "taxa atual" (ver POLITICA-DADOS-DINAMICOS.md). Só usar em UI se houver integração real com fonte oficial atualizada automaticamente. */
  taxaCDI2026: 13.25,

  /** Taxa Selic de referência (%) — NÃO exibida diretamente ao usuário como "taxa atual" (ver POLITICA-DADOS-DINAMICOS.md). Só usar em UI se houver integração real com fonte oficial atualizada automaticamente. */
  taxaSelic2026: 13.75,

  // ============================================
  // GOOGLE ADSENSE (MONETIZACAO)
  // ============================================
  // Para ativar: 1) Crie conta em google.com/adsense
  //              2) Obtenha o ID (ca-pub-XXXXXXXXXXXXXXXX) e slots
  //              3) Substitua abaixo e remova "XXXXX" do ID

  /** ID da conta Google AdSense (ca-pub-XXXXXXXXXXXXXXXX) — substitua XXXXX pelo seu ID real */
  adsenseId: "ca-pub-XXXXXXXXXXXXXXXX",

  /** Slots de anuncio do AdSense — cada slot corresponde a uma posicao na pagina */
  adsenseSlot: {
    /** Slot do banner no topo da pagina (728x90 ou responsivo) */
    topo: "1234567890",
    /** Slot do anuncio no meio da pagina (300x250 ou responsivo) */
    meio: "0987654321",
    /** Slot do anuncio no rodape (320x50 ou responsivo) */
    rodape: "1122334455",
  },

  // ============================================
  // PROGRAMA DE AFILIADOS AMAZON
  // ============================================
  // Para ativar: 1) Cadastre-se em associates.amazon.com.br
  //              2) Obtenha sua tag de associado
  //              3) Substitua "clicaresolve-20" abaixo

  /** Tag de associado Amazon (formato: nomesite-XX) — usada em links de produtos */
  tagAmazon: "clicaresolve-20",

  /** URL do Programa de Afiliados Amazon */
  urlAmazon: function (termo: string) {
    return `https://www.amazon.com.br/s?k=${encodeURIComponent(termo)}&tag=${this.tagAmazon}`;
  },

  // ============================================
  // PROGRAMA DE AFILIADOS MERCADO LIVRE
  // ============================================
  // Para ativar: 1) Cadastre-se em mercadolivre.com.br/afiliados
  //              2) Obtenha sua tag de afiliado (matt_tool)
  //              3) Substitua "SEU-ID-ML" abaixo

  /** Tag de afiliado Mercado Livre (matt_tool) — usada em links de produtos */
  tagMercadoLivre: "66576347",

  /** URL de busca no Mercado Livre com tag de afiliado */
  urlMercadoLivre: function (termo: string) {
    return `https://www.mercadolivre.com.br/jm/search?as_word=${encodeURIComponent(termo)}&matt_tool=${this.tagMercadoLivre}`;
  },

  // ============================================
  // PROGRAMA DE AFILIADOS SHOPEE
  // ============================================

  /** ID de afiliado Shopee (mmp_pid) — usado em links de produtos */
  shopeeId: "an_18364011158",

  /** URL de busca na Shopee com tag de afiliado */
  urlShopee: function (termo: string) {
    return `https://shopee.com.br/search?keyword=${encodeURIComponent(termo)}&mmp_pid=${this.shopeeId}&utm_source=${this.shopeeId}&utm_medium=affiliates`;
  },

  // ============================================
  // AMAZON PRIME (LINK DE AFILIADO)
  // ============================================

  /** Link de afiliado Amazon Prime — usado em banners de recomendacao */
  linkPrime: "https://www.amazon.com.br/amazonprime?tag=clicaresolve-20",

  // ============================================
  // HELPERS
  // ============================================

  /** Retorna true se o AdSense esta configurado (ID sem placeholder XXXXX) */
  isAdsenseActive: function () {
    return !this.adsenseId.includes("XXXXX");
  },
};
