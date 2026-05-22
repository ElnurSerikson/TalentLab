import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui';
import { useScrollTop } from '@/hooks/useScrollTop';

function PageFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-talent-violet-400" aria-label="Загрузка" />
    </div>
  );
}

export function RootLayout() {
  useScrollTop();
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

/** Minimal layout for the immersive test flow (no header/footer). */
export function BareLayout() {
  useScrollTop();
  return (
    <div className="min-h-screen">
      <Suspense fallback={<PageFallback />}>
        <Outlet />
      </Suspense>
      <Toaster />
    </div>
  );
}
