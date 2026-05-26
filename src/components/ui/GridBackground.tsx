import { useEffect, useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { cn } from '@/lib/cn';

/** Небольшие клетки — по просьбе. */
const CELL = 22;
/** Цвета из «созвездия» (ParticlesBackground): violet — базовая сетка, orange — к курсору. */
const VIOLET = 'rgba(124,58,237,0.9)';
const ORANGE = 'rgba(255,152,0,0.95)';

function GridSvg({ id, color }: { id: string; color: string }) {
  return (
    <svg className="h-full w-full">
      <defs>
        <pattern id={id} width={CELL} height={CELL} patternUnits="userSpaceOnUse">
          <path d={`M ${CELL} 0 L 0 0 0 ${CELL}`} fill="none" stroke={color} strokeWidth={1} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/**
 * Статичная сетка с «фонариком» под курсором. Сама по себе едва заметна —
 * клетки проявляются только там, где курсор. Адаптировано под наш стек
 * (cn из @/lib/cn, без clsx/tailwind-merge) и палитру «созвездия».
 * Кладётся фоном (fixed/absolute) за контентом.
 */
export function GridBackground({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-9999);
  const mouseY = useMotionValue(-9999);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (x >= 0 && x <= r.width && y >= 0 && y <= r.height) {
        mouseX.set(x);
        mouseY.set(y);
      } else {
        mouseX.set(-9999);
        mouseY.set(-9999);
      }
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, [mouseX, mouseY]);

  const mask = useMotionTemplate`radial-gradient(200px circle at ${mouseX}px ${mouseY}px, black, transparent 72%)`;

  return (
    <div ref={ref} aria-hidden className={cn('overflow-hidden bg-talent-cream-50', className)}>
      {/* статичная фиолетовая сетка — едва заметна сама по себе */}
      <div className="absolute inset-0 opacity-[0.05]">
        <GridSvg id="tl-grid-base" color={VIOLET} />
      </div>
      {/* оранжевый слой проявляется к курсору — клетки заметны только на ховер */}
      <motion.div
        className="absolute inset-0 opacity-70"
        style={{ maskImage: mask, WebkitMaskImage: mask }}
      >
        <GridSvg id="tl-grid-glow" color={ORANGE} />
      </motion.div>
    </div>
  );
}
