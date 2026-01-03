import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import TrainingSession from './components/TrainingSession';
import { GameMetadata } from './types';
import { Brain, Languages } from 'lucide-react';
import { LanguageProvider, useTranslation } from './contexts/LanguageContext';

const AppContent: React.FC = () => {
  const [activeGame, setActiveGame] = useState<GameMetadata | null>(null);
  const { language, setLanguage, t } = useTranslation();

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">

      {/* Navigation / Brand Header - Only show if no game is active */}
      {!activeGame && (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 text-blue-600">
              <Brain size={32} />
              <span className="text-xl font-bold tracking-tight text-slate-800">{t('appTitle')}</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="hidden md:flex gap-6 text-sm font-medium text-slate-500">
                <span className="hover:text-blue-600 cursor-pointer transition">{t('stats')}</span>
                <span className="hover:text-blue-600 cursor-pointer transition">{t('history')}</span>
                <span className="hover:text-blue-600 cursor-pointer transition">{t('settings')}</span>
              </div>
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 rounded-full transition-colors"
                title={t('language')}
              >
                <Languages size={16} />
                <span>{language === 'zh' ? t('english') : t('chinese')}</span>
              </button>
            </div>
          </div>
        </header>
      )}

      <main>
        {activeGame ? (
          <TrainingSession
            game={activeGame}
            onExit={() => setActiveGame(null)}
          />
        ) : (
          <Dashboard onSelectGame={setActiveGame} />
        )}
      </main>

    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
