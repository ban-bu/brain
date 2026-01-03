import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { zh } from '../locales/zh';
import { en } from '../locales/en';
import type { TranslationKeys } from '../locales/zh';

export type Language = 'zh' | 'en';
export type TranslationKey = keyof TranslationKeys;

const translations = {
  zh,
  en,
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  tObj: (key: string, params?: Record<string, string | number>) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('zh');

  // 从localStorage加载语言设置
  useEffect(() => {
    const savedLanguage = localStorage.getItem('cognitrain-language') as Language;
    if (savedLanguage && (savedLanguage === 'zh' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // 保存语言设置到localStorage
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('cognitrain-language', lang);
  };

  // 简单的翻译函数
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // 如果找不到翻译，返回英文版本或key本身
        let fallback: any = translations.en;
        for (const fallbackKey of keys) {
          if (fallback && typeof fallback === 'object' && fallbackKey in fallback) {
            fallback = fallback[fallbackKey];
          } else {
            return key; // 返回key本身作为最后的后备
          }
        }
        return typeof fallback === 'string' ? fallback : key;
      }
    }

    return typeof value === 'string' ? value : key;
  };

  // 支持参数替换的对象翻译函数
  const tObj = (key: string, params?: Record<string, string | number>): any => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // 如果找不到翻译，返回英文版本
        let fallback: any = translations.en;
        for (const fallbackKey of keys) {
          if (fallback && typeof fallback === 'object' && fallbackKey in fallback) {
            fallback = fallback[fallbackKey];
          } else {
            return key;
          }
        }
        value = fallback;
        break;
      }
    }

    // 如果是字符串且有参数，进行参数替换
    if (typeof value === 'string' && params) {
      return value.replace(/\{(\w+)\}/g, (match, paramKey) => {
        return params[paramKey]?.toString() || match;
      });
    }

    return value;
  };

  const value: LanguageContextType = {
    language,
    setLanguage: handleSetLanguage,
    t,
    tObj,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// 自定义hook用于获取翻译函数
export const useTranslation = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};

// 便捷的翻译hook
export const useT = () => {
  const { t } = useTranslation();
  return t;
};

export default LanguageContext;
