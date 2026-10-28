import React, { useState, useEffect } from "react";
import { CONFIG } from "../config";

export function CookieBanner() {
  // O aviso já vem no HTML pré-renderizado, então aparece junto com a página
  // em vez de surgir depois (o que atrasava a medição de velocidade). Quem já
  // aceitou não o vê: um script no <head> marca a página com "cc-ok" antes de
  // desenhar, e depois o componente é removido.
  const [show, setShow] = useState(true);

  useEffect(() => {
    try {
      if (localStorage.getItem("cookie-consent")) setShow(false);
    } catch {
      /* navegador sem armazenamento: mantém o aviso */
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem("cookie-consent", "accepted");
    } catch {
      /* ignora */
    }
    document.documentElement.classList.add("cc-ok");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div id="cookie-banner" className="fixed bottom-0 left-0 right-0 z-[60] bg-slate-900 text-white border-t border-slate-700 shadow-2xl">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
        <span className="text-xs sm:text-sm text-gray-200 leading-snug">
          🍪 Usamos cookies do Google e parceiros para exibir anúncios, que podem ser personalizados. Veja a{" "}
          <a href={`${CONFIG.siteUrl}/privacidade`} className="text-green-400 hover:text-green-300 underline">
            Política de Privacidade
          </a>
          .
        </span>
        <button
          onClick={handleAccept}
          className="shrink-0 px-4 py-2 rounded-lg bg-green-400 text-black text-sm font-semibold hover:bg-green-300 transition-colors min-h-[44px]"
        >
          Entendi
        </button>
      </div>
    </div>
  );
}
