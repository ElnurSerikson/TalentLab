import { Save } from 'lucide-react';
import { Logo } from '@/components/layout/Logo';
import { ProgressBar } from '@/components/ui';

export interface TestProgressProps {
  current: number; // 1-based
  total: number;
  label: string;
  onSave?: () => void;
}

export function TestProgress({ current, total, label, onSave }: TestProgressProps) {
  const percent = (current / total) * 100;
  return (
    <div className="sticky top-0 z-30 border-b border-talent-slate-200/70 bg-talent-cream-50/90 backdrop-blur-md">
      <div className="mx-auto max-w-2xl px-4 py-3 sm:px-6">
        <div className="mb-2 flex items-center justify-between gap-4">
          <Logo className="shrink-0 scale-90 origin-left" />
          <span className="text-sm font-semibold tabular text-talent-slate-500">
            {label} {current} из {total}
          </span>
          {onSave ? (
            <button
              onClick={onSave}
              className="hidden items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-talent-violet-600 hover:bg-talent-violet-50 sm:inline-flex"
            >
              <Save className="h-4 w-4" />
              Сохранить
            </button>
          ) : (
            <span className="hidden w-20 sm:block" />
          )}
        </div>
        <ProgressBar value={percent} ariaLabel={`${label} ${current} из ${total}`} />
      </div>
    </div>
  );
}
