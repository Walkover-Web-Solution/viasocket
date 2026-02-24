import '@/scss/global.scss';
import { cookies } from 'next/headers';
import AppProvider from './providers';

export const metadata = {
    title: 'ViaSocket',
    description: 'Connect your apps and automate workflows with ViaSocket',
    robots: process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT !== 'prod' ? 'noindex, nofollow' : undefined,
    icons: {
        icon: [
            { url: '/assets/brand/favicon-18x18.svg', sizes: '16x16', type: 'image/svg+xml' },
            { url: '/assets/brand/favicon-18x18.svg', sizes: '32x32', type: 'image/svg+xml' },
            // { url: '/assets/brand/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            // { url: '/assets/brand/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
            // { url: '/assets/brand/fav_icon.png', sizes: '48x48', type: 'image/png' },
            // { url: '/assets/brand/favicon-64x64.png', sizes: '64x64', type: 'image/png' },
            // { url: '/assets/brand/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
            // { url: '/assets/brand/favicon-128x128.png', sizes: '128x128', type: 'image/png' },
            // { url: '/assets/brand/favicon-144x144.png', sizes: '144x144', type: 'image/png' },
        ],
        apple: [{ url: '/assets/brand/apple-touch-icon.png', sizes: '76x76' }],
    },
    manifest: '/site.webmanifest',
    other: {
        'msapplication-TileColor': '#da532c',
        'theme-color': '#ffffff',
    },
};

export default async function RootLayout({ children }) {
    const cookieStore = await cookies();
    const token = cookieStore.get('prod');
    const hasToken = Boolean(token?.value);

    return (
        <html lang="en" data-theme="light">
            <head>
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-THTCRSLN"
                        height="0"
                        width="0"
                        style={{ display: 'none', visibility: 'hidden' }}
                    />
                </noscript>
            </head>
            <body>
                <div id="__next">
                    <AppProvider hasToken={hasToken}>{children}</AppProvider>
                </div>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function() {
              if (typeof window === 'undefined') return;
              if (typeof window.signals !== 'undefined') return;
              var script = document.createElement('script');
              script.src = 'https://cdn.cr-relay.com/v1/site/8159c31a-0d49-4a8b-9319-f945bbb5c4cf/signals.js';
              script.async = true;
              window.signals = Object.assign(
                [],
                ['page', 'identify', 'form'].reduce(function (acc, method){
                  acc[method] = function () {
                    signals.push([method, arguments]);
                    return signals;
                  };
                  return acc;
                }, {})
              );
              document.head.appendChild(script);
            })();`,
                    }}
                />
            </body>
        </html>
    );
}
