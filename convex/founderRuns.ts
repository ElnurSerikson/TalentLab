import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

const answerValidator = v.object({
  questionId: v.string(),
  value: v.union(v.number(), v.string()),
});
const roleValidator = v.object({ role: v.string(), percent: v.number() });

/** Записать результат теста «Стартап» (анонимно, для сбора данных индустрии). */
export const submit = mutation({
  args: {
    clientId: v.string(),
    answers: v.array(answerValidator),
    primary: v.string(),
    secondary: v.string(),
    readiness: v.number(),
    verdictTier: v.string(),
    roles: v.array(roleValidator),
    startupTypes: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('founderRuns', { ...args, createdAt: Date.now() });
  },
});

/** Сводка по фаундер-тесту: всего, распределение ролей, средняя готовность. */
export const stats = query({
  args: {},
  handler: async (ctx) => {
    const runs = await ctx.db.query('founderRuns').collect();
    const total = runs.length;
    const byRole: Record<string, number> = {};
    const byTier: Record<string, number> = {};
    let readinessSum = 0;
    for (const r of runs) {
      byRole[r.primary] = (byRole[r.primary] ?? 0) + 1;
      byTier[r.verdictTier] = (byTier[r.verdictTier] ?? 0) + 1;
      readinessSum += r.readiness;
    }
    return {
      total,
      avgReadiness: total ? Math.round(readinessSum / total) : 0,
      roles: Object.entries(byRole).map(([role, count]) => ({ role, count })),
      tiers: Object.entries(byTier).map(([tier, count]) => ({ tier, count })),
    };
  },
});
