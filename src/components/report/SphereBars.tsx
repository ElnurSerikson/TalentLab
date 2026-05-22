import { motion } from 'framer-motion';
import type { SphereScore } from '@/domain/types';
import { Icon } from '@/components/ui';

export function SphereBars({ spheres }: { spheres: SphereScore[] }) {
  return (
    <div className="space-y-3">
      {spheres.map((s, i) => (
        <div key={s.sphere.id} className="flex items-center gap-3">
          <div className="flex w-44 shrink-0 items-center gap-2">
            <Icon name={s.sphere.icon} className="h-4 w-4 text-talent-slate-500" />
            <span className="truncate text-sm font-medium text-talent-slate-900">
              {s.sphere.name}
            </span>
          </div>
          <div className="h-7 flex-1 overflow-hidden rounded-lg bg-talent-violet-100/60">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${s.percent}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.05 }}
              className="flex h-full items-center justify-end rounded-lg bg-gradient-to-r from-talent-violet-500 to-talent-violet-400 pr-2"
            >
              <span className="text-xs font-bold text-white tabular">{s.percent}%</span>
            </motion.div>
          </div>
        </div>
      ))}
    </div>
  );
}
