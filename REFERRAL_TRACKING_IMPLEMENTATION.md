# Referral Tracking Implementation

## Overview

This document describes the minimal, non-invasive referral tracking system implemented for ViaSocket. The system captures referral IDs from URL query parameters and appends them to redirects to the Flow application.

## Architecture

### Core Principle: Minimal Invasiveness

- **No authentication changes**: Existing login/signup flows untouched
- **No refactoring**: Existing utilities and patterns reused
- **Additive only**: New functionality layered on top of existing code
- **SSR-safe**: All localStorage access guarded with `typeof window` checks

## Files Modified

### 1. `/src/utils/handleRedirection.js`

**Change**: Added referral appending to all redirects

```javascript
// Added import
import { appendReferralToUrl } from './referralUtils';

// Added single line before redirect
finalUrl = appendReferralToUrl(finalUrl);
```

**Why it's safe**:
- Single line addition that doesn't change existing logic
- `appendReferralToUrl()` returns the original URL if no referral exists
- No impact on UTM source handling or existing redirect behavior
- Works with both internal (`router.push`) and external (`window.open`) redirects

**Impact**: All redirects to Flow app now include `?ref=<referralId>` if available

## Files Created

### 2. `/src/utils/referralUtils.ts`

**Purpose**: Core referral management utilities

**Functions**:

#### `saveReferral(ref: string | null | undefined): void`
- Validates and trims the referral ID
- Saves to localStorage with key `referralId`
- Overwrites any previous value
- Removes referral if invalid/empty

#### `getReferral(): string | null`
- Retrieves referral from localStorage
- Returns null on SSR or if not found
- Safe error handling

#### `removeReferral(): void`
- Clears referral from localStorage
- Safe error handling

#### `appendReferralToUrl(url: string): string`
- Appends referral as query parameter `?ref=<encoded_value>`
- Handles existing query parameters correctly using `URLSearchParams`
- Returns original URL if no referral exists
- Encodes values automatically

#### `captureReferralFromUrl(): string | null`
- Extracts `ref` parameter from current URL
- Validates and trims the value
- Saves to localStorage
- Returns the captured referral or null

**Why it's production-ready**:
- All localStorage access guarded with `typeof window === 'undefined'` checks
- Comprehensive error handling with try-catch blocks
- Uses standard Web APIs (URL, URLSearchParams)
- No external dependencies
- TypeScript for type safety

### 3. `/src/components/ReferralCapture.tsx`

**Purpose**: React component to capture referral on home page load

**Behavior**:
1. Runs on component mount (useEffect with empty dependency array)
2. Calls `captureReferralFromUrl()` to extract and save ref parameter
3. Cleans up URL using `history.replaceState()` to remove `?ref=...` from browser address bar
4. Handles edge cases (missing ref, URL parsing errors)
5. Returns null (invisible component)

**Integration**:
```jsx
// Add to home page (e.g., /src/app/page.js)
import ReferralCapture from '@/components/ReferralCapture';

export default function Home() {
    return (
        <>
            <ReferralCapture />
            {/* Rest of home page content */}
        </>
    );
}
```

**Why it's safe**:
- No visual output (returns null)
- Only runs on client side (useEffect)
- Graceful error handling
- Doesn't interfere with existing page functionality
- URL cleanup is optional (try-catch wrapped)

## Referral Flow

### Capture Phase

1. User lands on `https://viasocket.com?ref=REFERRAL_ID`
2. `ReferralCapture` component runs on page load
3. `captureReferralFromUrl()` extracts and validates the ref parameter
4. Value is trimmed and saved to localStorage as `referralId`
5. URL is cleaned to remove the ref parameter

### Redirect Phase

1. User clicks redirect button (e.g., "Install Template", "Go to Flow")
2. `handleRedirect()` is called
3. After building the final URL with UTM parameters, `appendReferralToUrl()` is called
4. If `referralId` exists in localStorage, it's appended as `?ref=<encoded_value>`
5. User is redirected to Flow app with referral parameter

### Flow App Phase

In the Flow application (separate codebase):

```javascript
// On first page load
import { captureReferralFromUrl, getReferral } from '@/utils/referralUtils';

useEffect(() => {
    // Capture ref from URL if present
    const ref = captureReferralFromUrl();
    
    // Or retrieve existing referral
    const existingRef = getReferral();
    
    // Use ref for tracking/analytics
    if (ref || existingRef) {
        trackReferral(ref || existingRef);
    }
}, []);
```

## Edge Cases Handled

| Case | Behavior |
|------|----------|
| Missing ref | No action, no error |
| Empty ref | Removed from localStorage |
| Whitespace-only ref | Trimmed and removed if empty |
| Invalid values | Saved as-is (validation at Flow app level) |
| Overwrite old referral | New value replaces old value |
| Existing query params | Correctly appended using URLSearchParams |
| Encoded values | Automatically handled by URL API |
| Direct visit to Flow | No ref parameter, no error |
| Refresh after login | Referral persists in localStorage |
| SSR rendering | All window access guarded |
| localStorage unavailable | Graceful error handling, no crash |

## Data Persistence

- **Storage**: Browser localStorage with key `referralId`
- **Scope**: Same-origin (viasocket.com and subdomains)
- **Lifetime**: Until explicitly removed or user clears localStorage
- **Survives**: Page refresh, route changes, login, signup

## Security Considerations

1. **No sensitive data**: Referral IDs are expected to be public identifiers
2. **URL encoding**: Automatic via URLSearchParams API
3. **XSS protection**: No eval or innerHTML usage
4. **CSRF safe**: No state-changing operations
5. **localStorage access**: Guarded for SSR safety

## Testing Checklist

- [ ] Visit `https://viasocket.com?ref=test123` → referralId saved to localStorage
- [ ] Refresh page → referralId persists
- [ ] Click redirect button → URL includes `?ref=test123`
- [ ] Visit `https://viasocket.com?ref=` (empty) → referralId removed
- [ ] Visit `https://viasocket.com?ref=  ` (whitespace) → referralId removed
- [ ] Visit `https://viasocket.com?ref=test%20value` → correctly decoded and saved
- [ ] Multiple redirects → referralId appended to all
- [ ] Existing query params → ref appended correctly
- [ ] Flow app receives ref parameter → can be captured and used

## Performance Impact

- **Zero impact**: No additional network requests
- **Minimal DOM**: Component returns null (invisible)
- **Efficient**: Single localStorage read/write per referral capture
- **No re-renders**: Component doesn't trigger parent re-renders

## Backward Compatibility

- **Existing redirects**: Unaffected if no referral exists
- **UTM tracking**: Fully preserved and working
- **Login flow**: No changes to authentication
- **Signup flow**: No changes to signup process

## Future Enhancements

1. **Referral analytics**: Track referral conversions in backend
2. **Referral rewards**: Implement reward system based on referral ID
3. **Referral dashboard**: Show referral stats to users
4. **Expiration**: Add optional referral expiration logic
5. **Validation**: Server-side validation of referral IDs

## Troubleshooting

### Referral not appearing in redirect URL
- Check browser console for errors
- Verify `ReferralCapture` component is on home page
- Check localStorage for `referralId` key
- Verify `appendReferralToUrl()` is being called

### Referral not persisting across pages
- Check browser localStorage is enabled
- Verify no errors in console
- Check for privacy/incognito mode restrictions

### URL cleanup not working
- Check browser console for errors
- Verify `history.replaceState()` is supported (all modern browsers)
- Fallback behavior: URL will still work even if not cleaned

## Summary

This implementation provides a minimal, non-invasive referral tracking system that:
- ✅ Captures referral IDs from URL parameters
- ✅ Persists across page refreshes and route changes
- ✅ Appends referral to all redirects to Flow app
- ✅ Handles all edge cases gracefully
- ✅ Is production-ready and SSR-safe
- ✅ Requires no changes to authentication
- ✅ Has zero performance impact
- ✅ Maintains backward compatibility
