// i18n/index.js - Complete i18n configuration
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

// Optional: Import translation resources directly (if not using backend)
// import translationEN from './locales/en/translation.json';
// import translationFR from './locales/fr/translation.json';
// import translationES from './locales/es/translation.json';
// import translationAR from './locales/ar/translation.json';

const isDevelopment = process.env.NODE_ENV === "development";

i18n
  // Load translation using http -> see /public/locales
  .use(Backend)

  // Detect user language
  .use(LanguageDetector)

  // Pass the i18n instance to react-i18next
  .use(initReactI18next)

  // Initialize i18next
  .init({
    // Default language
    lng: "en",

    // Fallback language if current language resources are not available
    fallbackLng: "en",

    // Debug mode - shows missing keys and other debug info
    debug: isDevelopment,

    // Namespace configuration
    defaultNS: "translation", // Default namespace
    ns: ["translation", "common", "navigation", "forms"], // Available namespaces

    // Backend configuration for loading translations
    backend: {
      // Path to load resources from
      loadPath: "/locales/{{lng}}/{{ns}}.json",

      // Path to post missing resources to
      addPath: "/locales/add/{{lng}}/{{ns}}",

      // Allow cross domain requests
      crossDomain: false,

      // Request timeout
      requestOptions: {
        mode: "cors",
        credentials: "same-origin",
        cache: "default",
      },
    },

    // Language detection configuration
    detection: {
      // Order of language detection methods
      order: [
        "querystring", // ?lng=en
        "cookie", // Cookie
        "localStorage", // localStorage
        "sessionStorage", // sessionStorage
        "navigator", // Browser language
        "htmlTag", // HTML lang attribute
        "path", // URL path
        "subdomain", // Subdomain
      ],

      // Keys or params to lookup language from
      lookupQuerystring: "lng",
      lookupCookie: "i18next",
      lookupLocalStorage: "i18nextLng",
      lookupSessionStorage: "i18nextLng",
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,

      // Cache user language
      caches: ["localStorage", "cookie"],

      // Optional expire and domain for set cookie
      cookieMinutes: 10080, // 7 days
      cookieDomain: "myDomain",

      // Optional htmlTag with lang attribute
      htmlTag: document.documentElement,

      // Only detect languages that are in the whitelist
      checkWhitelist: true,
    },

    // Whitelist of languages
    supportedLngs: ["en", "fr", "es", "ar"],
    nonExplicitSupportedLngs: false,

    // Language codes mapping
    load: "languageOnly", // Remove country code (en-US -> en)

    // Preload languages
    preload: ["en"],

    // Key separator used in your translation keys
    keySeparator: ".",

    // Char to separate keys from namespaces
    nsSeparator: ":",

    // Interpolation options
    interpolation: {
      // React already does escaping
      escapeValue: false,

      // Format function
      format: function (value, format, lng, options) {
        if (format === "uppercase") return value.toUpperCase();
        if (format === "lowercase") return value.toLowerCase();
        if (format === "currency") {
          return new Intl.NumberFormat(lng, {
            style: "currency",
            currency: options.currency || "USD",
          }).format(value);
        }
        if (format === "date") {
          return new Intl.DateTimeFormat(lng).format(new Date(value));
        }
        return value;
      },

      // Default format
      defaultFormat: "lowercase",

      // Prefix/suffix for interpolation
      prefix: "{{",
      suffix: "}}",

      // Prefix/suffix for nesting
      nestingPrefix: "$t(",
      nestingSuffix: ")",

      // Prefix/suffix for context
      contextPrefix: "_",
      contextSuffix: "",

      // Prefix/suffix for plural
      pluralSuffix: "_plural",

      // Max replace rounds
      maxReplaces: 1000,
    },

    // Pluralization
    pluralSeparator: "_",
    contextSeparator: "_",

    // Missing key handling
    saveMissing: isDevelopment, // Send missing keys to backend
    updateMissing: isDevelopment, // Update missing keys
    saveMissingTo: "fallback", // 'fallback', 'current', 'all'

    // Missing key function
    missingKeyHandler: function (lng, ns, key, fallbackValue) {
      if (isDevelopment) {
        console.warn(
          `Missing translation key: ${ns}:${key} for language: ${lng}`
        );
      }
    },

    // Post processor
    postProcess: ["interval"],

    // Resources (use this if not loading from backend)
    // resources: {
    //   en: {
    //     translation: translationEN,
    //     common: commonEN,
    //     navigation: navigationEN
    //   },
    //   fr: {
    //     translation: translationFR,
    //     common: commonFR,
    //     navigation: navigationFR
    //   }
    // },

    // React specific options
    react: {
      // Wait for all components to render before showing loading
      wait: false,

      // Bind i18n instance
      bindI18n: "languageChanged loaded",

      // Bind i18n store
      bindI18nStore: "added removed",

      // Transform the key (in case you want to alter the key before translation)
      transEmptyNodeValue: "", // What to return when the node is empty
      transSupportBasicHtmlNodes: true, // Allow basic HTML nodes
      transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"], // Keep these HTML nodes

      // Use React Suspense
      useSuspense: true,
    },

    // Custom options
    cleanCode: true, // Clean language codes (en-US -> en)

    // Return details
    returnDetails: false,
    returnedObjectHandler: function (key, value, options) {
      // Custom handler for returned objects
    },

    // Join arrays
    joinArrays: false, // or string to join by
  });

// Optional: Add event listeners
i18n.on("initialized", (options) => {
  console.log("i18n initialized", options);
});

i18n.on("loaded", (loaded) => {
  console.log("i18n loaded", loaded);
});

i18n.on("added", (lng, ns) => {
  console.log("i18n added", lng, ns);
});

i18n.on("removed", (lng, ns) => {
  console.log("i18n removed", lng, ns);
});

i18n.on("languageChanged", (lng) => {
  console.log("Language changed to:", lng);

  // Update document attributes
  document.documentElement.lang = lng;
  document.documentElement.dir = ["ar", "he", "fa"].includes(lng)
    ? "rtl"
    : "ltr";
});

i18n.on("failedLoading", (lng, ns, msg) => {
  console.error("Failed loading", lng, ns, msg);
});

export default i18n;

// Alternative simpler configuration for basic use
/*
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    debug: false,
    
    resources: {
      en: { translation: { welcome: 'Welcome' } },
      fr: { translation: { welcome: 'Bienvenue' } }
    },
    
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
*/

// File structure for backend loading:
// public/
//   locales/
//     en/
//       translation.json
//       common.json
//       navigation.json
//       forms.json
//     fr/
//       translation.json
//       common.json
//       navigation.json
//       forms.json
//     es/
//       translation.json
//       common.json
//       navigation.json
//       forms.json
//     ar/
//       translation.json
//       common.json
//       navigation.json
//       forms.json
