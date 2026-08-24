import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ForumCategory, ForumPost } from '../types';
import { useAuth } from '../context/AuthContext';
import { 
  X, 
  Car, 
  Sparkles, 
  Send, 
  Tag, 
  Link as LinkIcon, 
  FileText,
  AlertCircle,
  HelpCircle,
  Film,
  BookOpen,
  Wrench,
  Flame
} from 'lucide-react';
import { ForumService } from '../services/forumService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: ForumCategory;
  onPostCreated?: (post: ForumPost) => void;
  onOpenAuthModal?: () => void;
}

export const ForumNewPostModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialCategory = 'autos',
  onPostCreated,
  onOpenAuthModal,
}) => {
  const { user, profile, isAdmin } = useAuth();

  const [category, setCategory] = useState<ForumCategory>(initialCategory);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('Mecánica & Motores');
  const [carModel, setCarModel] = useState('');
  const [recommendationType, setRecommendationType] = useState('documental');
  const [recommendationUrl, setRecommendationUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync category if initialCategory changes when opening
  React.useEffect(() => {
    if (isOpen) {
      setCategory(initialCategory === 'general' ? 'autos' : initialCategory);
      setError(null);
    }
  }, [isOpen, initialCategory]);

  if (!isOpen) return null;

  const autosTags = [
    'Mecánica & Motores',
    'Restauración',
    'Debate Técnico',
    'Pista & Setup',
    'Clásicos Legendarios',
    'Superdeportivos',
    'Proyectos DIY'
  ];

  const recTags = [
    'Documentales & Archivo',
    'Libros Técnicos',
    'Películas & Cine',
    'Talleres & Especialistas',
    'Repuestos & Piezas OEM',
    'Canales & Media'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onOpenAuthModal?.();
      return;
    }

    if (!title.trim() || !content.trim()) {
      setError('Por favor completa el título y el contenido de la publicación.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const authorRole = isAdmin ? 'admin' : (profile?.role || 'subscriber');
    const authorName = profile?.displayName || user.displayName || user.email?.split('@')[0] || 'Entusiasta';

    const newPostData = {
      userId: user.uid,
      userName: authorName,
      userEmail: user.email || '',
      userRole: authorRole,
      category,
      tag: tag || (category === 'autos' ? 'Mecánica & Motores' : 'Documentales & Archivo'),
      title: title.trim(),
      content: content.trim(),
      carModel: category === 'autos' ? carModel.trim() : undefined,
      recommendationType: category === 'recomendaciones' ? recommendationType : undefined,
      recommendationUrl: category === 'recomendaciones' ? recommendationUrl.trim() : undefined,
      createdAt: new Date().toISOString(),
      pinned: false,
    };

    try {
      const postId = await ForumService.createPost(newPostData);
      if (onPostCreated) {
        onPostCreated({
          ...newPostData,
          id: postId,
          likesCount: 0,
          likedBy: [],
          commentsCount: 0,
        });
      }
      // Reset form
      setTitle('');
      setContent('');
      setCarModel('');
      setRecommendationUrl('');
      onClose();
    } catch (err: any) {
      console.error('Error creating post:', err);
      // Even if Firestore fails, notify caller with local temporary ID
      const fallbackPost: ForumPost = {
        ...newPostData,
        id: `local-${Date.now()}`,
        likesCount: 0,
        likedBy: [],
        commentsCount: 0,
      };
      onPostCreated?.(fallbackPost);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="bg-[#0c1624] border border-[#ffd451]/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 text-white shadow-2xl relative my-8"
        >
          {/* Close button */}
          <button
            id="close-forum-modal-btn"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-[#ffd451]/10 border border-[#ffd451]/30 rounded-2xl">
              <Sparkles className="w-6 h-6 text-[#ffd451]" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-[#ffd451] uppercase">
                COMUNIDAD // AUTOARCHIVE FORUM
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                CREAR NUEVO TEMA
              </h2>
            </div>
          </div>

          {!user ? (
            <div className="p-6 bg-[#080e18] border border-white/10 rounded-2xl text-center space-y-4">
              <AlertCircle className="w-10 h-10 text-[#ffd451] mx-auto" />
              <h3 className="text-lg font-bold">Inicia sesión para participar en el foro</h3>
              <p className="text-xs text-[#8a9db5] max-w-md mx-auto">
                Para mantener la calidad y el respeto en nuestros debates de ingeniería y recomendaciones, debes ser miembro autenticado de AutoArchive.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenAuthModal?.();
                }}
                className="px-6 py-3 bg-[#ffd451] hover:bg-[#ffe082] text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(255,212,81,0.3)]"
              >
                Ingresar / Registrarse
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Section Selector: AUTOS vs RECOMENDACIONES */}
              <div>
                <label className="block text-xs font-mono font-bold text-[#8a9db5] uppercase tracking-wider mb-2">
                  1. SELECCIONA LA SECCIÓN:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setCategory('autos');
                      setTag('Mecánica & Motores');
                    }}
                    className={`flex items-center justify-center gap-2.5 p-3.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all ${
                      category === 'autos'
                        ? 'bg-[#ffd451] text-black border-[#ffd451] shadow-[0_0_15px_rgba(255,212,81,0.3)]'
                        : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <Car className="w-4 h-4" />
                    <span>FORO // AUTOS</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setCategory('recomendaciones');
                      setTag('Documentales & Archivo');
                    }}
                    className={`flex items-center justify-center gap-2.5 p-3.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all ${
                      category === 'recomendaciones'
                        ? 'bg-[#22c55e] text-black border-[#22c55e] shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                        : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>RECOMENDACIONES</span>
                  </button>
                </div>
              </div>

              {/* Tag / Category details */}
              <div>
                <label className="block text-xs font-mono font-bold text-[#8a9db5] uppercase tracking-wider mb-2">
                  2. ETIQUETA TEMÁTICA:
                </label>
                <div className="flex flex-wrap gap-2">
                  {(category === 'autos' ? autosTags : recTags).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTag(t)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                        tag === t
                          ? 'bg-white text-black font-bold shadow'
                          : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      #{t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Specific Field for AUTOS: Car Model */}
              {category === 'autos' && (
                <div>
                  <label className="block text-xs font-mono font-bold text-[#8a9db5] uppercase tracking-wider mb-1.5">
                    MODELO O MOTOR DE REFERENCIA (OPCIONAL):
                  </label>
                  <div className="relative">
                    <Car className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type="text"
                      value={carModel}
                      onChange={(e) => setCarModel(e.target.value)}
                      placeholder="Ej: Nissan Skyline R34 / 2JZ-GTE / Ferrari F40"
                      className="w-full pl-10 pr-4 py-2.5 bg-[#080e18] border border-white/15 focus:border-[#ffd451] rounded-xl text-xs text-white placeholder-white/30 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Specific Fields for RECOMENDACIONES: Type & Link */}
              {category === 'recomendaciones' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono font-bold text-[#8a9db5] uppercase tracking-wider mb-1.5">
                      TIPO DE RECOMENDACIÓN:
                    </label>
                    <select
                      value={recommendationType}
                      onChange={(e) => setRecommendationType(e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#080e18] border border-white/15 focus:border-[#22c55e] rounded-xl text-xs text-white focus:outline-none"
                    >
                      <option value="documental">Documental / Video</option>
                      <option value="libro">Libro Técnico / Historia</option>
                      <option value="pelicula">Película / Cine</option>
                      <option value="taller">Taller / Restaurador</option>
                      <option value="pieza">Pieza / Fabricante OEM</option>
                      <option value="canal">Canal de YouTube / Podcast</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold text-[#8a9db5] uppercase tracking-wider mb-1.5">
                      ENLACE O REFERENCIA (OPCIONAL):
                    </label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                      <input
                        type="text"
                        value={recommendationUrl}
                        onChange={(e) => setRecommendationUrl(e.target.value)}
                        placeholder="https://... o nombre de autor"
                        className="w-full pl-10 pr-4 py-2.5 bg-[#080e18] border border-white/15 focus:border-[#22c55e] rounded-xl text-xs text-white placeholder-white/30 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-xs font-mono font-bold text-[#8a9db5] uppercase tracking-wider mb-1.5">
                  TÍTULO DEL TEMA:
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej: ¿Vale la pena reconstruir un motor rotativo 13B hoy en día?"
                  maxLength={130}
                  required
                  className="w-full px-4 py-3 bg-[#080e18] border border-white/15 focus:border-[#ffd451] rounded-xl text-sm font-bold text-white placeholder-white/30 focus:outline-none"
                />
                <div className="text-right text-[10px] text-white/40 mt-1">
                  {title.length}/130 caracteres
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="block text-xs font-mono font-bold text-[#8a9db5] uppercase tracking-wider mb-1.5">
                  DESCRIPCIÓN / DETALLES DE LA DISCUSIÓN:
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Comparte tu experiencia técnica, consulta o argumento detallado para debatir con la comunidad..."
                  rows={4}
                  required
                  className="w-full px-4 py-3 bg-[#080e18] border border-white/15 focus:border-[#ffd451] rounded-xl text-xs text-white placeholder-white/30 focus:outline-none leading-relaxed resize-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl border border-white/10 text-xs text-white/70 hover:text-white hover:bg-white/5 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-[#ffd451] hover:bg-[#ffe082] text-black font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-[0_0_20px_rgba(255,212,81,0.3)] flex items-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'PUBLICANDO...' : 'PUBLICAR EN EL FORO'}</span>
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
