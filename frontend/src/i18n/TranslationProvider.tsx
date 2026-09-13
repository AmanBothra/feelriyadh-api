// components/TranslationContext.js
import Cookies from 'js-cookie';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface TranslationContextType {
  locale: string;
  setLocale: React.Dispatch<React.SetStateAction<string>>;
  translate: (
    key: string,
    values?: Record<string, string | number>,
  ) => React.ReactNode;
}

const TranslationContext = createContext<TranslationContextType>({
  locale: 'ar',
  setLocale: () => {},
  translate: (key) => key,
});

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initialLocale = Cookies.get('locale') || 'ar';

  const [locale, setLocale] = useState(initialLocale);
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    // Save the current locale to cookies
    Cookies.set('locale', locale);

    // Fetch and set translations based on the current locale
    const fetchTranslations = async () => {
      try {
        const response = await fetch(`/locales/${locale}.json`);
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Error loading translations for ${locale}:`, error);
      }
    };

    fetchTranslations();
  }, [locale]);

  useEffect(() => {
    // Set the language on the HTML element for styling purposes
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  const translate = (key: string, values?: Record<string, string | number>) => {
    let translation = translations[key] || key;

    // Replace dynamic values in the translation
    if (values) {
      Object.keys(values).forEach((placeholder) => {
        const pattern = new RegExp(`{{${placeholder}}}`, 'g');
        translation = translation.replace(pattern, String(values[placeholder]));
      });
    }

    // Check if the translation contains HTML tags
    if (/<[a-z][\s\S]*>/i.test(translation)) {
      return <div dangerouslySetInnerHTML={{ __html: translation }} />;
    }

    return translation;
  };

  return (
    <TranslationContext.Provider value={{ locale, setLocale, translate }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
