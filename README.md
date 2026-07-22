# Realm of Crests — Site Oficial

Site estático em **Astro** com estética **Dark Codex**, publicado via **GitHub Pages**.
Conteúdo rastreável ao **LORE_MASTER_CANON v3.0.6**, ao **Dossiê Canônico dos 19 Guardiões v2.6**, à **Story Bible v2.2 CC-31 APPROVED** e ao **roc-source-registry v1.2.12**. As decisões CC-28C, CC-30 e CC-31 já estão incorporadas nessas fontes ativas.

Status: **produção verificada**, pacote 1.8.3 e manifesto operacional **v1.2.18**. O site é um derivado de apresentação e não cria cânone. O `roc-source-registry v1.2.12` continua sendo o ponteiro das fontes canônicas; a numeração do manifesto acompanha somente as entregas operacionais do site.

A correção **CC-28C** permanece obrigatória em `src/data/realms.json`: as seis camadas transferidas ao Apêndice Não Canônico não podem reaparecer como dados canônicos ativos. O `nego-dossier-v1` continua restrito a Nego, Victória e direção visual de personagem, sem autoridade constitucional. O FULL LOCK VISUAL dos glifos permanece na matriz raster 8 × 5, com PASS 40/40; os masters vetoriais v1.0 são derivados técnicos de topologia-base.

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
src/data/realms.json      ← dados dos 19 reinos (fontes: Lore Master v3.0.6 + Dossiê v2.6 + Story Bible v2.2; decisões CC-28C/CC-30/CC-31 incorporadas)
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

Esse comando valida o conteúdo e os contratos das Fases 0–7.1.3, gera as 48 páginas e audita canonicals, links, assets e orçamento visual. A publicação ocorre somente após integração revisada na `main`; o workflow `.github/workflows/deploy.yml` preserva o endereço oficial em https://jrcasaes.github.io/realm-of-crests/.
