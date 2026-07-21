# Fase 7 — Continuidade Viva

Status: **Fases 7.0 e 7.1 encerradas em produção; micropatch visual 7.1.3 em validação**. Micropatches 7.1.1 e 7.1.2 publicados em 2026-07-21.

Implementação de produção: `285bec7` (Fases 7.0–7.1), `c356cae` (7.1.1) e `2870cb1` (7.1.2). Registro operacional consolidado no manifesto v1.2.17.

## 7.0 — Saneamento técnico

- O gate reconhece os 19 emblemas transparentes e preserva Botáfia exatamente como publicado.
- Os fólios dos Reinos servem os panoramas WebP responsivos de 960 e 1536 px; os PNGs de origem deixam de ser referenciados pelo HTML.
- O Atlas amplia metadados editoriais abaixo de 0,62 rem no desktop.
- O Diário mantém sua geometria, mas oculta os contadores iniciais até ler o estado local, eliminando o lampejo `0 / não definido`.
- A auditoria pós-build mede imagens realmente referenciadas, rejeita qualquer asset individual acima de 1 MB e impede panoramas PNG nas páginas.

## 7.1 — Continuidade Viva

### Primeira Travessia

Rota opcional de quatro passagens: Atlas → Guardião → Fervor → Diário. O estado fica em `roc.first-passage.v1`, somente no navegador, e não restringe a exploração livre.

### Bússola contextual

Atlas, fólios territoriais e dossiês exibem uma recomendação explicada. A seleção prioriza Reinos ainda não registrados e, quando existe um Crest de Jornada, compara os Fervores dominante e secundário. A interface sempre informa o motivo e mantém a escolha com o visitante.

### Micropatch 7.1.1 — Diversidade de Vestígios

- `roc.guardians.v1` registra apenas Guardiões efetivamente vistos; não transforma a visita em descoberta territorial.
- **Continuar a travessia** percorre Guardiões ainda não vistos e garante cobertura dos 19 antes de repetir qualquer nome.
- **Seguir uma ressonância** oferece uma alternativa igualmente inédita, ordenada pelos Fervores do Ritual ou, sem Ritual, pela relação com o Guardião atual.
- O Guardião atual e os três vestígios mais recentes ficam fora da seleção; ciclos imediatos A ↔ B são proibidos.
- A ordem oficial dos 19 funciona como desempate circular a partir do Guardião atual, eliminando o viés do primeiro item do cadastro.
- Após 19/19, o rótulo muda para **Outra ressonância** e a navegação continua sem retorno imediato.
- A memória permanece local, privada e separada de `roc.exploration.v1`.

### Micropatch 7.1.2 — Legibilidade e Ancoragem

- O eco contextual responde à largura real do componente e passa a uma coluna abaixo de 900 px, inclusive sob zoom do navegador.
- Cabeçalho, rotas e Fragmento preservam largura mínima segura, quebra defensiva e leitura integral.
- Os fólios dos 19 Reinos completam a ficha sistêmica com a **Âncora territorial**, derivada do Templo já canônico.
- O marcador da **Arena de Ferro** em Galícia ancora a estrutura circular no primeiro plano à direita (`76% / 59%`).
- O patch não altera panorama, cânone, relações de Fervor, emblemas ou memória de navegação.

### Micropatch 7.1.3 — Nitidez dos Dossiês

- O retrato principal dos dossiês deixa de receber filtros de saturação e brilho, preservando a mesma nitidez do Arquivo Vivo.
- A cópia ampliada continua desfocada e escurecida apenas como camada atmosférica de fundo.
- O véu escuro se concentra na área textual e na transição inferior, sem cobrir rosto e corpo no desktop.
- Em telas compactas, a opacidade do retrato é reforçada enquanto o gradiente preserva a leitura do conteúdo sobreposto.
- O patch se aplica ao template comum dos 19 Guardiões e não modifica nenhum arquivo de imagem ou dado canônico.

### Fragmentos vivos

Os mesmos quatro fundamentos públicos do Diário reaparecem na bússola após 1, 5, 10 e 19 Reinos. Não há informação exclusiva, prêmio, poder ou pontuação.

### Sistemas demonstráveis

- Fervor reutiliza o Códice visual 8 × 5 já publicado.
- Gravity ganha uma lente de pressão conceitual entre Constructive, Catalytic e Corrosive.
- Ascensão ganha uma leitura selecionável dos três estados fixos.
- Nenhuma demonstração mede Guardiões, prevê combate ou cria regra canônica.

## Critérios de aceite

1. 48 páginas, 48 canonicals e links internos íntegros.
2. Zero panorama PNG referenciado pelos 19 fólios.
3. Botáfia inalterada e reconhecida no gate 19/19.
4. Primeira Travessia completa sem bloquear navegação livre.
5. Recomendações com justificativa legível e fallback sem Ritual.
6. Fragmentos reaparecendo fora do Diário conforme o progresso.
7. QA desktop em 1366 × 768 e 1920 × 1080, sem overflow, imagem quebrada ou erro de aplicação.
8. Nenhuma autoindicação, repetição antes de 19/19 ou ciclo de dois Guardiões.
9. Eco contextual legível em 1024, 1366 e 1920 px, incluindo zoom de 125% e 150%.
10. Fichas territoriais completas em 2 × 2 quando houver duas colunas, sem célula visual vazia.
11. Arena de Ferro ancorada no edifício circular correto do panorama de Galícia.
12. Retratos principais dos 19 dossiês sem filtros de brilho, saturação ou desfoque; desfoque permitido somente no fundo atmosférico.

## Resultado de validação

- Fases 7.0–7.1: **PASS** — 40/40 verificações centrais, 18/18 complementares e smoke público do PR #9.
- Micropatch 7.1.1: **PASS** — 98/98 verificações navegáveis, cobertura dos 19 Guardiões, migração e persistência aprovadas; smoke público do PR #10.
- Micropatch 7.1.2: **PASS** — 1024, 1366 e 1920 px e zoom equivalente a 125% e 150%; smoke público do PR #11.
- Micropatch 7.1.3: **GATE LOCAL PASS** — 48 páginas, 48 canonicals e contrato de nitidez aprovados; QA visual público pendente.
- Estado final: 48 páginas e 48 canonicals, sem overflow horizontal, imagens quebradas ou erros JavaScript da aplicação nas rotas auditadas.
- Escopo preservado: nenhum conteúdo canônico, panorama, emblema ou relação de Fervor foi alterado pelo fechamento operacional.
