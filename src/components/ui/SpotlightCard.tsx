import type { ReactNode } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/cn';

export interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
}

/**
 * Карточка с премиум-ховером: мягкий подъём + рост тени + спотлайт-свечение,
 * следящее за курсором внутри карточки (мини-«фонарик» в наших цветах).
 */
export function SpotlightCard({ children, className }: SpotlightCardProps) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  const glow = useMotionTemplate`radial-gradient(260px circle at ${mx}px ${my}px, rgba(124,58,237,0.10), transparent 70%)`;

  return (
    <motion.div
      onMouseMove={onMove}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={cn(
        'group relative h-full overflow-hidden rounded-2xl border border-talent-slate-200/60 bg-white p-6 shadow-soft transition-[box-shadow,border-color] duration-300 hover:border-[#b0a6c4] hover:shadow-soft-lg',
        className,
      )}
    >
      {/* спотлайт за курсором — виден только на ховере */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glow }}
      />
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </motion.div>
  );
}
