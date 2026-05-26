const KEY = 'talentlab:clientId';

/**
 * Stable anonymous device id used to attribute analytics rows in Convex before
 * real auth exists. Persists across logout/session reset (it's a device id, not
 * an account id).
 */
export function getClientId(): string {
  try {
    let id = localStorage.getItem(KEY);
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem(KEY, id);
    }
    return id;
  } catch {
    return 'anonymous';
  }
}
