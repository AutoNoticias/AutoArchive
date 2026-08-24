import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInAnonymously,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  onSnapshot,
  orderBy
} from 'firebase/firestore';
import { auth, googleProvider, db } from '../firebase';
import { UserProfile, BroadcastMessage, UserInboxNotification } from '../types';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  isAdmin: boolean;
  loading: boolean;
  notifications: UserInboxNotification[];
  unreadCount: number;
  subscribersCount: number;
  subscribersList: UserProfile[];
  broadcastsList: BroadcastMessage[];
  loginWithEmail: (email: string, pass: string) => Promise<void>;
  registerWithEmail: (email: string, pass: string, name: string, docAlerts?: boolean, factsAlerts?: boolean) => Promise<void>;
  loginAsGuest: (alias?: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePreferences: (docAlerts: boolean, factsAlerts: boolean) => Promise<void>;
  updateUserProfile: (updates: { displayName?: string; receiveDocumentaryAlerts?: boolean; receiveFactsAlerts?: boolean }) => Promise<void>;
  sendBroadcastEmail: (broadcast: Omit<BroadcastMessage, 'id' | 'sentAt' | 'recipientCount' | 'status'>) => Promise<{ recipientCount: number }>;
  markNotificationAsRead: (notificationId: string) => Promise<void>;
  markAllNotificationsAsRead: () => Promise<void>;
  refreshSubscribers: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<UserInboxNotification[]>([]);
  const [subscribersList, setSubscribersList] = useState<UserProfile[]>([]);
  const [subscribersCount, setSubscribersCount] = useState<number>(0);
  const [broadcastsList, setBroadcastsList] = useState<BroadcastMessage[]>([]);

  const adminEmails = ['autonoticiascontacto@gmail.com', 'autonoticias@gmail.com'];

  const checkIsAdmin = (emailToCheck?: string | null, roleToCheck?: string) => {
    if (!emailToCheck) return roleToCheck === 'admin';
    const cleanEmail = emailToCheck.toLowerCase().trim();
    return adminEmails.includes(cleanEmail) || roleToCheck === 'admin';
  };

  const isAdmin = Boolean(
    checkIsAdmin(user?.email, userProfile?.role)
  );

  // Sync user profile document in Firestore
  const syncUserProfile = async (firebaseUser: User) => {
    try {
      const userRef = doc(db, 'users', firebaseUser.uid);
      const userSnap = await getDoc(userRef);

      const isCurrentAdmin = checkIsAdmin(firebaseUser.email);

      if (userSnap.exists()) {
        const data = userSnap.data() as Omit<UserProfile, 'uid'>;
        const profile: UserProfile = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: data.displayName || firebaseUser.displayName || (isCurrentAdmin ? 'Admin AutoArchive' : 'Suscriptor'),
          role: isCurrentAdmin ? 'admin' : (data.role || 'subscriber'),
          receiveDocumentaryAlerts: data.receiveDocumentaryAlerts ?? true,
          receiveFactsAlerts: data.receiveFactsAlerts ?? true,
          createdAt: data.createdAt || new Date().toISOString(),
        };

        // If admin email, ensure role in Firestore is updated to admin
        if (isCurrentAdmin && data.role !== 'admin') {
          await updateDoc(userRef, { role: 'admin' });
        }

        setUserProfile(profile);
      } else {
        // Create initial profile
        const newProfile: UserProfile = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || (isCurrentAdmin ? 'Admin AutoArchive' : firebaseUser.email?.split('@')[0] || 'Suscriptor'),
          role: isCurrentAdmin ? 'admin' : 'subscriber',
          receiveDocumentaryAlerts: true,
          receiveFactsAlerts: true,
          createdAt: new Date().toISOString(),
        };

        await setDoc(userRef, {
          email: newProfile.email,
          displayName: newProfile.displayName,
          role: newProfile.role,
          receiveDocumentaryAlerts: newProfile.receiveDocumentaryAlerts,
          receiveFactsAlerts: newProfile.receiveFactsAlerts,
          createdAt: newProfile.createdAt,
        });

        setUserProfile(newProfile);
      }
    } catch (err) {
      console.error('Error syncing user profile:', err);
      // Fallback local profile
      const isCurrentAdmin = checkIsAdmin(firebaseUser.email);
      setUserProfile({
        uid: firebaseUser.uid,
        email: firebaseUser.email || '',
        displayName: firebaseUser.displayName || (isCurrentAdmin ? 'Admin AutoArchive' : 'Suscriptor'),
        role: isCurrentAdmin ? 'admin' : 'subscriber',
        receiveDocumentaryAlerts: true,
        receiveFactsAlerts: true,
        createdAt: new Date().toISOString(),
      });
    }
  };

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await syncUserProfile(currentUser);
      } else {
        setUserProfile(null);
        setNotifications([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Listen to broadcasts collection in real-time
  useEffect(() => {
    try {
      const broadcastsRef = collection(db, 'broadcasts');
      const q = query(broadcastsRef, orderBy('sentAt', 'desc'));
      const unsubBroadcasts = onSnapshot(q, (snapshot) => {
        const list: BroadcastMessage[] = [];
        snapshot.forEach((docSnap) => {
          list.push({
            id: docSnap.id,
            ...(docSnap.data() as Omit<BroadcastMessage, 'id'>)
          });
        });
        setBroadcastsList(list);
      }, (error) => {
        console.warn('Could not listen to broadcasts in realtime:', error);
      });

      return () => unsubBroadcasts();
    } catch (err) {
      console.warn('Broadcasts listener init error:', err);
    }
  }, []);

  // Listen to user notifications
  useEffect(() => {
    if (!user) {
      setNotifications([]);
      return;
    }

    try {
      const notifRef = collection(db, 'users', user.uid, 'notifications');
      const q = query(notifRef, orderBy('receivedAt', 'desc'));
      const unsubNotif = onSnapshot(q, (snapshot) => {
        const notifs: UserInboxNotification[] = [];
        snapshot.forEach((docSnap) => {
          notifs.push({
            id: docSnap.id,
            ...(docSnap.data() as Omit<UserInboxNotification, 'id'>)
          });
        });
        setNotifications(notifs);
      }, (error) => {
        console.warn('Could not listen to notifications in realtime:', error);
      });

      return () => unsubNotif();
    } catch (err) {
      console.warn('Notifications listener init error:', err);
    }
  }, [user]);

  // Refresh subscribers count & list
  const refreshSubscribers = async () => {
    try {
      const usersRef = collection(db, 'users');
      const snap = await getDocs(usersRef);
      const list: UserProfile[] = [];
      snap.forEach((docSnap) => {
        const data = docSnap.data() as Omit<UserProfile, 'uid'>;
        list.push({
          uid: docSnap.id,
          email: data.email || '',
          displayName: data.displayName || 'Suscriptor',
          role: data.role || 'subscriber',
          receiveDocumentaryAlerts: data.receiveDocumentaryAlerts ?? true,
          receiveFactsAlerts: data.receiveFactsAlerts ?? true,
          createdAt: data.createdAt || new Date().toISOString(),
        });
      });
      setSubscribersList(list);
      setSubscribersCount(list.length);
    } catch (err) {
      console.error('Error refreshing subscribers:', err);
    }
  };

  useEffect(() => {
    refreshSubscribers();
  }, [user]);

  // Auth functions
  const loginWithEmail = async (email: string, pass: string) => {
    const cred = await signInWithEmailAndPassword(auth, email.trim(), pass);
    await syncUserProfile(cred.user);
  };

  const registerWithEmail = async (
    email: string,
    pass: string,
    name: string,
    docAlerts = true,
    factsAlerts = true
  ) => {
    const cred = await createUserWithEmailAndPassword(auth, email.trim(), pass);
    if (name.trim()) {
      await updateProfile(cred.user, { displayName: name.trim() });
    }

    const userRef = doc(db, 'users', cred.user.uid);
    const isCurrentAdmin = checkIsAdmin(cred.user.email);
    const profileData: Omit<UserProfile, 'uid'> = {
      email: cred.user.email || email.trim(),
      displayName: name.trim() || (isCurrentAdmin ? 'Admin AutoArchive' : cred.user.email?.split('@')[0] || 'Suscriptor'),
      role: isCurrentAdmin ? 'admin' : 'subscriber',
      receiveDocumentaryAlerts: docAlerts,
      receiveFactsAlerts: factsAlerts,
      createdAt: new Date().toISOString(),
    };

    await setDoc(userRef, profileData);
    setUserProfile({ uid: cred.user.uid, ...profileData });
    await refreshSubscribers();
  };

  const loginAsGuest = async (alias?: string) => {
    const cred = await signInAnonymously(auth);
    const guestName = alias?.trim() || `Lector_${Math.floor(1000 + Math.random() * 9000)}`;
    try {
      await updateProfile(cred.user, { displayName: guestName });
    } catch {
      // Continue even if updateProfile fails
    }
    await syncUserProfile(cred.user);
    await refreshSubscribers();
  };

  const loginWithGoogle = async () => {
    const cred = await signInWithPopup(auth, googleProvider);
    await syncUserProfile(cred.user);
    await refreshSubscribers();
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setUserProfile(null);
    setNotifications([]);
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email.trim());
  };

  const updatePreferences = async (docAlerts: boolean, factsAlerts: boolean) => {
    if (!user) return;
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        receiveDocumentaryAlerts: docAlerts,
        receiveFactsAlerts: factsAlerts,
      });
      setUserProfile((prev) => prev ? {
        ...prev,
        receiveDocumentaryAlerts: docAlerts,
        receiveFactsAlerts: factsAlerts,
      } : null);
    } catch (err) {
      console.error('Error updating preferences:', err);
      throw err;
    }
  };

  const updateUserProfile = async (updates: {
    displayName?: string;
    receiveDocumentaryAlerts?: boolean;
    receiveFactsAlerts?: boolean;
  }) => {
    if (!user) return;
    try {
      const userRef = doc(db, 'users', user.uid);
      const payloadToUpdate: Record<string, any> = {};

      if (updates.displayName !== undefined && updates.displayName.trim() !== '') {
        const cleanName = updates.displayName.trim();
        await updateProfile(user, { displayName: cleanName });
        payloadToUpdate.displayName = cleanName;
      }

      if (updates.receiveDocumentaryAlerts !== undefined) {
        payloadToUpdate.receiveDocumentaryAlerts = updates.receiveDocumentaryAlerts;
      }

      if (updates.receiveFactsAlerts !== undefined) {
        payloadToUpdate.receiveFactsAlerts = updates.receiveFactsAlerts;
      }

      if (Object.keys(payloadToUpdate).length > 0) {
        await updateDoc(userRef, payloadToUpdate);
      }

      setUserProfile((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          displayName: payloadToUpdate.displayName ?? prev.displayName,
          receiveDocumentaryAlerts: payloadToUpdate.receiveDocumentaryAlerts ?? prev.receiveDocumentaryAlerts,
          receiveFactsAlerts: payloadToUpdate.receiveFactsAlerts ?? prev.receiveFactsAlerts,
        };
      });

      await refreshSubscribers();
    } catch (err) {
      console.error('Error updating user profile:', err);
      throw err;
    }
  };

  // Broadcast dispatch logic from autonoticias@gmail.com
  const sendBroadcastEmail = async (
    broadcast: Omit<BroadcastMessage, 'id' | 'sentAt' | 'recipientCount' | 'status'>
  ) => {
    const sentAt = new Date().toISOString();
    
    // 1. Fetch all eligible subscribers from Firestore
    const usersRef = collection(db, 'users');
    let targetDocs = await getDocs(usersRef);
    let eligibleSubscribers: { uid: string; email: string; displayName: string }[] = [];

    targetDocs.forEach((d) => {
      const data = d.data();
      const interestedInDoc = broadcast.targetAudience === 'all' || broadcast.targetAudience === 'documentales';
      const interestedInFacts = broadcast.targetAudience === 'all' || broadcast.targetAudience === 'datos';

      const wantsDoc = data.receiveDocumentaryAlerts !== false;
      const wantsFacts = data.receiveFactsAlerts !== false;

      let matches = false;
      if (broadcast.targetAudience === 'all') matches = true;
      else if (broadcast.targetAudience === 'documentales' && wantsDoc) matches = true;
      else if (broadcast.targetAudience === 'datos' && wantsFacts) matches = true;

      if (matches) {
        eligibleSubscribers.push({
          uid: d.id,
          email: data.email || '',
          displayName: data.displayName || 'Suscriptor',
        });
      }
    });

    const recipientCount = Math.max(eligibleSubscribers.length, 1);

    const officialSenderEmail = 'autonoticiascontacto@gmail.com';
    const officialSenderName = userProfile?.displayName || 'AutoNoticias Oficial';

    // 2. Save broadcast record in `broadcasts`
    const broadcastsRef = collection(db, 'broadcasts');
    const docRef = await addDoc(broadcastsRef, {
      ...broadcast,
      senderEmail: broadcast.senderEmail || officialSenderEmail,
      senderName: broadcast.senderName || officialSenderName,
      sentAt,
      recipientCount,
      status: 'sent',
    });

    // 3. Deliver in-app notification to each recipient user subcollection
    const deliverPromises = eligibleSubscribers.map(async (sub) => {
      try {
        const notifCollection = collection(db, 'users', sub.uid, 'notifications');
        await addDoc(notifCollection, {
          userId: sub.uid,
          broadcastId: docRef.id,
          senderEmail: broadcast.senderEmail || officialSenderEmail,
          senderName: broadcast.senderName || officialSenderName,
          subject: broadcast.subject,
          preview: broadcast.body.slice(0, 140) + '...',
          body: broadcast.body,
          category: broadcast.category,
          targetUrl: broadcast.targetUrl || '',
          targetName: broadcast.targetName || '',
          read: false,
          receivedAt: sentAt,
        });
      } catch (err) {
        console.warn(`Could not deliver notification to ${sub.uid}:`, err);
      }
    });

    await Promise.all(deliverPromises);
    await refreshSubscribers();

    return { recipientCount };
  };

  const markNotificationAsRead = async (notificationId: string) => {
    if (!user) return;
    try {
      const notifRef = doc(db, 'users', user.uid, 'notifications', notificationId);
      await updateDoc(notifRef, { read: true });
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
      );
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const markAllNotificationsAsRead = async () => {
    if (!user || notifications.length === 0) return;
    try {
      const updatePromises = notifications
        .filter((n) => !n.read)
        .map((n) => {
          const notifRef = doc(db, 'users', user.uid, 'notifications', n.id);
          return updateDoc(notifRef, { read: true });
        });
      await Promise.all(updatePromises);
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (err) {
      console.error('Error marking all as read:', err);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        isAdmin,
        loading,
        notifications,
        unreadCount,
        subscribersCount,
        subscribersList,
        broadcastsList,
        loginWithEmail,
        registerWithEmail,
        loginAsGuest,
        loginWithGoogle,
        logout,
        resetPassword,
        updatePreferences,
        updateUserProfile,
        sendBroadcastEmail,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        refreshSubscribers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
