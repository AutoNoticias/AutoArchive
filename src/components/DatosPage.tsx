import React, { useState } from 'react';
import { RoutePage } from '../types';
import { automotiveFacts } from '../data/factsData';

interface DatosPageProps {
  onNavigate: (page: RoutePage) => void;
}

export const DatosPage: React.FC<DatosPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeFactId, setActiveFactId] = useState<string | null>(null);

  const categories = ['all', 'PROTOTIPOS & SECRETOS', 'RÉCORDS HISTÓRICOS', 'LE MANS & CARRERAS', 'INGENIERÍA & DISEÑO'];

  const filteredFacts = selectedCategory === 'all'
    ? automotiveFacts
    : automotiveFacts.filter((f) => f.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#211d0e] text-[#fff9e8] flex flex-col justify-between selection:bg-[#f2bd27] selection:text-black">
      {/* Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-6 sm:px-12 md:px-28 py-6 border-b border-[#f2bd27]/35 bg-[#25200e]/95 backdrop-blur-md">
        <button
          id="datos-brand-logo-btn"
          onClick={() => onNavigate('home')}
          className="text-left text-sm sm:text-base font-bold tracking-[0.18em] uppercase text-white hover:opacity-80 transition-opacity"
        >
          Auto<span className="text-[#f2bd27]">Archive</span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          <span className="text-[#e2c76d] text-[10px] font-bold tracking-[0.2em] uppercase">
            ARCHIVE / 02 · DATOS CURIOSOS
          </span>
          <button
            id="datos-header-home-btn"
            onClick={() => onNavigate('home')}
            className="text-[11px] font-semibold tracking-[0.18em] text-[#d4bd75] hover:text-white uppercase transition-colors"
          >
            ← Inicio
          </button>
          <button
            id="datos-header-doc-btn"
            onClick={() => onNavigate('documentales')}
            className="text-[11px] font-semibold tracking-[0.18em] text-[#d4bd75] hover:text-[#4ea0ff] uppercase transition-colors"
          >
            Documentales →
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[66vh] flex items-center px-6 sm:px-12 md:px-28 py-20 overflow-hidden datos-hero-bg border-b border-[#f2bd27]/25">
        {/* Background grids and circular vectors */}
        <div className="absolute inset-0 datos-grid-blueprint opacity-35 pointer-events-none" />

        <div
          aria-hidden="true"
          className="absolute -right-[8vw] top-1/2 -translate-y-1/2 w-[min(48vw,650px)] aspect-square border border-[#fff4c2]/20 rounded-full pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute right-[9vw] top-1/2 -translate-y-1/2 w-[min(18vw,260px)] aspect-square border border-[#fff4c2]/35 rounded-full pointer-events-none"
        />

        {/* Decorative horizontal lines */}
        <div className="absolute top-[20%] left-0 right-0 h-[1px] bg-[#fff4c2]/15 pointer-events-none" />
        <div className="absolute bottom-[18%] left-0 right-0 h-[1px] bg-[#fff4c2]/15 pointer-events-none" />

        <div className="relative z-10 max-w-4xl">
          <div className="text-[10px] sm:text-xs font-bold tracking-[0.22em] uppercase text-[#e2c76d]">
            AUTOARCHIVE / ARCHIVO DE CURIOSIDADES
          </div>

          <h1 className="mt-4 text-[clamp(34px,7.5vw,96px)] font-black tracking-[-0.07em] leading-[0.85] text-white break-words">
            DATOS <br />
            <span className="text-[#ffd451]">CURIOSOS</span>
          </h1>

          <div className="w-[105px] h-[3px] my-8 bg-[#f2bd27]" />

          <p className="max-w-xl text-[#f1dfab] text-base sm:text-lg leading-relaxed">
            Curiosidades insólitas, secretos de banco de pruebas, récords excéntricos y detalles poco conocidos que forman parte viva de la historia del automóvil.
          </p>
        </div>

        {/* Watermark 02 */}
        <div
          aria-hidden="true"
          className="absolute right-6 sm:right-16 bottom-[15%] text-[clamp(130px,22vw,300px)] font-black text-[#fff7d3]/[0.08] leading-[0.7] pointer-events-none select-none"
        >
          02
        </div>

        {/* Sub-bar tags */}
        <div className="absolute bottom-7 left-6 sm:left-12 md:left-28 text-[9px] font-bold tracking-[0.18em] uppercase text-[#e2c76d]">
          CURIOSIDADES · DATOS · HISTORIA
        </div>
        <div className="hidden sm:block absolute bottom-7 right-6 sm:right-12 md:right-28 text-[9px] font-bold tracking-[0.18em] uppercase text-[#e2c76d]">
          AUTOARCHIVE
        </div>
      </section>

      {/* Archive main content */}
      <main className="px-6 sm:px-12 md:px-28 py-16 sm:py-28 bg-[#fff8e9] text-[#29230f]">
        <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-6 pb-10 border-b border-[#d8c67f]">
          <div>
            <span className="text-[10px] font-bold tracking-[0.19em] uppercase text-[#b58508]">
              02 / ARCHIVE
            </span>
            <h2 className="mt-2 text-[clamp(36px,5.5vw,70px)] font-semibold tracking-[-0.065em] leading-[0.92] text-[#29230f]">
              Datos Curiosos
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#756940] max-w-sm leading-relaxed">
            Una colección de secretos mecánicos, anécdotas de pilotos y curiosidades que iremos desclasificando.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 my-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-bold tracking-wider uppercase transition-all ${
                selectedCategory === cat
                  ? 'bg-[#29230f] text-[#fff8e9] shadow-md'
                  : 'bg-[#ede3c7] text-[#5e5330] hover:bg-[#dfd3b2]'
              }`}
            >
              {cat === 'all' ? 'TODAS LAS CATEGORÍAS' : cat}
            </button>
          ))}
        </div>

        {/* Fact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {filteredFacts.map((fact) => {
            const isExpanded = activeFactId === fact.id;
            return (
              <div
                key={fact.id}
                onClick={() => setActiveFactId(isExpanded ? null : fact.id)}
                className={`p-8 border border-[#d8c67f] bg-[#fbf4de] hover:border-[#b58508] transition-all cursor-pointer shadow-sm hover:shadow-md ${
                  isExpanded ? 'ring-2 ring-[#f2bd27]' : ''
                }`}
              >
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#d8c67f]/60">
                  <span className="text-xs font-black tracking-widest text-[#b58508]">
                    {fact.number}
                  </span>
                  <span className="text-[10px] font-bold tracking-widest text-[#8a7638] uppercase">
                    {fact.tag}
                  </span>
                </div>

                <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-[#9e7a17] block mb-2">
                  {fact.category}
                </span>

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#29230f] mb-3">
                  {fact.title}
                </h3>

                <p className="text-sm text-[#574d2b] leading-relaxed mb-4">
                  {fact.summary}
                </p>

                {isExpanded && (
                  <div className="mt-4 pt-4 border-t border-[#d8c67f]/80 text-sm text-[#2f2913] bg-[#f2e7c9] p-4 rounded">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[#b58508] mb-1">
                      Detalle Histórico Completo:
                    </span>
                    <p className="leading-relaxed">{fact.details}</p>
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between text-xs font-bold text-[#b58508]">
                  <span>{isExpanded ? 'OCULTAR DETALLES' : 'LEER HISTORIA COMPLETA'}</span>
                  <span>{isExpanded ? '▲' : '▼'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Zona Próximamente (Original User Design Teaser) */}
        <div className="relative flex flex-col items-center justify-center min-h-[340px] mt-6 p-8 overflow-hidden border border-[#d8c67f] bg-[repeating-linear-gradient(135deg,transparent_0_13px,rgba(167,124,7,0.045)_13px_14px)] text-center">
          <div className="absolute top-6 left-6 text-[#ad8a25] text-xs font-bold tracking-[0.16em]">
            005
          </div>

          <div className="my-auto py-6">
            <div className="text-[clamp(70px,11vw,140px)] font-light text-[#e1b736] leading-none select-none">
              ?
            </div>
            <span className="block mt-4 text-[#99750d] text-xs sm:text-sm font-bold tracking-[0.2em] uppercase">
              MÁS DATOS EN PROCESO DE INVESTIGACIÓN
            </span>
            <p className="mt-2 text-xs text-[#756940] max-w-md mx-auto">
              Nuevas anécdotas de pilotos, récords de velocidad y secretos mecánicos se añaden periódicamente a AutoArchive.
            </p>
          </div>

          {/* Bottom Accent Bar */}
          <div className="absolute right-0 bottom-0 left-0 h-[5px] bg-[#f2bd27]" />
        </div>
      </main>

      {/* Footer */}
      <footer className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 sm:px-12 md:px-28 py-8 bg-[#25200e] text-[#dfc56b] text-[11px] tracking-[0.16em] border-t border-[#f2bd27]/20">
        <button
          id="datos-footer-back-btn"
          onClick={() => onNavigate('home')}
          className="hover:text-white transition-colors"
        >
          ← VOLVER AL INICIO
        </button>

        <span className="text-white font-bold tracking-widest">
          AUTOARCHIVE © 2026
        </span>

        <button
          id="datos-footer-doc-btn"
          onClick={() => onNavigate('documentales')}
          className="hover:text-[#4ea0ff] transition-colors"
        >
          VER DOCUMENTALES →
        </button>
      </footer>
    </div>
  );
};
