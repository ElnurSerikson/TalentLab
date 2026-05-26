import { Check } from 'lucide-react';
import type { Recommendation } from '@/domain/types';
import { Card, Icon } from '@/components/ui';

export function RecommendationCard({ rec }: { rec: Recommendation }) {
  return (
    <Card className="h-full">
      <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-talent-orange-400/20 text-talent-orange-500">
        <Icon name={rec.icon} className="h-5 w-5" />
      </div>
      <h3 className="mb-1.5 text-lg font-bold text-talent-slate-900">{rec.title}</h3>
      <p className="mb-4 text-sm text-talent-slate-500">{rec.description}</p>
      <ul className="space-y-2">
        {rec.checklist.map((item) => (
          <li key={item} className="flex gap-2 text-sm text-talent-slate-900">
            <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-talent-emerald-500/15 text-talent-emerald-500">
              <Check className="h-2.5 w-2.5" />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </Card>
  );
}
