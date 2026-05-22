import type {
  Profession,
  ProfessionMatch,
  RiasecResult,
  TalentResult,
} from '@/domain/types';
import { PROFESSIONS } from '@/data/professions';

const TOP_N_TALENTS = 15;

/** Similarity between two 3-letter RIASEC codes: shared letters / 3. */
function riasecSimilarity(userCode: string, profCode: string): number {
  const u = new Set(userCode.split(''));
  let shared = 0;
  for (const ch of new Set(profCode.split(''))) {
    if (u.has(ch)) shared += 1;
  }
  return shared / 3;
}

function overlapRatio(userTop: Set<string>, required: string[]): number {
  if (required.length === 0) return 0;
  const hits = required.filter((id) => userTop.has(id)).length;
  return hits / required.length;
}

export function matchProfessions(
  talents: TalentResult[],
  riasec: RiasecResult,
): ProfessionMatch[] {
  const userTop = new Set(talents.slice(0, TOP_N_TALENTS).map((t) => t.talent.id));

  const matches: ProfessionMatch[] = PROFESSIONS.map((p: Profession) => {
    const riasecMatch = riasecSimilarity(riasec.code, p.riasecCode);
    const requiredMatch = overlapRatio(userTop, p.requiredTalents);
    const niceMatch = overlapRatio(userTop, p.niceTalents);

    const raw = 0.4 * riasecMatch + 0.4 * requiredMatch + 0.2 * niceMatch;
    // Mild curve so good fits read as motivating percentages.
    const matchPercent = Math.round(100 * Math.pow(raw, 0.7));

    return {
      profession: p,
      matchPercent,
      riasecMatch,
      talentMatch: requiredMatch,
    };
  });

  matches.sort((a, b) => b.matchPercent - a.matchPercent);
  return matches;
}
