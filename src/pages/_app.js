import '@/scss/global.scss';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import HeadComp from '@/components/headComp/headComp';
import ChatWidget from '@/components/chat-widget/chat-wdget';
import Head from 'next/head';
import { getUtmSource } from '@/utils/handleUtmSource';
// import Script from 'next/script';

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
            urlsToOpenInIFrame: [
                'https://viasocket.com/faq',
                'https://viasocket.com/discovery',
                'https://viasocket.com/blog',
                'https://viasocket.com/community',
            ],
        };

        const script = document.createElement('script');
        script.src = 'https://blacksea.msg91.com/chat-widget.js';
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
        if (router.pathname.startsWith('/mcp')) {
            if (pathSegments.includes('category')) {
                canonicalUrl = `https://viasocket.com/mcp/category/${pathSegments[3]}`;
            } else {
                canonicalUrl = `https://viasocket.com/mcp/${pathSegments[2]}`;
            }
        } else if (router.pathname.startsWith('/integrations')) {
            if (pathSegments.includes('category')) {
                canonicalUrl = `https://viasocket.com/integrations/category/${pathSegments[3]}`;
            } else {
                canonicalUrl = `https://viasocket.com/integrations/${pathSegments[2]}`;
            }
        }
    }

    // const showMCPBanner = !['/pricing'].some((path) => router.pathname.includes(path));
    // const show404Banner = router.pathname === '/404';
    // const showPricingBanner = router.pathname === '/pricing';

    return (
        <>
            <HeadComp canonicalUrl={canonicalUrl} />
            <ChatWidget />
            {showSkeleton ? (
                <Skeleton />
            ) : (
                <>
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

            <div className="h-dvh w-dvw overflow-hidden p-8">
                <div className="flex justify-between w-full h-10">
                    <div className="h-full w-40 bg-gray-100 rounded-sm skeleton"></div>
                    <div className="flex gap-2 h-full">
                        <div className="h-full w-32 bg-gray-100 rounded-sm skeleton"></div>
                        <div className="h-full w-32 bg-gray-100 rounded-sm skeleton"></div>
                        <div className="h-full w-32 bg-gray-100 rounded-sm skeleton"></div>
                        <div className="h-full w-10 bg-gray-100 rounded-sm skeleton"></div>
                    </div>
                </div>

                <div className="container cont gap-20 mt-20">
                    <div className="cont gap-1">
                        <div className="h-32 w-3/5 bg-gray-100 rounded-sm skeleton"></div>
                        <div className="h-32 w-4/5 bg-gray-100 rounded-sm skeleton"></div>
                        <div className="h-10 w-3/5 bg-gray-100 rounded-sm skeleton"></div>
                    </div>

                    <div className="w-full">
                        <div className="h-16 w-1/3 bg-gray-100 rounded-sm skeleton mb-4"></div>
                        <div className="grid grid-cols-3 gap-2">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="h-44 bg-gray-100 rounded-sm skeleton"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
