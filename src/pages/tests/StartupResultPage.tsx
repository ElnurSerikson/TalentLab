import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, AlertTriangle, UserPlus } from 'lucide-react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button, Card, Icon, ProgressBar, Reveal, Badge } from '@/components/ui';
import { FOUNDER_ROLES, STARTUP_TYPES } from '@/data/founder';
import { useStartupStore } from '@/store/startupStore';
import { useUserStore } from '@/store/userStore';

export function StartupResultPage() {
  const navigate = useNavigate();
  const result = useStartupStore((s) => s.result);
  const user = useUserStore((s) => s.user);

  useEffect(() => {
    if (!result) navigate('/test/startup', { replace: true });
  }, [result, navigate]);

  if (!result) return null;

  const role = FOUNDER_ROLES[result.primary];
  const cofounder = FOUNDER_ROLES[result.cofounder];
  const name = user?.name || 'Друг';

  return (
    <PageWrapper width="narrow" className="max-w-2xl space-y-6">
      {/* Hero — фаундер-роль */}
      <Reveal>
        <Card className="relative overflow-hidden p-6 text-center sm:p-10">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-20 blur-2xl"
            style={{ background: role.color }}
          />
          <motion.div
            initial={{ scale: 0, rotate: -12 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.1 }}
            className="mx-auto mb-4 grid h-24 w-24 place-items-center rounded-3xl text-white"
            style={{ background: role.color }}
          >
            <Icon name={role.icon} className="h-12 w-12" />
          </motion.div>
          <p className="text-talent-slate-500">{name}, в стартапе ты —</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-talent-slate-900 sm:text-4xl">
            {role.code} · {role.name}
          </h1>
          <p className="mt-1 font-medium" style={{ color: role.color }}>
            {role.tagline}
          </p>
          <p className="mx-auto mt-5 max-w-lg text-talent-slate-900">{role.description}</p>
        </Card>
      </Reveal>

      {/* Честный вердикт */}
      <Reveal delay={0.05}>
        <Card
          className="border-l-4"
          style={{ borderLeftColor: result.verdict.color }}
        >
          <div className="mb-2 flex items-center gap-2">
            <span
              className="rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white"
              style={{ background: result.verdict.color }}
            >
              Готовность {result.readiness}%
            </span>
          </div>
          <h2 className="mb-2 text-xl font-extrabold text-talent-slate-900">
            {result.verdict.title}
          </h2>
          <p className="mb-4 text-talent-slate-900">{result.verdict.text}</p>
          <ProgressBar value={result.readiness} barClassName="" />
        </Card>
      </Reveal>

      {/* Роли */}
      <Reveal delay={0.1}>
        <Card>
          <h2 className="mb-4 text-lg font-bold text-talent-slate-900">Твой расклад по ролям</h2>
          <div className="space-y-3">
            {result.roles.map((r) => {
              const meta = FOUNDER_ROLES[r.role];
              return (
                <div key={r.role} className="flex items-center gap-3">
                  <div className="flex w-40 shrink-0 items-center gap-2">
                    <span
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-white"
                      style={{ background: meta.color }}
                    >
                      <Icon name={meta.icon} className="h-4 w-4" />
                    </span>
                    <span className="truncate text-sm font-medium text-talent-slate-900">
                      {meta.code} · {meta.name}
                    </span>
                  </div>
                  <div className="flex-1">
                    <ProgressBar value={r.percent} />
                  </div>
                  <span className="w-10 text-right text-sm font-bold tabular text-talent-slate-900">
                    {r.percent}%
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      </Reveal>

      {/* Суперсила + пробел */}
      <div className="grid gap-6 sm:grid-cols-2">
        <Reveal delay={0.12}>
          <Card className="h-full">
            <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-talent-emerald-500/15 text-talent-emerald-500">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="mb-1 text-lg font-bold text-talent-slate-900">Твоя суперсила</h3>
            <p className="text-sm text-talent-slate-500">{role.superpower}</p>
          </Card>
        </Reveal>
        <Reveal delay={0.15}>
          <Card className="h-full">
            <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-talent-rose-500/15 text-talent-rose-500">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h3 className="mb-1 text-lg font-bold text-talent-slate-900">Твой фатальный пробел</h3>
            <p className="text-sm text-talent-slate-500">{role.gap}</p>
          </Card>
        </Reveal>
      </div>

      {/* Кофаундер */}
      <Reveal delay={0.18}>
        <Card className="flex items-center gap-4 bg-talent-violet-50/60">
          <span
            className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white"
            style={{ background: cofounder.color }}
          >
            <UserPlus className="h-6 w-6" />
          </span>
          <div>
            <h3 className="font-bold text-talent-slate-900">
              Тебе нужен кофаундер: {cofounder.code} · {cofounder.name}
            </h3>
            <p className="text-sm text-talent-slate-500">
              Он закроет твою слабую сторону — {cofounder.tagline.toLowerCase()}.
            </p>
          </div>
        </Card>
      </Reveal>

      {/* Типы стартапов */}
      <Reveal delay={0.2}>
        <Card>
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-talent-violet-500" />
            <h3 className="font-bold text-talent-slate-900">Тебе ближе такие стартапы</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {result.startupTypes.map((id) => {
              const t = STARTUP_TYPES[id];
              if (!t) return null;
              return (
                <Badge key={id} tone="violet" className="px-3 py-1.5">
                  {t.name}
                </Badge>
              );
            })}
          </div>
          <p className="mt-3 text-sm text-talent-slate-500">
            {result.startupTypes
              .map((id) => STARTUP_TYPES[id]?.description)
              .filter(Boolean)
              .join(' · ')}
          </p>
        </Card>
      </Reveal>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button size="lg" onClick={() => navigate('/tests')} rightIcon={<ArrowRight className="h-5 w-5" />}>
          Другие тесты
        </Button>
        <Button size="lg" variant="outline" onClick={() => navigate('/dashboard')}>
          В личный кабинет
        </Button>
      </div>
    </PageWrapper>
  );
}
