import type { Archetype, TalentDomain } from '@/domain/types';

export const ARCHETYPES: Archetype[] = [
  {
    id: 'analytical-creator',
    name: 'Аналитический Креатор',
    tagline: 'Думаешь глубоко — создаёшь смело',
    description:
      'Ты быстро схватываешь информацию, видишь закономерности и любишь создавать новое. Тебя заряжают задачи, где можно подумать и придумать что-то с нуля. В команде ты — генератор идей с крепкой логикой.',
    icon: 'BrainCircuit',
    color: '#7C3AED',
    domains: ['thinking', 'creativity'],
  },
  {
    id: 'strategic-diplomat',
    name: 'Стратегический Дипломат',
    tagline: 'Видишь людей — и видишь наперёд',
    description:
      'Ты сочетаешь холодный расчёт с тёплым пониманием людей. Умеешь просчитывать ходы и при этом договариваться так, чтобы все были довольны. Из тебя выйдет сильный лидер или переговорщик.',
    icon: 'Handshake',
    color: '#6D28D9',
    domains: ['thinking', 'people'],
  },
  {
    id: 'thoughtful-doer',
    name: 'Вдумчивый Реализатор',
    tagline: 'Сначала думаешь — потом делаешь точно',
    description:
      'Ты не действуешь наугад: сначала анализируешь, а потом доводишь дело до конца. Тебе можно доверить сложную задачу — ты разберёшься и сделаешь. Надёжность и ум — твоё сочетание.',
    icon: 'Target',
    color: '#5B21B6',
    domains: ['thinking', 'action'],
  },
  {
    id: 'digital-analyst',
    name: 'Цифровой Аналитик',
    tagline: 'Данные и технологии — твой родной язык',
    description:
      'Ты соединяешь аналитический ум с любовью к технологиям. Тебе легко работать с данными, инструментами и AI. Это редкое и очень востребованное в 2026+ сочетание.',
    icon: 'ChartColumnBig',
    color: '#0EA5E9',
    domains: ['thinking', 'digital'],
  },
  {
    id: 'creative-leader',
    name: 'Творческий Лидер',
    tagline: 'Зажигаешь идеей — ведёшь за собой',
    description:
      'Ты фонтанируешь идеями и умеешь увлечь ими других. Люди тянутся за твоим видением. Из тебя получится креативный руководитель, режиссёр или основатель.',
    icon: 'Sparkles',
    color: '#F59E0B',
    domains: ['creativity', 'people'],
  },
  {
    id: 'creative-maker',
    name: 'Творец-Реализатор',
    tagline: 'Не только придумываешь — но и воплощаешь',
    description:
      'Ты не просто мечтатель: ты доводишь свои идеи до готового результата. Сочетание фантазии и упорства делает тебя настоящим создателем — будь то продукт, проект или произведение.',
    icon: 'Hammer',
    color: '#F59E0B',
    domains: ['creativity', 'action'],
  },
  {
    id: 'digital-creator',
    name: 'Цифровой Творец',
    tagline: 'Создаёшь новое с помощью технологий',
    description:
      'Ты соединяешь креатив с цифровыми инструментами и AI. Тебе легко создавать контент, прототипы и проекты в современной среде. Это профиль создателей новой экономики.',
    icon: 'Wand2',
    color: '#0EA5E9',
    domains: ['creativity', 'digital'],
  },
  {
    id: 'inspiring-leader',
    name: 'Вдохновляющий Лидер',
    tagline: 'Ведёшь людей к результату',
    description:
      'Ты умеешь объединять людей и доводить дело до конца. Тебе доверяют и за тобой идут. Из тебя выйдет сильный руководитель, организатор или капитан команды.',
    icon: 'Crown',
    color: '#10B981',
    domains: ['people', 'action'],
  },
  {
    id: 'connected-communicator',
    name: 'Цифровой Коммуникатор',
    tagline: 'Соединяешь людей в современном мире',
    description:
      'Ты прекрасно общаешься — и вживую, и онлайн. Тебе легко строить связи, вести аудиторию и работать в международной среде. Идеальный профиль для медиа, маркетинга и комьюнити.',
    icon: 'MessagesSquare',
    color: '#10B981',
    domains: ['people', 'digital'],
  },
  {
    id: 'digital-achiever',
    name: 'Цифровой Достигатор',
    tagline: 'Делаешь много — с умными инструментами',
    description:
      'Ты соединяешь упорство и результативность с любовью к технологиям. Автоматизируешь рутину и достигаешь целей быстрее других. Профиль для тех, кто строит будущее своими руками.',
    icon: 'Rocket',
    color: '#0EA5E9',
    domains: ['action', 'digital'],
  },
  {
    id: 'caring-helper',
    name: 'Заботливый Помощник',
    tagline: 'Чувствуешь людей — помогаешь им',
    description:
      'Главное для тебя — люди. Ты чувствуешь их состояние и искренне хочешь помочь. Из тебя выйдет прекрасный психолог, врач, педагог или социальный работник.',
    icon: 'HeartHandshake',
    color: '#10B981',
    domains: ['people', 'people'],
  },
  {
    id: 'deep-thinker',
    name: 'Глубокий Мыслитель',
    tagline: 'Докапываешься до сути',
    description:
      'Ты любишь думать, исследовать и понимать, как всё устроено. Тебе важна истина, а не быстрые ответы. Из тебя выйдет учёный, аналитик или эксперт высокого класса.',
    icon: 'Brain',
    color: '#7C3AED',
    domains: ['thinking', 'thinking'],
  },
  {
    id: 'bold-creator',
    name: 'Смелый Создатель',
    tagline: 'Творишь без оглядки на правила',
    description:
      'Творчество — твоя стихия. Ты создаёшь новое и не боишься быть не таким, как все. Из тебя выйдет художник, дизайнер, режиссёр или изобретатель.',
    icon: 'Flame',
    color: '#F59E0B',
    domains: ['creativity', 'creativity'],
  },
  {
    id: 'reliable-doer',
    name: 'Надёжный Деятель',
    tagline: 'Сказал — сделал',
    description:
      'Ты — человек дела. Доводишь начатое до конца, держишь слово и не боишься труда. На тебя можно положиться. Из тебя выйдет отличный исполнитель, инженер или предприниматель.',
    icon: 'CircleCheckBig',
    color: '#F43F5E',
    domains: ['action', 'action'],
  },
  {
    id: 'future-native',
    name: 'Человек Будущего',
    tagline: 'Живёшь в цифровом мире как рыба в воде',
    description:
      'Технологии, AI и цифровая среда — твоя естественная стихия. Ты быстро осваиваешь новое и используешь инструменты будущего уже сегодня. Перед тобой открыты профессии, которых ещё вчера не существовало.',
    icon: 'Cpu',
    color: '#0EA5E9',
    domains: ['digital', 'digital'],
  },
];

export const ARCHETYPES_BY_ID: Record<string, Archetype> = Object.fromEntries(
  ARCHETYPES.map((a) => [a.id, a]),
);

/** Pair key -> archetype id, both orders covered. */
const PAIR_MAP: Record<string, string> = {
  'thinking+creativity': 'analytical-creator',
  'thinking+people': 'strategic-diplomat',
  'thinking+action': 'thoughtful-doer',
  'thinking+digital': 'digital-analyst',
  'creativity+people': 'creative-leader',
  'creativity+action': 'creative-maker',
  'creativity+digital': 'digital-creator',
  'people+action': 'inspiring-leader',
  'people+digital': 'connected-communicator',
  'action+digital': 'digital-achiever',
  'thinking+thinking': 'deep-thinker',
  'creativity+creativity': 'bold-creator',
  'people+people': 'caring-helper',
  'action+action': 'reliable-doer',
  'digital+digital': 'future-native',
};

export function archetypeForDomains(
  primary: TalentDomain,
  secondary: TalentDomain,
): Archetype {
  const direct = PAIR_MAP[`${primary}+${secondary}`];
  const reverse = PAIR_MAP[`${secondary}+${primary}`];
  const id = direct ?? reverse ?? `${primary}+${primary}`;
  return ARCHETYPES_BY_ID[id] ?? ARCHETYPES_BY_ID[PAIR_MAP[`${primary}+${primary}`]];
}
