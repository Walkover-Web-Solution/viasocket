import { useState, useEffect, useCallback } from 'react';
import { getDoFollowLinks, shouldBeDoFollow, getLinkAttributes } from '@/utils/linkUtils';

/**
 * Custom hook for managing dofollow links
 * Provides access to dofollow configuration and utility functions
 */
export const useDoFollowLinks = () => {
    const [doFollowLinks, setDoFollowLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load dofollow links on mount
    useEffect(() => {
        const loadDoFollowLinks = async () => {
            try {
                setLoading(true);
                setError(null);
                const links = await getDoFollowLinks();
                setDoFollowLinks(links || []);
            } catch (err) {
                console.error('Error loading dofollow links:', err);
                setError(err);
                setDoFollowLinks([]);
            } finally {
                setLoading(false);
            }
        };

        loadDoFollowLinks();
    }, []);

    // Function to check if a URL should be dofollow
    const checkIsDoFollow = useCallback((url) => {
        return shouldBeDoFollow(url, doFollowLinks);
    }, [doFollowLinks]);

    // Function to get link attributes
    const getLinkProps = useCallback(async (url, options = {}) => {
        return await getLinkAttributes(url, doFollowLinks, options);
    }, [doFollowLinks]);

    // Function to refresh dofollow links
    const refresh = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const links = await getDoFollowLinks();
            setDoFollowLinks(links || []);
        } catch (err) {
            console.error('Error refreshing dofollow links:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        doFollowLinks,
        loading,
        error,
        checkIsDoFollow,
        getLinkProps,
        refresh
    };
};

/**
 * Hook for getting link attributes for a specific URL
 * Updates automatically when URL changes
 */
export const useLinkAttributes = (url, options = {}) => {
    const [attributes, setAttributes] = useState({
        href: url,
        rel: 'nofollow',
        target: undefined
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const updateAttributes = async () => {
            if (!url) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const attrs = await getLinkAttributes(url, null, options);
                setAttributes(attrs);
            } catch (error) {
                console.error('Error getting link attributes:', error);
                // Fallback to safe defaults
                setAttributes({
                    href: url,
                    rel: 'nofollow',
                    target: options.target || undefined
                });
            } finally {
                setLoading(false);
            }
        };

        updateAttributes();
    }, [url, JSON.stringify(options)]);

    return { attributes, loading };
};

export default useDoFollowLinks;
