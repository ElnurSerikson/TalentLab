export type FounderRole = 'ceo' | 'cpo' | 'cto' | 'cmo' | 'coo';

export interface FounderRoleMeta {
  id: FounderRole;
  code: string; // CEO, CPO...
  name: string; // Визионер...
  tagline: string;
  description: string;
  superpower: string;
  gap: string;
  cofounder: FounderRole; // кого добрать в команду
  icon: string;
  color: string;
  startupTypes: string[]; // id типов стартапов, которые тебе ближе
}

export const FOUNDER_ROLES: Record<FounderRole, FounderRoleMeta> = {
  ceo: {
    id: 'ceo',
    code: 'CEO',
    name: 'Визионер',
    tagline: 'Задаёшь направление и ведёшь людей',
    description:
      'Ты видишь картину целиком, ставишь большую цель и умеешь зажечь ею других. Тебе комфортно принимать решения и брать ответственность за всё.',
    superpower: 'Видишь, куда идти, и ведёшь команду за собой',
    gap: 'Без сильного исполнителя рискуешь витать в идеях, не доводя до продукта',
    cofounder: 'cto',
    icon: 'Crown',
    color: '#7C3AED',
    startupTypes: ['marketplace', 'consumer', 'saas'],
  },
  cpo: {
    id: 'cpo',
    code: 'CPO',
    name: 'Продуктолог',
    tagline: 'Чувствуешь, что нужно людям',
    description:
      'Ты понимаешь боль пользователя и умеешь превратить её в понятный, удобный продукт. Для тебя важно, чтобы вещью хотелось пользоваться.',
    superpower: 'Превращаешь потребность людей в продукт, который любят',
    gap: 'Можешь залипнуть в шлифовке продукта и забыть про продажи и рост',
    cofounder: 'cmo',
    icon: 'Lightbulb',
    color: '#F59E0B',
    startupTypes: ['consumer', 'saas', 'content'],
  },
  cto: {
    id: 'cto',
    code: 'CTO',
    name: 'Строитель',
    tagline: 'Воплощаешь идею технологически',
    description:
      'Ты строишь то, что другие только обсуждают. Технологии и архитектура — твоя стихия, ты доводишь сложное до рабочего.',
    superpower: 'Реально строишь продукт, а не только говоришь о нём',
    gap: 'Рискуешь построить идеально то, что рынку не нужно',
    cofounder: 'cmo',
    icon: 'Cpu',
    color: '#0EA5E9',
    startupTypes: ['deeptech', 'ai', 'saas'],
  },
  cmo: {
    id: 'cmo',
    code: 'CMO',
    name: 'Гроусер',
    tagline: 'Находишь и растишь аудиторию',
    description:
      'Ты умеешь достучаться до людей, рассказать так, что зацепит, и привести клиентов. Рост и охват — то, что у тебя в крови.',
    superpower: 'Достаёшь клиентов и разгоняешь рост',
    gap: 'Без сильного продукта/технологии расти будет нечему',
    cofounder: 'cto',
    icon: 'Megaphone',
    color: '#F43F5E',
    startupTypes: ['content', 'consumer', 'marketplace'],
  },
  coo: {
    id: 'coo',
    code: 'COO',
    name: 'Операционист',
    tagline: 'Наводишь порядок и масштабируешь',
    description:
      'Ты превращаешь хаос в работающую систему: процессы, люди, сроки. На тебе всё держится и едет ровно.',
    superpower: 'Делаешь так, что всё работает стабильно и масштабируется',
    gap: 'Без визионера рискуешь идеально оптимизировать не то направление',
    cofounder: 'ceo',
    icon: 'Cog',
    color: '#10B981',
    startupTypes: ['services', 'saas', 'marketplace'],
  },
};

export interface StartupTypeMeta {
  id: string;
  name: string;
  description: string;
}

export const STARTUP_TYPES: Record<string, StartupTypeMeta> = {
  saas: { id: 'saas', name: 'B2B SaaS', description: 'Софт-сервис для бизнесов по подписке' },
  consumer: { id: 'consumer', name: 'Consumer-приложение', description: 'Массовый продукт для людей' },
  marketplace: { id: 'marketplace', name: 'Маркетплейс', description: 'Площадка, соединяющая спрос и предложение' },
  content: { id: 'content', name: 'Контент / медиа', description: 'Аудитория, бренд и монетизация внимания' },
  services: { id: 'services', name: 'Сервисный бизнес', description: 'Услуги и операционка с понятным процессом' },
  deeptech: { id: 'deeptech', name: 'Deep-tech', description: 'Сложные технологии и инженерия' },
  ai: { id: 'ai', name: 'AI-native', description: 'Продукт, построенный вокруг ИИ' },
};

export type FounderTier = 'ready' | 'cofounder' | 'tooEarly';

export interface VerdictMeta {
  tier: FounderTier;
  title: string;
  text: string;
  color: string;
}

/** Честный вердикт по готовности (0..100) и доминированию роли. */
export function founderVerdict(readiness: number, roleDominant: boolean): VerdictMeta {
  if (readiness >= 65) {
    return {
      tier: 'ready',
      title: roleDominant ? 'Ты готов(а) запускать своё' : 'Ты готов(а), но не в одиночку',
      text: roleDominant
        ? 'У тебя есть и драйв, и понятная сильная роль. Можешь стартовать соло — но кофаундер по слабой стороне ускорит кратно.'
        : 'Драйва хватает, но твои сильные стороны размазаны. Не тяни всё сам — собери команду, где каждый закрывает свою роль.',
      color: '#10B981',
    };
  }
  if (readiness >= 45) {
    return {
      tier: 'cofounder',
      title: 'Ты сильнее как кофаундер №2, чем как соло-основатель',
      text: 'У тебя есть конкретная сильная роль, но пока маловато готовности тащить риск и неопределённость в одиночку. Найди визионера-CEO и стань его правой рукой — так ты раскроешься быстрее.',
      color: '#F59E0B',
    };
  }
  return {
    tier: 'tooEarly',
    title: 'Честно: пока рано основывать своё',
    text: 'Тебя пока не тянет в риск и хаос стартапа — и это нормально. Лучший ход: пойти ранним сотрудником в сильную команду, прокачаться 1–2 года и вернуться к идее своего дела уже с опытом.',
    color: '#F43F5E',
  };
}
