import { forwardRef, useId } from 'react';
import type { TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const autoId = useId();
    const fieldId = id ?? autoId;
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={fieldId}
            className="mb-1.5 block text-sm font-medium text-talent-slate-900"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={fieldId}
          aria-invalid={error ? true : undefined}
          className={cn(
            'w-full rounded-xl border bg-white p-3.5 text-[15px] text-talent-slate-900 transition-colors',
            'placeholder:text-talent-slate-500/70 resize-y min-h-[120px]',
            'focus:outline-none focus:ring-2 focus:ring-talent-violet-400',
            error
              ? 'border-talent-rose-500'
              : 'border-talent-slate-200 hover:border-talent-violet-300',
            className,
          )}
          {...props}
        />
        {error ? (
          <p className="mt-1.5 text-sm text-talent-rose-500">{error}</p>
        ) : hint ? (
          <p className="mt-1.5 text-sm text-talent-slate-500">{hint}</p>
        ) : null}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
