import { useState } from 'react';
import {
  Banknote,
  GraduationCap,
  Lightbulb,
  ListChecks,
  TrendingUp,
} from 'lucide-react';
import type { ProfessionMatch } from '@/domain/types';
import { Badge, Card, Modal, ProgressBar } from '@/components/ui';
import { PROFESSION_TAG_LABELS } from './professionTags';

export function ProfessionCard({ match }: { match: ProfessionMatch }) {
  const [open, setOpen] = useState(false);
  const { profession: p, matchPercent } = match;

  return (
    <>
      <Card hoverable className="flex h-full cursor-pointer flex-col" onClick={() => setOpen(true)}>
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="font-bold leading-snug text-talent-slate-900">{p.name}</h3>
          <span className="shrink-0 text-xl font-extrabold tabular text-talent-violet-600">
            {matchPercent}%
          </span>
        </div>
        <ProgressBar value={matchPercent} className="mb-3" />
        <p className="mb-4 line-clamp-2 text-sm text-talent-slate-500">{p.description}</p>
        <div className="mt-auto flex flex-wrap gap-1.5">
          {p.tags.slice(0, 3).map((t) => (
            <Badge key={t} tone="slate">
              {PROFESSION_TAG_LABELS[t]}
            </Badge>
          ))}
        </div>
      </Card>

      <Modal open={open} onClose={() => setOpen(false)} title={p.name} size="lg">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-extrabold tabular text-talent-violet-600">
              {matchPercent}%
            </span>
            <span className="text-sm text-talent-slate-500">совпадение с твоим профилем</span>
          </div>

          <p className="text-talent-slate-900">{p.longDescription}</p>

          <InfoRow icon={ListChecks} title="Ключевые навыки">
            <div className="flex flex-wrap gap-1.5">
              {p.skills.map((s) => (
                <Badge key={s} tone="violet">{s}</Badge>
              ))}
            </div>
          </InfoRow>

          <div className="grid gap-4 sm:grid-cols-2">
            <InfoRow icon={Banknote} title="Зарплата (Казахстан)">
              <p className="text-talent-slate-900">{p.averageSalaryKZ}</p>
            </InfoRow>
            <InfoRow icon={Banknote} title="Зарплата (СНГ / удалённо)">
              <p className="text-talent-slate-900">{p.averageSalaryCIS}</p>
            </InfoRow>
          </div>

          <InfoRow icon={TrendingUp} title="Перспективы через 5 лет">
            <p className="text-talent-slate-900">{p.futureOutlook}</p>
          </InfoRow>

          <InfoRow icon={GraduationCap} title="Где учиться">
            <ul className="list-inside list-disc text-talent-slate-900">
              {p.universities.map((u) => (
                <li key={u}>{u}</li>
              ))}
            </ul>
            <p className="mt-2 text-sm text-talent-slate-500">
              ЕНТ-предметы: {p.entSubjects.join(', ')}
            </p>
          </InfoRow>

          {p.realStory && (
            <InfoRow icon={Lightbulb} title="Интересный факт">
              <p className="italic text-talent-slate-500">{p.realStory}</p>
            </InfoRow>
          )}
        </div>
      </Modal>
    </>
  );
}

function InfoRow({
  icon: IconCmp,
  title,
  children,
}: {
  icon: typeof Banknote;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center gap-2 text-sm font-bold text-talent-slate-900">
        <IconCmp className="h-4 w-4 text-talent-violet-500" />
        {title}
      </div>
      {children}
    </div>
  );
}
