import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ScreeningAnswer } from '@/domain/types';
import { computeFounder, type FounderResult } from '@/domain/startup/computeFounder';

interface StartupState {
  answers: ScreeningAnswer[];
  index: number;
  result: FounderResult | null;
  setAnswer: (id: string, value: number | string) => void;
  setIndex: (i: number) => void;
  generateResult: () => FounderResult;
  reset: () => void;
}

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

export const useStartupStore = create<StartupState>()(
  persist(
    (set, get) => ({
      answers: [],
      index: 0,
      result: null,
      setAnswer: (id, value) => set((s) => ({ answers: upsert(s.answers, id, value) })),
      setIndex: (i) => set({ index: i }),
      generateResult: () => {
        const result = computeFounder(get().answers);
        set({ result });
        return result;
      },
      reset: () => set({ answers: [], index: 0, result: null }),
    }),
    { name: 'talentlab:startup' },
  ),
);
