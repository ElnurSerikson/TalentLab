import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Brain, Compass, Sparkles, Target } from 'lucide-react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button, Card, Input, ProgressBar } from '@/components/ui';
import { useUserStore } from '@/store/userStore';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { track } from '@/lib/analytics';
import type { Gender, SocialStatus } from '@/domain/types';
import { cn } from '@/lib/cn';

const TOTAL = 4;

const EXPECTATIONS = [
  { id: 'understand_strengths', label: 'Хочу понять свои сильные стороны' },
  { id: 'undecided', label: 'Не знаю, кем стать' },
  { id: 'doubting', label: 'Сомневаюсь в выбранной профессии' },
  { id: 'preparing_admission', label: 'Готовлюсь к поступлению' },
  { id: 'just_curious', label: 'Просто интересно' },
];

export function OnboardingPage() {
  const navigate = useNavigate();
  const user = useUserStore((s) => s.user);
  const setProfile = useUserStore((s) => s.setProfile);
  const completeOnboarding = useUserStore((s) => s.completeOnboarding);

  const [step, setStep] = useLocalStorage('talentlab:onboarding-step', 0);

  const [name, setName] = useState(user?.name ?? '');
  const [age, setAge] = useState<string>(user?.age ? String(user.age) : '');
  const [gender, setGender] = useState<Gender | ''>(user?.gender ?? '');
  const [status, setStatus] = useState<SocialStatus | ''>(user?.socialStatus ?? '');
  const [expectations, setExpectations] = useState<string[]>(user?.expectations ?? []);
  const [profileError, setProfileError] = useState('');

  const next = () => setStep(Math.min(step + 1, TOTAL - 1));
  const back = () => setStep(Math.max(step - 1, 0));

  const saveProfileAndNext = () => {
    if (!name.trim()) {
      setProfileError('Как тебя зовут?');
      return;
    }
    const ageNum = Number(age);
    if (!age || Number.isNaN(ageNum) || ageNum < 10 || ageNum > 30) {
      setProfileError('Укажи возраст (10–30)');
      return;
    }
    setProfileError('');
    setProfile({
      name: name.trim(),
      age: ageNum,
      gender: gender || null,
      socialStatus: status || null,
    });
    next();
  };

  const toggleExpectation = (id: string) => {
    setExpectations((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id],
    );
  };

  const finish = () => {
    setProfile({ expectations });
    completeOnboarding();
    track('onboarding_complete', { expectations });
    setStep(0);
    navigate('/test/screening');
  };

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
                <Input label="Имя" value={name} onChange={(e) => setName(e.target.value)} placeholder="Например, Айгерим" />
                <Input
                  label="Возраст"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="16"
                />
                <div>
                  <span className="mb-1.5 block text-sm font-medium text-talent-slate-900">Пол</span>
                  <div className="flex flex-wrap gap-2">
                    {([
                      ['male', 'Мужской'],
                      ['female', 'Женский'],
                      ['prefer_not_to_say', 'Не хочу указывать'],
                    ] as const).map(([val, label]) => (
                      <Chip key={val} active={gender === val} onClick={() => setGender(val)}>
                        {label}
                      </Chip>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="mb-1.5 block text-sm font-medium text-talent-slate-900">Статус</span>
                  <div className="flex flex-wrap gap-2">
                    {([
                      ['school', 'Школьник'],
                      ['student', 'Студент'],
                      ['other', 'Другое'],
                    ] as const).map(([val, label]) => (
                      <Chip key={val} active={status === val} onClick={() => setStatus(val)}>
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
            <Card className="p-6 sm:p-8">
              <h2 className="mb-1 text-2xl font-bold text-talent-slate-900">Чего ты ждёшь от теста?</h2>
              <p className="mb-6 text-talent-slate-500">Можно выбрать несколько</p>
              <div className="space-y-3">
                {EXPECTATIONS.map((e) => {
                  const active = expectations.includes(e.id);
                  return (
                    <button
                      key={e.id}
                      onClick={() => toggleExpectation(e.id)}
                      className={cn(
                        'flex w-full items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all',
                        active
                          ? 'border-talent-violet-500 bg-talent-violet-50'
                          : 'border-talent-slate-200 hover:border-talent-violet-300',
                      )}
                    >
                      <span
                        className={cn(
                          'grid h-5 w-5 shrink-0 place-items-center rounded-md border-2',
                          active ? 'border-talent-violet-500 bg-talent-violet-500' : 'border-talent-slate-200',
                        )}
                      >
                        {active && <span className="h-2 w-2 rounded-sm bg-white" />}
                      </span>
                      <span className="font-medium text-talent-slate-900">{e.label}</span>
                    </button>
                  );
                })}
              </div>
            </Card>
          )}

          {step === 3 && (
            <Card className="p-6 text-center sm:p-10">
              <div className="mb-4 text-5xl">🚀</div>
              <h2 className="mb-2 text-2xl font-bold text-talent-slate-900">
                {name ? `${name}, ты готов!` : 'Ты готов!'}
              </h2>
              <p className="mx-auto max-w-sm text-talent-slate-500">
                Тест состоит из двух частей и займёт около 40 минут. Можно прерваться и
                продолжить позже — прогресс сохранится.
              </p>
            </Card>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 flex items-center justify-between">
        <Button variant="ghost" onClick={back} disabled={step === 0} leftIcon={<ArrowLeft className="h-4 w-4" />}>
          Назад
        </Button>
        {step === 0 && <Button onClick={next} rightIcon={<ArrowRight className="h-4 w-4" />}>Дальше</Button>}
        {step === 1 && <Button onClick={saveProfileAndNext} rightIcon={<ArrowRight className="h-4 w-4" />}>Дальше</Button>}
        {step === 2 && <Button onClick={next} rightIcon={<ArrowRight className="h-4 w-4" />}>Дальше</Button>}
        {step === 3 && <Button size="lg" onClick={finish} rightIcon={<ArrowRight className="h-4 w-4" />}>Начать скрининг</Button>}
      </div>
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
    { icon: Brain, title: 'Узнай себя', text: '60 талантов в 5 доменах' },
    { icon: Compass, title: 'Найди сферу', text: 'Профессии под твою личность' },
    { icon: Target, title: 'Получи план', text: 'Что развивать и куда идти' },
  ];
  return (
    <Card className="p-6 text-center sm:p-10">
      <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-talent-violet-100 text-talent-violet-600">
        <Sparkles className="h-8 w-8" />
      </div>
      <h2 className="mb-2 text-2xl font-bold text-talent-slate-900">
        Привет! Я TalentLab — твой карьерный навигатор
      </h2>
      <p className="mb-8 text-talent-slate-500">Вот что мы сделаем вместе</p>
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
