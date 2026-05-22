import { forwardRef, useId } from 'react';
import type { SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, className, id, ...props }, ref) => {
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
        <div className="relative">
          <select
            ref={ref}
            id={fieldId}
            aria-invalid={error ? true : undefined}
            className={cn(
              'h-11 w-full appearance-none rounded-xl border bg-white px-3.5 pr-10 text-[15px] text-talent-slate-900 transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-talent-violet-400',
              error
                ? 'border-talent-rose-500'
                : 'border-talent-slate-200 hover:border-talent-violet-300',
              className,
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-talent-slate-500"
            aria-hidden
          />
        </div>
        {error && <p className="mt-1.5 text-sm text-talent-rose-500">{error}</p>}
      </div>
    );
  },
);

Select.displayName = 'Select';
