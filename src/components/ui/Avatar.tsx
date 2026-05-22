import { cn } from '@/lib/cn';

export interface AvatarProps {
  name: string;
  size?: number;
  className?: string;
}

const palette = [
  ['#7C3AED', '#A78BFA'],
  ['#F59E0B', '#FBBF24'],
  ['#10B981', '#34D399'],
  ['#F43F5E', '#FB7185'],
];

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export function Avatar({ name, size = 44, className }: AvatarProps) {
  const idx =
    [...name].reduce((acc, c) => acc + c.charCodeAt(0), 0) % palette.length;
  const [from, to] = palette[idx];
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full font-bold text-white',
        className,
      )}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.4,
        background: `linear-gradient(135deg, ${from}, ${to})`,
      }}
      aria-hidden
    >
      {initials(name)}
    </span>
  );
}
