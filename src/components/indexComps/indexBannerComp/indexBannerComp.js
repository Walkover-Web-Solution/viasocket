import ChatBoxComp from '@/components/chatBoxComp/chatBoxComp';
import Navbar from '@/components/navbar/navbar';
import { LinkButton } from '@/components/uiComponents/buttons';
import Image from 'next/image';
import { useLayoutEffect } from 'react';
import { MdCheck } from 'react-icons/md';

export default function IndexBannerComp({ navData, redirect_to, utm_source }) {
    useLayoutEffect(() => {
        const configuration = {
            referenceId: process.env.NEXT_PUBLIC_REFERENCE_ID,
            success: (data) => {
            },
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
        configuration.state = JSON.stringify({
            utm_source: utm_source,
        });

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

    const signupFeatures = ['Unlimited active workflows', 'No credit card required', 'Connect 5000+ apps'];
    return (
        <div className="container h-full md:h-dvh min-h-fit flex flex-col">
            <Navbar navData={navData} utm={'/index'} />
            <div className=" flex flex-col h-full cont__gap">
                <div className="md:flex-row h-full flex-col gap-4 text-center md:text-start items-center flex justify-between ">
                    <div className="mt-auto max-w-[800px] w-full flex flex-col items-center md:items-start gap-12 py-20">
                        <div className="flex flex-col gap-1">
                        <ChatBoxComp/>
                            <h1 className="h1 text-black text-start">
                                Supercharge your <br/>workflows <strong className="text-accent">with AI </strong>
                            </h1>
                            <h2 className="sub__h1 text-black text-start">
                            With AI-powered automation, connect your favorite apps and automate repetitive tasks—no coding needed. Create workflows to move data, streamline processes, and save time, so you can focus on more important work.
                            </h2>
                        </div>
                        <div className='w-full flex lg:flex-row md:flex-col sm:flex-row flex-col gap-8  lg:items-center md:items-start sm:items-center items-start'>
                            <div className="min-h-[222px] min-w-[198px]">
                                <div id={process.env.NEXT_PUBLIC_REFERENCE_ID} className="loginBtn_google" />
                            </div>
                            <ul className='flex flex-col gap-4'>
                                {signupFeatures.map((feature, index) => {
                                    return(

                                    <li key={index} className="flex items-center gap-2 text-gray-500">
                                        <MdCheck className='text-2xl text-gray-400' /> {feature}
                                    </li>
                                    )
                                })}
                            </ul>
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
