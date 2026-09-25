import React, { useState, useEffect } from 'react';
import { HomeView } from './views/HomeView';
import { DesignSystemView } from './views/DesignSystemView';
import { ArrowLeft, Home } from 'lucide-react';

export function App() {
  const [view, setView] = useState<'home' | 'design-system'>(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#design-system') {
      return 'design-system';
    }
    return 'home';
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#design-system') {
        setView('design-system');
      } else if (window.location.hash === '' || window.location.hash === '#overview') {
        setView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (targetView: 'home' | 'design-system') => {
    setView(targetView);
    window.location.hash = targetView === 'design-system' ? '#design-system' : '#overview';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {view === 'design-system' ? (
        <div className="relative">
          <div className="fixed top-4 left-4 z-[50]">
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-surface/90 backdrop-blur-xl border border-white/20 text-xs font-bold uppercase tracking-wider text-white hover:text-brand-volt hover:border-brand-volt transition-all shadow-2xl"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          </div>
          <DesignSystemView />
        </div>
      ) : (
        <HomeView onOpenDesignSystem={() => navigateTo('design-system')} />
      )}
    </div>
  );
}

export default App;
