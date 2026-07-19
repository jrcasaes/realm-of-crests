# Fase 1 — Recorte vertical do Atlas Imersivo

Status: `IMPLEMENTADO_LOCALMENTE`  
Branch: `agent/immersive-phase-1`  
Base: Fase 0 canônica (`agent/immersive-phase-0`)

## Objetivo

Transformar o Atlas de uma ilustração com links em um instrumento de exploração: o visitante seleciona um território, recebe contexto sem abandonar o mapa e decide quando aprofundar a navegação.

## Loop de experiência

1. O prólogo apresenta o mapa como parte da narrativa.
2. O visitante seleciona um dos dezenove selos pelo mapa, índice, teclado ou toque.
3. O dossiê responde com panorama, Emblema, Guardião, Essência, Fervor, Gravity, templo e bioma.
4. O visitante abre o fólio do Reino ou o dossiê do Guardião quando desejar.
5. A rolagem revela três leis cartográficas em sequência: Solo Ancestral, Caminhos Sagrados e Fronteira da Ruína.

## Decisões de UX

- Selecionar um selo não força uma troca de página.
- A roda do mouse só controla o zoom com `Ctrl` ou `Cmd`; a página não aprisiona a rolagem.
- O índice territorial funciona como alternativa aos marcadores pequenos em telas de toque.
- Setas, `Home` e `End` percorrem os dezenove Reinos.
- `+`, `-`, `0` e `Esc` controlam ou restauram o enquadramento quando o mapa está em foco.
- `prefers-reduced-motion` remove pulsos, transições e revelações animadas.
- Um link de salto global permite ignorar a navegação principal.

## Critérios verificados

- Gate canônico da Fase 0 preservado.
- Gate de experiência da Fase 1 com 19 selos, coordenadas e assets correspondentes.
- Build estático das 46 páginas.
- HTML sem erros de whitespace no diff.
- Layout projetado para três faixas: desktop, tablet e celular.

## Limite desta entrega

Este recorte não adiciona áudio, WebGL, gamificação persistente nem tracking. Esses recursos devem entrar somente depois que mapa, leitura e navegação forem aprovados em revisão visual humana.
