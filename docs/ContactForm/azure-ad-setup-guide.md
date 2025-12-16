# Azure AD Setup Guide for Contact Form

Complete step-by-step guide for configuring Azure AD App Registration to enable secure email delivery via Microsoft Graph API.

## Prerequisites

- Microsoft 365 Business subscription (Basic or higher)
- Global Administrator or Application Administrator role in Azure AD
- Exchange Online admin access (for Application Access Policy)

---

## Part 1: Azure AD App Registration

### Step 1.1: Create App Registration

1. Sign in to [Azure Portal](https://portal.azure.com)
2. Search for "App registrations" in the top search bar
3. Click **New registration**

Configure the following:

| Field | Value |
|-------|-------|
| Name | `Contact Form - Hymes Consulting` |
| Supported account types | **Accounts in this organizational directory only** (Single tenant) |
| Redirect URI | Leave blank (not needed for client credentials flow) |

4. Click **Register**

### Step 1.2: Record Application Details

On the **Overview** page, copy and save these values:

```
Application (client) ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
Directory (tenant) ID:   xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

These will be used as `AZURE_CLIENT_ID` and `AZURE_TENANT_ID` in your Lambda environment variables.

### Step 1.3: Create Client Secret

1. In the left sidebar, click **Certificates & secrets**
2. Click **Client secrets** tab
3. Click **New client secret**

| Field | Value |
|-------|-------|
| Description | `Lambda Contact Form - Production` |
| Expires | **24 months** |

4. Click **Add**
5. **IMMEDIATELY** copy the **Value** (not the Secret ID)

**CRITICAL**: The secret value is only shown once. Copy it immediately and store securely.

```
Client Secret Value: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

This will be used as `AZURE_CLIENT_SECRET` in your Lambda environment variables.

**Set a calendar reminder** to rotate this secret before expiration (24 months from creation date).

### Step 1.4: Configure API Permissions

1. In the left sidebar, click **API permissions**
2. Click **Add a permission**
3. Select **Microsoft Graph**
4. Select **Application permissions** (not Delegated)
5. Search for `Mail.Send`
6. Check the checkbox next to **Mail.Send**
7. Click **Add permissions**

### Step 1.5: Grant Admin Consent

After adding the permission, you'll see it listed with a warning "Not granted for [tenant]".

1. Click **Grant admin consent for [Your Tenant Name]**
2. Click **Yes** in the confirmation dialog
3. Verify the status shows a green checkmark with "Granted for [tenant]"

**Note**: This step requires Global Administrator or Privileged Role Administrator permissions.

---

## Part 2: Application Access Policy (REQUIRED)

**Why This Is Required**: The `Mail.Send` application permission by default allows the app to send email as **ANY user** in your tenant. This is a significant security risk. An Application Access Policy restricts the app to only send as specific mailboxes.

### Step 2.1: Connect to Exchange Online PowerShell

Open PowerShell as Administrator and run:

```powershell
# Install Exchange Online module if not already installed
Install-Module -Name ExchangeOnlineManagement -Force

# Connect to Exchange Online
Connect-ExchangeOnline -UserPrincipalName admin@yourdomain.com
```

You'll be prompted to authenticate with your Microsoft 365 admin credentials.

### Step 2.2: Create Mail-Enabled Security Group

```powershell
# Create the security group
New-DistributionGroup -Name "Contact Form Senders" -Type Security -Notes "Mailboxes allowed to send via contact form app"
```

### Step 2.3: Add Sender Mailbox to Group

```powershell
# Add the designated sender mailbox
Add-DistributionGroupMember -Identity "Contact Form Senders" -Member "webform@hybe.tech"
```

**Note**: The mailbox `webform@hybe.tech` must exist in your M365 tenant (shared mailbox is fine).

### Step 2.4: Create Application Access Policy

```powershell
# Create the restrictive policy
# Replace <YOUR_APP_CLIENT_ID> with your Application (client) ID from Step 1.2
New-ApplicationAccessPolicy `
    -AppId "<YOUR_APP_CLIENT_ID>" `
    -PolicyScopeGroupId "Contact Form Senders" `
    -AccessRight RestrictAccess `
    -Description "Restrict contact form app to noreply mailbox only"
```

### Step 2.5: Verify the Policy

```powershell
# Test that the policy is working
# Should return "AccessCheckResult: Granted"
Test-ApplicationAccessPolicy `
    -Identity "webform@hybe.tech" `
    -AppId "<YOUR_APP_CLIENT_ID>"
```

Expected output:
```
RunspaceId        : xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
AppId             : your-app-id
Mailbox           : webform@hybe.tech
MailboxSidInToken : S-1-5-21-...
AccessCheckResult : Granted
```

Test that other mailboxes are blocked:
```powershell
# Should return "AccessCheckResult: Denied"
Test-ApplicationAccessPolicy `
    -Identity "ceo@hybe.tech" `
    -AppId "<YOUR_APP_CLIENT_ID>"
```

### Step 2.6: Disconnect from Exchange Online

```powershell
Disconnect-ExchangeOnline -Confirm:$false
```

---

## Part 3: Verification Checklist

Run through this checklist to ensure everything is configured correctly:

### Azure AD App Registration

- [ ] App registration created with descriptive name
- [ ] Application (client) ID recorded
- [ ] Directory (tenant) ID recorded
- [ ] Client secret created and value copied
- [ ] Client secret expiration date added to calendar
- [ ] `Mail.Send` application permission added
- [ ] Admin consent granted (green checkmark)

### Application Access Policy

- [ ] Exchange Online PowerShell module installed
- [ ] Security group "Contact Form Senders" created
- [ ] Sender mailbox added to security group
- [ ] Application Access Policy created
- [ ] Policy tested with `Test-ApplicationAccessPolicy`
- [ ] Sender mailbox returns "Granted"
- [ ] Other mailboxes return "Denied"

### Lambda Configuration

- [ ] `AZURE_TENANT_ID` environment variable set
- [ ] `AZURE_CLIENT_ID` environment variable set
- [ ] `AZURE_CLIENT_SECRET` environment variable set
- [ ] `M365_SENDER_EMAIL` matches the mailbox in the security group
- [ ] Environment variables encrypted with KMS

---

## Part 4: Testing Email Delivery

### Test via Lambda Console

1. Go to AWS Lambda Console
2. Select your contact form function
3. Click **Test** tab
4. Create test event with this payload:

```json
{
  "httpMethod": "POST",
  "headers": {
    "Content-Type": "application/json"
  },
  "body": "{\"firstName\":\"Test\",\"lastName\":\"User\",\"email\":\"test@example.com\",\"message\":\"This is a test message from Lambda console.\",\"turnstileToken\":\"SKIP_FOR_TESTING\"}"
}
```

**Note**: For testing, you may need to temporarily bypass Turnstile validation or use a test token from Cloudflare.

### Expected Response

```json
{
  "statusCode": 200,
  "body": "{\"success\":true,\"message\":\"Message sent successfully\"}"
}
```

### Verify Email Received

1. Check the inbox of `RECIPIENT_EMAIL`
2. Verify email arrived from `M365_SENDER_EMAIL`
3. Check email content matches form submission

---

## Troubleshooting

### "401 Unauthorized" Errors

| Cause | Solution |
|-------|----------|
| Invalid client secret | Verify secret was copied correctly (not Secret ID) |
| Expired client secret | Create new secret in Azure Portal |
| Wrong tenant ID | Verify tenant ID matches your Azure AD |
| Wrong client ID | Verify client ID matches your app registration |

### "403 Forbidden" Errors

| Cause | Solution |
|-------|----------|
| Missing Mail.Send permission | Add permission in API permissions |
| Admin consent not granted | Click "Grant admin consent" button |
| Application Access Policy blocking | Verify sender email is in security group |
| Wrong sender email | Ensure M365_SENDER_EMAIL matches group member |

### Application Access Policy Issues

```powershell
# List all application access policies
Get-ApplicationAccessPolicy

# Remove a policy if misconfigured
Remove-ApplicationAccessPolicy -Identity "policy-id"

# View security group members
Get-DistributionGroupMember -Identity "Contact Form Senders"
```

### Token Acquisition Errors

If MSAL authentication fails:

1. Verify all three Azure AD values are correct:
   - Tenant ID
   - Client ID
   - Client Secret

2. Check the token endpoint is accessible:
   ```
   https://login.microsoftonline.com/{tenant-id}/oauth2/v2.0/token
   ```

3. Verify the scope is correct:
   ```
   https://graph.microsoft.com/.default
   ```

---

## Security Best Practices

### Secret Rotation Schedule

| Item | Rotation Period | Action |
|------|-----------------|--------|
| Client Secret | 24 months | Create new secret, update Lambda, delete old |
| Turnstile Secret | As needed | Regenerate in Cloudflare dashboard |
| Lambda IAM Role | Annually | Review and audit permissions |

### Principle of Least Privilege

This configuration follows least privilege:

1. **Single mailbox access**: Application Access Policy restricts to one sender
2. **No read permissions**: App cannot read any mailboxes
3. **Application permissions only**: No user impersonation possible
4. **Encrypted secrets**: KMS encryption for environment variables

### Audit Logging

Enable these logs for security monitoring:

1. **Azure AD Sign-in Logs**: Shows token acquisition attempts
2. **Azure AD Audit Logs**: Shows app registration changes
3. **Exchange Admin Audit Logs**: Shows mail operations
4. **Lambda CloudWatch Logs**: Shows function invocations

---

## Quick Reference

### Environment Variables

```bash
AZURE_TENANT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
AZURE_CLIENT_ID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
AZURE_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
M365_SENDER_EMAIL=webform@hybe.tech
RECIPIENT_EMAIL=webform@hybe.tech
TURNSTILE_SECRET_KEY=0x4AAAAAAxxxxxxxxxxxxxxxxxx
ALLOWED_ORIGIN=https://www.hybe.tech
```

### PowerShell Commands Reference

```powershell
# Connect
Connect-ExchangeOnline -UserPrincipalName admin@domain.com

# Create security group
New-DistributionGroup -Name "Contact Form Senders" -Type Security

# Add member
Add-DistributionGroupMember -Identity "Contact Form Senders" -Member "email@domain.com"

# Create policy
New-ApplicationAccessPolicy -AppId "app-id" -PolicyScopeGroupId "Contact Form Senders" -AccessRight RestrictAccess -Description "Description"

# Test policy
Test-ApplicationAccessPolicy -Identity "email@domain.com" -AppId "app-id"

# View policies
Get-ApplicationAccessPolicy

# Disconnect
Disconnect-ExchangeOnline -Confirm:$false
```

---

## References

- [Microsoft Graph sendMail API](https://learn.microsoft.com/en-us/graph/api/user-sendmail)
- [Limit Application Permissions to Specific Mailboxes](https://learn.microsoft.com/en-us/graph/auth-limit-mailbox-access)
- [Azure AD App Registration Guide](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app)
- [Exchange Online PowerShell](https://learn.microsoft.com/en-us/powershell/exchange/connect-to-exchange-online-powershell)
