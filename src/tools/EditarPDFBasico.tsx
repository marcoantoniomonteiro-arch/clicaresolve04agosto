import React, { useState, useCallback } from "react";
import { ToolLayout } from "../components/ToolLayout";
import { AffiliateBanner } from "../components/AffiliateBanner";
import { ToolContent } from "../components/ToolContent";
import { FileDown, FileText, Square, Type, Image as ImageIcon, Plus, Trash2, Edit3 } from "lucide-react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

interface Props {
  onBack: () => void;
}

type ActionType = "text" | "image" | "cover";

interface EditAction {
  id: string;
  type: ActionType;
  text?: string;
  fontSize?: number;
  imageFile?: File;
  x: number;
  y: number;
  width?: number;
  height?: number;
  color?: { r: number; g: number; b: number };
}

export function EditarPDFBasico({ onBack }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [actions, setActions] = useState<EditAction[]>([]);
  const [newActionType, setNewActionType] = useState<ActionType>("text");
  const [textValue, setTextValue] = useState("");
  const [fontSize, setFontSize] = useState(12);
  const [posX, setPosX] = useState(50);
  const [posY, setPosY] = useState(50);
  const [width, setWidth] = useState(100);
  const [height, setHeight] = useState(20);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [coverColor, setCoverColor] = useState("#ffffff");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  const handleFile = useCallback(async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const f = files[0];
    if (f.type !== "application/pdf") return;
    setError("");
    setActions([]);
    try {
      const arrayBuffer = await f.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      setFile(f);
      setPageCount(pdfDoc.getPageCount());
    } catch {
      setError("Não foi possível ler o PDF. Pode estar protegido por senha ou corrompido.");
    }
  }, []);

  const addAction = () => {
    if (newActionType === "text" && !textValue.trim()) {
      setError("Digite o texto antes de adicionar.");
      return;
    }
    if (newActionType === "image" && !imageFile) {
      setError("Selecione uma imagem antes de adicionar.");
      return;
    }

    const hexToRgb = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255;
      const g = parseInt(hex.slice(3, 5), 16) / 255;
      const b = parseInt(hex.slice(5, 7), 16) / 255;
      return { r, g, b };
    };

    const action: EditAction = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      type: newActionType,
      x: posX,
      y: posY,
      width,
      height,
    };

    if (newActionType === "text") {
      action.text = textValue;
      action.fontSize = fontSize;
    } else if (newActionType === "image") {
      action.imageFile = imageFile;
    } else if (newActionType === "cover") {
      action.color = hexToRgb(coverColor);
    }

    setActions((prev) => [...prev, action]);
    setTextValue("");
    setImageFile(null);
    setError("");
  };

  const removeAction = (id: string) => {
    setActions((prev) => prev.filter((a) => a.id !== id));
  };

  const applyEdits = async () => {
    if (!file || actions.length === 0) return;
    setProcessing(true);
    setError("");
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const pages = pdfDoc.getPages();
      const page = pages[Math.min(pageNum - 1, pages.length - 1)];

      for (const action of actions) {
        if (action.type === "text" && action.text) {
          page.drawText(action.text, {
            x: action.x,
            y: action.y,
            size: action.fontSize || 12,
            font,
            color: rgb(0, 0, 0),
          });
        } else if (action.type === "image" && action.imageFile) {
          const imgBuffer = await action.imageFile.arrayBuffer();
          let img;
          if (action.imageFile.type === "image/png") {
            img = await pdfDoc.embedPng(imgBuffer);
          } else if (action.imageFile.type === "image/jpeg") {
            img = await pdfDoc.embedJpg(imgBuffer);
          }
          if (img) {
            page.drawImage(img, {
              x: action.x,
              y: action.y,
              width: action.width || 100,
              height: action.height || 100,
            });
          }
        } else if (action.type === "cover" && action.color) {
          page.drawRectangle({
            x: action.x,
            y: action.y,
            width: action.width || 100,
            height: action.height || 20,
            color: rgb(action.color.r, action.color.g, action.color.b),
          });
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(/\.pdf$/i, "_editado.pdf");
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Erro ao editar o PDF. O arquivo pode estar protegido ou corrompido.");
    } finally {
      setProcessing(false);
    }
  };

  const actionTypes: { value: ActionType; label: string; icon: React.ReactNode }[] = [
    { value: "text", label: "Texto", icon: <Type className="w-4 h-4" /> },
    { value: "image", label: "Imagem", icon: <ImageIcon className="w-4 h-4" /> },
    { value: "cover", label: "Cobrir", icon: <Square className="w-4 h-4" /> },
  ];

  const actionLabels: Record<ActionType, string> = {
    text: "Texto",
    image: "Imagem",
    cover: "Cobrir área",
  };

  return (
    <ToolLayout
      title="Editar PDF Básico"
      emoji="✏️"
      category="Utilidades"
      description="Adicione texto, imagens ou cubra áreas específicas de uma página de PDF, com múltiplas edições aplicadas de uma vez."
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
              <span className="text-sm text-gray-400 mb-1 block">Página a editar</span>
              <input
                type="number"
                min={1}
                max={pageCount}
                value={pageNum}
                onChange={(e) => setPageNum(Math.min(Math.max(1, parseInt(e.target.value) || 1), pageCount))}
                className="input-field text-sm"
              />
            </div>

            <div className="border-t border-white/10 pt-4 space-y-3">
              <span className="text-sm text-gray-400 block">Adicionar edição</span>

              <div className="flex gap-2">
                {actionTypes.map((at) => (
                  <button
                    key={at.value}
                    onClick={() => setNewActionType(at.value)}
                    className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-1.5 ${
                      newActionType === at.value ? "bg-blue-500 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"
                    }`}
                  >
                    {at.icon}
                    {at.label}
                  </button>
                ))}
              </div>

              {newActionType === "text" && (
                <div>
                  <span className="text-sm text-gray-400 mb-1 block">Texto</span>
                  <input
                    type="text"
                    value={textValue}
                    onChange={(e) => setTextValue(e.target.value)}
                    placeholder="Texto a adicionar"
                    className="input-field text-sm"
                  />
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <div>
                      <span className="text-xs text-gray-500 block">Tamanho da fonte</span>
                      <input
                        type="number"
                        min={6}
                        max={72}
                        value={fontSize}
                        onChange={(e) => setFontSize(Math.max(6, parseInt(e.target.value) || 12))}
                        className="input-field text-sm"
                      />
                    </div>
                  </div>
                </div>
              )}

              {newActionType === "image" && (
                <div>
                  <span className="text-sm text-gray-400 mb-1 block">Imagem (PNG ou JPG)</span>
                  <input
                    type="file"
                    accept="image/png,image/jpeg"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="input-field text-sm"
                  />
                </div>
              )}

              {newActionType === "cover" && (
                <div>
                  <span className="text-sm text-gray-400 mb-1 block">Cor da cobertura</span>
                  <input
                    type="color"
                    value={coverColor}
                    onChange={(e) => setCoverColor(e.target.value)}
                    className="w-full h-10 rounded-xl bg-white/5 border border-white/10 cursor-pointer"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-xs text-gray-500 block">Posição X</span>
                  <input
                    type="number"
                    min={0}
                    value={posX}
                    onChange={(e) => setPosX(Math.max(0, parseInt(e.target.value) || 0))}
                    className="input-field text-sm"
                  />
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">Posição Y</span>
                  <input
                    type="number"
                    min={0}
                    value={posY}
                    onChange={(e) => setPosY(Math.max(0, parseInt(e.target.value) || 0))}
                    className="input-field text-sm"
                  />
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">Largura</span>
                  <input
                    type="number"
                    min={1}
                    value={width}
                    onChange={(e) => setWidth(Math.max(1, parseInt(e.target.value) || 100))}
                    className="input-field text-sm"
                  />
                </div>
                <div>
                  <span className="text-xs text-gray-500 block">Altura</span>
                  <input
                    type="number"
                    min={1}
                    value={height}
                    onChange={(e) => setHeight(Math.max(1, parseInt(e.target.value) || 20))}
                    className="input-field text-sm"
                  />
                </div>
              </div>

              <button
                onClick={addAction}
                className="btn-secondary w-full flex items-center justify-center gap-2 text-sm"
              >
                <Plus className="w-4 h-4" />
                Adicionar Edição
              </button>
            </div>

            {actions.length > 0 && (
              <div className="space-y-2">
                <span className="text-sm text-gray-400 block">Edições pendentes ({actions.length})</span>
                {actions.map((action) => (
                  <div key={action.id} className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/10">
                    <Edit3 className="w-4 h-4 text-blue-400 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white">
                        {actionLabels[action.type]}
                        {action.type === "text" && action.text ? `: ${action.text}` : ""}
                      </p>
                      <p className="text-xs text-gray-500">
                        X: {action.x}, Y: {action.y}
                        {action.width ? `, L: ${action.width}` : ""}
                        {action.height ? `, A: ${action.height}` : ""}
                      </p>
                    </div>
                    <button
                      onClick={() => removeAction(action.id)}
                      className="p-1.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors"
                      aria-label="Remover edição"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={applyEdits}
              disabled={processing || actions.length === 0}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {processing ? "Editando..." : (
                <>
                  <FileDown className="w-5 h-5" />
                  Gerar PDF Editado
                </>
              )}
            </button>
          </>
        )}

        {!file && !error && (
          <div className="text-center py-8 text-gray-500">
            <Edit3 className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Selecione um PDF para editar suas páginas</p>
          </div>
        )}
      </div>

      <ToolContent
        toolName="Editar PDF Básico"
        category="Utilidades"
        data={{
          directAnswer: "A edição básica de PDF permite adicionar texto, imagens ou cobrir áreas específicas de uma página, diretamente no navegador, sem precisar de softwares de edição complexos.",
          howItWorks: "A ferramenta permite três tipos de edição sobre uma página específica do PDF: adicionar um novo texto em uma posição escolhida, inserir uma imagem, ou cobrir uma área existente com um retângulo sólido (útil para ocultar informações que não devem mais aparecer). Cada edição é definida por coordenadas na página, e você pode acumular várias edições antes de gerar o PDF final com todas as alterações aplicadas de uma vez. Nota: esta é uma edição básica de sobreposição — para editar o texto original já existente no PDF (não apenas cobri-lo), seria necessário um editor de PDF mais avançado.",
          example: {
            title: "Exemplo: cobrindo uma informação e adicionando uma nota",
            steps: [
              "PDF carregado, página 2 selecionada",
              "Ação 1: cobrir uma área com retângulo branco (ocultando um dado sensível)",
              'Ação 2: adicionar texto "Revisado em 15/07/2026" próximo ao rodapé',
              "Aplicar as 2 edições e gerar o PDF final",
            ],
            result: "A página foi editada com as duas alterações aplicadas, sem afetar o restante do documento.",
          },
          faqs: [
            { question: "Posso editar o texto original do PDF diretamente?", answer: "Não, esta ferramenta permite adicionar novo conteúdo por cima ou cobrir áreas existentes, mas não edita o texto original incorporado no PDF." },
            { question: "Como faço para ocultar uma informação sensível?", answer: 'Use a opção "Cobrir área", definindo um retângulo na posição da informação que deseja ocultar — ele será coberto permanentemente no PDF final.' },
            { question: "Meu PDF é enviado para algum servidor?", answer: "Não, todo o processamento acontece localmente no seu navegador." },
            { question: "Posso fazer várias edições antes de salvar?", answer: "Sim, você pode acumular múltiplas ações (textos, imagens, áreas cobertas) e aplicar todas de uma vez ao gerar o PDF final." },
          ],
        }}
      />
    </ToolLayout>
  );
}
