import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { Akofena, Nkyinkyim, Sankofa, Dwennimmen } from './adinkra-icons';
import { Logo } from './logo';

const LINKS = [
  { label: 'La Carte', href: '#carte', Icon: Sankofa },
  { label: 'La Galerie', href: '#galerie', Icon: Nkyinkyim },
  { label: 'Réserver', href: '#reserver', Icon: Dwennimmen },
  { label: "L'Âme du Lieu", href: '#ame', Icon: Akofena },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? 'bg-[rgba(8,7,6,0.85)] backdrop-blur-xl border-b border-[var(--border)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <a href="#top" className="flex items-center gap-3 group">
          <div className="rounded-full shadow-[inset_0_2px_6px_rgba(0,0,0,0.7),0_0_0_1px_rgba(201,162,75,0.35)] transition-transform duration-500 group-hover:scale-110">
            <Logo size={48} />
          </div>
          <div className="leading-tight">
            <div className="font-mark text-[1.05rem] tracking-[0.22em] text-[var(--gold-bright)]">
              WAKANDA
            </div>
            <div className="font-mark text-[0.6rem] tracking-[0.4em] text-[var(--gold)]">
              RESTAURANT · BAR · LOUNGE
            </div>
          </div>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {LINKS.map(({ label, href, Icon }) => (
            <a
              key={href}
              href={href}
              className="group relative flex items-center gap-2 font-sans-lux text-sm tracking-wide text-[var(--sand)] transition-colors hover:text-[var(--gold-bright)]"
            >
              <Icon size={18} className="text-[var(--gold)]" />
              {label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[var(--gold)] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        <a
          href="#reserver"
          className="cta-sweep hidden rounded-full border border-[var(--gold)]/45 px-6 py-2.5 font-sans-lux text-sm tracking-wide text-[var(--gold-bright)] transition-colors duration-500 hover:text-[var(--primary-foreground)] lg:block"
        >
          Réserver
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          className="text-[var(--gold-bright)] lg:hidden"
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-[var(--border)] bg-[rgba(8,7,6,0.97)] px-6 py-4 lg:hidden">
          {LINKS.map(({ label, href, Icon }) => (
            <a
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 py-3 text-[var(--muted-foreground)] hover:text-[var(--gold-bright)]"
            >
              <Icon size={18} className="text-[var(--gold)]" />
              {label}
            </a>
          ))}
        </div>
      )}
    </motion.header>
  );
}
