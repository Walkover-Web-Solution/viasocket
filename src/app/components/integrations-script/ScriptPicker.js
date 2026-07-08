'use client';

import { useRef, useState } from 'react';
import { Plus, Search, Check, X } from 'lucide-react';

const MAX_FEATURE = 10;
const INITIAL_VISIBLE = 36;

export default function ScriptPicker({
    slots,
    query,
    setQuery,
    apps,
    loading,
    selectedSlugs,
    onSelectApp,
    onRemoveSlot,
    onClearAll,
}) {
    const filledCount = slots.filter(Boolean).length;
    const lastFilledFeature = slots.slice(1).reduce((acc, s, i) => (s ? i : acc), -1);
    const hasAnyFeature = lastFilledFeature !== -1;
    const visibleFeatureCount = slots[0] || hasAnyFeature ? Math.min(MAX_FEATURE, lastFilledFeature + 2) : 0;
    const [showAll, setShowAll] = useState(false);
    const visibleApps = query || showAll ? apps : apps.slice(0, INITIAL_VISIBLE);
    const hasMore = !query && !showAll && apps.length > INITIAL_VISIBLE;

    return (
        <div className="flex flex-col overflow-hidden rounded-lg border border-[#ece9df] bg-[#faf9f4] h-full">
            <div className="flex flex-col gap-4 border-b border-[#ece9df] p-4">
                <div className="flex items-center justify-between">
                    <span className="text-[12px] font-semibold uppercase tracking-[0.6px] text-[#8a8a8a]">
                        Selected apps {filledCount > 0 && `(${filledCount})`}
                    </span>
                    {filledCount >= 2 && (
                        <button
                            type="button"
                            onClick={onClearAll}
                            className="inline-flex items-center gap-1 text-[12.5px] font-semibold text-accent hover:underline"
                        >
                            <X className="h-3 w-3" strokeWidth={2.5} />
                            Clear all
                        </button>
                    )}
                </div>
                <div className="flex flex-wrap gap-3">
                    {(() => {
                        const nextEmptyIdx = slots.findIndex((s, i) => i > 0 && !s);
                        return (
                            <>
                                <SlotCard
                                    label="My app"
                                    slot={slots[0]}
                                    isPrimary={!slots[0]}
                                    emptyLabel="Select"
                                    onRemove={() => onRemoveSlot(0)}
                                />
                                {Array.from({ length: visibleFeatureCount }).map((_, i) => (
                                    <SlotCard
                                        key={`feat-${i}`}
                                        label={`appName${i + 1}`}
                                        slot={slots[i + 1]}
                                        isPrimary={slots[0] && i + 1 === nextEmptyIdx}
                                        emptyLabel="Add app"
                                        onRemove={() => onRemoveSlot(i + 1)}
                                    />
                                ))}
                            </>
                        );
                    })()}
                </div>
                <div className="relative w-full">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a8a8a]" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search apps to feature..."
                        className="w-full rounded-md border border-[#e2dfd2] bg-white py-2 pl-9 pr-3 text-[14px] text-[#1a1a1a] outline-none focus:border-accent"
                    />
                </div>
            </div>

            <div className="flex items-center justify-between px-4 pt-4">
                <span className="text-[12px] font-semibold uppercase tracking-[0.6px] text-[#8a8a8a]">
                    {query ? `Results (${apps.length})` : `Popular apps`}
                </span>
                {hasMore && (
                    <button
                        type="button"
                        onClick={() => setShowAll(true)}
                        className="text-[12.5px] font-semibold text-accent hover:underline"
                    >
                        See all apps
                    </button>
                )}
                {!query && showAll && apps.length > INITIAL_VISIBLE && (
                    <button
                        type="button"
                        onClick={() => setShowAll(false)}
                        className="text-[12.5px] font-semibold text-accent hover:underline"
                    >
                        Show less
                    </button>
                )}
            </div>

            <div
                className="grid auto-rows-min grid-cols-2 gap-2 p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 max-h-[480px] overflow-y-auto "
            >
                {loading && apps.length === 0 ? (
                    Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-[40px] animate-pulse rounded-md border border-[#ece9df] bg-[#faf9f4]"
                        />
                    ))
                ) : apps.length === 0 ? (
                    <>
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-[40px] rounded-md border border-dashed border-[#ece9df] bg-[#faf9f4]"
                            />
                        ))}
                        <div className="col-span-full py-2 text-center text-[13px] text-[#8a8a8a]">No apps found.</div>
                    </>
                ) : (
                    visibleApps.map((app) => {
                        const selected = selectedSlugs.has(app.appslugname);
                        const slotsFull = !slots.some((s) => s === null);
                        const disabled = !selected && slotsFull;
                        return (
                            <button
                                key={app.appslugname}
                                type="button"
                                disabled={disabled}
                                onClick={() => onSelectApp(app)}
                                className={`flex items-center gap-2 rounded-md border bg-white px-3 py-2 text-left transition ${selected ? 'border-accent' : 'border-[#ece9df] hover:border-accent'
                                    } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
                            >
                                <img
                                    src={app.iconurl || 'https://placehold.co/36x36'}
                                    alt={app.name}
                                    className="h-6 w-6 flex-shrink-0 rounded-[6px] object-contain"
                                />
                                <span className="truncate text-[13px] font-medium text-[#1a1a1a]">{app.name}</span>
                                {selected && <Check className="ml-auto h-4 w-4 flex-shrink-0 text-accent" />}
                            </button>
                        );
                    })
                )}
            </div>
        </div>
    );
}

function SlotCard({ slot, label, isPrimary, emptyLabel, onRemove }) {
    const labelColor = isPrimary ? 'text-accent' : 'text-[#8a8a8a]';
    const borderColor = isPrimary ? 'border-accent' : 'border-[#e2dfd2]';
    return (
        <div
            className={`flex min-w-[150px] flex-col justify-between gap-2 rounded-lg border bg-white p-3 ${borderColor}`}
        >
            <span className={`text-xs font-semibold ${labelColor}`}>{label}</span>
            {slot ? (
                <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                        <img
                            src={slot.iconurl || 'https://placehold.co/36x36'}
                            alt={slot.name}
                            className="h-6 w-6 flex-shrink-0 rounded-[6px] object-contain"
                        />
                        <span className="truncate text-[10px] font-semibold text-[#1a1a1a]">{slot.name}</span>
                    </div>
                    <button
                        type="button"
                        onClick={onRemove}
                        className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-[#8a8a8a] hover:bg-[#f1ede0] hover:text-[#1a1a1a]"
                        aria-label={`Remove ${slot.name}`}
                    >
                        <X className="h-3.5 w-3.5" />
                    </button>
                </div>
            ) : (
                <div className="flex items-center gap-2 text-[13px] text-[#8a8a8a]">
                    <span className="flex h-6 w-6 items-center justify-center rounded-[6px] border border-dashed border-[#cfcabb] text-[#8a8a8a]">
                        +
                    </span>
                    <span>{emptyLabel}</span>
                </div>
            )}
        </div>
    );
}

function AddMoreCard({ onClick }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex min-w-[150px] items-center gap-2 rounded-lg border border-dashed border-[#cfcabb] bg-transparent p-3 text-[13px] font-semibold text-[#5a5a5a] transition hover:border-accent hover:text-accent"
        >
            <span className="flex h-6 w-6 items-center justify-center rounded-[6px] border border-dashed border-[#cfcabb] text-[#8a8a8a]">
                <Plus className="h-3.5 w-3.5" />
            </span>
            Add more
        </button>
    );
}
