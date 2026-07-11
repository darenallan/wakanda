import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Akofena, Nkyinkyim, GyeNyame } from './adinkra-icons';
import { SectionLabel, AdinkraSeal } from './lux';
import { Reveal } from './motion-primitives';

const EASE = [0.22, 1, 0.36, 1] as const;

// Faso Dan Fani strip — woven cotton bands: terracotta / gold / cream / obsidian,
// with small geometric motif dashes. Rendered as CSS gradients (no flat image).
const bandStyle = (variant: number): React.CSSProperties => {
  const palettes = [
    ['#b5502e', '#c9a24b', '#f5efe3', '#14110d'],
    ['#c9a24b', '#14110d', '#b5502e', '#e8c878'],
    ['#8a6e2f', '#f5efe3', '#b5502e', '#c9a24b'],
  ];
  const [a, b, c, d] = palettes[variant % palettes.length];
  return {
    backgroundImage: `
      repeating-linear-gradient(90deg,
        ${a} 0px, ${a} 10px,
        ${b} 10px, ${b} 13px,
        ${c} 13px, ${c} 16px,
        ${d} 16px, ${d} 26px,
        ${c} 26px, ${c} 29px,
        ${b} 29px, ${b} 32px)`,
  };
};

// Living weave: several diagonal bands drifting at different speeds on scroll.
function LivingWeave() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const y0 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y1 = useTransform(scrollYProgress, [0, 1], [110, -110]);
  const y2 = useTransform(scrollYProgress, [0, 1], [30, -150]);
  const speeds = [y0, y1, y2, y0, y1];

  return (
    <div ref={ref} className="relative h-[440px] overflow-hidden rounded-md lg:h-full">
      {/* warm black wash + gold hairline frame */}
      <div className="absolute inset-0 z-20 frame-gold rounded-md" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-[var(--obsidian)] via-transparent to-[var(--obsidian)]/30" />

      <div className="absolute inset-0 -rotate-[32deg] scale-[1.7]">
        {speeds.map((y, i) => (
          <motion.div
            key={i}
            style={{ y, ...bandStyle(i) }}
            className="mb-4 h-16 w-full opacity-90 shadow-[0_10px_30px_-14px_rgba(0,0,0,0.8)]"
          />
        ))}
      </div>
    </div>
  );
}

const PILLARS = [
  {
    num: 'I',
    Icon: Akofena,
    title: 'Architecture',
    body: "Une architecture inspirée des cités de terre du Sahel, sculptée dans l'ombre et la lumière pour durer au-delà des saisons.",
    h: 'sm:mt-0',
  },
  {
    num: 'II',
    Icon: Nkyinkyim,
    title: 'Cuisine',
    body: "Chaque recette est le fruit d'un dialogue entre la tradition burkinabé et l'audace contemporaine du chef.",
    h: 'sm:mt-10',
  },
  {
    num: 'III',
    Icon: GyeNyame,
    title: 'Esprit',
    body: "Un lieu vivant où la musique, l'art et la lumière racontent une même histoire, du crépuscule à l'aube.",
    h: 'sm:mt-4',
  },
];

export function SoulSection() {
  return (
    <section id="ame" className="relative overflow-hidden py-28">
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_85%_15%,rgba(181,80,46,0.08),transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* Intro — asymmetric 60/40 */}
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <SectionLabel icon={<GyeNyame size={18} className="text-[var(--gold)]" />}>
              L'Âme du Lieu
            </SectionLabel>
            <h2 className="mt-6 font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.95] text-[var(--cream)]">
              Un héritage tissé
              <br />
              <span className="italic text-[var(--terracotta-soft)]">de lumière et de terre</span>
            </h2>
            <p className="mt-7 max-w-lg font-sans-lux text-base leading-relaxed text-[var(--sand)]">
              Wakanda puise dans les motifs géométriques du Faso Dan Fani, les
              symboles Adinkra et la chaleur des nuits de Ouagadougou. Ici, la
              technologie sublime la tradition — sans jamais la trahir.
            </p>
          </Reveal>

          {/* Living weave + provenance certificate */}
          <motion.div
            className="relative lg:col-span-5"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <LivingWeave />

            {/* Badge = certificat de provenance */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-8 -left-6 z-30 w-[16rem] surface-textured rounded-md border border-[var(--gold)]/40 p-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9)]"
            >
              <div className="absolute right-4 top-4">
                <AdinkraSeal size={46} />
              </div>
              <div className="font-sans-lux text-[0.6rem] uppercase tracking-[0.3em] text-[var(--gold)]/70">
                Certificat de provenance
              </div>
              <div className="mt-3 font-display text-3xl leading-none text-[var(--gold-bright)]">
                Faso Dan Fani
              </div>
              <div className="mt-2 font-sans-lux text-[0.7rem] uppercase tracking-[0.28em] text-[var(--sand)]">
                Tissage d'honneur
              </div>
              <div className="mt-4 h-px w-full bg-gradient-to-r from-[var(--gold)]/50 to-transparent" />
              <div className="mt-3 font-sans-lux text-[0.62rem] leading-relaxed text-[var(--sand)]">
                Tissé main · coton du Faso · Réf. WK-2019
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Respiration éditoriale — citation */}
        <Reveal className="mx-auto my-24 max-w-4xl text-center">
          <span className="font-display text-5xl leading-none text-[var(--gold)]/40">“</span>
          <p className="font-display text-[clamp(1.8rem,4vw,3.2rem)] italic leading-[1.15] text-[var(--cream)]">
            La nuit n'efface pas nos racines — elle les fait briller comme l'or
            sous la braise.
          </p>
          <div className="mt-6 font-sans-lux text-xs uppercase tracking-[0.4em] text-[var(--gold-bright)]">
            — Le fondateur
          </div>
        </Reveal>

        {/* 3 cartes différenciées — hauteurs variables, numéros romains */}
        <div className="grid gap-6 sm:grid-cols-3">
          {PILLARS.map(({ num, Icon, title, body, h }, i) => (
            <motion.article
              key={num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.12 }}
              whileHover={{ y: -8 }}
              className={`relative overflow-hidden rounded-md surface-textured border border-[var(--border)] p-7 transition-colors hover:border-[var(--gold)]/45 ${h}`}
            >
              <span className="pointer-events-none absolute right-4 top-2 font-display text-6xl leading-none text-[var(--gold)]/10">
                {num}
              </span>
              <Icon className="mb-4 text-[var(--gold-bright)]" size={28} />
              <h3 className="font-serif-lux text-xl text-[var(--cream)]">{title}</h3>
              <p className="mt-3 font-sans-lux text-sm leading-relaxed text-[var(--sand)]">{body}</p>
              <div className="mt-5 h-px w-10 bg-[var(--terracotta)]" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
