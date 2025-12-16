# Contact Form Security Audit Prompt

Use this prompt to audit another contact form Lambda implementation based on findings from the Hybetech security audit (December 2025).

---

## Prompt for Claude Code

```
I need you to perform a security audit on my contact form Lambda function based on OWASP 2025, AWS Lambda security best practices, and Microsoft Graph API security guidelines.

## Issues to Check For

### CRITICAL - Sensitive Data Logging
Check for any logging of:
- Email addresses (e.g., `console.log("email:", formData.email)`)
- Names, phone numbers, company names
- Message content
- IP addresses
- Turnstile/CAPTCHA tokens
- Full error objects that might contain user data

**Fix:** Replace with request ID correlation only:
```typescript
const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
console.info(`[${requestId}] Contact form submitted successfully`);
```

### HIGH - Graph API Error Logging
Check for logging of Graph API response bodies:
```typescript
// BAD: Could expose sensitive data
console.error("Graph API error:", await response.text());

// GOOD: Log status code only
console.error(`[${requestId}] Graph API error: ${response.status}`);
```

### MEDIUM - Validation Error Exposure
Check if validation errors expose field names:
```typescript
// BAD: Reveals internal field structure
return createErrorResponse(400, `Validation error: ${e.path.join(".")}: ${e.message}`);

// GOOD: Generic message
return createErrorResponse(400, "Please check your input and try again.");
```

### MEDIUM - Missing Security Headers
Ensure all responses include:
```typescript
{
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
  "Pragma": "no-cache",
  "Expires": "0",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
}
```

### MEDIUM - Turnstile Hardening
Check that:
1. Client IP is REQUIRED (not optional) for Turnstile verification
2. Hostname verification is performed
3. Token length is limited (max 4096 chars)

```typescript
// Verify hostname matches expected domain
const expectedHostname = new URL(config.allowedOrigin).hostname;
if (result.hostname && result.hostname !== expectedHostname) {
  return { valid: false, reason: "hostname_mismatch" };
}
```

### MEDIUM - Input Sanitization
Check that all text inputs are sanitized:
```typescript
function sanitizeInput(input: string): string {
  return input
    .replace(/<[^>]*>/g, "")  // Strip HTML tags
    .replace(/[<>]/g, "")      // Remove angle brackets
    .replace(/['\"\\]/g, "")   // Remove quotes and backslashes
    .trim();
}
```

### LOW - Frontend Console Errors
Check frontend code (contact.astro or similar) for:
```typescript
// BAD: Could expose error details
console.error('Form submission error:', error);

// GOOD: No logging, just show user message
showMessage('error', 'Network error. Please try again.');
```

## Files to Audit
1. `lambda/contact-form/src/handler.ts` - Main Lambda handler
2. `src/pages/contact.astro` (or equivalent) - Frontend form
3. `lambda/contact-form/package.json` - Check for "type": "module" issue
4. `lambda/contact-form/tsconfig.json` - Verify CommonJS output

## Lambda Build Configuration Fixes

### package.json - MUST have:
```json
{
  "type": "commonjs"
}
```
(NOT "type": "module" which causes ES Module errors in Lambda)

### tsconfig.json - MUST have:
```json
{
  "compilerOptions": {
    "module": "commonjs",
    "moduleResolution": "node"
  }
}
```
(NOT "module": "NodeNext" which outputs ES Modules)

Please audit the contact form code and report:
1. All security issues found (categorized by severity)
2. Specific line numbers and code snippets
3. Recommended fixes for each issue
4. Whether package.json and tsconfig.json need CommonJS fixes
```

---

## Rebuilding function.zip After Fixes

After applying security fixes, rebuild the Lambda package:

### Prerequisites
```bash
# Install archiver if not present
cd lambda/contact-form
npm install archiver --save-dev
```

### Rebuild Steps
```bash
cd lambda/contact-form

# 1. Clean and rebuild TypeScript
rm -rf dist
npx tsc

# 2. Verify CommonJS output (should start with "use strict")
head -5 dist/handler.js

# 3. Create function.zip
rm -f function.zip
node -e "
const fs = require('fs');
const archiver = require('archiver');

const output = fs.createWriteStream('function.zip');
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.log('function.zip created:', archive.pointer() + ' bytes');
});

archive.on('error', (err) => { throw err; });
archive.pipe(output);

// Handler at root level (Lambda requirement)
archive.file('dist/handler.js', { name: 'handler.js' });
archive.file('dist/handler.js.map', { name: 'handler.js.map' });

// Package.json required for type: commonjs
archive.file('package.json', { name: 'package.json' });

// Dependencies
archive.directory('node_modules/', 'node_modules');

archive.finalize();
"

# 4. Verify zip size (should be 2-25MB typically)
ls -lh function.zip
```

### Upload to Lambda
1. Go to AWS Lambda Console
2. Select your function
3. Code tab > Upload from > .zip file
4. Upload the new function.zip
5. Test the function

### Verify in CloudWatch
After testing, check CloudWatch logs to confirm:
- Only request IDs are logged (no emails, names, IPs)
- Error logs show only error types, not full objects
- No sensitive data appears anywhere

---

## Security Checklist

| Check | Status |
|-------|--------|
| No email addresses logged | [ ] |
| No names/phone/company logged | [ ] |
| No IP addresses logged | [ ] |
| No message content logged | [ ] |
| No Turnstile tokens logged | [ ] |
| Graph API errors log status only | [ ] |
| Validation errors are generic | [ ] |
| Cache-Control headers present | [ ] |
| X-Content-Type-Options header | [ ] |
| X-Frame-Options header | [ ] |
| Turnstile IP required | [ ] |
| Turnstile hostname verified | [ ] |
| Input sanitization applied | [ ] |
| Frontend console.error removed | [ ] |
| package.json: type=commonjs | [ ] |
| tsconfig: module=commonjs | [ ] |

---

## Reference: Hybetech Security Audit

Full audit documentation: `docs/security-audit-contact-form.md`

Key files modified in Hybetech:
- `lambda/contact-form/src/handler.ts` - Full security hardening
- `lambda/contact-form/package.json` - Changed to type: commonjs
- `lambda/contact-form/tsconfig.json` - Changed to module: commonjs
- `src/pages/contact.astro` - Removed console.error
