import { ConvexReactClient } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { getClientId } from './clientId';

// Если VITE_CONVEX_URL не задан — клиент null, и все вызовы тихо ничего не делают
// (приложение работает как раньше, без бэкенда).
const url = import.meta.env.VITE_CONVEX_URL as string | undefined;
const client = url ? new ConvexReactClient(url) : null;

export function convexEnabled(): boolean {
  return client !== null;
}

export interface BaseResultPayload {
  name?: string;
  age?: number;
  gender?: string;
  userVersion?: string;
  answers: { questionId: string; value: number | string }[];
  archetypeId: string;
  archetypeName: string;
  domains: { domain: string; percent: number }[];
  topTraits: { id: string; name: string; percent: number }[];
  aiReadiness: number;
}

/** Анонимно записать завершённый базовый тест в Convex. Best-effort. */
export async function recordBaseResult(payload: BaseResultPayload): Promise<void> {
  if (!client) return;
  try {
    await client.mutation(api.baseRuns.submit, {
      clientId: getClientId(),
      ...payload,
    });
  } catch (err) {
    if (import.meta.env.DEV) console.warn('[convex] recordBaseResult failed', err);
  }
}

export interface FeedbackPayload {
  rating: number;
  liked: string[];
  missing: string[];
  comment: string;
}

/** Анонимно записать отзыв в Convex. Best-effort. */
export async function recordFeedback(payload: FeedbackPayload): Promise<void> {
  if (!client) return;
  try {
    await client.mutation(api.feedback.submit, {
      clientId: getClientId(),
      ...payload,
    });
  } catch (err) {
    if (import.meta.env.DEV) console.warn('[convex] recordFeedback failed', err);
  }
}
