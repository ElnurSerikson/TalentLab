import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Brain, Compass, Sparkles, Target } from 'lucide-react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button, Card, Input, ProgressBar } from '@/components/ui';
import { BirthYearPicker } from '@/components/ui/BirthYearPicker';
import { useUserStore } from '@/store/userStore';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { saveUserProfile } from '@/lib/convexClient';
import { track } from '@/lib/analytics';
import type { Gender } from '@/domain/types';
import { cn } from '@/lib/cn';

const TOTAL = 3;
const CURRENT_YEAR = new Date().getFullYear();

export function OnboardingPage() {
  const navigate = useNavigate();
  const user = useUserStore((s) => s.user);
  const setProfile = useUserStore((s) => s.setProfile);
  const completeOnboarding = useUserStore((s) => s.completeOnboarding);

  const [step, setStep] = useLocalStorage('talentlab:onboarding-step', 0);

  const [name, setName] = useState(user?.name ?? '');
  const [birthYear, setBirthYear] = useState<number | null>(
    user?.age ? CURRENT_YEAR - user.age : null,
  );
  const [gender, setGender] = useState<Gender | ''>(user?.gender ?? '');
  const [profileError, setProfileError] = useState('');

  // Если онбординг уже был завершён в прошлой сессии — возвращаем в кабинет,
  // не заставляя проходить его заново. (Захват значения на момент монтирования,
  // чтобы не перехватывать завершение прямо в этой сессии на 3-м экране.)
  const completedOnMount = useRef(user?.onboardingComplete ?? false);
  useEffect(() => {
    if (completedOnMount.current) navigate('/dashboard', { replace: true });
  }, [navigate]);

  const next = () => setStep(Math.min(step + 1, TOTAL - 1));
  const back = () => setStep(Math.max(step - 1, 0));

  const saveProfileAndNext = () => {
    if (!name.trim()) {
      setProfileError('Как тебя зовут?');
      return;
    }
    if (!birthYear) {
      setProfileError('Выбери год рождения');
      return;
    }
    if (!gender) {
      setProfileError('Выбери пол');
      return;
    }
    setProfileError('');
    const age = CURRENT_YEAR - birthYear;
    setProfile({ name: name.trim(), age, gender: gender || null });
    // Привязываем данные к авторизованному пользователю в Convex (best-effort).
    void saveUserProfile({ name: name.trim(), age, gender: gender || undefined });
    // Онбординг (анкета) по факту завершён — фиксируем, чтобы при возврате
    // пользователь попадал сразу в кабинет.
    completeOnboarding();
    next();
  };

  const startBaseTest = () => {
    track('onboarding_complete');
    setStep(0);
    navigate('/onboarding/base');
  };

  // Возвращающегося «завершённого» пользователя не показываем онбординг — редирект в эффекте.
  if (completedOnMount.current) return null;

  return (
    <PageWrapper width="narrow">
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm font-medium text-talent-slate-500">
          <span>Знакомство</span>
          <span className="tabular">{step + 1} / {TOTAL}</span>
        </div>
        <ProgressBar value={((step + 1) / TOTAL) * 100} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.25 }}
        >
          {step === 0 && <IntroStep />}

          {step === 1 && (
            <Card className="p-6 sm:p-8">
              <h2 className="mb-1 text-2xl font-bold text-talent-slate-900">Расскажи о себе</h2>
              <p className="mb-6 text-talent-slate-500">Это поможет подобрать тон и формулировки</p>
              <div className="space-y-4">
                <Input label="Имя" value={name} onChange={(e) => setName(e.target.value)} placeholder="Как тебя зовут?" />
                <BirthYearPicker
                  label="Год рождения"
                  value={birthYear}
                  onChange={setBirthYear}
                />
                <div>
                  <span className="mb-1.5 block text-sm font-medium text-talent-slate-900">Пол</span>
                  <div className="flex flex-wrap gap-2">
                    {([
                      ['male', 'Мужской'],
                      ['female', 'Женский'],
                    ] as const).map(([val, label]) => (
                      <Chip key={val} active={gender === val} onClick={() => setGender(val)}>
                        {label}
                      </Chip>
                    ))}
                  </div>
                </div>
                {profileError && <p className="text-sm text-talent-rose-500">{profileError}</p>}
              </div>
            </Card>
          )}

          {step === 2 && (
            <Card className="p-6 text-center sm:p-10">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-talent-violet-100 text-talent-violet-600">
                <Sparkles className="h-8 w-8" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-talent-slate-900">
                Сначала — короткий тест характера
              </h2>
              <p className="mx-auto max-w-sm text-talent-slate-500">
                28 коротких вопросов, чтобы понять твои сильные стороны и из чего
                складывается твой характер. Займёт минут 5 — отвечай честно, правильных
                и неправильных ответов нет.
              </p>
            </Card>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex items-center justify-between">
        {step > 0 ? (
          <Button variant="ghost" onClick={back} leftIcon={<ArrowLeft className="h-4 w-4" />}>
            Назад
          </Button>
        ) : (
          <span />
        )}
        {step === 0 && <Button onClick={next} rightIcon={<ArrowRight className="h-4 w-4" />}>Дальше</Button>}
        {step === 1 && <Button onClick={saveProfileAndNext} rightIcon={<ArrowRight className="h-4 w-4" />}>Дальше</Button>}
        {step === 2 && (
          <Button size="lg" onClick={startBaseTest} rightIcon={<ArrowRight className="h-4 w-4" />}>
            Начать
          </Button>
        )}
      </div>

      {step === 2 && (
        <div className="mt-3 text-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-sm font-medium text-talent-slate-500 transition-colors hover:text-talent-violet-600"
          >
            Перейти в кабинет
          </button>
        </div>
      )}
    </PageWrapper>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-xl border-2 px-4 py-2 text-sm font-medium transition-all',
        active
          ? 'border-talent-violet-500 bg-talent-violet-50 text-talent-violet-700'
          : 'border-talent-slate-200 text-talent-slate-900 hover:border-talent-violet-300',
      )}
    >
      {children}
    </button>
  );
}

function IntroStep() {
  const cards = [
    { icon: Brain, title: 'Узнай себя', text: '60 талантов в 5 гранях' },
    { icon: Compass, title: 'Найди своё', text: 'Работа, учёба или стартап' },
    { icon: Target, title: 'Получи план', text: 'Что развивать и куда расти' },
  ];
  return (
    <Card className="p-6 text-center sm:p-10">
      <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-talent-violet-100 text-talent-violet-600">
        <Sparkles className="h-8 w-8" />
      </div>
      <h2 className="mb-2 text-2xl font-bold text-talent-slate-900">
        Привет! Я TalentLab — помогу понять твои таланты!
      </h2>
      <p className="mb-8 text-talent-slate-500">Пройди тест и узнай свои сильные стороны</p>
      <div className="grid gap-3 sm:grid-cols-3">
        {cards.map((c) => (
          <div key={c.title} className="rounded-2xl bg-talent-cream-50 p-4">
            <c.icon className="mx-auto mb-2 h-7 w-7 text-talent-violet-500" />
            <div className="font-bold text-talent-slate-900">{c.title}</div>
            <div className="text-sm text-talent-slate-500">{c.text}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
