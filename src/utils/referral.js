export const REFERRAL_STORAGE_KEY = 'viasocket_referral_id';

export const trackReferral = () => {
    if (typeof window === 'undefined') return;
    
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    
    if (ref && ref.trim() !== '') {
        localStorage.setItem(REFERRAL_STORAGE_KEY, ref.trim());
    }
};

export const getStoredReferral = () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(REFERRAL_STORAGE_KEY);
};
