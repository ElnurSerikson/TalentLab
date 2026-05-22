import { motion } from 'framer-motion';
import { Button } from '@/components/ui';

export interface EncouragementScreenProps {
  emoji: string;
  title: string;
  subtitle?: string;
  onContinue: () => void;
}

export function EncouragementScreen({
  emoji,
  title,
  subtitle,
  onContinue,
}: EncouragementScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center py-10 text-center"
    >
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.1 }}
        className="mb-6 text-6xl"
      >
        {emoji}
      </motion.div>
      <h2 className="mb-2 text-2xl font-extrabold text-talent-slate-900">{title}</h2>
      {subtitle && <p className="mb-6 max-w-sm text-talent-slate-500">{subtitle}</p>}
      <Button size="lg" onClick={onContinue} className="mt-2">
        Продолжить
      </Button>
    </motion.div>
  );
}
