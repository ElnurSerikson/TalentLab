import { useNavigate } from 'react-router-dom';
import { QuizRunner } from '@/components/test/QuizRunner';
import type { Milestone } from '@/components/test/QuizRunner';
import { STARTUP_AS_QUESTIONS } from '@/data/startupQuestions';
import { useStartupStore } from '@/store/startupStore';
import { recordFounderResult } from '@/lib/convexClient';

const MILESTONES: Record<number, Milestone> = {
  7: { emoji: '🚀', title: 'Половина!', subtitle: 'Уже виден твой фаундер-почерк.' },
};

export function StartupTestPage() {
  const navigate = useNavigate();
  const answers = useStartupStore((s) => s.answers);
  const setAnswer = useStartupStore((s) => s.setAnswer);
  const index = useStartupStore((s) => s.index);
  const setIndex = useStartupStore((s) => s.setIndex);
  const generateResult = useStartupStore((s) => s.generateResult);

  const getValue = (id: string) =>
    answers.find((a) => a.questionId === id)?.value ?? null;

  return (
    <QuizRunner
      questions={STARTUP_AS_QUESTIONS}
      label="Вопрос"
      tagKeys={[]}
      index={index}
      setIndex={setIndex}
      getValue={getValue}
      onAnswer={setAnswer}
      milestones={MILESTONES}
      onComplete={() => {
        const result = generateResult();
        void recordFounderResult({
          answers: useStartupStore.getState().answers,
          primary: result.primary,
          secondary: result.secondary,
          readiness: result.readiness,
          verdictTier: result.verdict.tier,
          roles: result.roles,
          startupTypes: result.startupTypes,
        });
        navigate('/test/startup/result');
      }}
    />
  );
}
