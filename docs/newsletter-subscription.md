# Newsletter Subscription Implementation Guide

This guide documents the complete process for implementing a secure newsletter subscription system that stores data on Microsoft 365/Azure.

> **Implementation Status**: COMPLETE (December 2025)

## Hybetech Configuration

| Setting | Value |
|---------|-------|
| Lambda Function | `hybetech-newsletter-subscription` |
| API Gateway URL | `https://6ewwyaog68.execute-api.us-east-1.amazonaws.com/default/hybetech-newsletter-subscription` |
| SharePoint Site | `https://hybetech.sharepoint.com/sites/internal` |
| SharePoint List | `Newsletter Subscribers` |
| Site ID | `hybetech.sharepoint.com,76b075d3-8864-4ad4-b59c-3eebf2374f18,a7ca7f62-03b8-4660-b349-06aad7a87f2f` |
| List ID | `04ae2358-29bd-4a51-954a-c05160b34986` |
| Lambda Timeout | 30 seconds |

## Quick Start Checklist

- [x] **Phase 1**: Create SharePoint site and Newsletter Subscribers list
- [x] **Phase 2**: Add `Sites.Selected` permission to Azure AD app (reused contact form app)
- [x] **Phase 3**: Upload `lambda/newsletter-subscription/function.zip` to AWS Lambda
- [x] **Phase 4**: Configure Lambda environment variables
- [x] **Phase 5**: Add `PUBLIC_NEWSLETTER_API_URL` to `.env` and rebuild site
- [x] **Phase 6**: Update CSP headers in nginx to allow newsletter API

## Overview

**What Gets Captured:**
- Email address (validated, lowercased)
- IP address of subscriber
- Timestamp of subscription
- User agent (browser info)
- Source (e.g., "Website Footer")

**Requirements:**
- Capture email address, IP address, and timestamp
- Secure transfer to Microsoft 365/Azure
- Store data on tenant for easy access and email marketing use
- Spam protection (Cloudflare Turnstile)

## Storage Options Comparison

| Option | Pros | Cons | Best For |
|--------|------|------|----------|
| **SharePoint List** | Easy UI, Excel export, Power Automate integration, Graph API access | 5,000 item view threshold (30M total limit) | Business users, email marketing |
| **Excel on SharePoint** | Familiar interface, easy mail merge | File locking issues, 5MB limit for API updates | Small lists (<10K) |
| **Azure Table Storage** | Cheapest (~$0.001/month), unlimited scale | Requires technical skills to access | High volume, technical teams |
| **Microsoft Lists** | Modern UI, Power Platform integration | Same as SharePoint List (built on it) | Teams collaboration |
| **Dataverse** | Enterprise features, Power Platform native | Requires Power Apps license | Enterprise/CRM integration |

## Recommended Approach: SharePoint List

**Why SharePoint List?**
1. **Easy Access**: View, filter, and export directly in browser
2. **Excel Export**: One-click export for email marketing tools
3. **Power Automate**: Trigger welcome emails, sync to marketing tools
4. **Graph API**: Simple REST API for Lambda integration
5. **No Extra Cost**: Included with Microsoft 365 Business
6. **Audit Trail**: Built-in version history

---

## Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   Website       │     │   AWS Lambda     │     │  SharePoint     │
│   Footer Form   │────▶│   + Turnstile    │────▶│  List           │
│                 │     │   Verification   │     │                 │
└─────────────────┘     └──────────────────┘     └─────────────────┘
                               │
                               ▼
                        ┌──────────────────┐
                        │  Azure AD        │
                        │  App Registration│
                        └──────────────────┘
```

**Data Flow:**
1. User submits email in footer form
2. Turnstile token + email sent to Lambda
3. Lambda verifies Turnstile token
4. Lambda authenticates with Azure AD (client credentials)
5. Lambda writes to SharePoint List via Graph API
6. Success/error returned to user

---

## Implementation Steps

### Phase 1: SharePoint List Setup

#### Step 1: Create SharePoint Site (if needed)

1. Go to https://admin.microsoft.com
2. Navigate to **Admin centers** → **SharePoint**
3. Click **Sites** → **Active sites** → **Create**
4. Choose **Team site** (or use existing site)
5. Name: `Hybetech Internal` (or similar)
6. Keep it private

#### Step 2: Create the Newsletter List

1. Go to your SharePoint site
2. Click **New** → **List**
3. Choose **Blank list**
4. Name: `Newsletter Subscribers`
5. Description: `Email newsletter subscription list`

#### Step 3: Configure List Columns

Add these columns (click **+ Add column**):

| Column Name | Type | Settings |
|-------------|------|----------|
| Title | Single line (default) | Rename to `Email` or delete and create new |
| Email | Single line of text | Required, Enforce unique values = Yes |
| IPAddress | Single line of text | Optional |
| SubscribedAt | Date and time | Include time = Yes |
| Source | Choice | Choices: `Website Footer`, `Landing Page`, `Other` |
| Status | Choice | Choices: `Active`, `Unsubscribed` (default: Active) |
| UserAgent | Multiple lines of text | Optional (for analytics) |

**To enforce unique emails:**
1. Click column header → **Column settings** → **Edit**
2. Enable **Enforce unique values**

#### Step 4: Get List and Site IDs

You'll need these for the Lambda function:

**Option A: Graph Explorer**
1. Go to https://developer.microsoft.com/graph/graph-explorer
2. Sign in with your M365 account
3. Run: `GET https://graph.microsoft.com/v1.0/sites?search=Hybetech`
4. Copy the `id` from the response (format: `tenant.sharepoint.com,guid,guid`)
5. Run: `GET https://graph.microsoft.com/v1.0/sites/{site-id}/lists`
6. Find your list and copy its `id`

**Option B: SharePoint URL**
- Site ID can be derived from: `https://{tenant}.sharepoint.com/sites/{site-name}`

---

### Phase 2: Azure AD App Registration

> **Reuse Existing App?** If you already have an Azure AD app for the contact form, you can reuse it! Just add the SharePoint permissions (Step 4) to your existing app instead of creating a new one.

#### Option A: Reuse Contact Form App (Recommended)

If you have the contact form app (`Hybetech Contact Form`) already configured:

1. Go to https://portal.azure.com
2. Navigate to **Azure Active Directory** → **App registrations**
3. Select your existing `Hybetech Contact Form` app
4. Skip to **Step 4: Configure API Permissions** below
5. Use the same credentials in your Newsletter Lambda

#### Option B: Create New App

1. Go to https://portal.azure.com
2. Navigate to **Azure Active Directory** → **App registrations**
3. Click **New registration**
4. Configure:
   - Name: `Hybetech Newsletter Subscription`
   - Supported account types: **Single tenant**
   - Redirect URI: Leave blank
5. Click **Register**

#### Step 2: Note Application Details (New App Only)

Record these values:
- **Application (client) ID**: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
- **Directory (tenant) ID**: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`

#### Step 3: Create Client Secret (New App Only)

1. Go to **Certificates & secrets**
2. Click **New client secret**
3. Description: `Newsletter Lambda`
4. Expiry: 24 months (set calendar reminder!)
5. Click **Add**
6. **Copy the Value immediately** (shown only once)

#### Step 4: Configure API Permissions

1. Go to **API permissions**
2. Click **Add a permission**
3. Select **Microsoft Graph**
4. Choose **Application permissions**
5. Add these permissions:
   - `Sites.Selected` (preferred - most restrictive)

   OR if Sites.Selected doesn't work:
   - `Sites.ReadWrite.All` (broader access)

6. Click **Grant admin consent for [tenant]**

#### Step 5: Grant Site-Specific Access (for Sites.Selected)

If using `Sites.Selected`, you must grant access to specific site:

```powershell
# Install Microsoft Graph PowerShell module
Install-Module Microsoft.Graph -Scope CurrentUser

# Connect with admin account
Connect-MgGraph -Scopes "Sites.FullControl.All"

# Grant write permission to your app for the specific site
$params = @{
    roles = @("write")
    grantedToIdentities = @(
        @{
            application = @{
                id = "YOUR_APP_CLIENT_ID"
                displayName = "Hybetech Newsletter Subscription"
            }
        }
    )
}

# Replace SITE_ID with your SharePoint site ID
New-MgSitePermission -SiteId "SITE_ID" -BodyParameter $params
```

---

### Phase 3: Lambda Function

> **Code Ready**: The Lambda code is already implemented at `lambda/newsletter-subscription/`

#### Lambda Code Location

```
lambda/newsletter-subscription/
├── src/
│   └── handler.ts      # Main Lambda handler
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript config
└── function.zip        # Ready-to-deploy package (2.4MB)
```

#### Key Features

- **Turnstile Verification**: Validates CAPTCHA before processing
- **Email Validation**: Uses Zod for strict email validation
- **Duplicate Detection**: Checks if email exists before adding
- **IP & User Agent Capture**: Records subscriber metadata
- **Token Caching**: Caches Graph API tokens for performance
- **Both API Gateway Formats**: Supports REST API and HTTP API events

#### Build Commands (if you need to rebuild)

```bash
cd lambda/newsletter-subscription
npm install
npm run build

# Create deployment package (using Python since zip may not be installed)
python3 -c "
import zipfile, os
def zipdir(path, ziph):
    for root, dirs, files in os.walk(path):
        for file in files:
            filepath = os.path.join(root, file)
            arcname = os.path.relpath(filepath, path)
            ziph.write(filepath, arcname)
with zipfile.ZipFile('function.zip', 'w', zipfile.ZIP_DEFLATED) as zipf:
    zipdir('dist', zipf)
"
```

#### Environment Variables Required

| Variable | Description | Example |
|----------|-------------|---------|
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret | `0x4AAA...` |
| `AZURE_TENANT_ID` | Your M365 tenant ID | `xxxxxxxx-xxxx-...` |
| `AZURE_CLIENT_ID` | Azure AD app client ID | `xxxxxxxx-xxxx-...` |
| `AZURE_CLIENT_SECRET` | Azure AD app secret | `abc123...` |
| `SHAREPOINT_SITE_ID` | SharePoint site ID | `tenant.sharepoint.com,guid,guid` |
| `SHAREPOINT_LIST_ID` | Newsletter list ID | `xxxxxxxx-xxxx-...` |
| `ALLOWED_ORIGIN` | Your website origin | `https://www.hybe.tech` |

---

### Phase 4: AWS Lambda Setup

#### Step 1: Create Lambda Function

1. Go to AWS Lambda console
2. Click **Create function**
3. Configure:
   - Function name: `hybetech-newsletter-subscription`
   - Runtime: **Node.js 20.x**
   - Architecture: **arm64** (cheaper)
4. Click **Create function**

#### Step 2: Upload Code

1. In the Lambda function page
2. Click **Upload from** → **.zip file**
3. Upload `function.zip`

#### Step 3: Configure Environment Variables

Go to **Configuration** → **Environment variables** and add:

| Key | Value |
|-----|-------|
| `TURNSTILE_SECRET_KEY` | Your Turnstile secret key |
| `AZURE_TENANT_ID` | Your Azure AD tenant ID |
| `AZURE_CLIENT_ID` | Newsletter app client ID |
| `AZURE_CLIENT_SECRET` | Newsletter app client secret |
| `SHAREPOINT_SITE_ID` | Your SharePoint site ID |
| `SHAREPOINT_LIST_ID` | Your Newsletter List ID |
| `ALLOWED_ORIGIN` | `https://www.hybe.tech` |

#### Step 4: Configure Function Settings

1. Go to **Configuration** → **General configuration**
2. Set timeout to **30 seconds**
3. Set memory to **256 MB**

#### Step 5: Create API Gateway Trigger

1. Click **Add trigger**
2. Select **API Gateway**
3. Configure:
   - Create new API: **HTTP API**
   - Security: **Open**
4. Click **Add**

#### Step 6: Configure CORS on API Gateway

1. Go to API Gateway console
2. Select your API
3. Go to **CORS**
4. Configure:
   - Access-Control-Allow-Origin: `https://www.hybe.tech`
   - Access-Control-Allow-Headers: `Content-Type`
   - Access-Control-Allow-Methods: `POST, OPTIONS`
5. Click **Save**

Note the API endpoint URL (e.g., `https://xxxxx.execute-api.us-east-1.amazonaws.com/newsletter`)

---

### Phase 5: Frontend Integration

> **Already Implemented**: The footer form is already updated in `src/components/layout/Footer.astro`

#### What Was Changed in Footer.astro

1. Added form ID (`newsletter-form`) for JavaScript targeting
2. Added Turnstile widget in invisible mode
3. Added success/error message containers
4. Added JavaScript for async form submission
5. Added loading state on submit button

#### Update Environment Variables

Add to `.env`:

```bash
PUBLIC_NEWSLETTER_API_URL=https://xxxxx.execute-api.us-east-1.amazonaws.com/newsletter
```

Then rebuild and deploy the site:

```bash
pnpm build
# Deploy to your hosting
```

#### CSP Headers

The existing CSP configuration already includes Turnstile (`challenges.cloudflare.com`). The API Gateway domain will need to be added if different from the contact form API.

Update in `public/_headers` and Nginx config if needed:

```
connect-src 'self' https://challenges.cloudflare.com https://*.execute-api.us-east-1.amazonaws.com;
```

---

## Testing

### Test Turnstile Integration

1. Open browser dev tools (Network tab)
2. Submit the newsletter form
3. Verify Turnstile token is included in request

### Test Lambda Function

```bash
# Test via curl
curl -X POST https://YOUR_API_URL/newsletter \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","turnstileToken":"test-token"}'
```

### Test SharePoint Integration

1. Go to your SharePoint list
2. Verify new subscriber appears
3. Check all fields are populated correctly

---

## Maintenance

### Monitoring

1. **Lambda CloudWatch Logs**: Check for errors
2. **SharePoint List**: Monitor subscriber count
3. **API Gateway Metrics**: Track request volume

### Secret Rotation

Set calendar reminders for:
- Azure AD client secret (before expiry)
- Turnstile keys (if rotated)

### Export Subscribers

1. Go to SharePoint list
2. Click **Export** → **Export to Excel**
3. Use for email marketing campaigns

### Power Automate Integration (Optional)

Create flows to:
- Send welcome email on new subscription
- Sync to Mailchimp/ConvertKit
- Weekly subscriber report

---

## Security Considerations

1. **Rate Limiting**: Consider adding rate limiting at API Gateway level
2. **Email Validation**: Zod validates email format
3. **Duplicate Prevention**: SharePoint enforces unique emails
4. **CAPTCHA**: Turnstile prevents bot submissions
5. **CORS**: Restricted to your domain only
6. **Secrets**: All secrets in environment variables, never in code

---

## Troubleshooting

### "Failed to acquire access token"
- Check Azure AD credentials
- Verify client secret hasn't expired
- Confirm API permissions are granted

### "Failed to add subscriber"
- Check SharePoint site/list IDs
- Verify Sites.Selected permission is granted
- Check column names match exactly

### "CAPTCHA verification failed"
- Check Turnstile secret key
- Ensure site key matches domain
- Verify Turnstile widget is loading

### CORS Errors
- Check API Gateway CORS configuration
- Verify ALLOWED_ORIGIN matches exactly
- Check browser console for specific error

---

## Cost Estimate

| Service | Estimated Monthly Cost |
|---------|----------------------|
| AWS Lambda | ~$0.00 (free tier covers most use) |
| API Gateway | ~$0.00-$1.00 |
| SharePoint | Included with M365 |
| Turnstile | Free |
| **Total** | **~$0-$1/month** |
