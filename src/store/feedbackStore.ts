import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Feedback } from '@/domain/types';

interface FeedbackState {
  feedbacks: Feedback[];
  addFeedback: (data: Omit<Feedback, 'id' | 'createdAt'>) => void;
}

export const useFeedbackStore = create<FeedbackState>()(
  persist(
    (set) => ({
      feedbacks: [],
      addFeedback: (data) =>
        set((s) => ({
          feedbacks: [
            ...s.feedbacks,
            { ...data, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
          ],
        })),
    }),
    { name: 'talentlab:feedback' },
  ),
);
