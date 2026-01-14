'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function HeadComp({ canonicalUrl }) {
    useEffect(() => {
        // Handle canonical URL dynamically in App Router
        if (canonicalUrl) {
            let canonicalLink = document.querySelector('link[rel="canonical"]');
            if (canonicalLink) {
                canonicalLink.href = canonicalUrl;
            } else {
                canonicalLink = document.createElement('link');
                canonicalLink.rel = 'canonical';
                canonicalLink.href = canonicalUrl;
                document.head.appendChild(canonicalLink);
            }
        }
    }, [canonicalUrl]);

    return (
        <>
            <Script
                id="gtm-script"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-THTCRSLN');`,
                }}
            />
            <Script
                id="twitter-conversion"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `!function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);},s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');twq('config','pnuam');`,
                }}
            />
        </>
    );
}
