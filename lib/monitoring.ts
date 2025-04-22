import * as Sentry from "@sentry/nextjs"

/**
 * Utility functions for application monitoring
 */

/**
 * Log a user action for analytics and debugging
 */
export function logUserAction(action: string, data?: Record<string, any>) {
  // Add a breadcrumb for this user action
  Sentry.addBreadcrumb({
    category: "user-action",
    message: action,
    data,
    level: "info",
  })
}

/**
 * Monitor a function execution and report errors
 */
export async function monitorExecution<T>(
  name: string,
  fn: () => Promise<T>,
  tags?: Record<string, string>,
): Promise<T> {
  // Create a transaction for this operation
  const transaction = Sentry.startTransaction({
    name,
    op: "function",
  })

  // Add tags to the transaction
  if (tags) {
    Object.entries(tags).forEach(([key, value]) => {
      transaction.setTag(key, value)
    })
  }

  try {
    const result = await fn()
    transaction.finish()
    return result
  } catch (error) {
    // Capture the error with the transaction context
    Sentry.captureException(error, {
      tags,
      extra: {
        functionName: name,
      },
    })
    transaction.finish()
    throw error
  }
}

/**
 * Check application health and report issues
 */
export function checkApplicationHealth() {
  // Check for required environment variables
  const requiredVars = ["GROQ_API_KEY", "OPENAI_API_KEY", "NEXT_PUBLIC_SENTRY_DSN"]
  const missingVars = requiredVars.filter((varName) => !process.env[varName])

  if (missingVars.length > 0) {
    Sentry.captureMessage(`Missing required environment variables: ${missingVars.join(", ")}`, {
      level: "warning",
      tags: {
        component: "app-health",
      },
    })
  }

  // Log application startup
  Sentry.addBreadcrumb({
    category: "app-lifecycle",
    message: "Application started",
    level: "info",
    data: {
      timestamp: new Date().toISOString(),
      nodeEnv: process.env.NODE_ENV,
    },
  })
}
