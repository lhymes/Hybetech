# Security Workflow

Comprehensive security audit aligned with OWASP Top 10 2025.

## Usage

```
/workflows:security
```

## Steps

### 1. Load Context

Read security guidelines:
- `.wlclaude/context/security/web-owasp-2025.md`

### 2. Audit Security Headers

Verify all headers configured:

```typescript
const requiredHeaders = [
  'Content-Security-Policy',
  'X-Frame-Options',
  'X-Content-Type-Options',
  'Strict-Transport-Security',
  'Referrer-Policy',
  'Permissions-Policy',
];
```

**Expected Values:**
- [ ] CSP: Restrictive policy, no unsafe-eval in production
- [ ] X-Frame-Options: DENY
- [ ] X-Content-Type-Options: nosniff
- [ ] HSTS: max-age=31536000; includeSubDomains
- [ ] Referrer-Policy: strict-origin-when-cross-origin
- [ ] Permissions-Policy: camera=(), microphone=(), geolocation=()

### 3. Audit Input Handling

For all forms and inputs:
- [ ] Client-side validation present
- [ ] Server-side validation required
- [ ] Input sanitization applied
- [ ] No SQL injection vectors
- [ ] No XSS vectors
- [ ] CSRF protection enabled

### 4. Audit Authentication (if present)

- [ ] Strong password requirements (12+ chars)
- [ ] Rate limiting on login (5 attempts/15 min)
- [ ] Secure session configuration
- [ ] Session timeout implemented
- [ ] Password hashing (bcrypt/Argon2)
- [ ] No session fixation vulnerabilities

### 5. Audit Data Handling

- [ ] No secrets in client code
- [ ] No secrets in environment files committed
- [ ] Sensitive data encrypted
- [ ] HTTPS enforced everywhere
- [ ] Secure cookie attributes (HttpOnly, Secure, SameSite)

### 6. Audit Dependencies

Run dependency audit:
```bash
pnpm audit
```

- [ ] No high/critical vulnerabilities
- [ ] Lock file committed
- [ ] Dependencies up to date
- [ ] No known malicious packages

### 7. Audit Access Control

- [ ] Protected routes require authentication
- [ ] Authorization checks on every request
- [ ] No IDOR vulnerabilities
- [ ] API endpoints protected

### 8. Code Scan

Run static analysis:
```bash
# Semgrep for security patterns
semgrep --config=auto .

# Check for secrets
gitleaks detect
```

### 9. Generate Security Report

Write to `docs/security-audit.md`:

```markdown
# Security Audit Report

## Date
[Current date]

## Summary
- Checks performed: [count]
- Issues found: [count]
- Severity: [critical/high/medium/low counts]

## Security Headers
| Header | Status | Value | Notes |
|--------|--------|-------|-------|

## OWASP Top 10 Compliance
| Category | Status | Notes |
|----------|--------|-------|
| A01: Broken Access Control | | |
| A02: Cryptographic Failures | | |
| A03: Injection | | |
| A05: Security Misconfiguration | | |
| A07: Auth Failures | | |
| A08: Software Integrity | | |
| A09: Logging Failures | | |

## Dependency Audit
[Results from pnpm audit]

## Code Scan Results
[Results from Semgrep/gitleaks]

## Critical Issues
[High priority fixes required]

## Recommendations
[Additional security improvements]
```

### 10. Fix Issues

Address all findings:
1. Critical - Fix immediately
2. High - Fix before deploy
3. Medium - Fix soon
4. Low - Address when possible

### 11. Validate Fixes

Re-run all scans:
- Security headers valid
- No audit vulnerabilities
- Code scans clean

## Security Checklist

### Every Site Must Have:
- [ ] HTTPS enforced
- [ ] All security headers
- [ ] Input validation
- [ ] CSRF protection
- [ ] No secrets in code

### If Auth Required:
- [ ] Strong password policy
- [ ] Rate limiting
- [ ] Secure sessions
- [ ] Password hashing

### If User Data:
- [ ] Encryption at rest
- [ ] Audit logging
- [ ] Privacy policy
- [ ] Data retention policy

## Output

At completion:
- Security audit report
- All critical/high issues fixed
- Headers properly configured
- Dependencies secure
- Code scans clean

## Related Commands

- SEO: `/workflows:seo`
- Performance: `/workflows:performance`
- Quick headers: `/quick:header`
