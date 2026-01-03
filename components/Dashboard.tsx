import React from 'react';
import { GameMetadata } from '../types';
import { GAMES } from '../constants';
import { Clock, ArrowRight, Activity } from 'lucide-react';

interface DashboardProps {
  onSelectGame: (game: GameMetadata) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectGame }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-12 pb-20">
      <div className="mb-8 md:mb-12 text-center md:text-left space-y-3 md:space-y-4">
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          认知潜能训练 <span className="block md:inline text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">CogniTrain</span>
        </h1>
        <p className="text-slate-500 text-base md:text-xl max-w-3xl leading-relaxed mx-auto md:mx-0">
          基于神经科学原理设计的综合训练套件。
          <span className="hidden md:inline"><br/></span>
          坚持训练可增强神经可塑性、提升专注力与记忆力。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {GAMES.map((game) => (
          <button
            key={game.id}
            onClick={() => onSelectGame(game)}
            className="group relative flex flex-col h-full bg-white rounded-2xl md:rounded-3xl p-1 shadow-sm hover:shadow-2xl transition-all duration-500 ease-out active:scale-[0.98] md:hover:-translate-y-2"
          >
            {/* Gradient Border Effect */}
            <div className={`absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm`} />
            
            <div className="flex-1 bg-white rounded-xl md:rounded-[20px] p-5 md:p-6 flex flex-col h-full overflow-hidden relative z-0">
              {/* Header */}
              <div className="flex justify-between items-start mb-4 md:mb-6">
                <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl bg-gradient-to-br ${game.color} text-white shadow-lg transform md:group-hover:scale-110 transition-transform duration-300`}>
                  <game.icon size={24} className="md:w-8 md:h-8" strokeWidth={2.5} />
                </div>
                <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold text-slate-500 bg-slate-100 px-2 md:px-3 py-1 md:py-1.5 rounded-full uppercase tracking-wider">
                  <Clock size={12} className="md:w-3.5 md:h-3.5" /> {game.duration}
                </div>
              </div>
              
              {/* Content */}
              <div className="mb-4 text-left">
                <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-slate-800 group-hover:to-blue-600 transition-colors">
                  {game.title}
                </h3>
                <p className="text-xs md:text-sm font-semibold text-blue-600/80 mb-2 md:mb-3">{game.subtitle}</p>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 md:line-clamp-3">
                  {game.description}
                </p>
              </div>

              {/* Benefits Tags */}
              <div className="mt-auto pt-4 md:pt-6 border-t border-slate-50">
                <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                  {game.benefits.slice(0, 2).map((benefit) => (
                    <span key={benefit} className="inline-flex items-center gap-1 text-[10px] md:text-[11px] font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                      <Activity size={10} className="text-blue-400" />
                      {benefit}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center text-sm font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
                  开始训练 <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;