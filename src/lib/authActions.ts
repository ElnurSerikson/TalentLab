import { useAuthActions as useConvexAuthActions } from '@convex-dev/auth/react';

type SignIn = (
  provider: string,
  params?: Record<string, unknown>,
) => Promise<unknown>;
type SignOut = () => Promise<void>;

interface AuthActions {
  signIn: SignIn;
  signOut: SignOut;
}

/**
 * Safe accessor for Convex auth actions. When no <ConvexAuthProvider> is mounted
 * (e.g. VITE_CONVEX_URL is not configured), the underlying hook returns
 * undefined — this would crash on destructure. Here we degrade to {} instead, so
 * the app stays usable and callers can null-check.
 */
export function useAuthActionsSafe(): Partial<AuthActions> {
  const actions = useConvexAuthActions() as AuthActions | undefined;
  return actions ?? {};
}
