import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Card } from '@/components/ui';
import { SphereBars } from '@/components/report/SphereBars';
import { useReportStore } from '@/store/reportStore';

export function SpheresPage() {
  const report = useReportStore((s) => s.report);
  if (!report) return null;

  return (
    <PageWrapper width="wide">
      <Link to="/report" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-talent-violet-600 hover:underline">
        <ArrowLeft className="h-4 w-4" /> К отчёту
      </Link>
      <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-talent-slate-900">
        Сферы деятельности
      </h1>
      <p className="mb-6 text-talent-slate-500">Насколько тебе близка каждая из 10 сфер</p>
      <Card className="p-6">
        <SphereBars spheres={report.spheres} />
      </Card>
    </PageWrapper>
  );
}
