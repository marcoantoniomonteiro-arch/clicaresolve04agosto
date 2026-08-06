import React from "react";
import { Sun, Moon, Search, X } from "lucide-react";

interface HeaderProps {
  theme: "dark" | "light";
  onToggleTheme: () => void;
  search: string;
  onSearchChange: (v: string) => void;
  onLogoClick: () => void;
  lang: "pt" | "en";
  onToggleLang: () => void;
}

function ClickCursorIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0" aria-hidden="true">
      <path
        d="M6 2L6 14L9.5 11L12 17L14 16L11.5 10L16 10L6 2Z"
        fill="currentColor"
        className="text-green-400"
      />
    </svg>
  );
}

export function Header({ theme, onToggleTheme, search, onSearchChange, onLogoClick, lang, onToggleLang }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-4 gap-4 border-b border-white/5 backdrop-blur-xl bg-bg/70 shadow-lg shadow-black/20">
      <button
        onClick={onLogoClick}
        className="flex items-center gap-1.5 shrink-0 hover:opacity-80 transition-opacity group"
        aria-label="CLICAresolve — Página Inicial"
      >
        <ClickCursorIcon />
        <div className="flex flex-col items-start">
          <span className="text-xl font-bold leading-none tracking-tight">
            <span className="text-white">CLICA</span><span className="text-gradient-primary">resolve</span>
          </span>
          <span className="hidden sm:block text-[11px] text-[#888888] leading-none mt-0.5 font-normal">
            Clicou, resolveu.
          </span>
        </div>
      </button>

      <div className="flex-1 relative max-w-lg mx-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar ferramenta..."
          className="w-full h-11 pl-9 pr-9 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green-400/50 focus:bg-white/8 focus:shadow-[0_0_0_3px_rgba(74,222,128,0.1)] transition-all duration-200"
        />
        {search && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            aria-label="Limpar busca"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <button
        onClick={onToggleLang}
        className="shrink-0 h-11 px-3 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/10 hover:border-green-400/30 transition-all duration-200"
        aria-label="Alternar idioma"
      >
        {lang === "en" ? "PT" : "EN"}
      </button>

      <button
        onClick={onToggleTheme}
        className="shrink-0 w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-green-400/30 transition-all duration-200"
        aria-label="Alternar tema"
      >
        {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
      </button>
    </header>
  );
}
