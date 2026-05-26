import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Mail, Lock } from 'lucide-react';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { Button, Card, Input, Tabs } from '@/components/ui';
import { Logo } from '@/components/layout/Logo';
import { useUserStore } from '@/store/userStore';
import { useAuthActionsSafe } from '@/lib/authActions';
import { track } from '@/lib/analytics';

const emailSchema = z.string().email('Введите корректный email');

interface FormValues {
  email: string;
  password: string;
  confirm: string;
  consent: boolean;
}

export function AuthPage({ mode: initialMode }: { mode: 'login' | 'register' }) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const navigate = useNavigate();
  const login = useUserStore((s) => s.login);
  const { signIn } = useAuthActionsSafe();
  const [authError, setAuthError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { email: '', password: '', confirm: '', consent: false },
  });

  const onSubmit = async (data: FormValues) => {
    setAuthError('');
    if (!signIn) {
      setAuthError('Авторизация временно недоступна — попробуй позже.');
      return;
    }
    setSubmitting(true);
    try {
      await signIn('password', {
        email: data.email,
        password: data.password,
        flow: mode === 'register' ? 'signUp' : 'signIn',
      });
      login(data.email);
      track(mode === 'register' ? 'auth_register' : 'auth_login', { email: data.email });
      navigate('/onboarding');
    } catch {
      setAuthError(
        mode === 'register'
          ? 'Не удалось создать аккаунт. Возможно, этот email уже занят.'
          : 'Неверный email или пароль.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  const password = watch('password');

  return (
    <PageWrapper width="narrow" className="max-w-md">
      <div className="mb-6 flex justify-center">
        <Logo />
      </div>
      <Card className="p-6 sm:p-8">
        <Tabs
          className="mb-6 w-full"
          value={mode}
          onChange={(v) => setMode(v as 'login' | 'register')}
          items={[
            { value: 'login', label: 'Войти' },
            { value: 'register', label: 'Регистрация' },
          ]}
        />

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            leftIcon={<Mail className="h-4 w-4" />}
            error={errors.email?.message}
            {...register('email', {
              required: 'Введите email',
              validate: (v) => emailSchema.safeParse(v).success || 'Введите корректный email',
            })}
          />
          <Input
            label="Пароль"
            type="password"
            placeholder="••••••"
            leftIcon={<Lock className="h-4 w-4" />}
            error={errors.password?.message}
            {...register('password', { required: 'Введите пароль' })}
          />
          {mode === 'register' && (
            <Input
              label="Повторите пароль"
              type="password"
              placeholder="••••••"
              leftIcon={<Lock className="h-4 w-4" />}
              error={errors.confirm?.message}
              {...register('confirm', {
                validate: (v) => v === password || 'Пароли не совпадают',
              })}
            />
          )}

          {mode === 'register' && (
            <label className="flex items-start gap-2.5 text-sm text-talent-slate-500">
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 rounded border-talent-slate-200 text-talent-violet-500 focus:ring-talent-violet-400"
                {...register('consent', { required: 'Нужно согласие на обработку данных' })}
              />
              <span>
                Я согласен с обработкой моих данных
                {errors.consent && (
                  <span className="block text-talent-rose-500">{errors.consent.message}</span>
                )}
              </span>
            </label>
          )}

          {authError && (
            <p className="rounded-xl bg-talent-rose-500/10 px-3.5 py-2.5 text-sm text-talent-rose-500">
              {authError}
            </p>
          )}

          <Button type="submit" fullWidth size="lg" loading={submitting}>
            {mode === 'register' ? 'Создать аккаунт' : 'Войти'}
          </Button>
        </form>
      </Card>

      <p className="mt-5 text-center text-sm text-talent-slate-500">
        {mode === 'register' ? (
          <>Уже есть аккаунт?{' '}
            <button onClick={() => setMode('login')} className="font-semibold text-talent-violet-600">
              Войти
            </button>
          </>
        ) : (
          <>Нет аккаунта?{' '}
            <button onClick={() => setMode('register')} className="font-semibold text-talent-violet-600">
              Зарегистрироваться
            </button>
          </>
        )}
      </p>
      <p className="mt-2 text-center text-xs text-talent-slate-500">
        <Link to="/" className="hover:text-talent-violet-600">← На главную</Link>
      </p>
    </PageWrapper>
  );
}
