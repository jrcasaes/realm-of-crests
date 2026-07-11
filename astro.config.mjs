import { defineConfig } from 'astro/config';

// ─── CONFIGURAÇÃO DO GITHUB PAGES ────────────────────────────────
// Troque apenas estas duas linhas quando criar o repositório:
//   SITE = 'https://SEU-USUARIO.github.io'  (seu usuário do GitHub)
//   BASE = '/realm-of-crests'               (o nome exato do repositório)
const SITE = 'https://SEU-USUARIO.github.io';
const BASE = '/realm-of-crests';
// ─────────────────────────────────────────────────────────────────

export default defineConfig({
  site: SITE,
  base: BASE,
});
