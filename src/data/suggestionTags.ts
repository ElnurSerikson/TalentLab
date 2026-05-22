import type { SuggestionGroup, SuggestionTag } from '@/domain/types';

export const SUGGESTION_GROUPS: Record<SuggestionGroup, string> = {
  hobbies: 'Увлечения',
  strengths: 'Сильные стороны',
  fears: 'Что меня тревожит',
  goals: 'Мои цели',
};

export const SUGGESTION_TAGS: SuggestionTag[] = [
  // --- Увлечения ---
  { id: 'games', label: 'Игры', group: 'hobbies', keys: ['games', 'gamedev', 'tech'] },
  { id: 'music', label: 'Музыка', group: 'hobbies', keys: ['art', 'music'] },
  { id: 'sport', label: 'Спорт', group: 'hobbies', keys: ['active', 'sport'] },
  { id: 'coding', label: 'Программирование', group: 'hobbies', keys: ['tech', 'games', 'logic'] },
  { id: 'drawing', label: 'Рисование', group: 'hobbies', keys: ['art', 'design'] },
  { id: 'photo', label: 'Фотография', group: 'hobbies', keys: ['art', 'design'] },
  { id: 'languages', label: 'Иностранные языки', group: 'hobbies', keys: ['global', 'social'] },
  { id: 'reading', label: 'Чтение', group: 'hobbies', keys: ['knowledge', 'art'] },
  { id: 'blogging', label: 'Блогинг / соцсети', group: 'hobbies', keys: ['content', 'social'] },
  { id: 'science', label: 'Наука и опыты', group: 'hobbies', keys: ['knowledge', 'logic'] },
  { id: 'travel', label: 'Путешествия', group: 'hobbies', keys: ['global', 'active'] },
  { id: 'volunteer', label: 'Волонтёрство', group: 'hobbies', keys: ['help', 'social'] },

  // --- Сильные стороны ---
  { id: 'social', label: 'Общительный', group: 'strengths', keys: ['social'] },
  { id: 'listener', label: 'Умею слушать', group: 'strengths', keys: ['social', 'help'] },
  { id: 'good-student', label: 'Хорошо учусь', group: 'strengths', keys: ['knowledge', 'logic'] },
  { id: 'creative', label: 'Креативный', group: 'strengths', keys: ['art', 'design'] },
  { id: 'persistent', label: 'Усидчивый', group: 'strengths', keys: ['focus'] },
  { id: 'leader-strength', label: 'Веду за собой', group: 'strengths', keys: ['lead', 'social'] },
  { id: 'analytical-strength', label: 'Аналитический склад ума', group: 'strengths', keys: ['logic', 'knowledge'] },
  { id: 'hands-on', label: 'Люблю работать руками', group: 'strengths', keys: ['active', 'tech'] },

  // --- Страхи / тревоги ---
  { id: 'fear-routine', label: 'Боюсь рутины', group: 'fears', keys: ['fear_routine'] },
  { id: 'fear-public', label: 'Боюсь публичных выступлений', group: 'fears', keys: ['fear_public'] },
  { id: 'fear-undecided', label: 'Не знаю, чего хочу', group: 'fears', keys: ['undecided'] },
  { id: 'fear-parents', label: 'Боюсь не оправдать ожидания родителей', group: 'fears', keys: ['fear_parents'] },
  { id: 'fear-money', label: 'Боюсь мало зарабатывать', group: 'fears', keys: ['money'] },
  { id: 'fear-mistake', label: 'Боюсь ошибиться с выбором', group: 'fears', keys: ['undecided'] },
  { id: 'fear-boring', label: 'Боюсь скучной работы', group: 'fears', keys: ['fear_routine'] },

  // --- Цели ---
  { id: 'goal-money', label: 'Хочу хорошо зарабатывать', group: 'goals', keys: ['money'] },
  { id: 'goal-help', label: 'Хочу помогать людям', group: 'goals', keys: ['help', 'social'] },
  { id: 'goal-travel', label: 'Хочу путешествовать', group: 'goals', keys: ['global', 'active'] },
  { id: 'goal-create', label: 'Хочу творить', group: 'goals', keys: ['art', 'design'] },
  { id: 'goal-freedom', label: 'Хочу свободный график', group: 'goals', keys: ['remote', 'fear_routine'] },
  { id: 'goal-own-business', label: 'Хочу свой бизнес', group: 'goals', keys: ['lead', 'money'] },
  { id: 'goal-recognition', label: 'Хочу признание', group: 'goals', keys: ['social', 'content'] },
  { id: 'goal-stable', label: 'Хочу стабильность', group: 'goals', keys: ['stable'] },
];

export const TAGS_BY_GROUP: Record<SuggestionGroup, SuggestionTag[]> = {
  hobbies: SUGGESTION_TAGS.filter((t) => t.group === 'hobbies'),
  strengths: SUGGESTION_TAGS.filter((t) => t.group === 'strengths'),
  fears: SUGGESTION_TAGS.filter((t) => t.group === 'fears'),
  goals: SUGGESTION_TAGS.filter((t) => t.group === 'goals'),
};

/** Flatten selected tag ids to their trigger keys (used for question variant selection). */
export function tagsToKeys(tagIds: string[]): string[] {
  const keys = new Set<string>();
  for (const id of tagIds) {
    const tag = SUGGESTION_TAGS.find((t) => t.id === id);
    tag?.keys.forEach((k) => keys.add(k));
    keys.add(id);
  }
  return [...keys];
}
