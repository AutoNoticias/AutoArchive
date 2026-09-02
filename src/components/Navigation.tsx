import React, { useState, useEffect } from 'react';
import { RoutePage } from '../types';
import { useAuth } from '../context/AuthContext';
import { shelbyCobraImages } from '../data/shelbyCobraData';
import { toyotaHiluxImages } from '../data/toyotaHiluxData';
import { xj220Images } from '../data/xj220Data';
import { f40MiuraImages } from '../data/f40MiuraData';
import { countachImages } from '../data/countachData';
import { r34Images } from '../data/r34Data';
import { supraImages } from '../data/supraData';
import { mazda787bImages } from '../data/mazda787bData';
import { nsxImages } from '../data/nsxData';
import { camaroMustangImages } from '../data/camaroMustangData';
import { f1Images } from '../data/f1Data';
import { User, ShieldCheck, Home, BookOpen, Lightbulb, Sparkles, X, ChevronRight, MessageSquare } from 'lucide-react';

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
  const { user, isAdmin } = useAuth();

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
      id: 'shelby-cobra' as RoutePage,
      num: '010',
      title: 'SHELBY COBRA 427 S/C',
      subtitle: 'Ford 427 FE Side-Oiler · FIA GT 1965',
      image: shelbyCobraImages.hero,
      tag: 'ESTRENO',
    },
    {
      id: 'toyota-hilux' as RoutePage,
      num: '011',
      title: 'TOYOTA HILUX 4X4',
      subtitle: 'Monolito Indestructible · Dakar',
      image: toyotaHiluxImages.hero,
      tag: 'ESTRENO',
    },
    {
      id: 'f1' as RoutePage,
      num: '009',
      title: 'HISTORIA DE LA FÓRMULA 1',
      subtitle: '75 Años de Leyenda · Turbo & V10',
      image: f1Images.hero,
      tag: 'EXPEDIENTE #009',
    },
    {
      id: 'camaro-mustang' as RoutePage,
      num: '008',
      title: 'CAMARO VS MUSTANG',
      subtitle: 'La Guerra de los Pony Cars · 60 Años',
      image: camaroMustangImages.hero,
      tag: 'EXPEDIENTE #008',
    },
    {
      id: 'nsx' as RoutePage,
      num: '007',
      title: 'HONDA NSX (NA1)',
      subtitle: 'VTEC C30A & Ayrton Senna',
      image: nsxImages.hero,
      tag: 'VTEC SOUND',
    },
    {
      id: 'mazda-787b' as RoutePage,
      num: '006',
      title: 'MAZDA 787B',
      subtitle: 'R26B Wankel · Le Mans 1991',
      image: mazda787bImages.hero,
      tag: 'LE MANS WINNER',
    },
    {
      id: 'r34' as RoutePage,
      num: '004',
      title: 'SKYLINE GT-R R34',
      subtitle: 'RB26DETT & ATTESA E-TS Pro',
      image: r34Images.hero,
      tag: 'JDM ICON',
    },
    {
      id: 'supra' as RoutePage,
      num: '005',
      title: 'TOYOTA SUPRA MK4',
      subtitle: '2JZ-GTE Biturbo Secuencial',
      image: supraImages.hero,
      tag: '2JZ LEGEND',
    },
    {
      id: 'countach' as RoutePage,
      num: '003',
      title: 'LAMBORGHINI COUNTACH',
      subtitle: 'Gandini & V12 Cuña Espacial',
      image: countachImages.hero,
      tag: 'POSTER CAR',
    },
    {
      id: 'f40-miura' as RoutePage,
      num: '002',
      title: 'FERRARI F40 & MIURA',
      subtitle: 'V8 Biturbo vs V12 Transversal',
      image: f40MiuraImages.f40Hero,
      tag: 'DUELO ITALIANO',
    },
    {
      id: 'xj220' as RoutePage,
      num: '001',
      title: 'JAGUAR XJ220',
      subtitle: 'Récord Mundial Nardò 349.4 km/h',
      image: xj220Images.hero,
      tag: 'RECORD HOLDER',
    },
  ];

  const isCurrentDoc =
    currentPage === 'documentales' ||
    currentPage === 'shelby-cobra' ||
    currentPage === 'toyota-hilux' ||
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
          className="fixed inset-0 z-[995] bg-black/85 backdrop-blur-xl flex flex-col justify-end md:hidden animate-in fade-in duration-200"
          onClick={() => setIsCarDrawerOpen(false)}
        >
          <div
            className="w-full max-h-[85vh] bg-[#0c0d12] border-t border-white/15 rounded-t-3xl p-5 overflow-y-auto flex flex-col shadow-2xl animate-in slide-in-from-bottom-6 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Drag Bar */}
            <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-4 shrink-0" />

            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-3.5 border-b border-white/10 shrink-0">
              <div>
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#94a3b8] uppercase font-semibold">
                  AUTOARCHIVE // EXPEDIENTES
                </span>
                <h3 className="text-base font-bold text-white tracking-tight mt-0.5">
                  Selecciona un Documental
                </h3>
              </div>
              <button
                onClick={() => setIsCarDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white flex items-center justify-center hover:bg-white/10 active:scale-95 transition-all"
                aria-label="Cerrar menú"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Link to Full Catalog */}
            <div className="mt-3.5">
              <button
                onClick={() => handleNavClick('documentales')}
                className="w-full py-3 px-3.5 bg-white/5 hover:bg-white/10 border border-white/15 rounded-xl text-left flex items-center justify-between text-xs font-mono font-bold text-white transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className="w-4 h-4 text-[#cbd5e1]" />
                  <span>VER CATÁLOGO COMPLETO (11)</span>
                </div>
                <ChevronRight className="w-4 h-4 text-white/40" />
              </button>
            </div>

            {/* Cars List */}
            <div className="mt-3.5 space-y-2 pb-6">
              {carDocumentaries.map((car) => {
                const isActive = currentPage === car.id;
                return (
                  <button
                    key={car.id}
                    onClick={() => handleNavClick(car.id)}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center gap-3 transition-all active:scale-[0.98] ${
                      isActive
                        ? 'bg-[#181822] border-white/40 shadow-lg ring-1 ring-white/20'
                        : 'bg-[#101017] hover:bg-[#15151f] border-white/10'
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
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/10 text-white/90 border border-white/15">
                          #{car.num}
                        </span>
                        <span className="text-[9px] font-mono text-[#94a3b8] truncate">
                          {car.tag}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white truncate mt-1">
                        {car.title}
                      </h4>
                      <p className="text-[10px] text-[#94a3b8] font-mono truncate">
                        {car.subtitle}
                      </p>
                    </div>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-white shrink-0 shadow-[0_0_8px_white]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Persistent Mobile Bottom Navigation Bar (Optimización Elegante para Teléfonos) */}
      <nav
        aria-label="Barra de navegación móvil inferior"
        className="fixed bottom-0 left-0 right-0 z-[990] md:hidden bg-[#07070a]/95 backdrop-blur-2xl border-t border-white/15 px-3 py-1.5 flex items-center justify-around shadow-[0_-10px_30px_rgba(0,0,0,0.95)] pb-[calc(0.5rem+env(safe-area-inset-bottom))]"
      >
        {/* Inicio */}
        <button
          onClick={() => handleNavClick('home')}
          className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all min-h-[46px] min-w-[56px] active:scale-95 ${
            currentPage === 'home'
              ? 'text-white font-bold bg-white/10 border border-white/20'
              : 'text-[#94a3b8] hover:text-white'
          }`}
          aria-label="Página de Inicio"
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-mono tracking-tight uppercase">Inicio</span>
          {currentPage === 'home' && (
            <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
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
          className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all min-h-[46px] min-w-[56px] active:scale-95 ${
            isCurrentDoc
              ? 'text-white font-bold bg-white/10 border border-white/20'
              : 'text-[#94a3b8] hover:text-white'
          }`}
          aria-label="Catálogo de Documentales"
        >
          <BookOpen className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-mono tracking-tight uppercase">Docs</span>
          {isCurrentDoc && (
            <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
          )}
        </button>

        {/* AutoChat */}
        <button
          onClick={() => handleNavClick('foro')}
          className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all min-h-[46px] min-w-[56px] active:scale-95 ${
            currentPage === 'foro'
              ? 'text-white font-bold bg-white/15 border border-white/30'
              : 'text-[#94a3b8] hover:text-white bg-white/5 border border-white/10'
          }`}
          aria-label="Ir a AutoChat"
        >
          <MessageSquare className="w-5 h-5 mb-0.5 text-white/90" />
          <span className="text-[10px] font-mono tracking-tight uppercase font-bold text-white">AutoChat</span>
          {currentPage === 'foro' && (
            <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
          )}
        </button>

        {/* Datos */}
        <button
          onClick={() => handleNavClick('datos')}
          className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all min-h-[46px] min-w-[56px] active:scale-95 ${
            currentPage === 'datos'
              ? 'text-white font-bold bg-white/10 border border-white/20'
              : 'text-[#94a3b8] hover:text-white'
          }`}
          aria-label="Datos Curiosos y Secretos"
        >
          <Lightbulb className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-mono tracking-tight uppercase">Datos</span>
          {currentPage === 'datos' && (
            <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
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
          className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all min-h-[46px] min-w-[56px] active:scale-95 ${
            currentPage === 'admin-panel'
              ? 'text-white font-bold bg-white/10 border border-white/20'
              : 'text-[#94a3b8] hover:text-white'
          }`}
          aria-label={user ? 'Mi Cuenta y Perfil' : 'Iniciar Sesión'}
        >
          {isAdmin ? (
            <ShieldCheck className="w-5 h-5 mb-0.5 text-white/90" />
          ) : user ? (
            <User className="w-5 h-5 mb-0.5 text-white/90" />
          ) : (
            <User className="w-5 h-5 mb-0.5" />
          )}
          <span className="text-[10px] font-mono tracking-tight uppercase">
            {isAdmin ? 'Admin' : user ? 'Cuenta' : 'Entrar'}
          </span>
          {currentPage === 'admin-panel' && (
            <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
          )}
        </button>
      </nav>
    </>
  );
};


