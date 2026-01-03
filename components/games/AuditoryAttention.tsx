import React, { useState, useEffect, useRef } from 'react';
import { GameSessionProps } from '../../types';
import { Volume2, Play } from 'lucide-react';

const AuditoryAttention: React.FC<GameSessionProps> = ({ onComplete }) => {
  const [level, setLevel] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [sequence, setSequence] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);

  const generateSequence = (len: number) => {
    return Array.from({ length: len }, () => Math.floor(Math.random() * 10));
  };

  const playSequence = (seq: number[]) => {
    setIsPlaying(true);
    setShowInput(false);
    setInputValue("");
    
    let i = 0;
    const interval = setInterval(() => {
      if (i >= seq.length) {
        clearInterval(interval);
        setIsPlaying(false);
        setShowInput(true);
        return;
      }

      // Use Chinese text for numbers to ensure correct pronunciation locale
      const utterance = new SpeechSynthesisUtterance(seq[i].toString());
      utterance.lang = 'zh-CN'; 
      utterance.rate = 1.0; 
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
      i++;
    }, 1500); // 1.5s gap between numbers
  };

  const startLevel = () => {
    const len = 3 + Math.floor(level / 2);
    const newSeq = generateSequence(len);
    setSequence(newSeq);
    playSequence(newSeq);
  };

  useEffect(() => {
    // Initial start
    startLevel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Exact match check
    if (inputValue === sequence.join('')) {
      setFeedback("正确!");
      setTimeout(() => {
        setFeedback(null);
        setLevel(l => l + 1);
        setTimeout(() => startLevel(), 500); // Start next level after brief pause
      }, 1000);
    } else {
      setFeedback(`错误。正确答案是: ${sequence.join(' ')}`);
      setTimeout(() => {
        onComplete(level * 10);
      }, 2500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-md mx-auto w-full">
      <div className="mb-8 md:mb-12 relative">
        <div className={`p-8 md:p-10 rounded-full shadow-2xl transition-all duration-500 ${isPlaying ? 'bg-amber-100 text-amber-600 scale-110' : 'bg-white text-slate-300'}`}>
          <Volume2 size={48} className="md:w-16 md:h-16" />
        </div>
        {isPlaying && (
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 text-sm text-amber-500 font-bold animate-bounce whitespace-nowrap">
            正在朗读...
          </div>
        )}
      </div>

      <div className="w-full text-center px-4">
        <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">第 {level} 关</h3>
        <p className="text-slate-500 mb-6 md:mb-8 text-sm md:text-base">听数字，然后按顺序输入。</p>

        {showInput ? (
          <form onSubmit={handleSubmit} className="w-full">
             <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full text-center text-3xl md:text-4xl tracking-[0.3em] md:tracking-[0.5em] p-3 md:p-4 border-2 border-slate-200 rounded-2xl focus:border-amber-400 focus:ring-4 focus:ring-amber-100 focus:outline-none mb-6 text-slate-800 font-mono transition-all"
              placeholder=""
              autoFocus
            />
            <button 
              type="submit"
              className="w-full bg-slate-900 text-white font-bold py-3 md:py-4 rounded-xl hover:bg-slate-800 transition shadow-lg shadow-slate-200 active:scale-95"
            >
              提交答案
            </button>
          </form>
        ) : (
           <div className="h-16 flex items-center justify-center">
             {!isPlaying && <button onClick={() => playSequence(sequence)} className="flex items-center gap-2 text-slate-500 hover:text-amber-600 transition font-medium"><Play size={18}/> 重听一遍</button>}
           </div>
        )}

        {feedback && (
          <div className={`mt-6 font-bold text-lg p-3 rounded-lg ${feedback === "正确!" ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
            {feedback}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditoryAttention;