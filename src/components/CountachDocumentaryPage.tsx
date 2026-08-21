import React, { useState, useEffect } from 'react';
import { RoutePage } from '../types';
import {
  countachChapters,
  countachStats,
  countachTimeline,
  countachSpecs,
  countachImages,
} from '../data/countachData';

interface CountachDocumentaryPageProps {
  onNavigate: (page: RoutePage) => void;
}

export const CountachDocumentaryPage: React.FC<CountachDocumentaryPageProps> = ({
  onNavigate,
}) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<'comparativa' | 'lp400' | 'qv' | 'anniv'>('comparativa');
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
    caption: string;
    tag: string;
  } | null>(null);
  const [showIndexMenu, setShowIndexMenu] = useState(false);

  // Track scroll for top reading progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scrollPercent = (totalScroll / windowHeight) * 100;
        setReadingProgress(scrollPercent);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setShowIndexMenu(false);
    }
  };

  const galleryItems = [
    {
      src: countachImages.hero,
      alt: 'Lamborghini Countach LP400 Periscopio en Estudio',
      caption:
        'El Countach LP400 original de 1974 con puertas de tijera abiertas, silueta pura sin aletines y el túnel periscópico en el techo.',
      tag: 'PIEZA 01 // COUNTACH LP400',
    },
    {
      src: countachImages.engine,
      alt: 'Motor V12 Longitudinal Invertido con 6 Carburadores Weber',
      caption:
        'V12 de 5.2L y 48 válvulas en el 5000 QV con seis carburadores verticales Weber 44 DCNF y chasis multitubular expuesto.',
      tag: 'PIEZA 02 // V12 QUATTROVALVOLE',
    },
    {
      src: countachImages.cad,
      alt: 'Plano Técnico CAD de Estructura Multitubular y Cuña',
      caption:
        'Esquema técnico de los 90 metros de tubos soldados a mano del chasis Marchesi, flujo aerodinámico y cotas de cuña.',
      tag: 'PIEZA 03 // PLANO CAD MARCHESI',
    },
    {
      src: countachImages.cockpit,
      alt: 'Puesto de Mando y Rejilla Abierta de Transmisión',
      caption:
        'Habitáculo con palanca en rejilla metálica abierta, volante Momo y asientos integrados directamente sobre el chasis.',
      tag: 'PIEZA 04 // CABINA ANALÓGICA',
    },
    {
      src: countachImages.qvWing,
      alt: 'Countach 5000 QV con Gran Alerón Trasero',
      caption:
        'La icónica trasera ensanchada con neumáticos Pirelli P7 de 345 mm y el legendario alerón en forma de delta de los años 80.',
      tag: 'PIEZA 05 // ALERÓN & PIRELLI P7',
    },
  ];

  return (
    <div className="min-h-screen bg-[#08090c] text-[#efefed] selection:bg-[#ffd451] selection:text-black">
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-white/10 z-[100]">
        <div
          className="h-full bg-gradient-to-r from-[#ffd451] via-[#ff9900] to-[#ffd451] transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Header bar */}
      <header className="sticky top-0 z-40 bg-[#08090c]/90 backdrop-blur-md border-b border-white/10 px-6 sm:px-12 md:px-24 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            id="countach-back-to-docs-btn"
            onClick={() => onNavigate('documentales')}
            className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#9da0a5] hover:text-white uppercase transition-colors"
          >
            <span>←</span>
            <span>DOCUMENTALES</span>
          </button>
          <span className="text-white/20">/</span>
          <span className="text-[10px] font-mono tracking-widest px-2 py-0.5 border border-[#ffd451]/40 bg-[#ffd451]/10 text-[#ffd451]">
            DOC 003
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 mr-20 md:mr-0">
          <button
            onClick={() => scrollToSection('countach-gallery-section')}
            className="hidden sm:inline-block px-3 py-1.5 border border-white/15 text-[10px] font-bold tracking-[0.16em] uppercase text-[#cfd3db] hover:text-white hover:border-white/40 transition-all font-mono"
          >
            GALERÍA & PLANOS
          </button>

          <button
            onClick={() => setShowIndexMenu(!showIndexMenu)}
            className="px-3.5 py-1.5 border border-[#ffd451]/40 bg-[#ffd451]/10 text-[10px] font-bold tracking-[0.16em] uppercase text-[#ffd451] hover:bg-[#ffd451] hover:text-black transition-all whitespace-nowrap font-mono"
          >
            ÍNDICE (20 CAP.)
          </button>
        </div>
      </header>

      {/* Quick Index Dropdown Drawer */}
      {showIndexMenu && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end">
          <div className="w-full max-w-md h-full bg-[#0d0f14] border-l border-white/15 p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs font-mono font-bold tracking-widest text-[#ffd451] uppercase">
                // ÍNDICE GENERAL (20 CAPÍTULOS)
              </span>
              <button
                onClick={() => setShowIndexMenu(false)}
                className="text-xs font-mono text-[#8a929e] hover:text-white"
              >
                [ CERRAR ✕ ]
              </button>
            </div>

            <div className="mt-4 space-y-1">
              {countachChapters.map((ch) => (
                <button
                  key={ch.number}
                  onClick={() => scrollToSection(`capitulo-${ch.number}`)}
                  className="w-full p-2.5 text-left hover:bg-white/5 border border-transparent hover:border-white/10 transition-all flex items-start gap-3 group"
                >
                  <span className="text-xs font-mono font-bold text-[#ffd451] group-hover:text-white">
                    {ch.number}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono tracking-widest text-[#6c7480] uppercase block">
                      {ch.category}
                    </span>
                    <span className="text-xs font-bold text-[#cfd3db] group-hover:text-white truncate block">
                      {ch.title}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative px-6 sm:px-12 md:px-24 pt-16 pb-20 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={countachImages.hero}
            alt="Lamborghini Countach LP400"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-25 filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090c] via-[#08090c]/80 to-transparent" />
          <div className="absolute inset-0 grid-blueprint opacity-15 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-5xl">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-2.5 py-1 bg-[#ffd451] text-black text-[9px] font-black tracking-[0.24em] uppercase font-mono">
              DOCUMENTAL 003
            </span>
            <span className="px-2.5 py-1 bg-white/10 border border-white/15 text-[#ffd451] text-[9px] font-bold tracking-[0.2em] uppercase font-mono">
              MONOGRAFÍA SUPREMA
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#8a929e]">
              1971 — 1990 · SANT’AGATA BOLOGNESE
            </span>
          </div>

          <h1 className="text-[clamp(38px,7vw,92px)] font-black tracking-[-0.06em] leading-[0.90] text-white">
            LAMBORGHINI COUNTACH
          </h1>

          <p className="mt-4 text-lg sm:text-xl font-light text-[#ffd451] tracking-wide">
            El Monolito en Cuña que Redefinió las Leyes del Superdeportivo Mundial
          </p>

          <p className="mt-6 text-[#a2a8b2] text-sm sm:text-base leading-relaxed max-w-3xl">
            Desde la exclamación dialectal piamontesa que le dio nombre y las puertas de tijera de Marcello Gandini, hasta los 90 metros de tubos soldados a mano del chasis Marchesi, las modificaciones de Walter Wolf, los neumáticos Pirelli P7 de 345 mm y la cumbre de 455 CV del 5000 Quattrovalvole. Veinte capítulos de historia viva del icono definitivo de la cultura automotriz.
          </p>

          {/* Quick Stats Grid */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 p-4 bg-black/60 border border-white/15 backdrop-blur-md">
            {countachStats.map((stat, idx) => (
              <div key={idx} className="p-2 border-r last:border-r-0 border-white/10">
                <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {stat.value}{' '}
                  <span className="text-xs font-mono font-bold text-[#ffd451]">
                    {stat.unit}
                  </span>
                </span>
                <span className="block text-[9px] font-mono text-[#8a929e] uppercase mt-1 leading-tight">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Action Navigation */}
          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => scrollToSection('capitulo-01')}
              className="px-6 py-3.5 bg-[#ffd451] hover:bg-[#ffbe1a] text-black text-xs font-black tracking-[0.18em] uppercase transition-all shadow-[0_4px_20px_rgba(255,212,81,0.35)]"
            >
              Comenzar Lectura (Cap. 01) →
            </button>
            <button
              onClick={() => scrollToSection('comparativa-tecnica-countach')}
              className="px-6 py-3.5 border border-white/20 hover:border-white/50 text-[#cfd3db] hover:text-white text-xs font-semibold tracking-[0.16em] uppercase transition-all font-mono"
            >
              Fichas Técnicas & Evolución ↓
            </button>
          </div>
        </div>
      </section>

      {/* Visual Engineering Gallery Section */}
      <section
        id="countach-gallery-section"
        className="px-6 sm:px-12 md:px-24 py-16 bg-[#06070a] border-b border-white/10"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-[0.24em] text-[#ffd451] uppercase">
                // ARCHIVO VISUAL & PLANOS TÉCNICOS
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mt-1">
                Galería de Ingeniería y Estudio
              </h2>
            </div>
            <span className="text-xs font-mono text-[#8a929e]">
              (Haz clic en cualquier imagen para abrir el visor en alta resolución)
            </span>
          </div>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryItems.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(item)}
                className="group relative border border-white/15 bg-[#0f1117] overflow-hidden cursor-pointer hover:border-[#ffd451] transition-all"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <img
                    src={item.src}
                    alt={item.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 z-10 px-2 py-0.5 bg-black/80 border border-white/20 text-[8px] font-mono tracking-widest text-[#ffd451]">
                    {item.tag}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="text-xs font-bold text-white tracking-tight">
                    {item.alt}
                  </h3>
                  <p className="text-[11px] text-[#8a929e] line-clamp-2 mt-1 leading-snug">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-5xl w-full bg-[#0d0f14] border border-white/20 p-4 sm:p-6 shadow-2xl relative"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-xs font-mono px-3 py-1 bg-white/10 hover:bg-[#ffd451] hover:text-black text-white transition-colors"
            >
              CERRAR [ ✕ ]
            </button>

            <span className="text-[10px] font-mono text-[#ffd451] tracking-widest uppercase block mb-2">
              {selectedImage.tag}
            </span>

            <div className="relative aspect-[16/10] max-h-[65vh] w-full overflow-hidden border border-white/10 bg-black flex items-center justify-center">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <p className="text-xs sm:text-sm text-[#cfd3db]">
                {selectedImage.caption}
              </p>
              <span className="text-[10px] font-mono text-[#8a929e] uppercase whitespace-nowrap">
                AUTOARCHIVE // ALTA DEFINICIÓN
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Comparative Specs Section */}
      <section
        id="comparativa-tecnica-countach"
        className="px-6 sm:px-12 md:px-24 py-16 bg-[#0a0c10] border-b border-white/10"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-mono font-bold tracking-[0.24em] text-[#ffd451] uppercase">
              // TELEMETRÍA & ESPECIFICACIONES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
              Evolución Técnica del Countach
            </h2>
            <p className="text-xs sm:text-sm text-[#8a929e] mt-2">
              De la pureza de 375 CV del LP400 Periscopio a la furia de 455 CV del 5000 QV y el refinamiento del 25th Anniversary.
            </p>

            {/* Toggle Tabs */}
            <div className="inline-flex flex-wrap justify-center mt-6 p-1 bg-black/60 border border-white/15 gap-1">
              <button
                onClick={() => setActiveTab('comparativa')}
                className={`px-3.5 py-1.5 text-xs font-mono font-bold uppercase transition-all ${
                  activeTab === 'comparativa'
                    ? 'bg-[#ffd451] text-black'
                    : 'text-[#8a929e] hover:text-white'
                }`}
              >
                Comparativa Completa
              </button>
              <button
                onClick={() => setActiveTab('lp400')}
                className={`px-3.5 py-1.5 text-xs font-mono font-bold uppercase transition-all ${
                  activeTab === 'lp400'
                    ? 'bg-[#ffd451] text-black'
                    : 'text-[#8a929e] hover:text-white'
                }`}
              >
                LP400 Periscopio (1974)
              </button>
              <button
                onClick={() => setActiveTab('qv')}
                className={`px-3.5 py-1.5 text-xs font-mono font-bold uppercase transition-all ${
                  activeTab === 'qv'
                    ? 'bg-[#ffd451] text-black'
                    : 'text-[#8a929e] hover:text-white'
                }`}
              >
                5000 QV (1985)
              </button>
              <button
                onClick={() => setActiveTab('anniv')}
                className={`px-3.5 py-1.5 text-xs font-mono font-bold uppercase transition-all ${
                  activeTab === 'anniv'
                    ? 'bg-[#ffd451] text-black'
                    : 'text-[#8a929e] hover:text-white'
                }`}
              >
                25th Anniv. (1988)
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="border border-white/15 bg-[#0e1117] overflow-x-auto shadow-xl">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/15 bg-black/60">
                  <th className="p-4 text-[#8a929e] uppercase font-bold tracking-wider">
                    Parámetro
                  </th>
                  {(activeTab === 'comparativa' || activeTab === 'lp400') && (
                    <th className="p-4 text-[#ffd451] uppercase font-black tracking-wider border-l border-white/10">
                      LP400 Periscopio (1974)
                    </th>
                  )}
                  {(activeTab === 'comparativa' || activeTab === 'qv') && (
                    <th className="p-4 text-[#ff9900] uppercase font-black tracking-wider border-l border-white/10">
                      5000 Quattrovalvole (1985)
                    </th>
                  )}
                  {(activeTab === 'comparativa' || activeTab === 'anniv') && (
                    <th className="p-4 text-[#cfd3db] uppercase font-black tracking-wider border-l border-white/10">
                      25th Anniversary (1988)
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {countachSpecs.lp400.map((lp400Item, idx) => {
                  const qvItem = countachSpecs.qv[idx] || { value: '—' };
                  const annivItem = countachSpecs.anniv[idx] || { value: '—' };
                  return (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-3.5 text-[#8a929e] font-medium">
                        {lp400Item.label}
                      </td>
                      {(activeTab === 'comparativa' || activeTab === 'lp400') && (
                        <td className="p-3.5 text-[#e5e8ee] font-semibold border-l border-white/10">
                          {lp400Item.value}
                        </td>
                      )}
                      {(activeTab === 'comparativa' || activeTab === 'qv') && (
                        <td className="p-3.5 text-white font-bold border-l border-white/10">
                          {qvItem.value}
                        </td>
                      )}
                      {(activeTab === 'comparativa' || activeTab === 'anniv') && (
                        <td className="p-3.5 text-[#ffd451] font-semibold border-l border-white/10">
                          {annivItem.value}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Main 20 Chapters Content */}
      <main className="px-6 sm:px-12 md:px-24 py-20 max-w-4xl mx-auto space-y-20">
        {countachChapters.map((chapter) => (
          <article
            key={chapter.number}
            id={`capitulo-${chapter.number}`}
            className="scroll-mt-24 border-b border-white/10 pb-16 last:border-b-0"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 bg-[#ffd451]/20 border border-[#ffd451]/50 text-[#ffd451]">
                CAPÍTULO {chapter.number}
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#8a929e] uppercase">
                // {chapter.category}
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mt-3">
              {chapter.title}
            </h2>

            {chapter.subtitle && (
              <h3 className="text-sm sm:text-base font-medium text-[#ffd451] mt-1.5">
                {chapter.subtitle}
              </h3>
            )}

            {/* Paragraphs */}
            <div className="mt-6 space-y-4 text-sm sm:text-base text-[#b8bcc4] leading-relaxed font-normal">
              {chapter.paragraphs.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>

            {/* Highlight Metric Card */}
            {chapter.highlight && (
              <div className="mt-8 p-5 bg-[#0e1117] border border-white/15 border-l-4 border-l-[#ffd451] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono font-bold tracking-widest text-[#ffd451] uppercase">
                    {chapter.highlight.label}
                  </span>
                  {chapter.highlight.description && (
                    <p className="text-xs text-[#8a929e] mt-0.5">
                      {chapter.highlight.description}
                    </p>
                  )}
                </div>
                <span className="text-2xl sm:text-3xl font-black font-mono text-white whitespace-nowrap">
                  {chapter.highlight.value}
                </span>
              </div>
            )}

            {/* In-Chapter Image if present */}
            {chapter.image && (
              <div className="mt-8 border border-white/15 bg-[#101318] p-3 overflow-hidden">
                <div className="relative aspect-[16/9] overflow-hidden bg-black">
                  <img
                    src={chapter.image.src}
                    alt={chapter.image.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/80 border border-white/20 text-[8px] font-mono tracking-widest text-[#ffd451]">
                    {chapter.image.tag}
                  </div>
                </div>
                <p className="text-xs text-[#8a929e] mt-2 italic px-1">
                  {chapter.image.caption}
                </p>
              </div>
            )}
          </article>
        ))}
      </main>

      {/* Historical Chronology Timeline */}
      <section className="px-6 sm:px-12 md:px-24 py-20 bg-[#06070a] border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <span className="text-[10px] font-mono font-bold tracking-[0.24em] text-[#ffd451] uppercase block mb-1">
            // CRONOLOGÍA HISTÓRICA
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Línea de Tiempo: 1970 — 1990
          </h2>

          <div className="mt-12 space-y-8 relative before:absolute before:top-3 before:bottom-3 before:left-4 sm:before:left-24 before:w-[1px] before:bg-white/20">
            {countachTimeline.map((item, idx) => (
              <div
                key={idx}
                className="relative flex flex-col sm:flex-row items-start gap-4 sm:gap-10 pl-10 sm:pl-0"
              >
                {/* Year Badge */}
                <div className="sm:w-24 sm:text-right flex-shrink-0">
                  <span className="text-sm font-mono font-black text-[#ffd451]">
                    {item.year}
                  </span>
                </div>

                {/* Bullet */}
                <div className="absolute left-[13px] sm:left-[93px] top-1.5 w-2 h-2 rounded-full bg-[#ffd451] border-2 border-black" />

                {/* Content */}
                <div className="flex-1 bg-[#0f1117] p-5 border border-white/10">
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8a929e] mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Documentaries & Navigation Footer */}
      <section className="px-6 sm:px-12 md:px-24 py-16 bg-[#040507] border-t border-white/10">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#8a929e] uppercase block">
              OTROS DOCUMENTALES DISPONIBLES
            </span>
            <h3 className="text-xl font-bold text-white mt-1">
              F40 & Miura SV · Jaguar XJ220
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('f40-miura')}
              className="px-5 py-3 bg-[#d92f31] hover:bg-[#b82325] text-white text-xs font-bold tracking-[0.16em] uppercase transition-all font-mono"
            >
              Doc 002: F40 & Miura →
            </button>
            <button
              onClick={() => onNavigate('xj220')}
              className="px-5 py-3 bg-[#4ea0ff] hover:bg-[#72b5ff] text-black text-xs font-bold tracking-[0.16em] uppercase transition-all font-mono"
            >
              Doc 001: XJ220 →
            </button>
            <button
              onClick={() => onNavigate('documentales')}
              className="px-5 py-3 border border-white/20 hover:border-white/40 text-white text-xs font-bold tracking-[0.16em] uppercase transition-all font-mono"
            >
              Índice General →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
