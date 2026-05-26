import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Question } from '@/domain/types';
import { Button } from '@/components/ui';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { TestProgress } from './TestProgress';
import { QuestionCard } from './QuestionCard';
import { EncouragementScreen } from './EncouragementScreen';

export interface Milestone {
  emoji: string;
  title: string;
  subtitle?: string;
}

export interface QuizRunnerProps {
  questions: Question[];
  label: string;
  tagKeys: string[];
  index: number;
  setIndex: (i: number) => void;
  getValue: (questionId: string) => number | string | null;
  onAnswer: (questionId: string, value: number | string) => void;
  /** Keyed by the 1-based count of answered questions that triggers it. */
  milestones?: Record<number, Milestone>;
  onComplete: () => void;
  onSave?: () => void;
}

export function QuizRunner({
  questions,
  label,
  tagKeys,
  index,
  setIndex,
  getValue,
  onAnswer,
  milestones = {},
  onComplete,
  onSave,
}: QuizRunnerProps) {
  const [milestone, setMilestone] = useState<{ data: Milestone; next: number } | null>(null);

  const total = questions.length;
  const safeIndex = Math.min(Math.max(index, 0), total - 1);
  const question = questions[safeIndex];
  const value = getValue(question.id);
  const answeredCount = safeIndex + 1;

  const goNext = () => {
    const next = safeIndex + 1;
    if (next >= total) {
      onComplete();
      return;
    }
    const ms = milestones[next];
    if (ms) {
      setMilestone({ data: ms, next });
    } else {
      setIndex(next);
    }
  };

  const goBack = () => {
    if (safeIndex > 0) setIndex(safeIndex - 1);
  };

  const handleAnswer = (v: number | string) => {
    onAnswer(question.id, v);
  };

  if (milestone) {
    return (
      <PageWrapper width="narrow">
        <TestProgress current={answeredCount} total={total} label={label} onSave={onSave} />
        <EncouragementScreen
          emoji={milestone.data.emoji}
          title={milestone.data.title}
          subtitle={milestone.data.subtitle}
          onContinue={() => {
            setIndex(milestone.next);
            setMilestone(null);
          }}
        />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper width="narrow">
      <TestProgress current={answeredCount} total={total} label={label} onSave={onSave} />
      <AnimatePresence mode="wait">
        <QuestionCard
          key={question.id}
          question={question}
          tagKeys={tagKeys}
          value={value}
          onChange={handleAnswer}
        />
      </AnimatePresence>

      <div className="mt-6 flex items-center justify-between">
        {safeIndex > 0 ? (
          <Button
            variant="ghost"
            onClick={goBack}
            leftIcon={<ArrowLeft className="h-4 w-4" />}
          >
            Назад
          </Button>
        ) : (
          <span />
        )}
        <Button
          onClick={goNext}
          disabled={value == null}
          rightIcon={<ArrowRight className="h-4 w-4" />}
        >
          {safeIndex === total - 1 ? 'Завершить' : 'Дальше'}
        </Button>
      </div>
    </PageWrapper>
  );
}
