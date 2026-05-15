import { notFound } from 'next/navigation';
import FeedbackSatisfiedClient from '../components/feedback/FeedbackSatisfiedClient';
import FeedbackUnsatisfiedClient from '../components/feedback/FeedbackUnsatisfiedClient';

export const runtime = 'edge';

const TITLES = {
    satisfied: 'Thanks · viaSocket',
    unsatisfied: "Tell us what's off · viaSocket",
};

export async function generateMetadata({ searchParams }) {
    const { variant } = await searchParams;
    return {
        title: TITLES[variant] || 'Feedback · viaSocket',
        robots: { index: false, follow: false },
    };
}

export default async function FeedbackPage({ searchParams }) {
    const { variant } = await searchParams;

    if (variant === 'satisfied') return <FeedbackSatisfiedClient />;
    if (variant === 'unsatisfied') return <FeedbackUnsatisfiedClient />;

    notFound();
}
