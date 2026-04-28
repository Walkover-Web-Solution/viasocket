# Dynamic robots.txt Implementation

## Problem

The subdomain is **not stored in environment variables** during build time, so we cannot detect integration subdomains statically. The subdomain is only known at **runtime** when a request is made.

## Solution

Use **Next.js App Router dynamic route** to generate `robots.txt` at runtime based on the actual request hostname.

---

## Architecture

### 1. Dynamic Route (Runtime Detection) ✅ PRIMARY

**File:** `/src/app/robots.txt/route.js`

- Detects subdomain from request headers (`host`)
- Uses the SAME logic as `/src/utils/domain.js`
- Generates appropriate `robots.txt` based on actual hostname
- Works for ANY subdomain without environment variables

### 2. Static Fallback (Build Time)

**File:** `/build-utilities/generate-robots-txt.js`

- Generates a safe fallback `robots.txt` in `/public/`
- Only used if dynamic route fails
- Production: Permissive (dynamic route handles blocking)
- Non-production: Blocks all

---

## How It Works

### Request Flow

```
User visits: integration.viasocket.com/robots.txt
    ↓
Next.js routes to: /src/app/robots.txt/route.js
    ↓
GET handler reads: request.headers.get('host')
    ↓
Returns: "integration.viasocket.com"
    ↓
isIntegrationSubdomain("integration.viasocket.com") → true
    ↓
Generates: Disallow: /
```

### Domain Detection Logic

```javascript
function isIntegrationSubdomain(hostname) {
  const parts = hostname.split('.');
  if (parts.length < 2) return false;
  
  const subdomain = parts[0].toLowerCase();
  return subdomain.includes('integration') || subdomain.includes('integrate');
}
```

**Same logic as client-side**, but works with hostname string instead of `window.location`.

---

## robots.txt Behavior

| Domain | Environment | robots.txt |
|--------|-------------|------------|
| `integration.viasocket.com` | Any | `Disallow: /` ❌ |
| `integrations.viasocket.com` | Any | `Disallow: /` ❌ |
| `integrate.viasocket.com` | Any | `Disallow: /` ❌ |
| `viasocket.com` | Production | `Allow: /` + Sitemap ✅ |
| `app.viasocket.com` | Production | `Allow: /` + Sitemap ✅ |
| `admin.viasocket.com` | Production | `Allow: /` + Sitemap ✅ |
| Any domain | Non-production | `Disallow: /` ⚠️ |

---

## Testing

### Test Locally

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Visit robots.txt:**
   ```bash
   curl http://localhost:3000/robots.txt
   ```

3. **Test with different hosts:**
   ```bash
   # Main domain
   curl -H "Host: viasocket.com" http://localhost:3000/robots.txt
   
   # Integration subdomain
   curl -H "Host: integration.viasocket.com" http://localhost:3000/robots.txt
   
   # Non-integration subdomain
   curl -H "Host: app.viasocket.com" http://localhost:3000/robots.txt
   ```

### Expected Results

**Main domain (viasocket.com):**
```
User-agent: *
Allow: /
Disallow: /admin/

Sitemap: https://viasocket.com/sitemap.xml
```

**Integration subdomain (integration.viasocket.com):**
```
User-agent: *
Disallow: /
```

**Non-integration subdomain (app.viasocket.com):**
```
User-agent: *
Allow: /
Disallow: /admin/

Sitemap: https://app.viasocket.com/sitemap.xml
```

---

## Advantages

✅ **No Environment Variables Needed** - Detects subdomain from request  
✅ **Works with Any Subdomain** - No configuration required  
✅ **Runtime Detection** - Always accurate, never stale  
✅ **Same Logic as UI** - Consistent with ConditionalNavbar/Footer  
✅ **SEO Safe** - Integration subdomains always blocked  
✅ **Dynamic Sitemap URLs** - Correct sitemap for each domain  
✅ **Production Ready** - Works on Vercel, any hosting platform  

---

## Files Modified

1. **`/src/app/robots.txt/route.js`** - NEW: Dynamic route handler
2. **`/build-utilities/generate-robots-txt.js`** - UPDATED: Simplified to fallback only

---

## Shared Logic

Both client-side (`domain.js`) and server-side (`route.js`) use the **exact same detection logic**:

```javascript
// Check if subdomain contains "integration" or "integrate"
subdomain.includes('integration') || subdomain.includes('integrate')
```

**Difference:** 
- Client: Uses `window.location.hostname`
- Server: Uses `request.headers.get('host')`

---

## Cache Behavior

The dynamic route includes cache headers:

```javascript
'Cache-Control': 'public, max-age=3600, s-maxage=3600'
```

- **Browser cache:** 1 hour
- **CDN cache:** 1 hour
- Reduces server load while staying fresh

---

## Deployment

### Vercel (Automatic)

Next.js automatically handles the dynamic route. No configuration needed.

### Other Platforms

Ensure your platform supports:
- Next.js App Router
- Dynamic routes
- Request header access

---

## Summary

This implementation solves the problem of **runtime subdomain detection** without requiring environment variables. The dynamic route generates the correct `robots.txt` based on the actual request hostname, ensuring integration subdomains are always blocked while the main domain remains indexable.

**Key Insight:** Since subdomains aren't in env vars, we must detect them at **request time**, not **build time**. Next.js dynamic routes make this possible.
