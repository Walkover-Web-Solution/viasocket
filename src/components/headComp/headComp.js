import Head from 'next/head';
import Script from 'next/script';

export default function HeadComp({ canonicalUrl }) {
    return (
        <>
            <Head>
                {!process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT ||
                    (process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT !== 'prod' && (
                        <meta name="robots" content="noindex, nofollow" />
                    ))}

                {/* Favicon links for different sizes */}
                {/* <link rel="icon" type="image/png" sizes="16x16" href="/assets/brand/favicon-16x16.png" /> */}
                <link rel="icon" type="image/png" sizes="16x16" href="/assets/brand/favicon-18x18.svg" />
                {/* <link rel="icon" type="image/png" sizes="32x32" href="/assets/brand/favicon-32x32.png" /> */}
                {/* <link rel="icon" type="image/png" sizes="48x48" href="/assets/brand/fav_icon.png" /> */}
                {/* <link rel="icon" type="image/png" sizes="64x64" href="/assets/brand/favicon-64x64.png" /> */}
                {/* <link rel="icon" type="image/png" sizes="96x96" href="/assets/brand/favicon-96x96.png" /> */}
                {/* <link rel="icon" type="image/png" sizes="128x128" href="/assets/brand/favicon-128x128.png" /> */}
                {/* <link rel="icon" type="image/png" sizes="144x144" href="/assets/brand/favicon-144x144.png" /> */}
                
                <link rel="apple-touch-icon" sizes="76x76" href="/assets/brand/apple-touch-icon.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
                {/* Add canonical URL if provided */}
                {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
            </Head>
            <Script
                id="gtm-script"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-THTCRSLN');`,
                }}
            />
            {/* Twitter conversion tracking base code  */}
            <Script
                id="twitter-conversion"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `!function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);},s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');twq('config','pnuam');`,
                }}
            />
            {/* End Twitter conversion tracking base code  */}
        </>
    );
}
