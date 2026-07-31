'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

const STORAGE_KEY = 'copiedTemplateIds';

export function useTemplateIds() {
    const searchParams = useSearchParams();
    const [templateIds, setTemplateIds] = useState([]);
    const loadedRef = useRef(false);

    // Load template IDs from URL or localStorage on mount
    useEffect(() => {
        if (loadedRef.current) return;
        
        const urlTemplateId = searchParams?.get('templateId');
        if (urlTemplateId) {
            const ids = urlTemplateId.split(',').map(id => id.trim()).filter(Boolean);
            if (ids.length > 0) {
                setTemplateIds(ids);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
            }
        } else {
            const storedIds = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            if (storedIds.length > 0) {
                setTemplateIds(storedIds);
            }
        }
        
        loadedRef.current = true;
    }, [searchParams]);

    // Sync template IDs to URL and localStorage
    useEffect(() => {
        if (!loadedRef.current) return;
        if (typeof window === 'undefined') return;

        const params = new URLSearchParams(window.location.search);
        const currentTemplateIds = params.get('templateId');
        const newTemplateIds = templateIds.join(',');
        
        if (currentTemplateIds === newTemplateIds) return;
        
        if (templateIds.length > 0) {
            params.set('templateId', newTemplateIds);
        } else {
            params.delete('templateId');
        }
        
        const search = params.toString();
        window.history.replaceState(
            null,
            '',
            `${window.location.pathname}${search ? `?${search}` : ''}${window.location.hash}`
        );

        localStorage.setItem(STORAGE_KEY, JSON.stringify(templateIds));
    }, [templateIds]);

    const addTemplateId = (id) => {
        setTemplateIds(prev => {
            const existing = new Set(prev);
            const ids = Array.isArray(id) ? id : [id];
            ids.forEach(i => existing.add(i));
            return Array.from(existing);
        });
    };

    const removeTemplateId = (id) => {
        setTemplateIds(prev => prev.filter(item => item !== id));
    };

    const clearTemplateIds = () => {
        setTemplateIds([]);
    };

    return {
        templateIds,
        addTemplateId,
        removeTemplateId,
        clearTemplateIds,
        setTemplateIds
    };
}

export { STORAGE_KEY };