import React from "react";
import { isChunkLoadError } from "../utils/lazyRetry";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  /** O conteúdo pré-renderado está sendo restaurado: não mostra a tela de erro */
  restoring?: boolean;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    const restoring = isChunkLoadError(error) && typeof window !== "undefined" && !!window.__restoreSsr;
    return { hasError: true, restoring };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Erro ao carregar a ferramenta:", error, errorInfo.componentStack);
    // Arquivo JS que não carregou no 1º acesso: volta o HTML pré-renderado
    // (o conteúdo continua visível, só sem a parte interativa).
    if (this.state.restoring && !window.__restoreSsr?.()) this.setState({ restoring: false });
  }

  render() {
    if (this.state.restoring) return null;
    if (this.state.hasError) {
      return (
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <p className="text-text text-base font-semibold mb-2">
            Ocorreu um problema ao carregar esta ferramenta.
          </p>
          <p className="text-muted text-sm mb-6">
            Isso pode ter sido causado por uma instabilidade de rede. Tente novamente.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 rounded-lg bg-green-400 text-black text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Tentar novamente
            </button>
            <a
              href="/"
              className="px-4 py-2 rounded-lg border border-border text-sm text-muted hover:text-text transition-colors"
            >
              Voltar ao início
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
