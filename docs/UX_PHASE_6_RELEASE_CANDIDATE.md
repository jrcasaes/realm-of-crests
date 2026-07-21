# Fase 6 — Hardening e release candidate

## Objetivo

Transformar a experiência acumulada nas Fases 0–5 em um artefato estático publicável, verificável e reversível. Esta fase não acrescenta uma nova camada de lore nem altera o cânone: ela reduz riscos de acesso, desempenho, indexação e regressão.

## Contratos do release candidate

- `agent/immersive-phase-6` parte exclusivamente da Fase 5.
- A prévia usa `/realm-of-crests/previews/phase-6/` e recebe `noindex, nofollow`.
- A produção e todas as prévias anteriores são recompostas no mesmo artefato do GitHub Pages.
- Nenhuma integração na `main` acontece durante a revisão.
- Nenhum documento-fonte, identificador privado ou dado do visitante é publicado.

## Acessibilidade

- Um único `h1` por página e destino de foco explícito para o skip link.
- Estados de foco para links, botões, campos, seletores, áreas resumidas e elementos com `tabindex`.
- Alvos mínimos de 44 px em dispositivos de toque.
- Texto discreto elevado para contraste AA sobre as superfícies principais.
- Modos `prefers-reduced-motion`, `prefers-contrast`, `forced-colors` e impressão.
- O modo Sereno interrompe o loop do campo de brasas; abas ocultas também suspendem o trabalho visual.

## Desempenho percebido

- O Atlas não antecipa panoramas de múltiplos megabytes sem intenção do visitante.
- Hover territorial usa atraso de intenção e é desativado quando `Save-Data` está ativo.
- Mapa de alta resolução não é carregado em economia de dados.
- Imagens críticas preservam dimensões; trocas editoriais usam decodificação assíncrona.
- Orçamentos pós-build: HTML individual abaixo de 260 KB, CSS total abaixo de 300 KB e JavaScript hidratado abaixo de 450 KB.

## Descoberta e compartilhamento

- Canonical, Open Graph, Twitter Card e JSON-LD em todas as páginas.
- `site.webmanifest` com identidade e cores do Codex.
- Sitemap estático com 48 URLs: 10 rotas estruturais, 19 Reinos e 19 Guardiões.
- `robots.txt` é produzido por ambiente: prévias bloqueadas; produção liberada e apontando para o sitemap.

## Gates automatizados

`npm run check` executa:

1. validadores canônicos e de experiência das Fases 0–5;
2. contrato de hardening da Fase 6;
3. build completo do Astro;
4. auditoria do `dist` para metadados, estrutura, imagens, links, assets, canonicals, sitemap, robots e orçamentos.

O build desativa somente a telemetria do Astro, mantendo o artefato reproduzível em CI e ambientes locais restritos.

O toolchain do release candidate usa Node 22 e Astro 7.1.1. Astro permanece em `devDependencies`: o GitHub Pages recebe somente arquivos estáticos e não carrega dependências de runtime.

## Checklist anterior à main

- [ ] Workflow da Fase 6 verde no PR draft.
- [ ] Prévia pública validada em desktop e viewport estreita.
- [ ] Navegação por teclado verificada em Atlas, Ritual e Diário.
- [ ] Persistência e exclusões independentes verificadas.
- [ ] Metadados `noindex` confirmados na prévia.
- [ ] Aprovação explícita para integração na `main`.
- [ ] Tag e ponto de restauração definidos antes do merge.

## Fase 6.1 — errata cartográfica

- O master cartográfico avança para v1.1 por errata textual derivada do cânone já consolidado.
- A geografia, as rotas, os marcadores, os territórios e o enquadramento permanecem inalterados.
- O verbete Woundlands deixa de atribuir soberania à Ruína e passa a registrar instabilidade de memória e orientação.
- Apenas os dois WebP do mapa foram regenerados; panoramas territoriais e emblemas permanecem intactos.
- O herói do Diário volta a herdar as margens responsivas de `wide-wrap` em desktop e mobile.
