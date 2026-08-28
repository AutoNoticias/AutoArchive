import { 
  collection, 
  doc, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  arrayUnion, 
  arrayRemove,
  getDocs
} from 'firebase/firestore';
import { db } from '../firebase';
import { ForumPost, ForumComment } from '../types';

const FORUM_POSTS_COLLECTION = 'forum_posts';

export class ForumService {
  // Subscribe to real-time posts from Firestore
  static subscribePosts(onUpdate: (posts: ForumPost[]) => void) {
    try {
      const q = query(collection(db, FORUM_POSTS_COLLECTION), orderBy('createdAt', 'desc'));
      
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
            onUpdate(fetchedPosts);
          } else {
            // No hardcoded examples - clean empty state for real user threads
            onUpdate([]);
          }
        },
        (error) => {
          console.warn('Firestore real-time subscription error, using local state:', error);
          onUpdate([]);
        }
      );

      return unsubscribe;
    } catch (err) {
      console.warn('Could not initialize snapshot:', err);
      onUpdate([]);
      return () => {};
    }
  }

  // Subscribe to comments for a specific post
  static subscribeComments(postId: string, onUpdate: (comments: ForumComment[]) => void) {
    try {
      const commentsRef = collection(db, FORUM_POSTS_COLLECTION, postId, 'comments');
      const q = query(commentsRef, orderBy('createdAt', 'asc'));

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
            onUpdate(fetchedComments);
          } else {
            onUpdate([]);
          }
        },
        (error) => {
          console.warn('Firestore comments snapshot error, using empty state:', error);
          onUpdate([]);
        }
      );

      return unsubscribe;
    } catch (err) {
      console.warn('Could not initialize comments snapshot:', err);
      onUpdate([]);
      return () => {};
    }
  }

  // Create a new forum post
  static async createPost(postData: Omit<ForumPost, 'id' | 'likesCount' | 'likedBy' | 'commentsCount' | 'score' | 'upvotedBy' | 'downvotedBy'>): Promise<string> {
    try {
      const newPost = {
        ...postData,
        score: 1,
        likesCount: 1,
        likedBy: [postData.userId],
        upvotedBy: [postData.userId],
        downvotedBy: [],
        commentsCount: 0,
        pinned: postData.pinned || false,
        createdAt: new Date().toISOString(),
      };

      const docRef = await addDoc(collection(db, FORUM_POSTS_COLLECTION), newPost);
      return docRef.id;
    } catch (error) {
      console.error('Error creating post in Firestore:', error);
      throw error;
    }
  }

  // Reddit-style vote on a post (up, down, neutral)
  static async votePost(
    postId: string, 
    userId: string, 
    direction: 'up' | 'down' | 'none', 
    currentUpvotedBy: string[] = [], 
    currentDownvotedBy: string[] = []
  ) {
    try {
      const postRef = doc(db, FORUM_POSTS_COLLECTION, postId);
      let newUpvotes = currentUpvotedBy.filter(id => id !== userId);
      let newDownvotes = currentDownvotedBy.filter(id => id !== userId);

      if (direction === 'up') {
        newUpvotes.push(userId);
      } else if (direction === 'down') {
        newDownvotes.push(userId);
      }

      const newScore = newUpvotes.length - newDownvotes.length;

      await updateDoc(postRef, {
        upvotedBy: newUpvotes,
        downvotedBy: newDownvotes,
        likedBy: newUpvotes,
        likesCount: newUpvotes.length,
        score: newScore,
      });
    } catch (error) {
      console.warn('Error voting on post in Firestore (fallback applied):', error);
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
    try {
      const commentRef = doc(db, FORUM_POSTS_COLLECTION, postId, 'comments', commentId);
      let newUpvotes = currentUpvotedBy.filter(id => id !== userId);
      let newDownvotes = currentDownvotedBy.filter(id => id !== userId);

      if (direction === 'up') {
        newUpvotes.push(userId);
      } else if (direction === 'down') {
        newDownvotes.push(userId);
      }

      const newScore = newUpvotes.length - newDownvotes.length;

      await updateDoc(commentRef, {
        upvotedBy: newUpvotes,
        downvotedBy: newDownvotes,
        score: newScore,
      });
    } catch (error) {
      console.warn('Error voting on comment in Firestore:', error);
    }
  }

  // Add comment to a post
  static async addComment(postId: string, commentData: Omit<ForumComment, 'id' | 'postId'>): Promise<string> {
    try {
      const newComment = {
        ...commentData,
        postId,
        score: 1,
        upvotedBy: [commentData.userId],
        downvotedBy: [],
        parentId: commentData.parentId || null,
        createdAt: new Date().toISOString(),
      };

      const commentsRef = collection(db, FORUM_POSTS_COLLECTION, postId, 'comments');
      const docRef = await addDoc(commentsRef, newComment);

      // Increment comments count on post doc
      try {
        const postRef = doc(db, FORUM_POSTS_COLLECTION, postId);
        const postSnap = await getDocs(query(collection(db, FORUM_POSTS_COLLECTION)));
        const postDoc = postSnap.docs.find(d => d.id === postId);
        if (postDoc) {
          const currentCount = postDoc.data().commentsCount || 0;
          await updateDoc(postRef, {
            commentsCount: currentCount + 1,
          });
        }
      } catch (countErr) {
        console.warn('Could not update comment count on post doc:', countErr);
      }

      return docRef.id;
    } catch (error) {
      console.error('Error adding comment to Firestore:', error);
      throw error;
    }
  }

  // Delete a post
  static async deletePost(postId: string) {
    try {
      const postRef = doc(db, FORUM_POSTS_COLLECTION, postId);
      await deleteDoc(postRef);
    } catch (error) {
      console.error('Error deleting post:', error);
      throw error;
    }
  }

  // Delete a comment
  static async deleteComment(postId: string, commentId: string) {
    try {
      const commentRef = doc(db, FORUM_POSTS_COLLECTION, postId, 'comments', commentId);
      await deleteDoc(commentRef);
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  }
}
