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

export function AffiliateBanner({ terms, label, mercadoLivreTerms, mercadoLivreLabel, shopeeTerms, shopeeLabel }: AffiliateBannerProps) {
  return (
    <div className="my-6 p-4 rounded-xl border border-amber-500/30 bg-amber-500/5">
      <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider mb-3">
        Produtos Relacionados — Amazon
      </p>
      <div className="flex flex-wrap gap-2">
        {terms.map((term) => (
          <a
            key={term}
            href={CONFIG.urlAmazon(term)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold transition-colors duration-200"
          >
            <span>🛒</span>
            <span>{term}</span>
          </a>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-2">
        Links de afiliado — voce nao paga mais por isso
      </p>

      {mercadoLivreTerms && mercadoLivreTerms.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-xs text-yellow-300 font-semibold uppercase tracking-wider mb-3">
            {mercadoLivreLabel || "Também no Mercado Livre"}
          </p>
          <div className="flex flex-wrap gap-2">
            {mercadoLivreTerms.map((term) => (
              <a
                key={term}
                href={CONFIG.urlMercadoLivre(term)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-black text-sm font-semibold transition-colors duration-200"
              >
                <span>🏷️</span>
                <span>{term}</span>
              </a>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Links de afiliado — voce nao paga mais por isso
          </p>
        </div>
      )}

      {shopeeTerms && shopeeTerms.length > 0 && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-xs text-orange-400 font-semibold uppercase tracking-wider mb-3">
            {shopeeLabel || "Ver na Shopee"}
          </p>
          <div className="flex flex-wrap gap-2">
            {shopeeTerms.map((term) => (
              <a
                key={term}
                href={CONFIG.urlShopee(term)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold transition-colors duration-200"
              >
                <span>🛍️</span>
                <span>{term}</span>
              </a>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Links de afiliado — voce nao paga mais por isso
          </p>
        </div>
      )}
    </div>
  );
}
