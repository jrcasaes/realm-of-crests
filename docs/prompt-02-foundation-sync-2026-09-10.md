# Prompt 02 — Sincronização mínima da fundação
Data: 10/09/2026. Estado: entregue para revisão em branch/PR; não publicado.

## Base e autoridade

Base de código: `main` em `fc86e558a55b59755c5ba11d03b6582c147b5537`, obtida novamente do GitHub antes da edição. Handoff e Manual Operacional v1.0 recuperados antes do trabalho; relatório do Prompt 01 e instrução integral do Prompt 02 confrontados com essa base.

Fontes por competência: Lore Master v4.0 limpa (leis 3.5, 3.11–3.15, 3.21, 8.1 e 8.5); Dossiê dos 19 Guardiões v4.1 (tabelas de Essência e Fervores); Governança Mestra v1.4.2 (sucessão limpa); Fontes Ativas v2.20.3 (ponteiros por competência). Story Bible v2.2 limpa é um ponteiro de identidade dramática, não o antigo HTML CC-31 de mesma numeração.

Nenhum documento interno, ID privado, manuscrito ou asset novo foi copiado para o repositório. Versão vigente não equivale a autorização de publicação de conteúdo integral.

## Diff conceitual

| Guardião | Fervores anteriores: dominante / secundário | Fervores atuais |
| --- | --- | --- |
| Malino | Unidade / Fé | Fé / Unidade |
| Florius | Orgulho / Fé | Orgulho / Legado |
| Tuskar | Orgulho / Fé | Orgulho / Legado |
| Paollo | Fé / Unidade | Legado / Fé |
| Villa | Esperança / Unidade | Esperança / Legado |
| Solari | Esperança / Orgulho | Legado / Esperança |
| Eldric | Luto / Legado | Legado / Luto |
| Saciros | Unidade / Raiva | Esperança / Raiva |

| Guardião | Essência anterior | Essência atual |
| --- | --- | --- |
| Malino | Maré Coletiva | Continuum Consagrado |
| Solari | Chama Ascendente | Memória da Raiz |
| Saciros | Renovação Caótica | Chama Ascendente |

Os outros 11 pares e 16 valores de Essência foram conferidos e preservados. A ordem territorial do site não foi convertida na ordem documental do Dossiê ou do mapa.

Orgulho e Unidade deixam de ser classificados como variantes de Fé: são autônomos, com afinidade estrutural. Os oito tipos universais permanecem. A coorte atual tem sete tipos dominantes distintos; a ausência de Unidade como dominante não extingue esse Fervor.

A lista pública de Legado passa a quatro dominantes (Nego, Paollo, Solari, Eldric) e quatro secundários (Admiral, Tuskar, Villa, Florius), sem transformar a distribuição em quota universal. A página consome a lista central, validada contra o extrato do Dossiê.

A Ruína deixa de ser apresentada como resultado automático de massa crítica de Fervor corrompido. O texto passa a distinguir deformação do Fervor e infiltração da força antissoberana por vínculos feridos.

Os componentes já existentes propagam os novos pares para fichas, filtros, glifos, assinaturas de cor e recomendações. Eventuais cores derivadas que mudam são consequência dos dados corretos; não houve nova paleta, edição de CSS ou redesign.

## Arquivos alterados

| Grupo | Arquivos |
| --- | --- |
| Dados públicos | `src/data/realms.json`, `src/data/fervors.json`, `src/data/sources.json`, espelho `sources.json` |
| Referências e derivação | `src/lib/canon.js`, `src/lib/guardians.js` |
| Rótulos de escopo | `src/pages/reinos/[slug].astro`, `src/pages/guardioes/[slug].astro`, `src/pages/sistemas/gravity.astro`, `src/pages/sistemas/ascensao.astro` |
| Correções de Fervor | `src/pages/sistemas/fervor.astro` |
| Contratos | `scripts/validate-phase0.mjs`, `scripts/validate-phase3.mjs`; novo `scripts/lib/foundation-contract.mjs` |
| Registro | `README.md`, `RELEASES.md`; este documento |

A proveniência anterior dos registros territoriais permanece em `historicalSourceRefs` / `previousCanonReview`. A revisão atual explicita `canonReviewScope: ["essence", "fervor"]`. O catálogo de fontes declara `fullSiteReview: false` e mantém pendências explícitas. Os rótulos visíveis não apresentam a atualização de ponteiros como recertificação integral.

## Deliberadamente não alterado

- Astro 7.1.1, pacote 1.8.3, dependências, lockfile, arquitetura, Pages e caminho-base.
- As 48 rotas, canonical/sitemap, 19 Reinos, 19 retratos, 57 hotspots, mapa v1.1, geografia, panoramas, brasões e glifos.
- Home, HUD, áudio, Ritual, Diário e interações, salvo resultados derivados da matriz corrigida.
- Gravity e Ascensão: apenas os rótulos de fonte passam a indicar base histórica e revisão pendente. Não foi inventado substituto para os estados ou a legenda visual.
- Outros trechos de Fervor e as duas narrativas públicas detalhadas: sem reescrita geral e sem declaração de nova revisão. Isso inclui a antiga formulação de Nego como totalidade do Reino, que requer revisão editorial dirigida; não se certifica sua compatibilidade integral com a linha limpa.
- Campos territoriais, templos, camadas de nomeação e Visual Locks não abrangidos pelo extrato de identidade.
- `src/data/guardians.json`: fontes anteriores são conservadas como proveniência histórica pelo módulo de derivação, sem reapresentação como referência ativa de Essência/Fervores.
- Cópias legadas da raiz (`BaseLayout.astro`, `global.css`, `realms.json`), manifests versionados e registros anteriores de RELEASES.
- Workflows, proteção de branch e deploy: as lacunas de automação da auditoria continuam pendentes; não são corrigidas por uma troca de contratos canônicos.
- Nenhuma Collection, rota do livro, prosa, vídeo, imagem nova, 3D, domínio ou migração de stack.

## Gates e evidências

| Verificação | Resultado |
| --- | --- |
| `npm run check` | PASS: 11 validators, build e auditoria de artefato |
| Matriz v4.1 | PASS: 19 Essências e 19 pares exatos, não apenas contagem de famílias |
| Regressões negativas | PASS: rejeita par antigo, Essência antiga, exclusão de Unidade, classificação antiga de Orgulho, quota antiga de Legado e falsa revisão integral |
| Diff semântico territorial | PASS: exatamente 8 pares e 3 Essências; valores originais dos demais campos preservados, exceto metadados de revisão/proveniência |
| Continuidade | PASS: 19 inícios × 64 afinidades, sem repetição indevida, autoindicação ou ciclo A ↔ B |
| Artefato | PASS: 48 HTML, 48 canonicals únicos, links e assets íntegros |
| Imagens referenciadas | 129; 19.570.125 B / 20.000.000 B |
| CSS / JS | 166.954 B / 54.085 B; inalterados e dentro dos limites |
| `git diff --check` | PASS |

Os gates antigos de contagem/coorte foram substituídos por contratos exatos da fonte sucessora, não removidos ou flexibilizados. Os demais validators permanecem intactos. Não se alterou o orçamento nem a expectativa de 48 páginas.

Ambiente local: Node 24.19.0 / npm 11.9.0; CI de produção configurado em Node 22.12.0. O aviso npm de configuração `http-proxy` não impediu o check. Este resultado local não equivale a execução remota no mesmo runtime, nem a QA visual ou prova integral de acessibilidade.

## Prontidão e ponto de parada

**Fundação tecnicamente pronta, dentro do escopo mínimo, para receber o trabalho do leitor.** Isso não significa que todo o portal esteja canonicamente revalidado nem que o Livro I esteja liberado para exposição pública.

O leitor deverá permanecer isolado dos textos e estados legados; o pacote autorizado do Livro I continua sendo sua fonte exclusiva. Nenhum byte do ZIP foi alterado ou importado nesta etapa. A auditoria registra autorização de integração e prova final de publicação ainda incompleta no manifesto do pacote.

Antes de publicar o livro no repositório público, obter liberação editorial explícita. Uma branch pública já expõe seu conteúdo, mesmo sem merge. A cobertura geral de check em PR e a dependência do deploy em relação ao check completo seguem como preparação necessária da integração, conforme o Prompt 01.

Branch: `fix/prompt-02-foundation-sync-2026-09-10`. Destino do PR: `main`. Sem merge, sem deploy e sem mudança direta de `main`.

**Gate do Prompt 02: parar aqui. O Prompt 03 exige nova autorização autoral explícita.**
