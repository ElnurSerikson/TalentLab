import { useNavigate } from 'react-router-dom';
import { QuizRunner } from '@/components/test/QuizRunner';
import type { Milestone } from '@/components/test/QuizRunner';
import { BASE_QUESTIONS } from '@/data/baseQuestions';
import { useBaseStore } from '@/store/baseStore';
import { useUserStore } from '@/store/userStore';
import { recordBaseResult } from '@/lib/convexClient';

const MILESTONES: Record<number, Milestone> = {
  10: { emoji: '🧩', title: 'Уже треть позади!', subtitle: 'Портрет начинает складываться.' },
  20: { emoji: '🔥', title: 'Финишная прямая!', subtitle: 'Осталось совсем немного — держим темп.' },
};

export function BaseTestPage() {
  const navigate = useNavigate();
  const answers = useBaseStore((s) => s.answers);
  const setAnswer = useBaseStore((s) => s.setAnswer);
  const index = useBaseStore((s) => s.index);
  const setIndex = useBaseStore((s) => s.setIndex);
  const generateCharacter = useBaseStore((s) => s.generateCharacter);

  const getValue = (id: string) =>
    answers.find((a) => a.questionId === id)?.value ?? null;

  return (
    <QuizRunner
      questions={BASE_QUESTIONS}
      label="Вопрос"
      tagKeys={[]}
      index={index}
      setIndex={setIndex}
      getValue={getValue}
      onAnswer={setAnswer}
      milestones={MILESTONES}
      onComplete={() => {
        const character = generateCharacter();
        const user = useUserStore.getState().user;
        // Анонимно отправляем результат в Convex (best-effort, не блокирует UI).
        void recordBaseResult({
          name: user?.name || undefined,
          age: user?.age ?? undefined,
          gender: user?.gender ?? undefined,
          userVersion: user?.userVersion,
          answers: useBaseStore.getState().answers,
          archetypeId: character.archetype.id,
          archetypeName: character.archetype.name,
          domains: character.domains,
          topTraits: character.topTraits.map((t) => ({
            id: t.talent.id,
            name: t.talent.name,
            percent: t.percent,
          })),
          aiReadiness: character.aiReadiness,
        });
        navigate('/onboarding/character');
      }}
    />
  );
}
