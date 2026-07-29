'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

export default function TemplateIdChipInput({ templateIds, setTemplateIds }) {
    const [templateInput, setTemplateInput] = useState('');

    const addTemplateId = () => {
        const value = templateInput.trim();
        if (!value) return;
        const ids = value
            .split(',')
            .map((v) => v.trim())
            .filter(Boolean);
        setTemplateIds((prev) => {
            const existing = new Set(prev);
            ids.forEach((id) => existing.add(id));
            return Array.from(existing);
        });
        setTemplateInput('');
    };

    const removeTemplateId = (id) => {
        setTemplateIds((prev) => prev.filter((item) => item !== id));
    };

    const handleTemplateKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTemplateId();
        } else if (e.key === 'Backspace' && !templateInput && templateIds.length) {
            setTemplateIds((prev) => prev.slice(0, -1));
        }
    };

    return (
        <div>
            <label className="mb-1 block text-[12px] font-semibold text-[#8a8a8a]">Template IDs</label>
            <div
                className="flex min-h-[34px] w-full flex-wrap items-center gap-1.5 rounded-md border border-[#e2dfd2] bg-white px-2 py-1 text-[14px] outline-none focus-within:border-accent max-h-28 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                onClick={(e) => {
                    if (e.target === e.currentTarget) e.currentTarget.querySelector('input')?.focus();
                }}
            >
                {templateIds.map((id) => (
                    <span
                        key={id}
                        title={id}
                        className="inline-flex max-w-[140px] items-center gap-1 rounded bg-accent/10 px-1.5 py-0.5 text-[11px] font-medium text-accent"
                    >
                        <span className="truncate">{id}</span>
                        <button
                            type="button"
                            onClick={() => removeTemplateId(id)}
                            className="flex h-3 w-3 flex-shrink-0 items-center justify-center rounded-full hover:bg-accent/20"
                            aria-label={`Remove ${id}`}
                        >
                            <X className="h-2.5 w-2.5" strokeWidth={2.5} />
                        </button>
                    </span>
                ))}
                <input
                    type="text"
                    value={templateInput}
                    onChange={(e) => setTemplateInput(e.target.value)}
                    onKeyDown={handleTemplateKeyDown}
                    placeholder={templateIds.length ? '' : 'e.g. fab86367c383c4f79658ffc65c9e68e07d'}
                    className="min-w-[80px] flex-1 bg-transparent px-1 py-1 text-[14px] text-[#1a1a1a] outline-none placeholder:text-[#a0a0a0]"
                />
            </div>
        </div>
    );
}
