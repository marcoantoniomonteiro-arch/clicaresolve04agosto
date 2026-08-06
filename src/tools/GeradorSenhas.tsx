import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import React, { useState, useCallback, useMemo } from "react";


import { Copy, Check, RefreshCw, Shield, AlertTriangle, Lock } from "lucide-react";

interface Props {
  onBack: () => void;
}

export function GeradorSenhas({ onBack }: Props) {
  const [comprimento, setComprimento] = useState(16);
  const [maiusculas, setMaiusculas] = useState(true);
  const [minusculas, setMinusculas] = useState(true);
  const [numeros, setNumeros] = useState(true);
  const [simbolos, setSimbolos] = useState(true);
  const [senha, setSenha] = useState("");
  const [copiado, setCopiado] = useState(false);

  const gerar = useCallback(() => {
    let chars = "";
    if (maiusculas) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (minusculas) chars += "abcdefghijklmnopqrstuvwxyz";
    if (numeros) chars += "0123456789";
    if (simbolos) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!chars) {
      setSenha("");
      return;
    }

    const array = new Uint32Array(comprimento);
    crypto.getRandomValues(array);

    let result = "";
    for (let i = 0; i < comprimento; i++) {
      result += chars[array[i] % chars.length];
    }

    setSenha(result);
    setCopiado(false);
  }, [comprimento, maiusculas, minusculas, numeros, simbolos]);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(senha);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar", err);
    }
  };

  const forca = useMemo(() => {
    if (!senha) return { nivel: 0, label: "", cor: "" };

    let pontos = 0;
    if (senha.length >= 8) pontos++;
    if (senha.length >= 12) pontos++;
    if (senha.length >= 16) pontos++;
    if (senha.length >= 20) pontos++;
    if (/[A-Z]/.test(senha)) pontos++;
    if (/[a-z]/.test(senha)) pontos++;
    if (/[0-9]/.test(senha)) pontos++;
    if (/[^A-Za-z0-9]/.test(senha)) pontos++;

    if (pontos <= 3) return { nivel: 1, label: "Fraca", cor: "text-red-400" };
    if (pontos <= 5) return { nivel: 2, label: "Media", cor: "text-yellow-400" };
    return { nivel: 3, label: "Forte", cor: "text-green-400" };
  }, [senha]);

  React.useEffect(() => {
    gerar();
  }, [gerar]);

  return (
    <ToolLayout
      title="Gerador de Senhas"
      emoji="🔐"
      category="Utilidades"
      description="Gere senhas seguras com comprimento e caracteres personalizaveis."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["gerenciador senhas cofre"]} label="gerenciador senhas cofre" />}
    
    >
      <div className="space-y-5">
        <div className="p-4 rounded-xl bg-white/5 border border-white/8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">Comprimento</span>
            <span className="text-lg font-bold text-white">{comprimento}</span>
          </div>
          <input
            type="range"
            min="8"
            max="32"
            value={comprimento}
            onChange={(e) => setComprimento(parseInt(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>8</span>
            <span>32</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { checked: maiusculas, set: setMaiusculas, label: "Maiusculas" },
            { checked: minusculas, set: setMinusculas, label: "Minusculas" },
            { checked: numeros, set: setNumeros, label: "Numeros" },
            { checked: simbolos, set: setSimbolos, label: "Simbolos" },
          ].map((opt) => (
            <label
              key={opt.label}
              className="flex items-center gap-2 p-3 rounded-lg bg-white/5 cursor-pointer hover:bg-white/8 transition-colors"
            >
              <input
                type="checkbox"
                checked={opt.checked}
                onChange={(e) => opt.set(e.target.checked)}
                className="w-4 h-4 rounded accent-blue-500"
              />
              <span className="text-sm text-gray-300">{opt.label}</span>
            </label>
          ))}
        </div>

        {senha && (
          <div className="p-4 rounded-xl bg-black/30 border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-400">Senha Gerada</span>
            </div>
            <div className="flex items-center gap-3">
              <code className="flex-1 text-lg font-mono text-green-400 break-all">
                {senha}
              </code>
              <button
                onClick={copiar}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                {copiado ? (
                  <Check className="w-5 h-5 text-green-400" />
                ) : (
                  <Copy className="w-5 h-5 text-gray-400" />
                )}
              </button>
            </div>

            <div className="flex items-center gap-2 mt-3">
              <span className="text-xs text-gray-400">Forca:</span>
              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    forca.nivel === 1
                      ? "w-1/3 bg-red-500"
                      : forca.nivel === 2
                      ? "w-2/3 bg-yellow-500"
                      : "w-full bg-green-500"
                  }`}
                />
              </div>
              <span className={`text-xs font-semibold ${forca.cor}`}>{forca.label}</span>
            </div>
          </div>
        )}

        <button
          onClick={gerar}
          className="w-full p-3 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 font-semibold flex items-center justify-center gap-2 hover:bg-blue-500/30 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          Gerar Nova Senha
        </button>

        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-green-400">
              Gerada localmente com crypto.getRandomValues(). Nunca toca nossos servidores.
            </p>
          </div>
        </div>
      </div>
      <ToolContent
        toolName="Gerador de Senhas"
        category="Utilidades"
        data={{
          directAnswer: "Uma senha segura deve ter no mínimo 12 caracteres, combinando maiúsculas, minúsculas, números e símbolos, sem informações pessoais óbvias.",
          howItWorks: "A ferramenta gera senhas aleatórias diretamente no navegador, combinando os tipos de caracteres selecionados até atingir o comprimento escolhido. Todo o processo acontece localmente — nenhuma senha é enviada, armazenada ou registrada em servidor.",
          example: {
            title: "Exemplo: senha de 16 caracteres com todos os tipos ativados",
            steps: [
              "Comprimento: 16 caracteres",
              "Tipos incluídos: maiúsculas, minúsculas, números, símbolos",
              "Senha gerada (exemplo): xK9#mQ2$vL7!pR4z",
              "Nível de força estimado: Muito forte",
            ],
            result: "Uma senha de 16 caracteres com todos os tipos combinados leva milhões de anos para ser quebrada por força bruta com tecnologia atual.",
          },
          faqs: [
            { question: "Quantos caracteres uma senha segura deve ter?", answer: "Pelo menos 12 a 16 caracteres, combinando maiúsculas, minúsculas, números e símbolos." },
            { question: "As senhas geradas ficam salvas em algum lugar?", answer: "Não. A geração acontece no navegador; nenhuma senha é enviada a servidores." },
            { question: "É seguro reutilizar a mesma senha em vários sites?", answer: "Não é recomendado — se um site vazar dados, todas as contas com a mesma senha ficam vulneráveis." },
            { question: "Devo usar um gerenciador de senhas?", answer: "Sim, eles ajudam a armazenar com segurança senhas únicas para cada serviço." },
          ],
        }}
      />
    </ToolLayout>
  );
}
