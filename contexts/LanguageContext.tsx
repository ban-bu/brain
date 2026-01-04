import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'zh' | 'en';

// 简化的翻译对象
const translations = {
  zh: {
    appTitle: "CogniTrain",
    stats: "统计",
    history: "历史",
    settings: "设置",
    language: "语言",
    chinese: "中文",
    english: "English",
    startTraining: "开始训练",
    trainingCompleted: "训练完成!",
    trainingEffect: "本次训练效果显著，大脑皮层活跃度提升。",
    finalScore: "最终得分",
    returnHome: "返回主页",
    score: "分数",
    brainTrainingGames: "大脑训练游戏",
    selectGameToStart: "选择游戏开始训练"
  },
  en: {
    appTitle: "CogniTrain",
    stats: "Stats",
    history: "History",
    settings: "Settings",
    language: "Language",
    chinese: "中文",
    english: "English",
    startTraining: "Start Training",
    trainingCompleted: "Training Completed!",
    trainingEffect: "This training session has significantly boosted brain cortex activity.",
    finalScore: "Final Score",
    returnHome: "Return Home",
    score: "Score",
    brainTrainingGames: "Brain Training Games",
    selectGameToStart: "Select a game to start training"
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('zh');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('cognitrain-language') as Language;
    if (savedLanguage && (savedLanguage === 'zh' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('cognitrain-language', lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
