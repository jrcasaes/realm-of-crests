# Fase 3 — Dossiês Vivos dos Guardiões

## Objetivo

Transformar a galeria dos Guardiões em um instrumento de exploração e comparação, mantendo a assimetria editorial do cânone público. Os 19 Guardiões possuem relações territoriais completas; apenas Nego e Kalen possuem camadas narrativas individuais adicionais publicamente aprovadas.

## Arquivo Vivo

O arquivo oferece quatro modos complementares de leitura:

- busca por Guardião, Reino, título ou Eco;
- filtro pelas oito famílias dominantes de Fervor;
- filtro pelo estado inicial público de Sovereign Gravity;
- confronto de até duas assinaturas.

O foco cinematográfico apresenta uma presença por vez e conecta diretamente seu dossiê ao folio territorial correspondente.

## Comparação

A mesa de confronto não atribui força, ranking ou vencedor. Ela compara dimensões canônicas equivalentes:

- Reino e Eco territorial;
- Eco ancestral;
- Fervores dominante e secundário;
- Sovereign Gravity;
- Essência;
- Templo.

Ao selecionar uma terceira presença, a seleção mais antiga é substituída. O limite permanece dois para preservar legibilidade e evitar interpretação competitiva não canônica.

## Dossiês individuais

Cada dossiê possui:

- entrada cinematográfica pelo retrato derivado;
- camadas de nomeação;
- narrativa pública progressiva;
- leitura sistêmica;
- glifos dos Fervores relacionados;
- vínculo visual e navegacional com o Reino;
- paginação circular pelos 19 Guardiões.

Quando não existe biografia pública detalhada, o dossiê usa somente uma leitura relacional construída a partir de campos canônicos já publicados. A interface explicita essa fronteira e não preenche lacunas com invenção narrativa.

## Integração com a jornada

O Arquivo Vivo consulta `roc.exploration.v1` apenas para indicar se o Reino associado já foi registrado. Visitar um Guardião não registra automaticamente seu território: descoberta territorial continua exigindo Atlas ou folio de Reino.

## Acessibilidade

- filtros possuem rótulos persistentes;
- contagem de resultados e estado comparativo usam regiões vivas;
- seleção usa `aria-pressed`;
- tabelas mantêm cabeçalhos semânticos;
- todas as operações são acessíveis por teclado;
- `prefers-reduced-motion` remove revelações e transições não essenciais.

## Critérios de aceite

- 19 Guardiões e 19 retratos derivados;
- oito famílias dominantes de Fervor;
- estados atuais Constructive e Catalytic sem reclassificação editorial;
- comparação limitada a duas presenças;
- nenhum ranking ou dado de poder inventado;
- fallback relacional explícito para dossiês sem biografia detalhada;
- build estática completa e gates das Fases 0–3 aprovados.
