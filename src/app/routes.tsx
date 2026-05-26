import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { RootLayout, BareLayout } from './RootLayout';
import { RequireAuth, RequireOnboarding, RequireReport, RedirectIfAuth } from './guards';

// Route-based code splitting keeps recharts/framer-heavy report pages out of
// the initial bundle. Direct lazy() calls preserve each component's prop types.
const LandingPage = lazy(() => import('@/pages/landing/LandingPage').then((m) => ({ default: m.LandingPage })));
const AboutPage = lazy(() => import('@/pages/landing/AboutPage').then((m) => ({ default: m.AboutPage })));
const AuthPage = lazy(() => import('@/pages/auth/AuthPage').then((m) => ({ default: m.AuthPage })));
const OnboardingPage = lazy(() => import('@/pages/onboarding/OnboardingPage').then((m) => ({ default: m.OnboardingPage })));
const BaseTestPage = lazy(() => import('@/pages/onboarding/BaseTestPage').then((m) => ({ default: m.BaseTestPage })));
const CharacterPage = lazy(() => import('@/pages/onboarding/CharacterPage').then((m) => ({ default: m.CharacterPage })));
const ScreeningPage = lazy(() => import('@/pages/screening/ScreeningPage').then((m) => ({ default: m.ScreeningPage })));
const FreeformPage = lazy(() => import('@/pages/scoring/FreeformPage').then((m) => ({ default: m.FreeformPage })));
const ScoringPage = lazy(() => import('@/pages/scoring/ScoringPage').then((m) => ({ default: m.ScoringPage })));
const ProcessingPage = lazy(() => import('@/pages/processing/ProcessingPage').then((m) => ({ default: m.ProcessingPage })));
const ReportPage = lazy(() => import('@/pages/report/ReportPage').then((m) => ({ default: m.ReportPage })));
const TalentsPage = lazy(() => import('@/pages/report/TalentsPage').then((m) => ({ default: m.TalentsPage })));
const ProfessionsPage = lazy(() => import('@/pages/report/ProfessionsPage').then((m) => ({ default: m.ProfessionsPage })));
const RecommendationsPage = lazy(() => import('@/pages/report/RecommendationsPage').then((m) => ({ default: m.RecommendationsPage })));
const SpheresPage = lazy(() => import('@/pages/report/SpheresPage').then((m) => ({ default: m.SpheresPage })));
const SharePage = lazy(() => import('@/pages/report/SharePage').then((m) => ({ default: m.SharePage })));
const DashboardPage = lazy(() => import('@/pages/dashboard/DashboardPage').then((m) => ({ default: m.DashboardPage })));
const FeedbackPage = lazy(() => import('@/pages/feedback/FeedbackPage').then((m) => ({ default: m.FeedbackPage })));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })));

const reportGuard = (el: JSX.Element) => (
  <RequireOnboarding>
    <RequireReport>{el}</RequireReport>
  </RequireOnboarding>
);

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/about', element: <AboutPage /> },

      { path: '/auth/login', element: <RedirectIfAuth><AuthPage mode="login" /></RedirectIfAuth> },
      { path: '/auth/register', element: <RedirectIfAuth><AuthPage mode="register" /></RedirectIfAuth> },

      { path: '/onboarding', element: <RequireAuth><OnboardingPage /></RequireAuth> },
      { path: '/onboarding/character', element: <RequireAuth><CharacterPage /></RequireAuth> },

      { path: '/report', element: reportGuard(<ReportPage />) },
      { path: '/report/talents', element: reportGuard(<TalentsPage />) },
      { path: '/report/professions', element: reportGuard(<ProfessionsPage />) },
      { path: '/report/recommendations', element: reportGuard(<RecommendationsPage />) },
      { path: '/report/spheres', element: reportGuard(<SpheresPage />) },
      { path: '/report/share/:id', element: <SharePage /> },

      { path: '/dashboard', element: <RequireOnboarding><DashboardPage /></RequireOnboarding> },
      { path: '/feedback', element: <RequireAuth><FeedbackPage /></RequireAuth> },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    element: <BareLayout />,
    children: [
      { path: '/onboarding/base', element: <RequireAuth><BaseTestPage /></RequireAuth> },
      { path: '/test/screening', element: <RequireOnboarding><ScreeningPage /></RequireOnboarding> },
      { path: '/test/scoring/freeform', element: <RequireOnboarding><FreeformPage /></RequireOnboarding> },
      { path: '/test/scoring/questions', element: <RequireOnboarding><ScoringPage /></RequireOnboarding> },
      { path: '/test/processing', element: <RequireAuth><ProcessingPage /></RequireAuth> },
    ],
  },
]);
