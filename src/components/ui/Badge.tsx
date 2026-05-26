import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

type Tone = 'violet' | 'orange' | 'emerald' | 'rose' | 'slate';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

const toneClasses: Record<Tone, string> = {
  violet: 'bg-talent-violet-100 text-talent-violet-700',
  orange: 'bg-talent-orange-400/20 text-talent-orange-500',
  emerald: 'bg-talent-emerald-500/15 text-talent-emerald-500',
  rose: 'bg-talent-rose-500/15 text-talent-rose-500',
  slate: 'bg-talent-slate-200 text-talent-slate-500',
};

export function Badge({ tone = 'violet', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold',
        toneClasses[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
