import React, { useState, useEffect } from 'react';
import { RoutePage } from '../types';
import { AudioNarrator } from './AudioNarrator';
import {
  r34Chapters,
  r34Stats,
  r34Timeline,
  r34Specs,
  r34Images,
} from '../data/r34Data';

interface R34DocumentaryPageProps {
  onNavigate: (page: RoutePage) => void;
  onOpenAuthModal?: (reason?: string) => void;
}

export const R34DocumentaryPage: React.FC<R34DocumentaryPageProps> = ({ onNavigate, onOpenAuthModal }) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeVariantTab, setActiveVariantTab] = useState<'vspec' | 'vspec2' | 'mspec' | 'nur' | 'ztune'>('vspec2');
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
      src: r34Images.hero,
      alt: 'Nissan Skyline GT-R R34 V-Spec II en Bayside Blue',
      caption:
        'El BNR34 en el icónico tono Bayside Blue (TV2) con llantas forjadas de 6 radios y splitter frontal integrado.',
      tag: 'PIEZA 01 // BNR34 BAYSIDE BLUE',
    },
    {
      src: r34Images.engine,
      alt: 'Vano motor RB26DETT Twin Turbo',
      caption:
        'Bloque de hierro fundido, 6 mariposas de admisión individuales (ITB) y dos turbocompresores cerámicos paralelos.',
      tag: 'PIEZA 02 // RB26DETT TWIN TURBO',
    },
    {
      src: r34Images.cockpit,
      alt: 'Puesto de mando y pantalla MFD desarrollada con Polyphony Digital',
      caption:
        'Cabina digital orientada al piloto con telemetría en tiempo real de soplado, fuerzas G e inyección.',
      tag: 'PIEZA 03 // COCKPIT & MFD HITACHI',
    },
    {
      src: r34Images.cad,
      alt: 'Plano técnico CAD del chasis BNR34 y flujo aerodinámico',
      caption:
        'Esquema ortográfico de rigidez torsional aumentada un 50% y difusores de fibra de carbono para efecto suelo.',
      tag: 'PIEZA 04 // PLANO CAD ORTOGRÁFICO',
    },
    {
      src: r34Images.ztune,
      alt: 'NISMO R34 GT-R Z-Tune con pilotos circulares iluminados',
      caption:
        'La mítica zaga con los cuatro pilotos circulares cuádruples, difusor de carbono y escape de titanio quemado.',
      tag: 'PIEZA 05 // NISMO Z-TUNE 500 CV',
    },
  ];

  return (
    <div className="min-h-screen bg-[#050b14] text-[#ecf3fc] selection:bg-[#4ea0ff] selection:text-black pb-20 md:pb-0">
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-white/10 z-[100]">
        <div
          className="h-full bg-gradient-to-r from-[#4ea0ff] via-[#38bdf8] to-[#e62628] transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Header bar */}
      <header className="sticky top-0 z-40 bg-[#050b14]/90 backdrop-blur-md border-b border-[#4ea0ff]/20 px-4 sm:px-12 md:px-24 py-3.5 sm:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="r34-back-to-docs-btn"
            onClick={() => onNavigate('documentales')}
            className="flex items-center gap-1.5 text-xs font-mono tracking-widest text-[#7fa3c7] hover:text-white uppercase transition-colors"
          >
            <span>←</span>
            <span className="hidden sm:inline">DOCUMENTALES</span>
            <span className="sm:hidden">DOCS</span>
          </button>
          <span className="text-white/20">/</span>
          <span className="text-[10px] font-mono tracking-widest px-2 py-0.5 border border-[#4ea0ff]/40 bg-[#4ea0ff]/10 text-[#72b9ff]">
            DOC 004
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => scrollToSection('r34-gallery-section')}
            className="hidden sm:inline-block text-[11px] font-mono tracking-wider text-[#8cb4d8] hover:text-white transition-colors"
          >
            PLANO CAD
          </button>
          <button
            onClick={() => scrollToSection('r34-specs-section')}
            className="hidden lg:inline-block text-[11px] font-mono tracking-wider text-[#8cb4d8] hover:text-white transition-colors"
          >
            ESPECIFICACIONES
          </button>
          <button
            onClick={() => setShowIndexMenu(!showIndexMenu)}
            className="px-2.5 sm:px-3 py-1 border border-[#4ea0ff]/40 bg-[#0d2238] hover:bg-[#4ea0ff] hover:text-black text-[11px] sm:text-xs font-mono tracking-wider sm:tracking-widest uppercase transition-all rounded whitespace-nowrap"
          >
            ÍNDICE (20) {showIndexMenu ? '▲' : '▼'}
          </button>
        </div>
      </header>

      {/* Persistent Audio Narrator Bar */}
      <AudioNarrator
        documentaryTitle="NISSAN SKYLINE GT-R R34"
        chapters={r34Chapters}
        accentColor="#4ea0ff"
        onChapterSelect={(idx) => {
          const chap = r34Chapters[idx];
          if (chap) {
            scrollToSection(`capitulo-${chap.number}`);
          }
        }}
        onOpenAuthModal={onOpenAuthModal}
      />

      {/* Chapters Index Dropdown Drawer */}
      {showIndexMenu && (
        <div className="sticky top-[65px] z-30 bg-[#091524] border-b border-[#4ea0ff]/30 px-6 sm:px-12 md:px-24 py-6 shadow-2xl animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#72b9ff]">
              // ÍNDICE COMPLETO DE CAPÍTULOS TÉCNICOS (NISSAN SKYLINE GT-R R34)
            </span>
            <button
              onClick={() => setShowIndexMenu(false)}
              className="text-xs text-[#8cb4d8] hover:text-white font-mono"
            >
              [ CERRAR ✕ ]
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-h-[60vh] overflow-y-auto pr-2">
            {r34Chapters.map((ch) => (
              <button
                key={ch.number}
                onClick={() => scrollToSection(`r34-ch-${ch.number}`)}
                className="p-2.5 text-left border border-white/5 bg-[#06101c] hover:border-[#4ea0ff]/50 hover:bg-[#0f2844] transition-all rounded group"
              >
                <span className="text-[10px] font-mono font-black text-[#4ea0ff] group-hover:text-white block">
                  CAPÍTULO {ch.number}
                </span>
                <span className="text-xs text-[#cfdceb] font-medium line-clamp-1 group-hover:text-white">
                  {ch.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center px-6 sm:px-12 md:px-24 py-20 overflow-hidden border-b border-[#4ea0ff]/20">
        <div className="absolute inset-0 grid-blueprint opacity-20 pointer-events-none" />

        {/* Ambient Neon Cyan & Red Glows */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#4ea0ff]/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#e62628]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0b2138] border border-[#4ea0ff]/40 text-[10px] font-mono tracking-[0.2em] uppercase text-[#72b9ff] mb-6 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ea0ff] animate-pulse" />
            <span>EXPEDIENTE TÉCNICO BNR34 · 1999 — 2002</span>
          </div>

          <h1 className="text-[clamp(44px,8.5vw,110px)] font-black tracking-[-0.07em] leading-[0.88] text-white">
            NISSAN SKYLINE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#8fc6ff] to-[#4ea0ff]">
              GT-R R34
            </span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg sm:text-xl text-[#b8d0e8] font-light leading-relaxed">
            El dios indiscutido de la era dorada japonesa. El mito de los 280 CV del Pacto de Caballeros, la tracción total inteligente ATTESA E-TS Pro, el bloque indestructible RB26DETT y la pantalla MFD que fusionó el asfalto real con el mundo digital.
          </p>

          {/* Key Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-12 pt-8 border-t border-white/10">
            {r34Stats.map((stat, idx) => (
              <div key={idx} className="p-3 bg-[#081524] border border-[#4ea0ff]/20 rounded">
                <span className="block text-2xl font-black tracking-tight text-white font-mono">
                  {stat.value}{' '}
                  <span className="text-xs font-normal text-[#4ea0ff]">{stat.unit}</span>
                </span>
                <span className="block text-[9px] font-mono text-[#7fa3c7] uppercase mt-1 leading-tight">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Group */}
          <div className="flex flex-wrap items-center gap-4 mt-10">
            <button
              onClick={() => scrollToSection('r34-ch-01')}
              className="px-6 py-3 bg-[#4ea0ff] hover:bg-[#72b9ff] text-black font-bold text-xs font-mono tracking-widest uppercase rounded transition-all shadow-lg active:scale-95"
            >
              Comenzar Lectura (Capítulo 01) →
            </button>
          </div>
        </div>
      </section>

      {/* Chapters Content Flow (20 Chapters) */}
      <main className="px-6 sm:px-12 md:px-24 py-16 max-w-5xl mx-auto space-y-16">
        {r34Chapters.map((chapter) => (
          <article
            key={chapter.number}
            id={`r34-ch-${chapter.number}`}
            className="p-8 sm:p-12 border border-[#4ea0ff]/20 bg-[#071322] rounded-xl shadow-xl space-y-6 scroll-mt-24"
          >
            {/* Chapter Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10">
              <span className="text-xs font-mono font-black text-[#4ea0ff] tracking-widest uppercase">
                CAPÍTULO {chapter.number} // {chapter.category}
              </span>
              <span className="text-[10px] font-mono text-[#6c8fae] uppercase">
                BNR34 ARCHIVE DOSSIER
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              {chapter.title}
            </h2>

            {/* Paragraphs */}
            <div className="space-y-4 text-[#cfdceb] text-base sm:text-lg leading-relaxed font-light">
              {chapter.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Highlight Callout Box if present */}
            {chapter.highlight && (
              <div className="p-6 bg-[#0a1e33] border-l-4 border-[#4ea0ff] rounded-r-lg space-y-1">
                <span className="text-2xl sm:text-3xl font-black font-mono text-[#4ea0ff] block">
                  {chapter.highlight.value}
                </span>
                <span className="text-sm font-bold text-white block">
                  {chapter.highlight.label}
                </span>
                {chapter.highlight.description && (
                  <p className="text-xs text-[#8cb4d8] font-mono">
                    {chapter.highlight.description}
                  </p>
                )}
              </div>
            )}

            {/* Attached Photo / Schematic if present */}
            {chapter.image && (
              <div
                onClick={() => setSelectedImage(chapter.image || null)}
                className="mt-6 border border-[#4ea0ff]/30 bg-black rounded-lg overflow-hidden cursor-pointer group"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={chapter.image.src}
                    alt={chapter.image.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 text-[10px] font-mono text-[#72b9ff] rounded">
                    🔍 AMPLIAR DETALLE
                  </div>
                </div>
                <div className="p-4 bg-[#091726] text-xs font-mono text-[#8cb4d8]">
                  <strong className="text-white mr-2">{chapter.image.tag}:</strong>
                  {chapter.image.caption}
                </div>
              </div>
            )}
          </article>
        ))}
      </main>

      {/* Gallery & Blueprint Explorer Section */}
      <section id="r34-gallery-section" className="px-6 sm:px-12 md:px-24 py-16 bg-[#040810] border-t border-[#4ea0ff]/20">
        <div className="max-w-5xl mx-auto space-y-8">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-[0.24em] text-[#4ea0ff] uppercase block mb-1">
              ARCHIVOS GRÁFICOS DESCLASIFICADOS
            </span>
            <h2 className="text-3xl font-black text-white">Galería Técnica & Schematics</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(item)}
                className="group border border-[#4ea0ff]/30 bg-[#071322] rounded-lg overflow-hidden cursor-pointer hover:border-[#4ea0ff] transition-all"
              >
                <div className="relative aspect-video overflow-hidden bg-black">
                  <img
                    src={item.src}
                    alt={item.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                </div>
                <div className="p-4 space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#4ea0ff] block">
                    {item.tag}
                  </span>
                  <p className="text-xs text-[#cfdceb] line-clamp-2">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Variant Comparison Matrix */}
      <section className="px-6 sm:px-12 md:px-24 py-16 bg-[#071322] border-t border-[#4ea0ff]/20">
        <div className="max-w-5xl mx-auto space-y-8">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-[0.24em] text-[#4ea0ff] uppercase block mb-1">
              GENEALOGÍA DEL BNR34 (1999 — 2005)
            </span>
            <h2 className="text-3xl font-black text-white">Versiones & Ediciones de Élite</h2>
          </div>

          {/* Variant Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveVariantTab('vspec')}
              className={`px-4 py-2 font-mono text-xs font-bold rounded transition-all ${
                activeVariantTab === 'vspec'
                  ? 'bg-[#4ea0ff] text-black'
                  : 'bg-[#0d2238] text-[#8cb4d8] hover:bg-[#12304e]'
              }`}
            >
              V-SPEC (1999)
            </button>
            <button
              onClick={() => setActiveVariantTab('vspec2')}
              className={`px-4 py-2 font-mono text-xs font-bold rounded transition-all ${
                activeVariantTab === 'vspec2'
                  ? 'bg-[#4ea0ff] text-black'
                  : 'bg-[#0d2238] text-[#8cb4d8] hover:bg-[#12304e]'
              }`}
            >
              V-SPEC II (2000)
            </button>
            <button
              onClick={() => setActiveVariantTab('mspec')}
              className={`px-4 py-2 font-mono text-xs font-bold rounded transition-all ${
                activeVariantTab === 'mspec'
                  ? 'bg-[#4ea0ff] text-black'
                  : 'bg-[#0d2238] text-[#8cb4d8] hover:bg-[#12304e]'
              }`}
            >
              M-SPEC (2001)
            </button>
            <button
              onClick={() => setActiveVariantTab('nur')}
              className={`px-4 py-2 font-mono text-xs font-bold rounded transition-all ${
                activeVariantTab === 'nur'
                  ? 'bg-[#ffd451] text-black'
                  : 'bg-[#0d2238] text-[#8cb4d8] hover:bg-[#12304e]'
              }`}
            >
              V-SPEC II NÜR (2002)
            </button>
            <button
              onClick={() => setActiveVariantTab('ztune')}
              className={`px-4 py-2 font-mono text-xs font-bold rounded transition-all ${
                activeVariantTab === 'ztune'
                  ? 'bg-[#e62628] text-white'
                  : 'bg-[#0d2238] text-[#8cb4d8] hover:bg-[#12304e]'
              }`}
            >
              NISMO Z-TUNE (2005)
            </button>
          </div>

          {/* Variant Detail Card */}
          <div className="p-8 bg-[#050b14] border border-[#4ea0ff]/30 rounded-xl space-y-4">
            {activeVariantTab === 'vspec' && (
              <div>
                <h3 className="text-xl font-black text-white">Nissan Skyline GT-R V-Spec (1999)</h3>
                <p className="mt-2 text-sm text-[#b8d0e8] leading-relaxed">
                  Incorporó el diferencial trasero Active LSD electrónico, suspensión 10 mm más baja y firme, y los revolucionarios difusores de fibra de carbono delantero y trasero para generar efecto suelo bajo la carrocería.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-xs font-mono">
                  <div className="p-3 bg-[#0d2238] rounded">
                    <span className="text-[#7fa3c7] block">PRODUCCIÓN</span>
                    <strong className="text-white">4.193 unidades</strong>
                  </div>
                  <div className="p-3 bg-[#0d2238] rounded">
                    <span className="text-[#7fa3c7] block">DIFUSORES</span>
                    <strong className="text-[#4ea0ff]">Carbono Venturi</strong>
                  </div>
                  <div className="p-3 bg-[#0d2238] rounded">
                    <span className="text-[#7fa3c7] block">TELEMETRÍA</span>
                    <strong className="text-white">MFD G-Sensor</strong>
                  </div>
                  <div className="p-3 bg-[#0d2238] rounded">
                    <span className="text-[#7fa3c7] block">TRACCIÓN</span>
                    <strong className="text-white">ATTESA E-TS Pro</strong>
                  </div>
                </div>
              </div>
            )}

            {activeVariantTab === 'vspec2' && (
              <div>
                <h3 className="text-xl font-black text-white">Nissan Skyline GT-R V-Spec II (2000)</h3>
                <p className="mt-2 text-sm text-[#b8d0e8] leading-relaxed">
                  La evolución definitiva de circuito: capó de fibra de carbono con toma NACA funcional que refrigera el turbocompresor trasero, interior en tela negra y pedalier de aluminio perforado.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-xs font-mono">
                  <div className="p-3 bg-[#0d2238] rounded">
                    <span className="text-[#7fa3c7] block">PRODUCCIÓN</span>
                    <strong className="text-white">1.855 unidades</strong>
                  </div>
                  <div className="p-3 bg-[#0d2238] rounded">
                    <span className="text-[#7fa3c7] block">CAPÓ</span>
                    <strong className="text-[#4ea0ff]">CFRP con NACA</strong>
                  </div>
                  <div className="p-3 bg-[#0d2238] rounded">
                    <span className="text-[#7fa3c7] block">PESO</span>
                    <strong className="text-white">1.540 kg</strong>
                  </div>
                  <div className="p-3 bg-[#0d2238] rounded">
                    <span className="text-[#7fa3c7] block">FRENOS</span>
                    <strong className="text-white">Brembo 324mm</strong>
                  </div>
                </div>
              </div>
            )}

            {activeVariantTab === 'mspec' && (
              <div>
                <h3 className="text-xl font-black text-white">Nissan Skyline GT-R M-Spec (2001)</h3>
                <p className="mt-2 text-sm text-[#b8d0e8] leading-relaxed">
                  Bautizado en honor al ingeniero Mizuno. Concebido como un Gran Turismo de lujo con amortiguadores Ripple Control para suavizar imperfecciones del asfalto y asientos de cuero calefactables cosidos a mano.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-xs font-mono">
                  <div className="p-3 bg-[#0d2238] rounded">
                    <span className="text-[#7fa3c7] block">PRODUCCIÓN</span>
                    <strong className="text-white">366 unidades</strong>
                  </div>
                  <div className="p-3 bg-[#0d2238] rounded">
                    <span className="text-[#7fa3c7] block">SUSPENSIÓN</span>
                    <strong className="text-[#4ea0ff]">Ripple Control</strong>
                  </div>
                  <div className="p-3 bg-[#0d2238] rounded">
                    <span className="text-[#7fa3c7] block">INTERIOR</span>
                    <strong className="text-white">Cuero Térmico</strong>
                  </div>
                  <div className="p-3 bg-[#0d2238] rounded">
                    <span className="text-[#7fa3c7] block">FILOSOFÍA</span>
                    <strong className="text-white">Shuto Highway GT</strong>
                  </div>
                </div>
              </div>
            )}

            {activeVariantTab === 'nur' && (
              <div>
                <h3 className="text-xl font-black text-white">V-Spec II Nür & M-Spec Nür (2002)</h3>
                <p className="mt-2 text-sm text-[#b8d0e8] leading-relaxed">
                  El adiós al R34 con motor N1 de competición (bloque 24U de paredes gruesas, turbos con turbinas de acero y tapa dorada) y el legendario color Millennium Jade.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-xs font-mono">
                  <div className="p-3 bg-[#0d2238] rounded">
                    <span className="text-[#7fa3c7] block">PRODUCCIÓN TOTAL</span>
                    <strong className="text-[#ffd451]">1.003 unidades</strong>
                  </div>
                  <div className="p-3 bg-[#0d2238] rounded">
                    <span className="text-[#7fa3c7] block">MOTOR</span>
                    <strong className="text-[#ffd451]">RB26 N1 (24U)</strong>
                  </div>
                  <div className="p-3 bg-[#0d2238] rounded">
                    <span className="text-[#7fa3c7] block">TURBOS</span>
                    <strong className="text-white">Turbinas de Acero</strong>
                  </div>
                  <div className="p-3 bg-[#0d2238] rounded">
                    <span className="text-[#7fa3c7] block">COLOR ICONO</span>
                    <strong className="text-[#ffd451]">Millennium Jade</strong>
                  </div>
                </div>
              </div>
            )}

            {activeVariantTab === 'ztune' && (
              <div>
                <h3 className="text-xl font-black text-white">NISMO R34 GT-R Z-Tune (2005)</h3>
                <p className="mt-2 text-sm text-[#b8d0e8] leading-relaxed">
                  19 unidades artesanales construidas en Omori Factory con motor 2.8L RB26DETT Z2 de 500 CV, chasis reforzado por soldadura continua y frenos Brembo monobloque de 6 pistones.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-xs font-mono">
                  <div className="p-3 bg-[#0d2238] rounded">
                    <span className="text-[#7fa3c7] block">PRODUCCIÓN</span>
                    <strong className="text-[#e62628]">19 unidades</strong>
                  </div>
                  <div className="p-3 bg-[#0d2238] rounded">
                    <span className="text-[#7fa3c7] block">POTENCIA</span>
                    <strong className="text-[#e62628]">500 CV @ 6.800 RPM</strong>
                  </div>
                  <div className="p-3 bg-[#0d2238] rounded">
                    <span className="text-[#7fa3c7] block">0 - 100 KM/H</span>
                    <strong className="text-white">3.8 segundos</strong>
                  </div>
                  <div className="p-3 bg-[#0d2238] rounded">
                    <span className="text-[#7fa3c7] block">VALOR ACTUAL</span>
                    <strong className="text-[#ffd451]">$2.500.000+ USD</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="px-6 sm:px-12 md:px-24 py-16 bg-[#050b14] border-t border-[#4ea0ff]/20">
        <div className="max-w-5xl mx-auto space-y-8">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-[0.24em] text-[#4ea0ff] uppercase block mb-1">
              CRONOLOGÍA HISTÓRICA
            </span>
            <h2 className="text-3xl font-black text-white">Línea Temporal de la Saga</h2>
          </div>

          <div className="space-y-6">
            {r34Timeline.map((item, idx) => (
              <div
                key={idx}
                className="p-6 bg-[#081524] border-l-2 border-[#4ea0ff] rounded-r-lg space-y-2"
              >
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 bg-[#4ea0ff]/20 text-[#72b9ff] font-mono font-bold text-xs rounded">
                    {item.year}
                  </span>
                  <h4 className="text-lg font-bold text-white">{item.title}</h4>
                </div>
                <p className="text-sm text-[#b8d0e8] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications Sheet */}
      <section id="r34-specs-section" className="px-6 sm:px-12 md:px-24 py-16 bg-[#040810] border-t border-[#4ea0ff]/20">
        <div className="max-w-5xl mx-auto space-y-8">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-[0.24em] text-[#4ea0ff] uppercase block mb-1">
              FICHA TÉCNICA HOMOLOGADA
            </span>
            <h2 className="text-3xl font-black text-white">Especificaciones de Fábrica (BNR34)</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            {r34Specs.map((spec, idx) => (
              <div
                key={idx}
                className="p-4 bg-[#071322] border border-[#4ea0ff]/20 rounded flex flex-col justify-between"
              >
                <span className="text-[#7fa3c7] uppercase text-[10px] block mb-1">
                  {spec.label}
                </span>
                <strong className="text-white text-sm">{spec.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal Lightbox */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-zoom-out animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full bg-[#071322] border border-[#4ea0ff] rounded-lg overflow-hidden shadow-2xl"
          >
            <div className="relative aspect-video bg-black">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-6 bg-[#091726] flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#4ea0ff] block">
                  {selectedImage.tag}
                </span>
                <p className="text-sm text-[#cfdceb] mt-1">{selectedImage.caption}</p>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="px-4 py-2 bg-[#4ea0ff] text-black font-mono font-bold text-xs rounded hover:bg-white transition-colors"
              >
                CERRAR
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Navigation */}
      <footer className="px-6 sm:px-12 md:px-24 py-12 bg-[#020509] border-t border-[#4ea0ff]/20 text-xs font-mono text-[#7fa3c7] flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={() => onNavigate('documentales')}
          className="hover:text-white transition-colors flex items-center gap-2"
        >
          <span>←</span> CATÁLOGO DE DOCUMENTALES
        </button>

        <div className="text-center">
          <span className="text-white font-bold">AUTOARCHIVE MONOGRAFÍAS // BNR34</span>
        </div>

        <button
          onClick={() => onNavigate('supra')}
          className="text-[#ffd451] hover:underline font-bold"
        >
          SIGUIENTE: TOYOTA SUPRA MK4 →
        </button>
      </footer>
    </div>
  );
};
