import React, { useState } from 'react';
import { motion } from 'motion/react';
import { RoutePage } from '../types';
import { useAuth } from '../context/AuthContext';
import countachClassicImg from '../assets/images/countach_vintage_classic_1787273941197.jpg';
import { xj220Images } from '../data/xj220Data';
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
  ArrowRight, 
  ChevronRight, 
  Users,
  Volume2,
  Compass,
  Zap,
  Gauge
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
      tag: 'NUEVO ESTRENO // VENENO ANALÓGICO V8',
      watermark: 'SHELBY COBRA',
      badge: 'ESTRENO #010',
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
      tag: 'NUEVO ESTRENO // MONOLITO INDESTRUCTIBLE',
      watermark: 'TOYOTA HILUX',
      badge: 'ESTRENO #011',
      description:
        'El patrón indiscutible de la resistencia mecánica y la supervivencia humana con más de 19 millones de unidades en 180 países. Del motor 22R invulnerable al colapso de 23 pisos en Top Gear, la expedición al Polo Sur a -50°C y las victorias en el Rally Dakar.',
    },
  ];

  const currentHeroDoc = featuredPremieres[activeFeaturedIdx];

  return (
    <div className="min-h-screen bg-[#070709] text-[#f1f5f9] flex flex-col justify-between selection:bg-[#334155] selection:text-white pb-24 md:pb-0">
      
      {/* ========================================================= */}
      {/* MOBILE INTERFACE (< md screens) */}
      {/* ========================================================= */}
      <div className="md:hidden flex flex-col w-full pb-20">
        {/* Fixed Header */}
        <header className="fixed top-0 left-0 w-full z-50 px-4 py-3 bg-[#070709]/90 backdrop-blur-xl border-b border-white/10 flex items-center justify-between">
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

        {/* Featured Hero */}
        <section className="relative w-full min-h-[540px] flex flex-col justify-end pb-8 pt-20">
          <div className="absolute inset-0 z-0">
            <img 
              src={currentHeroDoc.image} 
              alt={currentHeroDoc.title} 
              className="w-full h-full object-cover object-center transition-all duration-700 opacity-60"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#070709]/90 via-[#070709]/60 to-[#070709]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/80 to-transparent" />
          </div>

          <div className="relative z-10 w-full px-5 flex flex-col items-center text-center space-y-3.5">
            {/* Quick Mobile Premiere Switcher */}
            <div className="flex items-center gap-1.5 p-1 bg-[#101017]/80 backdrop-blur-md rounded-full border border-white/15 max-w-full overflow-x-auto">
              {featuredPremieres.map((doc, idx) => (
                <button
                  key={doc.id}
                  onClick={() => setActiveFeaturedIdx(idx)}
                  className={`px-3 py-1 text-[10px] font-mono font-bold uppercase rounded-full transition-all whitespace-nowrap cursor-pointer ${
                    activeFeaturedIdx === idx
                      ? 'bg-white text-black shadow-md font-extrabold'
                      : 'text-[#94a3b8] hover:text-white bg-transparent'
                  }`}
                >
                  #{doc.number} {doc.id === 'shelby-cobra' ? 'Shelby Cobra' : 'Toyota Hilux'}
                </button>
              ))}
            </div>

            <div className="flex flex-col items-center gap-1">
              <span className="px-2.5 py-0.5 bg-white/10 text-[#e2e8f0] text-[9px] font-mono font-bold tracking-widest uppercase rounded border border-white/15">
                {currentHeroDoc.tag.split('//')[0]}
              </span>
              <span className="text-[10px] font-mono text-[#94a3b8] font-medium tracking-widest uppercase mt-0.5">
                {currentHeroDoc.origin}
              </span>
            </div>
            
            <h1 className="text-3xl font-black text-white tracking-tight uppercase leading-[0.95]">
              {currentHeroDoc.title}
            </h1>
            
            <p className="text-xs text-[#94a3b8] max-w-[310px] leading-relaxed line-clamp-2">
              {currentHeroDoc.description}
            </p>
            
            <div className="flex items-center gap-2.5 w-full max-w-[320px] pt-1">
              <button
                onClick={() => onNavigate(currentHeroDoc.id)}
                className="flex-1 py-3 bg-white text-black font-extrabold text-[11px] tracking-wider uppercase rounded-xl transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-lg cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-black" />
                <span>Escuchar o Leer</span>
              </button>
              <button
                onClick={() => onNavigate('documentales')}
                className="flex-1 py-3 bg-white/5 backdrop-blur-sm border border-white/15 text-white font-bold text-xs tracking-wider uppercase rounded-xl transition-all flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#cbd5e1]" />
                <span>Catálogo</span>
              </button>
            </div>
          </div>
        </section>

        {/* Quick Nav: Datos Curiosos, Foro & Admin */}
        <section className="px-4 py-4 grid grid-cols-2 gap-3">
          <div
            onClick={() => onNavigate('datos')}
            className="p-4 bg-[#0d0d14] hover:bg-[#12121c] border border-white/10 rounded-2xl flex items-center justify-between active:scale-95 transition-all cursor-pointer shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-tight">Datos</h3>
                <p className="text-[10px] font-mono text-[#94a3b8] mt-0.5">20 Récords</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-white/40" />
          </div>

          <div
            onClick={() => onNavigate('foro')}
            className="p-4 bg-[#0d0d14] hover:bg-[#12121c] border border-white/10 rounded-2xl flex items-center justify-between active:scale-95 transition-all cursor-pointer shadow-lg"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-tight">AutoChat</h3>
                <p className="text-[10px] font-mono text-[#94a3b8] mt-0.5">En Obras</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-white/40" />
          </div>

          {isAdmin && (
            <div
              onClick={() => onNavigate('admin-panel')}
              className="col-span-2 p-4 bg-[#14141d] hover:bg-[#1a1a26] border border-white/20 rounded-2xl flex items-center justify-between active:scale-95 transition-all cursor-pointer shadow-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white uppercase tracking-tight">Admin Panel</h3>
                  <p className="text-[10px] font-mono text-[#94a3b8] mt-0.5">Gestión de usuarios</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-white/60" />
            </div>
          )}
        </section>

        {/* Newsletter Section Mobile */}
        <section className="px-4 py-4">
          <div className="p-6 bg-[#0c0c12] border border-white/10 rounded-2xl flex flex-col items-center text-center space-y-3.5 shadow-xl">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-widest">Avisos Oficiales</h3>
              <p className="text-[11px] text-[#94a3b8] mt-1.5 leading-relaxed max-w-xs">
                Suscríbete para recibir notificaciones cuando se publiquen nuevos documentales históricos.
              </p>
            </div>
            {isAdmin ? (
              <button
                onClick={onOpenBroadcastModal}
                className="w-full py-3 mt-1 bg-white text-black text-[11px] font-mono font-bold uppercase rounded-xl active:scale-95 transition-transform cursor-pointer"
              >
                Enviar Novedad
              </button>
            ) : user ? (
              <div className="w-full py-3 mt-1 bg-white/5 border border-white/15 text-[#e2e8f0] text-[11px] font-mono font-bold uppercase rounded-xl">
                Suscripción Activa
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="w-full py-3 mt-1 bg-white text-black text-[11px] font-mono font-bold uppercase rounded-xl active:scale-95 transition-transform cursor-pointer shadow-lg"
              >
                Suscribir Mi Correo
              </button>
            )}
          </div>
        </section>

        {/* Mobile Footer */}
        <footer className="px-4 py-8 text-center pb-12">
          <p className="text-[10px] font-mono text-[#64748b] uppercase tracking-[0.25em] leading-relaxed">
            AUTOARCHIVE © 2026<br/>
            Archivo de Superdeportivos y Clásicos
          </p>
        </footer>
      </div>

      {/* ========================================================= */}
      {/* DESKTOP / LAPTOP INTERFACE (>= md screens) */}
      {/* ========================================================= */}
      <div className="hidden md:flex flex-col flex-1">
        
        {/* Top Minimal Luxury Archival Ticker */}
        <div className="bg-[#050507] border-b border-white/10 px-6 sm:px-12 md:px-20 py-2.5 flex items-center justify-between text-[11px] font-mono text-[#94a3b8]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-white font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block" />
              <span>SERVIDOR EDITORIAL ACTIVO</span>
            </span>
            <span className="text-white/20">|</span>
            <span className="text-[#cbd5e1]">11 MONOGRAFÍAS COMPLETAS</span>
            <span className="text-white/20">|</span>
            <span className="text-[#e2e8f0]">ESTRENOS: SHELBY COBRA 427 & TOYOTA HILUX 4X4</span>
            <span className="text-white/20">|</span>
            <span className="text-[#94a3b8]">HISTORIA & ESPECIFICACIONES REALES</span>
          </div>

          <div className="flex items-center gap-4 text-[#94a3b8]">
            <span className="flex items-center gap-1.5 text-white/80">
              <Volume2 className="w-3.5 h-3.5 text-white" />
              <span>NARRACIÓN DE AUDIO HI-RES</span>
            </span>
          </div>
        </div>

        {/* Desktop Header */}
        <header className="sticky top-0 z-40 flex items-center justify-between px-6 sm:px-12 md:px-20 py-4 border-b border-white/10 bg-[#070709]/95 backdrop-blur-xl">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center text-left group hover:scale-[1.01] transition-all cursor-pointer"
            aria-label="Ir al Inicio de AutoArchive"
          >
            <Logo size="md" />
          </button>

          <div className="flex items-center gap-6 lg:gap-8 text-[12px] font-mono font-bold tracking-[0.18em] uppercase">
            <button
              id="nav-link-doc-btn"
              onClick={() => onNavigate('documentales')}
              className="text-[#94a3b8] hover:text-white transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
            >
              <span className="text-[10px] text-white/90 bg-white/10 px-2 py-0.5 rounded border border-white/15">01</span>
              <span>Documentales</span>
            </button>

            <button
              id="nav-link-datos-btn"
              onClick={() => onNavigate('datos')}
              className="text-[#94a3b8] hover:text-white transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
            >
              <span className="text-[10px] text-white/90 bg-white/10 px-2 py-0.5 rounded border border-white/15">02</span>
              <span>Datos Curiosos</span>
            </button>

            <button
              id="nav-link-foro-btn"
              onClick={() => onNavigate('foro')}
              className="text-[#94a3b8] hover:text-white transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
            >
              <span className="text-[10px] text-white/90 bg-white/10 px-2 py-0.5 rounded border border-white/15">03</span>
              <span>AutoChat</span>
            </button>

            {isAdmin && (
              <button
                id="nav-link-admin-btn"
                onClick={() => onNavigate('admin-panel')}
                className="text-white hover:text-white transition-all hover:scale-105 flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1.5 rounded cursor-pointer"
              >
                <span className="text-[10px] font-mono text-white/80">04</span>
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
        <section className="relative min-h-[82vh] flex flex-col justify-between px-6 sm:px-12 md:px-20 pt-12 pb-12 overflow-hidden border-b border-white/10 bg-[#070709]">
          {/* Background Image & Texture */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img
              src={currentHeroDoc.image}
              alt={currentHeroDoc.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center opacity-40 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/75 to-[#070709]/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070709] via-[#070709]/90 to-transparent" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          </div>

          {/* Ambient Monogram Watermark */}
          <div
            aria-hidden="true"
            className="absolute right-[-2vw] top-1/2 -translate-y-1/2 text-[clamp(80px,14vw,220px)] font-black text-white/[0.02] select-none pointer-events-none tracking-tighter font-mono uppercase"
          >
            {currentHeroDoc.watermark}
          </div>

          {/* Premiere Selector Tabs */}
          <div className="relative z-10 flex flex-wrap items-center gap-2 mb-6 p-1.5 bg-[#0d0d12]/90 backdrop-blur-xl rounded-2xl border border-white/15 max-w-fit shadow-2xl">
            <span className="px-3.5 py-1 text-[10px] font-mono font-bold uppercase text-[#94a3b8] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-white/80" />
              <span>ESTRENOS DESTACADOS:</span>
            </span>
            {featuredPremieres.map((doc, idx) => (
              <button
                key={doc.id}
                onClick={() => setActiveFeaturedIdx(idx)}
                className={`px-4 py-2 text-xs font-mono font-bold uppercase rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
                  activeFeaturedIdx === idx
                    ? 'bg-white text-black font-extrabold shadow-lg scale-105'
                    : 'text-[#94a3b8] hover:text-white bg-white/5 hover:bg-white/10'
                }`}
              >
                <span>#{doc.number}</span>
                <span>{doc.id === 'shelby-cobra' ? 'Shelby Cobra 427' : 'Toyota Hilux 4x4'}</span>
                {activeFeaturedIdx === idx && <ChevronRight className="w-3.5 h-3.5 text-black" />}
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
                <span className="px-3 py-1 bg-white/10 text-white text-[10px] font-bold font-mono tracking-widest uppercase rounded shadow-lg border border-white/20">
                  {currentHeroDoc.tag}
                </span>

                <span className="px-3 py-1 bg-white/5 border border-white/15 text-[10px] font-mono tracking-widest text-[#cbd5e1] font-bold uppercase flex items-center gap-1.5 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span>EXPEDIENTE #{currentHeroDoc.number}</span>
                </span>

                <span className="px-2.5 py-1 bg-black/50 border border-white/10 text-[10px] font-mono text-[#94a3b8] rounded">
                  ⚙ {currentHeroDoc.engine.split('/')[0]}
                </span>
                <span className="px-2.5 py-1 bg-black/50 border border-white/10 text-[10px] font-mono text-[#cbd5e1] rounded">
                  ⚡ {currentHeroDoc.power.split('/')[0]}
                </span>
              </div>

              <div>
                <span className="text-xs font-mono tracking-[0.25em] text-[#94a3b8] uppercase block mb-1">
                  {currentHeroDoc.era} // {currentHeroDoc.origin}
                </span>
                <h1 className="text-[clamp(34px,5vw,64px)] font-black tracking-tight leading-[0.95] text-white uppercase max-w-3xl">
                  {currentHeroDoc.title}
                </h1>
              </div>

              <p className="max-w-2xl text-[#94a3b8] text-sm sm:text-base leading-relaxed font-light">
                {currentHeroDoc.description}
              </p>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  id={`hero-read-doc-${currentHeroDoc.id}`}
                  onClick={() => onNavigate(currentHeroDoc.id)}
                  className="px-8 py-4 bg-white hover:bg-[#e2e8f0] text-black text-xs font-mono font-extrabold tracking-[0.16em] uppercase rounded-xl transition-all shadow-[0_10px_30px_rgba(255,255,255,0.15)] flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-black" />
                  <span>LEER O ESCUCHAR DOCUMENTAL COMPLETO</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigate('documentales')}
                  className="px-6 py-4 border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 text-white text-xs font-mono font-bold tracking-wider uppercase rounded-xl transition-all backdrop-blur-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-[#cbd5e1]" />
                  <span>VER CATÁLOGO COMPLETO (11)</span>
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Bottom Scroll Indicator */}
          <div className="relative z-10 pt-10 flex items-center justify-between text-xs font-mono text-[#94a3b8]">
            <button
              onClick={scrollToContent}
              className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer text-[11px]"
            >
              <span>EXPLORAR NUEVOS ESTRENOS Y CATÁLOGO</span>
              <ChevronRight className="w-4 h-4 text-white rotate-90" />
            </button>
            <span className="text-white/30 hidden lg:inline">11 GRANDES MONOGRAFÍAS · AUDIO HI-RES · ESPACIO EDITORIAL</span>
          </div>
        </section>

        {/* ========================================================= */}
        {/* DUAL PREMIERES HIGHLIGHT */}
        {/* ========================================================= */}
        <section className="px-6 sm:px-12 md:px-20 py-14 bg-[#0a0a0f] border-b border-white/10 relative">
          <div className="max-w-7xl mx-auto space-y-7">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#94a3b8] uppercase">
                    LANZAMIENTOS EDITORIALES // AUTOARCHIVE 2026
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight mt-1">
                  Nuevos Estrenos Exclusivos
                </h2>
              </div>
              <button
                onClick={() => onNavigate('documentales')}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/15 text-[#cbd5e1] hover:text-white text-xs font-mono font-bold uppercase rounded-xl transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer"
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
                className="group relative bg-[#0d0d14] border border-white/15 hover:border-white/40 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col justify-between"
              >
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-black">
                  <img
                    src={shelbyCobraImages.hero}
                    alt="Shelby Cobra 427"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-[#0d0d14]/40 to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 bg-white text-black font-mono font-extrabold text-[10px] uppercase rounded-md shadow-lg">
                      NUEVO ESTRENO #010
                    </span>
                    <span className="px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/20 text-[#e2e8f0] font-mono text-[10px] font-bold rounded-md">
                      485 CV · 7.0L V8
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-2 rounded-full border border-white/10 text-white/70 group-hover:text-white transition-colors">
                    <Volume2 className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-6 pt-2 space-y-3">
                  <div className="flex items-center justify-between font-mono text-[11px] text-[#94a3b8]">
                    <span>1962 — 1967 // USA & UK</span>
                    <span className="text-white font-bold">298 KM/H</span>
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase group-hover:text-[#e2e8f0] transition-colors">
                    Shelby Cobra 427 S/C
                  </h3>
                  <p className="text-xs text-[#94a3b8] leading-relaxed line-clamp-2">
                    El veneno analógico de Carroll Shelby que derrotó a Ferrari en el Mundial FIA 1965. Motor 427 FE Big Block de 7 litros, chasis de 4 pulgadas y aceleración brutal de 0-100 en 3.8 segundos.
                  </p>
                  <div className="pt-2 flex items-center justify-between font-mono text-xs font-bold text-white">
                    <span className="uppercase tracking-wider">LEER DOCUMENTAL COMPLETO</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Card 2: Toyota Hilux */}
              <div 
                onClick={() => onNavigate('toyota-hilux')}
                className="group relative bg-[#0d0d14] border border-white/15 hover:border-white/40 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col justify-between"
              >
                <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-black">
                  <img
                    src={toyotaHiluxImages.hero}
                    alt="Toyota Hilux 4x4"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-[#0d0d14]/40 to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 bg-white text-black font-mono font-extrabold text-[10px] uppercase rounded-md shadow-lg">
                      NUEVO ESTRENO #011
                    </span>
                    <span className="px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/20 text-[#e2e8f0] font-mono text-[10px] font-bold rounded-md">
                      INDESTRUCTIBLE · 4X4
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md p-2 rounded-full border border-white/10 text-white/70 group-hover:text-white transition-colors">
                    <Volume2 className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-6 pt-2 space-y-3">
                  <div className="flex items-center justify-between font-mono text-[11px] text-[#94a3b8]">
                    <span>1968 — PRESENTE // JAPÓN</span>
                    <span className="text-white font-bold">TOP GEAR & DAKAR</span>
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase group-hover:text-[#e2e8f0] transition-colors">
                    Toyota Hilux 4x4
                  </h3>
                  <p className="text-xs text-[#94a3b8] leading-relaxed line-clamp-2">
                    El monolito indestructible de la resistencia automotriz. Más de 19 millones de unidades vendidas, el chasis invulnerable ante demoliciones de edificios, expediciones árticas y dominio absoluto en el Dakar.
                  </p>
                  <div className="pt-2 flex items-center justify-between font-mono text-xs font-bold text-white">
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
          className="px-6 sm:px-12 md:px-20 py-20 bg-[#070709] text-[#f1f5f9] relative overflow-hidden border-b border-white/10"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          
          <div className="relative z-10 flex items-center justify-between pb-4 mb-8 border-b border-white/10 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
              <span className="font-bold tracking-[0.25em] text-white uppercase">
                AUTOARCHIVE // COLECCIONES EDITORIALES PRINCIPALES
              </span>
            </div>
            <span className="text-white/40 hidden sm:inline">ACCESO DIRECTO A LOS TRES PILARES DE LA PLATAFORMA</span>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-8 items-end pb-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-0.5 bg-white" />
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#94a3b8] font-mono">
                  EXPLORA NUESTRO CONTENIDO
                </span>
              </div>
              <h2 className="text-[clamp(30px,4.5vw,56px)] font-black tracking-tight leading-[0.95] text-white uppercase">
                Los 3 Universos de AutoArchive
              </h2>
            </div>
            <div>
              <p className="text-sm sm:text-base text-[#94a3b8] leading-relaxed max-w-xl font-light">
                Cada sección conserva una retícula editorial meticulosa que profundiza en crónicas históricas, especificaciones mecánicas reales, planos técnicos y curiosidades desclasificadas.
              </p>
            </div>
          </div>

          {/* 3 Core Cards with Luxury Minimal Polish */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            
            {/* 01 DOCUMENTALES */}
            <div
              id="card-documentales"
              onClick={() => onNavigate('documentales')}
              className="group relative min-h-[400px] p-7 overflow-hidden text-[#f1f5f9] bg-[#0c0c12] border border-white/15 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:border-white/40 flex flex-col justify-between rounded-2xl"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white via-white/50 to-transparent" />
              <div className="absolute right-0 bottom-0 w-3/4 opacity-15 pointer-events-none group-hover:opacity-30 group-hover:scale-105 transition-all duration-500">
                <img
                  src={xj220Images.hero}
                  alt="Superdeportivo"
                  referrerPolicy="no-referrer"
                  className="w-full object-contain"
                />
              </div>
              <span
                aria-hidden="true"
                className="absolute right-[-10px] bottom-[-40px] text-[clamp(100px,12vw,180px)] font-black tracking-[-0.12em] leading-none text-white/[0.03] pointer-events-none select-none font-mono"
              >
                01
              </span>

              <div className="relative z-10 flex items-center justify-between">
                <div className="inline-grid place-items-center w-11 h-11 border border-white/20 bg-white/5 rounded-xl text-xs font-black font-mono tracking-widest text-white shadow-sm">
                  01
                </div>
                <span className="px-3 py-1 bg-white/10 border border-white/20 text-[10px] tracking-[0.2em] font-bold text-white uppercase font-mono rounded-full">
                  11 DOCUMENTALES
                </span>
              </div>

              <div className="relative z-10 mt-6">
                <span className="block text-[10px] font-bold tracking-[0.25em] text-[#94a3b8] uppercase font-mono">
                  EXPEDIENTE EDITORIAL // 01
                </span>
                <h3 className="mt-1 text-2xl lg:text-3xl font-black tracking-tight leading-none group-hover:text-white transition-colors uppercase">
                  DOCUMENTALES
                </h3>
                <p className="mt-3 text-[#94a3b8] text-xs leading-relaxed">
                  Historias completas de superdeportivos míticos, leyendas todoterreno, monoplazas de Gran Premio, telemetría y narración de audio interactiva.
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5 font-mono text-[9px]">
                  <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-white font-medium rounded">SHELBY COBRA 427</span>
                  <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-white font-medium rounded">TOYOTA HILUX 4X4</span>
                  <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-[#94a3b8] rounded">HISTORIA F1</span>
                  <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-[#94a3b8] rounded">MAZDA 787B</span>
                </div>

                <div className="mt-6 flex items-center gap-2 text-white font-mono font-bold transition-transform duration-300 group-hover:translate-x-2">
                  <span className="text-xs tracking-wider uppercase">ENTRAR AL CATÁLOGO</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* 02 DATOS CURIOSOS */}
            <div
              id="card-datos-curiosos"
              onClick={() => onNavigate('datos')}
              className="group relative min-h-[400px] p-7 overflow-hidden text-[#f1f5f9] bg-[#0c0c12] border border-white/15 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:border-white/40 flex flex-col justify-between rounded-2xl"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#cbd5e1] via-[#94a3b8] to-transparent" />
              <div className="absolute right-0 bottom-0 w-3/4 opacity-15 pointer-events-none group-hover:opacity-30 group-hover:scale-105 transition-all duration-500">
                <img
                  src={countachClassicImg}
                  alt="Lamborghini Countach Clásico"
                  referrerPolicy="no-referrer"
                  className="w-full object-contain"
                />
              </div>
              <span
                aria-hidden="true"
                className="absolute right-[-10px] bottom-[-40px] text-[clamp(100px,12vw,180px)] font-black tracking-[-0.12em] leading-none text-white/[0.03] pointer-events-none select-none font-mono"
              >
                02
              </span>

              <div className="relative z-10 flex items-center justify-between">
                <div className="inline-grid place-items-center w-11 h-11 border border-white/20 bg-white/5 rounded-xl text-xs font-black font-mono tracking-widest text-white shadow-sm">
                  02
                </div>
                <span className="px-3 py-1 bg-white/10 border border-white/20 text-[10px] tracking-[0.2em] font-bold text-white uppercase font-mono rounded-full">
                  20 EXPEDIENTES
                </span>
              </div>

              <div className="relative z-10 mt-6">
                <span className="block text-[10px] font-bold tracking-[0.25em] text-[#94a3b8] uppercase font-mono">
                  EXPEDIENTE EDITORIAL // 02
                </span>
                <h3 className="mt-1 text-2xl lg:text-3xl font-black tracking-tight leading-none group-hover:text-white transition-colors uppercase">
                  DATOS CURIOSOS
                </h3>
                <p className="mt-3 text-[#94a3b8] text-xs leading-relaxed">
                  Prototipos camuflados, soluciones extremas de taller, secretos de ingeniería, contratos secretos y récords insólitos.
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5 font-mono text-[9px]">
                  <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-white rounded">20 TARJETAS</span>
                  <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-[#94a3b8] rounded">349.4 KM/H</span>
                  <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-[#94a3b8] rounded">WANKEL 787B</span>
                </div>

                <div className="mt-6 flex items-center gap-2 text-white font-mono font-bold transition-transform duration-300 group-hover:translate-x-2">
                  <span className="text-xs tracking-wider uppercase">EXPLORAR CURIOSIDADES</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* 03 AUTOCHAT / EN TRABAJO */}
            <div
              id="card-foro-community"
              onClick={() => onNavigate('foro')}
              className="group relative min-h-[400px] p-7 overflow-hidden text-[#f1f5f9] bg-[#0c0c12] border border-white/15 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:border-white/40 flex flex-col justify-between rounded-2xl"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white/80 via-white/30 to-transparent" />
              <span
                aria-hidden="true"
                className="absolute right-[-10px] bottom-[-40px] text-[clamp(100px,12vw,180px)] font-black tracking-[-0.12em] leading-none text-white/[0.03] pointer-events-none select-none font-mono"
              >
                03
              </span>

              <div className="relative z-10 flex items-center justify-between">
                <div className="inline-grid place-items-center w-11 h-11 border border-white/20 bg-white/5 rounded-xl text-xs font-black font-mono tracking-widest text-white shadow-sm">
                  03
                </div>
                <span className="px-3 py-1 bg-white/10 border border-white/20 text-[10px] tracking-[0.2em] font-extrabold text-white uppercase font-mono rounded-full">
                  ¡TRABAJANDO EN ELLO!
                </span>
              </div>

              <div className="relative z-10 mt-6">
                <span className="block text-[10px] font-bold tracking-[0.25em] text-[#94a3b8] uppercase font-mono">
                  MÓDULO EN DESARROLLO // 03
                </span>
                <h3 className="mt-1 text-2xl lg:text-3xl font-black tracking-tight leading-none group-hover:text-white transition-colors uppercase">
                  AutoChat
                </h3>
                <p className="mt-3 text-[#94a3b8] text-xs leading-relaxed">
                  ¡Estamos trabajando en ello! Sección temporalmente en mantenimiento para incorporar mejoras técnicas y mayor rendimiento.
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5 font-mono text-[9px]">
                  <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-white font-bold rounded">EN OBRAS</span>
                  <span className="px-2 py-0.5 bg-white/5 border border-white/10 text-[#94a3b8] rounded">PRÓXIMAMENTE</span>
                </div>

                <div className="mt-6 flex items-center gap-2 text-white font-mono font-bold transition-transform duration-300 group-hover:translate-x-2">
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
                className="group relative min-h-[380px] p-7 overflow-hidden text-[#f1f5f9] bg-[#0f0f18] border border-white/20 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:border-white/50 md:col-span-3 flex flex-col justify-between rounded-2xl mt-4"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white via-white/40 to-transparent" />

                <div className="relative z-10 flex items-center justify-between">
                  <div className="inline-grid place-items-center w-11 h-11 border border-white/30 bg-white/10 rounded-xl text-xs font-black font-mono tracking-widest text-white">
                    04
                  </div>
                  <span className="px-3 py-1 bg-white/10 border border-white/20 text-[10px] tracking-[0.2em] font-bold text-white uppercase font-mono flex items-center gap-1.5 rounded-full">
                    <ShieldCheck className="w-3.5 h-3.5 text-white" />
                    EXCLUSIVO ADMINISTRACIÓN
                  </span>
                </div>

                <div className="relative z-10 mt-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <span className="block text-[10px] font-bold tracking-[0.25em] text-[#94a3b8] uppercase font-mono">
                      PANEL DE CONTROL // 04
                    </span>
                    <h3 className="mt-1 text-2xl sm:text-3xl font-black tracking-tight group-hover:text-white transition-colors uppercase">
                      ADMINISTRACIÓN & BOLETINES
                    </h3>
                    <p className="mt-2 text-[#94a3b8] text-xs leading-relaxed max-w-xl">
                      Gestión de los {subscribersCount} suscriptores inscritos, historial de boletines enviados y emisión de nuevos correos oficiales desde autonoticiascontacto@gmail.com.
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-white font-mono font-bold shrink-0">
                    <span className="text-xs tracking-wider uppercase">ABRIR PANEL PRIVADO</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Editorial Manifesto Quote */}
          <div className="relative z-10 mt-12 p-8 bg-[#0d0d14] border border-white/15 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-12 h-12 bg-white text-black flex items-center justify-center font-serif-luxury text-3xl font-black rounded-xl flex-shrink-0 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              “
            </div>
            <div className="flex-1 space-y-1">
              <blockquote className="text-sm italic text-[#cbd5e1] leading-relaxed">
                «Preservar la historia del automóvil no es solo recordar cifras de potencia, sino comprender las decisiones mecánicas, la pasión sin filtros y la valentía analógica con la que cada máquina superó sus propios límites.»
              </blockquote>
              <p className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#94a3b8] uppercase pt-1">
                — MANIFIESTO EDITORIAL AUTOARCHIVE
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* NEWSLETTER & CORREO DIRECTO SECTION */}
        {/* ========================================================= */}
        <section className="px-6 sm:px-12 md:px-20 py-16 bg-[#050507] border-b border-white/10 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-white/[0.02] blur-3xl pointer-events-none" />
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 relative z-10">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/5 border border-white/15 rounded-full text-[11px] font-mono font-bold tracking-widest text-[#cbd5e1] uppercase mb-4">
                <Mail className="w-3.5 h-3.5 text-white" />
                <span>AVISOS OFICIALES AL CORREO ELECTRÓNICO</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-white leading-tight">
                Recibe las novedades en tu correo desde <span className="text-white underline decoration-white/30 underline-offset-4">autonoticiascontacto@gmail.com</span>
              </h3>
              <p className="text-sm text-[#94a3b8] mt-3 leading-relaxed">
                Al suscribirte, recibirás una notificación directa en tu dirección de correo cada vez que se publique un nuevo documental o se desclasifiquen nuevos expedientes del automovilismo clásico.
              </p>
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto">
              {isAdmin ? (
                <button
                  id="home-admin-send-novedades-btn"
                  type="button"
                  onClick={onOpenBroadcastModal}
                  className="w-full lg:w-auto px-7 py-4 bg-white hover:bg-[#e2e8f0] text-black font-mono text-xs sm:text-sm font-extrabold tracking-widest uppercase rounded-xl transition-all shadow-xl flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer text-center"
                >
                  <Sparkles className="w-4 h-4 text-black shrink-0" />
                  <span>¡HAY NOVEDADES EN AUTOARCHIVE!</span>
                  <Send className="w-4 h-4 text-black shrink-0" />
                </button>
              ) : user ? (
                <div className="w-full px-6 py-4 bg-[#0d0d14] border border-white/15 rounded-xl text-center">
                  <div className="text-xs font-mono text-white font-bold flex items-center justify-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-white" />
                    <span>SUSCRIPCIÓN ACTIVA</span>
                  </div>
                  <div className="text-[11px] font-mono text-[#94a3b8] mt-1 truncate">
                    Recibiendo en: <strong className="text-white">{user.email}</strong>
                  </div>
                </div>
              ) : (
                <button
                  id="home-subscribe-cta-btn"
                  onClick={onOpenAuthModal}
                  className="w-full lg:w-auto px-7 py-4 bg-white hover:bg-[#e2e8f0] text-black font-mono text-xs font-extrabold tracking-wider uppercase rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 hover:scale-[1.02] text-center cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-black shrink-0" />
                  <span>SUSCRIBIR MI CORREO ELECTRÓNICO</span>
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 sm:px-12 md:px-20 py-8 bg-[#050507] text-[#94a3b8] text-[11px] tracking-[0.2em] border-t border-white/10 font-mono text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="text-white font-bold tracking-widest">AUTOARCHIVE</span>
            <span className="text-white/20">|</span>
            <span>ARCHIVO DE SUPERDEPORTIVOS CLÁSICOS</span>
          </div>
          <p className="text-right text-[#64748b]">
            © 2026 — Edición Histórica y Documental
          </p>
        </footer>
      </div>
    </div>
  );
};
