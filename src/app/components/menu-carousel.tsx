import { useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Sankofa } from './adinkra-icons';
import { MENU } from './images';
import { Reveal } from './motion-primitives';
import { CornerRibbon, SectionLabel } from './lux';

const EASE = [0.22, 1, 0.36, 1] as const;

export function MenuCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    trackRef.current?.scrollBy({ left: dir * 360, behavior: 'smooth' });
  };

  return (
    <section id="carte" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_0%_50%,rgba(201,162,75,0.07),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel icon={<Sankofa size={18} className="text-[var(--gold)]" />}>La Carte</SectionLabel>
            <h2 className="mt-5 font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.95] text-[var(--cream)]">
              Saveurs du <span className="italic text-[var(--terracotta-soft)]">Sahel</span>
            </h2>
          </div>
          <div className="flex gap-3">
            <CarouselButton onClick={() => scroll(-1)} label="Précédent">
              <ChevronLeft />
            </CarouselButton>
            <CarouselButton onClick={() => scroll(1)} label="Suivant">
              <ChevronRight />
            </CarouselButton>
          </div>
        </Reveal>

        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
        >
          {MENU.map((item, i) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: EASE, delay: (i % 4) * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative w-[300px] flex-none snap-start overflow-hidden rounded-md surface-textured border border-[var(--border)] transition-all hover:border-[var(--gold)]/45 hover:shadow-[0_28px_60px_-28px_rgba(0,0,0,0.9)]"
            >
              <CornerRibbon label={item.category} />
              <div className="relative h-[360px] overflow-hidden bg-[var(--secondary)]">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* overlay noir chaud + liseré or */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--obsidian)] via-[var(--obsidian)]/25 to-transparent" />
                <div className="absolute inset-0 frame-gold" />
              </div>
              <div className="p-5">
                <h3 className="font-serif-lux text-xl leading-tight text-[var(--cream)]">{item.name}</h3>
                <p className="mt-2 font-sans-lux text-sm leading-relaxed text-[var(--sand)]">
                  {item.tagline}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-4">
                  <span className="font-sans-lux text-[0.6rem] uppercase tracking-[0.3em] text-[var(--sand)]">
                    Tarif
                  </span>
                  <span className="font-mark text-lg font-semibold tracking-tight text-[var(--gold)]">
                    {item.price}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CarouselButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.button
      onClick={onClick}
      aria-label={label}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="flex h-12 w-12 items-center justify-center rounded-full border border-[var(--gold)]/40 text-[var(--gold-bright)] transition-colors hover:bg-[var(--gold)]/15"
    >
      {children}
    </motion.button>
  );
}
