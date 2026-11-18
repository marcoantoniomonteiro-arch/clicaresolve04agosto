/**
 * Site enxuto enquanto o AdSense reanalisa o site ("conteúdo de baixo valor").
 *
 * Só aparecem no menu, na busca, nas categorias, nos links internos e no Google:
 * - as ferramentas com tráfego no Search Console (3 meses até 18/11/2026), as
 *   ferramentas únicas e as ferramentas principais de cada guia;
 * - os 50 nomes com mais aparições em buscas;
 * - as páginas em inglês com tráfego cuja ferramenta em português está visível.
 * O resto continua no ar pelo endereço direto, mas com noindex e fora do sitemap.
 * Para liberar algo de volta, basta incluir o slug na lista certa.
 */

const TOOLS_LISTED = "agenda-unhas,alcool-gasolina,alerta-agua,backlog-gamer,calculadora-btu,calculadora-churrasco,calculadora-desconto,calculadora-regra-de-tres,calculadora-tinta,calendario-feriados,calendario-hebraico,ciclo-estudos,ciclos-sono,codificador-url,comparador-preco,consumo-energia,consumo-racao,contador-caracteres,contador-tempo-decorrido,conversor-cozinha,conversor-dpi,conversor-moedas,conversor-proporcao,conversor-roupas,cronologia-biblica,custo-nail,depreciacao-veiculo,descobridor-anagramas,dias-vida,diferenca-datas,divisor-carona,dpp,fichamento-soap,formatador-legendas,frequencia-cardiaca,gasto-calorico,gerador-bolao,gerador-lista-bagagem,gerador-nicks,gerador-nome-projeto,gerador-senhas,heic-para-jpg,horas-decimais,idade-pet,imc-avancada,juntar-pdf,juros-compostos,limite-cafeina,link-whatsapp,macronutrientes,mapeamento-erros,metros-quadrados,painel-bingo,periodo-fertil,placar-poliesportivo,pomodoro,ponto-equilibrio,porcentagem-reversa,removedor-acentos,roteirizador,salario-hora,seletor-cores,significado-nomes,simulador-financiamento,simulador-markup,simulador-sisu,spawn-timer,taxa-engajamento,taxas-maquininha,vacinas-pet";

const NAMES = "lucimara,kalel,rosana,karina,wilson,henry,valdir,katia,edgar,alessandra,glaucia,leandra,liam,washington,ryan,nadia,juan,ismael,jairo,helio,karen,zenaide,jeremias,sandro,selma,marlene,edna,nivaldo,zilda,vania,berenice,dario,olavo,silas,anderson,valeria,zuleide,neide,gilson,armando,mauricio,malu,josue,sheila,tania,zelia,edilson,olga,sueli,joel";

const EN = "aspect-ratio-converter,bingo-caller,bmi-calculator,btu-calculator,caffeine-limit,calorie-burn-calculator,card-machine-fees-calculator,clothing-size-converter,compound-interest,currency-converter,decimal-hours-converter,discount-percentage-calculator,due-date-calculator,energy-consumption-calculator,fertility-calculator,gamertag-generator,hebrew-calendar-converter,holiday-calendar,hourly-wage-calculator,macronutrient-calculator,paint-calculator,pet-food-calculator,price-comparison-calculator,reverse-percentage-calculator,square-footage-calculator,trip-route-planner,whatsapp-link-generator";

const LISTED_TOOLS = new Set(TOOLS_LISTED.split(","));
const VISIBLE_NAMES = new Set(NAMES.split(","));
const VISIBLE_EN = new Set(EN.split(","));

/** A ferramenta aparece no menu, na busca, nas categorias e no Google? */
export const isToolListed = (slug: string) => LISTED_TOOLS.has(slug);
/** A página /significado-nome/<slug> aparece no Google e recebe links internos? */
export const isNameIndexed = (slug: string) => VISIBLE_NAMES.has(slug);
/** A página /en/<slug> aparece no Google? */
export const isEnIndexed = (enSlug: string) => VISIBLE_EN.has(enSlug);
