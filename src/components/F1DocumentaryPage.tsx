import React, { useState, useEffect } from 'react';
import { RoutePage } from '../types';
import { AudioNarrator } from './AudioNarrator';
import {
  f1Chapters,
  f1Stats,
  f1Timeline,
  f1Specs,
  f1Images,
} from '../data/f1Data';
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

interface F1DocumentaryPageProps {
  onNavigate: (page: RoutePage) => void;
  onOpenAuthModal?: (reason?: string) => void;
}

export const F1DocumentaryPage: React.FC<F1DocumentaryPageProps> = ({
  onNavigate,
  onOpenAuthModal,
}) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeEraTab, setActiveEraTab] = useState<'turbo' | 'v10' | 'hybrid'>('turbo');
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
      src: f1Images.hero,
      alt: 'Evolución Histórica de los Monoplazas de Fórmula 1 (1950 — Presente)',
      caption:
        'De las siluetas clásicas de motor delantero de los años 50 a los monstruos V10 y la aerodinámica moderna de túneles Venturi.',
      tag: 'PIEZA 01 // EVOLUCIÓN HISTÓRICA 1950-2025',
    },
    {
      src: f1Images.turbo,
      alt: 'Era Turbo Salvaje de los Años 80 en Pitlane',
      caption:
        'El monstruoso motor BMW M12/13 de 1.400 CV y los V6 Turbo de Honda escupiendo llamaradas de combustión en sesión nocturna de clasificación.',
      tag: 'PIEZA 02 // 1.400 CV TURBO MONSTERS',
    },
    {
      src: f1Images.monaco,
      alt: 'Gran Premio de Mónaco en Acción a Alta Velocidad',
      caption:
        'La máxima prueba de precisión milimétrica entre los raíles de seguridad del Principado de Mónaco.',
      tag: 'PIEZA 03 // MONACO GRAND PRIX',
    },
    {
      src: f1Images.cad,
      alt: 'Plano Técnico de Ingeniería CAD y Aerodinámica de F1',
      caption:
        'Esquema computacional de túneles Venturi bajo el fondo plano, vórtices del alerón delantero y monocasco de fibra de carbono.',
      tag: 'PIEZA 04 // INGENIERÍA CAD & VENTURI',
    },
  ];

  return (
    <div className="min-h-screen bg-[#07090e] text-[#efefed] selection:bg-[#e62628] selection:text-white pb-20 md:pb-0">
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-white/10 z-[100]">
        <div
          className="h-full bg-gradient-to-r from-[#e62628] via-[#ffd451] to-[#e62628] transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Header bar */}
      <header className="sticky top-0 z-40 bg-[#07090e]/95 backdrop-blur-md border-b border-white/10 px-4 sm:px-12 md:px-24 py-3.5 sm:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="f1-back-to-docs-btn"
            onClick={() => onNavigate('documentales')}
            className="flex items-center gap-1.5 text-xs font-mono tracking-widest text-[#9da0a5] hover:text-white uppercase transition-colors cursor-pointer"
          >
            <span>←</span>
            <span className="hidden sm:inline">DOCUMENTALES</span>
            <span className="sm:hidden">DOCS</span>
          </button>
          <span className="text-white/20">/</span>
          <span className="text-[10px] font-mono tracking-widest px-2 py-0.5 border border-[#e62628]/40 bg-[#e62628]/10 text-[#ff8082]">
            DOC 009
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => scrollToSection('f1-gallery-section')}
            className="hidden sm:inline-block px-3 py-1.5 border border-white/15 text-[10px] font-bold tracking-[0.16em] uppercase text-[#cfd3db] hover:text-white hover:border-white/40 transition-all font-mono cursor-pointer"
          >
            GALERÍA & PLANOS
          </button>

          <button
            onClick={() => scrollToSection('f1-specs-section')}
            className="hidden sm:inline-block px-3 py-1.5 border border-[#e62628]/40 bg-[#e62628]/10 text-[10px] font-bold tracking-[0.16em] uppercase text-[#ff8082] hover:text-white hover:border-[#e62628] transition-all font-mono cursor-pointer"
          >
            ESPECIFICACIONES
          </button>

          <button
            onClick={() => setShowIndexMenu(!showIndexMenu)}
            className="px-2.5 sm:px-3.5 py-1.5 border border-[#e62628]/40 bg-[#e62628]/10 text-[10px] font-bold tracking-wider sm:tracking-[0.16em] uppercase text-[#ff8082] hover:bg-[#e62628] hover:text-white transition-all whitespace-nowrap font-mono cursor-pointer"
          >
            ÍNDICE ({f1Chapters.length} CAP.)
          </button>
        </div>
      </header>

      {/* Persistent Audio Narrator Bar */}
      <AudioNarrator
        docId="f1"
        documentaryTitle="LA HISTORIA DE LA FÓRMULA 1: EL PINÁCULO DE LA VELOCIDAD"
        chapters={f1Chapters}
        accentColor="#e62628"
        onChapterSelect={(idx) => {
          const chap = f1Chapters[idx];
          if (chap) {
            scrollToSection(`capitulo-${chap.number}`);
          }
        }}
        onOpenAuthModal={onOpenAuthModal}
      />

      {/* Quick Index Dropdown Drawer */}
      {showIndexMenu && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end animate-fadeIn">
          <div className="w-full max-w-md h-full bg-[#0a0f18] border-l border-white/15 p-6 overflow-y-auto flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#ff8082] uppercase">
                    TABLA DE CONTENIDOS
                  </span>
                  <h3 className="text-lg font-bold font-mono text-white">
                    Capítulos de la F1 (75 Años)
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
                {f1Chapters.map((chap) => (
                  <button
                    key={chap.number}
                    onClick={() => scrollToSection(`capitulo-${chap.number}`)}
                    className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-[#e62628]/15 border border-white/5 hover:border-[#e62628]/40 transition-all flex items-start gap-3 group cursor-pointer"
                  >
                    <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold text-xs group-hover:bg-[#e62628] group-hover:text-white transition-colors shrink-0">
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
              Documental Extendido AutoArchive // 75 Años de Leyenda
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-12 md:px-24 py-16 overflow-hidden border-b border-white/10">
        {/* Background Image with dramatic gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src={f1Images.hero}
            alt="La Historia de la Fórmula 1"
            className="w-full h-full object-cover object-center opacity-35 scale-105 transform hover:scale-100 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07090e] via-transparent to-[#07090e]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#e62628]/40 bg-[#e62628]/10 text-xs font-mono font-bold tracking-widest text-[#ffd451] uppercase animate-pulse">
            <Flame className="w-4 h-4 text-[#e62628]" />
            <span>EL PINÁCULO DEL AUTOMOVILISMO MUNDIAL (1950 — PRESENTE)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-7xl font-black font-mono tracking-tight text-white leading-none uppercase">
            HISTORIA DE LA <span className="text-[#e62628]">FÓRMULA 1</span>
          </h1>

          <p className="text-lg sm:text-2xl font-mono text-[#ffd451] max-w-3xl mx-auto font-light leading-snug">
            75 Años de Gloria, Tragedia, Genio de Ingeniería y Velocidad Absoluta
          </p>

          <p className="text-xs sm:text-sm text-[#9da0a5] font-mono max-w-2xl mx-auto leading-relaxed">
            De las pistas de aterrizaje de Silverstone y los 5 títulos de Juan Manuel Fangio, a la locura de los monstruos Turbo de 1.400 CV, la guerra mística Senna vs. Prost, la sinfonía V10 a 20.000 RPM de Schumacher y la era del Efecto Suelo moderno.
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
              onClick={() => scrollToSection('f1-specs-section')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-[#ffd451]" />
              <span>BANCO TÉCNICO POR ERAS</span>
            </button>
          </div>
        </div>
      </section>

      {/* Quick Stats Grid */}
      <section className="px-4 sm:px-12 md:px-24 py-12 bg-[#0a0f18] border-b border-white/10">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 font-mono">
          {f1Stats.map((st, idx) => (
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
        {f1Chapters.map((chap) => (
          <article
            key={chap.number}
            id={`capitulo-${chap.number}`}
            className="scroll-mt-36 p-6 sm:p-10 rounded-2xl bg-[#090e17]/80 border border-white/10 relative overflow-hidden space-y-6"
          >
            {/* Chapter Header */}
            <div className="space-y-2 border-b border-white/10 pb-6">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#e62628]/10 border border-[#e62628]/30 rounded-full text-xs font-mono font-bold text-[#ffd451]">
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

            {/* Paragraphs */}
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
              <div className="mt-6 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#180809] via-[#0d1624] to-[#180809] border border-[#e62628]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono">
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
        id="f1-specs-section"
        className="px-4 sm:px-12 md:px-24 py-16 bg-[#090e17] border-t border-white/10"
      >
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-[#ff8082] uppercase">
              BANCO DE INGENIERÍA COMPARATIVO
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-mono text-white uppercase">
              ESPECIFICACIONES TÉCNICAS POR ERA
            </h2>
            <p className="text-xs sm:text-sm font-mono text-[#8bb4d9] max-w-xl mx-auto">
              Compara cara a cara la potencia brutal de la Era Turbo de los 80, el régimen ensordecedor de los V10 y la eficiencia récord de la era híbrida actual.
            </p>
          </div>

          {/* Era Tabs */}
          <div className="flex flex-wrap justify-center gap-3 font-mono text-xs">
            <button
              onClick={() => setActiveEraTab('turbo')}
              className={`px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeEraTab === 'turbo'
                  ? 'bg-[#e62628] text-white shadow-[0_0_20px_rgba(230,38,40,0.5)]'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              ERA TURBO (1986) // 1.400+ CV & 5.5 BARES
            </button>
            <button
              onClick={() => setActiveEraTab('v10')}
              className={`px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeEraTab === 'v10'
                  ? 'bg-[#e62628] text-white shadow-[0_0_20px_rgba(230,38,40,0.5)]'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              ERA V10 (2004) // 3.0L ATM @ 19.800 RPM
            </button>
            <button
              onClick={() => setActiveEraTab('hybrid')}
              className={`px-5 py-2.5 rounded-xl font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeEraTab === 'hybrid'
                  ? 'bg-[#3b82f6] text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              ERA HÍBRIDA (ACTUAL) // V6 TURBO + ERS & VENTURI
            </button>
          </div>

          {/* Specs Grid */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#060c14] border border-white/10 shadow-2xl space-y-4 font-mono">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs text-[#ffd451] font-bold tracking-wider uppercase">
                {activeEraTab === 'turbo' && 'ERA TURBO DE CLASIFICACIÓN (1986)'}
                {activeEraTab === 'v10' && 'ERA V10 ATMOSFÉRICA REVOLUCIONARIA (2004)'}
                {activeEraTab === 'hybrid' && 'ERA HÍBRIDA EFECTO SUELO (ACTUAL)'}
              </span>
              <span className="px-2.5 py-0.5 rounded bg-white/10 text-white text-[10px] font-bold">
                FIA FORMULA ONE WORLD CHAMPIONSHIP
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 divide-y md:divide-y-0 text-xs">
              <div className="divide-y divide-white/5">
                {f1Specs[
                  activeEraTab === 'turbo'
                    ? 'turboEra'
                    : activeEraTab === 'v10'
                    ? 'v10Era'
                    : 'hybridEra'
                ]
                  .slice(0, 6)
                  .map((spec, i) => (
                    <div key={i} className="py-2.5 flex justify-between gap-4">
                      <span className="text-[#8bb4d9] font-medium">{spec.label}</span>
                      <span className="text-white font-bold text-right">{spec.value}</span>
                    </div>
                  ))}
              </div>
              <div className="divide-y divide-white/5">
                {f1Specs[
                  activeEraTab === 'turbo'
                    ? 'turboEra'
                    : activeEraTab === 'v10'
                    ? 'v10Era'
                    : 'hybridEra'
                ]
                  .slice(6)
                  .map((spec, i) => (
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
        id="f1-gallery-section"
        className="px-4 sm:px-12 md:px-24 py-16 bg-[#07090e] border-t border-white/10"
      >
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-mono font-bold tracking-widest text-[#ffd451] uppercase">
              ARCHIVO VISUAL & ESQUEMAS TÉCNICOS
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-mono text-white uppercase">
              GALERÍA DE ALTA RESOLUCIÓN Y PLANOS CAD
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {galleryItems.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(item)}
                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-black/50 cursor-pointer aspect-video hover:border-[#e62628]/60 transition-all"
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
              LÍNEA DE TIEMPO (1950 — PRESENTE)
            </h2>
          </div>

          <div className="relative border-l-2 border-[#e62628]/40 pl-6 sm:pl-8 space-y-8 font-mono ml-4 sm:ml-8">
            {f1Timeline.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Dot */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#0a0f18] border-2 border-[#e62628] group-hover:bg-[#ffd451] transition-colors" />

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
          AutoArchive Editorial // Documental 009: Historia de la Fórmula 1
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
            className="px-4 py-2 bg-[#e62628]/20 hover:bg-[#e62628]/40 text-white rounded-xl border border-[#e62628]/40 transition-colors cursor-pointer"
          >
            Ver más documentales
          </button>
        </div>
      </footer>
    </div>
  );
};
