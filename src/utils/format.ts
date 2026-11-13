// Formatação de números no padrão brasileiro (vírgula decimal, ponto de milhar).

/**
 * Formata um número em pt-BR.
 * @param n valor
 * @param max casas decimais máximas
 * @param min casas decimais mínimas (padrão = max, ou seja, casas fixas)
 */
export function fmtNum(n: number, max = 2, min: number = max): string {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString("pt-BR", { minimumFractionDigits: min, maximumFractionDigits: max });
}

/** Valor em reais sem o símbolo, sempre com 2 casas (ex.: 1.234,50). */
export function fmtBRL(n: number): string {
  return fmtNum(n, 2, 2);
}
