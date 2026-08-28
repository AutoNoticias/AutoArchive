import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ForumPost, ForumComment } from '../types';
import { useAuth } from '../context/AuthContext';
import { ForumService } from '../services/forumService';
import { 
  ChevronUp, 
  ChevronDown, 
  MessageSquare, 
  Share2, 
  Bookmark, 
  Trash2, 
  Send, 
  ExternalLink, 
  ShieldCheck, 
  Pin,
  Car, 
  Check,
  User,
  CornerDownRight
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
  const { user, userProfile, isAdmin } = useAuth();

  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [comments, setComments] = useState<ForumComment[]>([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Reddit vote tracking
  const userId = user?.uid;
  const initialUpvoted = !!(userId && post.upvotedBy && post.upvotedBy.includes(userId));
  const initialDownvoted = !!(userId && post.downvotedBy && post.downvotedBy.includes(userId));

  const [userVote, setUserVote] = useState<'up' | 'down' | 'none'>(
    initialUpvoted ? 'up' : initialDownvoted ? 'down' : 'none'
  );
  const [score, setScore] = useState<number>(
    typeof post.score === 'number' 
      ? post.score 
      : typeof post.likesCount === 'number' 
      ? post.likesCount 
      : 0
  );

  // Sync vote state on changes
  useEffect(() => {
    if (userId) {
      const up = !!(post.upvotedBy && post.upvotedBy.includes(userId));
      const down = !!(post.downvotedBy && post.downvotedBy.includes(userId));
      setUserVote(up ? 'up' : down ? 'down' : 'none');
    } else {
      setUserVote('none');
    }
    if (typeof post.score === 'number') {
      setScore(post.score);
    }
  }, [userId, post.upvotedBy, post.downvotedBy, post.score]);

  // Subscribe to comments
  useEffect(() => {
    if (isCommentsOpen) {
      const unsub = ForumService.subscribeComments(post.id, (loadedComments) => {
        setComments(loadedComments);
      });
      return () => unsub();
    }
  }, [isCommentsOpen, post.id]);

  const handleVote = async (direction: 'up' | 'down') => {
    if (!user) {
      onOpenAuthModal?.();
      return;
    }

    let nextVote: 'up' | 'down' | 'none' = 'none';
    let delta = 0;

    if (userVote === direction) {
      // Toggle off to neutral
      nextVote = 'none';
      delta = direction === 'up' ? -1 : 1;
    } else if (userVote === 'none') {
      nextVote = direction;
      delta = direction === 'up' ? 1 : -1;
    } else {
      // Switch from up to down or vice versa
      nextVote = direction;
      delta = direction === 'up' ? 2 : -2;
    }

    setUserVote(nextVote);
    setScore(prev => prev + delta);

    await ForumService.votePost(
      post.id, 
      user.uid, 
      nextVote, 
      post.upvotedBy || [], 
      post.downvotedBy || []
    );
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      onOpenAuthModal?.();
      return;
    }

    if (!newCommentText.trim()) return;

    setIsSubmittingComment(true);
    const authorRole = isAdmin ? 'admin' : (userProfile?.role || 'subscriber');
    const authorName = userProfile?.displayName || user.displayName || user.email?.split('@')[0] || 'Entusiasta';

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
      console.error('Error posting comment:', err);
      setComments(prev => [
        ...prev,
        {
          id: `local-${Date.now()}`,
          postId: post.id,
          ...commentData,
          score: 1,
          upvotedBy: [user.uid],
          downvotedBy: [],
        }
      ]);
      setNewCommentText('');
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleShare = () => {
    const text = `🏎️ [AutoChat] "${post.title}"\n${post.content.slice(0, 100)}...\nÚnete al debate en AutoChat.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isAuthorOrAdmin = user && (user.uid === post.userId || isAdmin || user.email === 'autonoticiascontacto@gmail.com');

  // Format relative time (Reddit style)
  const formatTimeAgo = (dateStr: string) => {
    const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (diff < 60) return 'hace un momento';
    if (diff < 3600) return `hace ${Math.floor(diff / 60)} min`;
    if (diff < 86400) return `hace ${Math.floor(diff / 3600)} h`;
    if (diff < 604800) return `hace ${Math.floor(diff / 86400)} d`;
    return new Date(dateStr).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  // Flair color palette
  const getFlairStyle = (flair: string) => {
    const lower = flair.toLowerCase();
    if (lower.includes('debate') || lower.includes('técnico')) {
      return 'bg-[#ff4500]/20 text-[#ff7043] border-[#ff4500]/40';
    }
    if (lower.includes('mecánica') || lower.includes('motor') || lower.includes('swap')) {
      return 'bg-[#ffd451]/20 text-[#ffd451] border-[#ffd451]/40';
    }
    if (lower.includes('recomend') || lower.includes('guía')) {
      return 'bg-[#22c55e]/20 text-[#4ade80] border-[#22c55e]/40';
    }
    if (lower.includes('pista') || lower.includes('circuito')) {
      return 'bg-[#ef4444]/20 text-[#f87171] border-[#ef4444]/40';
    }
    if (lower.includes('clásico') || lower.includes('archivo')) {
      return 'bg-[#a855f7]/20 text-[#c084fc] border-[#a855f7]/40';
    }
    if (lower.includes('pregunta') || lower.includes('duda')) {
      return 'bg-[#38bdf8]/20 text-[#38bdf8] border-[#38bdf8]/40';
    }
    return 'bg-white/10 text-white/80 border-white/20';
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      id={`post-${post.id}`}
      className={`bg-[#0c141f] border rounded-xl overflow-hidden transition-all duration-200 ${
        post.pinned 
          ? 'border-[#ff4500]/60 shadow-[0_0_20px_rgba(255,69,0,0.15)] bg-gradient-to-r from-[#141b26] to-[#0c141f]'
          : 'border-white/10 hover:border-white/25 hover:bg-[#0f1826]'
      }`}
    >
      <div className="flex">
        {/* Reddit-style Left Vote Column */}
        <div className="w-11 sm:w-12 bg-[#090f17] border-r border-white/5 flex flex-col items-center pt-3 pb-3 px-1 select-none shrink-0">
          <button
            onClick={() => handleVote('up')}
            title="Votar a favor (Upvote)"
            className={`p-1.5 rounded hover:bg-white/10 transition-colors ${
              userVote === 'up' 
                ? 'text-[#ff4500] bg-[#ff4500]/15' 
                : 'text-white/40 hover:text-[#ff4500]'
            }`}
          >
            <ChevronUp className="w-5 h-5 stroke-[2.5]" />
          </button>

          <span className={`text-xs font-mono font-black my-1 ${
            userVote === 'up' 
              ? 'text-[#ff4500]' 
              : userVote === 'down' 
              ? 'text-[#7193ff]' 
              : 'text-white/80'
          }`}>
            {score}
          </span>

          <button
            onClick={() => handleVote('down')}
            title="Votar en contra (Downvote)"
            className={`p-1.5 rounded hover:bg-white/10 transition-colors ${
              userVote === 'down' 
                ? 'text-[#7193ff] bg-[#7193ff]/15' 
                : 'text-white/40 hover:text-[#7193ff]'
            }`}
          >
            <ChevronDown className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Main Post Content */}
        <div className="flex-1 p-4 sm:p-5 min-w-0">
          {/* Post Header Meta */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono mb-2">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[#8a9db5]">
              {post.pinned && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#ff4500]/20 text-[#ff4500] border border-[#ff4500]/40 rounded text-[10px] font-black uppercase">
                  <Pin className="w-3 h-3" />
                  <span>FIJADO</span>
                </span>
              )}

              <span className="font-bold text-white hover:underline cursor-pointer">
                r/AutoChat
              </span>
              <span>•</span>
              <span>Publicado por</span>
              <span className="text-white/90 font-medium">u/{post.userName}</span>

              {post.userRole === 'admin' ? (
                <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 bg-[#ffd451]/20 text-[#ffd451] border border-[#ffd451]/40 rounded text-[9px] font-bold">
                  <ShieldCheck className="w-2.5 h-2.5" />
                  <span>MOD</span>
                </span>
              ) : (
                <span className="px-1.5 py-0.2 bg-white/5 text-white/50 rounded text-[9px]">
                  OP
                </span>
              )}

              <span>•</span>
              <span className="text-white/50">{formatTimeAgo(post.createdAt)}</span>
            </div>

            {/* Flair Badge */}
            {(post.flair || post.tag) && (
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${getFlairStyle(post.flair || post.tag)}`}>
                {post.flair || post.tag}
              </span>
            )}
          </div>

          {/* Post Title */}
          <h2 
            onClick={() => setIsCommentsOpen(!isCommentsOpen)}
            className="text-base sm:text-lg font-bold text-white hover:text-[#ffd451] transition-colors leading-snug cursor-pointer mb-2"
          >
            {post.title}
          </h2>

          {/* Car Reference Tag (if present) */}
          {post.carModel && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-[11px] font-mono text-[#8a9db5] mb-3">
              <Car className="w-3.5 h-3.5 text-[#ffd451]" />
              <span>Modelo: <strong className="text-white">{post.carModel}</strong></span>
            </div>
          )}

          {/* Recommendation URL (if present) */}
          {post.recommendationUrl && (
            <div className="mb-3">
              <a
                href={post.recommendationUrl.startsWith('http') ? post.recommendationUrl : `https://${post.recommendationUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#4ea0ff]/10 hover:bg-[#4ea0ff]/20 border border-[#4ea0ff]/30 text-[#72b9ff] rounded-lg text-xs font-mono transition-all"
              >
                <span>{post.recommendationUrl}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}

          {/* Post Content Body */}
          <p className="text-xs sm:text-sm text-[#d6e3f5] leading-relaxed whitespace-pre-line font-normal mb-4">
            {post.content}
          </p>

          {/* Reddit Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5 text-xs font-mono text-[#8a9db5]">
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Comments Button */}
              <button
                onClick={() => setIsCommentsOpen(!isCommentsOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-white/10 transition-all ${
                  isCommentsOpen ? 'bg-white/15 text-white font-bold' : 'hover:text-white'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>
                  {comments.length > 0 ? comments.length : (post.commentsCount || 0)} Comentarios
                </span>
              </button>

              {/* Share Button */}
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-white/10 hover:text-white transition-all"
              >
                {copied ? <Check className="w-4 h-4 text-[#22c55e]" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? 'Copiado' : 'Compartir'}</span>
              </button>

              {/* Save Button */}
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-white/10 transition-all ${
                  isSaved ? 'text-[#ffd451]' : 'hover:text-white'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#ffd451]' : ''}`} />
                <span className="hidden sm:inline">{isSaved ? 'Guardado' : 'Guardar'}</span>
              </button>
            </div>

            {/* Author / Admin Controls */}
            {isAuthorOrAdmin && onDeletePost && (
              <button
                onClick={() => onDeletePost(post.id)}
                title="Eliminar publicación"
                className="flex items-center gap-1 px-2.5 py-1 text-white/40 hover:text-red-400 hover:bg-red-500/10 rounded transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="text-[11px]">Eliminar</span>
              </button>
            )}
          </div>

          {/* Reddit Threaded Comments Section */}
          <AnimatePresence>
            {isCommentsOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-white/10 space-y-4"
              >
                {/* Comment Composer */}
                <form onSubmit={handleAddComment} className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#8a9db5]">
                    <User className="w-3.5 h-3.5" />
                    <span>
                      Comentar como <strong className="text-white">u/{user ? (userProfile?.displayName || user.displayName || user.email?.split('@')[0]) : 'invitado'}</strong>:
                    </span>
                  </div>

                  <div className="relative">
                    <textarea
                      rows={2}
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      placeholder={user ? "¿Qué opinas de este hilo? Aporta datos técnicos o tu perspectiva..." : "Inicia sesión en AutoArchive para debatir en este hilo"}
                      disabled={!user || isSubmittingComment}
                      className="w-full px-3.5 py-2.5 bg-[#080d14] border border-white/15 focus:border-[#ff4500] rounded-xl text-xs text-white placeholder-white/30 focus:outline-none resize-none disabled:opacity-50"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2">
                    {user ? (
                      <button
                        type="submit"
                        disabled={!newCommentText.trim() || isSubmittingComment}
                        className="px-4 py-2 bg-[#ff4500] hover:bg-[#ff5722] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all disabled:opacity-40 flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,69,0,0.3)]"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{isSubmittingComment ? 'Publicando...' : 'Comentar'}</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={onOpenAuthModal}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-lg"
                      >
                        Iniciar Sesión para Comentar
                      </button>
                    )}
                  </div>
                </form>

                {/* Comments List */}
                <div className="space-y-3 pt-2">
                  {comments.length === 0 ? (
                    <div className="py-6 text-center text-xs text-white/40 font-mono bg-black/20 rounded-xl border border-white/5">
                      No hay comentarios aún. ¡Sé el primero en aportar a este debate!
                    </div>
                  ) : (
                    comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="p-3.5 bg-[#080d14] border border-white/5 rounded-xl space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-xs font-mono">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white">u/{comment.userName}</span>
                            {comment.userRole === 'admin' ? (
                              <span className="px-1.5 py-0.2 bg-[#ffd451]/20 text-[#ffd451] rounded text-[8px] font-black">
                                MOD
                              </span>
                            ) : comment.userId === post.userId ? (
                              <span className="px-1.5 py-0.2 bg-[#ff4500]/20 text-[#ff4500] rounded text-[8px] font-bold">
                                OP
                              </span>
                            ) : null}
                          </div>
                          <span className="text-white/40 text-[10px]">
                            {formatTimeAgo(comment.createdAt)}
                          </span>
                        </div>

                        <p className="text-xs text-[#dbe7f5] leading-relaxed pl-1">
                          {comment.content}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.article>
  );
};
