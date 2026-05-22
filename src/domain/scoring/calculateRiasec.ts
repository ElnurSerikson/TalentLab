import type {
  RiasecAxis,
  RiasecResult,
  ScreeningAnswer,
  TestAnswers,
} from '@/domain/types';
import { QUESTIONS_BY_ID } from '@/data/questions';

const AXES: RiasecAxis[] = ['R', 'I', 'A', 'S', 'E', 'C'];

export function calculateRiasec(answers: TestAnswers): RiasecResult {
  const score: Record<RiasecAxis, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
  const maxPossible: Record<RiasecAxis, number> = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

  const all: ScreeningAnswer[] = [...answers.screening, ...answers.scoring];

  for (const ans of all) {
    const q = QUESTIONS_BY_ID[ans.questionId];
    if (!q) continue;
    const key = String(ans.value);

    for (const axis of AXES) {
      const weights = q.weights.riasec[axis];
      if (!weights) continue;
      score[axis] += weights[key] ?? 0;
      maxPossible[axis] += Math.max(...Object.values(weights));
    }
  }

  const scores = {} as Record<RiasecAxis, number>;
  for (const axis of AXES) {
    scores[axis] =
      maxPossible[axis] > 0 ? Math.round((score[axis] / maxPossible[axis]) * 100) : 0;
  }

  const code = [...AXES]
    .sort((a, b) => scores[b] - scores[a])
    .slice(0, 3)
    .join('');

  return { code, scores };
}

export const RIASEC_LABELS: Record<RiasecAxis, { name: string; desc: string }> = {
  R: { name: 'Реалистичный', desc: 'практик, любишь работать руками и с техникой' },
  I: { name: 'Исследовательский', desc: 'мыслитель, любишь анализировать и узнавать' },
  A: { name: 'Артистичный', desc: 'творец, любишь самовыражение и идеи' },
  S: { name: 'Социальный', desc: 'помощник, любишь работать с людьми' },
  E: { name: 'Предприимчивый', desc: 'лидер, любишь убеждать и вести' },
  C: { name: 'Конвенциональный', desc: 'организатор, любишь порядок и структуру' },
};
