import { useEffect, useRef, useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

const CURRENT_YEAR = new Date().getFullYear();
const MIN_AGE = 10;
const MAX_AGE = 80;
// Допустимые годы рождения — от младших к старшим (сначала недавние).
const YEARS = Array.from(
  { length: MAX_AGE - MIN_AGE + 1 },
  (_, i) => CURRENT_YEAR - MIN_AGE - i,
);

export interface BirthYearPickerProps {
  label?: string;
  value: number | null;
  onChange: (year: number) => void;
  error?: string;
  placeholder?: string;
}

/** Год рождения вместо «возраста»: компактный пикер в стиле наших инпутов. */
export function BirthYearPicker({
  label,
  value,
  onChange,
  error,
  placeholder = 'Выбери год рождения',
}: BirthYearPickerProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div className="w-full" ref={ref}>
      {label && (
        <span className="mb-1.5 block text-sm font-medium text-talent-slate-900">{label}</span>
      )}
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className={cn(
            'flex h-11 w-full items-center gap-2 rounded-xl border bg-white px-3.5 text-[15px] transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-talent-violet-400',
            error
              ? 'border-talent-rose-500'
              : open
                ? 'border-talent-violet-300 ring-2 ring-talent-violet-400'
                : 'border-talent-slate-200 hover:border-talent-violet-300',
          )}
        >
          <Calendar className="h-4 w-4 shrink-0 text-talent-slate-500" />
          <span
            className={cn(
              'flex-1 text-left tabular',
              value ? 'text-talent-slate-900' : 'text-talent-slate-500/70',
            )}
          >
            {value ?? placeholder}
          </span>
          <ChevronDown
            className={cn(
              'h-4 w-4 shrink-0 text-talent-slate-500 transition-transform',
              open && 'rotate-180',
            )}
          />
        </button>

        {open && (
          <div
            role="listbox"
            className="absolute z-20 mt-2 max-h-60 w-full overflow-y-auto rounded-xl border border-talent-slate-200 bg-white p-2 shadow-soft-lg"
          >
            <div className="grid grid-cols-3 gap-1.5">
              {YEARS.map((y) => {
                const active = y === value;
                return (
                  <button
                    key={y}
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => {
                      onChange(y);
                      setOpen(false);
                    }}
                    className={cn(
                      'rounded-lg py-2 text-sm font-medium tabular transition-colors',
                      active
                        ? 'bg-talent-violet-500 text-white'
                        : 'text-talent-slate-900 hover:bg-talent-violet-50',
                    )}
                  >
                    {y}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {error && <p className="mt-1.5 text-sm text-talent-rose-500">{error}</p>}
    </div>
  );
}
