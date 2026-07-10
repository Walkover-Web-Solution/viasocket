const REFERRAL_KEY = 'referralId';

/**
 * Save referral ID to localStorage
 * Validates and trims the referral ID before saving
 * Overwrites any previous value
 */
export const saveReferral = (ref: string | null | undefined): void => {
    if (typeof window === 'undefined') return;

    if (!ref || typeof ref !== 'string') {
        removeReferral();
        return;
    }

    const trimmedRef = ref.trim();

    if (trimmedRef.length === 0) {
        removeReferral();
        return;
    }

    try {
        localStorage.setItem(REFERRAL_KEY, trimmedRef);
    } catch (error) {
        console.error('Failed to save referral:', error);
    }
};

/**
 * Get referral ID from localStorage
 * Returns null if not found or on SSR
 */
export const getReferral = (): string | null => {
    if (typeof window === 'undefined') return null;

    try {
        return localStorage.getItem(REFERRAL_KEY);
    } catch (error) {
        console.error('Failed to get referral:', error);
        return null;
    }
};

/**
 * Remove referral ID from localStorage
 */
export const removeReferral = (): void => {
    if (typeof window === 'undefined') return;

    try {
        localStorage.removeItem(REFERRAL_KEY);
    } catch (error) {
        console.error('Failed to remove referral:', error);
    }
};

/**
 * Append referral to URL as query parameter
 * Handles existing query parameters correctly
 * Encodes the referral value
 */
export const appendReferralToUrl = (url: string): string => {
    const referral = getReferral();

    if (!referral) {
        return url;
    }

    try {
        const urlObj = new URL(url);
        urlObj.searchParams.set('ref', referral);
        return urlObj.toString();
    } catch (error) {
        console.error('Failed to append referral to URL:', error);
        return url;
    }
};

/**
 * Capture referral from URL query parameter
 * Called on page load to extract and save ref parameter
 * Validates and trims the value
 */
export const captureReferralFromUrl = (): string | null => {
    if (typeof window === 'undefined') return null;

    try {
        const params = new URLSearchParams(window.location.search);
        const ref = params.get('ref');

        if (ref) {
            saveReferral(ref);
            return ref;
        }
    } catch (error) {
        console.error('Failed to capture referral from URL:', error);
    }

    return null;
};
