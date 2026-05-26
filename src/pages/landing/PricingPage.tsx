import { Link } from 'react-router-dom';
import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button, Reveal } from '@/components/ui';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { GridBackground } from '@/components/ui/GridBackground';

const FEATURES = [
  'База личности + разбор «Твой характер»',
  'Готовность к эпохе ИИ и 3 ярких черты',
  'Тесты по целям: работа, учёба, стартап',
  'Персональный план развития',
  'Сохранение результатов в личном кабинете',
];

export function PricingPage() {
  return (
    <>
      <GridBackground className="pointer-events-none fixed inset-0 -z-10" />
      <PageWrapper width="narrow">
        <Reveal className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-talent-slate-900">
            Прайс
          </h1>
          <p className="mx-auto mt-3 max-w-md text-lg text-talent-slate-500">
            Один тариф. Всё включено. Бесплатно.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <SpotlightCard className="p-8 sm:p-10">
            <div className="mb-5 inline-flex items-center gap-1.5 rounded-full bg-talent-violet-50 px-3 py-1 text-sm font-semibold text-talent-violet-600">
              <Sparkles className="h-4 w-4" />
              Полный доступ
            </div>

            <div className="flex items-end gap-2">
              <span className="text-5xl font-extrabold tracking-tight text-talent-slate-900">
                Бесплатно
              </span>
            </div>
            <p className="mt-1 text-sm text-talent-slate-500">Без карты и подписки</p>

            <ul className="mt-7 space-y-3">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-talent-orange-400 text-white">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-talent-slate-900">{f}</span>
                </li>
              ))}
            </ul>

            <Link to="/auth/login" className="mt-8 block">
              <Button
                variant="secondary"
                size="lg"
                fullWidth
                rightIcon={<ArrowRight className="h-5 w-5" />}
              >
                Начать бесплатно
              </Button>
            </Link>
          </SpotlightCard>
        </Reveal>
      </PageWrapper>
    </>
  );
}
