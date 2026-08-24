import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = true }) => {
  const sizeClasses = {
    sm: 'h-4',
    md: 'h-6',
    lg: 'h-8',
    hero: 'h-16 md:h-24 lg:h-32'
  };

  const textClasses = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-3xl',
    hero: 'text-[clamp(32px,8vw,96px)]'
  };

  return (
    <div className={`flex items-center gap-2.5 sm:gap-4 select-none ${className}`}>
      {/* Detailed SVG Emblem */}
      <div className={`relative flex items-center justify-center shrink-0 ${sizeClasses[size]}`}>
        <svg
          viewBox="0 0 64 64"
          className="w-auto h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background Glow */}
          <circle cx="32" cy="32" r="28" fill="url(#glow-gradient)" opacity="0.15" />
          
          {/* Hexagon Outer Frame */}
          <path
            d="M32 4L56.2487 18V46L32 60L7.75129 46V18L32 4Z"
            stroke="url(#frame-gradient)"
            strokeWidth="2"
            opacity="0.3"
          />
          <path
            d="M32 4L56.2487 18V46L32 60L7.75129 46V18L32 4Z"
            stroke="url(#frame-glow)"
            strokeWidth="1"
            opacity="0.8"
          />

          {/* Abstract Racing Line / 'A' Symbol */}
          <path
            d="M32 14L46 48H35L32 38L29 48H18L32 14Z"
            fill="url(#accent-gradient)"
          />
          <path
            d="M22 42L32 18L42 42"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
          <path
            d="M26 36H38"
            stroke="url(#accent-gradient)"
            strokeWidth="3"
            strokeLinecap="square"
          />

          {/* Small Digital Nodes / Details */}
          <circle cx="32" cy="14" r="2" fill="white" />
          <circle cx="18" cy="48" r="2" fill="#d92f31" />
          <circle cx="46" cy="48" r="2" fill="#d92f31" />
          
          {/* Inner details (speedometer lines) */}
          <path d="M12 32H16" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
          <path d="M52 32H48" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
          <path d="M17.8579 17.8579L20.6863 20.6863" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
          <path d="M46.1421 17.8579L43.3137 20.6863" stroke="white" strokeWidth="1" strokeOpacity="0.5" />

          {/* Gradients */}
          <defs>
            <radialGradient id="glow-gradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32 32) rotate(90) scale(28)">
              <stop stopColor="#d92f31" />
              <stop offset="1" stopColor="#d92f31" stopOpacity="0" />
            </radialGradient>
            
            <linearGradient id="frame-gradient" x1="32" y1="4" x2="32" y2="60" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffd451" />
              <stop offset="1" stopColor="#d92f31" stopOpacity="0.2" />
            </linearGradient>

            <linearGradient id="frame-glow" x1="0" y1="32" x2="64" y2="32" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffffff" stopOpacity="0" />
              <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            <linearGradient id="accent-gradient" x1="32" y1="14" x2="32" y2="48" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ff5254" />
              <stop offset="1" stopColor="#d92f31" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Modern Typography */}
      {showText && (
        <div className={`flex flex-col justify-center`}>
          <span className={`font-black tracking-[-0.02em] uppercase leading-[0.9] drop-shadow-md ${textClasses[size]}`}>
            <span className="text-white">AUTO</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#d92f31] via-[#ff5254] to-[#ffd451]">
              ARCHIVE
            </span>
          </span>
          {(size === 'lg' || size === 'hero') && (
            <span className="text-[0.25em] md:text-[0.3em] text-[#a0a8b5] font-mono font-bold tracking-[0.4em] uppercase mt-1.5 md:mt-2">
              Digital Vault // Est. 2026
            </span>
          )}
        </div>
      )}
    </div>
  );
};
