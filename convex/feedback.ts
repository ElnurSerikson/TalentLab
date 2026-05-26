import { mutation } from './_generated/server';
import { v } from 'convex/values';

/** Записать отзыв о тесте (анонимно). */
export const submit = mutation({
  args: {
    clientId: v.string(),
    rating: v.number(),
    liked: v.array(v.string()),
    missing: v.array(v.string()),
    comment: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('feedback', { ...args, createdAt: Date.now() });
  },
});
