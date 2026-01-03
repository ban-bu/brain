import React, { useState, useEffect, useCallback } from 'react';
import { GameSessionProps } from '../../types';

const GRID_SIZE = 5;
const TOTAL_NUMBERS = GRID_SIZE * GRID_SIZE;

const SchulteTable: React.FC<GameSessionProps> = ({ onComplete }) => {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [nextNumber, setNextNumber] = useState(1);
  const [startTime, setStartTime] = useState<number>(0);
  const [elapsed, setElapsed] = useState(0);
  const [mistake, setMistake] = useState<number | null>(null);

  const shuffle = (array: number[]) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
  };

  useEffect(() => {
    const nums = Array.from({ length: TOTAL_NUMBERS }, (_, i) => i + 1);
    setNumbers(shuffle(nums));
    setStartTime(Date.now());
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed((Date.now() - startTime) / 1000);
    }, 100);
    return () => clearInterval(timer);
  }, [startTime]);

  const handleCellClick = (num: number) => {
    if (num === nextNumber) {
      if (num === TOTAL_NUMBERS) {
        onComplete(Math.round(elapsed));
      } else {
        setNextNumber(prev => prev + 1);
      }
      setMistake(null);
    } else {
      setMistake(num);
      setTimeout(() => setMistake(null), 300);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-lg mx-auto w-full">
      <div className="mb-4 md:mb-6 flex justify-between w-full items-center px-2 md:px-4">
        <div className="text-lg md:text-xl font-bold text-slate-700 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
          寻找: <span className="text-blue-600 text-xl md:text-2xl">{nextNumber}</span>
        </div>
        <div className="text-lg md:text-xl font-mono text-slate-500 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-100">
          {elapsed.toFixed(1)} <span className="text-sm text-slate-400">秒</span>
        </div>
      </div>
      
      <div className="grid grid-cols-5 gap-1.5 md:gap-3 w-full aspect-square bg-white p-2 md:p-4 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
        {numbers.map((num) => (
          <button
            key={num}
            onClick={() => handleCellClick(num)}
            className={`
              flex items-center justify-center text-xl md:text-3xl font-bold rounded-lg md:rounded-xl transition-all duration-100
              aspect-square touch-manipulation
              ${nextNumber > num ? 'bg-slate-50 text-slate-200' : 'bg-slate-100 text-slate-800 hover:bg-blue-50 active:bg-blue-100'}
              ${mistake === num ? 'bg-red-200 animate-shake text-red-700' : ''}
            `}
          >
            {num}
          </button>
        ))}
      </div>
      <p className="mt-6 md:mt-8 text-slate-400 text-xs md:text-sm text-center font-medium">
        保持视线在中心，用余光搜索
      </p>
      
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out; }
      `}</style>
    </div>
  );
};

export default SchulteTable;