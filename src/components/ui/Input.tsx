import { forwardRef, useId, useState } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftIcon, className, id, type, ...props }, ref) => {
    const autoId = useId();
    const inputId = id ?? autoId;

    const isPassword = type === 'password';
    const [revealed, setRevealed] = useState(false);
    const effectiveType = isPassword && revealed ? 'text' : type;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-sm font-medium text-talent-slate-900"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-talent-slate-500">
              {leftIcon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            type={effectiveType}
            aria-invalid={error ? true : undefined}
            aria-describedby={
              error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
            }
            className={cn(
              'h-11 w-full rounded-xl border bg-white px-3.5 text-[15px] text-talent-slate-900 transition-colors',
              'placeholder:text-talent-slate-500/70',
              'focus:outline-none focus:ring-2 focus:ring-talent-violet-400',
              leftIcon && 'pl-10',
              isPassword && 'pr-11',
              error
                ? 'border-talent-rose-500'
                : 'border-talent-slate-200 hover:border-talent-violet-300',
              className,
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setRevealed((v) => !v)}
              aria-label={revealed ? 'Скрыть пароль' : 'Показать пароль'}
              tabIndex={-1}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-talent-slate-500 hover:bg-talent-violet-50 hover:text-talent-violet-600"
            >
              {revealed ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}
        </div>
        {error ? (
          <p id={`${inputId}-error`} className="mt-1.5 text-sm text-talent-rose-500">
            {error}
          </p>
        ) : hint ? (
          <p id={`${inputId}-hint`} className="mt-1.5 text-sm text-talent-slate-500">
            {hint}
          </p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = 'Input';
