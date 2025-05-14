import '@/scss/global.scss';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import HeadComp from '@/components/headComp/headComp';
import ChatWidget from '@/components/chat-widget/chat-wdget';
import Head from 'next/head';
import { getUtmSource } from '@/utils/handleUtmSource';
import Link from 'next/link';

export const runtime = 'experimental-edge';

export default function MyApp({ Component, pageProps, pagesData }) {
    const router = useRouter();
    var browserPath = router.asPath;

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

            if (
                target &&
                target.tagName === 'A' &&
                target.href &&
                !target.href.includes('#') &&
                target.target !== '_blank'
            ) {
                const targetUrl = new URL(target.href);

                if (targetUrl.origin === window.location.origin) {
                    event.preventDefault();
                    setShowSkeleton(true);
                    router.push(targetUrl.pathname + targetUrl.search + targetUrl.hash);
                }
            }
        };

        const handleRouteChangeComplete = () => {
            setShowSkeleton(false);
        };

        const handlePopState = () => {
            setShowSkeleton(false);
        };

        document.addEventListener('click', handleLinkClick);
        router.events.on('routeChangeComplete', handleRouteChangeComplete);
        window.addEventListener('popstate', handlePopState);

        return () => {
            document.removeEventListener('click', handleLinkClick);
            router.events.off('routeChangeComplete', handleRouteChangeComplete);
            window.removeEventListener('popstate', handlePopState);
        };
    }, [router]);

    useEffect(() => {
        const helloConfig = {
            widgetToken: 'a13cc',
            show_close_button: true,
            hide_launcher: true,
        };

        const script = document.createElement('script');
        script.src = 'https://shubhendraagrawal.msg91.com/chat-widget-prodtesing.js';
        script.onload = () => initChatWidget(helloConfig, 50);

        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    useEffect(() => {
        getUtmSource();
    }, []);

    const pathSegments = router.asPath.split('/');
    const isPaginated = pathSegments.includes('page');
    const isSignupPage = router.pathname === '/signup';

    // Determine the base path (first page)
    let canonicalUrl = `https://viasocket.com${router.asPath}`;
    if (isPaginated) {
        if (pathSegments.includes('category')) {
            canonicalUrl = `https://viasocket.com/integrations/category/${pathSegments[3]}`;
        } else {
            canonicalUrl = `https://viasocket.com/integrations/${pathSegments[2]}`;
        }
    }

    const showMCPBanner = !router.pathname.includes('/pricing');
    const show404Banner = router.pathname === '/404';

    return (
        <>
            <HeadComp canonicalUrl={canonicalUrl} />
            <ChatWidget />
            {/* <Skeleton />  */}
            {showSkeleton ? (
                <Skeleton />
            ) : (
                <>
                    {!isSignupPage && showMCPBanner && !show404Banner && (
                        <Link href="/mcp">
                            <div className="w-full p-2 text-center transparent-border-black gradient-background border-b border-b-black">
                                <p className="!text-xs text-black hover:underline">
                                    Give your AI agent the power to act—generate your MCP URL today
                                </p>
                            </div>
                        </Link>
                    )}
                    <Component {...pageProps} pathArray={pathArray} rawpathArray={rawpathArray} />
                </>
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
                            <div className="h-极6 bg-gray-100 rounded-md skeleton mb-4"></div>
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
