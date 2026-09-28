'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const KEY = 'vs-doc-lang';
const LangContext = createContext(['node', () => {}]);

export function LangProvider({ children }) {
    const [lang, setLang] = useState('node');

    useEffect(() => {
        try {
            const saved = localStorage.getItem(KEY);
            if (saved) setLang(saved);
        } catch {
            // localStorage unavailable (private mode, blocked) — default stands
        }
    }, []);

    function pick(next) {
        setLang(next);
        try {
            localStorage.setItem(KEY, next);
        } catch {
            // ignore — per-viewer convenience only
        }
    }

    return <LangContext.Provider value={[lang, pick]}>{children}</LangContext.Provider>;
}

export function useLang() {
    return useContext(LangContext);
}
