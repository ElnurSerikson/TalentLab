import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Send, MessageCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button, Reveal } from '@/components/ui';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { GridBackground } from '@/components/ui/GridBackground';

interface Contact {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}

const CONTACTS: Contact[] = [
  { icon: Mail, label: 'Почта', value: 'elnur.serikson@gmail.com', href: 'mailto:elnur.serikson@gmail.com' },
  { icon: Send, label: 'Telegram', value: '@YelnurSerikson', href: 'https://t.me/YelnurSerikson' },
  { icon: MessageCircle, label: 'WhatsApp', value: '+7 707 404 69 69', href: 'https://wa.me/77074046969' },
];

export function ContactsPage() {
  return (
    <>
      <GridBackground className="pointer-events-none fixed inset-0 -z-10" />
      <PageWrapper width="narrow">
        <Reveal className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-talent-slate-900">
            Контакты
          </h1>
          <p className="mx-auto mt-3 max-w-md text-lg text-talent-slate-500">
            Есть вопрос, идея или хочешь сотрудничать? Напиши — мы на связи.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <SpotlightCard className="p-6 sm:p-8">
            <ul className="space-y-2">
              {CONTACTS.map((c) => {
                const Row = (
                  <span className="flex items-center gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-talent-violet-50 text-talent-violet-600">
                      <c.icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm text-talent-slate-500">{c.label}</span>
                      <span className="block font-semibold text-talent-slate-900">{c.value}</span>
                    </span>
                  </span>
                );
                return (
                  <li key={c.label}>
                    {c.href ? (
                      <a
                        href={c.href}
                        target={c.href.startsWith('http') ? '_blank' : undefined}
                        rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="block rounded-xl p-2 transition-colors hover:bg-talent-violet-50/60"
                      >
                        {Row}
                      </a>
                    ) : (
                      <div className="p-2">{Row}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </SpotlightCard>
        </Reveal>

        <Reveal delay={0.15} className="mt-8 text-center">
          <Link to="/feedback">
            <Button size="lg" variant="secondary" rightIcon={<ArrowRight className="h-5 w-5" />}>
              Оставить отзыв
            </Button>
          </Link>
        </Reveal>
      </PageWrapper>
    </>
  );
}
