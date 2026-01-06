import { useRouter } from 'next/router';
import { handleRedirect } from '@/utils/handleRedirection';
import { useState, useLayoutEffect } from 'react';
import Image from 'next/image';

const PanelSection = () => {
    const router = useRouter();
    const [hasToken, setHasToken] = useState(false);

    // Read a cookie value by name (client-side only)
    const getCookie = (name) => {
        if (typeof document === 'undefined') return undefined;
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return undefined;
    };

    useLayoutEffect(() => {
        const token = getCookie('prod');
        setHasToken(Boolean(token));
    }, []);

    return (
        <>
            <div className="container mt-12">
                <div className="cont relative flex items-center justify-center rounded-[20px] shadow-xl border-animation">
                    <div className="content relative rounded-[20px] overflow-hidden">
                        <Image
                            src="/assets/bg-img/panel-ss.svg"
                            alt="panel image"
                            className="w-full h-auto max-h-[600px] object-cover object-top rounded-[20px] opacity-0.2"
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className="absolute bottom-[5%] left-[57%] -translate-x-1/2 flex justify-center flex-col items-center gap-4 z-50">

                        {hasToken ? (
                            <button
                                className="btn btn-accent z-50"
                                onClick={(e) => handleRedirect(e, 'https://flow.viasocket.com?')}
                                rel="nofollow"
                            >
                                Go to Panel
                            </button>
                        ) : (
                            <button
                                className="btn btn-accent z-50"
                                onClick={(e) => handleRedirect(e, '/signup?', router)}
                            >
                                Get Started for free
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className="btm-gradient h-[80px]"></div>
        </>
    );
};

export default PanelSection;
