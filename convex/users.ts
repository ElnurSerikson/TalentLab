import { mutation } from './_generated/server';
import { v } from 'convex/values';
import { getAuthUserId } from '@convex-dev/auth/server';

/**
 * Сохранить данные профиля (онбординг) у текущего авторизованного пользователя.
 * Поля опциональны — патчим только то, что пришло. Без авторизации — no-op.
 */
export const updateProfile = mutation({
  args: {
    name: v.optional(v.string()),
    age: v.optional(v.number()),
    gender: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;

    const patch: Record<string, unknown> = {};
    if (args.name !== undefined) patch.name = args.name;
    if (args.age !== undefined) patch.age = args.age;
    if (args.gender !== undefined) patch.gender = args.gender;

    await ctx.db.patch(userId, patch);
    return userId;
  },
});
