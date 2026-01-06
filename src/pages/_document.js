import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="en" data-theme="light">
            <Head />
            <body>
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-THTCRSLN"
                        height="0"
                        width="0"
                        style={{ display: 'none', visibility: 'hidden' }}
                    ></iframe>
                </noscript>
                <Main />
                <NextScript />
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
                ></script>
            </body>
        </Html>
    );
}
