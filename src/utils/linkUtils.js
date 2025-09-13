import { getDoFollowUrl } from './axiosCalls';

// Cache for dofollow links data
let doFollowCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Get dofollow links from API with caching
 */
export async function getDoFollowLinks() {
    const now = Date.now();
    
    // Return cached data if still valid
    if (doFollowCache && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
        return doFollowCache;
    }
    
    try {
        const data = await getDoFollowUrl();
        doFollowCache = data || [];
        cacheTimestamp = now;
        return doFollowCache;
    } catch (error) {
        console.error('Error fetching dofollow links:', error);
        return doFollowCache || []; // Return cached data or empty array on error
    }
}

/**
 * Check if a URL should be dofollow based on the database configuration
 * @param {string} url - The URL to check
 * @param {Array} doFollowLinks - Array of dofollow link configurations
 * @returns {boolean} - True if the link should be dofollow
 */
export function shouldBeDoFollow(url, doFollowLinks = []) {
    if (!url || !Array.isArray(doFollowLinks)) {
        return false;
    }
    
    // Normalize URL for comparison
    const normalizedUrl = url.toLowerCase().trim();
    
    return doFollowLinks.some(linkConfig => {
        if (!linkConfig || !linkConfig.url) return false;
        
        const configUrl = linkConfig.url.toLowerCase().trim();
        const matchType = linkConfig.match_type || 'exact';
        const isActive = linkConfig.is_active !== false; // Default to true if not specified
        
        if (!isActive) return false;
        
        switch (matchType) {
            case 'exact':
                return normalizedUrl === configUrl;
            
            case 'domain':
                try {
                    const urlDomain = new URL(normalizedUrl.startsWith('http') ? normalizedUrl : `https://${normalizedUrl}`).hostname;
                    const configDomain = new URL(configUrl.startsWith('http') ? configUrl : `https://${configUrl}`).hostname;
                    return urlDomain === configDomain;
                } catch {
                    return normalizedUrl.includes(configUrl) || configUrl.includes(normalizedUrl);
                }
            
            case 'pattern':
                try {
                    const regex = new RegExp(linkConfig.pattern || configUrl, 'i');
                    return regex.test(normalizedUrl);
                } catch {
                    return normalizedUrl.includes(configUrl);
                }
            
            default:
                return normalizedUrl === configUrl;
        }
    });
}

/**
 * Get the appropriate rel attribute for a link
 * @param {string} url - The URL to check
 * @param {Array} doFollowLinks - Array of dofollow link configurations
 * @param {boolean} isExternal - Whether the link is external
 * @returns {string} - The rel attribute value
 */
export function getLinkRelAttribute(url, doFollowLinks = [], isExternal = false) {
    const isDoFollow = shouldBeDoFollow(url, doFollowLinks);
    
    if (isExternal) {
        // External links always get security attributes
        return isDoFollow ? 'noopener noreferrer' : 'nofollow noopener noreferrer';
    } else {
        // Internal links
        return isDoFollow ? '' : 'nofollow';
    }
}

/**
 * Get complete rel attribute including all necessary attributes
 * @param {string} url - The URL to check
 * @param {Array} doFollowLinks - Array of dofollow link configurations
 * @param {boolean} isExternal - Whether the link is external
 * @param {string} additionalRel - Additional rel attributes to include
 * @returns {string} - The complete rel attribute value
 */
export function getCompleteRelAttribute(url, doFollowLinks = [], isExternal = false, additionalRel = '') {
    const baseRel = getLinkRelAttribute(url, doFollowLinks, isExternal);
    
    if (additionalRel) {
        const relParts = [baseRel, additionalRel].filter(Boolean);
        return relParts.join(' ');
    }
    
    return baseRel;
}

/**
 * Check if a URL is external (different domain)
 * @param {string} url - The URL to check
 * @returns {boolean} - True if the URL is external
 */
export function isExternalUrl(url) {
    if (!url) return false;
    
    try {
        // Handle relative URLs
        if (url.startsWith('/') || url.startsWith('#') || url.startsWith('?')) {
            return false;
        }
        
        // Handle absolute URLs
        if (url.startsWith('http://') || url.startsWith('https://')) {
            const urlObj = new URL(url);
            const currentDomain = typeof window !== 'undefined' ? window.location.hostname : 'viasocket.com';
            return urlObj.hostname !== currentDomain;
        }
        
        // Handle protocol-relative URLs
        if (url.startsWith('//')) {
            const urlObj = new URL(`https:${url}`);
            const currentDomain = typeof window !== 'undefined' ? window.location.hostname : 'viasocket.com';
            return urlObj.hostname !== currentDomain;
        }
        
        // Handle other protocols (mailto, tel, etc.)
        if (url.includes(':')) {
            return !url.startsWith('http');
        }
        
        return false;
    } catch {
        return true; // Assume external if we can't parse it
    }
}

/**
 * Utility function to get all link attributes for a URL
 * @param {string} url - The URL to process
 * @param {Array} doFollowLinks - Array of dofollow link configurations
 * @param {Object} options - Additional options
 * @returns {Object} - Object containing href, rel, target, and other attributes
 */
export async function getLinkAttributes(url, doFollowLinks = null, options = {}) {
    const {
        target = null,
        additionalRel = '',
        forceExternal = null
    } = options;
    
    // Get dofollow links if not provided
    const links = doFollowLinks || await getDoFollowLinks();
    
    // Determine if external
    const isExternal = forceExternal !== null ? forceExternal : isExternalUrl(url);
    
    // Get rel attribute
    const rel = getCompleteRelAttribute(url, links, isExternal, additionalRel);
    
    // Prepare attributes
    const attributes = {
        href: url,
    };
    
    if (rel) {
        attributes.rel = rel;
    }
    
    if (target || (isExternal && !target)) {
        attributes.target = target || '_blank';
    }
    
    return attributes;
}
