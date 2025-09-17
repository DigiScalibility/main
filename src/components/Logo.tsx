import React from 'react';

export function Logo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 40"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="AusDigital Edge Logo"
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <text
        fontFamily="var(--font-space-grotesk), sans-serif"
        fontSize="24"
        fontWeight="bold"
        fill="url(#logoGradient)"
        x="0"
        y="28"
      >
        AusDigital Edge
      </text>
    </svg>
  );
}
