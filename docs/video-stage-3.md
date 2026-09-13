# Etapa 3 — Nego

Ativa o vídeo enviado pelo autor na seção A presença soberana da página de Nego. Vida nas encostas permanece ativo; a flâmula permanece estática, reservada para a etapa 4.

Arquivo: `public/assets/videos/nego-presenca.mp4`, 1.510.080 bytes, H.264, 810 × 1080, 24 fps, aproximadamente 10 segundos, sem áudio. SHA-256 `05362eab60fd89679180ec9f818189cc25a005175d83a09b8086e167540f5474`.

Usa o componente existente: reprodução por clique, controles nativos, poster, preload none e pausa fora de tela/aba/navegação. Sem geração nova nem dependência de URL temporária.

O teste vigente é `scripts/validate-video-stage3.mjs`, incorporado ao `npm run check`: confirma os dois MP4, seus hashes, as rotas corretas, os controles e a ausência do vídeo da flâmula. Os validadores das etapas 1 e 2 permanecem como registro dos estados anteriores.

Confirmar a publicação e a integridade do arquivo público antes de declarar esta etapa concluída. A verificação de HTML e arquivo não equivale a uma avaliação visual da reprodução em navegador.
