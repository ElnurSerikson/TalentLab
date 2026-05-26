import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Bot, Sparkles } from 'lucide-react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button, Card, Icon, ProgressBar, Reveal } from '@/components/ui';
import { DOMAINS } from '@/data/domains';
import { useUserStore } from '@/store/userStore';
import { useBaseStore } from '@/store/baseStore';

export function CharacterPage() {
  const navigate = useNavigate();
  const user = useUserStore((s) => s.user);
  const completeOnboarding = useUserStore((s) => s.completeOnboarding);
  const character = useBaseStore((s) => s.character);

  // If somehow opened without a computed character, send back to the base test.
  useEffect(() => {
    if (!character) navigate('/onboarding/base', { replace: true });
  }, [character, navigate]);

  if (!character) return null;

  const name = user?.name || 'Друг';

  const finish = (to: string) => {
    completeOnboarding();
    navigate(to);
  };

  return (
    <PageWrapper width="narrow" className="max-w-2xl">
      {/* Hero */}
      <Reveal>
        <Card className="relative overflow-hidden p-6 text-center sm:p-10">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-20 blur-2xl"
            style={{ background: character.archetype.color }}
          />
          <motion.div
            initial={{ scale: 0, rotate: -12 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.1 }}
            className="mx-auto mb-4 grid h-24 w-24 place-items-center rounded-3xl text-white"
            style={{ background: character.archetype.color }}
          >
            <Icon name={character.archetype.icon} className="h-12 w-12" />
          </motion.div>
          <p className="text-talent-slate-500">{name}, твой характер —</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-talent-slate-900 sm:text-4xl">
            {character.archetype.name}
          </h1>
          <p className="mt-1 font-medium text-talent-violet-600">
            {character.archetype.tagline}
          </p>
          <p className="mx-auto mt-5 max-w-lg text-talent-slate-900">{character.summary}</p>
        </Card>
      </Reveal>

      {/* Domain profile */}
      <Reveal delay={0.05} className="mt-6">
        <Card>
          <h2 className="mb-4 text-lg font-bold text-talent-slate-900">Твой профиль по 5 граням</h2>
          <div className="space-y-3">
            {character.domains.map((d) => {
              const meta = DOMAINS[d.domain];
              return (
                <div key={d.domain} className="flex items-center gap-3">
                  <div className="flex w-44 shrink-0 items-center gap-2">
                    <span
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-white"
                      style={{ background: meta.color }}
                    >
                      <Icon name={meta.icon} className="h-4 w-4" />
                    </span>
                    <span className="truncate text-sm font-medium text-talent-slate-900">
                      {meta.name}
                    </span>
                  </div>
                  <div className="flex-1">
                    <ProgressBar value={d.percent} barClassName="" />
                  </div>
                  <span className="w-10 text-right text-sm font-bold tabular text-talent-slate-900">
                    {d.percent}%
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      </Reveal>

      {/* AI readiness + top traits */}
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <Reveal delay={0.1}>
          <Card className="h-full bg-gradient-to-br from-talent-violet-500 to-talent-violet-600 text-white">
            <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/20">
              <Bot className="h-6 w-6" />
            </div>
            <h3 className="mb-1 text-lg font-bold">Готовность к эпохе ИИ</h3>
            <p className="mb-3 text-sm text-talent-violet-100">
              Насколько естественно ты осваиваешь технологии и AI.
            </p>
            <div className="mb-2 text-4xl font-extrabold tabular">{character.aiReadiness}%</div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/25">
              <motion.div
                className="h-full rounded-full bg-talent-orange-400"
                initial={{ width: 0 }}
                animate={{ width: `${character.aiReadiness}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.15}>
          <Card className="h-full">
            <h3 className="mb-3 text-lg font-bold text-talent-slate-900">Три ярких черты</h3>
            <div className="space-y-3">
              {character.topTraits.map((t) => (
                <div key={t.talent.id} className="flex items-center gap-3">
                  <span
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white"
                    style={{ background: t.talent.color }}
                  >
                    <Icon name={t.talent.icon} className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="font-bold text-talent-slate-900">{t.talent.name}</div>
                    <div className="truncate text-sm text-talent-slate-500">
                      {t.talent.shortDesc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Reveal>
      </div>

      {/* Teaser to future tests */}
      <Reveal delay={0.2} className="mt-6">
        <Card className="bg-talent-violet-50/60 text-center">
          <div className="mb-2 inline-flex items-center gap-1.5 text-talent-violet-600">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-semibold">Это только начало</span>
          </div>
          <p className="mx-auto max-w-md text-talent-slate-900">
            Дальше ты сможешь пройти отдельные тесты и узнать,{' '}
            <strong>на какой работе расцветёшь</strong>, <strong>куда пойти учиться</strong> и{' '}
            <strong>какой стартап тебе делать</strong>.
          </p>
        </Card>
      </Reveal>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button size="lg" onClick={() => finish('/tests')} rightIcon={<ArrowRight className="h-5 w-5" />}>
          Выбрать тест
        </Button>
        <Button size="lg" variant="outline" onClick={() => finish('/dashboard')}>
          В личный кабинет
        </Button>
      </div>
    </PageWrapper>
  );
}
