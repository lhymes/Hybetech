# Quick Security Headers

Quickly configure security headers.

## Usage

```
/quick:header
```

## Steps

### 1. Add Security Headers

**Next.js (next.config.js):**
```javascript
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https:;",
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
];

module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};
```

**Astro (vercel.json or netlify.toml):**
```json
// vercel.json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Strict-Transport-Security", "value": "max-age=31536000; includeSubDomains" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    }
  ]
}
```

### 2. Header Descriptions

| Header | Purpose | Value |
|--------|---------|-------|
| CSP | Prevent XSS, data injection | Restrictive policy |
| X-Frame-Options | Prevent clickjacking | DENY |
| X-Content-Type-Options | Prevent MIME sniffing | nosniff |
| HSTS | Enforce HTTPS | max-age=31536000 |
| Referrer-Policy | Control referrer info | strict-origin-when-cross-origin |
| Permissions-Policy | Restrict browser features | camera=(), etc. |

### 3. Verify Headers

Test at: https://securityheaders.com/

Expected grade: A or A+

### 4. Checklist

- [ ] CSP configured (adjust for third-parties)
- [ ] X-Frame-Options: DENY
- [ ] X-Content-Type-Options: nosniff
- [ ] HSTS enabled
- [ ] Referrer-Policy set
- [ ] Permissions-Policy set

## Output

Security headers configuration ready to deploy.

## Related Commands

- Security workflow: `/workflows:security`
- Security scan: `/tools:scan`
