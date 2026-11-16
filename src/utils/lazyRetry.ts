import React from "react";

/** Erro de carregamento de um arquivo JS da página (rede instável, deploy novo, robô do Google). */
export function isChunkLoadError(err: unknown): boolean {
  const msg = String((err as Error)?.message ?? err);
  return /dynamically imported module|Importing a module script failed|error loading dynamically|Failed to fetch|ChunkLoadError|Loading chunk/i.test(msg);
}

/** React.lazy que tenta de novo (até 2 vezes) antes de desistir de carregar o arquivo. */
export function lazyRetry<T extends React.ComponentType<any>>(factory: () => Promise<{ default: T }>, retries = 2) {
  return React.lazy(async () => {
    for (let i = 0; ; i++) {
      try {
        return await factory();
      } catch (err) {
        if (i >= retries || !isChunkLoadError(err)) throw err;
        await new Promise((r) => setTimeout(r, 400 * (i + 1)));
      }
    }
  });
}

declare global {
  interface Window {
    /** Restaura o HTML pré-renderado se a página não conseguir carregar (só no 1º carregamento). */
    __restoreSsr?: (() => boolean) | null;
  }
}
