import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Tabs } from '@/components/ui';
import { TalentCard } from '@/components/report/TalentCard';
import { DOMAINS, DOMAIN_ORDER } from '@/data/domains';
import { useReportStore } from '@/store/reportStore';
import type { TalentDomain } from '@/domain/types';

export function TalentsPage() {
  const report = useReportStore((s) => s.report);
  const [filter, setFilter] = useState<TalentDomain | 'all'>('all');

  const filtered = useMemo(() => {
    if (!report) return [];
    return filter === 'all'
      ? report.talents
      : report.talents.filter((t) => t.talent.domain === filter);
  }, [report, filter]);

  if (!report) return null;

  const items = [
    { value: 'all', label: 'Все' },
    ...DOMAIN_ORDER.map((d) => ({ value: d, label: DOMAINS[d].name })),
  ];

  return (
    <PageWrapper width="wide">
      <Link to="/report" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-talent-violet-600 hover:underline">
        <ArrowLeft className="h-4 w-4" /> К отчёту
      </Link>
      <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-talent-slate-900">
        Все 60 талантов
      </h1>
      <p className="mb-6 text-talent-slate-500">Отсортированы по выраженности у тебя</p>

      <div className="mb-6 -mx-4 overflow-x-auto px-4 pb-2">
        <Tabs items={items} value={filter} onChange={(v) => setFilter(v as TalentDomain | 'all')} />
      </div>

      <div className="grid gap-3">
        {filtered.map((t) => (
          <TalentCard key={t.talent.id} result={t} rank={t.rank} />
        ))}
      </div>
    </PageWrapper>
  );
}
