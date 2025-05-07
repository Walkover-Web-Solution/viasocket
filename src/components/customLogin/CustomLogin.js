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

        const runVerification = () => {
            if (!window.__init_verification_ran__) {
                window.initVerification?.(configuration);
                window.__init_verification_ran__ = true;
            }
        };

        if (typeof window.initVerification === 'function') {
            runVerification();
        } else if (!window.__custom_login_script_loaded__) {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://proxy.msg91.com/assets/proxy-auth/proxy-auth.js';

            script.addEventListener('load', runVerification);

            document.body.appendChild(script);
            window.__custom_login_script_loaded__ = true;

            return () => {
                script.removeEventListener('load', runVerification);
            };
        } else {
            runVerification();
        }
    }, []);

    return (
        <div className="min-h-[222px]">
            <div id={process.env.NEXT_PUBLIC_REFERENCE_ID} className="loginBtn_google flex flex-col gap-2" />
        </div>
    );
};

export default CustomLogin;
