import type {
  Report,
  ReportStats,
  TalentDomain,
  TalentResult,
  TestAnswers,
} from '@/domain/types';
import { DOMAIN_ORDER } from '@/data/domains';
import { archetypeForDomains } from '@/data/archetypes';
import { tagsToKeys } from '@/data/suggestionTags';
import { calculateTalents } from './calculateTalents';
import { calculateRiasec } from './calculateRiasec';
import { matchProfessions } from './matchProfessions';
import { calculateSpheres } from './calculateSpheres';
import { generateRecommendations } from './generateRecommendations';

function uuid(): string {
  return crypto.randomUUID();
}

function domainStrength(talents: TalentResult[]): Record<TalentDomain, number> {
  const sum: Record<TalentDomain, number> = {
    thinking: 0,
    creativity: 0,
    people: 0,
    action: 0,
    digital: 0,
  };
  const count: Record<TalentDomain, number> = { ...sum };

  for (const t of talents) {
    sum[t.talent.domain] += t.percent;
    count[t.talent.domain] += 1;
  }

  const avg = {} as Record<TalentDomain, number>;
  for (const d of DOMAIN_ORDER) {
    avg[d] = count[d] > 0 ? Math.round(sum[d] / count[d]) : 0;
  }
  return avg;
}

function percentOf(talents: TalentResult[], ids: string[]): number {
  const map = new Map(talents.map((t) => [t.talent.id, t.percent]));
  const vals = ids.map((id) => map.get(id) ?? 0);
  if (vals.length === 0) return 0;
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
}

function computeStats(
  talents: TalentResult[],
  strength: Record<TalentDomain, number>,
  energyAxisE: number,
): ReportStats {
  return {
    thinking: strength.thinking,
    energy: Math.round(strength.action * 0.7 + energyAxisE * 0.3),
    communication: strength.people,
    will: percentOf(talents, ['disciplinator', 'marathoner', 'fighter', 'finisher', 'focuser']),
  };
}

export function buildReport(answers: TestAnswers): Report {
  const talents = calculateTalents(answers);
  const riasec = calculateRiasec(answers);

  const strength = domainStrength(talents);
  const sortedDomains = [...DOMAIN_ORDER].sort((a, b) => strength[b] - strength[a]);
  const primary = sortedDomains[0];
  const secondary = sortedDomains[1];
  const archetype = archetypeForDomains(primary, secondary);

  const stats = computeStats(talents, strength, riasec.scores.E);

  const top3 = talents.slice(0, 3).map((t) => t.talent.name);
  const summary = `${archetype.description} Ярче всего в тебе проявлены: ${top3.join(', ')}.`;

  const professions = matchProfessions(talents, riasec).slice(0, 15);
  const spheres = calculateSpheres(talents, riasec);

  const freeformTags = tagsToKeys(answers.freeform.tags);
  const recommendations = generateRecommendations({
    topTalents: talents.slice(0, 15),
    riasec,
    domainStrength: strength,
    freeformTags,
  });

  return {
    id: uuid(),
    generatedAt: new Date().toISOString(),
    archetype,
    summary,
    stats,
    talents,
    riasec,
    professions,
    spheres,
    recommendations,
    freeform: answers.freeform,
  };
}
