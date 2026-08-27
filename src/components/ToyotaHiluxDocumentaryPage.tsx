import React, { useState, useEffect } from 'react';
import { RoutePage } from '../types';
import { AudioNarrator } from './AudioNarrator';
import {
  toyotaHiluxChapters,
  toyotaHiluxStats,
  toyotaHiluxTimeline,
  toyotaHiluxSpecs,
  toyotaHiluxImages,
} from '../data/toyotaHiluxData';
import {
  Layers,
  Sparkles,
  Trophy,
  Gauge,
  Zap,
  Flame,
  Clock,
  Compass,
  ArrowRight,
  ShieldAlert,
  Sliders,
  ChevronDown,
  X,
  FileText,
  Mountain,
} from 'lucide-react';

interface ToyotaHiluxDocumentaryPageProps {
  onNavigate: (page: RoutePage) => void;
  onOpenAuthModal?: (reason?: string) => void;
}

export const ToyotaHiluxDocumentaryPage: React.FC<ToyotaHiluxDocumentaryPageProps> = ({
  onNavigate,
  onOpenAuthModal,
}) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSpecTab, setActiveSpecTab] = useState<'classic' | 'dakar' | 'arctic'>('classic');
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
    caption: string;
    tag: string;
  } | null>(null);
  const [showIndexMenu, setShowIndexMenu] = useState(false);

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
      src: toyotaHiluxImages.hero,
      alt: 'Clásica Toyota Hilux 4x4 en paso montañoso',
      caption:
        'La leyenda del todoterreno japonés: chasis de largueros de acero en cajón, caja reductora y neumáticos para barro.',
      tag: 'PIEZA 01 // INDESTRUCTIBLE 4X4',
    },
    {
      src: toyotaHiluxImages.engine,
      alt: 'Vano motor del propulsor Toyota 22R y Diésel',
      caption:
        'Bloque de fundición pesada, cadena de distribución de doble rodillo y simplicidad mecánica capaz de superar el millón de kilómetros.',
      tag: 'PIEZA 02 // 22R & 1KD BULLETPROOF ENGINES',
    },
    {
      src: toyotaHiluxImages.arctic,
      alt: 'Toyota Hilux Arctic Trucks en las nieves de la Antártida',
      caption:
        'Neumáticos gigantescos de flotación de 44 pulgadas conquistando el Polo Sur a 50 grados bajo cero sin fallos mecánicos.',
      tag: 'PIEZA 03 // EXPEDICIÓN POLAR ANTÁRTICA',
    },
    {
      src: toyotaHiluxImages.cad,
      alt: 'Plano técnico del chasis de escalera de la Toyota Hilux',
      caption:
        'Esquema de ingeniería de los largueros de sección rectangular cerrada, ballestas traseras y cinemática 4WD.',
      tag: 'PIEZA 04 // INGENIERÍA CAD & LADDER FRAME',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0e0d08] text-[#efefed] selection:bg-[#eab308] selection:text-black pb-20 md:pb-0">
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-white/10 z-[100]">
        <div
          className="h-full bg-gradient-to-r from-[#d97706] via-[#eab308] to-[#fde047] transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Header bar */}
      <header className="sticky top-0 z-40 bg-[#0e0d08]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-12 md:px-24 py-3.5 sm:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="hilux-back-to-docs-btn"
            onClick={() => onNavigate('documentales')}
            className="flex items-center gap-1.5 text-xs font-mono tracking-widest text-[#9da0a5] hover:text-white uppercase transition-colors cursor-pointer"
          >
            <span>←</span>
            <span className="hidden sm:inline">DOCUMENTALES</span>
            <span className="sm:hidden">DOCS</span>
          </button>
          <span className="text-white/20">/</span>
          <span className="text-[10px] font-mono tracking-widest px-2 py-0.5 border border-[#eab308]/40 bg-[#eab308]/10 text-[#fde047]">
            DOC 011
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => scrollToSection('hilux-gallery-section')}
            className="hidden sm:inline-block px-3 py-1.5 border border-white/15 text-[10px] font-bold tracking-[0.16em] uppercase text-[#cfd3db] hover:text-white hover:border-white/40 transition-all font-mono cursor-pointer"
          >
            GALERÍA & PLANOS
          </button>

          <button
            onClick={() => scrollToSection('hilux-specs-section')}
            className="hidden sm:inline-block px-3 py-1.5 border border-[#eab308]/40 bg-[#eab308]/10 text-[10px] font-bold tracking-[0.16em] uppercase text-[#fde047] hover:text-white hover:border-[#eab308] transition-all font-mono cursor-pointer"
          >
            ESPECIFICACIONES
          </button>

          <button
            onClick={() => setShowIndexMenu(!showIndexMenu)}
            className="px-2.5 sm:px-3.5 py-1.5 border border-[#eab308]/40 bg-[#eab308]/10 text-[10px] font-bold tracking-wider sm:tracking-[0.16em] uppercase text-[#fde047] hover:bg-[#eab308] hover:text-black transition-all whitespace-nowrap font-mono cursor-pointer"
          >
            ÍNDICE ({toyotaHiluxChapters.length} CAP.)
          </button>
        </div>
      </header>

      {/* Persistent Audio Narrator Bar */}
      <AudioNarrator
        docId="toyota-hilux"
        documentaryTitle="TOYOTA HILUX: EL MONOLITO INDESTRUCTIBLE DE LA RESISTENCIA HUMANA"
        chapters={toyotaHiluxChapters}
        accentColor="#eab308"
        onChapterSelect={(idx) => {
          const chap = toyotaHiluxChapters[idx];
          if (chap) {
            scrollToSection(`capitulo-${chap.number}`);
          }
        }}
        onOpenAuthModal={onOpenAuthModal}
      />

      {/* Quick Index Dropdown Drawer */}
      {showIndexMenu && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end animate-fadeIn">
          <div className="w-full max-w-md h-full bg-[#141209] border-l border-white/15 p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#fde047] uppercase">
                    TABLA DE CONTENIDOS
                  </span>
                  <h3 className="text-lg font-bold font-mono text-white">
                    Capítulos Toyota Hilux (1968—Presente)
                  </h3>
                </div>
                <button
                  onClick={() => setShowIndexMenu(false)}
                  className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2 font-mono">
                {toyotaHiluxChapters.map((chap) => (
                  <button
                    key={chap.number}
                    onClick={() => scrollToSection(`capitulo-${chap.number}`)}
                    className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-[#eab308]/15 border border-white/5 hover:border-[#eab308]/40 transition-all flex items-start gap-3 group cursor-pointer"
                  >
                    <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold text-xs group-hover:bg-[#eab308] group-hover:text-black transition-colors shrink-0">
                      {chap.number}
                    </span>
                    <div>
                      <span className="text-[10px] text-[#fde047] block leading-tight">
                        {chap.category}
                      </span>
                      <span className="text-xs font-bold text-white group-hover:text-[#fde047] transition-colors leading-snug">
                        {chap.title}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 text-center text-xs font-mono text-[#8bb4d9]">
              Documental Extendido AutoArchive // Toyota Motor & Hino Motors
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-12 md:px-24 py-16 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src={toyotaHiluxImages.hero}
            alt="Toyota Hilux 4x4"
            className="w-full h-full object-cover object-center opacity-40 scale-105 transform hover:scale-100 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0d08] via-[#0e0d08]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e0d08] via-transparent to-[#0e0d08]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#eab308]/40 bg-[#eab308]/10 text-xs font-mono font-bold tracking-widest text-[#fde047] uppercase animate-pulse">
            <Mountain className="w-4 h-4 text-[#eab308]" />
            <span>EL PATRÓN MUNDIAL DE LA INDESTRUCTIBILIDAD (1968 — PRESENTE)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black font-mono tracking-tight text-white leading-none uppercase">
            TOYOTA <span className="text-[#eab308]">HILUX</span>
          </h1>

          <p className="text-lg sm:text-2xl font-mono text-[#fde047] max-w-3xl mx-auto font-light leading-snug">
            El Mito Mecánico que Venció al Mar, al Fuego, a la Dinamita y a los Polos
          </p>

          <p className="text-xs sm:text-sm text-[#9da0a5] font-mono max-w-2xl mx-auto leading-relaxed">
            Más de 19 millones de unidades en 180 países. Del motor 22R de hierro fundido y el eje rígido al colapso de 23 pisos en Top Gear y las victorias en el Rally Dakar.
          </p>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-6 max-w-4xl mx-auto">
            {toyotaHiluxStats.map((st, i) => (
              <div
                key={i}
                className="bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-xl text-center group hover:border-[#eab308]/50 transition-colors"
              >
                <div className="text-xl sm:text-2xl font-black font-mono text-white group-hover:text-[#eab308] transition-colors">
                  {st.value}
                </div>
                <div className="text-[9px] font-mono text-[#eab308] font-bold tracking-wider">
                  {st.unit}
                </div>
                <div className="text-[9px] font-mono text-[#8b929e] mt-1 line-clamp-2 leading-tight">
                  {st.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapters Content Flow */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 py-16 space-y-24">
        {toyotaHiluxChapters.map((chap) => (
          <article
            key={chap.number}
            id={`capitulo-${chap.number}`}
            className="scroll-mt-28 space-y-8"
          >
            {/* Chapter Header */}
            <div className="space-y-3 border-b border-white/10 pb-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-[#eab308]/15 border border-[#eab308]/40 text-[#fde047] text-xs font-mono font-bold rounded-md">
                  CAPÍTULO {chap.number}
                </span>
                <span className="text-xs font-mono tracking-widest text-[#8b929e] uppercase">
                  {chap.category}
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black font-mono text-white leading-tight">
                {chap.title}
              </h2>

              {chap.subtitle && (
                <p className="text-sm sm:text-base font-mono text-[#eab308] leading-relaxed">
                  {chap.subtitle}
                </p>
              )}
            </div>

            {/* Chapter Image if exists */}
            {chap.image && (
              <div className="relative rounded-2xl overflow-hidden border border-white/10 group">
                <img
                  src={chap.image.src}
                  alt={chap.image.alt}
                  className="w-full h-[280px] sm:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-white/90">
                  <span className="px-2 py-0.5 bg-[#eab308]/20 border border-[#eab308]/40 text-[#fde047] text-[10px] rounded mr-2">
                    {chap.image.tag}
                  </span>
                  {chap.image.caption}
                </div>
              </div>
            )}

            {/* Paragraphs */}
            <div className="space-y-6 text-sm sm:text-base leading-relaxed text-[#cfd3db] font-sans">
              {chap.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            {/* Chapter Highlight Callout */}
            {chap.highlight && (
              <div className="bg-gradient-to-r from-[#eab308]/10 via-white/5 to-transparent border-l-4 border-[#eab308] p-5 rounded-r-xl space-y-1">
                <div className="text-2xl font-black font-mono text-[#eab308]">
                  {chap.highlight.value}
                </div>
                <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  {chap.highlight.label}
                </div>
                {chap.highlight.description && (
                  <div className="text-xs text-[#9da0a5] font-mono leading-relaxed pt-1">
                    {chap.highlight.description}
                  </div>
                )}
              </div>
            )}
          </article>
        ))}
      </section>

      {/* Timeline Section */}
      <section className="bg-[#080704] border-y border-white/10 py-16 px-4 sm:px-12 md:px-24">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono tracking-widest text-[#eab308] uppercase">
              CRONOLOGÍA HISTÓRICA
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-mono text-white uppercase">
              La Dinastía Indestructible
            </h2>
          </div>

          <div className="relative border-l border-[#eab308]/30 ml-4 sm:ml-8 space-y-8">
            {toyotaHiluxTimeline.map((item, idx) => (
              <div key={idx} className="relative pl-6 sm:pl-8 group">
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#0e0d08] border-2 border-[#eab308] group-hover:bg-[#eab308] transition-colors" />
                <div className="text-xs font-mono font-bold text-[#eab308] mb-1">
                  {item.year}
                </div>
                <h3 className="text-base sm:text-lg font-bold font-mono text-white group-hover:text-[#fde047] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#9da0a5] mt-1.5 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specs Section with Tabs */}
      <section
        id="hilux-specs-section"
        className="py-16 px-4 sm:px-12 md:px-24 max-w-5xl mx-auto space-y-10"
      >
        <div className="text-center space-y-3">
          <span className="text-xs font-mono tracking-widest text-[#eab308] uppercase">
            FICHA TÉCNICA Y RESISTENCIA
          </span>
          <h2 className="text-2xl sm:text-4xl font-black font-mono text-white uppercase">
            Especificaciones de Ingeniería
          </h2>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center gap-2 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveSpecTab('classic')}
            className={`px-4 py-2 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
              activeSpecTab === 'classic'
                ? 'bg-[#eab308] text-black shadow-lg shadow-[#eab308]/20'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            HILUX 4X4 22R CLÁSICA (1985)
          </button>
          <button
            onClick={() => setActiveSpecTab('dakar')}
            className={`px-4 py-2 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
              activeSpecTab === 'dakar'
                ? 'bg-[#eab308] text-black shadow-lg shadow-[#eab308]/20'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            GR DKR HILUX T1+ DAKAR (400 CV)
          </button>
          <button
            onClick={() => setActiveSpecTab('arctic')}
            className={`px-4 py-2 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
              activeSpecTab === 'arctic'
                ? 'bg-[#eab308] text-black shadow-lg shadow-[#eab308]/20'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            ARCTIC TRUCKS AT44 POLAR
          </button>
        </div>

        {/* Specs Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(activeSpecTab === 'classic'
            ? toyotaHiluxSpecs.classicGen4
            : activeSpecTab === 'dakar'
            ? toyotaHiluxSpecs.gen8Dakar
            : toyotaHiluxSpecs.arcticExpedition
          ).map((spec, idx) => (
            <div
              key={idx}
              className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between font-mono text-xs hover:border-[#eab308]/40 transition-colors"
            >
              <span className="text-[#8b929e] uppercase">{spec.label}</span>
              <span className="text-white font-bold text-right ml-4">{spec.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Visual Gallery & Blueprints */}
      <section
        id="hilux-gallery-section"
        className="bg-[#080704] border-t border-white/10 py-16 px-4 sm:px-12 md:px-24"
      >
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono tracking-widest text-[#eab308] uppercase">
              ARCHIVO VISUAL & CAD
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-mono text-white uppercase">
              Galería Técnica y Planos
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {galleryItems.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(item)}
                className="group relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/10 cursor-pointer bg-black"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-mono font-bold text-[#eab308] bg-black/60 px-2 py-0.5 rounded border border-[#eab308]/30">
                    {item.tag}
                  </span>
                  <p className="text-xs font-mono text-white mt-1.5 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal Lightbox */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full bg-[#141209] border border-white/20 rounded-2xl overflow-hidden space-y-4"
          >
            <div className="relative">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full max-h-[70vh] object-contain bg-black"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/70 text-white hover:bg-white hover:text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 pt-0 space-y-2">
              <span className="text-xs font-mono font-bold text-[#eab308] uppercase">
                {selectedImage.tag}
              </span>
              <p className="text-sm font-mono text-white/90 leading-relaxed">
                {selectedImage.caption}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Footer Navigation */}
      <footer className="bg-[#050402] border-t border-white/10 py-10 px-4 sm:px-12 md:px-24 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#8b929e]">
        <button
          onClick={() => onNavigate('documentales')}
          className="hover:text-white transition-colors flex items-center gap-1.5"
        >
          <span>←</span> VOLVER AL CATÁLOGO DE DOCUMENTALES
        </button>
        <div>AUTOARCHIVE MONOGRAFÍAS // TOYOTA MOTOR #011</div>
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-[#eab308] hover:underline"
        >
          ↑ VOLVER ARRIBA
        </button>
      </footer>
    </div>
  );
};
