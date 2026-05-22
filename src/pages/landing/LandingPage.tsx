import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Brain,
  ChevronDown,
  Compass,
  Sparkles,
  Target,
  Check,
  X,
} from 'lucide-react';
import { Button, Card, Badge, Reveal } from '@/components/ui';
import { cn } from '@/lib/cn';

export function LandingPage() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <HowItWorks />
      <WhatYouGet />
      <Comparison />
      <Faq />
      <FinalCta />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-72 w-[120%] -translate-x-1/2 rounded-full bg-talent-violet-100/60 blur-3xl" />
      </div>
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge tone="violet" className="mb-5">
            <Sparkles className="h-3.5 w-3.5" /> Бесплатно · 40 минут · без регистрации платежей
          </Badge>
          <h1 className="mx-auto max-w-3xl text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-talent-slate-900 sm:text-6xl">
            Найди свои таланты.
            <br />
            <span className="bg-gradient-to-r from-talent-violet-500 to-talent-violet-400 bg-clip-text text-transparent">
              Выбери профессию осознанно.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-talent-slate-500">
            TalentLab помогает понять не «кем быть», а <strong className="text-talent-slate-900">какой ты есть</strong> —
            твои сильные стороны, подходящие профессии и план развития.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/auth/register">
              <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
                Пройти тест бесплатно
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline">
                Как это работает
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-sm text-talent-slate-500">
            Для школьников 8–11 класс и студентов 1–3 курс
          </p>
        </motion.div>
      </div>
    </section>
  );
}

const STEPS = [
  { icon: Brain, title: 'Узнай себя', text: 'Пройди два блока вопросов — мы оценим 60 талантов и твой вектор интересов.' },
  { icon: Compass, title: 'Найди свою сферу', text: 'Получи топ профессий и сфер, которые резонируют именно с твоей личностью.' },
  { icon: Target, title: 'Получи план развития', text: 'Узнай, что прокачать и куда идти учиться, с конкретными шагами.' },
];

function HowItWorks() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <Reveal className="mb-12 text-center">
        <h2 className="text-3xl font-extrabold text-talent-slate-900 sm:text-4xl">
          Как это работает
        </h2>
        <p className="mt-3 text-talent-slate-500">Три простых шага — и ты знаешь о себе больше</p>
      </Reveal>
      <div className="grid gap-6 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.1}>
            <Card hoverable className="h-full">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-talent-violet-100 text-talent-violet-600">
                <s.icon className="h-6 w-6" />
              </div>
              <div className="mb-1 text-sm font-bold text-talent-violet-500">Шаг {i + 1}</div>
              <h3 className="mb-2 text-xl font-bold text-talent-slate-900">{s.title}</h3>
              <p className="text-talent-slate-500">{s.text}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const FEATURES = [
  { emoji: '🧬', title: 'Модель TalentLab-60', text: '60 талантов в 5 доменах, включая цифровую адаптивность — то, чего нет в старых тестах.' },
  { emoji: '🎯', title: 'RIASEC-профиль', text: 'Научный вектор интересов с радар-диаграммой и расшифровкой кода.' },
  { emoji: '💼', title: 'Топ профессий', text: 'Подбор профессий с процентом совпадения, зарплатами и вузами Казахстана.' },
  { emoji: '🚀', title: 'Личный план', text: 'Персональные рекомендации, что развивать и куда поступать.' },
];

function WhatYouGet() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold text-talent-slate-900 sm:text-4xl">
            Что ты получишь
          </h2>
          <p className="mt-3 text-talent-slate-500">Глубокий и понятный отчёт о тебе</p>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className="flex gap-4 rounded-2xl border border-talent-slate-200/60 p-5">
                <span className="text-3xl">{f.emoji}</span>
                <div>
                  <h3 className="mb-1 font-bold text-talent-slate-900">{f.title}</h3>
                  <p className="text-sm text-talent-slate-500">{f.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const COMPARE = [
  { label: 'Учитывает цифровые навыки и AI', old: false, talentlab: true },
  { label: 'Язык, понятный подростку', old: false, talentlab: true },
  { label: 'Конкретные профессии и вузы', old: false, talentlab: true },
  { label: 'Визуальный отчёт с графиками', old: false, talentlab: true },
  { label: 'Просто список «ты гуманитарий»', old: true, talentlab: false },
];

function Comparison() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <Reveal className="mb-10 text-center">
        <h2 className="text-3xl font-extrabold text-talent-slate-900 sm:text-4xl">
          Чем мы отличаемся от старых тестов
        </h2>
      </Reveal>
      <Reveal>
        <Card padded={false} className="overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 border-b border-talent-slate-200 bg-talent-violet-50/50 px-5 py-3 text-sm font-bold">
            <span>Возможность</span>
            <span className="w-24 text-center text-talent-slate-500">Старые тесты</span>
            <span className="w-24 text-center text-talent-violet-600">TalentLab</span>
          </div>
          {COMPARE.map((row) => (
            <div
              key={row.label}
              className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 border-b border-talent-slate-200/60 px-5 py-3 last:border-0"
            >
              <span className="text-sm text-talent-slate-900">{row.label}</span>
              <span className="flex w-24 justify-center">
                {row.old ? (
                  <Check className="h-5 w-5 text-talent-slate-500" />
                ) : (
                  <X className="h-5 w-5 text-talent-rose-500/60" />
                )}
              </span>
              <span className="flex w-24 justify-center">
                {row.talentlab ? (
                  <Check className="h-5 w-5 text-talent-emerald-500" />
                ) : (
                  <X className="h-5 w-5 text-talent-slate-200" />
                )}
              </span>
            </div>
          ))}
        </Card>
      </Reveal>
    </section>
  );
}

const FAQS = [
  { q: 'Это бесплатно?', a: 'Да, полностью. В демо-версии все функции открыты, без оплаты.' },
  { q: 'Сколько времени занимает тест?', a: 'Около 40 минут. Можно прерваться и продолжить позже — прогресс сохраняется.' },
  { q: 'Это точно про меня или общие фразы?', a: 'Мы оцениваем 60 талантов и 6 осей интересов по твоим ответам, поэтому результат персональный.' },
  { q: 'Нужно ли что-то знать заранее?', a: 'Нет. Просто отвечай честно — правильных и неправильных ответов нет.' },
  { q: 'А если я ещё не знаю, кем хочу стать?', a: 'Это нормально и даже здорово — тест как раз помогает разобраться и попробовать направления.' },
  { q: 'Где хранятся мои данные?', a: 'В демо все данные хранятся локально в твоём браузере и никуда не отправляются.' },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <Reveal className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-talent-slate-900 sm:text-4xl">
            Частые вопросы
          </h2>
        </Reveal>
        <div className="space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 0.04}>
                <Card padded={false} className="overflow-hidden">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-talent-slate-900">{item.q}</span>
                    <ChevronDown
                      className={cn(
                        'h-5 w-5 shrink-0 text-talent-slate-500 transition-transform',
                        isOpen && 'rotate-180',
                      )}
                    />
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-4 text-talent-slate-500">{item.a}</p>
                  </motion.div>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-talent-violet-500 to-talent-violet-600 px-6 py-14 text-center text-white shadow-soft-lg">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-talent-amber-400/30 blur-2xl" />
          <h2 className="text-3xl font-extrabold sm:text-4xl">Готов узнать себя?</h2>
          <p className="mx-auto mt-3 max-w-md text-talent-violet-100">
            Пройди тест и получи персональный отчёт уже через 40 минут.
          </p>
          <Link to="/auth/register" className="mt-8 inline-block">
            <Button size="lg" variant="secondary" rightIcon={<ArrowRight className="h-5 w-5" />}>
              Начать бесплатно
            </Button>
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
