import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ForumPost } from '../types';
import { useAuth } from '../context/AuthContext';
import { 
  X, 
  Send, 
  Tag, 
  Link as LinkIcon, 
  Car,
  AlertCircle,
  MessageSquare,
  Sparkles,
  Globe
} from 'lucide-react';
import { ForumService } from '../services/forumService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialFlair?: string;
  onPostCreated?: (post: ForumPost) => void;
  onOpenAuthModal?: () => void;
}

export const ForumNewPostModal: React.FC<Props> = ({
  isOpen,
  onClose,
  initialFlair = '🏎️ Debate Técnico',
  onPostCreated,
  onOpenAuthModal,
}) => {
  const { user, userProfile, isAdmin } = useAuth();

  const flairs = [
    { label: '🏎️ Debate Técnico', category: 'debate' },
    { label: '🛠️ Mecánica & Swap', category: 'mecanica' },
    { label: '💡 Recomendación', category: 'recomendaciones' },
    { label: '🏁 Circuito & Setup', category: 'circuitos' },
    { label: '📜 Clásicos & Archivo', category: 'clasicos' },
    { label: '❓ Pregunta / Duda', category: 'general' },
    { label: '🚗 Proyecto DIY', category: 'autos' },
  ];

  const [selectedFlair, setSelectedFlair] = useState(initialFlair);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [carModel, setCarModel] = useState('');
  const [referenceUrl, setReferenceUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setError(null);
      if (initialFlair) setSelectedFlair(initialFlair);
    }
  }, [isOpen, initialFlair]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onOpenAuthModal?.();
      return;
    }

    if (!title.trim() || !content.trim()) {
      setError('Por favor ingresa un título y el cuerpo de la pregunta o hilo.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const authorRole = isAdmin ? 'admin' : (userProfile?.role || 'subscriber');
    const authorName = userProfile?.displayName || user.displayName || user.email?.split('@')[0] || 'Entusiasta';

    const currentFlairObj = flairs.find(f => f.label === selectedFlair) || flairs[0];
    const category = currentFlairObj.category as any;

    const newPostData = {
      userId: user.uid,
      userName: authorName,
      userEmail: user.email || '',
      userRole: authorRole,
      category,
      tag: selectedFlair.replace(/^[^\w\s]+/, '').trim(),
      flair: selectedFlair,
      title: title.trim(),
      content: content.trim(),
      carModel: carModel.trim() || undefined,
      recommendationUrl: referenceUrl.trim() || undefined,
      createdAt: new Date().toISOString(),
      pinned: false,
    };

    try {
      const postId = await ForumService.createPost(newPostData);
      if (onPostCreated) {
        onPostCreated({
          ...newPostData,
          id: postId,
          score: 1,
          upvotedBy: [user.uid],
          downvotedBy: [],
          likesCount: 1,
          likedBy: [user.uid],
          commentsCount: 0,
        });
      }
      // Reset form
      setTitle('');
      setContent('');
      setCarModel('');
      setReferenceUrl('');
      onClose();
    } catch (err: any) {
      console.error('Error creating post:', err);
      const fallbackPost: ForumPost = {
        ...newPostData,
        id: `local-${Date.now()}`,
        score: 1,
        upvotedBy: [user.uid],
        downvotedBy: [],
        likesCount: 1,
        likedBy: [user.uid],
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
          className="bg-[#0b1420] border border-[#ff4500]/40 rounded-2xl max-w-2xl w-full p-5 sm:p-7 text-white shadow-2xl relative my-8"
        >
          {/* Close button */}
          <button
            id="close-modal-btn"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2.5 bg-[#ff4500]/15 border border-[#ff4500]/30 rounded-xl text-[#ff4500]">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold tracking-wider text-[#ff4500] uppercase">
                  r/AutoChat
                </span>
                <span className="text-white/40 text-xs">•</span>
                <span className="inline-flex items-center gap-1 text-xs font-mono text-emerald-400 font-bold">
                  <Globe className="w-3 h-3" />
                  Publicación Abierta
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
                Publicar Pregunta o Hilo Público
              </h2>
            </div>
          </div>

          <div className="mb-4 px-3.5 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs font-mono text-emerald-400 flex items-center gap-2">
            <Globe className="w-4 h-4 shrink-0" />
            <span>Este hilo y sus respuestas serán 100% públicos para toda la comunidad.</span>
          </div>

          {!user ? (
            <div className="p-6 bg-[#080d14] border border-white/10 rounded-xl text-center space-y-4">
              <AlertCircle className="w-10 h-10 text-[#ff4500] mx-auto" />
              <h3 className="text-base font-bold">Inicia sesión para publicar en AutoChat</h3>
              <p className="text-xs text-[#8a9db5] max-w-md mx-auto">
                Cualquier persona puede leer el foro libremente. Inicia sesión para publicar tus propias preguntas, respuestas y votar hilos.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenAuthModal?.();
                }}
                className="px-6 py-2.5 bg-[#ff4500] hover:bg-[#ff5722] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(255,69,0,0.3)]"
              >
                Ingresar / Registrarse
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Flair Selection */}
              <div>
                <label className="block text-xs font-mono font-bold text-[#8a9db5] uppercase tracking-wider mb-2">
                  Selecciona la Categoría (Flair):
                </label>
                <div className="flex flex-wrap gap-2">
                  {flairs.map((f) => (
                    <button
                      key={f.label}
                      type="button"
                      onClick={() => setSelectedFlair(f.label)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                        selectedFlair === f.label
                          ? 'bg-[#ff4500] text-white font-bold shadow-[0_0_10px_rgba(255,69,0,0.4)]'
                          : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Thread Title */}
              <div>
                <label className="block text-xs font-mono font-bold text-[#8a9db5] uppercase tracking-wider mb-1.5">
                  Pregunta o Título del Hilo:
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ej: ¿Qué relación de compresión recomendáis para un setup turbo en RB26?"
                  maxLength={140}
                  required
                  className="w-full px-4 py-2.5 bg-[#080d14] border border-white/15 focus:border-[#ff4500] rounded-xl text-sm font-bold text-white placeholder-white/30 focus:outline-none"
                />
                <div className="text-right text-[10px] text-white/40 mt-1">
                  {title.length}/140 caracteres
                </div>
              </div>

              {/* Thread Body */}
              <div>
                <label className="block text-xs font-mono font-bold text-[#8a9db5] uppercase tracking-wider mb-1.5">
                  Detalles de la Consulta o Argumentos:
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Escribe los detalles de tu consulta, especificaciones técnicas, dudas o contexto para que la comunidad te responda..."
                  rows={4}
                  required
                  className="w-full px-4 py-3 bg-[#080d14] border border-white/15 focus:border-[#ff4500] rounded-xl text-xs text-white placeholder-white/30 focus:outline-none leading-relaxed resize-none"
                />
              </div>

              {/* Optional Fields: Car Model & URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-[#8a9db5] mb-1">
                    Vehículo / Motor (Opcional):
                  </label>
                  <div className="relative">
                    <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
                    <input
                      type="text"
                      value={carModel}
                      onChange={(e) => setCarModel(e.target.value)}
                      placeholder="Ej: Mazda RX-7 FD / 13B-REW"
                      className="w-full pl-9 pr-3 py-2 bg-[#080d14] border border-white/15 focus:border-[#ff4500] rounded-xl text-xs text-white placeholder-white/30 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-[#8a9db5] mb-1">
                    Enlace / Referencia (Opcional):
                  </label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/40" />
                    <input
                      type="text"
                      value={referenceUrl}
                      onChange={(e) => setReferenceUrl(e.target.value)}
                      placeholder="https://... o video/manual"
                      className="w-full pl-9 pr-3 py-2 bg-[#080d14] border border-white/15 focus:border-[#ff4500] rounded-xl text-xs text-white placeholder-white/30 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl border border-white/10 text-xs text-white/70 hover:text-white hover:bg-white/5 transition-all"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-[#ff4500] hover:bg-[#ff5722] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(255,69,0,0.3)] flex items-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Publicando...' : 'Publicar Pregunta'}</span>
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
