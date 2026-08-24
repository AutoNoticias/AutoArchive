import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RoutePage, ForumPost, ForumCategory } from '../types';
import { Logo } from './Logo';
import { UserAccountNav } from './UserAccountNav';
import { ForumPostCard } from './ForumPostCard';
import { ForumNewPostModal } from './ForumNewPostModal';
import { ForumService } from '../services/forumService';
import { useAuth } from '../context/AuthContext';
import { 
  MessageSquare, 
  Car, 
  Sparkles, 
  Search, 
  Plus, 
  Flame, 
  ArrowRight,
  Filter,
  ShieldCheck,
  Film,
  BookOpen,
  Wrench,
  Users,
  Compass,
  Zap
} from 'lucide-react';

interface Props {
  onNavigate: (page: RoutePage) => void;
  onOpenAuthModal?: () => void;
  onOpenAccountModal?: () => void;
  onOpenBroadcastModal?: () => void;
}

export const ForoPage: React.FC<Props> = ({
  onNavigate,
  onOpenAuthModal,
  onOpenAccountModal,
  onOpenBroadcastModal,
}) => {
  const { user } = useAuth();

  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [selectedTab, setSelectedTab] = useState<'all' | 'autos' | 'recomendaciones'>('all');
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState<boolean>(false);
  const [modalCategory, setModalCategory] = useState<ForumCategory>('autos');

  // Real-time subscribe to posts
  useEffect(() => {
    const unsub = ForumService.subscribePosts((loadedPosts) => {
      setPosts(loadedPosts);
    });
    return () => unsub();
  }, []);

  const autosCount = useMemo(() => posts.filter((p) => p.category === 'autos').length, [posts]);
  const recCount = useMemo(() => posts.filter((p) => p.category === 'recomendaciones').length, [posts]);

  const availableTags = useMemo(() => {
    const tagsSet = new Set<string>();
    posts.forEach((p) => {
      if (selectedTab === 'all' || p.category === selectedTab) {
        if (p.tag) tagsSet.add(p.tag);
      }
    });
    return Array.from(tagsSet);
  }, [posts, selectedTab]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory = selectedTab === 'all' || post.category === selectedTab;
      const matchesTag = selectedTag === 'all' || post.tag === selectedTag;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.content.toLowerCase().includes(q) ||
        (post.carModel && post.carModel.toLowerCase().includes(q)) ||
        post.tag.toLowerCase().includes(q) ||
        post.userName.toLowerCase().includes(q);

      return matchesCategory && matchesTag && matchesSearch;
    });
  }, [posts, selectedTab, selectedTag, searchQuery]);

  const handleOpenNewPost = (category: ForumCategory = 'autos') => {
    if (!user) {
      onOpenAuthModal?.();
      return;
    }
    setModalCategory(category);
    setIsNewPostModalOpen(true);
  };

  const handlePostCreated = (newPost: ForumPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const handleDeletePost = async (postId: string) => {
    try {
      await ForumService.deletePost(postId);
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    } catch (err) {
      // Local removal
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    }
  };

  return (
    <div className="min-h-screen bg-[#070e17] text-[#edf5ff] flex flex-col selection:bg-[#ffd451] selection:text-black pb-24 md:pb-12">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-4 sm:px-12 md:px-28 py-3.5 sm:py-5 border-b border-[#ffd451]/20 bg-[#070e17]/95 backdrop-blur-md">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-left group hover:scale-[1.02] transition-all"
        >
          <Logo size="md" />
        </button>

        <div className="flex items-center gap-3 sm:gap-6">
          <button
            id="foro-header-home-btn"
            onClick={() => onNavigate('home')}
            className="text-[13px] font-bold tracking-[0.2em] text-[#8fb9e4] hover:text-white uppercase transition-all hover:scale-105 hidden sm:inline"
          >
            ← Inicio
          </button>
          <button
            id="foro-header-doc-btn"
            onClick={() => onNavigate('documentales')}
            className="px-4 py-2 border border-[#4ea0ff]/40 bg-[#4ea0ff]/10 text-[#4ea0ff] hover:bg-[#4ea0ff] hover:text-black text-[11px] font-black tracking-[0.2em] uppercase transition-all rounded-lg hidden sm:inline-block hover:scale-105"
          >
            Documentales
          </button>
          <button
            id="foro-header-datos-btn"
            onClick={() => onNavigate('datos')}
            className="px-4 py-2 border border-[#ffd451]/40 bg-[#ffd451]/10 text-[#ffd451] hover:bg-[#ffd451] hover:text-black text-[11px] font-black tracking-[0.2em] uppercase transition-all rounded-lg hidden sm:inline-block hover:scale-105"
          >
            Datos Curiosos
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

      {/* Main Forum Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-10 sm:mb-12 relative">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-full text-[11px] font-mono font-bold tracking-widest text-[#22c55e] uppercase mb-4 shadow-[0_0_20px_rgba(34,197,94,0.15)]">
            <Users className="w-4 h-4 text-[#22c55e]" />
            <span>COMUNIDAD OFICIAL // ESPACIO DE INTERACCIÓN Y DEBATE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight uppercase leading-none">
            FORO <span className="text-[#ffd451]">AUTOARCHIVE</span>
          </h1>

          <p className="mt-4 text-[#8a9db5] text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Intercambia conocimientos de mecánica, puesta a punto de circuitos, historias de clásicos y las mejores recomendaciones con otros apasionados del motor.
          </p>

          {/* Quick Category Gateway Banners (Requested by user: AUTOS & RECOMENDACIONES) */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {/* AUTOS CARD */}
            <div 
              onClick={() => { setSelectedTab('autos'); setSelectedTag('all'); }}
              className={`cursor-pointer text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
                selectedTab === 'autos'
                  ? 'bg-gradient-to-br from-[#0c1f38] to-[#081220] border-[#4ea0ff] shadow-[0_0_30px_rgba(78,160,255,0.2)]'
                  : 'bg-[#0a121e] border-white/10 hover:border-[#4ea0ff]/50'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="p-3 bg-[#4ea0ff]/15 border border-[#4ea0ff]/30 rounded-xl text-[#4ea0ff]">
                  <Car className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 bg-[#4ea0ff]/20 text-[#4ea0ff] rounded-md text-[10px] font-mono font-bold">
                  {autosCount} TEMAS
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white group-hover:text-[#4ea0ff] transition-colors uppercase">
                ZONA // AUTOS
              </h2>
              <p className="text-xs text-[#8a9db5] mt-1.5 leading-relaxed">
                Debates de arquitectura de motores (2JZ vs RB26), puestas a punto de chasis, restauraciones y superdeportivos legendarios.
              </p>
              <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTab('autos');
                    setSelectedTag('all');
                  }}
                  className="text-xs font-mono font-black text-[#4ea0ff] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                >
                  <span>EXPLORAR AUTOS</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenNewPost('autos');
                  }}
                  className="px-3 py-1 bg-[#4ea0ff] text-black font-black text-[10px] uppercase rounded-lg hover:bg-white transition-colors"
                >
                  + Publicar en Autos
                </button>
              </div>
            </div>

            {/* RECOMENDACIONES CARD */}
            <div 
              onClick={() => { setSelectedTab('recomendaciones'); setSelectedTag('all'); }}
              className={`cursor-pointer text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
                selectedTab === 'recomendaciones'
                  ? 'bg-gradient-to-br from-[#0c2e1b] to-[#081a10] border-[#22c55e] shadow-[0_0_30px_rgba(34,197,94,0.2)]'
                  : 'bg-[#0a121e] border-white/10 hover:border-[#22c55e]/50'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="p-3 bg-[#22c55e]/15 border border-[#22c55e]/30 rounded-xl text-[#22c55e]">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 bg-[#22c55e]/20 text-[#22c55e] rounded-md text-[10px] font-mono font-bold">
                  {recCount} TEMAS
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white group-hover:text-[#22c55e] transition-colors uppercase">
                RECOMENDACIONES
              </h2>
              <p className="text-xs text-[#8a9db5] mt-1.5 leading-relaxed">
                Descubre documentales de archivo, libros técnicos indispensables, películas históricas, talleres de restauración y piezas OEM.
              </p>
              <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedTab('recomendaciones');
                    setSelectedTag('all');
                  }}
                  className="text-xs font-mono font-black text-[#22c55e] flex items-center gap-1.5 group-hover:translate-x-1 transition-transform"
                >
                  <span>VER RECOMENDACIONES</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenNewPost('recomendaciones');
                  }}
                  className="px-3 py-1 bg-[#22c55e] text-black font-black text-[10px] uppercase rounded-lg hover:bg-white transition-colors"
                >
                  + Recomendar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar: Navigation Tabs, Search & New Post Button */}
        <div className="bg-[#0b1420] border border-white/10 rounded-2xl p-4 mb-8 shadow-xl space-y-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Tabs */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              <button
                id="tab-all-posts"
                onClick={() => { setSelectedTab('all'); setSelectedTag('all'); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                  selectedTab === 'all'
                    ? 'bg-[#ffd451] text-black shadow-[0_0_15px_rgba(255,212,81,0.3)]'
                    : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>TODOS ({posts.length})</span>
              </button>

              <button
                id="tab-autos-posts"
                onClick={() => { setSelectedTab('autos'); setSelectedTag('all'); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                  selectedTab === 'autos'
                    ? 'bg-[#4ea0ff] text-black shadow-[0_0_15px_rgba(78,160,255,0.3)]'
                    : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Car className="w-4 h-4" />
                <span>AUTOS ({autosCount})</span>
              </button>

              <button
                id="tab-rec-posts"
                onClick={() => { setSelectedTab('recomendaciones'); setSelectedTag('all'); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                  selectedTab === 'recomendaciones'
                    ? 'bg-[#22c55e] text-black shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                    : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>RECOMENDACIONES ({recCount})</span>
              </button>
            </div>

            {/* Search Box & Action Button */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar en temas o autos..."
                  className="w-full pl-9 pr-3 py-2 bg-[#080e18] border border-white/15 focus:border-[#ffd451] rounded-xl text-xs text-white placeholder-white/40 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-white/50 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>

              <button
                id="new-forum-topic-btn"
                onClick={() => handleOpenNewPost(selectedTab === 'recomendaciones' ? 'recomendaciones' : 'autos')}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#ffd451] hover:bg-[#ffe082] text-black font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(255,212,81,0.25)] flex items-center justify-center gap-2 hover:scale-[1.02] shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>NUEVO TEMA</span>
              </button>
            </div>
          </div>

          {/* Subtag filters */}
          {availableTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/5">
              <span className="text-[11px] font-mono text-white/40 mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" />
                <span>Etiquetas:</span>
              </span>
              <button
                onClick={() => setSelectedTag('all')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all ${
                  selectedTag === 'all'
                    ? 'bg-white text-black font-bold'
                    : 'bg-white/5 text-white/60 hover:text-white'
                }`}
              >
                Todas
              </button>
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all ${
                    selectedTag === tag
                      ? 'bg-white text-black font-bold'
                      : 'bg-white/5 text-white/60 hover:text-white'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Discussions Feed */}
        {filteredPosts.length === 0 ? (
          <div className="py-16 text-center bg-[#0b1420] rounded-2xl border border-white/10 max-w-lg mx-auto p-8 shadow-xl">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#ffd451]/10 border border-[#ffd451]/20 flex items-center justify-center text-[#ffd451]">
              <MessageSquare className="w-7 h-7" />
            </div>
            <h3 className="text-white font-bold text-lg">
              {posts.length === 0 ? 'El foro está listo para tu primer tema' : 'No se encontraron temas'}
            </h3>
            <p className="text-white/60 text-xs sm:text-sm mt-2 leading-relaxed">
              {posts.length === 0
                ? 'Sé el primero en abrir un debate sobre mecánica y circuitos, o comparte una recomendación técnica con la comunidad.'
                : searchQuery
                ? 'No hay resultados que coincidan con la búsqueda actual.'
                : 'No hay temas registrados en esta sección o filtro.'}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {searchQuery || selectedTag !== 'all' || selectedTab !== 'all' ? (
                <button
                  onClick={() => { setSearchQuery(''); setSelectedTag('all'); setSelectedTab('all'); }}
                  className="px-4 py-2.5 bg-white/10 text-white font-bold text-xs rounded-xl uppercase tracking-wider hover:bg-white/20 transition-all"
                >
                  Restablecer Filtros
                </button>
              ) : null}
              <button
                onClick={() => handleOpenNewPost('autos')}
                className="px-4 py-2.5 bg-[#4ea0ff] hover:bg-[#70b5ff] text-black font-bold text-xs rounded-xl uppercase tracking-wider transition-all flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Publicar en Autos</span>
              </button>
              <button
                onClick={() => handleOpenNewPost('recomendaciones')}
                className="px-4 py-2.5 bg-[#22c55e] hover:bg-[#4ade80] text-black font-bold text-xs rounded-xl uppercase tracking-wider transition-all flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Recomendar</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <ForumPostCard
                key={post.id}
                post={post}
                onOpenAuthModal={onOpenAuthModal}
                onDeletePost={handleDeletePost}
              />
            ))}
          </div>
        )}

        {/* Bottom Banner to Explore Documentaries & Facts */}
        <div className="mt-16 p-8 bg-gradient-to-r from-[#0c1f38] via-[#081220] to-[#0c1f38] border border-[#4ea0ff]/30 rounded-3xl text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
              ¿Buscas material para tus debates?
            </h3>
            <p className="text-sm text-[#8a9db5] leading-relaxed font-light">
              Consulta nuestros 8 documentales interactivos con especificaciones de época o los 20 expedientes técnicos desclasificados.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => onNavigate('documentales')}
                className="w-full sm:w-auto px-6 py-3 bg-[#4ea0ff] hover:bg-[#70b5ff] text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(78,160,255,0.3)] flex items-center justify-center gap-2"
              >
                <span>VER DOCUMENTALES</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('datos')}
                className="w-full sm:w-auto px-6 py-3 bg-[#ffd451] hover:bg-[#ffe082] text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(255,212,81,0.3)] flex items-center justify-center gap-2"
              >
                <span>DATOS CURIOSOS (20)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* New Topic Creation Modal */}
      <ForumNewPostModal
        isOpen={isNewPostModalOpen}
        onClose={() => setIsNewPostModalOpen(false)}
        initialCategory={modalCategory}
        onPostCreated={handlePostCreated}
        onOpenAuthModal={onOpenAuthModal}
      />
    </div>
  );
};
