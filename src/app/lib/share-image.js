// A page's share image (og:image, twitter:image): its own image when it has one, else its hero drawn by
// app/og/[...path]/route.js. The site's old generic share image counts as none.

const SITE = 'https://viasocket.com';
const GENERIC = 'https://files.msg91.com/342616/wnitwkyk';

/** The hero image's URL for the page at `path` ('/pricing', '/mcp/slack'). */
export const heroImageUrl = (path) => `${SITE}/og${path}`;

const own = (image) => (image && image !== GENERIC ? image : null);

/** openGraph.images for the page at `path`, given its own image (or none). */
export const ogImages = (path, image) => {
    const url = own(image);
    return url ? [{ url }] : [{ url: heroImageUrl(path), width: 1200, height: 630 }];
};

/** twitter.images for the page at `path`, given its own image (or none). */
export const twitterImages = (path, image) => [own(image) || heroImageUrl(path)];
