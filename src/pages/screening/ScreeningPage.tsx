import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { QuizRunner } from '@/components/test/QuizRunner';
import type { Milestone } from '@/components/test/QuizRunner';
import { Button, Card, toast } from '@/components/ui';
import { SCREENING_QUESTIONS } from '@/data/screeningQuestions';
import { useTestStore } from '@/store/testStore';
import { track } from '@/lib/analytics';

const MILESTONES: Record<number, Milestone> = {
  10: { emoji: '🎯', title: 'Отлично, ты прошёл треть!', subtitle: 'Так держать — дальше интереснее.' },
  20: { emoji: '💪', title: 'Уже больше половины!', subtitle: 'Ты отвечаешь быстро и честно — это здорово.' },
  30: { emoji: '🔥', title: 'Последний рывок!', subtitle: 'Осталось совсем чуть-чуть до следующей части.' },
};

export function ScreeningPage() {
  const navigate = useNavigate();
  const [done, setDone] = useState(false);

  const answers = useTestStore((s) => s.screeningAnswers);
  const setAnswer = useTestStore((s) => s.setScreeningAnswer);
  const index = useTestStore((s) => s.screeningIndex);
  const setIndex = useTestStore((s) => s.setScreeningIndex);
  const setStep = useTestStore((s) => s.setStep);

  const getValue = (id: string) =>
    answers.find((a) => a.questionId === id)?.value ?? null;

  if (done) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <Card className="p-8 text-center sm:p-12">
          <div className="mb-4 text-6xl">🎉</div>
          <h1 className="mb-2 text-3xl font-extrabold text-talent-slate-900">
            Ты прошёл скрининг!
          </h1>
          <p className="mx-auto mb-8 max-w-sm text-talent-slate-500">
            Теперь самое интересное — расскажи немного о себе своими словами.
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/test/scoring/freeform')}
            rightIcon={<ArrowRight className="h-5 w-5" />}
          >
            Дальше
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <QuizRunner
      questions={SCREENING_QUESTIONS}
      label="Вопрос"
      tagKeys={[]}
      index={index}
      setIndex={setIndex}
      getValue={getValue}
      onAnswer={setAnswer}
      milestones={MILESTONES}
      onSave={() => toast.success('Прогресс сохранён — можно вернуться позже')}
      onComplete={() => {
        setStep('freeform');
        track('screening_complete');
        setDone(true);
      }}
    />
  );
}
