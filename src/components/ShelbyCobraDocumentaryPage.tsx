import React, { useState, useEffect } from 'react';
import { RoutePage } from '../types';
import { AudioNarrator } from './AudioNarrator';
import {
  shelbyCobraChapters,
  shelbyCobraStats,
  shelbyCobraTimeline,
  shelbyCobraSpecs,
  shelbyCobraImages,
} from '../data/shelbyCobraData';
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
} from 'lucide-react';

interface ShelbyCobraDocumentaryPageProps {
  onNavigate: (page: RoutePage) => void;
  onOpenAuthModal?: (reason?: string) => void;
}

export const ShelbyCobraDocumentaryPage: React.FC<ShelbyCobraDocumentaryPageProps> = ({
  onNavigate,
  onOpenAuthModal,
}) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSpecTab, setActiveSpecTab] = useState<'street' | 'sc' | 'supersnake'>('sc');
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
      src: shelbyCobraImages.hero,
      alt: '1965 Shelby Cobra 427 S/C en Guardsman Blue',
      caption:
        'El biplaza descapotable más temido del planeta: carrocería de aluminio británica con franjas gemelas Le Mans y escapes laterales directos.',
      tag: 'PIEZA 01 // GUARDSMAN BLUE & 427 S/C',
    },
    {
      src: shelbyCobraImages.engine,
      alt: 'Motor Ford 427 FE Big Block Side-Oiler V8',
      caption:
        'Siete litros de cilindrada, carburadores dobles Holley de competición y tapas de balancines con aletas Cobra de fundición.',
      tag: 'PIEZA 02 // 427 FE SIDE-OILER V8',
    },
    {
      src: shelbyCobraImages.action,
      alt: 'Shelby Cobra 427 derrapando en circuito a alta velocidad',
      caption:
        'El monstruo angloamericano desatando 678 Nm de par motor sobre neumáticos Goodyear de carreras con estela de goma quemada.',
      tag: 'PIEZA 03 // GUERRA EN RIVERSIDE & LE MANS',
    },
    {
      src: shelbyCobraImages.cad,
      alt: 'Plano técnico del chasis tubular de acero de 4 pulgadas',
      caption:
        'Esquema computacional de cotas de ingeniería del chasis reforzado de tubos principales de 4 pulgadas y suspensión independiente.',
      tag: 'PIEZA 04 // INGENIERÍA DE CHASIS TUBULAR',
    },
  ];

  return (
    <div className="min-h-screen bg-[#060b14] text-[#efefed] selection:bg-[#38bdf8] selection:text-black pb-20 md:pb-0">
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-white/10 z-[100]">
        <div
          className="h-full bg-gradient-to-r from-[#2563eb] via-[#38bdf8] to-[#60a5fa] transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Header bar */}
      <header className="sticky top-0 z-40 bg-[#060b14]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-12 md:px-24 py-3.5 sm:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="cobra-back-to-docs-btn"
            onClick={() => onNavigate('documentales')}
            className="flex items-center gap-1.5 text-xs font-mono tracking-widest text-[#9da0a5] hover:text-white uppercase transition-colors cursor-pointer"
          >
            <span>←</span>
            <span className="hidden sm:inline">DOCUMENTALES</span>
            <span className="sm:hidden">DOCS</span>
          </button>
          <span className="text-white/20">/</span>
          <span className="text-[10px] font-mono tracking-widest px-2 py-0.5 border border-[#38bdf8]/40 bg-[#38bdf8]/10 text-[#7dd3fc]">
            DOC 010
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => scrollToSection('cobra-gallery-section')}
            className="hidden sm:inline-block px-3 py-1.5 border border-white/15 text-[10px] font-bold tracking-[0.16em] uppercase text-[#cfd3db] hover:text-white hover:border-white/40 transition-all font-mono cursor-pointer"
          >
            GALERÍA & PLANOS
          </button>

          <button
            onClick={() => scrollToSection('cobra-specs-section')}
            className="hidden sm:inline-block px-3 py-1.5 border border-[#38bdf8]/40 bg-[#38bdf8]/10 text-[10px] font-bold tracking-[0.16em] uppercase text-[#7dd3fc] hover:text-white hover:border-[#38bdf8] transition-all font-mono cursor-pointer"
          >
            ESPECIFICACIONES
          </button>

          <button
            onClick={() => setShowIndexMenu(!showIndexMenu)}
            className="px-2.5 sm:px-3.5 py-1.5 border border-[#38bdf8]/40 bg-[#38bdf8]/10 text-[10px] font-bold tracking-wider sm:tracking-[0.16em] uppercase text-[#7dd3fc] hover:bg-[#38bdf8] hover:text-black transition-all whitespace-nowrap font-mono cursor-pointer"
          >
            ÍNDICE ({shelbyCobraChapters.length} CAP.)
          </button>
        </div>
      </header>

      {/* Persistent Audio Narrator Bar */}
      <AudioNarrator
        docId="shelby-cobra"
        documentaryTitle="SHELBY COBRA: EL VENENO ANALÓGICO QUE DERROTÓ A FERRARI"
        chapters={shelbyCobraChapters}
        accentColor="#38bdf8"
        onChapterSelect={(idx) => {
          const chap = shelbyCobraChapters[idx];
          if (chap) {
            scrollToSection(`capitulo-${chap.number}`);
          }
        }}
        onOpenAuthModal={onOpenAuthModal}
      />

      {/* Quick Index Dropdown Drawer */}
      {showIndexMenu && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end animate-fadeIn">
          <div className="w-full max-w-md h-full bg-[#081220] border-l border-white/15 p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#7dd3fc] uppercase">
                    TABLA DE CONTENIDOS
                  </span>
                  <h3 className="text-lg font-bold font-mono text-white">
                    Capítulos Shelby Cobra (1962—1967)
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
                {shelbyCobraChapters.map((chap) => (
                  <button
                    key={chap.number}
                    onClick={() => scrollToSection(`capitulo-${chap.number}`)}
                    className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-[#38bdf8]/15 border border-white/5 hover:border-[#38bdf8]/40 transition-all flex items-start gap-3 group cursor-pointer"
                  >
                    <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold text-xs group-hover:bg-[#38bdf8] group-hover:text-black transition-colors shrink-0">
                      {chap.number}
                    </span>
                    <div>
                      <span className="text-[10px] text-[#7dd3fc] block leading-tight">
                        {chap.category}
                      </span>
                      <span className="text-xs font-bold text-white group-hover:text-[#ffd451] transition-colors leading-snug">
                        {chap.title}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 text-center text-xs font-mono text-[#8bb4d9]">
              Documental Extendido AutoArchive // Carroll Shelby & Ken Miles
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-12 md:px-24 py-16 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src={shelbyCobraImages.hero}
            alt="Shelby Cobra 427 S/C"
            className="w-full h-full object-cover object-center opacity-40 scale-105 transform hover:scale-100 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#060b14] via-[#060b14]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060b14] via-transparent to-[#060b14]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#38bdf8]/40 bg-[#38bdf8]/10 text-xs font-mono font-bold tracking-widest text-[#7dd3fc] uppercase animate-pulse">
            <Flame className="w-4 h-4 text-[#38bdf8]" />
            <span>LA REVOLUCIÓN DEL MÚSCULO ANGLOAMERICANO (1962 — 1967)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black font-mono tracking-tight text-white leading-none uppercase">
            SHELBY <span className="text-[#38bdf8]">COBRA 427</span>
          </h1>

          <p className="text-lg sm:text-2xl font-mono text-[#ffd451] max-w-3xl mx-auto font-light leading-snug">
            El Veneno Analógico de Carroll Shelby que Humilló a Enzo Ferrari
          </p>

          <p className="text-xs sm:text-sm text-[#9da0a5] font-mono max-w-2xl mx-auto leading-relaxed">
            De la carrocería de aluminio artesanal de AC Cars y el motor Ford V8 de NASCAR a la corona mundial FIA de 1965 y el mito invencible del 427 S/C Semi-Competition.
          </p>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-6 max-w-4xl mx-auto">
            {shelbyCobraStats.map((st, i) => (
              <div
                key={i}
                className="bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-xl text-center group hover:border-[#38bdf8]/50 transition-colors"
              >
                <div className="text-xl sm:text-2xl font-black font-mono text-white group-hover:text-[#38bdf8] transition-colors">
                  {st.value}
                </div>
                <div className="text-[9px] font-mono text-[#38bdf8] font-bold tracking-wider">
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
        {shelbyCobraChapters.map((chap) => (
          <article
            key={chap.number}
            id={`capitulo-${chap.number}`}
            className="scroll-mt-28 space-y-8"
          >
            {/* Chapter Header */}
            <div className="space-y-3 border-b border-white/10 pb-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-[#38bdf8]/15 border border-[#38bdf8]/40 text-[#7dd3fc] text-xs font-mono font-bold rounded-md">
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
                <p className="text-sm sm:text-base font-mono text-[#38bdf8] leading-relaxed">
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
                  <span className="px-2 py-0.5 bg-[#38bdf8]/20 border border-[#38bdf8]/40 text-[#7dd3fc] text-[10px] rounded mr-2">
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
              <div className="bg-gradient-to-r from-[#38bdf8]/10 via-white/5 to-transparent border-l-4 border-[#38bdf8] p-5 rounded-r-xl space-y-1">
                <div className="text-2xl font-black font-mono text-[#38bdf8]">
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
      <section className="bg-[#040810] border-y border-white/10 py-16 px-4 sm:px-12 md:px-24">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono tracking-widest text-[#38bdf8] uppercase">
              CRONOLOGÍA HISTÓRICA
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-mono text-white uppercase">
              La Saga Inmortal del Cobra
            </h2>
          </div>

          <div className="relative border-l border-[#38bdf8]/30 ml-4 sm:ml-8 space-y-8">
            {shelbyCobraTimeline.map((item, idx) => (
              <div key={idx} className="relative pl-6 sm:pl-8 group">
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#060b14] border-2 border-[#38bdf8] group-hover:bg-[#38bdf8] transition-colors" />
                <div className="text-xs font-mono font-bold text-[#38bdf8] mb-1">
                  {item.year}
                </div>
                <h3 className="text-base sm:text-lg font-bold font-mono text-white group-hover:text-[#ffd451] transition-colors">
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
        id="cobra-specs-section"
        className="py-16 px-4 sm:px-12 md:px-24 max-w-5xl mx-auto space-y-10"
      >
        <div className="text-center space-y-3">
          <span className="text-xs font-mono tracking-widest text-[#38bdf8] uppercase">
            FICHA TÉCNICA Y RENDIMIENTO
          </span>
          <h2 className="text-2xl sm:text-4xl font-black font-mono text-white uppercase">
            Especificaciones de Ingeniería
          </h2>
        </div>

        {/* Tab Controls */}
        <div className="flex justify-center gap-2 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveSpecTab('street')}
            className={`px-4 py-2 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
              activeSpecTab === 'street'
                ? 'bg-[#38bdf8] text-black shadow-lg shadow-[#38bdf8]/20'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            427 CALLE (425 CV)
          </button>
          <button
            onClick={() => setActiveSpecTab('sc')}
            className={`px-4 py-2 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
              activeSpecTab === 'sc'
                ? 'bg-[#38bdf8] text-black shadow-lg shadow-[#38bdf8]/20'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            427 S/C SEMI-COMPETITION (485 CV)
          </button>
          <button
            onClick={() => setActiveSpecTab('supersnake')}
            className={`px-4 py-2 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
              activeSpecTab === 'supersnake'
                ? 'bg-[#38bdf8] text-black shadow-lg shadow-[#38bdf8]/20'
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            SUPER SNAKE (800+ CV)
          </button>
        </div>

        {/* Specs Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(activeSpecTab === 'street'
            ? shelbyCobraSpecs.street427
            : activeSpecTab === 'sc'
            ? shelbyCobraSpecs.sc427
            : shelbyCobraSpecs.superSnake
          ).map((spec, idx) => (
            <div
              key={idx}
              className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between font-mono text-xs hover:border-[#38bdf8]/40 transition-colors"
            >
              <span className="text-[#8b929e] uppercase">{spec.label}</span>
              <span className="text-white font-bold text-right ml-4">{spec.value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Visual Gallery & Blueprints */}
      <section
        id="cobra-gallery-section"
        className="bg-[#040810] border-t border-white/10 py-16 px-4 sm:px-12 md:px-24"
      >
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono tracking-widest text-[#38bdf8] uppercase">
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
                  <span className="text-[10px] font-mono font-bold text-[#38bdf8] bg-black/60 px-2 py-0.5 rounded border border-[#38bdf8]/30">
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
            className="max-w-4xl w-full bg-[#081220] border border-white/20 rounded-2xl overflow-hidden space-y-4"
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
              <span className="text-xs font-mono font-bold text-[#38bdf8] uppercase">
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
      <footer className="bg-[#03060a] border-t border-white/10 py-10 px-4 sm:px-12 md:px-24 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#8b929e]">
        <button
          onClick={() => onNavigate('documentales')}
          className="hover:text-white transition-colors flex items-center gap-1.5"
        >
          <span>←</span> VOLVER AL CATÁLOGO DE DOCUMENTALES
        </button>
        <div>AUTOARCHIVE MONOGRAFÍAS // SHELBY AMERICAN #010</div>
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-[#38bdf8] hover:underline"
        >
          ↑ VOLVER ARRIBA
        </button>
      </footer>
    </div>
  );
};
