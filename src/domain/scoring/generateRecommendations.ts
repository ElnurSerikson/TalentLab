import type { Recommendation, RecommendationContext } from '@/domain/types';
import { RECOMMENDATION_RULES } from '@/data/recommendations';

const MAX_RECOMMENDATIONS = 5;

export function generateRecommendations(
  ctx: RecommendationContext,
): Recommendation[] {
  const applicable = RECOMMENDATION_RULES.filter((rule) => rule.applies(ctx)).sort(
    (a, b) => a.priority - b.priority,
  );

  const seen = new Set<string>();
  const out: Recommendation[] = [];
  for (const rule of applicable) {
    if (seen.has(rule.recommendation.id)) continue;
    seen.add(rule.recommendation.id);
    out.push(rule.recommendation);
    if (out.length >= MAX_RECOMMENDATIONS) break;
  }
  return out;
}
