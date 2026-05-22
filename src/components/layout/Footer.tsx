import { Link } from 'react-router-dom';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="border-t border-talent-slate-200/70 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-3 text-sm text-talent-slate-500">
              AI-профайлер и карьерный навигатор для школьников и студентов.
              Узнай не «кем быть», а «какой ты есть».
            </p>
          </div>
          <div className="flex gap-12">
            <div>
              <p className="mb-2 text-sm font-semibold text-talent-slate-900">Продукт</p>
              <ul className="space-y-1.5 text-sm text-talent-slate-500">
                <li><Link to="/about" className="hover:text-talent-violet-600">О проекте</Link></li>
                <li><Link to="/auth/register" className="hover:text-talent-violet-600">Пройти тест</Link></li>
                <li><Link to="/feedback" className="hover:text-talent-violet-600">Оставить отзыв</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold text-talent-slate-900">Правовое</p>
              <ul className="space-y-1.5 text-sm text-talent-slate-500">
                <li><span className="cursor-default">Конфиденциальность</span></li>
                <li><span className="cursor-default">Условия</span></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-talent-slate-200 pt-6 text-xs text-talent-slate-500">
          © {new Date().getFullYear()} TalentLab. Демо-версия. Все данные хранятся
          локально в вашем браузере.
        </div>
      </div>
    </footer>
  );
}
