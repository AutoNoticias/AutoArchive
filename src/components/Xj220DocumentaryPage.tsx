import React, { useState, useEffect } from 'react';
import { RoutePage } from '../types';
import { AudioNarrator } from './AudioNarrator';
import {
  xj220Chapters,
  xj220Stats,
  xj220Timeline,
  xj220Specs,
  xj220Gallery,
  xj220Images,
} from '../data/xj220Data';

interface Xj220DocumentaryPageProps {
  onNavigate: (page: RoutePage) => void;
  onOpenAuthModal?: (reason?: string) => void;
}

export const Xj220DocumentaryPage: React.FC<Xj220DocumentaryPageProps> = ({ onNavigate, onOpenAuthModal }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showIndexMenu, setShowIndexMenu] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [activeLightboxImg, setActiveLightboxImg] = useState<{
    src: string;
    alt: string;
    caption: string;
    tag?: string;
  } | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id) || document.getElementById(id.replace('capitulo-', 'chapter-'));
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setShowIndexMenu(false);
    }
  };

  const renderChapter = (chap: typeof xj220Chapters[0]) => (
    <section
      key={chap.number}
      id={`capitulo-${chap.number}`}
      className={`px-6 sm:px-12 md:px-28 py-20 sm:py-32 border-b border-white/10 ${
        chap.isDark ? 'bg-[#060e18]' : 'bg-[#081525]'
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[140px_1fr] gap-8 sm:gap-16 max-w-5xl mx-auto">
        {/* Chapter big number */}
        <div className="text-[clamp(64px,9vw,90px)] font-bold text-[#1f3752] tracking-tight leading-none select-none">
          {chap.number}
        </div>

        {/* Chapter body */}
        <div>
          <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-[#7cbcff]">
            {chap.category}
          </span>

          <h2 className="mt-3 mb-8 text-[clamp(32px,4.5vw,58px)] font-semibold tracking-[-0.05em] leading-[1.02] text-[#eeeeee]">
            {chap.title} <span className="text-[#6fb6ff] font-normal">{chap.subtitle}</span>
          </h2>

          <div className="space-y-6 text-[#9eb6ce] text-base sm:text-[17px] leading-[1.9]">
            {chap.paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>

          {/* Chapter Image Attachment */}
          {chap.image && (
            <div className="mt-10 pt-6 border-t border-white/10">
              <div
                className="group relative overflow-hidden border border-[#4ea0ff]/30 bg-[#050c17] cursor-pointer"
                onClick={() =>
                  setActiveLightboxImg({
                    src: chap.image!.src,
                    alt: chap.image!.alt,
                    caption: chap.image!.caption,
                    tag: chap.image!.tag,
                  })
                }
              >
                {/* Blueprint grid subtle overlay */}
                <div className="absolute inset-0 grid-blueprint opacity-15 pointer-events-none z-10" />

                {/* Corner registration marks */}
                <div className="absolute top-2 left-2 text-[10px] text-[#4ea0ff]/70 font-mono z-20 pointer-events-none">
                  + 0{chap.number}
                </div>
                <div className="absolute top-2 right-2 text-[10px] text-[#4ea0ff]/70 font-mono z-20 pointer-events-none">
                  [CAD REF]
                </div>

                {/* Tag pill */}
                <div className="absolute bottom-3 left-3 z-20 px-3 py-1 bg-black/80 backdrop-blur-md border border-[#4ea0ff]/40 text-[9px] font-bold tracking-[0.2em] text-[#7cbcff] uppercase">
                  {chap.image.tag}
                </div>

                <div className="absolute bottom-3 right-3 z-20 px-2.5 py-1 bg-[#4ea0ff]/90 text-black text-[10px] font-bold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                  AMPLIAR ⤢
                </div>

                <img
                  src={chap.image.src}
                  alt={chap.image.alt}
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[16/9] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>

              {/* Caption */}
              <div className="mt-3 flex items-start gap-2.5 text-xs text-[#7d99b6] leading-relaxed">
                <span className="text-[#4ea0ff] font-bold mt-0.5">▲</span>
                <p>
                  <strong className="text-[#c1d6eb] font-medium mr-1.5">
                    Fig {chap.number}.1:
                  </strong>
                  {chap.image.caption}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-[#07111d] text-[#eeeeee] flex flex-col justify-between selection:bg-[#4ea0ff] selection:text-black pb-20 md:pb-0">
      {/* Top Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#4ea0ff] to-[#72b9ff] z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Lightbox Modal */}
      {activeLightboxImg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveLightboxImg(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#081525] border border-[#4ea0ff]/50 shadow-2xl p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/15">
              <div className="flex items-center gap-3">
                {activeLightboxImg.tag && (
                  <span className="px-2.5 py-0.5 bg-[#4ea0ff]/20 border border-[#4ea0ff]/40 text-[9px] font-bold tracking-[0.2em] text-[#7cbcff] uppercase">
                    {activeLightboxImg.tag}
                  </span>
                )}
                <span className="text-xs text-[#8bb4d9] font-mono">
                  AUTOARCHIVE // JAGUAR XJ220 ASSET
                </span>
              </div>
              <button
                onClick={() => setActiveLightboxImg(null)}
                className="px-3 py-1 text-xs border border-white/30 text-[#999] hover:text-white hover:border-white transition-all uppercase tracking-wider"
              >
                CERRAR ✕
              </button>
            </div>

            <div className="relative overflow-hidden border border-white/10 bg-black">
              <img
                src={activeLightboxImg.src}
                alt={activeLightboxImg.alt}
                referrerPolicy="no-referrer"
                className="w-full max-h-[70vh] object-contain mx-auto"
              />
            </div>

            <div className="mt-4 text-xs sm:text-sm text-[#b0c8e0] leading-relaxed">
              <strong className="text-white block sm:inline font-semibold mr-2">
                {activeLightboxImg.alt}
              </strong>
              {activeLightboxImg.caption}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 w-full px-4 sm:px-12 md:px-24 py-3.5 sm:py-5 flex items-center justify-between border-b border-white/10 bg-[#07111d]/90 backdrop-blur-md">
        <div className="flex items-center gap-3 sm:gap-6">
          <button
            id="xj220-brand-logo-btn"
            onClick={() => onNavigate('home')}
            className="text-left text-sm sm:text-base font-bold tracking-[0.18em] uppercase text-white hover:tracking-[0.2em] transition-all"
          >
            Auto<span className="text-[#4ea0ff]">Archive</span>
          </button>
          <span className="text-[#556980] text-xs">/</span>
          <button
            id="xj220-header-doc-crumb-btn"
            onClick={() => onNavigate('documentales')}
            className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8bb4d9] hover:text-white transition-colors"
          >
            <span className="hidden sm:inline">DOCUMENTALES</span>
            <span className="sm:hidden">DOC 001</span>
          </button>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            id="xj220-gallery-nav-btn"
            onClick={() => scrollToSection('xj220-visual-gallery-section')}
            className="px-3 py-1.5 border border-[#4ea0ff]/30 text-[10px] font-bold tracking-[0.16em] uppercase text-[#7cbcff] hover:bg-[#4ea0ff]/10 hover:text-white transition-all hidden md:inline-block"
          >
            PLANOS & FOTOS
          </button>

          {/* Chapter Quick Index Toggle */}
          <button
            id="xj220-quick-index-btn"
            onClick={() => setShowIndexMenu(!showIndexMenu)}
            className="px-2.5 sm:px-3.5 py-1.5 border border-white/20 text-[10px] font-bold tracking-wider sm:tracking-[0.16em] uppercase text-[#a0c5ea] hover:text-white hover:border-[#4ea0ff] transition-all whitespace-nowrap"
          >
            ÍNDICE (20 CAP.)
          </button>

          <div className="hidden lg:block text-[10px] tracking-[0.22em] text-[#7cbcff] font-bold">
            DOCUMENTAL 001
          </div>
        </div>
      </header>

      {/* Persistent Audio Narrator Bar */}
      <AudioNarrator
        documentaryTitle="JAGUAR XJ220"
        chapters={xj220Chapters}
        accentColor="#4ea0ff"
        onChapterSelect={(idx) => {
          const chap = xj220Chapters[idx];
          if (chap) {
            scrollToSection(`capitulo-${chap.number}`);
          }
        }}
        onOpenAuthModal={onOpenAuthModal}
      />

      {/* Quick Chapter Index Drawer / Dropdown */}
      {showIndexMenu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl max-h-[85vh] bg-[#0c1c2e] border border-[#4ea0ff]/40 p-6 sm:p-8 overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/15">
              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#4ea0ff] uppercase">
                  DOCUMENTAL 001
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Índice de Capítulos · Jaguar XJ220
                </h3>
              </div>
              <button
                id="close-index-modal-btn"
                onClick={() => setShowIndexMenu(false)}
                className="px-3 py-1 text-xs border border-white/30 text-[#999] hover:text-white hover:border-white transition-all uppercase tracking-wider"
              >
                Cerrar ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => scrollToSection('xj220-intro-section')}
                className="flex items-center gap-3 p-3 text-left bg-white/5 hover:bg-[#4ea0ff]/20 border border-white/10 hover:border-[#4ea0ff]/50 transition-all text-xs"
              >
                <span className="text-[#4ea0ff] font-bold">00</span>
                <span className="text-[#cfd8e3]">Introducción al Mito</span>
              </button>
              <button
                onClick={() => scrollToSection('xj220-visual-gallery-section')}
                className="flex items-center gap-3 p-3 text-left bg-white/5 hover:bg-[#4ea0ff]/20 border border-[#4ea0ff]/40 text-xs"
              >
                <span className="text-[#4ea0ff] font-bold">📐</span>
                <span className="text-[#cfd8e3] font-semibold">Planos Técnicos y Archivo Visual</span>
              </button>
              {xj220Chapters.map((chap) => (
                <button
                  key={chap.number}
                  onClick={() => scrollToSection(`chapter-${chap.number}`)}
                  className="flex items-center gap-3 p-3 text-left bg-white/5 hover:bg-[#4ea0ff]/20 border border-white/10 hover:border-[#4ea0ff]/50 transition-all text-xs"
                >
                  <span className="text-[#4ea0ff] font-bold">{chap.number}</span>
                  <span className="text-[#cfd8e3] truncate">
                    {chap.category}: {chap.title} {chap.image && '📷'}
                  </span>
                </button>
              ))}
              <button
                onClick={() => scrollToSection('xj220-stats-section')}
                className="flex items-center gap-3 p-3 text-left bg-white/5 hover:bg-[#4ea0ff]/20 border border-white/10 hover:border-[#4ea0ff]/50 transition-all text-xs"
              >
                <span className="text-[#4ea0ff] font-bold">★</span>
                <span className="text-[#cfd8e3]">Cifras Clave del XJ220</span>
              </button>
              <button
                onClick={() => scrollToSection('xj220-timeline-section')}
                className="flex items-center gap-3 p-3 text-left bg-white/5 hover:bg-[#4ea0ff]/20 border border-white/10 hover:border-[#4ea0ff]/50 transition-all text-xs"
              >
                <span className="text-[#4ea0ff] font-bold">⏱</span>
                <span className="text-[#cfd8e3]">Cronología Histórica (1984–1994)</span>
              </button>
              <button
                onClick={() => scrollToSection('xj220-specs-section')}
                className="flex items-center gap-3 p-3 text-left bg-white/5 hover:bg-[#4ea0ff]/20 border border-white/10 hover:border-[#4ea0ff]/50 transition-all text-xs"
              >
                <span className="text-[#4ea0ff] font-bold">📋</span>
                <span className="text-[#cfd8e3]">Ficha Técnica Oficial</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Portada with Hero Background Visual */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden xj220-hero-bg px-6 sm:px-12 md:px-24 py-20 border-b border-white/10">
        {/* Subtle grid and decorative lines */}
        <div className="absolute inset-0 grid-blueprint opacity-20 pointer-events-none" />

        {/* Hero Supercar Background Watermark / Preview */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-full max-w-3xl lg:max-w-4xl opacity-20 pointer-events-none select-none blur-[0.5px]">
          <img
            src={xj220Images.hero}
            alt="Jaguar XJ220 Silueta"
            referrerPolicy="no-referrer"
            className="w-full object-contain mix-blend-screen"
          />
        </div>

        {/* Glow effect */}
        <div
          aria-hidden="true"
          className="absolute -right-36 top-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(78,160,255,0.18),transparent_70%)] filter blur-2xl pointer-events-none"
        />

        <div className="relative z-10 max-w-4xl pt-8">
          <div className="text-[11px] font-bold tracking-[0.24em] uppercase text-[#7cbcff] mb-6">
            AUTOARCHIVE / DOCUMENTAL 001
          </div>

          <h1 className="text-[clamp(48px,11vw,140px)] font-black tracking-[-0.07em] leading-[0.82] text-[#eeeeee] break-words">
            XJ220
          </h1>

          <div className="w-28 h-[2px] my-8 sm:my-10 bg-[#4ea0ff]" />

          <p className="max-w-xl text-sm sm:text-base tracking-[0.14em] uppercase text-[#a6b8cc] leading-relaxed">
            LA HISTORIA COMPLETA DEL SUPERAUTOMÓVIL QUE CASI NUNCA LLEGÓ A EXISTIR.
          </p>

          <div className="flex flex-wrap gap-y-3 gap-x-6 sm:gap-x-8 mt-10 text-[10px] sm:text-[11px] tracking-[0.18em] text-[#7cbcff] uppercase font-semibold">
            <span className="pr-6 sm:pr-8 border-r border-white/15">1984 — 1994</span>
            <span className="pr-6 sm:pr-8 border-r border-white/15">JAGUAR / TWR</span>
            <span className="pr-6 sm:pr-8 border-r border-white/15">V6 BITURBO</span>
            <span>550 CV</span>
          </div>

          {/* Quick jump to gallery button */}
          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={() => scrollToSection('xj220-intro-section')}
              className="px-6 py-3 bg-[#4ea0ff] hover:bg-[#68afff] text-[#07111d] text-xs font-bold tracking-[0.2em] uppercase transition-all"
            >
              LEER DOCUMENTAL ↓
            </button>
            <button
              onClick={() => scrollToSection('xj220-visual-gallery-section')}
              className="px-6 py-3 border border-[#4ea0ff]/50 hover:border-[#4ea0ff] bg-white/[0.03] text-[#7cbcff] hover:text-white text-xs font-bold tracking-[0.2em] uppercase transition-all"
            >
              PLANOS TÉCNICOS & FOTOS 📐
            </button>
          </div>
        </div>

        {/* Background 220 Watermark */}
        <div
          aria-hidden="true"
          className="absolute right-4 sm:right-16 bottom-12 sm:bottom-20 text-[clamp(120px,22vw,340px)] font-black text-white/[0.03] tracking-[-0.08em] pointer-events-none select-none"
        >
          220
        </div>
      </section>

      {/* Section 00: Intro */}
      <section
        id="xj220-intro-section"
        className="px-6 sm:px-12 md:px-28 py-24 sm:py-36 bg-gradient-to-b from-[#091524] to-[#0b1b2d] border-b border-white/10"
      >
        <div className="max-w-4xl mx-auto">
          <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-[#7cbcff]">
            00 / INTRODUCCIÓN
          </span>

          <h2 className="mt-4 mb-12 text-[clamp(36px,5.5vw,76px)] font-medium tracking-[-0.05em] leading-[0.98] text-[#eeeeee]">
            El automóvil que <span className="text-[#6fb6ff]">no estaba destinado a existir.</span>
          </h2>

          <div className="space-y-6 text-[#b5c7d8] text-base sm:text-lg leading-[1.9] font-light">
            <p>
              Durante la década de 1980, Jaguar atravesaba una etapa en la que necesitaba recuperar parte del prestigio deportivo que había construido durante décadas. La marca británica tenía una enorme tradición en competición y había producido automóviles capaces de convertirse en auténticos iconos, pero todavía no contaba con un superdeportivo moderno que pudiera enfrentarse directamente a las máquinas más extremas de Ferrari, Porsche y Lamborghini.
            </p>
            <p>
              En ese contexto comenzó una de las historias más extraordinarias de la industria británica. Un pequeño grupo de ingenieros decidió desarrollar, prácticamente por iniciativa propia, un automóvil que representara todo lo que Jaguar podía hacer si se le permitía trabajar sin las limitaciones habituales de un proyecto de producción masiva.
            </p>
            <p>
              Aquella idea terminaría convirtiéndose en el Jaguar XJ220, un automóvil que pasó de ser un proyecto clandestino de fin de semana a convertirse en uno de los superdeportivos más laureados y discutidos de finales del siglo XX.
            </p>
          </div>
        </div>
      </section>

      {/* Visual Archive & Technical Blueprint Section */}
      <section
        id="xj220-visual-gallery-section"
        className="px-6 sm:px-12 md:px-28 py-24 sm:py-32 bg-[#040c17] border-b border-white/10"
      >
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-[#7cbcff]">
                ARCHIVO DE INGENIERÍA & MULTIMEDIA
              </span>
              <h2 className="mt-2 text-[clamp(32px,5vw,56px)] font-bold tracking-[-0.05em] text-white">
                Planos Técnicos y Galería
              </h2>
            </div>
            <p className="text-xs text-[#7d99b6] max-w-sm">
              Documentación gráfica oficial: planos de diseño CAD, aerodinámica ventral, motor JRV-6 y modelo de carreras en Le Mans.
            </p>
          </div>

          {/* Gallery Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
            {xj220Gallery.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setActiveGalleryIndex(idx)}
                className={`p-3 text-left border transition-all text-xs ${
                  activeGalleryIndex === idx
                    ? 'border-[#4ea0ff] bg-[#4ea0ff]/15 text-white'
                    : 'border-white/10 bg-white/[0.02] text-[#8aa3be] hover:border-white/25 hover:text-white'
                }`}
              >
                <span className="block text-[9px] font-mono text-[#7cbcff] mb-1">
                  0{idx + 1} //
                </span>
                <span className="font-semibold block truncate">{item.category}</span>
              </button>
            ))}
          </div>

          {/* Active Gallery Viewer */}
          {xj220Gallery[activeGalleryIndex] && (
            <div className="border border-[#4ea0ff]/40 bg-[#061220] p-4 sm:p-6 shadow-2xl relative">
              {/* Corner accents */}
              <div className="absolute top-2 left-2 text-[10px] font-mono text-[#4ea0ff]/50">
                + TECHNICAL SCHEMATIC //
              </div>
              <div className="absolute top-2 right-2 text-[10px] font-mono text-[#4ea0ff]/50">
                BLO-XJ220-REV4
              </div>

              <div
                className="group relative cursor-pointer overflow-hidden border border-white/10 bg-black mt-4"
                onClick={() =>
                  setActiveLightboxImg({
                    src: xj220Gallery[activeGalleryIndex].src,
                    alt: xj220Gallery[activeGalleryIndex].title,
                    caption: xj220Gallery[activeGalleryIndex].description,
                    tag: xj220Gallery[activeGalleryIndex].category,
                  })
                }
              >
                <div className="absolute inset-0 grid-blueprint opacity-10 pointer-events-none z-10" />

                <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-black/85 border border-[#4ea0ff]/50 text-[9px] font-bold tracking-[0.2em] text-[#7cbcff] uppercase backdrop-blur-md">
                  {xj220Gallery[activeGalleryIndex].category}
                </div>

                <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-[#4ea0ff] text-black text-[10px] font-bold tracking-wider uppercase opacity-90 group-hover:opacity-100 transition-opacity">
                  AMPLIAR EN PANTALLA COMPLETA ⤢
                </div>

                <img
                  src={xj220Gallery[activeGalleryIndex].src}
                  alt={xj220Gallery[activeGalleryIndex].title}
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[16/9] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>

              <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {xj220Gallery[activeGalleryIndex].title}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-[#9ab3cb] max-w-3xl leading-relaxed">
                    {xj220Gallery[activeGalleryIndex].description}
                  </p>
                </div>

                <button
                  onClick={() =>
                    setActiveLightboxImg({
                      src: xj220Gallery[activeGalleryIndex].src,
                      alt: xj220Gallery[activeGalleryIndex].title,
                      caption: xj220Gallery[activeGalleryIndex].description,
                      tag: xj220Gallery[activeGalleryIndex].category,
                    })
                  }
                  className="px-4 py-2 border border-[#4ea0ff]/40 bg-[#4ea0ff]/10 hover:bg-[#4ea0ff] text-[#7cbcff] hover:text-black text-xs font-bold tracking-[0.16em] uppercase whitespace-nowrap transition-all"
                >
                  VER PLANO COMPLETO
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Chapters 01 through 05 */}
      {xj220Chapters.slice(0, 5).map((chap) => renderChapter(chap))}

      {/* Stats Section: EL XJ220 EN CIFRAS */}
      <section
        id="xj220-stats-section"
        className="px-6 sm:px-12 md:px-28 py-24 sm:py-32 bg-gradient-to-br from-[#0c223a] to-[#071322] border-y border-[#4ea0ff]/30"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-[#7cbcff]">
              RENDIMIENTO HISTÓRICO
            </span>
            <h2 className="mt-2 text-[clamp(32px,5vw,60px)] font-bold tracking-[-0.06em] text-white">
              EL XJ220 EN CIFRAS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {xj220Stats.map((stat, idx) => (
              <div
                key={idx}
                className="p-8 sm:p-10 border border-[#4ea0ff]/25 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[#4ea0ff]/60 transition-all duration-300 group"
              >
                <strong className="block text-[56px] sm:text-[64px] font-medium tracking-[-0.06em] text-[#eeeeee] leading-none group-hover:text-[#4ea0ff] transition-colors">
                  {stat.value}
                </strong>
                <span className="block text-sm font-semibold tracking-wider text-[#8bb4d9] mt-2">
                  {stat.unit}
                </span>
                <div className="w-10 h-[1px] bg-[#4ea0ff]/50 my-6" />
                <small className="block text-[10px] font-bold tracking-[0.22em] text-[#5b7894] uppercase">
                  {stat.label}
                </small>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapters 06 through 18 */}
      {xj220Chapters.slice(5, 18).map((chap) => renderChapter(chap))}

      {/* Timeline Section */}
      <section
        id="xj220-timeline-section"
        className="px-6 sm:px-12 md:px-28 py-24 sm:py-36 bg-[#06101c] border-b border-white/10"
      >
        <div className="max-w-5xl mx-auto">
          <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-[#7cbcff]">
            CRONOLOGÍA HISTÓRICA
          </span>

          <h2 className="mt-2 mb-16 text-[clamp(38px,6vw,76px)] font-medium tracking-[-0.05em] text-white">
            Diez años de historia.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 relative">
            {xj220Timeline.map((item, idx) => (
              <div
                key={idx}
                className="relative pt-6 border-t border-white/15 hover:border-[#4ea0ff] transition-colors group"
              >
                {/* Bullet dot */}
                <div className="absolute -top-[5px] left-0 w-2.5 h-2.5 rounded-full bg-[#4ea0ff] shadow-[0_0_8px_#4ea0ff]" />

                <div className="text-xs font-bold tracking-[0.2em] text-[#7cbcff] uppercase mb-2">
                  {item.year}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#4ea0ff] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-[#8ca0b8] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specs Section: FICHA TÉCNICA */}
      <section
        id="xj220-specs-section"
        className="px-6 sm:px-12 md:px-28 py-24 sm:py-36 bg-gradient-to-b from-[#091524] to-[#050c14] border-b border-white/10"
      >
        <div className="max-w-5xl mx-auto">
          <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-[#7cbcff]">
            FICHA TÉCNICA OFICIAL
          </span>

          <h2 className="mt-2 mb-12 text-[clamp(42px,6vw,84px)] font-medium tracking-[-0.05em] text-white">
            Jaguar XJ220
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-white/15">
            {xj220Specs.map((spec, idx) => (
              <div
                key={idx}
                className={`p-6 sm:p-7 border-b border-white/15 hover:bg-white/[0.03] transition-colors ${
                  idx % 2 === 0 ? 'md:border-r' : ''
                }`}
              >
                <span className="block text-[9px] font-bold tracking-[0.22em] text-[#5d7a96] uppercase mb-2">
                  {spec.label}
                </span>
                <strong className="text-base sm:text-lg font-medium text-[#edf5ff] tracking-wide">
                  {spec.value}
                </strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapters 19 and 20 */}
      {xj220Chapters.slice(18).map((chap) => renderChapter(chap))}

      {/* Epilogue / Ending */}
      <section className="relative min-h-[75vh] flex items-center px-6 sm:px-12 md:px-28 py-24 sm:py-36 bg-[#040911] overflow-hidden">
        {/* Background 001 Watermark */}
        <div
          aria-hidden="true"
          className="absolute -right-12 -bottom-20 text-[clamp(160px,28vw,420px)] font-black text-white/[0.02] tracking-[-0.08em] pointer-events-none select-none"
        >
          001
        </div>

        <div className="relative z-10 max-w-4xl">
          <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-[#7cbcff]">
            EPÍLOGO
          </span>

          <h2 className="mt-4 mb-8 text-[clamp(36px,5.5vw,72px)] font-medium tracking-[-0.05em] leading-[1.02] text-white">
            No fue exactamente el automóvil que Jaguar imaginó.
          </h2>

          <div className="space-y-6 text-[#95a8ba] text-base sm:text-lg leading-[1.9]">
            <p>
              Pero terminó convirtiéndose en algo todavía más fascinante: la prueba viviente de que un puñado de ingenieros apasionados podía soñar algo teóricamente imposible y conducirlo hasta el asfalto.
            </p>
            <p>
              Desde aquel proyecto secreto gestado en 1984 hasta el último ejemplar artesanal terminado en 1994, el XJ220 atravesó una década irrepetible de ingeniería, velocidad, ambición y leyenda.
            </p>
          </div>

          <div className="w-24 h-[2px] my-10 bg-[#4ea0ff]" />

          <span className="text-[10px] font-bold tracking-[0.2em] text-[#6d8ca8] uppercase">
            JAGUAR XJ220 · AUTOARCHIVE · DOCUMENTAL 001
          </span>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex flex-col sm:flex-row justify-between items-center gap-4 px-6 sm:px-12 md:px-28 py-8 bg-[#03070d] text-[#7cbcff] text-[11px] tracking-[0.16em] border-t border-white/10">
        <button
          id="xj220-footer-back-doc-btn"
          onClick={() => onNavigate('documentales')}
          className="hover:text-white transition-colors uppercase font-semibold"
        >
          ← VOLVER A DOCUMENTALES
        </button>

        <button
          id="xj220-footer-home-btn"
          onClick={() => onNavigate('home')}
          className="text-white font-bold tracking-widest hover:text-[#4ea0ff] transition-colors"
        >
          AUTOARCHIVE
        </button>

        <button
          id="xj220-footer-facts-btn"
          onClick={() => onNavigate('datos')}
          className="text-[#f2bd27] hover:underline uppercase font-semibold transition-all"
        >
          EXPLORAR DATOS CURIOSOS →
        </button>
      </footer>
    </div>
  );
};
