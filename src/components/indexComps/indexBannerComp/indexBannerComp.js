import Image from 'next/image';
import Link from 'next/link';

export default function IndexBannerComp({ redirect_to, signupFeatures }) {
    return (
        <div className="container home-page-container  min-h-fit flex flex-col">
            <div className=" flex flex-col h-full cont__gap">
                <div className="md:flex-row h-full flex-col gap-4 md:text-start flex px-5 pt-16">
                    <div className="w-full flex flex-col items-center justify-center md:items-start gap-4">
                        <div className="flex flex-col gap-1">
                            <h1 className="h1 text-black text-start ">
                                Build Intelligent<span className="text-accent"> Automations</span>
                            </h1>
                            <span className="text-base font-medium sm:text-lg md:text-xl  text-black text-start">
                                Orchestrate logic with human and AI steps, delays, custom code, APIs, and 1500+ apps—no
                                limits, just seamless flow.
                            </span>
                        </div>
                        <div className="cont gap-4 w-full">
                            <div className="w-full flex lg:flex-row md:flex-col sm:flex-row flex-col gap-8  lg:items-center md:items-start sm:items-center items-start">
                                <Link href="/signup">
                                    <button className="btn btn-accent">Sign Up</button>
                                </Link>
                            </div>
                            <div className="flex w-full">
                                {signupFeatures.map((point, index) => (
                                    <div
                                        key={index}
                                        className={`font-semibold py-4 px-1 transparent-border-black w-full text-center flex items-start justify-start`}
                                    >
                                        <div className="flex gap-1 h6 items-center">
                                            <p className="text-accent">✔ </p>
                                            <p>{point}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <Image
                        src={'/assets/img/website-flow.svg'}
                        className="max-w-[600px] h-fit md:w-2/5 w-full"
                        width={1080}
                        height={1080}
                        alt="Website flow"
                    />
                </div>
            </div>
        </div>
    );
}
