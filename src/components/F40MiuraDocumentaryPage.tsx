import React, { useState, useEffect } from 'react';
import { RoutePage } from '../types';
import { AudioNarrator } from './AudioNarrator';
import {
  f40MiuraChapters,
  f40MiuraStats,
  f40MiuraTimeline,
  f40MiuraSpecs,
  f40MiuraImages,
} from '../data/f40MiuraData';

interface F40MiuraDocumentaryPageProps {
  onNavigate: (page: RoutePage) => void;
  onOpenAuthModal?: (reason?: string) => void;
}

export const F40MiuraDocumentaryPage: React.FC<F40MiuraDocumentaryPageProps> = ({
  onNavigate,
  onOpenAuthModal,
}) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeTab, setActiveTab] = useState<'f40' | 'miura' | 'comparativa'>('comparativa');
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
      src: f40MiuraImages.f40Hero,
      alt: 'Ferrari F40 Rosso Corsa en Estudio',
      caption:
        'Carrocería compuesta de Kevlar y fibra de carbono en el icónico color Rosso Corsa con el legendario alerón trasero fijo.',
      tag: 'PIEZA 01 // FERRARI F40',
    },
    {
      src: f40MiuraImages.miuraHero,
      alt: 'Lamborghini Miura SV Giallo Sole',
      caption:
        'El Miura SV de 1971 con faros sin pestañas, pasos de rueda ensanchados en 130 mm y silueta esculpida por Marcello Gandini.',
      tag: 'PIEZA 02 // MIURA SV',
    },
    {
      src: f40MiuraImages.f40Engine,
      alt: 'Motor V8 Biturbo Tipo F120A',
      caption:
        'V8 de 2.9 litros a 90° con dos turbocompresores IHI a 1.1 bar e intercoolers gemelos Behr, rindiendo 478 CV oficiales.',
      tag: 'PIEZA 03 // V8 BITURBO F120A',
    },
    {
      src: f40MiuraImages.miuraEngine,
      alt: 'Motor V12 Bizzarrini Transversal',
      caption:
        'V12 de 3.9 litros y 385 CV montado transversalmente con cuatro carburadores Weber triples y lubricación por cárter dividido.',
      tag: 'PIEZA 04 // V12 BIZZARRINI',
    },
    {
      src: f40MiuraImages.schematic,
      alt: 'Plano Técnico Comparativo CAD',
      caption:
        'Esquema de ingeniería comparativo entre la arquitectura del Miura SV (1971) y los composites del Ferrari F40 (1987).',
      tag: 'PIEZA 05 // PLANO CAD',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0c0f] text-[#efefed] selection:bg-[#d92f31] selection:text-white pb-20 md:pb-0">
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-white/10 z-[100]">
        <div
          className="h-full bg-gradient-to-r from-[#d92f31] via-[#ffd451] to-[#d92f31] transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Header bar */}
      <header className="sticky top-0 z-40 bg-[#0a0c0f]/90 backdrop-blur-md border-b border-white/10 px-4 sm:px-12 md:px-24 py-3.5 sm:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="f40-back-to-docs-btn"
            onClick={() => onNavigate('documentales')}
            className="flex items-center gap-1.5 text-xs font-mono tracking-widest text-[#9da0a5] hover:text-white uppercase transition-colors"
          >
            <span>←</span>
            <span className="hidden sm:inline">DOCUMENTALES</span>
            <span className="sm:hidden">DOCS</span>
          </button>
          <span className="text-white/20">/</span>
          <span className="text-[10px] font-mono tracking-widest px-2 py-0.5 border border-[#d92f31]/40 bg-[#d92f31]/10 text-[#ff7173]">
            DOC 002
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => scrollToSection('f40-miura-gallery-section')}
            className="hidden sm:inline-block px-3 py-1.5 border border-white/15 text-[10px] font-bold tracking-[0.16em] uppercase text-[#cfd3db] hover:text-white hover:border-white/40 transition-all"
          >
            GALERÍA & PLANOS
          </button>

          <button
            onClick={() => setShowIndexMenu(!showIndexMenu)}
            className="px-2.5 sm:px-3.5 py-1.5 border border-[#d92f31]/40 bg-[#d92f31]/10 text-[10px] font-bold tracking-wider sm:tracking-[0.16em] uppercase text-[#ff8e90] hover:text-white hover:border-[#d92f31] transition-all whitespace-nowrap"
          >
            ÍNDICE (20 CAP.)
          </button>
        </div>
      </header>

      {/* Persistent Audio Narrator Bar */}
      <AudioNarrator
        documentaryTitle="FERRARI F40 Y LAMBORGHINI MIURA SV"
        chapters={f40MiuraChapters}
        accentColor="#d92f31"
        onChapterSelect={(idx) => {
          const chap = f40MiuraChapters[idx];
          if (chap) {
            scrollToSection(`capitulo-${chap.number}`);
          }
        }}
        onOpenAuthModal={onOpenAuthModal}
      />

      {/* Quick Index Dropdown Drawer */}
      {showIndexMenu && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end">
          <div className="w-full max-w-md h-full bg-[#0e1014] border-l border-white/15 p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs font-mono font-bold tracking-widest text-[#ff7173] uppercase">
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
              {f40MiuraChapters.map((ch) => (
                <button
                  key={ch.number}
                  onClick={() => scrollToSection(`capitulo-${ch.number}`)}
                  className="w-full p-2.5 text-left hover:bg-white/5 border border-transparent hover:border-white/10 transition-all flex items-start gap-3 group"
                >
                  <span className="text-xs font-mono font-bold text-[#ff7173] group-hover:text-white">
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
            src={f40MiuraImages.f40Hero}
            alt="Ferrari F40"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-25 filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c0f] via-[#0a0c0f]/80 to-transparent" />
          <div className="absolute inset-0 grid-blueprint opacity-15 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-5xl">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-2.5 py-1 bg-[#d92f31] text-white text-[9px] font-bold tracking-[0.24em] uppercase font-mono">
              DOCUMENTAL 002
            </span>
            <span className="px-2.5 py-1 bg-white/10 border border-white/15 text-[#ffd451] text-[9px] font-bold tracking-[0.2em] uppercase font-mono">
              MONOGRAFÍA DUAL
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#8a929e]">
              1963 — 1992 · ITALIA
            </span>
          </div>

          <h1 className="text-[clamp(36px,6vw,84px)] font-black tracking-[-0.05em] leading-[0.92] text-white">
            FERRARI F40 & LAMBORGHINI MIURA SV
          </h1>

          <p className="mt-4 text-lg sm:text-xl font-light text-[#ffd451] tracking-wide">
            El Génesis y el Apocalipsis de la Era Dorada de los Superdeportivos Italianos
          </p>

          <p className="mt-6 text-[#a2a8b2] text-sm sm:text-base leading-relaxed max-w-3xl">
            Desde la célebre ofensa que llevó a Ferruccio Lamborghini a construir el primer superdeportivo de motor central transversal, hasta la última y visceral obra maestra aprobada personalmente por Enzo Ferrari antes de morir. Veinte capítulos de ingeniería pura, audacia analógica y velocidad sin filtros electrónicos.
          </p>

          {/* Quick Stats Grid */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 p-4 bg-black/60 border border-white/15 backdrop-blur-md">
            {f40MiuraStats.map((stat, idx) => (
              <div key={idx} className="p-2 border-r last:border-r-0 border-white/10">
                <span className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {stat.value}{' '}
                  <span className="text-xs font-mono font-bold text-[#ff7173]">
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
              className="px-6 py-3.5 bg-[#d92f31] hover:bg-[#b82325] text-white text-xs font-bold tracking-[0.18em] uppercase transition-all shadow-[0_4px_20px_rgba(217,47,49,0.35)]"
            >
              Comenzar Lectura (Cap. 01) →
            </button>
            <button
              onClick={() => scrollToSection('comparativa-tecnica')}
              className="px-6 py-3.5 border border-white/20 hover:border-white/50 text-[#cfd3db] hover:text-white text-xs font-semibold tracking-[0.16em] uppercase transition-all"
            >
              Fichas Técnicas & Comparativa ↓
            </button>
          </div>
        </div>
      </section>

      {/* Visual Engineering Gallery Section */}
      <section
        id="f40-miura-gallery-section"
        className="px-6 sm:px-12 md:px-24 py-16 bg-[#080a0d] border-b border-white/10"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-[10px] font-mono font-bold tracking-[0.24em] text-[#ff7173] uppercase">
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
                className="group relative border border-white/15 bg-[#101318] overflow-hidden cursor-pointer hover:border-[#d92f31] transition-all"
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
            className="max-w-5xl w-full bg-[#0d1014] border border-white/20 p-4 sm:p-6 shadow-2xl relative"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-xs font-mono px-3 py-1 bg-white/10 hover:bg-[#d92f31] text-white transition-colors"
            >
              CERRAR [ ✕ ]
            </button>

            <span className="text-[10px] font-mono text-[#ff7173] tracking-widest uppercase block mb-2">
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
        id="comparativa-tecnica"
        className="px-6 sm:px-12 md:px-24 py-16 bg-[#0a0d12] border-b border-white/10"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[10px] font-mono font-bold tracking-[0.24em] text-[#ffd451] uppercase">
              // TELEMETRÍA & ESPECIFICACIONES
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
              Fichas Técnicas Comparativas
            </h2>
            <p className="text-xs sm:text-sm text-[#8a929e] mt-2">
              Contraste directo entre el V12 transversal atmosférico del Miura SV y el V8 biturbo en composites del Ferrari F40.
            </p>

            {/* Toggle Tabs */}
            <div className="inline-flex mt-6 p-1 bg-black/60 border border-white/15">
              <button
                onClick={() => setActiveTab('comparativa')}
                className={`px-4 py-2 text-xs font-mono font-bold uppercase transition-all ${
                  activeTab === 'comparativa'
                    ? 'bg-[#d92f31] text-white'
                    : 'text-[#8a929e] hover:text-white'
                }`}
              >
                Comparativa Paralela
              </button>
              <button
                onClick={() => setActiveTab('f40')}
                className={`px-4 py-2 text-xs font-mono font-bold uppercase transition-all ${
                  activeTab === 'f40'
                    ? 'bg-[#d92f31] text-white'
                    : 'text-[#8a929e] hover:text-white'
                }`}
              >
                Solo Ferrari F40
              </button>
              <button
                onClick={() => setActiveTab('miura')}
                className={`px-4 py-2 text-xs font-mono font-bold uppercase transition-all ${
                  activeTab === 'miura'
                    ? 'bg-[#ffd451] text-black'
                    : 'text-[#8a929e] hover:text-white'
                }`}
              >
                Solo Miura SV
              </button>
            </div>
          </div>

          {/* Table Container */}
          <div className="border border-white/15 bg-[#0e1218] overflow-x-auto shadow-xl">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/15 bg-black/60">
                  <th className="p-4 text-[#8a929e] uppercase font-bold tracking-wider">
                    Parámetro
                  </th>
                  {(activeTab === 'comparativa' || activeTab === 'miura') && (
                    <th className="p-4 text-[#ffd451] uppercase font-black tracking-wider border-l border-white/10">
                      Lamborghini Miura SV (1971)
                    </th>
                  )}
                  {(activeTab === 'comparativa' || activeTab === 'f40') && (
                    <th className="p-4 text-[#ff7173] uppercase font-black tracking-wider border-l border-white/10">
                      Ferrari F40 (1987)
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {f40MiuraSpecs.f40.map((f40Item, idx) => {
                  const miuraItem = f40MiuraSpecs.miura[idx] || {
                    label: f40Item.label,
                    value: '—',
                  };
                  return (
                    <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                      <td className="p-3.5 text-[#8a929e] font-medium">
                        {f40Item.label}
                      </td>
                      {(activeTab === 'comparativa' || activeTab === 'miura') && (
                        <td className="p-3.5 text-[#cfd3db] font-semibold border-l border-white/10">
                          {miuraItem.value}
                        </td>
                      )}
                      {(activeTab === 'comparativa' || activeTab === 'f40') && (
                        <td className="p-3.5 text-white font-bold border-l border-white/10">
                          {f40Item.value}
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
        {f40MiuraChapters.map((chapter) => (
          <article
            key={chapter.number}
            id={`capitulo-${chapter.number}`}
            className="scroll-mt-24 border-b border-white/10 pb-16 last:border-b-0"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 bg-[#d92f31]/20 border border-[#d92f31]/50 text-[#ff7173]">
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
              <div className="mt-8 p-5 bg-[#0e1218] border border-white/15 border-l-4 border-l-[#d92f31] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-mono font-bold tracking-widest text-[#ff7173] uppercase">
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
      <section className="px-6 sm:px-12 md:px-24 py-20 bg-[#080a0d] border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <span className="text-[10px] font-mono font-bold tracking-[0.24em] text-[#ff7173] uppercase block mb-1">
            // CRONOLOGÍA HISTÓRICA
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Línea de Tiempo: 1963 — 1992
          </h2>

          <div className="mt-12 space-y-8 relative before:absolute before:top-3 before:bottom-3 before:left-4 sm:before:left-24 before:w-[1px] before:bg-white/20">
            {f40MiuraTimeline.map((item, idx) => (
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
                <div className="absolute left-[13px] sm:left-[93px] top-1.5 w-2 h-2 rounded-full bg-[#d92f31] border-2 border-black" />

                {/* Content */}
                <div className="flex-1 bg-[#101318] p-5 border border-white/10">
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
      <section className="px-6 sm:px-12 md:px-24 py-16 bg-[#06080a] border-t border-white/10">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#8a929e] uppercase block">
              SIGUIENTE DOCUMENTAL RECOMENDADO
            </span>
            <h3 className="text-xl font-bold text-white mt-1">
              Documental 001: Jaguar XJ220 · El Dios Caído
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('xj220')}
              className="px-6 py-3 bg-[#4ea0ff] hover:bg-[#72b5ff] text-black text-xs font-bold tracking-[0.16em] uppercase transition-all"
            >
              Leer XJ220 →
            </button>
            <button
              onClick={() => onNavigate('documentales')}
              className="px-6 py-3 border border-white/20 hover:border-white/40 text-white text-xs font-bold tracking-[0.16em] uppercase transition-all"
            >
              Ver Índice →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
