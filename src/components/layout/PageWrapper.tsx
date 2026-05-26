import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export interface PageWrapperProps {
  children: ReactNode;
  className?: string;
  /** Container width preset. */
  width?: 'narrow' | 'wide' | 'full';
}

const widthClasses = {
  narrow: 'max-w-2xl', // формы и центрированные карточки-результаты
  wide: 'max-w-6xl', // золотой стандарт — как хедер/футер
  full: 'max-w-6xl',
};

export function PageWrapper({
  children,
  className,
  width = 'wide',
}: PageWrapperProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 py-8 sm:px-6 sm:py-12',
        widthClasses[width],
        className,
      )}
    >
      {children}
    </div>
  );
}
