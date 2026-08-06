import React from "react";
import { CONFIG } from "../config";

const ADSENSE_APPROVED = false;

interface AdPlaceholderProps {
  size: "banner" | "quadrado" | "mobile";
  slot: "topo" | "meio" | "rodape";
}

const DIMENSIONS: Record<AdPlaceholderProps["size"], { width: string; height: string; label: string }> = {
  banner: { width: "728px", height: "90px", label: "728×90" },
  quadrado: { width: "300px", height: "250px", label: "300×250" },
  mobile: { width: "320px", height: "50px", label: "320×50" },
};

export function AdPlaceholder({ size, slot }: AdPlaceholderProps) {
  if (!ADSENSE_APPROVED) return null;
  if (CONFIG.isAdsenseActive()) {
    /*
    CÓDIGO REAL DO GOOGLE ADSENSE — DESCOMENTE APÓS APROVAÇÃO:
    <ins className="adsbygoogle"
         style={{ display: 'block' }}
         data-ad-client={CONFIG.adsenseId}
         data-ad-slot={CONFIG.adsenseSlot[slot]}
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
    <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    */
    return null;
  }

  const dim = DIMENSIONS[size];

  return (
    <div className="flex justify-center my-4">
      <div
        style={{ width: dim.width, height: dim.height, maxWidth: "100%" }}
        className="flex items-center justify-center border border-dashed border-gray-600 rounded-lg bg-card text-gray-500 text-sm text-center px-4"
      >
        <span>Espaco Publicitario — AdSense ativo apos aprovacao ({dim.label})</span>
      </div>
    </div>
  );
}
