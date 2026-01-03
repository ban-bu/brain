import React, { useState } from 'react';
import { GameType, GameMetadata } from '../types';
import { X, Play, BookOpen, FlaskConical, CheckCircle2 } from 'lucide-react';
import SchulteTable from './games/SchulteTable';
import StroopTest from './games/StroopTest';
import SerialMemory from './games/SerialMemory';
import AuditoryAttention from './games/AuditoryAttention';
import MirrorCoordination from './games/MirrorCoordination';
import LogicClassification from './games/LogicClassification';
import ContextAssociation from './games/ContextAssociation';

interface TrainingSessionProps {
  game: GameMetadata;
  onExit: () => void;
}

const TrainingSession: React.FC<TrainingSessionProps> = ({ game, onExit }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [gameStats, setGameStats] = useState<any>(null);

  const handleComplete = (score: number, data?: any) => {
    setFinalScore(score);
    setGameStats(data);
    setIsFinished(true);
  };

  const renderGame = () => {
    const props = { onComplete: handleComplete, onExit };
    
    switch (game.id) {
      case GameType.SCHULTE: return <SchulteTable {...props} />;
      case GameType.STROOP: return <StroopTest {...props} />;
      case GameType.SERIAL_MEMORY: return <SerialMemory {...props} />;
      case GameType.AUDITORY_ATTENTION: return <AuditoryAttention {...props} />;
      case GameType.MIRROR_COORDINATION: return <MirrorCoordination {...props} />;
      case GameType.LOGIC_CLASSIFICATION: return <LogicClassification {...props} />;
      case GameType.CONTEXT_MEMORY: return <ContextAssociation {...props} />;
      default: return <div>Game not implemented</div>;
    }
  };

  // Intro Screen
  if (!hasStarted) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col md:flex-row overflow-hidden">
        {/* Left Side (Top on Mobile): Visual & Header */}
        <div className={`w-full md:w-1/3 bg-gradient-to-br ${game.color} p-6 md:p-12 text-white flex flex-col justify-between relative overflow-hidden shrink-0`}>
           <div className="absolute top-0 left-0 w-full h-full bg-black/10 z-0"></div>
           <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
           
           <div className="relative z-10">
             <div className="flex justify-between items-start mb-6 md:mb-8">
                <div className="p-3 md:p-4 bg-white/20 rounded-2xl backdrop-blur-md shadow-lg">
                    <game.icon size={32} className="md:w-12 md:h-12" strokeWidth={1.5} />
                </div>
                <button onClick={onExit} className="p-2 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition">
                    <X size={20} className="md:w-6 md:h-6" />
                </button>
             </div>
             
             <h1 className="text-3xl md:text-5xl font-bold mb-1 md:mb-2">{game.title}</h1>
             <p className="text-lg md:text-xl opacity-90 font-medium">{game.subtitle}</p>
           </div>

           <div className="relative z-10 mt-6 md:mt-0 hidden md:block">
              <div className="flex gap-2 flex-wrap">
                {game.benefits.map(b => (
                  <span key={b} className="px-3 py-1 bg-black/20 rounded-lg text-sm font-medium backdrop-blur-sm border border-white/10">
                    {b}
                  </span>
                ))}
              </div>
           </div>
        </div>

        {/* Right Side (Bottom on Mobile): Content */}
        <div className="w-full md:w-2/3 bg-slate-50 p-5 md:p-12 overflow-y-auto flex-1">
          <div className="max-w-2xl mx-auto space-y-6 md:space-y-8 pb-8">
            
            {/* Mobile Benefits (Visible only on small screens) */}
            <div className="flex gap-2 flex-wrap md:hidden">
                {game.benefits.map(b => (
                  <span key={b} className="px-2.5 py-1 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-bold shadow-sm">
                    {b}
                  </span>
                ))}
            </div>

            {/* Instructions */}
            <section className="bg-white p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-3 md:mb-4 flex items-center gap-2">
                <CheckCircle2 className="text-blue-500 w-5 h-5 md:w-6 md:h-6" /> 训练指南
              </h3>
              <ul className="space-y-3">
                {game.howToPlay.map((step, idx) => (
                  <li key={idx} className="flex gap-3 text-sm md:text-base text-slate-600 leading-relaxed">
                    <span className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 bg-slate-100 text-slate-500 rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                      {idx + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
            </section>

            {/* Science */}
            <section className="bg-white p-5 md:p-8 rounded-2xl md:rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-3 md:mb-4 flex items-center gap-2">
                <FlaskConical className="text-purple-500 w-5 h-5 md:w-6 md:h-6" /> 科学原理
              </h3>
              <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-4">
                {game.science}
              </p>
              <div className="text-[10px] md:text-xs text-slate-400 bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-start gap-2">
                <BookOpen size={14} className="mt-0.5 flex-shrink-0" />
                <span className="italic">{game.citation}</span>
              </div>
            </section>

            {/* Action */}
            <button 
              onClick={() => setHasStarted(true)}
              className={`w-full py-3.5 md:py-4 rounded-xl font-bold text-lg text-white shadow-lg shadow-blue-500/20 bg-gradient-to-r ${game.color} hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 sticky bottom-0 md:static z-20`}
            >
              <Play fill="currentColor" size={20} /> 开始训练
            </button>
            {/* Spacer for sticky button on mobile */}
            <div className="h-4 md:hidden"></div>
          </div>
        </div>
      </div>
    );
  }

  // Finished Screen
  if (isFinished) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8 text-center">
          <div className={`w-16 h-16 md:w-20 md:h-20 mx-auto bg-gradient-to-br ${game.color} rounded-full flex items-center justify-center text-white mb-6 shadow-lg`}>
            <game.icon size={32} className="md:w-10 md:h-10" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">训练完成!</h2>
          <p className="text-slate-500 mb-8 text-sm md:text-base">本次训练效果显著，大脑皮层活跃度提升。</p>
          
          <div className="bg-slate-50 rounded-2xl p-6 mb-8">
            <span className="text-sm text-slate-400 uppercase tracking-wider font-bold">最终得分</span>
            <div className="text-4xl md:text-5xl font-black text-slate-900 mt-2">{finalScore}</div>
          </div>

          {/* 斯特鲁普效应详细统计 */}
          {game.id === GameType.STROOP && gameStats && (
            <div className="bg-slate-50 rounded-2xl p-6 mb-8 space-y-4">
              <h3 className="text-lg font-bold text-slate-800 mb-4">详细统计</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{gameStats.correct}</div>
                  <div className="text-sm text-slate-500">正确题数</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{gameStats.wrong}</div>
                  <div className="text-sm text-slate-500">错误题数</div>
                </div>
                <div className="text-center col-span-2">
                  <div className="text-3xl font-bold text-blue-600">{gameStats.accuracy}%</div>
                  <div className="text-sm text-slate-500">正确率</div>
                </div>
              </div>
            </div>
          )}

          <button 
            onClick={onExit}
            className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition active:scale-95"
          >
            返回主页
          </button>
        </div>
      </div>
    );
  }

  // Active Game
  return (
    <div className="fixed inset-0 bg-slate-50 z-50 flex flex-col">
      {/* Minimal Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <div className={`p-1.5 rounded-lg text-white bg-gradient-to-br ${game.color}`}>
            <game.icon size={18} />
          </div>
          <h2 className="font-bold text-slate-800 text-sm md:text-base">{game.title}</h2>
        </div>
        <button 
          onClick={onExit}
          className="p-2 hover:bg-slate-100 rounded-full transition text-slate-400 hover:text-slate-600 active:bg-slate-200"
        >
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 p-3 md:p-4 overflow-y-auto overflow-x-hidden flex flex-col items-center">
        {renderGame()}
      </div>
    </div>
  );
};

export default TrainingSession;