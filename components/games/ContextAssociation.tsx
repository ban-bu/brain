import React, { useState, useEffect } from 'react';
import { GameSessionProps, ContextScenario } from '../../types';
import { generateContextScenario } from '../../services/geminiService';
import { Loader2, Lightbulb, PenLine } from 'lucide-react';

const ContextAssociation: React.FC<GameSessionProps> = ({ onComplete }) => {
  const [scenario, setScenario] = useState<ContextScenario | null>(null);
  const [loading, setLoading] = useState(true);
  const [story, setStory] = useState("");
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const loadContent = async () => {
      const data = await generateContextScenario();
      setScenario(data);
      setLoading(false);
    };
    loadContent();
  }, []);

  if (loading || !scenario) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Loader2 className="animate-spin text-pink-500 mb-4" size={48} />
        <p className="text-slate-500 font-medium">正在挑选故事元素...</p>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center max-w-lg mx-auto">
        <div className="bg-green-100 p-8 rounded-full mb-8 text-green-600 shadow-lg shadow-green-100">
           <Lightbulb size={64} />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">精彩的故事!</h2>
        <p className="text-slate-600 mb-10 leading-relaxed">
          通过将 <strong>{scenario.items.join('、')}</strong> 串联成一个故事，你成功激活了语义记忆网络和情景记忆海马体回路。
        </p>
        <button 
          onClick={() => onComplete(100)}
          className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-slate-800 transition shadow-xl shadow-slate-200"
        >
          完成本节训练
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto w-full">
      <div className="mb-8">
        <span className="inline-block px-4 py-1.5 bg-pink-50 text-pink-600 border border-pink-100 rounded-full text-xs font-bold uppercase mb-4 tracking-wide">
          主题建议: {scenario.theme}
        </span>
        <h2 className="text-3xl font-extrabold text-slate-800 mb-3">
          将这些物品连成故事
        </h2>
        <p className="text-slate-500 text-lg">
          发挥想象力，构建一个生动的场景，将三个无关物品逻辑地串联起来。
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        {scenario.items.map((item, idx) => (
          <div key={idx} className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-slate-200 font-bold text-slate-700 text-lg">
            {item}
          </div>
        ))}
      </div>

      <div className="relative flex-1 mb-6">
        <PenLine className="absolute top-4 left-4 text-slate-300" size={20} />
        <textarea
          className="w-full h-full min-h-[200px] p-6 pl-12 rounded-3xl border border-slate-200 focus:border-pink-400 focus:ring-4 focus:ring-pink-50 focus:outline-none resize-none text-lg text-slate-700 placeholder:text-slate-300 leading-relaxed shadow-inner bg-slate-50/50"
          placeholder="很久很久以前..."
          value={story}
          onChange={(e) => setStory(e.target.value)}
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setFinished(true)}
          disabled={story.length < 10}
          className="bg-pink-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-pink-200"
        >
          完成创作
        </button>
      </div>
    </div>
  );
};

export default ContextAssociation;