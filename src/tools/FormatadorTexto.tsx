import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import React, { useState, useCallback } from "react";


import { Type, Copy, Check, ArrowDownUp, CaseSensitive } from "lucide-react";

interface Props {
  onBack: () => void;
}

export function FormatadorTexto({ onBack }: Props) {
  const [texto, setTexto] = useState("");
  const [resultado, setResultado] = useState("");
  const [copiado, setCopiado] = useState(false);

  const maiusculo = useCallback(() => {
    setResultado(texto.toUpperCase());
  }, [texto]);

  const minusculo = useCallback(() => {
    setResultado(texto.toLowerCase());
  }, [texto]);

  const capitalizado = useCallback(() => {
    setResultado(
      texto
        .toLowerCase()
        .replace(/(?:^|\s)\S/g, (char) => char.toUpperCase())
    );
  }, [texto]);

  const invertido = useCallback(() => {
    setResultado(texto.split("").reverse().join(""));
  }, [texto]);

  const invertidoCase = useCallback(() => {
    setResultado(
      texto
        .split("")
        .map((char) =>
          char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase()
        )
        .join("")
    );
  }, [texto]);

  const removerAcentos = useCallback(() => {
    const acentos: Record<string, string> = {
      á: "a",
      à: "a",
      ã: "a",
      â: "a",
      ä: "a",
      é: "e",
      è: "e",
      ê: "e",
      ë: "e",
      í: "i",
      ì: "i",
      î: "i",
      ï: "i",
      ó: "o",
      ò: "o",
      õ: "o",
      ô: "o",
      ö: "o",
      ú: "u",
      ù: "u",
      û: "u",
      ü: "u",
      ç: "c",
      Á: "A",
      À: "A",
      Ã: "A",
      Â: "A",
      Ä: "A",
      É: "E",
      È: "E",
      Ê: "E",
      Ë: "E",
      Í: "I",
      Ì: "I",
      Î: "I",
      Ï: "I",
      Ó: "O",
      Ò: "O",
      Õ: "O",
      Ô: "O",
      Ö: "O",
      Ú: "U",
      Ù: "U",
      Û: "U",
      Ü: "U",
      Ç: "C",
    };
    setResultado(
      texto.replace(/[áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÔÖÚÙÛÜÇ]/g, (char) => acentos[char] || char)
    );
  }, [texto]);

  const removerEspacosDuplos = useCallback(() => {
    setResultado(texto.replace(/\s+/g, " ").trim());
  }, [texto]);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(resultado);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar", err);
    }
  };

  const botoes = [
    { label: "MAIUSCULO", action: maiusculo, icon: CaseSensitive },
    { label: "minusculo", action: minusculo, icon: CaseSensitive },
    { label: "Capitalizado", action: capitalizado, icon: Type },
    { label: "iNVERTIDO", action: invertidoCase, icon: CaseSensitive },
    { label: "Inverter (esreveR)", action: invertido, icon: ArrowDownUp },
    { label: "Remover acentos", action: removerAcentos, icon: Type },
    { label: "Espacos simples", action: removerEspacosDuplos, icon: Type },
  ];

  return (
    <ToolLayout
      title="Formatador de Texto"
      emoji="🔡"
      category="Utilidades"
      description="Transforme texto entre maiusculas, minusculas, capitalizado e mais."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["teclado ergonômico"]} label="teclado ergonômico" />}
    
    >
      <div className="space-y-5">
        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">Texto original</span>
          <textarea
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Digite ou cole seu texto aqui..."
            className="input-field w-full h-32 resize-none p-3"
          />
        </label>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {botoes.map((btn) => (
            <button
              key={btn.label}
              onClick={btn.action}
              disabled={!texto}
              className="p-2 rounded-lg bg-white/5 text-sm text-gray-400 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {btn.label}
            </button>
          ))}
        </div>

        {resultado && (
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-blue-400">Resultado</p>
              <button onClick={copiar} className="flex items-center gap-1 text-xs text-gray-400 hover:text-white">
                {copiado ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                {copiado ? "Copiado!" : "Copiar"}
              </button>
            </div>
            <p className="text-white whitespace-pre-wrap">{resultado}</p>
          </div>
        )}

        <div className="p-3 rounded-lg bg-white/5 text-xs text-gray-500">
          <p className="font-semibold text-gray-400 mb-1">Atalhos uteis:</p>
          <p>Capitalizado: primeira letra de cada palavra em maiuscula</p>
          <p>iNVERTIDO: troca maiusculas por minusculas e vice-versa</p>
        </div>
      </div>
      <ToolContent
        toolName="Formatador de Texto"
        category="Utilidades"
        data={{
          directAnswer: "O formatador converte automaticamente entre maiúsculas, minúsculas, Title Case e remove espaços/quebras desnecessárias.",
          howItWorks: "A ferramenta processa o texto colado e aplica a formatação escolhida: maiúsculas, minúsculas, Title Case ou Sentence case. Também remove espaços duplicados e quebras de linha extras, útil para limpar textos copiados de PDFs.",
          example: {
            title: "Exemplo: formatando texto com espaços e maiúsculas incorretas",
            steps: [
              'Original: "SEGUNDA-FEIRA de manhã   cedo"',
              "Formatação: Sentence case",
              "Espaços duplicados removidos",
              'Resultado: "Segunda-feira de manhã cedo"',
            ],
            result: "O texto foi normalizado, com formatação correta e sem espaços duplicados.",
          },
          faqs: [
            { question: "O que é Title Case?", answer: "Estilo em que a primeira letra de cada palavra importante é maiúscula." },
            { question: "A ferramenta remove acentos?", answer: "Não, preserva a acentuação original." },
            { question: "Posso formatar textos longos?", answer: "Sim, sem limite prático, pois o processamento é no navegador." },
            { question: "Funciona para outros idiomas?", answer: "Sim, para a maioria dos idiomas com alfabeto latino." },
          ],
        }}
      />
    </ToolLayout>
  );
}
