import type { ScreeningAnswer, TalentResult, TestAnswers } from '@/domain/types';
import { QUESTIONS_BY_ID } from '@/data/questions';
import { TALENTS } from '@/data/talents';

/**
 * Accumulate raw talent scores from all answers, normalize against the maximum
 * achievable per talent, and return a ranked list of all 60 talents.
 */
export function calculateTalents(answers: TestAnswers): TalentResult[] {
  const score: Record<string, number> = {};
  const maxPossible: Record<string, number> = {};

  const all: ScreeningAnswer[] = [...answers.screening, ...answers.scoring];

  for (const ans of all) {
    const q = QUESTIONS_BY_ID[ans.questionId];
    if (!q) continue;
    const key = String(ans.value);

    for (const [talentId, weights] of Object.entries(q.weights.talents)) {
      if (!weights) continue;
      const contribution = weights[key] ?? 0;
      const max = Math.max(...Object.values(weights));
      score[talentId] = (score[talentId] ?? 0) + contribution;
      maxPossible[talentId] = (maxPossible[talentId] ?? 0) + max;
    }
  }

  const results: TalentResult[] = TALENTS.map((talent) => {
    const raw = score[talent.id] ?? 0;
    const max = maxPossible[talent.id] ?? 0;
    const percent = max > 0 ? (raw / max) * 100 : 0;
    return { talent, score: raw, percent: Math.round(percent), rank: 0 };
  });

  results.sort((a, b) => b.percent - a.percent || b.score - a.score);
  results.forEach((r, i) => {
    r.rank = i + 1;
  });

  return results;
}
