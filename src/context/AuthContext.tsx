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

// Helper to prevent Firestore from hanging the entire application
const runWithTimeout = <T,>(promise: Promise<T>, timeoutMs = 2500, fallback: T): Promise<T> => {
  return Promise.race([
    promise,
    new Promise<T>((resolve) => setTimeout(() => resolve(fallback), timeoutMs))
  ]).catch(() => fallback);
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState<UserInboxNotification[]>([]);
  const [subscribersList, setSubscribersList] = useState<UserProfile[]>([]);
  const [subscribersCount, setSubscribersCount] = useState<number>(0);
  const [broadcastsList, setBroadcastsList] = useState<BroadcastMessage[]>([]);

  const adminEmails = ['autonoticiascontacto@gmail.com', 'autonoticias@gmail.com', 'lucasandressoriapaz@gmail.com'];

  const checkIsAdmin = (emailToCheck?: string | null, roleToCheck?: string) => {
    if (!emailToCheck) return roleToCheck === 'admin';
    const cleanEmail = emailToCheck.toLowerCase().trim();
    return adminEmails.includes(cleanEmail) || roleToCheck === 'admin';
  };

  const isAdmin = Boolean(
    checkIsAdmin(user?.email, userProfile?.role)
  );

  // Sync user profile document in Firestore with instant local update
  const syncUserProfile = async (firebaseUser: User) => {
    const isCurrentAdmin = checkIsAdmin(firebaseUser.email);
    
    // 1. Immediately create and apply profile in state so UI never lags
    const immediateProfile: UserProfile = {
      uid: firebaseUser.uid,
      email: firebaseUser.email || '',
      displayName: firebaseUser.displayName || (isCurrentAdmin ? 'Admin AutoArchive' : firebaseUser.email?.split('@')[0] || 'Suscriptor'),
      role: isCurrentAdmin ? 'admin' : 'subscriber',
      receiveDocumentaryAlerts: true,
      receiveFactsAlerts: true,
      createdAt: new Date().toISOString(),
    };

    setUserProfile((prev) => (prev?.uid === firebaseUser.uid ? prev : immediateProfile));

    // 2. Safely sync to Firestore in the background with timeout
    try {
      const userRef = doc(db, 'users', firebaseUser.uid);
      const userSnap = await runWithTimeout(getDoc(userRef), 2000, null);

      if (userSnap && userSnap.exists()) {
        const data = userSnap.data() as Omit<UserProfile, 'uid'>;
        const finalProfile: UserProfile = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: data.displayName || firebaseUser.displayName || (isCurrentAdmin ? 'Admin AutoArchive' : 'Suscriptor'),
          role: isCurrentAdmin ? 'admin' : (data.role || 'subscriber'),
          receiveDocumentaryAlerts: data.receiveDocumentaryAlerts ?? true,
          receiveFactsAlerts: data.receiveFactsAlerts ?? true,
          createdAt: data.createdAt || new Date().toISOString(),
        };

        if (isCurrentAdmin && data.role !== 'admin') {
          updateDoc(userRef, { role: 'admin' }).catch(() => {});
        }

        setUserProfile(finalProfile);
      } else if (userSnap) {
        // Document does not exist, save initial profile
        setDoc(userRef, {
          email: immediateProfile.email,
          displayName: immediateProfile.displayName,
          role: immediateProfile.role,
          receiveDocumentaryAlerts: immediateProfile.receiveDocumentaryAlerts,
          receiveFactsAlerts: immediateProfile.receiveFactsAlerts,
          createdAt: immediateProfile.createdAt,
        }).catch(() => {});
      }
    } catch (err) {
      console.warn('Firestore sync fallback used:', err);
    }
  };

  // Auth state listener with local storage backup
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await syncUserProfile(currentUser);
      } else {
        // Check for local guest / custom user in localStorage
        try {
          const storedLocalUser = localStorage.getItem('autoarchive_local_user');
          if (storedLocalUser) {
            const parsed = JSON.parse(storedLocalUser);
            const isCurrentAdmin = checkIsAdmin(parsed.email, parsed.role);
            const mockUser = {
              uid: parsed.uid,
              email: parsed.email || '',
              displayName: parsed.displayName || 'Suscriptor',
              isAnonymous: Boolean(parsed.isGuest),
              photoURL: null,
            } as unknown as User;

            setUser(mockUser);
            setUserProfile({
              uid: parsed.uid,
              email: parsed.email || '',
              displayName: parsed.displayName || 'Suscriptor',
              role: isCurrentAdmin ? 'admin' : (parsed.role || 'subscriber'),
              receiveDocumentaryAlerts: parsed.receiveDocumentaryAlerts ?? true,
              receiveFactsAlerts: parsed.receiveFactsAlerts ?? true,
              createdAt: parsed.createdAt || new Date().toISOString(),
            });
          } else {
            setUser(null);
            setUserProfile(null);
            setNotifications([]);
          }
        } catch {
          setUser(null);
          setUserProfile(null);
        }
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
        console.warn('Broadcasts listener:', error);
      });

      return () => unsubBroadcasts();
    } catch (err) {
      console.warn('Broadcasts init error:', err);
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
        console.warn('Notifications listener:', error);
      });

      return () => unsubNotif();
    } catch (err) {
      console.warn('Notifications init error:', err);
    }
  }, [user]);

  // Refresh subscribers count & list
  const refreshSubscribers = async () => {
    try {
      const usersRef = collection(db, 'users');
      const snap = await runWithTimeout(getDocs(usersRef), 2000, null);
      if (snap) {
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
      }
    } catch (err) {
      console.warn('Refresh subscribers error:', err);
    }
  };

  useEffect(() => {
    if (user) {
      refreshSubscribers();
    }
  }, [user]);

  // Auth functions
  const loginWithGoogle = async () => {
    const cred = await signInWithPopup(auth, googleProvider);
    localStorage.removeItem('autoarchive_local_user');
    setUser(cred.user);
    // Sync profile immediately without blocking Google login return
    syncUserProfile(cred.user);
    refreshSubscribers().catch(() => {});
  };

  const loginWithEmail = async (email: string, pass: string) => {
    const cleanEmail = email.trim().toLowerCase();
    try {
      const cred = await signInWithEmailAndPassword(auth, cleanEmail, pass);
      localStorage.removeItem('autoarchive_local_user');
      setUser(cred.user);
      await syncUserProfile(cred.user);
    } catch (err: unknown) {
      const error = err as { code?: string; message?: string };
      // If Firebase Auth provider is not enabled, use instant local accounts
      if (error.code === 'auth/operation-not-allowed' || error.code === 'auth/network-request-failed') {
        const localUsers = JSON.parse(localStorage.getItem('autoarchive_registered_users') || '{}');
        if (localUsers[cleanEmail] && localUsers[cleanEmail].password === pass) {
          const userData = localUsers[cleanEmail];
          const isCurrentAdmin = checkIsAdmin(cleanEmail, userData.role);
          const mockUser = {
            uid: userData.uid,
            email: cleanEmail,
            displayName: userData.displayName,
            isAnonymous: false,
            photoURL: null,
          } as unknown as User;

          setUser(mockUser);
          setUserProfile({
            uid: userData.uid,
            email: cleanEmail,
            displayName: userData.displayName,
            role: isCurrentAdmin ? 'admin' : 'subscriber',
            receiveDocumentaryAlerts: true,
            receiveFactsAlerts: true,
            createdAt: userData.createdAt,
          });
          localStorage.setItem('autoarchive_local_user', JSON.stringify({
            uid: userData.uid,
            email: cleanEmail,
            displayName: userData.displayName,
            role: isCurrentAdmin ? 'admin' : 'subscriber',
          }));
          return;
        } else if (!localUsers[cleanEmail]) {
          // Auto-create local user session if not exists
          const uid = 'user_' + Math.random().toString(36).substring(2, 9);
          const isCurrentAdmin = checkIsAdmin(cleanEmail);
          const displayName = cleanEmail.split('@')[0];
          localUsers[cleanEmail] = { uid, email: cleanEmail, password: pass, displayName, createdAt: new Date().toISOString() };
          localStorage.setItem('autoarchive_registered_users', JSON.stringify(localUsers));

          const mockUser = { uid, email: cleanEmail, displayName, isAnonymous: false, photoURL: null } as unknown as User;
          setUser(mockUser);
          setUserProfile({
            uid,
            email: cleanEmail,
            displayName,
            role: isCurrentAdmin ? 'admin' : 'subscriber',
            receiveDocumentaryAlerts: true,
            receiveFactsAlerts: true,
            createdAt: new Date().toISOString(),
          });
          localStorage.setItem('autoarchive_local_user', JSON.stringify({ uid, email: cleanEmail, displayName, role: isCurrentAdmin ? 'admin' : 'subscriber' }));
          return;
        }
      }
      throw err;
    }
  };

  const registerWithEmail = async (
    email: string,
    pass: string,
    name: string,
    docAlerts = true,
    factsAlerts = true
  ) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim() || cleanEmail.split('@')[0] || 'Suscriptor';
    const isCurrentAdmin = checkIsAdmin(cleanEmail);

    try {
      const cred = await createUserWithEmailAndPassword(auth, cleanEmail, pass);
      localStorage.removeItem('autoarchive_local_user');
      if (cleanName) {
        updateProfile(cred.user, { displayName: cleanName }).catch(() => {});
      }

      setUser(cred.user);
      const profileData: Omit<UserProfile, 'uid'> = {
        email: cred.user.email || cleanEmail,
        displayName: cleanName,
        role: isCurrentAdmin ? 'admin' : 'subscriber',
        receiveDocumentaryAlerts: docAlerts,
        receiveFactsAlerts: factsAlerts,
        createdAt: new Date().toISOString(),
      };

      setUserProfile({ uid: cred.user.uid, ...profileData });

      // Save to Firestore in background
      const userRef = doc(db, 'users', cred.user.uid);
      setDoc(userRef, profileData).catch(() => {});
      refreshSubscribers().catch(() => {});
    } catch (err: unknown) {
      const error = err as { code?: string; message?: string };
      // Fallback local registration if Firebase provider is restricted
      if (error.code === 'auth/operation-not-allowed' || error.code === 'auth/network-request-failed' || error.code === 'auth/configuration-not-found') {
        const uid = 'user_' + Math.random().toString(36).substring(2, 9);
        const localUsers = JSON.parse(localStorage.getItem('autoarchive_registered_users') || '{}');
        localUsers[cleanEmail] = {
          uid,
          email: cleanEmail,
          password: pass,
          displayName: cleanName,
          role: isCurrentAdmin ? 'admin' : 'subscriber',
          createdAt: new Date().toISOString()
        };
        localStorage.setItem('autoarchive_registered_users', JSON.stringify(localUsers));

        const mockUser = { uid, email: cleanEmail, displayName: cleanName, isAnonymous: false, photoURL: null } as unknown as User;
        setUser(mockUser);
        setUserProfile({
          uid,
          email: cleanEmail,
          displayName: cleanName,
          role: isCurrentAdmin ? 'admin' : 'subscriber',
          receiveDocumentaryAlerts: docAlerts,
          receiveFactsAlerts: factsAlerts,
          createdAt: new Date().toISOString(),
        });
        localStorage.setItem('autoarchive_local_user', JSON.stringify({
          uid,
          email: cleanEmail,
          displayName: cleanName,
          role: isCurrentAdmin ? 'admin' : 'subscriber',
        }));
        return;
      }
      throw err;
    }
  };

  const loginAsGuest = async (alias?: string) => {
    const guestName = alias?.trim() || `Lector_${Math.floor(1000 + Math.random() * 9000)}`;
    try {
      const cred = await signInAnonymously(auth);
      localStorage.removeItem('autoarchive_local_user');
      updateProfile(cred.user, { displayName: guestName }).catch(() => {});
      setUser(cred.user);
      syncUserProfile(cred.user);
    } catch (err) {
      console.warn('Anonymous auth falling back to instant local guest:', err);
      const guestUid = 'guest_' + Math.random().toString(36).substring(2, 9);
      const mockUser = {
        uid: guestUid,
        email: '',
        displayName: guestName,
        isAnonymous: true,
        photoURL: null,
      } as unknown as User;

      setUser(mockUser);
      setUserProfile({
        uid: guestUid,
        email: '',
        displayName: guestName,
        role: 'subscriber',
        receiveDocumentaryAlerts: true,
        receiveFactsAlerts: true,
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem('autoarchive_local_user', JSON.stringify({
        uid: guestUid,
        email: '',
        displayName: guestName,
        role: 'subscriber',
        isGuest: true
      }));
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.warn('SignOut error:', err);
    }
    localStorage.removeItem('autoarchive_local_user');
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
      updateDoc(userRef, {
        receiveDocumentaryAlerts: docAlerts,
        receiveFactsAlerts: factsAlerts,
      }).catch(() => {});

      setUserProfile((prev) => prev ? {
        ...prev,
        receiveDocumentaryAlerts: docAlerts,
        receiveFactsAlerts: factsAlerts,
      } : null);
    } catch (err) {
      console.error('Error updating preferences:', err);
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
        updateProfile(user, { displayName: cleanName }).catch(() => {});
        payloadToUpdate.displayName = cleanName;
      }

      if (updates.receiveDocumentaryAlerts !== undefined) {
        payloadToUpdate.receiveDocumentaryAlerts = updates.receiveDocumentaryAlerts;
      }

      if (updates.receiveFactsAlerts !== undefined) {
        payloadToUpdate.receiveFactsAlerts = updates.receiveFactsAlerts;
      }

      if (Object.keys(payloadToUpdate).length > 0) {
        updateDoc(userRef, payloadToUpdate).catch(() => {});
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

      refreshSubscribers().catch(() => {});
    } catch (err) {
      console.error('Error updating user profile:', err);
    }
  };

  const sendBroadcastEmail = async (
    broadcast: Omit<BroadcastMessage, 'id' | 'sentAt' | 'recipientCount' | 'status'>
  ) => {
    const sentAt = new Date().toISOString();
    const usersRef = collection(db, 'users');
    const snap = await runWithTimeout(getDocs(usersRef), 2500, null);
    
    let eligibleSubscribers: { uid: string; email: string; displayName: string }[] = [];

    if (snap) {
      snap.forEach((d) => {
        const data = d.data();
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
    }

    const recipientCount = Math.max(eligibleSubscribers.length, 1);
    const officialSenderEmail = 'autonoticiascontacto@gmail.com';
    const officialSenderName = userProfile?.displayName || 'AutoNoticias Oficial';

    const broadcastsRef = collection(db, 'broadcasts');
    const docRef = await addDoc(broadcastsRef, {
      ...broadcast,
      senderEmail: broadcast.senderEmail || officialSenderEmail,
      senderName: broadcast.senderName || officialSenderName,
      sentAt,
      recipientCount,
      status: 'sent',
    });

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
        console.warn(`Delivery error ${sub.uid}:`, err);
      }
    });

    await Promise.all(deliverPromises);
    refreshSubscribers().catch(() => {});

    return { recipientCount };
  };

  const markNotificationAsRead = async (notificationId: string) => {
    if (!user) return;
    try {
      const notifRef = doc(db, 'users', user.uid, 'notifications', notificationId);
      updateDoc(notifRef, { read: true }).catch(() => {});
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
