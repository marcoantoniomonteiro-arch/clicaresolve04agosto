import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';

const container = document.getElementById('root')!;
const app = (
  <StrictMode>
    <HelmetProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </HelmetProvider>
  </StrictMode>
);

// As páginas chegam pré-renderizadas: o React "assume" o HTML que já está na
// tela em vez de apagar e redesenhar tudo (o conteúdo aparece bem mais cedo).
if (container.firstElementChild) {
  // Guarda o HTML pré-renderado: se algum arquivo JS da página não carregar
  // (rede ruim, robô do Google com limite de arquivos), o ErrorBoundary volta a
  // mostrar esse conteúdo em vez de trocar a página inteira por uma tela de erro.
  const ssrHtml = container.innerHTML;
  const ssrPath = window.location.pathname;
  const root = hydrateRoot(container, app);
  window.__restoreSsr = () => {
    if (window.location.pathname !== ssrPath) return false;
    window.__restoreSsr = null;
    setTimeout(() => {
      root.unmount();
      container.innerHTML = ssrHtml;
    }, 0);
    return true;
  };
} else {
  createRoot(container).render(app);
}
