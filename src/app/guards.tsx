import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUserStore } from '@/store/userStore';
import { useReportStore } from '@/store/reportStore';

/** Requires an authenticated user; otherwise redirects to login. */
export function RequireAuth({ children }: { children: ReactNode }) {
  const user = useUserStore((s) => s.user);
  const location = useLocation();
  if (!user) {
    return <Navigate to="/auth/login" replace state={{ from: location.pathname }} />;
  }
  return <>{children}</>;
}

/** Requires onboarding to be complete; otherwise redirects to onboarding. */
export function RequireOnboarding({ children }: { children: ReactNode }) {
  const user = useUserStore((s) => s.user);
  if (!user) return <Navigate to="/auth/login" replace />;
  if (!user.onboardingComplete) return <Navigate to="/onboarding" replace />;
  return <>{children}</>;
}

/** Requires a generated report; otherwise sends the user to start the test. */
export function RequireReport({ children }: { children: ReactNode }) {
  const user = useUserStore((s) => s.user);
  const report = useReportStore((s) => s.report);
  if (!user) return <Navigate to="/auth/login" replace />;
  if (!report) return <Navigate to="/test/screening" replace />;
  return <>{children}</>;
}

/** For auth pages: authenticated users skip ahead. */
export function RedirectIfAuth({ children }: { children: ReactNode }) {
  const user = useUserStore((s) => s.user);
  if (user) {
    return <Navigate to={user.onboardingComplete ? '/dashboard' : '/onboarding'} replace />;
  }
  return <>{children}</>;
}
