import { Link } from 'react-router-dom';
import { ArrowRight, Lock } from 'lucide-react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Card, Icon } from '@/components/ui';
import { useUserStore } from '@/store/userStore';
import { cn } from '@/lib/cn';

interface TestCard {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  to?: string; // если нет — «скоро»
}

const TESTS: TestCard[] = [
  {
    id: 'startup',
    title: 'Какой стартап мне делать',
    subtitle: 'Фаундер-роль, типы стартапов и честный вердикт о готовности',
    icon: 'Rocket',
    color: '#7C3AED',
    to: '/test/startup',
  },
  {
    id: 'work',
    title: 'Какая работа мне подходит',
    subtitle: 'Топ профессий и идеальная рабочая среда под тебя',
    icon: 'Briefcase',
    color: '#10B981',
  },
  {
    id: 'study',
    title: 'Куда пойти учиться',
    subtitle: 'Направления обучения и как ты учишься лучше всего',
    icon: 'GraduationCap',
    color: '#F59E0B',
  },
];

export function TestsHubPage() {
  const user = useUserStore((s) => s.user);

  return (
    <PageWrapper width="wide">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-talent-slate-900 sm:text-4xl">
          {user?.name ? `${user.name}, выбери тест` : 'Выбери тест'}
        </h1>
        <p className="mt-2 text-talent-slate-500">
          Базовый профиль готов. Теперь посмотри на себя через нужную линзу — каждый тест
          даёт отдельный глубокий результат.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TESTS.map((t) => {
          const available = Boolean(t.to);
          const cardInner = (
            <Card
              hoverable={available}
              className={cn(
                'flex h-full flex-col',
                !available && 'opacity-60',
                available && 'cursor-pointer',
              )}
            >
              <span
                className="mb-4 grid h-12 w-12 place-items-center rounded-2xl text-white"
                style={{ background: t.color }}
              >
                <Icon name={t.icon} className="h-6 w-6" />
              </span>
              <h3 className="mb-1 text-lg font-bold text-talent-slate-900">{t.title}</h3>
              <p className="mb-4 flex-1 text-sm text-talent-slate-500">{t.subtitle}</p>
              {available ? (
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-talent-violet-600">
                  Пройти тест <ArrowRight className="h-4 w-4" />
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-talent-slate-500">
                  <Lock className="h-3.5 w-3.5" /> Скоро
                </span>
              )}
            </Card>
          );

          return t.to ? (
            <Link key={t.id} to={t.to}>
              {cardInner}
            </Link>
          ) : (
            <div key={t.id}>{cardInner}</div>
          );
        })}
      </div>
    </PageWrapper>
  );
}
