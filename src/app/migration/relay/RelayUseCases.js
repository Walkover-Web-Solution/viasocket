import Link from 'next/link';
import { MoveRight } from 'lucide-react';

const useCases = [
    {
        title: 'Lead routing to CRM',
        description: 'Capture new leads and push them straight into your CRM, routed by owner or region.',
        href: '/signup',
    },
    {
        title: 'WhatsApp / support auto-replies with AI',
        description: 'Let an AI agent draft and send first replies across WhatsApp and support channels.',
        href: '/signup',
    },
    {
        title: 'Approval workflows',
        description: 'Pause a workflow for a human sign-off by email, then resume automatically.',
        href: '/signup',
    },
    {
        title: 'Slack alerts from any app via webhook',
        description: 'Turn any incoming webhook into a formatted alert in the right Slack channel.',
        href: '/signup',
    },
    {
        title: 'Invoice extraction to Google Sheets',
        description: 'Extract line items from invoices with AI and log them to a Google Sheet.',
        href: '/signup',
    },
    {
        title: 'Applicant screening',
        description: 'Screen inbound applicants with AI scoring and route the best ones onward.',
        href: '/signup',
    },
];

export default function RelayUseCases() {
    return (
        <div className="bg-white">
            <div className="container py-16">
                <h2 className="h2 mb-10">Your use case probably already exists here.</h2>

                <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="grid md:grid-cols-3">
                        {useCases.map((useCase, index) => (
                            <div
                                key={useCase.title}
                                className={`flex flex-col gap-3 p-8 ${
                                    index % 3 !== 2 ? 'border-r border-gray-200' : ''
                                } ${index < useCases.length - 3 ? 'border-b border-gray-200' : ''}`}
                            >
                                <h3 className="font-semibold text-gray-900">{useCase.title}</h3>
                                <p className="text-sm text-gray-500 leading-relaxed">{useCase.description}</p>
                                <Link
                                    href={useCase.href}
                                    className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-[#991B1B] transition-colors mt-auto pt-2"
                                >
                                    Use this template <MoveRight className="w-4 h-4" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
