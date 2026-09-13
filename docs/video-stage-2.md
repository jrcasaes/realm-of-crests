# Etapa 2 — Vida nas encostas

Ativa exclusivamente o vídeo enviado pelo autor para a cena Vida nas encostas, abaixo do panorama da página de Victória. Nego e flâmula continuam estáticos. Nenhuma geração, alteração canônica ou publicação de manuscrito.

Arquivo: `public/assets/videos/victoria-encostas.mp4`, 1.045.800 bytes, H.264, 1280 × 720, aproximadamente 10 segundos, sem áudio. SHA-256 `bb00f6a9ee97f8e9bcadd0b6054657d5390768f33030005d088e1e6d08c9beb4`.

Reprodução por clique, controles nativos, poster, preload none e pausa fora de tela/aba/navegação. Movimento reduzido permanece estático até ação explícita. Sem dependência de URL de entrega temporária.

O teste vigente é `scripts/validate-video-stage2.mjs`, incorporado ao `npm run check`: confirma apenas um MP4, hash exato, somente uma rota com vídeo, ausência dos outros vídeos, base correto e controles. O teste `validate-video-stage1.mjs` permanece como registro do estado anterior (commit da etapa 1), não é o teste da configuração atual.

QA interativo em navegador não disponível neste ambiente; não alegar teste visual dos controles. Verificar deploy e integridade do arquivo público antes de declarar publicação concluída.
