import { Check, X } from 'lucide-react';

const STATIC_POINTS = [
    'Just logos, so visitors still wonder "what can it actually do?"',
    'Hand-built and quickly outdated as you add integrations',
    'No path to action, so they leave to "figure it out later"',
    'Engineering time to design, build, and keep it current',
];

const SCRIPT_POINTS = [
    'Real, ready-to-run templates for your app + each partner tool',
    'New templates appear automatically, nothing to re-deploy',
    'One click sends them straight into setting it up',
    'One script tag, zero integration code to maintain',
];

export default function WhyItMatters() {
    return (
        <div className="container my-20">
            <div className="max-w-[760px]">
                <span className="mb-[14px] block text-[12px] font-semibold uppercase tracking-[1.4px] text-accent">
                    Why it matters
                </span>
                <h2 className="h2">A logo wall tells them. A template lets them act.</h2>
                <p className="mt-[18px] max-w-[640px] text-[16px] font-normal leading-[1.6] text-[#5a5a5a] md:text-[18px]">
                    Most &quot;integrations&quot; pages are a static grid of logos. The script turns that page into a
                    set of real, one-click automations between your app and the tools your users already run.
                </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
                <CompareCard
                    pillLabel="Static logo wall"
                    pillClass="bg-[#ece9df] text-[#5a5a5a]"
                    title="The usual integrations page"
                    iconBg="bg-[#ece9df]"
                    iconColor="text-[#8a8a8a]"
                    Icon={X}
                    points={STATIC_POINTS}
                    headerBg="bg-[#faf9f4]"
                />
                <CompareCard
                    pillLabel="viaSocket script"
                    pillClass="bg-accent text-white"
                    title="Live integration templates"
                    iconBg="bg-accent/10"
                    iconColor="text-accent"
                    Icon={Check}
                    points={SCRIPT_POINTS}
                    headerBg="bg-accent/5"
                />
            </div>
        </div>
    );
}

function CompareCard({ pillLabel, pillClass, title, iconBg, iconColor, Icon, points, headerBg }) {
    return (
        <div className="overflow-hidden rounded-[14px] border border-[#e2dfd2] bg-white">
            <div className={`flex items-center gap-3 px-5 py-4 ${headerBg}`}>
                <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-[1px] ${pillClass}`}
                >
                    {pillLabel}
                </span>
                <span className="text-[15px] font-semibold text-[#1a1a1a]">{title}</span>
            </div>
            <ul className="divide-y divide-[#ece9df]">
                {points.map((p, i) => (
                    <li key={i} className="flex items-center gap-3 px-5 py-3.5">
                        <span
                            className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${iconBg}`}
                        >
                            <Icon className={`h-3 w-3 ${iconColor}`} strokeWidth={3} />
                        </span>
                        <span className="text-[14px] leading-[1.55] text-[#5a5a5a]">{p}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
