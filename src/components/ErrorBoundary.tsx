import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Erro ao carregar a ferramenta:", error, errorInfo.componentStack);
  }

  render() {
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
