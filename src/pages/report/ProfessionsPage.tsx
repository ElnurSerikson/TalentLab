import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { ProfessionCard } from '@/components/report/ProfessionCard';
import { PROFESSION_TAG_LABELS } from '@/components/report/professionTags';
import { useReportStore } from '@/store/reportStore';
import type { ProfessionTag } from '@/domain/types';
import { cn } from '@/lib/cn';

export function ProfessionsPage() {
  const report = useReportStore((s) => s.report);
  const [filter, setFilter] = useState<ProfessionTag | 'all'>('all');

  const filtered = useMemo(() => {
    if (!report) return [];
    return filter === 'all'
      ? report.professions
      : report.professions.filter((m) => m.profession.tags.includes(filter));
  }, [report, filter]);

  if (!report) return null;

  const tags: (ProfessionTag | 'all')[] = [
    'all',
    'high-income',
    'remote',
    'creative',
    'analytical',
    'social',
    'technical',
    'fast-growing',
    'stable',
  ];

  return (
    <PageWrapper width="wide">
      <Link to="/report" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-talent-violet-600 hover:underline">
        <ArrowLeft className="h-4 w-4" /> К отчёту
      </Link>
      <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-talent-slate-900">
        Подходящие профессии
      </h1>
      <p className="mb-6 text-talent-slate-500">Топ-15 по совпадению с твоим профилем</p>

      <div className="mb-6 flex flex-wrap gap-2">
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={cn(
              'rounded-full border px-3 py-1.5 text-sm font-medium transition-all',
              filter === t
                ? 'border-talent-violet-500 bg-talent-violet-500 text-white'
                : 'border-talent-slate-200 bg-white text-talent-slate-900 hover:border-talent-violet-300',
            )}
          >
            {t === 'all' ? 'Все' : PROFESSION_TAG_LABELS[t]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl bg-white p-8 text-center text-talent-slate-500 shadow-soft">
          Нет профессий с этим тегом в твоём топе. Попробуй другой фильтр.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((m) => (
            <ProfessionCard key={m.profession.id} match={m} />
          ))}
        </div>
      )}
    </PageWrapper>
  );
}
