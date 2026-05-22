import type { RecommendationContext, RecommendationRule, TalentDomain } from '@/domain/types';

function hasTalent(ctx: RecommendationContext, id: string): boolean {
  return ctx.topTalents.some((t) => t.talent.id === id);
}

function topDomainCount(ctx: RecommendationContext, domain: TalentDomain): number {
  return ctx.topTalents.filter((t) => t.talent.domain === domain).length;
}

function hasTag(ctx: RecommendationContext, ...keys: string[]): boolean {
  return keys.some((k) => ctx.freeformTags.includes(k));
}

export const RECOMMENDATION_RULES: RecommendationRule[] = [
  {
    id: 'add-execution',
    priority: 10,
    applies: (ctx) => topDomainCount(ctx, 'action') === 0,
    recommendation: {
      id: 'add-execution',
      title: 'Прокачай исполнительские навыки',
      description:
        'У тебя сильные идеи и анализ, но важно научиться доводить дела до конца. Это превратит твои мысли в реальные результаты.',
      icon: 'CircleCheckBig',
      checklist: [
        'Заведи простой трекер задач (например, заметки или Notion)',
        'Каждый день закрывай хотя бы одну маленькую задачу до конца',
        'Прочитай книгу «Атомные привычки» Джеймса Клира',
      ],
    },
  },
  {
    id: 'add-people',
    priority: 11,
    applies: (ctx) => topDomainCount(ctx, 'people') === 0,
    recommendation: {
      id: 'add-people',
      title: 'Развивай навыки общения',
      description:
        'Твои сильные стороны связаны с задачами и идеями. Добавив навыки коммуникации, ты сможешь доносить свою ценность и работать в команде.',
      icon: 'MessageCircle',
      checklist: [
        'Запишись в дискуссионный клуб или дебаты',
        'Тренируйся объяснять сложное простыми словами',
        'Бери небольшие командные проекты',
      ],
    },
  },
  {
    id: 'critical-thinking',
    priority: 12,
    applies: (ctx) => !hasTalent(ctx, 'skeptic') && !hasTalent(ctx, 'critic') && !hasTalent(ctx, 'anti-fake'),
    recommendation: {
      id: 'critical-thinking',
      title: 'Прокачай критическое мышление',
      description:
        'Умение проверять информацию и не вестись на манипуляции — суперсила в мире, полном фейков и AI-контента.',
      icon: 'ShieldAlert',
      checklist: [
        'Перед тем как поверить, ищи первоисточник',
        'Пройди курс по критическому мышлению (Stepik, Coursera)',
        'Задавай вопрос «откуда это известно?»',
      ],
    },
  },
  {
    id: 'ai-skills',
    priority: 5,
    applies: (ctx) => !hasTalent(ctx, 'ai-native') && topDomainCount(ctx, 'digital') < 2,
    recommendation: {
      id: 'ai-skills',
      title: 'Освой AI как рабочий инструмент',
      description:
        'Умение работать с AI скоро станет таким же базовым, как умение пользоваться поиском. Начни сейчас — это даст тебе фору.',
      icon: 'Bot',
      checklist: [
        'Используй AI-ассистента для учёбы (объяснять, проверять, тренировать)',
        'Научись формулировать чёткие запросы (промпты)',
        'Всегда проверяй ответы AI на ошибки',
      ],
    },
  },
  {
    id: 'focus-routine',
    priority: 8,
    applies: (ctx) => hasTag(ctx, 'fear_routine') && (ctx.riasec.code.includes('R') || ctx.riasec.code.includes('I')),
    recommendation: {
      id: 'focus-routine',
      title: 'Соедини глубокий фокус с динамикой',
      description:
        'Ты боишься рутины, но твои интересы требуют усидчивости. Учись делать монотонное увлекательным и чередовать фокус с переменами.',
      icon: 'Crosshair',
      checklist: [
        'Используй технику Pomodoro (25 минут фокуса)',
        'Превращай рутинные задачи в челленджи',
        'Чередуй типы задач в течение дня',
      ],
    },
  },
  {
    id: 'public-speaking',
    priority: 9,
    applies: (ctx) => hasTag(ctx, 'fear_public'),
    recommendation: {
      id: 'public-speaking',
      title: 'Победи страх публичных выступлений',
      description:
        'Страх сцены — это навык, который тренируется. Освоив его, ты откроешь себе двери в лидерство, медиа и презентации.',
      icon: 'Mic',
      checklist: [
        'Начни с коротких выступлений перед друзьями',
        'Запишись в клуб ораторского мастерства или Toastmasters',
        'Записывай себя на видео и анализируй',
      ],
    },
  },
  {
    id: 'decide-direction',
    priority: 3,
    applies: (ctx) => hasTag(ctx, 'undecided'),
    recommendation: {
      id: 'decide-direction',
      title: 'Попробуй, прежде чем решить',
      description:
        'Ты пока не уверен в выборе — и это нормально. Лучший способ понять — попробовать на практике, а не только размышлять.',
      icon: 'Compass',
      checklist: [
        'Выбери 2–3 профессии из отчёта и найди людей из этих сфер',
        'Попробуй мини-проект или стажировку в интересной области',
        'Сходи на день открытых дверей в вуз',
      ],
    },
  },
  {
    id: 'monetize-creativity',
    priority: 14,
    applies: (ctx) => topDomainCount(ctx, 'creativity') >= 2 && hasTag(ctx, 'money'),
    recommendation: {
      id: 'monetize-creativity',
      title: 'Научись монетизировать творчество',
      description:
        'У тебя сильная креативность, и ты хочешь зарабатывать. Это совместимо — нужно лишь освоить деловую сторону творчества.',
      icon: 'Sparkles',
      checklist: [
        'Собери портфолио своих работ',
        'Изучи, как фрилансеры находят клиентов',
        'Попробуй продать первую работу или услугу',
      ],
    },
  },
  {
    id: 'leadership',
    priority: 13,
    applies: (ctx) => (hasTalent(ctx, 'leader') || hasTalent(ctx, 'motivator')) && hasTag(ctx, 'lead'),
    recommendation: {
      id: 'leadership',
      title: 'Развивай лидерский потенциал',
      description:
        'У тебя есть задатки лидера. Начни брать на себя ответственность в небольших проектах — лидерство растёт через практику.',
      icon: 'Crown',
      checklist: [
        'Возглавь школьный или студенческий проект',
        'Прочитай о лидерстве (например, Саймон Синек)',
        'Учись делегировать, а не делать всё сам',
      ],
    },
  },
  {
    id: 'deepen-expertise',
    priority: 15,
    applies: (ctx) => hasTalent(ctx, 'quick-learner') && !hasTalent(ctx, 'expert'),
    recommendation: {
      id: 'deepen-expertise',
      title: 'Превращай скорость в глубину',
      description:
        'Ты быстро схватываешь новое — это здорово. Но настоящая ценность приходит, когда ты доводишь хотя бы одну тему до экспертного уровня.',
      icon: 'GraduationCap',
      checklist: [
        'Выбери одну тему и углубляйся в неё 3 месяца',
        'Создай проект, демонстрирующий твою экспертизу',
        'Поделись знаниями — научи кого-то',
      ],
    },
  },
  {
    id: 'manage-emotions',
    priority: 16,
    applies: (ctx) => topDomainCount(ctx, 'people') >= 3 && !hasTalent(ctx, 'disciplinator'),
    recommendation: {
      id: 'manage-emotions',
      title: 'Учись беречь свою энергию',
      description:
        'Ты много отдаёшь людям — это ценно, но важно не выгореть. Навык управления эмоциями и границами защитит тебя.',
      icon: 'Heart',
      checklist: [
        'Выдели время на отдых и восстановление',
        'Учись говорить «нет» без чувства вины',
        'Освой базовые практики осознанности',
      ],
    },
  },
  {
    id: 'languages',
    priority: 17,
    applies: (ctx) => hasTag(ctx, 'global') || hasTalent(ctx, 'global-citizen'),
    recommendation: {
      id: 'languages',
      title: 'Усиливай знание языков',
      description:
        'Языки откроют тебе международные возможности и удалённую работу на весь мир. Это инвестиция, которая всегда окупается.',
      icon: 'Globe',
      checklist: [
        'Доведи английский до уровня свободного общения',
        'Используй приложения для ежедневной практики',
        'Смотри контент на изучаемом языке',
      ],
    },
  },
  {
    id: 'portfolio',
    priority: 6,
    applies: (ctx) => topDomainCount(ctx, 'creativity') >= 1 || topDomainCount(ctx, 'digital') >= 2,
    recommendation: {
      id: 'portfolio',
      title: 'Собери своё первое портфолио',
      description:
        'В современном мире портфолио важнее диплома. Начни собирать примеры своих работ уже сейчас — это твой главный аргумент.',
      icon: 'FolderOpen',
      checklist: [
        'Заведи папку или сайт для своих проектов',
        'Доделай хотя бы 3 работы до показуемого уровня',
        'Попроси обратную связь у профи',
      ],
    },
  },
  {
    id: 'general-growth',
    priority: 50,
    applies: () => true, // fallback, всегда применимо
    recommendation: {
      id: 'general-growth',
      title: 'Найди наставника в своей сфере',
      description:
        'Человек, который уже прошёл твой путь, сэкономит тебе годы. Не бойся написать тому, кем восхищаешься.',
      icon: 'Users',
      checklist: [
        'Составь список из 5 людей в интересных тебе профессиях',
        'Напиши им короткое уважительное сообщение с вопросом',
        'Подпишись на их контент и учись у них',
      ],
    },
  },
];
