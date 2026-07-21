# Fase 5 — Diário da Emberline e Retenção Ética

## Objetivo

Transformar a memória local construída nas Fases 2–4 em um arquivo privado de continuidade. A retenção nasce do desejo de compreender o mundo, não de urgência artificial, ranking, sequência diária, moeda ou vantagem de poder.

## Diário da Emberline

O Diário organiza os Reinos na ordem em que foram registrados por `roc.exploration.v1`. Cada folio visitado pode receber uma impressão opcional de até 280 caracteres.

As notas:

- pertencem ao visitante e não possuem autoridade canônica;
- ficam somente no navegador;
- nunca são enviadas, associadas a conta ou usadas para analytics;
- só podem ser criadas para Reinos já visitados;
- usam a chave independente `roc.journal.v1`;
- podem ser exportadas como JSON ou apagadas sem remover território, afinidade ou preferências.

## Continuidade do Ritual

O Diário lê `roc.pilgrimage.v1` e apresenta a combinação dominante/secundária já calculada pelo Ritual. Ele não recalcula, reclassifica ou concede afinidade. A Fase 5 consolida o quiz da Fase 4 em uma superfície de continuidade, evitando um segundo sistema concorrente.

## Fragmentos do Limiar

Quatro recompensas editoriais despertam em 1, 5, 10 e 19 Reinos. Elas resumem fundamentos já públicos — Crest, Kingdom Will, Sovereign Gravity e Ruína — e não expõem material integral das fontes internas.

Os fragmentos são recompensas de leitura, não:

- pontos;
- níveis de poder;
- itens canônicos;
- informação exclusiva do universo;
- gatilhos de escassez ou sequência diária.

## Preferências persistentes

`roc.preferences.v1` guarda somente duas escolhas de apresentação:

- movimento **Imersivo** ou **Sereno**;
- escala de leitura **Padrão** ou **Ampliada**.

As preferências complementam — e nunca anulam — `prefers-reduced-motion`. Elas não contêm perfil, identidade, afinidade ou histórico de navegação.

## Privacidade e separação de estado

| Chave | Responsabilidade |
|---|---|
| `roc.exploration.v1` | Reinos visitados e continuação territorial |
| `roc.pilgrimage.v1` | Respostas e resultado do Ritual |
| `roc.journal.v1` | Notas privadas do visitante |
| `roc.preferences.v1` | Movimento e escala de leitura |

Nenhuma chave depende de backend, cookie, conta ou identificador externo.

## Acessibilidade

- notas possuem `label`, limite explícito e contador;
- retornos de gravação usam `aria-live`;
- preferências usam `fieldset`, `legend` e rádios nativos;
- o modo Sereno reduz animações em todo o Codex;
- a escala Ampliada aumenta a base tipográfica sem zoom forçado;
- exclusão de notas exige confirmação explícita.

## Critérios de aceite

- rota `/diario/` integrada à home, ao cabeçalho e ao HUD;
- lista construída exclusivamente com os 19 Reinos públicos;
- notas limitadas a 280 caracteres e apenas para territórios visitados;
- quatro chaves locais com responsabilidades separadas;
- afinidade reaproveitada sem novo cálculo;
- fragmentos em 1/5/10/19, sem ranking ou vantagem;
- exportação local e exclusão exclusiva do Diário;
- preferências aplicadas globalmente;
- build estática e gates das Fases 0–5 aprovados;
- prévia isolada com `noindex, nofollow` antes de qualquer integração na `main`.
