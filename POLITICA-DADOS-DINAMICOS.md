# Política de Dados Dinâmicos e Segurança Jurídica de Produto

Este documento define regras obrigatórias para qualquer ferramenta do CLICAresolve que
apresente dados que podem mudar com o tempo (taxas, cotações, preços, feriados, prazos
legais, índices, etc.).

## Regra central

> **O CLICAresolve não deve afirmar mais do que consegue provar.**
> Nenhuma taxa, cotação, índice, feriado ou informação temporal deve ser hardcoded e
> apresentada como atual sem um mecanismo real de atualização, ou sem indicação
> explícita da data/origem da informação.

Toda ferramenta que exibe um dado variável deve conseguir responder a estas 5 perguntas:

1. De onde veio o dado?
2. Quando ele foi atualizado?
3. Qual metodologia foi utilizada?
4. O resultado é exato ou estimativo?
5. Em quais situações o usuário não deve confiar exclusivamente nele?

## Regra prática: quando é permitido sugerir um valor "atual"

Uma taxa/cotação/índice só pode aparecer pré-preenchido ou como "valor atual" se **todas**
as condições abaixo forem verdadeiras:

- Existe integração real com uma fonte confiável (ex: SGS do Banco Central).
- A fonte pode ser consultada automaticamente (não é um número digitado manualmente no código).
- O sistema sabe e exibe a data da última atualização.
- A ferramenta mostra claramente a fonte (ex: "Fonte: Banco Central do Brasil").
- Existe tratamento para quando a fonte estiver indisponível (fallback, mensagem de erro clara).
- Não há risco de mostrar um valor desatualizado como se fosse atual.

**Se qualquer uma dessas condições não for atendida, não mostre o número.** Prefira um
campo em branco para o usuário preencher, com uma explicação de onde consultar a taxa/
cotação real. Isso vale mesmo que o número esteja "aproximadamente certo" hoje — ele vai
ficar errado no futuro sem ninguém perceber.

### Exemplo aplicado (Calculadora de Juros Compostos)

❌ Antes: campo de taxa vinha com placeholder `"Ex: 13.25 (CDI)"` e uma nota dizendo
"Sugestão baseada no CDI de referência (13,25%, 2026)" — um número fixo no código,
apresentado como se fosse a taxa CDI atual.

✅ Depois: campo pede a taxa ao usuário, sem número pré-associado a nenhum índice
específico, com a orientação "Consulte a instituição financeira ou a fonte oficial (ex:
Banco Central, CDI, poupança) referente ao investimento que deseja simular." O exemplo
didático da ferramenta (13,25% a.a.) continua existindo, mas está explicitamente rotulado
como "valor ilustrativo", não como a taxa vigente.

Isso não significa que a ideia de trazer Selic/CDI automaticamente via SGS do Banco
Central esteja descartada — é uma evolução real e desejável — mas ela só deve ser ativada
quando existir uma integração de verdade (ver seção "Trabalho futuro" abaixo).

## Padrão de linguagem por categoria

| Categoria | Não fazer | Fazer |
|---|---|---|
| **Dado dinâmico** (taxas, cotações) | Mostrar número fixo como "atual" | Só mostrar com fonte + data, ou deixar em branco |
| **Cálculo** | — | Deixar a fórmula/metodologia identificável |
| **Estimativa** | Apresentar como certeza | Identificar explicitamente como estimativa |
| **Saúde** | "Seu limite seguro é X" | "Referência geral baseada em X; não substitui orientação médica/profissional" |
| **Financeiro** | "Você vai ganhar R$ X" | "Simulação estimada com base nos parâmetros informados", deixando claro o que não é considerado (impostos, taxas, inflação) |
| **Jurídico** | Aconselhamento individual | Informação geral |
| **Conversão** | Ambiguidade de unidade/metodologia | Unidade e metodologia claramente identificadas |
| **Arquivos** | Alegar garantias sobre o arquivo | Explicar o processamento feito e a privacidade (client-side) |
| **Informação temporal** | Data/ano fixo no texto (ex: "2025-2026") | Gerar a data dinamicamente ou indicar claramente que é um exemplo |

### Frases-modelo

- ❌ "Este cálculo está correto." → ✅ "Resultado calculado conforme a metodologia apresentada."
- ❌ "Este é o valor atual." → ✅ "Valor consultado na fonte X em DD/MM/AAAA HH:MM." (só com integração real)
- ❌ "Este é o limite seguro." → ✅ "Referência geral baseada em X; não substitui orientação profissional."

## Trabalho futuro: integração com SGS do Banco Central

Para a Calculadora de Juros e Investimentos, a evolução natural (ainda não implementada)
é integrar com o SGS (Sistema Gerenciador de Séries Temporais) do Banco Central, que
disponibiliza séries oficiais como Meta Selic (série 432) e Selic efetiva diária (série 11).

Requisitos antes de ativar isso na UI:

- Um serviço/API intermediário entre o CLICAresolve e o SGS (não chamar a API do BCB
  direto do navegador) — permite cache, controle de erros e evita chamadas excessivas.
- Registro da data/hora da última atualização de cada série.
- Fallback claro para quando o BCB estiver indisponível.
- Distinção correta entre séries (Meta Selic vs. Selic efetiva, CDI não é a mesma coisa
  que Selic — costuma ficar cerca de 0,10 p.p. abaixo).
- Opcionalmente, suporte a simulação com taxas históricas reais de um período (não só a
  taxa atual projetada constante), já que são perguntas diferentes:
  - "Quanto vou acumular se a taxa permanecer em X%?"
  - "Quanto eu teria acumulado se tivesse investido no passado?"

Até essa integração existir de verdade, a ferramenta deve continuar pedindo a taxa ao
usuário, sem sugerir um valor "atual" pré-definido no código.
