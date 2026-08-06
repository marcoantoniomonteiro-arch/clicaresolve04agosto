import React, { useState, useEffect, useMemo, useCallback, useRef, lazy, Suspense } from "react";
import { Header } from "./components/Header";
import { SEOHead } from "./components/SEOHead";
import { CategoryPage } from "./components/CategoryPage";
import { CookieBanner } from "./components/CookieBanner";
import { NavigationContext } from "./context/NavigationContext";
import { wasScrolling } from "./utils/touchHandler";
import { TOOLS, CATEGORIES, Category } from "./data/tools";
import { CATEGORY_SEO_DATA } from "./data/seoData";
import { SobrePage } from "./pages/SobrePage";
import { MetodologiaPage } from "./pages/MetodologiaPage";
import { ContatoPage } from "./pages/ContatoPage";
import { PrivacidadePage } from "./pages/PrivacidadePage";
import { TermosPage } from "./pages/TermosPage";
import { GuiasPage } from "./pages/GuiasPage";
import { GuiaArticlePage } from "./pages/GuiaArticlePage";
import { GUIDES } from "./data/guides";
import { CafeButton, CafeFooterLink } from "./components/CafeButton";
import { enSlugToPtSlug, ptSlugToEnSlug } from "./i18n/tools/en";

const STATIC_PAGES: Record<string, React.ComponentType<{ onBack: () => void }>> = {
  "sobre": SobrePage,
  "metodologia": MetodologiaPage,
  "contato": ContatoPage,
  "privacidade": PrivacidadePage,
  "termos": TermosPage,
  "guias": GuiasPage,
};

const TOOL_COMPONENTS: Record<string, React.ComponentType<{ onBack: () => void; initialName?: string }>> = {
  "alcool-gasolina": lazy(() => import("./tools/AlcoolGasolina").then(m => ({ default: m.AlcoolGasolina }))),
  "divisor-carona": lazy(() => import("./tools/DivisorCarona").then(m => ({ default: m.DivisorCarona }))),
  "consumo-energia": lazy(() => import("./tools/ConsumoEnergia").then(m => ({ default: m.ConsumoEnergia }))),
  "calculadora-tinta": lazy(() => import("./tools/CalculadoraTinta").then(m => ({ default: m.CalculadoraTinta }))),
  "calculadora-btu": lazy(() => import("./tools/CalculadoraBTU").then(m => ({ default: m.CalculadoraBTU }))),
  "limpeza-zonas": lazy(() => import("./tools/LimpezaZonas").then(m => ({ default: m.LimpezaZonas }))),
  "metros-quadrados": lazy(() => import("./tools/MetrosQuadrados").then(m => ({ default: m.MetrosQuadrados }))),
  "depreciacao-veiculo": lazy(() => import("./tools/DepreciacaoVeiculo").then(m => ({ default: m.DepreciacaoVeiculo }))),
  "parcelamento-multas": lazy(() => import("./tools/ParcelamentoMultas").then(m => ({ default: m.ParcelamentoMultas }))),
  "imc-avancada": lazy(() => import("./tools/IMCAvancada").then(m => ({ default: m.IMCAvancada }))),
  "periodo-fertil": lazy(() => import("./tools/PeriodoFertil").then(m => ({ default: m.PeriodoFertil }))),
  "dpp": lazy(() => import("./tools/DPP").then(m => ({ default: m.DPP }))),
  "contracoes": lazy(() => import("./tools/Contracoes").then(m => ({ default: m.Contracoes }))),
  "gasto-calorico": lazy(() => import("./tools/GastoCalorico").then(m => ({ default: m.GastoCalórico }))),
  "ciclos-sono": lazy(() => import("./tools/CiclosSono").then(m => ({ default: m.CiclosSono }))),
  "frequencia-cardiaca": lazy(() => import("./tools/FrequenciaCardiaca").then(m => ({ default: m.FrequenciaCardiaca }))),
  "limite-cafeina": lazy(() => import("./tools/LimiteCafeina").then(m => ({ default: m.LimiteCafeina }))),
  "macronutrientes": lazy(() => import("./tools/Macronutrientes").then(m => ({ default: m.Macronutrientes }))),
  "alerta-agua": lazy(() => import("./tools/AlertaAgua").then(m => ({ default: m.AlertaAgua }))),
  "roteirizador": lazy(() => import("./tools/Roteirizador").then(m => ({ default: m.Roteirizador }))),
  "placar-poliesportivo": lazy(() => import("./tools/PlacarPoliesportivo").then(m => ({ default: m.PlacarPoliesportivo }))),
  "sorteador-equipes": lazy(() => import("./tools/SorteadorEquipes").then(m => ({ default: m.SorteadorEquipes }))),
  "gerador-bolao": lazy(() => import("./tools/GeradorBolao").then(m => ({ default: m.GeradorBolao }))),
  "onde-assistir": lazy(() => import("./tools/OndeAssistir").then(m => ({ default: m.OndeAssistir }))),
  "probabilidades-classificacao": lazy(() => import("./tools/ProbabilidadesClassificacao").then(m => ({ default: m.ProbabilidadesClassificacao }))),
  "palpites-loteria": lazy(() => import("./tools/PalpitesLoteria").then(m => ({ default: m.PalpitesLoteria }))),
  "painel-bingo": lazy(() => import("./tools/PainelBingo").then(m => ({ default: m.PainelBingo }))),
  "comparador-preco": lazy(() => import("./tools/ComparadorPreco").then(m => ({ default: m.ComparadorPreco }))),
  "juros-compostos": lazy(() => import("./tools/JurosCompostos").then(m => ({ default: m.JurosCompostos }))),
  "calculadora-desconto": lazy(() => import("./tools/CalculadoraDesconto").then(m => ({ default: m.CalculadoraDesconto }))),
  "taxas-maquininha": lazy(() => import("./tools/TaxasMaquininha").then(m => ({ default: m.TaxasMaquininha }))),
  "conversor-cozinha": lazy(() => import("./tools/ConversorCozinha").then(m => ({ default: m.ConversorCozinha }))),
  "conversor-roupas": lazy(() => import("./tools/ConversorRoupas").then(m => ({ default: m.ConversorRoupas }))),
  "salario-hora": lazy(() => import("./tools/SalarioHora").then(m => ({ default: m.SalarioHora }))),
  "ponto-equilibrio": lazy(() => import("./tools/PontoEquilibrio").then(m => ({ default: m.PontoEquilibrio }))),
  "simulador-markup": lazy(() => import("./tools/SimuladorMarkup").then(m => ({ default: m.SimuladorMarkup }))),
  "conversor-moedas": lazy(() => import("./tools/ConversorMoedas").then(m => ({ default: m.ConversorMoedas }))),
  "ciclo-estudos": lazy(() => import("./tools/CicloEstudos").then(m => ({ default: m.CicloEstudos }))),
  "calculadora-edital": lazy(() => import("./tools/CalculadoraEdital").then(m => ({ default: m.CalculadoraEdital }))),
  "mapeamento-erros": lazy(() => import("./tools/MapeamentoErros").then(m => ({ default: m.MapeamentoErros }))),
  "contador-caracteres": lazy(() => import("./tools/ContadorCaracteres").then(m => ({ default: m.ContadorCaracteres }))),
  "simulador-sisu": lazy(() => import("./tools/SimuladorSISU").then(m => ({ default: m.SimuladorSISU }))),
  "pomodoro": lazy(() => import("./tools/Pomodoro").then(m => ({ default: m.Pomodoro }))),
  "velocidade-digitacao": lazy(() => import("./tools/VelocidadeDigitacao").then(m => ({ default: m.VelocidadeDigitacao }))),
  "taxa-engajamento": lazy(() => import("./tools/TaxaEngajamento").then(m => ({ default: m.TaxaEngajamento }))),
  "formatador-legendas": lazy(() => import("./tools/FormatadorLegendas").then(m => ({ default: m.FormatadorLegendas }))),
  "roteiro-judaismo": lazy(() => import("./tools/RoteiroJudaismo").then(m => ({ default: m.RoteiroJudaismo }))),
  "plano-leitura-biblica": lazy(() => import("./tools/PlanoLeituraBiblica").then(m => ({ default: m.PlanoLeituraBiblica }))),
  "cronologia-biblica": lazy(() => import("./tools/CronologiaBiblica").then(m => ({ default: m.CronologiaBiblica }))),
  "calendario-hebraico": lazy(() => import("./tools/CalendarioHebraico").then(m => ({ default: m.CalendarioHebraico }))),
  "fichamento-soap": lazy(() => import("./tools/FichamentoSOAP").then(m => ({ default: m.FichamentoSOAP }))),
  "calendario-feriados": lazy(() => import("./tools/CalendarioFeriados").then(m => ({ default: m.CalendarioFeriados }))),
  "diferenca-datas": lazy(() => import("./tools/DiferencaDatas").then(m => ({ default: m.DiferencaDatas }))),
  "acumulador-horas": lazy(() => import("./tools/AcumuladorHoras").then(m => ({ default: m.AcumuladorHoras }))),
  "horas-decimais": lazy(() => import("./tools/HorasDecimais").then(m => ({ default: m.HorasDecimais }))),
  "dias-vida": lazy(() => import("./tools/DiasVida").then(m => ({ default: m.DiasVida }))),
  "gerador-qrcode": lazy(() => import("./tools/GeradorQRCode").then(m => ({ default: m.GeradorQRCode }))),
  "gerador-senhas": lazy(() => import("./tools/GeradorSenhas").then(m => ({ default: m.GeradorSenhas }))),
  "organizador-listas": lazy(() => import("./tools/OrganizadorListas").then(m => ({ default: m.OrganizadorListas }))),
  "porcentagem-reversa": lazy(() => import("./tools/PorcentagemReversa").then(m => ({ default: m.PorcentagemReversa }))),
  "custo-nail": lazy(() => import("./tools/CustoNailDesigner").then(m => ({ default: m.CustoNailDesigner }))),
  "agenda-unhas": lazy(() => import("./tools/AgendaUnhas").then(m => ({ default: m.AgendaUnhas }))),
  "cronograma-capilar": lazy(() => import("./tools/CronogramaCapilar").then(m => ({ default: m.CronogramaCapilar }))),
  "tarefas-infantil": lazy(() => import("./tools/TarefasInfantil").then(m => ({ default: m.TarefasInfantil }))),
  "conversor-dpi": lazy(() => import("./tools/ConversorDPI").then(m => ({ default: m.ConversorDPI }))),
  "backlog-gamer": lazy(() => import("./tools/BacklogGamer").then(m => ({ default: m.BacklogGamer }))),
  "gerador-nicks": lazy(() => import("./tools/GeradorNicks").then(m => ({ default: m.GeradorNicks }))),
  "spawn-timer": lazy(() => import("./tools/SpawnTimer").then(m => ({ default: m.SpawnTimer }))),
  "conversor-proporcao": lazy(() => import("./tools/ConversorProporcao").then(m => ({ default: m.ConversorProporcao }))),
  "paleta-cores": lazy(() => import("./tools/PaletaCores").then(m => ({ default: m.PaletaCores }))),
  "descobridor-anagramas": lazy(() => import("./tools/DescobridorAnagramas").then(m => ({ default: m.DescobridorAnagramas }))),
  "calculadora-churrasco": lazy(() => import("./tools/CalculadoraChurrasco").then(m => ({ default: m.CalculadoraChurrasco }))),
  "link-whatsapp": lazy(() => import("./tools/GeradorLinkWhatsApp").then(m => ({ default: m.GeradorLinkWhatsApp }))),
  "formatador-texto": lazy(() => import("./tools/FormatadorTexto").then(m => ({ default: m.FormatadorTexto }))),
  "gerador-recibo": lazy(() => import("./tools/GeradorRecibo").then(m => ({ default: m.GeradorRecibo }))),
  "descobridor-signo": lazy(() => import("./tools/DescobridorSigno").then(m => ({ default: m.DescobridorSigno }))),
  "compatibilidade-signos": lazy(() => import("./tools/CompatibilidadeSignos").then(m => ({ default: m.CompatibilidadeSignos }))),
  "mapa-numerologico": lazy(() => import("./tools/MapaNumerologico").then(m => ({ default: m.MapaNumerologico }))),
  "sugestor-livros": lazy(() => import("./tools/SugestorLivros").then(m => ({ default: m.SugestorLivros }))),
  "significado-nomes": lazy(() => import("./tools/SignificadoNomes").then(m => ({ default: m.SignificadoNomes }))),
  "idade-pet": lazy(() => import("./tools/IdadePet").then(m => ({ default: m.IdadePet }))),
  "consumo-racao": lazy(() => import("./tools/ConsumoRacao").then(m => ({ default: m.ConsumoRacao }))),
  "nomes-pets": lazy(() => import("./tools/NomesPets").then(m => ({ default: m.NomesPets }))),
  "vacinas-pet": lazy(() => import("./tools/VacinasPet").then(m => ({ default: m.VacinasPet }))),
  "economia-energia-solar": lazy(() => import("./tools/EconomiaEnergiaSolar").then(m => ({ default: m.EconomiaEnergiaSolar }))),
  "formatador-json": lazy(() => import("./tools/FormatadorJSON").then(m => ({ default: m.FormatadorJSON }))),
  "gerador-uuid": lazy(() => import("./tools/GeradorUUID").then(m => ({ default: m.GeradorUUID }))),
  "codificador-base64": lazy(() => import("./tools/CodificadorBase64").then(m => ({ default: m.CodificadorBase64 }))),
  "validador-cpf-cnpj": lazy(() => import("./tools/ValidadorCPFCNPJ").then(m => ({ default: m.ValidadorCPFCNPJ }))),
  "removedor-acentos": lazy(() => import("./tools/RemovedorAcentos").then(m => ({ default: m.RemovedorAcentos }))),
  "simulador-financiamento": lazy(() => import("./tools/SimuladorFinanciamento").then(m => ({ default: m.SimuladorFinanciamento }))),
  "compressor-imagem": lazy(() => import("./tools/CompressorImagem").then(m => ({ default: m.CompressorImagem }))),
  "redimensionador-imagem": lazy(() => import("./tools/RedimensionadorImagem").then(m => ({ default: m.RedimensionadorImagem }))),
  "testador-regex": lazy(() => import("./tools/TestadorRegex").then(m => ({ default: m.TestadorRegex }))),
  "gerador-hash": lazy(() => import("./tools/GeradorHash").then(m => ({ default: m.GeradorHash }))),
  "codificador-url": lazy(() => import("./tools/CodificadorURL").then(m => ({ default: m.CodificadorURL }))),
  "conversor-csv-excel": lazy(() => import("./tools/ConversorCSVExcel").then(m => ({ default: m.ConversorCSVExcel }))),
  "conversor-json-csv": lazy(() => import("./tools/ConversorJSONCSV").then(m => ({ default: m.ConversorJSONCSV }))),
  "calculadora-gorjeta": lazy(() => import("./tools/CalculadoraGorjeta").then(m => ({ default: m.CalculadoraGorjeta }))),
  "calculadora-regra-de-tres": lazy(() => import("./tools/CalculadoraRegraTres").then(m => ({ default: m.CalculadoraRegraTres }))),
  "seletor-cores": lazy(() => import("./tools/SeletorCores").then(m => ({ default: m.SeletorCores }))),
  "contador-tempo-decorrido": lazy(() => import("./tools/ContadorTempoDecorrido").then(m => ({ default: m.ContadorTempoDecorrido }))),
  "contador-silabas-rimas": lazy(() => import("./tools/GeradorSilabasRimas").then(m => ({ default: m.GeradorSilabasRimas }))),
  "imagem-para-pdf": lazy(() => import("./tools/ImagemParaPDF").then(m => ({ default: m.ImagemParaPDF }))),
  "pdf-para-imagem": lazy(() => import("./tools/PDFParaImagem").then(m => ({ default: m.PDFParaImagem }))),
  "juntar-pdf": lazy(() => import("./tools/JuntarPDF").then(m => ({ default: m.JuntarPDF }))),
  "dividir-pdf": lazy(() => import("./tools/DividirPDF").then(m => ({ default: m.DividirPDF }))),
  "comprimir-pdf": lazy(() => import("./tools/ComprimirPDF").then(m => ({ default: m.ComprimirPDF }))),
  "girar-pdf": lazy(() => import("./tools/GirarPDF").then(m => ({ default: m.GirarPDF }))),
  "numerar-paginas-pdf": lazy(() => import("./tools/NumerarPaginasPDF").then(m => ({ default: m.NumerarPaginasPDF }))),
  "marca-dagua-pdf": lazy(() => import("./tools/MarcaDaguaPDF").then(m => ({ default: m.MarcaDaguaPDF }))),
  "extrair-paginas-pdf": lazy(() => import("./tools/ExtrairPaginasPDF").then(m => ({ default: m.ExtrairPaginasPDF }))),
  "cabecalho-rodape-pdf": lazy(() => import("./tools/CabecalhoRodapePDF").then(m => ({ default: m.CabecalhoRodapePDF }))),
  "numeracao-bates-pdf": lazy(() => import("./tools/NumeracaoBatesPDF").then(m => ({ default: m.NumeracaoBatesPDF }))),
  "achatar-pdf": lazy(() => import("./tools/AchatarPDF").then(m => ({ default: m.AchatarPDF }))),
  "assinar-pdf": lazy(() => import("./tools/AssinarPDF").then(m => ({ default: m.AssinarPDF }))),
  "preencher-formulario-pdf": lazy(() => import("./tools/PreencherFormularioPDF").then(m => ({ default: m.PreencherFormularioPDF }))),
  "editar-pdf": lazy(() => import("./tools/EditarPDFBasico").then(m => ({ default: m.EditarPDFBasico }))),
  "heic-para-jpg": lazy(() => import("./tools/HEICParaJPG").then(m => ({ default: m.HEICParaJPG }))),
  "heic-para-pdf": lazy(() => import("./tools/HEICParaPDF").then(m => ({ default: m.HEICParaPDF }))),
  "ocr-pdf": lazy(() => import("./tools/OCRPdf").then(m => ({ default: m.OCRPdf }))),
  "html-para-markdown": lazy(() => import("./tools/HTMLParaMarkdown").then(m => ({ default: m.HTMLParaMarkdown }))),
  "docx-para-markdown": lazy(() => import("./tools/DOCXParaMarkdown").then(m => ({ default: m.DOCXParaMarkdown }))),
  "pdf-para-markdown": lazy(() => import("./tools/PDFParaMarkdown").then(m => ({ default: m.PDFParaMarkdown }))),
  "calculadora-tokens-ia": lazy(() => import("./tools/CalculadoraTokensIA").then(m => ({ default: m.CalculadoraTokensIA }))),
  "gerador-ideias-escrita": lazy(() => import("./tools/GeradorIdeiasEscrita").then(m => ({ default: m.GeradorIdeiasEscrita }))),
  "calculadora-velocidade-leitura": lazy(() => import("./tools/CalculadoraVelocidadeLeitura").then(m => ({ default: m.CalculadoraVelocidadeLeitura }))),
  "gerador-lista-bagagem": lazy(() => import("./tools/GeradorListaBagagem").then(m => ({ default: m.GeradorListaBagagem }))),
  "gerador-nome-projeto": lazy(() => import("./tools/GeradorNomeProjeto").then(m => ({ default: m.GeradorNomeProjeto }))),
  "pegada-carbono-viagem": lazy(() => import("./tools/PegadaCarbonoViagem").then(m => ({ default: m.PegadaCarbonoViagem }))),
  "calculadora-iluminacao": lazy(() => import("./tools/CalculadoraIluminacao").then(m => ({ default: m.CalculadoraIluminacao }))),
  "calculadora-tamanho-tapete": lazy(() => import("./tools/CalculadoraTamanhoTapete").then(m => ({ default: m.CalculadoraTamanhoTapete }))),
  "rega-plantas": lazy(() => import("./tools/RegaPlantas").then(m => ({ default: m.RegaPlantas }))),
  "planejador-fuso-horario": lazy(() => import("./tools/PlanejadorFusoHorario").then(m => ({ default: m.PlanejadorFusoHorario }))),
  "zpl-para-pdf": lazy(() => import("./tools/ZPLParaPDF").then(m => ({ default: m.ZPLParaPDF }))),
};

const CATEGORY_COLORS: Record<string, string> = {
  Transportes: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  Saúde: "text-pink-400 bg-pink-400/10 border-pink-400/20",
  Finanças: "text-green-400 bg-green-400/10 border-green-400/20",
  Esportes: "text-orange-400 bg-orange-400/10 border-orange-400/20",
  Estudos: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  Utilidades: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  "DP/RH": "text-amber-400 bg-amber-400/10 border-amber-400/20",
  "Redes Sociais": "text-rose-400 bg-rose-400/10 border-rose-400/20",
  Religioso: "text-violet-400 bg-violet-400/10 border-violet-400/20",
  Astrologia: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
  "Livros e Leitura": "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  "Família e Bebês": "text-pink-400 bg-pink-400/10 border-pink-400/20",
  "Pet": "text-teal-400 bg-teal-400/10 border-teal-400/20",
  "PDF e Documentos": "text-red-400 bg-red-400/10 border-red-400/20",
  "Ferramentas Dev": "text-lime-400 bg-lime-400/10 border-lime-400/20",
  "Imagem e Design": "text-fuchsia-400 bg-fuchsia-400/10 border-fuchsia-400/20",
};

const FEATURED_SLUGS = [
  "alcool-gasolina",
  "imc-avancada",
  "juros-compostos",
  "gerador-qr-code",
  "dias-vida",
  "calculadora-churrasco",
];

function ToolLoadingFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-green-400/30 border-t-green-400 rounded-full animate-spin" />
        <p className="text-sm text-gray-500">Carregando ferramenta...</p>
      </div>
    </div>
  );
}

function CategoryFilter({ activeCategory, onSelectCategory }: {
  activeCategory: Category;
  onSelectCategory: (c: Category) => void;
}) {
  return (
    <nav
      className="border-b border-white/5 bg-bg/80 backdrop-blur-sm"
      style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
      aria-label="Filtrar por categoria"
    >
      <div className="flex gap-2 px-4 py-3 max-w-screen-xl mx-auto" style={{ minWidth: 'max-content' }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            onTouchEnd={(e) => { e.preventDefault(); if (wasScrolling()) return; onSelectCategory(cat); }}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all whitespace-nowrap min-h-[40px] ${
              activeCategory === cat
                ? "text-black border-transparent shadow-glow-green font-semibold"
                : "bg-white/5 text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
            }`}
            style={activeCategory === cat ? { background: 'var(--gradient-primary)', WebkitTapHighlightColor: 'transparent' } : { WebkitTapHighlightColor: 'transparent' }}
          >
            {cat}
          </button>
        ))}
      </div>
    </nav>
  );
}

function FeaturedTools({ onSelectTool }: { onSelectTool: (slug: string) => void }) {
  const featured = FEATURED_SLUGS.map((slug) => TOOLS.find((t) => t.slug === slug)).filter(Boolean) as typeof TOOLS;
  return (
    <section className="max-w-4xl mx-auto px-4 pt-10 pb-2">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-base">⚡</span>
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Mais usadas agora</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {featured.map((tool, i) => (
          <button
            key={tool.id}
            onClick={() => onSelectTool(tool.slug)}
            onTouchEnd={(e) => { e.preventDefault(); if (wasScrolling()) return; onSelectTool(tool.slug); }}
            className="card-hover-effect group text-left p-4 rounded-2xl bg-card border border-white/5 hover:border-green-400/30 animate-fade-in-up"
            style={{ WebkitTapHighlightColor: 'transparent', animationDelay: `${i * 60}ms` }}
          >
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-3 transition-transform group-hover:scale-110" style={{ background: 'rgba(0,200,83,0.12)' }}>
              {tool.emoji}
            </div>
            <p className="text-sm font-semibold text-white leading-tight">{tool.name}</p>
            <p className="text-xs text-gray-500 mt-1 line-clamp-1">{tool.description}</p>
          </button>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("Todas");
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [cafeOpen, setCafeOpen] = useState(false);
  const [activeCategoryPage, setActiveCategoryPage] = useState<string | null>(null);
  const [activeGuide, setActiveGuide] = useState<string | null>(null);
  const [lang, setLang] = useState<"pt" | "en">("pt");
  const [initialName, setInitialName] = useState<string | undefined>(undefined);
  const [showAllTools, setShowAllTools] = useState(false);

  // Restore state from URL on mount (F5 / direct access)
  useEffect(() => {
    const path = window.location.pathname.replace(/^\//, "").replace(/\/$/, "");
    if (!path) return;
    if (path.startsWith("en/")) {
      const enSlug = path.replace("en/", "");
      const ptSlug = enSlugToPtSlug[enSlug];
      if (ptSlug && TOOL_COMPONENTS[ptSlug]) {
        setLang("en");
        setActiveTool(ptSlug);
      }
      return;
    }
    if (path.startsWith("significado-nome/")) {
      const slug = path.replace("significado-nome/", "");
      const nameFromSlug = slug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      setInitialName(nameFromSlug);
      setActiveTool("significado-nomes");
      return;
    }
    if (STATIC_PAGES[path]) {
      setActiveCategoryPage(path);
    } else if (path.startsWith("guia/")) {
      const slug = path.replace("guia/", "");
      if (GUIDES.find((g) => g.slug === slug)) setActiveGuide(slug);
    } else if (path.startsWith("categoria/")) {
      const slug = path.replace("categoria/", "");
      if (CATEGORY_SEO_DATA[slug]) setActiveCategoryPage(slug);
    } else if (TOOL_COMPONENTS[path]) {
      setActiveTool(path);
    }
  }, []);

  // Sync URL when navigation state changes
  useEffect(() => {
    let url = "/";
    if (activeTool) {
      if (lang === "en" && ptSlugToEnSlug[activeTool]) {
        url = `/en/${ptSlugToEnSlug[activeTool]}`;
      } else {
        url = `/${activeTool}`;
      }
    } else if (activeGuide) {
      url = `/guia/${activeGuide}`;
    } else if (activeCategoryPage) {
      if (STATIC_PAGES[activeCategoryPage]) {
        url = `/${activeCategoryPage}`;
      } else {
        url = `/categoria/${activeCategoryPage}`;
      }
    }
    if (url !== window.location.pathname) {
      window.history.pushState({ url }, "", url);
    }
  }, [activeTool, activeGuide, activeCategoryPage, lang]);

  // Handle browser back/forward
  useEffect(() => {
    const onPopState = () => {
      const path = window.location.pathname.replace(/^\//, "").replace(/\/$/, "");
      if (path.startsWith("en/")) {
        const enSlug = path.replace("en/", "");
        const ptSlug = enSlugToPtSlug[enSlug];
        if (ptSlug && TOOL_COMPONENTS[ptSlug]) {
          setLang("en");
          setActiveTool(ptSlug);
          setActiveCategoryPage(null);
          return;
        }
      }
      setLang("pt");
      if (!path) {
        setActiveTool(null);
        setActiveCategoryPage(null);
        setActiveGuide(null);
        setInitialName(undefined);
      } else if (path.startsWith("significado-nome/")) {
        const slug = path.replace("significado-nome/", "");
        const nameFromSlug = slug
          .split("-")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ");
        setInitialName(nameFromSlug);
        setActiveTool("significado-nomes");
        setActiveCategoryPage(null);
        setActiveGuide(null);
      } else if (path.startsWith("guia/")) {
        const slug = path.replace("guia/", "");
        if (GUIDES.find((g) => g.slug === slug)) {
          setActiveGuide(slug);
          setActiveTool(null);
          setActiveCategoryPage(null);
        }
        setInitialName(undefined);
      } else if (STATIC_PAGES[path]) {
        setActiveCategoryPage(path);
        setActiveTool(null);
        setActiveGuide(null);
        setInitialName(undefined);
      } else if (path.startsWith("categoria/")) {
        const slug = path.replace("categoria/", "");
        if (CATEGORY_SEO_DATA[slug]) {
          setActiveCategoryPage(slug);
          setActiveTool(null);
          setActiveGuide(null);
        }
        setInitialName(undefined);
      } else if (TOOL_COMPONENTS[path]) {
        setActiveTool(path);
        setActiveCategoryPage(null);
        setActiveGuide(null);
        setInitialName(undefined);
      } else {
        setActiveTool(null);
        setActiveCategoryPage(null);
        setActiveGuide(null);
        setInitialName(undefined);
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigateToCategory = useCallback((slug: string) => {
    setActiveCategoryPage(slug);
    setActiveTool(null);
    setActiveGuide(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const navigateToTool = useCallback((slug: string) => {
    setActiveTool(slug);
    setActiveCategoryPage(null);
    setActiveGuide(null);
    setInitialName(undefined);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const navigateToGuide = useCallback((slug: string) => {
    setActiveGuide(slug);
    setActiveCategoryPage(null);
    setActiveTool(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  useEffect(() => {
    setShowAllTools(false);
  }, [activeCategory, search]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTool, activeCategoryPage, activeGuide]);

  const filtered = useMemo(() => {
    return TOOLS.filter((t) => {
      const matchCat = activeCategory === "Todas" || t.category === activeCategory;
      const q = search.toLowerCase();
      const matchSearch = !q || t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  const isBrowsingAll = activeCategory === "Todas" && !search;
  const INITIAL_VISIBLE = 20;
  const visibleTools = isBrowsingAll && !showAllTools ? filtered.slice(0, INITIAL_VISIBLE) : filtered;

  if (activeGuide) {
    const guide = GUIDES.find((g) => g.slug === activeGuide);
    if (guide) {
      return (
        <NavigationContext.Provider value={{ onSelectCategory: navigateToCategory, onSelectTool: navigateToTool, onSelectGuide: navigateToGuide, lang }}>
        <div className={theme === "light" ? "light" : ""}>
          <Header
            theme={theme}
            onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            search={search}
            onSearchChange={setSearch}
            onLogoClick={() => { setActiveGuide(null); setActiveCategoryPage(null); setActiveTool(null); }}
            lang={lang}
            onToggleLang={() => setLang(lang === "en" ? "pt" : "en")}
          />
          <GuiaArticlePage guide={guide} onBack={() => { setActiveGuide(null); setActiveCategoryPage("guias"); }} />
          <CookieBanner />
          <CafeButton externalOpen={cafeOpen} onExternalClose={() => setCafeOpen(false)} />
        </div>
        </NavigationContext.Provider>
      );
    }
  }

  if (activeCategoryPage && STATIC_PAGES[activeCategoryPage]) {
    const StaticComponent = STATIC_PAGES[activeCategoryPage];
    return (
      <NavigationContext.Provider value={{ onSelectCategory: navigateToCategory, onSelectTool: navigateToTool, onSelectGuide: navigateToGuide, lang }}>
      <div className={theme === "light" ? "light" : ""}>
        <Header
          theme={theme}
          onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          search={search}
          onSearchChange={setSearch}
            onLogoClick={() => { setActiveCategoryPage(null); setActiveTool(null); setActiveGuide(null); }}
          lang={lang}
          onToggleLang={() => setLang(lang === "en" ? "pt" : "en")}
        />
        <StaticComponent onBack={() => setActiveCategoryPage(null)} />
        <CookieBanner />
        <CafeButton externalOpen={cafeOpen} onExternalClose={() => setCafeOpen(false)} />
      </div>
      </NavigationContext.Provider>
    );
  }

  if (activeCategoryPage) {
    return (
      <div className={theme === "light" ? "light" : ""}>
        <Header
          theme={theme}
          onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          search={search}
          onSearchChange={setSearch}
          onLogoClick={() => { setActiveCategoryPage(null); setActiveTool(null); setActiveGuide(null); }}
          lang={lang}
          onToggleLang={() => setLang(lang === "en" ? "pt" : "en")}
        />
        <CategoryPage
          slug={activeCategoryPage}
          onBack={() => setActiveCategoryPage(null)}
          onSelectTool={navigateToTool}
          onSelectCategory={(cat) => { setActiveCategoryPage(null); setActiveCategory(cat as Category); }}
        />
        <CookieBanner />
        <CafeButton externalOpen={cafeOpen} onExternalClose={() => setCafeOpen(false)} />
      </div>
    );
  }

  if (activeTool) {
    const ToolComponent = TOOL_COMPONENTS[activeTool];
    if (ToolComponent) {
      return (
        <NavigationContext.Provider value={{ onSelectCategory: navigateToCategory, onSelectTool: navigateToTool, onSelectGuide: navigateToGuide, lang }}>
        <div className={theme === "light" ? "light" : ""}>
          <Header
            theme={theme}
            onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            search={search}
            onSearchChange={setSearch}
            onLogoClick={() => { setActiveTool(null); setActiveCategoryPage(null); setActiveGuide(null); }}
            lang={lang}
            onToggleLang={() => setLang(lang === "en" ? "pt" : "en")}
          />
          <Suspense fallback={<ToolLoadingFallback />}>
            <ToolComponent onBack={() => { setActiveTool(null); setInitialName(undefined); }} initialName={activeTool === "significado-nomes" ? initialName : undefined} />
          </Suspense>
          <CookieBanner />
        </div>
        </NavigationContext.Provider>
      );
    }
  }

  return (
    <NavigationContext.Provider value={{ onSelectCategory: navigateToCategory, onSelectTool: navigateToTool, onSelectGuide: navigateToGuide, lang }}>
    <div className={theme === "light" ? "light" : ""}>
      <Header
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        search={search}
        onSearchChange={setSearch}
        onLogoClick={() => { setActiveTool(null); setActiveGuide(null); }}
        lang={lang}
        onToggleLang={() => setLang(lang === "en" ? "pt" : "en")}
      />

      <SEOHead
        schema={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "CLICAresolve",
          url: "https://www.clicaresolve.com.br",
          description: "84 ferramentas gratuitas para o seu dia a dia — sem cadastro, sem complicação.",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://www.clicaresolve.com.br/?search={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }}
      />

      <main className="min-h-screen bg-bg text-text pt-16" style={{ WebkitOverflowScrolling: 'touch' }}>
        <section className="relative text-center py-24 px-4 border-b border-white/5 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,200,83,0.15), transparent), radial-gradient(ellipse 40% 40% at 80% 20%, rgba(56,189,248,0.10), transparent), radial-gradient(ellipse 30% 30% at 20% 30%, rgba(251,191,36,0.08), transparent)',
            }}
          />
          <div className="relative max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-400/10 border border-green-400/20 mb-6 animate-fade-in-up">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-medium text-green-400">{TOOLS.length} ferramentas gratuitas</span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-extrabold mb-4 leading-tight tracking-tight animate-fade-in-up" style={{ animationDelay: '80ms' }}>
              <span className="text-white">Clicou, </span>
              <span className="text-gradient-primary animate-shimmer" style={{ backgroundImage: 'linear-gradient(90deg, #00c853, #38bdf8, #fbbf24, #00c853)' }}>Resolveu.</span>
            </h1>
            <p className="text-gray-400 text-base sm:text-lg mb-8 font-normal animate-fade-in-up" style={{ animationDelay: '160ms' }}>
              Ferramentas gratuitas para o seu dia a dia — sem cadastro, sem complicação.
            </p>
            <button
              onClick={() => document.getElementById('ferramentas')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary inline-flex items-center gap-2 rounded-xl shadow-glow-green animate-fade-in-up animate-pulse-glow" style={{ animationDelay: '240ms' }}
            >
              Explorar ferramentas →
            </button>
          </div>
        </section>

        <CategoryFilter activeCategory={activeCategory} onSelectCategory={setActiveCategory} />

        <FeaturedTools onSelectTool={navigateToTool} />

        {/* Explore por Categoria (movida para cima, antes do grid completo) */}
        <section className="max-w-screen-2xl mx-auto px-4 py-12 border-t border-white/5">
          <h2 className="text-xl font-bold text-white mb-2 text-center">
            Explore por Categoria
          </h2>
          <p className="text-sm text-gray-500 text-center mb-8">
            Navegue direto para o grupo de ferramentas que você precisa
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {Object.values(CATEGORY_SEO_DATA).map((cat, i) => {
              const count = TOOLS.filter((t) => {
                const map: Record<string, string[]> = {
                  "Casa": ["Casa", "Calculadoras"],
                  "Saúde": ["Saúde"],
                  "Finanças": ["Finanças"],
                  "Esportes": ["Esportes", "Sorte"],
                  "Educação": ["Educação", "Produtividade"],
                  "Utilidades": ["Utilidades"],
                  "DP/RH": ["DP/RH"],
                  "Redes Sociais": ["Redes Sociais"],
                  "Religioso": ["Religioso"],
                  "Astrologia": ["Astrologia"],
                  "Livros e Leitura": ["Livros e Leitura"],
                  "Família e Bebês": ["Família e Bebês"],
                  "Pet": ["Pet"],
                  "Lazer": ["Lazer"],
                  "Produtividade": ["Produtividade", "Educação"],
                  "Culinária": ["Culinária"],
                };
                const cats = map[cat.categoryFilter] || [cat.categoryFilter];
                return cats.includes(t.category);
              }).length;
              return (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategoryPage(cat.slug)}
                  className="group text-left p-5 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 hover:border-green-400/40 hover:from-green-400/10 transition-all duration-200 hover:-translate-y-0.5 animate-fade-in-up"
                  style={{ animationDelay: `${Math.min(i * 40, 500)}ms` }}
                >
                  <div className="text-3xl mb-2 transition-transform group-hover:scale-110">{cat.emoji}</div>
                  <h3 className="text-sm font-bold text-white mb-1">{cat.categoryName}</h3>
                  <p className="text-xs text-gray-500">{count} ferramentas</p>
                  <div className="mt-2 flex items-center gap-1 text-xs text-green-400 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1">
                    <span>Explorar</span>
                    <span>→</span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <div className="max-w-screen-2xl mx-auto px-4 pt-4">
          <h2 className="text-xl font-bold text-white border-t border-white/5 pt-8">
            {isBrowsingAll ? "Todas as Ferramentas" : "Resultados"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {filtered.length} ferramentas disponíveis
          </p>
        </div>

        <section id="ferramentas" className="max-w-screen-2xl mx-auto px-4 py-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-lg">Nenhuma ferramenta encontrada.</p>
              <button
                onClick={() => { setSearch(""); setActiveCategory("Todas"); }}
                className="mt-4 text-green-400 hover:text-green-300 text-sm"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {visibleTools.map((tool, i) => {
                const catColor = CATEGORY_COLORS[tool.category] || "text-gray-400 bg-gray-400/10 border-gray-400/20";
                return (
                  <button
                    key={tool.id}
                    onClick={() => navigateToTool(tool.slug)}
                    onTouchEnd={(e) => { e.preventDefault(); if (wasScrolling()) return; navigateToTool(tool.slug); }}
                    className="group relative text-left p-5 rounded-2xl bg-card border border-white/5 hover:border-green-400/30 hover:bg-green-400/5 transition-all duration-[200ms] ease-out hover:-translate-y-[3px] hover:shadow-xl hover:shadow-green-400/[0.15] animate-fade-in-up"
                    style={{ WebkitTapHighlightColor: 'transparent', animationDelay: `${Math.min(i * 30, 600)}ms` }}
                  >
                    <span className="absolute top-3 right-3 text-xs text-gray-600 font-mono opacity-50 group-hover:opacity-0 transition-opacity">
                      #{String(tool.id).padStart(2, "0")}
                    </span>
                    <div className="text-3xl mb-3 transition-transform group-hover:scale-110 group-hover:-rotate-3">{tool.emoji}</div>
                    <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full border mb-2 ${catColor}`}>
                      {tool.category}
                    </span>
                    <h2 className="text-sm font-bold text-white mb-1 leading-tight">{tool.name}</h2>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{tool.description}</p>
                    <div className="mt-3 flex items-center gap-1 text-xs text-green-400 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1">
                      <span>Abrir</span>
                      <span>→</span>
                    </div>
                  </button>
                );
              })}
            </div>
            {isBrowsingAll && !showAllTools && filtered.length > INITIAL_VISIBLE && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setShowAllTools(true)}
                  className="px-6 py-3 rounded-xl border border-white/10 text-sm font-semibold text-gray-300 hover:text-white hover:border-green-400/40 hover:bg-green-400/5 transition-all"
                >
                  Ver todas as {filtered.length} ferramentas →
                </button>
              </div>
            )}
            </>
          )}
        </section>

<Footer onNavigate={navigateToCategory} cafeOpen={cafeOpen} setCafeOpen={setCafeOpen} />      </main>
      <CookieBanner />
      <CafeButton externalOpen={cafeOpen} onExternalClose={() => setCafeOpen(false)} />
    </div>
    </NavigationContext.Provider>
  );
}

function Footer({ onNavigate, cafeOpen, setCafeOpen }: { onNavigate: (page: string) => void; cafeOpen: boolean; setCafeOpen: (v: boolean) => void }) {
  return (
    <footer className="border-t border-white/5 bg-bg">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-8">
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 2L6 14L9.5 11L12 17L14 16L11.5 10L16 10L6 2Z" fill="#00c853"/></svg>
              <span className="text-sm font-bold leading-none"><span className="text-white">CLICA</span><span className="text-green-400">resolve</span></span>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              84 ferramentas gratuitas para o dia a dia — sem cadastro, sem complicação.
            </p>
          </div>
          <div>
            <p className="text-sm font-bold text-white mb-3">Páginas</p>
            <div className="space-y-2">
              {[
                { label: "Guias", slug: "guias" },
                { label: "Sobre", slug: "sobre" },
                { label: "Metodologia", slug: "metodologia" },
                { label: "Contato", slug: "contato" },
              ].map((l) => (
                <button
                  key={l.slug}
                  onClick={() => onNavigate(l.slug)}
                  className="block text-xs text-gray-400 hover:text-green-400 transition-colors text-left"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-bold text-white mb-3">Legal</p>
            <div className="space-y-2">
              {[
                { label: "Política de Privacidade", slug: "privacidade" },
                { label: "Termos de Uso", slug: "termos" },
              ].map((l) => (
                <button
                  key={l.slug}
                  onClick={() => onNavigate(l.slug)}
                  className="block text-xs text-gray-400 hover:text-green-400 transition-colors text-left"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center border-t border-white/5 pt-6">
          <p className="text-xs text-gray-600">
            CLICAresolve © {new Date().getFullYear()} — Ferramentas gratuitas, precisas e baseadas em metodologias reconhecidas
          </p>
          <CafeFooterLink onOpen={() => setCafeOpen(true)} />
        </div>
      </div>
    </footer>
  );
}
