import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { RoutePage, ForumPost } from '../types';
import { Logo } from './Logo';
import { UserAccountNav } from './UserAccountNav';
import { ForumPostCard } from './ForumPostCard';
import { ForumNewPostModal } from './ForumNewPostModal';
import { ForumService } from '../services/forumService';
import { useAuth } from '../context/AuthContext';
import { 
  Flame, 
  Sparkles, 
  Trophy, 
  MessageSquare, 
  Search, 
  Plus, 
  ShieldCheck, 
  Users, 
  Tag, 
  BookOpen, 
  Lightbulb, 
  Car,
  Globe,
  CheckCircle2,
  ArrowRight,
  Eye
} from 'lucide-react';

interface Props {
  onNavigate: (page: RoutePage) => void;
  onOpenAuthModal?: () => void;
  onOpenAccountModal?: () => void;
  onOpenBroadcastModal?: () => void;
}

type SortType = 'hot' | 'new' | 'top' | 'comments';

export const ForoPage: React.FC<Props> = ({
  onNavigate,
  onOpenAuthModal,
  onOpenAccountModal,
  onOpenBroadcastModal,
}) => {
  const { user, userProfile } = useAuth();

  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [sortBy, setSortBy] = useState<SortType>('new');
  const [selectedFlair, setSelectedFlair] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState<boolean>(false);
  const [activeModalFlair, setActiveModalFlair] = useState<string>('🏎️ Debate Técnico');

  // Real-time Firestore subscription
  useEffect(() => {
    const unsub = ForumService.subscribePosts((loadedPosts) => {
      setPosts(loadedPosts);
    });
    return () => unsub();
  }, []);

  const allFlairs = [
    '🏎️ Debate Técnico',
    '🛠️ Mecánica & Swap',
    '💡 Recomendación',
    '🏁 Circuito & Setup',
    '📜 Clásicos & Archivo',
    '❓ Pregunta / Duda',
    '🚗 Proyecto DIY',
  ];

  // Sorting & Filtering logic
  const processedPosts = useMemo(() => {
    let list = [...posts];

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((p) => 
        p.title.toLowerCase().includes(q) ||
        p.content.toLowerCase().includes(q) ||
        (p.carModel && p.carModel.toLowerCase().includes(q)) ||
        (p.flair && p.flair.toLowerCase().includes(q)) ||
        (p.tag && p.tag.toLowerCase().includes(q)) ||
        p.userName.toLowerCase().includes(q)
      );
    }

    // Filter by flair
    if (selectedFlair !== 'all') {
      list = list.filter((p) => {
        const postFlair = (p.flair || p.tag || '').toLowerCase();
        const targetFlair = selectedFlair.toLowerCase();
        return postFlair.includes(targetFlair) || targetFlair.includes(postFlair);
      });
    }

    // Sort
    list.sort((a, b) => {
      // Pinned posts always stay on top
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;

      if (sortBy === 'top') {
        const scoreA = typeof a.score === 'number' ? a.score : (a.likesCount || 0);
        const scoreB = typeof b.score === 'number' ? b.score : (b.likesCount || 0);
        return scoreB - scoreA;
      }

      if (sortBy === 'comments') {
        return (b.commentsCount || 0) - (a.commentsCount || 0);
      }

      if (sortBy === 'hot') {
        // Hot algorithm: Score with time decay
        const scoreA = Math.max(1, (typeof a.score === 'number' ? a.score : a.likesCount || 1));
        const scoreB = Math.max(1, (typeof b.score === 'number' ? b.score : b.likesCount || 1));
        const hoursA = Math.max(1, (Date.now() - new Date(a.createdAt).getTime()) / 3600000);
        const hoursB = Math.max(1, (Date.now() - new Date(b.createdAt).getTime()) / 3600000);
        const hotA = scoreA / Math.pow(hoursA + 2, 1.2);
        const hotB = scoreB / Math.pow(hoursB + 2, 1.2);
        return hotB - hotA;
      }

      // Default: 'new'
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return list;
  }, [posts, searchQuery, selectedFlair, sortBy]);

  const handleOpenNewPost = (flair = '🏎️ Debate Técnico') => {
    if (!user) {
      onOpenAuthModal?.();
      return;
    }
    setActiveModalFlair(flair);
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
      setPosts((prev) => prev.filter((p) => p.id !== postId));
    }
  };

  return (
    <div className="min-h-screen bg-[#070e17] text-[#edf5ff] flex flex-col selection:bg-[#ff4500] selection:text-white pb-24 md:pb-12">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-4 sm:px-12 md:px-28 py-3 sm:py-4 border-b border-[#ff4500]/20 bg-[#070e17]/95 backdrop-blur-md">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 text-left group hover:scale-[1.02] transition-all"
        >
          <Logo size="md" />
        </button>

        <div className="flex items-center gap-3 sm:gap-6">
          <button
            id="autochat-header-home-btn"
            onClick={() => onNavigate('home')}
            className="text-[13px] font-bold tracking-[0.2em] text-[#8fb9e4] hover:text-white uppercase transition-all hover:scale-105 hidden sm:inline"
          >
            ← Inicio
          </button>
          <button
            id="autochat-header-doc-btn"
            onClick={() => onNavigate('documentales')}
            className="px-4 py-2 border border-[#4ea0ff]/40 bg-[#4ea0ff]/10 text-[#4ea0ff] hover:bg-[#4ea0ff] hover:text-black text-[11px] font-black tracking-[0.2em] uppercase transition-all rounded-lg hidden sm:inline-block hover:scale-105"
          >
            Documentales
          </button>
          <button
            id="autochat-header-datos-btn"
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

      {/* Subreddit Community Banner */}
      <div className="bg-[#0b1420] border-b border-white/10 px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff4500] to-[#ff7043] flex items-center justify-center text-white shadow-[0_0_20px_rgba(255,69,0,0.35)] shrink-0 font-black text-xl">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
                  AutoChat
                </h1>
                <span className="px-2 py-0.5 bg-[#ff4500]/20 text-[#ff4500] border border-[#ff4500]/30 rounded-md text-[10px] font-mono font-bold">
                  r/AutoChat
                </span>
                <span className="px-2 py-0.5 bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 rounded-md text-[10px] font-mono font-bold hidden sm:inline-flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  <span>ESPACIO PÚBLICO</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#8a9db5] mt-0.5">
                Espacio público de preguntas, respuestas y debate automotriz • Visible para toda la comunidad
              </p>
            </div>
          </div>

          <button
            id="autochat-create-thread-banner-btn"
            onClick={() => handleOpenNewPost()}
            className="px-5 py-2.5 bg-[#ff4500] hover:bg-[#ff5722] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_20px_rgba(255,69,0,0.3)] flex items-center gap-2 self-stretch sm:self-auto justify-center hover:scale-[1.02]"
          >
            <Plus className="w-4 h-4" />
            <span>Publicar Pregunta o Hilo</span>
          </button>
        </div>
      </div>

      {/* Public Notice Bar */}
      <div className="bg-[#0e1b2b]/80 border-b border-emerald-500/20 px-4 py-2.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-emerald-400">
            <Globe className="w-4 h-4 shrink-0" />
            <span>
              <strong>Comunidad Abierta y Transparente:</strong> Todas las preguntas, hilos y respuestas son públicas para que cualquier persona pueda leer y aprender.
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-white/50">
            <Eye className="w-3.5 h-3.5 text-white/60" />
            <span>Lectura abierta sin restricciones</span>
          </div>
        </div>
      </div>

      {/* Main Container (Reddit 2-Column Feed Layout) */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Left / Main Column: Posts Feed */}
          <div className="lg:col-span-2 space-y-4">
            {/* Quick "Create Thread" Box (Reddit Style) */}
            <div 
              onClick={() => handleOpenNewPost()}
              className="bg-[#0c141f] border border-white/10 hover:border-white/20 rounded-xl p-3.5 flex items-center gap-3 cursor-pointer transition-all shadow-md group"
            >
              <div className="w-9 h-9 rounded-full bg-[#ff4500]/20 border border-[#ff4500]/30 flex items-center justify-center text-xs font-bold text-[#ff4500] shrink-0">
                {user ? (userProfile?.displayName || user.displayName || user.email?.charAt(0) || 'U').toUpperCase() : 'U'}
              </div>

              <div className="flex-1 px-4 py-2 bg-[#080d14] border border-white/10 rounded-lg text-xs text-white/50 group-hover:border-white/20 transition-colors">
                ¿Tienes una duda o quieres debatir? Publica una pregunta abierta a todos...
              </div>

              <div className="flex items-center gap-1.5 text-white/40">
                <button
                  onClick={(e) => { e.stopPropagation(); handleOpenNewPost('🛠️ Mecánica & Swap'); }}
                  title="Mecánica"
                  className="p-2 rounded-lg hover:bg-white/10 hover:text-[#ffd451] transition-colors hidden sm:block"
                >
                  <Car className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleOpenNewPost('💡 Recomendación'); }}
                  title="Recomendación"
                  className="p-2 rounded-lg hover:bg-white/10 hover:text-[#22c55e] transition-colors hidden sm:block"
                >
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Reddit Sorting & Filter Toolbar */}
            <div className="bg-[#0c141f] border border-white/10 rounded-xl p-2.5 flex flex-col sm:flex-row items-center justify-between gap-2.5">
              {/* Sort Tabs */}
              <div className="flex items-center gap-1 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                <button
                  onClick={() => setSortBy('new')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all shrink-0 ${
                    sortBy === 'new'
                      ? 'bg-white/15 text-white border border-white/20 shadow-sm'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#38bdf8]" />
                  <span>Nuevos</span>
                </button>

                <button
                  onClick={() => setSortBy('hot')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all shrink-0 ${
                    sortBy === 'hot'
                      ? 'bg-white/15 text-white border border-white/20 shadow-sm'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 text-[#ff4500]" />
                  <span>Populares</span>
                </button>

                <button
                  onClick={() => setSortBy('top')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all shrink-0 ${
                    sortBy === 'top'
                      ? 'bg-white/15 text-white border border-white/20 shadow-sm'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Trophy className="w-3.5 h-3.5 text-[#ffd451]" />
                  <span>Top Votados</span>
                </button>

                <button
                  onClick={() => setSortBy('comments')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all shrink-0 ${
                    sortBy === 'comments'
                      ? 'bg-white/15 text-white border border-white/20 shadow-sm'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#4ade80]" />
                  <span>Más Respondidos</span>
                </button>
              </div>

              {/* Search Box */}
              <div className="relative w-full sm:w-48">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar preguntas..."
                  className="w-full pl-8 pr-2.5 py-1.5 bg-[#080d14] border border-white/10 focus:border-[#ff4500] rounded-lg text-xs text-white placeholder-white/30 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-white/40 hover:text-white"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Active Filter Indicator */}
            {selectedFlair !== 'all' && (
              <div className="flex items-center justify-between px-3.5 py-2 bg-[#ff4500]/10 border border-[#ff4500]/30 rounded-xl text-xs font-mono">
                <span className="text-[#ff7043]">
                  Filtrando por: <strong>{selectedFlair}</strong>
                </span>
                <button
                  onClick={() => setSelectedFlair('all')}
                  className="text-white/60 hover:text-white font-bold underline"
                >
                  Ver todos los temas
                </button>
              </div>
            )}

            {/* Posts Feed */}
            {processedPosts.length === 0 ? (
              <div className="py-16 px-6 text-center bg-[#0c141f] rounded-2xl border border-white/10 shadow-xl space-y-4">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#ff4500]/15 border border-[#ff4500]/30 flex items-center justify-center text-[#ff4500]">
                  <MessageSquare className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {posts.length === 0 ? 'Aún no hay preguntas ni hilos en el espacio público' : 'No se encontraron publicaciones'}
                  </h3>
                  <p className="text-xs text-[#8a9db5] max-w-sm mx-auto mt-1 leading-relaxed">
                    {posts.length === 0
                      ? 'Sé el primero en abrir una pregunta o tema en r/AutoChat. Todo lo que publiques será visible públicamente para que todos aporten sus respuestas.'
                      : searchQuery
                      ? 'No hay publicaciones que coincidan con la búsqueda actual.'
                      : 'No hay hilos publicados con este filtro de etiqueta.'}
                  </p>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  {selectedFlair !== 'all' || searchQuery ? (
                    <button
                      onClick={() => { setSelectedFlair('all'); setSearchQuery(''); }}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl"
                    >
                      Limpiar Filtros
                    </button>
                  ) : null}
                  <button
                    onClick={() => handleOpenNewPost()}
                    className="px-5 py-2.5 bg-[#ff4500] hover:bg-[#ff5722] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(255,69,0,0.3)] flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Publicar Primera Pregunta</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {processedPosts.map((post) => (
                  <ForumPostCard
                    key={post.id}
                    post={post}
                    onOpenAuthModal={onOpenAuthModal}
                    onDeletePost={handleDeletePost}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Reddit Sidebar */}
          <div className="space-y-4">
            {/* About Community Card */}
            <div className="bg-[#0c141f] border border-white/10 rounded-2xl p-5 shadow-lg space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-white/10">
                <div className="w-8 h-8 rounded-xl bg-[#ff4500]/20 border border-[#ff4500]/40 flex items-center justify-center text-[#ff4500]">
                  <Globe className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Espacio Público r/AutoChat</h3>
                  <span className="text-[10px] font-mono text-emerald-400">Preguntas & Respuestas Abiertas</span>
                </div>
              </div>

              <p className="text-xs text-[#8a9db5] leading-relaxed">
                Este es un <strong>tablón 100% público</strong>. Cualquier persona puede leer las consultas técnicas, proyectos y respuestas de todos los miembros para aprender colectivamente.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 font-mono text-center">
                <div className="p-2 bg-[#080d14] rounded-lg border border-white/5">
                  <div className="text-sm font-black text-white">{posts.length}</div>
                  <div className="text-[9px] text-[#8a9db5] uppercase">Hilos Públicos</div>
                </div>
                <div className="p-2 bg-[#080d14] rounded-lg border border-white/5">
                  <div className="text-sm font-black text-emerald-400">100% Abierto</div>
                  <div className="text-[9px] text-[#8a9db5] uppercase">Transparente</div>
                </div>
              </div>

              <button
                onClick={() => handleOpenNewPost()}
                className="w-full py-2.5 bg-[#ff4500] hover:bg-[#ff5722] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(255,69,0,0.3)] flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Hacer una Pregunta Pública</span>
              </button>
            </div>

            {/* Popular Flairs Card */}
            <div className="bg-[#0c141f] border border-white/10 rounded-2xl p-5 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#8a9db5] uppercase">
                <Tag className="w-3.5 h-3.5 text-[#ffd451]" />
                <span>Filtrar por Categorías</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedFlair('all')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                    selectedFlair === 'all'
                      ? 'bg-white text-black font-bold'
                      : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Todos
                </button>
                {allFlairs.map((flair) => (
                  <button
                    key={flair}
                    onClick={() => setSelectedFlair(flair)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                      selectedFlair === flair
                        ? 'bg-[#ff4500] text-white font-bold'
                        : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/5'
                    }`}
                  >
                    {flair}
                  </button>
                ))}
              </div>
            </div>

            {/* Community Rules */}
            <div className="bg-[#0c141f] border border-white/10 rounded-2xl p-5 shadow-lg space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#8a9db5] uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-[#22c55e]" />
                <span>Normas de Convivencia</span>
              </div>

              <ul className="space-y-2 text-xs text-[#8a9db5] leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e] shrink-0 mt-0.5" />
                  <span>1. <strong>Total Visibilidad:</strong> Recuerda que todo lo que escribes es visible públicamente por todos los visitantes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e] shrink-0 mt-0.5" />
                  <span>2. <strong>Respuestas Constructivas:</strong> Ayuda a otros con datos precisos de mecánica, reglajes y fuentes confiables.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e] shrink-0 mt-0.5" />
                  <span>3. <strong>Votación Justa:</strong> Usa los votos a favor para destacar las mejores respuestas y aportes técnicos.</span>
                </li>
              </ul>
            </div>

            {/* Quick Links Card */}
            <div className="p-4 bg-gradient-to-br from-[#0c141f] to-[#080d14] border border-white/10 rounded-2xl text-xs space-y-2">
              <div className="font-bold text-white/80">Recursos de AutoArchive</div>
              <div className="space-y-1.5 text-[#8a9db5]">
                <button
                  onClick={() => onNavigate('documentales')}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-white/5 hover:text-white transition-all text-left"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-[#4ea0ff]" />
                    <span>Catálogo de Documentales</span>
                  </span>
                  <ArrowRight className="w-3 h-3 text-white/30" />
                </button>
                <button
                  onClick={() => onNavigate('datos')}
                  className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-white/5 hover:text-white transition-all text-left"
                >
                  <span className="flex items-center gap-2">
                    <Lightbulb className="w-3.5 h-3.5 text-[#ffd451]" />
                    <span>20 Datos Curiosos</span>
                  </span>
                  <ArrowRight className="w-3 h-3 text-white/30" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* New Topic Creation Modal */}
      <ForumNewPostModal
        isOpen={isNewPostModalOpen}
        onClose={() => setIsNewPostModalOpen(false)}
        initialFlair={activeModalFlair}
        onPostCreated={handlePostCreated}
        onOpenAuthModal={onOpenAuthModal}
      />
    </div>
  );
};
