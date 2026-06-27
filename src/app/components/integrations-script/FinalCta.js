export default function FinalCta() {
    return (
        <div className="bg-[#0d0d0d] py-20 md:py-24">
            <div className="container">
                <div className="mx-auto max-w-[720px] text-center">
                    <h2 className="text-[32px] font-bold leading-[1.15] tracking-[-1px] text-white md:text-[44px]">
                        Let your site sell your integrations for you
                    </h2>
                    <p className="mx-auto mt-5 max-w-[520px] text-[15px] leading-[1.6] text-[#a8a8a8] md:text-[16px]">
                        One script tag turns &quot;does it integrate?&quot; into a one-click automation your users
                        actually set up.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                        <a
                            href="#setup"
                            className="btn btn-accent"
                        >
                            Get the script
                        </a>
                        <a
                            href="https://viasocket.com/integrations"
                            className="btn btn-outline"
                        >
                            Browse the directory
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
