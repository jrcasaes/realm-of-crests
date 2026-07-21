# Fase 7 — Continuidade Viva

Status: implementação em branch de prévia; integração na `main` depende de QA e aprovação.

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
