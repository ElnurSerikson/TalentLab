import type { Question } from '@/domain/types';
import { choiceQ } from './questionFactory';

// База личности: 28 вопросов одного формата — вопрос + 4 текстовых варианта.
// Разные «линзы» (предпочтения, поведение, эмоции, отдых, эстетика, гипотетика,
// ценности, цифра/ИИ), чтобы не звучало как «тест на успех». Каждый вопрос
// разводит варианты по 5 граням: Мышление / Творчество / Люди / Действие / Цифра.
export const BASE_QUESTIONS: Question[] = [
  // ---------- Линза: предпочтения ----------
  choiceQ({
    id: 'b_evening',
    category: 'temperament',
    text: 'Свободный вечер. Чем займёшься с настоящим удовольствием?',
    options: [
      { key: 'a', label: 'Разберусь в чём-то новом — почитаю, посмотрю разбор', talents: { researcher: 2, 'self-learner': 1.5 }, riasec: { I: 2 } },
      { key: 'b', label: 'Создам что-то — рисунок, музыку, видео, текст', talents: { creator: 2, aesthete: 1 }, riasec: { A: 2 } },
      { key: 'c', label: 'Встречусь с людьми, поболтаю, потусуюсь', talents: { communicator: 2, networker: 1 }, riasec: { S: 1.5, E: 1 } },
      { key: 'd', label: 'Поиграю, соберу что-то руками или займусь спортом', talents: { gamer: 1.5, executor: 1.5 }, riasec: { R: 2 } },
    ],
  }),
  choiceQ({
    id: 'b_subject',
    category: 'interests',
    text: 'Какая тема или предмет заходили тебе больше всего?',
    options: [
      { key: 'a', label: 'Точные — математика, физика, логика', talents: { analyst: 2, logician: 1.5 }, riasec: { I: 2 } },
      { key: 'b', label: 'Творческие — искусство, литература, музыка', talents: { creator: 1.5, storyteller: 1.5 }, riasec: { A: 2 } },
      { key: 'c', label: 'Про людей — психология, история, общество', talents: { empath: 1.5, communicator: 1.5 }, riasec: { S: 2 } },
      { key: 'd', label: 'Технологии — IT, гаджеты, как всё устроено', talents: { 'tech-savvy': 2, systemizer: 1 }, riasec: { R: 1.5, I: 1 } },
    ],
  }),
  choiceQ({
    id: 'b_deepdive',
    category: 'interests',
    text: 'Что бы ты залип изучать часами — просто потому что интересно?',
    options: [
      { key: 'a', label: 'Как устроен мир: наука, факты, теории', talents: { researcher: 2, conceptualist: 1 }, riasec: { I: 2 } },
      { key: 'b', label: 'Как делать красиво: дизайн, эстетика, стиль', talents: { designer: 2, aesthete: 1 }, riasec: { A: 2 } },
      { key: 'c', label: 'Как устроены люди и отношения', talents: { empath: 2, listener: 1 }, riasec: { S: 2 } },
      { key: 'd', label: 'Как запускать проекты и зарабатывать', talents: { leader: 1.5, 'risk-taker': 1.5 }, riasec: { E: 2 } },
    ],
  }),

  // ---------- Линза: поведение в ситуациях ----------
  choiceQ({
    id: 'b_organize',
    category: 'behavior',
    text: 'Друзья решили что-то замутить вместе. Какая роль твоя?',
    options: [
      { key: 'a', label: 'Беру штурвал — раздаю задачи, веду', talents: { leader: 2, organizer: 1 }, riasec: { E: 2 } },
      { key: 'b', label: 'Фонтан идей — придумываю, что и как', talents: { creator: 2, inventor: 1 }, riasec: { A: 1.5 } },
      { key: 'c', label: 'Слежу, чтобы всем было ок, мирю', talents: { diplomat: 1.5, empath: 1.5 }, riasec: { S: 2 } },
      { key: 'd', label: 'Делаю свою часть надёжно, без шума', talents: { executor: 1.5, finisher: 1.5 }, riasec: { C: 1.5, R: 0.5 } },
    ],
  }),
  choiceQ({
    id: 'b_newpeople',
    category: 'temperament',
    text: 'Ты в новой компании, где никого не знаешь. Ты…',
    options: [
      { key: 'a', label: 'Легко знакомлюсь, заговариваю первым', talents: { communicator: 2, networker: 1 }, riasec: { E: 2, S: 1 } },
      { key: 'b', label: 'Наблюдаю, потом подхожу к тем, кто интересен', talents: { analyst: 1.5, listener: 1 }, riasec: { I: 1.5 } },
      { key: 'c', label: 'Держусь ближе к одному-двум, без толпы', talents: { listener: 1.5, empath: 1 }, riasec: { S: 1 } },
      { key: 'd', label: 'Развлекаю, шучу, собираю внимание', talents: { showman: 2, motivator: 1 }, riasec: { E: 2 } },
    ],
  }),
  choiceQ({
    id: 'b_hardtask',
    category: 'cognitive',
    text: 'Дали сложную задачу без инструкции. Первым делом ты…',
    options: [
      { key: 'a', label: 'Раскладываю на части, ищу логику', talents: { analyst: 2, logician: 1 }, riasec: { I: 2 } },
      { key: 'b', label: 'Накидываю несколько необычных подходов', talents: { creator: 1.5, inventor: 1.5 }, riasec: { A: 1.5 } },
      { key: 'c', label: 'Спрошу совет, посмотрю как делали другие', talents: { 'team-player': 1.5, 'self-learner': 1 }, riasec: { S: 1.5 } },
      { key: 'd', label: 'Начну пробовать руками — по ходу разберусь', talents: { prototyper: 1.5, executor: 1.5 }, riasec: { R: 2 } },
    ],
  }),
  choiceQ({
    id: 'b_deadline',
    category: 'behavior',
    text: 'Дедлайн уже завтра, а работы куча. Ты…',
    options: [
      { key: 'a', label: 'Составлю план и пойду строго по пунктам', talents: { organizer: 2, disciplinator: 1 }, riasec: { C: 2 } },
      { key: 'b', label: 'Включу турборежим и сделаю мощным рывком', talents: { sprinter: 2, fighter: 1 } },
      { key: 'c', label: 'Раскидаю с командой по частям', talents: { 'team-player': 1.5, leader: 1 }, riasec: { E: 1, S: 1 } },
      { key: 'd', label: 'Оставлю только самое важное, лишнее отброшу', talents: { tactician: 1.5, pragmatist: 1.5 }, riasec: { C: 0.5 } },
    ],
  }),
  choiceQ({
    id: 'b_argument',
    category: 'emotion',
    text: 'Ты поспорил с близким человеком. Что делаешь?',
    options: [
      { key: 'a', label: 'Спокойно разбираю аргументы по фактам', talents: { logician: 1.5, analyst: 1.5 }, riasec: { I: 1.5 } },
      { key: 'b', label: 'Иду на контакт, чтобы быстрее помириться', talents: { diplomat: 2, empath: 1 }, riasec: { S: 1.5 } },
      { key: 'c', label: 'Стою на своём, если уверен в правоте', talents: { fighter: 1.5, defender: 1 }, riasec: { E: 0.5 } },
      { key: 'd', label: 'Беру паузу, остываю, потом возвращаюсь', talents: { focuser: 1.5, pragmatist: 1 } },
    ],
  }),

  // ---------- Линза: самовосприятие ----------
  choiceQ({
    id: 'b_praise',
    category: 'behavior',
    text: 'За что тебя чаще всего хвалят?',
    options: [
      { key: 'a', label: 'Что быстро схватываю и умно мыслю', talents: { 'quick-learner': 1.5, analyst: 1.5 }, riasec: { I: 1.5 } },
      { key: 'b', label: 'Что креативный и с фантазией', talents: { creator: 2, designer: 1 }, riasec: { A: 1.5 } },
      { key: 'c', label: 'Что с тобой легко и приятно', talents: { communicator: 1.5, empath: 1.5 }, riasec: { S: 1.5 } },
      { key: 'd', label: 'Что надёжный — раз сказал, значит сделаю', talents: { finisher: 1.5, disciplinator: 1.5 }, riasec: { C: 1.5 } },
    ],
  }),
  choiceQ({
    id: 'b_comefor',
    category: 'behavior',
    text: 'Друзья приходят к тебе, когда…',
    options: [
      { key: 'a', label: 'Нужно что-то понять или решить', talents: { 'problem-solver': 1.5, analyst: 1.5 }, riasec: { I: 1.5 } },
      { key: 'b', label: 'Нужна свежая идея или вдохновение', talents: { creator: 1.5, motivator: 1 }, riasec: { A: 1.5 } },
      { key: 'c', label: 'Нужно выговориться и почувствовать поддержку', talents: { listener: 2, empath: 1 }, riasec: { S: 2 } },
      { key: 'd', label: 'Нужно, чтобы кто-то взял и сделал', talents: { executor: 1.5, leader: 1 }, riasec: { E: 1, R: 1 } },
    ],
  }),
  choiceQ({
    id: 'b_easy',
    category: 'cognitive',
    text: 'Что даётся тебе легче всего?',
    options: [
      { key: 'a', label: 'Понимать сложное и объяснять просто', talents: { conceptualist: 1.5, mentor: 1 }, riasec: { I: 1.5, S: 0.5 } },
      { key: 'b', label: 'Придумывать и создавать новое', talents: { creator: 2, inventor: 1 }, riasec: { A: 1.5 } },
      { key: 'c', label: 'Находить общий язык с кем угодно', talents: { communicator: 1.5, diplomat: 1 }, riasec: { S: 1.5, E: 0.5 } },
      { key: 'd', label: 'Доводить дела до результата', talents: { achiever: 1.5, finisher: 1.5 }, riasec: { C: 1.5 } },
    ],
  }),

  // ---------- Линза: эмоции и реакции (не про успех) ----------
  choiceQ({
    id: 'b_annoys',
    category: 'emotion',
    text: 'Что бесит тебя сильнее всего?',
    options: [
      { key: 'a', label: 'Глупость и нелогичность', talents: { critic: 1.5, logician: 1.5 }, riasec: { I: 1.5 } },
      { key: 'b', label: 'Серость, безвкусица, шаблонность', talents: { aesthete: 1.5, rebel: 1 }, riasec: { A: 1.5 } },
      { key: 'c', label: 'Несправедливость и равнодушие к людям', talents: { defender: 2, empath: 1 }, riasec: { S: 1.5 } },
      { key: 'd', label: 'Бардак, хаос и сорванные договорённости', talents: { organizer: 1.5, disciplinator: 1 }, riasec: { C: 1.5 } },
    ],
  }),
  choiceQ({
    id: 'b_kayf',
    category: 'emotion',
    text: 'От чего ты ловишь настоящий кайф?',
    options: [
      { key: 'a', label: 'Когда понял то, что раньше не понимал', talents: { researcher: 1.5, analyst: 1 }, riasec: { I: 2 } },
      { key: 'b', label: 'Когда создал что-то своё', talents: { creator: 2, aesthete: 1 }, riasec: { A: 2 } },
      { key: 'c', label: 'Когда помог человеку и ему стало лучше', talents: { empath: 1.5, mentor: 1.5 }, riasec: { S: 2 } },
      { key: 'd', label: 'Когда дожал сложное дело до победы', talents: { achiever: 1.5, fighter: 1.5 }, riasec: { E: 1.5 } },
    ],
  }),
  choiceQ({
    id: 'b_rest',
    category: 'temperament',
    text: 'Что для тебя — настоящий отдых?',
    options: [
      { key: 'a', label: 'Тишина, книга, свои мысли', talents: { focuser: 1.5, researcher: 1 }, riasec: { I: 1 } },
      { key: 'b', label: 'Творчество без цели — просто для души', talents: { creator: 1.5, aesthete: 1.5 }, riasec: { A: 1.5 } },
      { key: 'c', label: 'Время с близкими, разговоры', talents: { empath: 1.5, communicator: 1 }, riasec: { S: 1.5 } },
      { key: 'd', label: 'Движ: спорт, прогулки, что-то активное', talents: { executor: 1, gamer: 1.5 }, riasec: { R: 1.5 } },
    ],
  }),
  choiceQ({
    id: 'b_offplan',
    category: 'emotion',
    text: 'Когда всё идёт не по плану, ты…',
    options: [
      { key: 'a', label: 'Спокойно перестраиваюсь и ищу решение', talents: { 'problem-solver': 2, pragmatist: 1 } },
      { key: 'b', label: 'Импровизирую — иногда так выходит даже лучше', talents: { improviser: 2, intuitive: 1 }, riasec: { A: 1 } },
      { key: 'c', label: 'Нервничаю, но беру себя в руки', talents: { disciplinator: 1.5 } },
      { key: 'd', label: 'Заряжаюсь — люблю вызовы', talents: { fighter: 1.5, 'risk-taker': 1.5 }, riasec: { E: 1 } },
    ],
  }),

  // ---------- Линза: эстетика и повседневность ----------
  choiceQ({
    id: 'b_content',
    category: 'interests',
    text: 'На какой контент ты залипаешь?',
    options: [
      { key: 'a', label: 'Разборы, наука, «как это устроено»', talents: { researcher: 1.5, 'self-learner': 1 }, riasec: { I: 1.5 } },
      { key: 'b', label: 'Искусство, дизайн, эстетика, красивое', talents: { aesthete: 1.5, visual: 1.5 }, riasec: { A: 1.5 } },
      { key: 'c', label: 'Истории людей, влоги, живое общение', talents: { storyteller: 1.5, empath: 1 }, riasec: { S: 1.5 } },
      { key: 'd', label: 'Технологии, ИИ, новые инструменты', talents: { 'tech-savvy': 2, 'ai-native': 1 }, riasec: { I: 1, R: 0.5 } },
    ],
  }),
  choiceQ({
    id: 'b_space',
    category: 'values',
    text: 'Твоё рабочее или учебное место скорее…',
    options: [
      { key: 'a', label: 'Всё по системе — порядок, всё на местах', talents: { organizer: 2, systemizer: 1 }, riasec: { C: 2 } },
      { key: 'b', label: 'Творческий беспорядок, зато вдохновляет', talents: { creator: 1.5, rebel: 1 }, riasec: { A: 1.5 } },
      { key: 'c', label: 'Минимум всего — ничего не отвлекает', talents: { 'digital-minimalist': 1.5, focuser: 1.5 } },
      { key: 'd', label: 'Гаджеты и экраны — всё под рукой', talents: { 'tech-savvy': 1.5, 'multi-platform': 1.5 }, riasec: { R: 1, I: 0.5 } },
    ],
  }),
  choiceQ({
    id: 'b_weekend',
    category: 'temperament',
    text: 'Идеальные выходные — это…',
    options: [
      { key: 'a', label: 'Музей, лекция, узнать что-то новое', talents: { researcher: 1.5, 'self-learner': 1 }, riasec: { I: 1.5 } },
      { key: 'b', label: 'Сделать что-то своими руками или творческое', talents: { creator: 1.5, executor: 1 }, riasec: { A: 1, R: 1 } },
      { key: 'c', label: 'Большая тусовка с друзьями', talents: { networker: 1.5, showman: 1 }, riasec: { E: 1.5, S: 1 } },
      { key: 'd', label: 'Поход, спорт, приключение', talents: { 'risk-taker': 1.5, gamer: 1 }, riasec: { R: 2 } },
    ],
  }),

  // ---------- Линза: гипотетика ----------
  choiceQ({
    id: 'b_project',
    category: 'values',
    text: 'Тебе дали год и бюджет на ЛЮБОЙ проект. Ты…',
    options: [
      { key: 'a', label: 'Исследую то, что давно цепляло', talents: { researcher: 2, conceptualist: 1 }, riasec: { I: 2 } },
      { key: 'b', label: 'Создам произведение или продукт мечты', talents: { creator: 2, designer: 1 }, riasec: { A: 2 } },
      { key: 'c', label: 'Соберу людей и сделаю что-то для общества', talents: { leader: 1.5, defender: 1.5 }, riasec: { S: 1.5, E: 1 } },
      { key: 'd', label: 'Запущу свой стартап', talents: { 'risk-taker': 2, starter: 1.5 }, riasec: { E: 2 } },
    ],
  }),
  choiceQ({
    id: 'b_superpower',
    category: 'interests',
    text: 'Тебе бесплатно дают суперспособность. Какую возьмёшь?',
    options: [
      { key: 'a', label: 'Понимать что угодно за секунду', talents: { 'quick-learner': 2, analyst: 1 }, riasec: { I: 1.5 } },
      { key: 'b', label: 'Создавать шедевры одним движением', talents: { creator: 2, aesthete: 1 }, riasec: { A: 1.5 } },
      { key: 'c', label: 'Видеть людей насквозь, чувствовать их', talents: { empath: 2, intuitive: 1 }, riasec: { S: 1.5 } },
      { key: 'd', label: 'Никогда не уставать и всё успевать', talents: { achiever: 1.5, marathoner: 1.5 } },
    ],
  }),
  choiceQ({
    id: 'b_game',
    category: 'behavior',
    text: 'В игре или команде ты чаще…',
    options: [
      { key: 'a', label: 'Стратег — продумываю ходы наперёд', talents: { strategist: 2, tactician: 1 }, riasec: { I: 1.5 } },
      { key: 'b', label: 'Креативщик — придумываю фишки и тактики', talents: { creator: 1.5, improviser: 1.5 }, riasec: { A: 1 } },
      { key: 'c', label: 'Капитан — веду и заряжаю команду', talents: { leader: 2, motivator: 1 }, riasec: { E: 1.5 } },
      { key: 'd', label: 'Тащу механику — стабильно делаю своё', talents: { executor: 1.5, disciplinator: 1 }, riasec: { C: 1, R: 1 } },
    ],
  }),

  // ---------- Линза: ценности и мотивация ----------
  choiceQ({
    id: 'b_matters',
    category: 'lifeValues',
    text: 'Что для тебя важнее в деле, которым занимаешься?',
    options: [
      { key: 'a', label: 'Чтобы было интересно и сложно', talents: { researcher: 1.5, analyst: 1 }, riasec: { I: 2 } },
      { key: 'b', label: 'Чтобы можно было творить и самовыражаться', talents: { creator: 1.5, rebel: 1 }, riasec: { A: 2 } },
      { key: 'c', label: 'Чтобы приносило пользу людям', talents: { defender: 1.5, empath: 1 }, riasec: { S: 2 } },
      { key: 'd', label: 'Чтобы был результат и признание', talents: { achiever: 1.5, leader: 1 }, riasec: { E: 2 } },
    ],
  }),
  choiceQ({
    id: 'b_proud',
    category: 'lifeValues',
    text: 'Что заставляет тебя по-настоящему гордиться собой?',
    options: [
      { key: 'a', label: 'Когда разобрался в том, что казалось нереальным', talents: { researcher: 1.5, analyst: 1 }, riasec: { I: 1.5 } },
      { key: 'b', label: 'Когда создал то, чего раньше не было', talents: { inventor: 1.5, creator: 1.5 }, riasec: { A: 1.5 } },
      { key: 'c', label: 'Когда стал опорой для кого-то', talents: { mentor: 1.5, defender: 1 }, riasec: { S: 1.5 } },
      { key: 'd', label: 'Когда не сдался и дожал до конца', talents: { fighter: 1.5, marathoner: 1.5 } },
    ],
  }),
  choiceQ({
    id: 'b_effort',
    category: 'lifeValues',
    text: 'Ради чего ты готов реально напрягаться?',
    options: [
      { key: 'a', label: 'Ради знаний и мастерства', talents: { expert: 1.5, 'self-learner': 1 }, riasec: { I: 1.5 } },
      { key: 'b', label: 'Ради свободы делать своё', talents: { rebel: 1.5, 'risk-taker': 1 }, riasec: { A: 1, E: 1 } },
      { key: 'c', label: 'Ради людей, которые тебе дороги', talents: { empath: 1.5, defender: 1 }, riasec: { S: 1.5 } },
      { key: 'd', label: 'Ради большой цели и достижений', talents: { achiever: 1.5, leader: 1 }, riasec: { E: 1.5 } },
    ],
  }),

  // ---------- Линза: цифра и ИИ ----------
  choiceQ({
    id: 'b_newtool',
    category: 'interests',
    text: 'Перед тобой новое приложение или инструмент. Ты…',
    options: [
      { key: 'a', label: 'Сразу лезу разбираться во всех фишках', talents: { 'tech-savvy': 2, researcher: 1 }, riasec: { R: 1, I: 1 } },
      { key: 'b', label: 'Думаю, как сделать им что-то крутое', talents: { prototyper: 1.5, creator: 1.5 }, riasec: { A: 1 } },
      { key: 'c', label: 'Спрашиваю, как им пользуются другие', talents: { 'team-player': 1.5, listener: 1 }, riasec: { S: 1 } },
      { key: 'd', label: 'Освою по минимуму — только что нужно для дела', talents: { pragmatist: 1.5 }, riasec: { C: 1 } },
    ],
  }),
  choiceQ({
    id: 'b_ai',
    category: 'interests',
    text: 'Как ты относишься к ИИ-помощникам?',
    options: [
      { key: 'a', label: 'Активно юзаю — ускоряю себя в разы', talents: { 'ai-native': 2, 'tech-savvy': 1 }, riasec: { I: 0.5 } },
      { key: 'b', label: 'Использую для идей и творчества', talents: { creator: 1.5, 'ai-native': 1 }, riasec: { A: 1.5 } },
      { key: 'c', label: 'Осторожно — всё перепроверяю сам', talents: { skeptic: 1.5, 'anti-fake': 1.5 }, riasec: { I: 1 } },
      { key: 'd', label: 'Почти не пользуюсь — привык сам', talents: { expert: 1.5, disciplinator: 1 } },
    ],
  }),
  choiceQ({
    id: 'b_infoflow',
    category: 'behavior',
    text: 'Поток новостей, чатов и уведомлений. Ты…',
    options: [
      { key: 'a', label: 'Фильтрую — беру только важное', talents: { 'info-filter': 2, 'anti-fake': 1 }, riasec: { I: 1 } },
      { key: 'b', label: 'Легко переключаюсь между всем сразу', talents: { 'multi-platform': 1.5, multitasker: 1.5 } },
      { key: 'c', label: 'Управляю вниманием, отключаю лишнее', talents: { 'digital-minimalist': 2, focuser: 1 } },
      { key: 'd', label: 'Сам создаю контент в этом потоке', talents: { 'content-maker': 2, showman: 1 }, riasec: { A: 1, E: 1 } },
    ],
  }),
  choiceQ({
    id: 'b_learn',
    category: 'cognitive',
    text: 'Как ты обычно осваиваешь что-то новое?',
    options: [
      { key: 'a', label: 'Сам — по видео, статьям, гуглю', talents: { 'self-learner': 2, 'tech-savvy': 1 }, riasec: { I: 1 } },
      { key: 'b', label: 'Пробую на практике, учусь на ошибках', talents: { prototyper: 1.5, 'quick-learner': 1 }, riasec: { R: 1.5 } },
      { key: 'c', label: 'Прошу объяснить того, кто умеет', talents: { 'team-player': 1.5, listener: 1 }, riasec: { S: 1.5 } },
      { key: 'd', label: 'Иду на структурированный курс по шагам', talents: { disciplinator: 1.5, organizer: 1 }, riasec: { C: 1.5 } },
    ],
  }),
];
