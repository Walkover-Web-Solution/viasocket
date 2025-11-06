import { setUtmSource } from '@/utils/handleUtmSource';
import React, { useLayoutEffect, useState } from 'react';

const CustomLogin = ({ redirect_to }) => {
    const [isLoading, setIsLoading] = useState(true);

    const getConfiguration = () => {
        const config = {
            referenceId: process.env.NEXT_PUBLIC_REFERENCE_ID,
            success: () => setIsLoading(false),
            failure: (error) => {
                console.error('failure reason', error);
            },
            state: setUtmSource(),
        };

        if (redirect_to) {
            config.addInfo = { redirect_path: redirect_to };
        }

        return config;
    };

    const runVerification = (isMounted) => {
        try {
            if (!window.__init_verification_ran__) {
                window.initVerification?.(getConfiguration());
                window.__init_verification_ran__ = true;
            }
        } finally {
            if (isMounted) setIsLoading(false);
        }
    };

    const loadScript = (isMounted) => {
        const script = document.createElement('script');
        script.src = 'https://proxy.msg91.com/assets/proxy-auth/proxy-auth.js';
        script.onload = () => runVerification(isMounted);
        document.body.appendChild(script);
        window.__custom_login_script_loaded__ = true;
    };

    useLayoutEffect(() => {
        let isMounted = true;

        if (typeof window.initVerification === 'function') {
            runVerification(isMounted);
        } else if (!window.__custom_login_script_loaded__) {
            loadScript(isMounted);
        } else {
            runVerification(isMounted);
        }

        return () => {
            isMounted = false;
        };
    }, [redirect_to]);

    return (
        <div className="min-h-[222px] relative">
            {isLoading && (
                <div className="absolute inset-0 rounded-lg">
                    <div className="h-10 bg-gray-300 skeleton rounded mb-2 w-[230px]"></div>
                    <div className="h-10 bg-gray-300 skeleton rounded mb-2 w-[230px]"></div>
                    <div className="h-10 bg-gray-300 skeleton rounded mb-2 w-[230px]"></div>
                </div>
            )}
            <div className='login-container'>
                <div id={process.env.NEXT_PUBLIC_REFERENCE_ID} className="loginBtn_google flex flex-col gap-2 bg-white" />
            </div>
        </div>
    );
};

export default CustomLogin;
