import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import TrainingSession from './components/TrainingSession';
import { GameMetadata } from './types';
import { Brain } from 'lucide-react';

const App: React.FC = () => {
  const [activeGame, setActiveGame] = useState<GameMetadata | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Navigation / Brand Header - Only show if no game is active */}
      {!activeGame && (
        <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 text-blue-600">
              <Brain size={32} />
              <span className="text-xl font-bold tracking-tight text-slate-800">CogniTrain</span>
            </div>
            <div className="hidden md:flex gap-6 text-sm font-medium text-slate-500">
              <span className="hover:text-blue-600 cursor-pointer transition">Stats</span>
              <span className="hover:text-blue-600 cursor-pointer transition">History</span>
              <span className="hover:text-blue-600 cursor-pointer transition">Settings</span>
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

export default App;
