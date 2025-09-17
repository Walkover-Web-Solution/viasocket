import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getLinkRelAttribute, getLinkRelAttributeSyncFallback, isExternalLink } from '@/utils/linkUtils';

/**
 * SmartLink
 * - Always renders an <a> so rel is consistently applied for both internal and external links
 * - External links: default rel="nofollow noopener noreferrer" until dofollow rules load
 * - Internal links: client-side navigation via Next.js router, but rel still present on the element
 * - If API says dofollow, rel becomes "noopener noreferrer" (keeping security)
 */
export default function SmartLink({ href = '/', children, className, pageUrl, forceAnchor = false, relOverride, ...rest }) {
  const router = useRouter();
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
    return () => { mounted = false; };
  }, [href, pageUrl]);

  const external = isExternalLink(href);
  const finalRel = typeof relOverride !== 'undefined' ? relOverride : rel;

  const handleClick = (e) => {
    if (!external) {
      e.preventDefault();
      // Use client-side navigation for internal links
      router.push(href);
    }
    // For external links, allow default behavior
  };

  return (
    <a href={href} className={className || ''} rel={finalRel} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
