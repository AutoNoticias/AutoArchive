import React, { useState, useEffect } from 'react';
import { RoutePage } from '../types';
import { AudioNarrator } from './AudioNarrator';
import {
  camaroMustangChapters,
  camaroMustangStats,
  camaroMustangTimeline,
  camaroMustangSpecs,
  camaroMustangImages,
} from '../data/camaroMustangData';
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

interface CamaroMustangDocumentaryPageProps {
  onNavigate: (page: RoutePage) => void;
  onOpenAuthModal?: (reason?: string) => void;
}

export const CamaroMustangDocumentaryPage: React.FC<CamaroMustangDocumentaryPageProps> = ({
  onNavigate,
  onOpenAuthModal,
}) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeEraTab, setActiveEraTab] = useState<'classic' | 'modern'>('classic');
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
      src: camaroMustangImages.hero,
      alt: 'Duelo Cinematográfico Camaro Z28 1969 vs Mustang Boss 429',
      caption:
        'Confrontación visual directa entre el Chevrolet Camaro Z28 naranja y el Ford Mustang Boss 429 azul en asfalto al atardecer.',
      tag: 'PIEZA 01 // DUELO HEROICO 1969',
    },
    {
      src: camaroMustangImages.transAm,
      alt: 'Batalla de Pista SCCA Trans-Am 1970',
      caption:
        'El mítico campeonato Trans-Am de la SCCA: el Mustang Boss 302 de Bud Moore / Parnelli Jones contra el Sunoco Camaro Z/28 de Mark Donohue.',
      tag: 'PIEZA 02 // SCCA TRANS-AM WAR',
    },
    {
      src: camaroMustangImages.engine,
      alt: 'V8 Big Block 427 / 429 con Carburadores de Competición',
      caption:
        'Detalle mecánico del vano motor con colector de admisión de aluminio, carburadores cuádruples Holley y tapas de balancines pulidas.',
      tag: 'PIEZA 03 // V8 MUSCLE ENGINE',
    },
    {
      src: camaroMustangImages.cad,
      alt: 'Plano Técnico Comparativo CAD Camaro vs Mustang 1969',
      caption:
        'Plano de ingeniería CAD con esquema de subchasis desacoplado F-Body frente a la estructura monocasco con refuerzos Export Brace del Mustang.',
      tag: 'PIEZA 04 // PLANO CAD & CHASSIS',
    },
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-[#efefed] selection:bg-[#ff5500] selection:text-white pb-20 md:pb-0">
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-white/10 z-[100]">
        <div
          className="h-full bg-gradient-to-r from-[#e62628] via-[#ffd451] to-[#3b82f6] transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Header bar */}
      <header className="sticky top-0 z-40 bg-[#07090e]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-12 md:px-24 py-3.5 sm:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="camaro-mustang-back-btn"
            onClick={() => onNavigate('documentales')}
            className="flex items-center gap-1.5 text-xs font-mono tracking-widest text-[#9da0a5] hover:text-white uppercase transition-colors cursor-pointer"
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
            onClick={() => scrollToSection('camaro-mustang-gallery-section')}
            className="hidden sm:inline-block px-3 py-1.5 border border-white/15 text-[10px] font-bold tracking-[0.16em] uppercase text-[#cfd3db] hover:text-white hover:border-white/40 transition-all cursor-pointer"
          >
            GALERÍA & PLANOS
          </button>

          <button
            onClick={() => scrollToSection('camaro-mustang-specs-section')}
            className="hidden sm:inline-block px-3 py-1.5 border border-[#3b82f6]/40 bg-[#3b82f6]/10 text-[10px] font-bold tracking-[0.16em] uppercase text-[#93c5fd] hover:text-white hover:border-[#3b82f6] transition-all cursor-pointer"
          >
            ESPECIFICACIONES
          </button>

          <button
            onClick={() => setShowIndexMenu(!showIndexMenu)}
            className="px-2.5 sm:px-3.5 py-1.5 border border-[#e62628]/40 bg-[#e62628]/10 text-[10px] font-bold tracking-wider sm:tracking-[0.16em] uppercase text-[#ff8082] hover:text-white hover:border-[#e62628] transition-all whitespace-nowrap cursor-pointer"
          >
            ÍNDICE ({camaroMustangChapters.length} CAP.)
          </button>
        </div>
      </header>

      {/* Persistent Audio Narrator Bar */}
      <AudioNarrator
        docId="camaro-mustang"
        documentaryTitle="CAMARO VS MUSTANG: LA GUERRA DE LOS PONY CARS"
        chapters={camaroMustangChapters}
        accentColor="#ff5500"
        onChapterSelect={(idx) => {
          const chap = camaroMustangChapters[idx];
          if (chap) {
            scrollToSection(`capitulo-${chap.number}`);
          }
        }}
        onOpenAuthModal={onOpenAuthModal}
      />

      {/* Index Slide-out / Modal Menu */}
      {showIndexMenu && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end animate-fadeIn">
          <div className="w-full max-w-md bg-[#0a0f18] border-l border-white/15 h-full overflow-y-auto p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#ff8082] uppercase">
                    TABLA DE CONTENIDOS
                  </span>
                  <h3 className="text-lg font-bold font-mono text-white">
                    Capítulos del Documental
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
                {camaroMustangChapters.map((chap, idx) => (
                  <button
                    key={chap.number}
                    onClick={() => scrollToSection(`capitulo-${chap.number}`)}
                    className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-[#ff5500]/15 border border-white/5 hover:border-[#ff5500]/40 transition-all flex items-start gap-3 group cursor-pointer"
                  >
                    <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold text-xs group-hover:bg-[#ff5500] group-hover:text-black transition-colors shrink-0">
                      {chap.number}
                    </span>
                    <div>
                      <span className="text-[10px] text-[#ff8082] block leading-tight">
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
              Documental Extendido AutoArchive // Edición Definitiva
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-12 md:px-24 py-16 overflow-hidden border-b border-white/10">
        {/* Background Image with dramatic gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src={camaroMustangImages.hero}
            alt="Chevrolet Camaro vs Ford Mustang"
            className="w-full h-full object-cover object-center opacity-35 scale-105 transform hover:scale-100 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07090e] via-transparent to-[#07090e]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#ff5500]/40 bg-[#ff5500]/10 text-xs font-mono font-bold tracking-widest text-[#ffd451] uppercase animate-pulse">
            <Flame className="w-4 h-4 text-[#ff5500]" />
            <span>LA RIVALIDAD MÁS LONGEVA Y FEROZ DEL MOTOR (1964 — PRESENTE)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black font-mono tracking-tight text-white leading-none uppercase">
            CAMARO <span className="text-[#ff5500]">VS</span> MUSTANG
          </h1>

          <p className="text-lg sm:text-2xl font-mono text-[#93c5fd] max-w-3xl mx-auto font-light leading-snug">
            La Guerra Total de Detroit: El Duelo Definitivo de los Pony Cars Americanos
          </p>

          <p className="text-xs sm:text-sm text-[#9da0a5] font-mono max-w-2xl mx-auto leading-relaxed">
            Del golpe maestro de Lee Iacocca en 1964 y la respuesta secreta del Proyecto Panther en 1966, a la guerra del SCCA Trans-Am, los motores Big Block de 7.0L y los monstruos sobrealimentados de 760 CV en Nürburgring.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => scrollToSection('capitulo-01')}
              className="px-6 py-3 bg-[#e62628] hover:bg-[#ff3b3e] text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl shadow-[0_0_25px_rgba(230,38,40,0.4)] transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
            >
              <span>COMENZAR LECTURA EXTENDIDA</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollToSection('camaro-mustang-specs-section')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-[#3b82f6]" />
              <span>COMPARATIVA TÉCNICA</span>
            </button>
          </div>
        </div>
      </section>

      {/* Quick Stats Grid */}
      <section className="px-4 sm:px-12 md:px-24 py-12 bg-[#0a0f18] border-b border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 font-mono">
          {camaroMustangStats.map((st, idx) => (
            <div
              key={idx}
              className="p-4 bg-white/5 border border-white/10 rounded-xl flex flex-col justify-between"
            >
              <span className="text-[10px] text-[#ff8082] uppercase font-bold tracking-wider leading-tight">
                {st.label}
              </span>
              <div className="mt-2">
                <span className="text-2xl sm:text-3xl font-black text-white block leading-none">
                  {st.value}
                </span>
                <span className="text-[10px] text-[#8bb4d9] font-bold tracking-widest uppercase">
                  {st.unit}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Chapters Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-16 space-y-20">
        {camaroMustangChapters.map((chap, idx) => (
          <article
            key={chap.number}
            id={`capitulo-${chap.number}`}
            className="scroll-mt-36 p-6 sm:p-10 rounded-2xl bg-[#090e17]/80 border border-white/10 relative overflow-hidden space-y-6"
          >
            {/* Chapter Header */}
            <div className="space-y-2 border-b border-white/10 pb-6">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ff5500]/10 border border-[#ff5500]/30 rounded-full text-xs font-mono font-bold text-[#ffd451]">
                  <span>CAPÍTULO {chap.number}</span>
                  <span>//</span>
                  <span className="text-[#ff8082]">{chap.category}</span>
                </div>
                <span className="text-[11px] font-mono text-[#8bb4d9]">
                  Capítulo Extendido
                </span>
              </div>

              <h2 className="text-xl sm:text-3xl font-black font-mono tracking-tight text-white leading-snug">
                {chap.title}
              </h2>

              {chap.subtitle && (
                <p className="text-sm sm:text-base font-mono text-[#93c5fd] leading-relaxed">
                  {chap.subtitle}
                </p>
              )}
            </div>

            {/* Paragraphs with extended length */}
            <div className="space-y-4 text-sm sm:text-base text-[#cfd3db] font-sans leading-relaxed">
              {chap.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="first-letter:text-2xl first-letter:font-bold first-letter:text-white first-letter:mr-0.5">
                  {p}
                </p>
              ))}
            </div>

            {/* Embedded Chapter Image if present */}
            {chap.image && (
              <div className="my-6 rounded-xl overflow-hidden border border-white/15 bg-black/40">
                <img
                  src={chap.image.src}
                  alt={chap.image.alt}
                  className="w-full h-auto object-cover max-h-[480px] cursor-pointer hover:opacity-95 transition-opacity"
                  onClick={() => setSelectedImage(chap.image!)}
                  referrerPolicy="no-referrer"
                />
                <div className="p-3 bg-[#060b13] border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#8bb4d9]">
                  <span>{chap.image.caption}</span>
                  <span className="px-2 py-0.5 bg-white/10 rounded text-[10px] text-white shrink-0 ml-2">
                    {chap.image.tag}
                  </span>
                </div>
              </div>
            )}

            {/* Chapter Highlight Stat */}
            {chap.highlight && (
              <div className="mt-6 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#170c0c] via-[#0d1624] to-[#170c0c] border border-[#ff5500]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono">
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-[#ffd451] block leading-tight">
                    {chap.highlight.value}
                  </span>
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    {chap.highlight.label}
                  </span>
                </div>
                {chap.highlight.description && (
                  <p className="text-xs text-[#8bb4d9] font-sans sm:max-w-xs leading-snug">
                    {chap.highlight.description}
                  </p>
                )}
              </div>
            )}
          </article>
        ))}
      </main>

      {/* Interactive Specifications Section */}
      <section
        id="camaro-mustang-specs-section"
        className="px-4 sm:px-12 md:px-24 py-16 bg-[#090e17] border-t border-white/10"
      >
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-[#ff8082] uppercase">
              FICHA TÉCNICA COMPARATIVA
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-mono text-white uppercase">
              ESPECIFICACIONES DE FÁBRICA Y CIRCUITO
            </h2>
            <p className="text-xs sm:text-sm font-mono text-[#8bb4d9] max-w-xl mx-auto">
              Compara cara a cara los datos técnicos de la era clásica de 1969 con la era moderna de superdeportivos de élite.
            </p>
          </div>

          {/* Era Tabs */}
          <div className="flex justify-center gap-3 font-mono text-xs">
            <button
              onClick={() => setActiveEraTab('classic')}
              className={`px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeEraTab === 'classic'
                  ? 'bg-[#ff5500] text-black shadow-[0_0_20px_rgba(255,85,0,0.4)]'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              1969 // CLÁSICOS: BOSS 429 & 302 VS COPO ZL-1 & Z/28
            </button>
            <button
              onClick={() => setActiveEraTab('modern')}
              className={`px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeEraTab === 'modern'
                  ? 'bg-[#3b82f6] text-white shadow-[0_0_20px_rgba(59,130,246,0.4)]'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              MODERNOS // SHELBY GT500 / GT350R VS CAMARO ZL1 1LE
            </button>
          </div>

          {/* Specs Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono">
            {/* Mustang Card */}
            <div className="p-6 rounded-2xl bg-[#060c14] border border-[#3b82f6]/40 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs text-[#93c5fd] font-bold tracking-wider uppercase">
                  FORD MUSTANG
                </span>
                <span className="px-2.5 py-0.5 rounded bg-[#3b82f6]/20 text-[#60a5fa] text-[10px] font-bold">
                  DEARBORN, MI
                </span>
              </div>

              <div className="divide-y divide-white/5 text-xs">
                {(activeEraTab === 'classic'
                  ? camaroMustangSpecs.classicMustang
                  : camaroMustangSpecs.modernMustang
                ).map((spec, i) => (
                  <div key={i} className="py-2.5 flex justify-between gap-4">
                    <span className="text-[#8bb4d9] font-medium">{spec.label}</span>
                    <span className="text-white font-bold text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Camaro Card */}
            <div className="p-6 rounded-2xl bg-[#0c0808] border border-[#e62628]/40 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs text-[#ff8082] font-bold tracking-wider uppercase">
                  CHEVROLET CAMARO
                </span>
                <span className="px-2.5 py-0.5 rounded bg-[#e62628]/20 text-[#ff8082] text-[10px] font-bold">
                  DETROIT, MI
                </span>
              </div>

              <div className="divide-y divide-white/5 text-xs">
                {(activeEraTab === 'classic'
                  ? camaroMustangSpecs.classicCamaro
                  : camaroMustangSpecs.modernCamaro
                ).map((spec, i) => (
                  <div key={i} className="py-2.5 flex justify-between gap-4">
                    <span className="text-[#8bb4d9] font-medium">{spec.label}</span>
                    <span className="text-white font-bold text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        id="camaro-mustang-gallery-section"
        className="px-4 sm:px-12 md:px-24 py-16 bg-[#07090e] border-t border-white/10"
      >
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-[#ffd451] uppercase">
              ARCHIVO VISUAL & ESQUEMAS TÉCNICOS
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-mono text-white uppercase">
              GALERÍA FOTOGRÁFICA Y PLANOS CAD
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {galleryItems.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(item)}
                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-black/50 cursor-pointer aspect-video hover:border-[#ff5500]/60 transition-all"
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-4 text-xs font-mono">
                  <span className="text-[#ffd451] font-bold text-[10px] tracking-wider uppercase">
                    {item.tag}
                  </span>
                  <span className="text-white font-bold text-sm leading-snug mt-1">
                    {item.alt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Timeline Section */}
      <section className="px-4 sm:px-12 md:px-24 py-16 bg-[#0a0f18] border-t border-white/10">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-[#ff8082] uppercase">
              CRONOLOGÍA HISTÓRICA
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-mono text-white uppercase">
              LÍNEA DE TIEMPO (1964 — PRESENTE)
            </h2>
          </div>

          <div className="relative border-l-2 border-[#ff5500]/40 pl-6 sm:pl-8 space-y-8 font-mono ml-4 sm:ml-8">
            {camaroMustangTimeline.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#0a0f18] border-2 border-[#ff5500] group-hover:bg-[#ffd451] transition-colors" />

                <div className="space-y-1">
                  <span className="text-xs font-bold text-[#ffd451] tracking-wider">
                    {item.year}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#cfd3db] font-sans leading-relaxed pt-1">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#0a0f18] border border-white/20 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/60 hover:bg-black text-white rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full max-h-[75vh] object-contain bg-black"
              referrerPolicy="no-referrer"
            />
            <div className="p-5 font-mono text-xs text-[#8bb4d9] border-t border-white/10 flex flex-col sm:flex-row justify-between gap-2">
              <span className="text-white font-bold">{selectedImage.caption}</span>
              <span className="text-[#ffd451] shrink-0">{selectedImage.tag}</span>
            </div>
          </div>
        </div>
      )}

      {/* Footer Navigation */}
      <footer className="px-4 sm:px-12 md:px-24 py-12 bg-[#040609] border-t border-white/10 text-xs font-mono text-[#8bb4d9] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          AutoArchive Editorial // Documental 007: Camaro vs. Mustang
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-white underline cursor-pointer"
          >
            ↑ Volver arriba
          </button>
          <button
            onClick={() => onNavigate('documentales')}
            className="px-4 py-2 bg-[#ff5500]/20 hover:bg-[#ff5500]/40 text-white rounded-xl border border-[#ff5500]/40 transition-colors cursor-pointer"
          >
            Ver más documentales
          </button>
        </div>
      </footer>
    </div>
  );
};
