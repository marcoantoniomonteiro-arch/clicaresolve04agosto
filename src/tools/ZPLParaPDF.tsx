import React, { useState } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { Download, FileText, Loader2, AlertTriangle, FileCode } from "lucide-react";

interface Props {
  onBack: () => void;
}

const DPI_TO_DPMM: Record<number, number> = {
  152: 6,
  203: 8,
  300: 12,
  600: 24,
};

const EXAMPLE_ZPL =
  "^XA^FO50,50^ADN,36,20^FDExemplo de Etiqueta^FS^FO50,100^BY3^BCN,100,Y,N,N^FD123456789^FS^XZ";

export function ZPLParaPDF({ onBack }: Props) {
  const [zpl, setZpl] = useState("");
  const [width, setWidth] = useState("4");
  const [height, setHeight] = useState("6");
  const [dpi, setDpi] = useState(203);
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = async () => {
    if (!zpl.trim()) {
      setError("Cole um código ZPL para converter.");
      return;
    }

    setLoading(true);
    setError(null);
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }

    const dpmm = DPI_TO_DPMM[dpi] ?? 8;
    const w = parseFloat(width.replace(",", ".")) || 4;
    const h = parseFloat(height.replace(",", ".")) || 6;

    try {
      const response = await fetch(
        `http://api.labelary.com/v1/printers/${dpmm}dpmm/labels/${w}x${h}/0/`,
        {
          method: "POST",
          headers: {
            Accept: "application/pdf",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: zpl,
        }
      );

      if (!response.ok) {
        throw new Error(
          response.status === 400
            ? "Código ZPL inválido. Verifique a sintaxe e tente novamente."
            : `Erro na API do Labelary (status ${response.status}). O serviço pode estar temporariamente indisponível.`
        );
      }

      const blob = await response.blob();
      if (blob.size === 0) {
        throw new Error("A API retornou um arquivo vazio. Verifique o código ZPL.");
      }
      setPdfUrl(URL.createObjectURL(blob));
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("Failed to fetch") || msg.includes("NetworkError")) {
        setError(
          "Não foi possível conectar ao serviço Labelary. Verifique sua conexão ou tente novamente em instantes — o serviço externo pode estar temporariamente indisponível."
        );
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!pdfUrl) return;
    const a = document.createElement("a");
    a.href = pdfUrl;
    a.download = "etiqueta-zpl.pdf";
    a.click();
  };

  const loadExample = () => {
    setZpl(EXAMPLE_ZPL);
    setError(null);
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
    }
  };

  return (
    <ToolLayout
      title="ZPL para PDF"
      emoji="🏷️"
      category="Utilidades"
      description="Converta código ZPL (Zebra) em PDF visual para conferir etiquetas antes de imprimir."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["etiqueta adesiva"]} label="Etiquetas e rótulos" />}
    >
      <div className="space-y-4">
        <div className="p-3 rounded-xl bg-blue-400/5 border border-blue-400/10">
          <p className="text-xs text-blue-400 leading-relaxed flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              Esta ferramenta envia o código ZPL para o serviço gratuito Labelary.com para gerar a visualização — diferente das demais ferramentas do site, que processam tudo localmente. Não envie códigos ZPL com informações pessoais sensíveis.
            </span>
          </p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-gray-400">Código ZPL</span>
            <button
              onClick={loadExample}
              className="text-xs text-green-400 hover:text-green-300 flex items-center gap-1"
            >
              <FileCode className="w-3.5 h-3.5" />
              Carregar exemplo
            </button>
          </div>
          <textarea
            value={zpl}
            onChange={(e) => setZpl(e.target.value)}
            className="input-field text-sm w-full min-h-[180px] resize-y font-mono"
            placeholder="Cole aqui o código ZPL da etiqueta..."
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Largura (pol)</span>
            <input
              type="number"
              step="0.1"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="input-field"
            />
          </label>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Altura (pol)</span>
            <input
              type="number"
              step="0.1"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="input-field"
            />
          </label>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">DPI</span>
            <select
              value={dpi}
              onChange={(e) => setDpi(Number(e.target.value))}
              className="input-field"
            >
              <option value={152}>152</option>
              <option value={203}>203</option>
              <option value={300}>300</option>
              <option value={600}>600</option>
            </select>
          </label>
        </div>

        <button
          onClick={handleConvert}
          disabled={loading}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Convertendo...
            </>
          ) : (
            <>
              <FileText className="w-5 h-5" />
              Converter e Visualizar
            </>
          )}
        </button>

        {error && (
          <div className="p-4 rounded-xl bg-red-400/10 border border-red-400/20">
            <p className="text-sm text-red-400 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              {error}
            </p>
          </div>
        )}

        {pdfUrl && (
          <div className="space-y-3">
            <div className="flex justify-end">
              <button
                onClick={handleDownload}
                className="btn-secondary flex items-center gap-2 text-sm"
              >
                <Download className="w-4 h-4" />
                Baixar PDF
              </button>
            </div>
            <div className="rounded-xl overflow-hidden border border-white/10 bg-white">
              <iframe
                src={pdfUrl}
                title="Preview da etiqueta"
                className="w-full h-[500px]"
              />
            </div>
          </div>
        )}

        {!pdfUrl && !error && !loading && (
          <div className="text-center py-12 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Cole um código ZPL e clique em converter</p>
          </div>
        )}
      </div>

      <ToolContent
        toolName="ZPL para PDF"
        category="Utilidades"
        data={{
          directAnswer:
            "ZPL (Zebra Programming Language) é a linguagem de comandos usada por impressoras térmicas Zebra para gerar etiquetas — esta ferramenta converte esse código em uma visualização e arquivo PDF, sem precisar de uma impressora física para testar.",
          howItWorks:
            "Etiquetas de envio, código de barras e identificação em logística geralmente são geradas em código ZPL, um formato de texto que descreve elementos como textos, códigos de barra e posições na etiqueta. Como interpretar e renderizar visualmente esse código do zero é tecnicamente complexo, esta ferramenta utiliza o serviço gratuito e público Labelary, especializado em renderização de etiquetas ZPL, para gerar o preview e o arquivo PDF final. Isso permite conferir como uma etiqueta vai ficar impressa antes de enviar para uma impressora física, economizando papel e tempo em testes.",
          example: {
            title: "Exemplo: convertendo um código ZPL simples",
            steps: [
              "Código ZPL colado (texto + código de barras)",
              "Configuração: etiqueta 4x6 polegadas, 203 DPI",
              "Clique em \"Converter e Visualizar\"",
              "Resultado: PDF gerado mostrando exatamente como a etiqueta ficará impressa",
            ],
            result:
              "O código ZPL foi convertido em um PDF visual, pronto para conferir o layout antes de imprimir de verdade.",
          },
          faqs: [
            {
              question: "O que é ZPL?",
              answer:
                "É a linguagem de comandos (Zebra Programming Language) usada por impressoras térmicas Zebra para gerar etiquetas de envio, código de barras e identificação, muito comum em logística e e-commerce.",
            },
            {
              question: "Essa ferramenta funciona offline, como as outras do site?",
              answer:
                "Não, diferente da maioria das ferramentas deste site, esta envia o código ZPL para o serviço externo gratuito Labelary.com para gerar a visualização, já que renderizar ZPL localmente exigiria um motor complexo.",
            },
            {
              question: "Posso usar para qualquer tamanho de etiqueta?",
              answer:
                "Sim, você pode ajustar a largura e altura da etiqueta conforme o padrão que sua impressora utiliza.",
            },
            {
              question: "É seguro colar meu código ZPL na ferramenta?",
              answer:
                "O código é enviado para o serviço Labelary apenas para gerar a visualização. Evite incluir informações pessoais sensíveis (como dados de clientes) no código ZPL de teste, por precaução.",
            },
          ],
        }}
      />
    </ToolLayout>
  );
}
