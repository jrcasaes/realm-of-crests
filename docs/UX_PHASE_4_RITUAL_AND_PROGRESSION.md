# Fase 4 — Ritual do Crest e Progressão do Viajante

## Objetivo

Adicionar uma camada opcional de afinidade e progressão contemplativa à jornada, sem converter escolhas do visitante em identidade, facção, poder ou verdade canônica. A experiência permanece estática, privada e funcional sem conta.

## Ritual de afinidade

O ritual apresenta seis dilemas narrativos, cada um com quatro respostas sem hierarquia de acerto. As respostas distribuem peso entre as oito famílias públicas de Fervor:

- Faith;
- Rage;
- Hope;
- Grief;
- Vengeance;
- Pride;
- Unity;
- Legacy.

O cálculo é determinístico: a primeira relação de cada resposta recebe dois pontos e a segunda recebe um. Empates seguem a ordem pública e estável do registro, sem sorteio oculto.

## Crest de Jornada

O resultado combina um Fervor dominante e um secundário em uma geometria SVG gerada no navegador. A interface e o arquivo exportado identificam a marca como **não canônica**.

O Crest de Jornada:

- não reconhece soberania territorial;
- não transforma o visitante em Guardião;
- não concede poder, ranking ou facção;
- não substitui os Crests oficiais;
- serve somente como memória visual da rota escolhida.

## Rotas sugeridas

Depois do ritual, três Reinos são sugeridos a partir das relações públicas de Fervor. Reinos ainda não registrados recebem prioridade. A sugestão não registra território: somente abrir deliberadamente um folio ou selecionar um selo no Atlas mantém esse efeito.

## Inventário e marcos

O Inventário de Sigilos lê `roc.exploration.v1` e representa os dezenove Reinos em dois estados: não registrado e registrado. Ele não cria uma segunda contagem nem modifica a regra de descoberta.

Os marcos são vestígios narrativos, não pontuação:

- 1/19 — Primeiro Vestígio;
- 5/19 — Cartógrafo do Limiar;
- 10/19 — Metade do Continente;
- 19/19 — Testemunha dos Dezenove.

## Privacidade e controle

- `roc.exploration.v1` continua exclusivo da memória territorial;
- `roc.pilgrimage.v1` guarda respostas e Fervores resultantes;
- nenhuma informação é enviada ou associada a conta;
- afinidade e memória territorial podem ser apagadas separadamente;
- apagar território exige confirmação explícita.

## Acessibilidade

- perguntas usam `fieldset`, `legend` e controles de rádio nativos;
- nenhuma etapa possui cronômetro;
- o resultado é determinístico e não depende de som;
- estados e retornos usam regiões vivas;
- todos os controles funcionam por teclado;
- `prefers-reduced-motion` remove animações não essenciais.

## Critérios de aceite

- seis escolhas e vinte e quatro opções;
- cobertura das oito famílias de Fervor;
- resultado dominante/secundário reproduzível;
- aviso não canônico permanente;
- três rotas sugeridas sem registro automático;
- dezenove sigilos e marcos 1/5/10/19;
- chaves locais separadas;
- controle de exclusão explícito;
- nova rota integrada à home, cabeçalho e HUD;
- build estática completa e gates das Fases 0–4 aprovados.
