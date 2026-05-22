import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button, Card, Icon, ProgressBar } from '@/components/ui';
import { useReportStore } from '@/store/reportStore';

export function SharePage() {
  const { id } = useParams();
  const report = useReportStore((s) => s.report);

  if (!report) {
    return (
      <PageWrapper width="narrow">
        <Card className="p-8 text-center">
          <div className="mb-3 text-5xl">🔗</div>
          <h1 className="mb-2 text-2xl font-bold text-talent-slate-900">
            Демо-ссылка на отчёт
          </h1>
          <p className="mb-6 text-talent-slate-500">
            Это демонстрационная публичная ссылка ({id}). В демо-версии отчёты хранятся
            локально, поэтому чужой отчёт здесь не отображается. Пройди свой тест!
          </p>
          <Link to="/auth/register">
            <Button rightIcon={<ArrowRight className="h-4 w-4" />}>Пройти тест</Button>
          </Link>
        </Card>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper width="narrow">
      <Card className="p-6 text-center sm:p-10">
        <div
          className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-3xl text-white"
          style={{ background: report.archetype.color }}
        >
          <Icon name={report.archetype.icon} className="h-10 w-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-talent-slate-900">
          {report.archetype.name}
        </h1>
        <p className="mt-1 font-medium text-talent-violet-600">{report.archetype.tagline}</p>
        <p className="mt-4 text-talent-slate-500">{report.archetype.description}</p>

        <div className="mt-8 space-y-3 text-left">
          <h2 className="font-bold text-talent-slate-900">Топ-3 таланта</h2>
          {report.talents.slice(0, 3).map((t) => (
            <div key={t.talent.id} className="flex items-center gap-3">
              <span className="w-28 shrink-0 text-sm font-medium text-talent-slate-900">
                {t.talent.name}
              </span>
              <ProgressBar value={t.percent} />
              <span className="w-10 text-right text-sm font-bold tabular text-talent-violet-600">
                {t.percent}%
              </span>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link to="/auth/register">
            <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
              Узнать свой профиль
            </Button>
          </Link>
        </div>
      </Card>
    </PageWrapper>
  );
}
