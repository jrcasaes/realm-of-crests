import fervors from '../data/fervors.json';
import realms from '../data/realms.json';
import { parseFervorField } from './fervor.js';

export const PILGRIMAGE_STORAGE_KEY = 'roc.pilgrimage.v1';

const FERVOR_ORDER = ['faith', 'rage', 'hope', 'grief', 'vengeance', 'pride', 'unity', 'legacy'];

export const pilgrimageFervors = FERVOR_ORDER.map((id) => {
  const fervor = fervors.find((entry) => entry.id === id);
  return {
    ...fervor,
    label: fervor?.pt ?? id,
  };
});

export const ritualQuestions = [
  {
    id: 'fronteira',
    eyebrow: 'I · quando a fronteira cede',
    prompt: 'Qual gesto deve acontecer primeiro?',
    options: [
      { id: 'sustentar', text: 'Manter a posição até que a passagem volte a ser segura.', scores: ['faith', 'pride'] },
      { id: 'reunir', text: 'Reunir os dispersos e abrir uma saída compartilhada.', scores: ['unity', 'hope'] },
      { id: 'recordar', text: 'Preservar os nomes e sinais que a Ruína tenta apagar.', scores: ['legacy', 'grief'] },
      { id: 'romper', text: 'Romper o cerco e cobrar de volta o caminho perdido.', scores: ['rage', 'vengeance'] },
    ],
  },
  {
    id: 'memoria',
    eyebrow: 'II · diante de uma memória incompleta',
    prompt: 'O que torna um vestígio digno de ser carregado?',
    options: [
      { id: 'peso', text: 'O peso que ele conserva, mesmo quando já não há testemunhas.', scores: ['grief', 'legacy'] },
      { id: 'divida', text: 'A dívida que ele revela e ainda exige resposta.', scores: ['vengeance', 'rage'] },
      { id: 'continuidade', text: 'A possibilidade de fazer nascer uma continuação.', scores: ['hope', 'faith'] },
      { id: 'vinculo', text: 'O vínculo que ele mantém entre muitas vontades.', scores: ['unity', 'pride'] },
    ],
  },
  {
    id: 'poder',
    eyebrow: 'III · quando o poder desperta',
    prompt: 'Qual limite impede que ele se torne vazio?',
    options: [
      { id: 'disciplina', text: 'Disciplina e responsabilidade diante do coletivo.', scores: ['faith', 'unity'] },
      { id: 'nome', text: 'A fidelidade ao nome, à origem e ao que foi herdado.', scores: ['pride', 'legacy'] },
      { id: 'movimento', text: 'A coragem de agir antes que a possibilidade desapareça.', scores: ['rage', 'hope'] },
      { id: 'consequencia', text: 'A obrigação de responder às consequências históricas.', scores: ['vengeance', 'grief'] },
    ],
  },
  {
    id: 'perda',
    eyebrow: 'IV · depois da perda',
    prompt: 'Que forma a resistência assume?',
    options: [
      { id: 'raiz', text: 'Uma raiz silenciosa que guarda aquilo que sobreviveu.', scores: ['grief', 'legacy'] },
      { id: 'impacto', text: 'Um impacto que se recusa a aceitar o encerramento.', scores: ['rage', 'vengeance'] },
      { id: 'ascensao', text: 'Uma ascensão construída com quem ainda pode caminhar.', scores: ['hope', 'unity'] },
      { id: 'juramento', text: 'Um juramento mantido mesmo quando ninguém observa.', scores: ['faith', 'pride'] },
    ],
  },
  {
    id: 'caminho',
    eyebrow: 'V · diante de dois caminhos',
    prompt: 'Qual sinal orienta sua escolha?',
    options: [
      { id: 'possibilidade', text: 'A rota que ainda não existe, mas pode ser aberta.', scores: ['hope', 'rage'] },
      { id: 'companhia', text: 'A rota em que ninguém precisa atravessar sozinho.', scores: ['unity', 'faith'] },
      { id: 'origem', text: 'A rota que reconhece de onde você veio.', scores: ['legacy', 'pride'] },
      { id: 'retorno', text: 'A rota que permite retornar ao que ficou sem resposta.', scores: ['vengeance', 'grief'] },
    ],
  },
  {
    id: 'juramento',
    eyebrow: 'VI · para selar a travessia',
    prompt: 'Que promessa você levaria até a Fronteira da Ruína?',
    options: [
      { id: 'guardar', text: 'Guardarei a lei sem esquecer quem a tornou necessária.', scores: ['faith', 'legacy'] },
      { id: 'conduzir', text: 'Abrirei passagem e não deixarei para trás quem me confiou seu passo.', scores: ['unity', 'hope'] },
      { id: 'erguer', text: 'Erguerei meu nome contra toda força que tente reduzi-lo.', scores: ['pride', 'rage'] },
      { id: 'lembrar', text: 'Lembrarei a perda até que ela encontre uma resposta.', scores: ['grief', 'vengeance'] },
    ],
  },
];

export const pilgrimageRealms = realms
  .slice()
  .sort((a, b) => a.order - b.order)
  .map((realm) => {
    const relations = parseFervorField(realm.fervor);
    return {
      order: realm.order,
      slug: realm.slug,
      realm: realm.realm,
      guardian: realm.guardian,
      essence: realm.essence,
      dominant: relations.find((entry) => entry.role === 'dominante')?.id,
      secondary: relations.find((entry) => entry.role === 'secundário')?.id,
      emblem: `emblem_${realm.slug}.webp`,
    };
  });

export const pilgrimageMilestones = [
  { count: 1, title: 'PRIMEIRO VESTÍGIO', copy: 'Um Reino entrou na memória desta travessia.' },
  { count: 5, title: 'CARTÓGRAFO DO LIMIAR', copy: 'Cinco soberanias já deixaram sinais no registro.' },
  { count: 10, title: 'METADE DO CONTINENTE', copy: 'Dez Reinos foram atravessados sem impor uma rota única.' },
  { count: 19, title: 'TESTEMUNHA DOS DEZENOVE', copy: 'Todos os Reinos foram registrados neste navegador.' },
];
