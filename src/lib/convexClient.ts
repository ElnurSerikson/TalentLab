import { api } from '../../convex/_generated/api';
import { convex as client } from './convex';
import { getClientId } from './clientId';

// Если VITE_CONVEX_URL не задан — клиент null, и все вызовы тихо ничего не делают
// (приложение работает как раньше, без бэкенда).

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

export interface FounderResultPayload {
  answers: { questionId: string; value: number | string }[];
  primary: string;
  secondary: string;
  readiness: number;
  verdictTier: string;
  roles: { role: string; percent: number }[];
  startupTypes: string[];
}

/** Анонимно записать результат теста «Стартап» в Convex. Best-effort. */
export async function recordFounderResult(payload: FounderResultPayload): Promise<void> {
  if (!client) return;
  try {
    await client.mutation(api.founderRuns.submit, {
      clientId: getClientId(),
      ...payload,
    });
  } catch (err) {
    if (import.meta.env.DEV) console.warn('[convex] recordFounderResult failed', err);
  }
}
