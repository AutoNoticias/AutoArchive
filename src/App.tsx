import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RoutePage } from './types';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { DocumentalesPage } from './components/DocumentalesPage';
import { Xj220DocumentaryPage } from './components/Xj220DocumentaryPage';
import { F40MiuraDocumentaryPage } from './components/F40MiuraDocumentaryPage';
import { CountachDocumentaryPage } from './components/CountachDocumentaryPage';
import { R34DocumentaryPage } from './components/R34DocumentaryPage';
import { SupraDocumentaryPage } from './components/SupraDocumentaryPage';
import { Mazda787bDocumentaryPage } from './components/Mazda787bDocumentaryPage';
import { NsxDocumentaryPage } from './components/NsxDocumentaryPage';
import { CamaroMustangDocumentaryPage } from './components/CamaroMustangDocumentaryPage';
import { DatosPage } from './components/DatosPage';
import { ForoPage } from './components/ForoPage';
import { AdminPanelPage } from './components/AdminPanelPage';
import { AuthModal } from './components/AuthModal';
import { AdminTopBroadcastBar } from './components/AdminTopBroadcastBar';
import { AdminEmailBroadcastModal } from './components/AdminEmailBroadcastModal';
import { WelcomeNotificationModal } from './components/WelcomeNotificationModal';
import { UserProfileModal } from './components/UserProfileModal';

function AppContent() {
  const { user, loading, isAdmin } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalReason, setAuthModalReason] = useState<string | undefined>(undefined);
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isAdminBroadcastModalOpen, setIsAdminBroadcastModalOpen] = useState(false);

  // Sync state with URL hash
  const getInitialPage = (): RoutePage => {
    const hash = window.location.hash.replace('#', '');
    if (
      hash === 'documentales' ||
      hash === 'camaro-mustang' ||
      hash === 'nsx' ||
      hash === 'mazda-787b' ||
      hash === 'supra' ||
      hash === 'r34' ||
      hash === 'countach' ||
      hash === 'f40-miura' ||
      hash === 'xj220' ||
      hash === 'datos' ||
      hash === 'foro' ||
      hash === 'admin-panel' ||
      hash === 'home'
    ) {
      return hash as RoutePage;
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<RoutePage>(getInitialPage);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (
        hash === 'documentales' ||
        hash === 'camaro-mustang' ||
        hash === 'nsx' ||
        hash === 'mazda-787b' ||
        hash === 'supra' ||
        hash === 'r34' ||
        hash === 'countach' ||
        hash === 'f40-miura' ||
        hash === 'xj220' ||
        hash === 'datos' ||
        hash === 'foro' ||
        hash === 'admin-panel' ||
        hash === 'home'
      ) {
        setCurrentPage(hash as RoutePage);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: RoutePage) => {
    if (page === 'foro' && !user) {
      handleOpenAuthModal('Debes iniciar sesión para acceder al foro comunitario');
      return;
    }
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!loading && currentPage === 'foro' && !user) {
      handleNavigate('home');
    }
  }, [currentPage, user, loading]);

  const handleOpenAuthModal = (reason?: string) => {
    setAuthModalReason(typeof reason === 'string' ? reason : undefined);
    setIsAuthModalOpen(true);
  };

  const handleOpenAccountModal = () => {
    if (!user) {
      handleOpenAuthModal('Inicia sesión para gestionar tu cuenta');
    } else {
      setIsAccountModalOpen(true);
    }
  };

  const handleOpenBroadcastModal = () => {
    setIsAdminBroadcastModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#080808]">
      {/* Top Admin Broadcast Bar (Visible only when logged in as autonoticiascontacto@gmail.com) */}
      {isAdmin && (
        <AdminTopBroadcastBar
          onOpenBroadcastModal={handleOpenBroadcastModal}
        />
      )}

      {/* Global Responsive Navigation */}
      <Navigation
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenAuthModal={handleOpenAuthModal}
        onOpenAccountModal={handleOpenAccountModal}
      />

      {/* Global Auth / Registration Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
          setAuthModalReason(undefined);
        }}
        customMessage={authModalReason}
      />

      {/* User Account / Profile & Inbox Modal */}
      <UserProfileModal
        isOpen={isAccountModalOpen}
        onClose={() => setIsAccountModalOpen(false)}
        onNavigate={handleNavigate}
        onOpenBroadcastModal={handleOpenBroadcastModal}
      />

      {/* Admin Email Broadcast Modal */}
      <AdminEmailBroadcastModal
        isOpen={isAdminBroadcastModalOpen}
        onClose={() => setIsAdminBroadcastModalOpen(false)}
      />

      {/* Welcome Notification Modal for Unauthenticated Users */}
      {!loading && !user && (
        <WelcomeNotificationModal onOpenAuthModal={handleOpenAuthModal} />
      )}

      {/* Dynamic View Rendering with Page Transition Animations */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
          {currentPage === 'home' && (
            <HomePage
              onNavigate={handleNavigate}
              onOpenAuthModal={handleOpenAuthModal}
              onOpenAccountModal={handleOpenAccountModal}
              onOpenBroadcastModal={handleOpenBroadcastModal}
            />
          )}
          {currentPage === 'documentales' && (
            <DocumentalesPage
              onNavigate={handleNavigate}
              onOpenAuthModal={handleOpenAuthModal}
              onOpenAccountModal={handleOpenAccountModal}
              onOpenBroadcastModal={handleOpenBroadcastModal}
            />
          )}
          {currentPage === 'xj220' && (
            <Xj220DocumentaryPage onNavigate={handleNavigate} onOpenAuthModal={handleOpenAuthModal} />
          )}
          {currentPage === 'f40-miura' && (
            <F40MiuraDocumentaryPage onNavigate={handleNavigate} onOpenAuthModal={handleOpenAuthModal} />
          )}
          {currentPage === 'countach' && (
            <CountachDocumentaryPage onNavigate={handleNavigate} onOpenAuthModal={handleOpenAuthModal} />
          )}
          {currentPage === 'r34' && (
            <R34DocumentaryPage onNavigate={handleNavigate} onOpenAuthModal={handleOpenAuthModal} />
          )}
          {currentPage === 'supra' && (
            <SupraDocumentaryPage onNavigate={handleNavigate} onOpenAuthModal={handleOpenAuthModal} />
          )}
          {currentPage === 'mazda-787b' && (
            <Mazda787bDocumentaryPage onNavigate={handleNavigate} onOpenAuthModal={handleOpenAuthModal} />
          )}
          {currentPage === 'camaro-mustang' && (
            <CamaroMustangDocumentaryPage onNavigate={handleNavigate} onOpenAuthModal={handleOpenAuthModal} />
          )}
          {currentPage === 'nsx' && (
            <NsxDocumentaryPage onNavigate={handleNavigate} onOpenAuthModal={handleOpenAuthModal} />
          )}
          {currentPage === 'datos' && (
            <DatosPage
              onNavigate={handleNavigate}
              onOpenAuthModal={handleOpenAuthModal}
              onOpenAccountModal={handleOpenAccountModal}
              onOpenBroadcastModal={handleOpenBroadcastModal}
            />
          )}
          {currentPage === 'foro' && (
            <ForoPage
              onNavigate={handleNavigate}
              onOpenAuthModal={handleOpenAuthModal}
              onOpenAccountModal={handleOpenAccountModal}
              onOpenBroadcastModal={handleOpenBroadcastModal}
            />
          )}
          {currentPage === 'admin-panel' && (
            <AdminPanelPage
              onNavigate={handleNavigate}
              onOpenBroadcastModal={handleOpenBroadcastModal}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
