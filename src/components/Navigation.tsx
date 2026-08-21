import React, { useState, useEffect } from 'react';
import { RoutePage } from '../types';
import { xj220Images } from '../data/xj220Data';
import { f40MiuraImages } from '../data/f40MiuraData';
import { countachImages } from '../data/countachData';

interface NavigationProps {
  currentPage: RoutePage;
  onNavigate: (page: RoutePage) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu on ESC key or navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const handleNavClick = (page: RoutePage) => {
    onNavigate(page);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getAccentColor = () => {
    switch (currentPage) {
      case 'documentales':
      case 'xj220':
        return '#4ea0ff';
      case 'f40-miura':
        return '#d92f31';
      case 'countach':
        return '#ffd451';
      case 'datos':
        return '#ffd451';
      case 'home':
      default:
        return '#d92f31';
    }
  };

  const getPageTag = () => {
    switch (currentPage) {
      case 'documentales':
        return 'DOCS';
      case 'xj220':
        return 'XJ220';
      case 'f40-miura':
        return 'F40/MIURA';
      case 'countach':
        return 'COUNTACH';
      case 'datos':
        return 'DATOS';
      case 'home':
      default:
        return 'INICIO';
    }
  };

  const navItems = [
    {
      id: 'home' as RoutePage,
      num: '00',
      title: 'INICIO',
      subtitle: 'Portada & Archivo Principal',
      category: 'GENERAL',
      accent: '#d92f31',
    },
    {
      id: 'documentales' as RoutePage,
      num: '01',
      title: 'DOCUMENTALES',
      subtitle: 'Historias & Monografías en Profundidad',
      category: 'HISTORIAS',
      accent: '#4ea0ff',
    },
    {
      id: 'datos' as RoutePage,
      num: '02',
      title: 'DATOS CURIOSOS',
      subtitle: 'Secretos, Récords & Anécdotas',
      category: 'CURIOSIDADES',
      accent: '#ffd451',
    },
  ];

  return (
    <>
      {/* Sleek Floating Mobile Menu Pill Button */}
      <div className="fixed top-4 right-4 z-[1000] md:hidden">
        <button
          id="mobile-menu-toggle-btn"
          type="button"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
          aria-controls="mobile-nav-drawer"
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2.5 px-3.5 py-2.5 bg-[#080b10]/90 backdrop-blur-xl border transition-all duration-300 shadow-2xl active:scale-95 ${
            isOpen
              ? 'border-white/50 text-white bg-[#10141c]'
              : 'border-white/20 text-[#eaeaea] hover:border-white/40'
          }`}
          style={{
            borderColor: isOpen ? getAccentColor() : undefined,
          }}
        >
          {/* Active section dot indicator */}
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: getAccentColor() }}
          />

          {/* Minimalist 2-line animated Hamburger / Close Icon */}
          <div className="relative w-4 h-3.5 flex flex-col justify-between py-[1px]">
            <span
              className={`w-full h-[1.5px] bg-current transition-all duration-300 origin-center ${
                isOpen ? 'rotate-45 translate-y-[4.5px]' : ''
              }`}
            />
            <span
              className={`w-full h-[1.5px] bg-current transition-all duration-300 origin-center ${
                isOpen ? '-rotate-45 -translate-y-[4.5px]' : ''
              }`}
            />
          </div>

          <span className="text-[10px] font-bold tracking-[0.18em] uppercase font-mono pl-0.5">
            {isOpen ? 'CERRAR' : getPageTag()}
          </span>
        </button>
      </div>

      {/* Fullscreen Mobile Drawer Overlay */}
      <div
        id="mobile-nav-drawer"
        aria-label="Navegación móvil"
        className={`fixed inset-0 z-[999] md:hidden flex flex-col justify-between bg-[#06080c] transition-all duration-300 overflow-y-auto ${
          isOpen
            ? 'opacity-100 visible translate-y-0'
            : 'opacity-0 invisible -translate-y-6 pointer-events-none'
        }`}
      >
        {/* Background Blueprint Grid and Ambient Atmosphere */}
        <div className="absolute inset-0 grid-blueprint opacity-10 pointer-events-none" />
        <div
          className="absolute -top-32 -right-32 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-500"
          style={{ backgroundColor: getAccentColor() }}
        />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full blur-3xl opacity-10 bg-[#4ea0ff] pointer-events-none" />

        {/* Top Drawer Header Bar */}
        <div className="relative z-10 px-6 pt-6 pb-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-black tracking-[0.24em] text-white uppercase font-mono">
              AUTOARCHIVE
            </span>
            <span className="text-[9px] px-2 py-0.5 border border-white/15 bg-white/5 text-[#8b9bb0] font-mono tracking-widest uppercase">
              ÍNDICE
            </span>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="text-[10px] tracking-[0.2em] font-mono uppercase text-[#8b9bb0] hover:text-white px-2 py-1 border border-transparent hover:border-white/20 transition-all"
          >
            [ ESC ✕ ]
          </button>
        </div>

        {/* Main Navigation Links Container */}
        <div className="relative z-10 px-6 py-6 flex-1 flex flex-col justify-center max-w-md w-full mx-auto">
          <div className="mb-4">
            <span className="text-[9px] font-bold tracking-[0.26em] text-[#6d7e94] uppercase font-mono block">
              // RUTAS PRINCIPALES
            </span>
          </div>

          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive =
                currentPage === item.id ||
                (item.id === 'documentales' && (currentPage === 'xj220' || currentPage === 'f40-miura'));

              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}-btn`}
                  onClick={() => handleNavClick(item.id)}
                  className={`group relative w-full p-4 text-left border transition-all duration-200 overflow-hidden ${
                    isActive
                      ? 'bg-white/[0.06] border-white/30 text-white'
                      : 'bg-white/[0.015] border-white/10 text-[#a2b2c4] hover:bg-white/[0.04] hover:border-white/20 hover:text-white'
                  }`}
                  style={{
                    borderColor: isActive ? item.accent : undefined,
                  }}
                >
                  {/* Active Indicator Bar on Left */}
                  {isActive && (
                    <div
                      className="absolute top-0 left-0 bottom-0 w-1"
                      style={{ backgroundColor: item.accent }}
                    />
                  )}

                  <div className="flex items-baseline justify-between mb-1">
                    <div className="flex items-baseline gap-3">
                      <span
                        className="text-xs font-mono font-bold tracking-widest"
                        style={{ color: isActive ? item.accent : '#5c6d82' }}
                      >
                        {item.num}
                      </span>
                      <span className="text-xl sm:text-2xl font-black tracking-[-0.03em] uppercase">
                        {item.title}
                      </span>
                    </div>

                    <span className="text-[9px] font-mono tracking-widest text-[#5c6d82] uppercase">
                      {item.category}
                    </span>
                  </div>

                  <p className="text-xs text-[#7e91a7] pl-7 font-normal">
                    {item.subtitle}
                  </p>
                </button>
              );
            })}
          </nav>

          {/* Featured Spotlight Section: Documentaries */}
          <div className="mt-5 pt-4 border-t border-white/10 space-y-2">
            <span className="text-[9px] font-bold tracking-[0.24em] text-[#ff7173] uppercase font-mono block">
              ★ DOCUMENTALES PUBLICADOS
            </span>

            {/* Countach 003 */}
            <button
              id="mobile-nav-featured-countach-btn"
              onClick={() => handleNavClick('countach')}
              className={`group w-full p-3 flex items-center gap-3 border transition-all text-left ${
                currentPage === 'countach'
                  ? 'bg-[#ffd451]/15 border-[#ffd451] text-white'
                  : 'bg-[#14140e] border-[#ffd451]/30 text-[#f5ebd0] hover:border-[#ffd451] hover:bg-[#ffd451]/10'
              }`}
            >
              <div className="w-14 h-11 flex-shrink-0 relative overflow-hidden border border-[#ffd451]/40 bg-black">
                <img
                  src={countachImages.hero}
                  alt="Lamborghini Countach"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black tracking-tight text-white uppercase truncate">
                    LAMBORGHINI COUNTACH
                  </span>
                  <span className="text-[8px] px-1.5 py-0.2 bg-[#ffd451]/20 text-[#ffd451] font-mono font-bold">
                    003
                  </span>
                </div>
                <p className="text-[10px] text-[#b8b39c] truncate mt-0.5 font-mono">
                  Wedge Design · V12 5.2L
                </p>
              </div>

              <span className="text-xs text-[#ffd451] font-bold group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>

            {/* F40 & Miura SV */}
            <button
              id="mobile-nav-featured-f40-btn"
              onClick={() => handleNavClick('f40-miura')}
              className={`group w-full p-3 flex items-center gap-3 border transition-all text-left ${
                currentPage === 'f40-miura'
                  ? 'bg-[#d92f31]/15 border-[#d92f31] text-white'
                  : 'bg-[#160d0f] border-[#d92f31]/30 text-[#f5cbd0] hover:border-[#d92f31] hover:bg-[#d92f31]/10'
              }`}
            >
              <div className="w-14 h-11 flex-shrink-0 relative overflow-hidden border border-[#d92f31]/40 bg-black">
                <img
                  src={f40MiuraImages.f40Hero}
                  alt="Ferrari F40 y Miura SV"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black tracking-tight text-white uppercase truncate">
                    FERRARI F40 & MIURA
                  </span>
                  <span className="text-[8px] px-1.5 py-0.2 bg-[#d92f31]/20 text-[#ff8e90] font-mono font-bold">
                    002
                  </span>
                </div>
                <p className="text-[10px] text-[#b89ca0] truncate mt-0.5 font-mono">
                  Génesis & Apocalipsis · 324 km/h
                </p>
              </div>

              <span className="text-xs text-[#d92f31] font-bold group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>

            {/* Jaguar XJ220 */}
            <button
              id="mobile-nav-featured-xj220-btn"
              onClick={() => handleNavClick('xj220')}
              className={`group w-full p-3 flex items-center gap-3 border transition-all text-left ${
                currentPage === 'xj220'
                  ? 'bg-[#4ea0ff]/15 border-[#4ea0ff] text-white'
                  : 'bg-[#0a1524] border-[#4ea0ff]/30 text-[#b5d3f4] hover:border-[#4ea0ff] hover:bg-[#4ea0ff]/10'
              }`}
            >
              <div className="w-14 h-11 flex-shrink-0 relative overflow-hidden border border-[#4ea0ff]/40 bg-black">
                <img
                  src={xj220Images.hero}
                  alt="Jaguar XJ220"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black tracking-tight text-white uppercase truncate">
                    JAGUAR XJ220
                  </span>
                  <span className="text-[8px] px-1.5 py-0.2 bg-[#4ea0ff]/20 text-[#7cbcff] font-mono font-bold">
                    001
                  </span>
                </div>
                <p className="text-[10px] text-[#7d9ebc] truncate mt-0.5 font-mono">
                  El Dios Caído · 349.4 km/h
                </p>
              </div>

              <span className="text-xs text-[#4ea0ff] font-bold group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>
          </div>
        </div>

        {/* Bottom Drawer Footer */}
        <div className="relative z-10 px-6 py-4 border-t border-white/10 bg-[#040608] flex items-center justify-between text-[10px] font-mono text-[#5c6d82]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            <span>ARCHIVO ACTIVO · 3 MONOGRAFÍAS</span>
          </div>

          <span>AUTOARCHIVE © 2026</span>
        </div>
      </div>
    </>
  );
};

