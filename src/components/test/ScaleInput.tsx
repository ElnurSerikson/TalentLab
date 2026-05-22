import { cn } from '@/lib/cn';

export interface ScaleInputProps {
  value: number | null;
  onChange: (value: number) => void;
}

const LABELS = ['Совсем не про меня', 'Скорее нет', 'Нейтрально', 'Скорее да', 'Это точно про меня'];

export function ScaleInput({ value, onChange }: ScaleInputProps) {
  return (
    <div>
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {[1, 2, 3, 4, 5].map((n) => {
          const active = value === n;
          const size = 44 + (Math.abs(n - 3) === 2 ? 8 : Math.abs(n - 3) === 1 ? 4 : 0);
          return (
            <button
              key={n}
              type="button"
              onClick={() => onChange(n)}
              aria-label={LABELS[n - 1]}
              aria-pressed={active}
              className="flex flex-col items-center gap-2"
            >
              <span
                className={cn(
                  'grid place-items-center rounded-full border-2 font-bold transition-all duration-150',
                  active
                    ? 'border-talent-violet-500 bg-talent-violet-500 text-white scale-110 shadow-soft'
                    : 'border-talent-slate-200 bg-white text-talent-slate-500 hover:border-talent-violet-300',
                )}
                style={{ width: size, height: size }}
              >
                {n}
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex justify-between text-xs text-talent-slate-500">
        <span>{LABELS[0]}</span>
        <span className="hidden sm:inline">{LABELS[4]}</span>
        <span className="sm:hidden">Точно да</span>
      </div>
    </div>
  );
}
