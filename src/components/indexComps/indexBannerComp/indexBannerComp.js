import { handleRedirect } from '@/utils/handleRedirection';
import Image from 'next/image';

export default function IndexBannerComp({ redirect_to, signupFeatures }) {
    return (
        <div className="container min-h-fit cont">
            <div className=" flex flex-col h-full cont__gap">
                <div className="w-full flex flex-col items-center justify-center md:items-start gap-4 py-20">
                    <div className="flex flex-col gap-1">
                        <h1 className="h1 text-black text-start ">
                            Build<span className="text-accent"> Intelligent</span> & Powerful automations
                        </h1>
                        <span className="text-base font-medium sm:text-lg md:text-xl  text-black text-start">
                            Orchestrate logic with human and AI steps, delays, custom code, APIs, and 1500+ apps-no
                            limits, just seamless flow.
                        </span>
                    </div>

                    <div className="cont gap-2 w-full">
                        <button className="btn btn-accent" onClick={(e) => handleRedirect(e, '/signup?')}>
                            Sign Up
                        </button>
                        <div className="flex gap-6 flex-wrap">
                            {signupFeatures.map((point, index) => (
                                <div key={index} className="flex gap-2 h6 items-center">
                                    <div className="h-3 w-3 bg-accent" />
                                    <p className="text-nowrap">{point}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
