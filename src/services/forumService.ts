import { 
  collection, 
  doc, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  getDocs,
  setDoc
} from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import { db, auth } from '../firebase';
import { ForumPost, ForumComment } from '../types';

const FORUM_POSTS_COLLECTION = 'forum_posts';
const LOCAL_STORAGE_POSTS_KEY = 'autoarchive_community_posts_sync';
const LOCAL_STORAGE_COMMENTS_KEY = 'autoarchive_community_comments_sync';

// Default starter posts to ensure the community is always active and informative
const DEFAULT_COMMUNITY_POSTS: ForumPost[] = [
  {
    id: 'starter-pinned-guide',
    userId: 'admin_official',
    userName: 'AutoArchive_Mod',
    userEmail: 'autonoticiascontacto@gmail.com',
    userRole: 'admin',
    category: 'debate',
    tag: 'Debate Técnico',
    flair: '🏎️ Debate Técnico',
    title: '📌 Bienvenido al Espacio Público de AutoChat: Normas y Debate Abierto',
    content: `¡Te damos la bienvenida a AutoChat! Este es el tablón público y abierto de AutoArchive para compartir dudas mecánicas, análisis de telemetría, swaps y debates sobre automovilismo clásico e hiperdeportivos.

• Todo lo que publiques es 100% visible para cualquier entusiasta y visitante.
• Aporta datos técnicos, referencias y argumentos constructivos.
• Utiliza los votos para destacar las mejores respuestas y aportes de la comunidad.`,
    carModel: 'General / Reglajes & Swaps',
    recommendationUrl: '',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    likesCount: 14,
    likedBy: ['admin_official', 'user_1', 'user_2'],
    score: 14,
    upvotedBy: ['admin_official', 'user_1', 'user_2'],
    downvotedBy: [],
    commentsCount: 3,
    pinned: true,
  },
  {
    id: 'starter-supra-2jz',
    userId: 'user_carlos_gtr',
    userName: 'Carlos_Boost99',
    userEmail: 'carlos.boost@gmail.com',
    userRole: 'subscriber',
    category: 'mecanica',
    tag: 'Mecánica & Swap',
    flair: '🛠️ Mecánica & Swap',
    title: '¿Cuál es el límite seguro de potencia en un 2JZ-GTE con bloque y bielas de fábrica (Stock Bottom End)?',
    content: `Hola a todos en la comunidad. Estoy planificando un build con turbo simple (Garrett G35-900) para un Toyota Supra MK4. 

¿Hasta cuántos CV o PSI aguantan los pistones, bielas y casquillos OEM antes de requerir forjado interno si uso mezcla con etanol (E85)? ¿Alguien con experiencia en banco de potencia?`,
    carModel: 'Toyota Supra MK4 (2JZ-GTE Non-VVTi)',
    recommendationUrl: '',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    likesCount: 9,
    likedBy: ['user_carlos_gtr', 'user_enzo'],
    score: 9,
    upvotedBy: ['user_carlos_gtr', 'user_enzo'],
    downvotedBy: [],
    commentsCount: 2,
    pinned: false,
  },
  {
    id: 'starter-rotary-13b',
    userId: 'user_rotary_master',
    userName: 'RotaryLover_FD',
    userEmail: 'rotary.fd3s@gmail.com',
    userRole: 'subscriber',
    category: 'debate',
    tag: 'Debate Técnico',
    flair: '🏎️ Debate Técnico',
    title: '¿Es viable mantener un motor rotativo 13B-REW biturbo secuencial en 2026?',
    content: `Llevo meses analizando unidades de Mazda RX-7 FD3S importadas de Japón. Me apasiona la suavidad del motor Wankel rotativo, pero me preocupan las temperaturas de admisión y la duración de los sellos de ápice (apex seals).

¿Qué rutina de mantenimiento preventivo, premezcla de aceite 2 tiempos (Idemitsu Premix) y mods de refrigeración consideráis obligatorias para que sea fiable?`,
    carModel: 'Mazda RX-7 FD3S (13B-REW Twin Turbo)',
    recommendationUrl: '',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    likesCount: 7,
    likedBy: ['user_rotary_master'],
    score: 7,
    upvotedBy: ['user_rotary_master'],
    downvotedBy: [],
    commentsCount: 1,
    pinned: false,
  },
  {
    id: 'starter-porsche-f40',
    userId: 'user_telemetry_pro',
    userName: 'TelemetryMaster',
    userEmail: 'telemetry.pro@outlook.com',
    userRole: 'subscriber',
    category: 'circuitos',
    tag: 'Circuito & Setup',
    flair: '🏁 Circuito & Setup',
    title: 'Debate en Pista: ¿Pureza analógica del Ferrari F40 vs Eficiencia aerodinámica de un GT3 RS moderno?',
    content: `Para aquellos que hacéis tandas en circuito: La tecnología aero moderna (DRS, downforce activa de 860 kg) y cambios secuenciales permiten marcar tiempos demoledores con total seguridad. Sin embargo, ¿se pierde la conexión visceral y el tacto manual y sin asistencias que ofrecía el F40 con su V8 biturbo?

¿Qué valoráis más al rodar en trackdays: el cronómetro absoluto o el reto de domar un coche analógico?`,
    carModel: 'Ferrari F40 / Porsche 911 GT3 RS',
    recommendationUrl: '',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    likesCount: 12,
    likedBy: ['user_telemetry_pro', 'admin_official'],
    score: 12,
    upvotedBy: ['user_telemetry_pro', 'admin_official'],
    downvotedBy: [],
    commentsCount: 2,
    pinned: false,
  }
];

const DEFAULT_COMMUNITY_COMMENTS: Record<string, ForumComment[]> = {
  'starter-supra-2jz': [
    {
      id: 'comm-2jz-1',
      postId: 'starter-supra-2jz',
      userId: 'user_mecanica_jdm',
      userName: 'MecanicaJDM_Pro',
      userEmail: 'mecanica@jdm.jp',
      userRole: 'subscriber',
      content: 'Con el bloque de fundición de hierro y cigüeñal OEM del 2JZ puedes rondar los 750-800 CV a las ruedas de forma confiable siempre que uses E85 y un mapa sin detonación. El límite crítico de los pistones de fábrica está en ~850 CV. Te recomiendo espárragos de culata ARP L19 y junta de culata metálica HKS de 1.6mm.',
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      score: 5,
      upvotedBy: ['user_carlos_gtr', 'user_mecanica_jdm'],
      downvotedBy: [],
      parentId: null,
    },
    {
      id: 'comm-2jz-2',
      postId: 'starter-supra-2jz',
      userId: 'admin_official',
      userName: 'AutoArchive_Mod',
      userEmail: 'autonoticiascontacto@gmail.com',
      userRole: 'admin',
      content: '¡Gran proyecto! Recuerda además mejorar el sistema de combustible con doble bomba Walbro 450 y carril de inyección de alto caudal. Documentamos el caso en nuestro documental del Supra MK4.',
      createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
      score: 4,
      upvotedBy: ['user_carlos_gtr'],
      downvotedBy: [],
      parentId: null,
    }
  ],
  'starter-rotary-13b': [
    {
      id: 'comm-rotary-1',
      postId: 'starter-rotary-13b',
      userId: 'user_apex_seal',
      userName: 'RotaryDoctor',
      userEmail: 'doc@rotary.com',
      userRole: 'subscriber',
      content: 'Es viable si eres muy disciplinado: 1) Radiador de aluminio Koyo sobredimensionado y termostato de menor apertura. 2) Premezcla 150-200ml de Idemitsu 2T por cada depósito lleno. 3) Dejar calentar a ralentí antes de acelerar y respetar el enfriamiento antes de apagar el motor.',
      createdAt: new Date(Date.now() - 3600000 * 10).toISOString(),
      score: 6,
      upvotedBy: ['user_rotary_master', 'user_apex_seal'],
      downvotedBy: [],
      parentId: null,
    }
  ],
  'starter-porsche-f40': [
    {
      id: 'comm-porsche-1',
      postId: 'starter-porsche-f40',
      userId: 'user_enzo',
      userName: 'Enzo_Purist',
      userEmail: 'enzo@motorsport.it',
      userRole: 'subscriber',
      content: 'El cronómetro se olvida en cuanto te bajas de un coche asistido por electrónica; pero la sensación de dominar un F40 cuando entran los dos turbos IHI a 4.000 RPM sin control de tracción se queda grabada para siempre en la memoria.',
      createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
      score: 8,
      upvotedBy: ['user_telemetry_pro', 'user_enzo'],
      downvotedBy: [],
      parentId: null,
    }
  ]
};

// Helper: Ensure Firebase auth session exists for Firestore rules
async function ensureFirebaseAuth() {
  if (!auth.currentUser) {
    try {
      await signInAnonymously(auth);
    } catch {
      // Ignore if anonymous auth is restricted
    }
  }
}

// Helper: Get local synced posts
function getLocalSyncedPosts(): ForumPost[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_POSTS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch {}
  return [];
}

// Helper: Save local synced posts
function saveLocalSyncedPosts(posts: ForumPost[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_POSTS_KEY, JSON.stringify(posts));
    window.dispatchEvent(new CustomEvent('forum_posts_synced', { detail: posts }));
  } catch {}
}

// Helper: Get local comments
function getLocalSyncedComments(postId: string): ForumComment[] {
  try {
    const raw = localStorage.getItem(`${LOCAL_STORAGE_COMMENTS_KEY}_${postId}`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}
  return DEFAULT_COMMUNITY_COMMENTS[postId] || [];
}

// Helper: Save local comments
function saveLocalSyncedComments(postId: string, comments: ForumComment[]) {
  try {
    localStorage.setItem(`${LOCAL_STORAGE_COMMENTS_KEY}_${postId}`, JSON.stringify(comments));
    window.dispatchEvent(new CustomEvent('forum_comments_synced', { detail: { postId, comments } }));
  } catch {}
}

export class ForumService {
  // Subscribe to real-time posts from Firestore with seamless local merging
  static subscribePosts(onUpdate: (posts: ForumPost[]) => void) {
    // Initial immediate deliver from cache or starter posts
    const localCached = getLocalSyncedPosts();
    const initialList = localCached.length > 0 ? localCached : DEFAULT_COMMUNITY_POSTS;
    onUpdate(initialList);

    // Also listen to local window sync events across tabs
    const handleLocalSync = (e: any) => {
      if (e.detail && Array.isArray(e.detail)) {
        onUpdate(e.detail);
      }
    };
    window.addEventListener('forum_posts_synced', handleLocalSync);

    try {
      const postsCol = collection(db, FORUM_POSTS_COLLECTION);
      let q;
      try {
        q = query(postsCol, orderBy('createdAt', 'desc'));
      } catch {
        q = postsCol;
      }

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const fetchedPosts: ForumPost[] = snapshot.docs.map((docSnap) => {
              const data = docSnap.data();
              const upvotedBy = Array.isArray(data.upvotedBy) ? data.upvotedBy : (Array.isArray(data.likedBy) ? data.likedBy : []);
              const downvotedBy = Array.isArray(data.downvotedBy) ? data.downvotedBy : [];
              const rawScore = typeof data.score === 'number' 
                ? data.score 
                : typeof data.likesCount === 'number' 
                ? data.likesCount 
                : (upvotedBy.length - downvotedBy.length);

              return {
                id: docSnap.id,
                userId: data.userId || 'anon',
                userName: data.userName || 'Entusiasta',
                userEmail: data.userEmail || '',
                userRole: data.userRole || 'subscriber',
                category: data.category || 'general',
                tag: data.tag || 'General',
                flair: data.flair || data.tag || 'Debate',
                title: data.title || '',
                content: data.content || '',
                carModel: data.carModel || '',
                recommendationUrl: data.recommendationUrl || '',
                recommendationType: data.recommendationType || '',
                createdAt: data.createdAt || new Date().toISOString(),
                likesCount: upvotedBy.length,
                likedBy: upvotedBy,
                score: rawScore,
                upvotedBy,
                downvotedBy,
                commentsCount: typeof data.commentsCount === 'number' ? data.commentsCount : 0,
                pinned: !!data.pinned,
              };
            });

            // Combine fetched Firestore posts with local starter discussions if not duplicate
            const mergedMap = new Map<string, ForumPost>();
            fetchedPosts.forEach(p => mergedMap.set(p.id, p));
            DEFAULT_COMMUNITY_POSTS.forEach(p => {
              if (!mergedMap.has(p.id)) {
                mergedMap.set(p.id, p);
              }
            });

            const mergedList = Array.from(mergedMap.values()).sort((a, b) => {
              if (a.pinned && !b.pinned) return -1;
              if (!a.pinned && b.pinned) return 1;
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            });

            saveLocalSyncedPosts(mergedList);
            onUpdate(mergedList);
          } else {
            // If collection is completely empty, serve starter posts
            saveLocalSyncedPosts(DEFAULT_COMMUNITY_POSTS);
            onUpdate(DEFAULT_COMMUNITY_POSTS);
          }
        },
        (error) => {
          console.warn('Firestore posts subscription notice, using synchronized local store:', error);
          const cached = getLocalSyncedPosts();
          onUpdate(cached.length > 0 ? cached : DEFAULT_COMMUNITY_POSTS);
        }
      );

      return () => {
        unsubscribe();
        window.removeEventListener('forum_posts_synced', handleLocalSync);
      };
    } catch (err) {
      console.warn('Could not initialize snapshot:', err);
      const cached = getLocalSyncedPosts();
      onUpdate(cached.length > 0 ? cached : DEFAULT_COMMUNITY_POSTS);
      return () => {
        window.removeEventListener('forum_posts_synced', handleLocalSync);
      };
    }
  }

  // Subscribe to comments for a specific post
  static subscribeComments(postId: string, onUpdate: (comments: ForumComment[]) => void) {
    const initialComments = getLocalSyncedComments(postId);
    onUpdate(initialComments);

    const handleCommentSync = (e: any) => {
      if (e.detail && e.detail.postId === postId && Array.isArray(e.detail.comments)) {
        onUpdate(e.detail.comments);
      }
    };
    window.addEventListener('forum_comments_synced', handleCommentSync);

    try {
      const commentsRef = collection(db, FORUM_POSTS_COLLECTION, postId, 'comments');
      let q;
      try {
        q = query(commentsRef, orderBy('createdAt', 'asc'));
      } catch {
        q = commentsRef;
      }

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const fetchedComments: ForumComment[] = snapshot.docs.map((docSnap) => {
              const data = docSnap.data();
              const upvotedBy = Array.isArray(data.upvotedBy) ? data.upvotedBy : [];
              const downvotedBy = Array.isArray(data.downvotedBy) ? data.downvotedBy : [];
              const score = typeof data.score === 'number' ? data.score : (upvotedBy.length - downvotedBy.length);

              return {
                id: docSnap.id,
                postId,
                userId: data.userId || '',
                userName: data.userName || 'Entusiasta',
                userEmail: data.userEmail || '',
                userRole: data.userRole || 'subscriber',
                content: data.content || '',
                createdAt: data.createdAt || new Date().toISOString(),
                score,
                upvotedBy,
                downvotedBy,
                parentId: data.parentId || null,
              };
            });

            // Merge with local starter comments for this post if not present
            const starterForPost = DEFAULT_COMMUNITY_COMMENTS[postId] || [];
            const commMap = new Map<string, ForumComment>();
            fetchedComments.forEach(c => commMap.set(c.id, c));
            starterForPost.forEach(c => {
              if (!commMap.has(c.id)) commMap.set(c.id, c);
            });

            const mergedComments = Array.from(commMap.values()).sort(
              (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );

            saveLocalSyncedComments(postId, mergedComments);
            onUpdate(mergedComments);
          } else {
            const starterForPost = DEFAULT_COMMUNITY_COMMENTS[postId] || [];
            onUpdate(starterForPost);
          }
        },
        (error) => {
          console.warn('Firestore comments snapshot notice:', error);
          const current = getLocalSyncedComments(postId);
          onUpdate(current);
        }
      );

      return () => {
        unsubscribe();
        window.removeEventListener('forum_comments_synced', handleCommentSync);
      };
    } catch (err) {
      console.warn('Could not initialize comments snapshot:', err);
      const current = getLocalSyncedComments(postId);
      onUpdate(current);
      return () => {
        window.removeEventListener('forum_comments_synced', handleCommentSync);
      };
    }
  }

  // Create a new forum post
  static async createPost(postData: Omit<ForumPost, 'id' | 'likesCount' | 'likedBy' | 'commentsCount' | 'score' | 'upvotedBy' | 'downvotedBy'>): Promise<string> {
    await ensureFirebaseAuth();

    const newPost: ForumPost = {
      ...postData,
      id: `post_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      score: 1,
      likesCount: 1,
      likedBy: [postData.userId],
      upvotedBy: [postData.userId],
      downvotedBy: [],
      commentsCount: 0,
      pinned: postData.pinned || false,
      createdAt: new Date().toISOString(),
    };

    // Update local cache immediately
    const existingPosts = getLocalSyncedPosts();
    const updatedPosts = [newPost, ...existingPosts.filter(p => p.id !== newPost.id)];
    saveLocalSyncedPosts(updatedPosts);

    // Sync to Firestore
    try {
      const docRef = await addDoc(collection(db, FORUM_POSTS_COLLECTION), newPost);
      if (docRef.id) {
        newPost.id = docRef.id;
        const reIndexedPosts = [newPost, ...existingPosts.filter(p => p.id !== newPost.id)];
        saveLocalSyncedPosts(reIndexedPosts);
        return docRef.id;
      }
    } catch (error) {
      console.warn('Firestore write notice (saved to local sync store):', error);
    }

    return newPost.id;
  }

  // Reddit-style vote on a post (up, down, neutral)
  static async votePost(
    postId: string, 
    userId: string, 
    direction: 'up' | 'down' | 'none', 
    currentUpvotedBy: string[] = [], 
    currentDownvotedBy: string[] = []
  ) {
    let newUpvotes = currentUpvotedBy.filter(id => id !== userId);
    let newDownvotes = currentDownvotedBy.filter(id => id !== userId);

    if (direction === 'up') {
      newUpvotes.push(userId);
    } else if (direction === 'down') {
      newDownvotes.push(userId);
    }

    const newScore = newUpvotes.length - newDownvotes.length;

    // Update local sync store
    const existingPosts = getLocalSyncedPosts();
    const postIdx = existingPosts.findIndex(p => p.id === postId);
    if (postIdx >= 0) {
      existingPosts[postIdx] = {
        ...existingPosts[postIdx],
        upvotedBy: newUpvotes,
        downvotedBy: newDownvotes,
        likedBy: newUpvotes,
        likesCount: newUpvotes.length,
        score: newScore,
      };
      saveLocalSyncedPosts(existingPosts);
    }

    await ensureFirebaseAuth();
    try {
      const postRef = doc(db, FORUM_POSTS_COLLECTION, postId);
      await updateDoc(postRef, {
        upvotedBy: newUpvotes,
        downvotedBy: newDownvotes,
        likedBy: newUpvotes,
        likesCount: newUpvotes.length,
        score: newScore,
      });
    } catch (error) {
      console.warn('Firestore vote notice (applied locally):', error);
    }
  }

  // Vote on a comment
  static async voteComment(
    postId: string,
    commentId: string,
    userId: string,
    direction: 'up' | 'down' | 'none',
    currentUpvotedBy: string[] = [],
    currentDownvotedBy: string[] = []
  ) {
    let newUpvotes = currentUpvotedBy.filter(id => id !== userId);
    let newDownvotes = currentDownvotedBy.filter(id => id !== userId);

    if (direction === 'up') {
      newUpvotes.push(userId);
    } else if (direction === 'down') {
      newDownvotes.push(userId);
    }

    const newScore = newUpvotes.length - newDownvotes.length;

    // Update local comments store
    const existingComments = getLocalSyncedComments(postId);
    const commIdx = existingComments.findIndex(c => c.id === commentId);
    if (commIdx >= 0) {
      existingComments[commIdx] = {
        ...existingComments[commIdx],
        upvotedBy: newUpvotes,
        downvotedBy: newDownvotes,
        score: newScore,
      };
      saveLocalSyncedComments(postId, existingComments);
    }

    await ensureFirebaseAuth();
    try {
      const commentRef = doc(db, FORUM_POSTS_COLLECTION, postId, 'comments', commentId);
      await updateDoc(commentRef, {
        upvotedBy: newUpvotes,
        downvotedBy: newDownvotes,
        score: newScore,
      });
    } catch (error) {
      console.warn('Firestore comment vote notice:', error);
    }
  }

  // Add comment to a post
  static async addComment(postId: string, commentData: Omit<ForumComment, 'id' | 'postId'>): Promise<string> {
    await ensureFirebaseAuth();

    const newComment: ForumComment = {
      ...commentData,
      id: `comm_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      postId,
      score: 1,
      upvotedBy: [commentData.userId],
      downvotedBy: [],
      parentId: commentData.parentId || null,
      createdAt: new Date().toISOString(),
    };

    // Update local comment store immediately
    const existingComments = getLocalSyncedComments(postId);
    const updatedComments = [...existingComments, newComment];
    saveLocalSyncedComments(postId, updatedComments);

    // Increment commentsCount in local posts
    const existingPosts = getLocalSyncedPosts();
    const postIdx = existingPosts.findIndex(p => p.id === postId);
    if (postIdx >= 0) {
      existingPosts[postIdx].commentsCount = (existingPosts[postIdx].commentsCount || 0) + 1;
      saveLocalSyncedPosts(existingPosts);
    }

    // Sync to Firestore
    try {
      const commentsRef = collection(db, FORUM_POSTS_COLLECTION, postId, 'comments');
      const docRef = await addDoc(commentsRef, newComment);
      if (docRef.id) {
        newComment.id = docRef.id;
      }

      // Update post comments count in Firestore
      try {
        const postRef = doc(db, FORUM_POSTS_COLLECTION, postId);
        const postSnap = await getDocs(collection(db, FORUM_POSTS_COLLECTION));
        const postDoc = postSnap.docs.find(d => d.id === postId);
        if (postDoc) {
          const currentCount = postDoc.data().commentsCount || 0;
          await updateDoc(postRef, {
            commentsCount: currentCount + 1,
          });
        }
      } catch {}

      return newComment.id;
    } catch (error) {
      console.warn('Firestore comment write notice:', error);
      return newComment.id;
    }
  }

  // Delete a post
  static async deletePost(postId: string) {
    const existingPosts = getLocalSyncedPosts();
    const filtered = existingPosts.filter(p => p.id !== postId);
    saveLocalSyncedPosts(filtered);

    await ensureFirebaseAuth();
    try {
      const postRef = doc(db, FORUM_POSTS_COLLECTION, postId);
      await deleteDoc(postRef);
    } catch (error) {
      console.warn('Firestore delete notice:', error);
    }
  }

  // Delete a comment
  static async deleteComment(postId: string, commentId: string) {
    const existingComments = getLocalSyncedComments(postId);
    const filtered = existingComments.filter(c => c.id !== commentId);
    saveLocalSyncedComments(postId, filtered);

    await ensureFirebaseAuth();
    try {
      const commentRef = doc(db, FORUM_POSTS_COLLECTION, postId, 'comments', commentId);
      await deleteDoc(commentRef);
    } catch (error) {
      console.warn('Firestore delete comment notice:', error);
    }
  }
}
