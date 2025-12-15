# OWASP Top 10 2025 for Web Applications

**Purpose**: Security reference for WebLord website generation
**Standard**: OWASP Top 10 2025
**Updated**: December 2025

---

## Overview

Every WebLord website must address applicable OWASP vulnerabilities from the start.

---

## A01: Broken Access Control

### Risk
Unauthorized access to resources, data, or functionality.

### Web Application Relevance
- Admin pages accessible without authentication
- User can access other users' data by changing URL
- API endpoints not checking permissions

### Mitigations for WebLord Sites

```typescript
// 1. Deny by default - require explicit permission grants
export async function GET(request: Request) {
  const session = await getSession(request);
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Check specific permission
  if (!hasPermission(session.user, 'read:resource')) {
    return new Response('Forbidden', { status: 403 });
  }

  // Process request...
}

// 2. Rate limiting
const rateLimit = new RateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
});

// 3. Validate ownership
const resource = await getResource(params.id);
if (resource.userId !== session.user.id) {
  return new Response('Forbidden', { status: 403 });
}
```

### Implementation Checklist
- [ ] Authentication required on all protected routes
- [ ] Authorization checks on every request
- [ ] Rate limiting implemented
- [ ] JWT tokens with short expiry (15 min access, 7 day refresh)
- [ ] CORS properly configured

---

## A02: Cryptographic Failures

### Risk
Exposure of sensitive data through weak cryptography.

### Web Application Relevance
- Passwords stored in plain text or weak hash
- HTTP used instead of HTTPS
- Sensitive data in client-side storage

### Mitigations for WebLord Sites

```typescript
// 1. HTTPS enforcement in config
// next.config.js
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=31536000; includeSubDomains; preload'
        }
      ]
    }
  ];
}

// 2. Password hashing (if auth implemented)
import bcrypt from 'bcrypt';
const SALT_ROUNDS = 12;

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// 3. Never store secrets in client code
// Use environment variables
const apiKey = process.env.API_KEY; // Server-side only
```

### Implementation Checklist
- [ ] HTTPS enforced (HSTS header)
- [ ] TLS 1.3 minimum
- [ ] Passwords hashed with bcrypt (cost 12) or Argon2
- [ ] No secrets in client bundles
- [ ] Sensitive cookies: Secure, HttpOnly, SameSite=Strict

---

## A03: Injection

### Risk
Untrusted data sent to interpreter, executing unintended commands.

### Web Application Relevance
- SQL injection in database queries
- XSS (Cross-Site Scripting) in rendered output
- Command injection in server-side code

### Mitigations for WebLord Sites

```typescript
// 1. SQL - Use parameterized queries / ORM
// DON'T
const query = `SELECT * FROM users WHERE email = '${email}'`; // ❌

// DO - Use ORM (Prisma, Drizzle)
const user = await prisma.user.findUnique({
  where: { email }
}); // ✅

// 2. XSS - React/Astro escape by default
// DON'T
<div dangerouslySetInnerHTML={{ __html: userInput }} /> // ❌

// DO - Let framework escape
<div>{userInput}</div> // ✅

// 3. If HTML needed, sanitize
import DOMPurify from 'dompurify';
const sanitized = DOMPurify.sanitize(userInput);

// 4. Content Security Policy
const csp = `
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self';
  connect-src 'self' https://api.example.com;
`;
```

### Implementation Checklist
- [ ] Parameterized queries / ORM used
- [ ] Framework escapes output by default
- [ ] dangerouslySetInnerHTML avoided or sanitized
- [ ] CSP header configured
- [ ] Input validation on all user inputs

---

## A05: Security Misconfiguration

### Risk
Insecure default configurations, unnecessary features enabled.

### Web Application Relevance
- Debug mode in production
- Default credentials
- Verbose error messages
- Unnecessary headers

### Mitigations for WebLord Sites

```typescript
// 1. Security headers configuration
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()'
  }
];

// 2. Production environment checks
if (process.env.NODE_ENV === 'production') {
  // Disable source maps
  // Disable verbose logging
  // Enable security features
}

// 3. Generic error responses
catch (error) {
  console.error('Internal error:', error); // Log full error server-side
  return new Response('An error occurred', { status: 500 }); // Generic to client
}
```

### Implementation Checklist
- [ ] Debug mode disabled in production
- [ ] No default credentials
- [ ] Security headers configured
- [ ] Error messages generic to users
- [ ] Unnecessary endpoints removed
- [ ] Source maps disabled in production

---

## A07: Identification and Authentication Failures

### Risk
Authentication mechanisms that can be bypassed or exploited.

### Web Application Relevance
- Weak password requirements
- No brute force protection
- Session fixation

### Mitigations for WebLord Sites

```typescript
// 1. Password requirements
const passwordSchema = z.string()
  .min(12, 'Password must be at least 12 characters')
  .regex(/[A-Z]/, 'Password must contain uppercase letter')
  .regex(/[a-z]/, 'Password must contain lowercase letter')
  .regex(/[0-9]/, 'Password must contain number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain special character');

// 2. Rate limiting on auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 attempts per window
  message: 'Too many login attempts, please try again later'
});

// 3. Secure session configuration
const sessionConfig = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    httpOnly: true,
    secure: true, // HTTPS only
    sameSite: 'strict',
    maxAge: 30 * 60 * 1000 // 30 minutes
  },
  rolling: true // Extend session on activity
};

// 4. Regenerate session on login
await session.regenerate();
```

### Implementation Checklist (if auth required)
- [ ] Strong password requirements (12+ chars)
- [ ] Rate limiting on login (5 attempts/15 min)
- [ ] Session timeout (30 min idle)
- [ ] Secure cookie settings
- [ ] Session regeneration on auth
- [ ] Multi-factor authentication available

---

## A08: Software and Data Integrity Failures

### Risk
Compromised dependencies or build pipeline.

### Mitigations for WebLord Sites

```yaml
# 1. Lock files committed
pnpm-lock.yaml # Always commit

# 2. Dependency auditing in CI
- name: Audit dependencies
  run: pnpm audit --audit-level=high

# 3. Subresource Integrity for external scripts
<script
  src="https://cdn.example.com/lib.js"
  integrity="sha384-..."
  crossorigin="anonymous"
></script>

# 4. Dependabot configuration
# .github/dependabot.yml
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
    open-pull-requests-limit: 10
```

### Implementation Checklist
- [ ] Lock file committed
- [ ] Dependency audit in CI
- [ ] Dependabot or similar configured
- [ ] SRI for external scripts
- [ ] Protected branches in Git

---

## A09: Security Logging and Monitoring Failures

### Risk
Attacks go undetected due to insufficient logging.

### Mitigations for WebLord Sites

```typescript
// 1. Log security events
function logSecurityEvent(event: {
  type: string;
  userId?: string;
  ip: string;
  details: object;
}) {
  console.log(JSON.stringify({
    timestamp: new Date().toISOString(),
    level: 'SECURITY',
    ...event
  }));
}

// 2. Log failed authentications
logSecurityEvent({
  type: 'AUTH_FAILURE',
  ip: request.headers.get('x-forwarded-for'),
  details: { email, reason: 'invalid_password' }
});

// 3. Log access to sensitive data
logSecurityEvent({
  type: 'DATA_ACCESS',
  userId: session.user.id,
  ip: request.headers.get('x-forwarded-for'),
  details: { resource: 'user_data', action: 'export' }
});
```

### Implementation Checklist
- [ ] Authentication events logged
- [ ] Failed login attempts tracked
- [ ] Access to sensitive data logged
- [ ] Logs don't contain sensitive data
- [ ] Log retention policy defined

---

## Security Headers Template

```typescript
// next.config.js or middleware
const securityHeaders = [
  // Prevent clickjacking
  { key: 'X-Frame-Options', value: 'DENY' },

  // Prevent MIME type sniffing
  { key: 'X-Content-Type-Options', value: 'nosniff' },

  // Prevent XSS in older browsers
  { key: 'X-XSS-Protection', value: '1; mode=block' },

  // Control referrer information
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },

  // Enforce HTTPS
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },

  // Restrict browser features
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },

  // Content Security Policy
  {
    key: 'Content-Security-Policy',
    value: "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self';"
  },
];
```

---

## WebLord Security Checklist

### Every Site Must Have
- [ ] HTTPS enforced
- [ ] All security headers configured
- [ ] Input validation on all forms
- [ ] CSRF protection
- [ ] No secrets in client code

### If Authentication Required
- [ ] Strong password policy
- [ ] Rate limiting on auth
- [ ] Secure session management
- [ ] Password hashing (bcrypt/Argon2)

### If User Data Stored
- [ ] Encryption at rest for sensitive data
- [ ] Audit logging
- [ ] Data retention policy
- [ ] GDPR/CCPA compliance

---

**Remember**: Security is not optional. Every WebLord site is secure by default.
