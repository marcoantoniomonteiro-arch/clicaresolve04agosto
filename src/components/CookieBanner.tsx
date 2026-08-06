import React, { useState, useEffect } from "react";
import { CONFIG } from "../config";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-white/10 shadow-2xl">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3 flex-wrap sm:flex-nowrap">
        <span className="text-sm text-gray-300 leading-snug">
          🍪 CLICAresolve usa cookies para exibir anúncios. Ao continuar navegando, você concorda com nossa{" "}
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
