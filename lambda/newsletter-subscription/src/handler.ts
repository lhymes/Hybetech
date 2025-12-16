import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { ConfidentialClientApplication } from '@azure/msal-node';
import { z } from 'zod';

// =============================================================================
// SECURITY HARDENING NOTES
// =============================================================================
// Based on OWASP 2025, AWS Lambda Security Best Practices, and Microsoft Graph
// security guidelines, this handler implements:
//
// 1. NO SENSITIVE DATA LOGGING - Email addresses, IPs, tokens are NEVER logged
// 2. Input validation with Zod - Strict email format and length limits
// 3. OData injection prevention - Email sanitized before Graph API queries
// 4. IP verification for Turnstile - Prevents CAPTCHA solving services
// 5. Secure error handling - Generic errors returned, details logged safely
// 6. CORS restrictions - Only allowed origin can access
// 7. Sites.Selected permission - Least privilege Graph API access
// 8. Token caching with secure expiry buffer
// =============================================================================

// =============================================================================
// Configuration from Environment Variables
// =============================================================================
// NOTE: For production, consider migrating to AWS Secrets Manager or
// SSM Parameter Store for enhanced secret rotation and access control.
// Environment variables are encrypted at rest but visible in AWS Console.
// =============================================================================

const TURNSTILE_SECRET = process.env.TURNSTILE_SECRET_KEY || '';
const AZURE_TENANT_ID = process.env.AZURE_TENANT_ID || '';
const AZURE_CLIENT_ID = process.env.AZURE_CLIENT_ID || '';
const AZURE_CLIENT_SECRET = process.env.AZURE_CLIENT_SECRET || '';
const SHAREPOINT_SITE_ID = process.env.SHAREPOINT_SITE_ID || '';
const SHAREPOINT_LIST_ID = process.env.SHAREPOINT_LIST_ID || '';
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'https://www.hybe.tech';

// =============================================================================
// Input Validation Schema (OWASP: Input Validation)
// =============================================================================

const subscribeSchema = z.object({
  email: z
    .string()
    .min(5, 'Email too short')
    .max(254, 'Email too long')
    .email('Invalid email format')
    .transform((e) => e.toLowerCase().trim())
    // Additional sanitization to prevent OData injection
    .refine((e) => !e.includes("'") && !e.includes('"') && !e.includes('\\'), {
      message: 'Invalid characters in email',
    }),
  turnstileToken: z.string().min(1, 'Verification required').max(4096, 'Token too long'),
  source: z
    .string()
    .max(50, 'Source too long')
    .optional()
    .default('Website Footer')
    // Sanitize source to prevent injection
    .transform((s) => s.replace(/[<>"'\\]/g, '')),
});

// =============================================================================
// Security Headers (OWASP: Security Misconfiguration)
// =============================================================================

const securityHeaders = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
  // Prevent caching of responses containing sensitive data
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  'Pragma': 'no-cache',
  'Expires': '0',
  // Additional security headers
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
};

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Get HTTP method - supports both REST API (v1) and HTTP API (v2) event formats
 */
function getHttpMethod(event: APIGatewayProxyEvent): string {
  const httpApiMethod = (
    event.requestContext as unknown as { http?: { method?: string } }
  )?.http?.method;
  if (httpApiMethod) {
    return httpApiMethod;
  }
  return event.httpMethod || '';
}

/**
 * Get client IP address from various sources
 * SECURITY: IP is used for Turnstile verification, not logged
 */
function getClientIp(event: APIGatewayProxyEvent): string {
  // HTTP API format
  const httpApiIp = (
    event.requestContext as unknown as { http?: { sourceIp?: string } }
  )?.http?.sourceIp;
  if (httpApiIp) {
    return httpApiIp;
  }

  // REST API format
  if (event.requestContext?.identity?.sourceIp) {
    return event.requestContext.identity.sourceIp;
  }

  // Fallback to X-Forwarded-For header (first IP only)
  const forwardedFor =
    event.headers?.['X-Forwarded-For'] || event.headers?.['x-forwarded-for'];
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim() || '';
  }

  return '';
}

/**
 * Get User Agent string (truncated for safety)
 */
function getUserAgent(event: APIGatewayProxyEvent): string {
  const ua = event.headers?.['User-Agent'] || event.headers?.['user-agent'] || '';
  // Limit length and sanitize to prevent injection
  return ua.substring(0, 255).replace(/[<>"'\\]/g, '');
}

/**
 * Create a standardized API response with security headers
 */
function createResponse(
  statusCode: number,
  body: Record<string, unknown>
): APIGatewayProxyResult {
  return {
    statusCode,
    headers: securityHeaders,
    body: JSON.stringify(body),
  };
}

/**
 * Generate a request ID for correlation (no sensitive data)
 */
function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
}

// =============================================================================
// Turnstile Verification (Cloudflare Security Best Practices)
// =============================================================================

interface TurnstileResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
  action?: string;
  cdata?: string;
}

/**
 * Verify Turnstile token with IP matching
 * SECURITY: Validates that the IP solving the challenge matches the request IP
 */
async function verifyTurnstile(
  token: string,
  requestIp: string,
  requestId: string
): Promise<{ valid: boolean; reason?: string }> {
  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: TURNSTILE_SECRET,
          response: token,
          remoteip: requestIp,
        }),
      }
    );

    const result = (await response.json()) as TurnstileResponse;

    if (!result.success) {
      // Log only error codes, not the token or IP
      console.warn(`[${requestId}] Turnstile failed: ${result['error-codes']?.join(', ') || 'unknown'}`);
      return { valid: false, reason: 'verification_failed' };
    }

    // Verify hostname matches expected domain (prevents token reuse from other sites)
    const expectedHostname = new URL(ALLOWED_ORIGIN).hostname;
    if (result.hostname && result.hostname !== expectedHostname) {
      console.warn(`[${requestId}] Hostname mismatch`);
      return { valid: false, reason: 'hostname_mismatch' };
    }

    return { valid: true };
  } catch (error) {
    // Log generic error, not details that might contain sensitive data
    console.error(`[${requestId}] Turnstile verification error`);
    return { valid: false, reason: 'service_error' };
  }
}

// =============================================================================
// Microsoft Graph Authentication
// =============================================================================

let cachedToken: { token: string; expiresAt: number } | null = null;

/**
 * Get Microsoft Graph access token with caching
 * SECURITY: Token cached in Lambda memory only (isolated per execution context)
 */
async function getGraphToken(): Promise<string> {
  // Return cached token if still valid (with 5 min buffer for safety)
  if (cachedToken && Date.now() < cachedToken.expiresAt - 300000) {
    return cachedToken.token;
  }

  const msalConfig = {
    auth: {
      clientId: AZURE_CLIENT_ID,
      clientSecret: AZURE_CLIENT_SECRET,
      authority: `https://login.microsoftonline.com/${AZURE_TENANT_ID}`,
    },
  };

  const cca = new ConfidentialClientApplication(msalConfig);

  const result = await cca.acquireTokenByClientCredential({
    scopes: ['https://graph.microsoft.com/.default'],
  });

  if (!result?.accessToken) {
    throw new Error('TOKEN_ACQUISITION_FAILED');
  }

  // Cache the token (Lambda memory is isolated)
  cachedToken = {
    token: result.accessToken,
    expiresAt: result.expiresOn?.getTime() || Date.now() + 3600000,
  };

  return result.accessToken;
}

// =============================================================================
// SharePoint List Operations
// =============================================================================

interface GraphListResponse {
  value: Array<{ id: string; fields?: Record<string, unknown> }>;
}

interface AddSubscriberResult {
  success: boolean;
  alreadyExists?: boolean;
}

/**
 * Add subscriber to SharePoint List
 * SECURITY: Email is pre-validated and sanitized to prevent OData injection
 */
async function addSubscriber(
  email: string,
  ipAddress: string,
  userAgent: string,
  source: string,
  requestId: string
): Promise<AddSubscriberResult> {
  const token = await getGraphToken();
  const graphBaseUrl = `https://graph.microsoft.com/v1.0/sites/${SHAREPOINT_SITE_ID}/lists/${SHAREPOINT_LIST_ID}`;

  // SECURITY: Email already validated by Zod to not contain quotes or special chars
  // This prevents OData injection attacks
  const checkUrl = `${graphBaseUrl}/items?$filter=fields/Email eq '${email}'&$select=id`;

  const checkResponse = await fetch(checkUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!checkResponse.ok) {
    // Log status code only, not response body which might contain sensitive info
    console.error(`[${requestId}] Graph API check failed: ${checkResponse.status}`);
    throw new Error('GRAPH_API_ERROR');
  }

  const checkResult = (await checkResponse.json()) as GraphListResponse;

  // If already subscribed, return success with flag (don't reveal if email exists to client)
  if (checkResult.value && checkResult.value.length > 0) {
    return { success: true, alreadyExists: true };
  }

  // Add new subscriber
  const addUrl = `${graphBaseUrl}/items`;
  const subscribedAt = new Date().toISOString();

  const addResponse = await fetch(addUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fields: {
        Title: email,
        Email: email,
        IPAddress: ipAddress,
        SubscribedAt: subscribedAt,
        Source: source,
        Status: 'Active',
        UserAgent: userAgent,
      },
    }),
  });

  if (!addResponse.ok) {
    console.error(`[${requestId}] Graph API add failed: ${addResponse.status}`);
    throw new Error('GRAPH_API_ERROR');
  }

  // Log success without sensitive data
  console.info(`[${requestId}] Subscription added successfully`);
  return { success: true, alreadyExists: false };
}

// =============================================================================
// Main Lambda Handler
// =============================================================================

export async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  const requestId = generateRequestId();
  const method = getHttpMethod(event);

  // Log request method only (no IP, no headers, no body)
  console.info(`[${requestId}] ${method} request received`);

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: securityHeaders,
      body: '',
    };
  }

  // Only allow POST
  if (method !== 'POST') {
    return createResponse(405, {
      success: false,
      error: 'Method not allowed',
    });
  }

  try {
    // Parse request body
    let body: unknown;
    try {
      body = JSON.parse(event.body || '{}');
    } catch {
      return createResponse(400, {
        success: false,
        error: 'Invalid request format',
      });
    }

    // Validate input (Zod handles sanitization)
    const validationResult = subscribeSchema.safeParse(body);
    if (!validationResult.success) {
      // Log validation failure type, not the actual data
      console.warn(`[${requestId}] Validation failed`);
      return createResponse(400, {
        success: false,
        error: 'Please enter a valid email address.',
      });
    }

    const { email, turnstileToken, source } = validationResult.data;
    const clientIp = getClientIp(event);
    const userAgent = getUserAgent(event);

    // Require valid IP for Turnstile verification
    if (!clientIp) {
      console.warn(`[${requestId}] Missing client IP`);
      return createResponse(400, {
        success: false,
        error: 'Unable to verify request origin.',
      });
    }

    // Verify Turnstile CAPTCHA with IP matching
    const turnstileResult = await verifyTurnstile(turnstileToken, clientIp, requestId);
    if (!turnstileResult.valid) {
      return createResponse(400, {
        success: false,
        error: 'Verification failed. Please try again.',
      });
    }

    // Add subscriber to SharePoint List
    const result = await addSubscriber(email, clientIp, userAgent, source, requestId);

    // Return same message whether new or existing (prevents email enumeration)
    return createResponse(200, {
      success: true,
      message: 'Thanks for subscribing!',
    });
  } catch (error) {
    // Log error type only, not full error object which might contain sensitive data
    const errorType = error instanceof Error ? error.message : 'UNKNOWN_ERROR';
    console.error(`[${requestId}] Error: ${errorType}`);

    // Return generic error to client (OWASP: Error Handling)
    return createResponse(500, {
      success: false,
      error: 'Unable to process request. Please try again later.',
    });
  }
}
