import Link from 'next/link';
import { MoveRight } from 'lucide-react';

const useCases = [
    {
        title: 'Webhook intake to a table, with Slack routing',
        description:
            'A webhook receives submissions, saves them to a table, and routes urgent ones to a different Slack channel.',
        slug: 'idea-bug-intake-save-to-table-and-alert-slack-autoroute-urgent-bugs/05260774d3be0b3fd8a89f3b7248773500447d1fa8dc25f5376dcb5cacce0cc6',
    },
    {
        title: 'Dropbox file extraction to Slack',
        description: 'A new file in Dropbox gets OCR-parsed for invoice and receipt fields, then posted to Slack.',
        slug: 'autoextract-dropbox-files-with-algodocs-and-alert-your-team-in-slack/8989e551855af8c6be1dd05a63892898ba2082b66e3feaa0f7788083ca7830e5',
    },
    {
        title: 'GitHub PR alerts with an API lookup',
        description:
            'A new pull request triggers an org-details API call, logs the row to Sheets, and posts a formatted Slack alert.',
        slug: 'automate-pr-notifications-to-slack-with-organization-lookup/5f346dc1899f3d077d411c8dbf1d80e51cc5de49a80e59e1ac913aa25f6bb92b',
    },
    {
        title: 'Scheduled GitHub issues from a spreadsheet',
        description:
            'A daily scheduled run filters records by status, date and priority, then opens matching GitHub issues.',
        slug: 'automate-issue-creation-from-spreadsheet-records/451f57cdc8de46e09ce302d1067a67120d7cc12ea10c70797c873d86f984cc55',
    },
    {
        title: 'Payment link recovery with a WhatsApp reminder',
        description: 'An expired payment link event creates a fresh link and fires a WhatsApp reminder to recover it.',
        slug: 'autocreate-new-razorpay-link-whatsapp-reminder-on-expired-payment-link/040809c839b7d7e79b6b61f74c332c09521fdecc278bcec8839ec35fdd14b4e2',
    },
    {
        title: 'AI screening with a Slack approval step',
        description:
            'An AI step scores each inbound applicant, sends approve or reject to Slack, and writes the result to Sheets.',
        slug: 'ai-resume-screening-with-slack-approval-google-forms-google-sheets/205d077dd8ef27294bbc7e222bbf1152c5e629df48b96d70bf61cd286ae1e80a',
    },
];

function buildUseCaseHref(useCase) {
    if (!useCase.slug) return '/automations';
    return `/automations/${useCase.slug}`;
}

export default function N8nUseCases() {
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
                                    href={buildUseCaseHref(useCase)}
                                    target="_blank"
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
