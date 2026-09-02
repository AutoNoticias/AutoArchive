import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { RoutePage } from '../types';
import { Logo } from './Logo';
import { UserAccountNav } from './UserAccountNav';
import { automotiveFacts, FactItem } from '../data/factsData';
import { 
  Sparkles, 
  Search, 
  Copy, 
  Check, 
  Compass, 
  Flame, 
  Gauge, 
  Zap, 
  ShieldAlert, 
  Award,
  ArrowRight,
  MapPin,
  Quote
} from 'lucide-react';

interface Props {
  onNavigate: (page: RoutePage) => void;
  onOpenAuthModal?: () => void;
  onOpenAccountModal?: () => void;
  onOpenBroadcastModal?: () => void;
}

export const DatosPage: React.FC<Props> = ({ 
  onNavigate,
  onOpenAuthModal,
  onOpenAccountModal,
  onOpenBroadcastModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = useMemo(() => {
    return [
      { id: 'all', label: 'TODOS (20)', icon: Sparkles },
      { id: 'INGENIERÍA EXTREMA', label: 'INGENIERÍA', icon: Gauge },
      { id: 'RIVALIDADES HISTÓRICAS', label: 'RIVALIDADES', icon: Flame },
      { id: 'PROTOTIPOS & SECRETOS', label: 'PROTOTIPOS', icon: Zap },
      { id: 'RÉCORDS HISTÓRICOS', label: 'RÉCORDS', icon: Award },
      { id: 'LE MANS & CARRERAS', label: 'LE MANS', icon: Compass },
    ];
  }, []);

  const filteredFacts = useMemo(() => {
    return automotiveFacts.filter((fact) => {
      const matchesCategory = 
        selectedCategory === 'all' || 
        fact.category.toUpperCase().includes(selectedCategory.toUpperCase()) ||
        (selectedCategory === 'INGENIERÍA EXTREMA' && fact.category.includes('INGENIERÍA'));

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        fact.title.toLowerCase().includes(q) ||
        fact.summary.toLowerCase().includes(q) ||
        fact.tag.toLowerCase().includes(q) ||
        fact.number.includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCopyFact = (fact: FactItem) => {
    const text = `🚗 Dato Curioso #${fact.number} [${fact.tag}]:\n"${fact.title}"\n\n${fact.summary}\n\nDescubre más en AutoArchive.`;
    navigator.clipboard.writeText(text);
    setCopiedId(fact.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#070709] text-[#f1f5f9] flex flex-col selection:bg-[#334155] selection:text-white pb-24 md:pb-12">
      {/* Top Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-4 sm:px-12 md:px-20 py-4 border-b border-white/10 bg-[#070709]/95 backdrop-blur-xl">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-left group hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
        >
          <Logo size="md" />
        </button>

        <div className="flex items-center gap-4 sm:gap-6">
          <button
            id="datos-header-home-btn"
            onClick={() => onNavigate('home')}
            className="text-[12px] font-mono font-bold tracking-[0.18em] text-[#94a3b8] hover:text-white uppercase transition-all hidden sm:inline cursor-pointer"
          >
            ← Portada
          </button>
          <button
            id="datos-header-doc-btn"
            onClick={() => onNavigate('documentales')}
            className="px-4 py-2 border border-white/15 bg-white/5 hover:bg-white hover:text-black text-white text-[11px] font-mono font-bold tracking-[0.16em] uppercase transition-all rounded-lg hidden sm:inline-block cursor-pointer"
          >
            Documentales →
          </button>
          <button
            id="datos-header-foro-btn"
            onClick={() => onNavigate('foro')}
            className="px-4 py-2 border border-white/15 bg-white/5 hover:bg-white hover:text-black text-white text-[11px] font-mono font-bold tracking-[0.16em] uppercase transition-all rounded-lg hidden sm:inline-block cursor-pointer"
          >
            AutoChat →
          </button>
          <div className="pl-2 border-l border-white/15">
            <UserAccountNav
              onNavigate={onNavigate}
              onOpenAuthModal={onOpenAuthModal || (() => {})}
              onOpenAccountModal={onOpenAccountModal}
              onOpenBroadcastModal={onOpenBroadcastModal}
            />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Banner */}
        <div className="text-center mb-10 sm:mb-14 relative">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/5 border border-white/15 rounded-full text-[10px] font-mono font-bold tracking-widest text-[#cbd5e1] uppercase mb-4 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-white" />
            <span>ARCHIVO DESCLASIFICADO // 20 EXPEDIENTES TÉCNICOS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase leading-none">
            DATOS CURIOSOS
          </h1>

          <p className="mt-4 text-[#94a3b8] text-sm sm:text-base md:text-lg max-w-3xl mx-auto font-light leading-relaxed">
            Veinte secretos de ingeniería, rivalidades irrepetibles y anécdotas de taller de la era dorada del automovilismo deportivo.
          </p>

          {/* Search & Category Filter Toolbar */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
            {/* Search Box */}
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748b]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por auto, motor o año..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#0d0d14] border border-white/15 focus:border-white/40 rounded-xl text-xs font-mono text-white placeholder-[#64748b] focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#64748b] hover:text-white cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[11px] font-mono font-bold tracking-wider uppercase transition-all cursor-pointer ${
                      isActive
                        ? 'bg-white text-black shadow-md scale-105 font-extrabold'
                        : 'bg-white/5 text-[#94a3b8] hover:text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-[#cbd5e1]'}`} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Counter Info Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8 text-xs font-mono text-[#94a3b8]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>MOSTRANDO: <strong className="text-white">{filteredFacts.length}</strong> EXPEDIENTES</span>
          </div>
          <span className="text-[11px] text-[#64748b] uppercase tracking-widest hidden sm:inline">
            DISPOSICIÓN // 2 COLUMNAS POR FILA
          </span>
        </div>

        {/* 2-PER-ROW GRID LAYOUT */}
        {filteredFacts.length === 0 ? (
          <div className="py-20 text-center bg-[#0d0d14] rounded-2xl border border-white/10 max-w-lg mx-auto">
            <ShieldAlert className="w-12 h-12 text-[#64748b] mx-auto mb-3 opacity-60" />
            <p className="text-white font-bold text-base font-mono uppercase">No se encontraron expedientes</p>
            <p className="text-[#94a3b8] text-xs mt-1">Prueba con otro término de búsqueda o selecciona todas las categorías.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
              className="mt-4 px-4 py-2 bg-white text-black font-bold text-xs rounded-lg uppercase tracking-wider font-mono cursor-pointer"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {filteredFacts.map((fact, index) => (
              <motion.article
                key={fact.id}
                id={`fact-card-${fact.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: (index % 6) * 0.05 }}
                className="group bg-[#0d0d14] border border-white/15 hover:border-white/40 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_15px_40px_rgba(0,0,0,0.8)] relative overflow-hidden"
              >
                {/* Background subtle glow on hover */}
                <div className="absolute top-0 right-0 w-36 h-36 bg-white/[0.02] rounded-bl-full pointer-events-none group-hover:bg-white/[0.05] transition-colors duration-500" />

                <div>
                  {/* Top Metadata Header */}
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 bg-white/10 text-white border border-white/20 text-[10px] font-mono font-bold tracking-widest rounded-md">
                        EXPEDIENTE #{fact.number}
                      </span>
                      <span className="text-[9px] font-mono text-[#94a3b8] uppercase tracking-wider">
                        {fact.category}
                      </span>
                    </div>

                    {/* Copy Button */}
                    <button
                      onClick={() => handleCopyFact(fact)}
                      title="Copiar este dato"
                      className="p-1.5 bg-white/5 hover:bg-white hover:text-black text-[#94a3b8] rounded-lg transition-all active:scale-90 cursor-pointer"
                    >
                      {copiedId === fact.id ? (
                        <Check className="w-3.5 h-3.5 text-white font-bold" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Fact Title */}
                  <h2 className="text-xl sm:text-2xl font-black text-white group-hover:text-[#e2e8f0] transition-colors leading-tight mb-3 uppercase">
                    {fact.title}
                  </h2>

                  {/* Main Summary */}
                  <p className="text-sm text-[#f1f5f9] leading-relaxed font-medium mb-4">
                    {fact.summary}
                  </p>

                  {/* Detailed Description */}
                  <div className="p-3.5 bg-black/50 border-l-2 border-white/60 rounded-r-xl mb-4">
                    <p className="text-xs text-[#94a3b8] leading-relaxed font-light">
                      {fact.details}
                    </p>
                  </div>

                  {/* Stat Highlight Banner */}
                  {fact.statHighlight && (
                    <div className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl mb-4">
                      <span className="text-lg sm:text-xl font-mono font-black text-white shrink-0">
                        {fact.statHighlight.value}
                      </span>
                      <div className="w-px h-6 bg-white/20 shrink-0" />
                      <span className="text-[11px] font-mono text-[#cbd5e1] uppercase tracking-tight leading-tight">
                        {fact.statHighlight.label}
                      </span>
                    </div>
                  )}

                  {/* Quote if available */}
                  {fact.secretQuote && (
                    <div className="flex items-start gap-2 mb-4 text-[11px] italic text-[#cbd5e1] bg-white/[0.02] p-3 rounded-lg border border-white/5 font-serif-luxury">
                      <Quote className="w-4 h-4 text-white/80 shrink-0 mt-0.5" />
                      <p className="leading-normal">{fact.secretQuote}</p>
                    </div>
                  )}
                </div>

                {/* Footer Origin / Tag */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#94a3b8]">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-[#cbd5e1]" />
                    <span className="truncate max-w-[200px] sm:max-w-[260px]">{fact.sourceOrPlace || fact.era}</span>
                  </div>

                  <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[#cbd5e1] font-bold uppercase tracking-wider shrink-0">
                    {fact.tag}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Bottom CTA to continue exploring */}
        <div className="mt-16 p-8 bg-[#0a0a0f] border border-white/15 rounded-3xl text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              ¿Listo para revivir la historia completa?
            </h3>
            <p className="text-sm text-[#94a3b8] leading-relaxed font-light">
              Explora nuestros 11 documentales interactivos con grabaciones históricas, telemetría y especificaciones de época.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => onNavigate('documentales')}
                className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-[#e2e8f0] text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer font-mono"
              >
                <span>VER TODOS LOS DOCUMENTALES (11)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('home')}
                className="w-full sm:w-auto px-6 py-3.5 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-xs uppercase tracking-widest rounded-xl transition-all font-mono cursor-pointer"
              >
                VOLVER A PORTADA
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
