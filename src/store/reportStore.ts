import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Report, TestAnswers } from '@/domain/types';
import { buildReport } from '@/domain/scoring';

interface ReportState {
  report: Report | null;
  history: Report[];
  generateReport: (answers: TestAnswers) => Report;
  clearReport: () => void;
}

export const useReportStore = create<ReportState>()(
  persist(
    (set, get) => ({
      report: null,
      history: [],

      generateReport: (answers) => {
        const report = buildReport(answers);
        const prev = get().report;
        set({
          report,
          history: prev ? [prev, ...get().history].slice(0, 5) : get().history,
        });
        return report;
      },

      clearReport: () => set({ report: null }),
    }),
    { name: 'talentlab:report' },
  ),
);
