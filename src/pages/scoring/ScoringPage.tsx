import { useNavigate } from 'react-router-dom';
import { QuizRunner } from '@/components/test/QuizRunner';
import type { Milestone } from '@/components/test/QuizRunner';
import { toast } from '@/components/ui';
import { SCORING_QUESTIONS } from '@/data/scoringQuestions';
import { tagsToKeys } from '@/data/suggestionTags';
import { useTestStore } from '@/store/testStore';
import { track } from '@/lib/analytics';

const MILESTONES: Record<number, Milestone> = {
  15: { emoji: '🔍', title: 'Уже видим интересную картину!', subtitle: 'Продолжай в том же духе.' },
  30: { emoji: '✨', title: 'Профиль становится чётче!', subtitle: 'Ты молодец, осталось меньше половины.' },
  45: { emoji: '🏁', title: 'Финишная прямая!', subtitle: 'Последние вопросы — и узнаешь результат.' },
};

export function ScoringPage() {
  const navigate = useNavigate();

  const answers = useTestStore((s) => s.scoringAnswers);
  const setAnswer = useTestStore((s) => s.setScoringAnswer);
  const index = useTestStore((s) => s.scoringIndex);
  const setIndex = useTestStore((s) => s.setScoringIndex);
  const freeform = useTestStore((s) => s.freeform);
  const setStep = useTestStore((s) => s.setStep);

  const tagKeys = tagsToKeys(freeform.tags);

  const getValue = (id: string) =>
    answers.find((a) => a.questionId === id)?.value ?? null;

  return (
    <QuizRunner
      questions={SCORING_QUESTIONS}
      label="Вопрос"
      tagKeys={tagKeys}
      index={index}
      setIndex={setIndex}
      getValue={getValue}
      onAnswer={setAnswer}
      milestones={MILESTONES}
      onSave={() => toast.success('Прогресс сохранён — можно вернуться позже')}
      onComplete={() => {
        setStep('completed');
        track('scoring_complete');
        navigate('/test/processing');
      }}
    />
  );
}
