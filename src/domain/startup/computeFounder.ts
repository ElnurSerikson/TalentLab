import type { ScreeningAnswer } from '@/domain/types';
import { STARTUP_QUESTIONS } from '@/data/startupQuestions';
import {
  FOUNDER_ROLES,
  founderVerdict,
  type FounderRole,
  type VerdictMeta,
} from '@/data/founder';

const ROLES: FounderRole[] = ['ceo', 'cpo', 'cto', 'cmo', 'coo'];

export interface RoleScore {
  role: FounderRole;
  percent: number; // относительно сильнейшей роли (top = 100)
}

export interface FounderResult {
  id: string;
  generatedAt: string;
  roles: RoleScore[]; // отсортированы по убыванию
  primary: FounderRole;
  secondary: FounderRole;
  readiness: number; // 0..100
  verdict: VerdictMeta;
  startupTypes: string[]; // id типов
  cofounder: FounderRole;
}

export function computeFounder(answers: ScreeningAnswer[]): FounderResult {
  const byId = Object.fromEntries(STARTUP_QUESTIONS.map((q) => [q.id, q]));

  const roleScore: Record<FounderRole, number> = { ceo: 0, cpo: 0, cto: 0, cmo: 0, coo: 0 };
  let readinessSum = 0;
  let readinessMax = 0;

  // максимум готовности по каждому вопросу (для нормализации)
  for (const q of STARTUP_QUESTIONS) {
    const maxR = Math.max(0, ...q.options.map((o) => o.readiness ?? 0));
    readinessMax += maxR;
  }

  for (const ans of answers) {
    const q = byId[ans.questionId];
    if (!q) continue;
    const opt = q.options.find((o) => o.key === ans.value);
    if (!opt) continue;
    if (opt.roles) {
      for (const [r, w] of Object.entries(opt.roles) as [FounderRole, number][]) {
        roleScore[r] += w;
      }
    }
    readinessSum += opt.readiness ?? 0;
  }

  const maxRole = Math.max(1, ...ROLES.map((r) => roleScore[r]));
  const roles: RoleScore[] = ROLES.map((role) => ({
    role,
    percent: Math.round((roleScore[role] / maxRole) * 100),
  })).sort((a, b) => b.percent - a.percent);

  const primary = roles[0].role;
  const secondary = roles[1].role;
  const readiness = readinessMax ? Math.round((readinessSum / readinessMax) * 100) : 0;
  // роль доминирует, если заметно сильнее второй
  const roleDominant = roleScore[primary] >= roleScore[secondary] * 1.4 + 1;

  return {
    id: crypto.randomUUID(),
    generatedAt: new Date().toISOString(),
    roles,
    primary,
    secondary,
    readiness,
    verdict: founderVerdict(readiness, roleDominant),
    startupTypes: FOUNDER_ROLES[primary].startupTypes,
    cofounder: FOUNDER_ROLES[primary].cofounder,
  };
}
