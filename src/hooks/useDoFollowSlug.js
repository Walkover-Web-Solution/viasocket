import { useEffect, useMemo, useState } from 'react';
import { isSlugDoFollow, getRelAttributes } from '@/utils/dofollowBySlug';

/**
 * Hook: resolves whether a slug should have dofollow and provides ready-to-use rel attributes.
 * Default behavior is nofollow everywhere unless DB marks slug as dofollow.
 *
 * @param {string} slug
 * @param {string} pageUrl optional page identifier used for tracing/error context
 * @returns {{ isDoFollowSlug: boolean, relInternal: string|undefined, relExternal: string, relConnect: string }}
 */
export function useDoFollowSlug(slug, pageUrl = '/dofollowBySlug') {
    const [isDoFollowSlug, setIsDoFollowSlug] = useState(false);

    useEffect(() => {
        let mounted = true;
        async function run() {
            const ok = await isSlugDoFollow(slug, pageUrl);
            if (mounted) setIsDoFollowSlug(!!ok);
        }
        if (slug) run();
        return () => {
            mounted = false;
        };
    }, [slug, pageUrl]);

    const { relInternal, relExternal, relConnect } = useMemo(
        () => getRelAttributes(isDoFollowSlug),
        [isDoFollowSlug]
    );

    return { isDoFollowSlug, relInternal, relExternal, relConnect };
}
