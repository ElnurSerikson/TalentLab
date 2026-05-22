import { cn } from '@/lib/cn';

export interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        'shimmer rounded-xl bg-talent-violet-100/60',
        className,
      )}
      aria-hidden
    />
  );
}
