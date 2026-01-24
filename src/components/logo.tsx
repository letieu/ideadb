export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Database layers */}
      <ellipse cx="50" cy="25" rx="35" ry="10" fill="currentColor" opacity="0.2" />
      <ellipse cx="50" cy="35" rx="35" ry="10" fill="currentColor" opacity="0.3" />
      <ellipse cx="50" cy="45" rx="35" ry="10" fill="currentColor" opacity="0.4" />
      
      {/* Lightbulb - idea symbol */}
      <circle cx="50" cy="60" r="15" fill="currentColor" opacity="0.15" />
      <path
        d="M50 45 C42 45, 37 50, 37 58 C37 63, 40 67, 43 70 L43 78 C43 80, 45 82, 47 82 L53 82 C55 82, 57 80, 57 78 L57 70 C60 67, 63 63, 63 58 C63 50, 58 45, 50 45 Z"
        fill="currentColor"
        opacity="0.9"
      />
      
      {/* Bulb filament */}
      <path
        d="M50 52 L50 62"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M46 56 L54 56"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.4"
      />
      
      {/* Base of bulb */}
      <rect x="47" y="78" width="6" height="4" fill="currentColor" opacity="0.8" />
      <rect x="46" y="82" width="8" height="2" fill="currentColor" opacity="0.6" />
      
      {/* Sparkle effect */}
      <circle cx="65" cy="50" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="35" cy="55" r="1.5" fill="currentColor" opacity="0.5" />
      <circle cx="60" cy="70" r="1.5" fill="currentColor" opacity="0.5" />
    </svg>
  );
}
