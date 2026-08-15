import React, { useState, useEffect, useMemo, useCallback, useRef, Suspense } from "react";
import { Header } from "./components/Header";
import { SEOHead } from "./components/SEOHead";
import { CategoryPage } from "./components/CategoryPage";
import { CookieBanner } from "./components/CookieBanner";
import { NavigationContext } from "./context/NavigationContext";
import { wasScrolling } from "./utils/touchHandler";
import { TOOLS, CATEGORIES, Category } from "./data/tools";
import { CATEGORY_SEO_DATA } from "./data/seoData";
const AlcoolGasolina = React.lazy(() => import("./tools/AlcoolGasolina").then(m => ({ default: m.AlcoolGasolina })));
const DivisorCarona = React.lazy(() => import("./tools/DivisorCarona").then(m => ({ default: m.DivisorCarona })));
const ConsumoEnergia = React.lazy(() => import("./tools/ConsumoEnergia").then(m => ({ default: m.ConsumoEnergia })));
const CalculadoraTinta = React.lazy(() => import("./tools/CalculadoraTinta").then(m => ({ default: m.CalculadoraTinta })));
const CalculadoraBTU = React.lazy(() => import("./tools/CalculadoraBTU").then(m => ({ default: m.CalculadoraBTU })));
const LimpezaZonas = React.lazy(() => import("./tools/LimpezaZonas").then(m => ({ default: m.LimpezaZonas })));
const MetrosQuadrados = React.lazy(() => import("./tools/MetrosQuadrados").then(m => ({ default: m.MetrosQuadrados })));
const DepreciacaoVeiculo = React.lazy(() => import("./tools/DepreciacaoVeiculo").then(m => ({ default: m.DepreciacaoVeiculo })));
const ParcelamentoMultas = React.lazy(() => import("./tools/ParcelamentoMultas").then(m => ({ default: m.ParcelamentoMultas })));
const IMCAvancada = React.lazy(() => import("./tools/IMCAvancada").then(m => ({ default: m.IMCAvancada })));
const PeriodoFertil = React.lazy(() => import("./tools/PeriodoFertil").then(m => ({ default: m.PeriodoFertil })));
const DPP = React.lazy(() => import("./tools/DPP").then(m => ({ default: m.DPP })));
const Contracoes = React.lazy(() => import("./tools/Contracoes").then(m => ({ default: m.Contracoes })));
const GastoCalórico = React.lazy(() => import("./tools/GastoCalorico").then(m => ({ default: m.GastoCalórico })));
const CiclosSono = React.lazy(() => import("./tools/CiclosSono").then(m => ({ default: m.CiclosSono })));
const FrequenciaCardiaca = React.lazy(() => import("./tools/FrequenciaCardiaca").then(m => ({ default: m.FrequenciaCardiaca })));
const LimiteCafeina = React.lazy(() => import("./tools/LimiteCafeina").then(m => ({ default: m.LimiteCafeina })));
const Macronutrientes = React.lazy(() => import("./tools/Macronutrientes").then(m => ({ default: m.Macronutrientes })));
const AlertaAgua = React.lazy(() => import("./tools/AlertaAgua").then(m => ({ default: m.AlertaAgua })));
const Roteirizador = React.lazy(() => import("./tools/Roteirizador").then(m => ({ default: m.Roteirizador })));
const PlacarPoliesportivo = React.lazy(() => import("./tools/PlacarPoliesportivo").then(m => ({ default: m.PlacarPoliesportivo })));
const SorteadorEquipes = React.lazy(() => import("./tools/SorteadorEquipes").then(m => ({ default: m.SorteadorEquipes })));
const GeradorBolao = React.lazy(() => import("./tools/GeradorBolao").then(m => ({ default: m.GeradorBolao })));
const OndeAssistir = React.lazy(() => import("./tools/OndeAssistir").then(m => ({ default: m.OndeAssistir })));
const ProbabilidadesClassificacao = React.lazy(() => import("./tools/ProbabilidadesClassificacao").then(m => ({ default: m.ProbabilidadesClassificacao })));
const PalpitesLoteria = React.lazy(() => import("./tools/PalpitesLoteria").then(m => ({ default: m.PalpitesLoteria })));
const PainelBingo = React.lazy(() => import("./tools/PainelBingo").then(m => ({ default: m.PainelBingo })));
const ComparadorPreco = React.lazy(() => import("./tools/ComparadorPreco").then(m => ({ default: m.ComparadorPreco })));
const JurosCompostos = React.lazy(() => import("./tools/JurosCompostos").then(m => ({ default: m.JurosCompostos })));
const CalculadoraDesconto = React.lazy(() => import("./tools/CalculadoraDesconto").then(m => ({ default: m.CalculadoraDesconto })));
const TaxasMaquininha = React.lazy(() => import("./tools/TaxasMaquininha").then(m => ({ default: m.TaxasMaquininha })));
const ConversorCozinha = React.lazy(() => import("./tools/ConversorCozinha").then(m => ({ default: m.ConversorCozinha })));
const ConversorRoupas = React.lazy(() => import("./tools/ConversorRoupas").then(m => ({ default: m.ConversorRoupas })));
const SalarioHora = React.lazy(() => import("./tools/SalarioHora").then(m => ({ default: m.SalarioHora })));
const PontoEquilibrio = React.lazy(() => import("./tools/PontoEquilibrio").then(m => ({ default: m.PontoEquilibrio })));
const SimuladorMarkup = React.lazy(() => import("./tools/SimuladorMarkup").then(m => ({ default: m.SimuladorMarkup })));
const ConversorMoedas = React.lazy(() => import("./tools/ConversorMoedas").then(m => ({ default: m.ConversorMoedas })));
const CicloEstudos = React.lazy(() => import("./tools/CicloEstudos").then(m => ({ default: m.CicloEstudos })));
const CalculadoraEdital = React.lazy(() => import("./tools/CalculadoraEdital").then(m => ({ default: m.CalculadoraEdital })));
const MapeamentoErros = React.lazy(() => import("./tools/MapeamentoErros").then(m => ({ default: m.MapeamentoErros })));
const ContadorCaracteres = React.lazy(() => import("./tools/ContadorCaracteres").then(m => ({ default: m.ContadorCaracteres })));
const SimuladorSISU = React.lazy(() => import("./tools/SimuladorSISU").then(m => ({ default: m.SimuladorSISU })));
const Pomodoro = React.lazy(() => import("./tools/Pomodoro").then(m => ({ default: m.Pomodoro })));
const VelocidadeDigitacao = React.lazy(() => import("./tools/VelocidadeDigitacao").then(m => ({ default: m.VelocidadeDigitacao })));
const TaxaEngajamento = React.lazy(() => import("./tools/TaxaEngajamento").then(m => ({ default: m.TaxaEngajamento })));
const FormatadorLegendas = React.lazy(() => import("./tools/FormatadorLegendas").then(m => ({ default: m.FormatadorLegendas })));
const RoteiroJudaismo = React.lazy(() => import("./tools/RoteiroJudaismo").then(m => ({ default: m.RoteiroJudaismo })));
const PlanoLeituraBiblica = React.lazy(() => import("./tools/PlanoLeituraBiblica").then(m => ({ default: m.PlanoLeituraBiblica })));
const CronologiaBiblica = React.lazy(() => import("./tools/CronologiaBiblica").then(m => ({ default: m.CronologiaBiblica })));
const CalendarioHebraico = React.lazy(() => import("./tools/CalendarioHebraico").then(m => ({ default: m.CalendarioHebraico })));
const FichamentoSOAP = React.lazy(() => import("./tools/FichamentoSOAP").then(m => ({ default: m.FichamentoSOAP })));
const CalendarioFeriados = React.lazy(() => import("./tools/CalendarioFeriados").then(m => ({ default: m.CalendarioFeriados })));
const DiferencaDatas = React.lazy(() => import("./tools/DiferencaDatas").then(m => ({ default: m.DiferencaDatas })));
const AcumuladorHoras = React.lazy(() => import("./tools/AcumuladorHoras").then(m => ({ default: m.AcumuladorHoras })));
const HorasDecimais = React.lazy(() => import("./tools/HorasDecimais").then(m => ({ default: m.HorasDecimais })));
const DiasVida = React.lazy(() => import("./tools/DiasVida").then(m => ({ default: m.DiasVida })));
const GeradorQRCode = React.lazy(() => import("./tools/GeradorQRCode").then(m => ({ default: m.GeradorQRCode })));
const GeradorSenhas = React.lazy(() => import("./tools/GeradorSenhas").then(m => ({ default: m.GeradorSenhas })));
const OrganizadorListas = React.lazy(() => import("./tools/OrganizadorListas").then(m => ({ default: m.OrganizadorListas })));
const PorcentagemReversa = React.lazy(() => import("./tools/PorcentagemReversa").then(m => ({ default: m.PorcentagemReversa })));
const CustoNailDesigner = React.lazy(() => import("./tools/CustoNailDesigner").then(m => ({ default: m.CustoNailDesigner })));
const AgendaUnhas = React.lazy(() => import("./tools/AgendaUnhas").then(m => ({ default: m.AgendaUnhas })));
const CronogramaCapilar = React.lazy(() => import("./tools/CronogramaCapilar").then(m => ({ default: m.CronogramaCapilar })));
const TarefasInfantil = React.lazy(() => import("./tools/TarefasInfantil").then(m => ({ default: m.TarefasInfantil })));
const ConversorDPI = React.lazy(() => import("./tools/ConversorDPI").then(m => ({ default: m.ConversorDPI })));
const BacklogGamer = React.lazy(() => import("./tools/BacklogGamer").then(m => ({ default: m.BacklogGamer })));
const GeradorNicks = React.lazy(() => import("./tools/GeradorNicks").then(m => ({ default: m.GeradorNicks })));
const SpawnTimer = React.lazy(() => import("./tools/SpawnTimer").then(m => ({ default: m.SpawnTimer })));
const ConversorProporcao = React.lazy(() => import("./tools/ConversorProporcao").then(m => ({ default: m.ConversorProporcao })));
const PaletaCores = React.lazy(() => import("./tools/PaletaCores").then(m => ({ default: m.PaletaCores })));
const DescobridorAnagramas = React.lazy(() => import("./tools/DescobridorAnagramas").then(m => ({ default: m.DescobridorAnagramas })));
const CalculadoraChurrasco = React.lazy(() => import("./tools/CalculadoraChurrasco").then(m => ({ default: m.CalculadoraChurrasco })));
const GeradorLinkWhatsApp = React.lazy(() => import("./tools/GeradorLinkWhatsApp").then(m => ({ default: m.GeradorLinkWhatsApp })));
const FormatadorTexto = React.lazy(() => import("./tools/FormatadorTexto").then(m => ({ default: m.FormatadorTexto })));
const GeradorRecibo = React.lazy(() => import("./tools/GeradorRecibo").then(m => ({ default: m.GeradorRecibo })));
const DescobridorSigno = React.lazy(() => import("./tools/DescobridorSigno").then(m => ({ default: m.DescobridorSigno })));
const CompatibilidadeSignos = React.lazy(() => import("./tools/CompatibilidadeSignos").then(m => ({ default: m.CompatibilidadeSignos })));
const MapaNumerologico = React.lazy(() => import("./tools/MapaNumerologico").then(m => ({ default: m.MapaNumerologico })));
const SugestorLivros = React.lazy(() => import("./tools/SugestorLivros").then(m => ({ default: m.SugestorLivros })));
const SignificadoNomes = React.lazy(() => import("./tools/SignificadoNomes").then(m => ({ default: m.SignificadoNomes })));
const IdadePet = React.lazy(() => import("./tools/IdadePet").then(m => ({ default: m.IdadePet })));
const ConsumoRacao = React.lazy(() => import("./tools/ConsumoRacao").then(m => ({ default: m.ConsumoRacao })));
const NomesPets = React.lazy(() => import("./tools/NomesPets").then(m => ({ default: m.NomesPets })));
const VacinasPet = React.lazy(() => import("./tools/VacinasPet").then(m => ({ default: m.VacinasPet })));
const EconomiaEnergiaSolar = React.lazy(() => import("./tools/EconomiaEnergiaSolar").then(m => ({ default: m.EconomiaEnergiaSolar })));
const FormatadorJSON = React.lazy(() => import("./tools/FormatadorJSON").then(m => ({ default: m.FormatadorJSON })));
const GeradorUUID = React.lazy(() => import("./tools/GeradorUUID").then(m => ({ default: m.GeradorUUID })));
const CodificadorBase64 = React.lazy(() => import("./tools/CodificadorBase64").then(m => ({ default: m.CodificadorBase64 })));
const ValidadorCPFCNPJ = React.lazy(() => import("./tools/ValidadorCPFCNPJ").then(m => ({ default: m.ValidadorCPFCNPJ })));
const RemovedorAcentos = React.lazy(() => import("./tools/RemovedorAcentos").then(m => ({ default: m.RemovedorAcentos })));
const SimuladorFinanciamento = React.lazy(() => import("./tools/SimuladorFinanciamento").then(m => ({ default: m.SimuladorFinanciamento })));
const CompressorImagem = React.lazy(() => import("./tools/CompressorImagem").then(m => ({ default: m.CompressorImagem })));
const RedimensionadorImagem = React.lazy(() => import("./tools/RedimensionadorImagem").then(m => ({ default: m.RedimensionadorImagem })));
const TestadorRegex = React.lazy(() => import("./tools/TestadorRegex").then(m => ({ default: m.TestadorRegex })));
const GeradorHash = React.lazy(() => import("./tools/GeradorHash").then(m => ({ default: m.GeradorHash })));
const CodificadorURL = React.lazy(() => import("./tools/CodificadorURL").then(m => ({ default: m.CodificadorURL })));
const ConversorCSVExcel = React.lazy(() => import("./tools/ConversorCSVExcel").then(m => ({ default: m.ConversorCSVExcel })));
const ConversorJSONCSV = React.lazy(() => import("./tools/ConversorJSONCSV").then(m => ({ default: m.ConversorJSONCSV })));
const CalculadoraGorjeta = React.lazy(() => import("./tools/CalculadoraGorjeta").then(m => ({ default: m.CalculadoraGorjeta })));
const CalculadoraRegraTres = React.lazy(() => import("./tools/CalculadoraRegraTres").then(m => ({ default: m.CalculadoraRegraTres })));
const SeletorCores = React.lazy(() => import("./tools/SeletorCores").then(m => ({ default: m.SeletorCores })));
const ContadorTempoDecorrido = React.lazy(() => import("./tools/ContadorTempoDecorrido").then(m => ({ default: m.ContadorTempoDecorrido })));
const GeradorSilabasRimas = React.lazy(() => import("./tools/GeradorSilabasRimas").then(m => ({ default: m.GeradorSilabasRimas })));
const ImagemParaPDF = React.lazy(() => import("./tools/ImagemParaPDF").then(m => ({ default: m.ImagemParaPDF })));
const PDFParaImagem = React.lazy(() => import("./tools/PDFParaImagem").then(m => ({ default: m.PDFParaImagem })));
const JuntarPDF = React.lazy(() => import("./tools/JuntarPDF").then(m => ({ default: m.JuntarPDF })));
const DividirPDF = React.lazy(() => import("./tools/DividirPDF").then(m => ({ default: m.DividirPDF })));
const ComprimirPDF = React.lazy(() => import("./tools/ComprimirPDF").then(m => ({ default: m.ComprimirPDF })));
const GirarPDF = React.lazy(() => import("./tools/GirarPDF").then(m => ({ default: m.GirarPDF })));
const NumerarPaginasPDF = React.lazy(() => import("./tools/NumerarPaginasPDF").then(m => ({ default: m.NumerarPaginasPDF })));
const MarcaDaguaPDF = React.lazy(() => import("./tools/MarcaDaguaPDF").then(m => ({ default: m.MarcaDaguaPDF })));
const ExtrairPaginasPDF = React.lazy(() => import("./tools/ExtrairPaginasPDF").then(m => ({ default: m.ExtrairPaginasPDF })));
const CabecalhoRodapePDF = React.lazy(() => import("./tools/CabecalhoRodapePDF").then(m => ({ default: m.CabecalhoRodapePDF })));
const NumeracaoBatesPDF = React.lazy(() => import("./tools/NumeracaoBatesPDF").then(m => ({ default: m.NumeracaoBatesPDF })));
const AchatarPDF = React.lazy(() => import("./tools/AchatarPDF").then(m => ({ default: m.AchatarPDF })));
const AssinarPDF = React.lazy(() => import("./tools/AssinarPDF").then(m => ({ default: m.AssinarPDF })));
const PreencherFormularioPDF = React.lazy(() => import("./tools/PreencherFormularioPDF").then(m => ({ default: m.PreencherFormularioPDF })));
const EditarPDFBasico = React.lazy(() => import("./tools/EditarPDFBasico").then(m => ({ default: m.EditarPDFBasico })));
const HEICParaJPG = React.lazy(() => import("./tools/HEICParaJPG").then(m => ({ default: m.HEICParaJPG })));
const HEICParaPDF = React.lazy(() => import("./tools/HEICParaPDF").then(m => ({ default: m.HEICParaPDF })));
const OCRPdf = React.lazy(() => import("./tools/OCRPdf").then(m => ({ default: m.OCRPdf })));
const HTMLParaMarkdown = React.lazy(() => import("./tools/HTMLParaMarkdown").then(m => ({ default: m.HTMLParaMarkdown })));
const DOCXParaMarkdown = React.lazy(() => import("./tools/DOCXParaMarkdown").then(m => ({ default: m.DOCXParaMarkdown })));
const PDFParaMarkdown = React.lazy(() => import("./tools/PDFParaMarkdown").then(m => ({ default: m.PDFParaMarkdown })));
const CalculadoraTokensIA = React.lazy(() => import("./tools/CalculadoraTokensIA").then(m => ({ default: m.CalculadoraTokensIA })));
const GeradorIdeiasEscrita = React.lazy(() => import("./tools/GeradorIdeiasEscrita").then(m => ({ default: m.GeradorIdeiasEscrita })));
const CalculadoraVelocidadeLeitura = React.lazy(() => import("./tools/CalculadoraVelocidadeLeitura").then(m => ({ default: m.CalculadoraVelocidadeLeitura })));
const GeradorListaBagagem = React.lazy(() => import("./tools/GeradorListaBagagem").then(m => ({ default: m.GeradorListaBagagem })));
const GeradorNomeProjeto = React.lazy(() => import("./tools/GeradorNomeProjeto").then(m => ({ default: m.GeradorNomeProjeto })));
const PegadaCarbonoViagem = React.lazy(() => import("./tools/PegadaCarbonoViagem").then(m => ({ default: m.PegadaCarbonoViagem })));
const CalculadoraIluminacao = React.lazy(() => import("./tools/CalculadoraIluminacao").then(m => ({ default: m.CalculadoraIluminacao })));
const CalculadoraTamanhoTapete = React.lazy(() => import("./tools/CalculadoraTamanhoTapete").then(m => ({ default: m.CalculadoraTamanhoTapete })));
const RegaPlantas = React.lazy(() => import("./tools/RegaPlantas").then(m => ({ default: m.RegaPlantas })));
const PlanejadorFusoHorario = React.lazy(() => import("./tools/PlanejadorFusoHorario").then(m => ({ default: m.PlanejadorFusoHorario })));
const ZPLParaPDF = React.lazy(() => import("./tools/ZPLParaPDF").then(m => ({ default: m.ZPLParaPDF })));
import { SobrePage } from "./pages/SobrePage";
import { MetodologiaPage } from "./pages/MetodologiaPage";
import { ContatoPage } from "./pages/ContatoPage";
import { PrivacidadePage } from "./pages/PrivacidadePage";
import { TermosPage } from "./pages/TermosPage";
import { CafeButton, CafeFooterLink } from "./components/CafeButton";
import { enSlugToPtSlug, ptSlugToEnSlug } from "./i18n/tools/en";

const STATIC_PAGES: Record<string, React.ComponentType<{ onBack: () => void }>> = {
  "sobre": SobrePage,
  "metodologia": MetodologiaPage,
  "contato": ContatoPage,
  "privacidade": PrivacidadePage,
  "termos": TermosPage,
};

const TOOL_COMPONENTS: Record<string, React.ComponentType<{ onBack: () => void; initialName?: string }>> = {
  "alcool-gasolina": AlcoolGasolina,
  "divisor-carona": DivisorCarona,
  "consumo-energia": ConsumoEnergia,
  "calculadora-tinta": CalculadoraTinta,
  "calculadora-btu": CalculadoraBTU,
  "limpeza-zonas": LimpezaZonas,
  "metros-quadrados": MetrosQuadrados,
  "depreciacao-veiculo": DepreciacaoVeiculo,
  "parcelamento-multas": ParcelamentoMultas,
  "imc-avancada": IMCAvancada,
  "periodo-fertil": PeriodoFertil,
  "dpp": DPP,
  "contracoes": Contracoes,
  "gasto-calorico": GastoCalórico,
  "ciclos-sono": CiclosSono,
  "frequencia-cardiaca": FrequenciaCardiaca,
  "limite-cafeina": LimiteCafeina,
  "macronutrientes": Macronutrientes,
  "alerta-agua": AlertaAgua,
  "roteirizador": Roteirizador,
  "placar-poliesportivo": PlacarPoliesportivo,
  "sorteador-equipes": SorteadorEquipes,
  "gerador-bolao": GeradorBolao,
  "onde-assistir": OndeAssistir,
  "probabilidades-classificacao": ProbabilidadesClassificacao,
  "palpites-loteria": PalpitesLoteria,
  "painel-bingo": PainelBingo,
  "comparador-preco": ComparadorPreco,
  "juros-compostos": JurosCompostos,
  "calculadora-desconto": CalculadoraDesconto,
  "taxas-maquininha": TaxasMaquininha,
  "conversor-cozinha": ConversorCozinha,
  "conversor-roupas": ConversorRoupas,
  "salario-hora": SalarioHora,
  "ponto-equilibrio": PontoEquilibrio,
  "simulador-markup": SimuladorMarkup,
  "conversor-moedas": ConversorMoedas,
  "ciclo-estudos": CicloEstudos,
  "calculadora-edital": CalculadoraEdital,
  "mapeamento-erros": MapeamentoErros,
  "contador-caracteres": ContadorCaracteres,
  "simulador-sisu": SimuladorSISU,
  "pomodoro": Pomodoro,
  "velocidade-digitacao": VelocidadeDigitacao,
  "taxa-engajamento": TaxaEngajamento,
  "formatador-legendas": FormatadorLegendas,
  "roteiro-judaismo": RoteiroJudaismo,
  "plano-leitura-biblica": PlanoLeituraBiblica,
  "cronologia-biblica": CronologiaBiblica,
  "calendario-hebraico": CalendarioHebraico,
  "fichamento-soap": FichamentoSOAP,
  "calendario-feriados": CalendarioFeriados,
  "diferenca-datas": DiferencaDatas,
  "acumulador-horas": AcumuladorHoras,
  "horas-decimais": HorasDecimais,
  "dias-vida": DiasVida,
  "gerador-qrcode": GeradorQRCode,
  "gerador-senhas": GeradorSenhas,
  "organizador-listas": OrganizadorListas,
  "porcentagem-reversa": PorcentagemReversa,
  "custo-nail": CustoNailDesigner,
  "agenda-unhas": AgendaUnhas,
  "cronograma-capilar": CronogramaCapilar,
  "tarefas-infantil": TarefasInfantil,
  "conversor-dpi": ConversorDPI,
  "backlog-gamer": BacklogGamer,
  "gerador-nicks": GeradorNicks,
  "spawn-timer": SpawnTimer,
  "conversor-proporcao": ConversorProporcao,
  "paleta-cores": PaletaCores,
  "descobridor-anagramas": DescobridorAnagramas,
  "calculadora-churrasco": CalculadoraChurrasco,
  "link-whatsapp": GeradorLinkWhatsApp,
  "formatador-texto": FormatadorTexto,
  "gerador-recibo": GeradorRecibo,
  "descobridor-signo": DescobridorSigno,
  "compatibilidade-signos": CompatibilidadeSignos,
  "mapa-numerologico": MapaNumerologico,
  "sugestor-livros": SugestorLivros,
  "significado-nomes": SignificadoNomes,
  "idade-pet": IdadePet,
  "consumo-racao": ConsumoRacao,
  "nomes-pets": NomesPets,
  "vacinas-pet": VacinasPet,
  "economia-energia-solar": EconomiaEnergiaSolar,
  "formatador-json": FormatadorJSON,
  "gerador-uuid": GeradorUUID,
  "codificador-base64": CodificadorBase64,
  "validador-cpf-cnpj": ValidadorCPFCNPJ,
  "removedor-acentos": RemovedorAcentos,
  "simulador-financiamento": SimuladorFinanciamento,
  "compressor-imagem": CompressorImagem,
  "redimensionador-imagem": RedimensionadorImagem,
  "testador-regex": TestadorRegex,
  "gerador-hash": GeradorHash,
  "codificador-url": CodificadorURL,
  "conversor-csv-excel": ConversorCSVExcel,
  "conversor-json-csv": ConversorJSONCSV,
  "calculadora-gorjeta": CalculadoraGorjeta,
  "calculadora-regra-de-tres": CalculadoraRegraTres,
  "seletor-cores": SeletorCores,
  "contador-tempo-decorrido": ContadorTempoDecorrido,
  "contador-silabas-rimas": GeradorSilabasRimas,
  "imagem-para-pdf": ImagemParaPDF,
  "pdf-para-imagem": PDFParaImagem,
  "juntar-pdf": JuntarPDF,
  "dividir-pdf": DividirPDF,
  "comprimir-pdf": ComprimirPDF,
  "girar-pdf": GirarPDF,
  "numerar-paginas-pdf": NumerarPaginasPDF,
  "marca-dagua-pdf": MarcaDaguaPDF,
  "extrair-paginas-pdf": ExtrairPaginasPDF,
  "cabecalho-rodape-pdf": CabecalhoRodapePDF,
  "numeracao-bates-pdf": NumeracaoBatesPDF,
  "achatar-pdf": AchatarPDF,
  "assinar-pdf": AssinarPDF,
  "preencher-formulario-pdf": PreencherFormularioPDF,
  "editar-pdf": EditarPDFBasico,
  "heic-para-jpg": HEICParaJPG,
  "heic-para-pdf": HEICParaPDF,
  "ocr-pdf": OCRPdf,
  "html-para-markdown": HTMLParaMarkdown,
  "docx-para-markdown": DOCXParaMarkdown,
  "pdf-para-markdown": PDFParaMarkdown,
  "calculadora-tokens-ia": CalculadoraTokensIA,
  "gerador-ideias-escrita": GeradorIdeiasEscrita,
  "calculadora-velocidade-leitura": CalculadoraVelocidadeLeitura,
  "gerador-lista-bagagem": GeradorListaBagagem,
  "gerador-nome-projeto": GeradorNomeProjeto,
  "pegada-carbono-viagem": PegadaCarbonoViagem,
  "calculadora-iluminacao": CalculadoraIluminacao,
  "calculadora-tamanho-tapete": CalculadoraTamanhoTapete,
  "rega-plantas": RegaPlantas,
  "planejador-fuso-horario": PlanejadorFusoHorario,
  "zpl-para-pdf": ZPLParaPDF,
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
};

const FEATURED_SLUGS = [
  "alcool-gasolina",
  "imc-avancada",
  "juros-compostos",
  "gerador-qr-code",
  "dias-vida",
  "calculadora-churrasco",
];

function CategoryFilter({ activeCategory, onSelectCategory }: {
  activeCategory: Category;
  onSelectCategory: (c: Category) => void;
}) {
  return (
    <nav
      className="border-b border-border bg-bg/80 backdrop-blur-sm"
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
                : "bg-card text-muted border-border hover:border-green-400/30 hover:text-text"
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
        <p className="text-xs font-semibold text-muted uppercase tracking-widest">Mais usadas agora</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {featured.map((tool, i) => (
          <a
            key={tool.id}
            href={`/${tool.slug}`}
            onClick={(e) => { if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); onSelectTool(tool.slug); }}
            onTouchEnd={(e) => { e.preventDefault(); if (wasScrolling()) return; onSelectTool(tool.slug); }}
            className="card-hover-effect group text-left p-4 rounded-2xl bg-card border border-border hover:border-green-400/30 animate-fade-in-up"
            style={{ WebkitTapHighlightColor: 'transparent', animationDelay: `${i * 60}ms` }}
          >
            <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-3 transition-transform group-hover:scale-110" style={{ background: 'rgba(0,200,83,0.12)' }}>
              {tool.emoji}
            </div>
            <p className="text-sm font-semibold text-text leading-tight">{tool.name}</p>
            <p className="text-xs text-muted mt-1 line-clamp-1">{tool.description}</p>
          </a>
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
  const [lang, setLang] = useState<"pt" | "en">("pt");
  const [initialName, setInitialName] = useState<string | undefined>(undefined);

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
  }, [activeTool, activeCategoryPage, lang]);

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
      } else if (STATIC_PAGES[path]) {
        setActiveCategoryPage(path);
        setActiveTool(null);
        setInitialName(undefined);
      } else if (path.startsWith("categoria/")) {
        const slug = path.replace("categoria/", "");
        if (CATEGORY_SEO_DATA[slug]) {
          setActiveCategoryPage(slug);
          setActiveTool(null);
        }
        setInitialName(undefined);
      } else if (TOOL_COMPONENTS[path]) {
        setActiveTool(path);
        setActiveCategoryPage(null);
        setInitialName(undefined);
      } else {
        setActiveTool(null);
        setActiveCategoryPage(null);
        setInitialName(undefined);
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const navigateToCategory = useCallback((slug: string) => {
    setActiveCategoryPage(slug);
    setActiveTool(null);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const navigateToTool = useCallback((slug: string) => {
    setActiveTool(slug);
    setActiveCategoryPage(null);
    setInitialName(undefined);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTool, activeCategoryPage]);

  const filtered = useMemo(() => {
    return TOOLS.filter((t) => {
      const matchCat = activeCategory === "Todas" || t.category === activeCategory;
      const q = search.toLowerCase();
      const matchSearch = !q || t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q) || t.category.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  if (activeCategoryPage && STATIC_PAGES[activeCategoryPage]) {
    const StaticComponent = STATIC_PAGES[activeCategoryPage];
    return (
      <NavigationContext.Provider value={{ onSelectCategory: navigateToCategory, onSelectTool: navigateToTool, lang }}>
      <div className={theme === "light" ? "light" : ""}>
        <Header
          theme={theme}
          onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          search={search}
          onSearchChange={setSearch}
          onLogoClick={() => { setActiveCategoryPage(null); setActiveTool(null); }}
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
          onLogoClick={() => { setActiveCategoryPage(null); setActiveTool(null); }}
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
        <NavigationContext.Provider value={{ onSelectCategory: navigateToCategory, onSelectTool: navigateToTool, lang }}>
        <div className={theme === "light" ? "light" : ""}>
          <Header
            theme={theme}
            onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            search={search}
            onSearchChange={setSearch}
            onLogoClick={() => { setActiveTool(null); setActiveCategoryPage(null); }}
            lang={lang}
            onToggleLang={() => setLang(lang === "en" ? "pt" : "en")}
          />
          <Suspense fallback={<div className="max-w-2xl mx-auto px-4 py-16 text-center text-muted text-sm">Carregando ferramenta...</div>}>
            <ToolComponent onBack={() => { setActiveTool(null); setInitialName(undefined); }} initialName={activeTool === "significado-nomes" ? initialName : undefined} />
          </Suspense>
          <CookieBanner />
        </div>
        </NavigationContext.Provider>
      );
    }
  }

  return (
    <NavigationContext.Provider value={{ onSelectCategory: navigateToCategory, onSelectTool: navigateToTool, lang }}>
    <div className={theme === "light" ? "light" : ""}>
      <Header
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        search={search}
        onSearchChange={setSearch}
        onLogoClick={() => setActiveTool(null)}
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
        <section className="relative text-center py-24 px-4 border-b border-border overflow-hidden">
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
            <h1 className="text-5xl sm:text-7xl font-extrabold mb-4 leading-tight tracking-tight animate-fade-in-up text-text" style={{ animationDelay: '80ms' }}>
              <span className="text-text">Clicou, </span>
              <span className="text-gradient-primary animate-shimmer" style={{ backgroundImage: 'linear-gradient(90deg, #00c853, #38bdf8, #fbbf24, #00c853)' }}>Resolveu.</span>
            </h1>
            <p className="text-muted text-base sm:text-lg mb-8 font-normal animate-fade-in-up" style={{ animationDelay: '160ms' }}>
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

        <div className="max-w-screen-2xl mx-auto px-4 pt-4">
          <h2 className="text-xl font-bold text-text border-t border-border pt-8">
            Todas as Ferramentas
          </h2>
          <p className="text-sm text-muted mt-1">
            {filtered.length} ferramentas disponíveis
          </p>
        </div>

        <section id="ferramentas" className="max-w-screen-2xl mx-auto px-4 py-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-muted">
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
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
              {filtered.map((tool, i) => {
                const catColor = CATEGORY_COLORS[tool.category] || "text-gray-400 bg-gray-400/10 border-gray-400/20";
                return (
                  <a
                    key={tool.id}
                    href={`/${tool.slug}`}
                    onClick={(e) => { if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return; e.preventDefault(); navigateToTool(tool.slug); }}
                    onTouchEnd={(e) => { e.preventDefault(); if (wasScrolling()) return; navigateToTool(tool.slug); }}
                    className="group relative text-left p-5 rounded-2xl bg-card border border-border hover:border-green-400/30 hover:bg-green-400/5 transition-all duration-[200ms] ease-out hover:-translate-y-[3px] hover:shadow-xl hover:shadow-green-400/[0.15] animate-fade-in-up"
                    style={{ WebkitTapHighlightColor: 'transparent', animationDelay: `${Math.min(i * 30, 600)}ms` }}
                  >
                    <span className="absolute top-3 right-3 text-xs text-muted font-mono opacity-50 group-hover:opacity-0 transition-opacity">
                      #{String(tool.id).padStart(2, "0")}
                    </span>
                    <div className="text-3xl mb-3 transition-transform group-hover:scale-110 group-hover:-rotate-3">{tool.emoji}</div>
                    <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full border mb-2 ${catColor}`}>
                      {tool.category}
                    </span>
                    <h2 className="text-sm font-bold text-text mb-1 leading-tight">{tool.name}</h2>
                    <p className="text-xs text-muted leading-relaxed line-clamp-2">{tool.description}</p>
                    <div className="mt-3 flex items-center gap-1 text-xs text-green-400 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1">
                      <span>Abrir</span>
                      <span>→</span>
                    </div>
                  </a>
                );
              })}
            </div>
          )}
        </section>

        {/* Explore por Categoria */}
        <section className="max-w-screen-2xl mx-auto px-4 py-12 border-t border-border">
          <h2 className="text-xl font-bold text-text mb-8 text-center">
            Explore por Categoria
          </h2>
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
                  className="group text-left p-5 rounded-2xl bg-card border border-border hover:border-green-400/40 hover:bg-green-400/5 transition-all duration-200 hover:-translate-y-0.5 animate-fade-in-up"
                  style={{ animationDelay: `${Math.min(i * 40, 500)}ms` }}
                >
                  <div className="text-3xl mb-2 transition-transform group-hover:scale-110">{cat.emoji}</div>
                  <h3 className="text-sm font-bold text-text mb-1">{cat.categoryName}</h3>
                  <p className="text-xs text-muted">{count} ferramentas</p>
                  <div className="mt-2 flex items-center gap-1 text-xs text-green-400 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1">
                    <span>Explorar</span>
                    <span>→</span>
                  </div>
                </button>
              );
            })}
          </div>
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
    <footer className="border-t border-border bg-bg">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-8">
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 2L6 14L9.5 11L12 17L14 16L11.5 10L16 10L6 2Z" fill="#00c853"/></svg>
              <span className="text-sm font-bold leading-none"><span className="text-text">CLICA</span><span className="text-green-400">resolve</span></span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              84 ferramentas gratuitas para o dia a dia — sem cadastro, sem complicação.
            </p>
          </div>
          <div>
            <p className="text-sm font-bold text-text mb-3">Páginas</p>
            <div className="space-y-2">
              {[
                { label: "Sobre", slug: "sobre" },
                { label: "Metodologia", slug: "metodologia" },
                { label: "Contato", slug: "contato" },
              ].map((l) => (
                <button
                  key={l.slug}
                  onClick={() => onNavigate(l.slug)}
                  className="block text-xs text-muted hover:text-green-400 transition-colors text-left"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-bold text-text mb-3">Legal</p>
            <div className="space-y-2">
              {[
                { label: "Política de Privacidade", slug: "privacidade" },
                { label: "Termos de Uso", slug: "termos" },
              ].map((l) => (
                <button
                  key={l.slug}
                  onClick={() => onNavigate(l.slug)}
                  className="block text-xs text-muted hover:text-green-400 transition-colors text-left"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center border-t border-border pt-6">
          <p className="text-xs text-muted">
            CLICAresolve © {new Date().getFullYear()} — Ferramentas gratuitas, precisas e baseadas em metodologias reconhecidas
          </p>
          <CafeFooterLink onOpen={() => setCafeOpen(true)} />
        </div>
      </div>
    </footer>
  );
}
