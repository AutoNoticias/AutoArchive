import React, { useState } from 'react';
import { motion } from 'motion/react';
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
import { f1Images } from '../data/f1Data';
import { shelbyCobraImages } from '../data/shelbyCobraData';
import { toyotaHiluxImages } from '../data/toyotaHiluxData';
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
  Volume2,
  Crown
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: RoutePage) => void;
  onOpenAuthModal?: () => void;
  onOpenAccountModal?: () => void;
  onOpenBroadcastModal?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenAuthModal,
  onOpenAccountModal,
  onOpenBroadcastModal,
}) => {
  const { user, isAdmin, subscribersCount } = useAuth();
  const [activeFeaturedIdx, setActiveFeaturedIdx] = useState(0);

  const scrollToContent = () => {
    const el = document.getElementById('explore-sections');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const featuredPremieres = [
    {
      id: 'shelby-cobra' as RoutePage,
      title: 'Shelby Cobra 427 S/C',
      subtitle: 'El Veneno Analógico que Derrotó a Ferrari',
      number: '010',
      era: '1962 — 1967',
      origin: 'Los Ángeles & Thames Ditton // USA & UK',
      engine: 'Ford 427 FE Big Block Side-Oiler V8 (7.0L)',
      power: '485 CV (S/C) / 800+ CV (Super Snake)',
      topSpeed: '298 km/h · 0-100 en 3.8 s',
      image: shelbyCobraImages.hero,
      tag: '★ NUEVO ESTRENO // VENENO ANALÓGICO V8',
      watermark: 'SHELBY COBRA',
      accent: '#38bdf8',
      accentBg: 'bg-[#38bdf8]',
      accentText: 'text-[#38bdf8]',
      accentBorder: 'border-[#38bdf8]/50',
      tagBadge: 'bg-[#38bdf8]/20 text-[#7dd3fc] border-[#38bdf8]/60',
      shadowGlow: 'shadow-[0_0_30px_rgba(56,189,248,0.4)]',
      description:
        'La alianza legendaria entre Carroll Shelby y AC Cars que conquistó el Campeonato Mundial de Constructores FIA 1965 y humilló a Enzo Ferrari. Siete litros de cilindrada, chasis tubular reforzado de 4 pulgadas, carrocería artesanal de aluminio y escapes laterales atronadores.',
    },
    {
      id: 'toyota-hilux' as RoutePage,
      title: 'Toyota Hilux 4x4',
      subtitle: 'El Monolito Indestructible de la Resistencia Humana',
      number: '011',
      era: '1968 — Presente',
      origin: 'Hamura & Aichi, Japón // Global',
      engine: '22R 2.4L / 1GD-FTV 2.8L Diésel / V6 Dakar',
      power: '204 CV (Diésel) / 400 CV (Dakar V6)',
      topSpeed: '175 km/h · Resistencia Extrema',
      image: toyotaHiluxImages.hero,
      tag: '★ NUEVO ESTRENO // MONOLITO INDESTRUCTIBLE',
      watermark: 'TOYOTA HILUX',
      accent: '#eab308',
      accentBg: 'bg-[#eab308]',
      accentText: 'text-[#eab308]',
      accentBorder: 'border-[#eab308]/50',
      tagBadge: 'bg-[#eab308]/20 text-[#fde047] border-[#eab308]/60',
      shadowGlow: 'shadow-[0_0_30px_rgba(234,179,8,0.4)]',
      description:
        'El patrón indiscutible de la resistencia mecánica y la supervivencia humana con más de 19 millones de unidades en 180 países. Del motor 22R invulnerable al colapso de 23 pisos en Top Gear, la expedición al Polo Sur a -50°C y las victorias en el Rally Dakar.',
    },
  ];

  const currentHeroDoc = featuredPremieres[activeFeaturedIdx];

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
        <section className="relative w-full min-h-[540px] flex flex-col justify-end pb-10 pt-16">
          <div className="absolute inset-0 z-0">
            <img 
              src={currentHeroDoc.image} 
              alt={currentHeroDoc.title} 
              className="w-full h-full object-cover object-center transition-all duration-500"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#05070a]/80 via-[#05070a]/40 to-[#0e1013]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e1013] via-[#0e1013]/90 to-transparent h-3/4 mt-auto" />
          </div>

          <div className="relative z-10 w-full px-5 flex flex-col items-center text-center space-y-3.5">
            {/* Quick Mobile Premiere Switcher */}
            <div className="flex items-center gap-1.5 p-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 max-w-full overflow-x-auto hide-scrollbar">
              {featuredPremieres.map((doc, idx) => (
                <button
                  key={doc.id}
                  onClick={() => setActiveFeaturedIdx(idx)}
                  className={`px-2.5 py-1 text-[9px] font-mono font-bold uppercase rounded-full transition-all whitespace-nowrap ${
                    activeFeaturedIdx === idx
                      ? `${doc.accentBg} text-black shadow-md font-black`
                      : 'text-white/70 hover:text-white bg-transparent'
                  }`}
                >
                  #{doc.number} {doc.id === 'shelby-cobra' ? 'Shelby Cobra' : 'Toyota Hilux'}
                </button>
              ))}
            </div>

            <div className="flex flex-col items-center gap-1">
              <span 
                className="px-2.5 py-0.5 text-white text-[9px] font-mono font-bold tracking-widest uppercase rounded shadow-lg"
                style={{ backgroundColor: currentHeroDoc.accent }}
              >
                {currentHeroDoc.tag.split('//')[0]}
              </span>
              <span className="text-[10px] font-mono text-[#ffd451] font-bold tracking-widest uppercase">
                {currentHeroDoc.origin}
              </span>
            </div>
            
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase leading-[0.95]">
              {currentHeroDoc.title}
            </h1>
            
            <p className="text-xs text-[#a0a8b5] max-w-[290px] leading-relaxed line-clamp-2">
              {currentHeroDoc.description}
            </p>
            
            <div className="flex items-center gap-3 w-full max-w-[300px] pt-1">
              <button
                onClick={() => onNavigate(currentHeroDoc.id)}
                className="flex-1 py-3 text-black font-black text-[10px] tracking-wider uppercase rounded-lg transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-xl"
                style={{ backgroundColor: currentHeroDoc.accent }}
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
        
        {/* Top Global Archival Broadcast Ticker */}
        <div className="bg-[#05080e] border-b border-white/10 px-6 sm:px-12 md:px-20 py-2 flex items-center justify-between text-[10px] font-mono text-[#8a9db5]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#22c55e] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-ping inline-block" />
              <span>SERVIDOR EDITORIAL ACTIVO</span>
            </span>
            <span className="text-white/20">|</span>
            <span className="text-[#ffd451]">★ 11 DOCUMENTALES COMPLETOS</span>
            <span className="text-white/20">|</span>
            <span className="text-[#38bdf8]">NUEVOS ESTRENOS: SHELBY COBRA 427 & TOYOTA HILUX 4X4</span>
            <span className="text-white/20">|</span>
            <span className="text-[#22c55e]">FORO DE DEBATE EN VIVO</span>
          </div>

          <div className="flex items-center gap-4 text-white/50">
            <span className="flex items-center gap-1">
              <Volume2 className="w-3 h-3 text-[#ffd451]" />
              <span>NARRACIÓN DE AUDIO HI-RES</span>
            </span>
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
        {/* PREMIERE HERO SHOWCASE */}
        {/* ========================================================= */}
        <section className="relative min-h-[82vh] flex flex-col justify-between px-6 sm:px-12 md:px-20 pt-12 pb-12 overflow-hidden border-b border-white/10 bg-[#070b11]">
          {/* Background Image */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              src={currentHeroDoc.image}
              alt={currentHeroDoc.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center opacity-40 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070b11] via-[#070b11]/70 to-[#070b11]/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070b11] via-[#070b11]/90 to-transparent" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
          </div>

          {/* Ambient Supercar Watermark Label */}
          <div
            aria-hidden="true"
            className="absolute right-[-2vw] top-1/2 -translate-y-1/2 text-[clamp(80px,14vw,220px)] font-black text-white/[0.03] select-none pointer-events-none tracking-tighter font-mono uppercase"
          >
            {currentHeroDoc.watermark}
          </div>

          {/* Interactive Premiere Selector Tabs for Desktop / Laptop */}
          <div className="relative z-10 flex flex-wrap items-center gap-2 mb-6 p-1.5 bg-black/60 backdrop-blur-md rounded-2xl border border-white/15 max-w-fit">
            <span className="px-3 py-1 text-[10px] font-mono font-bold uppercase text-white/50 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#ffd451]" />
              <span>ESTRENOS DESTACADOS:</span>
            </span>
            {featuredPremieres.map((doc, idx) => (
              <button
                key={doc.id}
                onClick={() => setActiveFeaturedIdx(idx)}
                className={`px-4 py-2 text-xs font-mono font-bold uppercase rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                  activeFeaturedIdx === idx
                    ? `${doc.accentBg} text-black font-black shadow-lg scale-105`
                    : 'text-white/70 hover:text-white bg-white/5 hover:bg-white/10'
                }`}
              >
                <span>#{doc.number}</span>
                <span>{doc.id === 'shelby-cobra' ? 'Shelby Cobra 427' : 'Toyota Hilux 4x4'}</span>
                {activeFeaturedIdx === idx && <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            ))}
          </div>

          {/* Main Hero Content Area */}
          <div className="relative z-10 max-w-4xl pt-2 space-y-6">
            <motion.div
              key={currentHeroDoc.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-5"
            >
              <div className="flex flex-wrap items-center gap-2.5">
                <span 
                  className={`px-3 py-1 text-[10px] font-bold font-mono tracking-widest uppercase rounded shadow-lg border ${currentHeroDoc.tagBadge}`}
                >
                  {currentHeroDoc.tag}
                </span>

                <span className="px-3 py-1 bg-white/5 border border-white/15 text-[10px] font-mono tracking-widest text-[#ffd451] font-bold uppercase flex items-center gap-1.5 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffd451] animate-pulse" />
                  <span>EXPEDIENTE #{currentHeroDoc.number}</span>
                </span>

                <span className="px-2.5 py-1 bg-black/40 border border-white/10 text-[10px] font-mono text-[#8a9db5] rounded">
                  ⚙ {currentHeroDoc.engine.split('/')[0]}
                </span>
                <span className="px-2.5 py-1 bg-black/40 border border-white/10 text-[10px] font-mono text-[#ffd451] rounded">
                  ⚡ {currentHeroDoc.power.split('/')[0]}
                </span>
              </div>

              <div>
                <span className="text-xs font-mono tracking-[0.25em] text-[#8a9db5] uppercase block mb-1">
                  {currentHeroDoc.era} // {currentHeroDoc.origin}
                </span>
                <h1 className="text-[clamp(34px,5vw,64px)] font-black tracking-tighter leading-[0.92] text-white uppercase max-w-3xl">
                  {currentHeroDoc.title}
                </h1>
              </div>

              <p className="max-w-2xl text-[#b8c7d8] text-sm sm:text-base leading-relaxed font-light">
                {currentHeroDoc.description}
              </p>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  id={`hero-read-doc-${currentHeroDoc.id}`}
                  onClick={() => onNavigate(currentHeroDoc.id)}
                  className={`px-8 py-4 text-black text-xs font-black tracking-[0.16em] uppercase rounded-xl transition-all shadow-2xl flex items-center justify-center gap-2.5 cursor-pointer font-mono ${currentHeroDoc.accentBg} ${currentHeroDoc.shadowGlow}`}
                >
                  <Play className="w-4 h-4 fill-black" />
                  <span>LEER O ESCUCHAR DOCUMENTAL COMPLETO</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigate('documentales')}
                  className="px-6 py-4 border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white text-xs font-bold tracking-wider uppercase rounded-xl transition-all backdrop-blur-sm flex items-center justify-center gap-2 cursor-pointer font-mono"
                >
                  <BookOpen className="w-4 h-4 text-[#ffd451]" />
                  <span>VER CATÁLOGO COMPLETO (11)</span>
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Bottom Scroll Indicator */}
          <div className="relative z-10 pt-10 flex items-center justify-between text-xs font-mono text-[#8a9db5]">
            <button
              onClick={scrollToContent}
              className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer text-[11px]"
            >
              <span>EXPLORAR NUEVOS ESTRENOS Y CATÁLOGO</span>
              <ChevronRight className="w-4 h-4 text-[#ffd451] rotate-90" />
            </button>
            <span className="text-white/30 hidden lg:inline">11 GRANDES MONOGRAFÍAS · AUDIO HI-RES · FORO ABIERTO</span>
          </div>
        </section>

        {/* ========================================================= */}
        {/* DUAL PREMIERES HIGHLIGHT (SHELBY COBRA 427 & TOYOTA HILUX) */}
        {/* ========================================================= */}
        <section className="px-6 sm:px-12 md:px-20 py-12 bg-[#090d16] border-b border-white/10 relative">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#38bdf8] rounded-full animate-ping" />
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#38bdf8] uppercase">
                    LANZAMIENTOS EDITORIALES // AUTOARCHIVE 2026
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mt-1">
                  Nuevos Estrenos Exclusivos
                </h2>
              </div>
              <button
                onClick={() => onNavigate('documentales')}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/15 text-[#8bb4d9] hover:text-white text-xs font-mono font-bold uppercase rounded-xl transition-all flex items-center gap-2 self-start sm:self-auto"
              >
                <span>Ver Catálogo Completo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Dual Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Card 1: Shelby Cobra 427 */}
              <div 
                onClick={() => onNavigate('shelby-cobra')}
                className="group relative bg-[#0a121e] border-2 border-[#1e3a5f] hover:border-[#38bdf8] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(56,189,248,0.25)] flex flex-col justify-between"
              >
                <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                  <img
                    src={shelbyCobraImages.hero}
                    alt="Shelby Cobra 427"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a121e] via-[#0a121e]/40 to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 bg-[#38bdf8] text-black font-mono font-black text-[10px] uppercase rounded-md shadow-lg">
                      NUEVO ESTRENO #010
                    </span>
                    <span className="px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/20 text-[#38bdf8] font-mono text-[10px] font-bold rounded-md">
                      485 CV · 7.0L V8
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-2 rounded-full border border-white/10 text-white/70 group-hover:text-[#38bdf8] transition-colors">
                    <Volume2 className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-6 pt-2 space-y-3">
                  <div className="flex items-center justify-between font-mono text-[11px] text-[#8a9db5]">
                    <span>1962 — 1967 // USA & UK</span>
                    <span className="text-[#38bdf8] font-bold">298 KM/H</span>
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase group-hover:text-[#38bdf8] transition-colors">
                    Shelby Cobra 427 S/C
                  </h3>
                  <p className="text-xs text-[#9eb2c9] leading-relaxed line-clamp-2">
                    El veneno analógico de Carroll Shelby que derrotó a Ferrari en el Mundial FIA 1965. Motor 427 FE Big Block de 7 litros, chasis de 4 pulgadas y aceleración brutal de 0-100 en 3.8 segundos.
                  </p>
                  <div className="pt-2 flex items-center justify-between font-mono text-xs font-bold text-[#38bdf8]">
                    <span className="uppercase tracking-wider">LEER DOCUMENTAL COMPLETO</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Card 2: Toyota Hilux */}
              <div 
                onClick={() => onNavigate('toyota-hilux')}
                className="group relative bg-[#131008] border-2 border-[#4d3d1a] hover:border-[#eab308] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(234,179,8,0.25)] flex flex-col justify-between"
              >
                <div className="relative h-64 sm:h-72 w-full overflow-hidden">
                  <img
                    src={toyotaHiluxImages.hero}
                    alt="Toyota Hilux 4x4"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131008] via-[#131008]/40 to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 bg-[#eab308] text-black font-mono font-black text-[10px] uppercase rounded-md shadow-lg">
                      NUEVO ESTRENO #011
                    </span>
                    <span className="px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/20 text-[#eab308] font-mono text-[10px] font-bold rounded-md">
                      INDESTRUCTIBLE · 4X4
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-2 rounded-full border border-white/10 text-white/70 group-hover:text-[#eab308] transition-colors">
                    <Volume2 className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-6 pt-2 space-y-3">
                  <div className="flex items-center justify-between font-mono text-[11px] text-[#8a9db5]">
                    <span>1968 — PRESENTE // JAPÓN</span>
                    <span className="text-[#eab308] font-bold">TOP GEAR & DAKAR</span>
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase group-hover:text-[#eab308] transition-colors">
                    Toyota Hilux 4x4
                  </h3>
                  <p className="text-xs text-[#c9bea7] leading-relaxed line-clamp-2">
                    El monolito indestructible de la resistencia automotriz. Más de 19 millones de unidades vendidas, el chasis invulnerable ante demoliciones de edificios, expediciones árticas y dominio absoluto en el Dakar.
                  </p>
                  <div className="pt-2 flex items-center justify-between font-mono text-xs font-bold text-[#eab308]">
                    <span className="uppercase tracking-wider">LEER DOCUMENTAL COMPLETO</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
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
                  11 DOCUMENTALES
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
                  Historias completas de superdeportivos míticos, leyendas todoterreno, monoplazas de Gran Premio, telemetría y narración de audio interactiva.
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5 font-mono text-[9px]">
                  <span className="px-2 py-0.5 bg-[#38bdf8]/20 border border-[#38bdf8]/40 text-[#7dd3fc] font-bold rounded">SHELBY COBRA 427</span>
                  <span className="px-2 py-0.5 bg-[#eab308]/20 border border-[#eab308]/40 text-[#fde047] font-bold rounded">TOYOTA HILUX 4X4</span>
                  <span className="px-2 py-0.5 bg-[#e62628]/20 border border-[#e62628]/40 text-[#ff8082] rounded">HISTORIA F1</span>
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

            {/* 03 AUTOCHAT / EN TRABAJO */}
            <div
              id="card-foro-community"
              onClick={() => onNavigate('foro')}
              className="group relative min-h-[400px] p-7 overflow-hidden text-[#efefed] bg-gradient-to-br from-[#1a0f0a] to-[#0d0705] border-2 border-[#ff4500]/40 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(255,69,0,0.25)] hover:border-[#ff4500] flex flex-col justify-between rounded-2xl"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#ff4500] via-[#ffd451] to-transparent animate-pulse" />
              <span
                aria-hidden="true"
                className="absolute right-[-10px] bottom-[-40px] text-[clamp(100px,12vw,180px)] font-black tracking-[-0.12em] leading-none text-white/[0.04] pointer-events-none select-none"
              >
                03
              </span>

              <div className="relative z-10 flex items-center justify-between">
                <div className="inline-grid place-items-center w-11 h-11 border border-[#ff4500] bg-[#ff4500]/15 rounded-xl text-xs font-black font-mono tracking-widest text-[#ff4500] shadow-[0_0_15px_rgba(255,69,0,0.3)]">
                  03
                </div>
                <span className="px-3 py-1 bg-[#ff4500]/20 border border-[#ff4500]/50 text-[10px] tracking-[0.2em] font-black text-[#ff7043] uppercase font-mono rounded-full animate-pulse">
                  ¡TRABAJANDO EN ELLO!
                </span>
              </div>

              <div className="relative z-10 mt-6">
                <span className="block text-[10px] font-bold tracking-[0.22em] text-[#ff7043] uppercase font-mono">
                  MÓDULO EN DESARROLLO // 03
                </span>
                <h3 className="mt-1 text-2xl lg:text-3xl font-black tracking-tight leading-none group-hover:text-[#ff4500] transition-colors uppercase">
                  AutoChat
                </h3>
                <p className="mt-3 text-[#e6cdc7] text-xs leading-relaxed">
                  ¡Estamos trabajando en ello! Sección temporalmente en mantenimiento para incorporar mejoras técnicas y mayor rendimiento.
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5 font-mono text-[9px]">
                  <span className="px-2 py-0.5 bg-[#ff4500]/20 border border-[#ff4500]/40 text-[#ff7043] font-bold rounded">EN OBRAS</span>
                  <span className="px-2 py-0.5 bg-[#ffd451]/15 border border-[#ffd451]/30 text-[#ffd451] rounded">PRÓXIMAMENTE</span>
                </div>

                <div className="mt-6 flex items-center gap-2 text-[#ff4500] font-mono font-bold transition-transform duration-300 group-hover:translate-x-2">
                  <span className="text-xs tracking-wider uppercase">VER ESTADO DE DESARROLLO</span>
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
