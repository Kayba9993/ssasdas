import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import type { ReactNode } from "react";

// Translation resources (you can move these to separate JSON files)
const resources = {
  en: {
    translation: {
      welcome: "Welcome",
      hello: "Hello",
      goodbye: "Goodbye",
      login: "Login",
      logout: "Logout",
      home: "Home",
      about: "About",
      contact: "Contact",
      settings: "Settings",
      profile: "Profile",
      save: "Save",
      cancel: "Cancel",
      submit: "Submit",
      loading: "Loading...",
      error: "An error occurred",
      success: "Success!",
      greeting: "Hello {{name}}!",
      itemCount: "You have {{count}} item",
      itemCount_plural: "You have {{count}} items",
    },
  },
  fr: {
    translation: {
      welcome: "Bienvenue",
      hello: "Bonjour",
      goodbye: "Au revoir",
      login: "Connexion",
      logout: "Déconnexion",
      home: "Accueil",
      about: "À propos",
      contact: "Contact",
      settings: "Paramètres",
      profile: "Profil",
      save: "Enregistrer",
      cancel: "Annuler",
      submit: "Soumettre",
      loading: "Chargement...",
      error: "Une erreur s'est produite",
      success: "Succès!",
      greeting: "Bonjour {{name}}!",
      itemCount: "Vous avez {{count}} élément",
      itemCount_plural: "Vous avez {{count}} éléments",
    },
  },
  es: {
    translation: {
      welcome: "Bienvenido",
      hello: "Hola",
      goodbye: "Adiós",
      login: "Iniciar sesión",
      logout: "Cerrar sesión",
      home: "Inicio",
      about: "Acerca de",
      contact: "Contacto",
      settings: "Configuración",
      profile: "Perfil",
      save: "Guardar",
      cancel: "Cancelar",
      submit: "Enviar",
      loading: "Cargando...",
      error: "Ocurrió un error",
      success: "¡Éxito!",
      greeting: "¡Hola {{name}}!",
      itemCount: "Tienes {{count}} elemento",
      itemCount_plural: "Tienes {{count}} elementos",
    },
  },
  ar: {
    translation: {
      welcome: "مرحباً",
      hello: "السلام عليكم",
      goodbye: "وداعاً",
      login: "تسجيل الدخول",
      logout: "تسجيل الخروج",
      home: "الرئيسية",
      about: "حول",
      contact: "اتصل بنا",
      settings: "الإعدادات",
      profile: "الملف الشخصي",
      save: "حفظ",
      cancel: "إلغاء",
      submit: "إرسال",
      loading: "جاري التحميل...",
      error: "حدث خطأ",
      success: "نجح!",
      greeting: "مرحباً {{name}}!",
      itemCount: "لديك {{count}} عنصر",
      itemCount_plural: "لديك {{count}} عناصر",
    },
  },
};

i18n
  .use(Backend) // Load translations from files
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n down to react-i18next
  .init({
    resources,
    fallbackLng: "en", // Default language
    debug: process.env.NODE_ENV === "development",

    // Language detection options
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
    },

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    // Namespace configuration
    defaultNS: "translation",
    ns: ["translation"],
  });

export default i18n;

// contexts/LanguageContext.js - Enhanced context with i18next
import React, { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// Available languages
const languages = [
  { code: "en", name: "English", flag: "🇺🇸", dir: "ltr" },
  { code: "fr", name: "Français", flag: "🇫🇷", dir: "ltr" },
  { code: "es", name: "Español", flag: "🇪🇸", dir: "ltr" },
  { code: "ar", name: "العربية", flag: "🇸🇦", dir: "rtl" },
];

// Create the context
const LanguageContext = createContext();

// Language Provider Component

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language || "en");
  const [direction, setDirection] = useState("ltr");

  // Update language state when i18n language changes
  useEffect(() => {
    const handleLanguageChange = (lng) => {
      setCurrentLanguage(lng);
      const langInfo = languages.find((lang) => lang.code === lng);
      const newDirection = langInfo?.dir || "ltr";
      setDirection(newDirection);

      // Update document direction and language
      document.documentElement.dir = newDirection;
      document.documentElement.lang = lng;
    };

    // Set initial direction
    handleLanguageChange(i18n.language);

    // Listen for language changes
    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  // Change language function
  const changeLanguage = async (languageCode) => {
    try {
      await i18n.changeLanguage(languageCode);
    } catch (error) {
      console.error("Failed to change language:", error);
    }
  };

  // Get current language info
  const getCurrentLanguage = () => {
    return (
      languages.find((lang) => lang.code === currentLanguage) || languages[0]
    );
  };

  const value = {
    currentLanguage,
    direction,
    languages,
    changeLanguage,
    getCurrentLanguage,
    isRTL: direction === "rtl",
    isLoading: !i18n.isInitialized,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

// App.js - Setup
// import React, { Suspense } from 'react';
// import './i18n'; // Import i18n configuration
// import { LanguageProvider } from './contexts/LanguageContext';
// import Header from './components/Header';
// import Main from './components/Main';
//
// function App() {
//   return (
//     <Suspense fallback={<div>Loading translations...</div>}>
//       <LanguageProvider>
//         <div className="App">
//           <Header />
//           <Main />
//         </div>
//       </LanguageProvider>
//     </Suspense>
//   );
// }
//
// export default App;

// components/Header.js - Example usage
// import React from 'react';
// import { useTranslation } from 'react-i18next';
// import { useLanguage } from '../contexts/LanguageContext';
//
// function Header() {
//   const { t } = useTranslation();
//   const { currentLanguage, changeLanguage, languages, isRTL } = useLanguage();
//
//   return (
//     <header className={`header ${isRTL ? 'rtl' : 'ltr'}`}>
//       <h1>{t('welcome')}</h1>
//
//       {/* Language selector */}
//       <select
//         value={currentLanguage}
//         onChange={(e) => changeLanguage(e.target.value)}
//         className="language-selector"
//       >
//         {languages.map(lang => (
//           <option key={lang.code} value={lang.code}>
//             {lang.flag} {lang.name}
//           </option>
//         ))}
//       </select>
//
//       {/* Examples of different translation methods */}
//       <div className="examples">
//         <p>{t('hello')}</p>
//         <p>{t('greeting', { name: 'John' })}</p>
//         <p>{t('itemCount', { count: 5 })}</p>
//       </div>
//     </header>
//   );
// }
//
// export default Header;

// Alternative: Using JSON files for translations
// Create public/locales/en/translation.json:
// {
//   "welcome": "Welcome",
//   "hello": "Hello",
//   "greeting": "Hello {{name}}!"
// }
//
// Create public/locales/fr/translation.json:
// {
//   "welcome": "Bienvenue",
//   "hello": "Bonjour",
//   "greeting": "Bonjour {{name}}!"
// }
//
// Then remove the resources object from i18n config and it will load from files
