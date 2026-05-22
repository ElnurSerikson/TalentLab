import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { QuestionOption } from '@/domain/types';
import { cn } from '@/lib/cn';

export interface ChoiceInputProps {
  options: QuestionOption[];
  value: string | null;
  onChange: (key: string) => void;
  variant?: 'list' | 'grid';
}

export function ChoiceInput({ options, value, onChange, variant = 'list' }: ChoiceInputProps) {
  return (
    <div
      className={cn(
        variant === 'grid'
          ? 'grid grid-cols-2 gap-3 sm:grid-cols-3'
          : 'flex flex-col gap-3',
      )}
    >
      {options.map((opt, i) => {
        const active = value === opt.key;
        return (
          <motion.button
            key={opt.key}
            type="button"
            onClick={() => onChange(opt.key)}
            aria-pressed={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className={cn(
              'group flex items-center gap-3 rounded-2xl border-2 p-4 text-left transition-all duration-150',
              variant === 'grid' && 'flex-col items-center text-center',
              active
                ? 'border-talent-violet-500 bg-talent-violet-50 shadow-soft'
                : 'border-talent-slate-200 bg-white hover:border-talent-violet-300 hover:bg-talent-violet-50/40',
            )}
          >
            {opt.emoji ? (
              <span className={cn('text-3xl', variant === 'list' && 'text-2xl')}>{opt.emoji}</span>
            ) : (
              <span
                className={cn(
                  'grid h-7 w-7 shrink-0 place-items-center rounded-lg border-2 text-sm font-bold uppercase',
                  active
                    ? 'border-talent-violet-500 bg-talent-violet-500 text-white'
                    : 'border-talent-slate-200 text-talent-slate-500',
                )}
              >
                {active ? <Check className="h-4 w-4" /> : opt.key}
              </span>
            )}
            <span
              className={cn(
                'font-medium',
                active ? 'text-talent-violet-700' : 'text-talent-slate-900',
              )}
            >
              {opt.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
