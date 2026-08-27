import React, { useState, useEffect } from 'react';
import { RoutePage } from '../types';
import { AudioNarrator } from './AudioNarrator';
import {
  nsxChapters,
  nsxStats,
  nsxTimeline,
  nsxSpecs,
  nsxImages,
} from '../data/nsxData';

interface NsxDocumentaryPageProps {
  onNavigate: (page: RoutePage) => void;
  onOpenAuthModal?: (reason?: string) => void;
}

export const NsxDocumentaryPage: React.FC<NsxDocumentaryPageProps> = ({ onNavigate, onOpenAuthModal }) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeVariantTab, setActiveVariantTab] = useState<'standard' | 'nsxr' | 'targa' | 'gt2'>('standard');
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
      src: nsxImages.hero,
      alt: 'Honda NSX NA1 en Formula Red',
      caption:
        'Silueta limpia inspirada en la burbuja de un caza F-16 con faros escamoteables y carrocería de aluminio.',
      tag: 'PIEZA 01 // NSX NA1 FORMULA RED 1990',
    },
    {
      src: nsxImages.senna,
      alt: 'Ayrton Senna en Suzuka probando el NSX',
      caption:
        'Ayrton Senna pilotando el prototipo en Suzuka para diagnosticar y exigir un 50% más de rigidez torsional.',
      tag: 'PIEZA 02 // AYRTON SENNA SUZUKA TEST 1989',
    },
    {
      src: nsxImages.engine,
      alt: 'Motor V6 C30A VTEC en vano motor',
      caption:
        'Bloque C30A de 3.0L V6 atmosférico con bielas de titanio de fábrica y tapas rojas VTEC.',
      tag: 'PIEZA 03 // C30A VTEC 3.0L V6 ATMOSFÉRICO',
    },
    {
      src: nsxImages.cad,
      alt: 'Plano técnico CAD del chasis de aluminio',
      caption: 'Plano de ingeniería del primer chasis monocasco integral de aluminio en producción masiva.',
      tag: 'PIEZA 04 // ALUMINIUM MONOCOQUE CAD',
    },
  ];

  return (
    <div className="min-h-screen bg-[#070e17] text-[#edf5ff] flex flex-col justify-between selection:bg-[#e62628] selection:text-white pb-20 md:pb-0">
      {/* Scroll Progress Bar at the absolute top */}
      <div className="fixed top-0 left-0 w-full h-1 bg-[#0d1f33] z-50">
        <div
          className="h-full bg-gradient-to-r from-[#e62628] via-[#ffd451] to-white transition-all duration-75"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#070e17]/95 backdrop-blur-md border-b border-[#e62628]/25 px-4 sm:px-12 md:px-28 py-3.5 sm:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="nsx-back-to-docs-btn"
            onClick={() => onNavigate('documentales')}
            className="flex items-center gap-1.5 text-xs font-mono tracking-widest text-[#81b292] hover:text-white uppercase transition-colors"
          >
            <span>←</span>
            <span className="hidden sm:inline">DOCUMENTALES</span>
            <span className="sm:hidden">DOCS</span>
          </button>
          <span className="text-white/20">/</span>
          <span className="text-[10px] font-mono tracking-widest px-2 py-0.5 border border-[#e62628]/40 bg-[#e62628]/10 text-[#ff8082]">
            DOC 007
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => scrollToSection('ficha-tecnica')}
            className="hidden lg:inline-block text-[11px] font-mono tracking-wider text-[#81b292] hover:text-white transition-colors"
          >
            ESPECIFICACIONES
          </button>
          <button
            onClick={() => setShowIndexMenu(!showIndexMenu)}
            className="px-2.5 sm:px-3 py-1 border border-[#e62628]/40 bg-[#240c0d] hover:bg-[#e62628] hover:text-white text-[11px] sm:text-xs font-mono tracking-wider sm:tracking-widest uppercase transition-all rounded whitespace-nowrap"
          >
            ÍNDICE (20) {showIndexMenu ? '▲' : '▼'}
          </button>
        </div>
      </header>

      {/* Persistent Audio Narrator Bar */}
      <AudioNarrator
        docId="nsx"
        documentaryTitle="HONDA NSX (NA1)"
        chapters={nsxChapters}
        accentColor="#e62628"
        onChapterSelect={(idx) => {
          const chap = nsxChapters[idx];
          if (chap) {
            scrollToSection(`capitulo-${chap.number}`);
          }
        }}
        onOpenAuthModal={onOpenAuthModal}
      />

      {/* Chapters Index Dropdown Drawer */}
      {showIndexMenu && (
        <div className="sticky top-[65px] z-30 bg-[#091524] border-b border-[#e62628]/30 px-6 sm:px-12 md:px-24 py-6 shadow-2xl animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#ff8082]">
              // ÍNDICE COMPLETO DE CAPÍTULOS TÉCNICOS (HONDA NSX NA1)
            </span>
            <button
              onClick={() => setShowIndexMenu(false)}
              className="text-xs text-[#81b292] hover:text-white font-mono"
            >
              [ CERRAR ✕ ]
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-h-[60vh] overflow-y-auto pr-2">
            {nsxChapters.map((chap) => (
              <button
                key={chap.number}
                onClick={() => {
                  scrollToSection(`capitulo-${chap.number}`);
                  setShowIndexMenu(false);
                }}
                className="p-2.5 text-left border border-white/5 bg-[#0a1828] hover:border-[#e62628]/50 hover:bg-[#240c0d] transition-all rounded group"
              >
                <span className="text-[10px] font-mono font-black text-[#e62628] group-hover:text-white block">
                  CAPÍTULO {chap.number}
                </span>
                <span className="text-xs text-[#cfdceb] font-medium line-clamp-1 group-hover:text-white">
                  {chap.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Hero Header Section */}
      <section className="relative min-h-[55vh] sm:min-h-[65vh] flex items-end px-4 sm:px-12 md:px-28 py-12 sm:py-24 border-b border-[#e62628]/30 overflow-hidden bg-[#050b12]">
        <img
          src={nsxImages.hero}
          alt="Honda NSX NA1 en Formula Red"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-45 mix-blend-luminosity scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070e17] via-[#070e17]/70 to-transparent z-10" />
        <div className="absolute inset-0 grid-blueprint opacity-20 pointer-events-none z-10" />

        <div className="relative z-20 max-w-5xl space-y-6">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="px-3 py-1 bg-[#e62628]/20 border border-[#e62628]/60 text-[#ff7173] text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] uppercase rounded-full">
              ★ MONOGRAFÍA TÉCNICA 007
            </span>
            <span className="px-3 py-1 bg-[#22c55e]/15 border border-[#22c55e]/40 text-[#22c55e] text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] uppercase rounded-full">
              🇯🇵 TOCHIGI & SUZUKA
            </span>
            <span className="px-3 py-1 bg-[#ffd451]/15 border border-[#ffd451]/40 text-[#ffd451] text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] uppercase rounded-full">
              🏎️ PUESTA A PUNTO POR AYRTON SENNA
            </span>
          </div>

          <h1 className="text-[clamp(36px,8vw,100px)] font-black tracking-[-0.07em] leading-[0.88] text-white">
            HONDA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e62628] via-[#ffd451] to-white">
              NSX (1990)
            </span>
          </h1>

          <p className="max-w-3xl text-sm sm:text-lg text-[#b5cbdf] font-light leading-relaxed">
            El samurai de aluminio que reinventó el concepto de superdeportivo. Creado por Shigeru Uehara, esculpido con un chasis monocasco 100% de aluminio, un motor V6 C30A de 8.000 RPM con bielas de titanio y afinado quirúrgicamente por la leyenda de la F1 Ayrton Senna en el asfalto de Suzuka.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-white/10 font-mono">
            {nsxStats.map((stat, idx) => (
              <div key={idx} className="p-3 bg-black/50 border border-white/10 rounded-lg">
                <span className="block text-lg sm:text-2xl font-black text-[#e62628]">{stat.value}</span>
                <span className="block text-[10px] text-[#ffd451] font-bold uppercase">{stat.unit}</span>
                <span className="block text-[9px] text-[#81b292] mt-1 leading-tight">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Chapters Content */}
      <main className="flex-1 px-4 sm:px-12 md:px-28 py-10 sm:py-16 bg-[#070e17] space-y-16 sm:space-y-20">
        {/* Chapters Section */}
        <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16">
          {nsxChapters.map((chap) => (
            <article
              key={chap.number}
              id={`capitulo-${chap.number}`}
              className="space-y-4 sm:space-y-6 pt-8 sm:pt-10 border-t border-white/10 first:border-t-0 first:pt-0"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-xs font-mono font-black text-[#e62628] tracking-widest px-2.5 py-1 bg-[#e62628]/15 border border-[#e62628]/40 rounded">
                    CAPÍTULO {chap.number}
                  </span>
                  <span className="text-[11px] sm:text-xs font-mono text-[#81b292] uppercase tracking-widest truncate">
                    // {chap.category}
                  </span>
                </div>
                <h2 className="text-xl sm:text-4xl font-black text-white tracking-tight leading-snug sm:leading-tight">
                  {chap.title}
                </h2>
              </div>

              <div className="space-y-4 text-[15px] sm:text-base text-[#d1e0f0] font-normal sm:font-light leading-relaxed sm:leading-loose">
                {chap.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {/* Special Chapter Image if present */}
              {chap.image && (
                <div className="my-8 rounded-xl overflow-hidden border border-white/15 bg-black/60 group cursor-pointer" onClick={() => setSelectedImage(chap.image!)}>
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={chap.image.src}
                      alt={chap.image.alt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2 py-1 bg-black/80 text-[10px] font-mono text-[#ffd451] uppercase border border-[#ffd451]/30 rounded">
                      {chap.image.tag}
                    </div>
                  </div>
                  <div className="p-4 bg-[#0a1726] border-t border-white/10 text-xs font-mono text-[#81b292]">
                    {chap.image.caption}
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Gallery / Blueprint Grid */}
        <section className="max-w-5xl mx-auto space-y-8 pt-12 border-t border-white/15">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-bold text-[#ffd451] tracking-[0.2em] uppercase">
              // REGISTRO FOTOGRÁFICO Y CAD
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Galería Técnica y Planos del Honda NSX
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {galleryItems.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(item)}
                className="group relative bg-[#0b1b2b] border border-white/15 rounded-xl overflow-hidden cursor-pointer hover:border-[#e62628] transition-all"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#e62628] block">{item.tag}</span>
                  <p className="text-xs text-[#c7d6e5] font-light leading-snug">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Chronology Section */}
        <section id="cronologia" className="max-w-4xl mx-auto space-y-8 pt-12 border-t border-white/15">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-bold text-[#72b9ff] tracking-[0.2em] uppercase">
              // HISTORIA PASO A PASO
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Cronología Histórica del Honda NSX (1984 - 2005)
            </h3>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-[#e62628]/30">
            {nsxTimeline.map((item, idx) => (
              <div key={idx} className="relative pl-10 space-y-1">
                <div className="absolute left-2 top-1.5 w-3 h-3 rounded-full bg-[#e62628] border-2 border-black" />
                <span className="text-xs font-mono font-bold text-[#ffd451]">{item.year}</span>
                <h4 className="text-base font-bold text-white">{item.title}</h4>
                <p className="text-xs text-[#81b292] font-light leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Specifications Grid */}
        <section id="ficha-tecnica" className="max-w-4xl mx-auto space-y-8 pt-12 border-t border-white/15">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-bold text-[#22c55e] tracking-[0.2em] uppercase">
              // HOJA DE DATOS C30A & NA1
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Ficha Técnica Oficial del Honda NSX (NA1 1990)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {nsxSpecs.map((spec, idx) => (
              <div key={idx} className="p-4 bg-[#0a1726] border border-white/10 rounded-lg flex flex-col justify-between">
                <span className="text-[10px] font-mono text-[#81b292] uppercase tracking-wider">{spec.label}</span>
                <span className="text-sm font-bold text-white mt-1">{spec.value}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Image Modal Lightbox */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-pointer"
        >
          <div className="max-w-4xl w-full bg-[#081524] border border-white/20 rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-video">
              <img src={selectedImage.src} alt={selectedImage.alt} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/80 text-white flex items-center justify-center text-sm font-bold hover:bg-white hover:text-black transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-2">
              <span className="text-xs font-mono font-bold text-[#ffd451]">{selectedImage.tag}</span>
              <p className="text-sm text-[#c7d6e5] font-light">{selectedImage.caption}</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="px-6 sm:px-12 md:px-28 py-8 bg-[#04080e] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#81b292]">
        <button
          onClick={() => onNavigate('documentales')}
          className="hover:text-white transition-colors flex items-center gap-2"
        >
          <span>←</span> VOLVER AL CATÁLOGO DE DOCUMENTALES
        </button>

        <span className="text-[11px] text-white/60">
          AUTOARCHIVE HISTORICAL MONOGRAPH // HONDA NSX (1990)
        </span>

        <button
          onClick={() => onNavigate('datos')}
          className="hover:text-[#ffd451] text-[#ffd451] transition-colors font-bold"
        >
          DATOS CURIOSOS →
        </button>
      </footer>
    </div>
  );
};
