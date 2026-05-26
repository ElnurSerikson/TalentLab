import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CharacterResult, ScreeningAnswer } from '@/domain/types';
import { computeCharacter } from '@/domain/base/computeCharacter';

interface BaseState {
  answers: ScreeningAnswer[];
  index: number;
  character: CharacterResult | null;
  setAnswer: (id: string, value: number | string) => void;
  setIndex: (i: number) => void;
  generateCharacter: () => CharacterResult;
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

export const useBaseStore = create<BaseState>()(
  persist(
    (set, get) => ({
      answers: [],
      index: 0,
      character: null,

      setAnswer: (id, value) =>
        set((s) => ({ answers: upsert(s.answers, id, value) })),
      setIndex: (i) => set({ index: i }),

      generateCharacter: () => {
        const character = computeCharacter(get().answers);
        set({ character });
        return character;
      },

      reset: () => set({ answers: [], index: 0, character: null }),
    }),
    { name: 'talentlab:base' },
  ),
);
