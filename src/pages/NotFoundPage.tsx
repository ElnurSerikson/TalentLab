import { Link } from 'react-router-dom';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button } from '@/components/ui';

export function NotFoundPage() {
  return (
    <PageWrapper width="narrow" className="text-center">
      <div className="py-16">
        <div className="mb-4 text-7xl font-extrabold text-talent-violet-200">404</div>
        <h1 className="mb-2 text-2xl font-bold text-talent-slate-900">Страница не найдена</h1>
        <p className="mb-6 text-talent-slate-500">
          Кажется, такой страницы нет. Давай вернёмся на главную.
        </p>
        <Link to="/">
          <Button>На главную</Button>
        </Link>
      </div>
    </PageWrapper>
  );
}
