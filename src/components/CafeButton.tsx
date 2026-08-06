import React, { useState, useEffect, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";
import { X, Copy, Check, Coffee, Heart } from "lucide-react";

const PIX_CODE =
  "00020126970014br.gov.bcb.pix0136fbf0cb11-d09b-4d73-9fb8-4549eb46b2370235ClicaResolve Pague um café (doação)5204000053039865802BR5917Marco A. M. Leite6002NA62070503***6304576C";
const DONATION_KEY = "clicaresolve-cafe-doou";
const DONATION_HOURS = 24;

export function CafeButton({ externalOpen = false, onExternalClose }: { externalOpen?: boolean; onExternalClose?: () => void }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [donated, setDonated] = useState(false);

  useEffect(() => {
    if (externalOpen) setOpen(true);
  }, [externalOpen]);

  const handleClose = useCallback(() => {
    setOpen(false);
    onExternalClose?.();
  }, [onExternalClose]);

  useEffect(() => {
    const ts = localStorage.getItem(DONATION_KEY);
    if (ts) {
      const hours = (Date.now() - parseInt(ts, 10)) / 36e5;
      if (hours < DONATION_HOURS) {
        setDonated(true);
      } else {
        localStorage.removeItem(DONATION_KEY);
      }
    }
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(PIX_CODE);
      setCopied(true);
      localStorage.setItem(DONATION_KEY, Date.now().toString());
      setDonated(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }, []);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95"
        style={{ backgroundColor: "#00a844", color: "#fff" }}
        aria-label="Pague um Café"
      >
        {donated ? (
          <Heart className="w-5 h-5 fill-white" />
        ) : (
          <Coffee className="w-5 h-5" />
        )}
        <span className="text-sm font-semibold hidden sm:inline">
          {donated ? "Obrigado!" : "Pague um Café"}
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.7)" }}
          onClick={handleClose}
        >
          <div
            className="relative w-full max-w-md rounded-2xl p-6 shadow-2xl"
            style={{ backgroundColor: "#1a1a24", border: "1px solid #00c853" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center">
              <div className="text-4xl mb-2">☕</div>
              <h2 className="text-xl font-bold text-white mb-1">Pague um Café</h2>
              <p className="text-sm text-gray-400 mb-1">
                Gostou das ferramentas do CLICAresolve?
              </p>
              <p className="text-xs text-gray-500 mb-5">
                Qualquer valor ajuda a manter o site gratuito para todos!
              </p>

              <div className="inline-block p-3 bg-white rounded-xl mb-4">
                <QRCodeSVG value={PIX_CODE} size={200} level="M" />
              </div>

              <p className="text-xs text-gray-400 mb-3">
                📱 Abra o app do seu banco → PIX → Ler QR Code
              </p>

              <p className="text-xs text-gray-500 mb-2">Ou copie o código PIX:</p>
              <div className="bg-black/30 rounded-lg p-3 mb-3 max-h-20 overflow-y-auto">
                <p className="text-[10px] text-gray-400 break-all font-mono leading-tight">
                  {PIX_CODE}
                </p>
              </div>

              <button
                onClick={handleCopy}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-black transition-all duration-200 hover:opacity-90 active:scale-95"
                style={{ backgroundColor: "#00c853" }}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" /> Copiado! ✅
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> Copiar código PIX
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 mt-4">
                Obrigado pelo apoio! 💚
              </p>
              <p className="text-xs text-gray-600 mt-1">
                CLICAresolve — Clicou, Resolveu.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function CafeInline() {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(PIX_CODE);
      setCopied(true);
      localStorage.setItem(DONATION_KEY, Date.now().toString());
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }, []);

  return (
    <div className="p-5 rounded-xl bg-green-400/5 border border-green-400/20">
      <div className="flex items-center gap-2 mb-3">
        <Coffee className="w-5 h-5 text-green-400" />
        <h2 className="text-lg font-bold text-white">Apoie o CLICAresolve</h2>
      </div>
      <p className="text-sm text-gray-300 leading-relaxed mb-5">
        O CLICAresolve é um projeto independente, mantido por uma só pessoa.
        Todas as ferramentas são gratuitas e sem cadastro. Se as ferramentas
        te ajudaram, considere pagar um café — qualquer valor ajuda a manter
        o site no ar e gratuito para todos.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-5">
        <div className="p-3 bg-white rounded-xl shrink-0">
          <QRCodeSVG value={PIX_CODE} size={180} level="M" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <p className="text-sm text-gray-300 mb-2">
            📱 Abra o app do seu banco → PIX → Ler QR Code
          </p>
          <p className="text-xs text-gray-500 mb-2">Ou copie o código PIX:</p>
          <div className="bg-black/30 rounded-lg p-2 mb-3 max-h-20 overflow-y-auto">
            <p className="text-[10px] text-gray-400 break-all font-mono leading-tight">
              {PIX_CODE}
            </p>
          </div>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-black transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{ backgroundColor: "#00c853" }}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" /> Copiado! ✅
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" /> Copiar código PIX
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export function CafeFooterLink({ onOpen }: { onOpen: () => void }) {
  return (
    <button
      onClick={onOpen}
      className="mt-2 text-xs text-gray-500 hover:text-green-400 transition-colors"
    >
      ☕ Gostou? Pague um café ao criador
    </button>
  );
}

export { PIX_CODE, DONATION_KEY };
