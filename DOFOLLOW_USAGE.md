# DoFollow/NoFollow System Usage Guide

## Overview
This system ensures **all links are nofollow by default** and only specific URLs configured in your database become dofollow. It uses the `getDoFollowUrl` API to fetch configuration from your database.

## How to Check DoFollow Status

### 1. Browser Developer Tools (Easiest Method)

**Step 1:** Open your website in browser
**Step 2:** Right-click on any link and select "Inspect Element"
**Step 3:** Look at the `rel` attribute in the HTML:

```html
<!-- NoFollow Link (Default) -->
<a href="https://example.com" rel="nofollow noopener noreferrer">Link Text</a>

<!-- DoFollow Link (Database Configured) -->
<a href="https://viasocket.com" rel="noopener noreferrer">Link Text</a>

<!-- Internal NoFollow Link -->
<a href="/some-page" rel="nofollow">Link Text</a>

<!-- Internal DoFollow Link -->
<a href="/some-page">Link Text</a>
```

### 2. Using the Test Component

**Step 1:** Add the test component to any page:

```javascript
import DoFollowTest from '@/components/DoFollowTest/DoFollowTest';

// In your component
<DoFollowTest />
```

**Step 2:** Visit the page to see:
- Current dofollow configuration from database
- Test links with their dofollow/nofollow status
- Visual indicators (green = dofollow, red = nofollow)

### 3. Using Browser Console

**Step 1:** Open browser console (F12)
**Step 2:** Run this code to check any link:

```javascript
// Check all links on current page
document.querySelectorAll('a').forEach((link, index) => {
    const rel = link.getAttribute('rel') || 'none';
    const isDoFollow = !rel.includes('nofollow');
    console.log(`Link ${index + 1}: ${link.href} - ${isDoFollow ? 'DOFOLLOW' : 'NOFOLLOW'} (rel="${rel}")`);
});

// Check specific link
const link = document.querySelector('a[href*="example.com"]');
if (link) {
    const rel = link.getAttribute('rel') || 'none';
    const isDoFollow = !rel.includes('nofollow');
    console.log(`${link.href} is ${isDoFollow ? 'DOFOLLOW' : 'NOFOLLOW'}`);
}
```

### 4. Using React Hook (For Developers)

```javascript
import { useDoFollowLinks } from '@/hooks/useDoFollowLinks';

function MyComponent() {
    const { checkIsDoFollow, doFollowLinks, loading } = useDoFollowLinks();
    
    const testUrl = 'https://example.com';
    const isDoFollow = checkIsDoFollow(testUrl);
    
    console.log(`${testUrl} is ${isDoFollow ? 'DOFOLLOW' : 'NOFOLLOW'}`);
    console.log('Current dofollow config:', doFollowLinks);
    
    return <div>Check console for results</div>;
}
```

## Database Configuration

### API Endpoint
```
https://table-api.viasocket.com/65d2ed33fa9d1a94a5224235/tblxpnrit
```

### Expected Database Structure
```json
[
    {
        "url": "https://viasocket.com",
        "match_type": "exact",
        "is_active": true,
        "pattern": null,
        "description": "ViaSocket main site"
    },
    {
        "url": "google.com",
        "match_type": "domain",
        "is_active": true,
        "pattern": null,
        "description": "Google domain"
    },
    {
        "url": ".*\\.trusted-site\\.com.*",
        "match_type": "pattern",
        "is_active": true,
        "pattern": ".*\\.trusted-site\\.com.*",
        "description": "Trusted site pattern"
    }
]
```

### Match Types
- **exact**: Exact URL match
- **domain**: Domain-based matching
- **pattern**: Regex pattern matching

## SEO Verification Tools

### 1. Online SEO Tools
- **Screaming Frog**: Crawl your site and check rel attributes
- **Ahrefs Site Audit**: Shows all nofollow/dofollow links
- **SEMrush Site Audit**: Link analysis with rel attributes

### 2. Browser Extensions
- **MozBar**: Shows link attributes on hover
- **Ahrefs SEO Toolbar**: Displays link information
- **SEOquake**: Link analysis features

## Testing Checklist

### ✅ Before Going Live
1. **Default Behavior**: Verify all new links are nofollow
2. **Database Links**: Confirm configured URLs are dofollow
3. **External Links**: Check they have security attributes
4. **Internal Links**: Verify proper Next.js Link usage
5. **Cache**: Test that changes reflect within 5 minutes

### ✅ Regular Monitoring
1. **Weekly**: Check key pages for correct rel attributes
2. **After Updates**: Verify new links follow the system
3. **Database Changes**: Test after modifying dofollow config

## Troubleshooting

### Links Not Updating
```javascript
// Clear cache and refresh
import { getDoFollowLinks } from '@/utils/linkUtils';

// Force refresh dofollow data
const freshData = await getDoFollowLinks();
console.log('Fresh dofollow data:', freshData);
```

### Check API Response
```javascript
// Test API directly
fetch('https://table-api.viasocket.com/65d2ed33fa9d1a94a5224235/tblxpnrit')
    .then(res => res.json())
    .then(data => console.log('API Response:', data))
    .catch(err => console.error('API Error:', err));
```

### Debug Component
```javascript
import { useDoFollowLinks } from '@/hooks/useDoFollowLinks';

function DebugComponent() {
    const { doFollowLinks, loading, error } = useDoFollowLinks();
    
    if (loading) return <div>Loading dofollow config...</div>;
    if (error) return <div>Error: {error.message}</div>;
    
    return (
        <div>
            <h3>DoFollow Configuration</h3>
            <pre>{JSON.stringify(doFollowLinks, null, 2)}</pre>
        </div>
    );
}
```

## Quick Commands

### Check All Links on Page
```javascript
// Run in browser console
console.table(
    Array.from(document.querySelectorAll('a')).map((link, i) => ({
        index: i + 1,
        href: link.href,
        rel: link.getAttribute('rel') || 'none',
        status: (link.getAttribute('rel') || '').includes('nofollow') ? 'NOFOLLOW' : 'DOFOLLOW'
    }))
);
```

### Count DoFollow vs NoFollow
```javascript
// Run in browser console
const links = document.querySelectorAll('a');
const doFollow = Array.from(links).filter(link => !(link.getAttribute('rel') || '').includes('nofollow'));
const noFollow = Array.from(links).filter(link => (link.getAttribute('rel') || '').includes('nofollow'));

console.log(`Total Links: ${links.length}`);
console.log(`DoFollow: ${doFollow.length}`);
console.log(`NoFollow: ${noFollow.length}`);
```

## Support

If you encounter issues:
1. Check browser console for errors
2. Verify API endpoint is accessible
3. Confirm database structure matches expected format
4. Test with the DoFollowTest component
5. Clear browser cache and try again
