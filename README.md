# Realm of Crests — Site Oficial

Site estático em **Astro** com estética **Dark Codex**, publicado via **GitHub Pages**.
Sincronização mínima de 10/09/2026: **Lore Master v4.0 limpa**, **Dossiê dos 19 v4.1** e ponteiros de **Story Bible v2.2 limpa** / **Fontes Ativas v2.20.3**. A revisão cobre Essência e Fervores dos 19 registros, autonomia de Orgulho/Unidade e a relação entre corrupção e Ruína. Não certifica revisão integral do portal.

Status desta entrega: **Prompt 02 — sincronização mínima para revisão em PR, sem publicação**. Baseline publicado: pacote 1.8.3 e manifesto operacional **v1.2.18**, preservados. O site é derivado e não cria cânone. Versão de pacote, fechamento operacional e versão de fonte são eixos distintos.

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
src/styles/global.css     ← todo o design (CSS puro, tokens no :root)
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

Detalhamento, gates, pendências e ponto de parada: [entrega do Prompt 02](docs/prompt-02-foundation-sync-2026-09-10.md). O leitor não foi implementado. A etapa termina em PR, sem merge; Prompt 03 exige autorização explícita.
