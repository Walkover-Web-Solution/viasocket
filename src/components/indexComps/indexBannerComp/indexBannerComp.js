import CustomLogin from '@/components/customLogin/CustomLogin';
import { setUtmSource } from '@/utils/handleUtmSource';
import Image from 'next/image';
import { useLayoutEffect } from 'react';

export default function IndexBannerComp({ redirect_to, signupFeatures }) {
    useLayoutEffect(() => {
        const configuration = {
            referenceId: process.env.NEXT_PUBLIC_REFERENCE_ID,
            success: (data) => {},
            failure: (error) => {
                console.log('failure reason', error);
            },
        };
        if (redirect_to) {
            configuration.addInfo = {};
            configuration.addInfo = {
                redirect_path: redirect_to,
            };
        }
        const utm_source = setUtmSource();
        configuration.state = utm_source;

        if (typeof window.initVerification === 'function') {
            window.initVerification(configuration);
        } else {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://proxy.msg91.com/assets/proxy-auth/proxy-auth.js';

            const handleLoad = () => {
                if (typeof window.initVerification === 'function') {
                    window.initVerification(configuration);
                } else {
                    console.error('initVerification function not found');
                }
            };

            script.addEventListener('load', handleLoad);

            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
                script.removeEventListener('load', handleLoad);
            };
        }
    }, []);

    return (
        <div className="container  min-h-fit flex flex-col">
            <div className=" flex flex-col h-full cont__gap">
                <div className="md:flex-row h-full flex-col gap-4 md:text-start flex justify-between pt-20">
                    <div className="max-w-[800px] w-full flex flex-col items-center justify-center md:items-start gap-12">
                        <div className="flex flex-col gap-1">
                            <h1 className="h1 text-black text-start">
                                Automate Your Business <br />
                                with <strong className="text-accent">AI-Powered Workflows </strong>
                            </h1>
                            <h2 className="sub__h1 text-black text-start">
                                Connect your apps, automate your work, and watch your productivity soar—all with the
                                help of AI.
                            </h2>
                        </div>
                        <div className="flex w-full">
                            <div className="w-full flex lg:flex-row md:flex-col sm:flex-row flex-col gap-8  lg:items-center md:items-start sm:items-center items-start">
                                <CustomLogin redirect_to={redirect_to} />
                            </div>
                            <div className="cont w-full">
                                {signupFeatures.map((point, index) => (
                                    <div
                                        key={index}
                                        className={`font-semibold py-4 px-1 border-black w-full text-center flex items-start justify-start`}
                                    >
                                        <div className="flex gap-1 text-lg items-center">
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
