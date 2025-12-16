# Contact Form Deployment Checklist

Quick reference for deploying the Hybetech contact form. For detailed instructions, see `m365-contact-form.md`.

## Prerequisites

- [ ] Microsoft 365 Business subscription
- [ ] Azure AD admin access
- [ ] AWS account
- [ ] Cloudflare account (free)

## Step 1: Cloudflare Turnstile

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → Turnstile
2. Create a new site:
   - Add `www.hybe.tech` (production domain)
   - Add `localhost` (for local testing)
   - Widget Mode: `Managed`
3. Save the **Site Key** and **Secret Key**

## Step 2: Azure AD Setup

1. Go to [Azure Portal](https://portal.azure.com/) → App registrations
2. Create new registration: `Contact Form - Hybetech`
3. Record:
   - Application (client) ID → `AZURE_CLIENT_ID`
   - Directory (tenant) ID → `AZURE_TENANT_ID`
4. Create client secret → `AZURE_CLIENT_SECRET`
5. Add API permission: `Microsoft Graph` → `Mail.Send` (Application)
6. Grant admin consent
7. **CRITICAL**: Create Application Access Policy (see Step 2.5 in m365-contact-form.md)

## Step 3: AWS Lambda

1. Create function: `hybetech-contact-form`
   - Runtime: Node.js 20.x
   - Architecture: arm64
2. Set environment variables:
   ```
   AZURE_TENANT_ID=<from step 2>
   AZURE_CLIENT_ID=<from step 2>
   AZURE_CLIENT_SECRET=<from step 2>
   TURNSTILE_SECRET_KEY=<from step 1>
   M365_SENDER_EMAIL=webform@hybe.tech
   RECIPIENT_EMAIL=webform@hybe.tech
   ALLOWED_ORIGIN=https://www.hybe.tech
   ```
3. Set timeout to 30 seconds
4. Build and deploy Lambda code:
   ```bash
   cd lambda/contact-form
   npm install --omit=dev
   npm run build
   zip -r function.zip dist/ node_modules/ package.json
   ```
5. Upload `function.zip` to Lambda
6. Update handler to: `dist/handler.handler`

## Step 4: API Gateway

1. Create HTTP API
2. Add Lambda integration
3. Add route: `POST /contact`
4. Configure CORS:
   - Origin: `https://www.hybe.tech`
   - Methods: `POST, OPTIONS`
   - Headers: `Content-Type`
5. Copy the **Invoke URL**

## Step 5: Frontend Configuration

1. Copy `.env.example` to `.env`
2. Set values:
   ```
   PUBLIC_TURNSTILE_SITE_KEY=<from step 1>
   PUBLIC_CONTACT_API_URL=<API Gateway URL>/contact
   ```

## Step 6: Build & Deploy

```bash
# Build locally (Lightsail has limited memory)
pnpm build

# Upload to server
scp -r dist/* ubuntu@your-server:/tmp/dist-upload/

# On server
sudo rm -rf /var/www/hybe.tech/*
sudo cp -r /tmp/dist-upload/* /var/www/hybe.tech/
sudo chown -R www-data:www-data /var/www/hybe.tech/
```

## Step 7: Nginx CSP Update (if not using Cloudflare Pages)

Add to your Nginx server block:
```nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://challenges.cloudflare.com https://YOUR-API-ID.execute-api.us-east-1.amazonaws.com; frame-src https://challenges.cloudflare.com; frame-ancestors 'none'; base-uri 'self'" always;
```

Then: `sudo nginx -t && sudo systemctl reload nginx`

## Verification

- [ ] Form loads without console errors
- [ ] Turnstile widget appears (or runs invisibly)
- [ ] Form submission shows success message
- [ ] Email arrives in M365 inbox
- [ ] Reply-To is set correctly

## Troubleshooting

| Issue | Solution |
|-------|----------|
| 405 Not Allowed | Configure CORS in API Gateway |
| Turnstile fails | Check domain is added to Turnstile site |
| 401 from Azure | Check client secret hasn't expired |
| 403 from Graph API | Ensure admin consent granted, check Application Access Policy |
| Email not arriving | Check CloudWatch logs, verify sender email exists |

For detailed troubleshooting, see `m365-contact-form.md`.
