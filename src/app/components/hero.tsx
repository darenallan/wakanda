import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { IMAGES } from './images';
import { PrimaryCTA, SecondaryCTA, SectionLabel } from './lux';

const EASE = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export function Hero() {
  return (
    <section id="top" className="cursor-seal relative min-h-screen w-full overflow-hidden">
      {/* Backdrop photograph — slow cinematic zoom */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: EASE }}
      >
        <ImageWithFallback
          src={IMAGES.heroLounge}
          alt="Intérieur du lounge Wakanda la nuit, patrons dégustant des cocktails sous un éclairage doré tamisé"
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Overlay noir chaud + lueur de bougie discrète en haut à droite */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--obsidian)] via-[var(--obsidian)]/78 to-[var(--obsidian)]/45" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--obsidian)]/92 via-[var(--obsidian)]/40 to-transparent" />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(50%_45%_at_88%_8%,rgba(201,162,75,0.22),transparent_60%)]"
        animate={{ opacity: [0.55, 0.9, 0.55] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Asymmetric content grid — text weighted left (≈60/40) */}
      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center px-6 pt-32 pb-24 lg:grid-cols-12 lg:px-10">
        <motion.div className="lg:col-span-7" variants={container} initial="hidden" animate="show">
          <motion.div className="mb-8" variants={item}>
            <SectionLabel>Ouagadougou · Burkina Faso</SectionLabel>
          </motion.div>

          <motion.h1
            className="font-display text-[clamp(3.5rem,10vw,8rem)] leading-[0.92] text-[var(--cream)]"
            variants={item}
          >
            Où la nuit
            <br />
            <span className="italic text-[var(--gold-bright)]">devient légende</span>
          </motion.h1>

          <motion.p
            className="mt-8 max-w-md font-sans-lux text-base leading-relaxed text-[var(--sand)]"
            variants={item}
          >
            Un salon d'exception où l'héritage burkinabé rencontre le futur.
            Cocktails signature, gastronomie sahélienne, et une ambiance sculptée
            dans l'or et la nuit profonde.
          </motion.p>

          <motion.div className="mt-10 flex flex-wrap items-center gap-4" variants={item}>
            <PrimaryCTA href="#reserver">Réserver votre expérience</PrimaryCTA>
            <SecondaryCTA href="#carte">Découvrir la carte</SecondaryCTA>
          </motion.div>

          <motion.div className="mt-16 flex flex-wrap gap-12" variants={item}>
            {[
              { k: 'Depuis', v: '2019' },
              { k: 'Zones', v: '04' },
              { k: 'Note', v: '4.9' },
            ].map((s) => (
              <div key={s.k} className="border-l border-[var(--gold)]/25 pl-4">
                <div className="font-mark text-2xl text-[var(--gold-bright)]">{s.v}</div>
                <div className="mt-1 font-sans-lux text-[0.65rem] uppercase tracking-[0.32em] text-[var(--sand)]">
                  {s.k}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Overflowing vertical wordmark — breaks the grid rigidity */}
        <motion.div
          className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 lg:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.2 }}
        >
          <span
            className="font-mark text-[7rem] tracking-[0.5em] text-[var(--cream)]/[0.04]"
            style={{ writingMode: 'vertical-rl' }}
          >
            WAKANDA
          </span>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-6 z-10 lg:left-10"
        animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex items-center gap-3 font-sans-lux text-[0.6rem] uppercase tracking-[0.3em] text-[var(--sand)]">
          <span className="h-8 w-px bg-gradient-to-b from-[var(--gold)] to-transparent" />
          Défiler
        </div>
      </motion.div>
    </section>
  );
}
