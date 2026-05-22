import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Download,
  GraduationCap,
  RefreshCw,
  Share2,
  Star,
  Check,
} from 'lucide-react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button, Card, Icon, Modal, ProgressBar, Reveal, toast } from '@/components/ui';
import { RiasecRadar } from '@/components/report/RiasecRadar';
import { TalentCard } from '@/components/report/TalentCard';
import { ProfessionCard } from '@/components/report/ProfessionCard';
import { SphereBars } from '@/components/report/SphereBars';
import { RecommendationCard } from '@/components/report/RecommendationCard';
import { RIASEC_LABELS } from '@/domain/scoring';
import { useUserStore } from '@/store/userStore';
import { useReportStore } from '@/store/reportStore';
import { useTestStore } from '@/store/testStore';
import type { ReportStats } from '@/domain/types';

const STAT_LABELS: { key: keyof ReportStats; label: string; emoji: string }[] = [
  { key: 'thinking', label: 'Мышление', emoji: '🧠' },
  { key: 'energy', label: 'Энергия', emoji: '⚡' },
  { key: 'communication', label: 'Коммуникация', emoji: '💬' },
  { key: 'will', label: 'Воля', emoji: '🔥' },
];

export function ReportPage() {
  const navigate = useNavigate();
  const user = useUserStore((s) => s.user);
  const report = useReportStore((s) => s.report);
  const clearReport = useReportStore((s) => s.clearReport);
  const resetTest = useTestStore((s) => s.resetTest);

  const [pdfOpen, setPdfOpen] = useState(false);
  const [retakeOpen, setRetakeOpen] = useState(false);

  if (!report) return null;

  const name = user?.name || 'Друг';
  const top5Talents = report.talents.slice(0, 5);
  const top5Professions = report.professions.slice(0, 5);
  const topLearning = report.professions.slice(0, 5);

  const handleShare = () => {
    const url = `https://talentlab.app/share/${report.id.slice(0, 8)}`;
    navigator.clipboard?.writeText(url).then(
      () => toast.success('Ссылка скопирована!'),
      () => toast.info(url),
    );
  };

  const handleRetake = () => {
    resetTest();
    clearReport();
    setRetakeOpen(false);
    navigate('/test/screening');
  };

  return (
    <PageWrapper width="wide" className="space-y-14">
      {/* 1. Summary */}
      <Reveal>
        <Card className="relative overflow-hidden p-6 sm:p-10">
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-20 blur-2xl"
            style={{ background: report.archetype.color }}
          />
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div
              className="grid h-24 w-24 shrink-0 place-items-center rounded-3xl text-white"
              style={{ background: report.archetype.color }}
            >
              <Icon name={report.archetype.icon} className="h-12 w-12" />
            </div>
            <div>
              <p className="text-talent-slate-500">{name}, ты —</p>
              <h1 className="text-3xl font-extrabold tracking-tight text-talent-slate-900 sm:text-4xl">
                {report.archetype.name}
              </h1>
              <p className="mt-1 font-medium text-talent-violet-600">
                {report.archetype.tagline}
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-2xl text-talent-slate-900">{report.summary}</p>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STAT_LABELS.map((s) => (
              <div key={s.key} className="rounded-2xl bg-talent-cream-50 p-4">
                <div className="mb-1 text-2xl">{s.emoji}</div>
                <div className="text-sm font-medium text-talent-slate-500">{s.label}</div>
                <div className="mb-1.5 text-2xl font-extrabold tabular text-talent-slate-900">
                  {report.stats[s.key]}
                </div>
                <ProgressBar value={report.stats[s.key]} />
              </div>
            ))}
          </div>
        </Card>
      </Reveal>

      {/* 2. Top talents */}
      <section>
        <SectionHead title="Твои топ-5 талантов" subtitle="Нажми на карточку, чтобы узнать больше" />
        <div className="grid gap-3">
          {top5Talents.map((t) => (
            <TalentCard key={t.talent.id} result={t} rank={t.rank} />
          ))}
        </div>
        <div className="mt-4">
          <Link to="/report/talents">
            <Button variant="outline" rightIcon={<ArrowRight className="h-4 w-4" />}>
              Посмотреть все 60 талантов
            </Button>
          </Link>
        </div>
      </section>

      {/* 3. RIASEC */}
      <section>
        <SectionHead title="Твой профиль интересов (RIASEC)" subtitle="Научный вектор твоих интересов" />
        <Card className="p-6">
          <RiasecRadar riasec={report.riasec} />
          <div className="mt-4 text-center">
            <div className="text-3xl font-extrabold tracking-widest text-talent-violet-600">
              {report.riasec.code}
            </div>
            <div className="mt-3 flex flex-col items-center gap-1 text-sm text-talent-slate-500">
              {report.riasec.code.split('').map((ch) => {
                const info = RIASEC_LABELS[ch as keyof typeof RIASEC_LABELS];
                return (
                  <span key={ch}>
                    <strong className="text-talent-slate-900">{ch} — {info.name}:</strong> {info.desc}
                  </span>
                );
              })}
            </div>
          </div>
        </Card>
      </section>

      {/* 4. Professions */}
      <section>
        <SectionHead title="Топ-5 профессий" subtitle="Подобраны под твой профиль — нажми для деталей" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {top5Professions.map((m) => (
            <ProfessionCard key={m.profession.id} match={m} />
          ))}
        </div>
        <div className="mt-4">
          <Link to="/report/professions">
            <Button variant="outline" rightIcon={<ArrowRight className="h-4 w-4" />}>
              Смотреть все 15 подходящих профессий
            </Button>
          </Link>
        </div>
      </section>

      {/* 5. Spheres */}
      <section>
        <SectionHead title="Сферы деятельности" subtitle="Насколько тебе близка каждая сфера" />
        <Card className="p-6">
          <SphereBars spheres={report.spheres} />
        </Card>
      </section>

      {/* 6. Recommendations */}
      <section>
        <SectionHead title="Что развивать" subtitle="Персональный план роста" />
        <div className="grid gap-4 sm:grid-cols-2">
          {report.recommendations.slice(0, 4).map((r) => (
            <RecommendationCard key={r.id} rec={r} />
          ))}
        </div>
        <div className="mt-4">
          <Link to="/report/recommendations">
            <Button variant="outline" rightIcon={<ArrowRight className="h-4 w-4" />}>
              Весь план развития
            </Button>
          </Link>
        </div>
      </section>

      {/* 7. Where to study */}
      <section>
        <SectionHead title="Куда идти учиться" subtitle="Направления, привязанные к твоим топ-профессиям" />
        <div className="grid gap-3">
          {topLearning.map((m) => (
            <Card key={m.profession.id} className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3">
                <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-talent-violet-500" />
                <div>
                  <h3 className="font-bold text-talent-slate-900">{m.profession.name}</h3>
                  <p className="text-sm text-talent-slate-500">
                    {m.profession.universities.join(' · ')}
                  </p>
                </div>
              </div>
              <span className="shrink-0 rounded-lg bg-talent-violet-50 px-2.5 py-1 text-xs font-semibold text-talent-violet-600">
                ЕНТ: {m.profession.entSubjects.join(', ')}
              </span>
            </Card>
          ))}
        </div>
      </section>

      {/* 8. Actions */}
      <section>
        <Card className="p-6">
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => setPdfOpen(true)} leftIcon={<Download className="h-4 w-4" />}>
              Скачать PDF
            </Button>
            <Button variant="outline" onClick={handleShare} leftIcon={<Share2 className="h-4 w-4" />}>
              Поделиться ссылкой
            </Button>
            <Button variant="outline" disabled leftIcon={<Check className="h-4 w-4 text-talent-emerald-500" />}>
              Сохранено в профиль
            </Button>
            <Button variant="ghost" onClick={() => setRetakeOpen(true)} leftIcon={<RefreshCw className="h-4 w-4" />}>
              Пройти заново
            </Button>
          </div>
        </Card>
      </section>

      {/* 9. Feedback */}
      <Reveal>
        <Card className="bg-talent-violet-50/60 text-center">
          <div className="mb-2 text-3xl">💜</div>
          <h3 className="mb-2 text-xl font-bold text-talent-slate-900">Понравился тест?</h3>
          <Link to="/feedback">
            <Button leftIcon={<Star className="h-4 w-4" />}>Оценить тест</Button>
          </Link>
        </Card>
      </Reveal>

      <Modal open={pdfOpen} onClose={() => setPdfOpen(false)} title="Скачивание PDF">
        <p className="text-talent-slate-500">
          Эта функция скоро будет доступна. В демо-версии PDF-отчёт ещё в разработке —
          сохрани страницу в закладки, чтобы вернуться к результату.
        </p>
        <Button fullWidth className="mt-5" onClick={() => setPdfOpen(false)}>
          Понятно
        </Button>
      </Modal>

      <Modal open={retakeOpen} onClose={() => setRetakeOpen(false)} title="Пройти тест заново?">
        <p className="text-talent-slate-500">
          Твои текущие ответы и отчёт будут сброшены, и ты начнёшь тест с начала. Уверен?
        </p>
        <div className="mt-5 flex gap-3">
          <Button variant="ghost" fullWidth onClick={() => setRetakeOpen(false)}>
            Отмена
          </Button>
          <Button variant="danger" fullWidth onClick={handleRetake}>
            Пройти заново
          </Button>
        </div>
      </Modal>
    </PageWrapper>
  );
}

function SectionHead({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-5">
      <h2 className="text-2xl font-extrabold text-talent-slate-900 sm:text-3xl">{title}</h2>
      {subtitle && <p className="mt-1 text-talent-slate-500">{subtitle}</p>}
    </div>
  );
}
