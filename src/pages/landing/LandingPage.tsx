import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Brain,
  Briefcase,
  Check,
  Compass,
  Dna,
  GraduationCap,
  ListChecks,
  Radar,
  Rocket,
  Sparkles,
  Target,
} from 'lucide-react';
import { Button, Card, Badge, Reveal, Icon } from '@/components/ui';
import { PageBackground } from '@/components/ui/PageBackground';
import { ParticlesBackground } from '@/components/ui/ParticlesBackground';

// Все контентные секции лендинга держим в одной ширине с хедером/футером (max-w-6xl).
const SECTION = 'mx-auto max-w-6xl px-4 sm:px-6';

// Единый стандарт декоративных иконок на лендинге: line-иконка lucide в мягком
// оранжевом квадрате. Один цвет и один стиль везде.
const ICON_BOX =
  'inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-talent-orange-400/15 text-talent-orange-400';
// Вариант с primary-фиолетовым (для секции «Один тест — три пути»).
const ICON_BOX_VIOLET =
  'inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-talent-violet-100 text-talent-violet-600';

export function LandingPage() {
  return (
    <div className="relative overflow-hidden">
      <PageBackground />
      <Hero />
      <HowItWorks />
      <ThreePaths />
      <WhatYouGet />
      <DevelopmentPlan />
      <FinalCta />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <ParticlesBackground className="pointer-events-none absolute inset-0 z-0" />
      <div className={`${SECTION} relative z-10 py-16 text-center sm:py-24`}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge tone="orange" className="mb-5">
            <Sparkles className="h-3.5 w-3.5" /> Бесплатно · займёт пару минут · результат сразу
          </Badge>
          <h1 className="mx-auto max-w-3xl text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-talent-slate-900 sm:text-6xl">
            Найди свои таланты.
            <br />
            <span className="bg-gradient-to-r from-talent-violet-500 to-talent-violet-400 bg-clip-text text-transparent">
              Получи персональный план развития.
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-talent-slate-500">
            <strong className="text-talent-slate-900">TalentLab</strong> — бесплатный AI-навигатор,
            который покажет твои сильные стороны и подскажет, куда расти: в учёбе, работе или
            своём деле. Узнай не «кем быть», а <strong className="text-talent-slate-900">какой ты есть</strong>.
          </p>
          <div className="mt-8 flex justify-center">
            <Link to="/auth/register">
              <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
                Пройти тест бесплатно
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

const STEPS = [
  {
    icon: Brain,
    title: 'Пройди короткий тест',
    text: 'Ответь на простые вопросы — за пару минут узнаешь свой характер и сильные стороны.',
  },
  {
    icon: Compass,
    title: 'Выбери свою цель',
    text: 'Учёба, работа или свой стартап — пройди отдельный тест под то, что для тебя важно.',
  },
  {
    icon: Target,
    title: 'Получи результат и план',
    text: 'Персональный профиль и конкретные шаги: что развивать и куда двигаться дальше.',
  },
];

function HowItWorks() {
  return (
    <section className="py-16">
      <div className={SECTION}>
        <Reveal className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold text-talent-slate-900 sm:text-4xl">Как это работает</h2>
          <p className="mt-3 text-talent-slate-500">Три простых шага — и ты знаешь о себе больше</p>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <Card hoverable className="h-full">
                <div className={`mb-4 ${ICON_BOX}`}>
                  <s.icon className="h-6 w-6" />
                </div>
                <div className="mb-1 text-sm font-bold text-talent-violet-600">Шаг {i + 1}</div>
                <h3 className="mb-2 text-xl font-bold text-talent-slate-900">{s.title}</h3>
                <p className="text-talent-slate-500">{s.text}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const PATHS = [
  {
    icon: GraduationCap,
    color: '#7C3AED',
    title: 'Куда пойти учиться',
    text: 'Направления и специальности, где твои способности раскроются по максимуму.',
  },
  {
    icon: Briefcase,
    color: '#10B981',
    title: 'Какую профессию выбрать',
    text: 'Работа и роли, в которых ты будешь силён, успешен и в кайфе.',
  },
  {
    icon: Rocket,
    color: '#F59E0B',
    title: 'Какой стартап начать',
    text: 'Твоя роль фаундера и тип дела, которое подходит именно тебе.',
  },
];

function ThreePaths() {
  return (
    <section className="py-16">
      <div className={SECTION}>
        <Reveal className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold text-talent-slate-900 sm:text-4xl">
            Один тест — три пути
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-talent-slate-500">
            Сильные стороны у тебя одни. А применить их можно по-разному — выбери свою цель,
            и мы подскажем направление.
          </p>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-3">
          {PATHS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <Card hoverable className="h-full">
                <span className={`mb-4 ${ICON_BOX_VIOLET}`}>
                  <p.icon className="h-6 w-6" />
                </span>
                <h3 className="mb-2 text-xl font-bold text-talent-slate-900">{p.title}</h3>
                <p className="text-talent-slate-500">{p.text}</p>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const FEATURES = [
  { icon: Dna, title: 'Модель TalentLab-60', text: '60 талантов в 5 гранях, включая цифровую адаптивность и ИИ — то, чего нет в старых тестах.' },
  { icon: Radar, title: 'RIASEC-профиль', text: 'Научный вектор интересов с радар-диаграммой и расшифровкой кода.' },
  { icon: Compass, title: 'Совпадения по целям', text: 'Профессии, направления учёбы и роль в стартапе — с процентом, насколько это твоё.' },
  { icon: Rocket, title: 'Личный план', text: 'Персональные шаги: что прокачать и куда двигаться под твою цель.' },
];

function WhatYouGet() {
  return (
    <section className="py-16">
      <div className={SECTION}>
      <Reveal className="mb-12 text-center">
        <h2 className="text-3xl font-extrabold text-talent-slate-900 sm:text-4xl">Что ты получишь</h2>
        <p className="mt-3 text-talent-slate-500">Глубокий и понятный отчёт о тебе</p>
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2">
        {FEATURES.map((f, i) => (
          <Reveal key={f.title} delay={i * 0.08}>
            <div className="flex gap-4 rounded-2xl bg-white p-5 shadow-soft">
              <span className={`shrink-0 ${ICON_BOX}`}>
                <f.icon className="h-6 w-6" />
              </span>
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

const REPORT_BLOCKS = [
  { icon: 'Sparkles', title: 'Твой характер', text: 'Архетип и профиль по 5 граням: мышление, творчество, люди, действие, цифра.' },
  { icon: 'Bot', title: 'Готовность к эпохе ИИ', text: 'Отдельная метрика — насколько ты на одной волне с новым миром.' },
  { icon: 'Gem', title: 'Сильные стороны', text: 'Твои самые яркие таланты, объяснённые простым языком.' },
  { icon: 'Compass', title: 'Куда применить себя', text: 'Профессии, направления учёбы и роль в стартапе — под тебя.' },
];

const PLAN_STEPS = [
  'Что прокачать — конкретные навыки и зоны роста',
  'С чего начать — первые шаги и полезные ресурсы',
  'Куда двигаться — направление под твою цель',
];

function DevelopmentPlan() {
  return (
    <section className="py-16">
      <div className={SECTION}>
        <Reveal className="mb-12 text-center">
          <h2 className="text-3xl font-extrabold text-talent-slate-900 sm:text-4xl">
            И главное — персональный план развития
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-talent-slate-500">
            TalentLab не просто говорит «вот твои таланты». Он показывает, что с этим делать
            дальше — по шагам.
          </p>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
          {/* Что в отчёте */}
          <Reveal>
            <Card className="h-full">
              <h3 className="mb-4 text-lg font-bold text-talent-slate-900">Что внутри отчёта</h3>
              <ul className="space-y-4">
                {REPORT_BLOCKS.map((b) => (
                  <li key={b.title} className="flex gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-talent-orange-400/15 text-talent-orange-400">
                      <Icon name={b.icon} className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="font-semibold text-talent-slate-900">{b.title}</div>
                      <div className="text-sm text-talent-slate-500">{b.text}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>

          {/* План развития — акцентная карточка */}
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col rounded-2xl bg-gradient-to-br from-talent-violet-500 to-talent-violet-600 p-6 text-white shadow-soft-lg sm:p-8">
              <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
                <ListChecks className="h-6 w-6" />
              </span>
              <h3 className="mb-2 text-2xl font-extrabold">Твой план развития</h3>
              <p className="mb-6 text-talent-violet-100">
                Не абстрактные советы, а конкретные шаги под твой профиль и цель.
              </p>
              <ul className="space-y-3">
                {PLAN_STEPS.map((step) => (
                  <li key={step} className="flex items-start gap-2.5">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/20">
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="text-talent-violet-50">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className={`${SECTION} py-20`}>
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-talent-violet-500 to-talent-violet-600 px-6 py-14 text-center text-white shadow-soft-lg">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-talent-orange-400/30 blur-2xl" />
          <h2 className="text-3xl font-extrabold sm:text-4xl">Готов узнать себя?</h2>
          <p className="mx-auto mt-3 max-w-md text-talent-violet-100">
            Пройди тест и получи персональный профиль и план развития — бесплатно.
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
