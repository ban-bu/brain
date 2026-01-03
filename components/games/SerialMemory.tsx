import React, { useState, useEffect } from 'react';
import { GameSessionProps } from '../../types';
import { Carrot, Hammer, Armchair, Smartphone, Bike, Key, Shirt, Apple, Wrench } from 'lucide-react';
import { useTranslation } from '../../contexts/LanguageContext';

const ICONS = [
  { id: 'carrot', Icon: Carrot, cat: '食物' },
  { id: 'apple', Icon: Apple, cat: '食物' },
  { id: 'hammer', Icon: Hammer, cat: '工具' },
  { id: 'wrench', Icon: Wrench, cat: '工具' },
  { id: 'chair', Icon: Armchair, cat: '家具' },
  { id: 'phone', Icon: Smartphone, cat: '科技' },
  { id: 'bike', Icon: Bike, cat: '交通' },
  { id: 'key', Icon: Key, cat: '物品' },
  { id: 'shirt', Icon: Shirt, cat: '衣物' },
];

const STAGES = {
  MEMORIZE: 'MEMORIZE',
  RECALL: 'RECALL',
  RESULT: 'RESULT',
};

const SerialMemory: React.FC<GameSessionProps> = ({ onComplete }) => {
  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState<typeof ICONS>([]);
  const [userSequence, setUserSequence] = useState<typeof ICONS>([]);
  const [stage, setStage] = useState(STAGES.MEMORIZE);
  const [timeLeft, setTimeLeft] = useState(3);
  const [score, setScore] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const { tObj } = useTranslation();

  const startLevel = (lvl: number) => {
    const length = Math.min(2 + lvl, ICONS.length); // 确保不超过可用图标数量
    const shuffledIcons = [...ICONS].sort(() => Math.random() - 0.5);
    const newSeq = shuffledIcons.slice(0, length);
    setSequence(newSeq);
    setUserSequence([]);
    setStage(STAGES.MEMORIZE);
    setTimeLeft(2 + lvl); // More time for longer sequences
  };

  useEffect(() => {
    startLevel(level);
  }, []);

  useEffect(() => {
    if (stage === STAGES.MEMORIZE) {
      if (timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setStage(STAGES.RECALL);
      }
    }
  }, [stage, timeLeft]);

  const handleSelect = (item: typeof ICONS[0]) => {
    const newSeq = [...userSequence, item];
    setUserSequence(newSeq);

    // Check immediate validity to fail fast or complete
    if (newSeq.length === sequence.length) {
      // Check correctness
      const isCorrect = newSeq.every((it, idx) => it.id === sequence[idx].id);
      if (isCorrect) {
        setScore(s => s + (level * 10));
        setLevel(l => l + 1);
        startLevel(level + 1);
      } else {
        setGameFinished(true);
      }
    }
  };

  // 当游戏结束时调用 onComplete，传递最终分数
  useEffect(() => {
    if (gameFinished) {
      onComplete(score);
    }
  }, [gameFinished, score, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto p-4 w-full">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-slate-700 mb-2">{tObj('games.serialMemory.level', { level })}</h2>
        {stage === STAGES.MEMORIZE && (
          <p className="text-blue-600 font-bold text-lg animate-pulse">{tObj('games.serialMemory.memorizeTime', { time: timeLeft })}</p>
        )}
        {stage === STAGES.RECALL && (
          <p className="text-slate-500">{tObj('games.serialMemory.restoreSequence')}</p>
        )}
      </div>

      <div className="flex-1 w-full flex flex-col items-center">
        {stage === STAGES.MEMORIZE && (
          <div className="flex flex-wrap justify-center gap-4">
            {sequence.map((item, idx) => (
              <div key={idx} className="w-24 h-24 bg-white rounded-2xl shadow-lg shadow-slate-200 border border-slate-100 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300" style={{ animationDelay: `${idx * 150}ms`}}>
                <item.Icon size={40} className="text-slate-700 mb-2" />
                <span className="text-xs font-bold text-slate-400 uppercase">{item.cat}</span>
              </div>
            ))}
          </div>
        )}

        {stage === STAGES.RECALL && (
          <div className="w-full">
            <div className="min-h-[120px] bg-slate-100 rounded-2xl p-6 mb-8 flex gap-3 justify-center items-center border-dashed border-2 border-slate-300 flex-wrap">
               {userSequence.map((item, idx) => (
                 <div key={idx} className="bg-white p-3 rounded-xl shadow-sm animate-in fade-in zoom-in">
                   <item.Icon size={24} className="text-slate-700" />
                 </div>
               ))}
               {userSequence.length === 0 && <span className="text-slate-400 text-sm font-medium">{tObj('games.serialMemory.clickToFill')}</span>}
            </div>

            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
              {ICONS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  className="aspect-square bg-white hover:bg-blue-50 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center justify-center transition-all active:scale-95 group"
                >
                  <item.Icon size={32} className="text-slate-600 group-hover:text-blue-600 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SerialMemory;