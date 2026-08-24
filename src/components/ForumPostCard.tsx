import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ForumPost, ForumComment } from '../types';
import { useAuth } from '../context/AuthContext';
import { ForumService } from '../services/forumService';
import { 
  Car, 
  Sparkles, 
  MessageSquare, 
  Heart, 
  Share2, 
  Trash2, 
  Send, 
  ExternalLink, 
  ShieldCheck, 
  Pin,
  Clock,
  Film,
  BookOpen,
  Wrench,
  ChevronDown,
  ChevronUp,
  Check
} from 'lucide-react';

interface Props {
  post: ForumPost;
  onOpenAuthModal?: () => void;
  onDeletePost?: (postId: string) => void;
}

export const ForumPostCard: React.FC<Props> = ({
  post,
  onOpenAuthModal,
  onDeletePost,
}) => {
  const { user, profile, isAdmin } = useAuth();

  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [comments, setComments] = useState<ForumComment[]>([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likesCount || 0);
  const [isLiked, setIsLiked] = useState(
    !!(user && post.likedBy && post.likedBy.includes(user.uid))
  );
  const [copied, setCopied] = useState(false);

  // Sync like status when user or post changes
  useEffect(() => {
    if (user && post.likedBy) {
      setIsLiked(post.likedBy.includes(user.uid));
    }
  }, [user, post.likedBy]);

  // Subscribe to comments when comments accordion is opened
  useEffect(() => {
    if (isCommentsOpen) {
      const unsub = ForumService.subscribeComments(post.id, (loadedComments) => {
        setComments(loadedComments);
      });
      return () => unsub();
    }
  }, [isCommentsOpen, post.id]);

  const handleToggleLike = async () => {
    if (!user) {
      onOpenAuthModal?.();
      return;
    }

    const nextLiked = !isLiked;
    const nextCount = nextLiked ? likesCount + 1 : Math.max(0, likesCount - 1);
    setIsLiked(nextLiked);
    setLikesCount(nextCount);

    await ForumService.toggleLike(post.id, user.uid, isLiked, likesCount);
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onOpenAuthModal?.();
      return;
    }

    if (!newCommentText.trim()) return;

    setIsSubmittingComment(true);
    const authorRole = isAdmin ? 'admin' : (profile?.role || 'subscriber');
    const authorName = profile?.displayName || user.displayName || user.email?.split('@')[0] || 'Entusiasta';

    const commentData = {
      userId: user.uid,
      userName: authorName,
      userEmail: user.email || '',
      userRole: authorRole,
      content: newCommentText.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      await ForumService.addComment(post.id, commentData);
      setNewCommentText('');
    } catch (err) {
      console.error('Failed to post comment, applying local fallback:', err);
      setComments((prev) => [
        ...prev,
        {
          id: `local-com-${Date.now()}`,
          postId: post.id,
          ...commentData,
          createdAt: new Date().toISOString(),
        },
      ]);
      setNewCommentText('');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleShare = () => {
    const text = `🏎️ [Foro AutoArchive] "${post.title}"\n${post.content.slice(0, 100)}...\nÚnete al debate en AutoArchive.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isAuthorOrAdmin = user && (user.uid === post.userId || isAdmin || user.email === 'autonoticiascontacto@gmail.com');

  const formattedDate = new Date(post.createdAt).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      id={`forum-post-${post.id}`}
      className={`bg-[#0b1420] border rounded-2xl p-5 sm:p-7 transition-all duration-300 ${
        post.pinned 
          ? 'border-[#ffd451]/60 shadow-[0_0_25px_rgba(255,212,81,0.08)] bg-gradient-to-b from-[#0e1a2b] to-[#0b1420]' 
          : 'border-white/10 hover:border-white/20'
      }`}
    >
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex flex-wrap items-center gap-2">
          {post.pinned && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#ffd451]/15 text-[#ffd451] border border-[#ffd451]/40 rounded-md text-[10px] font-mono font-black uppercase tracking-wider">
              <Pin className="w-3 h-3" />
              <span>FIJADO</span>
            </span>
          )}

          {post.category === 'autos' ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#4ea0ff]/15 text-[#4ea0ff] border border-[#4ea0ff]/30 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider">
              <Car className="w-3 h-3" />
              <span>AUTOS</span>
            </span>
          ) : post.category === 'recomendaciones' ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#22c55e]/15 text-[#22c55e] border border-[#22c55e]/30 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3" />
              <span>RECOMENDACIÓN</span>
            </span>
          ) : null}

          <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-white/60 text-[10px] font-mono">
            #{post.tag}
          </span>
        </div>

        {/* Date & Actions */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#8a9db5]">
          <span className="flex items-center gap-1 text-[11px]">
            <Clock className="w-3 h-3 text-white/40" />
            <span>{formattedDate}</span>
          </span>

          {isAuthorOrAdmin && onDeletePost && (
            <button
              onClick={() => onDeletePost(post.id)}
              title="Eliminar tema"
              className="p-1 text-white/30 hover:text-red-400 rounded transition-colors ml-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Author Profile Ribbon */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center font-black text-xs text-white">
          {post.userName.charAt(0).toUpperCase()}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-white">{post.userName}</span>
          {post.userRole === 'admin' ? (
            <span className="px-2 py-0.5 bg-[#ffd451]/20 border border-[#ffd451]/40 text-[#ffd451] text-[9px] font-mono font-black rounded-full flex items-center gap-1">
              <ShieldCheck className="w-2.5 h-2.5" />
              <span>ADMIN</span>
            </span>
          ) : (
            <span className="px-1.5 py-0.5 bg-white/5 text-white/50 text-[9px] font-mono rounded">
              SOCIO
            </span>
          )}
        </div>
      </div>

      {/* Post Title */}
      <h3 className="text-lg sm:text-xl font-black text-white hover:text-[#ffd451] transition-colors leading-tight mb-2.5">
        {post.title}
      </h3>

      {/* Car Model / Recommendation Highlight Chip */}
      {post.carModel && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ffd451]/10 border border-[#ffd451]/20 rounded-lg text-xs font-mono text-[#ffd451] mb-3">
          <Car className="w-3.5 h-3.5" />
          <span>Vehículo: <strong>{post.carModel}</strong></span>
        </div>
      )}

      {post.recommendationType && (
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#22c55e]/10 border border-[#22c55e]/30 rounded-lg text-xs font-mono text-[#22c55e]">
            {post.recommendationType === 'documental' && <Film className="w-3.5 h-3.5" />}
            {post.recommendationType === 'libro' && <BookOpen className="w-3.5 h-3.5" />}
            {post.recommendationType === 'taller' && <Wrench className="w-3.5 h-3.5" />}
            <span className="capitalize">{post.recommendationType}</span>
          </span>

          {post.recommendationUrl && (
            <a
              href={post.recommendationUrl.startsWith('http') ? post.recommendationUrl : `https://${post.recommendationUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-[#4ea0ff] hover:underline"
            >
              <span>Ver referencia</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      )}

      {/* Main Content Body */}
      <p className="text-xs sm:text-sm text-[#edf5ff]/90 leading-relaxed font-normal whitespace-pre-line mb-5">
        {post.content}
      </p>

      {/* Interactive Action Bar */}
      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Like Button */}
          <button
            onClick={handleToggleLike}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all active:scale-95 ${
              isLiked 
                ? 'bg-red-500/20 text-red-400 border-red-500/40 shadow-[0_0_10px_rgba(239,68,68,0.2)]'
                : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-red-400 text-red-400' : ''}`} />
            <span>{likesCount}</span>
          </button>

          {/* Comment Count / Accordion Toggle */}
          <button
            onClick={() => setIsCommentsOpen(!isCommentsOpen)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all ${
              isCommentsOpen 
                ? 'bg-[#ffd451] text-black border-[#ffd451] font-bold'
                : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>
              {comments.length > 0 ? comments.length : (post.commentsCount || 0)} {comments.length === 1 ? 'Respuesta' : 'Respuestas'}
            </span>
            {isCommentsOpen ? <ChevronUp className="w-3 h-3 ml-0.5" /> : <ChevronDown className="w-3 h-3 ml-0.5" />}
          </button>
        </div>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-lg transition-all text-xs"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-[#22c55e]" /> : <Share2 className="w-3.5 h-3.5" />}
          <span className="hidden sm:inline">{copied ? 'Copiado' : 'Compartir'}</span>
        </button>
      </div>

      {/* Comments Section Accordion */}
      <AnimatePresence>
        {isCommentsOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-white/10 space-y-4 overflow-hidden"
          >
            {/* Comments List */}
            <div className="space-y-3">
              {comments.length === 0 ? (
                <div className="py-4 text-center text-xs text-white/40 font-mono">
                  Aún no hay respuestas en este debate. ¡Sé el primero en aportar tu perspectiva!
                </div>
              ) : (
                comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-3.5 bg-black/40 border border-white/5 rounded-xl space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white">{comment.userName}</span>
                        {comment.userRole === 'admin' && (
                          <span className="px-1 py-0.2 bg-[#ffd451]/20 text-[#ffd451] rounded text-[8px] font-bold">
                            ADMIN
                          </span>
                        )}
                      </div>
                      <span className="text-white/40">
                        {new Date(comment.createdAt).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    <p className="text-xs text-[#dbe7f5] leading-relaxed">
                      {comment.content}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Reply Input Form */}
            <form onSubmit={handleAddComment} className="pt-2 flex items-center gap-2">
              <input
                type="text"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder={user ? "Escribe tu respuesta al debate..." : "Inicia sesión para responder a este tema"}
                disabled={!user || isSubmittingComment}
                className="flex-1 px-3.5 py-2.5 bg-[#080e18] border border-white/15 focus:border-[#ffd451] rounded-xl text-xs text-white placeholder-white/30 focus:outline-none disabled:opacity-50"
              />
              {user ? (
                <button
                  type="submit"
                  disabled={!newCommentText.trim() || isSubmittingComment}
                  className="px-4 py-2.5 bg-[#ffd451] hover:bg-[#ffe082] text-black font-bold text-xs rounded-xl uppercase tracking-wider transition-all disabled:opacity-40 shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onOpenAuthModal}
                  className="px-3.5 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl shrink-0"
                >
                  Ingresar
                </button>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};
