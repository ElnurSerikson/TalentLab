import type { Question } from '@/domain/types';
import { SCREENING_QUESTIONS } from './screeningQuestions';
import { SCORING_QUESTIONS } from './scoringQuestions';

export const ALL_QUESTIONS: Question[] = [
  ...SCREENING_QUESTIONS,
  ...SCORING_QUESTIONS,
];

export const QUESTIONS_BY_ID: Record<string, Question> = Object.fromEntries(
  ALL_QUESTIONS.map((q) => [q.id, q]),
);

/** Pick the question text variant matching the user's free-form tag keys. */
export function resolveQuestionText(q: Question, tagKeys: string[]): string {
  if (q.trigger) {
    for (const [variantKey, tags] of Object.entries(q.trigger)) {
      if (tags.some((t) => tagKeys.includes(t)) && q.variants[variantKey]) {
        return q.variants[variantKey];
      }
    }
  }
  return q.variants.default;
}
