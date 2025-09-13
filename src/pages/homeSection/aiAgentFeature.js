import Link from 'next/link';

const AiAgentFeature = () => {
    return (
        <div className="text-center pb-8 mt-auto relative bg-[#faf9f6]">
            <h2 className="text-3xl text-black">
                AI agents, Human intervention, IF and{' '}
                <Link href="/features" target="_blank" className="border-b-2 custom-border border-dotted ">
                    100+ Features
                </Link>
            </h2>
        </div>
    );
};

export default AiAgentFeature;
