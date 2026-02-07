export function Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* The Bulb (Idea) - Solid Primary Circle */}
      <circle cx="50" cy="40" r="32" fill="var(--primary)" />

      {/* The Insight - Negative space Lightning Bolt */}
      <path
        d="M52 18 L38 40 H50 L46 62 L62 36 H52 L52 18Z"
        fill="var(--background)"
        stroke="var(--background)"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* The Base (Database/Foundation) - Single Minimal Line */}
      <rect x="40" y="80" width="20" height="6" rx="3" fill="var(--muted-foreground)" />

      {/* Accent Sparkle - Top Right (Coral) */}
      <path
        d="M85 15 L88 8 L91 15 L98 18 L91 21 L88 28 L85 21 L78 18 L85 15Z"
        fill="var(--destructive)"
      />
    </svg>
  );
}
