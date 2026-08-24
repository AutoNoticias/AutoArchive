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
  getDocs,
  setDoc
} from 'firebase/firestore';
import { db, auth } from '../firebase';
import { ForumPost, ForumComment } from '../types';
import { initialForumPosts, initialForumComments } from '../data/forumInitialData';

const FORUM_POSTS_COLLECTION = 'forum_posts';

export class ForumService {
  // Subscribe to real-time posts from Firestore or fall back to merged dataset
  static subscribePosts(onUpdate: (posts: ForumPost[]) => void) {
    try {
      const q = query(collection(db, FORUM_POSTS_COLLECTION), orderBy('createdAt', 'desc'));
      
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const fetchedPosts: ForumPost[] = snapshot.docs.map((docSnap) => {
              const data = docSnap.data();
              return {
                id: docSnap.id,
                userId: data.userId || 'anon',
                userName: data.userName || 'Entusiasta',
                userEmail: data.userEmail || '',
                userRole: data.userRole || 'subscriber',
                category: data.category || 'autos',
                tag: data.tag || 'General',
                title: data.title || '',
                content: data.content || '',
                carModel: data.carModel || '',
                recommendationUrl: data.recommendationUrl || '',
                recommendationType: data.recommendationType || '',
                createdAt: data.createdAt || new Date().toISOString(),
                likesCount: typeof data.likesCount === 'number' ? data.likesCount : (data.likedBy?.length || 0),
                likedBy: Array.isArray(data.likedBy) ? data.likedBy : [],
                commentsCount: typeof data.commentsCount === 'number' ? data.commentsCount : 0,
                pinned: !!data.pinned,
              };
            });
            onUpdate(fetchedPosts);
          } else {
            // Seed initial posts or provide starter list
            onUpdate(initialForumPosts);
          }
        },
        (error) => {
          console.warn('Firestore real-time subscription error, using local data:', error);
          onUpdate(initialForumPosts);
        }
      );

      return unsubscribe;
    } catch (err) {
      console.warn('Could not initialize snapshot:', err);
      onUpdate(initialForumPosts);
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
              return {
                id: docSnap.id,
                postId,
                userId: data.userId || '',
                userName: data.userName || 'Entusiasta',
                userEmail: data.userEmail || '',
                userRole: data.userRole || 'subscriber',
                content: data.content || '',
                createdAt: data.createdAt || new Date().toISOString(),
              };
            });
            onUpdate(fetchedComments);
          } else {
            // Check initial comments
            const initial = initialForumComments[postId] || [];
            onUpdate(initial);
          }
        },
        (error) => {
          console.warn('Firestore comments snapshot error, using local fallback:', error);
          const initial = initialForumComments[postId] || [];
          onUpdate(initial);
        }
      );

      return unsubscribe;
    } catch (err) {
      const initial = initialForumComments[postId] || [];
      onUpdate(initial);
      return () => {};
    }
  }

  // Create a new forum post
  static async createPost(postData: Omit<ForumPost, 'id' | 'likesCount' | 'likedBy' | 'commentsCount'>): Promise<string> {
    try {
      const newPost = {
        ...postData,
        likesCount: 0,
        likedBy: [],
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

  // Add comment to a post
  static async addComment(postId: string, commentData: Omit<ForumComment, 'id' | 'postId'>): Promise<string> {
    try {
      const newComment = {
        ...commentData,
        postId,
        createdAt: new Date().toISOString(),
      };

      const commentsRef = collection(db, FORUM_POSTS_COLLECTION, postId, 'comments');
      const docRef = await addDoc(commentsRef, newComment);

      // Try to increment comments count on post doc
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

  // Toggle like on a post
  static async toggleLike(postId: string, userId: string, isLiked: boolean, currentCount: number) {
    try {
      const postRef = doc(db, FORUM_POSTS_COLLECTION, postId);
      if (isLiked) {
        await updateDoc(postRef, {
          likedBy: arrayRemove(userId),
          likesCount: Math.max(0, currentCount - 1),
        });
      } else {
        await updateDoc(postRef, {
          likedBy: arrayUnion(userId),
          likesCount: currentCount + 1,
        });
      }
    } catch (error) {
      console.warn('Error updating like on Firestore (fallback applied):', error);
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
}
