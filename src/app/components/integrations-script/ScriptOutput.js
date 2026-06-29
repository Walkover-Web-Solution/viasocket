'use client';

import Link from 'next/link';
import { Copy, Info, Check } from 'lucide-react';

export default function ScriptOutput({ scriptCode, canCopy, copied, onCopy }) {
    return (
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
            <div>
                <div className="overflow-hidden rounded-[14px] border border-[#ece9df] bg-[#0f1115]">
                    <pre className="max-h-[360px] overflow-auto p-5 text-[13px] leading-[1.6] text-[#e6e6e6]">
                        <code className="!bg-transparent !p-0 !text-[#e6e6e6]">{scriptCode}</code>
                    </pre>
                    <div className="flex items-center justify-between border-t border-white/10 bg-[#15171c] px-4 py-2.5">
                        <span className="text-[12px] font-semibold uppercase tracking-[1px] text-[#8a8a8a]">
                            Your script
                        </span>
                        <button
                            type="button"
                            disabled={!canCopy}
                            onClick={onCopy}
                            className={`inline-flex items-center gap-1.5 rounded-[8px] border px-3 py-1.5 text-[12.5px] font-semibold transition ${
                                canCopy
                                    ? 'border-white/20 bg-white/5 text-white hover:bg-white/10'
                                    : 'cursor-not-allowed border-white/10 bg-white/5 text-[#6a6a6a]'
                            }`}
                        >
                            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                            {copied ? 'Copied' : 'Copy'}
                        </button>
                    </div>
                </div>
                <div className="mt-3 flex items-start gap-2 rounded-md border border-[#ece9df] bg-[#faf9f4] p-3 text-[13px] leading-[1.55] text-[#5a5a5a]">
                    <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                    <span>
                        Pick your app, then the apps to feature. Each one drops into the script automatically and empty
                        slots are skipped when you copy. You can select a maximum of 10 apps to feature. Don&apos;t see your app?{' '}
                        <Link
                            href="https://viasocket.com/help/viasocket-embed/Discover-the-Power-of-Automation-with-viasocket-Integration-Script"
                            className="font-semibold text-accent hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Browse the full directory
                        </Link>
                        .
                    </span>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <ParamRow
                    name="primaryApp"
                    required
                    desc={
                        <>
                            Your platform, the main app every template is built around. Use your app&apos;s slug, e.g.{' '}
                            <Code>your_app_slug</Code>.
                        </>
                    }
                />
                <ParamRow
                    name="appName1 … appName10"
                    desc={
                        <>
                            The apps to feature alongside your app, each as a slug like <Code>slack</Code> or{' '}
                            <Code>google-sheets</Code>. Add anywhere from 2 up to 10 per script.
                        </>
                    }
                />
                <ParamRow
                    name="id"
                    required
                    desc={
                        <>
                            Must be <Code>viasocket_integrations</Code>. This is how the script mounts the widget on
                            your page.
                        </>
                    }
                />
                <ParamRow
                    name="src"
                    required
                    desc={
                        <>
                            Always <Code>https://integrations.viasocket.com/integrations.js</Code>.
                        </>
                    }
                />
            </div>
        </div>
    );
}

function ParamRow({ name, required, desc }) {
    return (
        <div className="rounded-[12px] border border-[#ece9df] bg-white p-4">
            <div className="mb-1.5 flex items-center gap-2">
                <Code>{name}</Code>
                <span
                    className={`rounded-full px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.6px] ${
                        required ? 'bg-accent/10 text-accent' : 'bg-[#f1ede0] text-[#8a6a3a]'
                    }`}
                >
                    {required ? 'Required' : 'Optional'}
                </span>
            </div>
            <div className="text-[13.5px] leading-[1.55] text-[#5a5a5a]">{desc}</div>
        </div>
    );
}

function Code({ children }) {
    return (
        <code className="rounded-[5px] bg-accent/10 px-1.5 py-0.5 font-mono text-[12.5px] text-accent">{children}</code>
    );
}
