import { Save } from 'lucide-react';
import { ProgressBar } from '@/components/ui';

export interface TestProgressProps {
  current: number; // 1-based
  total: number;
  label: string;
  onSave?: () => void;
}

/**
 * Внутри-контентный блок прогресса теста — золотой стандарт онбординга:
 * подпись слева, счётчик «X / Y» справа, линия прогресса под ними.
 * Сам хедер (лого + «Выйти») даёт RootLayout, как и на экранах онбординга.
 */
export function TestProgress({ current, total, label, onSave }: TestProgressProps) {
  const percent = (current / total) * 100;
  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between gap-4 text-sm font-medium text-talent-slate-500">
        <span>{label}</span>
        <div className="flex items-center gap-3">
          {onSave && (
            <button
              onClick={onSave}
              className="inline-flex items-center gap-1.5 text-talent-violet-600 transition-colors hover:text-talent-violet-700"
            >
              <Save className="h-4 w-4" />
              Сохранить
            </button>
          )}
          <span className="tabular">{current} / {total}</span>
        </div>
      </div>
      <ProgressBar value={percent} ariaLabel={`${label} ${current} из ${total}`} />
    </div>
  );
}
