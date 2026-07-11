import logoImg from '../../imports/image.png';

type Props = { className?: string; size?: number };

// Official Wakanda logo — gold/silver metallic compass-star on black.
export function Logo({ className, size = 46 }: Props) {
  return (
    <img
      src={logoImg}
      alt="Wakanda — Restaurant · Bar · Lounge"
      width={size}
      height={size}
      className={`rounded-full object-cover ${className ?? ''}`}
      style={{ width: size, height: size }}
    />
  );
}

// Decorative four-point compass starburst echoing the logo's art direction.
export function Starburst({ className, size = 20 }: Props) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none">
      <defs>
        <linearGradient id="star-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--gold-bright)" />
          <stop offset="1" stopColor="var(--bronze)" />
        </linearGradient>
      </defs>
      <path d="M12 1l1.6 8.9L22 12l-8.4 2.1L12 23l-1.6-8.9L2 12l8.4-2.1z" fill="url(#star-grad)" />
      <path d="M12 5l.7 5.3L18 11l-5.3.7L12 17l-.7-5.3L6 11l5.3-.7z" fill="var(--charcoal)" opacity="0.35" />
    </svg>
  );
}
