import Link from 'next/link';

export default function DarkCta() {
    return (
        <section className="bg-black py-16 text-center">
            <div className="container mx-auto px-4">
                <h2 className="h2 text-white">Ship an AI agent that actually does things</h2>
                <p className="mx-auto mb-8 max-w-[500px] text-[14px] font-normal leading-[1.75] text-white/50">
                    Stop describing what your AI could do. Wire it to one MCP endpoint and let it act — on every app
                    your users have connected.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <Link
                        href="https://viasocket.com/signup?utm_source=/embed/actions-for-ai"
                        className="btn btn-accent"
                    >
                        Get started
                    </Link>
                </div>
            </div>
        </section>
    );
}
