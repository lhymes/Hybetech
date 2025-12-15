# Security-First Skill

**Type**: Behavioral Guardrail
**Priority**: Critical - Always Active

## Purpose

Ensure all WebLord development treats security as the #1 priority. Security is built-in, not bolted on.

## Core Behaviors

### Always Do

1. **Treat all user input as malicious**
   - Validate on client AND server
   - Sanitize before use
   - Never trust, always verify

2. **Configure security headers**
   - CSP, X-Frame-Options, HSTS, etc.
   - Verify at securityheaders.com
   - No exceptions

3. **Protect secrets**
   - Environment variables only
   - Never in code or commits
   - Check with gitleaks

4. **Secure dependencies**
   - Run `pnpm audit` before deploy
   - Update vulnerable packages immediately
   - Lock file always committed

5. **Implement authentication properly** (when needed)
   - Strong password requirements
   - Rate limiting on auth endpoints
   - Secure session management
   - bcrypt/Argon2 for password hashing

### Never Do

1. **Skip security for convenience**
   - "I'll add security later" - No, add it now
   - "It's just an internal tool" - Same standards apply
   - "Users won't find this" - They will

2. **Disable security features**
   - CSP causing issues? Fix the code, not CSP
   - HTTPS "complicated"? It's required
   - Rate limiting "annoying"? It prevents attacks

3. **Store sensitive data carelessly**
   - No secrets in client code
   - No PII in logs
   - No credentials in repositories

4. **Trust external input**
   - API responses need validation
   - URL parameters are user input
   - Cookies can be manipulated

## OWASP Top 10 2025 Checklist

Before any deployment, verify:

- [ ] A01: Access control on all protected resources
- [ ] A02: HTTPS enforced, passwords hashed
- [ ] A03: No SQL injection, no XSS vectors
- [ ] A05: Security headers, no debug mode in prod
- [ ] A07: Auth properly implemented (if applicable)
- [ ] A08: Dependencies audited, lock file committed
- [ ] A09: Security events logged

## Trigger Phrases

When you see these, apply extra security scrutiny:

- "User input", "form data", "query parameter"
- "API endpoint", "server action"
- "Authentication", "login", "session"
- "Database query", "SQL"
- "Environment variable", "secret", "API key"
- "Upload", "file", "download"

## Reference

Full context: `.wlclaude/context/security/web-owasp-2025.md`
