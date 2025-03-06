import Head from 'next/head';
import Script from 'next/script';

export default function HeadComp() {
    return (
        <>
            <Head>
                {!process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT ||
                    (process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT !== 'prod' && (
                        <meta name="robots" content="noindex, nofollow" />
                    ))}
                <meta name="zoom-domain-verification" content="ZOOM_verify_122f4fb2b7734340b90fb0ae391bb1d0"></meta>
                <link rel="apple-touch-icon" sizes="76x76" href="/assets/brand/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="96x96" href="/assets/brand/favicon-circle-144x144.png" />
                <link rel="icon" type="image/png" sizes="48x48" href="/assets/brand/favicon-circle-48x48.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/assets/brand/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/assets/brand/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
            </Head>
            <Script
                id="gtm-script"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-THTCRSLN');`,
                }}
            ></Script>
        </>
    );
}

// import Head from 'next/head';
// import Script from 'next/script';
// import { useEffect } from 'react';

// export default function HeadComp() {
//     useEffect(() => {
//         function updateFavicon() {
//             const existingFavicon = document.getElementById('favicon');
//             if (existingFavicon) {
//                 existingFavicon.parentNode?.removeChild(existingFavicon);
//             }

//             const favicon = document.createElement('link');
//             favicon.id = 'favicon';
//             favicon.rel = 'icon';
//             favicon.type = 'image/png';

//             const navigationEntry = performance.getEntriesByType('navigation')[0];
//             const isSearchResult = navigationEntry?.type === 'navigate' && document.referrer === '';

//             favicon.href = isSearchResult
//                 ? `/assets/brand/favicon-48x48.png?v=${Date.now()}` // Search result favicon
//                 : `/assets/brand/favicon-32x32.png?v=${Date.now()}`; // Normal favicon

//             document.head.appendChild(favicon);
//         }

//         updateFavicon();
//     }, []);

//     return (
//         <>
//             <Head>
//                 {/* Add id to favicon link for easy selection */}
//                 <link id="favicon" rel="icon" type="image/png" href="/assets/brand/favicon-48x48.png" />
//                 <link rel="apple-touch-icon" sizes="76x76" href="/assets/brand/apple-touch-icon.png" />
//                 <link rel="manifest" href="/site.webmanifest" />
//                 <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
//                 <meta name="msapplication-TileColor" content="#da532c" />
//                 <meta name="theme-color" content="#ffffff" />
//             </Head>
//             <Script
//                 id="gtm-script"
//                 strategy="afterInteractive"
//                 dangerouslySetInnerHTML={{
//                     __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-THTCRSLN');`,
//                 }}
//             />
//         </>
//     );
// }
