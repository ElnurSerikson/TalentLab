import type { Question } from '@/domain/types';
import type { FounderRole } from './founder';

export interface StartupOption {
  key: string;
  label: string;
  roles?: Partial<Record<FounderRole, number>>;
  readiness?: number; // вклад в готовность основать своё (0..3)
}

export interface StartupQuestion {
  id: string;
  text: string;
  options: StartupOption[];
}

export const STARTUP_QUESTIONS: StartupQuestion[] = [
  {
    id: 's_pull',
    text: 'В команде, которая что-то строит с нуля, тебя естественно тянет…',
    options: [
      { key: 'a', label: 'Задавать направление и принимать решения', roles: { ceo: 2 } },
      { key: 'b', label: 'Придумывать, каким будет продукт', roles: { cpo: 2 } },
      { key: 'c', label: 'Строить и кодить', roles: { cto: 2 } },
      { key: 'd', label: 'Привлекать людей и рассказывать о проекте', roles: { cmo: 2 } },
      { key: 'e', label: 'Налаживать процессы, чтобы всё работало', roles: { coo: 2 } },
    ],
  },
  {
    id: 's_product',
    text: 'Что тебе интереснее в продукте?',
    options: [
      { key: 'a', label: 'Куда он движется и зачем', roles: { ceo: 2 } },
      { key: 'b', label: 'Чтобы им было удобно и приятно пользоваться', roles: { cpo: 2 } },
      { key: 'c', label: 'Как он устроен внутри', roles: { cto: 2 } },
      { key: 'd', label: 'Как о нём узнают и полюбят', roles: { cmo: 2 } },
      { key: 'e', label: 'Чтобы всё работало без сбоев', roles: { coo: 2 } },
    ],
  },
  {
    id: 's_role',
    text: 'Друзья запускают проект. За что берёшься ты?',
    options: [
      { key: 'a', label: 'За общее видение и решения', roles: { ceo: 2 } },
      { key: 'b', label: 'За то, каким будет сам продукт', roles: { cpo: 2 } },
      { key: 'c', label: 'За техническую реализацию', roles: { cto: 2 } },
      { key: 'd', label: 'За привлечение аудитории', roles: { cmo: 2 } },
      { key: 'e', label: 'За организацию и сроки', roles: { coo: 2 } },
    ],
  },
  {
    id: 's_fire',
    text: 'Что зажигает тебя сильнее всего?',
    options: [
      { key: 'a', label: 'Большая цель, которую никто ещё не достиг', roles: { ceo: 2 }, readiness: 2 },
      { key: 'b', label: 'Создать продукт, который полюбят', roles: { cpo: 2 }, readiness: 1 },
      { key: 'c', label: 'Решить сложную техническую задачу', roles: { cto: 2 }, readiness: 1 },
      { key: 'd', label: 'Видеть, как растут цифры и аудитория', roles: { cmo: 2 }, readiness: 1 },
      { key: 'e', label: 'Когда хаос превращается в чёткую систему', roles: { coo: 2 } },
    ],
  },
  {
    id: 's_superpower',
    text: 'В чём твоя главная суперсила?',
    options: [
      { key: 'a', label: 'Вести людей и держать курс', roles: { ceo: 2 } },
      { key: 'b', label: 'Чувствовать, что нужно пользователю', roles: { cpo: 2 } },
      { key: 'c', label: 'Строить то, что реально работает', roles: { cto: 2 } },
      { key: 'd', label: 'Доставать клиентов и внимание', roles: { cmo: 2 } },
      { key: 'e', label: 'Доводить и масштабировать', roles: { coo: 2 } },
    ],
  },
  {
    id: 's_risk',
    text: 'Стабильная зарплата или своё дело с риском?',
    options: [
      { key: 'a', label: 'Только своё — стабильность скучна', readiness: 3, roles: { ceo: 1 } },
      { key: 'b', label: 'Своё, но с подушкой безопасности', readiness: 2 },
      { key: 'c', label: 'Скорее стабильность, но пробовать интересно', readiness: 1 },
      { key: 'd', label: 'Стабильность важнее, риск пугает', readiness: 0 },
    ],
  },
  {
    id: 's_fail',
    text: 'Проект провалился, год работы впустую. Ты…',
    options: [
      { key: 'a', label: 'Извлеку урок и запущу следующее', readiness: 3, roles: { ceo: 1 } },
      { key: 'b', label: 'Тяжело, но через паузу вернусь', readiness: 2 },
      { key: 'c', label: 'Это надолго выбьет меня из колеи', readiness: 1 },
      { key: 'd', label: 'Больше в такое не полезу', readiness: 0 },
    ],
  },
  {
    id: 's_sell',
    text: 'Нужно продать продукт незнакомым людям. Ты…',
    options: [
      { key: 'a', label: 'Кайфую — обожаю убеждать', readiness: 3, roles: { cmo: 2 } },
      { key: 'b', label: 'Норм, могу, если надо', readiness: 2, roles: { cmo: 1 } },
      { key: 'c', label: 'Стрессую, но справлюсь', readiness: 1 },
      { key: 'd', label: 'Это совсем не моё', readiness: 0, roles: { cto: 1 } },
    ],
  },
  {
    id: 's_ambiguity',
    text: 'Всё неясно, инструкций нет, рынок меняется. Ты…',
    options: [
      { key: 'a', label: 'Кайфую от неопределённости', readiness: 3, roles: { ceo: 1 } },
      { key: 'b', label: 'Норм, разберусь по ходу', readiness: 2 },
      { key: 'c', label: 'Некомфортно, нужен хоть какой план', readiness: 1, roles: { coo: 1 } },
      { key: 'd', label: 'Нужны чёткие рамки, иначе теряюсь', readiness: 0, roles: { coo: 1 } },
    ],
  },
  {
    id: 's_start',
    text: 'У тебя есть идея. Когда начнёшь?',
    options: [
      { key: 'a', label: 'Уже сегодня — по ходу разберусь', readiness: 3, roles: { cto: 1 } },
      { key: 'b', label: 'Как накидаю план', readiness: 2, roles: { coo: 1 } },
      { key: 'c', label: 'Когда соберу команду', readiness: 1, roles: { ceo: 1 } },
      { key: 'd', label: 'Когда буду полностью уверен', readiness: 0 },
    ],
  },
  {
    id: 's_grind',
    text: 'Готов(а) пахать вечерами и выходными ради своего дела?',
    options: [
      { key: 'a', label: 'Да, если это моё — с удовольствием', readiness: 3 },
      { key: 'b', label: 'Какое-то время — да', readiness: 2 },
      { key: 'c', label: 'Только если очень надо', readiness: 1 },
      { key: 'd', label: 'Нет, баланс важнее', readiness: 0 },
    ],
  },
  {
    id: 's_why',
    text: 'Зачем тебе своё дело?',
    options: [
      { key: 'a', label: 'Изменить индустрию, оставить след', roles: { ceo: 2 }, readiness: 1 },
      { key: 'b', label: 'Свобода делать по-своему', roles: { cpo: 1 }, readiness: 1 },
      { key: 'c', label: 'Заработать большие деньги', roles: { cmo: 1 }, readiness: 1 },
      { key: 'd', label: 'Решить конкретную боль, которую знаю', roles: { cpo: 2, cto: 1 }, readiness: 1 },
    ],
  },
  {
    id: 's_annoy',
    text: 'Что бесит в работе на других?',
    options: [
      { key: 'a', label: 'Нет влияния на решения', roles: { ceo: 2 } },
      { key: 'b', label: 'Делают слабый продукт', roles: { cpo: 2 } },
      { key: 'c', label: 'Кривые технологии и легаси', roles: { cto: 2 } },
      { key: 'd', label: 'Не умеют продавать и расти', roles: { cmo: 2 } },
      { key: 'e', label: 'Бардак в процессах', roles: { coo: 2 } },
    ],
  },
  {
    id: 's_firstclients',
    text: 'Привлечь первых клиентов и партнёров — это…',
    options: [
      { key: 'a', label: 'Азарт и кайф', readiness: 3, roles: { cmo: 1, ceo: 1 } },
      { key: 'b', label: 'Рабочая задача, сделаю', readiness: 2, roles: { coo: 1 } },
      { key: 'c', label: 'Стресс, но вытяну', readiness: 1 },
      { key: 'd', label: 'Самое страшное в стартапе', readiness: 0 },
    ],
  },
];

/** Адаптер под общий движок QuizRunner (ему нужен тип Question для рендера). */
export const STARTUP_AS_QUESTIONS: Question[] = STARTUP_QUESTIONS.map((sq) => ({
  id: sq.id,
  category: 'behavior',
  type: 'choice4',
  variants: { default: sq.text },
  options: sq.options.map((o) => ({ key: o.key, label: o.label })),
  weights: { talents: {}, riasec: {} },
}));
