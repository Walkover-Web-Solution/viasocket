export const runtime = 'edge';

const buildProductsJson = (origin) => ({
    name: 'viaSocket',
    description: 'Integration Layer for your products & agents',
    url: `${origin}/`,
    packages: [
        {
            registry: 'npm',
            name: 'viasocket-apps',
            type: 'sdk',
            url: 'https://www.npmjs.com/package/viasocket-apps',
            install: 'npm install viasocket-apps',
            firstCall: "import { ViaSocket } from 'viasocket-apps'",
        },
        {
            registry: 'npm',
            name: 'viasocket-apps',
            type: 'cli',
            cli: true,
            binary: 'viasocket-apps',
            url: 'https://www.npmjs.com/package/viasocket-apps',
            install: 'npm install -g viasocket-apps',
            firstCall: 'npx viasocket-apps --help',
        },
        {
            registry: 'pypi',
            name: 'viasocket',
            type: 'sdk',
            url: 'https://pypi.org/project/viasocket/',
            install: 'pip install viasocket',
            firstCall: 'from viasocket import ViaSocket',
        },
    ],
    npm: 'viasocket-apps',
    pypi: 'viasocket',
    cli: 'viasocket-apps',
    sdks: {
        npm: 'viasocket-apps',
        pypi: 'viasocket',
    },
});

export async function GET(request) {
    const origin = new URL(request.url).origin;
    const body = buildProductsJson(origin);

    return new Response(JSON.stringify(body, null, 2), {
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
            'Access-Control-Allow-Origin': '*',
        },
    });
}
