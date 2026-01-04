import React, { useState, useEffect } from 'react';
import { GameSessionProps, ContextScenario } from '../../types';
import { Loader2, Lightbulb, PenLine } from 'lucide-react';
import { useTranslation } from '../../contexts/LanguageContext';

// 本地随机生成情景联想题目
const generateRandomContextScenario = (): ContextScenario => {
  const itemsPool = [
    '一把生锈的钥匙', '一个红色的气球', '一只打瞌睡的猫', '一顶破旧的帽子', '一根弯曲的蜡烛',
    '一个古老的怀表', '一双磨损的皮鞋', '一张泛黄的照片', '一个水晶玻璃杯', '一根羽毛笔',
    '一枚铜质硬币', '一个木制风车', '一只彩色风筝', '一副破损的眼镜', '一根竹制鱼竿',
    '一个陶瓷茶壶', '一串珍珠项链', '一本发黄的日记', '一个银质烛台', '一只木头玩具熊',
    '一顶牛仔帽', '一个玻璃瓶子', '一根登山杖', '一个皮革钱包', '一只蝴蝶标本',
    '一个黄铜门把手', '一根彩色铅笔', '一个藤编篮子', '一只帆船模型', '一个古董相机'
  ];

  const themes = [
    '冒险故事', '悬疑故事', '奇幻故事', '科幻故事', '历史故事', '爱情故事',
    '侦探故事', '魔法故事', '时空旅行', '宝藏寻觅', '神秘事件', '未来世界'
  ];

  // 随机选择3个不同的物品
  const shuffledItems = [...itemsPool].sort(() => Math.random() - 0.5);
  const selectedItems = shuffledItems.slice(0, 3);

  // 随机选择一个主题
  const selectedTheme = themes[Math.floor(Math.random() * themes.length)];

  return {
    items: selectedItems,
    theme: selectedTheme
  };
};

const ContextAssociation: React.FC<GameSessionProps> = ({ onComplete }) => {
  const [scenario, setScenario] = useState<ContextScenario | null>(null);
  const [loading, setLoading] = useState(true);
  const [story, setStory] = useState("");
  const [finished, setFinished] = useState(false);
  const { t, tObj } = useTranslation();

  useEffect(() => {
    // 使用本地随机生成，避免API依赖
    const data = generateRandomContextScenario();
    setScenario(data);
    setLoading(false);
  }, []);

  if (loading || !scenario) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Loader2 className="animate-spin text-pink-500 mb-4" size={48} />
        <p className="text-slate-500 font-medium">{tObj('games.contextMemory.pickingItems')}</p>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center max-w-lg mx-auto">
        <div className="bg-green-100 p-8 rounded-full mb-8 text-green-600 shadow-lg shadow-green-100">
           <Lightbulb size={64} />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-4">{tObj('games.contextMemory.howToPlay[2]')}</h2>
        <p className="text-slate-600 mb-10 leading-relaxed">
          {tObj('games.contextMemory.howToPlay[1]')} <strong>{scenario.items.join('、')}</strong> {tObj('games.contextMemory.howToPlay[0]')}
        </p>
        <button
          onClick={() => onComplete(100)}
          className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-bold hover:bg-slate-800 transition shadow-xl shadow-slate-200"
        >
          {t('startTraining')}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto w-full">
      <div className="mb-8">
        <span className="inline-block px-4 py-1.5 bg-pink-50 text-pink-600 border border-pink-100 rounded-full text-xs font-bold uppercase mb-4 tracking-wide">
          {tObj('games.contextMemory.theme', { theme: scenario.theme })}
        </span>
        <h2 className="text-3xl font-extrabold text-slate-800 mb-3">
          {tObj('games.contextMemory.createStory')}
        </h2>
        <p className="text-slate-500 text-lg">
          {tObj('games.contextMemory.howToPlay[3]')}
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
          placeholder={tObj('games.contextMemory.storyPlaceholder')}
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
          {tObj('games.contextMemory.completeCreation')}
        </button>
      </div>
    </div>
  );
};

export default ContextAssociation;