/**
 * AWS Lambda Contact Form Handler
 *
 * Sends contact form submissions via Microsoft Graph API
 * with Cloudflare Turnstile CAPTCHA protection.
 *
 * SECURITY HARDENING (December 2025):
 * - NO sensitive data logging (email, names, messages, IPs)
 * - Request ID correlation for debugging
 * - OData/injection prevention in inputs
 * - Turnstile IP and hostname verification
 * - Cache-control and security headers
 * - Generic error messages to client
 */

import type { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { ConfidentialClientApplication } from "@azure/msal-node";
import { z } from "zod";

// =============================================================================
// Configuration
// =============================================================================
// NOTE: For production, consider migrating to AWS Secrets Manager
// Environment variables are encrypted at rest but visible in AWS Console
// =============================================================================

const config = {
  azureTenantId: process.env.AZURE_TENANT_ID || "",
  azureClientId: process.env.AZURE_CLIENT_ID || "",
  azureClientSecret: process.env.AZURE_CLIENT_SECRET || "",
  turnstileSecretKey: process.env.TURNSTILE_SECRET_KEY || "",
  senderEmail: process.env.M365_SENDER_EMAIL || "",
  recipientEmail: process.env.RECIPIENT_EMAIL || "",
  allowedOrigin: process.env.ALLOWED_ORIGIN || "https://www.hybe.tech",
};

// MSAL configuration for Azure AD
const msalConfig = {
  auth: {
    clientId: config.azureClientId,
    authority: `https://login.microsoftonline.com/${config.azureTenantId}`,
    clientSecret: config.azureClientSecret,
  },
};

const msalClient = new ConfidentialClientApplication(msalConfig);

// =============================================================================
// Input Validation Schema (OWASP: Input Validation)
// =============================================================================

/**
 * Strip HTML tags and dangerous characters from input
 */
function stripHtml(input: string): string {
  return input
    .replace(/<[^>]*>/g, "")
    .replace(/[<>]/g, "")
    .trim();
}

/**
 * Sanitize input to prevent injection attacks
 */
function sanitizeInput(input: string): string {
  return stripHtml(input).replace(/['"\\]/g, "");
}

const ContactFormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "Required")
    .max(100, "Too long")
    .transform(sanitizeInput),
  lastName: z
    .string()
    .trim()
    .min(1, "Required")
    .max(100, "Too long")
    .transform(sanitizeInput),
  email: z
    .string()
    .trim()
    .email("Invalid format")
    .max(254, "Too long")
    .toLowerCase()
    // Prevent injection via email field
    .refine((e) => !e.includes("'") && !e.includes('"') && !e.includes("\\"), {
      message: "Invalid characters",
    }),
  company: z
    .string()
    .trim()
    .max(200, "Too long")
    .optional()
    .transform((val) => (val ? sanitizeInput(val) : undefined)),
  phone: z
    .string()
    .trim()
    .max(30, "Too long")
    .optional()
    .transform((val) => (val ? sanitizeInput(val) : undefined)),
  interest: z
    .enum([
      "consultation",
      "training",
      "implementation",
      "development",
      "other",
      "",
    ])
    .optional(),
  message: z
    .string()
    .trim()
    .min(10, "Message too short")
    .max(5000, "Too long")
    .transform(stripHtml),
  turnstileToken: z
    .string()
    .min(1, "Verification required")
    .max(4096, "Token too long"),
});

type ContactFormData = z.infer<typeof ContactFormSchema>;

// =============================================================================
// Security Headers (OWASP: Security Misconfiguration)
// =============================================================================

function createSecurityHeaders(): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": config.allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Content-Type": "application/json",
    // Prevent caching of responses
    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    Pragma: "no-cache",
    Expires: "0",
    // Security headers
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
  };
}

// =============================================================================
// Response Helpers
// =============================================================================

function createErrorResponse(
  statusCode: number,
  message: string
): APIGatewayProxyResult {
  return {
    statusCode,
    headers: createSecurityHeaders(),
    body: JSON.stringify({ success: false, error: message }),
  };
}

function createSuccessResponse(message: string): APIGatewayProxyResult {
  return {
    statusCode: 200,
    headers: createSecurityHeaders(),
    body: JSON.stringify({ success: true, message }),
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
  hostname?: string;
  "error-codes"?: string[];
}

/**
 * Verify Cloudflare Turnstile token with IP and hostname validation
 */
async function verifyTurnstile(
  token: string,
  clientIp: string,
  requestId: string
): Promise<{ valid: boolean; reason?: string }> {
  try {
    const formData = new URLSearchParams();
    formData.append("secret", config.turnstileSecretKey);
    formData.append("response", token);
    formData.append("remoteip", clientIp);

    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      }
    );

    const result = (await response.json()) as TurnstileResponse;

    if (!result.success) {
      // Log only error codes, not token or IP
      console.warn(
        `[${requestId}] Turnstile failed: ${result["error-codes"]?.join(", ") || "unknown"}`
      );
      return { valid: false, reason: "verification_failed" };
    }

    // Verify hostname matches expected domain
    const expectedHostname = new URL(config.allowedOrigin).hostname;
    if (result.hostname && result.hostname !== expectedHostname) {
      console.warn(`[${requestId}] Hostname mismatch`);
      return { valid: false, reason: "hostname_mismatch" };
    }

    return { valid: true };
  } catch (error) {
    console.error(`[${requestId}] Turnstile error`);
    return { valid: false, reason: "service_error" };
  }
}

// =============================================================================
// Microsoft Graph API
// =============================================================================

let cachedToken: { token: string; expiresAt: number } | null = null;

/**
 * Get access token for Microsoft Graph API with caching
 */
async function getGraphAccessToken(): Promise<string> {
  // Return cached token if still valid (with 5 min buffer)
  if (cachedToken && Date.now() < cachedToken.expiresAt - 300000) {
    return cachedToken.token;
  }

  const result = await msalClient.acquireTokenByClientCredential({
    scopes: ["https://graph.microsoft.com/.default"],
  });

  if (!result?.accessToken) {
    throw new Error("TOKEN_ACQUISITION_FAILED");
  }

  // Cache the token
  cachedToken = {
    token: result.accessToken,
    expiresAt: result.expiresOn?.getTime() || Date.now() + 3600000,
  };

  return result.accessToken;
}

/**
 * Escape HTML special characters for safe email output
 */
function escapeHtml(input: string): string {
  const escapeMap: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return input.replace(/[&<>"']/g, (char) => escapeMap[char] || char);
}

/**
 * Build HTML email body (all user input is escaped)
 */
function buildEmailBody(data: ContactFormData): string {
  const interestLabels: Record<string, string> = {
    consultation: "AI Consultation",
    training: "AI Training",
    implementation: "AI Implementation",
    development: "Custom AI Development",
    other: "Other",
  };

  const interest = data.interest
    ? interestLabels[data.interest] || data.interest
    : "Not specified";

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%); padding: 30px; border-radius: 12px 12px 0 0;">
        <h1 style="color: #fff; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
        <p style="color: #94A3B8; margin: 10px 0 0 0;">from hybe.tech</p>
      </div>

      <div style="background: #fff; padding: 30px; border: 1px solid #E2E8F0; border-top: none; border-radius: 0 0 12px 12px;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; color: #64748B; width: 120px;">Name</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; font-weight: 500;">${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; color: #64748B;">Email</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0;"><a href="mailto:${escapeHtml(data.email)}" style="color: #3B82F6; text-decoration: none;">${escapeHtml(data.email)}</a></td>
          </tr>
          ${
            data.company
              ? `
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; color: #64748B;">Company</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0;">${escapeHtml(data.company)}</td>
          </tr>
          `
              : ""
          }
          ${
            data.phone
              ? `
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; color: #64748B;">Phone</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0;"><a href="tel:${escapeHtml(data.phone)}" style="color: #3B82F6; text-decoration: none;">${escapeHtml(data.phone)}</a></td>
          </tr>
          `
              : ""
          }
          <tr>
            <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; color: #64748B;">Interest</td>
            <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0;">${escapeHtml(interest)}</td>
          </tr>
        </table>

        <div style="margin-top: 24px;">
          <h3 style="color: #1E293B; margin: 0 0 12px 0; font-size: 16px;">Message</h3>
          <div style="background: #F8FAFC; padding: 20px; border-radius: 8px; white-space: pre-wrap;">${escapeHtml(data.message)}</div>
        </div>
      </div>

      <p style="color: #94A3B8; font-size: 12px; text-align: center; margin-top: 20px;">
        This message was sent via the Hybetech website contact form.
      </p>
    </body>
    </html>
  `;
}

/**
 * Send email via Microsoft Graph API
 */
async function sendEmail(data: ContactFormData, requestId: string): Promise<void> {
  const accessToken = await getGraphAccessToken();

  const emailPayload = {
    message: {
      subject: `[Hybetech Contact] ${data.interest || "General Inquiry"} - ${data.firstName} ${data.lastName}`,
      body: {
        contentType: "HTML",
        content: buildEmailBody(data),
      },
      toRecipients: [
        {
          emailAddress: {
            address: config.recipientEmail,
          },
        },
      ],
      replyTo: [
        {
          emailAddress: {
            address: data.email,
            name: `${data.firstName} ${data.lastName}`,
          },
        },
      ],
    },
    saveToSentItems: true,
  };

  const response = await fetch(
    `https://graph.microsoft.com/v1.0/users/${config.senderEmail}/sendMail`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    }
  );

  if (!response.ok) {
    // Log status code only, not response body (might contain sensitive info)
    console.error(`[${requestId}] Graph API error: ${response.status}`);
    throw new Error("EMAIL_SEND_FAILED");
  }
}

// =============================================================================
// Request Helpers
// =============================================================================

/**
 * Get HTTP method from event (supports both REST API and HTTP API formats)
 */
function getHttpMethod(event: APIGatewayProxyEvent): string {
  const httpApiMethod = (
    event.requestContext as unknown as { http?: { method?: string } }
  )?.http?.method;
  if (httpApiMethod) {
    return httpApiMethod;
  }
  return event.httpMethod || "";
}

/**
 * Get client IP from event (supports both REST API and HTTP API formats)
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

  // Fallback to X-Forwarded-For header
  const forwardedFor =
    event.headers?.["X-Forwarded-For"] || event.headers?.["x-forwarded-for"];
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "";
  }

  return "";
}

// =============================================================================
// Lambda Handler
// =============================================================================

export async function handler(
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> {
  const requestId = generateRequestId();
  const method = getHttpMethod(event);

  // Log request method only (no IP, no headers, no body)
  console.info(`[${requestId}] ${method} request received`);

  // Handle preflight OPTIONS request
  if (method === "OPTIONS") {
    return {
      statusCode: 204,
      headers: createSecurityHeaders(),
      body: "",
    };
  }

  // Only allow POST
  if (method !== "POST") {
    return createErrorResponse(405, "Method not allowed");
  }

  try {
    // Parse request body
    if (!event.body) {
      return createErrorResponse(400, "Request body is required");
    }

    let body: unknown;
    try {
      body = JSON.parse(event.body);
    } catch {
      return createErrorResponse(400, "Invalid request format");
    }

    // Validate input
    const validationResult = ContactFormSchema.safeParse(body);
    if (!validationResult.success) {
      // Log validation failure without exposing field details
      console.warn(`[${requestId}] Validation failed`);
      // Return generic error (don't expose field names or validation details)
      return createErrorResponse(400, "Please check your input and try again.");
    }

    const formData = validationResult.data;

    // Get and verify client IP
    const clientIp = getClientIp(event);
    if (!clientIp) {
      console.warn(`[${requestId}] Missing client IP`);
      return createErrorResponse(400, "Unable to verify request origin.");
    }

    // Verify Turnstile CAPTCHA with IP verification
    const turnstileResult = await verifyTurnstile(
      formData.turnstileToken,
      clientIp,
      requestId
    );
    if (!turnstileResult.valid) {
      return createErrorResponse(400, "Verification failed. Please try again.");
    }

    // Send email
    await sendEmail(formData, requestId);

    // Log success without sensitive data
    console.info(`[${requestId}] Contact form submitted successfully`);

    return createSuccessResponse(
      "Thank you for your message! We'll be in touch soon."
    );
  } catch (error) {
    // Log error type only, not full error object
    const errorType = error instanceof Error ? error.message : "UNKNOWN_ERROR";
    console.error(`[${requestId}] Error: ${errorType}`);

    // Return generic error to client (OWASP: Error Handling)
    return createErrorResponse(
      500,
      "Unable to send message. Please try again later."
    );
  }
}
