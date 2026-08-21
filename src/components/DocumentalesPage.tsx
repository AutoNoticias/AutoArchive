import React from 'react';
import { RoutePage } from '../types';
import { xj220Images } from '../data/xj220Data';
import { f40MiuraImages } from '../data/f40MiuraData';
import { countachImages } from '../data/countachData';

interface DocumentalesPageProps {
  onNavigate: (page: RoutePage) => void;
}

export const DocumentalesPage: React.FC<DocumentalesPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-[#0b1420] text-[#edf5ff] flex flex-col justify-between selection:bg-[#ffd451] selection:text-black">
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-6 sm:px-12 md:px-28 py-6 border-b border-[#99c6f5]/20 bg-[#08121e]/95 backdrop-blur-md">
        <button
          id="doc-brand-logo-btn"
          onClick={() => onNavigate('home')}
          className="text-left text-sm sm:text-base font-bold tracking-[0.18em] uppercase text-white hover:opacity-80 transition-opacity"
        >
          Auto<span className="text-[#4ea0ff]">Archive</span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          <span className="text-[#a9c9ed] text-[10px] font-bold tracking-[0.24em] uppercase">
            ARCHIVO / 01 · DOCUMENTALES
          </span>
          <button
            id="doc-header-home-btn"
            onClick={() => onNavigate('home')}
            className="text-[11px] font-semibold tracking-[0.18em] text-[#8fb9e4] hover:text-white uppercase transition-colors"
          >
            ← Inicio
          </button>
          <button
            id="doc-header-datos-btn"
            onClick={() => onNavigate('datos')}
            className="text-[11px] font-semibold tracking-[0.18em] text-[#8fb9e4] hover:text-[#ffd451] uppercase transition-colors"
          >
            Datos Curiosos →
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-[58vh] flex items-end px-6 sm:px-12 md:px-28 py-16 sm:py-20 overflow-hidden documentales-hero-bg border-b border-[#4ea0ff]/20">
        <div className="absolute inset-0 grid-blueprint opacity-30 pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          <div className="text-[10px] sm:text-xs font-bold tracking-[0.21em] uppercase text-[#9dccff]">
            AUTOARCHIVE / MONOGRAFÍAS EN PROFUNDIDAD
          </div>

          <h1 className="mt-4 text-[clamp(34px,7.5vw,96px)] font-black tracking-[-0.07em] leading-[0.88] text-white break-words">
            DOCUMENTALES
          </h1>

          <p className="mt-7 max-w-xl text-[#b8cce0] text-base sm:text-lg leading-relaxed">
            Historias completas, investigaciones técnicas y momentos decisivos que marcaron para siempre el destino de la ingeniería automotriz mundial.
          </p>

          <div className="w-[135px] h-[3px] mt-8 bg-[#ffd451]" />
        </div>

        <div
          aria-hidden="true"
          className="absolute right-6 sm:right-16 top-1/2 -translate-y-1/2 text-[clamp(120px,22vw,320px)] font-black text-[#c2dfff]/[0.08] pointer-events-none select-none"
        >
          01
        </div>
      </section>

      {/* Main documentary catalog */}
      <main className="px-6 sm:px-12 md:px-28 py-16 sm:py-24 bg-[#eaf2fa] text-[#102338] space-y-12">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 pb-6 border-b border-[#bad0e6]">
          <div>
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#347fc4]">
              CATÁLOGO HISTÓRICO COMPLETO
            </span>
            <h2 className="mt-2 text-[clamp(34px,5vw,60px)] font-semibold tracking-[-0.06em] leading-[0.96] text-[#102338]">
              Historias que <strong className="text-[#247eca] font-semibold">merecen ser contadas.</strong>
            </h2>
          </div>
          <span className="text-xs tracking-[0.18em] uppercase text-[#527a9e] font-semibold font-mono">
            3 MONOGRAFÍAS DISPONIBLES
          </span>
        </div>

        {/* Documentary Card 003: Lamborghini Countach */}
        <div
          id="featured-doc-countach"
          onClick={() => onNavigate('countach')}
          className="group relative grid grid-cols-1 lg:grid-cols-[90px_minmax(0,1.3fr)_minmax(280px,0.9fr)] min-h-[440px] overflow-hidden text-[#edf5ff] bg-[#12120e] border border-[#ffd451]/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
        >
          {/* Index Number Column */}
          <div className="p-6 lg:p-8 flex lg:flex-col items-center justify-between border-b lg:border-b-0 lg:border-r border-white/10 bg-[#0d0d09]">
            <span className="text-sm font-bold tracking-[0.2em] text-[#ffd451] font-mono">003</span>
            <span className="text-[9px] tracking-widest text-[#ffd451] uppercase font-mono font-bold">
              ★ NUEVO
            </span>
          </div>

          {/* Content Column */}
          <div className="p-8 sm:p-12 flex flex-col justify-center">
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#ffd451] font-mono">
              ITALIA / 1971 — 1990 · SANT’AGATA BOLOGNESE
            </div>

            <h3 className="mt-3 text-[clamp(32px,5vw,64px)] font-bold tracking-[-0.07em] leading-[0.88] text-white">
              LAMBORGHINI <span className="block text-[#ffd451] font-extrabold">COUNTACH</span>
            </h3>

            <div className="w-20 h-[2px] my-6 bg-[#ffd451]" />

            <p className="max-w-xl text-[#d4d6dc] text-sm sm:text-base leading-relaxed">
              El monolito en cuña que redefinió para siempre las leyes del superdeportivo mundial. De la exclamación de asombro de Gandini y el techo periscopio del LP400, a los neumáticos Pirelli P7 de 345 mm de Walter Wolf y los 455 CV del Quattrovalvole.
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-[#a7abb5] text-[10px] font-semibold tracking-[0.14em] uppercase font-mono">
              <span>V12 LONGITUDINAL 5.2L</span>
              <span>•</span>
              <span>298 KM/H</span>
              <span>•</span>
              <span>20 CAPÍTULOS</span>
            </div>

            <div className="mt-8 flex items-center gap-3 text-white text-xs font-bold tracking-[0.18em] uppercase group-hover:text-[#ffd451] transition-colors">
              <span>LEER DOCUMENTAL 003</span>
              <span className="text-lg text-[#ffd451] transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </div>
          </div>

          {/* Graphic / Photo column */}
          <div className="relative min-h-[220px] lg:min-h-full overflow-hidden bg-[#080805] flex items-center justify-center group/img">
            <div className="absolute inset-0 grid-blueprint opacity-20 pointer-events-none z-10" />
            <img
              src={countachImages.hero}
              alt="Lamborghini Countach LP400 Periscopio"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#12120e] via-transparent to-transparent z-10 pointer-events-none" />
            <div className="absolute top-3 right-3 z-20 px-2 py-0.5 bg-black/80 border border-[#ffd451]/40 text-[9px] font-mono tracking-widest text-[#ffd451]">
              PLANO 003
            </div>
          </div>
        </div>

        {/* Documentary Card 002: Ferrari F40 & Lamborghini Miura SV */}
        <div
          id="featured-doc-f40-miura"
          onClick={() => onNavigate('f40-miura')}
          className="group relative grid grid-cols-1 lg:grid-cols-[90px_minmax(0,1.3fr)_minmax(280px,0.9fr)] min-h-[440px] overflow-hidden text-[#edf5ff] bg-[#161214] border border-[#d92f31]/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
        >
          {/* Index Number Column */}
          <div className="p-6 lg:p-8 flex lg:flex-col items-center justify-between border-b lg:border-b-0 lg:border-r border-white/10 bg-[#0f0c0e]">
            <span className="text-sm font-bold tracking-[0.2em] text-[#ff7173] font-mono">002</span>
            <span className="text-[9px] tracking-widest text-[#ffd451] uppercase font-mono font-bold">
              ★ CLÁSICO
            </span>
          </div>

          {/* Content Column */}
          <div className="p-8 sm:p-12 flex flex-col justify-center">
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#ff7173] font-mono">
              ITALIA / 1963 — 1992 · MONOGRAFÍA DUAL
            </div>

            <h3 className="mt-3 text-[clamp(32px,5vw,64px)] font-bold tracking-[-0.07em] leading-[0.88] text-white">
              FERRARI F40 <span className="block text-[#ffd451] text-[0.85em] font-extrabold">& MIURA SV</span>
            </h3>

            <div className="w-20 h-[2px] my-6 bg-[#d92f31]" />

            <p className="max-w-xl text-[#d4d6dc] text-sm sm:text-base leading-relaxed">
              El Génesis y el Apocalipsis de la era dorada de los superdeportivos italianos. Desde la legendaria ofensa de Enzo que impulsó el nacimiento de Lamborghini con el Miura SV, hasta el último y visceral rugido analógico del Ferrari F40 antes de morir el Commendatore.
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-[#a7abb5] text-[10px] font-semibold tracking-[0.14em] uppercase font-mono">
              <span>V12 ATMOSFÉRICO & V8 BITURBO</span>
              <span>•</span>
              <span>324 KM/H</span>
              <span>•</span>
              <span>20 CAPÍTULOS</span>
            </div>

            <div className="mt-8 flex items-center gap-3 text-white text-xs font-bold tracking-[0.18em] uppercase group-hover:text-[#ff7173] transition-colors">
              <span>LEER DOCUMENTAL 002</span>
              <span className="text-lg text-[#d92f31] transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </div>
          </div>

          {/* Graphic / Photo column */}
          <div className="relative min-h-[220px] lg:min-h-full overflow-hidden bg-[#0a080a] flex items-center justify-center group/img">
            <div className="absolute inset-0 grid-blueprint opacity-20 pointer-events-none z-10" />
            <img
              src={f40MiuraImages.f40Hero}
              alt="Ferrari F40 y Lamborghini Miura SV"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#161214] via-transparent to-transparent z-10 pointer-events-none" />
            <div className="absolute top-3 right-3 z-20 px-2 py-0.5 bg-black/80 border border-[#d92f31]/40 text-[9px] font-mono tracking-widest text-[#ff7173]">
              PLANO 002
            </div>
          </div>
        </div>

        {/* Featured Documentary Card 001: Jaguar XJ220 */}
        <div
          id="featured-doc-xj220"
          onClick={() => onNavigate('xj220')}
          className="group relative grid grid-cols-1 lg:grid-cols-[90px_minmax(0,1.3fr)_minmax(280px,0.9fr)] min-h-[440px] overflow-hidden text-[#edf5ff] bg-[#102942] border border-[#4ea0ff]/35 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer"
        >
          {/* Index Number Column */}
          <div className="p-6 lg:p-8 flex lg:flex-col items-center justify-between border-b lg:border-b-0 lg:border-r border-[#bcbdff]/20 bg-[#0c2035]">
            <span className="text-sm font-bold tracking-[0.2em] text-[#8cc7ff] font-mono">001</span>
            <span className="text-[9px] tracking-widest text-[#5c8ab8] uppercase font-semibold font-mono">
              ORIGINAL
            </span>
          </div>

          {/* Content Column */}
          <div className="p-8 sm:p-12 flex flex-col justify-center">
            <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#72b9ff] font-mono">
              JAGUAR / 1992 — 1994 · REINO UNIDO
            </div>

            <h3 className="mt-3 text-[clamp(38px,6vw,78px)] font-bold tracking-[-0.08em] leading-[0.82]">
              JAGUAR <span className="block text-[#72b9ff] font-extrabold">XJ220</span>
            </h3>

            <div className="w-20 h-[2px] my-6 bg-[#4ea0ff]" />

            <p className="max-w-xl text-[#bfd0e2] text-sm sm:text-base leading-relaxed">
              El sueño clandestino que nació en secreto de un grupo de ingenieros, asombró al mundo como prototipo V12, cambió radicalmente a un V6 biturbo antes de llegar a las calles y terminó conquistando récords mundiales de velocidad.
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 text-[#8bb4d9] text-[10px] font-semibold tracking-[0.14em] uppercase font-mono">
              <span>V6 BITURBO JRV-6</span>
              <span>•</span>
              <span>349.4 KM/H</span>
              <span>•</span>
              <span>20 CAPÍTULOS</span>
            </div>

            <div className="mt-8 flex items-center gap-3 text-white text-xs font-bold tracking-[0.18em] uppercase group-hover:text-[#8cc7ff] transition-colors">
              <span>LEER DOCUMENTAL 001</span>
              <span className="text-lg text-[#4ea0ff] transition-transform duration-300 group-hover:translate-x-2">
                →
              </span>
            </div>
          </div>

          {/* Graphic / Photo column */}
          <div className="relative min-h-[220px] lg:min-h-full overflow-hidden bg-[#061220] flex items-center justify-center group/img">
            <div className="absolute inset-0 grid-blueprint opacity-20 pointer-events-none z-10" />
            <img
              src={xj220Images.hero}
              alt="Jaguar XJ220 Superdeportivo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#102942] via-transparent to-transparent z-10 pointer-events-none" />
            <div className="absolute top-3 right-3 z-20 px-2 py-0.5 bg-black/80 border border-[#4ea0ff]/40 text-[9px] font-mono tracking-widest text-[#8cc7ff]">
              PLANO 001
            </div>
          </div>
        </div>

        {/* Future Archival Projects */}
        <section className="grid grid-cols-1 md:grid-cols-[90px_1fr] gap-6 mt-8 p-8 sm:p-12 border border-[#bad0e6] bg-[#e3ecf5]">
          <div className="text-xs font-bold tracking-[0.17em] text-[#5487b2] font-mono">
            004+
          </div>
          <div>
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-[#5487b2] font-mono">
              PRÓXIMAS MONOGRAFÍAS EN INVESTIGACIÓN
            </span>
            <h3 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#102338]">
              El archivo continúa expandiéndose
            </h3>
            <p className="mt-2 text-sm text-[#5a6d7f] max-w-xl leading-relaxed">
              Próximas monografías técnicas en desarrollo: McLaren F1 de Gordon Murray, Porsche 959 Gruppe B, Bugatti EB110 SS y la saga de las 24 Horas de Le Mans.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 sm:px-12 md:px-28 py-8 bg-[#07111d] text-[#9dc9f1] text-[11px] tracking-[0.16em] border-t border-white/5 font-mono">
        <button
          id="doc-footer-back-btn"
          onClick={() => onNavigate('home')}
          className="hover:text-white transition-colors"
        >
          ← VOLVER AL INICIO
        </button>

        <span className="text-white font-bold tracking-widest">AUTOARCHIVE</span>

        <button
          id="doc-footer-facts-btn"
          onClick={() => onNavigate('datos')}
          className="hover:text-[#ffd451] transition-colors"
        >
          DATOS CURIOSOS →
        </button>
      </footer>
    </div>
  );
};
