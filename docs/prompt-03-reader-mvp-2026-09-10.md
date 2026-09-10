# Prompt 03 — Leitor MVP do Livro I

Data: 10/09/2026. **Implementação pronta para revisão; gate final não aprovado.**

## Base e ponto de parada

Consulta documental: Handoff CURRENT de 10/09/2026, Manual Operacional v1.0 e Prompt 03 v1.0. A implementação depende da sincronização mínima do Prompt 02, PR #16, commit `1ce116505882a55994a11d40bc30c3bb3958efd1`.

Branch de trabalho: `feat/prompt-03-reader-mvp-2026-09-10`. Base do PR: `fix/prompt-02-foundation-sync-2026-09-10`. É uma revisão empilhada sobre o PR #16; não deve ser integrada fora dessa ordem. A `main` consultada permanece em `fc86e558a55b59755c5ba11d03b6582c147b5537`. Nenhum merge ou deploy foi executado.

O trabalho para neste leitor MVP e na revisão do PR. Não autoriza a fase seguinte. O aceite depende de QA visual/interativo e de leitura real em smartphone. O navegador de prévia retornou `net::ERR_BLOCKED_BY_CLIENT`; não foi possível executar esse gate nem produzir screenshots válidos.

## Fonte exclusiva e liberação editorial

Somente `RoC_Livro_I_Site_Content_v0.1_2026-09-10.zip`, em `06_Ebook_Livro_I`, alimenta o leitor. SHA-256 do ZIP: `421c2a4da781002f150c78d42362ca55c169c428af981ddd9e8983b3881dbc3e`. Não houve consulta a DOCX ou outra fonte de prosa.

O pacote fornece 24 capítulos e 80.469 palavras. `integrationReady=true`; `publicReleaseProofComplete=false`. Isso permite integração de revisão, sem certificar publicação. `book.json` e os 24 Markdown foram extraídos sem alteração de bytes, permanecem ignorados pelo Git e não integram o PR. A revisão privada contém a prosa compilada; não é um EPUB nem deve ser hospedada publicamente.

O código fixa hashes de todos os 25 arquivos e o hash agregado `8f000222185bec1ad82649e5dbe949593ad854493e584bfedc5b2a2c792ba2d9`. Valida ordem, número, slug, permalink, idioma, frontmatter, UTF-8, parágrafos e ausência de arquivos extras. Uma futura fonte com prova final requer revisão explícita desses contratos.

## O que foi implementado

- Página do livro com folha de rosto tipográfica neutra, título, começar, continuar e índice completo. Não cria capa ilustrada ou representação canônica nova.
- HTML estático por capítulo; título público no formato romano — título. Nenhum rótulo editorial entra na prosa.
- Índice nativo recolhível, capítulo atual, anterior/próximo e retorno ao livro/portal. O corpo de outros capítulos não é carregado no documento atual.
- Layout próprio, sem HUD, áudio, canvas, animação de travessia ou roteador do portal.
- Dark Codex como padrão e tema claro opcional; fonte Georgia/serif, 20 px no desktop e 18 px em telas compactas, entrelinha 1,7 e coluna de até 70ch. Opção de texto ampliado.
- Chave `roc.reader.v1`: livro/hash, capítulo, parágrafo/fração, progresso aproximado, concluídos, tema e tamanho. Mudança de hash descarta progresso incompatível; storage indisponível não interrompe a leitura.
- Retomada por link e recarga, após fontes e layout; interação do usuário interrompe a restauração automática. Navegação direta para outro capítulo começa normalmente.
- HTML sem JavaScript mantém texto, índice e links. Controles que dependem de JavaScript só aparecem quando ele inicializa.
- Semântica, link de salto, foco visível, alvos de 44 px, redução de movimento, contraste de tokens e estilos de impressão.

## Arquivos

| Grupo | Arquivos criados ou alterados |
| --- | --- |
| Fonte e coleção | `src/content.config.ts`, `src/lib/book.server.mjs`, `scripts/lib/book-package.mjs`, `scripts/fixtures/book-i-integrity.json` |
| Leitura | `src/pages/livro/[...path].astro`, `src/layouts/ReaderLayout.astro`, `src/components/reader/ChapterIndex.astro`, `src/styles/reader.css` |
| Estado e interação | `src/scripts/reader.ts`, `src/lib/reader-state.mjs` |
| Integração | `src/components/Header.astro`, `src/pages/sitemap.xml.js`, `astro.config.mjs`, `.gitignore`, `package.json` |
| Gates | `scripts/validate-book.mjs`, `scripts/test-reader-state.mjs`, `scripts/lib/book-artifact.mjs`, `scripts/audit-dist.mjs` |
| CI | `.github/workflows/check.yml`, `.github/workflows/deploy.yml` |
| Documentação | `README.md`, `RELEASES.md`, este relatório |

O pipeline de deploy passa a executar `npm run check` antes do build de publicação, quando esta alteração for integrada. A edição do workflow não executou deploy. O workflow de PR usa Node 22.12.0. Os checks locais desta sessão usaram Node 24.19.0 / npm 11.9.0; o resultado remoto deve ser consultado no PR.

## Rotas de revisão

Todas recebem o prefixo `/realm-of-crests`. No modo público padrão, nenhuma destas rotas existe.

| Página | Caminho |
| --- | --- |
| Livro | `/livro/` |
| I | `/livro/1/sob-a-pedra/` |
| II | `/livro/2/o-retorno/` |
| III | `/livro/3/o-peso-humano/` |
| IV | `/livro/4/pedra-registro-e-ausencia/` |
| V | `/livro/5/a-fonte-de-aco/` |
| VI | `/livro/6/a-corte-fraturada/` |
| VII | `/livro/7/a-cobranca-de-bahea/` |
| VIII | `/livro/8/a-divisa/` |
| IX | `/livro/9/o-nome-que-falta/` |
| X | `/livro/10/a-margem-dos-vivos/` |
| XI | `/livro/11/a-primeira-fissura/` |
| XII | `/livro/12/o-eco-na-brasa/` |
| XIII | `/livro/13/a-segunda-prisao/` |
| XIV | `/livro/14/proveniencia/` |
| XV | `/livro/15/o-peso-dos-nomes/` |
| XVI | `/livro/16/a-voz-de-brina/` |
| XVII | `/livro/17/a-carta-das-nervuras/` |
| XVIII | `/livro/18/os-que-ficam/` |
| XIX | `/livro/19/a-hora-do-medo/` |
| XX | `/livro/20/a-vigilia/` |
| XXI | `/livro/21/a-direcao-da-raiva/` |
| XXII | `/livro/22/o-que-foi-cumprido/` |
| XXIII | `/livro/23/a-tira-mais-longa/` |
| XXIV | `/livro/24/o-caminho-de-vaskor/` |

## Gates e evidências

| Gate | Resultado / limite |
| --- | --- |
| `npm run check:reader` | PASS: validadores existentes, validação do pacote, 7 testes, build e auditoria |
| Fidelidade da fonte | PASS: 25 arquivos byte a byte, 24 hashes de corpo e agregado |
| Fidelidade do HTML | PASS: 5.778 parágrafos idênticos, em ordem, e 24 separadores de cena preservados |
| Rotas, canonicals, links e sitemap | PASS: conjunto exato de 73 páginas na revisão; 48 no modo padrão |
| `npm run check` padrão | PASS: sem rotas de livro ou prosa no artefato público |
| Publicação e isolamento | PASS: `release` bloqueado pelo pacote; `review` bloqueado em Actions público; arquivos editoriais ausentes do Git |
| Storage e preferências | PASS em 7 testes de lógica, incluindo vazio, JSON inválido, indisponibilidade, recarga de estado e isolamento do portal |
| Leitura sem JS | PASS estrutural: prosa, índice e navegação no HTML; teste interativo sem JS ainda pendente |
| Contraste | Tokens de texto/fundo entre 6,10:1 e 14,10:1 nos dois temas; não equivale a auditoria integral de acessibilidade |
| Desktop, tablet e smartphone estreito | PENDENTE: navegador bloqueou a prévia antes da inspeção |
| Tema claro/escuro, fonte e teclado no navegador | PENDENTE: implementação e testes de estado não substituem a interação real |
| Acesso direto, recarga no meio do capítulo e retomada reais | PENDENTE: rotas e estado validados, comportamento de rolagem depende do QA em navegador |
| PT-BR | PASS automático de idioma e fidelidade; revisão humana de leitura ainda pendente |
| Screenshots | Indisponíveis; não foram substituídos por mockups |

Auditoria final da revisão: CSS 173.187 B; JS 58.817 B; 129 imagens do portal referenciadas, 19.570.125 B. Orçamentos existentes preservados: CSS 300 kB, JS 450 kB, imagens 20 MB e HTML individual 260 kB. A contagem de 48 páginas foi estendida para conferir o conjunto exato das 25 rotas adicionais quando habilitadas, sem remover contratos anteriores.

O teste de estado comprova serialização/restauração dos dados, não a posição visual após scroll. A comparação do HTML comprova conteúdo disponível sem JS, não uma sessão de navegador com JS desabilitado. O gate final exige essas provas práticas.

## Correções e limitações encontradas

1. A transformação tipográfica padrão do Markdown alterava aspas/apóstrofos do original. `smartypants: false` preserva a fonte; o gate de HTML detecta futuras divergências. A versão instalada do Astro aceita a opção, mas emite aviso de depreciação; uma migração futura do processador deve manter a comparação integral.
2. A resolução da fonte no build usa a raiz do projeto, evitando buscar `book.json` dentro de `dist` após o empacotamento.
3. JSON inválido reinicializa o estado sem afirmar incorretamente que o armazenamento foi bloqueado.
4. O bloqueio `ERR_BLOCKED_BY_CLIENT` impede afirmar ausência de overflow, fluidez em aparelhos reais ou aprovação WCAG integral. Nenhuma captura visual foi inventada.
5. A prova pública do livro permanece incompleta na fonte autorizada. O PR contém somente implementação e metadados de integridade; a prosa não foi enviada ao GitHub.

## Como concluir o gate

Em ambiente privado que permita a prévia, revisar desktop, tablet e smartphone estreito nos dois temas, inclusive texto ampliado, teclado e redução de movimento. Ler um capítulo completo em smartphone, verificar conforto e ausência de overflow. Com storage vazio, iniciar e avançar; recarregar no meio; voltar à página do livro e retomar. Repetir com storage existente/indisponível e JavaScript desabilitado; abrir um capítulo por URL direta e verificar anterior/próximo e os extremos I/XXIV. Registrar evidências antes de aprovar este gate.

O pacote privado de demonstração inclui os 25 HTML e somente seus assets, com servidor Python local e instruções. Não é um endereço de produção. Nele, o retorno ao portal aponta ao site público existente; essa adaptação é apenas do pacote, não da aplicação. Não expor o servidor em rede pública.

## Fora desta fase

Livro Vivo, vídeo, áudio narrado, cenas 2D/3D, novas imagens de personagens/reinos, EPUB, redesenho do portal e mudança de domínio permanecem fora deste MVP. Nenhum deles é necessário para concluir o gate de leitura. A decisão de investimento visual pode ser tomada após validar esta experiência de leitura e a direção criativa correspondente.
