import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RoutePage } from '../types';
import { useAuth } from '../context/AuthContext';
import vintageSupercarsHero from '../assets/images/vintage_supercar_hero_1787273928020.jpg';
import countachClassicImg from '../assets/images/countach_vintage_classic_1787273941197.jpg';
import { xj220Images } from '../data/xj220Data';
import { r34Images } from '../data/r34Data';
import { supraImages } from '../data/supraData';
import { mazda787bImages } from '../data/mazda787bData';
import { nsxImages } from '../data/nsxData';
import { countachImages } from '../data/countachData';
import { f40MiuraImages } from '../data/f40MiuraData';
import { camaroMustangImages } from '../data/camaroMustangData';
import { UserAccountNav } from './UserAccountNav';
import { Logo } from './Logo';
import { 
  Mail, 
  ShieldCheck, 
  Sparkles, 
  Send, 
  BookOpen, 
  Lightbulb, 
  Play, 
  Compass, 
  Flame, 
  ArrowRight, 
  ChevronRight, 
  Users,
  Gauge,
  Zap,
  Radio,
  Timer,
  Activity,
  Award,
  Layers,
  Volume2
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: RoutePage) => void;
  onOpenAuthModal?: () => void;
  onOpenAccountModal?: () => void;
  onOpenBroadcastModal?: () => void;
}

interface HeroCarData {
  id: RoutePage;
  title: string;
  shortName: string;
  number: string;
  era: string;
  origin: string;
  flag: string;
  engine: string;
  power: string;
  topSpeed: string;
  zeroToHundred: string;
  image: string;
  tag: string;
  accent: string;
  soundNote: string;
  description: string;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenAuthModal,
  onOpenAccountModal,
  onOpenBroadcastModal,
}) => {
  const { user, isAdmin, subscribersCount } = useAuth();
  const [selectedHeroIndex, setSelectedHeroIndex] = useState<number>(0);

  const heroCars: HeroCarData[] = [
    {
      id: 'camaro-mustang',
      title: 'Camaro vs Mustang: La Guerra de Detroit',
      shortName: 'Mustang vs Camaro',
      number: '008',
      era: '1964 — Presente',
      origin: 'Detroit & Dearborn, Michigan, USA',
      flag: '🇺🇸 USA',
      engine: 'V8 Big & Small Blocks / Predator 5.2L / LT4',
      power: '760 CV (GT500) / 650 CV (ZL1)',
      topSpeed: '320+ km/h',
      zeroToHundred: '3.3s',
      image: camaroMustangImages.hero,
      tag: '★ NUEVO ESTRENO // CAPÍTULOS EXTENDIDOS',
      accent: '#ff5500',
      soundNote: 'Rugido V8 Cross-Plane & Súpercargador Roots',
      description:
        'La rivalidad más feroz de la historia del automóvil con capítulos extendidos. Del debut del Mustang en 1964 y el Proyecto Panther en 1966, a la guerra del Trans-Am, los Big Blocks 427 ZL-1 y Boss 429, el Fox 5.0 vs IROC-Z y la era moderna de 760 CV.',
    },
    {
      id: 'nsx',
      title: 'Honda NSX: La Perfección de Ayrton Senna',
      shortName: 'Honda NSX (Senna)',
      number: '007',
      era: '1990 — 2005',
      origin: 'Tochigi & Suzuka, Japón',
      flag: '🇯🇵 JAPÓN',
      engine: 'C30A 3.0L V6 VTEC 8.000 RPM Biela Titanio',
      power: '274 CV (Norma Japonesa)',
      topSpeed: '270 km/h',
      zeroToHundred: '5.2s',
      image: nsxImages.hero,
      tag: 'CHASIS ALUMINIO MONOCASCO',
      accent: '#e62628',
      soundNote: 'Aullido VTEC a 8.000 RPM en Suzuka',
      description:
        'El superdeportivo que obligó a Ferrari a reinventarse. Desarrollado con telemetría de Ayrton Senna en Suzuka, primer chasis monocasco de aluminio del mundo y bielas forjadas de titanio.',
    },
    {
      id: 'mazda-787b',
      title: 'Mazda 787B: El Rugido Inmortal de Le Mans',
      shortName: 'Mazda 787B (Wankel)',
      number: '006',
      era: '1991',
      origin: 'Hiroshima & Circuito de la Sarthe',
      flag: '🇯🇵 LE MANS',
      engine: 'R26B 4-Rotores Wankel 2.6L Atmosférico',
      power: '700 CV a 9.000 RPM (830 kg)',
      topSpeed: '340+ km/h Mulsanne',
      zeroToHundred: '2.8s',
      image: mazda787bImages.hero,
      tag: 'LE MANS WINNER 1991 // ROTATIVO',
      accent: '#22c55e',
      soundNote: 'Sinfonía Wankel 4 Rotores a 9.000 RPM',
      description:
        'El único automóvil con motor rotativo Wankel en consagrarse campeón absoluto de las 24 Horas de Le Mans en 1991, superando a los gigantescos prototipos de Mercedes-Benz, Jaguar y Porsche.',
    },
    {
      id: 'r34',
      title: 'Nissan Skyline GT-R R34: Godzilla y ATTESA',
      shortName: 'Skyline R34 GT-R',
      number: '005',
      era: '1999 — 2002',
      origin: 'Tochigi / Omori Factory, Japón',
      flag: '🇯🇵 JDM',
      engine: 'RB26DETT 2.6L Twin Turbo Bloque Hierro',
      power: '327 CV Stock (1.000+ CV Tuned)',
      topSpeed: '300+ km/h',
      zeroToHundred: '4.6s Stock',
      image: r34Images.hero,
      tag: 'ATTESA E-TS PRO // GODZILLA',
      accent: '#4ea0ff',
      soundNote: 'Doble Turbo Garret T28 & Válvula de Alivio',
      description:
        'La máxima evolución de la saga Skyline. Con pantalla digital MFD de telemetría de fuerzas G en tiempo real desarrollada con Polyphony Digital y tracción integral predictiva vectorial.',
    },
    {
      id: 'supra',
      title: 'Toyota Supra MK4: El Coloso 2JZ-GTE',
      shortName: 'Supra MK4 (2JZ)',
      number: '004',
      era: '1993 — 2002',
      origin: 'Aichi & Motomachi, Japón',
      flag: '🇯🇵 JDM',
      engine: '2JZ-GTE 3.0L Biturbo Secuencial Culata Yamaha',
      power: '330 CV Stock (1.200+ CV Forjado)',
      topSpeed: '290+ km/h',
      zeroToHundred: '4.9s Stock',
      image: supraImages.hero,
      tag: 'BLOQUE DE HIERRO INDESTRUCTIBLE',
      accent: '#ffd451',
      soundNote: 'Soplado Secuencial 2JZ Twin Turbo',
      description:
        'El bloque cerrado de seis cilindros más resistente jamás construido por la industria japonesa. Capaz de tolerar más de 800 CV con componentes internos originales de fábrica.',
    },
    {
      id: 'countach',
      title: 'Lamborghini Countach: La Cuña Espacial',
      shortName: 'Lamborghini Countach',
      number: '003',
      era: '1974 — 1990',
      origin: 'Sant’Agata Bolognese, Italia',
      flag: '🇮🇹 ITALIA',
      engine: 'V12 Bizzarrini 4.0L a 5.2L 6 Carburadores Weber',
      power: '375 a 455 CV',
      topSpeed: '300+ km/h',
      zeroToHundred: '4.8s',
      image: countachImages.hero,
      tag: 'DISEÑO GANDINI // PUERTAS DE TIJERA',
      accent: '#ffd451',
      soundNote: '6 Carburadores Weber Doble Boca DCOE',
      description:
        'El póster definitivo de una generación. Obra maestra de Marcello Gandini con chasis multitubular, radiadores laterales y el bramido del V12 longitudinal italiano.',
    },
    {
      id: 'f40-miura',
      title: 'Ferrari F40 vs Lamborghini Miura',
      shortName: 'F40 vs Miura SV',
      number: '002',
      era: '1966 — 1992',
      origin: 'Maranello vs Sant’Agata, Italia',
      flag: '🇮🇹 ITALIA',
      engine: 'V8 2.9L Biturbo (F40) vs V12 4.0L Transversal (Miura)',
      power: '478 CV (F40) / 385 CV (Miura SV)',
      topSpeed: '324 km/h (F40) / 280 km/h',
      zeroToHundred: '3.8s (F40)',
      image: f40MiuraImages.f40Hero,
      tag: 'KILÓMETRO CERO // DUELO HISTÓRICO',
      accent: '#e62628',
      soundNote: 'Turbos IHI sin filtros & V12 Transversal Puro',
      description:
        'El último automóvil bendecido por Enzo Ferrari frente a la máquina que inventó el concepto de superdeportivo de motor central transversal en 1966.',
    },
    {
      id: 'xj220',
      title: 'Jaguar XJ220: El Récord de 349.4 km/h',
      shortName: 'Jaguar XJ220 (TWR)',
      number: '001',
      era: '1992 — 1994',
      origin: 'Bloxham, Oxfordshire, Reino Unido',
      flag: '🇬🇧 UK',
      engine: 'JR6 3.5L V6 Biturbo Grupo B TWR',
      power: '550 CV a 7.200 RPM / 644 Nm',
      topSpeed: '349.4 km/h (Récord Nardò)',
      zeroToHundred: '3.6s',
      image: xj220Images.hero,
      tag: 'RÉCORD MUNDIAL DE VELOCIDAD',
      accent: '#4ea0ff',
      soundNote: 'V6 Biturbo derivado de Grupo B con Wastegate',
      description:
        'El bólido británico nacido en secreto durante el "Saturday Club" que conquistó el anillo peraltado de Nardò alcanzando 349.4 km/h en manos de Martin Brundle.',
    },
  ];

  const currentHero = heroCars[selectedHeroIndex] || heroCars[0];

  const scrollToContent = () => {
    const el = document.getElementById('explore-sections');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const latestDoc = {
    id: 'camaro-mustang' as RoutePage,
    title: 'Camaro vs Mustang: La Guerra de Detroit',
    number: '008',
    era: '1964 — Presente',
    origin: 'Detroit & Dearborn, Michigan, USA',
    engine: 'V8 Big & Small Blocks / Predator 5.2L / LT4 Supercharged',
    power: '760 CV (GT500) / 650 CV (ZL1 1LE)',
    topSpeed: '320+ km/h',
    image: camaroMustangImages.hero,
    tag: '★ NUEVO ESTRENO // CAPÍTULOS LARGOS // DOC 008',
    description:
      'La rivalidad más feroz de la historia del automóvil con capítulos extendidos. Del debut del Mustang en 1964 y el Proyecto Panther en 1966, a la guerra del Trans-Am, los Big Blocks 427 ZL-1 y Boss 429, el Fox 5.0 vs IROC-Z y la era moderna de 760 CV.',
  };

  const mobileLegends = [
    {
      id: 'camaro-mustang' as RoutePage,
      title: 'Camaro vs Mustang',
      subtitle: 'La Guerra de Detroit · V8',
      tag: 'NUEVO #008',
      accent: '#ff5500',
      image: camaroMustangImages.hero,
    },
    {
      id: 'nsx' as RoutePage,
      title: 'Honda NSX (1990)',
      subtitle: 'Ayrton Senna · VTEC',
      tag: 'ESTRENO #007',
      accent: '#e62628',
      image: nsxImages.hero,
    },
    {
      id: 'mazda-787b' as RoutePage,
      title: 'Mazda 787B',
      subtitle: 'Wankel · Le Mans 1991',
      tag: 'LE MANS WINNER',
      accent: '#22c55e',
      image: mazda787bImages.hero,
    },
    {
      id: 'r34' as RoutePage,
      title: 'Nissan Skyline R34',
      subtitle: 'RB26DETT Twin Turbo',
      tag: 'JDM ICON',
      accent: '#4ea0ff',
      image: r34Images.hero,
    },
    {
      id: 'supra' as RoutePage,
      title: 'Toyota Supra MK4',
      subtitle: '2JZ-GTE Biturbo',
      tag: 'LEGEND',
      accent: '#e62628',
      image: supraImages.hero,
    },
    {
      id: 'countach' as RoutePage,
      title: 'Lamborghini Countach',
      subtitle: 'V12 & Cuña Espacial',
      tag: 'POSTER CAR',
      accent: '#ffd451',
      image: countachImages.hero,
    },
    {
      id: 'f40-miura' as RoutePage,
      title: 'Ferrari F40 & Miura',
      subtitle: 'V8 Turbo vs V12',
      tag: 'DUELO',
      accent: '#d92f31',
      image: f40MiuraImages.f40Hero,
    },
    {
      id: 'xj220' as RoutePage,
      title: 'Jaguar XJ220',
      subtitle: '349.4 km/h Nardò',
      tag: 'RECORD',
      accent: '#4ea0ff',
      image: xj220Images.hero,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0e1013] text-[#efefed] flex flex-col justify-between selection:bg-[#d92f31] selection:text-white pb-24 md:pb-0">
      
      {/* ========================================================= */}
      {/* MOBILE OPTIMIZED INTERFACE (< md screens) */}
      {/* ========================================================= */}
      <div className="md:hidden flex flex-col w-full pb-20">
        {/* Fixed Header */}
        <header className="fixed top-0 left-0 w-full z-50 px-4 py-3 bg-gradient-to-b from-[#05070a]/90 via-[#05070a]/70 to-transparent backdrop-blur-md flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center text-left active:scale-95 transition-transform"
            aria-label="Ir al Inicio de AutoArchive"
          >
            <Logo size="sm" />
          </button>

          <UserAccountNav
            onNavigate={onNavigate}
            onOpenAuthModal={onOpenAuthModal || (() => {})}
            onOpenAccountModal={onOpenAccountModal}
            onOpenBroadcastModal={onOpenBroadcastModal}
          />
        </header>

        {/* Featured Hero (Netflix Style) */}
        <section className="relative w-full h-[65vh] min-h-[500px] flex items-end justify-center pb-12 pt-20">
          <div className="absolute inset-0 z-0">
            <img 
              src={latestDoc.image} 
              alt={latestDoc.title} 
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/60 via-transparent to-[#0e1013]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e1013] via-[#0e1013]/80 to-transparent h-2/3 mt-auto" />
          </div>

          <div className="relative z-10 w-full px-5 flex flex-col items-center text-center space-y-4">
            <div className="flex flex-col items-center gap-1.5">
              <span className="px-2 py-0.5 bg-[#ff5500] text-white text-[9px] font-mono font-bold tracking-widest uppercase rounded shadow-[0_0_12px_rgba(255,85,0,0.5)]">
                {latestDoc.tag.split('//')[0]}
              </span>
              <span className="text-[10px] font-mono text-[#ffd451] font-bold tracking-widest uppercase">
                {latestDoc.origin}
              </span>
            </div>
            
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase leading-[0.9]">
              {latestDoc.title}
            </h1>
            
            <p className="text-xs text-[#a0a8b5] max-w-[280px] leading-relaxed line-clamp-2">
              {latestDoc.description}
            </p>
            
            <div className="flex items-center gap-3 w-full max-w-[300px] pt-2">
              <button
                onClick={() => onNavigate(latestDoc.id)}
                className="flex-1 py-3 bg-white text-black font-black text-[10px] tracking-wider uppercase rounded-lg transition-all flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Play className="w-4 h-4 fill-black" />
                <span>Escuchar o Leer</span>
              </button>
              <button
                onClick={() => onNavigate('documentales')}
                className="flex-1 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold text-xs tracking-wider uppercase rounded-lg transition-all flex items-center justify-center gap-1.5 active:scale-95"
              >
                <BookOpen className="w-4 h-4" />
                <span>Catálogo</span>
              </button>
            </div>
          </div>
        </section>

        {/* Horizontal Carousel: Documentales Disponibles */}
        <section className="px-0 py-6 space-y-3">
          <div className="px-5">
            <h2 className="text-sm font-bold text-white tracking-wide">Documentales Disponibles</h2>
          </div>
          <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar px-5 gap-3 pb-4">
            {mobileLegends.map((car) => (
              <div
                key={car.id}
                onClick={() => onNavigate(car.id)}
                className="snap-start shrink-0 w-[140px] flex flex-col gap-2 cursor-pointer active:scale-95 transition-transform"
              >
                <div className="w-full aspect-[2/3] relative rounded-lg overflow-hidden border border-white/10 bg-[#161a22]">
                  <img
                    src={car.image}
                    alt={car.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-2 left-2 right-2">
                    <span 
                      className="inline-block px-1.5 py-0.5 text-[8px] font-mono font-bold uppercase rounded-sm bg-black/50 backdrop-blur-md"
                      style={{ color: car.accent, border: `1px solid ${car.accent}40` }}
                    >
                      {car.tag.split(' ')[0]}
                    </span>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2">
                    <h3 className="text-xs font-black text-white leading-tight">{car.title}</h3>
                  </div>
                </div>
              </div>
            ))}
            {/* "Ver todos" card */}
            <div
              onClick={() => onNavigate('documentales')}
              className="snap-start shrink-0 w-[140px] aspect-[2/3] flex flex-col items-center justify-center gap-2 cursor-pointer active:scale-95 transition-transform rounded-lg border border-white/10 bg-[#12161f] hover:bg-[#1a202c]"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <ChevronRight className="w-6 h-6 text-white" />
              </div>
              <span className="text-[10px] font-bold text-[#8bb4d9] uppercase tracking-wider">Ver Todos</span>
            </div>
          </div>
        </section>

        {/* Quick Nav: Datos Curiosos, Foro & Admin */}
        <section className="px-5 py-4 grid grid-cols-2 gap-3">
          <div
            onClick={() => onNavigate('datos')}
            className="p-4 bg-gradient-to-br from-[#1a170d] to-[#0a0905] border border-[#ffd451]/30 rounded-xl flex items-center justify-between active:scale-95 transition-transform cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#ffd451]/20 flex items-center justify-center text-[#ffd451]">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase">Datos</h3>
                <p className="text-[10px] text-[#ffd451]/70 mt-0.5">20 Récords</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#ffd451]/50" />
          </div>

          <div
            onClick={() => onNavigate('foro')}
            className="p-4 bg-gradient-to-br from-[#0c2e1b] to-[#081a10] border border-[#22c55e]/30 rounded-xl flex items-center justify-between active:scale-95 transition-transform cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#22c55e]/20 flex items-center justify-center text-[#22c55e]">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase">Foro</h3>
                <p className="text-[10px] text-[#22c55e]/70 mt-0.5">Autos & Recs</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#22c55e]/50" />
          </div>

          {isAdmin && (
            <div
              onClick={() => onNavigate('admin-panel')}
              className="col-span-2 p-4 bg-gradient-to-br from-[#210a0b] to-[#0f0405] border border-[#e62628]/30 rounded-xl flex items-center justify-between active:scale-95 transition-transform cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#e62628]/20 flex items-center justify-center text-[#ff7173]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase">Admin Panel</h3>
                  <p className="text-[10px] text-[#ff7173]/70 mt-0.5">Gestión de usuarios</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#ff7173]/50" />
            </div>
          )}
        </section>

        {/* Newsletter Section */}
        <section className="px-5 py-6">
          <div className="p-5 bg-[#0a0d14] border border-[#1b3452] rounded-xl flex flex-col items-center text-center space-y-3">
            <Mail className="w-8 h-8 text-[#4ea0ff]" />
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Avisos Oficiales</h3>
              <p className="text-[10px] text-[#8bb4d9] mt-1 leading-relaxed">
                Suscríbete para recibir notificaciones cuando se publiquen nuevos documentales.
              </p>
            </div>
            {isAdmin ? (
              <button
                onClick={onOpenBroadcastModal}
                className="w-full py-2.5 mt-2 bg-[#e62628] text-white text-[10px] font-black uppercase rounded-lg active:scale-95 transition-transform"
              >
                Enviar Novedad
              </button>
            ) : user ? (
              <div className="w-full py-2.5 mt-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase rounded-lg">
                Suscripción Activa
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="w-full py-2.5 mt-2 bg-[#4ea0ff] text-white text-[10px] font-black uppercase rounded-lg active:scale-95 transition-transform"
              >
                Suscribir Mi Correo
              </button>
            )}
          </div>
        </section>

        {/* Mobile Footer */}
        <footer className="px-5 py-6 text-center pb-12">
          <p className="text-[10px] font-mono text-[#5f7d9c] uppercase tracking-widest">
            AutoArchive © 2026<br/>
            La Enciclopedia de la Era Dorada
          </p>
        </footer>
      </div>

      {/* ========================================================= */}
      {/* DESKTOP / LAPTOP ENRICHED INTERFACE (>= md screens) */}
      {/* ========================================================= */}
      <div className="hidden md:flex flex-col flex-1">
        
        {/* Top Telemetry & Global Archival Broadcast Ticker */}
        <div className="bg-[#05080e] border-b border-white/10 px-6 sm:px-12 md:px-20 py-2 flex items-center justify-between text-[10px] font-mono text-[#8a9db5]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#22c55e] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-ping inline-block" />
              <span>SERVIDOR EDITORIAL ACTIVO</span>
            </span>
            <span className="text-white/20">|</span>
            <span className="text-[#ffd451]">★ 8 DOCUMENTALES COMPLETOS</span>
            <span className="text-white/20">|</span>
            <span className="text-[#4ea0ff]">20 EXPEDIENTES Y CURIOSIDADES</span>
            <span className="text-white/20">|</span>
            <span className="text-[#22c55e]">FORO DE DEBATE EN VIVO</span>
          </div>

          <div className="flex items-center gap-4 text-white/50">
            <span className="flex items-center gap-1">
              <Volume2 className="w-3 h-3 text-[#ffd451]" />
              <span>NARRACIÓN DE AUDIO HI-RES</span>
            </span>
            <span>TELEMETRÍA DE BANCO DE PRUEBAS</span>
          </div>
        </div>

        {/* Desktop Sticky Header */}
        <header className="sticky top-0 z-40 flex items-center justify-between px-6 sm:px-12 md:px-20 py-4 border-b border-white/10 bg-[#070b11]/90 backdrop-blur-md">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center text-left group hover:scale-[1.02] transition-all"
            aria-label="Ir al Inicio de AutoArchive"
          >
            <Logo size="md" />
          </button>

          <div className="flex items-center gap-6 lg:gap-8 text-[12px] font-mono font-bold tracking-[0.16em] uppercase">
            <button
              id="nav-link-doc-btn"
              onClick={() => onNavigate('documentales')}
              className="text-[#9da0a5] hover:text-[#4ea0ff] transition-all hover:scale-105 flex items-center gap-2"
            >
              <span className="text-[10px] text-[#4ea0ff] bg-[#4ea0ff]/15 px-2 py-0.5 rounded border border-[#4ea0ff]/30">01</span>
              <span>Documentales</span>
            </button>

            <button
              id="nav-link-datos-btn"
              onClick={() => onNavigate('datos')}
              className="text-[#9da0a5] hover:text-[#ffd451] transition-all hover:scale-105 flex items-center gap-2"
            >
              <span className="text-[10px] text-[#ffd451] bg-[#ffd451]/15 px-2 py-0.5 rounded border border-[#ffd451]/30">02</span>
              <span>Datos Curiosos</span>
            </button>

            <button
              id="nav-link-foro-btn"
              onClick={() => onNavigate('foro')}
              className="text-[#9da0a5] hover:text-[#22c55e] transition-all hover:scale-105 flex items-center gap-2"
            >
              <span className="text-[10px] text-[#22c55e] bg-[#22c55e]/15 px-2 py-0.5 rounded border border-[#22c55e]/30">03</span>
              <span>Foro</span>
            </button>

            {isAdmin && (
              <button
                id="nav-link-admin-btn"
                onClick={() => onNavigate('admin-panel')}
                className="text-[#ff8082] hover:text-white transition-all hover:scale-105 flex items-center gap-2 bg-[#e62628]/20 border border-[#e62628]/40 px-3 py-1.5 rounded"
              >
                <span className="text-[10px] font-mono text-[#ffd451]">04</span>
                <span>Administración</span>
              </button>
            )}

            <div className="pl-3 border-l border-white/15">
              <UserAccountNav
                onNavigate={onNavigate}
                onOpenAuthModal={onOpenAuthModal || (() => {})}
                onOpenAccountModal={onOpenAccountModal}
                onOpenBroadcastModal={onOpenBroadcastModal}
              />
            </div>
          </div>
        </header>

        {/* ========================================================= */}
        {/* INTERACTIVE HERO WITH DYNAMIC SUPERCAR SWITCHER */}
        {/* ========================================================= */}
        <section className="relative min-h-[88vh] flex flex-col justify-between px-6 sm:px-12 md:px-20 pt-12 pb-10 overflow-hidden border-b border-white/10 bg-[#070b11]">
          {/* Dynamic Background Image with Smooth Crossfade Transition */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentHero.id}
                src={currentHero.image}
                alt={currentHero.title}
                referrerPolicy="no-referrer"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 0.45, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="w-full h-full object-cover object-center"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-[#070b11] via-[#070b11]/70 to-[#070b11]/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070b11] via-[#070b11]/90 to-transparent" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
          </div>

          {/* Ambient Supercar Watermark Label */}
          <div
            aria-hidden="true"
            className="absolute right-[-2vw] top-1/2 -translate-y-1/2 text-[clamp(100px,16vw,240px)] font-black text-white/[0.03] select-none pointer-events-none tracking-tighter font-mono uppercase"
          >
            {currentHero.shortName.split(' ')[0]}
          </div>

          {/* Main Hero Content Area & Telemetry Cockpit */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6">
            
            {/* Left Column: Heading, Synopsis & Direct CTAs */}
            <motion.div
              key={`text-${currentHero.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-5"
            >
              <div className="flex flex-wrap items-center gap-2.5">
                <span 
                  className="px-3 py-1 text-[10px] font-bold font-mono tracking-widest uppercase rounded shadow-lg"
                  style={{ 
                    backgroundColor: `${currentHero.accent}25`,
                    color: currentHero.accent,
                    border: `1px solid ${currentHero.accent}60`
                  }}
                >
                  {currentHero.tag}
                </span>

                <span className="px-3 py-1 bg-white/5 border border-white/15 text-[10px] font-mono tracking-widest text-[#ffd451] font-bold uppercase flex items-center gap-1.5 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffd451] animate-pulse" />
                  <span>EXPEDIENTE #{currentHero.number}</span>
                </span>

                <span className="px-2.5 py-1 bg-black/40 border border-white/10 text-[10px] font-mono text-[#8a9db5] rounded">
                  {currentHero.flag}
                </span>
              </div>

              <div>
                <span className="text-xs font-mono tracking-[0.25em] text-[#8a9db5] uppercase block mb-1">
                  {currentHero.era} // {currentHero.origin}
                </span>
                <h1 className="text-[clamp(32px,4.5vw,62px)] font-black tracking-tighter leading-[0.92] text-white uppercase max-w-3xl">
                  {currentHero.title}
                </h1>
              </div>

              <p className="max-w-2xl text-[#b8c7d8] text-sm sm:text-base leading-relaxed font-light">
                {currentHero.description}
              </p>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  id={`hero-read-doc-${currentHero.id}`}
                  onClick={() => onNavigate(currentHero.id)}
                  className="px-8 py-4 text-black text-xs font-black tracking-[0.16em] uppercase rounded-xl transition-all shadow-2xl flex items-center justify-center gap-2.5 cursor-pointer font-mono"
                  style={{ 
                    backgroundColor: currentHero.accent,
                    boxShadow: `0 0 30px ${currentHero.accent}50`
                  }}
                >
                  <Play className="w-4 h-4 fill-black" />
                  <span>LEER O ESCUCHAR DOCUMENTAL</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigate('documentales')}
                  className="px-6 py-4 border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white text-xs font-bold tracking-wider uppercase rounded-xl transition-all backdrop-blur-sm flex items-center justify-center gap-2 cursor-pointer font-mono"
                >
                  <BookOpen className="w-4 h-4 text-[#ffd451]" />
                  <span>VER CATÁLOGO COMPLETO</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Right Column: Live Telemetry Cockpit Card */}
            <motion.div
              key={`telemetry-${currentHero.id}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-5 bg-gradient-to-br from-[#0c1624] via-[#09101a] to-[#060a12] border border-white/15 rounded-2xl p-6 shadow-2xl relative overflow-hidden backdrop-blur-md"
            >
              <div 
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: `linear-gradient(to right, ${currentHero.accent}, transparent)` }}
              />

              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-[#ffd451]" />
                  <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">
                    TELEMETRÍA & ESPECIFICACIONES
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-white/5 text-white/60 text-[10px] font-mono rounded">
                  DOC #{currentHero.number}
                </span>
              </div>

              {/* Specs Grid */}
              <div className="mt-4 space-y-3 font-mono text-xs">
                <div className="p-3 bg-black/40 border border-white/5 rounded-xl flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] text-[#6d7582] uppercase block">ARQUITECTURA DE MOTOR</span>
                    <span className="text-white font-bold">{currentHero.engine}</span>
                  </div>
                  <Zap className="w-4 h-4 text-[#ffd451] shrink-0 mt-1" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-black/40 border border-white/5 rounded-xl">
                    <span className="text-[10px] text-[#6d7582] uppercase block">POTENCIA MÁXIMA</span>
                    <span className="text-[#ffd451] text-sm font-black">{currentHero.power}</span>
                  </div>

                  <div className="p-3 bg-black/40 border border-white/5 rounded-xl">
                    <span className="text-[10px] text-[#6d7582] uppercase block">VELOCIDAD TOPE</span>
                    <span className="text-[#4ea0ff] text-sm font-black">{currentHero.topSpeed}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-black/40 border border-white/5 rounded-xl">
                    <span className="text-[10px] text-[#6d7582] uppercase block">ACELERACIÓN 0-100</span>
                    <span className="text-[#22c55e] text-sm font-black">{currentHero.zeroToHundred}</span>
                  </div>

                  <div className="p-3 bg-black/40 border border-white/5 rounded-xl">
                    <span className="text-[10px] text-[#6d7582] uppercase block">ORIGEN / ERA</span>
                    <span className="text-white text-xs font-bold truncate block">{currentHero.flag}</span>
                  </div>
                </div>

                {/* Sound Note */}
                <div className="p-3 bg-[#ffd451]/10 border border-[#ffd451]/20 rounded-xl flex items-center gap-2.5">
                  <Volume2 className="w-4 h-4 text-[#ffd451] shrink-0" />
                  <div className="text-[11px]">
                    <span className="text-[#ffd451] font-bold block">Acústica del Motor:</span>
                    <span className="text-white/80">{currentHero.soundNote}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Interactive Selector Strip: Switch across the 8 Legends */}
          <div className="relative z-10 mt-10 pt-6 border-t border-white/10">
            <div className="flex items-center justify-between mb-3 text-[11px] font-mono text-[#8a9db5]">
              <span className="flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-[#ffd451] animate-pulse" />
                <span className="font-bold uppercase text-white">SELECTOR DE SUPERDEPORTIVOS EN EL ARCHIVO:</span>
              </span>
              <span className="text-white/40">Haz clic en cualquier modelo para cargar su ficha</span>
            </div>

            <div className="grid grid-cols-4 lg:grid-cols-8 gap-2">
              {heroCars.map((car, idx) => (
                <button
                  key={car.id}
                  onClick={() => setSelectedHeroIndex(idx)}
                  className={`p-2.5 rounded-xl border text-left transition-all relative overflow-hidden group cursor-pointer ${
                    selectedHeroIndex === idx
                      ? 'bg-gradient-to-b from-[#18283d] to-[#0c1420] border-white text-white shadow-[0_0_20px_rgba(255,255,255,0.15)] scale-[1.03]'
                      : 'bg-[#0b111a]/80 border-white/10 hover:border-white/30 text-white/70 hover:text-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-[9px] font-mono mb-1">
                    <span className="font-bold" style={{ color: car.accent }}>#{car.number}</span>
                    <span className="text-white/40">{car.era.split('—')[0].trim()}</span>
                  </div>
                  <div className="text-xs font-bold truncate leading-tight">
                    {car.shortName}
                  </div>
                  {selectedHeroIndex === idx && (
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-0.5" 
                      style={{ backgroundColor: car.accent }} 
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* ENRICHED 3 MAIN SECTIONS (DOCUMENTALES / DATOS / FORO) */}
        {/* ========================================================= */}
        <section
          id="explore-sections"
          className="px-6 sm:px-12 md:px-20 py-20 bg-[#080d15] text-[#f1f5f9] relative overflow-hidden border-b border-white/10"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
          
          <div className="relative z-10 flex items-center justify-between pb-4 mb-8 border-b border-white/10 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 bg-[#ffd451] rounded-full animate-pulse" />
              <span className="font-bold tracking-[0.2em] text-white uppercase">
                AUTOARCHIVE // COLECCIONES EDITORIALES PRINCIPALES
              </span>
            </div>
            <span className="text-white/40 hidden sm:inline">ACCESO DIRECTO A LOS TRES PILARES DE LA PLATAFORMA</span>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-8 items-end pb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-1 bg-[#ffd451]" />
                <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#ffd451] font-mono">
                  EXPLORA NUESTRO CONTENIDO
                </span>
              </div>
              <h2 className="text-[clamp(30px,4.5vw,56px)] font-black tracking-tight leading-[0.95] text-white uppercase">
                Los 3 Universos de AutoArchive
              </h2>
            </div>
            <div>
              <p className="text-sm sm:text-base text-[#9eb2c9] leading-relaxed max-w-xl font-light">
                Cada sección conserva una retícula editorial meticulosa que profundiza en crónicas históricas, especificaciones mecánicas reales, planos técnicos, debates de comunidad y curiosidades desclasificadas.
              </p>
            </div>
          </div>

          {/* 3 Core Cards with Superior Visual Polish */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            
            {/* 01 DOCUMENTALES */}
            <div
              id="card-documentales"
              onClick={() => onNavigate('documentales')}
              className="group relative min-h-[400px] p-7 overflow-hidden text-[#efefed] bg-gradient-to-br from-[#0c1828] to-[#070f1a] border-2 border-[#1e3552] cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(78,160,255,0.25)] hover:border-[#4ea0ff] flex flex-col justify-between rounded-2xl"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#4ea0ff] via-[#7cbcff] to-transparent" />
              <div className="absolute right-0 bottom-0 w-3/4 opacity-25 pointer-events-none group-hover:opacity-40 group-hover:scale-105 transition-all duration-500">
                <img
                  src={xj220Images.hero}
                  alt="Superdeportivo"
                  referrerPolicy="no-referrer"
                  className="w-full object-contain"
                />
              </div>
              <span
                aria-hidden="true"
                className="absolute right-[-10px] bottom-[-40px] text-[clamp(100px,12vw,180px)] font-black tracking-[-0.12em] leading-none text-white/[0.04] pointer-events-none select-none"
              >
                01
              </span>

              <div className="relative z-10 flex items-center justify-between">
                <div className="inline-grid place-items-center w-11 h-11 border border-[#4ea0ff] bg-[#4ea0ff]/15 rounded-xl text-xs font-black font-mono tracking-widest text-[#4ea0ff] shadow-[0_0_15px_rgba(78,160,255,0.3)]">
                  01
                </div>
                <span className="px-3 py-1 bg-[#4ea0ff]/15 border border-[#4ea0ff]/40 text-[10px] tracking-[0.2em] font-bold text-[#7cbcff] uppercase font-mono rounded-full">
                  8 DOCUMENTALES
                </span>
              </div>

              <div className="relative z-10 mt-6">
                <span className="block text-[10px] font-bold tracking-[0.22em] text-[#72b9ff] uppercase font-mono">
                  EXPEDIENTE EDITORIAL // 01
                </span>
                <h3 className="mt-1 text-2xl lg:text-3xl font-black tracking-tight leading-none group-hover:text-[#4ea0ff] transition-colors uppercase">
                  DOCUMENTALES
                </h3>
                <p className="mt-3 text-[#b5c7db] text-xs leading-relaxed">
                  Historias completas de superdeportivos míticos, rivalidades de resistencia, telemetría de época y narración de audio interactiva.
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5 font-mono text-[9px]">
                  <span className="px-2 py-0.5 bg-[#ff5500]/20 border border-[#ff5500]/40 text-[#ffd451] font-bold rounded">CAMARO VS MUSTANG</span>
                  <span className="px-2 py-0.5 bg-[#e62628]/20 border border-[#e62628]/40 text-[#ff8082] rounded">HONDA NSX</span>
                  <span className="px-2 py-0.5 bg-[#22c55e]/20 border border-[#22c55e]/40 text-[#81b292] rounded">MAZDA 787B</span>
                </div>

                <div className="mt-6 flex items-center gap-2 text-[#4ea0ff] font-mono font-bold transition-transform duration-300 group-hover:translate-x-2">
                  <span className="text-xs tracking-wider uppercase">ENTRAR AL CATÁLOGO</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* 02 DATOS CURIOSOS */}
            <div
              id="card-datos-curiosos"
              onClick={() => onNavigate('datos')}
              className="group relative min-h-[400px] p-7 overflow-hidden text-[#efefed] bg-gradient-to-br from-[#1c180e] to-[#0e0c07] border-2 border-[#42391e] cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(255,212,81,0.25)] hover:border-[#ffd451] flex flex-col justify-between rounded-2xl"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#ffd451] via-[#ffe58f] to-transparent" />
              <div className="absolute right-0 bottom-0 w-3/4 opacity-25 pointer-events-none group-hover:opacity-40 group-hover:scale-105 transition-all duration-500">
                <img
                  src={countachClassicImg}
                  alt="Lamborghini Countach Clásico"
                  referrerPolicy="no-referrer"
                  className="w-full object-contain"
                />
              </div>
              <span
                aria-hidden="true"
                className="absolute right-[-10px] bottom-[-40px] text-[clamp(100px,12vw,180px)] font-black tracking-[-0.12em] leading-none text-white/[0.04] pointer-events-none select-none"
              >
                02
              </span>

              <div className="relative z-10 flex items-center justify-between">
                <div className="inline-grid place-items-center w-11 h-11 border border-[#ffd451] bg-[#ffd451]/15 rounded-xl text-xs font-black font-mono tracking-widest text-[#ffd451] shadow-[0_0_15px_rgba(255,212,81,0.3)]">
                  02
                </div>
                <span className="px-3 py-1 bg-[#ffd451]/15 border border-[#ffd451]/40 text-[10px] tracking-[0.2em] font-bold text-[#ffd451] uppercase font-mono rounded-full">
                  20 EXPEDIENTES
                </span>
              </div>

              <div className="relative z-10 mt-6">
                <span className="block text-[10px] font-bold tracking-[0.22em] text-[#ffd451] uppercase font-mono">
                  EXPEDIENTE EDITORIAL // 02
                </span>
                <h3 className="mt-1 text-2xl lg:text-3xl font-black tracking-tight leading-none group-hover:text-[#ffd451] transition-colors uppercase">
                  DATOS CURIOSOS
                </h3>
                <p className="mt-3 text-[#dbd3b7] text-xs leading-relaxed">
                  Prototipos camuflados, soluciones extremas de taller, secretos de ingeniería, contratos secretos y récords insólitos.
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5 font-mono text-[9px]">
                  <span className="px-2 py-0.5 bg-[#ffd451]/15 border border-[#ffd451]/40 text-[#ffd451] rounded">20 TARJETAS</span>
                  <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-[#c9b87f] rounded">349.4 KM/H</span>
                  <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-[#c9b87f] rounded">WANKEL 787B</span>
                </div>

                <div className="mt-6 flex items-center gap-2 text-[#ffd451] font-mono font-bold transition-transform duration-300 group-hover:translate-x-2">
                  <span className="text-xs tracking-wider uppercase">EXPLORAR CURIOSIDADES</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* 03 FORO & DEBATES */}
            <div
              id="card-foro-community"
              onClick={() => onNavigate('foro')}
              className="group relative min-h-[400px] p-7 overflow-hidden text-[#efefed] bg-gradient-to-br from-[#0c2415] to-[#07140b] border-2 border-[#1d4d2d] cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(34,197,94,0.25)] hover:border-[#22c55e] flex flex-col justify-between rounded-2xl"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#22c55e] via-[#4ade80] to-transparent" />
              <span
                aria-hidden="true"
                className="absolute right-[-10px] bottom-[-40px] text-[clamp(100px,12vw,180px)] font-black tracking-[-0.12em] leading-none text-white/[0.04] pointer-events-none select-none"
              >
                03
              </span>

              <div className="relative z-10 flex items-center justify-between">
                <div className="inline-grid place-items-center w-11 h-11 border border-[#22c55e] bg-[#22c55e]/15 rounded-xl text-xs font-black font-mono tracking-widest text-[#22c55e] shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                  03
                </div>
                <span className="px-3 py-1 bg-[#22c55e]/15 border border-[#22c55e]/40 text-[10px] tracking-[0.2em] font-bold text-[#4ade80] uppercase font-mono rounded-full">
                  COMUNIDAD VIVA
                </span>
              </div>

              <div className="relative z-10 mt-6">
                <span className="block text-[10px] font-bold tracking-[0.22em] text-[#4ade80] uppercase font-mono">
                  ESPACIO INTERACTIVO // 03
                </span>
                <h3 className="mt-1 text-2xl lg:text-3xl font-black tracking-tight leading-none group-hover:text-[#22c55e] transition-colors uppercase">
                  FORO & DEBATES
                </h3>
                <p className="mt-3 text-[#b7dbc2] text-xs leading-relaxed">
                  Zonas dedicadas para debatir sobre <strong>AUTOS</strong> y compartir <strong>RECOMENDACIONES</strong> técnicas con la comunidad de entusiastas.
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5 font-mono text-[9px]">
                  <span className="px-2 py-0.5 bg-[#4ea0ff]/20 border border-[#4ea0ff]/40 text-[#7cbcff] rounded">ZONA AUTOS</span>
                  <span className="px-2 py-0.5 bg-[#22c55e]/20 border border-[#22c55e]/40 text-[#4ade80] rounded">RECOMENDACIONES</span>
                </div>

                <div className="mt-6 flex items-center gap-2 text-[#22c55e] font-mono font-bold transition-transform duration-300 group-hover:translate-x-2">
                  <span className="text-xs tracking-wider uppercase">ENTRAR AL FORO</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Optional Admin Card */}
            {isAdmin && (
              <div
                id="card-admin-panel"
                onClick={() => onNavigate('admin-panel')}
                className="group relative min-h-[380px] p-7 overflow-hidden text-[#efefed] bg-gradient-to-br from-[#1f0909] to-[#0d0404] border-2 border-[#571e1e] cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(230,38,40,0.3)] hover:border-[#e62628] md:col-span-3 flex flex-col justify-between rounded-2xl mt-4"
              >
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#e62628] via-[#ff5254] to-[#ffd451]" />

                <div className="relative z-10 flex items-center justify-between">
                  <div className="inline-grid place-items-center w-11 h-11 border border-[#e62628] bg-[#e62628]/20 rounded-xl text-xs font-black font-mono tracking-widest text-[#ff8082]">
                    04
                  </div>
                  <span className="px-3 py-1 bg-[#e62628]/20 border border-[#e62628]/40 text-[10px] tracking-[0.2em] font-bold text-[#ff8082] uppercase font-mono flex items-center gap-1.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#ffd451]" />
                    EXCLUSIVO ADMINISTRACIÓN
                  </span>
                </div>

                <div className="relative z-10 mt-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <span className="block text-[10px] font-bold tracking-[0.22em] text-[#ff999b] uppercase font-mono">
                      PANEL DE CONTROL // 04
                    </span>
                    <h3 className="mt-1 text-2xl sm:text-3xl font-black tracking-tight group-hover:text-[#ffd451] transition-colors uppercase">
                      ADMINISTRACIÓN & BOLETINES
                    </h3>
                    <p className="mt-2 text-[#f5d0d1] text-xs leading-relaxed max-w-xl">
                      Gestión de los {subscribersCount} suscriptores inscritos, historial de boletines enviados y emisión de nuevos correos oficiales desde autonoticiascontacto@gmail.com.
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-[#ffd451] font-mono font-bold shrink-0">
                    <span className="text-xs tracking-wider uppercase">ABRIR PANEL PRIVADO</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Editorial Manifesto Quote */}
          <div className="relative z-10 mt-12 p-6 sm:p-8 bg-[#0d1420] border border-white/15 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-12 h-12 bg-[#ffd451] text-black flex items-center justify-center font-serif text-3xl font-black rounded-xl flex-shrink-0 shadow-[0_0_20px_rgba(255,212,81,0.3)]">
              “
            </div>
            <div className="flex-1 space-y-1">
              <blockquote className="text-sm font-serif italic text-[#e2e8f0] leading-relaxed">
                «Preservar la historia del automóvil no es solo recordar cifras de potencia, sino comprender las decisiones mecánicas, la pasión sin filtros y la valentía analógica con la que cada máquina superó sus propios límites.»
              </blockquote>
              <p className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#ffd451] uppercase pt-1">
                — MANIFIESTO EDITORIAL AUTOARCHIVE
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* NEWSLETTER & CORREO DIRECTO SECTION */}
        {/* ========================================================= */}
        <section className="px-6 sm:px-12 md:px-20 py-16 bg-[#05080e] border-b border-white/10 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-[#185a9d]/10 blur-3xl pointer-events-none" />
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#12283e] border border-[#4ea0ff]/30 rounded-full text-[11px] font-mono font-bold tracking-widest text-[#72b9ff] uppercase mb-4">
                <Mail className="w-3.5 h-3.5 text-[#ffd451]" />
                <span>AVISOS OFICIALES AL CORREO ELECTRÓNICO</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-mono tracking-tight text-white leading-tight">
                Recibe las novedades en tu correo desde <span className="text-[#ffd451]">autonoticiascontacto@gmail.com</span>
              </h3>
              <p className="text-sm text-[#8bb4d9] mt-3 leading-relaxed">
                Al suscribirte, recibirás una notificación directa en tu dirección de correo cada vez que se publique un nuevo documental o se desclasifiquen nuevos expedientes del automovilismo clásico.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto">
              {isAdmin ? (
                <button
                  id="home-admin-send-novedades-btn"
                  type="button"
                  onClick={onOpenBroadcastModal}
                  className="w-full lg:w-auto px-6 py-4 bg-[#e62628] hover:bg-[#ff3b3e] text-white font-mono text-xs sm:text-sm font-black tracking-widest uppercase rounded-xl transition-all shadow-[0_0_25px_rgba(230,38,40,0.5)] flex items-center justify-center gap-2.5 active:scale-95 border border-white/20 text-center"
                >
                  <Sparkles className="w-4 h-4 text-[#ffd451] shrink-0" />
                  <span>¡HAY NOVEDADES EN AUTOARCHIVE!</span>
                  <Send className="w-4 h-4 text-white shrink-0" />
                </button>
              ) : user ? (
                <div className="w-full px-6 py-4 bg-[#0a1828] border border-[#21436b] rounded-xl text-center">
                  <div className="text-xs font-mono text-[#59eab9] font-bold flex items-center justify-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#38d39f]" />
                    <span>SUSCRIPCIÓN ACTIVA</span>
                  </div>
                  <div className="text-[11px] font-mono text-[#8bb4d9] mt-1 truncate">
                    Recibiendo en: <strong className="text-white">{user.email}</strong>
                  </div>
                </div>
              ) : (
                <button
                  id="home-subscribe-cta-btn"
                  onClick={onOpenAuthModal}
                  className="w-full lg:w-auto px-6 py-4 bg-[#185a9d] hover:bg-[#2072c4] text-white font-mono text-xs font-bold tracking-wider uppercase rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 hover:scale-[1.02] text-center"
                >
                  <Mail className="w-3.5 h-3.5 text-[#ffd451] shrink-0" />
                  <span>SUSCRIBIR MI CORREO ELECTRÓNICO</span>
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 sm:px-12 md:px-20 py-8 bg-[#05080e] text-[#8e949e] text-[11px] tracking-[0.16em] border-t border-white/10 font-mono text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="text-[#efefed] font-bold tracking-widest">AUTOARCHIVE</span>
            <span className="text-white/20">|</span>
            <span>ARCHIVO DE SUPERDEPORTIVOS CLÁSICOS</span>
          </div>
          <p className="text-right text-[#656c77]">
            © 2026 — Edición Histórica y Documental
          </p>
        </footer>
      </div>
    </div>
  );
};
