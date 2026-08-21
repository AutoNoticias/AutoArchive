import React, { useState } from 'react';
import { RoutePage } from '../types';
import vintageSupercarsHero from '../assets/images/vintage_supercar_hero_1787273928020.jpg';
import countachClassicImg from '../assets/images/countach_vintage_classic_1787273941197.jpg';
import { xj220Images } from '../data/xj220Data';

interface HomePageProps {
  onNavigate: (page: RoutePage) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [activeCarTab, setActiveCarTab] = useState<number>(0);

  const scrollToContent = () => {
    const el = document.getElementById('explore-sections');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const vintageIcons = [
    {
      id: 'f40-miura',
      title: 'Ferrari F40 & Lamborghini Miura SV',
      era: '1971 — 1987',
      origin: 'Maranello & Sant’Agata Bolognese, Italia',
      engine: 'V12 3.9L Atmosférico / V8 2.9L Biturbo',
      power: '385 PS · 478 PS',
      topSpeed: '290 km/h · 324 km/h',
      image: vintageSupercarsHero,
      tag: 'ERA DORADA VINTAGE',
      description:
        'Desde el nacimiento del concepto de superdeportivo con el Miura de Bertone y Marcello Gandini, hasta la última obra maestra analógica supervisada por Enzo Ferrari.',
    },
    {
      id: 'countach',
      title: 'Lamborghini Countach LP400 Periscopio',
      era: '1974 — 1990',
      origin: 'Sant’Agata Bolognese, Italia',
      engine: 'V12 Bizzarrini 3.9L DOHC',
      power: '375 PS',
      topSpeed: '290 km/h',
      image: countachClassicImg,
      tag: 'DISEÑO DE CUÑA (WEDGE ERA)',
      description:
        'La silueta futurista que definió una generación con puertas de tijera, chasis tubular y un túnel periscópico esculpido en el techo para la retrovisión.',
    },
    {
      id: 'xj220',
      title: 'Jaguar XJ220 Supercar',
      era: '1992 — 1994',
      origin: 'Bloxham, Oxfordshire, Reino Unido',
      engine: 'JRV-6 3.5L Biturbo 24V',
      power: '550 PS',
      topSpeed: '349.4 km/h (Récord Mundial)',
      image: xj220Images.hero,
      tag: 'RÉCORD MUNDIAL GUINNESS',
      description:
        'Nacido de un grupo clandestino de ingenieros de Jaguar, el felino de aluminio que dominó Nardò y se consagró como el bólido más rápido sobre la tierra.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0e1013] text-[#efefed] flex flex-col justify-between selection:bg-[#d92f31] selection:text-white">
      {/* Top Bar for Desktop */}
      <header className="absolute top-0 left-0 w-full px-6 sm:px-12 md:px-24 py-6 flex items-center justify-between z-30 border-b border-white/10 bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-sm">
        <button
          id="home-brand-logo-btn"
          onClick={() => onNavigate('home')}
          className="text-left text-sm sm:text-base font-bold tracking-[0.22em] uppercase text-white hover:tracking-[0.25em] transition-all flex items-center gap-2.5"
        >
          <span className="w-2.5 h-2.5 bg-[#d92f31] inline-block shadow-[0_0_12px_#d92f31]" />
          <span>Auto<strong className="text-[#a5abb5]">Archive</strong></span>
        </button>

        <div className="hidden md:flex items-center gap-8 text-[11px] font-semibold tracking-[0.2em] uppercase">
          <button
            id="nav-link-doc-btn"
            onClick={() => onNavigate('documentales')}
            className="text-[#9da0a5] hover:text-[#4ea0ff] transition-colors flex items-center gap-2"
          >
            <span className="text-[9px] font-mono text-[#4ea0ff]">01</span>
            <span>Documentales</span>
          </button>
          <button
            id="nav-link-datos-btn"
            onClick={() => onNavigate('datos')}
            className="text-[#9da0a5] hover:text-[#ffd451] transition-colors flex items-center gap-2"
          >
            <span className="text-[9px] font-mono text-[#ffd451]">02</span>
            <span>Datos Curiosos</span>
          </button>
          <button
            onClick={() => onNavigate('countach')}
            className="px-3 py-1 border border-[#ffd451]/40 bg-[#ffd451]/10 text-[#ffd451] text-[10px] hover:bg-[#ffd451] hover:text-black transition-all font-mono font-bold"
          >
            COUNTACH DOC 003 ↗
          </button>
          <button
            onClick={() => onNavigate('f40-miura')}
            className="px-3 py-1 border border-[#d92f31]/40 bg-[#d92f31]/10 text-[#ff7173] text-[10px] hover:bg-[#d92f31] hover:text-white transition-all font-mono"
          >
            F40 & MIURA DOC 002 ↗
          </button>
          <button
            onClick={() => onNavigate('xj220')}
            className="px-3 py-1 border border-[#4ea0ff]/40 bg-[#4ea0ff]/10 text-[#7cbcff] text-[10px] hover:bg-[#4ea0ff] hover:text-black transition-all font-mono"
          >
            XJ220 DOC 001 ↗
          </button>
        </div>
      </header>

      {/* Hero Section with Vintage Supercar Art & Atmospheric Backdrop */}
      <section className="relative min-h-[92vh] flex flex-col justify-center px-6 sm:px-12 md:px-28 pt-28 pb-16 overflow-hidden border-b border-white/10 bg-[#0a0c0f]">
        {/* Background Supercar Hero Photography with moody gradient overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src={vintageSupercarsHero}
            alt="Superdeportivos Clásicos Ferrari F40 y Lamborghini Miura"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-105 opacity-35 mix-blend-screen filter saturate-[0.85] contrast-125"
          />
          {/* Radial & directional vignettes for high editorial contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c0f] via-[#0a0c0f]/80 to-[#0a0c0f]/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c0f] via-[#0a0c0f]/90 to-transparent" />
          <div className="absolute inset-0 grid-blueprint opacity-15 pointer-events-none" />
        </div>

        {/* Decorative architectural watermarks */}
        <div
          aria-hidden="true"
          className="absolute right-[-8vw] top-1/2 -translate-y-1/2 text-[clamp(120px,22vw,320px)] font-black text-white/[0.03] select-none pointer-events-none tracking-tighter"
        >
          1970-90
        </div>

        {/* Left vertical guide line */}
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 left-6 sm:left-12 md:left-28 w-[1px] bg-white/10 pointer-events-none"
        />

        <div className="relative z-10 max-w-5xl pl-2 sm:pl-6">
          {/* Top category badges */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-2.5 py-1 bg-[#d92f31]/20 border border-[#d92f31]/50 text-[#ff7173] text-[9px] font-bold tracking-[0.24em] uppercase font-mono">
              ARCHIVO HISTÓRICO AUTOMOTRIZ
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#8e949e] font-mono hidden sm:inline">
              // CLÁSICOS · INGENIERÍA · MONOGRAFÍAS
            </span>
          </div>

          <h1 className="mt-4 text-[clamp(34px,7.5vw,105px)] font-extrabold tracking-[-0.06em] leading-[0.9] text-[#efefed] break-words drop-shadow-lg">
            AUTOARCHIVE
          </h1>

          <div className="flex items-center gap-3 mt-6 sm:mt-8">
            <div className="w-20 sm:w-32 h-[3px] bg-[#d92f31]" />
            <div className="w-4 h-[3px] bg-white/40" />
            <div className="w-2 h-[3px] bg-white/20" />
          </div>

          <p className="mt-6 max-w-2xl text-[#b5b8be] text-sm sm:text-base leading-relaxed">
            Una colección editorial de libre acceso consagrada a documentar la era dorada de los superdeportivos, las rivalidades históricas de pista y los secretos mecánicos que cambiaron la ingeniería mundial.
          </p>

          {/* Quick Stats Banner on Hero */}
          <div className="mt-8 grid grid-cols-3 gap-4 sm:gap-8 max-w-xl p-4 bg-black/60 border border-white/10 backdrop-blur-md">
            <div>
              <span className="block text-[9px] font-mono text-[#8e949e] uppercase tracking-wider">
                DOCUMENTAL 001
              </span>
              <span className="text-base sm:text-lg font-bold text-white tracking-tight">
                JAGUAR XJ220
              </span>
            </div>
            <div className="border-l border-white/15 pl-4">
              <span className="block text-[9px] font-mono text-[#8e949e] uppercase tracking-wider">
                VELOCIDAD MÁX.
              </span>
              <span className="text-base sm:text-lg font-bold text-[#4ea0ff] tracking-tight">
                349.4 KM/H
              </span>
            </div>
            <div className="border-l border-white/15 pl-4">
              <span className="block text-[9px] font-mono text-[#8e949e] uppercase tracking-wider">
                CURADURÍA
              </span>
              <span className="text-base sm:text-lg font-bold text-[#ffd451] tracking-tight">
                100% ANALÓGICO
              </span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <button
              id="hero-explore-doc-btn"
              onClick={() => onNavigate('documentales')}
              className="px-7 py-3.5 bg-[#d92f31] hover:bg-[#b82325] text-white text-xs font-bold tracking-[0.18em] uppercase transition-all shadow-[0_4px_24px_rgba(217,47,49,0.4)] active:scale-95"
            >
              Explorar Documentales →
            </button>
            <button
              id="hero-scroll-btn"
              onClick={scrollToContent}
              className="px-6 py-3.5 border border-white/20 hover:border-white/50 bg-white/[0.02] text-[#cfd1d5] hover:text-white text-xs font-semibold tracking-[0.16em] uppercase transition-all backdrop-blur-sm"
            >
              Ver Íconos & Secciones ↓
            </button>
          </div>
        </div>

        <button
          id="hero-bottom-scroll-trigger"
          onClick={scrollToContent}
          className="absolute bottom-6 right-6 sm:right-12 md:right-28 flex items-center gap-2 text-[10px] tracking-[0.22em] text-[#b9babd] hover:text-white uppercase transition-colors"
        >
          <span>EXPLORAR ÍCONOS</span>
          <span className="animate-scroll-arrow text-sm">↓</span>
        </button>
      </section>

      {/* Interactive Vintage Supercars Showcase Section */}
      <section className="px-6 sm:px-12 md:px-28 py-20 sm:py-28 bg-[#090b0e] border-b border-white/10 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/10">
            <div>
              <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-[#d92f31] font-mono">
                // ARCHIVO VISUAL DE SUPERDEPORTIVOS
              </span>
              <h2 className="mt-2 text-[clamp(28px,4.5vw,52px)] font-bold tracking-[-0.05em] text-white">
                Íconos de la Era Dorada
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#8a929e] max-w-md leading-relaxed">
              Fotografía y fichas técnicas de las joyas automotrices que definieron la obsesión por la velocidad, el diseño de cuña y los motores sin filtros electrónicos.
            </p>
          </div>

          {/* Supercar Tabs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-8">
            {vintageIcons.map((car, idx) => (
              <button
                key={car.id}
                onClick={() => setActiveCarTab(idx)}
                className={`p-4 text-left border transition-all duration-300 relative overflow-hidden ${
                  activeCarTab === idx
                    ? 'border-[#d92f31] bg-[#d92f31]/10 text-white'
                    : 'border-white/10 bg-white/[0.02] text-[#8e949e] hover:border-white/30 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                  <span className={activeCarTab === idx ? 'text-[#ff6b6d] font-bold' : 'text-[#616874]'}>
                    0{idx + 1} // {car.era}
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-white/40">
                    {car.tag.split(' ')[0]}
                  </span>
                </div>
                <h3 className="font-bold text-sm sm:text-base tracking-tight truncate text-white">
                  {car.title}
                </h3>
              </button>
            ))}
          </div>

          {/* Active Vintage Supercar Feature Card */}
          {vintageIcons[activeCarTab] && (
            <div className="border border-white/15 bg-[#101318] p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              {/* Technical CAD grid background */}
              <div className="absolute inset-0 grid-blueprint opacity-10 pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                {/* Visual Image container */}
                <div className="lg:col-span-7 relative group overflow-hidden border border-white/20 bg-black">
                  <div className="absolute top-3 left-3 z-20 px-2.5 py-1 bg-black/85 border border-white/30 text-[9px] font-mono tracking-widest text-[#d92f31] uppercase">
                    {vintageIcons[activeCarTab].tag}
                  </div>
                  <img
                    src={vintageIcons[activeCarTab].image}
                    alt={vintageIcons[activeCarTab].title}
                    referrerPolicy="no-referrer"
                    className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Info and specs panel */}
                <div className="lg:col-span-5 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-[#8e949e] uppercase tracking-widest">
                      {vintageIcons[activeCarTab].origin}
                    </span>
                    <h3 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-white">
                      {vintageIcons[activeCarTab].title}
                    </h3>
                    <p className="mt-4 text-xs sm:text-sm text-[#a2a8b2] leading-relaxed">
                      {vintageIcons[activeCarTab].description}
                    </p>
                  </div>

                  {/* Technical Mini-Specs */}
                  <div className="mt-6 pt-6 border-t border-white/10 space-y-2.5 font-mono text-xs">
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-[#6d7582]">MOTOR</span>
                      <span className="text-[#eaeaea] font-medium text-right">{vintageIcons[activeCarTab].engine}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-white/5">
                      <span className="text-[#6d7582]">POTENCIA</span>
                      <span className="text-[#ffd451] font-bold text-right">{vintageIcons[activeCarTab].power}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-[#6d7582]">VELOCIDAD MÁXIMA</span>
                      <span className="text-[#4ea0ff] font-bold text-right">{vintageIcons[activeCarTab].topSpeed}</span>
                    </div>
                  </div>

                  {/* Action button */}
                  <div className="mt-6">
                    {vintageIcons[activeCarTab].id === 'countach' ? (
                      <button
                        onClick={() => onNavigate('countach')}
                        className="w-full py-3 bg-[#ffd451] hover:bg-[#ffbe1a] text-black text-xs font-black tracking-[0.18em] uppercase transition-all shadow-[0_4px_16px_rgba(255,212,81,0.3)]"
                      >
                        LEER DOCUMENTAL 003 (20 CAPÍTULOS) →
                      </button>
                    ) : vintageIcons[activeCarTab].id === 'f40-miura' ? (
                      <button
                        onClick={() => onNavigate('f40-miura')}
                        className="w-full py-3 bg-[#d92f31] hover:bg-[#b82325] text-white text-xs font-bold tracking-[0.18em] uppercase transition-all shadow-lg"
                      >
                        LEER DOCUMENTAL 002 (20 CAPÍTULOS) →
                      </button>
                    ) : vintageIcons[activeCarTab].id === 'xj220' ? (
                      <button
                        onClick={() => onNavigate('xj220')}
                        className="w-full py-3 bg-[#4ea0ff] hover:bg-[#6cb2ff] text-black text-xs font-bold tracking-[0.18em] uppercase transition-all shadow-md"
                      >
                        LEER DOCUMENTAL 001 (20 CAPÍTULOS) →
                      </button>
                    ) : (
                      <button
                        onClick={() => onNavigate('documentales')}
                        className="w-full py-3 bg-white/10 hover:bg-[#ffd451] hover:text-black text-[#eaeaea] text-xs font-bold tracking-[0.18em] uppercase transition-all border border-white/20 hover:border-[#ffd451]"
                      >
                        EXPLORAR EN DOCUMENTALES →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Content Section with the 2 Main Archive Cards */}
      <section
        id="explore-sections"
        className="px-6 sm:px-12 md:px-28 py-20 sm:py-28 md:py-36 bg-[#efefed] text-[#111214]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.2fr] gap-8 items-end pb-12 border-b border-[#111214]/15">
          <div>
            <span className="text-[10px] font-bold tracking-[0.19em] uppercase text-[#74777d]">
              AUTOARCHIVE // CATÁLOGO
            </span>
            <h2 className="mt-3 text-[clamp(36px,5vw,68px)] font-semibold tracking-[-0.055em] leading-[0.98] text-[#111214]">
              Explora el mundo automotriz.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#5c6068] leading-relaxed max-w-xl">
            Cada sección conserva una retícula editorial meticulosa que profundiza en crónicas históricas, especificaciones mecánicas y secretos olvidados de la industria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
          {/* Card 01 - Documentales */}
          <div
            id="card-documentales"
            onClick={() => onNavigate('documentales')}
            className="group relative min-h-[440px] p-8 sm:p-10 overflow-hidden text-[#efefed] bg-[#121c28] border border-[#1b2d42] cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_44px_rgba(0,0,0,0.35)]"
          >
            {/* Background Supercar Blueprint Overlay */}
            <div className="absolute right-0 bottom-0 w-3/4 opacity-15 pointer-events-none group-hover:opacity-25 transition-opacity">
              <img
                src={xj220Images.hero}
                alt="Superdeportivo"
                referrerPolicy="no-referrer"
                className="w-full object-contain"
              />
            </div>

            {/* Background watermarked number */}
            <span
              aria-hidden="true"
              className="absolute right-[-20px] bottom-[-45px] text-[clamp(140px,18vw,260px)] font-extrabold tracking-[-0.12em] leading-none text-white/[0.04] pointer-events-none select-none"
            >
              01
            </span>

            <div className="relative z-10 flex items-center justify-between">
              <div className="inline-grid place-items-center w-11 h-11 border border-[#4ea0ff]/50 bg-[#4ea0ff]/10 rounded-full text-xs font-bold tracking-widest text-[#4ea0ff]">
                01
              </div>
              <span className="text-[10px] tracking-[0.2em] font-bold text-[#7cbcff] uppercase font-mono">
                MONOGRAFÍAS & PLANOS
              </span>
            </div>

            <div className="relative z-10 mt-24">
              <span className="block text-[10px] font-bold tracking-[0.19em] text-[#8aa3be] uppercase font-mono">
                ARCHIVO / 01
              </span>
              <h3 className="mt-3 text-[clamp(32px,3.8vw,56px)] font-bold tracking-[-0.06em] leading-[0.92] group-hover:text-[#4ea0ff] transition-colors">
                DOCUMENTALES
              </h3>
              <p className="mt-5 text-[#b5c7db] text-sm leading-relaxed max-w-md">
                Historias completas de superdeportivos míticos, fabricantes, competencias de resistencia y momentos decisivos del automovilismo.
              </p>
              <div className="mt-8 flex items-center gap-3 text-[#4ea0ff] text-xl font-bold transition-transform duration-300 group-hover:translate-x-3">
                <span className="text-xs tracking-[0.18em] uppercase font-bold">Ver Documentales</span>
                <span>→</span>
              </div>
            </div>
          </div>

          {/* Card 02 - Datos Curiosos */}
          <div
            id="card-datos-curiosos"
            onClick={() => onNavigate('datos')}
            className="group relative min-h-[440px] p-8 sm:p-10 overflow-hidden text-[#efefed] bg-[#242116] border border-[#3b361f] cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_24px_44px_rgba(0,0,0,0.35)]"
          >
            {/* Background Countach Silhouette Overlay */}
            <div className="absolute right-0 bottom-0 w-3/4 opacity-15 pointer-events-none group-hover:opacity-25 transition-opacity">
              <img
                src={countachClassicImg}
                alt="Lamborghini Countach Clásico"
                referrerPolicy="no-referrer"
                className="w-full object-contain"
              />
            </div>

            {/* Background watermarked number */}
            <span
              aria-hidden="true"
              className="absolute right-[-20px] bottom-[-45px] text-[clamp(140px,18vw,260px)] font-extrabold tracking-[-0.12em] leading-none text-white/[0.04] pointer-events-none select-none"
            >
              02
            </span>

            <div className="relative z-10 flex items-center justify-between">
              <div className="inline-grid place-items-center w-11 h-11 border border-[#ffd451]/50 bg-[#ffd451]/10 rounded-full text-xs font-bold tracking-widest text-[#ffd451]">
                02
              </div>
              <span className="text-[10px] tracking-[0.2em] font-bold text-[#ffd451] uppercase font-mono">
                DATOS & SECRETOS
              </span>
            </div>

            <div className="relative z-10 mt-24">
              <span className="block text-[10px] font-bold tracking-[0.19em] text-[#c9b87f] uppercase font-mono">
                ARCHIVO / 02
              </span>
              <h3 className="mt-3 text-[clamp(32px,3.8vw,56px)] font-bold tracking-[-0.06em] leading-[0.92] group-hover:text-[#ffd451] transition-colors">
                DATOS CURIOSOS
              </h3>
              <p className="mt-5 text-[#dbd3b7] text-sm leading-relaxed max-w-md">
                Curiosidades, prototipos camuflados, récords insólitos y anécdotas de ingeniería poco conocidas sobre los automóviles.
              </p>
              <div className="mt-8 flex items-center gap-3 text-[#ffd451] text-xl font-bold transition-transform duration-300 group-hover:translate-x-3">
                <span className="text-xs tracking-[0.18em] uppercase font-bold">Descubrir Curiosidades</span>
                <span>→</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 sm:px-12 md:px-28 py-8 bg-[#090b0e] text-[#8e949e] text-[11px] tracking-[0.16em] border-t border-white/10 font-mono">
        <div className="flex items-center gap-3">
          <span className="text-[#efefed] font-bold tracking-widest">AUTOARCHIVE</span>
          <span className="text-white/20">|</span>
          <span>ARCHIVO DE SUPERDEPORTIVOS CLÁSICOS</span>
        </div>
        <p className="text-center sm:text-right text-[#656c77]">
          © 2026 — Edición Histórica y Documental
        </p>
      </footer>
    </div>
  );
};

