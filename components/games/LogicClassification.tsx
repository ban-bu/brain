import React, { useState, useEffect } from 'react';
import { GameSessionProps, LogicQuestion } from '../../types';
import { Loader2 } from 'lucide-react';

// 本地随机生成逻辑分类题目
const generateRandomLogicQuestions = (): LogicQuestion[] => {
  const questionPool: LogicQuestion[] = [
    { item: "苹果", correctCategory: "水果", options: ["水果", "交通工具", "工具", "家具"] },
    { item: "锤子", correctCategory: "工具", options: ["动物", "工具", "衣物", "电子产品"] },
    { item: "沙发", correctCategory: "家具", options: ["家具", "食物", "星球", "运动"] },
    { item: "老鹰", correctCategory: "动物", options: ["花卉", "动物", "国家", "元素"] },
    { item: "轿车", correctCategory: "交通工具", options: ["水果", "交通工具", "职业", "天气"] },
    { item: "玫瑰", correctCategory: "花卉", options: ["花卉", "工具", "国家", "食物"] },
    { item: "医生", correctCategory: "职业", options: ["动物", "职业", "家具", "元素"] },
    { item: "氧气", correctCategory: "元素", options: ["水果", "交通工具", "元素", "运动"] },
    { item: "篮球", correctCategory: "运动", options: ["运动", "衣物", "国家", "工具"] },
    { item: "中国", correctCategory: "国家", options: ["花卉", "国家", "家具", "电子产品"] },
    { item: "手机", correctCategory: "电子产品", options: ["电子产品", "食物", "职业", "动物"] },
    { item: "衬衫", correctCategory: "衣物", options: ["衣物", "交通工具", "星球", "花卉"] },
    { item: "面包", correctCategory: "食物", options: ["食物", "工具", "国家", "运动"] },
    { item: "地球", correctCategory: "星球", options: ["星球", "家具", "元素", "职业"] },
    { item: "雨天", correctCategory: "天气", options: ["天气", "动物", "电子产品", "花卉"] },
  ];

  // 随机选择5个题目
  const shuffled = [...questionPool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 5);
};

const LogicClassification: React.FC<GameSessionProps> = ({ onComplete }) => {
  const [questions, setQuestions] = useState<LogicQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  useEffect(() => {
    // 使用本地随机生成，避免API依赖
    const qs = generateRandomLogicQuestions();
    setQuestions(qs);
    setLoading(false);
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
        <p className="text-slate-500 font-medium">正在准备逻辑谜题...</p>
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