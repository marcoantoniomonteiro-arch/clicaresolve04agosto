import React, { useState } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";

interface Props {
  onBack: () => void;
}

function validarCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]/g, "");
  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(cpf[i]) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[9])) return false;
  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(cpf[i]) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf[10]);
}

function validarCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/[^\d]/g, "");
  if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(0))) return false;
  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  return resultado === parseInt(digitos.charAt(1));
}

function formatarCPF(digitos: string): string {
  return digitos.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function formatarCNPJ(digitos: string): string {
  return digitos.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}

export function ValidadorCPFCNPJ({ onBack }: Props) {
  const [input, setInput] = useState("");
  const [resultado, setResultado] = useState<{ valido: boolean; tipo: string; formatado: string } | null>(null);

  const handleValidate = () => {
    const digitos = input.replace(/[^\d]/g, "");
    if (digitos.length === 11) {
      const valido = validarCPF(digitos);
      setResultado({ valido, tipo: "CPF", formatado: formatarCPF(digitos) });
    } else if (digitos.length === 14) {
      const valido = validarCNPJ(digitos);
      setResultado({ valido, tipo: "CNPJ", formatado: formatarCNPJ(digitos) });
    } else {
      setResultado({ valido: false, tipo: "Desconhecido", formatado: input });
    }
  };

  return (
    <ToolLayout
      title="Validador de CPF/CNPJ"
      emoji="✅"
      category="Utilidades"
      description="Valide CPF e CNPJ usando o algoritmo oficial de dígitos verificadores."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["contabilidade online"]} label="contabilidade online" />}
    >
      <div className="space-y-4">
        <label className="block">
          <span className="text-sm text-gray-400 mb-1 block">CPF ou CNPJ</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="111.444.777-35 ou 11.222.333/0001-81"
            className="input-field"
          />
        </label>

        <button onClick={handleValidate} className="btn-primary w-full">Validar</button>

        {resultado && (
          <div className={`p-4 rounded-xl border text-center ${
            resultado.tipo === "Desconhecido"
              ? "bg-yellow-500/10 border-yellow-500/20"
              : resultado.valido
                ? "bg-green-500/10 border-green-500/20"
                : "bg-red-500/10 border-red-500/20"
          }`}>
            {resultado.tipo === "Desconhecido" ? (
              <p className="text-sm text-yellow-400">Informe 11 dígitos (CPF) ou 14 dígitos (CNPJ).</p>
            ) : (
              <>
                <p className={`text-2xl font-bold ${resultado.valido ? "text-green-400" : "text-red-400"}`}>
                  {resultado.valido ? "Válido" : "Inválido"}
                </p>
                <p className="text-sm text-gray-400 mt-1">{resultado.tipo}: {resultado.formatado}</p>
              </>
            )}
          </div>
        )}

        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
          <p className="text-xs text-gray-500 leading-relaxed">
            Esta validação verifica apenas os dígitos verificadores matemáticos. NÃO consulta a Receita Federal — um documento matematicamente válido pode não existir ou estar cancelado.
          </p>
        </div>
      </div>

      <ToolContent
        toolName="Validador de CPF/CNPJ"
        category="Utilidades"
        data={{
          directAnswer: "A validação de CPF e CNPJ verifica se os dígitos verificadores (os últimos números) conferem matematicamente com o restante do documento, usando o algoritmo oficial da Receita Federal.",
          howItWorks: "CPF e CNPJ possuem dígitos verificadores calculados a partir dos demais números do documento, usando um algoritmo matemático padronizado (módulo 11). A ferramenta aplica esse cálculo para conferir se o número informado é matematicamente válido. IMPORTANTE: esta validação NÃO consulta a Receita Federal - ela apenas verifica se os dígitos conferem matematicamente. Um CPF pode ser matematicamente válido e mesmo assim não existir, estar cancelado ou irregular.",
          example: {
            title: "Exemplo: validando um CPF",
            steps: [
              `Número informado: 111.444.777-35`,
              `Remoção de formatação: 11144477735`,
              `Cálculo do 1º dígito verificador conforme algoritmo`,
              `Cálculo do 2º dígito verificador conforme algoritmo`,
              `Resultado: os dígitos conferem = CPF matematicamente válido`,
            ],
            result: "O CPF informado passou na validação matemática dos dígitos verificadores.",
          },
          faqs: [
            { question: "Essa ferramenta confirma se o CPF/CNPJ realmente existe?", answer: "Não. Ela verifica apenas se os dígitos verificadores são matematicamente válidos. Para saber se o documento existe e está regular, é necessário consultar diretamente o site da Receita Federal." },
            { question: "Como funciona o cálculo do dígito verificador?", answer: "É um algoritmo matemático (módulo 11) que usa os primeiros dígitos do documento, multiplicados por pesos específicos, para calcular os 2 últimos dígitos de verificação." },
            { question: "Meus dados são enviados para algum servidor?", answer: "Não, toda a validação acontece no seu navegador, sem enviar o CPF/CNPJ digitado a nenhum lugar." },
            { question: "Um CPF com dígitos iguais (111.111.111-11) é válido?", answer: "Não, a ferramenta rejeita automaticamente sequências de dígitos repetidos, que nunca são CPFs/CNPJs reais válidos." },
          ],
        }}
      />
    </ToolLayout>
  );
}
