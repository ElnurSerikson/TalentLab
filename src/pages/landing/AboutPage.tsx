import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, Compass, Briefcase } from 'lucide-react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button, Card, Reveal, Icon } from '@/components/ui';
import { GridBackground } from '@/components/ui/GridBackground';
import { DOMAINS, DOMAIN_ORDER } from '@/data/domains';

const AUDIENCE = [
  {
    icon: GraduationCap,
    title: 'Школьникам',
    text: 'Понять свои сильные стороны раньше, чем выбирать профиль, экзамены и вуз.',
  },
  {
    icon: Compass,
    title: 'Студентам',
    text: 'Свериться с собой: туда ли идёшь и куда приложить силы, чтобы расти быстрее.',
  },
  {
    icon: Briefcase,
    title: 'Взрослым',
    text: 'Переосмыслить карьеру, сменить сферу или решиться на своё дело — опираясь на сильные стороны.',
  },
];

export function AboutPage() {
  return (
    <>
      <GridBackground className="pointer-events-none fixed inset-0 -z-10" />
      <PageWrapper width="wide">
        <Reveal>
          <h1 className="text-4xl font-extrabold tracking-tight text-talent-slate-900">
            О проекте TalentLab
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-talent-slate-500">
            TalentLab — бесплатный AI-навигатор по твоим сильным сторонам. Мы помогаем
            понять не «кем быть», а «какой ты есть», и спроецировать это на конкретную
            цель: учёбу, работу или своё дело.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <h2 className="mb-2 text-2xl font-bold text-talent-slate-900">Модель TalentLab-60</h2>
          <p className="mb-6 max-w-2xl text-talent-slate-500">
            Один тест на личность раскрывает 60 талантов в 5 гранях — от мышления и
            творчества до цифровой адаптивности, которой нет в классических тестах. Эта
            «база» лежит в основе всех целевых тестов: проходишь её один раз, а дальше
            смотришь на себя под разными углами.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DOMAIN_ORDER.map((d) => {
              const dom = DOMAINS[d];
              return (
                <Card key={d} className="flex items-start gap-4">
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white"
                    style={{ background: dom.color }}
                  >
                    <Icon name={dom.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-bold text-talent-slate-900">{dom.name}</h3>
                    <p className="text-sm text-talent-slate-500">{dom.short}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          <h2 className="mb-2 text-2xl font-bold text-talent-slate-900">Для кого это</h2>
          <p className="mb-6 max-w-2xl text-talent-slate-500">
            TalentLab одинаково полезен на разных этапах пути — когда выбираешь
            направление впервые или пересобираешь его заново.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {AUDIENCE.map((a) => (
              <Card key={a.title} className="flex flex-col gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-talent-violet-50 text-talent-violet-600">
                  <a.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-bold text-talent-slate-900">{a.title}</h3>
                  <p className="text-sm text-talent-slate-500">{a.text}</p>
                </div>
              </Card>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-12">
          <Card className="bg-talent-violet-50/60">
            <h2 className="mb-2 text-xl font-bold text-talent-slate-900">Честно, без гороскопов</h2>
            <p className="max-w-2xl text-talent-slate-900">
              Результат строится на твоих ответах, а не на общих фразах, которые подходят
              каждому. Мы показываем не только сильные стороны, но и зоны роста — и говорим
              прямо, даже когда правда не самая приятная. Это карта для решений, а не
              приятный комплимент.
            </p>
          </Card>
        </Reveal>

        <Reveal delay={0.25} className="mt-12 text-center">
          <Link to="/auth/login">
            <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
              Пройти тест бесплатно
            </Button>
          </Link>
        </Reveal>
      </PageWrapper>
    </>
  );
}
