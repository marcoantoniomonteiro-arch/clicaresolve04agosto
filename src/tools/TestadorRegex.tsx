import React, { useState, useMemo } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";

interface Props {
  onBack: () => void;
}

interface MatchInfo {
  match: string;
  index: number;
  groups: string[];
}

export function TestadorRegex({ onBack }: Props) {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState({ g: true, i: false, m: false });
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const { highlighted, matches } = useMemo(() => {
    if (!pattern || !text) return { highlighted: text, matches: [] as MatchInfo[] };
    try {
      const flagStr = (flags.g ? "g" : "") + (flags.i ? "i" : "") + (flags.m ? "m" : "");
      const regex = new RegExp(pattern, flagStr);
      const result: MatchInfo[] = [];

      if (flags.g) {
        let m: RegExpExecArray | null;
        const re = new RegExp(pattern, flagStr);
        while ((m = re.exec(text)) !== null) {
          result.push({
            match: m[0],
            index: m.index,
            groups: m.slice(1).map((g) => g ?? ""),
          });
          if (m.index === re.lastIndex) re.lastIndex++;
        }
      } else {
        const m = text.match(regex);
        if (m) {
          result.push({
            match: m[0],
            index: (m.index ?? 0),
            groups: m.slice(1).map((g) => g ?? ""),
          });
        }
      }

      const sorted = [...result].sort((a, b) => a.index - b.index);
      let html = "";
      let last = 0;
      for (const mt of sorted) {
        html += escapeHtml(text.slice(last, mt.index));
        html += `<mark class="bg-yellow-400/40 text-yellow-200 rounded px-0.5">${escapeHtml(mt.match)}</mark>`;
        last = mt.index + mt.match.length;
      }
      html += escapeHtml(text.slice(last));

      setError("");
      return { highlighted: html, matches: sorted };
    } catch (e) {
      setError(`Regex inválido: ${(e as Error).message}`);
      return { highlighted: escapeHtml(text), matches: [] as MatchInfo[] };
    }
  }, [pattern, flags, text]);

  return (
    <ToolLayout
      title="Testador de Regex"
      emoji="🔍"
      category="Utilidades"
      description="Teste expressões regulares e visualize as correspondências encontradas."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["livro javascript"]} label="livro javascript" />}
    >
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Expressão regular (sem as barras)</span>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="[\w.-]+@[\w.-]+\.\w+"
            className="input-field font-mono text-sm"
          />
        </label>

        <div className="space-y-2">
          <span className="text-sm text-gray-400 block">Flags</span>
          <div className="flex gap-3">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={flags.g} onChange={(e) => setFlags({ ...flags, g: e.target.checked })} className="accent-green-500" />
              <span className="text-sm text-gray-300">g (global)</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={flags.i} onChange={(e) => setFlags({ ...flags, i: e.target.checked })} className="accent-green-500" />
              <span className="text-sm text-gray-300">i (ignore case)</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="checkbox" checked={flags.m} onChange={(e) => setFlags({ ...flags, m: e.target.checked })} className="accent-green-500" />
              <span className="text-sm text-gray-300">m (multiline)</span>
            </label>
          </div>
        </div>

        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Texto de teste</span>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Cole o texto que deseja testar..."
            rows={5}
            className="input-field font-mono text-sm"
          />
        </label>

        {error && (
          <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-400">{error}</div>
        )}

        {text && !error && (
          <div className="space-y-2">
            <span className="text-sm text-gray-400 block">Texto com correspondências destacadas</span>
            <div
              className="p-3 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300 font-mono whitespace-pre-wrap break-words"
              dangerouslySetInnerHTML={{ __html: highlighted }}
            />
          </div>
        )}

        {matches.length > 0 && (
          <div className="space-y-2">
            <span className="text-sm text-gray-400 block">
              {matches.length} correspondência{matches.length > 1 ? "s" : ""} encontrada{matches.length > 1 ? "s" : ""}
            </span>
            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {matches.map((m, i) => (
                <div key={i} className="p-2 rounded-lg bg-white/5 border border-white/10 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">#{i + 1}</span>
                    <code className="text-yellow-300 font-mono break-all">{m.match}</code>
                    <span className="text-gray-600">pos {m.index}</span>
                  </div>
                  {m.groups.length > 0 && (
                    <div className="mt-1 pl-4 space-y-0.5">
                      {m.groups.map((g, gi) => (
                        <div key={gi} className="text-gray-500">
                          <span className="text-gray-600">grupo {gi + 1}:</span>{" "}
                          <code className="text-green-300 font-mono break-all">{g}</code>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <ToolContent
        toolName="Testador de Regex"
        category="Utilidades"
        data={{
          directAnswer: "Uma expressão regular (regex) é um padrão de busca usado para encontrar, validar ou substituir trechos de texto que seguem uma estrutura específica, como e-mails, telefones ou CEPs.",
          howItWorks: "A ferramenta aplica o padrão de expressão regular informado sobre o texto de teste, usando o motor de regex nativo do JavaScript. Cada trecho do texto que corresponde ao padrão é destacado visualmente, e a lista de todas as correspondências (matches) é exibida abaixo, incluindo grupos de captura quando o padrão os utiliza. É uma ferramenta essencial para desenvolvedores testarem padrões de validação antes de usá-los em código.",
          example: {
            title: "Exemplo: testando um regex de e-mail",
            steps: [
              `Regex: /[\\w.-]+@[\\w.-]+\\.\\w+/g`,
              `Texto de teste: "Contato: joao@email.com ou maria@teste.com.br"`,
              `Correspondências encontradas: joao@email.com, maria@teste.com.br`,
              `Total: 2 correspondências`,
            ],
            result: "O regex encontrou corretamente os 2 endereços de e-mail presentes no texto.",
          },
          faqs: [
            { question: "O que é uma expressão regular?", answer: "É um padrão de busca usado para encontrar, validar ou substituir textos que seguem uma estrutura específica, muito usado em validação de formulários e processamento de texto." },
            { question: "O que significa a flag \"g\" no regex?", answer: "Significa \"global\" - faz o regex encontrar TODAS as correspondências no texto, não apenas a primeira." },
            { question: "Por que meu regex não encontra nada?", answer: "Verifique se a sintaxe está correta e se as flags necessárias (como \"i\" para ignorar maiúsculas/minúsculas) estão marcadas." },
            { question: "Meu texto é enviado para algum servidor?", answer: "Não, todo o processamento acontece localmente no seu navegador." },
          ],
        }}
      />
    </ToolLayout>
  );
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
