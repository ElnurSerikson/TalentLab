import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { Button, Avatar } from '@/components/ui';
import { useUserStore } from '@/store/userStore';
import { useAuthActionsSafe } from '@/lib/authActions';
import { resetSession } from '@/lib/session';
import { cn } from '@/lib/cn';

export function Header() {
  const user = useUserStore((s) => s.user);
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuthActionsSafe();
  const [open, setOpen] = useState(false);

  // На лендинге всегда показываем маркетинговое меню, даже залогиненным:
  // меняется только кнопка справа («Войти» → «Кабинет»).
  const isLanding = location.pathname === '/';

  const handleLogout = async () => {
    try {
      await signOut?.();
    } catch {
      /* ignore */
    }
    resetSession();
    setOpen(false);
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-talent-slate-200/70 bg-talent-cream-50/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {!user || isLanding ? (
            <>
              <NavLink to="/about">О проекте</NavLink>
              <NavLink to="/pricing">Прайс</NavLink>
              <NavLink to="/contacts">Контакты</NavLink>
              <Link to={user ? '/dashboard' : '/auth/login'} className="ml-2">
                <Button variant="secondary" size="sm">{user ? 'Кабинет' : 'Войти'}</Button>
              </Link>
            </>
          ) : (
            <>
              <NavLink to="/dashboard">Кабинет</NavLink>
              <NavLink to="/report">Мой отчёт</NavLink>
              <div className="mx-2 flex items-center gap-2">
                <Avatar name={user.name || user.email} size={36} />
                <Button variant="ghost" size="sm" onClick={handleLogout} leftIcon={<LogOut className="h-4 w-4" />}>
                  Выйти
                </Button>
              </div>
            </>
          )}
        </nav>

        <button
          className="rounded-lg p-2 text-talent-slate-900 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-talent-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col gap-2">
            {!user || isLanding ? (
              <>
                <MobileLink to="/about" onClick={() => setOpen(false)}>О проекте</MobileLink>
                <MobileLink to="/pricing" onClick={() => setOpen(false)}>Прайс</MobileLink>
                <MobileLink to="/contacts" onClick={() => setOpen(false)}>Контакты</MobileLink>
                <Link to={user ? '/dashboard' : '/auth/login'} onClick={() => setOpen(false)}>
                  <Button variant="secondary" fullWidth>{user ? 'Кабинет' : 'Войти'}</Button>
                </Link>
              </>
            ) : (
              <>
                <MobileLink to="/dashboard" onClick={() => setOpen(false)}>Кабинет</MobileLink>
                <MobileLink to="/report" onClick={() => setOpen(false)}>Мой отчёт</MobileLink>
                <Button variant="ghost" fullWidth onClick={handleLogout} leftIcon={<LogOut className="h-4 w-4" />}>
                  Выйти
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="rounded-lg px-3 py-2 text-sm font-semibold text-talent-slate-500 transition-colors hover:text-talent-violet-600"
    >
      {children}
    </Link>
  );
}

function MobileLink({
  to,
  children,
  onClick,
}: {
  to: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        'rounded-lg px-3 py-3 text-base font-semibold text-talent-slate-900 hover:bg-talent-violet-50',
      )}
    >
      {children}
    </Link>
  );
}
