/**
 * Единый премиум-фон: тёплая песочная база + тонкая точечная сетка (текстура,
 * чтобы не было плоско и «дёшево») + мягкие размытые бренд-блобы (фиолет/персик)
 * для глубины и «магии». Кладётся абсолютно за контентом (-z-10).
 *
 * Идея текстуры взята из присланного background-компонента, но адаптирована под
 * нашу палитру (вместо white/yellow/gray — песок + violet/orange).
 */
export function PageBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-talent-cream-50">
      {/* тонкая точечная сетка — лёгкая текстура */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(rgba(124, 58, 237, 0.07) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}
      />
      {/* мягкие бренд-блобы */}
      <div className="absolute -top-40 left-1/2 h-[700px] w-[1000px] -translate-x-1/2 rounded-full bg-talent-violet-300/[0.22] blur-[120px]" />
      <div className="absolute right-[-12%] top-[32%] h-[600px] w-[600px] rounded-full bg-talent-orange-400/[0.14] blur-[120px]" />
      <div className="absolute left-[-12%] top-[60%] h-[600px] w-[600px] rounded-full bg-talent-violet-300/[0.16] blur-[120px]" />
      <div className="absolute bottom-[-5%] right-[8%] h-[520px] w-[520px] rounded-full bg-talent-orange-400/[0.10] blur-[120px]" />
    </div>
  );
}
