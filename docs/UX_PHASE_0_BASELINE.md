# Realm of Crests — UX Phase 0 Baseline

Data: 2026-07-19

Branch: `agent/immersive-phase-0`

Escopo: correções de lançamento e baseline técnico, sem alteração da experiência pública.

## Estado verificado

- Build estático Astro: 46 páginas.
- Reinos: 19 rotas e 19 slugs únicos.
- Guardiões: 19 rotas e 19 vínculos únicos com Reinos.
- Atlas panorâmico: 19 panoramas e 57 hotspots.
- Códice Visual do Fervor: matriz raster 8 × 5 preservada.
- Masters técnicos: 8 SVG-base, 16 SVG monocromáticos, 8 PDFs e 16 PNG transparentes 4096 px.
- CC-28C: nenhuma camada vedada nos dados públicos ativos.
- CC-31: Nego com Legado dominante; Admiral e Eldric com Legado secundário.

## Correções da Fase 0

1. Substituição de `noindex, nofollow` por indexação pública explícita.
2. Inclusão de URL canônica em todas as páginas.
3. Sincronização da página de Fervor e dos dois ponteiros `sources.json` com o registry v1.2.12.
4. Manifesto operacional v1.2.12 coerente com os masters vetoriais ativos.
5. Gate `npm run validate` para prevenir regressões de conteúdo e governança.

## Baseline de arquitetura

- Framework: Astro 5, saída estática.
- JavaScript comum gerado: ClientRouter com aproximadamente 5,3 kB gzip no build de referência.
- Dependências de runtime declaradas: apenas Astro.
- Deploy: GitHub Pages a partir de `main`; a branch da Fase 0 não altera o site público.

## Limites desta etapa

- Não inclui a nova home narrativa.
- Não unifica ainda Atlas cartográfico e Atlas panorâmico.
- Não modifica panoramas, retratos, mapa ou glifos.
- Não declara Lighthouse ou Core Web Vitals sem medição em navegador.
- A verificação pública permanece pendente até a integração aprovada na `main`.

## Próximo gate

Após aprovação da Fase 0: integrar a branch na `main`, aguardar o GitHub Pages e verificar as URLs públicas críticas antes de iniciar a Fase 1.
