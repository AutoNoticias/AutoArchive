import React, { useState, useEffect } from 'react';
import { RoutePage } from '../types';
import { AudioNarrator } from './AudioNarrator';
import {
  supraChapters,
  supraStats,
  supraTimeline,
  supraSpecs,
  supraImages,
} from '../data/supraData';

interface SupraDocumentaryPageProps {
  onNavigate: (page: RoutePage) => void;
  onOpenAuthModal?: (reason?: string) => void;
}

export const SupraDocumentaryPage: React.FC<SupraDocumentaryPageProps> = ({ onNavigate, onOpenAuthModal }) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeVariantTab, setActiveVariantTab] = useState<'rz' | 'aerotop' | 'toms' | 'topsecret' | 'hks'>('rz');
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
      src: supraImages.hero,
      alt: 'Toyota Supra MK4 Turbo en Renaissance Red',
      caption:
        'El emblemático A80 con alerón trasero hueco elevado, faros de policarbonato con 4 ópticas y llantas de 5 radios.',
      tag: 'PIEZA 01 // SUPRA A80 RENAISSANCE RED',
    },
    {
      src: supraImages.engine,
      alt: 'Vano motor 2JZ-GTE Twin Turbo',
      caption:
        'Bloque indestructible de fundición de hierro nodular con culata desarrollada por Yamaha y doble turbo secuencial.',
      tag: 'PIEZA 02 // 2JZ-GTE 3.0L TWIN CAM 24',
    },
    {
      src: supraImages.cockpit,
      alt: 'Cabina envolvente orientada al piloto inspirada en un caza',
      caption:
        'Salpicadero con ángulo de 45° hacia el conductor, tacómetro analógico central de 8.000 RPM y caja Getrag V160.',
      tag: 'PIEZA 03 // COCKPIT DRIVER-CENTRIC',
    },
    {
      src: supraImages.cad,
      alt: 'Plano técnico CAD del Supra A80 y aerodinámica',
      caption:
        'Esquema ortográfico de suspensiones independientes de doble horquilla de aluminio y flujo aerodinámico sobre el alerón.',
      tag: 'PIEZA 04 // PLANO TÉCNICO CAD',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0c0505] text-[#f7efea] selection:bg-[#e62628] selection:text-white pb-20 md:pb-0">
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-white/10 z-[100]">
        <div
          className="h-full bg-gradient-to-r from-[#e62628] via-[#ff9900] to-[#ffd451] transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Header bar */}
      <header className="sticky top-0 z-40 bg-[#0c0505]/90 backdrop-blur-md border-b border-[#e62628]/20 px-4 sm:px-12 md:px-24 py-3.5 sm:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="supra-back-to-docs-btn"
            onClick={() => onNavigate('documentales')}
            className="flex items-center gap-1.5 text-xs font-mono tracking-widest text-[#b89590] hover:text-white uppercase transition-colors"
          >
            <span>←</span>
            <span className="hidden sm:inline">DOCUMENTALES</span>
            <span className="sm:hidden">DOCS</span>
          </button>
          <span className="text-white/20">/</span>
          <span className="text-[10px] font-mono tracking-widest px-2 py-0.5 border border-[#e62628]/40 bg-[#e62628]/10 text-[#ff7577]">
            DOC 005
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => scrollToSection('supra-gallery-section')}
            className="hidden sm:inline-block text-[11px] font-mono tracking-wider text-[#cfa8a2] hover:text-white transition-colors"
          >
            PLANO CAD
          </button>
          <button
            onClick={() => scrollToSection('supra-specs-section')}
            className="hidden lg:inline-block text-[11px] font-mono tracking-wider text-[#cfa8a2] hover:text-white transition-colors"
          >
            ESPECIFICACIONES
          </button>
          <button
            onClick={() => setShowIndexMenu(!showIndexMenu)}
            className="px-2.5 sm:px-3 py-1 border border-[#e62628]/40 bg-[#2b0c0d] hover:bg-[#e62628] hover:text-white text-[11px] sm:text-xs font-mono tracking-wider sm:tracking-widest uppercase transition-all rounded whitespace-nowrap"
          >
            ÍNDICE (20) {showIndexMenu ? '▲' : '▼'}
          </button>
        </div>
      </header>

      {/* Persistent Audio Narrator Bar */}
      <AudioNarrator
        docId="supra"
        documentaryTitle="TOYOTA SUPRA MK4 (A80)"
        chapters={supraChapters}
        accentColor="#e62628"
        onChapterSelect={(idx) => {
          const chap = supraChapters[idx];
          if (chap) {
            scrollToSection(`capitulo-${chap.number}`);
          }
        }}
        onOpenAuthModal={onOpenAuthModal}
      />

      {/* Chapters Index Dropdown Drawer */}
      {showIndexMenu && (
        <div className="sticky top-[65px] z-30 bg-[#1c0809] border-b border-[#e62628]/30 px-6 sm:px-12 md:px-24 py-6 shadow-2xl animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#ff7577]">
              // ÍNDICE COMPLETO DE CAPÍTULOS TÉCNICOS (TOYOTA SUPRA MK4 A80)
            </span>
            <button
              onClick={() => setShowIndexMenu(false)}
              className="text-xs text-[#b89590] hover:text-white font-mono"
            >
              [ CERRAR ✕ ]
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-h-[60vh] overflow-y-auto pr-2">
            {supraChapters.map((ch) => (
              <button
                key={ch.number}
                onClick={() => scrollToSection(`supra-ch-${ch.number}`)}
                className="p-2.5 text-left border border-white/5 bg-[#120506] hover:border-[#e62628]/50 hover:bg-[#2b0c0d] transition-all rounded group"
              >
                <span className="text-[10px] font-mono font-black text-[#e62628] group-hover:text-white block">
                  CAPÍTULO {ch.number}
                </span>
                <span className="text-xs text-[#ebd8d5] font-medium line-clamp-1 group-hover:text-white">
                  {ch.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center px-6 sm:px-12 md:px-24 py-20 overflow-hidden border-b border-[#e62628]/20">
        <div className="absolute inset-0 grid-blueprint opacity-15 pointer-events-none" />

        {/* Ambient Red & Amber Glows */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#e62628]/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-[#ff9900]/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-5xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#24090b] border border-[#e62628]/40 text-[10px] font-mono tracking-[0.2em] uppercase text-[#ff8082] mb-6 rounded">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e62628] animate-pulse" />
            <span>EXPEDIENTE TÉCNICO A80 · 1993 — 2002</span>
          </div>

          <h1 className="text-[clamp(44px,8.5vw,110px)] font-black tracking-[-0.07em] leading-[0.88] text-white">
            TOYOTA SUPRA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffffff] via-[#ff9b9d] to-[#e62628]">
              MK4 A80
            </span>
          </h1>

          <p className="mt-8 max-w-3xl text-lg sm:text-xl text-[#ebd0cc] font-light leading-relaxed">
            La obra cumbre de Isao Tsuzuki. El mito del bloque indestructible 2JZ-GTE, la sobrealimentación secuencial en dos fases, el récord mundial de frenada y el superdeportivo que conquistó las autopistas clandestinas y la cultura universal.
          </p>

          {/* Key Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-12 pt-8 border-t border-white/10">
            {supraStats.map((stat, idx) => (
              <div key={idx} className="p-3 bg-[#190708] border border-[#e62628]/20 rounded">
                <span className="block text-2xl font-black tracking-tight text-white font-mono">
                  {stat.value}{' '}
                  <span className="text-xs font-normal text-[#e62628]">{stat.unit}</span>
                </span>
                <span className="block text-[9px] font-mono text-[#b89590] uppercase mt-1 leading-tight">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Group */}
          <div className="flex flex-wrap items-center gap-4 mt-10">
            <button
              onClick={() => scrollToSection('supra-ch-01')}
              className="px-6 py-3 bg-[#e62628] hover:bg-[#ff3d3f] text-white font-bold text-xs font-mono tracking-widest uppercase rounded transition-all shadow-lg active:scale-95"
            >
              Comenzar Lectura (Capítulo 01) →
            </button>
          </div>
        </div>
      </section>

      {/* Chapters Content Flow (20 Chapters) */}
      <main className="px-6 sm:px-12 md:px-24 py-16 max-w-5xl mx-auto space-y-16">
        {supraChapters.map((chapter) => (
          <article
            key={chapter.number}
            id={`supra-ch-${chapter.number}`}
            className="p-8 sm:p-12 border border-[#e62628]/20 bg-[#160708] rounded-xl shadow-xl space-y-6 scroll-mt-24"
          >
            {/* Chapter Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10">
              <span className="text-xs font-mono font-black text-[#e62628] tracking-widest uppercase">
                CAPÍTULO {chapter.number} // {chapter.category}
              </span>
              <span className="text-[10px] font-mono text-[#a87f7a] uppercase">
                A80 ARCHIVE DOSSIER
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              {chapter.title}
            </h2>

            {/* Paragraphs */}
            <div className="space-y-4 text-[#ecd3cf] text-base sm:text-lg leading-relaxed font-light">
              {chapter.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {/* Highlight Callout Box if present */}
            {chapter.highlight && (
              <div className="p-6 bg-[#240a0c] border-l-4 border-[#e62628] rounded-r-lg space-y-1">
                <span className="text-2xl sm:text-3xl font-black font-mono text-[#e62628] block">
                  {chapter.highlight.value}
                </span>
                <span className="text-sm font-bold text-white block">
                  {chapter.highlight.label}
                </span>
                {chapter.highlight.description && (
                  <p className="text-xs text-[#cfa8a2] font-mono">
                    {chapter.highlight.description}
                  </p>
                )}
              </div>
            )}

            {/* Attached Photo / Schematic if present */}
            {chapter.image && (
              <div
                onClick={() => setSelectedImage(chapter.image || null)}
                className="mt-6 border border-[#e62628]/30 bg-black rounded-lg overflow-hidden cursor-pointer group"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={chapter.image.src}
                    alt={chapter.image.alt}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 text-[10px] font-mono text-[#ff8082] rounded">
                    🔍 AMPLIAR DETALLE
                  </div>
                </div>
                <div className="p-4 bg-[#1e090a] text-xs font-mono text-[#cfa8a2]">
                  <strong className="text-white mr-2">{chapter.image.tag}:</strong>
                  {chapter.image.caption}
                </div>
              </div>
            )}
          </article>
        ))}
      </main>

      {/* Gallery & Blueprint Explorer Section */}
      <section id="supra-gallery-section" className="px-6 sm:px-12 md:px-24 py-16 bg-[#080203] border-t border-[#e62628]/20">
        <div className="max-w-5xl mx-auto space-y-8">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-[0.24em] text-[#e62628] uppercase block mb-1">
              ARCHIVOS GRÁFICOS DESCLASIFICADOS
            </span>
            <h2 className="text-3xl font-black text-white">Galería Técnica & Schematics A80</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryItems.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedImage(item)}
                className="group border border-[#e62628]/30 bg-[#160708] rounded-lg overflow-hidden cursor-pointer hover:border-[#e62628] transition-all"
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
                  <span className="text-[10px] font-mono font-bold text-[#e62628] block">
                    {item.tag}
                  </span>
                  <p className="text-xs text-[#ebd3cf] line-clamp-2">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Variant Comparison Matrix */}
      <section className="px-6 sm:px-12 md:px-24 py-16 bg-[#160708] border-t border-[#e62628]/20">
        <div className="max-w-5xl mx-auto space-y-8">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-[0.24em] text-[#e62628] uppercase block mb-1">
              VERSIONES Y LEYENDAS DEL A80
            </span>
            <h2 className="text-3xl font-black text-white">De la Calle a la Competición</h2>
          </div>

          {/* Variant Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveVariantTab('rz')}
              className={`px-4 py-2 font-mono text-xs font-bold rounded transition-all ${
                activeVariantTab === 'rz'
                  ? 'bg-[#e62628] text-white'
                  : 'bg-[#290c0e] text-[#cfa8a2] hover:bg-[#381113]'
              }`}
            >
              SUPRA RZ TWIN-TURBO (1993)
            </button>
            <button
              onClick={() => setActiveVariantTab('aerotop')}
              className={`px-4 py-2 font-mono text-xs font-bold rounded transition-all ${
                activeVariantTab === 'aerotop'
                  ? 'bg-[#e62628] text-white'
                  : 'bg-[#290c0e] text-[#cfa8a2] hover:bg-[#381113]'
              }`}
            >
              AEROTOP TARGA (8 KG)
            </button>
            <button
              onClick={() => setActiveVariantTab('toms')}
              className={`px-4 py-2 font-mono text-xs font-bold rounded transition-all ${
                activeVariantTab === 'toms'
                  ? 'bg-emerald-500 text-black'
                  : 'bg-[#290c0e] text-[#cfa8a2] hover:bg-[#381113]'
              }`}
            >
              CASTROL TOM’S GT500
            </button>
            <button
              onClick={() => setActiveVariantTab('topsecret')}
              className={`px-4 py-2 font-mono text-xs font-bold rounded transition-all ${
                activeVariantTab === 'topsecret'
                  ? 'bg-[#ffd451] text-black'
                  : 'bg-[#290c0e] text-[#cfa8a2] hover:bg-[#381113]'
              }`}
            >
              TOP SECRET 317 KM/H
            </button>
            <button
              onClick={() => setActiveVariantTab('hks')}
              className={`px-4 py-2 font-mono text-xs font-bold rounded transition-all ${
                activeVariantTab === 'hks'
                  ? 'bg-[#ff9900] text-black'
                  : 'bg-[#290c0e] text-[#cfa8a2] hover:bg-[#381113]'
              }`}
            >
              HKS DRAG (6.89 SEG)
            </button>
          </div>

          {/* Variant Detail Card */}
          <div className="p-8 bg-[#0a0304] border border-[#e62628]/30 rounded-xl space-y-4">
            {activeVariantTab === 'rz' && (
              <div>
                <h3 className="text-xl font-black text-white">Toyota Supra RZ Twin-Turbo (1993-2002)</h3>
                <p className="mt-2 text-sm text-[#ebd0cc] leading-relaxed">
                  La especificación más purista para el mercado japonés: cambio manual Getrag V160 de 6 relaciones, amortiguadores amarillos Bilstein, frenos de 4 pistones, diferencial autoblocante Torsen y el motor 2JZ-GTE secuencial.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-xs font-mono">
                  <div className="p-3 bg-[#24090b] rounded">
                    <span className="text-[#b89590] block">TRANSMISIÓN</span>
                    <strong className="text-white">Getrag 6 Marchas</strong>
                  </div>
                  <div className="p-3 bg-[#24090b] rounded">
                    <span className="text-[#b89590] block">DIFERENCIAL</span>
                    <strong className="text-[#e62628]">Torsen T-2 LSD</strong>
                  </div>
                  <div className="p-3 bg-[#24090b] rounded">
                    <span className="text-[#b89590] block">0 - 100 KM/H</span>
                    <strong className="text-white">4.6 segundos</strong>
                  </div>
                  <div className="p-3 bg-[#24090b] rounded">
                    <span className="text-[#b89590] block">AMORTIGUACIÓN</span>
                    <strong className="text-[#ffd451]">Bilstein Sport</strong>
                  </div>
                </div>
              </div>
            )}

            {activeVariantTab === 'aerotop' && (
              <div>
                <h3 className="text-xl font-black text-white">Supra Aerotop (Techo Targa Desmontable)</h3>
                <p className="mt-2 text-sm text-[#ebd0cc] leading-relaxed">
                  Panel de techo rígido fabricado en aleación de aluminio ligero de apenas 8 kilogramos. Se retira manualmente y se ancla con dos cierres en el maletero sin reducir el volumen de equipaje útil.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-xs font-mono">
                  <div className="p-3 bg-[#24090b] rounded">
                    <span className="text-[#b89590] block">PESO DEL TECHO</span>
                    <strong className="text-white">8.2 kg (Aluminio)</strong>
                  </div>
                  <div className="p-3 bg-[#24090b] rounded">
                    <span className="text-[#b89590] block">ANCLAJE</span>
                    <strong className="text-[#e62628]">Maletero Oculto</strong>
                  </div>
                  <div className="p-3 bg-[#24090b] rounded">
                    <span className="text-[#b89590] block">RIGIDEZ</span>
                    <strong className="text-white">Largueros Reforzados</strong>
                  </div>
                  <div className="p-3 bg-[#24090b] rounded">
                    <span className="text-[#b89590] block">MERCADOS</span>
                    <strong className="text-white">USA, Europa, Japón</strong>
                  </div>
                </div>
              </div>
            )}

            {activeVariantTab === 'toms' && (
              <div>
                <h3 className="text-xl font-black text-white">Castrol TOM’S Supra GT500 (1997)</h3>
                <p className="mt-2 text-sm text-[#ebd0cc] leading-relaxed">
                  Campeón del JGTC con Pedro de la Rosa y Michael Krumm. Montaba el motor 4 cilindros 3S-GTE de 2.0 litros turboalimentado con 480 CV para optimizar el reparto de pesos en pista.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-xs font-mono">
                  <div className="p-3 bg-[#24090b] rounded">
                    <span className="text-[#b89590] block">CAMPEONATO</span>
                    <strong className="text-emerald-400">JGTC GT500 1997</strong>
                  </div>
                  <div className="p-3 bg-[#24090b] rounded">
                    <span className="text-[#b89590] block">MOTOR</span>
                    <strong className="text-white">3S-GTE 2.0L Turbo</strong>
                  </div>
                  <div className="p-3 bg-[#24090b] rounded">
                    <span className="text-[#b89590] block">PESO</span>
                    <strong className="text-white">1.100 kg</strong>
                  </div>
                  <div className="p-3 bg-[#24090b] rounded">
                    <span className="text-[#b89590] block">PILOTOS</span>
                    <strong className="text-white">De la Rosa / Krumm</strong>
                  </div>
                </div>
              </div>
            )}

            {activeVariantTab === 'topsecret' && (
              <div>
                <h3 className="text-xl font-black text-white">Top Secret 0-300 km/h Smokey Nagata (1998)</h3>
                <p className="mt-2 text-sm text-[#ebd0cc] leading-relaxed">
                  El Supra dorado de más de 800 CV con el que Smokey Nagata rodó a 317 km/h en la autopista A1 de noche en el Reino Unido, desatando la mayor leyenda del tuning clandestino japonés.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-xs font-mono">
                  <div className="p-3 bg-[#24090b] rounded">
                    <span className="text-[#b89590] block">VELOCIDAD ALCANZADA</span>
                    <strong className="text-[#ffd451]">317 km/h (197 mph)</strong>
                  </div>
                  <div className="p-3 bg-[#24090b] rounded">
                    <span className="text-[#b89590] block">ESCENARIO</span>
                    <strong className="text-white">Autopista A1 (UK)</strong>
                  </div>
                  <div className="p-3 bg-[#24090b] rounded">
                    <span className="text-[#b89590] block">POTENCIA</span>
                    <strong className="text-[#e62628]">820 CV @ 1.8 bar</strong>
                  </div>
                  <div className="p-3 bg-[#24090b] rounded">
                    <span className="text-[#b89590] block">COLOR</span>
                    <strong className="text-[#ffd451]">Top Secret Gold</strong>
                  </div>
                </div>
              </div>
            )}

            {activeVariantTab === 'hks' && (
              <div>
                <h3 className="text-xl font-black text-white">HKS Drag Supra 7-Second Car</h3>
                <p className="mt-2 text-sm text-[#ebd0cc] leading-relaxed">
                  El monstruo de aceleración desarrollado por HKS: primer coche de propulsión trasera con carrocería de acero en romper la barrera de los 7 segundos en el 1/4 de milla (6.89 segundos @ 320 km/h).
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-xs font-mono">
                  <div className="p-3 bg-[#24090b] rounded">
                    <span className="text-[#b89590] block">1/4 DE MILLA</span>
                    <strong className="text-[#ff9900]">6.893 segundos</strong>
                  </div>
                  <div className="p-3 bg-[#24090b] rounded">
                    <span className="text-[#b89590] block">VELOCIDAD TRAMPA</span>
                    <strong className="text-white">320.4 km/h</strong>
                  </div>
                  <div className="p-3 bg-[#24090b] rounded">
                    <span className="text-[#b89590] block">POTENCIA 2JZ</span>
                    <strong className="text-[#e62628]">1.450+ CV</strong>
                  </div>
                  <div className="p-3 bg-[#24090b] rounded">
                    <span className="text-[#b89590] block">TURBO</span>
                    <strong className="text-white">HKS T51R SPL</strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="px-6 sm:px-12 md:px-24 py-16 bg-[#0c0505] border-t border-[#e62628]/20">
        <div className="max-w-5xl mx-auto space-y-8">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-[0.24em] text-[#e62628] uppercase block mb-1">
              CRONOLOGÍA HISTÓRICA
            </span>
            <h2 className="text-3xl font-black text-white">Línea Temporal de la Saga Supra</h2>
          </div>

          <div className="space-y-6">
            {supraTimeline.map((item, idx) => (
              <div
                key={idx}
                className="p-6 bg-[#180708] border-l-2 border-[#e62628] rounded-r-lg space-y-2"
              >
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 bg-[#e62628]/20 text-[#ff8082] font-mono font-bold text-xs rounded">
                    {item.year}
                  </span>
                  <h4 className="text-lg font-bold text-white">{item.title}</h4>
                </div>
                <p className="text-sm text-[#ebd0cc] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications Sheet */}
      <section id="supra-specs-section" className="px-6 sm:px-12 md:px-24 py-16 bg-[#080203] border-t border-[#e62628]/20">
        <div className="max-w-5xl mx-auto space-y-8">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-[0.24em] text-[#e62628] uppercase block mb-1">
              FICHA TÉCNICA OFICIAL
            </span>
            <h2 className="text-3xl font-black text-white">Especificaciones de Fábrica (JZA80)</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            {supraSpecs.map((spec, idx) => (
              <div
                key={idx}
                className="p-4 bg-[#160708] border border-[#e62628]/20 rounded flex flex-col justify-between"
              >
                <span className="text-[#b89590] uppercase text-[10px] block mb-1">
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
            className="max-w-4xl w-full bg-[#160708] border border-[#e62628] rounded-lg overflow-hidden shadow-2xl"
          >
            <div className="relative aspect-video bg-black">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-6 bg-[#210a0c] flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-[#e62628] block">
                  {selectedImage.tag}
                </span>
                <p className="text-sm text-[#ebd3cf] mt-1">{selectedImage.caption}</p>
              </div>
              <button
                onClick={() => setSelectedImage(null)}
                className="px-4 py-2 bg-[#e62628] text-white font-mono font-bold text-xs rounded hover:bg-white hover:text-black transition-colors"
              >
                CERRAR
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Navigation */}
      <footer className="px-6 sm:px-12 md:px-24 py-12 bg-[#040101] border-t border-[#e62628]/20 text-xs font-mono text-[#b89590] flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={() => onNavigate('documentales')}
          className="hover:text-white transition-colors flex items-center gap-2"
        >
          <span>←</span> CATÁLOGO DE DOCUMENTALES
        </button>

        <div className="text-center">
          <span className="text-white font-bold">AUTOARCHIVE MONOGRAFÍAS // SUPRA JZA80</span>
        </div>

        <button
          onClick={() => onNavigate('r34')}
          className="text-[#4ea0ff] hover:underline font-bold"
        >
          VER: NISSAN SKYLINE GT-R R34 →
        </button>
      </footer>
    </div>
  );
};
