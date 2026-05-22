import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button, Card, Textarea } from '@/components/ui';
import { TestProgress } from '@/components/test/TestProgress';
import { SUGGESTION_GROUPS, TAGS_BY_GROUP } from '@/data/suggestionTags';
import type { SuggestionGroup } from '@/domain/types';
import { useTestStore } from '@/store/testStore';
import { cn } from '@/lib/cn';

const MIN_CHARS = 50;
const MIN_TAGS = 3;

export function FreeformPage() {
  const navigate = useNavigate();
  const freeform = useTestStore((s) => s.freeform);
  const setFreeform = useTestStore((s) => s.setFreeform);
  const setStep = useTestStore((s) => s.setStep);

  const [text, setText] = useState(freeform.text);
  const [tags, setTags] = useState<string[]>(freeform.tags);

  const toggleTag = (id: string) => {
    setTags((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));
  };

  const valid = text.trim().length >= MIN_CHARS || tags.length >= MIN_TAGS;

  const handleNext = () => {
    if (!valid) return;
    setFreeform(text.trim(), tags);
    setStep('scoring');
    navigate('/test/scoring/questions');
  };

  return (
    <div>
      <TestProgress current={1} total={2} label="Шаг" />
      <PageWrapper width="narrow">
        <h1 className="mb-2 text-2xl font-extrabold text-talent-slate-900 sm:text-3xl">
          Расскажи о себе своими словами
        </h1>
        <p className="mb-6 text-talent-slate-500">
          Чем увлекаешься, чего боишься, кем себя видишь? Можно писать свободно или просто
          выбрать подходящие теги ниже.
        </p>

        <Card className="p-5 sm:p-6">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Например: люблю играть и придумывать миры, хочу делать игры, но боюсь, что это не профессия…"
            rows={5}
          />
          <div className="mt-2 text-right text-xs text-talent-slate-500">
            {text.trim().length} символов
          </div>

          <div className="mt-4 space-y-5">
            {(Object.keys(SUGGESTION_GROUPS) as SuggestionGroup[]).map((group) => (
              <div key={group}>
                <p className="mb-2 text-sm font-semibold text-talent-slate-900">
                  {SUGGESTION_GROUPS[group]}
                </p>
                <div className="flex flex-wrap gap-2">
                  {TAGS_BY_GROUP[group].map((tag) => {
                    const active = tags.includes(tag.id);
                    return (
                      <button
                        key={tag.id}
                        onClick={() => toggleTag(tag.id)}
                        className={cn(
                          'inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm font-medium transition-all',
                          active
                            ? 'border-talent-violet-500 bg-talent-violet-500 text-white'
                            : 'border-talent-slate-200 bg-white text-talent-slate-900 hover:border-talent-violet-300',
                        )}
                      >
                        {active && <Check className="h-3.5 w-3.5" />}
                        {tag.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-sm text-talent-slate-500">
            {valid ? (
              <span className="text-talent-emerald-500">Отлично, можно продолжать!</span>
            ) : (
              `Напиши ещё ${Math.max(0, MIN_CHARS - text.trim().length)} симв. или выбери ${Math.max(0, MIN_TAGS - tags.length)} тег(а)`
            )}
          </p>
          <Button onClick={handleNext} disabled={!valid} rightIcon={<ArrowRight className="h-4 w-4" />}>
            Дальше
          </Button>
        </div>
      </PageWrapper>
    </div>
  );
}
