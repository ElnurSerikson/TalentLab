import type { RiasecResult, SphereScore, TalentResult } from '@/domain/types';
import { SPHERES } from '@/data/spheres';

const TOP_N = 20;

export function calculateSpheres(
  talents: TalentResult[],
  riasec: RiasecResult,
): SphereScore[] {
  const userTop = new Set(talents.slice(0, TOP_N).map((t) => t.talent.id));
  const userAxes = new Set(riasec.code.split(''));

  const scores: SphereScore[] = SPHERES.map((sphere) => {
    const talentHits = sphere.talents.filter((id) => userTop.has(id)).length;
    const talentRatio = sphere.talents.length
      ? talentHits / sphere.talents.length
      : 0;

    const axisHits = sphere.riasec.filter((a) => userAxes.has(a)).length;
    const axisRatio = sphere.riasec.length ? axisHits / sphere.riasec.length : 0;

    const raw = 0.6 * talentRatio + 0.4 * axisRatio;
    const percent = Math.round(100 * Math.pow(raw, 0.7));
    return { sphere, percent };
  });

  scores.sort((a, b) => b.percent - a.percent);
  return scores;
}
