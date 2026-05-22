import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  FreeformAnswer,
  ScoringAnswer,
  ScreeningAnswer,
} from '@/domain/types';

export type TestStep = 'screening' | 'freeform' | 'scoring' | 'completed';

interface TestState {
  screeningAnswers: ScreeningAnswer[];
  freeform: FreeformAnswer;
  scoringAnswers: ScoringAnswer[];
  currentStep: TestStep;
  screeningIndex: number;
  scoringIndex: number;

  setScreeningAnswer: (id: string, value: number | string) => void;
  setFreeform: (text: string, tags: string[]) => void;
  setScoringAnswer: (id: string, value: number | string) => void;
  setStep: (step: TestStep) => void;
  setScreeningIndex: (i: number) => void;
  setScoringIndex: (i: number) => void;
  resetTest: () => void;
}

const initial = {
  screeningAnswers: [] as ScreeningAnswer[],
  freeform: { text: '', tags: [] } as FreeformAnswer,
  scoringAnswers: [] as ScoringAnswer[],
  currentStep: 'screening' as TestStep,
  screeningIndex: 0,
  scoringIndex: 0,
};

function upsert(
  list: ScreeningAnswer[],
  id: string,
  value: number | string,
): ScreeningAnswer[] {
  const idx = list.findIndex((a) => a.questionId === id);
  if (idx === -1) return [...list, { questionId: id, value }];
  const next = [...list];
  next[idx] = { questionId: id, value };
  return next;
}

export const useTestStore = create<TestState>()(
  persist(
    (set) => ({
      ...initial,

      setScreeningAnswer: (id, value) =>
        set((s) => ({ screeningAnswers: upsert(s.screeningAnswers, id, value) })),

      setFreeform: (text, tags) => set({ freeform: { text, tags } }),

      setScoringAnswer: (id, value) =>
        set((s) => ({ scoringAnswers: upsert(s.scoringAnswers, id, value) })),

      setStep: (step) => set({ currentStep: step }),
      setScreeningIndex: (i) => set({ screeningIndex: i }),
      setScoringIndex: (i) => set({ scoringIndex: i }),

      resetTest: () => set({ ...initial }),
    }),
    { name: 'talentlab:test' },
  ),
);
