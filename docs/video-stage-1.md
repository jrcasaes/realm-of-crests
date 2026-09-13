# Etapa 1 — imagens de abertura e componente

Escopo autorizado: somente código e três imagens de abertura fornecidas pelo autor, extraídas dos vídeos. Nenhum MP4 integra esta alteração. Os clipes originais permanecem preservados no trabalho anterior.

`LivingScene` usa `enabled = false` por padrão. Sem ativação explícita, não renderiza vídeo, link MP4 ou botão de reprodução e não inicia observadores. As páginas exibem somente os posters estáticos, com texto alternativo, dimensões explícitas e carregamento lazy.

- Nego: seção Presença do dossiê.
- Vida nas encostas e flâmula: abaixo do panorama de Victória.
- Nenhuma alteração de cânone, brasão oficial existente, fonte pública ou manuscrito.
- Nenhuma integração dos PRs de fundação/leitor.

Verificação: executar `npm run check` e `node scripts/validate-video-stage1.mjs`. QA interativo em navegador não disponível neste ambiente; não alegar validação visual das páginas.

As etapas de envio e ativação dos vídeos são separadas e não pertencem a este PR.
