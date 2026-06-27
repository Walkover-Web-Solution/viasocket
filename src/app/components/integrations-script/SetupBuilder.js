'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import searchApps from '@/utils/searchApps';
import ScriptPicker from './ScriptPicker';
import ScriptOutput from './ScriptOutput';

const MAX_FEATURE = 10;
const TOTAL_SLOTS = MAX_FEATURE + 1; // 1 primary + 10 feature

export default function SetupBuilder() {
    const [query, setQuery] = useState('');
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(false);
    const [slots, setSlots] = useState(Array(TOTAL_SLOTS).fill(null)); // index 0 = primary
    const [copied, setCopied] = useState(false);
    const debounceRef = useRef(null);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(async () => {
            setLoading(true);
            try {
                const res = await searchApps(query || 'a');
                setApps(Array.isArray(res) ? res.slice(0, 36) : []);
            } catch {
                setApps([]);
            } finally {
                setLoading(false);
            }
        }, 250);
        return () => debounceRef.current && clearTimeout(debounceRef.current);
    }, [query]);

    const selectedSlugs = useMemo(() => new Set(slots.filter(Boolean).map((a) => a.appslugname)), [slots]);

    const handleSelect = (app) => {
        setSlots((prev) => {
            const idx = prev.findIndex((s) => s?.appslugname === app.appslugname);
            if (idx !== -1) {
                const next = [...prev];
                next[idx] = null;
                return next;
            }
            const empty = prev.findIndex((s) => s === null);
            if (empty === -1) return prev;
            const next = [...prev];
            next[empty] = app;
            return next;
        });
    };

    const removeSlot = (idx) => {
        setSlots((prev) => {
            if (idx === 0) {
                const next = [...prev];
                next[0] = null;
                return next;
            }
            // Compact feature slots so removed card disappears (no gap)
            const features = prev.slice(1);
            features.splice(idx - 1, 1);
            features.push(null);
            return [prev[0], ...features];
        });
    };

    const primary = slots[0];
    const features = slots.slice(1).filter(Boolean);

    const scriptCode = useMemo(() => {
        const primarySlug = primary?.appslugname || 'your_app_slug';
        const lines = [`<script`, `  primaryApp="${primarySlug}"`];
        features.forEach((app, i) => {
            lines.push(`  appName${i + 1}="${app.appslugname}"`);
        });
        lines.push(`  id="viasocket_integrations"`);
        lines.push(`  crossorigin="anonymous"`);
        lines.push(`  src="https://integrations.viasocket.com/integrations.js">`);
        lines.push(`</script>`);
        return lines.join('\n');
    }, [primary, features]);

    const canCopy = !!primary;

    const handleCopy = async () => {
        if (!canCopy) return;
        try {
            await navigator.clipboard.writeText(scriptCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch {}
    };

    return (
        <div className="container my-20" id="setup">
            <div className="rounded-lg border border-[#e2dfd2] bg-white p-6 md:p-12">
                <div className="max-w-[660px]">
                    <span className="mb-[14px] block text-[12px] font-semibold uppercase tracking-[1.4px] text-accent">
                        Build your script
                    </span>
                    <h2 className="text-[30px] font-bold leading-[1.12] tracking-[-1px] text-[#1a1a1a] md:text-[38px]">
                        Generate your script in seconds
                    </h2>
                    <p className="mt-[14px] text-[16px] font-normal leading-[1.6] text-[#5a5a5a] md:text-[18px]">
                        Pick your app and the tools you want to feature. The script fills itself in automatically, ready
                        to copy and paste anywhere.
                    </p>
                </div>

                <div className="mt-10 grid gap-6">
                    <ScriptPicker
                        slots={slots}
                        query={query}
                        setQuery={setQuery}
                        apps={apps}
                        loading={loading}
                        selectedSlugs={selectedSlugs}
                        onSelectApp={handleSelect}
                        onRemoveSlot={removeSlot}
                    />
                    <ScriptOutput
                        scriptCode={scriptCode}
                        canCopy={canCopy}
                        copied={copied}
                        onCopy={handleCopy}
                    />
                </div>
            </div>
        </div>
    );
}

