import Link from 'next/link';
import Image from 'next/image';

export default function EmbedChatbotAction({ appCount }) {
    const totalApps = appCount ? `${+appCount + 300}+` : '2500+';

    return (
        <div className="container" id="ai_agent">
            <div className="bg-white border border-gray-200 md:py-16 md:px-20 p-6 flex flex-col lg:flex-row gap-10 items-center">
                <div className="w-full lg:w-1/2 flex flex-col gap-6">
                    <h2 className="text-3xl md:text-4xl font-medium text-black leading-tight">
                        Turn Your Chatbot Into
                        <br />
                        An Action-Taking AI
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Connect {totalApps} apps and enable your AI to execute workflows, automate tasks, and
                        interact with your tools through viaSocket.
                    </p>
                    <div>
                        <Link
                            href="https://viasocket.com/blog/give-power-to-your-llm-or-chatbot-of-5-000-apps-via-tool-call"
                            className="btn btn-accent"
                        >
                            Read More
                        </Link>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 flex items-center justify-center">
                    <Image
                        src="https://stuff.thingsofbrand.com/viasocket.com/images/img4_image-8.png"
                        alt="Workflow item container"
                        width={600}
                        height={400}
                        className="w-full h-auto"
                        unoptimized
                    />
                </div>
            </div>
        </div>
    );
}
