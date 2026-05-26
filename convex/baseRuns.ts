import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

const answerValidator = v.object({
  questionId: v.string(),
  value: v.union(v.number(), v.string()),
});

const domainValidator = v.object({ domain: v.string(), percent: v.number() });
const traitValidator = v.object({
  id: v.string(),
  name: v.string(),
  percent: v.number(),
});

/** Записать завершённый базовый тест (анонимно, для сбора данных индустрии). */
export const submit = mutation({
  args: {
    clientId: v.string(),
    name: v.optional(v.string()),
    age: v.optional(v.number()),
    gender: v.optional(v.string()),
    userVersion: v.optional(v.string()),
    answers: v.array(answerValidator),
    archetypeId: v.string(),
    archetypeName: v.string(),
    domains: v.array(domainValidator),
    topTraits: v.array(traitValidator),
    aiReadiness: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('baseRuns', { ...args, createdAt: Date.now() });
  },
});

/** Сводная статистика по индустрии: всего прохождений, распределение архетипов,
 *  средняя ИИ-готовность. Заготовка под будущий дашборд индустрии. */
export const stats = query({
  args: {},
  handler: async (ctx) => {
    const runs = await ctx.db.query('baseRuns').collect();
    const total = runs.length;

    const byArchetype: Record<string, number> = {};
    let aiSum = 0;
    for (const r of runs) {
      byArchetype[r.archetypeName] = (byArchetype[r.archetypeName] ?? 0) + 1;
      aiSum += r.aiReadiness;
    }

    return {
      total,
      avgAiReadiness: total ? Math.round(aiSum / total) : 0,
      archetypes: Object.entries(byArchetype)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count),
    };
  },
});
