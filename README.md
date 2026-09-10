# Realm of Crests — Site Oficial

Site estático em **Astro** com estética **Dark Codex**, publicado via **GitHub Pages**.
Sincronização mínima de 10/09/2026: **Lore Master v4.0 limpa**, **Dossiê dos 19 v4.1** e ponteiros de **Story Bible v2.2 limpa** / **Fontes Ativas v2.20.3**. A revisão cobre Essência e Fervores dos 19 registros, autonomia de Orgulho/Unidade e a relação entre corrupção e Ruína. Não certifica revisão integral do portal.

Status desta entrega: **Prompt 03 — leitor MVP em revisão, dependente da fundação do Prompt 02, sem publicação**. Baseline publicado: pacote 1.8.3 e manifesto operacional **v1.2.18**, preservados. O site é derivado e não cria cânone. Versão de pacote, fechamento operacional e versão de fonte são eixos distintos.

A correção **CC-28C** permanece obrigatória em `src/data/realms.json`: as seis camadas transferidas ao Apêndice Não Canônico não podem reaparecer como dados canônicos ativos. As referências antigas nos dossiês detalhados são proveniência histórica, não autoridade produtiva; esses textos e os Visual Locks não foram revalidados nesta etapa. O FULL LOCK VISUAL dos glifos permanece na matriz raster 8 × 5, com PASS 40/40; os masters vetoriais v1.0 são derivados técnicos de topologia-base.

---

## O que já está pronto

- Página inicial e arquivos dos 19 Reinos e 19 Guardiões.
- Fólios territoriais com emblema, Essence, Fervores, Gravity, Âncora territorial e panorama WebP responsivo.
- Atlas canônico com 19/19 emblemas transparentes e 57 pontos interpretativos.
- Sistemas públicos de Fervor, Sovereign Gravity e Ascensão, sem escala de poder ou criação de estado canônico.
- Primeira Travessia, continuidade contextual e Diário com memória local privada.
- Oito famílias de Fervor com Códice raster 8 × 5, masters SVG e derivados monocromáticos.
- Deploy automático pelo GitHub Pages a cada integração na branch `main`.

## Estrutura

```
src/data/realms.json      ← Essência/Fervores: Dossiê v4.1; demais campos preservados, revisão pendente
src/data/sources.json     ← versões vigentes, escopo parcial e referências históricas (espelho na raiz)
src/pages/                ← páginas de Reinos, Guardiões, Atlas, Sistemas, Ritual e Diário
src/components/           ← componentes da experiência e continuidade
src/lib/                  ← seleção de rotas, Fervor e utilitários compartilhados
src/styles/global.css     ← design do portal (CSS puro, tokens no :root)
src/styles/reader.css     ← design isolado do leitor
public/assets/atlas/      ← derivados responsivos de panoramas e emblemas do Atlas
public/assets/emblems/    ← emblemas publicados (veja _CONVENCAO.md)
public/assets/fervor/vector/ ← masters SVG, PDF e exports monocromáticos 4096 px
scripts/                  ← gates das Fases 0–7.1.3 e auditoria do build
```

---

## Desenvolvimento e validação

```bash
npm ci
npm run dev
```

Abra http://localhost:4321/realm-of-crests/

Antes de abrir um PR, execute o gate completo:

```bash
npm run check
```

Esse comando valida o conteúdo e os contratos das Fases 0–7.1.3, incluindo a matriz exata de Essência/Fervores do Dossiê v4.1, gera as 48 páginas e audita canonicals, links, assets e orçamento visual. A publicação ocorre somente após integração revisada na `main`; o workflow `.github/workflows/deploy.yml` preserva o endereço oficial em https://jrcasaes.github.io/realm-of-crests/.

## Limites da sincronização

`canonReviewScope` restringe a nova revisão a `essence` e `fervor`; `historicalSourceRefs` e `previousCanonReview` preservam a proveniência anterior. O rodapé identifica a sincronização como parcial. Gravity e Ascensão conservam a referência histórica, explicitamente pendente, sem receber um selo cosmético de Lore v4.0.

Detalhamento da fundação: [entrega do Prompt 02](docs/prompt-02-foundation-sync-2026-09-10.md).

## Leitor MVP — Prompt 03

Leitor estático com página do livro, índice e 24 capítulos, temas escuro/claro, fonte ajustável e continuidade em armazenamento local separado do portal. A prosa e a navegação básica funcionam sem JavaScript. Não há Livro Vivo, vídeo, 3D ou EPUB nesta entrega.

Por padrão, `ROC_READER_MODE=off`: o build mantém 48 páginas e não inclui o Livro I. Para revisão privada, extraia **somente** `book.json` e `content/livro-i/` do ZIP autorizado `RoC_Livro_I_Site_Content_v0.1_2026-09-10.zip` para a raiz do checkout, preservando os bytes. Esses arquivos são ignorados pelo Git; não os adicione à força.

```bash
npm run check:reader
ROC_READER_MODE=review PUBLIC_ROBOTS=noindex npm run dev
```

O modo de revisão gera 73 páginas, incluindo `/realm-of-crests/livro/` e 24 capítulos. Ele é bloqueado em GitHub Actions público. O pacote tem `integrationReady: true` e `publicReleaseProofComplete: false`: não deve ser publicado. `noindex` é apenas metadado, não controle de acesso; mantenha a revisão privada. O modo `release` falha com este pacote. Uma futura liberação exige fonte editorial autorizada e revisão dos hashes, não a edição local de um sinalizador.

Gates automatizados locais: **PASS**. QA visual/interativo em desktop, tablet e smartphone: **pendente**, por bloqueio do navegador de prévia. Não há aprovação final de leitura em smartphone. [Entrega, rotas, evidências e ponto de parada do Prompt 03](docs/prompt-03-reader-mvp-2026-09-10.md).
