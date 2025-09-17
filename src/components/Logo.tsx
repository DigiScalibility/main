import React from 'react';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="mr-2"
      >
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))' }} />
            <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))' }} />
          </linearGradient>
        </defs>
        <path d="M4 8L16 4L28 8V24L16 28L4 24V8Z" stroke="url(#logoGradient)" strokeWidth="2" strokeLinejoin="round" />
        <path d="M4 8L16 14L28 8" stroke="url(#logoGradient)" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M16 28V14" stroke="url(#logoGradient)" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 11L16 14L23 11" stroke="url(#logoGradient)" strokeOpacity="0.7" strokeWidth="1" />
      </svg>
      <span
        className="font-headline text-xl font-bold"
        style={{
          background: 'linear-gradient(45deg, hsl(var(--primary)), hsl(var(--accent)))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        DigiScalibity
      </span>
    </div>
  );
}
