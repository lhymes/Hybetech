# M365 Contact Form

Secure contact form with Microsoft 365 email delivery and Cloudflare Turnstile CAPTCHA protection.

## Overview

This feature provides a production-ready contact form that:
- Delivers submissions directly to a Microsoft 365 mailbox via Graph API
- Protects against spam/bots using Cloudflare Turnstile (invisible CAPTCHA)
- Runs on AWS Lambda for serverless scalability
- Implements OWASP 2025 security best practices
- Optionally stores submissions in DynamoDB for backup/audit

### Use Cases

- Business contact forms requiring professional email delivery
- Lead capture forms integrated with M365 ecosystem
- Support request forms that need to appear in shared mailboxes
- Any form where submissions must land in a Microsoft 365 inbox

### Why This Approach?

| Alternative | Drawback |
|-------------|----------|
| Netlify Forms | Only works on Netlify hosting |
| AWS SES | Emails appear "from" AWS, not your domain's M365 |
| SMTP relay | Requires exposing credentials, complex setup |
| Third-party forms | Data stored on external servers, monthly fees |
| **Microsoft Graph API** | **Direct M365 integration, no data storage required** |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              USER BROWSER                                    │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        Contact Form                                  │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────────┐  │   │
│  │  │ Form Fields  │  │  Turnstile   │  │    Submit Button         │  │   │
│  │  │ (validated)  │  │  (invisible) │  │                          │  │   │
│  │  └──────────────┘  └──────────────┘  └──────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    │ HTTPS POST (JSON)
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           AWS API GATEWAY                                    │
│                        (HTTP API - REST endpoint)                            │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                           AWS LAMBDA FUNCTION                                │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │  1. Validate Turnstile token (Cloudflare API)                       │   │
│  │  2. Validate & sanitize form data                                   │   │
│  │  3. Acquire M365 access token (Azure AD client credentials)         │   │
│  │  4. Send email via Microsoft Graph API                              │   │
│  │  5. (Optional) Store in DynamoDB for backup                         │   │
│  │  6. Return success/error response                                   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  Environment Variables (encrypted with AWS KMS):                            │
│  - AZURE_CLIENT_ID, AZURE_CLIENT_SECRET, AZURE_TENANT_ID                   │
│  - TURNSTILE_SECRET_KEY                                                     │
│  - M365_SENDER_EMAIL, RECIPIENT_EMAIL                                       │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
┌──────────────────────┐ ┌──────────────────┐ ┌──────────────────────┐
│   CLOUDFLARE API     │ │   AZURE AD       │ │  MICROSOFT GRAPH     │
│   (Turnstile verify) │ │   (OAuth 2.0)    │ │  (sendMail)          │
└──────────────────────┘ └──────────────────┘ └──────────────────────┘
                                                        │
                                                        ▼
                                              ┌──────────────────────┐
                                              │  M365 MAILBOX        │
                                              │  (your inbox)        │
                                              └──────────────────────┘
```

### Data Flow

1. User fills form and clicks submit
2. Turnstile generates invisible challenge token
3. Frontend POSTs form data + Turnstile token to Lambda
4. Lambda validates Turnstile token with Cloudflare API
5. Lambda validates and sanitizes form data
6. Lambda acquires OAuth token from Azure AD (client credentials flow)
7. Lambda sends email via Microsoft Graph API `/users/{email}/sendMail`
8. User receives success confirmation
9. Email arrives in M365 inbox within seconds

---

## Prerequisites

### Required Accounts

| Service | Purpose | Cost |
|---------|---------|------|
| Microsoft 365 | Email delivery | Existing subscription |
| Azure AD | App registration for Graph API | Free with M365 |
| AWS | Lambda + API Gateway hosting | Free tier eligible |
| Cloudflare | Turnstile CAPTCHA | Free (1M requests/month) |

### Required Permissions

**Azure AD App Registration:**
- API Permission: `Microsoft Graph` → `Mail.Send` (Application permission)
- Admin consent granted

**AWS IAM:**
- Lambda execution role with CloudWatch Logs access
- (Optional) DynamoDB read/write if using backup storage

---

## Setup Instructions

### Step 1: Cloudflare Turnstile Setup

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Turnstile** in the sidebar
3. Click **Add Site**
4. Configure:
   - **Site name**: Your project name
   - **Domain**: `yourdomain.com` (and `localhost` for testing)
   - **Widget Mode**: `Managed` (invisible when possible)
5. Save and copy:
   - **Site Key** (public, used in frontend)
   - **Secret Key** (private, used in Lambda)

### Step 2: Azure AD App Registration

1. Go to [Azure Portal](https://portal.azure.com/)
2. Navigate to **Azure Active Directory** → **App registrations**
3. Click **New registration**
   - **Name**: `Contact Form - [Project Name]`
   - **Supported account types**: Single tenant
   - **Redirect URI**: Leave blank (not needed for client credentials)
4. Click **Register**

5. Note the following from the Overview page:
   - **Application (client) ID**
   - **Directory (tenant) ID**

6. Create a client secret:
   - Go to **Certificates & secrets** → **Client secrets**
   - Click **New client secret**
   - **Description**: `Lambda Contact Form`
   - **Expires**: 24 months (set calendar reminder to rotate)
   - Click **Add** and **immediately copy the Value** (shown only once)

7. Add API permissions:
   - Go to **API permissions** → **Add a permission**
   - Select **Microsoft Graph** → **Application permissions**
   - Search for `Mail.Send` and check it
   - Click **Add permissions**
   - Click **Grant admin consent for [Tenant]** (requires admin)

### Step 2.5: Application Access Policy (REQUIRED)

**CRITICAL SECURITY STEP**: By default, the `Mail.Send` permission allows your app to send email as ANY user in your tenant. If credentials are compromised, an attacker could impersonate anyone. This step restricts the app to only the designated sender mailbox.

**Run these PowerShell commands:**

```powershell
# 1. Install module if needed (run once)
Install-Module ExchangeOnlineManagement -Force

# 2. Connect to Exchange Online
Connect-ExchangeOnline -UserPrincipalName your-admin@yourdomain.com

# 3. Create security group
New-DistributionGroup -Name "Contact Form Senders" -Type Security

# 4. Add sender mailbox to group
Add-DistributionGroupMember -Identity "Contact Form Senders" -Member "webform@yourdomain.com"

# 5. Create the restriction policy (replace YOUR_APP_CLIENT_ID)
New-ApplicationAccessPolicy -AppId "YOUR_APP_CLIENT_ID" `
  -PolicyScopeGroupId "Contact Form Senders" `
  -AccessRight RestrictAccess `
  -Description "Restrict contact form to webform mailbox only"

# 6. Verify policy works (should show "Granted")
Test-ApplicationAccessPolicy -Identity "webform@yourdomain.com" -AppId "YOUR_APP_CLIENT_ID"

# 7. Disconnect
Disconnect-ExchangeOnline -Confirm:$false
```

**Expected output for step 6:**
```
AccessCheckResult : Granted
```

This confirms your app can ONLY send from the specified mailbox. Any attempt to send from other mailboxes will be denied.

### Step 3: AWS Lambda Setup

1. Go to [AWS Lambda Console](https://console.aws.amazon.com/lambda/)
2. Ensure you're in your preferred region (e.g., **US East (N. Virginia) us-east-1**) - check the dropdown in the top right
3. Click **Create function**
4. Select **Author from scratch**
5. Configure:
   - **Function name**: `hymes-contact-form` (or your preferred name)
   - **Runtime**: `Node.js 20.x` (stick with LTS version, don't upgrade to newer versions like 24.x yet)
   - **Architecture**: `arm64` (more cost-effective)
6. Click **Create function**

#### 3.1 Add Environment Variables

1. Click the **Configuration** tab
2. Click **Environment variables** in the left sidebar
3. Click **Edit**
4. Click **Add environment variable** for each of these 7 variables:

| Key | Value |
|-----|-------|
| `AZURE_TENANT_ID` | Your Azure AD Directory (tenant) ID |
| `AZURE_CLIENT_ID` | Your Azure AD Application (client) ID |
| `AZURE_CLIENT_SECRET` | Your Azure AD client secret value |
| `TURNSTILE_SECRET_KEY` | Your Cloudflare Turnstile secret key |
| `M365_SENDER_EMAIL` | Email address to send FROM (e.g., `webform@yourdomain.com`) |
| `RECIPIENT_EMAIL` | Email address to send TO (can be same as sender for shared mailbox) |
| `ALLOWED_ORIGIN` | Your website URL with https (e.g., `https://www.yourdomain.com`) |

5. Click **Save**

#### 3.2 Configure Timeout

1. Still in **Configuration** tab
2. Click **General configuration** in left sidebar
3. Click **Edit**
4. Change **Timeout** to `30` seconds (default 3 seconds is too short)
5. Click **Save**

#### 3.3 Upload Lambda Code

**Build the deployment package locally:**

```bash
cd lambda/contact-form

# Install production dependencies only
npm install --omit=dev

# Build TypeScript
npm run build

# Create zip package (the dist folder contains compiled JS)
zip -r function.zip dist/ node_modules/ package.json
```

**Upload to Lambda:**

1. In your Lambda function, click the **Code** tab
2. Click **Upload from** dropdown (top right of code editor)
3. Select **.zip file**
4. Click **Upload** and select the `function.zip` file you created
5. Click **Save**

**IMPORTANT - Update the Handler Path:**

After uploading, you'll see an error about `index.mjs` not found. This is expected.

1. Scroll down to **Runtime settings** (below the code editor)
2. Click **Edit**
3. Change **Handler** from `index.handler` to: `dist/handler.handler`
4. Click **Save**

The handler path tells Lambda where to find your code. Our TypeScript compiles to `dist/handler.js`, and the exported function is named `handler`.

### Step 4: API Gateway Setup

1. Go to [API Gateway Console](https://console.aws.amazon.com/apigateway/)
2. Click **Create API**
3. Under **HTTP API**, click **Build**

#### 4.1 Configure Integrations

1. Click **Add integration**
2. Select **Lambda** as integration type
3. Select your Lambda function (e.g., `hymes-contact-form`)
4. **API name**: `hymes-contact-form-api` (or your preferred name)
5. Click **Next**

#### 4.2 Configure Routes

1. Click **Add route**
2. **Method**: Select `POST`
3. **Resource path**: `/contact`
4. **Integration target**: Select your Lambda function
5. Click **Next**

#### 4.3 Configure Stage

1. **Stage name**: Leave as `$default` (this is fine)
2. Click **Next**
3. Click **Create**

#### 4.4 Get Your API URL

After creation, you'll see your **Invoke URL** like:
```
https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com
```

**Save this URL** - you'll need it for the frontend configuration.

Your full contact endpoint will be: `{Invoke URL}/contact`

#### 4.5 Configure CORS (Critical!)

**Without this step, the form will fail with 405 errors.**

1. In your API, click **CORS** in the left sidebar
2. Click **Configure**
3. Fill in these values:

| Setting | Value |
|---------|-------|
| **Access-Control-Allow-Origin** | `https://www.yourdomain.com` (your exact domain with https) |
| **Access-Control-Allow-Headers** | `Content-Type` |
| **Access-Control-Allow-Methods** | Check both `POST` and `OPTIONS` |

4. Click **Save**

**Note**: The origin must match exactly what appears in the browser address bar. If your site uses `www`, include it. If not, omit it.

#### 4.6 Configure Rate Limiting (Recommended)

1. In your API, click **Throttling** in the left sidebar
2. Click **Edit default route throttling**
3. Set the following values:

| Setting | Value | Purpose |
|---------|-------|---------|
| **Rate limit** | `10` | 10 requests per second - generous for contact forms |
| **Burst limit** | `20` | Allows brief spikes of up to 20 concurrent requests |

4. Click **Save**

These settings protect against automated attacks while allowing normal users to submit forms without any issues.

### Step 5: Update Frontend Code

Update your contact form page with your actual values:

```typescript
// In your contact.astro or similar file

// Turnstile site key (public - safe to expose)
const TURNSTILE_SITE_KEY = "your-turnstile-site-key";

// API endpoint (your API Gateway URL + /contact)
const CONTACT_API_URL = "https://xxxxxxxxxx.execute-api.us-east-1.amazonaws.com/contact";
```

### Step 6: Update Content Security Policy

Your website's CSP must allow Cloudflare Turnstile and your API Gateway.

**For Nginx** (add to your server block):
```nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; connect-src 'self' https://challenges.cloudflare.com https://your-api-id.execute-api.us-east-1.amazonaws.com; frame-src https://challenges.cloudflare.com; frame-ancestors 'none'; base-uri 'self'" always;
```

**For Netlify** (in `netlify.toml`):
```toml
Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com; ..."
```

After updating Nginx, test and reload:
```bash
sudo nginx -t && sudo systemctl reload nginx
```

### Step 7: Deploy Website

**Important**: If deploying to a small server (like AWS Lightsail $5 tier), the Astro build process may run out of memory. Build locally and upload the pre-built files instead:

```bash
# Build locally
pnpm build

# Upload dist folder contents to server
scp -r dist/* ubuntu@yourserver.com:/tmp/dist-upload/

# On server: move to web directory
sudo rm -rf /var/www/yoursite/*
sudo cp -r /tmp/dist-upload/* /var/www/yoursite/
sudo chown -R www-data:www-data /var/www/yoursite/
rm -rf /tmp/dist-upload
```

---

## Security Considerations

### OWASP 2025 Compliance

| OWASP Category | Implementation |
|----------------|----------------|
| **A01: Broken Access Control** | CORS restricts to allowed origins; rate limiting via API Gateway |
| **A02: Cryptographic Failures** | All secrets encrypted with KMS; HTTPS only; no secrets in frontend |
| **A03: Injection** | Input validation with Zod; parameterized Graph API calls |
| **A05: Security Misconfiguration** | Minimal Lambda permissions; environment-specific configs |
| **A07: Auth Failures** | Client credentials flow with short-lived tokens (1 hour) |
| **A09: Logging Failures** | CloudWatch logs for all requests; sensitive data redacted |

### Data Protection

| Data Type | Protection |
|-----------|------------|
| Form submissions | Not stored by default; encrypted in transit (TLS 1.3) |
| Azure credentials | AWS KMS encryption at rest; never logged |
| Turnstile tokens | Single-use; validated server-side; 5-minute expiry |
| Email content | Microsoft 365 encryption (BitLocker + service encryption) |

### Input Validation

All form fields are validated server-side using Zod:
- Email: RFC 5322 format validation
- Phone: E.164 format or common formats
- Text fields: Max length limits, HTML stripped
- Required fields enforced

### Rate Limiting

Implemented at multiple layers:
1. **Turnstile**: Blocks automated submissions
2. **API Gateway**: Throttling (100 requests/second default)
3. **Lambda**: Can implement per-IP rate limiting with DynamoDB

### CAPTCHA Security

Cloudflare Turnstile provides:
- Invisible challenge (no user friction)
- Browser fingerprinting
- Behavioral analysis
- Machine learning bot detection
- Token validation with expiry

---

## Testing

### Test Strategy

Following TDD (Test-Driven Development):
1. Write failing tests first
2. Implement minimum code to pass
3. Refactor while keeping tests green

### Test Categories

| Category | What's Tested |
|----------|---------------|
| Unit | Input validation, email formatting, error handling |
| Integration | Turnstile verification, Graph API calls |
| E2E | Full form submission flow |

### Running Tests

```bash
# Install test dependencies
npm install --save-dev vitest @types/node

# Run unit tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test -- lambda/contact-form/handler.test.ts
```

### Test Cases

See `lambda/contact-form/handler.test.ts` for complete test suite.

**Unit Tests:**
- ✅ Rejects requests without Turnstile token
- ✅ Rejects invalid Turnstile tokens
- ✅ Rejects missing required fields (firstName, lastName, email, message)
- ✅ Rejects invalid email format
- ✅ Sanitizes HTML from input fields
- ✅ Handles Graph API errors gracefully
- ✅ Returns appropriate HTTP status codes

**Integration Tests:**
- ✅ Validates Turnstile token with Cloudflare API
- ✅ Acquires Azure AD token successfully
- ✅ Sends email via Graph API
- ✅ Handles network timeouts

**E2E Tests:**
- ✅ Complete form submission succeeds
- ✅ User receives success message
- ✅ Email arrives in M365 inbox

### Mocking External Services

For unit tests, external services are mocked:

```typescript
// Mock Turnstile verification
vi.mock('./turnstile', () => ({
  verifyToken: vi.fn().mockResolvedValue({ success: true })
}));

// Mock Graph API
vi.mock('./graph', () => ({
  sendEmail: vi.fn().mockResolvedValue({ success: true })
}));
```

---

## Deployment

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `AZURE_TENANT_ID` | Azure AD tenant ID | `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` |
| `AZURE_CLIENT_ID` | App registration client ID | `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx` |
| `AZURE_CLIENT_SECRET` | App registration secret | `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret | `0x4AAAAAAxxxxxxxxxxxxxxxx` |
| `M365_SENDER_EMAIL` | Email address to send FROM | `noreply@yourdomain.com` |
| `RECIPIENT_EMAIL` | Email address to send TO | `contact@yourdomain.com` |
| `ALLOWED_ORIGIN` | CORS allowed origin | `https://yourdomain.com` |

### Deployment Checklist

**Azure AD Setup:**
- [ ] App registration created with descriptive name
- [ ] Application (client) ID recorded
- [ ] Directory (tenant) ID recorded
- [ ] Client secret created and value copied immediately
- [ ] Client secret expiration date added to calendar (24 months)
- [ ] Mail.Send **Application** permission added (not Delegated)
- [ ] Admin consent granted (green checkmark visible)
- [ ] **REQUIRED: Application Access Policy created via PowerShell** (see Step 2.5)
- [ ] Policy verified with `Test-ApplicationAccessPolicy` (shows "Granted")

**Cloudflare Turnstile:**
- [ ] Turnstile site created
- [ ] Production domain added
- [ ] `localhost` added for local testing
- [ ] Site key (public) recorded
- [ ] Secret key (private) recorded

**AWS Lambda:**
- [ ] Function created with Node.js 20.x runtime
- [ ] Architecture set to arm64
- [ ] All 7 environment variables configured
- [ ] Timeout increased to 30 seconds
- [ ] Code uploaded via .zip file
- [ ] Handler updated to `dist/handler.handler`

**API Gateway:**
- [ ] HTTP API created
- [ ] Lambda integration configured
- [ ] POST /contact route created
- [ ] **CORS configured** (critical - check POST and OPTIONS)
- [ ] Invoke URL recorded

**Frontend:**
- [ ] Turnstile site key added to contact page
- [ ] API Gateway URL added to contact page (with `/contact` path)
- [ ] Content Security Policy updated for Turnstile and API Gateway

**Server:**
- [ ] CSP header added to Nginx (or equivalent)
- [ ] Nginx tested and reloaded
- [ ] Site built locally (not on server if low memory)
- [ ] Pre-built dist/ uploaded to server

**Testing:**
- [ ] Form loads without console errors
- [ ] Turnstile widget appears or runs invisibly
- [ ] Form submission succeeds
- [ ] Email received in M365 mailbox
- [ ] Reply-to address is correct on received email

### Verification Steps

1. **Test Turnstile**: Load form page, verify widget appears (or is invisible)
2. **Test validation**: Submit empty form, verify errors shown
3. **Test happy path**: Submit valid form, verify success message
4. **Test email delivery**: Check M365 inbox for received email
5. **Test spam protection**: Disable Turnstile, verify rejection

---

## Troubleshooting

### Common Issues

**"405 Not Allowed" error when submitting form**
- **Most common cause**: API Gateway CORS not configured
- Go to API Gateway → Your API → CORS → Configure
- Add your origin (e.g., `https://www.yourdomain.com`)
- Check both `POST` and `OPTIONS` methods
- The origin must match exactly (including `www` if used)

**Button won't click / form won't submit**
- Check browser console for JavaScript errors
- Ensure all required form fields have proper `id` attributes
- If using custom Button components, verify they pass through the `id` prop
- Hard refresh the page (Ctrl+Shift+R) to clear cached JavaScript

**"index.mjs not found" error in Lambda console**
- This is expected after uploading the zip file
- Update the Handler in Runtime settings to: `dist/handler.handler`
- The default `index.handler` expects a file that doesn't exist in our package

**Build fails on server (killed/exit code 137)**
- Server ran out of memory during Astro build
- Small servers (1GB RAM) can't handle the build process
- Solution: Build locally and upload pre-built `dist/` folder via SCP

**"Invalid Turnstile token"**
- Token may have expired (5-minute validity)
- Domain not added to Turnstile site configuration
- Using wrong secret key (site key vs secret key)
- Add both production domain AND `localhost` to Turnstile for testing

**"401 Unauthorized" from Azure AD**
- Client secret may have expired (check expiration date)
- Tenant ID incorrect (copy from Azure Portal Overview page)
- Client ID incorrect (copy from Azure Portal Overview page)
- App registration deleted or disabled

**"403 Forbidden" from Graph API**
- Mail.Send permission not granted
- Admin consent not given (look for green checkmark)
- Application Access Policy blocking the app
- Sender email not in the security group for the access policy

**Email not arriving**
- Check spam/junk folder
- Verify RECIPIENT_EMAIL is correct
- Check Lambda CloudWatch logs for errors
- Verify M365_SENDER_EMAIL mailbox exists
- For shared mailboxes, ensure the mailbox is created and active

**CORS errors in browser console**
- API Gateway CORS not configured (see first item above)
- ALLOWED_ORIGIN in Lambda doesn't match request origin
- Origin mismatch: `https://yourdomain.com` vs `https://www.yourdomain.com`
- Missing Content-Security-Policy update for API Gateway domain

**CSP (Content Security Policy) blocking requests**
- Add `https://challenges.cloudflare.com` to script-src, frame-src, and connect-src
- Add your API Gateway URL to connect-src
- Test with browser dev tools Network tab to see blocked requests

### Debug Mode

Enable detailed logging in Lambda:
```typescript
const DEBUG = process.env.DEBUG === 'true';

if (DEBUG) {
  console.log('Request body:', JSON.stringify(body, null, 2));
  console.log('Turnstile response:', JSON.stringify(turnstileResult, null, 2));
}
```

**Warning**: Never log sensitive data (secrets, full email content) in production.

---

## Cost Analysis

### Monthly Cost Estimate (typical small business)

| Service | Usage | Cost |
|---------|-------|------|
| AWS Lambda | 1,000 invocations × 512MB × 1s | $0.00 (free tier) |
| API Gateway | 1,000 requests | $0.00 (free tier) |
| Cloudflare Turnstile | 1,000 verifications | $0.00 (1M free/month) |
| Azure AD | App registration | $0.00 (free with M365) |
| Microsoft Graph API | 1,000 emails | $0.00 (included in M365) |
| **Total** | | **$0.00/month** |

### At Scale (10,000 submissions/month)

| Service | Usage | Cost |
|---------|-------|------|
| AWS Lambda | 10,000 × 512MB × 1s | ~$0.20 |
| API Gateway | 10,000 requests | ~$0.10 |
| Cloudflare Turnstile | 10,000 verifications | $0.00 |
| **Total** | | **~$0.30/month** |

---

## References

### Official Documentation

- [Microsoft Graph sendMail API](https://learn.microsoft.com/en-us/graph/api/user-sendmail)
- [Azure AD Client Credentials Flow](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-client-creds-grant-flow)
- [Cloudflare Turnstile Documentation](https://developers.cloudflare.com/turnstile/)
- [AWS Lambda Developer Guide](https://docs.aws.amazon.com/lambda/latest/dg/)

### Security Resources

- [OWASP Top 10 2025](https://owasp.org/Top10/)
- [Microsoft Graph Security Best Practices](https://learn.microsoft.com/en-us/graph/security-best-practices)
- [AWS Lambda Security](https://docs.aws.amazon.com/lambda/latest/dg/lambda-security.html)

### Related Articles

- [Cloudflare Turnstile vs reCAPTCHA Comparison](https://blog.rcaptcha.app/articles/cloudflare-turnstile-vs-recaptcha)
- [Microsoft Graph Mail Integration Guide](https://medium.com/@sridhar_be/sent-email-using-microsoft-graph-5da5691b5165)

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-12-14 | Initial implementation |
