import React from "react";
import { CONFIG } from "../config";

interface AffiliateBannerProps {
  terms: string[];
  label: string;
  mercadoLivreTerms?: string[];
  mercadoLivreLabel?: string;
  shopeeTerms?: string[];
  shopeeLabel?: string;
}

export function AffiliateBanner({ terms }: AffiliateBannerProps) {
  // Bloco discreto: no máximo 2 sugestões de uma loja só, depois do conteúdo.
  // (Excesso de blocos de afiliado pesa contra a aprovação no AdSense.)
  const shown = terms.slice(0, 2);
  if (shown.length === 0) return null;
  return (
    <div className="my-6 p-3 rounded-xl border border-border bg-card">
      <p className="text-xs text-muted">
        Sugestões de compra:{" "}
        {shown.map((term, i) => (
          <React.Fragment key={term}>
            {i > 0 && " · "}
            <a href={CONFIG.urlAmazon(term)} target="_blank" rel="noopener noreferrer sponsored" className="text-green-400 hover:text-green-300 underline underline-offset-2">
              {term}
            </a>
          </React.Fragment>
        ))}
        <span className="text-gray-500"> (link de afiliado)</span>
      </p>
    </div>
  );
}
