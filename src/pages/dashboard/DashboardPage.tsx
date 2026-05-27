import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button, Card, Icon } from '@/components/ui';
import { useUserStore } from '@/store/userStore';
import { useReportStore } from '@/store/reportStore';
import { useBaseStore } from '@/store/baseStore';

const EXPECTATION_LABELS: Record<string, string> = {
  understand_strengths: 'Понять сильные стороны',
  undecided: 'Не знаю кем стать',
  doubting: 'Сомневаюсь в профессии',
  preparing_admission: 'Готовлюсь к поступлению',
  just_curious: 'Просто интересно',
};

export function DashboardPage() {
  const user = useUserStore((s) => s.user);
  const report = useReportStore((s) => s.report);
  const character = useBaseStore((s) => s.character);

  if (!user) return null;

  return (
    <PageWrapper width="wide">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-talent-slate-900">
          Привет, {user.name || 'друг'}!
        </h1>
        <p className="text-talent-slate-500">Твой личный кабинет TalentLab</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Character card */}
        <Card className="lg:col-span-2">
          <h2 className="mb-4 text-lg font-bold text-talent-slate-900">Твой характер</h2>
          {character ? (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <span
                  className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-white"
                  style={{ background: character.archetype.color }}
                >
                  <Icon name={character.archetype.icon} className="h-8 w-8" />
                </span>
                <div>
                  <div className="text-xl font-extrabold text-talent-slate-900">
                    {character.archetype.name}
                  </div>
                  <div className="text-sm text-talent-slate-500">
                    {character.archetype.tagline}
                  </div>
                </div>
              </div>
              <Link to="/onboarding/character">
                <Button rightIcon={<ArrowRight className="h-4 w-4" />}>Посмотреть</Button>
              </Link>
            </div>
          ) : (
            <div className="text-center">
              <div className="mb-3 text-4xl">🧭</div>
              <p className="mb-4 text-talent-slate-500">
                Пройди короткий базовый тест — узнаешь свой характер за пару минут.
              </p>
              <Link to="/onboarding/base">
                <Button leftIcon={<Sparkles className="h-4 w-4" />}>Пройти базовый тест</Button>
              </Link>
            </div>
          )}
        </Card>

        {/* Profile card */}
        <Card>
          <h2 className="mb-4 text-lg font-bold text-talent-slate-900">Твой профиль</h2>
          <dl className="space-y-2 text-sm">
            <Row label="Имя" value={user.name || '—'} />
            <Row label="Возраст" value={user.age ? String(user.age) : '—'} />
            <Row label="Email" value={user.email} />
          </dl>
          {user.expectations.length > 0 && (
            <div className="mt-4">
              <p className="mb-2 text-sm font-semibold text-talent-slate-900">Цели</p>
              <div className="flex flex-wrap gap-1.5">
                {user.expectations.map((e) => (
                  <span key={e} className="rounded-full bg-talent-violet-50 px-2.5 py-1 text-xs font-medium text-talent-violet-600">
                    {EXPECTATION_LABELS[e] ?? e}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Tests CTA */}
      <Card className="mt-5 flex flex-col gap-3 bg-talent-violet-50/60 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-lg font-bold text-talent-slate-900">Профориентационные тесты</h2>
          <p className="text-sm text-talent-slate-500">
            Узнай, какой стартап тебе делать, на какой работе расцветёшь и куда пойти учиться.
          </p>
        </div>
        <Link to="/tests" className="shrink-0">
          <Button rightIcon={<ArrowRight className="h-4 w-4" />}>Выбрать тест</Button>
        </Link>
      </Card>

      {report && report.professions.length > 0 && (
        <Card className="mt-5">
          <h2 className="mb-4 text-lg font-bold text-talent-slate-900">Топ профессия для тебя</h2>
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="font-bold text-talent-slate-900">
                {report.professions[0].profession.name}
              </div>
              <div className="text-sm text-talent-slate-500">
                {report.professions[0].matchPercent}% совпадение
              </div>
            </div>
            <Link to="/report/professions">
              <Button variant="outline" size="sm" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Все профессии
              </Button>
            </Link>
          </div>
        </Card>
      )}
    </PageWrapper>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-talent-slate-500">{label}</dt>
      <dd className="truncate font-medium text-talent-slate-900">{value}</dd>
    </div>
  );
}
