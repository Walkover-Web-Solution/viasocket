'use client';

import { useState, useEffect, useRef } from 'react';
import { Copy, Check } from 'lucide-react';
import IntegrationsPreview from './IntegrationsPreview';

const APP_ATTRIBUTES = Array.from({ length: 10 }, (_, i) => `appName${i + 1}`);

const PAIRS = [
    { name: 'Slack', logo: 'https://stuff.thingsofbrand.com/slack.com/images/img668216333e_slack.jpg' },
    { name: 'Google Sheets', logo: 'https://stuff.thingsofbrand.com/google.com/images/img4_googlesheet.png' },
    { name: 'HubSpot', logo: 'https://stuff.thingsofbrand.com/hubspot.com/images/img61728fea98_hubspot.jpg' },
    { name: 'Gmail', logo: 'https://stuff.thingsofbrand.com/gmail.com/images/imge_idrA5FDGTH_1763454052978.svg' },
];

export default function ScriptOutput({ scriptCode, canCopy, copied, onCopy }) {
    const [activeTab, setActiveTab] = useState('preview');
    const [pairIdx, setPairIdx] = useState(0);
    const previewRef = useRef(null);

    useEffect(() => {
        const id = setInterval(() => setPairIdx((i) => (i + 1) % PAIRS.length), 4500);
        return () => clearInterval(id);
    }, []);

    const currentPair = PAIRS[pairIdx];

    useEffect(() => {
        const container = previewRef.current;
        if (!container) return;

        container.innerHTML = '';

        if (!canCopy || !scriptCode) return;

        const doc = new DOMParser().parseFromString(scriptCode, 'text/html');
        const sourceScript = doc.querySelector('script');

        if (!sourceScript?.src) return;

        const script = document.createElement('script');

        ['primaryApp', 'id', 'crossorigin'].forEach((attr) => {
            const value = sourceScript.getAttribute(attr);

            if (!value) return;

            if (attr === 'id') script.id = value;
            else if (attr === 'crossorigin') script.crossOrigin = value;
            else script.setAttribute(attr, value);
        });

        APP_ATTRIBUTES.forEach((attr) => {
            const value = sourceScript.getAttribute(attr);
            if (value) script.setAttribute(attr, value);
        });

        script.src = sourceScript.src;

        container.appendChild(script);

        const CSS = `.container-viasocket-integrations{margin:0 !important;}`;
        const inject = (root) => {
            if (!root || root.querySelector('style[data-vs-reset]')) return;
            const s = Object.assign(document.createElement('style'), { textContent: CSS });
            s.dataset.vsReset = '';
            root.appendChild(s);
        };
        const observer = new MutationObserver(() =>
            container.querySelectorAll('*').forEach((el) => el.shadowRoot && inject(el.shadowRoot))
        );
        observer.observe(container, { childList: true, subtree: true });

        return () => {
            observer.disconnect();
            container.innerHTML = '';
        };
    }, [scriptCode, canCopy]);

    const tabButton = (tab, label) => (
        <button
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`rounded-md px-3 py-1.5 text-[13px] font-semibold transition ${activeTab === tab ? 'bg-white text-accent shadow-sm' : 'text-[#8a8a8a] hover:text-[#1a1a1a]'
                }`}
        >
            {label}
        </button>
    );

    return (
        <div className="overflow-hidden rounded-lg border border-[#ece9df] bg-[#faf9f4] h-full pb-10">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#ece9df] px-4 py-3">
                <div className="flex gap-1">
                    {tabButton('preview', 'Preview')}
                    {tabButton('code', 'Code')}
                </div>

                <button
                    type="button"
                    disabled={!canCopy}
                    onClick={onCopy}
                    className={`inline-flex items-center gap-1.5 rounded-[8px] border px-3 py-1.5 text-[12.5px] font-semibold transition ${canCopy
                        ? 'border-[#e2dfd2] bg-white text-accent hover:border-accent'
                        : 'cursor-not-allowed border-[#e2dfd2] bg-white text-[#6a6a6a]'
                        }`}
                >
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? 'Copied' : 'Copy Code'}
                </button>
            </div>

            {/* Body */}
            <div className={`bg-[#0f1115] min-h-full h-full ${activeTab === 'code' ? '' : 'hidden'}`}>
                <pre className="p-5 text-sm leading-[1.6] text-[#e6e6e6] whitespace-pre-wrap break-words">
                    <code>{scriptCode}</code>
                </pre>
            </div>

            <div
                className={`min-h-[360px] max-h-[700px] overflow-y-auto p-8 flex-1 h-full min-h-full ${activeTab === 'preview' ? '' : 'hidden'}`}
            >
                {!canCopy ? (
                    <IntegrationsPreview current={currentPair} />
                ) : (
                    <div ref={previewRef} className="min-h-[300px]" />
                )}
            </div>
        </div>
    );
}
