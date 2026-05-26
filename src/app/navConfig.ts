/**
 * Префиксы путей внутреннего кабинета. На этих страницах хедер минимальный
 * (только «Выйти») и без подвала; на остальных (витрина) — полное меню и футер.
 */
export const CABINET_PREFIXES = ['/dashboard', '/onboarding', '/report', '/tests', '/test'];

export function isCabinetPath(pathname: string): boolean {
  return CABINET_PREFIXES.some((p) => pathname.startsWith(p));
}
