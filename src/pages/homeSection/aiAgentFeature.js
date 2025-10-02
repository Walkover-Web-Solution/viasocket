import Link from 'next/link';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const AiAgentFeature = () => {
    const [ref, inView] = useScrollAnimation({ threshold: 0.3 });

    return (
        <div
            ref={ref}
            className={`text-center pb-8 mt-auto relative scroll-animate ${inView ? 'in-view' : ''}`}
        >
            <h2 className="text-3xl text-black">
                <Link
                    href="https://viasocket.com/features/ai-agent"
                    target="_blank"
                    className="hover:border-b-2 custom-border hover:border-dotted"
                >
                    AI agents
                </Link>
                ,{' '}
                <Link
                    href=" https://viasocket.com/features/human-intervention"
                    target="_blank"
                    className="hover:border-b-2 custom-border hover:border-dotted"
                >
                    Human intervention
                </Link>
                ,{' '}
                <Link
                    href="https://viasocket.com/features/web-scraping-crawling"
                    target="_blank"
                    className="hover:border-b-2 custom-border hover:border-dotted"
                >
                    Web scraping
                </Link>{' '}
                and{' '}
                <Link
                    href="https://viasocket.com/features"
                    target="_blank"
                    className="border-b-2 custom-border border-dotted"
                >
                    100+ Features
                </Link>
            </h2>
        </div>
    );
};

export default AiAgentFeature;
