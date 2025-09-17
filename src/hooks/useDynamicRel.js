import { useEffect, useState } from 'react';
import { getLinkRelAttribute, getLinkRelAttributeSyncFallback } from '@/utils/linkUtils';

/**
 * useDynamicRel
 * - Returns a `rel` string for a given href based on dofollow/nofollow rules.
 * - Defaults to "nofollow noopener noreferrer" for external links until rules load.
 * - Internal links return `undefined` (no rel needed).
 */
export default function useDynamicRel(href, pageUrl) {
  const [rel, setRel] = useState(getLinkRelAttributeSyncFallback(href));

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const computed = await getLinkRelAttribute(href, pageUrl);
        if (mounted) setRel(computed);
      } catch {
        if (mounted) setRel(getLinkRelAttributeSyncFallback(href));
      }
    })();
    return () => {
      mounted = false;
    };
  }, [href, pageUrl]);

  return rel;
}
