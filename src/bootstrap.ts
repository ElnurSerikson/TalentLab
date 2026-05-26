// Runs before any store module is imported (it's the first import in main.tsx).
// On a version bump it wipes stale local session state, so everyone effectively
// gets logged out and starts fresh on next load. Bump VERSION to force a reset.
const VERSION = '2';
const KEY = 'talentlab:version';

// Keys cleared on reset. We intentionally keep `talentlab:clientId` (anonymous
// device id for analytics) and `talentlab:feedback`.
const RESETTABLE = [
  'talentlab:user',
  'talentlab:base',
  'talentlab:test',
  'talentlab:report',
  'talentlab:onboarding-step',
];

try {
  if (localStorage.getItem(KEY) !== VERSION) {
    RESETTABLE.forEach((k) => localStorage.removeItem(k));
    localStorage.setItem(KEY, VERSION);
  }
} catch {
  /* ignore storage errors */
}
