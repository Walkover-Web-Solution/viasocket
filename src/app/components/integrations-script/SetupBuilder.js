'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import searchApps from '@/utils/searchApps';
import ScriptPicker from './ScriptPicker';
import ScriptOutput from './ScriptOutput';
import { useTemplateIds } from '@/hooks/useTemplateIds';

const MAX_FEATURE = 10;
const TOTAL_SLOTS = MAX_FEATURE + 1; // 1 primary + 10 feature

export default function SetupBuilder({ initialApps = [] }) {
    const searchParams = useSearchParams();
    const preselectSlugs = useMemo(
        () => Array.from(new Set(searchParams?.getAll('app') || [])).slice(0, TOTAL_SLOTS),
        [searchParams]
    );
    const [query, setQuery] = useState('');
    const [apps, setApps] = useState(initialApps);
    const [loading, setLoading] = useState(false);
    const [slots, setSlots] = useState(Array(TOTAL_SLOTS).fill(null)); // index 0 = primary
    const [copied, setCopied] = useState(false);
    const [refCode, setRefCode] = useState('');
    const [domain, setDomain] = useState('');
    const { templateIds, addTemplateId, removeTemplateId, setTemplateIds } = useTemplateIds();
    const [pickerTab, setPickerTab] = useState(() => {
        // If templateId is in URL, default to template tab
        return searchParams?.get('templateId') ? 'template' : 'apps';
    });
    const debounceRef = useRef(null);
    const preselectDoneRef = useRef(false);
    const [canSyncParams, setCanSyncParams] = useState(!preselectSlugs.length);
    const selectedAppSlugs = useMemo(() => slots.filter(Boolean).map((a) => a.appslugname), [slots]);
    const selectedSlugs = useMemo(() => new Set(selectedAppSlugs), [selectedAppSlugs]);

    useEffect(() => {
        if (!preselectSlugs.length) {
            setCanSyncParams(true);
            return;
        }
        if (preselectDoneRef.current) return;
        let cancelled = false;
        (async () => {
            const resolved = await Promise.all(
                preselectSlugs.map(async (slug) => {
                    const local = initialApps.find((a) => a.appslugname === slug);
                    if (local) return local;
                    try {
                        const res = await searchApps(slug);
                        return Array.isArray(res) ? res.find((a) => a.appslugname === slug) : null;
                    } catch {
                        return null;
                    }
                })
            );
            if (cancelled) return;
            preselectDoneRef.current = true;
            const found = resolved.filter(Boolean);
            if (!found.length) {
                setCanSyncParams(true);
                return;
            }
            setSlots((prev) => {
                const next = [...prev];
                found.forEach((app) => {
                    if (next.some((s) => s?.appslugname === app.appslugname)) return;
                    const empty = next.findIndex((s) => s === null);
                    if (empty !== -1) next[empty] = app;
                });
                return next;
            });
            setApps((prev) => {
                const merged = [...prev];
                found.forEach((app) => {
                    if (!merged.some((a) => a.appslugname === app.appslugname)) merged.unshift(app);
                });
                return merged;
            });
            setCanSyncParams(true);
        })();
        return () => {
            cancelled = true;
        };
    }, [preselectSlugs, initialApps]);

    // Sync selected slots to URL query params (?app=slug1&app=slug2)
    useEffect(() => {
        if (typeof window === 'undefined' || !canSyncParams) return;
        const params = new URLSearchParams(window.location.search);
        if (params.getAll('app').join('|') === selectedAppSlugs.join('|')) return;
        params.delete('app');
        selectedAppSlugs.forEach((slug) => params.append('app', slug));
        const search = params.toString();
        window.history.replaceState(
            null,
            '',
            `${window.location.pathname}${search ? `?${search}` : ''}${window.location.hash}`
        );
    }, [selectedAppSlugs, canSyncParams]);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        if (!query) {
            setApps(initialApps);
            setLoading(false);
            return;
        }
        debounceRef.current = setTimeout(async () => {
            setLoading(true);
            try {
                const res = await searchApps(query);
                setApps(Array.isArray(res) ? res.slice(0, 36) : []);
            } catch {
                setApps([]);
            } finally {
                setLoading(false);
            }
        }, 250);
        return () => debounceRef.current && clearTimeout(debounceRef.current);
    }, [query, initialApps]);

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
        if (refCode.trim()) lines.push(`  ref="${refCode.trim()}"`);
        if (templateIds.length) lines.push(`  templateIds="${templateIds.join(',')}"`);
        if (domain.trim()) lines.push(`  domain="${domain.trim()}"`);
        lines.push(`  id="viasocket_integrations"`);
        lines.push(`  crossorigin="anonymous"`);
        lines.push(`  src="https://integrations.viasocket.com/integrations.js">`);
        lines.push(`</script>`);
        return lines.join('\n');
    }, [primary, features, refCode, templateIds, domain]);

    const canCopy = !!primary;

    const handleCopy = async () => {
        if (!canCopy) return;
        try {
            await navigator.clipboard.writeText(scriptCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 1800);
        } catch { }
    };

    return (
        <div className="container my-20" id="setup">
            <div className="rounded-lg border border-[#e2dfd2] bg-white p-6 md:p-12">
                <div className="flex items-start justify-between gap-6">
                    <div className="max-w-[660px]">
                        <span className="mb-[14px] block text-[12px] font-semibold uppercase tracking-[1.4px] text-accent">
                            Build your script
                        </span>
                        <h2 className="h1">Generate your script in seconds</h2>
                        <p>
                            Pick your app and the tools you want to feature. The script fills itself in automatically,
                            ready to copy and paste anywhere.
                        </p>
                    </div>
                    <a href="#how" className="btn btn-outline flex-shrink-0">
                        See how it works
                    </a>
                </div>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="w-full min-w-0">
                        <ScriptPicker
                            slots={slots}
                            query={query}
                            setQuery={setQuery}
                            apps={apps}
                            loading={loading}
                            selectedSlugs={selectedSlugs}
                            onSelectApp={handleSelect}
                            onRemoveSlot={removeSlot}
                            onClearAll={() => setSlots(Array(TOTAL_SLOTS).fill(null))}
                            refCode={refCode}
                            setRefCode={setRefCode}
                            templateIds={templateIds}
                            addTemplateId={addTemplateId}
                            removeTemplateId={removeTemplateId}
                            domain={domain}
                            setDomain={setDomain}
                            activeTab={pickerTab}
                            setActiveTab={setPickerTab}
                        />
                    </div>
                    <div className="w-full min-w-0">
                        <ScriptOutput scriptCode={scriptCode} canCopy={canCopy} copied={copied} onCopy={handleCopy} templateIds={templateIds} pickerTab={pickerTab} />
                    </div>
                </div>
            </div>
        </div>
    );
}
