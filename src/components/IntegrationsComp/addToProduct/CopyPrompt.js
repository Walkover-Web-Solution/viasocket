'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import s from './addToProduct.module.scss';
import { CopyIcon } from './icons';

// Every "Copy setup prompt" button on the page copies the same app-specific prompt. One provider
// holds the prompt, the toast and the fallback box shown when the browser blocks the clipboard.
const CopyCtx = createContext(null);

export function CopyPromptProvider({ prompt, children }) {
    const [toast, setToast] = useState('');
    const [manual, setManual] = useState(false);
    const toastTimer = useRef();
    const textRef = useRef(null);

    useEffect(() => () => clearTimeout(toastTimer.current), []);
    useEffect(() => {
        if (manual && textRef.current) {
            textRef.current.focus();
            textRef.current.select();
        }
    }, [manual]);

    const copy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(prompt);
            setToast('Copied. Paste it into your AI.');
            clearTimeout(toastTimer.current);
            toastTimer.current = setTimeout(() => setToast(''), 2400);
            return true;
        } catch {
            setManual(true);
            return false;
        }
    }, [prompt]);

    return (
        <CopyCtx.Provider value={copy}>
            {children}
            {toast && (
                <div className={s.toast} role="status">
                    {toast}
                </div>
            )}
            {manual && (
                <div className={s['copy-fb']} role="dialog" aria-label="Copy the prompt">
                    <p>Your browser blocked copying. The prompt is selected: press Ctrl+C or ⌘C.</p>
                    <textarea ref={textRef} readOnly rows={7} value={prompt} />
                    <button type="button" className={`${s.btn} ${s.sm}`} onClick={() => setManual(false)}>
                        Done
                    </button>
                </div>
            )}
        </CopyCtx.Provider>
    );
}

export function CopyPromptButton({ small = false }) {
    const copy = useContext(CopyCtx);
    const [done, setDone] = useState(false);
    const t = useRef();
    useEffect(() => () => clearTimeout(t.current), []);

    const onClick = async () => {
        if (await copy()) {
            setDone(true);
            clearTimeout(t.current);
            t.current = setTimeout(() => setDone(false), 2400);
        }
    };

    return (
        <button type="button" className={[s.btn, small && s.sm, done && s.done].filter(Boolean).join(' ')} onClick={onClick}>
            <CopyIcon />
            <span>{done ? 'Copied' : 'Copy setup prompt'}</span>
        </button>
    );
}
