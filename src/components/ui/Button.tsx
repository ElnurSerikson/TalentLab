import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-talent-violet-500 text-white hover:bg-talent-violet-600 active:bg-talent-violet-700 shadow-soft',
  secondary:
    'bg-talent-orange-400 text-white hover:bg-talent-orange-500 active:bg-talent-orange-500 shadow-soft',
  ghost:
    'bg-transparent text-talent-slate-900 hover:bg-talent-violet-50 active:bg-talent-violet-100',
  outline:
    'bg-white text-talent-violet-600 border border-talent-slate-200 hover:border-talent-violet-300 hover:bg-talent-violet-50',
  danger:
    'bg-talent-rose-500 text-white hover:bg-talent-rose-400 active:bg-talent-rose-500',
};

const sizeClasses: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm gap-1.5',
  md: 'h-11 px-5 text-[15px] gap-2',
  lg: 'h-14 px-7 text-base gap-2.5',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-150',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'focus-visible:ring-2 focus-visible:ring-talent-violet-400 focus-visible:ring-offset-2',
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && 'w-full',
          className,
        )}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : (
          leftIcon
        )}
        {children}
        {!loading && rightIcon}
      </button>
    );
  },
);

Button.displayName = 'Button';
