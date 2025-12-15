# Security Scan Tool

Run security scans on the codebase.

## Usage

```
/tools:scan
```

## Steps

### 1. Dependency Audit

```bash
# Check for vulnerable dependencies
pnpm audit

# Check for high/critical only
pnpm audit --audit-level=high
```

### 2. Secret Detection

```bash
# Check for leaked secrets
npx gitleaks detect --source=. --verbose
```

### 3. Static Analysis

```bash
# Run Semgrep security rules
npx semgrep --config=auto .

# Focus on security rules
npx semgrep --config=p/security-audit .
```

### 4. Check Security Headers

If site is deployed, check headers:
- Use securityheaders.com
- Verify all required headers present

### 5. Code Review

Manually check for:
- SQL injection vectors
- XSS vulnerabilities
- Hardcoded secrets
- Missing authentication
- CSRF vulnerabilities

### 6. Generate Report

```markdown
## Security Scan Results

### Dependency Audit
- Vulnerabilities found: [count]
- Critical: [count]
- High: [count]
- Medium: [count]
- Low: [count]

### Secret Detection
- Secrets found: [yes/no]
- Files affected: [list]

### Static Analysis
- Issues found: [count]
- Categories: [list]

### Required Actions
1. [Critical fixes]
2. [High priority fixes]
3. [Recommendations]
```

## Output

Security scan summary with issues and fixes.

## Related Commands

- Full security audit: `/workflows:security`
- Quick header check: `/quick:header`
