import React, { useState, useEffect } from 'react';
import { RoutePage } from '../types';
import { useAuth } from '../context/AuthContext';
import { xj220Images } from '../data/xj220Data';
import { f40MiuraImages } from '../data/f40MiuraData';
import { countachImages } from '../data/countachData';
import { r34Images } from '../data/r34Data';
import { supraImages } from '../data/supraData';
import { mazda787bImages } from '../data/mazda787bData';
import { nsxImages } from '../data/nsxData';
import { camaroMustangImages } from '../data/camaroMustangData';
import { f1Images } from '../data/f1Data';
import { User, LogOut, LogIn, ShieldCheck, LayoutDashboard, Home, BookOpen, Lightbulb, Sparkles, X, ChevronRight, Compass, Crown } from 'lucide-react';

interface NavigationProps {
  currentPage: RoutePage;
  onNavigate: (page: RoutePage) => void;
  onOpenAuthModal?: () => void;
  onOpenAccountModal?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  onNavigate,
  onOpenAuthModal,
  onOpenAccountModal
}) => {
  const [isCarDrawerOpen, setIsCarDrawerOpen] = useState(false);
  const { user, userProfile, isAdmin, logout, subscribersCount } = useAuth();

  // Close menu on ESC key or navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsCarDrawerOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when mobile car selector is open
  useEffect(() => {
    if (isCarDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isCarDrawerOpen]);

  const handleNavClick = (page: RoutePage) => {
    onNavigate(page);
    setIsCarDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const carDocumentaries = [
    {
      id: 'f1' as RoutePage,
      num: '009',
      title: 'HISTORIA DE LA FÓRMULA 1',
      subtitle: '75 Años de Leyenda · Turbo & V10',
      accent: '#e62628',
      image: f1Images.hero,
      tag: 'NUEVO ESTRENO',
    },
    {
      id: 'camaro-mustang' as RoutePage,
      num: '008',
      title: 'CAMARO VS MUSTANG',
      subtitle: 'La Guerra de los Pony Cars · 60 Años',
      accent: '#ff5500',
      image: camaroMustangImages.hero,
      tag: 'EXPEDIENTE #008',
    },
    {
      id: 'nsx' as RoutePage,
      num: '007',
      title: 'HONDA NSX (NA1)',
      subtitle: 'VTEC C30A & Ayrton Senna',
      accent: '#e62628',
      image: nsxImages.hero,
      tag: 'VTEC SOUND',
    },
    {
      id: 'mazda-787b' as RoutePage,
      num: '006',
      title: 'MAZDA 787B',
      subtitle: 'R26B Wankel · Le Mans 1991',
      accent: '#22c55e',
      image: mazda787bImages.hero,
      tag: 'LE MANS WINNER',
    },
    {
      id: 'r34' as RoutePage,
      num: '004',
      title: 'SKYLINE GT-R R34',
      subtitle: 'RB26DETT & ATTESA E-TS Pro',
      accent: '#4ea0ff',
      image: r34Images.hero,
      tag: 'JDM ICON',
    },
    {
      id: 'supra' as RoutePage,
      num: '005',
      title: 'TOYOTA SUPRA MK4',
      subtitle: '2JZ-GTE Biturbo Secuencial',
      accent: '#e62628',
      image: supraImages.hero,
      tag: '2JZ LEGEND',
    },
    {
      id: 'countach' as RoutePage,
      num: '003',
      title: 'LAMBORGHINI COUNTACH',
      subtitle: 'Gandini & V12 Cuña Espacial',
      accent: '#ffd451',
      image: countachImages.hero,
      tag: 'POSTER CAR',
    },
    {
      id: 'f40-miura' as RoutePage,
      num: '002',
      title: 'FERRARI F40 & MIURA',
      subtitle: 'V8 Biturbo vs V12 Transversal',
      accent: '#d92f31',
      image: f40MiuraImages.f40Hero,
      tag: 'DUELO ITALIANO',
    },
    {
      id: 'xj220' as RoutePage,
      num: '001',
      title: 'JAGUAR XJ220',
      subtitle: 'Récord Mundial Nardò 349.4 km/h',
      accent: '#4ea0ff',
      image: xj220Images.hero,
      tag: 'RECORD HOLDER',
    },
  ];

  const isCurrentDoc =
    currentPage === 'documentales' ||
    currentPage === 'f1' ||
    currentPage === 'camaro-mustang' ||
    currentPage === 'nsx' ||
    currentPage === 'mazda-787b' ||
    currentPage === 'r34' ||
    currentPage === 'supra' ||
    currentPage === 'countach' ||
    currentPage === 'f40-miura' ||
    currentPage === 'xj220';

  return (
    <>
      {/* Mobile Car Quick Drawer Modal */}
      {isCarDrawerOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Selector rápido de documentales"
          className="fixed inset-0 z-[995] bg-black/80 backdrop-blur-md flex flex-col justify-end md:hidden animate-in fade-in duration-200"
          onClick={() => setIsCarDrawerOpen(false)}
        >
          <div
            className="w-full max-h-[85vh] bg-[#0a111a] border-t border-white/20 rounded-t-3xl p-4 sm:p-6 overflow-y-auto flex flex-col shadow-2xl animate-in slide-in-from-bottom-6 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Drag Bar */}
            <div className="w-12 h-1.5 bg-white/30 rounded-full mx-auto mb-4 shrink-0" />

            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
              <div>
                <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#4ea0ff] uppercase">
                  AUTOARCHIVE // ACCESO RÁPIDO
                </span>
                <h3 className="text-base font-bold text-white tracking-tight">
                  Selecciona un Documental
                </h3>
              </div>
              <button
                onClick={() => setIsCarDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 active:scale-95 transition-all"
                aria-label="Cerrar menú"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Link to Full Catalog */}
            <div className="mt-3 space-y-2">
              <button
                onClick={() => handleNavClick('documentales')}
                className="w-full py-2.5 px-3 bg-[#4ea0ff]/15 hover:bg-[#4ea0ff]/25 border border-[#4ea0ff]/40 rounded-xl text-left flex items-center justify-between text-xs font-mono font-bold text-[#72b9ff] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#4ea0ff]" />
                  <span>CATÁLOGO COMPLETO DE DOCUMENTALES</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Cars List */}
            <div className="mt-3 space-y-2.5 pb-6">
              {carDocumentaries.map((car) => {
                const isActive = currentPage === car.id;
                return (
                  <button
                    key={car.id}
                    onClick={() => handleNavClick(car.id)}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center gap-3 transition-all active:scale-[0.98] ${
                      isActive
                        ? 'bg-[#142336] border-[#4ea0ff] shadow-md ring-1 ring-[#4ea0ff]'
                        : 'bg-[#0d1622] hover:bg-[#121f30] border-white/10'
                    }`}
                  >
                    <img
                      src={car.image}
                      alt={car.title}
                      referrerPolicy="no-referrer"
                      className="w-16 h-12 object-cover rounded-lg shrink-0 border border-white/10"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded"
                          style={{
                            backgroundColor: `${car.accent}20`,
                            color: car.accent,
                          }}
                        >
                          {car.num}
                        </span>
                        <span className="text-[9px] font-mono text-[#8a9db5] truncate">
                          {car.tag}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white truncate mt-0.5">
                        {car.title}
                      </h4>
                      <p className="text-[10px] text-[#8a9db5] font-mono truncate">
                        {car.subtitle}
                      </p>
                    </div>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#4ea0ff] shrink-0 animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Persistent Mobile Bottom Navigation Bar (Optimización para Teléfonos) */}
      <nav
        aria-label="Barra de navegación móvil inferior"
        className="fixed bottom-0 left-0 right-0 z-[990] md:hidden bg-[#070d18]/95 backdrop-blur-2xl border-t border-white/20 px-2 py-1.5 flex items-center justify-around shadow-[0_-10px_30px_rgba(0,0,0,0.9)] pb-[calc(0.5rem+env(safe-area-inset-bottom))]"
      >
        {/* Inicio */}
        <button
          onClick={() => handleNavClick('home')}
          className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all min-h-[46px] min-w-[58px] active:scale-95 ${
            currentPage === 'home'
              ? 'text-[#ff5254] font-bold bg-[#ff5254]/10 border border-[#ff5254]/30'
              : 'text-[#8293a6] hover:text-white'
          }`}
          aria-label="Página de Inicio"
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-mono tracking-tight uppercase">Inicio</span>
          {currentPage === 'home' && (
            <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-[#ff5254] shadow-[0_0_8px_#ff5254]" />
          )}
        </button>

        {/* Documentales - Tocar abre catálogo o selector rápido */}
        <button
          onClick={() => {
            if (isCurrentDoc) {
              setIsCarDrawerOpen(true);
            } else {
              handleNavClick('documentales');
            }
          }}
          className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all min-h-[46px] min-w-[58px] active:scale-95 ${
            isCurrentDoc
              ? 'text-[#4ea0ff] font-bold bg-[#4ea0ff]/10 border border-[#4ea0ff]/30'
              : 'text-[#8293a6] hover:text-white'
          }`}
          aria-label="Catálogo de Documentales"
        >
          <BookOpen className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-mono tracking-tight uppercase">Docs</span>
          {isCurrentDoc && (
            <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-[#4ea0ff] shadow-[0_0_8px_#4ea0ff]" />
          )}
        </button>

        {/* FORO */}
        <button
          onClick={() => handleNavClick('foro')}
          className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all min-h-[46px] min-w-[52px] active:scale-95 ${
            currentPage === 'foro'
              ? 'text-[#22c55e] font-bold bg-[#22c55e]/10 border border-[#22c55e]/30'
              : 'text-[#22c55e] hover:text-[#4ade80] bg-[#22c55e]/10 border border-[#22c55e]/20'
          }`}
          aria-label="Ir al Foro"
        >
          <Compass className="w-5 h-5 mb-0.5 text-[#22c55e] animate-pulse" />
          <span className="text-[10px] font-mono tracking-tight uppercase font-bold text-[#22c55e]">FORO</span>
          {currentPage === 'foro' && (
            <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-[#22c55e] shadow-[0_0_8px_#22c55e]" />
          )}
        </button>

        {/* Datos */}
        <button
          onClick={() => handleNavClick('datos')}
          className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all min-h-[46px] min-w-[58px] active:scale-95 ${
            currentPage === 'datos'
              ? 'text-[#ffd451] font-bold bg-[#ffd451]/10 border border-[#ffd451]/30'
              : 'text-[#8293a6] hover:text-white'
          }`}
          aria-label="Datos Curiosos y Secretos"
        >
          <Lightbulb className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-mono tracking-tight uppercase">Datos</span>
          {currentPage === 'datos' && (
            <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-[#ffd451] shadow-[0_0_8px_#ffd451]" />
          )}
        </button>

        {/* Cuenta / Admin */}
        <button
          onClick={() => {
            if (user) {
              if (onOpenAccountModal) {
                onOpenAccountModal();
              } else if (isAdmin) {
                handleNavClick('admin-panel');
              }
            } else if (onOpenAuthModal) {
              onOpenAuthModal();
            } else {
              handleNavClick('home');
            }
          }}
          className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all min-h-[46px] min-w-[58px] active:scale-95 ${
            currentPage === 'admin-panel'
              ? 'text-[#e62628] font-bold bg-[#e62628]/10 border border-[#e62628]/30'
              : 'text-[#8293a6] hover:text-white'
          }`}
          aria-label={user ? 'Mi Cuenta y Perfil' : 'Iniciar Sesión'}
        >
          {isAdmin ? (
            <ShieldCheck className="w-5 h-5 mb-0.5 text-[#e62628]" />
          ) : user ? (
            <User className="w-5 h-5 mb-0.5 text-emerald-400" />
          ) : (
            <User className="w-5 h-5 mb-0.5" />
          )}
          <span className="text-[10px] font-mono tracking-tight uppercase">
            {isAdmin ? 'Admin' : user ? 'Cuenta' : 'Entrar'}
          </span>
          {currentPage === 'admin-panel' && (
            <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-[#e62628] shadow-[0_0_8px_#e62628]" />
          )}
        </button>
      </nav>
    </>
  );
};


