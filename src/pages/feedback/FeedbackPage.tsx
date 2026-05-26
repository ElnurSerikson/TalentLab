import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button, Card, Textarea, toast } from '@/components/ui';
import { useFeedbackStore } from '@/store/feedbackStore';
import { recordFeedback } from '@/lib/convexClient';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';

const LIKED = ['Простота', 'Дизайн', 'Глубина анализа', 'Рекомендации'];
const MISSING = ['Больше профессий', 'Глубже анализ', 'Конкретные курсы', 'Помощь с поступлением'];

export function FeedbackPage() {
  const navigate = useNavigate();
  const addFeedback = useFeedbackStore((s) => s.addFeedback);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [liked, setLiked] = useState<string[]>([]);
  const [missing, setMissing] = useState<string[]>([]);
  const [comment, setComment] = useState('');

  const toggle = (
    value: string,
    list: string[],
    setList: (v: string[]) => void,
  ) => {
    setList(list.includes(value) ? list.filter((x) => x !== value) : [...list, value]);
  };

  const submit = () => {
    if (rating === 0) {
      toast.error('Поставь оценку звёздами');
      return;
    }
    addFeedback({ rating, liked, missing, comment: comment.trim() });
    void recordFeedback({ rating, liked, missing, comment: comment.trim() });
    track('feedback_submit', { rating });
    toast.success('Спасибо! Твой отзыв учтён 💜');
    navigate('/dashboard');
  };

  return (
    <PageWrapper width="narrow">
      <h1 className="mb-2 text-3xl font-extrabold tracking-tight text-talent-slate-900">
        Понравился тест?
      </h1>
      <p className="mb-6 text-talent-slate-500">Оцени и помоги нам стать лучше</p>

      <Card className="p-6 sm:p-8">
        <div className="mb-6 flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(n)}
              aria-label={`Оценка ${n}`}
            >
              <Star
                className={cn(
                  'h-10 w-10 transition-colors',
                  (hover || rating) >= n
                    ? 'fill-talent-orange-400 text-talent-orange-400'
                    : 'text-talent-slate-200',
                )}
              />
            </button>
          ))}
        </div>

        <CheckGroup
          title="Что понравилось?"
          options={LIKED}
          selected={liked}
          onToggle={(v) => toggle(v, liked, setLiked)}
        />
        <div className="mt-5">
          <CheckGroup
            title="Чего не хватило?"
            options={MISSING}
            selected={missing}
            onToggle={(v) => toggle(v, missing, setMissing)}
          />
        </div>

        <div className="mt-5">
          <Textarea
            label="Комментарий (необязательно)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Поделись впечатлениями…"
          />
        </div>

        <Button fullWidth size="lg" className="mt-6" onClick={submit}>
          Отправить
        </Button>
      </Card>
    </PageWrapper>
  );
}

function CheckGroup({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (v: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-talent-slate-900">{title}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = selected.includes(o);
          return (
            <button
              key={o}
              onClick={() => onToggle(o)}
              className={cn(
                'rounded-full border px-3 py-1.5 text-sm font-medium transition-all',
                active
                  ? 'border-talent-violet-500 bg-talent-violet-500 text-white'
                  : 'border-talent-slate-200 bg-white text-talent-slate-900 hover:border-talent-violet-300',
              )}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}
