'use client';

import { Search, Check, X } from 'lucide-react';

const MAX_FEATURE = 10;

export default function ScriptPicker({
    slots,
    query,
    setQuery,
    apps,
    loading,
    selectedSlugs,
    onSelectApp,
    onRemoveSlot,
}) {
    const lastFilledFeature = slots.slice(1).reduce((acc, s, i) => (s ? i : acc), -1);
    const visibleFeatureCount = Math.min(MAX_FEATURE, Math.max(2, lastFilledFeature + 2));

    return (
        <div className="overflow-hidden rounded-[14px] border border-[#ece9df] bg-[#faf9f4]">
            <div className="flex flex-col gap-4 border-b border-[#ece9df] p-4">
                <div className="flex flex-wrap gap-3">
                    <SlotCard
                        label="primaryApp"
                        slot={slots[0]}
                        isPrimary
                        emptyLabel="Select"
                        onRemove={() => onRemoveSlot(0)}
                    />
                    {Array.from({ length: visibleFeatureCount }).map((_, i) => (
                        <SlotCard
                            key={`feat-${i}`}
                            label={`appName${i + 1}`}
                            slot={slots[i + 1]}
                            emptyLabel="Add app"
                            onRemove={() => onRemoveSlot(i + 1)}
                        />
                    ))}
                    {visibleFeatureCount < MAX_FEATURE && <AddMoreCard />}
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

            <div className="grid max-h-[320px] grid-cols-2 gap-2 overflow-y-auto p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {loading && apps.length === 0 ? (
                    Array.from({ length: 12 }).map((_, i) => (
                        <div
                            key={i}
                            className="h-[64px] animate-pulse rounded-md border border-[#ece9df] bg-white"
                        />
                    ))
                ) : apps.length === 0 ? (
                    <div className="col-span-full py-6 text-center text-[14px] text-[#8a8a8a]">No apps found.</div>
                ) : (
                    apps.map((app) => {
                        const selected = selectedSlugs.has(app.appslugname);
                        const slotsFull = !slots.some((s) => s === null);
                        const disabled = !selected && slotsFull;
                        return (
                            <button
                                key={app.appslugname}
                                type="button"
                                disabled={disabled}
                                onClick={() => onSelectApp(app)}
                                className={`flex items-center gap-2 rounded-md border bg-white px-3 py-2 text-left transition ${
                                    selected ? 'border-accent' : 'border-[#ece9df] hover:border-accent'
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
            <span className={`font-mono text-sm font-semibold tracking-[0.2px] ${labelColor}`}>{label}</span>
            {slot ? (
                <div className="flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                        <img
                            src={slot.iconurl || 'https://placehold.co/36x36'}
                            alt={slot.name}
                            className="h-6 w-6 flex-shrink-0 rounded-[6px] object-contain"
                        />
                        <span className="truncate text-[13px] font-semibold text-[#1a1a1a]">{slot.name}</span>
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

function AddMoreCard() {
    return (
        <div className="flex h-[78px] w-[170px] items-center justify-center rounded-[12px] border border-dashed border-[#cfcabb] bg-transparent text-[13px] font-semibold text-[#5a5a5a]">
            <span className="mr-1.5 text-[16px] leading-none">+</span> Add app
        </div>
    );
}
