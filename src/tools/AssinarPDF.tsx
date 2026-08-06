import React, { useState, useRef, useCallback, useEffect } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { FileDown, FileText, PenTool, Type, Image as ImageIcon } from "lucide-react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

interface Props {
  onBack: () => void;
}

type SignMethod = "draw" | "type" | "image";

export function AssinarPDF({ onBack }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [method, setMethod] = useState<SignMethod>("draw");
  const [typedName, setTypedName] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [posX, setPosX] = useState(100);
  const [posY, setPosY] = useState(100);
  const [signWidth, setSignWidth] = useState(200);
  const [signHeight, setSignHeight] = useState(80);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lastPoint = useRef<{ x: number; y: number } | null>(null);
  const [hasDrawn, setHasDrawn] = useState(false);

  const handleFile = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const f = files[0];
    if (f.type !== "application/pdf") return;
    setError("");
    try {
      const arrayBuffer = await f.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      setFile(f);
      setPageCount(pdfDoc.getPageCount());
      setPageNum(pdfDoc.getPageCount());
    } catch {
      setError("Não foi possível ler o PDF. Pode estar protegido por senha ou corrompido.");
    }
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const getCanvasPos = (e: React.MouseEvent | React.TouchEvent): { x: number; y: number } | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ("touches" in e) {
      const t = e.touches[0] || e.changedTouches[0];
      return { x: (t.clientX - rect.left) * scaleX, y: (t.clientY - rect.top) * scaleY };
    }
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const pos = getCanvasPos(e);
    if (!pos) return;
    isDrawing.current = true;
    lastPoint.current = pos;
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current) return;
    e.preventDefault();
    const pos = getCanvasPos(e);
    if (!pos || !lastPoint.current) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(lastPoint.current.x, lastPoint.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastPoint.current = pos;
    setHasDrawn(true);
  };

  const endDraw = () => {
    isDrawing.current = false;
    lastPoint.current = null;
  };

  const signPdf = async () => {
    if (!file) return;
    if (method === "type" && !typedName.trim()) {
      setError("Digite o nome para a assinatura.");
      return;
    }
    if (method === "draw" && !hasDrawn) {
      setError("Desenhe sua assinatura no quadro.");
      return;
    }
    if (method === "image" && !imageFile) {
      setError("Envie uma imagem de assinatura.");
      return;
    }
    setProcessing(true);
    setError("");
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const pages = pdfDoc.getPages();
      const page = pages[Math.min(pageNum - 1, pages.length - 1)];

      if (method === "draw") {
        const canvas = canvasRef.current;
        if (canvas) {
          const pngDataUrl = canvas.toDataURL("image/png");
          const pngBytes = await (await fetch(pngDataUrl)).arrayBuffer();
          const pngImage = await pdfDoc.embedPng(pngBytes);
          page.drawImage(pngImage, {
            x: posX,
            y: posY,
            width: signWidth,
            height: signHeight,
          });
        }
      } else if (method === "type") {
        const font = await pdfDoc.embedFont(StandardFonts.HelveticaBoldItalic);
        const fontSize = 28;
        page.drawText(typedName, {
          x: posX,
          y: posY,
          size: fontSize,
          font,
          color: rgb(0, 0, 0),
        });
      } else if (method === "image" && imageFile) {
        const imgArrayBuffer = await imageFile.arrayBuffer();
        let embeddedImage;
        if (imageFile.type === "image/png") {
          embeddedImage = await pdfDoc.embedPng(imgArrayBuffer);
        } else {
          embeddedImage = await pdfDoc.embedJpg(imgArrayBuffer);
        }
        page.drawImage(embeddedImage, {
          x: posX,
          y: posY,
          width: signWidth,
          height: signHeight,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(/\.pdf$/i, "_assinado.pdf");
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Erro ao assinar o PDF. O arquivo pode estar protegido ou corrompido.");
    } finally {
      setProcessing(false);
    }
  };

  const methods: { value: SignMethod; label: string; icon: React.ReactNode }[] = [
    { value: "draw", label: "Desenhar", icon: <PenTool className="w-4 h-4" /> },
    { value: "type", label: "Digitar", icon: <Type className="w-4 h-4" /> },
    { value: "image", label: "Imagem", icon: <ImageIcon className="w-4 h-4" /> },
  ];

  return (
    <ToolLayout
      title="Assinar PDF"
      emoji="✍️"
      category="Utilidades"
      description="Adicione sua assinatura (desenhada, digitada ou uma imagem) diretamente em um PDF, sem imprimir."
      onBack={onBack}
      affiliateBanner={<AffiliateBanner terms={["editor pdf"]} label="editor pdf" />}
    >
      <div className="space-y-4">
        <div>
          <label className="block">
            <span className="text-sm text-gray-400 mb-1 block">Selecione um arquivo PDF</span>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => handleFile(e.target.files)}
              className="input-field text-sm"
            />
          </label>
        </div>

        {error && <p className="text-sm text-red-400 text-center">{error}</p>}

        {file && pageCount > 0 && (
          <>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
              <p className="text-sm text-white">
                <FileText className="w-4 h-4 inline mr-1" />
                {file.name} — {pageCount} página(s)
              </p>
            </div>

            <div>
              <span className="text-sm text-gray-400 mb-1 block">Método de assinatura</span>
              <div className="flex gap-2">
                {methods.map((m) => (
                  <button
                    key={m.value}
                    onClick={() => setMethod(m.value)}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-1.5 ${
                      method === m.value ? "bg-blue-500 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    {m.icon}
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {method === "draw" && (
              <div className="space-y-2">
                <span className="text-sm text-gray-400 block">Desenhe sua assinatura</span>
                <canvas
                  ref={canvasRef}
                  width={400}
                  height={160}
                  onMouseDown={startDraw}
                  onMouseMove={draw}
                  onMouseUp={endDraw}
                  onMouseLeave={endDraw}
                  onTouchStart={startDraw}
                  onTouchMove={draw}
                  onTouchEnd={endDraw}
                  className="w-full rounded-xl bg-white border border-white/10 touch-none cursor-crosshair"
                />
                <button onClick={clearCanvas} className="btn-secondary text-sm w-full">
                  Limpar quadro
                </button>
              </div>
            )}

            {method === "type" && (
              <div>
                <span className="text-sm text-gray-400 mb-1 block">Seu nome</span>
                <input
                  type="text"
                  value={typedName}
                  onChange={(e) => setTypedName(e.target.value)}
                  placeholder="João Silva"
                  className="input-field text-sm"
                />
                <p className="text-xs text-gray-500 mt-2 italic" style={{ fontFamily: "cursive, serif" }}>
                  Prévia: {typedName || "—"}
                </p>
              </div>
            )}

            {method === "image" && (
              <div>
                <span className="text-sm text-gray-400 mb-1 block">Imagem da assinatura (PNG ideal)</span>
                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="input-field text-sm"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-sm text-gray-400 mb-1 block">Página</span>
                <input
                  type="number"
                  min={1}
                  max={pageCount}
                  value={pageNum}
                  onChange={(e) => setPageNum(Math.min(Math.max(1, parseInt(e.target.value) || 1), pageCount))}
                  className="input-field text-sm"
                />
              </div>
              <div>
                <span className="text-sm text-gray-400 mb-1 block">Largura (px)</span>
                <input
                  type="number"
                  min={50}
                  max={500}
                  value={signWidth}
                  onChange={(e) => setSignWidth(Math.max(50, parseInt(e.target.value) || 200))}
                  className="input-field text-sm"
                />
              </div>
              <div>
                <span className="text-sm text-gray-400 mb-1 block">Posição X</span>
                <input
                  type="number"
                  min={0}
                  value={posX}
                  onChange={(e) => setPosX(Math.max(0, parseInt(e.target.value) || 0))}
                  className="input-field text-sm"
                />
              </div>
              <div>
                <span className="text-sm text-gray-400 mb-1 block">Posição Y</span>
                <input
                  type="number"
                  min={0}
                  value={posY}
                  onChange={(e) => setPosY(Math.max(0, parseInt(e.target.value) || 0))}
                  className="input-field text-sm"
                />
              </div>
            </div>

            {method === "image" && (
              <div>
                <span className="text-sm text-gray-400 mb-1 block">Altura (px)</span>
                <input
                  type="number"
                  min={30}
                  max={300}
                  value={signHeight}
                  onChange={(e) => setSignHeight(Math.max(30, parseInt(e.target.value) || 80))}
                  className="input-field text-sm"
                />
              </div>
            )}

            <button
              onClick={signPdf}
              disabled={processing}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {processing ? "Assinando..." : (
                <>
                  <PenTool className="w-5 h-5" />
                  Assinar PDF
                </>
              )}
            </button>
          </>
        )}

        {!file && !error && (
          <div className="text-center py-8 text-gray-500">
            <PenTool className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Selecione um PDF para adicionar sua assinatura</p>
          </div>
        )}
      </div>

      <ToolContent
        toolName="Assinar PDF"
        category="Utilidades"
        data={{
          directAnswer: "Assinar um PDF adiciona sua assinatura (desenhada, digitada ou uma imagem) diretamente no documento, sem precisar imprimir, assinar à mão e escanear novamente.",
          howItWorks: "A ferramenta permite criar sua assinatura de três formas: desenhando com o mouse ou o dedo na tela, digitando seu nome com uma fonte de estilo cursivo, ou enviando uma imagem de uma assinatura já existente. Depois de criada, a assinatura é posicionada na página escolhida do PDF e incorporada permanentemente ao documento. Nota importante: esta é uma assinatura visual (equivalente a assinar à mão em um documento impresso), não uma assinatura digital com certificação criptográfica — para documentos que exigem validade jurídica com certificado digital, é necessário usar uma ferramenta de assinatura digital certificada.",
          example: {
            title: "Exemplo: assinando um contrato digitando o nome",
            steps: [
              "PDF do contrato carregado",
              "Método escolhido: digitar nome com fonte cursiva",
              'Nome digitado: "João Silva"',
              "Posicionado na última página, no local indicado para assinatura",
            ],
            result: "O documento agora contém a assinatura visual, pronto para ser compartilhado sem precisar imprimir e escanear.",
          },
          faqs: [
            { question: "Essa assinatura tem validade jurídica como uma assinatura digital certificada?", answer: "Não necessariamente — é uma assinatura visual (como assinar à mão), similar ao que se faria imprimindo e assinando um documento. Para validade jurídica com certificação digital, é necessário um serviço de assinatura digital certificada." },
            { question: "Meu PDF é enviado para algum servidor?", answer: "Não, todo o processamento acontece localmente no seu navegador." },
            { question: "Posso reposicionar a assinatura antes de finalizar?", answer: "Sim, é possível ajustar a posição antes de gerar o PDF final." },
            { question: "Posso assinar em mais de uma página?", answer: "Esta versão foca em assinar uma página por vez; para assinar múltiplas páginas, repita o processo para cada uma." },
          ],
        }}
      />
    </ToolLayout>
  );
}
