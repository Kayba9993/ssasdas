import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';
import { languages } from '../data/mockData';

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    
    // Update document direction and lang attribute
    const language = languages.find(lang => lang.code === savedLanguage);
    document.documentElement.dir = language?.rtl ? 'rtl' : 'ltr';
    document.documentElement.lang = savedLanguage;
  }, []);

  const setLanguage = (language: string) => {
    setCurrentLanguage(language);
    localStorage.setItem('language', language);
    
    // Update document direction
    const languageObj = languages.find(lang => lang.code === language);
    document.documentElement.dir = languageObj?.rtl ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[currentLanguage as keyof typeof translations];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  const isRTL = languages.find(lang => lang.code === currentLanguage)?.rtl || false;

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};