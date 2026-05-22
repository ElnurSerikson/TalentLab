import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '@/components/layout/Logo';
import { CircularProgress } from '@/components/ui';
import { useTestStore } from '@/store/testStore';
import { useReportStore } from '@/store/reportStore';
import { track } from '@/lib/analytics';

const STAGES = [
  'Анализируем твой темперамент…',
  'Сопоставляем таланты с матрицей TalentLab-60…',
  'Считаем твой вектор интересов RIASEC…',
  'Подбираем профессии под твой профиль…',
  'Готовим персональные рекомендации…',
];

const STAGE_MS = 1300;

export function ProcessingPage() {
  const navigate = useNavigate();
  const [stage, setStage] = useState(0);

  const screeningAnswers = useTestStore((s) => s.screeningAnswers);
  const scoringAnswers = useTestStore((s) => s.scoringAnswers);
  const freeform = useTestStore((s) => s.freeform);
  const generateReport = useReportStore((s) => s.generateReport);

  useEffect(() => {
    // Compute the report immediately; the staged animation is for drama.
    generateReport({
      screening: screeningAnswers,
      scoring: scoringAnswers,
      freeform,
    });
    track('report_view');

    const stageTimer = setInterval(() => {
      setStage((s) => Math.min(s + 1, STAGES.length - 1));
    }, STAGE_MS);

    const done = setTimeout(() => {
      navigate('/report', { replace: true });
    }, STAGE_MS * STAGES.length + 600);

    return () => {
      clearInterval(stageTimer);
      clearTimeout(done);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const percent = ((stage + 1) / STAGES.length) * 100;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-talent-cream-50 to-talent-violet-50 px-6 text-center">
      <Logo className="mb-12" />

      <CircularProgress value={percent} size={140} strokeWidth={10}>
        <motion.span
          key={stage}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-3xl font-extrabold tabular text-talent-violet-600"
        >
          {Math.round(percent)}%
        </motion.span>
      </CircularProgress>

      <div className="mt-10 h-8">
        <AnimatePresence mode="wait">
          <motion.p
            key={stage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-lg font-medium text-talent-slate-900"
          >
            {STAGES[stage]}
          </motion.p>
        </AnimatePresence>
      </div>

      <p className="mt-4 text-sm text-talent-slate-500">Это займёт несколько секунд…</p>
    </div>
  );
}
