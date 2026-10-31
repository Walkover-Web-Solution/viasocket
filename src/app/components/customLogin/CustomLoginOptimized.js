'use client'

import { setUtmSource } from '@/utils/handleUtmSource';
import { trackInteraction } from '@/utils/trackVisitor';
import React, { useLayoutEffect, useState } from 'react';

// The widget's success callback is not a new account: the register-and-redirect
// path never calls it, and a password login sometimes does. The registration
// this page can see is a 2xx POST whose URL contains /c/register and whose body
// is not hasError. Google and Apple leave the page before that response.
const REGISTER_PATH = '/c/register';

const isRegisterRequest = (method, url) =>
    String(method || '').toUpperCase() === 'POST' && String(url || '').includes(REGISTER_PATH);

const bodyHasError = (body) => {
    if (body == null || body === '') return false;

    let parsed = body;
    if (typeof body === 'string') {
        try {
            parsed = JSON.parse(body);
        } catch {
            return false;
        }
    }

    return Boolean(parsed && typeof parsed === 'object' && (parsed.hasError === true || parsed.data?.hasError === true));
};

const readXhrBody = (xhr) => {
    try {
        if (!xhr.responseType || xhr.responseType === 'text') return xhr.responseText;
    } catch {
        // responseText throws once responseType is json.
    }
    return xhr.response;
};

const recordCompletedSignup = () => {
    if (window.__vs_signup_recorded__) return;
    const path = window.location.pathname;
    const normalized = path.length > 1 ? path.replace(/\/+$/, '') : path;
    if (normalized !== '/signup') return;

    window.__vs_signup_recorded__ = true;
    trackInteraction({
        element: 'signup_completed',
        action: 'signup_completed',
        label: 'Sign up',
        section: 'main',
    });
};

const noteRegisterResponse = (method, url, status, body) => {
    if (!isRegisterRequest(method, url)) return;
    if (status < 200 || status >= 300) return;
    if (bodyHasError(body)) return;
    recordCompletedSignup();
};

// Installed once, before the widget script, so its XHR (and any fetch) is visible.
// The page navigates away on success; sendBeacon is what keeps the report.
const watchRegisterResponses = () => {
    if (window.__vs_register_watch__) return;
    window.__vs_register_watch__ = true;

    if (typeof window.fetch === 'function') {
        const originalFetch = window.fetch;
        window.fetch = function (input, init) {
            const url = typeof input === 'string' ? input : input?.url;
            const method = (init && init.method) || (input && input.method) || 'GET';
            const pending = originalFetch.apply(this, arguments);

            if (isRegisterRequest(method, url)) {
                pending
                    .then((response) => {
                        response
                            .clone()
                            .text()
                            .then((body) => noteRegisterResponse(method, url, response.status, body))
                            .catch(() => {});
                    })
                    .catch(() => {});
            }

            return pending;
        };
    }

    const OriginalXHR = window.XMLHttpRequest;
    if (typeof OriginalXHR === 'function') {
        const open = OriginalXHR.prototype.open;
        const send = OriginalXHR.prototype.send;

        OriginalXHR.prototype.open = function (method, url) {
            this.__vsMethod = method;
            this.__vsUrl = url;
            return open.apply(this, arguments);
        };

        OriginalXHR.prototype.send = function () {
            this.addEventListener('load', () => {
                try {
                    noteRegisterResponse(this.__vsMethod, this.__vsUrl, this.status, readXhrBody(this));
                } catch {
                    // A tracking failure must not break the widget.
                }
            });
            return send.apply(this, arguments);
        };
    }
};

const CustomLoginOptimized = ({ redirect_to }) => {
    const [isLoading, setIsLoading] = useState(true);

    const getConfiguration = () => {
        const config = {
            referenceId: process.env.NEXT_PUBLIC_REFERENCE_ID,
            success: () => setIsLoading(false),
            failure: (error) => {
                console.error('failure reason', error);
            },
            state: setUtmSource(),
            theme: 'light',
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
        watchRegisterResponses();

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
        <div className="min-h-[85px] relative">
            {isLoading && (
                <div className="absolute inset-0 rounded-lg">
                    <div className="h-10 bg-gray-300 skeleton rounded mb-2 w-[230px]"></div>
                    <div className="h-10 bg-gray-300 skeleton rounded mb-2 w-[230px]"></div>
                    <div className="h-10 bg-gray-300 skeleton rounded mb-2 w-[230px]"></div>
                </div>
            )}
            <div className='login-container'>
                <div id={process.env.NEXT_PUBLIC_REFERENCE_ID} className="loginBtn_google flex flex-col gap-2" />
            </div>
        </div>
    );
};

export default CustomLoginOptimized;
