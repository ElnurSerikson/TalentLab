import type { Question } from '@/domain/types';
import { choiceQ, scaleQ } from './questionFactory';

// 35 questions across 4 blocks. The user sees one continuous flow.
export const SCREENING_QUESTIONS: Question[] = [
  // ===================== Блок 1: Темперамент (10, шкала) =====================
  scaleQ({
    id: 's1',
    category: 'temperament',
    text: 'Я заряжаюсь энергией, когда вокруг много людей и движения',
    talents: { showman: 2, communicator: 1.5, networker: 1, motivator: 1 },
    riasec: { E: 2, S: 1 },
  }),
  scaleQ({
    id: 's2',
    category: 'temperament',
    text: 'Мне комфортнее довести одно дело до конца, чем браться за много сразу',
    talents: { focuser: 2, marathoner: 1.5, finisher: 1.5 },
  }),
  scaleQ({
    id: 's3',
    category: 'temperament',
    text: 'Я люблю быстрый темп и не выношу, когда всё тянется медленно',
    talents: { sprinter: 2, gamer: 1, starter: 1 },
    riasec: { E: 1 },
  }),
  scaleQ({
    id: 's4',
    category: 'temperament',
    text: 'Я часто действую под влиянием момента, не раздумывая долго',
    talents: { improviser: 2, 'risk-taker': 1.5, starter: 1 },
  }),
  scaleQ({
    id: 's5',
    category: 'temperament',
    text: 'Мне легко знакомиться и заговаривать с новыми людьми',
    talents: { communicator: 2, networker: 1.5, 'global-citizen': 0.5 },
    riasec: { E: 1.5, S: 1 },
  }),
  scaleQ({
    id: 's6',
    category: 'temperament',
    text: 'Я предпочитаю спокойную, сосредоточенную обстановку шуму и суете',
    talents: { focuser: 1.5, 'digital-minimalist': 1.5, marathoner: 1 },
    riasec: { I: 1 },
  }),
  scaleQ({
    id: 's7',
    category: 'temperament',
    text: 'Когда появляется новое дело, я хочу взяться за него прямо сейчас',
    talents: { starter: 2, sprinter: 1, 'risk-taker': 1 },
  }),
  scaleQ({
    id: 's8',
    category: 'temperament',
    text: 'Я могу долго заниматься одним делом, не теряя интереса',
    talents: { marathoner: 2, focuser: 1.5, disciplinator: 1, expert: 1 },
  }),
  scaleQ({
    id: 's9',
    category: 'temperament',
    text: 'Мне нравится быть в центре внимания',
    talents: { showman: 2, motivator: 1, 'content-maker': 1 },
    riasec: { E: 1.5, A: 0.5 },
  }),
  scaleQ({
    id: 's10',
    category: 'temperament',
    text: 'Мне нравится соревноваться и побеждать',
    talents: { fighter: 1.5, achiever: 1.5, gamer: 1, 'risk-taker': 1 },
    riasec: { E: 1 },
  }),

  // ===================== Блок 2: Стиль мышления (10, выбор) =====================
  choiceQ({
    id: 't1',
    category: 'thinking',
    text: 'Когда нужно решить сложную задачу, я скорее…',
    options: [
      { key: 'a', label: 'Разложу её на части и проанализирую', talents: { analyst: 2, logician: 1.5 }, riasec: { I: 2 } },
      { key: 'b', label: 'Придумаю несколько необычных решений', talents: { creator: 2, inventor: 1.5 }, riasec: { A: 2 } },
      { key: 'c', label: 'Обсужу и спрошу совета у других', talents: { communicator: 1.5, 'team-player': 1.5 }, riasec: { S: 2 } },
      { key: 'd', label: 'Сразу начну пробовать на практике', talents: { executor: 1.5, prototyper: 1.5, pragmatist: 1 }, riasec: { R: 2 } },
    ],
  }),
  choiceQ({
    id: 't2',
    category: 'thinking',
    text: 'Мне интереснее всего…',
    options: [
      { key: 'a', label: 'Понять, как что-то устроено внутри', talents: { analyst: 1.5, researcher: 2 }, riasec: { I: 2 } },
      { key: 'b', label: 'Придумать, как сделать красиво', talents: { designer: 2, aesthete: 1.5 }, riasec: { A: 2 } },
      { key: 'c', label: 'Понять, что чувствуют люди', talents: { empath: 2, listener: 1.5 }, riasec: { S: 2 } },
      { key: 'd', label: 'Сделать так, чтобы всё работало', talents: { executor: 1.5, systemizer: 1.5 }, riasec: { R: 1.5, C: 1 } },
    ],
  }),
  choiceQ({
    id: 't3',
    category: 'thinking',
    text: 'Чаще всего я принимаю решения, опираясь на…',
    options: [
      { key: 'a', label: 'Логику и факты', talents: { logician: 2, skeptic: 1.5 }, riasec: { I: 1.5 } },
      { key: 'b', label: 'Интуицию и внутреннее чувство', talents: { intuitive: 2, empath: 1 }, riasec: { A: 1.5 } },
      { key: 'c', label: 'Мнение людей, которым доверяю', talents: { 'team-player': 1.5, listener: 1.5 }, riasec: { S: 1.5 } },
      { key: 'd', label: 'Прошлый опыт — что уже работало', talents: { pragmatist: 2, expert: 1 }, riasec: { C: 1.5 } },
    ],
  }),
  choiceQ({
    id: 't4',
    category: 'thinking',
    text: 'Когда узнаю что-то новое, я люблю…',
    variants: {
      games: 'Когда осваиваю новую игру, я люблю…',
    },
    trigger: { games: ['games', 'gamedev'] },
    options: [
      { key: 'a', label: 'Докопаться до самой сути', talents: { researcher: 2, expert: 1.5 }, riasec: { I: 2 } },
      { key: 'b', label: 'Сразу пофантазировать, где это применить', talents: { creator: 1.5, conceptualist: 1.5 }, riasec: { A: 1.5 } },
      { key: 'c', label: 'Обсудить и рассказать другим', talents: { communicator: 1.5, storyteller: 1.5 }, riasec: { S: 1.5 } },
      { key: 'd', label: 'Быстро попробовать на деле', talents: { 'quick-learner': 2, prototyper: 1.5 }, riasec: { R: 1.5 } },
    ],
  }),
  choiceQ({
    id: 't5',
    category: 'thinking',
    text: 'В споре я чаще всего…',
    options: [
      { key: 'a', label: 'Ищу логические нестыковки', talents: { critic: 2, skeptic: 1.5, logician: 1 }, riasec: { I: 1.5 } },
      { key: 'b', label: 'Предлагаю неожиданный взгляд', talents: { rebel: 1.5, creator: 1.5 }, riasec: { A: 1.5 } },
      { key: 'c', label: 'Стараюсь всех примирить', talents: { diplomat: 2, negotiator: 1.5 }, riasec: { S: 1.5 } },
      { key: 'd', label: 'Настаиваю на проверенном решении', talents: { pragmatist: 1.5, disciplinator: 1 }, riasec: { C: 1 } },
    ],
  }),
  choiceQ({
    id: 't6',
    category: 'thinking',
    text: 'Мне ближе занятие…',
    options: [
      { key: 'a', label: 'Решать головоломки и задачи', talents: { analyst: 2, logician: 1.5 }, riasec: { I: 2 } },
      { key: 'b', label: 'Рисовать, сочинять, придумывать', talents: { creator: 2, designer: 1.5, visual: 1 }, riasec: { A: 2 } },
      { key: 'c', label: 'Помогать и общаться', talents: { empath: 1.5, communicator: 1.5 }, riasec: { S: 2 } },
      { key: 'd', label: 'Строить, чинить, мастерить руками', talents: { executor: 2, finisher: 1 }, riasec: { R: 2 } },
    ],
  }),
  choiceQ({
    id: 't7',
    category: 'thinking',
    text: 'Я лучше всего запоминаю…',
    options: [
      { key: 'a', label: 'Схемы, логику, причины', talents: { systemizer: 2, logician: 1.5 }, riasec: { I: 1.5 } },
      { key: 'b', label: 'Образы и впечатления', talents: { visual: 2, aesthete: 1 }, riasec: { A: 1.5 } },
      { key: 'c', label: 'Истории про людей', talents: { storyteller: 1.5, empath: 1.5 }, riasec: { S: 1.5 } },
      { key: 'd', label: 'Конкретные действия и шаги', talents: { executor: 1.5, organizer: 1 }, riasec: { C: 1.5 } },
    ],
  }),
  choiceQ({
    id: 't8',
    category: 'thinking',
    text: 'Меня больше всего вдохновляет…',
    options: [
      { key: 'a', label: 'Идея, до которой я дошёл сам', talents: { conceptualist: 2, researcher: 1 }, riasec: { I: 1.5 } },
      { key: 'b', label: 'Красивый, эстетичный результат', talents: { aesthete: 2, designer: 1.5 }, riasec: { A: 1.5 } },
      { key: 'c', label: 'Благодарность людей', talents: { empath: 1.5, mentor: 1.5 }, riasec: { S: 1.5 } },
      { key: 'd', label: 'Выполненный план и цель', talents: { achiever: 2, organizer: 1 }, riasec: { C: 1.5 } },
    ],
  }),
  choiceQ({
    id: 't9',
    category: 'thinking',
    text: 'Когда передо мной много информации, я…',
    options: [
      { key: 'a', label: 'Сразу ищу главную закономерность', talents: { conceptualist: 1.5, intuitive: 1.5 }, riasec: { I: 1.5 } },
      { key: 'b', label: 'Фильтрую лишнее, оставляю ценное', talents: { 'info-filter': 2, skeptic: 1 }, riasec: { I: 1, C: 1 } },
      { key: 'c', label: 'Обсуждаю с кем-то, чтобы понять', talents: { communicator: 1.5, listener: 1 }, riasec: { S: 1.5 } },
      { key: 'd', label: 'Делаю заметки и систематизирую', talents: { organizer: 2, systemizer: 1.5 }, riasec: { C: 1.5 } },
    ],
  }),
  choiceQ({
    id: 't10',
    category: 'thinking',
    text: 'Идеальная задача для меня — это…',
    options: [
      { key: 'a', label: 'Сложная интеллектуальная загадка', talents: { analyst: 2, researcher: 1.5 }, riasec: { I: 2 } },
      { key: 'b', label: 'Творческий проект без рамок', talents: { creator: 2, rebel: 1.5 }, riasec: { A: 2 } },
      { key: 'c', label: 'Работа в команде ради общей цели', talents: { 'team-player': 2, motivator: 1 }, riasec: { S: 1.5, E: 1 } },
      { key: 'd', label: 'Чёткая задача с понятным результатом', talents: { executor: 2, achiever: 1.5 }, riasec: { C: 1.5, R: 1 } },
    ],
  }),

  // ===================== Блок 3: Эмоции и саморегуляция (10) =====================
  scaleQ({
    id: 'e1',
    category: 'emotion',
    text: 'Я сохраняю спокойствие, даже когда всё идёт не по плану',
    talents: { 'problem-solver': 2, pragmatist: 1.5, fighter: 1 },
  }),
  scaleQ({
    id: 'e2',
    category: 'emotion',
    text: 'Я могу заставить себя делать важное, даже когда нет настроения',
    talents: { disciplinator: 2, marathoner: 1.5, achiever: 1 },
  }),
  scaleQ({
    id: 'e3',
    category: 'emotion',
    text: 'Я легко замечаю, когда у близких меняется настроение',
    talents: { empath: 2, listener: 1.5 },
    riasec: { S: 1.5 },
  }),
  scaleQ({
    id: 'e4',
    category: 'emotion',
    text: 'Меня сложно отвлечь, когда я чем-то увлечён',
    talents: { focuser: 2, 'digital-minimalist': 1.5 },
  }),
  scaleQ({
    id: 'e5',
    category: 'emotion',
    text: 'Я быстро прихожу в себя после неудач и иду дальше',
    talents: { fighter: 2, pragmatist: 1, 'risk-taker': 1 },
  }),
  scaleQ({
    id: 'e6',
    category: 'emotion',
    text: 'Я умею держать эмоции под контролем во время конфликта',
    talents: { diplomat: 2, negotiator: 1.5 },
    riasec: { S: 1 },
  }),
  scaleQ({
    id: 'e7',
    category: 'emotion',
    reverse: true,
    text: 'Уведомления и соцсети часто отвлекают меня от дел',
    talents: { 'digital-minimalist': 2, focuser: 1.5 },
  }),
  choiceQ({
    id: 'e8',
    category: 'emotion',
    text: 'Ты сильно поссорился с другом. Что сделаешь первым?',
    options: [
      { key: 'a', label: 'Дам себе остыть и всё обдумаю', talents: { focuser: 1.5, pragmatist: 1.5 } },
      { key: 'b', label: 'Сразу попробую поговорить и помириться', talents: { diplomat: 2, empath: 1.5 }, riasec: { S: 1.5 } },
      { key: 'c', label: 'Попрошу совета у кого-то близкого', talents: { listener: 1.5, 'team-player': 1 }, riasec: { S: 1 } },
      { key: 'd', label: 'Переключусь на дело, чтобы отвлечься', talents: { disciplinator: 1.5, achiever: 1 } },
    ],
  }),
  choiceQ({
    id: 'e9',
    category: 'emotion',
    text: 'Перед важным экзаменом ты сильно волнуешься. Твои действия?',
    options: [
      { key: 'a', label: 'Составлю план и буду готовиться по нему', talents: { organizer: 2, disciplinator: 1.5 }, riasec: { C: 1.5 } },
      { key: 'b', label: 'Найду способ успокоиться и настроиться', talents: { 'digital-minimalist': 1.5, intuitive: 1 } },
      { key: 'c', label: 'Обсужу свои страхи с друзьями', talents: { communicator: 1.5, listener: 1 }, riasec: { S: 1.5 } },
      { key: 'd', label: 'Скажу себе «я справлюсь» и пойду в бой', talents: { fighter: 2, motivator: 1 } },
    ],
  }),
  choiceQ({
    id: 'e10',
    category: 'emotion',
    text: 'Тебе сказали, что твоя идея слабая. Как отреагируешь?',
    options: [
      { key: 'a', label: 'Спокойно спрошу, что именно не так', talents: { analyst: 1.5, skeptic: 1, listener: 1 } },
      { key: 'b', label: 'Расстроюсь, но переделаю ещё лучше', talents: { perfectionist: 2, marathoner: 1 } },
      { key: 'c', label: 'Буду отстаивать свою идею', talents: { fighter: 1.5, rebel: 1.5, defender: 1 } },
      { key: 'd', label: 'Предложу вместе её доработать', talents: { 'team-player': 1.5, diplomat: 1.5 }, riasec: { S: 1.5 } },
    ],
  }),

  // ===================== Блок 4: Ценности (5) =====================
  choiceQ({
    id: 'v1',
    category: 'values',
    text: 'Что для тебя важнее всего в будущей работе?',
    options: [
      { key: 'a', label: 'Высокий доход', talents: { achiever: 1.5, 'risk-taker': 1 }, riasec: { E: 2 } },
      { key: 'b', label: 'Свобода и творчество', talents: { creator: 1.5, rebel: 1 }, riasec: { A: 2 } },
      { key: 'c', label: 'Польза для людей', talents: { empath: 1.5, defender: 1 }, riasec: { S: 2 } },
      { key: 'd', label: 'Стабильность и надёжность', talents: { disciplinator: 1.5, organizer: 1 }, riasec: { C: 2 } },
    ],
  }),
  choiceQ({
    id: 'v2',
    category: 'values',
    text: 'Какой результат принёс бы тебе наибольшую гордость?',
    options: [
      { key: 'a', label: 'Понял или открыл что-то сложное', talents: { researcher: 2, conceptualist: 1 }, riasec: { I: 2 } },
      { key: 'b', label: 'Создал что-то красивое и уникальное', talents: { creator: 2, aesthete: 1 }, riasec: { A: 2 } },
      { key: 'c', label: 'Помог человеку изменить жизнь', talents: { mentor: 2, empath: 1 }, riasec: { S: 2 } },
      { key: 'd', label: 'Построил успешное дело', talents: { leader: 1.5, 'risk-taker': 1.5 }, riasec: { E: 2 } },
    ],
  }),
  scaleQ({
    id: 'v3',
    category: 'values',
    text: 'Мне важно, чтобы моя работа меняла мир к лучшему',
    talents: { defender: 1.5, empath: 1.5, mentor: 1 },
    riasec: { S: 2 },
  }),
  scaleQ({
    id: 'v4',
    category: 'values',
    text: 'Для меня важно постоянно учиться чему-то новому',
    talents: { 'self-learner': 2, researcher: 1, 'quick-learner': 1.5 },
    riasec: { I: 1.5 },
  }),
  choiceQ({
    id: 'v5',
    category: 'values',
    text: 'Если бы деньги не были проблемой, ты бы…',
    options: [
      { key: 'a', label: 'Занимался наукой и исследованиями', talents: { researcher: 2, analyst: 1 }, riasec: { I: 2 } },
      { key: 'b', label: 'Творил искусство', talents: { creator: 2, aesthete: 1 }, riasec: { A: 2 } },
      { key: 'c', label: 'Помогал людям и обществу', talents: { defender: 1.5, empath: 1.5 }, riasec: { S: 2 } },
      { key: 'd', label: 'Создавал бизнесы и проекты', talents: { leader: 1.5, starter: 1.5, 'risk-taker': 1 }, riasec: { E: 2 } },
    ],
  }),
];
