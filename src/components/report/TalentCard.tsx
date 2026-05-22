import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { TalentResult } from '@/domain/types';
import { Card, Icon } from '@/components/ui';
import { DOMAINS } from '@/data/domains';
import { cn } from '@/lib/cn';

export function TalentCard({ result, rank }: { result: TalentResult; rank?: number }) {
  const [open, setOpen] = useState(false);
  const { talent, percent } = result;
  const domain = DOMAINS[talent.domain];

  return (
    <Card padded={false} className="overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-4 p-4 text-left"
        aria-expanded={open}
      >
        <span
          className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white"
          style={{ background: talent.color }}
        >
          <Icon name={talent.icon} className="h-6 w-6" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {rank != null && (
              <span className="text-sm font-bold tabular text-talent-slate-500">#{rank}</span>
            )}
            <h3 className="truncate font-bold text-talent-slate-900">{talent.name}</h3>
          </div>
          <p className="truncate text-sm text-talent-slate-500">{talent.shortDesc}</p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="text-lg font-extrabold tabular" style={{ color: talent.color }}>
            {percent}%
          </span>
          <ChevronDown
            className={cn('h-5 w-5 text-talent-slate-500 transition-transform', open && 'rotate-180')}
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="border-t border-talent-slate-200/60 p-4 sm:p-5">
              <span
                className="mb-3 inline-block rounded-full px-2.5 py-1 text-xs font-semibold"
                style={{ background: `${domain.color}1a`, color: domain.color }}
              >
                {domain.name}
              </span>
              <p className="mb-4 text-talent-slate-900">{talent.fullDesc}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <DetailList title="Сильные стороны" items={talent.strengths} tone="emerald" />
                <DetailList title="Обратная сторона" items={talent.shadowSide} tone="rose" />
              </div>
              <div className="mt-4">
                <DetailList title="Как развивать" items={talent.developTips} tone="violet" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

function DetailList({
  title,
  items,
  tone,
}: {
  title: string;
  items: string[];
  tone: 'emerald' | 'rose' | 'violet';
}) {
  const dot = {
    emerald: 'bg-talent-emerald-500',
    rose: 'bg-talent-rose-500',
    violet: 'bg-talent-violet-500',
  }[tone];
  return (
    <div>
      <p className="mb-1.5 text-sm font-bold text-talent-slate-900">{title}</p>
      <ul className="space-y-1">
        {items.map((it) => (
          <li key={it} className="flex gap-2 text-sm text-talent-slate-500">
            <span className={cn('mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full', dot)} />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
