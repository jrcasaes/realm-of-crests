# Realm of Crests — Registro de versões do site

## v1.2.17 — 2026-07-21

Status: **publicada e verificada em produção; fechamento operacional da Fase 7 concluído**.

- Faz o quadro de Continuidade Viva responder à largura real do componente e colapsar para uma coluna abaixo de 900 px.
- Acrescenta defesas de largura e quebra de texto para preservar leitura sob zoom elevado.
- Completa a ficha dos 19 Reinos com a **Âncora territorial**, reutilizando o Templo canônico de cada território.
- Reposiciona exclusivamente o marcador interpretativo da Arena de Ferro em Galícia para `76% / 59%`.
- Preserva panoramas, cânone, Fervores, emblemas, Botáfia e memória de navegação.

Gate local: **PASS** — 48 páginas, 48 canonicals, links/assets íntegros, 19 âncoras territoriais e gate dedicado de legibilidade aprovado.

QA visual: **PASS** — 1024, 1366 e 1920 px, além dos equivalentes a zoom de 125% e 150%, sem overflow interno ou horizontal; San Paolo validado em 2 × 2 e Arena de Ferro confirmada sobre a estrutura correta.

Verificação pública: **PASS** — PR #11 integrado por squash no commit `2870cb10d0c4707d7d16fbd830ee712321e02306`; Eldric, San Paolo e Galícia aprovados na raiz pública, sem imagens quebradas ou erros JavaScript da aplicação.

## v1.2.16 — 2026-07-21

Status: **publicada e verificada em produção**.

- Separa **Continuar a travessia** de **Seguir uma ressonância** nos ecos contextuais.
- Registra Guardiões vistos em memória local própria, sem alterar o progresso territorial.
- Garante descoberta dos 19 Guardiões antes de repetir nomes e elimina ciclos A ↔ B.
- Exclui o Guardião atual e os três vestígios recentes; após 19/19, ativa o estado **Outra ressonância**.
- Usa Fervores como ordenação explicada entre candidatos válidos, nunca como destino absoluto.
- Não altera cânone, dossiês, relações de Fervor, imagens, emblemas ou o asset preservado de Botáfia.

Gate local: **PASS** — 19 pontos de partida × 64 pares de afinidade, cobertura 19/19 sem repetição, sem autoindicação e sem ciclos A ↔ B.

QA navegável: **PASS** — 98/98 verificações em 1366 × 768 e 1920 × 1080; travessia real dos 19 Guardiões, migração de estado legado, memória separada do progresso territorial, console e overflow aprovados.

Verificação pública: **PASS** — PR #10 integrado por squash no commit `c356cae312eab71d0c4db2a613c4185532acec08`; Eldric e Admiral não formam retorno imediato, a navegação real até Hawks persiste após recarga e nenhum asset ou erro da aplicação foi detectado.

## v1.2.15 — 2026-07-21

Status: **Fases 7.0 e 7.1 publicadas e verificadas em produção**.

- Reconhece o Atlas concluído em 19/19 emblemas transparentes e preserva Botáfia sem qualquer alteração visual.
- Substitui nos fólios territoriais a entrega dos PNGs pesados pelos WebPs responsivos já aprovados.
- Amplia metadados pequenos do Atlas, bloqueia o lampejo inicial do Diário e acrescenta orçamento para imagens efetivamente referenciadas.
- Introduz a Primeira Travessia opcional, recomendações narrativas explicadas e reaparecimento contextual dos Fragmentos.
- Conecta Atlas, Reinos, Guardiões, Fervores e Diário sem pontuação, poder ou alteração do cânone.
- Acrescenta demonstrações conceituais leves de Sovereign Gravity e Ascensão; o Códice 8 × 5 permanece como demonstração de Fervor.

Gate local e QA: **PASS** — 48 páginas e canonicals, 40/40 verificações centrais e 18/18 complementares; Primeira Travessia, continuidade contextual, Fragmentos, Diário, Gravity e Ascensão aprovados em 1366 × 768 e 1920 × 1080.

Verificação pública: **PASS** — PR #9 integrado por squash no commit `285bec7a9d1f7ac69b16a187ac68354e9e52f6b8`; Primeira Travessia, Atlas, Botáfia, Diário e sistemas demonstráveis aprovados sem overflow, imagens quebradas ou erros JavaScript da aplicação.

## v1.2.14 — 2026-07-21

Status: **publicada e verificada em produção; Atlas concluído com 19/19 emblemas transparentes**.

- Substitui exclusivamente o emblema opaco temporário de Botáfia no Atlas por um derivado WebP transparente 256 × 256 do PNG íntegro aprovado.
- Preserva os outros 18 emblemas, panoramas, mapa, componentes, rotas e conteúdo canônico.

Verificação pública: **PASS** — Botáfia selecionada no Atlas canônico; emblema completo em 256 × 256, renderizado em 94 × 94, sem imagem quebrada ou overflow no desktop observado.


## v1.2.13 — 2026-07-21

Status: **publicada e verificada em produção; Botáfia permanece como exceção opaca temporária**.

- Integra o Mapa Canônico do Continente v1.1 como errata cartográfica derivada do cânone consolidado.
- Corrige exclusivamente o verbete Woundlands; geografia, rotas, marcadores e enquadramento permanecem inalterados.
- Regenera apenas os derivados WebP do mapa e preserva os panoramas territoriais.
- Substitui exclusivamente no Atlas 18 emblemas por derivados WebP 256 × 256 com transparência; os emblemas gerais do site permanecem intactos.
- Mantém Athlétia exatamente como aprovado e preserva temporariamente o emblema opaco anterior de Botáfia, pendente de reexportação íntegra.
- Restaura as margens responsivas do herói do Diário.
- Normaliza referências técnicas para Lore Master v3.0.6, Dossiê v2.6, CC-27 v1.3 e CC-31 v1.0.
- Corrige o pipeline de produção para Node 22.12.0, requisito do Astro 7.1.1.

Gate local: **PASS** — Fases 0–6, build de 48 páginas e auditoria do artefato aprovados.

Verificação pública dos emblemas transparentes: **PASS** — 19/19 estados carregados corretamente; 18/19 com transparência e Botáfia preservada como exceção opaca declarada.

Verificação pública de produção: **PASS** — PR #8 integrado, deploy nº 35 aprovado, 48/48 URLs do sitemap com HTTP 200, Atlas v1.1 e Diário sem overflow ou imagens quebradas no desktop observado.

## v1.2.12 — 2026-07-19

Status: **superada em preview pela v1.2.13; não integrada à `main`**.

- Ativa os masters SVG, os derivados monocromáticos e os PDFs técnicos v1.0 dos oito Fervores.
- Sincroniza os dois ponteiros públicos do site com o `roc-source-registry v1.2.12`.
- Remove o bloqueio acidental de indexação e acrescenta URL canônica a todas as páginas.
- Introduz um gate local repetível para os 19 Reinos, 19 Guardiões, 57 hotspots, CC-28C, CC-31 e ativos vetoriais.
- Publica o manifesto operacional v1.2.12 sem declarar antecipadamente a verificação pública.

Gate local: **PASS** — validação de conteúdo íntegra e 46 páginas compiladas.

Verificação pública: **PENDENTE** — somente após aprovação e integração na `main`.

## v1.2.11 — 2026-07-19

Status: **publicado e verificado**.

- Sincroniza o site com o `roc-source-registry.v1.2.11.json`.
- Atualiza as referências ao Índice Mestre e às Fontes Ativas `v1.2.11`.
- Preserva o cânone constitucional no Lore Master `v3.0.6`.
- Preserva o Dossiê dos 19 Guardiões `v2.6` e a Story Bible `v2.2 — CC-31`.
- Confirma o Legado como excepcional e herdado, sem rótulo universal de raridade.
- Confirma Nego como único portador dominante de Legado e Admiral e Eldric como portadores secundários.
- Mantém Paollo com Fé/Unidade e Saciros–Colorado com Unidade/Raiva.
- Mantém como pendência visual os masters SVG e monocromáticos dos glifos.

Gate local: **PASS** — 46 páginas compiladas, 19 rotas de Reinos, 19 rotas de Guardiões, 19 slugs únicos, zero ocorrência das camadas vedadas pela CC-28C e matriz crítica de Fervores conferida nos dois datasets.

Verificação pública: **PASS** — implantação concluída com sucesso, 40 URLs críticas responderam com HTTP 200 e a página pública de Fervor confirmou o registry `v1.2.11`, Nego como único dominante de Legado e Admiral e Eldric como portadores secundários.
