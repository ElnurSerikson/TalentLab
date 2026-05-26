import { useUserStore } from '@/store/userStore';
import { useBaseStore } from '@/store/baseStore';
import { useTestStore } from '@/store/testStore';
import { useReportStore } from '@/store/reportStore';

/**
 * Fully forget the local session: clears user, base test + character,
 * deep-test progress, report and onboarding step. After this the app behaves
 * like a brand-new visitor (can register/login fresh).
 */
export function resetSession(): void {
  useUserStore.getState().logout();
  useBaseStore.getState().reset();
  useTestStore.getState().resetTest();
  useReportStore.getState().clearReport();
  try {
    localStorage.removeItem('talentlab:onboarding-step');
  } catch {
    /* ignore */
  }
}
