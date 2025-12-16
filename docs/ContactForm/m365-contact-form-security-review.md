# Security Review: M365 Contact Form

**Review Date**: December 14, 2025
**Reviewer**: Claude Code (AI-assisted development)
**Status**: PRE-DEPLOYMENT REVIEW

---

## Executive Summary

This document provides a comprehensive security review of the M365 Contact Form feature, following a zero-trust approach and referencing official security guidelines from Microsoft, AWS, OWASP, and recent security research.

### Key Findings

| Category | Risk Level | Status | Notes |
|----------|------------|--------|-------|
| Input Validation | Low | Mitigated | Zod schema with strict validation |
| XSS Prevention | Low | Mitigated | HTML stripping + output encoding |
| Secret Management | Medium | Documented | Environment variables with KMS (Secrets Manager recommended) |
| Microsoft Graph Permissions | Medium | Action Required | Application Access Policy recommended |
| CAPTCHA Protection | Low | Implemented | Cloudflare Turnstile with server-side verification |
| Data Leakage | Low | Mitigated | No PII logging, generic error messages |
| AI-Generated Code Risks | Medium | Reviewed | Manual code review completed |

---

## Security Analysis by Category

### 1. Input Validation (OWASP A03: Injection)

**Official Guidance**: [OWASP Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)

> "Input validation must be implemented on the server-side before any data is processed by an application's functions."

**Implementation Review**:

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| Server-side validation | ✅ | Zod schema in Lambda handler |
| Allowlist approach | ✅ | Defined allowed patterns for each field |
| Type validation | ✅ | Email format, max lengths enforced |
| Required field enforcement | ✅ | Zod `.min(1)` for required fields |

**Code Evidence**:
```typescript
// handler.ts - Lines 75-106
const ContactFormSchema = z.object({
  firstName: z.string().trim().min(1).max(100).transform(stripHtml),
  email: z.string().trim().email().max(254).toLowerCase(),
  message: z.string().trim().min(10).max(5000).transform(stripHtml),
  // ...
});
```

**Verdict**: ✅ PASS - Server-side validation implemented correctly

---

### 2. XSS Prevention (OWASP A03: Injection)

**Official Guidance**: [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)

> "All user data controlled must be encoded when returned in the HTML page to prevent the execution of malicious data."

**AI-Generated Code Risk**: Research shows 86% of AI-generated code fails XSS defense tests ([Veracode GenAI Report](https://www.veracode.com/blog/genai-code-security-report/)).

**Implementation Review**:

| Defense Layer | Status | Implementation |
|---------------|--------|----------------|
| Input stripping | ✅ | `stripHtml()` removes all HTML tags |
| Output encoding | ✅ | `escapeHtml()` encodes special characters |
| Content-Type header | ✅ | Email sent as HTML with escaped content |

**Code Evidence**:
```typescript
// handler.ts - Lines 115-132
function stripHtml(input: string): string {
  return input.replace(/<[^>]*>/g, "").replace(/[<>]/g, "").trim();
}

function escapeHtml(input: string): string {
  const escapeMap = { "&": "&amp;", "<": "&lt;", ">": "&gt;", ... };
  return input.replace(/[&<>"']/g, (char) => escapeMap[char] || char);
}
```

**Double Defense**:
1. Input is stripped of HTML on entry (prevents storage of malicious content)
2. Output is escaped when building email (defense in depth)

**Verdict**: ✅ PASS - Double-layer XSS protection implemented

---

### 3. Secret Management (AWS Lambda Security)

**Official Guidance**: [AWS Lambda Securing Environment Variables](https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars-encryption.html)

> "AWS recommends using AWS Secrets Manager instead of environment variables to store database credentials."

**Current Implementation**: Environment variables with AWS KMS encryption

**Risk Analysis**:

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Screen-sharing leak | Low | High | Training, access controls |
| Third-party auditor leak | Very Low | High | Vendor security review |
| Lambda cold start exposure | Very Low | Medium | KMS encryption |

**Recommendations**:

**Option A (Current - Acceptable)**:
- Environment variables with KMS encryption
- Restrict `lambda:GetFunctionConfiguration` permission
- Never share screen when viewing Lambda configuration

**Option B (Enhanced - Recommended for production)**:
- Migrate to AWS Secrets Manager
- Rotate client secret every 90 days
- No additional cost for Parameter Store (free tier)

```typescript
// Enhanced implementation using Secrets Manager
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

async function getSecrets(): Promise<Config> {
  const client = new SecretsManagerClient({ region: "us-east-1" });
  const command = new GetSecretValueCommand({ SecretId: "contact-form/config" });
  const response = await client.send(command);
  return JSON.parse(response.SecretString!);
}
```

**Verdict**: ⚠️ ACCEPTABLE - Document trade-offs, consider Secrets Manager for production

---

### 4. Microsoft Graph API Permissions

**Official Guidance**: [Limit Mailbox Access](https://learn.microsoft.com/en-us/graph/auth-limit-mailbox-access)

> "Having permission to send emails as any user in your tenant is excessive. If an app gets compromised, adversaries can impersonate and send emails from your tenant."

**Current Implementation**: `Mail.Send` application permission (tenant-wide)

**Risk**: With Mail.Send application permission, a compromised app could send emails as ANY user in the tenant.

**REQUIRED Mitigation - Application Access Policy**:

```powershell
# Connect to Exchange Online
Connect-ExchangeOnline

# Create mail-enabled security group (if not exists)
New-DistributionGroup -Name "Contact Form Senders" -Type Security

# Add the designated sender mailbox
Add-DistributionGroupMember -Identity "Contact Form Senders" -Member "webform@hybe.tech"

# Create restrictive application access policy
New-ApplicationAccessPolicy `
  -AppId "<YOUR_APP_CLIENT_ID>" `
  -PolicyScopeGroupId "Contact Form Senders" `
  -AccessRight RestrictAccess `
  -Description "Restrict contact form to noreply mailbox only"

# Verify policy
Test-ApplicationAccessPolicy -Identity "webform@hybe.tech" -AppId "<YOUR_APP_CLIENT_ID>"
```

**Verdict**: ⚠️ ACTION REQUIRED - Must create Application Access Policy before production deployment

---

### 5. CAPTCHA Protection

**Implementation**: Cloudflare Turnstile (invisible CAPTCHA)

**Security Features**:
- Server-side token verification (never trust client)
- Single-use tokens (replay attack prevention)
- 5-minute token expiry
- IP address validation
- No user tracking/cookies

**Code Evidence**:
```typescript
// handler.ts - Lines 178-213
async function verifyTurnstile(token: string, secretKey: string, clientIp?: string) {
  const formData = new URLSearchParams();
  formData.append("secret", secretKey);
  formData.append("response", token);
  if (clientIp) formData.append("remoteip", clientIp);
  // Server-side verification with Cloudflare
}
```

**Verdict**: ✅ PASS - Proper server-side CAPTCHA verification

---

### 6. Data Leakage Prevention

**AI-Generated Code Risk**: Research shows significant risk of information leakage in AI-assisted development ([Hacker News](https://thehackernews.com/2025/12/researchers-uncover-30-flaws-in-ai.html)).

**Review Checklist**:

| Check | Status | Evidence |
|-------|--------|----------|
| No PII in logs | ✅ | Only log success/failure, error types |
| Generic error messages | ✅ | Internal errors not exposed to client |
| No secrets in responses | ✅ | Only success/error status returned |
| No sensitive data in source | ✅ | All secrets from environment |
| CORS restricted | ✅ | Only allows configured origin |

**Code Evidence**:
```typescript
// handler.ts - Only logs error TYPE, not content
console.error("Turnstile verification error:", error instanceof Error ? error.name : "Unknown");

// handler.ts - Generic error to client
return createErrorResponse(500, "Email service error", headers);
// NOT: return { error: "Graph API returned 403: Access denied for user@domain.com" }
```

**Verdict**: ✅ PASS - Proper data leakage prevention

---

### 7. CORS Configuration

**Implementation**:
```typescript
function createCorsHeaders(allowedOrigin: string): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": allowedOrigin, // Single origin, not "*"
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    // ...
  };
}
```

**Verdict**: ✅ PASS - CORS properly restricted to single origin

---

### 8. Error Handling

**OWASP Guidance**: "Error messages should not reveal sensitive information about the system."

**Implementation Review**:

| Scenario | Response to Client | Logged Internally |
|----------|-------------------|-------------------|
| Invalid JSON | "Invalid JSON in request body" | None |
| Validation failure | "Validation error: [field] - [reason]" | None |
| Turnstile failure | "CAPTCHA verification failed" | Error codes |
| Azure AD failure | "Authentication service error" | Error name only |
| Graph API failure | "Failed to send message" | Status code |
| Unexpected error | "Server configuration error" | Error name only |

**Verdict**: ✅ PASS - Errors handled securely

---

## AI-Generated Code Audit

Per [Georgetown CSET Research](https://cset.georgetown.edu/publication/cybersecurity-risks-of-ai-generated-code/), AI-generated code requires manual security review.

### Specific Checks Performed

1. **No Hardcoded Secrets**: ✅ All secrets from environment
2. **No Eval/Dynamic Code Execution**: ✅ None present
3. **No Unsafe Deserialization**: ✅ JSON.parse with try/catch
4. **Proper Type Safety**: ✅ TypeScript strict mode
5. **No SQL/Command Injection Vectors**: ✅ No database, no shell commands
6. **Dependency Review**: ✅ Only well-known packages (MSAL, Zod)

---

## Pre-Deployment Checklist

### Required Before Production

- [ ] Create Azure AD Application Access Policy (restricts to single mailbox)
- [ ] Verify Turnstile domain includes production domain
- [ ] Set `ALLOWED_ORIGIN` to production domain
- [ ] Review Lambda execution role (least privilege)
- [ ] Enable CloudWatch logging
- [ ] Test with invalid/malicious inputs

### Recommended Enhancements

- [ ] Migrate secrets to AWS Secrets Manager
- [ ] Add rate limiting at API Gateway level
- [ ] Configure CloudWatch alerts for errors
- [ ] Set up log retention policy (30 days recommended)
- [ ] Schedule Azure AD client secret rotation (calendar reminder)

---

## References

### Official Documentation
- [Microsoft Graph Permissions Reference](https://learn.microsoft.com/en-us/graph/permissions-reference)
- [Microsoft Graph Limit Mailbox Access](https://learn.microsoft.com/en-us/graph/auth-limit-mailbox-access)
- [AWS Lambda Environment Variables Security](https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars-encryption.html)
- [AWS Lambda Data Protection](https://docs.aws.amazon.com/lambda/latest/dg/security-dataprotection.html)
- [OWASP Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)
- [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [OWASP Top 10:2025 - Injection](https://owasp.org/Top10/2025/A05_2025-Injection/)

### Security Research
- [Veracode GenAI Code Security Report](https://www.veracode.com/blog/genai-code-security-report/)
- [Georgetown CSET - AI-Generated Code Risks](https://cset.georgetown.edu/publication/cybersecurity-risks-of-ai-generated-code/)
- [Cloud Security Alliance - AI Code Risks](https://cloudsecurityalliance.org/blog/2025/07/09/understanding-security-risks-in-ai-generated-code)

---

## Approval

This security review is complete. The implementation follows security best practices with the following conditions:

1. **MUST** create Application Access Policy before production
2. **SHOULD** consider Secrets Manager for enhanced secret protection
3. **SHOULD** implement rate limiting at API Gateway

**Review Status**: CONDITIONALLY APPROVED pending Application Access Policy creation
