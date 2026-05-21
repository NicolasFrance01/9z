import React, { createContext, useContext, useState } from 'react';
import { translations, type Lang, type Translations } from '../i18n/translations';

interface LanguageContextValue {
    lang: Lang;
    setLang: (lang: Lang) => void;
    t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [lang, setLang] = useState<Lang>('es');

    return (
        <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLang = (): LanguageContextValue => {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error('useLang must be used inside LanguageProvider');
    return ctx;
};
