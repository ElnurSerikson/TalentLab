import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { RecommendationCard } from '@/components/report/RecommendationCard';
import { useReportStore } from '@/store/reportStore';

export function RecommendationsPage() {
  const report = useReportStore((s) => s.report);
  if (!report) return null;

  return (
    <PageWrapper width="wide">
      <Link to="/report" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-talent-violet-600 hover:underline">
        <ArrowLeft className="h-4 w-4" /> К отчёту
      </Link>
      <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-talent-slate-900">
        Твой план развития
      </h1>
      <p className="mb-6 text-talent-slate-500">
        Конкретные шаги, чтобы прокачать сильные стороны и закрыть пробелы
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {report.recommendations.map((r) => (
          <RecommendationCard key={r.id} rec={r} />
        ))}
      </div>
    </PageWrapper>
  );
}
