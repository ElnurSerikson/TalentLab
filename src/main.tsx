import './bootstrap'; // MUST stay first: clears stale local session on version bump
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ConvexAuthProvider } from '@convex-dev/auth/react';
import { router } from '@/app/routes';
import { convex } from '@/lib/convex';
import './styles/globals.css';

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root element #root not found');

const app = <RouterProvider router={router} />;

createRoot(rootEl).render(
  <StrictMode>
    {convex ? (
      <ConvexAuthProvider client={convex}>{app}</ConvexAuthProvider>
    ) : (
      app
    )}
  </StrictMode>,
);
