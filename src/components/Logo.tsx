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
    sm: 'text-xs tracking-[0.2em]',
    md: 'text-base tracking-[0.24em]',
    lg: 'text-2xl tracking-[0.28em]',
    hero: 'text-[clamp(28px,6vw,76px)] tracking-[0.3em]'
  };

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3.5 select-none ${className}`}>
      {/* Precision Automotive Platinum Emblem */}
      <div className={`relative flex items-center justify-center shrink-0 ${sizeClasses[size]}`}>
        <svg
          viewBox="0 0 64 64"
          className="w-auto h-full drop-shadow-[0_2px_12px_rgba(255,255,255,0.12)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Ambient Radial Glow */}
          <circle cx="32" cy="32" r="28" fill="url(#luxury-glow)" opacity="0.12" />
          
          {/* Precision Octagonal Frame */}
          <path
            d="M32 4L56.2487 18V46L32 60L7.75129 46V18L32 4Z"
            stroke="url(#platinum-stroke)"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
          <path
            d="M32 8L52.5 20.5V43.5L32 56L11.5 43.5V20.5L32 8Z"
            stroke="url(#silver-bevel)"
            strokeWidth="0.8"
            strokeOpacity="0.6"
          />

          {/* Minimalist Apex 'A' Monogram */}
          <path
            d="M32 15L45 47H36L32 37L28 47H19L32 15Z"
            fill="url(#titanium-fill)"
          />
          <path
            d="M23 42L32 20L41 42"
            stroke="#f8fafc"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="miter"
          />
          <path
            d="M26.5 35.5H37.5"
            stroke="url(#platinum-horizontal)"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Precision Digital Nodes */}
          <circle cx="32" cy="15" r="1.5" fill="#ffffff" />
          <circle cx="19" cy="47" r="1.5" fill="#94a3b8" />
          <circle cx="45" cy="47" r="1.5" fill="#94a3b8" />

          {/* Luxury Gradients */}
          <defs>
            <radialGradient id="luxury-glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32 32) rotate(90) scale(28)">
              <stop stopColor="#ffffff" />
              <stop offset="1" stopColor="#070709" stopOpacity="0" />
            </radialGradient>
            
            <linearGradient id="platinum-stroke" x1="32" y1="4" x2="32" y2="60" gradientUnits="userSpaceOnUse">
              <stop stopColor="#f8fafc" />
              <stop offset="0.5" stopColor="#94a3b8" />
              <stop offset="1" stopColor="#334155" />
            </linearGradient>

            <linearGradient id="silver-bevel" x1="11.5" y1="8" x2="52.5" y2="56" gradientUnits="userSpaceOnUse">
              <stop stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="1" stopColor="#1e293b" stopOpacity="0.2" />
            </linearGradient>

            <linearGradient id="titanium-fill" x1="32" y1="15" x2="32" y2="47" gradientUnits="userSpaceOnUse">
              <stop stopColor="#1e293b" />
              <stop offset="1" stopColor="#0f172a" />
            </linearGradient>

            <linearGradient id="platinum-horizontal" x1="26" y1="35.5" x2="38" y2="35.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="#cbd5e1" />
              <stop offset="0.5" stopColor="#ffffff" />
              <stop offset="1" stopColor="#cbd5e1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Refined Luxury Typography */}
      {showText && (
        <div className="flex flex-col justify-center">
          <div className={`font-black uppercase leading-[0.95] flex items-center ${textClasses[size]}`}>
            <span className="text-white font-extrabold tracking-[0.18em]">AUTO</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e2e8f0] via-[#cbd5e1] to-[#64748b] font-light tracking-[0.24em] ml-1">
              ARCHIVE
            </span>
          </div>
          {(size === 'lg' || size === 'hero') && (
            <span className="text-[0.22em] text-[#64748b] font-mono tracking-[0.45em] uppercase mt-1.5 font-medium">
              Grand Archive // Est. 2026
            </span>
          )}
        </div>
      )}
    </div>
  );
};
