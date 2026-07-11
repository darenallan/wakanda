// Custom minimalistic icons inspired by West African Adinkra symbols.
// Stroke-based so they inherit currentColor and feel cohesive with the luxury theme.

type IconProps = {
  className?: string;
  size?: number;
};

// Akofena — "sword of war" / strength & courage
export function Akofena({ className, size = 22 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none">
      <path d="M12 2v20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M7 6l5-3 5 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 15c2-1.5 4-1.5 6 0 2 1.5 4 1.5 6 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M6 18c2-1.5 4-1.5 6 0 2 1.5 4 1.5 6 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

// Nkyinkyim — "twisting" / perseverance & adaptability
export function Nkyinkyim({ className, size = 22 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none">
      <path
        d="M3 18c0-2.5 2-2.5 2-5s-2-2.5-2-5M8 18c0-2.5 2-2.5 2-5s-2-2.5-2-5M13 18c0-2.5 2-2.5 2-5s-2-2.5-2-5M18 18c0-2.5 3-2.5 3-5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Gye Nyame — supremacy / spirit (used for the "soul" section)
export function GyeNyame({ className, size = 22 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none">
      <path
        d="M12 3a5 5 0 0 0-5 5c0 2 1.5 3.5 3.5 4.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M12 21a5 5 0 0 0 5-5c0-2-1.5-3.5-3.5-4.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
    </svg>
  );
}

// Sankofa — "return and fetch it" / heritage (used for menu / roots)
export function Sankofa({ className, size = 22 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none">
      <path
        d="M12 20c-4 0-7-3-7-7s3-7 7-7c3 0 5 2 5 4s-2 3-3.5 3"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path d="M8 4l1.5 3L6 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Dwennimmen — "ram's horns" / humility & strength (reservations)
export function Dwennimmen({ className, size = 22 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} fill="none">
      <path
        d="M12 5v14M6 8a4 4 0 0 0 6 0 4 4 0 0 0 6 0M6 14a3 3 0 0 0 4 0M14 14a3 3 0 0 0 4 0"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Wakanda Ouaga logo — stylized panther head fused with Burkinabé geometric patterns.
export function PantherLogo({ className, size = 40 }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className} fill="none">
      <defs>
        <linearGradient id="panther-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--gold-bright)" />
          <stop offset="1" stopColor="var(--brass)" />
        </linearGradient>
      </defs>
      {/* geometric outer diamond frame */}
      <path
        d="M24 2l22 22-22 22L2 24z"
        stroke="url(#panther-grad)"
        strokeWidth="1"
        opacity="0.5"
      />
      {/* panther silhouette */}
      <path
        d="M14 18c0-4 3-7 6-7l2 3 2-3c3 0 6 3 6 7 0 2-1 3.5-1 3.5l3 3-4 1-4 8h-4l-4-8-4-1 3-3s-1-1.5-1-3.5z"
        fill="url(#panther-grad)"
      />
      {/* eyes */}
      <circle cx="20.5" cy="19" r="1" fill="var(--charcoal)" />
      <circle cx="27.5" cy="19" r="1" fill="var(--charcoal)" />
      {/* geometric chevrons (Burkinabé pattern) */}
      <path d="M20 30l4 4 4-4" stroke="var(--charcoal)" strokeWidth="0.8" fill="none" opacity="0.5" />
    </svg>
  );
}
