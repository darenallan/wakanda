import { useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { Dwennimmen } from './adinkra-icons';
import { Starburst } from './logo';
import { Reveal } from './motion-primitives';
import { SectionLabel } from './lux';

type Table = {
  id: string;
  label: string;
  x: number;
  y: number;
  seats: number;
  zone: string;
  occupied: boolean;
  kind: 'booth' | 'hightop' | 'lounge' | 'terrace';
};

// Realistic lounge layout: VIP booths along the top wall, a curved bar on the
// right, a central lounge around the stage, and an outdoor terrace below.
const TABLES: Table[] = [
  // Zone Prestige — VIP booths (top wall)
  { id: 'P1', label: 'P1', x: 95, y: 92, seats: 6, zone: 'Zone Prestige', occupied: false, kind: 'booth' },
  { id: 'P2', label: 'P2', x: 185, y: 92, seats: 6, zone: 'Zone Prestige', occupied: true, kind: 'booth' },
  { id: 'P3', label: 'P3', x: 275, y: 92, seats: 8, zone: 'Zone Prestige', occupied: false, kind: 'booth' },
  { id: 'P4', label: 'P4', x: 365, y: 92, seats: 4, zone: 'Zone Prestige', occupied: false, kind: 'booth' },
  // Le Bar — high-tops beside the counter
  { id: 'B1', label: 'B1', x: 500, y: 95, seats: 2, zone: 'Le Bar', occupied: true, kind: 'hightop' },
  { id: 'B2', label: 'B2', x: 500, y: 150, seats: 2, zone: 'Le Bar', occupied: false, kind: 'hightop' },
  { id: 'B3', label: 'B3', x: 500, y: 205, seats: 2, zone: 'Le Bar', occupied: false, kind: 'hightop' },
  { id: 'B4', label: 'B4', x: 500, y: 260, seats: 3, zone: 'Le Bar', occupied: true, kind: 'hightop' },
  // Salon Central — lounge tables around the stage
  { id: 'L1', label: 'L1', x: 150, y: 210, seats: 4, zone: 'Salon Central', occupied: false, kind: 'lounge' },
  { id: 'L2', label: 'L2', x: 260, y: 240, seats: 4, zone: 'Salon Central', occupied: false, kind: 'lounge' },
  { id: 'L3', label: 'L3', x: 370, y: 210, seats: 6, zone: 'Salon Central', occupied: true, kind: 'lounge' },
  // Terrasse Étoilée — outdoor
  { id: 'T1', label: 'T1', x: 110, y: 355, seats: 4, zone: 'Terrasse Étoilée', occupied: false, kind: 'terrace' },
  { id: 'T2', label: 'T2', x: 210, y: 355, seats: 4, zone: 'Terrasse Étoilée', occupied: false, kind: 'terrace' },
  { id: 'T3', label: 'T3', x: 310, y: 355, seats: 6, zone: 'Terrasse Étoilée', occupied: true, kind: 'terrace' },
  { id: 'T4', label: 'T4', x: 410, y: 355, seats: 8, zone: 'Terrasse Étoilée', occupied: false, kind: 'terrace' },
];

const ZONE_LABELS = [
  { name: 'ZONE PRESTIGE', x: 48, y: 52 },
  { name: 'LE BAR', x: 470, y: 52 },
  { name: 'SALON CENTRAL', x: 48, y: 180 },
  { name: 'TERRASSE ÉTOILÉE', x: 48, y: 312 },
];

const TIMES = ['19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30'];

export function FloorPlan() {
  const [selected, setSelected] = useState<string | null>('P1');
  const [date, setDate] = useState('2026-07-12');
  const [time, setTime] = useState('20:30');
  const [guests, setGuests] = useState(4);
  const [name, setName] = useState('');
  const [hovered, setHovered] = useState<string | null>(null);

  const selectedTable = useMemo(() => TABLES.find((t) => t.id === selected) ?? null, [selected]);
  const hoveredTable = useMemo(() => TABLES.find((t) => t.id === hovered) ?? null, [hovered]);

  const fill = (t: Table) => {
    if (t.occupied) return 'var(--occupied)';
    if (t.id === selected) return 'var(--gold-bright)';
    return 'var(--gold)';
  };

  const seatSize = (t: Table) =>
    t.kind === 'booth' ? 26 : t.kind === 'hightop' ? 15 : t.kind === 'lounge' ? 22 : 20;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTable || selectedTable.occupied) {
      toast.error('Veuillez sélectionner une table disponible.');
      return;
    }
    toast.success(
      `Table ${selectedTable.label} réservée · ${guests} invités · ${date} à ${time}`,
      { description: `${selectedTable.zone} — nous vous attendons, ${name || 'cher invité'}.` }
    );
  };

  return (
    <section id="reserver" className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <Reveal className="mb-14 flex flex-col items-center text-center">
        <SectionLabel align="center" icon={<Dwennimmen size={18} className="text-[var(--gold)]" />}>
          Réservation
        </SectionLabel>
        <h2 className="mt-6 font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.95] text-[var(--cream)]">
          Réservez votre <span className="italic text-[var(--terracotta-soft)]">expérience</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl font-sans-lux text-sm leading-relaxed text-[var(--sand)]">
          Choisissez votre table sur le plan interactif. L'or scintille pour les
          places disponibles, le cuivre pour celles déjà occupées.
        </p>
      </Reveal>

      <div className="grid gap-8 lg:grid-cols-[1.55fr_1fr]">
        {/* Interactive floor plan */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-2xl border border-[var(--border)] surface-textured p-4 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_0%,rgba(201,162,75,0.1),transparent_70%)]" />

          {/* Tooltip élégant — fond noir, bordure or 1px, aucune ombre teintée */}
          {hoveredTable && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
              className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-[130%] whitespace-nowrap rounded-md border border-[var(--gold)]/70 bg-[var(--obsidian)] px-3 py-2 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.9)]"
              style={{
                left: `${(hoveredTable.x / 600) * 100}%`,
                top: `${(hoveredTable.y / 400) * 100}%`,
              }}
            >
              <div className="font-mark text-sm text-[var(--gold-bright)]">
                Table {hoveredTable.label}
              </div>
              <div className="font-sans-lux text-[0.62rem] uppercase tracking-[0.2em] text-[var(--sand)]">
                {hoveredTable.zone} · {hoveredTable.seats} places
              </div>
              <div className="mt-1 font-sans-lux text-[0.62rem] tracking-wide" style={{ color: hoveredTable.occupied ? 'var(--brass)' : 'var(--gold-bright)' }}>
                {hoveredTable.occupied ? '● Occupé' : '● Disponible'}
              </div>
            </motion.div>
          )}
          <svg viewBox="0 0 600 400" className="cursor-seal relative w-full">
            {/* Room shell */}
            <rect x="20" y="20" width="560" height="360" rx="18" fill="rgba(255,255,255,0.015)" stroke="var(--gold)" strokeOpacity="0.35" strokeWidth="1.5" />

            {/* Central compass-star floor medallion (echoes the logo) */}
            <g transform="translate(260,235)" opacity="0.5">
              <path d="M0 -34L6 -6L34 0L6 6L0 34L-6 6L-34 0L-6 -6Z" fill="var(--gold)" fillOpacity="0.12" />
              <path d="M0 -20L4 -4L20 0L4 4L0 20L-4 4L-20 0L-4 -4Z" fill="var(--gold)" fillOpacity="0.18" />
            </g>

            {/* Terrace divider (glass wall) */}
            <line x1="34" y1="300" x2="566" y2="300" stroke="var(--gold)" strokeOpacity="0.3" strokeDasharray="2 6" strokeWidth="1.4" />

            {/* Bar counter (right, curved) */}
            <path
              d="M560 70 L470 70 Q450 70 450 90 L450 285 Q450 300 465 300 L560 300"
              fill="none"
              stroke="var(--gold)"
              strokeOpacity="0.55"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <text x="530" y="190" textAnchor="middle" fill="var(--champagne)" transform="rotate(90 530 190)" style={{ fontFamily: 'var(--font-serif)', fontSize: 11, letterSpacing: '0.25em' }}>
              LE COMPTOIR
            </text>

            {/* Stage */}
            <rect x="245" y="188" width="90" height="20" rx="6" fill="var(--gold)" fillOpacity="0.14" stroke="var(--gold)" strokeOpacity="0.4" strokeDasharray="3 3" />
            <text x="290" y="202" textAnchor="middle" fill="var(--gold-bright)" style={{ fontFamily: 'var(--font-serif)', fontSize: 9, letterSpacing: '0.2em' }}>
              SCÈNE
            </text>

            {/* Entrance */}
            <line x1="20" y1="250" x2="20" y2="290" stroke="var(--charcoal-soft)" strokeWidth="4" />
            <text x="30" y="273" fill="var(--muted-foreground)" style={{ fontFamily: 'var(--font-sans)', fontSize: 9, letterSpacing: '0.15em' }}>
              ENTRÉE
            </text>

            {/* Zone labels */}
            {ZONE_LABELS.map((z) => (
              <text key={z.name} x={z.x} y={z.y} fill="var(--gold)" fillOpacity="0.85" style={{ fontFamily: 'var(--font-serif)', fontSize: 11, letterSpacing: '0.2em' }}>
                {z.name}
              </text>
            ))}

            {/* Tables */}
            {TABLES.map((t) => {
              const isSel = t.id === selected;
              const s = seatSize(t);
              return (
                <motion.g
                  key={t.id}
                  onClick={() => !t.occupied && setSelected(t.id)}
                  onMouseEnter={() => setHovered(t.id)}
                  onMouseLeave={() => setHovered((h) => (h === t.id ? null : h))}
                  style={{ cursor: t.occupied ? 'not-allowed' : undefined, transformOrigin: `${t.x}px ${t.y}px` }}
                  whileHover={t.occupied ? undefined : { scale: 1.12 }}
                  whileTap={t.occupied ? undefined : { scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                >
                  {/* hover halo ring */}
                  {t.id === hovered && !t.occupied && (
                    <circle
                      cx={t.x}
                      cy={t.y}
                      r={s + 12}
                      fill="none"
                      stroke="var(--gold-bright)"
                      strokeWidth="1.2"
                      strokeOpacity="0.8"
                    />
                  )}
                  {/* glow halo */}
                  <circle
                    cx={t.x}
                    cy={t.y}
                    r={s + (isSel ? 10 : 6)}
                    fill={fill(t)}
                    fillOpacity={isSel ? 0.3 : 0.14}
                    className={t.occupied ? '' : 'animate-pulse-glow'}
                  />
                  {t.kind === 'booth' ? (
                    <rect
                      x={t.x - s}
                      y={t.y - s * 0.62}
                      width={s * 2}
                      height={s * 1.24}
                      rx="9"
                      fill={fill(t)}
                      fillOpacity="0.92"
                      stroke={isSel ? 'var(--foreground)' : 'transparent'}
                      strokeWidth="1.5"
                    />
                  ) : (
                    <circle
                      cx={t.x}
                      cy={t.y}
                      r={s}
                      fill={fill(t)}
                      fillOpacity="0.92"
                      stroke={isSel ? 'var(--foreground)' : 'transparent'}
                      strokeWidth="1.5"
                    />
                  )}
                  <text
                    x={t.x}
                    y={t.y - 1}
                    textAnchor="middle"
                    fill="var(--charcoal)"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700 }}
                  >
                    {t.label}
                  </text>
                  <text
                    x={t.x}
                    y={t.y + 10}
                    textAnchor="middle"
                    fill="var(--charcoal)"
                    fillOpacity="0.75"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: 7.5, fontWeight: 600 }}
                  >
                    {t.seats}p
                  </text>
                </motion.g>
              );
            })}
          </svg>

          {/* Legend */}
          <div className="relative flex flex-wrap items-center gap-6 px-2 pt-3 text-xs text-[var(--muted-foreground)]">
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[var(--gold)] shadow-[0_0_10px_var(--gold)]" />
              Disponible
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[var(--occupied)]" />
              Occupé
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-sm bg-[var(--gold-bright)]" />
              Sélectionné
            </span>
          </div>
        </motion.div>

        {/* Reservation form */}
        <motion.form
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 rounded-2xl border border-[var(--gold)]/25 bg-[var(--card)] p-7 shadow-[0_0_50px_-24px_var(--gold)]"
        >
          <div className="rounded-xl border border-[var(--border)] bg-[var(--secondary)]/50 p-4">
            {selectedTable ? (
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs uppercase tracking-[0.25em] text-[var(--muted-foreground)]">
                    Table sélectionnée
                  </div>
                  <div className="font-display text-2xl text-[var(--gold-bright)]">
                    {selectedTable.label}
                  </div>
                  <div className="text-sm text-[var(--champagne)]">{selectedTable.zone}</div>
                </div>
                <div className="text-right text-sm text-[var(--muted-foreground)]">
                  {selectedTable.seats} places
                </div>
              </div>
            ) : (
              <div className="text-sm text-[var(--muted-foreground)]">
                Sélectionnez une table sur le plan.
              </div>
            )}
          </div>

          <Field label="Nom complet">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Aïcha Ouédraogo"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--input)] px-4 py-3 text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted-foreground)]/60 focus:border-[var(--gold)]/60"
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Date">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--input)] px-4 py-3 text-[var(--foreground)] outline-none focus:border-[var(--gold)]/60 [color-scheme:dark]"
              />
            </Field>
            <Field label="Invités">
              <div className="flex items-center rounded-lg border border-[var(--border)] bg-[var(--input)]">
                <button
                  type="button"
                  onClick={() => setGuests((g) => Math.max(1, g - 1))}
                  className="px-4 py-3 text-[var(--gold-bright)] transition-colors hover:bg-[var(--gold)]/10"
                >
                  −
                </button>
                <span className="flex-1 text-center text-[var(--foreground)]">{guests}</span>
                <button
                  type="button"
                  onClick={() => setGuests((g) => Math.min(12, g + 1))}
                  className="px-4 py-3 text-[var(--gold-bright)] transition-colors hover:bg-[var(--gold)]/10"
                >
                  +
                </button>
              </div>
            </Field>
          </div>

          <Field label="Heure">
            <div className="grid grid-cols-4 gap-2">
              {TIMES.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTime(t)}
                  className={`rounded-lg border py-2 text-sm transition-all ${
                    time === t
                      ? 'border-[var(--gold)] bg-[var(--gold)]/15 text-[var(--gold-bright)]'
                      : 'border-[var(--border)] text-[var(--muted-foreground)] hover:border-[var(--gold)]/50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </Field>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-2 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[var(--gold-deep)] via-[var(--gold)] to-[var(--gold-bright)] py-4 tracking-wide text-[var(--primary-foreground)] shadow-[0_0_36px_-8px_var(--gold)]"
          >
            <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}>
              <Starburst size={18} />
            </motion.span>
            Confirmer la réservation
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.25em] text-[var(--muted-foreground)]">
        {label}
      </span>
      {children}
    </label>
  );
}
