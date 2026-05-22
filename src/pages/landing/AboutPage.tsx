import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button, Card, Reveal } from '@/components/ui';
import { DOMAINS, DOMAIN_ORDER } from '@/data/domains';
import { Icon } from '@/components/ui';

export function AboutPage() {
  return (
    <PageWrapper width="wide">
      <Reveal>
        <h1 className="text-4xl font-extrabold tracking-tight text-talent-slate-900">
          О проекте TalentLab
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-talent-slate-500">
          Мы создаём AI-профайлер и карьерный навигатор для подростков и студентов.
          Наша цель — помочь тебе понять не «кем быть», а «какой ты есть»: твои сильные
          стороны, подходящие профессии и направление для роста.
        </p>
      </Reveal>

      <Reveal delay={0.1} className="mt-12">
        <h2 className="mb-2 text-2xl font-bold text-talent-slate-900">Модель TalentLab-60</h2>
        <p className="mb-6 max-w-2xl text-talent-slate-500">
          В отличие от классических тестов, мы оцениваем 60 талантов в 5 доменах. Пятый
          домен — «Цифровая адаптивность» — критичен для рынка 2026+.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DOMAIN_ORDER.map((d) => {
            const dom = DOMAINS[d];
            return (
              <Card key={d} className="flex items-start gap-4">
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-white"
                  style={{ background: dom.color }}
                >
                  <Icon name={dom.icon} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-bold text-talent-slate-900">{dom.name}</h3>
                  <p className="text-sm text-talent-slate-500">{dom.short}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </Reveal>

      <Reveal delay={0.15} className="mt-12">
        <Card className="bg-talent-violet-50/60">
          <h2 className="mb-2 text-xl font-bold text-talent-slate-900">Принципы продукта</h2>
          <ul className="grid gap-2 text-talent-slate-900 sm:grid-cols-2">
            <li>• Дружелюбный тон без сложных терминов</li>
            <li>• Геймификация и плавные анимации</li>
            <li>• Визуализация вместо текстовых простыней</li>
            <li>• Каждый блок ≤ 10 минут</li>
            <li>• Понятно даже родителям</li>
            <li>• Современные профессии и AI-навыки</li>
          </ul>
        </Card>
      </Reveal>

      <Reveal delay={0.2} className="mt-12 text-center">
        <Link to="/auth/register">
          <Button size="lg" rightIcon={<ArrowRight className="h-5 w-5" />}>
            Пройти тест бесплатно
          </Button>
        </Link>
      </Reveal>
    </PageWrapper>
  );
}
