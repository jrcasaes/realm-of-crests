# Fase 2 — Loop de exploração

## Objetivo

Transformar a entrada do Codex em uma jornada contínua: **portal → escolha de rota → descoberta territorial → registro local → continuação**. A experiência continua totalmente estática e compatível com GitHub Pages.

## Contrato da jornada

- A home funciona como portal cinematográfico, não como índice enciclopédico.
- O Atlas é a rota principal de descoberta; Guardiões e Sistemas são rotas paralelas de aprofundamento.
- Uma descoberta é registrada ao abrir um Reino ou selecionar deliberadamente seu selo no Atlas.
- Hover e foco isolados não contam como descoberta.
- O progresso usa `localStorage`, na chave versionada `roc.exploration.v1`.
- Nenhum estado é enviado, sincronizado ou associado a uma conta.
- A ausência ou indisponibilidade de `localStorage` não bloqueia conteúdo nem navegação.

## HUD global

O Registro do Viajante acompanha todas as páginas e apresenta:

- contador `0/19`;
- dezenove sigilos de estado;
- atalho para a última descoberta;
- explicação direta sobre privacidade;
- controle de ambiência sonora.

O componente persiste durante as transições internas do Astro para evitar rupturas na percepção da jornada.

## Scrollytelling

A sequência introdutória revela três verdades em camadas:

1. **Crest** — lei territorial e condensação de identidade;
2. **Guardião** — presença moldada por povo, Fervor e gravidade;
3. **Ruína** — fronteira em que realidade e memória deixam de ser estáveis.

Cada capítulo troca a imagem focal e oferece uma rota de aprofundamento. Com `prefers-reduced-motion`, as trocas permanecem imediatas e sem animação.

## Áudio e acessibilidade

- A ambiência nasce desligada e só começa após clique explícito.
- O som é síntese procedural discreta; não é apresentado como artefato canônico.
- O controle usa `aria-pressed` e rótulo textual de estado.
- O loop funcional não depende de som, animação, mouse ou armazenamento local.

## Critérios de aceite

- 19 Reinos representados sem duplicidade;
- progressão registrada somente por ação deliberada ou visita de página;
- continuação aponta para o último Reino conhecido;
- home expõe Atlas, Guardiões e Sistemas;
- scrollytelling possui três capítulos e alternativa de movimento reduzido;
- áudio sem autoplay;
- `npm run check` valida Fases 0, 1 e 2 e gera as 46 páginas.
