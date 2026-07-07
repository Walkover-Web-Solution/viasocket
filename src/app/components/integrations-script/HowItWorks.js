import { ArrowRight, Check } from 'lucide-react';

const ICON = {
    notion: 'https://thingsofbrand.com/api/icon/notion.so',
    slack: 'https://thingsofbrand.com/api/icon/slack.com',
    sheets: 'https://thingsofbrand.com/api/icon/sheets.google.com',
    hubspot: 'https://thingsofbrand.com/api/icon/hubspot.com',
    gmail: 'https://thingsofbrand.com/api/icon/gmail.com',
    notionApp: 'https://thingsofbrand.com/api/icon/notion.so',
};

export default function HowItWorks() {
    return (
        <div className="container my-20" id="how">
            <div className="rounded-[18px] border border-[#e2dfd2] bg-white px-6 py-12 md:px-12 md:py-16">
                <div className="mx-auto max-w-[720px] text-center">
                    <span className="mb-[14px] block text-[12px] font-semibold uppercase tracking-[1.4px] text-accent">
                        How it works
                    </span>
                    <h2 className="h2">
                        From copy-paste to live in three steps
                    </h2>
                    <p className="mx-auto mt-[16px] max-w-[560px] text-[16px] leading-[1.6] text-[#5a5a5a] md:text-[17px]">
                        No backend, no API keys, no design work. The script pulls the matching templates and renders
                        them for you.
                    </p>
                </div>

                <div className="mt-12 grid items-start gap-6 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
                    <Step
                        index="STEP 01"
                        title="Pick your apps"
                        desc="Choose your own app, then the tools you want to feature. No need to hunt for slugs, just search and click."
                        visual={<PickVisual />}
                    />
                    <Arrow />
                    <Step
                        index="STEP 02"
                        title="Copy the generated script"
                        desc="The script above fills in your app slugs automatically as you select. When it's ready, copy it with one click."
                        visual={<CodeVisual />}
                    />
                    <Arrow />
                    <Step
                        index="STEP 03"
                        title="Paste it anywhere"
                        desc="Drop the tag wherever the templates should appear. It renders instantly and refreshes as new templates go live."
                        visual={<BrowserVisual />}
                    />
                </div>
            </div>
        </div>
    );
}

function Step({ index, title, desc, visual }) {
    return (
        <div className="flex flex-col">
            <div className="mb-3 text-center text-[11px] font-bold uppercase tracking-[1.6px] text-accent">{index}</div>
            <div className="flex h-[200px] items-center justify-center rounded-[14px] border border-[#ece9df] bg-[#faf9f4] p-4">
                {visual}
            </div>
            <h3 className="mt-5 text-[17px] font-bold text-[#1a1a1a]">{title}</h3>
            <p className="mt-2 text-[14px] leading-[1.6] text-[#5a5a5a]">{desc}</p>
        </div>
    );
}

function Arrow() {
    return (
        <div className="hidden items-center justify-center pt-[60px] lg:flex">
            <ArrowRight className="h-5 w-5 text-[#b8b3a3]" />
        </div>
    );
}

function PickVisual() {
    const Tile = ({ src, selected }) => (
        <div
            className={`relative flex h-[52px] w-[52px] items-center justify-center rounded-[10px] border bg-white ${
                selected ? 'border-accent' : 'border-[#ece9df]'
            }`}
        >
            <img src={src} alt="" className="h-7 w-7 object-contain" />
            {selected && (
                <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-white">
                    <Check className="h-2.5 w-2.5" strokeWidth={3} />
                </span>
            )}
        </div>
    );
    return (
        <div className="grid grid-cols-3 gap-3">
            <Tile src={ICON.notion} selected />
            <Tile src={ICON.slack} selected />
            <Tile src={ICON.sheets} />
            <Tile src={ICON.hubspot} />
            <Tile src={ICON.gmail} />
            <Tile src={ICON.notionApp} />
        </div>
    );
}

function CodeVisual() {
    return (
        <div className="w-full max-w-[260px] overflow-hidden rounded-[10px] bg-[#0f1115] shadow-sm">
            <pre className="p-4 text-[11.5px] leading-[1.55] text-[#e6e6e6]">
                <code className="!bg-transparent !p-0">
                    <span className="text-[#ff7b72]">&lt;script</span>
                    {`\n  `}
                    <span className="text-[#79c0ff]">primaryApp</span>=<span className="text-[#a5d6ff]">&quot;your_app&quot;</span>
                    {`\n  `}
                    <span className="text-[#79c0ff]">appName1</span>=<span className="text-[#a5d6ff]">&quot;slack&quot;</span>
                    {`\n  `}
                    <span className="text-[#79c0ff]">appName2</span>=<span className="text-[#a5d6ff]">&quot;sheets&quot;</span>
                    <span className="text-[#ff7b72]">&gt;</span>
                    {`\n`}
                    <span className="text-[#ff7b72]">&lt;/script&gt;</span>
                </code>
            </pre>
            <div className="flex items-center justify-between border-t border-white/10 bg-[#15171c] px-3 py-1.5 text-[10.5px] font-semibold uppercase tracking-[1px] text-[#8a8a8a]">
                <span>HTML</span>
                <span className="inline-flex items-center gap-1 text-[#7ee2a8]">
                    <Check className="h-3 w-3" strokeWidth={3} /> Copied
                </span>
            </div>
        </div>
    );
}

function BrowserVisual() {
    const Row = ({ a, b }) => (
        <div className="flex items-center gap-2 rounded-[8px] border border-[#ece9df] bg-white px-2 py-1.5">
            <div className="flex">
                <div className="flex h-6 w-6 items-center justify-center rounded-[6px] border border-[#ece9df] bg-white">
                    <img src={ICON.notion} alt="" className="h-3.5 w-3.5" />
                </div>
                <div className="-ml-1.5 flex h-6 w-6 items-center justify-center rounded-[6px] border border-[#ece9df] bg-white">
                    <img src={a} alt="" className="h-3.5 w-3.5" />
                </div>
            </div>
            <div className="h-1.5 flex-1 rounded-full bg-[#f1ede0]" />
            <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[9.5px] font-bold uppercase tracking-[1px] text-accent">
                Use
            </span>
        </div>
    );
    return (
        <div className="w-full max-w-[260px] overflow-hidden rounded-[10px] border border-[#ece9df] bg-white shadow-sm">
            <div className="flex items-center gap-1.5 border-b border-[#ece9df] bg-[#faf9f4] px-2.5 py-1.5">
                <span className="h-2 w-2 rounded-full bg-[#d8d4c4]" />
                <span className="h-2 w-2 rounded-full bg-[#d8d4c4]" />
                <span className="h-2 w-2 rounded-full bg-[#d8d4c4]" />
                <span className="ml-2 text-[10px] text-[#8a8a8a]">yourproduct.com</span>
            </div>
            <div className="flex flex-col gap-2 p-3">
                <Row a={ICON.slack} />
                <Row a={ICON.sheets} />
            </div>
        </div>
    );
}
