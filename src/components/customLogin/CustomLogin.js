import { setUtmSource } from '@/utils/handleUtmSource';
import React, { useLayoutEffect } from 'react';

const CustomLogin = ({ redirect_to }) => {
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
        <div className="min-h-[222px]">
            <div id={process.env.NEXT_PUBLIC_REFERENCE_ID} className="loginBtn_google" />
        </div>
    );
};

export default CustomLogin;
