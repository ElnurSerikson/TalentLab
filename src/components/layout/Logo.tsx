import { Link } from 'react-router-dom';
import { cn } from '@/lib/cn';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      className={cn('inline-flex items-center gap-2 font-heading', className)}
      aria-label="TalentLab — на главную"
    >
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-talent-violet-500 to-talent-violet-400 text-white shadow-soft">
        <span className="text-lg font-extrabold leading-none">T</span>
        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-talent-amber-400" />
      </span>
      <span className="text-xl font-extrabold tracking-tight text-talent-slate-900">
        TalentLab
      </span>
    </Link>
  );
}
