import { useState, useEffect } from 'react';
import { RoutePage } from './types';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { DocumentalesPage } from './components/DocumentalesPage';
import { Xj220DocumentaryPage } from './components/Xj220DocumentaryPage';
import { F40MiuraDocumentaryPage } from './components/F40MiuraDocumentaryPage';
import { CountachDocumentaryPage } from './components/CountachDocumentaryPage';
import { DatosPage } from './components/DatosPage';

export default function App() {
  // Sync state with URL hash (e.g. #documentales, #xj220, #f40-miura, #countach, #datos, #home)
  const getInitialPage = (): RoutePage => {
    const hash = window.location.hash.replace('#', '');
    if (
      hash === 'documentales' ||
      hash === 'xj220' ||
      hash === 'f40-miura' ||
      hash === 'countach' ||
      hash === 'datos' ||
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
        hash === 'xj220' ||
        hash === 'f40-miura' ||
        hash === 'countach' ||
        hash === 'datos' ||
        hash === 'home'
      ) {
        setCurrentPage(hash as RoutePage);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: RoutePage) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#080808]">
      {/* Global Responsive Navigation (Drawer on Mobile, Seamless) */}
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Dynamic View Rendering */}
      {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
      {currentPage === 'documentales' && <DocumentalesPage onNavigate={handleNavigate} />}
      {currentPage === 'xj220' && <Xj220DocumentaryPage onNavigate={handleNavigate} />}
      {currentPage === 'f40-miura' && <F40MiuraDocumentaryPage onNavigate={handleNavigate} />}
      {currentPage === 'countach' && <CountachDocumentaryPage onNavigate={handleNavigate} />}
      {currentPage === 'datos' && <DatosPage onNavigate={handleNavigate} />}
    </div>
  );
}
