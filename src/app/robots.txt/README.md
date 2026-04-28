# Dynamic Robots.txt Generation

This route dynamically generates `robots.txt` based on the **actual subdomain** from each incoming request.

## How It Works

1. **Runtime Detection**: When a user accesses `/robots.txt`, the route handler reads the `host` header from the request
2. **Subdomain Check**: Parses the hostname to detect if it's an integration-related subdomain (contains "integration" or "integrate")
3. **Dynamic Response**: Returns appropriate robots.txt content based on:
   - Environment (production vs non-production)
   - Subdomain type (integration vs main domain)

## Logic

```javascript
// Integration subdomains (integration.viasocket.com, integrations.viasocket.com)
// → Always blocked (Disallow: /)

// Main domain in production (viasocket.com)
// → Allow crawling with sitemap (Disallow: /admin/)

// Any domain in non-production
// → Blocked (Disallow: /)
```

## Examples

| URL | Environment | Robots.txt |
|-----|-------------|------------|
| `integration.viasocket.com/robots.txt` | Production | Disallow: / |
| `viasocket.com/robots.txt` | Production | Allow with sitemap |
| `app.viasocket.com/robots.txt` | Production | Allow with sitemap |
| `*.viasocket.com/robots.txt` | Development | Disallow: / |

## Benefits

✅ **No environment variables needed** - Detects subdomain from actual request  
✅ **Works with any deployment** - No Vercel-specific dependencies  
✅ **Accurate detection** - Uses the same logic as `src/utils/domain.js`  
✅ **Cached for performance** - 1-hour cache on responses  

## Testing

```bash
# Test locally
curl http://localhost:3000/robots.txt

# Test on different subdomains
curl https://viasocket.com/robots.txt
curl https://integration.viasocket.com/robots.txt
```
