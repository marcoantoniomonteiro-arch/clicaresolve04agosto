// Entrada usada SOMENTE no build (pré-renderização).
// Gera o HTML de cada rota para que o Google e o AdSense vejam o conteúdo
// real da página sem precisar executar JavaScript.
import { renderToPipeableStream } from "react-dom/server";
import { Writable } from "node:stream";
import { StringDecoder } from "node:string_decoder";
import { HelmetProvider, HelmetServerState } from "react-helmet-async";
import App, { getPrerenderRoutes } from "./App";

export { getPrerenderRoutes };

export function render(url: string): Promise<{ html: string; head: string; htmlAttributes: string }> {
  return new Promise((resolve, reject) => {
    const helmetContext: { helmet?: HelmetServerState } = {};
    let html = "";
    let failed: unknown = null;
    // O React reaproveita o mesmo buffer entre escritas; por isso cada pedaço
    // é decodificado na hora (StringDecoder também junta acentos partidos).
    const decoder = new StringDecoder("utf8");

    const sink = new Writable({
      decodeStrings: false,
      highWaterMark: 1 << 30,
      write(chunk, _enc, cb) {
        html += typeof chunk === "string" ? chunk : decoder.write(Buffer.from(chunk));
        cb();
      },
      final(cb) {
        html += decoder.end();
        if (failed) {
          reject(failed);
        } else {
          const h = helmetContext.helmet;
          const head = h
            ? [h.title.toString(), h.meta.toString(), h.link.toString(), h.script.toString()].join("\n")
            : "";
          // O React 18 às vezes deixa um byte nulo de "sobra" quando um acento
          // cai na divisa do buffer interno; HTML válido nunca tem esse byte.
          resolve({ html: html.replace(/\u0000/g, ""), head, htmlAttributes: h ? h.htmlAttributes.toString() : "" });
        }
        cb();
      },
    });

    const timer = setTimeout(() => {
      stream.abort();
      reject(new Error(`timeout ao renderizar ${url}`));
    }, 20000);

    const stream = renderToPipeableStream(
      <HelmetProvider context={helmetContext}>
        <App initialPath={url} />
      </HelmetProvider>,
      {
        onAllReady() {
          clearTimeout(timer);
          stream.pipe(sink);
        },
        onShellError(err) {
          clearTimeout(timer);
          reject(err);
        },
        onError(err) {
          failed = err;
        },
      }
    );
  });
}
