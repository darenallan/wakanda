import { Instagram, Phone, MapPin, Clock } from 'lucide-react';
import { Logo } from './logo';
import { Reveal } from './motion-primitives';
import { AdinkraSeal } from './lux';

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--border)] bg-[var(--charcoal-warm)]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/50 to-transparent" />
      <Reveal className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-4 lg:px-10">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3">
            {/* effet de gravure : liseré or + inner shadow subtile */}
            <div className="rounded-full shadow-[inset_0_2px_6px_rgba(0,0,0,0.7),0_0_0_1px_rgba(201,162,75,0.35)]">
              <Logo size={46} />
            </div>
            <div className="leading-tight">
              <div className="font-mark tracking-[0.22em] text-[var(--gold-bright)]">WAKANDA</div>
              <div className="font-mark text-[0.6rem] tracking-[0.4em] text-[var(--gold)]">
                RESTAURANT · BAR · LOUNGE
              </div>
            </div>
          </div>
          <p className="mt-5 max-w-xs font-sans-lux text-sm leading-relaxed text-[var(--sand)]">
            L'expérience nocturne d'exception au cœur de Ouagadougou.
          </p>
        </div>

        {/* Contact — filigrane Adinkra en fond (~5%) */}
        <div className="relative">
          <div className="pointer-events-none absolute -right-2 -top-4 opacity-[0.05]">
            <AdinkraSeal size={140} />
          </div>
          <FooterCol title="Contact">
            <Line Icon={Phone}>+226 25 00 00 00</Line>
            <Line Icon={MapPin}>Avenue Kwame N'Krumah, Ouagadougou</Line>
            <Line Icon={Clock}>Mar — Dim · 18h00 — 02h00</Line>
          </FooterCol>
        </div>

        <FooterCol title="Explorer">
          {['La Carte', 'Réserver', "L'Âme du Lieu", 'Événements privés'].map((l) => (
            <a key={l} href="#top" className="block font-sans-lux text-sm text-[var(--sand)] transition-colors hover:text-[var(--gold-bright)]">
              {l}
            </a>
          ))}
        </FooterCol>

        <FooterCol title="Suivez-nous">
          <a href="#top" className="inline-flex items-center gap-2 font-sans-lux text-sm text-[var(--sand)] transition-colors hover:text-[var(--gold-bright)]">
            <Instagram size={18} /> @wakanda.ouaga
          </a>
          <p className="mt-4 font-sans-lux text-xs leading-relaxed text-[var(--sand)]">
            Réservations de groupe & privatisations sur demande.
          </p>
        </FooterCol>
      </Reveal>
      <div className="border-t border-[var(--border)] py-6 text-center text-xs tracking-wide text-[var(--muted-foreground)]">
        © 2026 Wakanda · Restaurant · Bar · Lounge — Tissé d'or à Ouagadougou
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="relative mb-4 font-sans-lux text-xs uppercase tracking-[0.34em] text-[var(--gold-bright)]">
        {title}
      </h4>
      <div className="relative space-y-3">{children}</div>
    </div>
  );
}

function Line({ Icon, children }: { Icon: typeof Phone; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 font-sans-lux text-sm text-[var(--sand)]">
      <Icon size={16} className="mt-0.5 text-[var(--gold)]" />
      <span>{children}</span>
    </div>
  );
}
