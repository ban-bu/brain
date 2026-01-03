import React, { useState, useEffect } from 'react';
import { GameSessionProps, LogicQuestion } from '../../types';
import { generateLogicQuestions } from '../../services/geminiService';
import { Loader2 } from 'lucide-react';

const LogicClassification: React.FC<GameSessionProps> = ({ onComplete }) => {
  const [questions, setQuestions] = useState<LogicQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      const qs = await generateLogicQuestions();
      setQuestions(qs);
      setLoading(false);
    };
    loadContent();
  }, []);

  const handleAnswer = (selected: string) => {
    if (feedback) return; // Prevent double click

    const currentQ = questions[currentIndex];
    if (selected === currentQ.correctCategory) {
      setFeedback('correct');
      setScore(s => s + 10);
    } else {
      setFeedback('wrong');
    }

    setTimeout(() => {
      setFeedback(null);
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(c => c + 1);
      } else {
        onComplete(score + (selected === currentQ.correctCategory ? 10 : 0));
      }
    }, 800);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Loader2 className="animate-spin text-indigo-500 mb-4" size={48} />
        <p className="text-slate-500 font-medium">AI 正在生成逻辑谜题...</p>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-xl mx-auto w-full">
      <div className="w-full flex justify-between text-sm font-bold text-slate-400 mb-8 uppercase tracking-wider">
        <span>问题 {currentIndex + 1} / {questions.length}</span>
        <span>得分: {score}</span>
      </div>

      <div className="bg-white p-10 rounded-3xl shadow-xl shadow-indigo-100 border border-indigo-50 w-full text-center mb-10 transform transition-all hover:scale-[1.01]">
        <p className="text-xs text-indigo-400 font-bold uppercase tracking-widest mb-4">请为该物品归类</p>
        <h2 className="text-5xl font-black text-slate-800">{currentQ.item}</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full">
        {currentQ.options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleAnswer(opt)}
            className={`
              p-6 rounded-2xl text-lg font-bold transition-all duration-200 border-2
              ${feedback 
                ? opt === currentQ.correctCategory 
                  ? 'bg-green-50 border-green-500 text-green-700'
                  : 'bg-slate-50 border-transparent text-slate-300'
                : 'bg-white border-transparent shadow-sm hover:border-indigo-200 hover:shadow-lg hover:text-indigo-600 text-slate-600'
              }
            `}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LogicClassification;