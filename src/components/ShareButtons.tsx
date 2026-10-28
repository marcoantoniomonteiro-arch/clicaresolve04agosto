import { useState } from "react";
import { MessageCircle, Facebook, Twitter, Send, Linkedin, Share2, Link as LinkIcon, Check } from "lucide-react";

interface Props {
  /** URL completa da página (com https://) */
  url: string;
  /** Texto que acompanha o link */
  text: string;
  className?: string;
}

const enc = encodeURIComponent;

// Instagram, TikTok, Kwai e YouTube não aceitam links de compartilhamento pela
// web. No celular, o botão "Mais opções" abre o compartilhamento do próprio
// aparelho, que lista esses apps quando estão instalados.
export function ShareButtons({ url, text, className = "" }: Props) {
  const [copied, setCopied] = useState(false);

  const links = [
    { name: "WhatsApp", href: `https://wa.me/?text=${enc(`${text} ${url}`)}`, icon: MessageCircle, color: "bg-[#25D366] text-black" },
    { name: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`, icon: Facebook, color: "bg-[#1877F2] text-white" },
    { name: "X", href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(text)}`, icon: Twitter, color: "bg-black text-white border border-white/20" },
    { name: "Telegram", href: `https://t.me/share/url?url=${enc(url)}&text=${enc(text)}`, icon: Send, color: "bg-[#229ED9] text-white" },
    { name: "Pinterest", href: `https://pinterest.com/pin/create/button/?url=${enc(url)}&description=${enc(text)}`, icon: null, color: "bg-[#E60023] text-white" },
    { name: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`, icon: Linkedin, color: "bg-[#0A66C2] text-white" },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch { /* ignora */ }
      ta.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: text, text, url });
        return;
      } catch {
        return; // usuário cancelou
      }
    }
    copy();
  };

  return (
    <div className={`p-4 rounded-xl bg-card border border-border ${className}`}>
      <p className="text-sm font-semibold text-text mb-3">Gostou? Compartilhe com quem vai usar</p>
      <div className="flex flex-wrap gap-2">
        {links.map(({ name, href, icon: Icon, color }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Compartilhar no ${name}`}
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-opacity hover:opacity-85 ${color}`}
          >
            {Icon ? <Icon className="w-4 h-4" /> : <span className="font-black">P</span>}
            {name}
          </a>
        ))}
        <button
          type="button"
          onClick={nativeShare}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-fuchsia-500 via-pink-500 to-amber-400 text-white hover:opacity-85 transition-opacity"
          aria-label="Mais opções de compartilhamento (Instagram, TikTok, Kwai e outros apps do celular)"
        >
          <Share2 className="w-4 h-4" />
          Instagram, TikTok, Kwai…
        </button>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-white/10 text-text border border-border hover:bg-white/15 transition-colors"
        >
          {copied ? <Check className="w-4 h-4 text-green-400" /> : <LinkIcon className="w-4 h-4" />}
          {copied ? "Link copiado!" : "Copiar link"}
        </button>
      </div>
    </div>
  );
}
