import type {
  CharacterResult,
  DomainScore,
  ScreeningAnswer,
  TalentDomain,
  TalentResult,
} from '@/domain/types';
import { BASE_QUESTIONS } from '@/data/baseQuestions';
import { TALENTS_BY_ID } from '@/data/talents';
import { DOMAIN_ORDER } from '@/data/domains';
import { archetypeForDomains } from '@/data/archetypes';

const BASE_BY_ID = Object.fromEntries(BASE_QUESTIONS.map((q) => [q.id, q]));

function emptyDomains(): Record<TalentDomain, number> {
  return { thinking: 0, creativity: 0, people: 0, action: 0, digital: 0 };
}

/**
 * Compute the "Твой характер" snapshot from the 12-question base.
 * Accumulates per-talent and per-domain scores directly (base questions are
 * not part of the v1 question index used by the deep-test scorer).
 */
export function computeCharacter(baseAnswers: ScreeningAnswer[]): CharacterResult {
  const tScore: Record<string, number> = {};
  const tMax: Record<string, number> = {};
  const dScore = emptyDomains();
  const dMax = emptyDomains();

  for (const ans of baseAnswers) {
    const q = BASE_BY_ID[ans.questionId];
    if (!q) continue;
    const key = String(ans.value);

    for (const [talentId, weights] of Object.entries(q.weights.talents)) {
      if (!weights) continue;
      const contribution = weights[key] ?? 0;
      const max = Math.max(...Object.values(weights));
      tScore[talentId] = (tScore[talentId] ?? 0) + contribution;
      tMax[talentId] = (tMax[talentId] ?? 0) + max;

      const domain = TALENTS_BY_ID[talentId]?.domain;
      if (domain) {
        dScore[domain] += contribution;
        dMax[domain] += max;
      }
    }
  }

  const domains: DomainScore[] = DOMAIN_ORDER.map((d) => ({
    domain: d,
    percent: dMax[d] > 0 ? Math.round((dScore[d] / dMax[d]) * 100) : 0,
  })).sort((a, b) => b.percent - a.percent);

  const topTraits: TalentResult[] = Object.keys(tScore)
    .map((id) => {
      const talent = TALENTS_BY_ID[id];
      const percent = tMax[id] > 0 ? Math.round((tScore[id] / tMax[id]) * 100) : 0;
      return { talent, score: tScore[id], percent, rank: 0 };
    })
    .filter((r) => r.talent)
    .sort((a, b) => b.percent - a.percent || b.score - a.score)
    .slice(0, 3)
    .map((r, i) => ({ ...r, rank: i + 1 }));

  const archetype = archetypeForDomains(domains[0].domain, domains[1].domain);
  const aiReadiness = domains.find((d) => d.domain === 'digital')?.percent ?? 0;
  const summary = `${archetype.description} Ярче всего в тебе проявлены: ${topTraits
    .map((t) => t.talent.name)
    .join(', ')}.`;

  return {
    id: crypto.randomUUID(),
    generatedAt: new Date().toISOString(),
    archetype,
    summary,
    domains,
    topTraits,
    aiReadiness,
  };
}
