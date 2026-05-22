import { motion } from 'framer-motion';
import type { Question } from '@/domain/types';
import { resolveQuestionText } from '@/data/questions';
import { Card } from '@/components/ui';
import { ScaleInput } from './ScaleInput';
import { ChoiceInput } from './ChoiceInput';

export interface QuestionCardProps {
  question: Question;
  tagKeys: string[];
  value: number | string | null;
  onChange: (value: number | string) => void;
}

export function QuestionCard({ question, tagKeys, value, onChange }: QuestionCardProps) {
  const text = resolveQuestionText(question, tagKeys);

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <Card className="p-6 sm:p-8">
        <h2 className="mb-6 text-xl font-bold leading-snug text-talent-slate-900 sm:text-2xl text-balance">
          {text}
        </h2>

        {question.type === 'scale1to5' ? (
          <ScaleInput
            value={typeof value === 'number' ? value : null}
            onChange={(v) => onChange(v)}
          />
        ) : (
          <ChoiceInput
            options={question.options ?? []}
            value={typeof value === 'string' ? value : null}
            onChange={(k) => onChange(k)}
            variant={question.type === 'choice6images' ? 'grid' : 'list'}
          />
        )}
      </Card>
    </motion.div>
  );
}
