import '@/scss/global.scss';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import HeadComp from '@/components/headComp/headComp';
import ChatWidget from '@/components/chat-widget/chat-wdget';
import Head from 'next/head';
import HandleUtmSource from '@/utils/handleUtmSource';
export const runtime = 'experimental-edge';

export default function MyApp({ Component, pageProps, pagesData }) {
    const router = useRouter();
    var browserPath = router.asPath;

    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = 'https://proxy.msg91.com/assets/proxy-auth/proxy-auth.js';

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
            script.removeEventListener('load', handleLoad);
        };
    }, []);

    const rawpathArray = browserPath.split(/[?#]/);
    const pathArray = rawpathArray[0].split('/');
    var showNavbar = false;
    if (
        !browserPath.includes('/integrations/') &&
        !browserPath.includes('/signup') &&
        !browserPath.includes('/login')
    ) {
        showNavbar = true;
    }

    const [showSkeleton, setShowSkeleton] = useState(false);
    useEffect(() => {
        const handleLinkClick = (event) => {
            let target = event.target;

            while (target && target.tagName !== 'A') {
                target = target.parentElement;
            }

            if (target && target.tagName === 'A') {
                event.preventDefault();
                setShowSkeleton(true);
                window.location.href = target.href;
            }
        };

        document.addEventListener('click', handleLinkClick);

        return () => {
            document.removeEventListener('click', handleLinkClick);
        };
    }, []);

    useEffect(() => {
        const helloConfig = {
            widgetToken: 'a13cc',
            show_close_button: false,
            hide_launcher: true,
        };

        const script = document.createElement('script');
        script.src = 'https://control.msg91.com/app/assets/widget/chat-widget.js';
        script.onload = () => initChatWidget(helloConfig, 50);

        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    useEffect(() => {
        HandleUtmSource();
    }, []);

    return (
        <>
            <HeadComp />
            <ChatWidget />
            {/* <Skeleton />  */}
            {showSkeleton ? (
                <Skeleton />
            ) : (
                <Component {...pageProps} pathArray={pathArray} rawpathArray={rawpathArray} />
            )}
        </>
    );
}

export function Skeleton() {
    return (
        <>
            <Head>
                <title>Loading . . . </title>
                <meta content="Loading the viaSocket application, please wait..."></meta>
            </Head>

            <div className="h-dvh w-dvw container p-6 overflow-hidden">
                {/* Responsive Navbar */}
                <div className="flex items-center justify-between mb-8">
                    <div className="h-10 w-40 bg-gray-100 rounded-md skeleton"></div> {/* Logo */}
                    <div className="hidden md:flex gap-4">
                        {' '}
                        {/* Hide links on smaller screens */}
                        <div className="h-8 w-20 bg-gray-100 rounded-md skeleton"></div>
                        <div className="h-8 w-20 bg-gray-100 rounded-md skeleton"></div>
                        <div className="h-8 w-20 bg-gray-100 rounded-md skeleton"></div>
                        <div className="h-8 w-20 bg-gray-100 rounded-md skeleton"></div>
                    </div>
                    <div className="md:hidden">
                        <div className="h-8 w-8 bg-gray-100 rounded-md skeleton"></div>{' '}
                        {/* Hamburger menu for small screens */}
                    </div>
                </div>

                <div className="flex flex-wrap lg:flex-nowrap gap-8 w-full">
                    {/* Left Section */}
                    <div className="hidden lg:flex flex-col w-1/5 gap-4">
                        <div className="h-1/3 bg-gray-100 rounded-md skeleton"></div>
                        <div className="h-2/3 bg-gray-100 rounded-md skeleton"></div>
                    </div>

                    {/* Middle Section */}
                    <div className="flex flex-col gap-8 w-full lg:w-3/5">
                        <div className="h-full w-full rounded-md">
                            <div className="h-10 w-3/4 bg-gray-100 rounded-md skeleton mb-4"></div>
                            <div className="h-6 bg-gray-100 rounded-md skeleton mb-4"></div>
                            <div className="h-6 bg-gray-100 rounded-md skeleton mb-4"></div>
                            <div className="h-6 bg-gray-100 rounded-md skeleton mb-4"></div>
                            <div className="h-6 w-2/3 bg-gray-100 rounded-md skeleton mb-4"></div>
                        </div>

                        <div className="h-full w-full rounded-md">
                            <div className="h-10 w-1/2 bg-gray-100 rounded-md skeleton mb-4"></div>
                            <div className="h-6 bg-gray-100 rounded-md skeleton mb-4"></div>
                            <div className="h-6 bg-gray-100 rounded-md skeleton mb-4"></div>
                            <div className="h-6 bg-gray-100 rounded-md skeleton mb-4"></div>
                        </div>

                        <div className="h-full w-full rounded-md hidden lg:block">
                            {' '}
                            {/* Hidden on small screens */}
                            <div className="h-10 w-2/5 bg-gray-100 rounded-md skeleton mb-4"></div>
                            <div className="h-6 bg-gray-100 rounded-md skeleton mb-4"></div>
                            <div className="h-6 bg-gray-100 rounded-md skeleton mb-4"></div>
                            <div className="h-6 bg-gray-100 rounded-md skeleton mb-4"></div>
                            <div className="h-6 w-4/5 bg-gray-100 rounded-md skeleton mb-4"></div>
                        </div>
                        <div className="h-full w-full rounded-md hidden lg:block">
                            {' '}
                            {/* Hidden on small screens */}
                            <div className="h-10 w-2/5 bg-gray-100 rounded-md skeleton mb-4"></div>
                            <div className="h-6 bg-gray-100 rounded-md skeleton mb-4"></div>
                            <div className="h-6 bg-gray-100 rounded-md skeleton mb-4"></div>
                            <div className="h-6 bg-gray-100 rounded-md skeleton mb-4"></div>
                            <div className="h-6 w-4/5 bg-gray-100 rounded-md skeleton mb-4"></div>
                        </div>
                        <div className="h-full w-full rounded-md hidden lg:block">
                            {' '}
                            {/* Hidden on small screens */}
                            <div className="h-10 w-2/5 bg-gray-100 rounded-md skeleton mb-4"></div>
                            <div className="h-6 bg-gray-100 rounded-md skeleton mb-4"></div>
                            <div className="h-6 bg-gray-100 rounded-md skeleton mb-4"></div>
                            <div className="h-6 bg-gray-100 rounded-md skeleton mb-4"></div>
                            <div className="h-6 w-4/5 bg-gray-100 rounded-md skeleton mb-4"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
