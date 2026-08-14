'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { ArrowRight, Check, ChevronDown, Search, Sparkles, X } from 'lucide-react';

export const appKey = (app) => app?.appslugname || app?.name;

// The search bar plus the chip grid beneath it. State lives with the hero; this
// renders it and reports back what the visitor did.
export default function AppPicker({
    query,
    onQueryChange,
    onKeyDown,
    selectedApps,
    visibleApps,
    limitReached,
    hasMore,
    isLoading,
    onToggleApp,
    onClearApps,
    onShowMore,
    onSubmit,
}) {
    const inputRef = useRef(null);

    return (
        <>
            {/* Selected apps stay in the bar as removable chips, the same shape the
                existing home search uses. */}
            <div
                onClick={() => inputRef.current?.focus()}
                className="relative mt-10 w-full max-w-xl h-14 bg-white border border-black/10 rounded-xl shadow-sm focus-within:border-black/30 transition-colors cursor-text"
            >
                {/* Only the chips and the input scroll; the two buttons sit outside
                    this box so they cannot be pushed out of view. */}
                <div className="flex items-center gap-2 h-full pl-4 sm:pl-5 pr-24 overflow-x-auto no-scrollbar">
                    <Search className="w-5 h-5 text-gray-400 shrink-0" />

                    {selectedApps.map((app) => (
                        <span
                            key={appKey(app)}
                            className="flex items-center gap-1 shrink-0 rounded-full border border-accent bg-[#fff5f5] px-1 text-[10px]"
                        >
                            <Image
                                src={app?.iconurl}
                                alt=""
                                width={12}
                                height={12}
                                className="w-4 h-4 object-contain"
                            />
                            {app?.name}
                            <button
                                type="button"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onToggleApp(app);
                                }}
                                aria-label={`Remove ${app?.name}`}
                                className="grid place-items-center w-5 h-5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-black/5 transition-colors"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </span>
                    ))}

                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => onQueryChange(e.target.value)}
                        onKeyDown={onKeyDown}
                        placeholder={selectedApps.length ? '' : 'Choose up to 3 apps...'}
                        className="grow min-w-[6rem] bg-transparent outline-none text-xs text-[#252525] placeholder:text-gray-400"
                    />
                </div>

                {/* Always mounted so the bar keeps its shape whether or not anything
                    is picked. */}
                <button
                    type="button"
                    onClick={onClearApps}
                    aria-label="Clear selected apps"
                    className="absolute top-1/2 right-14 -translate-y-1/2 grid place-items-center h-7 w-7 rounded-full text-gray-400 hover:text-gray-700 hover:bg-black/5 transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>

                {/* AI affordance: parked at the right of the bar, and once an app is
                    picked it tucks into the bar's top-right corner. */}
                <button
                    type="button"
                    onClick={onSubmit}
                    aria-label="See automation ideas for the selected apps"
                    className={`absolute grid place-items-center rounded-full bg-accent/10 text-accent transition-all duration-300 ${selectedApps.length
                        ? 'top-1/2 right-4 h-9 w-9 -translate-y-1/2 !cursor-pointer'
                        : 'top-1/2 right-4 h-9 w-9 -translate-y-1/2 pointer-events-none '
                        }`}
                >
                    {/* Sparkles while the visitor is still picking; an arrow once
                        there is a selection to move forward with. */}
                    {selectedApps.length ? <ArrowRight className="w-3.5 h-3.5" /> : <Sparkles className="w-4 h-4" />}
                </button>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 max-w-[760px]">
                {visibleApps.map((app) => {
                    const isSelected = selectedApps.some((selected) => appKey(selected) === appKey(app));
                    // Once three are picked, the rest are out of reach until one is removed.
                    const isDisabled = !isSelected && limitReached;

                    return (
                        <button
                            key={appKey(app)}
                            type="button"
                            onClick={() => onToggleApp(app)}
                            disabled={isDisabled}
                            aria-pressed={isSelected}
                            className={`flex items-center gap-2 rounded-full border px-2 py-1 text-xs bg-white font-medium shadow-sm transition-colors ${isSelected
                                ? 'border-accent bg-accent/5 text-accent'
                                : isDisabled
                                    ? 'border-black/10 bg-white text-gray-400 cursor-not-allowed opacity-60'
                                    : 'border-black/10 bg-white text-gray-800 hover:border-black/30'
                                }`}
                        >
                            <Image
                                src={app?.iconurl}
                                alt=""
                                width={18}
                                height={18}
                                className={`w-[18px] h-[18px] object-contain ${isDisabled ? 'grayscale' : ''}`}
                            />
                            {app?.name}
                            {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                        </button>
                    );
                })}

                {!visibleApps.length && !hasMore && (
                    <p className="text-[13px] text-gray-500">No apps match that search.</p>
                )}

                {hasMore && (
                    <button
                        type="button"
                        onClick={onShowMore}
                        disabled={isLoading}
                        className="flex items-center gap-1 rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-gray-800 shadow-sm transition-colors hover:border-black/30 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {isLoading ? 'Loading…' : 'More'}
                        {!isLoading && <ChevronDown className="w-3.5 h-3.5 shrink-0" />}
                    </button>
                )}
            </div>
        </>
    );
}
