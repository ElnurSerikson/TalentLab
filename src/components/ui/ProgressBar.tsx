import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

export interface ProgressBarProps {
  value: number; // 0..100
  className?: string;
  barClassName?: string;
  showLabel?: boolean;
  ariaLabel?: string;
}

export function ProgressBar({
  value,
  className,
  barClassName,
  showLabel = false,
  ariaLabel,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={cn('w-full', className)}>
      <div
        role="progressbar"
        aria-valuenow={Math.round(clamped)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel}
        className="h-2.5 w-full overflow-hidden rounded-full bg-talent-violet-100"
      >
        <motion.div
          className={cn(
            'h-full rounded-full bg-gradient-to-r from-talent-violet-500 to-talent-violet-400',
            barClassName,
          )}
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      {showLabel && (
        <span className="mt-1 block text-right text-xs font-medium tabular text-talent-slate-500">
          {Math.round(clamped)}%
        </span>
      )}
    </div>
  );
}

export interface CircularProgressProps {
  value: number; // 0..100
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  children?: React.ReactNode;
  className?: string;
}

export function CircularProgress({
  value,
  size = 88,
  strokeWidth = 8,
  color = '#7C3AED',
  trackColor = '#EDE9FE',
  children,
  className,
}: CircularProgressProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div
      className={cn('relative inline-flex items-center justify-center', className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
}
