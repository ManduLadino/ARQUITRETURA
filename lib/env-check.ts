/**
 * Utility to verify if required environment variables are set
 */
export function checkRequiredEnvVars(): { valid: boolean; missing: string[] } {
  const requiredVars = ["GROQ_API_KEY", "OPENAI_API_KEY"]
  const missing = requiredVars.filter((varName) => !process.env[varName])

  return {
    valid: missing.length === 0,
    missing,
  }
}
