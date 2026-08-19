import Link from 'next/link';
import { ArrowRight, Briefcase, LayoutGrid, Activity } from 'lucide-react';
import N8nSignupCTA from './N8nSignupCTA';

const stats = [
    { icon: <Briefcase className="w-5 h-5" />, value: '10,000+', label: 'businesses' },
    { icon: <LayoutGrid className="w-5 h-5" />, value: '2,200+', label: 'apps' },
    { icon: <Activity className="w-5 h-5" />, value: '99.99%', label: 'uptime' },
];

export default function N8nHero() {
    return (
        <div className="flex flex-col gap-8 items-center justify-center py-12 lg:py-20 container">
            <h1 className="h1 text-center">
                The n8n Alternative for <br className="hidden lg:inline" /> People Done Self-Hosting
            </h1>
            <p className="text-base md:text-lg text-center">
                Export your workflow JSON, paste it into viaSocket's AI, and it runs managed: no updates, no
                <br className="hidden lg:inline" /> credential rotation, no container that needs restarting at 2 a.m.
                Migration is free and our engineers help you do it.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-10">
                {stats.map((stat) => (
                    <div key={stat.label} className="flex items-center gap-2">
                        <span className="text-accent">{stat.icon}</span>
                        <span className="text-xl md:text-2xl font-semibold text-accent leading-none">{stat.value}</span>
                        <span className="text-sm text-gray-500">{stat.label}</span>
                    </div>
                ))}
            </div>

            <div className="flex flex-col md:flex-row items-stretch md:items-center md:justify-center gap-2 w-full sm:w-auto">
                <N8nSignupCTA className="btn btn-accent flex items-center gap-1 justify-center w-full md:max-w-fit">
                    Import my n8n workflows <ArrowRight size={14} />{' '}
                </N8nSignupCTA>
                <Link
                    href="https://cal.id/team/viasocket/workflow-setup-discussion"
                    className="btn btn-outline flex items-center justify-center w-full md:max-w-fit"
                >
                    Book a free migration call <ArrowRight />{' '}
                </Link>
            </div>
        </div>
    );
}
