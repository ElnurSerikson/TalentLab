import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from 'recharts';
import type { RiasecAxis, RiasecResult } from '@/domain/types';
import { RIASEC_LABELS } from '@/domain/scoring';

const ORDER: RiasecAxis[] = ['R', 'I', 'A', 'S', 'E', 'C'];

export function RiasecRadar({ riasec }: { riasec: RiasecResult }) {
  const data = ORDER.map((axis) => ({
    axis,
    label: `${axis} · ${RIASEC_LABELS[axis].name}`,
    value: riasec.scores[axis],
  }));

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data} outerRadius="72%">
          <PolarGrid stroke="#E2E8F0" />
          <PolarAngleAxis
            dataKey="axis"
            tick={{ fill: '#64748B', fontSize: 14, fontWeight: 700 }}
          />
          <Radar
            dataKey="value"
            stroke="#7C3AED"
            fill="#7C3AED"
            fillOpacity={0.35}
            strokeWidth={2}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
