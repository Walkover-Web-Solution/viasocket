import '@/scss/global.scss';
import AppProvider from './providers';

export const metadata = {
    title: 'viaSocket',
    description: 'Connect your apps and automate workflows with viaSocket',
    robots: process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT !== 'prod' ? 'noindex, nofollow' : undefined,
    icons: {
        icon: [
            { url: '/assets/brand/favicon-18x18.svg', sizes: '16x16', type: 'image/svg+xml' },
            { url: '/assets/brand/favicon-18x18.svg', sizes: '32x32', type: 'image/svg+xml' },
        ],
        apple: [{ url: '/assets/brand/apple-touch-icon.png', sizes: '76x76' }],
    },
    manifest: '/site.webmanifest',
    other: {
        'msapplication-TileColor': '#da532c',
        'theme-color': '#ffffff',
    },
};

export default function RootLayout({ children }) {
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
                    <AppProvider>{children}</AppProvider>
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
