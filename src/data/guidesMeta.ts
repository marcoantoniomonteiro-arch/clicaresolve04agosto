// Lista leve dos guias (carregada em todas as páginas para os links).
// O texto completo de cada guia fica em guides.ts e só é baixado na página do guia.
export interface GuideMeta {
  slug: string;
  title: string;
  description: string;
  emoji: string;
  /** Ferramentas relacionadas (slugs) — o guia aparece na página delas */
  toolSlugs: string[];
}

export const GUIDES_META: GuideMeta[] = [
  {
    slug: "quantos-btus-preciso",
    title: "Quantos BTUs preciso? Como calcular o ar-condicionado ideal",
    description: "Aprenda a calcular os BTUs do ar-condicionado pelo tamanho do cômodo, sol, pessoas e aparelhos, com tabela por metro quadrado.",
    emoji: "❄️",
    toolSlugs: ["calculadora-btu", "consumo-energia"],
  },
  {
    slug: "como-calcular-metro-quadrado",
    title: "Como calcular metro quadrado (m²): fórmula, exemplos e dicas",
    description: "Veja como calcular a área em m² de cômodos retangulares e em L, quanto comprar de piso com margem de quebra e como medir paredes.",
    emoji: "📐",
    toolSlugs: ["metros-quadrados", "calculadora-tinta", "calculadora-tamanho-tapete"],
  },
  {
    slug: "quanto-de-carne-por-pessoa-churrasco",
    title: "Quanto de carne por pessoa no churrasco? Guia completo",
    description: "Quantidade de carne por pessoa para homens, mulheres e crianças, quanto carvão e bebida comprar e como montar a lista do churrasco.",
    emoji: "🥩",
    toolSlugs: ["calculadora-churrasco", "divisor-carona"],
  },
  {
    slug: "como-converter-horas-em-decimais",
    title: "Como converter horas em decimais (e decimais em horas)",
    description: "Entenda por que 8h30 vira 8,5, aprenda a fórmula para converter horas em decimal e use no ponto, banco de horas e salário.",
    emoji: "⏰",
    toolSlugs: ["horas-decimais", "acumulador-horas", "salario-hora"],
  },
  {
    slug: "quantos-dias-eu-ja-vivi",
    title: "Quantos dias eu já vivi? Como calcular suas horas de vida",
    description: "Veja como calcular quantos dias, horas e minutos você já viveu, com exemplos por idade e curiosidades como os 10.000 dias de vida.",
    emoji: "🎂",
    toolSlugs: ["dias-vida", "diferenca-datas", "contador-tempo-decorrido"],
  },
  {
    slug: "como-converter-sensibilidade-dpi",
    title: "Como manter a mesma sensibilidade ao trocar o DPI do mouse",
    description: "Entenda DPI e eDPI e aprenda a recalcular a sensibilidade do jogo quando trocar o DPI do mouse, sem perder a mira.",
    emoji: "🖱️",
    toolSlugs: ["conversor-dpi"],
  },
];

export const GUIDE_SLUGS = GUIDES_META.map((g) => g.slug);

export function getGuidesForTool(toolSlug: string): GuideMeta[] {
  return GUIDES_META.filter((g) => g.toolSlugs.includes(toolSlug));
}
