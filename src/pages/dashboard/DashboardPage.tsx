import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, LogOut, Play, Sparkles } from 'lucide-react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Avatar, Button, Card, Icon, ProgressBar } from '@/components/ui';
import { useUserStore } from '@/store/userStore';
import { useReportStore } from '@/store/reportStore';
import { useTestStore } from '@/store/testStore';

const STEP_LABEL: Record<string, string> = {
  screening: 'Скрининг',
  freeform: 'Рассказ о себе',
  scoring: 'Основной блок',
  completed: 'Завершён',
};

const STEP_PATH: Record<string, string> = {
  screening: '/test/screening',
  freeform: '/test/scoring/freeform',
  scoring: '/test/scoring/questions',
  completed: '/report',
};

const EXPECTATION_LABELS: Record<string, string> = {
  understand_strengths: 'Понять сильные стороны',
  undecided: 'Не знаю кем стать',
  doubting: 'Сомневаюсь в профессии',
  preparing_admission: 'Готовлюсь к поступлению',
  just_curious: 'Просто интересно',
};

export function DashboardPage() {
  const navigate = useNavigate();
  const user = useUserStore((s) => s.user);
  const logout = useUserStore((s) => s.logout);
  const report = useReportStore((s) => s.report);
  const { screeningAnswers, scoringAnswers, currentStep } = useTestStore();

  if (!user) return null;

  const answered = screeningAnswers.length + scoringAnswers.length;
  const totalQ = 35 + 50;
  const testProgress = Math.round((answered / totalQ) * 100);
  const testStarted = answered > 0 && !report;

  return (
    <PageWrapper width="wide">
      <div className="mb-8 flex items-center gap-4">
        <Avatar name={user.name || user.email} size={56} />
        <div>
          <h1 className="text-2xl font-extrabold text-talent-slate-900">
            Привет, {user.name || 'друг'}!
          </h1>
          <p className="text-talent-slate-500">Твой личный кабинет TalentLab</p>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Report card */}
        <Card className="lg:col-span-2">
          <h2 className="mb-4 text-lg font-bold text-talent-slate-900">Твой отчёт</h2>
          {report ? (
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <span
                  className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl text-white"
                  style={{ background: report.archetype.color }}
                >
                  <Icon name={report.archetype.icon} className="h-8 w-8" />
                </span>
                <div>
                  <div className="text-xl font-extrabold text-talent-slate-900">
                    {report.archetype.name}
                  </div>
                  <div className="text-sm text-talent-slate-500">
                    {report.archetype.tagline}
                  </div>
                </div>
              </div>
              <Link to="/report">
                <Button rightIcon={<ArrowRight className="h-4 w-4" />}>Посмотреть</Button>
              </Link>
            </div>
          ) : testStarted ? (
            <div>
              <p className="mb-3 text-talent-slate-500">
                Ты на этапе «{STEP_LABEL[currentStep]}». Продолжи, чтобы получить отчёт.
              </p>
              <ProgressBar value={testProgress} className="mb-4" showLabel />
              <Button
                onClick={() => navigate(STEP_PATH[currentStep])}
                leftIcon={<Play className="h-4 w-4" />}
              >
                Продолжить тест
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <div className="mb-3 text-4xl">🚀</div>
              <p className="mb-4 text-talent-slate-500">
                Ты ещё не проходил тест. Это займёт около 40 минут.
              </p>
              <Link to="/test/screening">
                <Button leftIcon={<Sparkles className="h-4 w-4" />}>Пройти тест</Button>
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
            <Row
              label="Статус"
              value={
                user.socialStatus === 'school'
                  ? 'Школьник'
                  : user.socialStatus === 'student'
                    ? 'Студент'
                    : 'Другое'
              }
            />
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

      {/* Settings */}
      <Card className="mt-5">
        <h2 className="mb-4 text-lg font-bold text-talent-slate-900">Настройки</h2>
        <div className="space-y-3 text-sm">
          <SettingRow label="Уведомления" hint="Скоро будет доступно">
            <span className="inline-flex h-6 w-11 items-center rounded-full bg-talent-slate-200 px-0.5">
              <span className="h-5 w-5 rounded-full bg-white shadow" />
            </span>
          </SettingRow>
          <SettingRow label="Язык" hint="Русский">
            <span className="text-talent-slate-500">RU</span>
          </SettingRow>
          <div className="pt-2">
            <Button
              variant="ghost"
              onClick={() => {
                logout();
                navigate('/');
              }}
              leftIcon={<LogOut className="h-4 w-4" />}
            >
              Выйти из аккаунта
            </Button>
          </div>
        </div>
      </Card>
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

function SettingRow({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <div className="font-medium text-talent-slate-900">{label}</div>
        {hint && <div className="text-xs text-talent-slate-500">{hint}</div>}
      </div>
      {children}
    </div>
  );
}
