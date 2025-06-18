export async function getServerSideProps({ res }) {
    const isProd = process.env.NEXT_PUBLIC_PRODUCTION_ENVIRONMENT === 'prod';

    const content = isProd
        ? `User-agent: *
Disallow: /admin/
Sitemap: https://socket-plug-services-h7duexlbuq-el.a.run.app/sitemap/index-page
Sitemap: https://viasocket.com/sitemap.xml`
        : `User-agent: *
Disallow: /`;

    res.setHeader('Content-Type', 'text/plain');
    res.write(content);
    res.end();

    return { props: {} };
}

export default function Robots() {
    return null;
}
