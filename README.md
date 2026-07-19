# Realm of Crests — Site Oficial

Site estático em **Astro** com estética **Dark Codex**, publicado via **GitHub Pages**.
Conteúdo rastreável ao **LORE_MASTER_CANON v3.0.6**, ao **Dossiê Canônico dos 19 Guardiões v2.6**, à **Story Bible v2.2 CC-31 APPROVED** e ao **roc-source-registry v1.2.10**. As decisões CC-28C, CC-30 e CC-31 já estão incorporadas nessas fontes ativas.

Status: derivado operacional. O site não cria cânone. A correção **CC-28C** é obrigatória em `src/data/realms.json`: as seis camadas transferidas ao Apêndice Não Canônico não podem aparecer como dados canônicos ativos. O `nego-dossier-v1` permanece fonte de apoio com escopo restrito a Nego, Victória e direção visual de personagem; não possui autoridade constitucional.

Pacote sincronizado sob o registry **v1.2.10** em **2026-07-18**. O FULL LOCK VISUAL dos glifos é restrito à matriz raster 8 × 5, com PASS 40/40; PNG não substitui master SVG, e os masters SVG/monocromáticos permanecem pendentes. A CC-31 fixa a matriz dos dezenove e define o Legado como excepcional e herdado, sem rótulo universal de raridade: Nego é o único dominante, e Admiral e Eldric o manifestam como secundário. As verificações CC-28C e CC-30 permanecem vigentes.

---

## O que já está pronto

- Página inicial com manifesto e grade dos 19 reinos (revelação de arquivo ao rolar)
- Página individual de cada reino: emblema, Essence/Fervor/Gravity, nomenclatura em camadas, bioma e templo — tudo reconciliado com o cânone v3.0.6 e o registry v1.2.10
- Emblemas pendentes aparecem como "Selo Pendente" automaticamente; basta soltar o PNG na pasta certa para substituir (ver `public/assets/emblems/_CONVENCAO.md`)
- Deploy automático: todo push na branch `main` publica o site sozinho

## Estrutura

```
src/data/realms.json      ← dados dos 19 reinos (fontes: Lore Master v3.0.6 + Dossiê v2.6 + Story Bible v2.2; decisões CC-28C/CC-30/CC-31 incorporadas)
src/pages/                ← páginas (index, /reinos, /reinos/[slug])
src/styles/global.css     ← todo o design (CSS puro, tokens no :root)
public/assets/emblems/    ← PNGs dos emblemas (veja _CONVENCAO.md)
```

---

## Passo a passo — publicar o site (só na primeira vez)

Você vai precisar de uma conta no GitHub (github.com). Depois:

**1. Criar o repositório**
   - No GitHub, clique em **New repository**
   - Nome: `realm-of-crests` (exatamente assim)
   - Deixe **Public** marcado e clique **Create repository**

**2. Ajustar uma linha do projeto**
   - Abra o arquivo `astro.config.mjs`
   - Troque `SEU-USUARIO` pelo seu nome de usuário do GitHub
   - Exemplo: se seu usuário é `hildebrando`, fica `https://hildebrando.github.io`

**3. Enviar os arquivos**
   - Na página do repositório recém-criado, clique em **uploading an existing file**
   - Arraste TODO o conteúdo desta pasta (incluindo as pastas `.github`, `src`, `public`)
   - Clique **Commit changes**

**4. Ativar o GitHub Pages**
   - No repositório, vá em **Settings → Pages**
   - Em **Source**, escolha **GitHub Actions**
   - Pronto. Em 2–3 minutos o site estará em:
     `https://SEU-USUARIO.github.io/realm-of-crests/`

**Teste rápido:** abra o endereço acima. Se aparecer a página com "REALM OF CRESTS" em ouro, funcionou.

## Atualizações do dia a dia

- **Novo emblema pronto?** Suba o PNG em `public/assets/emblems/` com o nome da convenção. Commit → site atualiza sozinho.
- **Correção de texto?** Edite `src/data/realms.json` direto no GitHub. Commit → site atualiza sozinho.

## Rodar localmente (opcional)

Só se quiser ver o site no seu computador antes de publicar:

```bash
npm install
npm run dev
```

Abra http://localhost:4321/realm-of-crests/
