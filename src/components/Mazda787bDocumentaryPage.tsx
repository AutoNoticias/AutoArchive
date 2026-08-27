import React, { useState, useEffect } from 'react';
import { RoutePage } from '../types';
import { AudioNarrator } from './AudioNarrator';
import {
  mazda787bChapters,
  mazda787bStats,
  mazda787bTimeline,
  mazda787bSpecs,
  mazda787bImages,
} from '../data/mazda787bData';

interface Mazda787bDocumentaryPageProps {
  onNavigate: (page: RoutePage) => void;
  onOpenAuthModal?: (reason?: string) => void;
}

export const Mazda787bDocumentaryPage: React.FC<Mazda787bDocumentaryPageProps> = ({ onNavigate, onOpenAuthModal }) => {
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeVariantTab, setActiveVariantTab] = useState<'lemans55' | 'jspc18' | 'test787' | 'renown'>('lemans55');
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
      src: mazda787bImages.hero,
      alt: 'Mazda 787B #55 Le Mans Winner 1991',
      caption:
        'El prototipo ganador de las 24 Horas de Le Mans con la mítica librea verde y naranja Renown.',
      tag: 'PIEZA 01 // MAZDA 787B #55',
    },
    {
      src: mazda787bImages.engine,
      alt: 'Vano motor R26B Wankel de 4 rotores',
      caption:
        'Bloque de cuatro rotores con admisión variable VICS y colectores de escape de titanio.',
      tag: 'PIEZA 02 // MOTOR R26B WANKEL',
    },
    {
      src: mazda787bImages.cockpit,
      alt: 'Cabina de pilotaje de resistencia',
      caption:
        'Interior minimalista con volante Momo de tres radios y instrumentación analógica para turnos nocturnos.',
      tag: 'PIEZA 03 // COCKPIT DE RESISTENCIA',
    },
    {
      src: mazda787bImages.cad,
      alt: 'Plano técnico CAD del Mazda 787B',
      caption:
        'Esquema ortográfico de la aerodinámica de suelo efecto y chasis monocasco de fibra de carbono.',
      tag: 'PIEZA 04 // PLANO TÉCNICO CAD',
    },
  ];

  return (
    <div className="min-h-screen bg-[#07130b] text-[#edf8f0] selection:bg-[#22c55e] selection:text-black pb-20 md:pb-0">
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-white/10 z-[100]">
        <div
          className="h-full bg-gradient-to-r from-[#22c55e] via-[#4ea0ff] to-[#ffd451] transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Header bar */}
      <header className="sticky top-0 z-40 bg-[#07130b]/90 backdrop-blur-md border-b border-[#22c55e]/20 px-4 sm:px-12 md:px-24 py-3.5 sm:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="mazda-back-to-docs-btn"
            onClick={() => onNavigate('documentales')}
            className="flex items-center gap-1.5 text-xs font-mono tracking-widest text-[#a3c9b1] hover:text-white uppercase transition-colors"
          >
            <span>←</span>
            <span>VOLVER A DOCUMENTALES</span>
          </button>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => scrollToSection('resumen-ejecutivo')}
            className="text-xs font-mono text-[#81b292] hover:text-[#22c55e] transition-colors"
          >
            01. EL MITO
          </button>
          <button
            onClick={() => scrollToSection('capitulos-archivo')}
            className="text-xs font-mono text-[#81b292] hover:text-[#22c55e] transition-colors"
          >
            02. ARCHIVO COMPLETO (20 CAPÍTULOS)
          </button>
          <button
            onClick={() => scrollToSection('especificaciones-tecnicas')}
            className="text-xs font-mono text-[#81b292] hover:text-[#22c55e] transition-colors"
          >
            03. ESPECIFICACIONES
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowIndexMenu(!showIndexMenu)}
            className="px-3 py-1.5 bg-[#22c55e]/10 border border-[#22c55e]/40 hover:bg-[#22c55e]/20 text-[#22c55e] rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all"
          >
            {showIndexMenu ? '✕ CERRAR ÍNDICE' : '☰ ÍNDICE'}
          </button>
        </div>
      </header>

      {/* Persistent Audio Narrator Bar */}
      <AudioNarrator
        docId="mazda-787b"
        documentaryTitle="MAZDA 787B (LE MANS '91)"
        chapters={mazda787bChapters}
        accentColor="#22c55e"
        onChapterSelect={(idx) => {
          const chap = mazda787bChapters[idx];
          if (chap) {
            scrollToSection(`capitulo-${chap.number}`);
          }
        }}
        onOpenAuthModal={onOpenAuthModal}
      />

      {/* Slide-down Chapter Index Menu */}
      {showIndexMenu && (
        <div className="bg-[#0b1f13] border-b border-[#22c55e]/30 px-6 sm:px-12 md:px-28 py-6 z-30 animate-fade-in shadow-2xl">
          <div className="max-w-6xl mx-auto">
            <h4 className="text-xs font-mono tracking-[0.2em] text-[#22c55e] mb-4 uppercase">
              // ÍNDICE DE CAPÍTULOS Y SECCIONES (MAZDA 787B)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              {mazda787bChapters.map((ch) => (
                <button
                  key={ch.number}
                  onClick={() => scrollToSection(`capitulo-${ch.number}`)}
                  className="text-left px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-[#d1e7dc] hover:text-white transition-all font-mono flex items-center gap-2"
                >
                  <span className="text-[#22c55e] font-bold">{ch.number}</span>
                  <span className="truncate">{ch.title.split(':')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-end px-6 sm:px-12 md:px-28 py-16 sm:py-24 overflow-hidden border-b border-[#22c55e]/20">
        <div className="absolute inset-0 z-0">
          <img
            src={mazda787bImages.hero}
            alt="Mazda 787B Le Mans Winner"
            className="w-full h-full object-cover object-center filter brightness-90 scale-105 animate-pulse duration-[10000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07130b] via-[#07130b]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07130b] via-transparent to-[#07130b]/80" />
        </div>

        <div className="relative z-10 max-w-5xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#22c55e]/15 border border-[#22c55e]/40 text-[#22c55e] font-mono text-xs font-bold tracking-widest uppercase shadow-lg">
            <span>★ MONOGRAFÍA OFICIAL Nº 006 // GRUPO C LE MANS</span>
          </div>

          <h1 className="text-[clamp(42px,7.5vw,96px)] font-black tracking-tight leading-[0.92] text-white">
            MAZDA <span className="text-[#22c55e]">787B</span>
          </h1>

          <p className="text-base sm:text-xl text-[#bfe3cc] font-mono max-w-2xl leading-relaxed">
            La gesta inmortal de Hiroshima en las 24 Horas de Le Mans 1991: el triunfo del motor rotativo Wankel de 4 rotores R26B y la mítica librea Renown que hizo historia mundial.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollToSection('resumen-ejecutivo')}
              className="px-6 py-3.5 bg-[#22c55e] hover:bg-[#1faa4b] text-black font-mono font-black text-xs tracking-widest uppercase rounded-xl transition-all shadow-[0_0_25px_rgba(34,197,94,0.4)] flex items-center gap-2 active:scale-95"
            >
              <span>EXPLORAR DOCUMENTAL</span>
              <span>↓</span>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="border-b border-[#22c55e]/20 bg-[#0a1a10]">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-28 py-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {mazda787bStats.map((st, i) => (
              <div key={i} className="p-5 bg-[#0e2417] border border-[#22c55e]/30 rounded-xl space-y-1">
                <div className="text-2xl sm:text-3xl font-black font-mono text-[#22c55e]">{st.value}</div>
                <div className="text-[10px] font-mono text-[#81b292] uppercase">{st.unit}</div>
                <div className="text-xs text-[#d1e7dc] pt-1">{st.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Executive Summary / Intro */}
      <section id="resumen-ejecutivo" className="max-w-5xl mx-auto px-6 sm:px-12 py-20 space-y-12">
        <div className="space-y-4">
          <span className="text-xs font-mono font-bold tracking-[0.24em] text-[#22c55e] uppercase">
            // RESUMEN EJECUTIVO // EL TRIUNFO DE LA PASIÓN
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            El día que Hiroshima conquistó el monte Olimpo de la resistencia mundial.
          </h2>
          <p className="text-base sm:text-lg text-[#bfe3cc] leading-relaxed pt-2">
            El 16 de junio de 1991, el prototipo Mazda 787B número 55 cruzó la línea de meta en el circuito de La Sarthe. No fue una victoria común: fue la culminación de un cuarto de siglo de investigación obsesiva con el motor rotativo Wankel. Con tres pilotos incansables, una fiabilidad impenetrable y el sonido inconfundible de cuatro rotores bramando al límite, Mazda escribió una de las páginas más hermosas e imborrables del automovilismo universal.
          </p>
        </div>

        {/* Variant Tabs */}
        <div className="bg-[#0b1f13] border border-[#22c55e]/30 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold font-mono text-white">VARIANTES HISTÓRICAS DEL 787 / 787B</h3>
              <p className="text-xs text-[#81b292] font-mono">Selecciona una versión para inspeccionar su configuración de competición.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'lemans55', label: 'CHASIS #55 (LE MANS 91)' },
                { id: 'jspc18', label: 'CHASIS #18 (JSPC)' },
                { id: 'test787', label: 'PROTOTIPO 787 (1990)' },
                { id: 'renown', label: 'LIBREA RENOWN ARGYLE' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveVariantTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider transition-all ${
                    activeVariantTab === tab.id
                      ? 'bg-[#22c55e] text-black shadow-lg'
                      : 'bg-white/5 text-[#a3c9b1] hover:bg-white/10'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 sm:p-6 bg-[#07130b] border border-[#22c55e]/20 rounded-xl">
            {activeVariantTab === 'lemans55' && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold font-mono text-[#22c55e]">CHASIS 787B-002 (CÓCHE GANADOR DE LE MANS 1991)</h4>
                <p className="text-xs sm:text-sm text-[#d1e7dc] leading-relaxed">
                  El coche número 55 pilotado por Johnny Herbert, Volker Weidler y Bertrand Gachot. Equipado con el motor R26B de 4 rotores ajustado a 700 CV de potencia continua, discos de freno de carbono y una relación de transmisión optimizada para la recta de Mulsanne. Tras su victoria, fue retirado intacto y preservado en el Museo Mazda de Hiroshima.
                </p>
              </div>
            )}
            {activeVariantTab === 'jspc18' && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold font-mono text-[#22c55e]">CHASIS 787B-001 (CAMPEONATO JAPONÉS DE SPORT PROTOTIPOS)</h4>
                <p className="text-xs sm:text-sm text-[#d1e7dc] leading-relaxed">
                  Inscrito en el campeonato nacional JSPC frente a los prototipos de Nissan y Toyota. Utilizaba esquemas de suspensión adaptados a circuitos ratoneros como Suzuka y Fuji Speedway, con aerodinámica de alta carga y sponsor principal de Jecos y Renown.
                </p>
              </div>
            )}
            {activeVariantTab === 'test787' && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold font-mono text-[#22c55e]">MAZDA 787 ORIGINAL (TEMPORADA 1990)</h4>
                <p className="text-xs sm:text-sm text-[#d1e7dc] leading-relaxed">
                  El antecesor directo del 787B. Montaba el motor 26B con conductos de admisión fijos y sufrió problemas de temperatura y consumo en Le Mans 1990. Las lecciones aprendidas en esta temporada permitieron desarrollar el sistema VICS y los frenos mejorados del 787B.
                </p>
              </div>
            )}
            {activeVariantTab === 'renown' && (
              <div className="space-y-3">
                <h4 className="text-sm font-bold font-mono text-[#22c55e]">LA HISTORIA DE LA LIBREA ARGYLE RENOWN</h4>
                <p className="text-xs sm:text-sm text-[#d1e7dc] leading-relaxed">
                  Inspirada en los patrones de rombos de la marca de ropa japonesa Renown. Diseñada para destacar de noche bajo los focos de La Sarthe y convertirse en un icono pop instantáneo del automovilismo mundial de los años 90.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Chapters Archive Section */}
      <section id="capitulos-archivo" className="max-w-4xl mx-auto px-6 sm:px-12 py-20 space-y-16">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono font-bold tracking-[0.24em] text-[#22c55e] uppercase">
            // DOSSIER HISTÓRICO COMPLETO // 20 CAPÍTULOS
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Crónica Detallada del Mazda 787B
          </h2>
          <p className="text-sm text-[#81b292] font-mono">
            Investigación histórica exhaustiva desde la concepción del motor Wankel hasta la gloria eterna en Le Mans 1991.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-12 sm:space-y-16">
          {mazda787bChapters.map((ch) => (
            <article
              key={ch.number}
              id={`capitulo-${ch.number}`}
              className="space-y-4 sm:space-y-6 pt-8 sm:pt-10 border-t border-white/10 first:border-t-0 first:pt-0"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-xs font-mono font-black text-[#22c55e] tracking-widest px-2.5 py-1 bg-[#22c55e]/15 border border-[#22c55e]/40 rounded">
                    CAPÍTULO {ch.number}
                  </span>
                  <span className="text-[11px] sm:text-xs font-mono text-[#81b292] uppercase tracking-widest truncate">
                    // {ch.category}
                  </span>
                </div>
                <h2 className="text-xl sm:text-4xl font-black text-white tracking-tight leading-snug sm:leading-tight">
                  {ch.title}
                </h2>
              </div>

              <div className="space-y-4 text-[15px] sm:text-base text-[#d1e7dc] font-normal sm:font-light leading-relaxed sm:leading-loose">
                {ch.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {ch.image && (
                <div className="my-8 rounded-xl overflow-hidden border border-[#22c55e]/30 bg-[#0a1a10] group cursor-pointer" onClick={() => setSelectedImage(ch.image!)}>
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={ch.image.src}
                      alt={ch.image.alt}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2 py-1 bg-black/80 text-[10px] font-mono text-[#22c55e] uppercase border border-[#22c55e]/30 rounded">
                      {ch.image.tag}
                    </div>
                  </div>
                  <div className="p-4 bg-[#07130b] border-t border-[#22c55e]/20 text-xs font-mono text-[#81b292]">
                    {ch.image.caption}
                  </div>
                </div>
              )}

              {ch.highlight && (
                <div className="mt-6 p-5 bg-[#122e1b] border-l-4 border-[#22c55e] rounded-r-xl space-y-1">
                  <div className="text-2xl font-black font-mono text-[#22c55e]">{ch.highlight.value}</div>
                  <div className="text-xs font-mono font-bold text-white uppercase">{ch.highlight.label}</div>
                  {ch.highlight.description && (
                    <p className="text-xs text-[#81b292] pt-1">{ch.highlight.description}</p>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-[#091c10] border-t border-[#22c55e]/20 py-20 px-6 sm:px-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold tracking-[0.24em] text-[#22c55e] uppercase">
              // CRONOLOGÍA HISTÓRICA // 1967 — 2011
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Hitos Clave del Mazda 787B y el Motor Wankel
            </h2>
          </div>

          <div className="relative border-l-2 border-[#22c55e]/40 ml-4 sm:ml-8 space-y-10 pl-6 sm:pl-8">
            {mazda787bTimeline.map((item, idx) => (
              <div key={idx} className="relative space-y-2">
                <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#07130b] border-2 border-[#22c55e]" />
                <span className="inline-block px-2.5 py-1 bg-[#22c55e]/15 border border-[#22c55e]/30 text-[#22c55e] font-mono text-xs font-bold rounded">
                  {item.year}
                </span>
                <h3 className="text-lg font-bold font-mono text-white">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#bfe3cc] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specs Table */}
      <section id="especificaciones-tecnicas" className="max-w-4xl mx-auto px-6 sm:px-12 py-20 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono font-bold tracking-[0.24em] text-[#22c55e] uppercase">
            // FICHA TÉCNICA OFICIAL // HOMOLOGACIÓN FIA GRUPO C
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Especificaciones Técnicas del Mazda 787B (1991)
          </h2>
        </div>

        <div className="bg-[#0b1f13] border border-[#22c55e]/30 rounded-2xl overflow-hidden shadow-2xl">
          <div className="divide-y divide-[#22c55e]/15">
            {mazda787bSpecs.map((spec, sIdx) => (
              <div key={sIdx} className="grid grid-cols-1 sm:grid-cols-3 p-4 sm:p-5 gap-2 hover:bg-white/5 transition-colors">
                <div className="text-xs font-mono font-bold text-[#22c55e]">{spec.label}</div>
                <div className="sm:col-span-2 text-xs sm:text-sm font-mono text-[#d1e7dc]">{spec.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-[#0b1f13] border border-[#22c55e]/40 rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#22c55e] font-bold tracking-widest uppercase">
                {selectedImage.tag}
              </span>
              <button
                onClick={() => setSelectedImage(null)}
                className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg font-mono text-xs"
              >
                ✕ CERRAR
              </button>
            </div>

            <div className="rounded-xl overflow-hidden border border-white/10 max-h-[70vh] flex items-center justify-center bg-black">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-h-[70vh] w-auto object-contain"
              />
            </div>

            <p className="text-xs sm:text-sm font-mono text-[#d1e7dc] text-center">
              {selectedImage.caption}
            </p>
          </div>
        </div>
      )}

      {/* Footer / Navigation to other Documentaries */}
      <footer className="border-t border-[#22c55e]/20 bg-[#050e08] py-16 px-6 sm:px-12 text-center space-y-6">
        <div className="max-w-xl mx-auto space-y-3">
          <span className="text-[10px] font-mono tracking-widest text-[#22c55e] uppercase">
            // AUTOARCHIVE // ARCHIVO HISTÓRICO DE SUPERDEPORTIVOS
          </span>
          <h3 className="text-xl font-bold font-mono text-white">Explora otros documentales de la colección</h3>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('r34')}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-mono text-[#d1e7dc]"
            >
              NISSAN R34 GT-R
            </button>
            <button
              onClick={() => onNavigate('supra')}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-mono text-[#d1e7dc]"
            >
              TOYOTA SUPRA MK4
            </button>
            <button
              onClick={() => onNavigate('xj220')}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-mono text-[#d1e7dc]"
            >
              JAGUAR XJ220
            </button>
            <button
              onClick={() => onNavigate('countach')}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-xs font-mono text-[#d1e7dc]"
            >
              LAMBORGHINI COUNTACH
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
