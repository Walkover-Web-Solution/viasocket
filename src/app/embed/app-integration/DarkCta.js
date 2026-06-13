import Link from 'next/link';

export default function DarkCta() {
    return (
        <section className="bg-black py-16 text-center">
            <div className="container mx-auto px-4">
                <h2 className="mx-auto mb-3 max-w-[560px] text-[30px] font-medium leading-[1.25] tracking-[-0.7px] text-white">
                    Ship an AI agent that actually does things
                </h2>
                <p className="mx-auto mb-8 max-w-[500px] text-[14px] font-normal leading-[1.75] text-white/50">
                    Ship every integration your users will ever ask for — without building any of them yourself.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <Link
                        href="https://viasocket.com/signup?utm_source=/embed/actions-for-ai"
                        className="btn btn-accent"
                    >
                        Get started
                    </Link>
                    <Link
                        href="https://viasocket.com/signup?utm_source=/embed/actions-for-ai"
                        className="btn btn-outline"
                    >
                        Talk to engineering{' '}
                    </Link>
                </div>
            </div>
        </section>
    );
}
