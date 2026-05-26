import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { Modal } from '@/components/ui';

type LegalDoc = 'privacy' | 'terms';

export function Footer() {
  const [doc, setDoc] = useState<LegalDoc | null>(null);

  return (
    <footer className="border-t border-talent-slate-200/70 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-3 text-sm text-talent-slate-500">
              AI-профайлер, который помогает понять твои таланты и найти своё —
              в учёбе, работе или своём деле. Узнай не «кем быть», а «какой ты есть».
            </p>
          </div>
          <div className="flex gap-12">
            <div>
              <p className="mb-2 text-sm font-semibold text-talent-slate-900">Продукт</p>
              <ul className="space-y-1.5 text-sm text-talent-slate-500">
                <li><Link to="/about" className="hover:text-talent-violet-600">О проекте</Link></li>
                <li><Link to="/pricing" className="hover:text-talent-violet-600">Прайс</Link></li>
                <li><Link to="/contacts" className="hover:text-talent-violet-600">Контакты</Link></li>
                <li><Link to="/feedback" className="hover:text-talent-violet-600">Оставить отзыв</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold text-talent-slate-900">Правовое</p>
              <ul className="space-y-1.5 text-sm text-talent-slate-500">
                <li>
                  <button
                    onClick={() => setDoc('privacy')}
                    className="text-left transition-colors hover:text-talent-violet-600"
                  >
                    Конфиденциальность
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setDoc('terms')}
                    className="text-left transition-colors hover:text-talent-violet-600"
                  >
                    Условия
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-talent-slate-200 pt-6 text-xs text-talent-slate-500">
          © {new Date().getFullYear()} TalentLab — бесплатный демо-проект. Помогаем понять
          свои сильные стороны и выбрать путь: учёбу, работу или своё дело.
        </div>
      </div>

      <Modal
        open={doc !== null}
        onClose={() => setDoc(null)}
        title={doc === 'terms' ? 'Условия использования' : 'Конфиденциальность'}
      >
        {doc === 'terms' ? <TermsText /> : <PrivacyText />}
      </Modal>
    </footer>
  );
}

function PrivacyText() {
  return (
    <div className="space-y-3 text-sm leading-relaxed text-talent-slate-500">
      <p>TalentLab — бесплатный демо-проект, и мы берём минимум данных.</p>
      <ul className="list-disc space-y-1.5 pl-5">
        <li>
          <span className="text-talent-slate-900">Что храним:</span> email — чтобы ты мог
          войти; ответы и результаты тестов — чтобы показать отчёт; отзывы — анонимно, без
          привязки к личности.
        </li>
        <li>
          <span className="text-talent-slate-900">Чего не делаем:</span> не продаём и не
          передаём твои данные третьим лицам, не показываем рекламу.
        </li>
        <li>
          Часть данных хранится прямо в твоём браузере, часть — в защищённом облаке, чтобы
          результаты не потерялись.
        </li>
      </ul>
      <p className="text-talent-slate-400">
        Это демо: пожалуйста, не вводи здесь чувствительную личную информацию.
      </p>
    </div>
  );
}

function TermsText() {
  return (
    <div className="space-y-3 text-sm leading-relaxed text-talent-slate-500">
      <p>TalentLab предоставляется «как есть», бесплатно и в демонстрационных целях.</p>
      <ul className="list-disc space-y-1.5 pl-5">
        <li>
          Результаты тестов — это ориентир и пища для размышлений, а{' '}
          <span className="text-talent-slate-900">не</span> диагноз и не профессиональная
          психологическая или карьерная консультация.
        </li>
        <li>Решения об учёбе, работе и жизни всегда остаются за тобой.</li>
        <li>Мы можем дорабатывать, изменять или приостанавливать сервис без предупреждения.</li>
      </ul>
      <p className="text-talent-slate-400">
        Пользуясь TalentLab, относись к результатам с этим пониманием. 💜
      </p>
    </div>
  );
}
