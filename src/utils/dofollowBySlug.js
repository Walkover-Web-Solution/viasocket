import { getDoFollowUrl } from '@/utils/axiosCalls';

/**
 * Returns true if the given slug is configured as dofollow in the DB table.
 * Defaults to false (nofollow everywhere) on errors or when not found.
 * @param {string} slug
 * @param {string} pageUrl - optional: used for tracing/error context
 * @returns {Promise<boolean>}
 */
export async function isSlugDoFollow(slug, pageUrl = '/dofollowBySlug') {
    if (!slug || typeof slug !== 'string') return false;
    try {
        const rows = await getDoFollowUrl(pageUrl);
        const match = (rows || []).find((row) => {
            const s = row?.slug || row?.app_slug || row?.appslug || row?.app_slug_name;
            const enabled =
                row?.do_follow_link === true ||
                row?.dofollow === true ||
                row?.is_active === true ||
                row?.enabled === true;
            return s && typeof s === 'string' && s.toLowerCase() === slug.toLowerCase() && enabled;
        });
        return !!match;
    } catch (e) {
        return false;
    }
}

/**
 * Convenience helper to build rel attributes for internal/external links
 * based on dofollow flag.
 */
export function getRelAttributes(isDoFollow) {
    return {
        relInternal: isDoFollow ? undefined : 'nofollow',
        relExternal: isDoFollow ? 'noopener noreferrer' : 'noopener noreferrer nofollow',
        relConnect: isDoFollow ? 'noopener noreferrer' : 'noopener noreferrer nofollow',
    };
}
