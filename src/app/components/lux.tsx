import type { ReactNode } from 'react';

// Small tracked label with a gold rule — the editorial section kicker.
export function SectionLabel({
  children,
  icon,
  align = 'left',
}: {
  children: ReactNode;
  icon?: ReactNode;
  align?: 'left' | 'center';
}) {
  return (
    <div className={`flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
      <span className="h-px w-8 bg-[var(--gold)]/60" />
      {icon}
      <span className="font-sans-lux text-xs uppercase tracking-[0.42em] text-[var(--gold-bright)]">
        {children}
      </span>
    </div>
  );
}

// Primary CTA — gradient gold base + left-to-right gold sweep on hover, soft glow.
export function PrimaryCTA({
  href,
  children,
  className = '',
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`cta-sweep group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--gold-deep)] via-[var(--gold)] to-[var(--gold-bright)] px-8 py-4 font-sans-lux text-sm tracking-wide text-[var(--primary-foreground)] shadow-[0_8px_30px_-10px_rgba(201,162,75,0.55)] transition-shadow duration-500 hover:shadow-[0_10px_44px_-8px_rgba(201,162,75,0.7)] ${className}`}
    >
      {children}
    </a>
  );
}

// Secondary CTA — gold hairline outline, terracotta fill blooming from center.
export function SecondaryCTA({
  href,
  children,
  className = '',
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`cta-bloom group inline-flex items-center justify-center gap-2 rounded-full border border-[var(--gold)]/45 px-8 py-4 font-sans-lux text-sm tracking-wide text-[var(--gold-bright)] transition-colors duration-500 hover:border-[var(--terracotta)] hover:text-[var(--cream)] ${className}`}
    >
      {children}
    </a>
  );
}

// Line-art Adinkra seal (Gye Nyame — "supremacy of the divine") for the
// provenance certificate. Drawn as a gold engraving, no fill.
export function AdinkraSeal({ size = 56, className }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className} fill="none">
      <circle cx="32" cy="32" r="30" stroke="var(--gold)" strokeWidth="1" strokeOpacity="0.5" />
      <circle cx="32" cy="32" r="24" stroke="var(--gold)" strokeWidth="0.75" strokeOpacity="0.35" strokeDasharray="1 3" />
      <path
        d="M32 16c-6 0-10 4-10 9 0 4 3 6.5 6.5 8M32 48c6 0 10-4 10-9 0-4-3-6.5-6.5-8"
        stroke="var(--gold-bright)"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path d="M32 22v20" stroke="var(--gold-bright)" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M25 28l7 4 7-4M25 36l7-4 7 4" stroke="var(--gold)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
    </svg>
  );
}

// Corner ribbon for product cards.
export function CornerRibbon({ label }: { label: string }) {
  return (
    <div className="pointer-events-none absolute -right-9 top-4 z-10 rotate-45">
      <div className="bg-gradient-to-r from-[var(--gold-deep)] to-[var(--gold)] px-10 py-1 text-center font-sans-lux text-[0.6rem] uppercase tracking-[0.3em] text-[var(--primary-foreground)] shadow-[0_2px_10px_-2px_rgba(0,0,0,0.6)]">
        {label}
      </div>
    </div>
  );
}
