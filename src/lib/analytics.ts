/**
 * Analytics stubs. No-ops for the demo; real provider (e.g. Mixpanel/GA)
 * gets wired here in a later phase.
 */

export type AnalyticsEvent =
  | 'landing_view'
  | 'auth_register'
  | 'auth_login'
  | 'onboarding_complete'
  | 'screening_complete'
  | 'scoring_complete'
  | 'report_view'
  | 'feedback_submit';

export function track(event: AnalyticsEvent, props?: Record<string, unknown>): void {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug(`[analytics] ${event}`, props ?? {});
  }
}

export function identify(userId: string): void {
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug(`[analytics] identify`, userId);
  }
}
