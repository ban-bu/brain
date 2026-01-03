import React, { useState, useEffect, useCallback } from 'react';
import { GameSessionProps } from '../../types';

const COLORS = [
  { name: '红', hex: '#ef4444' },
  { name: '蓝', hex: '#3b82f6' },
  { name: '绿', hex: '#22c55e' },
  { name: '黄', hex: '#eab308' },
  { name: '紫', hex: '#a855f7' },
];

const GAME_DURATION = 60; // seconds

const StroopTest: React.FC<GameSessionProps> = ({ onComplete }) => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [currentWord, setCurrentWord] = useState(COLORS[0]);
  const [currentColor, setCurrentColor] = useState(COLORS[1]);
  const [options, setOptions] = useState<typeof COLORS>([]);
  const [gameFinished, setGameFinished] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  const generateTurn = useCallback(() => {
    const wordIdx = Math.floor(Math.random() * COLORS.length);
    const colorIdx = Math.floor(Math.random() * COLORS.length);
    
    // Ensure variety, but sometimes they match (rarely, to trick user)
    setCurrentWord(COLORS[wordIdx]);
    setCurrentColor(COLORS[colorIdx]);

    // Generate options: Correct Answer + 2 Random
    const correctAnswer = COLORS[colorIdx];
    const otherOptions = COLORS.filter(c => c.name !== correctAnswer.name)
                               .sort(() => 0.5 - Math.random())
                               .slice(0, 2);
    
    const turnOptions = [correctAnswer, ...otherOptions].sort(() => 0.5 - Math.random());
    setOptions(turnOptions);
  }, []);

  useEffect(() => {
    generateTurn();
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setGameFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 当游戏结束时调用 onComplete，传递最终分数和统计数据
  useEffect(() => {
    if (gameFinished) {
      const totalAttempts = correctCount + wrongCount;
      const accuracy = totalAttempts > 0 ? Math.round((correctCount / totalAttempts) * 100) : 0;
      onComplete(score, {
        correct: correctCount,
        wrong: wrongCount,
        totalAttempts,
        accuracy
      });
    }
  }, [gameFinished, score, correctCount, wrongCount, onComplete]);

  const handleOptionClick = (selectedColorName: string) => {
    if (selectedColorName === currentColor.name) {
      setScore(s => s + 10);
      setCorrectCount(c => c + 1);
    } else {
      setScore(s => Math.max(0, s - 5));
      setWrongCount(c => c + 1);
    }
    generateTurn();
  };

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-lg mx-auto w-full">
      <div className="w-full flex justify-between mb-8 px-4">
        <div className="text-lg md:text-xl font-bold text-slate-700 bg-white px-4 py-2 rounded-xl shadow-sm">
          分数: {score}
        </div>
        <div className={`text-lg md:text-xl font-bold font-mono bg-white px-4 py-2 rounded-xl shadow-sm ${timeLeft < 10 ? 'text-red-500' : 'text-slate-600'}`}>
          00:{timeLeft.toString().padStart(2, '0')}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <div className="text-center mb-12 md:mb-16 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 bg-white rounded-full shadow-2xl shadow-slate-200 z-0"></div>
          <p className="relative z-10 text-slate-400 mb-4 text-xs md:text-sm font-medium">选择这个字的<span className="text-slate-800 font-bold">颜色</span></p>
          <div 
            className="relative z-10 text-7xl md:text-9xl font-black transition-colors duration-200"
            style={{ color: currentColor.hex }}
          >
            {currentWord.name}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 md:gap-4 w-full">
          {options.map((opt) => (
            <button
              key={opt.name}
              onClick={() => handleOptionClick(opt.name)}
              className="py-4 md:py-6 rounded-2xl bg-white shadow-sm border-2 border-slate-100 hover:shadow-lg hover:border-slate-300 transition-all text-lg md:text-2xl font-bold text-slate-700 active:scale-95 touch-manipulation"
            >
              {opt.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StroopTest;